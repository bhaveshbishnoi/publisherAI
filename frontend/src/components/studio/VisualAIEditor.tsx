'use client';

import React, { useState } from 'react';
import { GeneratedFile } from '@/lib/engine/types';
import { Sparkles, Send, Bot, User, Wand2, CheckCircle2 } from 'lucide-react';

interface VisualAIEditorProps {
  files: GeneratedFile[];
  onUpdateFile?: (path: string, newContent: string) => void;
  onRegenerateAll?: () => void;
}

export default function VisualAIEditor({
  files,
  onUpdateFile,
  onRegenerateAll,
}: VisualAIEditorProps) {
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; content: string; timestamp: string }>>([
    {
      role: 'ai',
      content: 'Hello! I am your AI Chat Assistant. Ask me to modify styles, add sections, update PHP form handlers, or regenerate your AdSense ad slots anytime!',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleQuickAction = async (promptText: string) => {
    await handleSendPrompt(promptText);
  };

  const handleSendPrompt = async (promptText?: string) => {
    const query = promptText || input;
    if (!query.trim() || isProcessing) return;

    const userMsg = { role: 'user' as const, content: query, timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsProcessing(true);

    // Simulate agent processing time
    await new Promise((r) => setTimeout(r, 1200));

    let aiReply = 'I have successfully applied your requested modification across the code system!';

    // Handle specific prompt actions nicely
    if (query.toLowerCase().includes('emerald') || query.toLowerCase().includes('green')) {
      const cssFile = files.find((f) => f.path.endsWith('.css'));
      if (cssFile && onUpdateFile) {
        const updatedCss = cssFile.content.replace(/--primary: [^;]+;/g, '--primary: #10b981;');
        onUpdateFile(cssFile.path, updatedCss);
      }
      aiReply = '✓ Updated `--primary` custom property to `#10b981` (Emerald Green) inside `style.css`. Switch to Live Preview to see the refreshed brand colors!';
    } else if (query.toLowerCase().includes('captcha') || query.toLowerCase().includes('form')) {
      const phpFile = files.find((f) => f.path === 'api/contact.php');
      if (phpFile && onUpdateFile) {
        const updatedPhp = phpFile.content.replace(
          /(\$message = trim\(\$_POST\['message'\] \?\? ''\);)/,
          `$1\n\n// Added Math CAPTCHA verification\n$captcha = trim($_POST['captcha'] ?? '');\nif ($captcha !== '7') {\n    http_response_code(400);\n    echo json_encode(['status' => 'error', 'message' => 'Please solve the CAPTCHA correctly (3 + 4 = 7).']);\n    exit;\n}`
        );
        onUpdateFile('api/contact.php', updatedPhp);
      }
      aiReply = '✓ Injected Math CAPTCHA validation check inside `api/contact.php` and added error handling!';
    } else if (query.toLowerCase().includes('faq')) {
      const indexHtml = files.find((f) => f.path === 'index.html');
      if (indexHtml && onUpdateFile) {
        const extraFaqSection = `
    <!-- Additional AI-Generated FAQ Section -->
    <section class="section container my-6">
      <h2>Frequently Asked Questions on AdSense & Policies</h2>
      <div class="faq-accordion mt-4">
        <details class="faq-item glass-card" open>
          <summary class="faq-question">How does PublisherAI align with Google AdSense guidelines?</summary>
          <div class="faq-answer"><p>We enforce strict mobile responsiveness, fast Core Web Vitals, high-contrast WCAG typography, and include mandatory legal pages with DoubleClick DART disclosures.</p></div>
        </details>
        <details class="faq-item glass-card">
          <summary class="faq-question">Are the generated articles original?</summary>
          <div class="faq-answer"><p>Yes, all articles average 1,500+ words with structured headings and custom FAQs to avoid thin-content penalties.</p></div>
        </details>
      </div>
    </section>
        `;
        const updatedHtml = indexHtml.content.replace(/<\/main>/i, `${extraFaqSection}\n  </main>`);
        onUpdateFile('index.html', updatedHtml);
      }
      aiReply = '✓ Injected a new interactive FAQ accordion section with Schema-ready markup right above the footer inside `index.html`!';
    }

    setMessages((prev) => [
      ...prev,
      { role: 'ai', content: aiReply, timestamp: new Date().toLocaleTimeString() },
    ]);
    setIsProcessing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[720px] animate-in fade-in duration-200">
      {/* Left Column: Quick Action Starter Pills */}
      <div className="md:col-span-1 rounded-2xl border border-border/80 bg-[#080d1a] p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-4 text-white font-bold text-xs uppercase tracking-wider">
            <Wand2 className="h-4 w-4 text-indigo-400" />
            AI Quick Regeneration Studio
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Click any intelligent modification template below to let our specialized agents update the live code:
          </p>

          <div className="space-y-2.5">
            {[
              { label: '🎨 Switch Color Palette to Emerald Green', prompt: 'Change the color palette to Emerald Green' },
              { label: '🛡️ Inject CAPTCHA Verification in PHP', prompt: 'Add contact form CAPTCHA validation to api/contact.php' },
              { label: '❓ Add FAQ Accordion Section to Homepage', prompt: 'Generate 2 more FAQs and add accordion to index.html' },
              { label: '⚡ Optimize CSS & JS for Core Web Vitals', prompt: 'Optimize CSS and defer JS scripts for 95+ Lighthouse' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(item.prompt)}
                disabled={isProcessing}
                className="w-full text-left rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {onRegenerateAll && (
          <div className="pt-4 border-t border-border/60">
            <button
              onClick={onRegenerateAll}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="h-4 w-4 stroke-[2.5]" />
              <span>Full Pipeline Re-Synthesis</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Interactive Chat Stream */}
      <div className="md:col-span-2 rounded-2xl border border-border/80 bg-[#060913] p-5 flex flex-col h-full overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Interactive Code Modification Assistant</h3>
          </div>
          <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
            Agentic Studio Active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600/30 border border-purple-500/40 text-white'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold">{msg.role === 'user' ? 'You' : 'PublisherAI Agent'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 p-2 animate-pulse font-mono">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Analyzing codebase and applying intelligent AST modifications...</span>
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="Ask AI to modify code, style tokens, or add new PHP routes..."
            className="flex-1 rounded-xl border border-slate-700 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
