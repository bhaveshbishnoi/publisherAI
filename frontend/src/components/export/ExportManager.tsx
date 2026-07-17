'use client';

import React, { useState } from 'react';
import { GeneratedFile, ProjectRequirements } from '@/lib/engine/types';
import { Download, Package, Database, Server, CheckCircle2, Copy, Check, Terminal, ShieldCheck } from 'lucide-react';
import JSZip from 'jszip';

interface ExportManagerProps {
  files: GeneratedFile[];
  requirements: ProjectRequirements;
}

export default function ExportManager({ files, requirements }: ExportManagerProps) {
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);
  const [copiedHtaccess, setCopiedHtaccess] = useState<boolean>(false);

  const htaccessCode = `<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# Security Headers & Cache Control per PublisherAI guidelines
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    <FilesMatch "\\.(css|js|webp|svg|png|jpg)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
</IfModule>`;

  const handleDownloadZip = async () => {
    if (files.length === 0 || isZipping) return;
    setIsZipping(true);
    setZipSuccess(false);

    try {
      const zip = new JSZip();
      const rootFolder = zip.folder(requirements.domain.replace(/[^a-zA-Z0-9]/g, '-')) || zip;

      // Add all generated files to ZIP
      files.forEach((file) => {
        rootFolder.file(file.path, file.content);
      });

      // Add .htaccess automatically for Apache/cPanel users
      rootFolder.file('.htaccess', htaccessCode);

      // Generate blob and trigger download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${requirements.domain.replace(/[^a-zA-Z0-9]/g, '-')}-publisher-ai-bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (e) {
      console.error('ZIP compilation error:', e);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSql = () => {
    const sqlFile = files.find((f) => f.path.endsWith('.sql'));
    if (!sqlFile) return;
    const blob = new Blob([sqlFile.content], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requirements.domain.replace(/[^a-zA-Z0-9]/g, '_')}_schema.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyHtaccess = () => {
    navigator.clipboard.writeText(htaccessCode);
    setCopiedHtaccess(true);
    setTimeout(() => setCopiedHtaccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: One-Click Production Package Download */}
      <div className="rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-[#0d1224] p-6 sm:p-8 shadow-2xl relative overflow-hidden glow-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 text-xs font-bold text-indigo-300">
              📦 Production Deployment Ready
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Download Complete Website Package (.ZIP)
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Bundle contains all {files.length} synthesized HTML5, CSS3, Vanilla JS, and PSR-compliant PHP files, plus auto-generated `.htaccess` rules ready for instant drag-and-drop hosting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping || files.length === 0}
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-emerald-500/25 hover:scale-[1.03] transition-all disabled:opacity-50"
            >
              <Package className="h-5 w-5 stroke-[2.5]" />
              <span>{isZipping ? 'Bundling ZIP Package...' : 'Download Full ZIP Package'}</span>
            </button>

            <button
              onClick={handleDownloadSql}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-3.5 text-xs font-bold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
            >
              <Database className="h-4 w-4 text-emerald-400" />
              <span>Export SQL Schema</span>
            </button>
          </div>
        </div>

        {zipSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>✓ ZIP Package built and downloaded successfully! Extract and upload directly to public_html or cPanel.</span>
          </div>
        )}
      </div>

      {/* Deployment & Hosting Setup Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Apache & cPanel Guide */}
        <div className="rounded-2xl border border-border/80 bg-[#080d1a] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-3 text-white font-bold text-sm">
              <Server className="h-4 w-4 text-indigo-400" />
              Apache / cPanel / Shared Hosting Guide
            </div>

            <ol className="list-decimal list-inside space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li>Log in to your hosting provider (Hostinger, Bluehost, SiteGround, cPanel).</li>
              <li>Navigate to your domain&apos;s <code className="text-indigo-400 bg-black/50 px-1.5 py-0.5 rounded">public_html</code> or root directory via File Manager.</li>
              <li>Upload and extract <strong className="text-white">{requirements.domain}-bundle.zip</strong>.</li>
              <li>Ensure PHP version is set to <strong className="text-emerald-400">PHP 8.0+</strong> in MultiPHP Manager.</li>
              <li>If using MySQL features, import <code className="text-emerald-400 bg-black/50 px-1.5 py-0.5 rounded">database.sql</code> into phpMyAdmin and update credentials in <code className="text-purple-400 bg-black/50 px-1.5 py-0.5 rounded">config/database.php</code>.</li>
            </ol>
          </div>

          <div className="mt-5 pt-3 border-t border-border/60">
            <div className="flex items-center justify-between mb-1.5 text-xs text-slate-400 font-mono">
              <span>Auto-included .htaccess rules:</span>
              <button onClick={handleCopyHtaccess} className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                {copiedHtaccess ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedHtaccess ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl border border-slate-800 bg-black/70 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-36">
              <code>{htaccessCode}</code>
            </pre>
          </div>
        </div>

        {/* Nginx & Modern Cloud Hosting Guide */}
        <div className="rounded-2xl border border-border/80 bg-[#080d1a] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-3 text-white font-bold text-sm">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Nginx / VPS / Docker Hosting Configuration
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              For high-traffic Nginx or VPS servers (DigitalOcean, AWS EC2, Linode), use the following location block to support clean URLs and fast AdSense asset caching:
            </p>

            <pre className="rounded-xl border border-slate-800 bg-black/70 p-3.5 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <code>{`server {
    listen 80;
    server_name ${requirements.domain} www.${requirements.domain};
    root /var/www/${requirements.domain};
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }

    location ~* \\.(css|js|webp|svg|png)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}`}</code>
            </pre>
          </div>

          <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-indigo-300 font-semibold">SSL Verification Requirement:</strong> Google AdSense mandates valid HTTPS encryption (`Let&apos;s Encrypt` or free Cloudflare SSL) before verifying ad tag ownership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
