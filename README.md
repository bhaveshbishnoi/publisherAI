# PublisherAI 🚀
### Enterprise AI Agent Platform to Generate Production-Ready, AdSense-Ready Websites

**PublisherAI** (`AdSense Site Builder AI` / `MonetizeAI` / `SiteForge AI`) is an end-to-end, multi-agent AI software platform that synthesizes complete, high-performance, and AdSense-optimized websites using **HTML5, CSS3, Vanilla JavaScript, modular PSR PHP, and MySQL / SQLite**.

---

## ✨ Key Architectural Highlights

### 1. 🤖 16 Specialized AI Agents (`backend/app/engine.py`)
Our multi-agent architecture splits website synthesis across 16 domain-expert agents:
- **Requirement & Research Agents**: Validates target audience, domain syntax, and builds long-tail keyword & search intent strategies.
- **Planner & Architecture Agents**: Structures clean URL hierarchy (`/blog.html`, `/guide.html`), blog taxonomies, and XML sitemap generation (`sitemap.xml`).
- **Styling & UI Agents**: Synthesizes semantic `<header>`, `<nav>`, `<main>`, and `<article>` HTML5 with zero unnecessary `div` nesting, backed by HSL color design tokens (`--primary`, `--secondary`, `--accent`) and fluid CSS grid layouts.
- **Frontend Agent**: Writes high-performance Vanilla JavaScript (`main.js`) with client-side live search, TOC accordion, theme toggling, and mobile drawer navigation without external dependencies.
- **Backend & Database Agents**: Synthesizes clean PSR-inspired `index.php` routers, PDO wrapper classes with prepared statements against SQL injection, secure contact API endpoints (`api/contact.php`), and 3NF normalized MySQL database schemas (`database.sql`).
- **Content Agent**: Generates original, human-like **1,500–3,000 word hero guides** (`guide-main.html`) with checklists, structured FAQs (`details/summary`), and mandatory legal disclosure pages (`Privacy Policy with Google DoubleClick DART disclosure`, `Terms`, `Disclaimer`).
- **SEO & Performance Agents**: Injects `WebSite` and `Article` Schema.org `JSON-LD` inside `<head>`, constructs internal breadcrumbs, and enforces Core Web Vitals optimization.
- **Accessibility (`WCAG 2.1 AA`) & Security Agents**: Enforces ARIA attributes, skip-to-content links, keyboard focus indicators (`> 4.5:1` contrast), `htmlspecialchars()` sanitization, and CAPTCHA checks.
- **QA & AdSense Audit Agents**: Checks broken internal links and executes our **14-point technical & policy readiness evaluation**.

### 2. ⚡ FastAPI + SQLite Backend Engine (`/backend`)
- **Modern Python API**: Powered by `FastAPI` + `SQLAlchemy` + `SQLite` (`publisherai.db`), handling high-concurrency async generation with zero configuration overhead.
- **Interactive AI Modifications**: Intercepts user prompt commands via `/api/projects/{proj_id}/ai-modify` to apply AST and regex modifications directly to synthesized HTML, CSS, JS, and PHP files.
- **Live API Integration Options**: Manage live API keys (`OpenAI`, `Gemini`, `Anthropic`) and model selection (`gpt-4o`, `claude-3-5-sonnet`, `gemini-1.5-pro`) via `/api/settings`.

### 3. 🎨 Pure Light Theme Studio & Sandbox (`/frontend`)
- Built on **Next.js 15 App Router** + **Tailwind CSS v4** + **Lucide React**.
- **Visual Studio IDE**: Inspect synthesized files (`index.html`, `style.css`, `main.js`, `index.php`, `database.sql`), edit code in browser, and test layouts across **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)** sandbox viewports.
- **One-Click ZIP & `.htaccess` Export**: Download a full deployment package (`domain-bundle.zip`) bundled with pre-configured `.htaccess` rules for instant upload to `cPanel`, `public_html`, or `Nginx` VPS servers.

---

## 🛑 Important Google AdSense Policy Disclaimer
> **IMPORTANT GOOGLE POLICY DISCLAIMER:** *PublisherAI automatically generates your website with semantic code, mobile-first design, original high-word-count guides, and required legal pages (`Privacy Policy with DART disclosure`, `Terms`, `Disclaimer`). However, final AdSense monetization approval rests entirely with Google's independent review team. We never guarantee or promise AdSense approval.*

---

## 🛠️ Quick Start & Local Development

### Prerequisites
- **Node.js** (`v18.17.0` or higher) & **npm**
- **Python 3** (`v3.10` or higher)

### 1. One-Click Setup
We provide an automated setup script that initializes your Python virtual environment, installs backend dependencies, and installs Next.js frontend packages:

```bash
chmod +x setup.sh run.sh
./setup.sh
```

### 2. Launch Both Servers Concurrently
Run our master launch script to start both the **FastAPI Backend (`http://localhost:8000`)** and **Next.js Frontend Studio (`http://localhost:3000`)**:

```bash
./run.sh
```

- **Frontend Studio Dashboard**: [http://localhost:3000](http://localhost:3000)
- **FastAPI OpenAPI Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **FastAPI Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

Press `Ctrl+C` in your terminal to cleanly stop both servers.

---

## 📁 Repository Structure

```text
web-agent/
├── backend/                  # Python FastAPI Backend Engine
│   ├── app/
│   ├── main.py               # FastAPI Routes & Endpoint Handlers
│   ├── models.py             # Pydantic Schemas for Request/Response Validation
│   ├── db.py                 # SQLAlchemy SQLite Store (publisherai.db)
│   ├── engine.py             # 16 AI Agents & 22-Step Orchestrator
│   └── generators.py         # Synthesizes HTML, CSS, JS, PHP & MySQL code
│   ├── requirements.txt      # Python Dependencies (FastAPI, Uvicorn, SQLAlchemy)
│   └── run.py                # Local Uvicorn Runner (Port 8000)
│
├── frontend/                 # Next.js 15 Light Theme Studio & Dashboard
│   ├── src/
│   │   ├── app/              # App Router Pages (`page.tsx`, `project/[id]/page.tsx`)
│   │   ├── components/       # UI Components (`studio/`, `audit/`, `export/`, `wizard/`)
│   │   └── lib/              # API Client wrappers & shared TypeScript types
│   ├── package.json          # Frontend Dependencies (Next.js 15, Tailwind, JSZip)
│   └── tsconfig.json         # TypeScript Configuration
│
├── setup.sh                  # Automated Full-Stack Setup & VirtualEnv Builder
├── run.sh                    # Concurrently Launches Backend & Frontend
├── .gitignore                # Root Git Ignore Configuration
└── README.md                 # Project Documentation
```

---

## 🔒 Security & Best Practices
- **No API Keys in Git**: `.gitignore` is strictly configured to exclude `.env` files and `publisherai.db`.
- **Prepared Statements**: All PHP queries generated by PublisherAI utilize `PDO` with parameterized queries to prevent SQL injection.
- **Input Sanitization**: Contact form endpoints incorporate `htmlspecialchars()` against XSS attacks and built-in math CAPTCHA verification.

---

## 📄 License
PublisherAI is developed as an advanced agentic software architecture demonstration. All generated website code is owned by the publisher.
