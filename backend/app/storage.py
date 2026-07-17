import json
import os
from typing import List, Optional, Dict
from app.models import ProjectRequirements, GeneratedProject
from app.starters import STARTER_PROJECTS

STORAGE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../data")
if not os.path.exists(STORAGE_DIR):
    os.makedirs(STORAGE_DIR, exist_ok=True)

PROJECTS_FILE = os.path.join(STORAGE_DIR, "projects.json")

class ProjectStorage:
    @staticmethod
    def _load_data() -> Dict[str, Dict]:
        if not os.path.exists(PROJECTS_FILE):
            initial = {
                "requirements": {},
                "generated": {}
            }
            for starter in STARTER_PROJECTS:
                initial["requirements"][starter.id] = starter.model_dump()
            ProjectStorage._save_data(initial)
            return initial
        try:
            with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"requirements": {}, "generated": {}}

    @staticmethod
    def _save_data(data: Dict[str, Dict]):
        with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    @classmethod
    def get_all_requirements(cls) -> List[ProjectRequirements]:
        data = cls._load_data()
        reqs = []
        for raw in data.get("requirements", {}).values():
            try:
                reqs.append(ProjectRequirements.model_validate(raw))
            except Exception as e:
                pass
        return reqs

    @classmethod
    def get_requirement(cls, proj_id: str) -> Optional[ProjectRequirements]:
        data = cls._load_data()
        raw = data.get("requirements", {}).get(proj_id)
        if not raw:
            return None
        return ProjectRequirements.model_validate(raw)

    @classmethod
    def save_requirement(cls, req: ProjectRequirements):
        data = cls._load_data()
        data.setdefault("requirements", {})[req.id] = req.model_dump()
        cls._save_data(data)

    @classmethod
    def get_generated_project(cls, proj_id: str) -> Optional[GeneratedProject]:
        data = cls._load_data()
        raw = data.get("generated", {}).get(proj_id)
        if not raw:
            return None
        return GeneratedProject.model_validate(raw)

    @classmethod
    def save_generated_project(cls, proj: GeneratedProject):
        data = cls._load_data()
        data.setdefault("generated", {})[proj.id] = proj.model_dump()
        cls._save_data(data)
