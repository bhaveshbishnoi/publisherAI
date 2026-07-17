from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ColorPreference(BaseModel):
    primary: str = "#f97316"
    secondary: str = "#1e293b"
    accent: str = "#eab308"

class Typography(BaseModel):
    heading: str = "Outfit"
    body: str = "Inter"

class ProjectRequirements(BaseModel):
    id: str
    name: str
    domain: str
    category: str = "General"
    websiteType: str = "Blog"
    country: str = "Global"
    language: str = "English"
    primaryAudience: str = "General Audience"
    brandStyle: str = "Modern & Vibrant"
    colorPreference: Optional[ColorPreference] = Field(default_factory=ColorPreference)
    typography: Optional[Typography] = Field(default_factory=Typography)
    primaryKeyword: str
    secondaryKeywords: List[str] = []
    numberPages: int = 8
    needBlog: bool = True
    needAdminPanel: bool = True
    needDatabase: bool = True
    needAuth: bool = True
    needSearch: bool = True
    needCategories: bool = True
    needTags: bool = True
    needContactForm: bool = True
    needNewsletter: bool = True
    needFaq: bool = True
    needTestimonials: bool = False
    needAnalytics: bool = True
    needAds: bool = True
    needCookieConsent: bool = True
    needDarkMode: bool = True
    needRssFeed: bool = True
    needSitemap: bool = True
    needRobots: bool = True
    needSocialSharing: bool = True
    createdAt: str = ""

class GeneratedFile(BaseModel):
    path: str
    content: str
    sizeBytes: int
    language: str

class AdSenseAuditItem(BaseModel):
    id: str
    category: str
    title: str
    status: str  # PASS, WARNING, FAIL
    explanation: str
    recommendation: str

class AdSenseAuditReport(BaseModel):
    overallScore: int
    readinessLevel: str
    items: List[AdSenseAuditItem]
    disclaimer: str
    timestamp: str

class WorkflowStep(BaseModel):
    stepIndex: int
    name: str
    agentName: str
    description: str
    status: str = "PENDING"
    durationMs: Optional[int] = None

class AgentLogMessage(BaseModel):
    id: str
    timestamp: str
    agentName: str
    message: str
    level: str = "info"
    details: Optional[str] = None

class GeneratedProject(BaseModel):
    id: str
    requirements: ProjectRequirements
    steps: List[WorkflowStep]
    logs: List[AgentLogMessage]
    files: List[GeneratedFile]
    auditReport: AdSenseAuditReport
    status: str = "COMPLETED"
    currentStepIndex: int = 22

class FileUpdateRequest(BaseModel):
    path: str
    content: str

class AiModifyRequest(BaseModel):
    prompt: str
