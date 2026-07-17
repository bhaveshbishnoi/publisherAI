'use client';

import React, { useState } from 'react';
import { GeneratedFile } from '@/lib/engine/types';
import { FileCode, Copy, Check, Download, Edit3, Save, Terminal, Folder } from 'lucide-react';

interface CodeExplorerProps {
  files: GeneratedFile[];
  onUpdateFile?: (path: string, newContent: string) => void;
}

export default function CodeExplorer({ files, onUpdateFile }: CodeExplorerProps) {
  const [selectedPath, setSelectedPath] = useState<string>(files[0]?.path || 'index.html');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedFile = files.find((f) => f.path === selectedPath) || files[0];

  const handleSelectFile = (path: string) => {
    setSelectedPath(path);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    if (selectedFile) {
      setEditContent(selectedFile.content);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedFile && onUpdateFile) {
      onUpdateFile(selectedFile.path, editContent);
    }
    setIsEditing(false);
  };

  const handleCopy = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(isEditing ? editContent : selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSingleFile = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.path.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[720px] animate-in fade-in duration-200">
      {/* Left Sidebar: File Tree */}
      <div className="md:col-span-1 rounded-2xl border border-border/80 bg-[#080d1a] p-4 flex flex-col h-full overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-3 text-white font-bold text-xs uppercase tracking-wider">
          <Folder className="h-4 w-4 text-indigo-400" />
          Generated Codebase ({files.length} Files)
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {files.map((f) => {
            const isSelected = f.path === selectedPath;
            const ext = f.path.split('.').pop();
            const badgeColor =
              ext === 'html'
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                : ext === 'css'
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                : ext === 'js'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : ext === 'php'
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                : ext === 'sql'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400';

            return (
              <button
                key={f.path}
                onClick={() => handleSelectFile(f.path)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-indigo-500/20 text-white border border-indigo-500/50 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">{f.path}</span>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold border uppercase shrink-0 ml-1 ${badgeColor}`}>
                  {ext}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 border-t border-border/60 pt-3 text-[11px] text-slate-500 text-center font-mono">
          Total Bundle: {(files.reduce((a, b) => a + b.sizeBytes, 0) / 1024).toFixed(1)} KB
        </div>
      </div>

      {/* Right Area: Syntax Highlighted / Editable File Viewer */}
      <div className="md:col-span-3 rounded-2xl border border-border/80 bg-[#060913] p-5 flex flex-col h-full overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="rounded-lg bg-indigo-500/20 px-2.5 py-1 font-mono text-xs font-bold text-indigo-300">
              {selectedFile?.path}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({selectedFile ? (selectedFile.sizeBytes / 1024).toFixed(2) : 0} KB)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
              >
                <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Edit Code</span>
              </button>
            ) : (
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-500 transition-all"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownloadSingleFile}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
            >
              <Download className="h-3.5 w-3.5 text-sky-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto rounded-xl border border-slate-800/80 bg-black/60 p-4 font-mono text-xs text-slate-200 leading-relaxed custom-scrollbar">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full bg-transparent text-slate-200 focus:outline-none resize-none font-mono"
              spellCheck="false"
            />
          ) : (
            <pre className="whitespace-pre-wrap break-all">
              <code>{selectedFile?.content || 'No file selected.'}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
