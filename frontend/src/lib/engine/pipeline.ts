import { ProjectRequirements, GeneratedProject, WorkflowStep, AgentLogMessage } from './types';
import { AgentExecutor } from './agents';

export const WORKFLOW_STEPS_DEFINITION: Omit<WorkflowStep, 'status'>[] = [
  { stepIndex: 1, name: 'Requirement Collection', agentName: 'Requirement Agent', description: 'Validating domain, target audience, brand aesthetic, and core feature specifications.' },
  { stepIndex: 2, name: 'AI Research Engine', agentName: 'Research Agent', description: 'Analyzing topic search intent, keyword volume, and demographic profiles.' },
  { stepIndex: 3, name: 'Keyword & Competitor Analysis', agentName: 'Keyword & Competitor Agents', description: 'Synthesizing long-tail questions, transactional keywords, and content gap opportunities.' },
  { stepIndex: 4, name: 'Website Architecture Planning', agentName: 'Planner Agent', description: 'Structuring URL hierarchy, static routes, blog taxonomy, and XML sitemap map.' },
  { stepIndex: 5, name: 'Design System & Tokens', agentName: 'Styling Agent', description: 'Curating HSL color palettes, accessible font pairings, and glassmorphism UI variables.' },
  { stepIndex: 6, name: 'HTML Generation', agentName: 'UI Agent', description: 'Writing semantic HTML5 (<header>, <nav>, <main>, <article>) with zero unnecessary div nesting.' },
  { stepIndex: 7, name: 'CSS Generation', agentName: 'Styling Agent', description: 'Writing responsive mobile-first CSS grid, custom scrollbars, and dark mode theme rules.' },
  { stepIndex: 8, name: 'JavaScript Generation', agentName: 'Frontend Agent', description: 'Writing modular Vanilla JS for live search, TOC accordion, theme persistence, and mobile navigation.' },
  { stepIndex: 9, name: 'PHP Backend Generation', agentName: 'Backend Agent', description: 'Writing PSR-inspired index.php router, PDO connection wrappers, and secure API endpoints.' },
  { stepIndex: 10, name: 'Database Schema Generation', agentName: 'Database Agent', description: 'Writing MySQL database.sql schema with normalized relational tables and initial seed data.' },
  { stepIndex: 11, name: 'Asset & Image Optimization', agentName: 'Research Agent', description: 'Configuring WebP image placeholders, SVG vector logos, and Open Graph social cards.' },
  { stepIndex: 12, name: 'Deep-Dive Content Generation', agentName: 'Content Agent', description: 'Writing original, human-like 1,500–3,000 word blog guides with expert tips and FAQs.' },
  { stepIndex: 13, name: 'SEO & Schema JSON-LD Optimization', agentName: 'SEO Agent', description: 'Injecting WebSite, Article, and Person structured data alongside clean meta descriptions.' },
  { stepIndex: 14, name: 'Internal Interlinking Engine', agentName: 'SEO Agent', description: 'Building contextual breadcrumbs and Related Guides interlinking across all pages.' },
  { stepIndex: 15, name: 'Performance Optimization', agentName: 'Performance Agent', description: 'Minifying styles, optimizing font preloading, and enforcing lazy-loading attributes.' },
  { stepIndex: 16, name: 'WCAG Accessibility Hardening', agentName: 'Accessibility Agent', description: 'Validating ARIA labels, skip-to-content links, keyboard focus indicators, and screen reader cues.' },
  { stepIndex: 17, name: 'Security & Input Hardening', agentName: 'Security Agent', description: 'Verifying PDO queries against SQL injection, XSS htmlspecialchars(), and CSRF tokens.' },
  { stepIndex: 18, name: 'Legal & Policy Pages Synthesis', agentName: 'Content Agent', description: 'Writing custom Privacy Policy (with Google DART disclosure), Terms, and Disclaimer pages.' },
  { stepIndex: 19, name: 'Blog & Admin System Assembly', agentName: 'Backend Agent', description: 'Assembling blog archive loop and administrative structure.' },
  { stepIndex: 20, name: 'Final File Assembly & Package', agentName: 'QA Agent', description: 'Synthesizing complete file structure into a production-ready package.' },
  { stepIndex: 21, name: 'Quality Assurance Testing', agentName: 'QA Agent', description: 'Checking broken links, HTML5 validation, and responsive viewport behavior.' },
  { stepIndex: 22, name: 'AdSense Readiness Audit', agentName: 'AdSense Audit Agent', description: 'Executing 14-point policy and technical audit to generate overall Readiness Score.' }
];

export async function executeGenerationPipeline(
  req: ProjectRequirements,
  onStepProgress?: (stepIndex: number, log: AgentLogMessage) => void
): Promise<GeneratedProject> {
  const steps: WorkflowStep[] = WORKFLOW_STEPS_DEFINITION.map(s => ({ ...s, status: 'PENDING' }));
  const executor = new AgentExecutor(req);
  const allLogs: AgentLogMessage[] = [];

  // Attempt to call FastAPI Python backend (port 8000) first if reachable
  try {
    const apiRes = await fetch(`http://localhost:8000/api/projects/${req.id}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(4000)
    });

    if (apiRes.ok) {
      const { data: backendProject } = await apiRes.json();
      if (backendProject && backendProject.files && backendProject.files.length > 0) {
        // Replay animated step progression in UI for visual feedback
        for (let i = 0; i < steps.length; i++) {
          const currentStep = steps[i];
          currentStep.status = 'RUNNING';
          await new Promise(r => setTimeout(r, Math.floor(Math.random() * 80) + 40));
          const logItem = backendProject.logs[i] || {
            id: `log-${i}`,
            timestamp: new Date().toLocaleTimeString(),
            agentName: currentStep.agentName,
            message: `Completed step: ${currentStep.name}`,
            level: 'info'
          };
          allLogs.push(logItem);
          if (onStepProgress) onStepProgress(currentStep.stepIndex, logItem);
          currentStep.status = 'DONE';
          currentStep.durationMs = 80;
        }
        return backendProject;
      }
    }
  } catch (err) {
    // FastAPI not reachable or timed out -> fall back to local browser engine
    console.warn('FastAPI backend not detected at :8000, executing local engine fallback.');
  }

  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];
    currentStep.status = 'RUNNING';
    const startTime = Date.now();

    // Simulate realistic AI generation pacing (120ms to 250ms per step)
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 120) + 80));

    const result = await executor.runStep(currentStep.stepIndex, (log) => {
      allLogs.push(log);
      if (onStepProgress) {
        onStepProgress(currentStep.stepIndex, log);
      }
    });

    currentStep.status = 'DONE';
    currentStep.durationMs = Date.now() - startTime;

    if (i === steps.length - 1) {
      return {
        id: req.id,
        requirements: req,
        steps,
        logs: result.logs,
        files: result.files,
        auditReport: result.auditReport,
        status: 'COMPLETED',
        currentStepIndex: 22
      };
    }
  }

  throw new Error('Pipeline execution interrupted.');
}
