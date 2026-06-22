import { useEffect } from "react";
import { useStore } from "./store";
import Header from "./components/Header";
import LandingView from "./components/LandingView";
import OnboardingWizard from "./components/OnboardingWizard";
import DashboardView from "./components/DashboardView";
import EmailComposerView from "./components/EmailComposerView";
import AuthView from "./components/AuthView";
import CadenceLogo from "./components/CadenceLogo";
import AnimatedBackground from "./components/AnimatedBackground";
import { ArrowRight, Settings } from "lucide-react";

export default function App() {
  const { currentView, theme, isOnboarded, isLoggedIn, setView, restoreSession, sessionIsLoading } = useStore();

  // Try to restore session on page reload/mount
  useEffect(() => {
    restoreSession().catch((e) => console.error("Session restoration crashed on boot", e));
  }, [restoreSession]);

  // Handle theme transitions globally by targeting documentElement
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Dynamic Protected View Renderer
  const renderView = () => {
    if (!isLoggedIn) {
      if (currentView === "landing") {
        return <LandingView />;
      }
      return <AuthView />;
    }

    switch (currentView) {
      case "landing":
        return <LandingView />;
      case "auth":
        return <AuthView />;
      case "onboarding":
        return <OnboardingWizard />;
      case "dashboard":
        return isOnboarded ? <DashboardView /> : <OnboardingWizard />;
      case "composer":
        return isOnboarded ? <EmailComposerView /> : <OnboardingWizard />;
      default:
        return <LandingView />;
    }
  };

  const handleFooterScrollLink = (id: string) => {
    const mainEl = document.querySelector("main");
    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const elRect = el.getBoundingClientRect();
        if (mainEl) {
          const mainRect = mainEl.getBoundingClientRect();
          const targetScrollTop = elRect.top - mainRect.top + mainEl.scrollTop - offset;
          mainEl.scrollTo({ top: targetScrollTop, behavior: "smooth" });
        }
        const targetWindowScroll = elRect.top + window.scrollY - offset;
        window.scrollTo({ top: targetWindowScroll, behavior: "smooth" });
      }
    };

    if (currentView !== "landing") {
      setView("landing");
      setTimeout(performScroll, 220);
    } else {
      performScroll();
    }
  };

  if (sessionIsLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col justify-center items-center text-brand-text font-sans space-y-4" id="applet-bootloader-screen">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-brand-secondary">C</div>
        </div>
        <p className="text-xs font-mono text-slate-400 animate-pulse tracking-widest uppercase">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text transition-all duration-300 font-sans relative animated-ambient-bg pt-[73px]" id="applet-viewport-root">
      
      {/* GLOBAL SUBTLE ANIMATED SPECTRAL BACKDROP LAYER */}
      <div className="animated-blobs-layer">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
        <AnimatedBackground />
        <div className="absolute inset-0 grid-mesh-lines opacity-40 dark:opacity-60 pointer-events-none" />
      </div>

      {/* 1. Global Header Platform Banner (Sticky across all views, including Landing Page) */}
      <Header />

      {/* 2. Platform Content container (No Sidebar) - Edge-to-edge for landing */}
      <main className="flex-1 flex flex-col overflow-y-auto relative z-10">
        {currentView === "landing" ? (
          renderView()
        ) : (
          <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20">
            {/* Onboarding block message for locked tabs */}
            {isLoggedIn && !isOnboarded && (currentView === "dashboard" || currentView === "composer") && (
              <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-cadence-slate-900 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl text-center space-y-4 shadow-sm">
                <Settings className="w-12 h-12 text-amber-500 mx-auto animate-spin" />
                <h3 className="text-lg font-bold text-cadence-slate-900 dark:text-white">
                  Onboarding Verification Required
                </h3>
                <p className="text-xs text-cadence-slate-500">
                  To access outbound campaign metrics or the AI Copywriter workshop, please complete the brand setup checklist.
                </p>
                <button
                  onClick={() => setView("onboarding")}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover flex items-center justify-center space-x-2 mx-auto cursor-pointer"
                >
                  <span>Complete Wizard Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Verified Content Node */}
            {(isOnboarded || !isLoggedIn || currentView === "onboarding" || currentView === "auth") && renderView()}
          </div>
        )}

        {/* Global Footer (Render only when not on landing page) */}
        {currentView !== "landing" && (
          <footer className="border-t border-[#FFE5D0]/30 dark:border-white/5 bg-transparent py-16 px-6 text-center text-xs text-[#6B5344] dark:text-slate-400 relative z-25 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-2">
                <CadenceLogo textColorClass="text-[#1A1410] dark:text-white" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-[#D45D00] dark:text-[#FFB84D] bg-[#FFE5D0]/50 dark:bg-[#FF6B35]/15 px-2 py-0.5 rounded">v2.0</span>
              </div>
              <p className="text-[11px] font-mono tracking-wide opacity-80 max-w-sm sm:max-w-none">
                © {new Date().getFullYear()} Cadence Labs. Continuous context outreach sequence engine. All rights reserved. Code crafted with strict precision metrics.
              </p>
              <div className="flex items-center space-x-4 font-extrabold uppercase text-[10px] tracking-widest">
                <button onClick={() => handleFooterScrollLink("features-comparison-container")} className="hover:text-brand-primary cursor-pointer transition-colors">Outreach Comparison</button>
                <button onClick={() => handleFooterScrollLink("pricing-section-container")} className="hover:text-brand-primary cursor-pointer transition-colors">Pricing Specs</button>
              </div>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
