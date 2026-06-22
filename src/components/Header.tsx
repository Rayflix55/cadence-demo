import { useState, useEffect } from "react";
import { useStore } from "../store";
import { Sun, Moon, RefreshCw, LogOut, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { 
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

  // Highlight center active nav under landing / segments under sandbox dynamically
  useEffect(() => {
    setActiveSection("home");
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      const mainEl = document.querySelector("main");
      const isMainScrollable = mainEl ? mainEl.scrollHeight > mainEl.clientHeight + 10 : false;
      const currentScroll = isMainScrollable && mainEl ? mainEl.scrollTop : window.scrollY;

      if (currentView === "landing") {
        const comparisonEl = document.getElementById("landing-comparison-section");
        const featuresEl = document.getElementById("features-section");
        const pricingEl = document.getElementById("pricing-section-container");
        const testimonialsEl = document.getElementById("testimonials-section");

        const getElScrollTop = (el: HTMLElement | null) => {
          if (!el) return Infinity;
          if (isMainScrollable && mainEl) {
            const mainRect = mainEl.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            return elRect.top - mainRect.top + mainEl.scrollTop - 140;
          } else {
            const elRect = el.getBoundingClientRect();
            return elRect.top + window.scrollY - 140;
          }
        };

        const targetOffsets = [
          { id: "home", top: 0 },
          { id: "comparison", top: getElScrollTop(comparisonEl) },
          { id: "features", top: getElScrollTop(featuresEl) },
          { id: "pricing", top: getElScrollTop(pricingEl) },
          { id: "testimonials", top: getElScrollTop(testimonialsEl) }
        ];

        // Sort to check lower boundary first
        targetOffsets.sort((a, b) => b.top - a.top);

        let detected = "home";

        for (const item of targetOffsets) {
          if (item.top !== Infinity && currentScroll >= item.top - 10) {
            detected = item.id;
            break;
          }
        }
        setActiveSection(detected);
      } else if (currentView === "dashboard") {
        const activeCampEl = document.getElementById("active-campaigns-section");
        if (activeCampEl) {
          const rect = activeCampEl.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 100) {
            setActiveSection("campaigns");
          } else {
            setActiveSection("analytics");
          }
        } else {
          setActiveSection("analytics");
        }
      } else if (currentView === "composer") {
        setActiveSection("composer");
      } else if (currentView === "onboarding") {
        setActiveSection("onboarding");
      } else if (currentView === "auth") {
        setActiveSection("auth");
      }
    };

    const mainEl = document.querySelector("main");

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (mainEl) {
      mainEl.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Run once instantly
    handleScroll();

    // Set short intervals to make sure sections load correctly
    const timer = setInterval(handleScroll, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mainEl) {
        mainEl.removeEventListener("scroll", handleScroll);
      }
      clearInterval(timer);
    };
  }, [currentView]);

  const getPageStatus = () => {
    switch (currentView) {
      case "landing":
        switch (activeSection) {
          case "comparison":
            return "Portal ➔ Comparison";
          case "features":
            return "Portal ➔ Technical Blog";
          case "pricing":
            return "Portal ➔ Pricing Specs";
          case "testimonials":
            return "Portal ➔ Client Insights";
          case "home":
          default:
            return "Outreach Marketing Portal";
        }
      case "auth":
        return "Authorization Hub";
      case "onboarding":
        return "Onboarding Profile";
      case "dashboard":
        switch (activeSection) {
          case "campaigns":
            return "Console ➔ Active Campaigns";
          case "analytics":
          default:
            return "Predictive Strategy Sandbox";
        }
      case "composer":
        return "Smart Copywriter Workspace";
      default:
        return "Sales Workspace";
    }
  };

  const handleScrollLink = (id: string) => {
    const mainEl = document.querySelector("main");
    
    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100; // spacious offset below fixed header
        const elRect = el.getBoundingClientRect();

        // 1. Scroll mainEl if it's the scroll container
        if (mainEl) {
          const mainRect = mainEl.getBoundingClientRect();
          const targetScrollTop = elRect.top - mainRect.top + mainEl.scrollTop - offset;
          mainEl.scrollTo({
            top: targetScrollTop,
            behavior: "smooth"
          });
        }

        // 2. Also scroll window to make sure we support window-level scrolling safely
        const targetWindowScroll = elRect.top + window.scrollY - offset;
        window.scrollTo({
          top: targetWindowScroll,
          behavior: "smooth"
          });
      }
    };

    if (currentView !== "landing") {
      setView("landing");
      setTimeout(performScroll, 220);
    } else {
      performScroll();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/75 dark:bg-brand-bg/75 backdrop-blur-lg border-b border-slate-200/50 dark:border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo and Sticky Status Badge */}
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center space-x-1.5 cursor-pointer select-none" onClick={() => setView("landing")}>
            <CadenceLogo />
            <span className="px-1.5 py-0.5 text-[8px] font-mono tracking-widest text-brand-primary bg-brand-primary/10 rounded-md font-bold uppercase hidden sm:inline-block">
              Pro
            </span>
          </div>

          {/* Connected Live Indicator and Current Page Status */}
          <div className="flex items-center space-x-1.5 border-l border-slate-200 dark:border-white/10 pl-3.5 select-none shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-brand-primary opacity-90">
              {getPageStatus()}
            </span>
          </div>
        </div>

        {/* Center Navigation Shortcuts (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-1">
          {currentView === "landing" ? (
            /* Marketing anchors inside center menu capsule pillow */
            <nav className="flex items-center space-x-1 bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 backdrop-blur-xl px-1.5 py-1.5 rounded-full shadow-sm">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const mainEl = document.querySelector("main");
                  if (mainEl) mainEl.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveSection("home");
                }}
                className={`px-4 py-1.5 text-[11px] font-extrabold tracking-wider uppercase rounded-full shadow-sm cursor-pointer select-none transition-all duration-200 ${
                  activeSection === "home"
                    ? "bg-brand-primary text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Home
              </button>
              
              <button 
                onClick={() => handleScrollLink("landing-comparison-section")}
                className={`px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeSection === "comparison"
                    ? "bg-brand-primary text-white rounded-full shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                About
              </button>
              
              <button 
                onClick={() => handleScrollLink("testimonials-section")}
                className={`px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeSection === "testimonials"
                    ? "bg-brand-primary text-white rounded-full shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Testimonials
              </button>
              
              <button 
                onClick={() => handleScrollLink("pricing-section-container")}
                className={`px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeSection === "pricing"
                    ? "bg-brand-primary text-white rounded-full shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Pricing
              </button>
              
              <button 
                onClick={() => handleScrollLink("features-section")}
                className={`px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeSection === "features"
                    ? "bg-brand-primary text-white rounded-full shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Blog
              </button>
            </nav>
          ) : (
            /* Platform operations links */
            isLoggedIn && (
              <div className="flex items-center bg-[#f0f2f5] dark:bg-white/5 p-1 rounded-full border border-slate-200/40 dark:border-white/5">
                <button
                  onClick={() => setView("dashboard")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    currentView === "dashboard" && activeSection !== "campaigns"
                      ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm ring-1 ring-[#e5e7eb]/20 font-bold"
                      : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  Predictive Strategy
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
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                        currentView === "dashboard" && activeSection === "campaigns"
                          ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm font-bold"
                          : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      My Campaigns
                    </button>
                    <button
                      onClick={() => setView("composer")}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                        currentView === "composer"
                          ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm font-bold"
                          : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Creative Build
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setView("onboarding")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                      currentView === "onboarding"
                        ? "bg-white dark:bg-[#1f2230] text-black dark:text-white shadow-sm font-bold"
                        : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    Setup
                  </button>
                )}
              </div>
            )
          )}
        </div>

        {/* Right Side: Theme, Language and Conditional Action Center (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white bg-[#f1f5f9] dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
            title="Toggle Light/Dark Workspace"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Language Picker */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#f1f5f9] dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl border border-slate-200/50 dark:border-white/10 transition-colors shadow-sm cursor-pointer select-none"
            >
              <span className="text-xs">{LANGUAGES.find(l => l.code === language)?.flag || "🇺🇸"}</span>
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 font-mono tracking-wider">
                {LANGUAGES.find(l => l.code === language)?.label || "EN"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#11131e] backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 dark:border-white/5 py-1.5 z-50 text-xs text-left">
                  <div className="px-3 py-1 border-b border-slate-100 dark:border-white/5 pb-1.5 mb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-brand-primary/10 flex items-center justify-between transition-colors cursor-pointer ${
                        language === lang.code ? "text-brand-primary font-black" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Action Deck (Completely clean profile-less design) */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-white/10 pl-3">
              {/* Back to marketing button if currently on workspace */}
              {currentView !== "landing" && (
                <button
                  onClick={() => setView("landing")}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                >
                  Landing
                </button>
              )}

              {/* Reset onboarding assistant wizard */}
              <button
                onClick={resetOnboarding}
                className="p-2 rounded-xl text-slate-500 hover:text-brand-primary dark:text-slate-400 dark:hover:text-brand-secondary bg-[#f1f5f9] dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
                title="Reset/Re-run Onboarding Wizard"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Exit Console */}
              <button
                onClick={logout}
                className="p-2 rounded-xl text-red-500 hover:text-red-650 bg-[#fff5f5] dark:bg-red-950/10 border border-red-200/30 dark:border-red-900/10 hover:bg-red-100 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                title="Log Out of Console"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setView("auth")}
              className="px-4.5 py-2 btn-primary-custom text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer flex items-center space-x-1"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Responsive Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Theme switcher directly on main bar for visibility */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 transition-colors"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3.5 pt-3.5 border-t border-slate-200 dark:border-white/5 space-y-3 animate-fade-in z-50 relative">
          
          {/* Landing specific or logged out navigation links */}
          {currentView === "landing" || !isLoggedIn ? (
            <div className="flex flex-col space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Explore Launchpad
              </div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const mainEl = document.querySelector("main");
                  if (mainEl) mainEl.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveSection("home");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === "home"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-100/50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleScrollLink("landing-comparison-section")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === "comparison"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                About Comparison
              </button>
              <button
                onClick={() => handleScrollLink("testimonials-section")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === "testimonials"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                Testimonials
              </button>
              <button
                onClick={() => handleScrollLink("pricing-section-container")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === "pricing"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                Pricing Specifications
              </button>
              <button
                onClick={() => handleScrollLink("features-section")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === "features"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                Technical Blog / Setup
              </button>
            </div>
          ) : (
            /* Logged in direct dashboard links */
            <div className="flex flex-col space-y-1.5">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Consoles Workspace
              </div>
              <button
                onClick={() => {
                  setView("dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  currentView === "dashboard" && activeSection !== "campaigns"
                    ? "bg-brand-primary/15 text-brand-primary"
                    : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300"
                }`}
              >
                Predictive Strategy Sandbox
              </button>

              {isOnboarded ? (
                <>
                  <button
                    onClick={() => {
                      setView("dashboard");
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById("active-campaigns-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 180);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      currentView === "dashboard" && activeSection === "campaigns"
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    My Active Campaigns
                  </button>

                  <button
                    onClick={() => {
                      setView("composer");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      currentView === "composer"
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    Smart Creative Build
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setView("onboarding");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    currentView === "onboarding"
                      ? "bg-brand-primary/15 text-brand-primary"
                      : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  Onboarding On-click Wizard
                </button>
              )}
            </div>
          )}

          {/* Action Row & Languages (Mobile Bottom Deck) */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/5 space-y-3">
            {isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    resetOnboarding();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Wizard</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-950/10 text-red-650 hover:bg-red-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setView("auth");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 bg-brand-primary text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
              >
                Sign In to Platform
              </button>
            )}

            {/* Quick Language switcher array */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Select Language
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 rounded-lg text-xs font-bold font-mono tracking-wider text-center transition-all ${
                      language === lang.code 
                        ? "bg-brand-primary text-white font-black" 
                        : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
