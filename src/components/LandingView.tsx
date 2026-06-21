import { useStore } from "../store";
import PricingCalculator from "./PricingCalculator";
import { TRANSLATIONS, Language } from "../utils/translations";
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Target, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  HelpCircle,
  Clock,
  Play
} from "lucide-react";

export default function LandingView() {
  const { setView, language } = useStore();
  const langKey = (language as Language) || "en";
  const t = TRANSLATIONS[langKey] || TRANSLATIONS.en;

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden relative bg-[#030712] transition-colors duration-300 text-white" id="landing-marketing-container">
      
      {/* 1. IMMERSIVE HERO SECTION (Revilo aesthetic shifted to blue brand tones) */}
      <section className="relative pt-24 sm:pt-40 pb-20 px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-12 overflow-hidden rounded-[40px] bg-gradient-to-b from-[#090d26]/85 to-[#030712] border border-white/5 shadow-2xl mt-4 sm:mt-8">
        
        {/* Glow backdrop streams */}
        <div className="absolute top-0 left-1/4 right-1/4 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 right-1/3 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* BACKGROUND GLOWING COLUMNS (Revilo Soundwaves) */}
        <div className="absolute inset-x-0 bottom-0 top-12 flex justify-between items-center px-6 sm:px-20 pointer-events-none select-none overflow-hidden opacity-30 sm:opacity-45 z-0">
          {/* Left vertical waveguide grid */}
          <div className="flex items-end space-x-1.5 sm:space-x-3 h-full pb-20">
            {[24, 32, 56, 78, 92, 65, 42, 70, 88, 50, 34, 18, 10].map((h, i) => (
              <div 
                key={`wave-left-${i}`}
                style={{ height: `${h * 0.7}%` }}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-transparent via-blue-500/70 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.45)] transition-all duration-1000 animate-pulse"
              />
            ))}
          </div>
          
          {/* Right vertical waveguide grid */}
          <div className="flex items-end space-x-1.5 sm:space-x-3 h-full pb-20 transform rotate-180">
            {[12, 18, 40, 64, 85, 74, 52, 38, 72, 89, 45, 26, 14].map((h, i) => (
              <div 
                key={`wave-right-${i}`}
                style={{ height: `${h * 0.7}%` }}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-transparent via-cyan-400/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-all duration-1000 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* FLOATING GLASS-METALLIC 3D LOOPS */}
        {/* Top-Right Glass Ring */}
        <div className="absolute top-8 -right-16 sm:right-12 w-48 h-48 sm:w-72 sm:h-72 opacity-50 sm:opacity-80 z-10 pointer-events-none">
          <div className="w-full h-full border-[8px] border-t-cyan-400/40 border-r-indigo-500/20 border-b-blue-600/60 border-l-transparent rounded-full backdrop-blur-[5px] shadow-[inset_0_4px_30px_rgba(6,182,212,0.25),0_25px_60px_rgba(59,130,246,0.35)] transform rotate-45 animate-[spin_45s_linear_infinite]" />
        </div>

        {/* Bottom-Left Glass Ring */}
        <div className="absolute bottom-6 -left-16 sm:left-12 w-44 h-44 sm:w-64 sm:h-64 opacity-40 sm:opacity-70 z-10 pointer-events-none">
          <div className="w-full h-full border-[8px] border-b-cyan-400/40 border-l-blue-500/20 border-t-indigo-500/60 border-r-transparent rounded-full backdrop-blur-[5px] shadow-[inset_0_4px_30px_rgba(59,130,246,0.25),0_25px_60px_rgba(6,182,212,0.35)] transform -rotate-12 animate-[spin_55s_linear_infinite_reverse]" />
        </div>

        {/* Centered Content Container */}
        <div className="relative z-20 space-y-8 max-w-5xl mx-auto pt-6 sm:pt-12">
          
          {/* Avatar proof system inspired by Revilo mockup */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 select-none animate-fade-in">
            <div className="flex -space-x-3">
              <img 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#090d26] object-cover ring-2 ring-blue-500/40"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="Representative 1"
              />
              <img 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#090d26] object-cover ring-2 ring-blue-500/40"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                alt="Representative 2"
              />
              <img 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#090d26] object-cover ring-2 ring-blue-500/40"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                alt="Representative 3"
              />
              <img 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#090d26] object-cover ring-2 ring-blue-500/40"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                alt="Representative 4"
              />
            </div>
            
            <div className="text-center sm:text-left bg-white/5 dark:bg-slate-900/30 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="font-mono font-bold text-slate-300 tracking-widest text-[9px] sm:text-[10px]">
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-black">602+</strong> REVENUE WORKSPACES ACTIVE
              </span>
            </div>
          </div>

          {/* Bold, heavy, high-contrast headline */}
          <h1 className="text-4xl sm:text-7xl font-display font-black tracking-tight text-white max-w-4xl mx-auto leading-none">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
            {t.heroSubtitle}
          </p>

          {/* Premium Blue Glowing CTA control button after mockup design */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30">
            <button
              onClick={() => setView("onboarding")}
              className="relative group w-full sm:w-auto px-10 py-5 text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 overflow-hidden active:scale-95 shadow-[0_0_35px_rgba(37,99,235,0.45)] cursor-pointer"
              id="hero-launch-onboarding-btn"
            >
              {/* Internal neon color shift gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 group-hover:opacity-95 transition-opacity" />
              {/* High precision inset outline halo ring */}
              <div className="absolute inset-[1px] rounded-full bg-slate-950/20 group-hover:bg-transparent transition-colors z-0" />
              
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{t.getStartedBtn}</span>
                <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => setView("dashboard")}
              className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-extrabold text-xs uppercase tracking-widest rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer text-center"
              id="hero-view-demo-btn"
            >
              <span>{t.viewDemo}</span>
            </button>
          </div>

          {/* High Gloss metrics grid wrapped into Hero backdrop to complete depth representation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto pt-20 text-center text-xs">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg space-y-1">
              <strong className="text-3xl sm:text-4xl font-display font-black text-blue-400 block">3x</strong>
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1">Average Response Rate</span>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg space-y-1">
              <strong className="text-3xl sm:text-4xl font-display font-black text-cyan-400 block">150 words</strong>
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1">Optimal Copy Constraint</span>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg space-y-1">
              <strong className="text-3xl sm:text-4xl font-display font-black text-blue-400 block font-mono">10 hrs</strong>
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1">Time Saved / Rep Weekly</span>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg space-y-1">
              <strong className="text-3xl sm:text-4xl font-display font-black text-cyan-400 block">100%</strong>
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1">Safe Sandbox Isolation</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Problem/Solution Outbox Comparison */}
      <section className="bg-slate-950 border-t border-b border-white/5 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              The Outbound Cold Outreach Gap
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              How traditional outbound strategies crash compared to Cadence&apos;s intelligent personalizer engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bad Outbox */}
            <div className="bg-white dark:bg-cadence-slate-900 p-8 rounded-2xl border border-red-200 dark:border-red-950/20 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-red-500 font-bold text-xs uppercase tracking-widest">
                <TrendingDown className="w-4 h-4" />
                <span>The Legacy Way: Dry Bulk Spreads</span>
              </div>
              <h4 className="text-lg font-bold text-cadence-slate-900 dark:text-white">Generic Mail Merging</h4>
              <p className="text-xs text-cadence-slate-500 leading-relaxed">
                Reps copy-paste standardized templates containing basic variables like <code className="bg-red-50 dark:bg-red-950/20 p-1 rounded">{"{{First Name}}"}</code>. Prospects easily spot the automation. Open rates sit under 15%, converting negligible pipelines.
              </p>
              <div className="border-t border-cadence-slate-100 dark:border-cadence-slate-800 pt-4 space-y-2 text-xs text-cadence-slate-600 dark:text-cadence-slate-400">
                <p className="flex items-center space-x-2">
                  <span className="text-red-500 font-extrabold">✕</span>
                  <span>Unrelated generalized pitch templates</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-red-500 font-extrabold">✕</span>
                  <span>Extremely generic non-curiosity subjects</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-red-500 font-extrabold">✕</span>
                  <span>High spam scores and domain bans</span>
                </p>
              </div>
            </div>

            {/* Smart Outbox */}
            <div className="bg-white dark:bg-cadence-slate-900 p-8 rounded-2xl border border-blue-200 dark:border-blue-950/20 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                <span>The Cadence Way: Context Tuning</span>
              </div>
              <h4 className="text-lg font-bold text-cadence-slate-900 dark:text-white">AI Contextual Copywriters</h4>
              <p className="text-xs text-cadence-slate-500 leading-relaxed">
                We synthesize prospects&apos; recent posts, corporate announcements, and job challenges alongside your core messaging anchors. The resulting email copies read like an individualized consultative message.
              </p>
              <div className="border-t border-cadence-slate-100 dark:border-cadence-slate-800 pt-4 space-y-2 text-xs text-cadence-slate-600 dark:text-cadence-slate-400">
                <p className="flex items-center space-x-2">
                  <span className="text-primary font-extrabold">✓</span>
                  <span>Dynamic curiosity-sparking hooks</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-primary font-extrabold">✓</span>
                  <span>Under 150 words optimized length constraints</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-primary font-extrabold">✓</span>
                  <span>Side-by-side diagnostic A/B rate optimizations</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Feature Highlights */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.tagline}</span>
          <h2 className="text-3xl font-display font-extrabold text-cadence-slate-900 dark:text-white">
            {t.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-cadence-slate-900 p-6 rounded-2xl border border-cadence-slate-200 dark:border-cadence-slate-800 shadow-sm space-y-3">
            <div className="p-3 bg-primary-light text-primary rounded-xl w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-md font-bold text-cadence-slate-900 dark:text-white">{t.features.f3}</h4>
            <p className="text-xs text-cadence-slate-500 dark:text-cadence-slate-400 leading-relaxed">
              {t.features.f3Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-cadence-slate-900 p-6 rounded-2xl border border-cadence-slate-200 dark:border-cadence-slate-800 shadow-sm space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl w-fit">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-md font-bold text-cadence-slate-900 dark:text-white">{t.features.f1}</h4>
            <p className="text-xs text-cadence-slate-500 dark:text-cadence-slate-400 leading-relaxed">
              {t.features.f1Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-cadence-slate-900 p-6 rounded-2xl border border-cadence-slate-200 dark:border-cadence-slate-800 shadow-sm space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-primary rounded-xl w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-md font-bold text-cadence-slate-900 dark:text-white">{t.features.f2}</h4>
            <p className="text-xs text-cadence-slate-500 dark:text-cadence-slate-400 leading-relaxed">
              {t.features.f2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Embedded Pricing Configurator */}
      <section className="bg-cadence-slate-55 dark:bg-cadence-slate-950 py-16 px-4">
        <PricingCalculator />
      </section>

      {/* 5. Customer Testimonials */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto space-y-10 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-cadence-slate-900 dark:text-white">
            Endorsed by Revenue Operatives
          </h2>
          <p className="text-xs text-cadence-slate-400 uppercase tracking-widest">REAL SUCCESS ACROSS B2B SAAS pipelines</p>
        </div>

        <div className="bg-white dark:bg-cadence-slate-900 rounded-2xl p-8 border border-cadence-slate-200 dark:border-cadence-slate-800 shadow-sm text-left relative">
          <p className="text-sm sm:text-md text-cadence-slate-700 dark:text-cadence-slate-300 italic leading-relaxed">
            &ldquo;Using Cadence&apos;s consultative tone copy settings, outbound open rates in our enterprise pipeline jumped from 14% to 54.2% within two weeks. We saved countless rep hours and secured double the actual discovery sessions.&rdquo;
          </p>
          <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-cadence-slate-100 dark:border-cadence-slate-850">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
              AM
            </div>
            <div>
              <h5 className="text-xs font-bold text-cadence-slate-900 dark:text-white">Andrew McArthur</h5>
              <p className="text-[10px] text-cadence-slate-400">Head of Outbound Sales, CloudStorage Ltd</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ultimate CTA */}
      <section className="px-4 text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight">
          Ready to scale your outreach relevance?
        </h2>
        <p className="text-sm text-cadence-slate-500">
          Create. Author. Optimize. Connect our B2B Copywriter with your branding configurations now.
        </p>
        <button
          onClick={() => setView("onboarding")}
          className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer inline-flex items-center space-x-2"
          id="last-cta-btn"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
