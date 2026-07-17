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
      <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        <ShieldAlert className="h-10 w-10 mb-3 text-amber-500" />
        <p className="text-sm font-semibold text-slate-900">No AdSense Readiness Audit Report generated yet.</p>
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
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-b from-indigo-50/50 to-white p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-3 right-3 rounded-full bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
            Automated Evaluation
          </div>

          <Award className="h-10 w-10 text-indigo-600 mb-2" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            AdSense Technical & Policy Score
          </span>

          <div className="mt-3 flex items-baseline justify-center gap-1">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">
              {report.overallScore}
            </span>
            <span className="text-2xl font-bold text-slate-400">/ 100</span>
          </div>

          <div className="mt-3 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{report.readinessLevel}</span>
          </div>

          <p className="mt-4 text-[11px] text-slate-600 leading-relaxed max-w-xs">
            Evaluated against 14 essential Google AdSense publisher requirements, mobile friendliness, and thin-content indicators.
          </p>
        </div>

        {/* Right 2 Cols: Summary Metrics & Mandatory Disclaimer */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-indigo-600" />
              Evaluation Summary Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown across {report.items.length} verified technical and content metrics:
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 text-center">
                <div className="text-2xl font-black text-emerald-700">{passCount}</div>
                <div className="text-[11px] font-bold text-emerald-800 uppercase">Checks Passed</div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3 text-center">
                <div className="text-2xl font-black text-amber-700">{warningCount}</div>
                <div className="text-[11px] font-bold text-amber-800 uppercase">Warnings / Advisory</div>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3 text-center">
                <div className="text-2xl font-black text-rose-700">{failCount}</div>
                <div className="text-[11px] font-bold text-rose-800 uppercase">Critical Gaps</div>
              </div>
            </div>
          </div>

          {/* Mandatory Policy Disclaimer */}
          <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-800 leading-relaxed">
              <strong className="text-amber-900 font-bold block mb-0.5">IMPORTANT GOOGLE POLICY DISCLAIMER:</strong>
              {report.disclaimer}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
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
                  ? 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-300'
                  : isWarning
                  ? 'border-amber-200 bg-amber-50/60 hover:border-amber-300'
                  : 'border-rose-200 bg-rose-50/60 hover:border-rose-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isPass && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {isWarning && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                    {isFail && <XCircle className="h-5 w-5 text-rose-600" />}
                  </div>
                  <div>
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {item.category}
                    </span>
                    <h4 className="mt-1.5 text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase shrink-0 ${
                    isPass
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isWarning
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-3.5 rounded-xl bg-white p-3 border border-slate-200 text-[11px] text-slate-700 shadow-2xs">
                <strong className="text-indigo-700 font-semibold">AI Recommendation & Status:</strong> {item.recommendation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
