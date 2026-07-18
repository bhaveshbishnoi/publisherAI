'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { ShieldCheck, FileText, AlertCircle, AlertTriangle, CheckCircle2, ChevronRight, Scale } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
        
        {/* Page Header */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-sky-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 shadow-2xs">
              <Scale className="h-3.5 w-3.5 text-indigo-500" />
              Legal & Compliance
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600">Policies</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
              To maintain a high-quality ecosystem, all websites generated and hosted via PublisherAI must strictly adhere to the following content and traffic guidelines, aligned with standard advertising network requirements.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="space-y-6">
          
          {/* Policy Section 1 */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 border border-rose-100 group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  1. Content Restrictions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Websites may not contain or promote content that violates standard publisher guidelines. This ensures a safe environment for users and advertisers.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {[
                    "Illegal acts or facilitation thereof",
                    "Intellectual property infringement",
                    "Dangerous or derogatory material",
                    "Sexually explicit content",
                    "Shocking or gruesome imagery",
                    "Misrepresentative or deceptive content",
                    "Thin content or Made for Ads (MFA) sites"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Policy Section 2 */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">2. Traffic Quality & Clicks</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Publishers are strictly prohibited from artificially inflating ad impressions or clicks. Integrity in user interaction is paramount.
                </p>
                <div className="space-y-2 mt-4 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p><strong>Invalid Traffic:</strong> No clicking on your own ads or using automated bots/software to generate traffic.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p><strong>Deceptive Placement:</strong> Ads must not be placed under drop-downs, overlapping content, or formatted to trick users.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p><strong>Encouraging Clicks:</strong> Directly asking users to support the site by clicking ads is strictly forbidden.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Section 3 */}
          <div className="group rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">3. Site Behavior & User Experience</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sites must be easy to navigate, function flawlessly, and respect user privacy.
                </p>
                <div className="grid gap-3 mt-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">Navigation & Core Web Vitals</h4>
                    <p className="text-xs text-slate-600">Pages cannot redirect users unexpectedly or initiate unauthorized downloads. Sites must optimize for standard performance metrics (LCP, CLS, INP).</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">User Consent (GDPR/CCPA)</h4>
                    <p className="text-xs text-slate-600">Clear disclosures regarding data collection and sharing must be present. A valid Consent Management Platform (CMP) must be utilized for affected regions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Footer Note */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between hover:bg-indigo-50 transition-colors">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-indigo-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Official AdSense Program Policies</h4>
              <p className="text-xs text-slate-600 mt-0.5">Please review the official documentation for the most up-to-date guidelines.</p>
            </div>
          </div>
          <Link 
            href="https://support.google.com/adsense/answer/48182" 
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl bg-white border border-slate-200 px-5 py-2.5 text-xs font-bold text-indigo-600 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-2 group"
          >
            <FileText className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
            Read Full Policies
          </Link>
        </div>

      </main>
    </div>
  );
}
