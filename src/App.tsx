import { useEffect } from "react";
import { useStore } from "./store";
import Header from "./components/Header";
import LandingView from "./components/LandingView";
import OnboardingWizard from "./components/OnboardingWizard";
import DashboardView from "./components/DashboardView";
import EmailComposerView from "./components/EmailComposerView";
import AuthView from "./components/AuthView";
import { ArrowRight, Settings } from "lucide-react";

export default function App() {
  const { currentView, theme, isOnboarded, isLoggedIn, setView } = useStore();

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

  return (
    <div className="min-h-screen flex flex-col bg-b2b-bg-light dark:bg-b2b-bg-dark text-cadence-slate-800 dark:text-cadence-slate-100 transition-colors duration-250 font-sans" id="applet-viewport-root">
      
      {/* 1. Global Header Platform Banner (Top Nav Only) */}
      <Header />

      {/* 2. Platform Content container (No Sidebar) */}
      <main className="flex-1 flex flex-col overflow-y-auto">
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
          {(isOnboarded || !isLoggedIn || currentView === "onboarding" || currentView === "auth" || currentView === "landing") && renderView()}

        </div>

        {/* Global Footer */}
        <footer className="border-t border-cadence-slate-200 dark:border-slate-800 bg-white dark:bg-cadence-slate-900 py-12 px-6 text-center text-xs text-cadence-slate-500 transition-colors mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center font-bold text-white text-[11px]">
                C
              </div>
              <span className="font-display font-semibold text-cadence-slate-800 dark:text-white">Cadence Sales AI</span>
            </div>
            <p className="font-mono">© 2026 Cadence. Crafted for full-stack B2B SaaS outreach enablement.</p>
            <div className="flex space-x-4">
              <button onClick={() => setView("landing")} className="hover:text-primary cursor-pointer">Home</button>
              {!isLoggedIn ? (
                <button onClick={() => setView("auth")} className="hover:text-primary cursor-pointer">Sign In / Sign Up</button>
              ) : (
                <>
                  <button onClick={() => setView("onboarding")} className="hover:text-primary cursor-pointer">Onboarding Wizard</button>
                  <button onClick={() => setView("dashboard")} className="hover:text-primary cursor-pointer">Dashboard</button>
                </>
              )}
              <a href="#pricing-calculator-container" className="hover:text-primary cursor-pointer">Pricing Specs</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
