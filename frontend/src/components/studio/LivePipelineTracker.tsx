'use client';

import React from 'react';
import { WorkflowStep, AgentLogMessage } from '@/lib/engine/types';
import { CheckCircle2, Loader2, Clock, Terminal, AlertCircle, Bot } from 'lucide-react';

interface LivePipelineTrackerProps {
  steps: WorkflowStep[];
  logs: AgentLogMessage[];
  currentStepIndex: number;
  isGenerating: boolean;
}

export default function LivePipelineTracker({
  steps,
  logs,
  currentStepIndex,
  isGenerating,
}: LivePipelineTrackerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      {/* Left 2 Cols: 22-Step Pipeline Flow */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">22-Step AI Generation Pipeline</h3>
              <p className="text-xs text-slate-500">Orchestrating 16 specialized agents across architecture, code, content, and audit</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
              Step {currentStepIndex} / 22
            </span>
          </div>
        </div>

        <div className="mt-5 max-h-[620px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
          {steps.map((step) => {
            const isDone = step.status === 'DONE';
            const isRunning = step.status === 'RUNNING';
            const isError = step.status === 'ERROR';

            return (
              <div
                key={step.stepIndex}
                className={`flex items-start justify-between rounded-xl border p-3.5 transition-all ${
                  isRunning
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-sm ring-1 ring-indigo-600 scale-[1.01]'
                    : isDone
                    ? 'border-slate-200 bg-slate-50/80 hover:border-slate-300'
                    : 'border-slate-100 bg-slate-50/40 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 stroke-[2.5]" />
                    ) : isRunning ? (
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                    ) : isError ? (
                      <AlertCircle className="h-5 w-5 text-rose-600" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                        {step.stepIndex}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{step.name}</span>
                      <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        {step.agentName}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {step.durationMs && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <Clock className="h-3 w-3" />
                      {step.durationMs}ms
                    </span>
                  )}
                  {isRunning && (
                    <span className="flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-800 animate-pulse">
                      Synthesizing...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Col: Live Agent Console Logs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col h-[700px]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 font-mono">Agent Console Output</h3>
          </div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
            Live Stream
          </span>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-2 font-mono text-xs text-slate-700">
          {logs.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-400 py-12">
              <Bot className="h-8 w-8 mb-2 opacity-40 animate-bounce" />
              <p>Waiting for workflow step execution...</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-200 pb-1.5 mb-1.5">
                  <span className="font-bold text-indigo-700">[{log.agentName}]</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="font-semibold text-slate-900 leading-relaxed">{log.message}</div>
                {log.details && (
                  <div className="mt-1.5 rounded bg-white border border-slate-200 p-2 text-[11px] text-slate-600">
                    {log.details}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
