'use client';

import React, { useState, useMemo } from 'react';
import { GeneratedFile } from '@/lib/engine/types';
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface ResponsivePreviewProps {
  files: GeneratedFile[];
}

export default function ResponsivePreview({ files }: ResponsivePreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedPagePath, setSelectedPagePath] = useState<string>('index.html');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Extract all HTML pages available for previewing
  const htmlPages = useMemo(() => {
    return files.filter((f) => f.path.endsWith('.html'));
  }, [files]);

  // Extract CSS and JS content to inline inside the sandbox srcDoc
  const cssFile = files.find((f) => f.path.endsWith('.css'));
  const jsFile = files.find((f) => f.path.endsWith('.js'));

  const sandboxHtml = useMemo(() => {
    const pageFile = files.find((f) => f.path === selectedPagePath) || htmlPages[0];
    if (!pageFile) return '<html><body style="background:#060913;color:#fff;font-family:sans-serif;padding:2rem;">No HTML pages generated yet.</body></html>';

    let content = pageFile.content;

    // Inline CSS
    if (cssFile) {
      content = content.replace(
        /<link[^>]*rel=["']stylesheet["'][^>]*>/i,
        `<style>${cssFile.content}</style>`
      );
    }

    // Inline JS
    if (jsFile) {
      content = content.replace(
        /<script[^>]*src=["'][^"']*main\.js["'][^>]*><\/script>/i,
        `<script>${jsFile.content}</script>`
      );
    }

    return content;
  }, [files, selectedPagePath, cssFile, jsFile, refreshKey]);

  const viewportStyles = {
    desktop: 'w-full max-w-[1440px] h-[680px]',
    tablet: 'w-[768px] h-[680px] rounded-[24px] border-8 border-slate-800 shadow-2xl',
    mobile: 'w-[375px] h-[680px] rounded-[40px] border-[12px] border-slate-800 shadow-2xl',
  };

  return (
    <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-200">
      {/* Top Bar: Viewport Switcher & Page Navigation */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-[#080d1a] p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-indigo-400" />
            Active Preview Page:
          </span>
          <select
            value={selectedPagePath}
            onChange={(e) => setSelectedPagePath(e.target.value)}
            className="rounded-xl border border-slate-700 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white focus:border-indigo-500 focus:outline-none"
          >
            {htmlPages.map((p) => (
              <option key={p.path} value={p.path}>
                {p.path}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-slate-800 bg-black/40 p-1">
            <button
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewport === 'desktop'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewport === 'tablet'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewport === 'mobile'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            title="Reload Sandbox Frame"
            className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-400 hover:border-indigo-500/40 hover:text-white transition-all"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sandbox Viewport Area */}
      <div className="w-full rounded-2xl border border-border/80 bg-[#060913] p-6 flex items-center justify-center overflow-auto shadow-2xl min-h-[720px]">
        <div className={`transition-all duration-300 overflow-hidden bg-white ${viewportStyles[viewport]}`}>
          <iframe
            key={refreshKey + selectedPagePath}
            srcDoc={sandboxHtml}
            title="Responsive Website Sandbox Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
