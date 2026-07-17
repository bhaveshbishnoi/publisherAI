import io
import zipfile
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from app.models import (
    ProjectRequirements, GeneratedProject, FileUpdateRequest, AiModifyRequest
)
from app.storage import ProjectStorage
from app.engine import run_pipeline

app = FastAPI(
    title="PublisherAI FastAPI Backend",
    description="AI Agent platform for generating production-ready, AdSense-ready websites using HTML5, CSS3, Vanilla JS, PHP, and MySQL.",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "version": "2.4.0",
        "engine": "PublisherAI Multi-Agent FastAPI Engine",
        "framework": "FastAPI (Python 3)"
    }

@app.get("/api/projects", response_model=Dict[str, Any])
def list_projects():
    projects = ProjectStorage.get_all_requirements()
    return {"status": "success", "data": projects}

@app.get("/api/projects/{proj_id}", response_model=Dict[str, Any])
def get_project(proj_id: str):
    req = ProjectStorage.get_requirement(proj_id)
    if not req:
        raise HTTPException(status_code=404, detail="Project not found")
    generated = ProjectStorage.get_generated_project(proj_id)
    return {
        "status": "success",
        "data": {
            "requirements": req,
            "generated": generated
        }
    }

@app.post("/api/projects", response_model=Dict[str, Any], status_code=201)
def create_project(req: ProjectRequirements):
    ProjectStorage.save_requirement(req)
    return {"status": "success", "data": req}

@app.post("/api/projects/{proj_id}/generate", response_model=Dict[str, Any])
def generate_project(proj_id: str, payload: Optional[ProjectRequirements] = None):
    req = ProjectStorage.get_requirement(proj_id)
    if not req and payload:
        req = payload
        ProjectStorage.save_requirement(req)
    if not req:
        raise HTTPException(status_code=404, detail="Project requirements not found")

    generated = run_pipeline(req)
    ProjectStorage.save_generated_project(generated)
    return {"status": "success", "data": generated}

@app.post("/api/projects/{proj_id}/update-file", response_model=Dict[str, Any])
def update_file(proj_id: str, update_req: FileUpdateRequest):
    generated = ProjectStorage.get_generated_project(proj_id)
    if not generated:
        raise HTTPException(status_code=404, detail="Generated project not found")

    updated_files = []
    for f in generated.files:
        if f.path == update_req.path:
            f.content = update_req.content
            f.sizeBytes = len(update_req.content.encode("utf-8"))
        updated_files.append(f)

    generated.files = updated_files
    ProjectStorage.save_generated_project(generated)
    return {"status": "success", "data": generated}

@app.post("/api/projects/{proj_id}/ai-modify", response_model=Dict[str, Any])
def ai_modify(proj_id: str, modify_req: AiModifyRequest):
    generated = ProjectStorage.get_generated_project(proj_id)
    if not generated:
        raise HTTPException(status_code=404, detail="Generated project not found")

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

    ProjectStorage.save_generated_project(generated)
    return {"status": "success", "reply": ai_reply, "data": generated}

@app.get("/api/projects/{proj_id}/export-zip")
def export_zip(proj_id: str):
    generated = ProjectStorage.get_generated_project(proj_id)
    req = ProjectStorage.get_requirement(proj_id)
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
