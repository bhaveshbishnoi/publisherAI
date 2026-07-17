'use client';

import React, { useState } from 'react';
import { AdSenseAuditReport, AdSenseAuditItem } from '@/lib/engine/types';
import { ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Award, FileCheck, Layers, ExternalLink } from 'lucide-react';

interface AdSenseAuditDashboardProps {
  report?: AdSenseAuditReport;
}

export default function AdSenseAuditDashboard({ report }: AdSenseAuditDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  if (!report) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-surface/60 text-slate-400">
        <ShieldAlert className="h-10 w-10 mb-3 text-amber-400" />
        <p className="text-sm font-semibold">No AdSense Readiness Audit Report generated yet.</p>
        <p className="text-xs mt-1 text-slate-500">Run the 22-step generation workflow to produce an automated technical & policy audit.</p>
      </div>
    );
  }

  const categories = ['all', 'Policy Compliance', 'Technical Readiness', 'Content Quality', 'User Experience', 'SEO & Structure'];

  const filteredItems = activeTab === 'all'
    ? report.items
    : report.items.filter((item) => item.category === activeTab);

  const passCount = report.items.filter((i) => i.status === 'PASS').length;
  const warningCount = report.items.filter((i) => i.status === 'WARNING').length;
  const failCount = report.items.filter((i) => i.status === 'FAIL').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Overview & Score Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Score Gauge */}
        <div className="rounded-3xl border border-indigo-500/30 bg-[#0d1224] p-6 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden glow-border">
          <div className="absolute top-3 right-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
            Automated Evaluation
          </div>

          <Award className="h-10 w-10 text-indigo-400 mb-2" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            AdSense Technical & Policy Score
          </span>

          <div className="mt-3 flex items-baseline justify-center gap-1">
            <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">
              {report.overallScore}
            </span>
            <span className="text-2xl font-bold text-slate-500">/ 100</span>
          </div>

          <div className="mt-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>{report.readinessLevel}</span>
          </div>

          <p className="mt-4 text-[11px] text-slate-400 leading-relaxed max-w-xs">
            Evaluated against 14 essential Google AdSense publisher requirements, mobile friendliness, and thin-content indicators.
          </p>
        </div>

        {/* Right 2 Cols: Summary Metrics & Mandatory Disclaimer */}
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-[#060913] p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-indigo-400" />
              Evaluation Summary Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown across {report.items.length} verified technical and content metrics:
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
                <div className="text-2xl font-black text-emerald-400">{passCount}</div>
                <div className="text-[11px] font-bold text-emerald-300/80 uppercase">Checks Passed</div>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-center">
                <div className="text-2xl font-black text-amber-400">{warningCount}</div>
                <div className="text-[11px] font-bold text-amber-300/80 uppercase">Warnings / Advisory</div>
              </div>

              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-center">
                <div className="text-2xl font-black text-rose-400">{failCount}</div>
                <div className="text-[11px] font-bold text-rose-300/80 uppercase">Critical Gaps</div>
              </div>
            </div>
          </div>

          {/* Mandatory Policy Disclaimer */}
          <div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/15 p-4 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-amber-300 font-bold block mb-0.5">IMPORTANT GOOGLE POLICY DISCLAIMER:</strong>
              {report.disclaimer}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Audit Checks (14)' : cat}
          </button>
        ))}
      </div>

      {/* Itemized Check List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isPass = item.status === 'PASS';
          const isWarning = item.status === 'WARNING';
          const isFail = item.status === 'FAIL';

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all ${
                isPass
                  ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                  : isWarning
                  ? 'border-amber-500/40 bg-amber-500/10 hover:border-amber-500/60'
                  : 'border-rose-500/40 bg-rose-500/10 hover:border-rose-500/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isPass && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    {isWarning && <AlertTriangle className="h-5 w-5 text-amber-400" />}
                    {isFail && <XCircle className="h-5 w-5 text-rose-400" />}
                  </div>
                  <div>
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                    <h4 className="mt-1.5 text-sm font-bold text-white">{item.title}</h4>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase shrink-0 ${
                    isPass
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isWarning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-3.5 rounded-xl bg-black/40 p-3 border border-white/5 text-[11px] text-slate-300">
                <strong className="text-indigo-400 font-semibold">AI Recommendation & Status:</strong> {item.recommendation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
