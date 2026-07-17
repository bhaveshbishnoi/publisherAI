# PublisherAI — Next.js 15 Light Theme Studio & Dashboard (`/frontend`)

This directory houses the **Next.js 15 App Router** frontend studio and interactive workspace for **PublisherAI**. It is crafted with pure high-contrast **Light Theme ("Light Studio")** aesthetics, responsive design, and seamless live API connections to our FastAPI + SQLite backend.

---

## ✨ Key UI & Studio Components

- **Centered Studio Dashboard (`src/app/page.tsx`)**: Clean white cards (`bg-white border-slate-200 text-slate-900`), subtle slate shadows, high legibility font hierarchy (`Outfit` + `Inter`), and live SQLite database connectivity badges.
- **Live Pipeline Tracker (`src/components/studio/LivePipelineTracker.tsx`)**: Visual animated timeline of our 22 workflow steps (`Requirement Collection`, `Research`, `Keyword Strategy`, `Architecture`, `Design Tokens`, `HTML5/CSS3/Vanilla JS Synthesis`, `PHP Backend API`, `MySQL Schema`, `1,500+ Word Content`, `JSON-LD Schema`, `Accessibility`, `Security`, `Legal Pages`, `QA`, and `AdSense Audit`).
- **Code Explorer IDE (`src/components/studio/CodeExplorer.tsx`)**: A file tree displaying all synthesized files (`index.html`, `style.css`, `main.js`, `index.php`, `database.sql`, `privacy-policy.html`, `sitemap.xml`) with in-browser code editing (`[Edit Code]` & `[Save Changes]`) backed by real-time API persistence.
- **Responsive Sandbox Preview (`src/components/studio/ResponsivePreview.tsx`)**: Dynamically injects synthesized styles and scripts into a sandboxed `iframe` to preview exact layouts across **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)** viewports.
- **Visual AI Chat Assistant (`src/components/studio/VisualAIEditor.tsx`)**: Allows publishers to issue natural language AST/code modification commands (`"Change primary color to Emerald Green"`, `"Add Math CAPTCHA to api/contact.php"`) with immediate feedback.
- **AdSense Readiness Audit Dashboard (`src/components/audit/AdSenseAuditDashboard.tsx`)**: Displays an automated 0–100 score gauge with itemized pass/warning/fail checks and our prominent mandatory Google AdSense policy disclaimer.
- **One-Click Package Exporter (`src/components/export/ExportManager.tsx`)**: Bundles and downloads all synthesized HTML5, CSS3, JS, PHP, and SQL assets into a `.zip` archive alongside auto-generated **Apache `.htaccess`** security and caching rules.

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Ensure the FastAPI backend is running on `http://localhost:8000` so that live API synchronization works properly.

### 3. Build for Production
```bash
npm run build
```

---

## 📦 Directory Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Outfit & Inter Google Fonts
│   │   ├── page.tsx           # Centered Studio Dashboard & Project Selector
│   │   ├── globals.css        # Tailwind CSS v4 styles & custom HSL tokens
│   │   └── project/[id]/
│   │       └── page.tsx       # Interactive Multi-Tab Project Studio
│   ├── components/
│   │   ├── studio/            # Code Explorer, Live Pipeline Tracker, Sandbox & AI Editor
│   │   ├── audit/             # AdSense Audit Dashboard & Itemized Checks
│   │   ├── export/            # ZIP / SQL Exporter & Hosting Guides (`ExportManager.tsx`)
│   │   └── wizard/            # 4-Step Requirement Collection Wizard (`RequirementWizard.tsx`)
│   └── lib/
│       └── engine/
│           ├── api.ts         # FastAPI Client Wrappers (`fetch` to `http://localhost:8000/api`)
│           ├── types.ts       # Shared TypeScript interfaces & Pydantic mirrors
│           └── presets.ts     # Pre-configured Starter Presets (`Utsav India`, `FinTech Pulse`)
├── public/                    # Static Assets
├── package.json               # Dependencies (`next`, `react`, `jszip`, `lucide-react`)
└── tsconfig.json              # TypeScript Configuration
```
