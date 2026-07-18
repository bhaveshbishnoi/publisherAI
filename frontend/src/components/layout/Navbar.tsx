'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Key, Plus, Cpu, ShieldCheck, Layers, Terminal, Database } from 'lucide-react';

export default function Navbar({ onOpenWizard }: { onOpenWizard?: () => void }) {
  const pathname = usePathname();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [provider, setProvider] = useState('hybrid');
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [modelName, setModelName] = useState('gpt-4o');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    // Fetch settings from FastAPI SQLite database
    fetch('http://localhost:8000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.provider) {
          setProvider(data.provider);
          if (data.openai_api_key_masked) setOpenaiKey(data.openai_api_key_masked);
          if (data.gemini_api_key_masked) setGeminiKey(data.gemini_api_key_masked);
          if (data.anthropic_api_key_masked) setAnthropicKey(data.anthropic_api_key_masked);
          if (data.model_name) setModelName(data.model_name);
        }
      })
      .catch(() => {
        const savedProvider = localStorage.getItem('publisher_ai_provider') || 'hybrid';
        setProvider(savedProvider);
      });
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('publisher_ai_provider', provider);
    
    try {
      await fetch('http://localhost:8000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          openai_api_key: openaiKey,
          gemini_api_key: geminiKey,
          anthropic_api_key: anthropicKey,
          model_name: modelName
        })
      });
    } catch (err) {
      console.warn('Backend settings save fallback to local storage');
    }

    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
      setShowKeyModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse-subtle" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-slate-900">Publisher<span className="text-indigo-600">AI</span></span>
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">v2.5 SQLite</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">AdSense Website Generation Platform</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  pathname === '/'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Workspace Studio</span>
              </Link>
              <Link
                href="/policies"
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  pathname === '/policies'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Policies</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700"
            >
              <Cpu className="h-3.5 w-3.5 text-indigo-600" />
              <span>{provider === 'hybrid' ? 'Hybrid AI Synthesis' : provider === 'openai' ? 'OpenAI GPT-4o' : 'Google Gemini 2.5'}</span>
              <Key className="h-3 w-3 ml-1 text-slate-400" />
            </button>

            {onOpenWizard && (
              <button
                onClick={onOpenWizard}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-600 to-sky-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.03] hover:shadow-indigo-500/35 active:scale-[0.98]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Engine & API Keys Settings</h3>
                  <p className="text-xs text-slate-500">Configure SQLite-backed API integrations & synthesis engines</p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Active AI Engine Provider
                </label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider('hybrid')}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      provider === 'hybrid'
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                      <Terminal className="h-3.5 w-3.5 text-indigo-600" />
                      Hybrid Synthesis
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                      Instant algorithmic generator + PSR PHP/SQL templates. Zero keys required!
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('openai')}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      provider === 'openai'
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      OpenAI API
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                      Live GPT-4o synthesis for custom niche guides, custom FAQs, and code editing.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('gemini')}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      provider === 'gemini'
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                      <Cpu className="h-3.5 w-3.5 text-sky-600" />
                      Google Gemini
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                      Live Gemini 2.5 Flash / Pro model integration for fast full-stack generation.
                    </p>
                  </button>
                </div>
              </div>

              {provider === 'openai' && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 animate-in fade-in duration-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      OpenAI API Key (`sk-...`)
                    </label>
                    <input
                      type="password"
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Model Selection</label>
                    <select
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="gpt-4o">gpt-4o (Recommended - Best Quality)</option>
                      <option value="gpt-4o-mini">gpt-4o-mini (Fastest & Economical)</option>
                      <option value="gpt-4-turbo">gpt-4-turbo</option>
                    </select>
                  </div>
                </div>
              )}

              {provider === 'gemini' && (
                <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3.5 animate-in fade-in duration-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      Google Gemini API Key (`AIza...`)
                    </label>
                    <input
                      type="password"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800">Model Selection</label>
                    <select
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none"
                    >
                      <option value="gemini-2.5-flash">gemini-2.5-flash (Fast & High Accuracy)</option>
                      <option value="gemini-2.5-pro">gemini-2.5-pro (Deepest Reasoning)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-bold">SQLite Assurance:</strong> All configuration settings and generated websites are stored directly inside your local SQLite database (`publisherai.db`).
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all"
                >
                  {savedStatus ? '✓ Saved to SQLite!' : 'Save & Apply Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
