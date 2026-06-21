import { useState } from "react";
import { useStore } from "../store";
import { Sun, Moon, RefreshCw, LogOut, ChevronDown } from "lucide-react";
import CadenceLogo from "./CadenceLogo";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", label: "EN" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", label: "HI" },
  { code: "es", name: "Español", flag: "🇪🇸", label: "ES" },
  { code: "fr", name: "Français", flag: "🇫🇷", label: "FR" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", label: "DE" }
] as const;

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { 
    userProfile, 
    theme, 
    toggleTheme, 
    currentView, 
    setView, 
    resetOnboarding,
    isOnboarded,
    language,
    setLanguage,
    isLoggedIn,
    logout
  } = useStore();

  return (
    <header className="border-b border-[#e2e8f0]/80 dark:border-slate-800/80 bg-[#f8fafc]/90 dark:bg-[#070913]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-all duration-200">
      {/* Brand logo modeled after tablet mockup: Custom Cadence Curve */}
      <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setView("landing")}>
        <div className="flex items-center space-x-2">
          <CadenceLogo />
          <span className="px-2 py-0.5 text-[8px] font-mono tracking-widest text-[#FF6B35] bg-[#FFF2EB] dark:text-[#FFB84D] dark:bg-[#FF6B35]/20 rounded-full font-bold uppercase hidden sm:inline-block">
            Pro
          </span>
        </div>
      </div>

      {/* Center navigation shortcuts: Only display when logged in */}
      {isLoggedIn ? (
        <div className="flex items-center bg-[#f0f2f5] dark:bg-[#151720] p-1 rounded-full border border-[#e2e8f0]/40 dark:border-slate-800/40">
          <button
            onClick={() => {
              setView("dashboard");
            }}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
              currentView === "dashboard"
                ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm ring-1 ring-[#e5e7eb]/20 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
            id="nav-strategy-btn"
          >
            AI Predictive Strategy
          </button>
          
          {isOnboarded ? (
            <>
              <button
                onClick={() => {
                  setView("dashboard");
                  setTimeout(() => {
                    const el = document.getElementById("active-campaigns-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  currentView === "dashboard" && window.location.hash === "#campaigns"
                    ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
                id="nav-mycampaigns-btn"
              >
                My Campaigns
              </button>
              <button
                onClick={() => setView("composer")}
                className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  currentView === "composer"
                    ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
                id="nav-[#creativebuild]-btn"
              >
                Creative Build
              </button>
            </>
          ) : (
            <button
              onClick={() => setView("onboarding")}
              className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                currentView === "onboarding"
                  ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Creative Build (Setup)
            </button>
          )}
        </div>
      ) : (
        <div className="hidden md:flex items-center text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide uppercase font-mono select-none">
          B2B Personalized Sales Orchestrator
        </div>
      )}

      {/* Right controls: Theme toggler, language switch and conditional profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Usability Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1f2230] transition-colors cursor-pointer"
          title="Toggle Light/Dark"
          id="theme-toggler"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Global Language Switcher with exactly 5 major languages */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-[#181a24] hover:bg-slate-100 dark:hover:bg-[#1f2230] rounded-lg border border-[#e2e8f0]/80 dark:border-slate-800 transition-colors shadow-sm cursor-pointer select-none"
            id="language-select-btn"
            title="Change Language"
          >
            <span className="text-xs">{LANGUAGES.find(l => l.code === language)?.flag || "🇺🇸"}</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono tracking-wider uppercase">
              {LANGUAGES.find(l => l.code === language)?.label || "EN"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <>
              {/* Overlay clickable mask to shut select box */}
              <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={() => setIsLangOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#11131e]/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 dark:border-white/5 py-1.5 z-50 animate-fade-in text-xs text-left">
                <div className="px-3 py-1 border-b border-slate-150 dark:border-white/5 pb-1.5 mb-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 flex items-center justify-between transition-colors cursor-pointer ${
                      language === lang.code 
                        ? "text-[#FF6B35] dark:text-[#FFB84D] font-bold bg-[#FFF2EB]/50 dark:bg-primary/15" 
                        : "text-slate-700 dark:text-slate-300 relative"
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {language === lang.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* User profile section or Sign In Button depending on login state */}
        {!isLoggedIn ? (
          <button
            onClick={() => setView("auth")}
            className="px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-tr from-primary to-[#FF4500] hover:from-primary-hover hover:to-[#FF4500]/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md shadow-primary/10 cursor-pointer active:scale-95"
            id="header-signin-btn"
          >
            Sign In
          </button>
        ) : (
          <>
            {/* Dynamic Country US flag indicator seen on mockup */}
            <div className="flex items-center space-x-1 bg-white dark:bg-[#181a24] p-1.5 rounded-md border border-[#e5e7eb] dark:border-slate-800 select-none cursor-help shadow-sm" title="Server Region: US East-1">
              <div className="relative w-4 h-3 flex flex-col justify-between overflow-hidden rounded-[2px] border border-slate-200 animate-pulse">
                <div className="h-[40%] bg-[#1e3a8a] w-[45%] absolute top-0 left-0" />
                <div className="h-[14%] bg-[#ef4444]" />
                <div className="h-[14%] bg-white" />
                <div className="h-[14%] bg-[#ef4444]" />
                <div className="h-[14%] bg-white" />
                <div className="h-[14%] bg-[#ef4444]" />
                <div className="h-[14%] bg-white" />
                <div className="h-[14%] bg-[#ef4444]" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 font-mono">US</span>
            </div>

            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden lg:block text-right">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight leading-3">
                  {userProfile.fullName}
                </h4>
                <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                  {userProfile.companyName || "Outpost LLC"}
                </p>
              </div>

              <div className="relative group">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shadow-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
                    alt="Sarah Chen avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </div>

                {/* Quick dropdown simulation */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-slate-150 dark:border-slate-700">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {userProfile.fullName}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {userProfile.jobTitle}
                    </p>
                  </div>
                  <button
                    onClick={resetOnboarding}
                    className="w-full text-left px-4 py-2 hover:bg-primary/5 dark:hover:bg-primary/10 text-primary dark:text-[#FFB84D] flex items-center space-x-2 font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Onboarding Wizard</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 flex items-center space-x-2 cursor-pointer font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
