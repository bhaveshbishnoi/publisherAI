import json
import os
from typing import List, Optional, Dict, Any
from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.models import ProjectRequirements, GeneratedProject

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "publisherai.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ProjectRecord(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    domain = Column(String, nullable=False)
    category = Column(String, nullable=True)
    data_json = Column(Text, nullable=False)

class GeneratedProjectRecord(Base):
    __tablename__ = "generated_projects"
    id = Column(String, primary_key=True, index=True)
    data_json = Column(Text, nullable=False)

class AppSettingsRecord(Base):
    __tablename__ = "app_settings"
    id = Column(String, primary_key=True, default="global")
    provider = Column(String, default="hybrid")
    openai_api_key = Column(String, default="")
    gemini_api_key = Column(String, default="")
    anthropic_api_key = Column(String, default="")
    model_name = Column(String, default="gpt-4o")

def init_db():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        count = session.query(ProjectRecord).count()
        if count == 0:
            from app.starters import STARTER_PROJECTS
            for starter in STARTER_PROJECTS:
                rec = ProjectRecord(
                    id=starter.id,
                    name=starter.name,
                    domain=starter.domain,
                    category=starter.category,
                    data_json=json.dumps(starter.model_dump())
                )
                session.add(rec)
            session.commit()

        settings_count = session.query(AppSettingsRecord).count()
        if settings_count == 0:
            default_settings = AppSettingsRecord(
                id="global",
                provider="hybrid",
                openai_api_key="",
                gemini_api_key="",
                anthropic_api_key="",
                model_name="gpt-4o"
            )
            session.add(default_settings)
            session.commit()
    finally:
        session.close()

class DatabaseStore:
    @staticmethod
    def get_all_requirements() -> List[ProjectRequirements]:
        session: Session = SessionLocal()
        try:
            records = session.query(ProjectRecord).all()
            reqs = []
            for r in records:
                try:
                    data = json.loads(r.data_json)
                    reqs.append(ProjectRequirements.model_validate(data))
                except Exception:
                    pass
            return reqs
        finally:
            session.close()

    @staticmethod
    def get_requirement(proj_id: str) -> Optional[ProjectRequirements]:
        session: Session = SessionLocal()
        try:
            r = session.query(ProjectRecord).filter(ProjectRecord.id == proj_id).first()
            if not r:
                return None
            return ProjectRequirements.model_validate(json.loads(r.data_json))
        finally:
            session.close()

    @staticmethod
    def save_requirement(req: ProjectRequirements):
        session: Session = SessionLocal()
        try:
            r = session.query(ProjectRecord).filter(ProjectRecord.id == req.id).first()
            if not r:
                r = ProjectRecord(
                    id=req.id,
                    name=req.name,
                    domain=req.domain,
                    category=req.category,
                    data_json=json.dumps(req.model_dump())
                )
                session.add(r)
            else:
                r.name = req.name
                r.domain = req.domain
                r.category = req.category
                r.data_json = json.dumps(req.model_dump())
            session.commit()
        finally:
            session.close()

    @staticmethod
    def get_generated_project(proj_id: str) -> Optional[GeneratedProject]:
        session: Session = SessionLocal()
        try:
            r = session.query(GeneratedProjectRecord).filter(GeneratedProjectRecord.id == proj_id).first()
            if not r:
                return None
            return GeneratedProject.model_validate(json.loads(r.data_json))
        finally:
            session.close()

    @staticmethod
    def save_generated_project(proj: GeneratedProject):
        session: Session = SessionLocal()
        try:
            r = session.query(GeneratedProjectRecord).filter(GeneratedProjectRecord.id == proj.id).first()
            if not r:
                r = GeneratedProjectRecord(
                    id=proj.id,
                    data_json=json.dumps(proj.model_dump())
                )
                session.add(r)
            else:
                r.data_json = json.dumps(proj.model_dump())
            session.commit()
        finally:
            session.close()

    @staticmethod
    def get_settings() -> Dict[str, Any]:
        session: Session = SessionLocal()
        try:
            r = session.query(AppSettingsRecord).filter(AppSettingsRecord.id == "global").first()
            if not r:
                return {
                    "provider": "hybrid",
                    "openai_api_key": "",
                    "gemini_api_key": "",
                    "anthropic_api_key": "",
                    "model_name": "gpt-4o"
                }
            return {
                "provider": r.provider,
                "openai_api_key": r.openai_api_key,
                "gemini_api_key": r.gemini_api_key,
                "anthropic_api_key": r.anthropic_api_key,
                "model_name": r.model_name
            }
        finally:
            session.close()

    @staticmethod
    def save_settings(settings: Dict[str, Any]):
        session: Session = SessionLocal()
        try:
            r = session.query(AppSettingsRecord).filter(AppSettingsRecord.id == "global").first()
            if not r:
                r = AppSettingsRecord(
                    id="global",
                    provider=settings.get("provider", "hybrid"),
                    openai_api_key=settings.get("openai_api_key", ""),
                    gemini_api_key=settings.get("gemini_api_key", ""),
                    anthropic_api_key=settings.get("anthropic_api_key", ""),
                    model_name=settings.get("model_name", "gpt-4o")
                )
                session.add(r)
            else:
                r.provider = settings.get("provider", r.provider)
                if "openai_api_key" in settings:
                    r.openai_api_key = settings["openai_api_key"]
                if "gemini_api_key" in settings:
                    r.gemini_api_key = settings["gemini_api_key"]
                if "anthropic_api_key" in settings:
                    r.anthropic_api_key = settings["anthropic_api_key"]
                if "model_name" in settings:
                    r.model_name = settings["model_name"]
            session.commit()
        finally:
            session.close()
