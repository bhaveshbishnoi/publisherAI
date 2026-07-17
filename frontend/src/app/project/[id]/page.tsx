'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import LivePipelineTracker from '@/components/studio/LivePipelineTracker';
import CodeExplorer from '@/components/studio/CodeExplorer';
import ResponsivePreview from '@/components/studio/ResponsivePreview';
import VisualAIEditor from '@/components/studio/VisualAIEditor';
import AdSenseAuditDashboard from '@/components/audit/AdSenseAuditDashboard';
import ExportManager from '@/components/export/ExportManager';
import { ProjectRequirements, GeneratedProject, WorkflowStep, AgentLogMessage, GeneratedFile } from '@/lib/engine/types';
import { STARTER_PROJECTS } from '@/lib/engine/starters';
import { executeGenerationPipeline, WORKFLOW_STEPS_DEFINITION } from '@/lib/engine/pipeline';
import { Bot, FileCode, Monitor, Wand2, ShieldCheck, Package, ArrowLeft, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectStudioPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = typeof params?.id === 'string' ? params.id : '';

  const [req, setReq] = useState<ProjectRequirements | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'explorer' | 'preview' | 'editor' | 'audit' | 'export'>('pipeline');
  
  // Pipeline state
  const [steps, setSteps] = useState<WorkflowStep[]>(
    WORKFLOW_STEPS_DEFINITION.map((s) => ({ ...s, status: 'PENDING' }))
  );
  const [logs, setLogs] = useState<AgentLogMessage[]>([]);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [auditReport, setAuditReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(1);

  useEffect(() => {
    // Attempt to load project from SQLite database via FastAPI
    fetch(`http://localhost:8000/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success' && data.data.requirements) {
          setReq(data.data.requirements);
          if (data.data.generated) {
            setSteps(data.data.generated.steps || steps);
            setLogs(data.data.generated.logs || []);
            setFiles(data.data.generated.files || []);
            setAuditReport(data.data.generated.auditReport || null);
            setHasGenerated(true);
          } else if (!hasGenerated && !isGenerating) {
            triggerSynthesis(data.data.requirements);
          }
        } else {
          fallbackLoad();
        }
      })
      .catch(() => {
        fallbackLoad();
      });

    function fallbackLoad() {
      let foundReq: ProjectRequirements | undefined;
      const savedReq = localStorage.getItem(`publisher_req_${projectId}`);
      if (savedReq) {
        try {
          foundReq = JSON.parse(savedReq);
        } catch (e) {}
      }
      if (!foundReq) {
        foundReq = STARTER_PROJECTS.find((p) => p.id === projectId) || STARTER_PROJECTS[0];
      }
      setReq(foundReq);

      if (foundReq && !hasGenerated && !isGenerating) {
        triggerSynthesis(foundReq);
      }
    }
  }, [projectId]);

  const triggerSynthesis = async (targetReq: ProjectRequirements) => {
    setIsGenerating(true);
    setHasGenerated(false);
    setLogs([]);
    setSteps(WORKFLOW_STEPS_DEFINITION.map((s) => ({ ...s, status: 'PENDING' })));
    setCurrentStepIdx(1);

    try {
      const result = await executeGenerationPipeline(targetReq, (stepIdx, newLog) => {
        setCurrentStepIdx(stepIdx);
        setSteps((prev) =>
          prev.map((s) =>
            s.stepIndex < stepIdx
              ? { ...s, status: 'DONE' }
              : s.stepIndex === stepIdx
              ? { ...s, status: 'RUNNING' }
              : s
          )
        );
        setLogs((prev) => [...prev, newLog]);
      });

      setSteps(result.steps);
      setFiles(result.files);
      setAuditReport(result.auditReport);
      setHasGenerated(true);
      setIsGenerating(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error('Synthesis error:', e);
      setIsGenerating(false);
    }
  };

  const handleUpdateFile = async (path: string, newContent: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.path === path ? { ...f, content: newContent, sizeBytes: new Blob([newContent]).size } : f))
    );

    try {
      await fetch(`http://localhost:8000/api/projects/${projectId}/update-file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content: newContent })
      });
    } catch (err) {}
  };

  if (!req) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 font-bold">
        <Sparkles className="h-8 w-8 animate-spin text-indigo-600 mr-3" />
        <span>Loading Publisher Studio from SQLite Database...</span>
      </div>
    );
  }

  const tabs: Array<{ id: string; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'pipeline', label: '1. Live Pipeline & Agents', icon: <Bot className="h-4 w-4" />, badge: isGenerating ? 'Running' : 'Done' },
    { id: 'explorer', label: '2. Code Explorer', icon: <FileCode className="h-4 w-4" />, badge: `${files.length} Files` },
    { id: 'preview', label: '3. Responsive Sandbox Preview', icon: <Monitor className="h-4 w-4" /> },
    { id: 'editor', label: '4. AI Chat Assistant', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'audit', label: '5. AdSense Audit Report', icon: <ShieldCheck className="h-4 w-4" />, badge: auditReport ? `${auditReport.overallScore}/100` : 'Ready' },
    { id: 'export', label: '6. Download ZIP & Deploy', icon: <Package className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Project Studio Header */}
      <div className="border-b border-slate-200 bg-white/95 sticky top-16 z-40 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Workspace</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">{req.name}</h1>
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700">
                  {req.category}
                </span>
                {auditReport && (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700">
                    AdSense Score: {auditReport.overallScore}/100
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-0.5">
                <span>🌐 {req.domain}</span>
                <span>•</span>
                <span>📍 {req.country}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => triggerSynthesis(req)}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-sky-600 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-indigo-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{isGenerating ? 'Synthesizing (Step ' + currentStepIdx + '/22)...' : 'Re-run 16 AI Agents'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center gap-1 overflow-x-auto pb-1 border-t border-slate-100 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ml-1 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : tab.id === 'audit'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Viewport Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 animate-in fade-in duration-200">
        {activeTab === 'pipeline' && (
          <LivePipelineTracker
            steps={steps}
            logs={logs}
            currentStepIndex={currentStepIdx}
            isGenerating={isGenerating}
          />
        )}

        {activeTab === 'explorer' && (
          <CodeExplorer files={files} onUpdateFile={handleUpdateFile} />
        )}

        {activeTab === 'preview' && <ResponsivePreview files={files} />}

        {activeTab === 'editor' && (
          <VisualAIEditor
            files={files}
            onUpdateFile={handleUpdateFile}
            onRegenerateAll={() => triggerSynthesis(req)}
          />
        )}

        {activeTab === 'audit' && <AdSenseAuditDashboard report={auditReport} />}

        {activeTab === 'export' && <ExportManager files={files} requirements={req} />}
      </main>
    </div>
  );
}
