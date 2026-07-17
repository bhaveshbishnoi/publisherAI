import io
import zipfile
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from app.models import (
    ProjectRequirements, GeneratedProject, FileUpdateRequest, AiModifyRequest,
    SettingsUpdateRequest, SettingsResponse
)
from app.db import DatabaseStore, init_db
from app.engine import run_pipeline

app = FastAPI(
    title="PublisherAI FastAPI Backend (SQLite Powered)",
    description="Enterprise AI Agent platform generating production-ready, AdSense-ready websites using SQLite database storage and live API integrations.",
    version="2.5.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "version": "2.5.0",
        "engine": "PublisherAI Multi-Agent FastAPI + SQLite Engine",
        "database": "SQLite (publisherai.db)",
        "framework": "FastAPI (Python 3)"
    }

def mask_key(key: str) -> str:
    if not key or len(key) < 8:
        return ""
    return key[:4] + "••••••••" + key[-4:]

@app.get("/api/settings", response_model=SettingsResponse)
def get_settings():
    raw = DatabaseStore.get_settings()
    return SettingsResponse(
        provider=raw.get("provider", "hybrid"),
        openai_api_key_masked=mask_key(raw.get("openai_api_key", "")),
        gemini_api_key_masked=mask_key(raw.get("gemini_api_key", "")),
        anthropic_api_key_masked=mask_key(raw.get("anthropic_api_key", "")),
        model_name=raw.get("model_name", "gpt-4o")
    )

@app.post("/api/settings", response_model=Dict[str, Any])
def update_settings(payload: SettingsUpdateRequest):
    current = DatabaseStore.get_settings()
    updated = {
        "provider": payload.provider,
        "model_name": payload.model_name or current.get("model_name", "gpt-4o"),
        "openai_api_key": payload.openai_api_key if payload.openai_api_key is not None and not payload.openai_api_key.startswith("sk-••••") else current.get("openai_api_key", ""),
        "gemini_api_key": payload.gemini_api_key if payload.gemini_api_key is not None and not payload.gemini_api_key.startswith("AIza••••") else current.get("gemini_api_key", ""),
        "anthropic_api_key": payload.anthropic_api_key if payload.anthropic_api_key is not None and not payload.anthropic_api_key.startswith("sk-ant••••") else current.get("anthropic_api_key", "")
    }
    DatabaseStore.save_settings(updated)
    return {"status": "success", "message": "Settings saved to SQLite database successfully"}

@app.get("/api/projects", response_model=Dict[str, Any])
def list_projects():
    projects = DatabaseStore.get_all_requirements()
    return {"status": "success", "data": projects}

@app.get("/api/projects/{proj_id}", response_model=Dict[str, Any])
def get_project(proj_id: str):
    req = DatabaseStore.get_requirement(proj_id)
    if not req:
        raise HTTPException(status_code=404, detail="Project not found in SQLite database")
    generated = DatabaseStore.get_generated_project(proj_id)
    return {
        "status": "success",
        "data": {
            "requirements": req,
            "generated": generated
        }
    }

@app.post("/api/projects", response_model=Dict[str, Any], status_code=201)
def create_project(req: ProjectRequirements):
    DatabaseStore.save_requirement(req)
    return {"status": "success", "data": req}

@app.post("/api/projects/{proj_id}/generate", response_model=Dict[str, Any])
def generate_project(proj_id: str, payload: Optional[ProjectRequirements] = None):
    req = DatabaseStore.get_requirement(proj_id)
    if not req and payload:
        req = payload
        DatabaseStore.save_requirement(req)
    if not req:
        raise HTTPException(status_code=404, detail="Project requirements not found")

    settings = DatabaseStore.get_settings()
    generated = run_pipeline(req, settings=settings)
    DatabaseStore.save_generated_project(generated)
    return {"status": "success", "data": generated}

@app.post("/api/projects/{proj_id}/update-file", response_model=Dict[str, Any])
def update_file(proj_id: str, update_req: FileUpdateRequest):
    generated = DatabaseStore.get_generated_project(proj_id)
    if not generated:
        raise HTTPException(status_code=404, detail="Generated project not found in SQLite database")

    updated_files = []
    for f in generated.files:
        if f.path == update_req.path:
            f.content = update_req.content
            f.sizeBytes = len(update_req.content.encode("utf-8"))
        updated_files.append(f)

    generated.files = updated_files
    DatabaseStore.save_generated_project(generated)
    return {"status": "success", "data": generated}

@app.post("/api/projects/{proj_id}/ai-modify", response_model=Dict[str, Any])
def ai_modify(proj_id: str, modify_req: AiModifyRequest):
    generated = DatabaseStore.get_generated_project(proj_id)
    if not generated:
        raise HTTPException(status_code=404, detail="Generated project not found in SQLite database")

    prompt = modify_req.prompt.lower()
    ai_reply = "Modification successfully processed by PublisherAI Agent."

    for f in generated.files:
        if "emerald" in prompt and f.path.endswith(".css"):
            import re
            f.content = re.sub(r'--primary: [^;]+;', '--primary: #10b981;', f.content)
            ai_reply = "✓ Updated `--primary` custom property to `#10b981` (Emerald Green) in `style.css`."
        elif "captcha" in prompt and f.path == "api/contact.php":
            f.content = f.content.replace(
                "$message = trim($_POST['message'] ?? '');",
                "$message = trim($_POST['message'] ?? '');\n\n// Math CAPTCHA validation\n$captcha = trim($_POST['captcha'] ?? '');\nif ($captcha !== '7') {\n    http_response_code(400);\n    echo json_encode(['status' => 'error', 'message' => 'Please solve CAPTCHA correctly.']);\n    exit;\n}"
            )
            ai_reply = "✓ Added Math CAPTCHA validation check to `api/contact.php`."

    DatabaseStore.save_generated_project(generated)
    return {"status": "success", "reply": ai_reply, "data": generated}

@app.get("/api/projects/{proj_id}/export-zip")
def export_zip(proj_id: str):
    generated = DatabaseStore.get_generated_project(proj_id)
    req = DatabaseStore.get_requirement(proj_id)
    if not generated or not req:
        raise HTTPException(status_code=404, detail="Project code not found for zip export")

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        folder_name = req.domain.replace(".", "-")
        for f in generated.files:
            zip_file.writestr(f"{folder_name}/{f.path}", f.content)

        htaccess_code = """<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# Security & Caching Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    <FilesMatch "\\.(css|js|webp|svg|png|jpg)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
</IfModule>"""
        zip_file.writestr(f"{folder_name}/.htaccess", htaccess_code)

    zip_buffer.seek(0)
    filename = f"{req.domain.replace('.', '-')}-bundle.zip"
    return Response(
        content=zip_buffer.getvalue(),
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
