export interface UserProfile {
  fullName: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  teamSize: string;
}

export interface ICPInfo {
  targetIndustry: string;
  companySizeRange: string;
  targetJobTitles: string;
  keyPainPoints: string;
  budgetRange: string;
}

export interface BrandToneInfo {
  tone: "professional" | "friendly" | "direct" | "consultative";
  brandTagline: string;
  keyMessagingPillars: string[];
  companyDescription: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "Active" | "Draft" | "Archived";
  emailsSent: number;
  openRate: number;
  clickRate: number;
  repliesReceived: number;
  meetingsScheduled: number;
  estimatedPipelineValue: number;
  createdAt: string;
}

export interface Prospect {
  name: string;
  title: string;
  company: string;
  recentActivity: string;
  cta: string;
}

export interface EmailVariant {
  id?: string;
  subjectLine: string;
  emailBody: string;
  keyPersonalizationElements: string[];
  predictedOpenRate: number;
  predictedClickRate: number;
}
