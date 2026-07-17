'use client';

import React, { useState } from 'react';
import { ProjectRequirements, BrandStyle } from '@/lib/engine/types';
import { Sparkles, ArrowRight, ArrowLeft, Check, Globe, Palette, Search, Sliders, ShieldAlert } from 'lucide-react';

interface RequirementWizardProps {
  onComplete: (requirements: ProjectRequirements) => void;
  onCancel: () => void;
}

const COLOR_PRESETS = [
  { name: 'Saffron Orange & Deep Slate (Festival / Vibrant)', primary: '#f97316', secondary: '#1e293b', accent: '#eab308' },
  { name: 'Sapphire Indigo & Night Sky (Tech / FinTech)', primary: '#6366f1', secondary: '#0f172a', accent: '#38bdf8' },
  { name: 'Emerald Green & Charcoal (Health / Eco)', primary: '#10b981', secondary: '#1f2937', accent: '#06b6d4' },
  { name: 'Crimson Red & Midnight (News / Editorial)', primary: '#e11d48', secondary: '#18181b', accent: '#fb7185' },
  { name: 'Violet Purple & Glass (Web3 / Creative)', primary: '#8b5cf6', secondary: '#171717', accent: '#a855f7' },
];

export default function RequirementWizard({ onComplete, onCancel }: RequirementWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<ProjectRequirements>>({
    name: 'Utsav India',
    domain: 'utsavindia.com',
    category: 'Cultural Heritage & Festivals',
    websiteType: 'Blog',
    country: 'India',
    language: 'English',
    primaryAudience: 'Global Indian Diaspora, Cultural Enthusiasts & Travelers',
    brandStyle: 'Modern & Vibrant',
    colorPreference: COLOR_PRESETS[0],
    typography: { heading: 'Outfit', body: 'Inter' },
    primaryKeyword: 'Indian Festivals',
    secondaryKeywords: ['Diwali Rituals', 'Holi Colors Science', 'Navratri Garba Guide', 'Durga Puja Pandals', 'Eco-friendly Diwali'],
    numberPages: 8,
    needBlog: true,
    needAdminPanel: true,
    needDatabase: true,
    needAuth: true,
    needSearch: true,
    needCategories: true,
    needTags: true,
    needContactForm: true,
    needNewsletter: true,
    needFaq: true,
    needTestimonials: false,
    needAnalytics: true,
    needAds: true,
    needCookieConsent: true,
    needDarkMode: true,
    needRssFeed: true,
    needSitemap: true,
    needRobots: true,
    needSocialSharing: true,
  });

  const [secKeywordInput, setSecKeywordInput] = useState(
    formData.secondaryKeywords?.join(', ') || ''
  );

  const handleNext = () => {
    if (step === 3) {
      // Parse secondary keywords cleanly
      const parsedKeywords = secKeywordInput
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
      setFormData((prev) => ({ ...prev, secondaryKeywords: parsedKeywords }));
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReq: ProjectRequirements = {
      id: 'proj-' + Math.random().toString(36).substring(2, 9),
      name: formData.name || 'AdSense Publisher Site',
      domain: formData.domain || 'publishersite.com',
      category: formData.category || 'General',
      websiteType: formData.websiteType || 'Blog',
      country: formData.country || 'Global',
      language: formData.language || 'English',
      primaryAudience: formData.primaryAudience || 'General Readers',
      brandStyle: formData.brandStyle || 'Modern & Vibrant',
      colorPreference: formData.colorPreference || COLOR_PRESETS[0],
      typography: formData.typography || { heading: 'Outfit', body: 'Inter' },
      primaryKeyword: formData.primaryKeyword || 'Articles',
      secondaryKeywords: formData.secondaryKeywords || ['Guide', 'Tutorial'],
      numberPages: formData.numberPages || 8,
      needBlog: formData.needBlog ?? true,
      needAdminPanel: formData.needAdminPanel ?? true,
      needDatabase: formData.needDatabase ?? true,
      needAuth: formData.needAuth ?? true,
      needSearch: formData.needSearch ?? true,
      needCategories: formData.needCategories ?? true,
      needTags: formData.needTags ?? true,
      needContactForm: formData.needContactForm ?? true,
      needNewsletter: formData.needNewsletter ?? true,
      needFaq: formData.needFaq ?? true,
      needTestimonials: formData.needTestimonials ?? false,
      needAnalytics: formData.needAnalytics ?? true,
      needAds: formData.needAds ?? true,
      needCookieConsent: formData.needCookieConsent ?? true,
      needDarkMode: formData.needDarkMode ?? true,
      needRssFeed: formData.needRssFeed ?? true,
      needSitemap: formData.needSitemap ?? true,
      needRobots: formData.needRobots ?? true,
      needSocialSharing: formData.needSocialSharing ?? true,
      createdAt: new Date().toISOString(),
    };
    onComplete(finalReq);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl my-auto">
        {/* Header & Steps Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Step {step}: Requirement Collection Pipeline
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-900">Create New AdSense-Ready Website</h2>
            <p className="text-sm text-slate-500">Configure 22 workflow parameters to trigger our 16 specialized AI agents.</p>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step === i
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 ring-4 ring-indigo-100'
                      : step > i
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {step > i ? <Check className="h-4 w-4 stroke-[3]" /> : i}
                </div>
                {i < 4 && <div className={`h-0.5 w-6 ${step > i ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleFinish} className="mt-6">
          {/* Step 1: Core Website & Target Identity */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                Core Website & Audience Identity
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Website Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Utsav India"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Domain Name (.com / .in / .io)</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    required
                    placeholder="e.g. utsavindia.com"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Category / Niche</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Cultural Heritage & Festivals"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Website Type</label>
                  <select
                    value={formData.websiteType}
                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value as any })}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  >
                    <option value="Blog">Blog & Guides Portal</option>
                    <option value="Magazine">Digital Magazine</option>
                    <option value="Directory">Directory / Resource Hub</option>
                    <option value="Corporate">Corporate / Editorial Publication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Target Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. India, United States, Global"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Primary Audience Demographic</label>
                <input
                  type="text"
                  value={formData.primaryAudience}
                  onChange={(e) => setFormData({ ...formData, primaryAudience: e.target.value })}
                  placeholder="Global Indian Diaspora, Cultural Enthusiasts & Travelers"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                />
              </div>
            </div>
          )}

          {/* Step 2: Brand & Design System */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                <Palette className="h-5 w-5 text-indigo-600" />
                Brand Styling & Design System Tokens
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Curated Color Palette Preset</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, colorPreference: preset })}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                        formData.colorPreference?.primary === preset.primary
                          ? 'border-indigo-600 bg-indigo-50 shadow-sm ring-1 ring-indigo-600 font-bold'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{preset.name}</div>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="h-4 w-4 rounded-full border border-slate-300 shadow-2xs" style={{ backgroundColor: preset.primary }} />
                          <span className="h-4 w-4 rounded-full border border-slate-300 shadow-2xs" style={{ backgroundColor: preset.secondary }} />
                          <span className="h-4 w-4 rounded-full border border-slate-300 shadow-2xs" style={{ backgroundColor: preset.accent }} />
                        </div>
                      </div>
                      {formData.colorPreference?.primary === preset.primary && (
                        <Check className="h-4 w-4 text-indigo-600 shrink-0 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Brand Vibe & Style</label>
                  <select
                    value={formData.brandStyle}
                    onChange={(e) => setFormData({ ...formData, brandStyle: e.target.value as BrandStyle })}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  >
                    <option value="Modern & Vibrant">Modern & Vibrant (Engaging, Gradient Rich)</option>
                    <option value="Clean & Minimalist">Clean & Minimalist (High-Readability White/Slate)</option>
                    <option value="Dark & Glassmorphism">Dark & Glassmorphism (Sleek Tech & Cyber)</option>
                    <option value="Classic Editorial">Classic Editorial (Newspaper & Authority Focus)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Typography Font Pairings</label>
                  <select
                    value={`${formData.typography?.heading || 'Outfit'}|${formData.typography?.body || 'Inter'}`}
                    onChange={(e) => {
                      const [heading, body] = e.target.value.split('|');
                      setFormData({ ...formData, typography: { heading, body } });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                  >
                    <option value="Outfit|Inter">Outfit (Headings) + Inter (Body) - Recommended</option>
                    <option value="Inter|Fira Code">Inter (Headings) + Fira Code (Technical)</option>
                    <option value="Playfair Display|Inter">Playfair Display (Editorial) + Inter (Clean)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Keywords & Content Depth Strategy */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                <Search className="h-5 w-5 text-indigo-600" />
                Keyword Research & Content Planning Strategy
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Primary Target Keyword</label>
                <input
                  type="text"
                  value={formData.primaryKeyword}
                  onChange={(e) => setFormData({ ...formData, primaryKeyword: e.target.value })}
                  required
                  placeholder="e.g. Indian Festivals"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Our Research Agent uses this topic to evaluate top 10 search intents and construct high-ranking article outlines.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Secondary Keywords / Long-Tail Topics (Comma Separated)
                </label>
                <textarea
                  rows={3}
                  value={secKeywordInput}
                  onChange={(e) => setSecKeywordInput(e.target.value)}
                  placeholder="Diwali rituals, Holi colors science, Navratri Garba guide, Durga Puja pandals, Eco-friendly Diwali"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Initial Number of Articles / Pages to Generate (1,500+ Words Each)
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="15"
                    value={formData.numberPages}
                    onChange={(e) => setFormData({ ...formData, numberPages: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                  <span className="flex h-10 w-16 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-base font-black text-indigo-700 shrink-0 shadow-2xs">
                    {formData.numberPages}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Features & Monetization Checklist */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                <Sliders className="h-5 w-5 text-indigo-600" />
                Technical Features, PHP Backend & AdSense Slot Configuration
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: 'needBlog', label: 'Blog & Article System (`/blog.html`)', icon: '📝' },
                  { key: 'needAdminPanel', label: 'Admin Dashboard (`/admin/`)', icon: '⚡' },
                  { key: 'needDatabase', label: 'MySQL Database (`database.sql`)', icon: '🗄️' },
                  { key: 'needContactForm', label: 'Secure PHP Contact Form (`api/contact.php`)', icon: '📬' },
                  { key: 'needNewsletter', label: 'Newsletter Subscribe API Handler', icon: '📧' },
                  { key: 'needAds', label: 'Google AdSense Responsive Placements', icon: '💰' },
                  { key: 'needCookieConsent', label: 'GDPR / CCPA Cookie Consent Banner', icon: '🍪' },
                  { key: 'needDarkMode', label: 'Vanilla JS Dark Mode Switcher', icon: '🌙' },
                  { key: 'needFaq', label: 'FAQ Schema Accordions (`details/summary`)', icon: '❓' },
                  { key: 'needSearch', label: 'Live Client-Side Search Engine', icon: '🔍' },
                  { key: 'needSitemap', label: 'XML Sitemap (`sitemap.xml`)', icon: '🗺️' },
                  { key: 'needRobots', label: 'Search Engine Directives (`robots.txt`)', icon: '🤖' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                      (formData as any)[item.key]
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!(formData as any)[item.key]}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4 accent-indigo-600"
                    />
                    <span className="text-sm flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                  </label>
                ))}
              </div>

              {/* Policy Disclaimer Banner */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-relaxed">
                  <strong className="text-amber-900 font-bold">Important Policy Compliance Notice:</strong> PublisherAI automatically generates your website with semantic code, mobile-first design, original high-word-count guides, and required legal pages (`Privacy Policy with DART disclosure`, `Terms`, `Disclaimer`). However, final AdSense monetization approval rests entirely with Google&apos;s independent review team.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={step === 1 ? onCancel : handlePrev}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{step === 1 ? 'Cancel Wizard' : 'Previous Step'}</span>
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-all"
              >
                <Sparkles className="h-4 w-4 stroke-[2.5]" />
                <span>Launch 16 AI Agents & Generate Site</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
