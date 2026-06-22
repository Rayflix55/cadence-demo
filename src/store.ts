import { create } from "zustand";
import { UserProfile, ICPInfo, BrandToneInfo, Campaign } from "./types";
import { dbGetCampaignsForUser, dbSaveCampaign, dbGetSession, dbSaveSession, dbDeleteSession } from "./utils/db";
import { encryptData, decryptData } from "./utils/crypto";

interface AppState {
  // Existing states (linked with local-first parameters for zero runtime breaks)
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

  // New specific local-first specs requested
  isAuthenticated: boolean;
  currentUser: string;
  sessionToken: string;
  sessionIsLoading: boolean;
  
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

  // Specific local-first actions requested
  setUser: (username: string, sessionToken: string) => Promise<void>;
  clearUser: () => Promise<void>;
  restoreSession: () => Promise<boolean>;
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

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  userEmail: "",
  isOnboarded: false,
  userProfile: defaultUserProfile,
  icpInfo: defaultICPInfo,
  brandToneInfo: defaultBrandToneInfo,
  campaigns: [],
  currentView: "landing",
  theme: getStoredState<"light" | "dark">("cadence-theme", getStoredState<"light" | "dark">("cadence_theme", "dark")),
  language: getStoredState<AppState["language"]>("cadence_language", "en"),

  // Local-first specs
  isAuthenticated: false,
  currentUser: "",
  sessionToken: "",
  sessionIsLoading: true,

  setLoggedIn: (val, email = "") => {
    set({ isLoggedIn: val, userEmail: email, isAuthenticated: val, currentUser: email });
    setStoredState("cadence_isLoggedIn", val);
    setStoredState("cadence_userEmail", email);
  },

  logout: async () => {
    const token = get().sessionToken;
    if (token) {
      try {
        await dbDeleteSession(token);
      } catch (err) {
        // Safe to ignore on logout path
      }
    }
    
    localStorage.removeItem("cadence_session_token");
    set({ 
      isLoggedIn: false, 
      userEmail: "", 
      isOnboarded: false, 
      currentView: "landing",
      isAuthenticated: false,
      currentUser: "",
      sessionToken: "",
      campaigns: []
    });
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
    const username = get().currentUser || get().userEmail;
    if (username) {
      // Background Sync to IndexedDB for continuous reliability
      campaigns.forEach(async (c) => {
        try {
          await dbSaveCampaign({
            id: c.id,
            username: username,
            campaignData: c,
            createdAt: new Date(c.createdAt).getTime() || Date.now(),
            updatedAt: Date.now()
          });
        } catch (e) {
          console.error("IndexedDB sync failed inside setCampaigns:", e);
        }
      });
    }
  },

  addCampaign: (campaign) => set((state) => {
    const updated = [campaign, ...state.campaigns];
    const username = state.currentUser || state.userEmail;
    if (username) {
      // Async persist to db
      dbSaveCampaign({
        id: campaign.id,
        username: username,
        campaignData: campaign,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }).catch(err => console.error("Database save failed inside addCampaign:", err));
    }
    return { campaigns: updated };
  }),

  setView: (currentView) => {
    set({ currentView });
    setStoredState("cadence_currentView", currentView);
  },

  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    setStoredState("cadence-theme", nextTheme);
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

  // Specific local-first actions requested
  setUser: async (username: string, tokenHex: string) => {
    // Generate encrypted session data payload to save securely in DB
    const sessionPayload = { username, createdAt: Date.now() };
    const encryptedData = await encryptData(JSON.stringify(sessionPayload));

    // Save session in IndexedDB
    await dbSaveSession({
      id: tokenHex,
      username: username,
      encryptedData: encryptedData,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry
    });

    // Store encrypted session ID in localStorage for quick load optimization
    localStorage.setItem("cadence_session_token", tokenHex);

    // Fetch this user's stored campaigns in IndexedDB
    let userCampaigns = await dbGetCampaignsForUser(username);
    if (!userCampaigns || userCampaigns.length === 0) {
      // Prepare initial fresh mock templates for first-time login
      userCampaigns = initialCampaigns.map(c => ({
        id: c.id,
        username: username,
        campaignData: c,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }));

      // Store templates in DB immediately
      for (const item of userCampaigns) {
        await dbSaveCampaign(item);
      }
    }

    const compiledCampaignsList = userCampaigns.map(uc => uc.campaignData);

    set({
      isLoggedIn: true,
      isAuthenticated: true,
      userEmail: username,
      currentUser: username,
      sessionToken: tokenHex,
      campaigns: compiledCampaignsList,
      sessionIsLoading: false
    });

    setStoredState("cadence_isLoggedIn", true);
    setStoredState("cadence_userEmail", username);
  },

  clearUser: async () => {
    const token = get().sessionToken;
    if (token) {
      await dbDeleteSession(token);
    }
    localStorage.removeItem("cadence_session_token");
    set({
      isLoggedIn: false,
      isAuthenticated: false,
      userEmail: "",
      currentUser: "",
      sessionToken: "",
      campaigns: []
    });
    setStoredState("cadence_isLoggedIn", false);
    setStoredState("cadence_userEmail", "");
  },

  restoreSession: async (): Promise<boolean> => {
    set({ sessionIsLoading: true });
    try {
      const storedToken = localStorage.getItem("cadence_session_token");
      if (!storedToken) {
        set({ sessionIsLoading: false });
        return false;
      }

      // Query IndexedDB for session record
      const sessionObj = await dbGetSession(storedToken);
      if (!sessionObj) {
        localStorage.removeItem("cadence_session_token");
        set({ sessionIsLoading: false });
        return false;
      }

      // Check session expiration
      if (sessionObj.expiresAt < Date.now()) {
        // Expired! Clear session safely
        await dbDeleteSession(storedToken);
        localStorage.removeItem("cadence_session_token");
        set({ sessionIsLoading: false });
        return false;
      }

      // Decrypt session secure metadata payload
      try {
        const decryptedStr = await decryptData(sessionObj.encryptedData);
        const payload = JSON.parse(decryptedStr);
        
        // Assert matching username validation
        if (payload.username !== sessionObj.username) {
          throw new Error("Integrity mismatch detected on encrypted token payloads.");
        }

        // Active session is validated! Hydrate campaigns and state in local-first environment
        const userCampaigns = await dbGetCampaignsForUser(sessionObj.username);
        const compiledCampaignsList = userCampaigns.map(uc => uc.campaignData);

        set({
          isLoggedIn: true,
          isAuthenticated: true,
          userEmail: sessionObj.username,
          currentUser: sessionObj.username,
          sessionToken: storedToken,
          campaigns: compiledCampaignsList,
          sessionIsLoading: false
        });

        // Set view to dashboard if currently on landing or login path for super-slick experience
        if (get().currentView === "auth" || get().currentView === "landing") {
          set({ currentView: get().isOnboarded ? "dashboard" : "onboarding" });
        }

        return true;
      } catch (cryptErr) {
        console.error("Cryptographic decryption failed for local session token. Cleared session.", cryptErr);
        await dbDeleteSession(storedToken);
        localStorage.removeItem("cadence_session_token");
        set({ sessionIsLoading: false });
        return false;
      }
    } catch (e) {
      console.error("Session restoration error:", e);
      set({ sessionIsLoading: false });
      return false;
    }
  }
}));
