'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import RequirementWizard from '@/components/wizard/RequirementWizard';
import { ProjectRequirements } from '@/lib/engine/types';
import { STARTER_PROJECTS } from '@/lib/engine/starters';
import { Sparkles, Plus, ArrowRight, Layers, Globe, ShieldCheck, Zap, Code2, Award, Terminal, CheckCircle2 } from 'lucide-react';

export default function WorkspaceHome() {
  const router = useRouter();
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectRequirements[]>([]);

  useEffect(() => {
    // Load existing projects from localStorage or default to starters
    const saved = localStorage.getItem('publisher_ai_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(STARTER_PROJECTS);
      }
    } else {
      setProjects(STARTER_PROJECTS);
      localStorage.setItem('publisher_ai_projects', JSON.stringify(STARTER_PROJECTS));
    }
  }, []);

  const handleCompleteWizard = (newReq: ProjectRequirements) => {
    const updated = [newReq, ...projects];
    setProjects(updated);
    localStorage.setItem('publisher_ai_projects', JSON.stringify(updated));
    localStorage.setItem(`publisher_req_${newReq.id}`, JSON.stringify(newReq));
    setShowWizard(false);
    router.push(`/project/${newReq.id}`);
  };

  const handleOpenStarter = (starter: ProjectRequirements) => {
    localStorage.setItem(`publisher_req_${starter.id}`, JSON.stringify(starter));
    router.push(`/project/${starter.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913]">
      <Navbar onOpenWizard={() => setShowWizard(true)} />

      <main className="flex-1 container py-10 space-y-12 animate-in fade-in duration-300">
        {/* Hero Section */}
        <section className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 via-[#0d1224] to-[#080d1a] p-8 sm:p-12 shadow-2xl overflow-hidden glow-border">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3.5 py-1 text-xs font-bold text-indigo-300 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Orchestrating 16 AI Agents across 22 Workflow Steps</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              AI Agent Platform to Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400">AdSense-Ready</span> Websites
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Create production-ready web platforms complete with semantic <strong className="text-white">HTML5, CSS3, Vanilla JS, modular PHP, and MySQL</strong> schemas. Includes real-time code exploration, responsive viewport previews, and automated AdSense readiness evaluations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-500/30 hover:scale-[1.03] transition-all"
              >
                <Plus className="h-5 w-5 stroke-[3]" />
                <span>Create New AdSense Site</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Placeholder Code Guaranteed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Terminal className="h-6 w-6 text-indigo-400" />,
              title: 'Full Stack Code Engine',
              desc: 'Synthesizes clean semantic HTML5, CSS variables, Vanilla JS, and PSR-compliant PHP endpoints automatically.',
            },
            {
              icon: <Award className="h-6 w-6 text-emerald-400" />,
              title: '14-Point AdSense Audit',
              desc: 'Automated evaluation checking DART cookie policies, navigation depth, thin content, and Core Web Vitals.',
            },
            {
              icon: <Zap className="h-6 w-6 text-sky-400" />,
              title: 'Interactive Preview Studio',
              desc: 'Sandbox viewport frame rendering Desktop, Tablet, and Mobile layouts with functional dark mode toggles.',
            },
            {
              icon: <Code2 className="h-6 w-6 text-purple-400" />,
              title: 'One-Click ZIP Package',
              desc: 'Download all generated code files instantly alongside Apache .htaccess rules and cPanel deployment guides.',
            },
          ].map((feat, idx) => (
            <div key={idx} className="rounded-2xl border border-border/80 bg-surface/40 p-5 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white">{feat.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </section>

        {/* Project Workspace & Starter Templates Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Layers className="h-4 w-4" />
                Publisher Studio Workspace
              </div>
              <h2 className="text-2xl font-black text-white">Your Website Projects & Starters</h2>
            </div>
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>+ Launch Requirement Wizard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenStarter(proj)}
                className="group relative cursor-pointer rounded-3xl border border-border/80 bg-[#0d1224]/80 p-6 shadow-xl transition-all hover:-translate-y-1.5 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/15 glow-border flex flex-col justify-between h-[310px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-[11px] font-bold text-indigo-300">
                      {proj.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3" />
                      AdSense Ready
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                    <span>{proj.name}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-0.5">
                    <Globe className="h-3.5 w-3.5 text-slate-500" />
                    <span>{proj.domain}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    Targeting <strong className="text-indigo-300 font-semibold">{proj.primaryKeyword}</strong> across {proj.country}. Features {proj.numberPages} high-word-count guides with custom {proj.colorPreference?.primary ? 'HSL design tokens' : 'styling'}.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-sky-400" /> PHP
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> MySQL
                    </span>
                  </div>
                  <span className="text-indigo-400 font-bold group-hover:underline">Open Studio →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showWizard && (
        <RequirementWizard
          onComplete={handleCompleteWizard}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </div>
  );
}
