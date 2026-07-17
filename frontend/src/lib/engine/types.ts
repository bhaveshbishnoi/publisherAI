export type MonetizationOption = 'AdSense' | 'Affiliate' | 'Hybrid' | 'None';
export type BrandStyle = 'Modern & Vibrant' | 'Clean & Minimalist' | 'Bold & Tech' | 'Classic Editorial' | 'Dark & Glassmorphism';

export interface ProjectRequirements {
  id: string;
  name: string;
  domain: string;
  category: string;
  websiteType: 'Blog' | 'Magazine' | 'Directory' | 'Corporate' | 'Portal';
  country: string;
  language: string;
  primaryAudience: string;
  brandStyle: BrandStyle;
  colorPreference: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  primaryKeyword: string;
  secondaryKeywords: string[];
  numberPages: number;
  // Features toggle
  needBlog: boolean;
  needAdminPanel: boolean;
  needDatabase: boolean;
  needAuth: boolean;
  needSearch: boolean;
  needCategories: boolean;
  needTags: boolean;
  needContactForm: boolean;
  needNewsletter: boolean;
  needFaq: boolean;
  needTestimonials: boolean;
  needAnalytics: boolean;
  needAds: boolean;
  needCookieConsent: boolean;
  needDarkMode: boolean;
  needRssFeed: boolean;
  needSitemap: boolean;
  needRobots: boolean;
  needSocialSharing: boolean;
  createdAt: string;
}

export interface GeneratedFile {
  path: string; // e.g., 'index.html', 'assets/css/style.css', 'index.php', 'database.sql'
  language: 'html' | 'css' | 'javascript' | 'php' | 'sql' | 'json' | 'xml' | 'txt' | 'markdown';
  content: string;
  sizeBytes: number;
}

export interface AgentLogMessage {
  id: string;
  timestamp: string;
  agentName: string;
  stepIndex: number;
  stepName: string;
  status: 'PENDING' | 'RUNNING' | 'DONE' | 'ERROR';
  message: string;
  details?: string;
}

export interface AdSenseAuditItem {
  id: string;
  category: 'Policy Compliance' | 'Technical Readiness' | 'Content Quality' | 'User Experience' | 'SEO & Structure';
  title: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  explanation: string;
  recommendation: string;
}

export interface AdSenseAuditReport {
  overallScore: number; // 0 to 100
  readinessLevel: 'High Technical Readiness' | 'Moderate Readiness - Action Required' | 'Low Readiness - Critical Gaps';
  items: AdSenseAuditItem[];
  generatedAt: string;
  disclaimer: string;
}

export interface WorkflowStep {
  stepIndex: number; // 1 to 22
  name: string;
  agentName: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'DONE' | 'ERROR';
  durationMs?: number;
}

export interface GeneratedProject {
  id: string;
  requirements: ProjectRequirements;
  steps: WorkflowStep[];
  logs: AgentLogMessage[];
  files: GeneratedFile[];
  auditReport?: AdSenseAuditReport;
  status: 'IDLE' | 'GENERATING' | 'COMPLETED' | 'FAILED';
  currentStepIndex: number;
}
