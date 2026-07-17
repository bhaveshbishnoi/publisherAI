# PublisherAI — FastAPI & SQLite Backend Engine (`/backend`)

This directory contains the Python 3 **FastAPI + SQLAlchemy + SQLite** backend engine that orchestrates our 16 AI agents across a 22-step workflow pipeline to synthesize AdSense-ready websites.

---

## ⚡ Key Features

- **Async & Concurrency Ready**: Built using `FastAPI` and `SQLAlchemy` (`check_same_thread=False`) to handle concurrent project synthesis and real-time step streaming.
- **SQLite Storage (`publisherai.db`)**: Automatically initializes a localized database storing project requirements, generated HTML/CSS/JS/PHP files, agent logs, and AdSense readiness audit reports.
- **Multi-Agent Orchestrator (`app/engine.py`)**: Executes the 22-step workflow loop (`Requirement Collection`, `Research`, `Keyword Strategy`, `URL Architecture`, `HSL Design Tokens`, `Semantic HTML5`, `Responsive CSS Grid`, `Vanilla JS`, `PSR PHP API`, `Normalized MySQL Schema`, `Long-Form Content`, `Schema.org JSON-LD`, `WCAG Accessibility`, `Security Hardening`, and `14-Point AdSense Audit`).
- **Live AI Code Modifications**: Directly processes natural language prompts (`POST /api/projects/{id}/ai-modify`) to adjust colors (`--primary`), inject CAPTCHAs, or add new articles.
- **ZIP & `.htaccess` Export**: Compiles all generated assets into a production-ready `.zip` archive complete with Apache caching and security header rules.

---

## 🚀 How to Run Locally

### 1. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Start Uvicorn Server
```bash
python3 run.py
```
Or with auto-reload during development:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **OpenAPI Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns backend version, database engine status, and framework info. |
| `GET` | `/api/settings` | Retrieves current AI provider setting and masked API keys (`sk-••••`). |
| `POST` | `/api/settings` | Updates AI provider keys (`OpenAI`, `Gemini`, `Anthropic`) & model selection (`gpt-4o`). |
| `GET` | `/api/projects` | Lists all synthesized project profiles stored in `publisherai.db`. |
| `GET` | `/api/projects/{id}` | Returns requirements, generated files, logs, and AdSense audit for a specific project. |
| `POST` | `/api/projects` | Creates and stores a new project requirement specification. |
| `POST` | `/api/projects/{id}/generate` | Triggers the 16 AI agents to run all 22 steps and synthesize complete website code. |
| `POST` | `/api/projects/{id}/update-file` | Saves edits made inside the Studio's Code Explorer directly into the database. |
| `POST` | `/api/projects/{id}/ai-modify` | Executes AI AST/regex modifications based on user natural language prompts. |
| `GET` | `/api/projects/{id}/export-zip` | Downloads a bundled `.zip` file containing HTML/CSS/JS/PHP/SQL and `.htaccess`. |

---

## 📦 Directory Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py         # FastAPI application & route controllers
│   ├── models.py       # Pydantic data schemas & request/response validation
│   ├── db.py           # SQLite initialization & database access wrappers
│   ├── engine.py       # 16 AI Agents & 22-step orchestration pipeline
│   └── generators.py   # Synthesizes HTML, CSS, JS, PHP, and MySQL code strings
├── requirements.txt    # Python dependencies (`fastapi`, `uvicorn`, `pydantic`, `sqlalchemy`)
├── run.py              # Uvicorn entry point
└── publisherai.db      # SQLite database file (auto-generated, excluded from git)
```
