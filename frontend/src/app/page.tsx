'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import RequirementWizard from '@/components/wizard/RequirementWizard';
import { ProjectRequirements } from '@/lib/engine/types';
import { STARTER_PROJECTS } from '@/lib/engine/starters';
import { Sparkles, Plus, ArrowRight, Layers, Globe, ShieldCheck, Zap, Code2, Award, Terminal, CheckCircle2, Database } from 'lucide-react';

export default function WorkspaceHome() {
  const router = useRouter();
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectRequirements[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  useEffect(() => {
    // Load projects directly from SQLite DB via FastAPI backend (`http://localhost:8000/api/projects`)
    fetch('http://localhost:8000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
          setDbConnected(true);
        } else {
          fallbackLoad();
        }
      })
      .catch(() => {
        fallbackLoad();
      });

    function fallbackLoad() {
      const saved = localStorage.getItem('publisher_ai_projects');
      if (saved) {
        try {
          setProjects(JSON.parse(saved));
        } catch (e) {
          setProjects(STARTER_PROJECTS);
        }
      } else {
        setProjects(STARTER_PROJECTS);
      }
    }
  }, []);

  const handleCompleteWizard = async (newReq: ProjectRequirements) => {
    const updated = [newReq, ...projects];
    setProjects(updated);
    localStorage.setItem('publisher_ai_projects', JSON.stringify(updated));
    localStorage.setItem(`publisher_req_${newReq.id}`, JSON.stringify(newReq));

    try {
      await fetch('http://localhost:8000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReq)
      });
    } catch (err) {
      console.warn('Backend offline, saved locally');
    }

    setShowWizard(false);
    router.push(`/project/${newReq.id}`);
  };

  const handleOpenStarter = (starter: ProjectRequirements) => {
    localStorage.setItem(`publisher_req_${starter.id}`, JSON.stringify(starter));
    router.push(`/project/${starter.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenWizard={() => setShowWizard(true)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10 space-y-12 animate-in fade-in duration-300">
        {/* Centered Light Hero Section */}
        <section className="relative rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-md overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Orchestrating 16 AI Agents across 22 Workflow Steps</span>
              {dbConnected && (
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-extrabold ml-1">
                  <Database className="h-3 w-3" /> SQLite Connected
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              AI Agent Platform to Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-600 to-sky-600">AdSense-Ready</span> Websites
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Create production-ready web platforms complete with semantic <strong className="text-slate-900 font-bold">HTML5, CSS3, Vanilla JS, modular PHP, and SQLite / MySQL</strong> schemas. Includes real-time code exploration, responsive viewport previews, and automated AdSense readiness audits.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-sky-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/25 hover:scale-[1.03] transition-all"
              >
                <Plus className="h-5 w-5 stroke-[3]" />
                <span>Create New AdSense Site</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Zero Placeholder Code Guaranteed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            {
              icon: <Terminal className="h-6 w-6 text-indigo-600" />,
              title: 'Full Stack Code Engine',
              desc: 'Synthesizes clean semantic HTML5, CSS variables, Vanilla JS, and PSR-compliant PHP endpoints automatically.',
            },
            {
              icon: <Award className="h-6 w-6 text-emerald-600" />,
              title: '14-Point AdSense Audit',
              desc: 'Automated evaluation checking DART cookie policies, navigation depth, thin content, and Core Web Vitals.',
            },
            {
              icon: <Zap className="h-6 w-6 text-sky-600" />,
              title: 'Interactive Preview Studio',
              desc: 'Sandbox viewport frame rendering Desktop, Tablet, and Mobile layouts with clean design tokens.',
            },
            {
              icon: <Code2 className="h-6 w-6 text-indigo-600" />,
              title: 'One-Click ZIP Package',
              desc: 'Download all generated code files instantly alongside Apache .htaccess rules and cPanel deployment guides.',
            },
          ].map((feat, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 mb-4">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </section>

        {/* Project Workspace & Starter Templates Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Layers className="h-4 w-4" />
                Publisher Studio Workspace
              </div>
              <h2 className="text-2xl font-black text-slate-900">Your Website Projects & Starters</h2>
            </div>
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
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
                className="group relative cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg flex flex-col justify-between h-[310px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-[11px] font-bold text-indigo-700">
                      {proj.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3" />
                      AdSense Ready
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                    <span>{proj.name}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-0.5">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>{proj.domain}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    Targeting <strong className="text-slate-900 font-semibold">{proj.primaryKeyword}</strong> across {proj.country}. Features {proj.numberPages} high-word-count guides with custom {proj.colorPreference?.primary ? 'HSL design tokens' : 'styling'}.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-sky-500" /> PHP
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> SQLite / MySQL
                    </span>
                  </div>
                  <span className="text-indigo-600 font-bold group-hover:underline">Open Studio →</span>
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
