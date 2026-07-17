from datetime import datetime
from app.models import ProjectRequirements, GeneratedFile

def generate_css_bundle(req: ProjectRequirements) -> GeneratedFile:
    primary = req.colorPreference.primary if req.colorPreference else "#f97316"
    secondary = req.colorPreference.secondary if req.colorPreference else "#1e293b"
    accent = req.colorPreference.accent if req.colorPreference else "#eab308"
    font_head = req.typography.heading if req.typography else "Outfit"
    font_body = req.typography.body if req.typography else "Inter"

    css_content = f""":root {{
  --primary: {primary};
  --secondary: {secondary};
  --accent: {accent};
  --font-heading: '{font_head}', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: '{font_body}', -apple-system, BlinkMacSystemFont, sans-serif;
  --bg-main: #060913;
  --bg-card: #0d1224;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.08);
}}

[data-theme="light"] {{
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #475569;
  --border-color: rgba(0, 0, 0, 0.1);
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  font-family: var(--font-body);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}}

h1, h2, h3, h4 {{
  font-family: var(--font-heading);
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.2;
}}

.container {{
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}}

.site-header {{
  background: rgba(6, 9, 19, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}}

.nav-wrapper {{
  display: flex;
  align-items: center;
  justify-content: space-between;
}}

.brand-logo {{
  font-size: 1.5rem;
  font-weight: 900;
  text-decoration: none;
  color: var(--text-main);
}}

.brand-logo span {{
  color: var(--primary);
}}

.nav-links {{
  display: flex;
  list-style: none;
  gap: 2rem;
}}

.nav-links a {{
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}}

.nav-links a:hover {{
  color: var(--primary);
}}

.hero-section {{
  padding: 5rem 0;
  text-align: center;
  background: linear-gradient(180deg, rgba(249,115,22,0.08) 0%, transparent 100%);
}}

.hero-title {{
  font-size: 3.2rem;
  margin-bottom: 1.2rem;
}}

.hero-subtitle {{
  font-size: 1.25rem;
  color: var(--text-muted);
  max-width: 700px;
  margin: 0 auto 2.5rem;
}}

.btn {{
  display: inline-block;
  padding: 0.85rem 1.8rem;
  border-radius: 9999px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}}

.btn-primary {{
  background: var(--primary);
  color: #fff;
  box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4);
}}

.btn-primary:hover {{
  transform: translateY(-2px);
}}

.grid-cards {{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}}

.glass-card {{
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 1.25rem;
  padding: 1.8rem;
  transition: border-color 0.3s, transform 0.3s;
}}

.glass-card:hover {{
  border-color: var(--primary);
  transform: translateY(-4px);
}}

.ad-slot-container {{
  margin: 2.5rem 0;
  padding: 1.5rem;
  border: 1px dashed rgba(255,255,255,0.15);
  border-radius: 1rem;
  text-align: center;
  background: rgba(0,0,0,0.2);
}}

.ad-label {{
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.5rem;
}}

.site-footer {{
  border-top: 1px solid var(--border-color);
  padding: 3rem 0;
  margin-top: 5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}}

@media (max-width: 768px) {{
  .hero-title {{ font-size: 2.2rem; }}
  .nav-links {{ display: none; }}
}}"""
    return GeneratedFile(path="assets/css/style.css", content=css_content, sizeBytes=len(css_content.encode("utf-8")), language="css")

def generate_js_bundle(req: ProjectRequirements) -> GeneratedFile:
    js_content = f"""/**
 * {req.name} ({req.domain}) - Core Frontend Engine
 * AdSense Publisher Readiness & Interactive UI Engine
 */
document.addEventListener('DOMContentLoaded', () => {{
  // Theme management
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {{
    themeToggle.addEventListener('click', () => {{
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }});
  }}

  // Live client-side search engine
  const searchInput = document.getElementById('search-input');
  if (searchInput) {{
    searchInput.addEventListener('input', (e) => {{
      const query = e.target.value.toLowerCase().trim();
      const articles = document.querySelectorAll('.article-card');
      articles.forEach(article => {{
        const title = article.getAttribute('data-title') || '';
        const desc = article.getAttribute('data-desc') || '';
        if (title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)) {{
          article.style.display = 'block';
        }} else {{
          article.style.display = 'none';
        }}
      }});
    }});
  }}

  // Cookie Consent GDPR/CCPA Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  if (cookieBanner && !localStorage.getItem('cookie_accepted')) {{
    cookieBanner.style.display = 'flex';
  }}
  if (acceptBtn) {{
    acceptBtn.addEventListener('click', () => {{
      localStorage.setItem('cookie_accepted', 'true');
      if (cookieBanner) cookieBanner.style.display = 'none';
    }});
  }}
}});"""
    return GeneratedFile(path="assets/js/main.js", content=js_content, sizeBytes=len(js_content.encode("utf-8")), language="javascript")

def generate_html_page(req: ProjectRequirements, page_slug: str, page_title: str, is_home: bool = False) -> GeneratedFile:
    home_active = 'style="color: var(--primary);"' if is_home else ''
    blog_active = 'style="color: var(--primary);"' if page_slug == 'blog' else ''

    content_body = ""
    if is_home:
        content_body = f"""
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Your Definitive Guide to {req.primaryKeyword}</h1>
        <p class="hero-subtitle">
          In-depth research, verified advice, and comprehensive guides curated for {req.primaryAudience}.
        </p>
        <div>
          <a href="blog.html" class="btn btn-primary">Explore All Guides</a>
        </div>
      </div>
    </section>

    <!-- AdSense Header Banner Slot -->
    <div class="container">
      <div class="ad-slot-container" aria-label="Advertisement">
        <span class="ad-label">Advertisement (Responsive AdSense Slot #1)</span>
        <div style="min-height: 90px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 0.5rem;">
          <code style="font-size: 0.85rem; color: var(--text-muted);">data-ad-client="ca-pub-XXXXXXXXXXXX" data-ad-slot="1029384756"</code>
        </div>
      </div>
    </div>

    <!-- Featured Guides & Search -->
    <section class="container" style="margin: 3rem auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <h2>Comprehensive Guides & Analysis</h2>
        <input type="search" id="search-input" placeholder="Search guides by keyword..." style="padding: 0.75rem 1.25rem; border-radius: 999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); width: 300px;">
      </div>

      <div class="grid-cards">
        <article class="glass-card article-card" data-title="{req.primaryKeyword} Essentials" data-desc="Complete breakdown and step-by-step checklist.">
          <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase;">Featured Guide</span>
          <h3 style="margin: 0.75rem 0;">{req.primaryKeyword}: Complete 2026 Handbook</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
            Discover expert strategies, critical safety measures, and actionable checklists tailored specifically for {req.country}.
          </p>
          <a href="guide-main.html" style="color: var(--primary); font-weight: 700; text-decoration: none;">Read 2,500+ Word Guide →</a>
        </article>

        { "".join([f'''<article class="glass-card article-card" data-title="{kw}" data-desc="Complete breakdown of {kw}.">
          <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase;">Analysis Guide</span>
          <h3 style="margin: 0.75rem 0;">{kw}: What You Must Know</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
            Detailed breakdown covering key concepts, common mistakes, and expert insights for practitioners.
          </p>
          <a href="guide-{i+1}.html" style="color: var(--primary); font-weight: 700; text-decoration: none;">Read Full Article →</a>
        </article>''' for i, kw in enumerate(req.secondaryKeywords[:5])]) }
      </div>
    </section>
"""
    elif page_slug == "blog":
        content_body = f"""
    <section class="container" style="padding: 4rem 1.5rem;">
      <h1>All Published Guides & Articles</h1>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Browse our complete archive on {req.primaryKeyword}</p>
      <div class="grid-cards" style="margin-top: 2.5rem;">
        { "".join([f'''<article class="glass-card">
          <h3 style="margin-bottom: 0.75rem;">{kw} Guide</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.2rem;">Detailed handbook with FAQs and verified strategies.</p>
          <a href="guide-{i+1}.html" style="color: var(--primary); font-weight: 700; text-decoration: none;">Read Guide →</a>
        </article>''' for i, kw in enumerate(req.secondaryKeywords)]) }
      </div>
    </section>
"""
    elif page_slug == "privacy-policy":
        content_body = f"""
    <section class="container" style="padding: 4rem 1.5rem; max-width: 800px;">
      <h1>Privacy Policy & Google AdSense Disclosure</h1>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Last updated: {req.createdAt[:10] if req.createdAt else '2026-07-17'}</p>
      
      <div class="glass-card" style="margin-top: 2rem; line-height: 1.8;">
        <h2>1. Information We Collect</h2>
        <p>We collect standard visitor analytics, browser type, device information, and IP addresses for diagnostic and security purposes when visiting {req.domain}.</p>

        <h2 style="margin-top: 1.5rem;">2. Google AdSense & DoubleClick DART Cookie Disclosure</h2>
        <p>Google, as a third-party vendor, uses cookies to serve ads on {req.name}. Google's use of the DART cookie enables it to serve ads to users based on their visit to {req.domain} and other sites on the Internet.</p>
        <p>Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" style="color: var(--primary);">policies.google.com/technologies/ads</a>.</p>

        <h2 style="margin-top: 1.5rem;">3. Contact Us</h2>
        <p>If you have questions regarding this privacy statement, contact us via our official contact form.</p>
      </div>
    </section>
"""
    else:
        content_body = f"""
    <article class="container" style="padding: 4rem 1.5rem; max-width: 850px;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
        <a href="index.html" style="color: var(--primary); text-decoration: none;">Home</a> / 
        <a href="blog.html" style="color: var(--primary); text-decoration: none;">Guides</a> / 
        <span>{page_title}</span>
      </nav>

      <h1>{page_title}</h1>
      <p style="color: var(--text-muted); margin: 1rem 0 2rem; font-size: 1.1rem;">
        Comprehensive, research-backed guide curated for {req.primaryAudience}.
      </p>

      <div class="ad-slot-container" style="margin: 2rem 0;">
        <span class="ad-label">Advertisement (In-Article Responsive Ad Slot)</span>
        <div style="min-height: 90px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 0.5rem;">
          <code style="font-size: 0.85rem; color: var(--text-muted);">data-ad-client="ca-pub-XXXXXXXXXXXX" data-ad-slot="5647382910"</code>
        </div>
      </div>

      <div class="glass-card" style="line-height: 1.8; font-size: 1.05rem;">
        <h2>Core Concepts & Framework</h2>
        <p>Understanding {req.primaryKeyword} requires examining underlying principles, industry standards, and empirical data collected across {req.country}.</p>
        <p style="margin-top: 1rem;">When analyzing key indicators, specialists prioritize structural integrity, verified data sources, and continuous optimization against baseline benchmarks.</p>

        <h2 style="margin-top: 2rem;">Actionable Implementation Checklist</h2>
        <ul style="margin: 1rem 0 1.5rem 2rem; space-y: 0.5rem;">
          <li>Verify all baseline requirements before deploying initial configurations.</li>
          <li>Enforce strict security validation protocols across interactive form elements.</li>
          <li>Monitor Core Web Vitals (LCP, INP, CLS) weekly using Google PageSpeed Insights.</li>
          <li>Ensure high contrast typography and keyboard accessibility compliance.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <details style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 0.5rem;">
          <summary style="font-weight: 700; cursor: pointer;">Is this methodology applicable globally?</summary>
          <p style="margin-top: 0.5rem; color: var(--text-muted);">Yes, while tailored for {req.country}, the core principles apply across universal industry standards.</p>
        </details>
      </div>
    </article>
"""

    html_full = f"""<!DOCTYPE html>
<html lang="{req.language[:2].lower() if req.language else 'en'}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page_title} | {req.name}</title>
  <meta name="description" content="Comprehensive guide and analysis on {req.primaryKeyword} for {req.primaryAudience}.">
  <link rel="stylesheet" href="assets/css/style.css">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "{'WebSite' if is_home else 'Article'}",
    "name": "{page_title}",
    "url": "https://{req.domain}/{page_slug}.html",
    "description": "In-depth guide on {req.primaryKeyword}"
  }}
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrapper">
      <a href="index.html" class="brand-logo">{req.name[:req.name.find(' ')] if ' ' in req.name else req.name}<span>{req.name[req.name.find(' '):] if ' ' in req.name else ''}</span></a>
      <ul class="nav-links">
        <li><a href="index.html" {home_active}>Home</a></li>
        <li><a href="blog.html" {blog_active}>Guides</a></li>
        <li><a href="privacy-policy.html">Privacy</a></li>
        <li><button id="theme-toggle" style="background:none; border:1px solid var(--border-color); color:var(--text-main); padding:0.35rem 0.75rem; border-radius:99px; cursor:pointer;">Theme</button></li>
      </ul>
    </div>
  </header>

  <main>
{content_body}
  </main>

  <!-- GDPR Cookie Consent Banner -->
  <div id="cookie-banner" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#0d1224; border-top:1px solid var(--primary); padding:1rem; z-index:999; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
    <span style="font-size:0.85rem; color:#cbd5e1;">We use cookies including DoubleClick DART cookies to serve personalized ads and analyze traffic.</span>
    <button id="accept-cookies" class="btn btn-primary" style="padding:0.5rem 1.25rem; font-size:0.8rem;">Accept Cookies</button>
  </div>

  <footer class="site-footer">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <div>© {datetime.utcnow().year} {req.name}. All rights reserved.</div>
      <div style="display:flex; gap:1.5rem;">
        <a href="privacy-policy.html" style="color:var(--text-muted); text-decoration:none;">Privacy Policy</a>
        <a href="terms.html" style="color:var(--text-muted); text-decoration:none;">Terms of Service</a>
        <a href="disclaimer.html" style="color:var(--text-muted); text-decoration:none;">Disclaimer</a>
      </div>
    </div>
  </footer>
  <script src="assets/js/main.js"></script>
</body>
</html>"""
    filename = f"{page_slug}.html" if page_slug != "index" else "index.html"
    return GeneratedFile(path=filename, content=html_full, sizeBytes=len(html_full.encode("utf-8")), language="html")

def generate_php_backend(req: ProjectRequirements) -> GeneratedFile:
    php_content = f"""<?php
/**
 * {req.name} ({req.domain}) - PSR-Compliant Backend API & Router
 * Enforces secure PDO wrappers, HTML sanitization, and contact submission APIs.
 */
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// Database Connection Wrapper (PDO)
function getDbConnection(): PDO {{
    $host = getenv('DB_HOST') ?: 'localhost';
    $dbname = getenv('DB_NAME') ?: '{req.domain.replace('.', '_')}_db';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';

    $dsn = "mysql:host={{$host}};dbname={{$dbname}};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {{
        return new PDO($dsn, $user, $pass, $options);
    }} catch (PDOException $e) {{
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
        exit;
    }}
}}

// Contact Submission API Route
if ($_SERVER['REQUEST_METHOD'] === 'POST') {{
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

    if (!$name || !$email || !$message) {{
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please provide valid name, email, and message.']);
        exit;
    }}

    // Example PDO Insertion with Prepared Statements
    // $db = getDbConnection();
    // $stmt = $db->prepare('INSERT INTO contact_submissions (name, email, message, created_at) VALUES (?, ?, ?, NOW())');
    // $stmt->execute([$name, $email, $message]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for contacting ' . htmlspecialchars('{req.name}') . '. We have received your inquiry.'
    ]);
    exit;
}}

echo json_encode(['status' => 'ok', 'service' => '{req.name} API endpoint operational.']);
"""
    return GeneratedFile(path="api/contact.php", content=php_content, sizeBytes=len(php_content.encode("utf-8")), language="php")

def generate_sql_schema(req: ProjectRequirements) -> GeneratedFile:
    sql_content = f"""-- {req.name} ({req.domain}) MySQL Relational Schema (3NF Normalized)
-- Synthesizing articles, contact submissions, and newsletter subscriptions

CREATE DATABASE IF NOT EXISTS `{req.domain.replace('.', '_')}_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `{req.domain.replace('.', '_')}_db`;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('draft', 'published') DEFAULT 'published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('active', 'unsubscribed') DEFAULT 'active',
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial seed article
INSERT INTO `articles` (`slug`, `title`, `content`) VALUES
('guide-main', '{req.primaryKeyword}: Complete 2026 Handbook', 'Comprehensive guide and analysis curated for {req.primaryAudience}.');
"""
    return GeneratedFile(path="database.sql", content=sql_content, sizeBytes=len(sql_content.encode("utf-8")), language="sql")
