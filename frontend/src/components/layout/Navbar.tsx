'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Key, Plus, Cpu, ShieldCheck, Layers, Terminal } from 'lucide-react';

export default function Navbar({ onOpenWizard }: { onOpenWizard?: () => void }) {
  const pathname = usePathname();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [aiModel, setAiModel] = useState('hybrid-synthesis');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('publisher_api_key') || '';
    const savedModel = localStorage.getItem('publisher_ai_model') || 'hybrid-synthesis';
    setApiKey(savedKey);
    setAiModel(savedModel);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('publisher_api_key', apiKey);
    localStorage.setItem('publisher_ai_model', aiModel);
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
      setShowKeyModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/25">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#060913]">
                  <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse-subtle" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white">Publisher<span className="text-indigo-400">AI</span></span>
                  <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-300">v2.4</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">AdSense Website Generator & Studio</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  pathname === '/'
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Workspace</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white"
            >
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>{aiModel === 'hybrid-synthesis' ? 'Hybrid AI Synthesis' : 'OpenAI Live API'}</span>
              <Key className="h-3 w-3 ml-1 text-slate-500" />
            </button>

            {onOpenWizard && (
              <button
                onClick={onOpenWizard}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.03] hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>New AdSense Site</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* API Key & Engine Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-[#0d1224] p-6 shadow-2xl shadow-black/80 glow-border">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI Engine & Model Configuration</h3>
                  <p className="text-xs text-slate-400">Configure the 16 specialized agents & synthesis mode</p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Execution Mode
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAiModel('hybrid-synthesis')}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      aiModel === 'hybrid-synthesis'
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <Terminal className="h-4 w-4 text-indigo-400" />
                      Hybrid Synthesis
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                      Instant algorithmic generator + PSR PHP/SQL templates. Zero external API keys needed!
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiModel('openai-live')}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      aiModel === 'openai-live'
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      <Sparkles className="h-4 w-4 text-sky-400" />
                      OpenAI / Gemini Live
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                      Stream LLM responses directly via API for custom niche articles and live reasoning.
                    </p>
                  </button>
                </div>
              </div>

              {aiModel === 'openai-live' && (
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold text-sky-300">
                    OpenAI / Gemini / Custom API Key
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="w-full rounded-lg border border-sky-500/30 bg-black/40 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Keys are stored exclusively in your browser&apos;s local storage and never transmitted outside your AI generation calls.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-emerald-400 font-semibold">Policy Assurance:</strong> All 16 agents enforce semantic HTML5, high WCAG contrast, strict input sanitization (`PDO` & `htmlspecialchars`), and run our 14-point AdSense readiness evaluation automatically.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all"
                >
                  {savedStatus ? '✓ Saved Successfully!' : 'Save & Apply Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
