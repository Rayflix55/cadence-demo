import { create } from "zustand";
import { UserProfile, ICPInfo, BrandToneInfo, Campaign } from "./types";

interface AppState {
  isLoggedIn: boolean;
  userEmail: string;
  isOnboarded: boolean;
  userProfile: UserProfile;
  icpInfo: ICPInfo;
  brandToneInfo: BrandToneInfo;
  campaigns: Campaign[];
  currentView: "landing" | "onboarding" | "dashboard" | "composer" | "auth";
  theme: "light" | "dark";
  language: "en" | "hi" | "es" | "fr" | "de";
  
  // Actions
  setLoggedIn: (val: boolean, email?: string) => void;
  logout: () => void;
  setOnboarded: (val: boolean) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateICPInfo: (icp: Partial<ICPInfo>) => void;
  updateBrandToneInfo: (tone: Partial<BrandToneInfo>) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  setView: (view: "landing" | "onboarding" | "dashboard" | "composer" | "auth") => void;
  toggleTheme: () => void;
  setLanguage: (lang: "en" | "hi" | "es" | "fr" | "de") => void;
  resetOnboarding: () => void;
}

const defaultUserProfile: UserProfile = {
  fullName: "Sarah Chen",
  companyName: "TechFlow Solutions",
  jobTitle: "VP of Sales",
  industry: "SaaS / Cloud Services",
  teamSize: "12-15",
};

const defaultICPInfo: ICPInfo = {
  targetIndustry: "B2B Technology & Fintech",
  companySizeRange: "50-500 employees",
  targetJobTitles: "Head of Marketing, VP Revenue, VP Sales",
  keyPainPoints: "High bounce rates, poor response rates in cold outbound pipelines",
  budgetRange: "$1,000 - $5,000/month",
};

const defaultBrandToneInfo: BrandToneInfo = {
  tone: "consultative",
  brandTagline: "Relevance first, scale second",
  keyMessagingPillars: ["Hyper-personalization with context", "AI-assisted B2B prospecting", "Value-driven dialogue"],
  companyDescription: "TechFlow Solutions delivers intelligent prospect insights to help revenue operations scale high-quality personalized outbound flows.",
};

const initialCampaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Q2 Enterprise Outreach",
    status: "Active",
    emailsSent: 1247,
    openRate: 54.2,
    clickRate: 14.8,
    repliesReceived: 89,
    meetingsScheduled: 12,
    estimatedPipelineValue: 480000,
    createdAt: "2026-05-12",
  },
  {
    id: "camp-2",
    name: "Mid-Market Expansion",
    status: "Draft",
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
    repliesReceived: 0,
    meetingsScheduled: 0,
    estimatedPipelineValue: 0,
    createdAt: "2026-06-18",
  },
  {
    id: "camp-3",
    name: "Fintech Growth Campaign",
    status: "Active",
    emailsSent: 820,
    openRate: 61.5,
    clickRate: 21.3,
    repliesReceived: 104,
    meetingsScheduled: 18,
    estimatedPipelineValue: 620000,
    createdAt: "2026-06-01",
  }
];

// Helper to safely read from localStorage
const getStoredState = <T>(key: string, defaultValue: T): T => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStoredState = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore storage issues
  }
};

export const useStore = create<AppState>((set) => ({
  isLoggedIn: getStoredState<boolean>("cadence_isLoggedIn", false),
  userEmail: getStoredState<string>("cadence_userEmail", ""),
  isOnboarded: getStoredState<boolean>("cadence_isOnboarded", false), // For new users, defaults to false
  userProfile: getStoredState<UserProfile>("cadence_userProfile", defaultUserProfile),
  icpInfo: getStoredState<ICPInfo>("cadence_icpInfo", defaultICPInfo),
  brandToneInfo: getStoredState<BrandToneInfo>("cadence_brandToneInfo", defaultBrandToneInfo),
  campaigns: getStoredState<Campaign[]>("cadence_campaigns", initialCampaigns),
  currentView: getStoredState<AppState["currentView"]>("cadence_currentView", "landing"),
  theme: getStoredState<"light" | "dark">("cadence_theme", "light"),
  language: getStoredState<AppState["language"]>("cadence_language", "en"),

  setLoggedIn: (val, email = "") => {
    set({ isLoggedIn: val, userEmail: email });
    setStoredState("cadence_isLoggedIn", val);
    setStoredState("cadence_userEmail", email);
  },
  logout: () => {
    set({ isLoggedIn: false, userEmail: "", isOnboarded: false, currentView: "landing" });
    setStoredState("cadence_isLoggedIn", false);
    setStoredState("cadence_userEmail", "");
    setStoredState("cadence_isOnboarded", false);
  },
  setOnboarded: (val) => {
    set({ isOnboarded: val });
    setStoredState("cadence_isOnboarded", val);
  },
  updateUserProfile: (profile) => set((state) => {
    const updated = { ...state.userProfile, ...profile };
    setStoredState("cadence_userProfile", updated);
    return { userProfile: updated };
  }),
  updateICPInfo: (icp) => set((state) => {
    const updated = { ...state.icpInfo, ...icp };
    setStoredState("cadence_icpInfo", updated);
    return { icpInfo: updated };
  }),
  updateBrandToneInfo: (tone) => set((state) => {
    const updated = { ...state.brandToneInfo, ...tone };
    setStoredState("cadence_brandToneInfo", updated);
    return { brandToneInfo: updated };
  }),
  setCampaigns: (campaigns) => {
    set({ campaigns });
    setStoredState("cadence_campaigns", campaigns);
  },
  addCampaign: (campaign) => set((state) => {
    const updated = [campaign, ...state.campaigns];
    setStoredState("cadence_campaigns", updated);
    return { campaigns: updated };
  }),
  setView: (currentView) => {
    set({ currentView });
    setStoredState("cadence_currentView", currentView);
  },
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    setStoredState("cadence_theme", nextTheme);
    return { theme: nextTheme };
  }),
  setLanguage: (language) => {
    set({ language });
    setStoredState("cadence_language", language);
  },
  resetOnboarding: () => set((state) => {
    setStoredState("cadence_isOnboarded", false);
    return { isOnboarded: false, currentView: "onboarding" };
  }),
}));
