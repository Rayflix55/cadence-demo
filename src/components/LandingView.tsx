import { useState } from "react";
import { useStore } from "../store";
import PricingCalculator from "./PricingCalculator";
import CadenceLogo from "./CadenceLogo";
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
  Play,
  Sun,
  Moon,
  ChevronDown
} from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", label: "EN" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", label: "HI" },
  { code: "es", name: "Español", flag: "🇪🇸", label: "ES" },
  { code: "fr", name: "Français", flag: "🇫🇷", label: "FR" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", label: "DE" }
] as const;

export default function LandingView() {
  const { setView, language } = useStore();
  const langKey = (language as Language) || "en";
  const t = TRANSLATIONS[langKey] || TRANSLATIONS.en;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-transparent text-slate-900 dark:text-slate-100 select-none font-sans transition-all duration-300" id="landing-marketing-container">
      
      {/* GLOW BACKGROUND SYSTEM */}
      <div className="fixed top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#7F320D]/20 via-[#1A0A03]/5 to-transparent pointer-events-none select-none z-0" />
      <div className="fixed top-[20%] left-[10%] w-[350px] h-[350px] bg-[#D45D00]/10 rounded-full blur-[120px] pointer-events-none select-none z-0 animate-[ambientPulse_24s_infinite_ease-in-out]" />
      <div className="fixed top-[15%] right-[5%] w-[400px] h-[400px] bg-[#9D4EDD]/8 rounded-full blur-[130px] pointer-events-none select-none z-0 animate-[ambientPulseReverse_28s_infinite_ease-in-out]" />


      {/* ------------------ 2. CINEMATIC HERO FIELD ------------------ */}
      <section className="relative pt-24 sm:pt-40 pb-28 px-6 text-center overflow-hidden z-20">
        
        {/* BACKGROUND GLOWING PULSE WAVEGUIDES (Soundwaves) */}
        <div className="fixed inset-x-0 bottom-4 top-16 flex justify-between items-center px-4 sm:px-16 pointer-events-none select-none overflow-hidden opacity-25 sm:opacity-40 z-0">
          
          {/* Left Wave Columns */}
          <div className="flex items-end space-x-1.5 sm:space-x-3.5 h-full pb-8">
            {[24, 38, 56, 78, 92, 80, 65, 48, 70, 88, 50, 34, 18, 10, 6].map((h, i) => (
              <div 
                key={`vector-left-${i}`}
                style={{ height: `${h * 0.8}%` }}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-transparent via-[#FF6B35] to-transparent shadow-[0_0_15px_rgba(255,107,53,0.7)] animate-pulse"
              />
            ))}
          </div>
          
          {/* Right Wave Columns */}
          <div className="flex items-end space-x-1.5 sm:space-x-3.5 h-full pb-8 transform rotate-180">
            {[8, 14, 28, 42, 64, 85, 74, 58, 42, 72, 89, 45, 26, 14, 8].map((h, i) => (
              <div 
                key={`vector-right-${i}`}
                style={{ height: `${h * 0.8}%` }}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-transparent via-[#FFB84D] to-transparent shadow-[0_0_15px_rgba(255,184,77,0.7)] animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* FLOATING specular gloss 3D loops mirroring the image style */}
        {/* Torus - Top Right */}
        <div className="fixed top-24 -right-16 md:right-10 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none select-none z-10 opacity-80">
          <svg viewBox="0 0 200 200" className="w-full h-full transform rotate-12 scale-110 animate-[spin_60s_linear_infinite]">
            <defs>
               <linearGradient id="torus-3d-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#FF6B35" stopOpacity="1" />
                <stop offset="60%" stopColor="#5B1693" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Ambient inner soft laser shadow glow backing */}
            <circle cx="100" cy="100" r="72" fill="none" stroke="#FF6B35" strokeWidth="20" opacity="0.15" className="blur-xl" />
            <ellipse cx="100" cy="100" rx="72" ry="46" fill="none" stroke="url(#torus-3d-1)" strokeWidth="18" strokeLinecap="round" transform="rotate(-30 100 100)" />
            {/* Glaze highlights representing pure high-fi reflective chrome */}
            <ellipse cx="100" cy="100" rx="72" ry="46" fill="none" stroke="#FFF" strokeWidth="2.5" strokeDasharray="30, 200" strokeLinecap="round" opacity="0.55" transform="rotate(-30 100 100)" />
          </svg>
        </div>

        {/* Torus - Bottom Left */}
        <div className="fixed bottom-24 -left-16 md:left-12 w-60 h-60 sm:w-72 sm:h-72 pointer-events-none select-none z-10 opacity-75">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-45 animate-[spin_55s_linear_infinite_reverse]">
            <defs>
              <linearGradient id="torus-3d-2" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFAE5D" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#E03E00" stopOpacity="1" />
                <stop offset="70%" stopColor="#6C1CA6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#111" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="68" fill="none" stroke="#E03E00" strokeWidth="18" opacity="0.1" className="blur-xl" />
            <ellipse cx="100" cy="100" rx="68" ry="42" fill="none" stroke="url(#torus-3d-2)" strokeWidth="16" strokeLinecap="round" transform="rotate(45 100 100)" />
            <ellipse cx="100" cy="100" rx="68" ry="42" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="40, 160" strokeLinecap="round" opacity="0.5" transform="rotate(45 100 100)" />
          </svg>
        </div>


        {/* Centered Content block */}
        <div className="relative z-30 max-w-4xl mx-auto space-y-10">
          
          {/* Avatar proof badges stack */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
            <div className="flex -space-x-3">
              <img 
                className="w-10 h-10 rounded-full border-2 border-black object-cover ring-2 ring-[#FF6B35]/50 shadow-sm"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="Stack Representative 1"
                referrerPolicy="no-referrer"
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-black object-cover ring-2 ring-[#FF6B35]/50 shadow-sm"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                alt="Stack Representative 2"
                referrerPolicy="no-referrer"
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-black object-cover ring-2 ring-[#FF6B35]/50 shadow-sm"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                alt="Stack Representative 3"
                referrerPolicy="no-referrer"
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-black object-cover ring-2 ring-[#FF6B35]/50 shadow-sm"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                alt="Stack Representative 4"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-left leading-tight">
              <p className="text-[#1A1410] dark:text-white font-extrabold text-sm sm:text-base tracking-tight font-sans">602+</p>
              <p className="text-[#6B5344] dark:text-slate-400 font-bold text-[10px] tracking-wide uppercase">{t.activeUsers || "Active Users"}</p>
            </div>
          </div>

          {/* Heavy visual typography pairing title */}
          <h1 className="text-4xl sm:text-7xl font-sans font-extrabold text-[#1A1410] dark:text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
            {t.heroTitle}
          </h1>

          {/* Gold tint tan mid-contrast clean paragraph block */}
          <p className="text-sm sm:text-base text-[#6B5344] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Epic CTA primary Action Button */}
          <div className="pt-6 relative z-30">
            <button
              onClick={() => setView("auth")}
              className="relative overflow-hidden group w-full sm:w-auto px-12 py-5 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(255,87,34,0.15)] dark:shadow-[0_0_40px_rgba(255,107,53,0.65)] hover:shadow-[0_4px_20px_rgba(255,87,34,0.3)] border border-white/20 active:scale-95 cursor-pointer min-h-[44px]"
              id="landing-hero-demo-cta-btn"
            >
              {/* Hot Fire background core overlay */}
              <div className="absolute inset-0 bg-[#FF5722] hover:bg-[#E64A19] transition-all" />
              {/* SPECULAR glass glaze line across key */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center space-x-2.5">
                <span>{t.getStartedBtn}</span>
                <ArrowRight className="w-4 h-4 text-white animate-pulse" />
              </span>
            </button>
          </div>

          {/* Live stat points (Stats boxes repaired for light mode correctness) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 sm:gap-6 max-w-4xl mx-auto pt-24 text-center">
            <div className="bg-[#F9F5F0] dark:bg-[#120B07]/60 border border-[#FFE5D0] dark:border-[#FF6B35]/15 backdrop-blur-md p-6 rounded-2xl relative group hover:border-[#FF5722]/35 transition-colors shadow-[0_4px_12px_rgba(255,87,34,0.08)]">
              <strong className="text-2xl sm:text-3xl font-display font-black text-[#FF5722] dark:text-[#FF6B35] block">3x</strong>
              <span className="text-[#6B5344] dark:text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1.5">Average Response Rate</span>
            </div>
            
            <div className="bg-[#F9F5F0] dark:bg-[#120B07]/60 border border-[#FFE5D0] dark:border-[#FF6B35]/15 backdrop-blur-md p-6 rounded-2xl relative group hover:border-[#FF5722]/35 transition-colors shadow-[0_4px_12px_rgba(255,87,34,0.08)]">
              <strong className="text-2xl sm:text-3xl font-display font-black text-[#FF5722] dark:text-[#FFB84D] block">150 words</strong>
              <span className="text-[#6B5344] dark:text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1.5">Optimal Copy Constraint</span>
            </div>
            
            <div className="bg-[#F9F5F0] dark:bg-[#120B07]/60 border border-[#FFE5D0] dark:border-[#FF6B35]/15 backdrop-blur-md p-6 rounded-2xl relative group hover:border-[#FF5722]/35 transition-colors shadow-[0_4px_12px_rgba(255,87,34,0.08)]">
              <strong className="text-2xl sm:text-3xl font-display font-black text-[#FF5722] dark:text-[#FF6B35] block font-mono">10 hrs</strong>
              <span className="text-[#6B5344] dark:text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1.5">Weekly Saved Rep Time</span>
            </div>
            
            <div className="bg-[#F9F5F0] dark:bg-[#120B07]/60 border border-[#FFE5D0] dark:border-[#FF6B35]/15 backdrop-blur-md p-6 rounded-2xl relative group hover:border-[#FF5722]/35 transition-colors shadow-[0_4px_12px_rgba(255,87,34,0.08)]">
              <strong className="text-2xl sm:text-3xl font-display font-black text-[#FF5722] dark:text-[#FFB84D] block">100%</strong>
              <span className="text-[#6B5344] dark:text-slate-400 uppercase tracking-widest text-[9px] font-bold block pt-1.5">Predictive Isolation</span>
            </div>
          </div>

        </div>
      </section>


      {/* ------------------ 3. BRAND POSITION COMPARISON ------------------ */}
      <section className="border-t border-[#FFE5D0] dark:border-white/5 py-24 px-6 relative z-15 bg-white/30 dark:bg-[#080504]/30 backdrop-blur-md transition-all duration-300" id="landing-comparison-section">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[#FF5722] dark:text-[#FF6B35] font-mono text-xs font-black uppercase tracking-widest block">• {t.tagline || "THE CONTEXT ENGINE DIFFERENCE"} •</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-[#1A1410] dark:text-white tracking-tight">
              {t.featuresTitle || "The Outbound Cold Outreach Gap"}
            </h2>
            <p className="text-sm text-[#6B5344] dark:text-slate-400 max-w-lg mx-auto">
              {t.featuresSubtitle || "How traditional bulk campaign lists fail compared side-by-side with Cadence's context orchestrations."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bad Outbox Panel */}
            <div className="bg-[#F9F5F0] dark:bg-[#0B0908] p-8 sm:p-10 rounded-3xl border border-red-500/20 dark:border-red-500/10 shadow-[0_4px_12px_rgba(255,87,34,0.08)] space-y-6 transition-all">
              <div className="flex items-center space-x-2.5 text-red-500 font-extrabold text-xs uppercase tracking-widest font-mono">
                <TrendingDown className="w-4 h-4 text-red-500 animate-pulse" />
                <span>Legacy Spreads: Bulk Standard</span>
              </div>
              
              <h4 className="text-2xl font-bold text-[#1A1410] dark:text-white tracking-tight">Mechanical Mail Merges</h4>
              
              <p className="text-xs text-[#6B5344] dark:text-slate-400 leading-relaxed">
                Sales pipelines copy-paste boilerplate sequences containing simplistic tokens like <code className="bg-red-200/50 dark:bg-red-950/30 px-1.5 py-0.5 rounded border border-red-900/20 text-[#1A1410] dark:text-red-200">{"{{First Name}}"}</code>. Recipients instantly flag this as a cold automated sequence. Outreach response logs collapse below 3% efficiency.
              </p>
              
              <div className="border-t border-[#FFE5D0] dark:border-white/5 pt-6 space-y-3 text-xs text-[#6B5344] dark:text-slate-400">
                <p className="flex items-center space-x-3">
                  <span className="text-red-500 text-base font-extrabold">✕</span>
                  <span>Clunky bulk pitches without dynamic triggers</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-red-500 text-base font-extrabold">✕</span>
                  <span>Unrelated generalized pain-point assumption templates</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-red-500 text-base font-extrabold">✕</span>
                  <span>Damages server deliverability ranking indexes</span>
                </p>
              </div>
            </div>

            {/* Cadence Outbox Panel */}
            <div className="bg-[#F9F5F0] dark:bg-[#120B07] p-8 sm:p-10 rounded-3xl border border-[#FFE5D0] dark:border-[#FF6B35]/20 shadow-[0_4px_12px_rgba(255,87,34,0.08)] dark:shadow-[0_0_35px_rgba(255,107,53,0.05)] space-y-6 transition-all">
              <div className="flex items-center space-x-2.5 text-[#FF5722] dark:text-[#FF6B35] font-extrabold text-xs uppercase tracking-widest font-mono">
                <TrendingUp className="w-4 h-4 text-[#FF5722] dark:text-[#FFB84D] animate-bounce" />
                <span>Cadence.ai: Precision Tuning</span>
              </div>
              
              <h4 className="text-2xl font-bold text-[#1A1410] dark:text-white tracking-tight">Adaptive Smart Copywriters</h4>
              
              <p className="text-xs text-[#6B5344] dark:text-slate-400 leading-relaxed">
                Our intelligence compiles deep stakeholder insights, recent market events, and real challenges together. B2B copywriting tools adjust response rates and deliver highly consultative personalized loops natively inside your team sandbox.
              </p>
              
              <div className="border-t border-[#FFE5D0] dark:border-white/5 pt-6 space-y-3 text-xs text-[#6B5344] dark:text-slate-350">
                <p className="flex items-center space-x-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-base font-extrabold">✓</span>
                  <span className="text-[#1A1410] dark:text-slate-300 font-medium">Intelligent curiosity hooks designed individual per stakeholder</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-base font-extrabold">✓</span>
                  <span className="text-[#1A1410] dark:text-slate-300">Under 150 words compact length layout models</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-base font-extrabold">✓</span>
                  <span className="text-[#1A1410] dark:text-slate-300">Guaranteed sandboxed diagnostic workspace before release</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------ 4. FEATURES GRILL SECTION ------------------ */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16" id="features-section">
        <div className="text-center space-y-3 animate-fade-in">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FF5722] dark:text-[#FF6B35]">★ PREDICTIVE OUTBOUND MODULES ★</span>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-[#1A1410] dark:text-white tracking-tight">
            Comprehensive Outreach Superpowers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#F9F5F0] dark:bg-[#090706] p-8 rounded-3xl border border-[#FFE5D0] dark:border-white/5 hover:border-brand-primary/25 shadow-[0_4px_12px_rgba(255,87,34,0.08)] transition-all duration-300 space-y-5">
            <div className="p-3.5 bg-[#FFE5D0] dark:bg-[#FF6B35]/10 text-[#FF5722] dark:text-[#FF6B35] rounded-xl w-fit">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#1A1410] dark:text-white">Dynamic Copywriter Synthesizer</h4>
            <p className="text-xs text-[#6B5344] dark:text-slate-400 leading-relaxed">
              Generate dozens of unique email variations tuned instantly for key enterprise buyer personas using advanced natural templates.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F9F5F0] dark:bg-[#090706] p-8 rounded-3xl border border-[#FFE5D0] dark:border-white/5 hover:border-brand-primary/25 shadow-[0_4px_12px_rgba(255,87,34,0.08)] transition-all duration-300 space-y-5">
            <div className="p-3.5 bg-[#FFE5D0] dark:bg-[#FFB84D]/10 text-[#FF5722] dark:text-[#FFB84D] rounded-xl w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#1A1410] dark:text-white">Deliverability Analytics Radar</h4>
            <p className="text-xs text-[#6B5344] dark:text-slate-400 leading-relaxed">
              Simulate click-through calculations (CTR) and deliverability risks instantly before dispatching live campaigns.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F9F5F0] dark:bg-[#090706] p-8 rounded-3xl border border-[#FFE5D0] dark:border-white/5 hover:border-brand-primary/25 shadow-[0_4px_12px_rgba(255,87,34,0.08)] transition-all duration-300 space-y-5">
            <div className="p-3.5 bg-[#FFE5D0] dark:bg-[#9D4EDD]/10 text-[#FF5722] dark:text-[#9D4EDD] rounded-xl w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#1A1410] dark:text-white">Campaign Simulation Sandbox</h4>
            <p className="text-xs text-[#6B5344] dark:text-slate-400 leading-relaxed">
              Verify workflow behavior and message triggers inside a safe, client-side sandbox playground with zero deliverability cost.
            </p>
          </div>
        </div>
      </section>


      {/* ------------------ 5. THE REVILO INTEGRATED PRICING ------------------ */}
      <section className="py-24 px-6 border-t border-b border-[#FFE5D0] dark:border-white/5 bg-white/35 dark:bg-[#050302]/35 backdrop-blur-md relative" id="pricing-section-container">
        <div className="absolute inset-0 bg-radial-at-c from-[#FF5722]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <PricingCalculator />
        </div>
      </section>


      {/* ------------------ 6. PREMIUM TRUST TESTIMONIALS ------------------ */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12 text-center" id="testimonials-section">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF5722] dark:text-[#FF6B35] block">• AGENTS APPROVED •</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#1A1410] dark:text-white tracking-tight">
            Endorsed by Revenue Operatives
          </h2>
          <p className="text-xs text-[#6B5344] dark:text-slate-500 uppercase tracking-widest font-mono">Real pipeline success across high-growth B2B enterprise SaaS</p>
        </div>

        <div className="bg-[#F9F5F0] dark:bg-[#0C0806] rounded-3xl p-10 border border-[#FFE5D0] dark:border-[#FF6B35]/20 shadow-[0_4px_12px_rgba(255,87,34,0.08)] dark:shadow-[0_0_55px_rgba(255,107,53,0.03)] text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/5 rounded-full blur-2xl pointer-events-none" />
          
          <p className="text-base sm:text-lg text-[#1A1410] dark:text-slate-300 italic leading-relaxed">
            &ldquo;Using Cadence&apos;s predictive precision tone algorithms, outbound open rates in our enterprise pipeline jumped from 14% to 54.2% within two weeks. We saved countless representative hours and secured double the actual meetings.&rdquo;
          </p>
          
          <div className="flex items-center space-x-3 mt-8 pt-8 border-t border-[#FFE5D0] dark:border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-black text-xs uppercase shadow-md shadow-[#FF5722]/25">
              AM
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#1A1410] dark:text-white">Andrew McArthur</h5>
              <p className="text-xs text-[#6B5344] dark:text-slate-500 font-medium">Head of Outbound Operations, CloudStorage Ltd</p>
            </div>
          </div>
        </div>
      </section>


      {/* ------------------ 7. THE FINAL CALL-TO-ACTION ------------------ */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto space-y-8 relative z-20">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#FF5722]/10 rounded-full blur-[100px] pointer-events-none select-none" />
        
        <h2 className="text-4xl sm:text-5xl font-sans font-extrabold text-[#1A1410] dark:text-white tracking-tight">
          Ready to scale your outreach relevance?
        </h2>
        
        <p className="text-sm text-[#6B5344] dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          Create. Author. Optimize. Connect our B2B copywriters with your unique brand layouts inside our sandbox console.
        </p>
        
        <button
          onClick={() => setView("auth")}
          className="relative overflow-hidden group px-10 py-4.5 bg-[#FF5722] hover:bg-[#E64A19] text-[#FFFFFF] text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_4px_12px_rgba(255,87,34,0.15)] dark:shadow-[0_0_35px_rgba(255,107,53,0.4)] hover:shadow-[0_4px_22px_rgba(255,87,34,0.3)] transition-all cursor-pointer inline-flex items-center space-x-2.5 active:scale-95"
          id="last-cta-btn"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>


      {/* ------------------ 8. PREMIUM METALLIC footer nav ------------------ */}
      <footer className="border-t border-[#FFE5D0]/30 dark:border-white/5 bg-transparent py-16 px-6 text-center text-xs text-[#6B5344] dark:text-slate-400 relative z-25 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <CadenceLogo textColorClass="text-[#1A1410] dark:text-white" />
          </div>
          
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            © 2026 Cadence Sales Inc. Powered by predictive personalization.
          </p>
          
          <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-brand-primary cursor-pointer transition-colors">Home</button>
            <button onClick={() => setView("auth")} className="hover:text-brand-primary cursor-pointer transition-colors">Console Login</button>
            <button onClick={() => scrollToSection("pricing-section-container")} className="hover:text-brand-primary cursor-pointer transition-colors">Pricing Specs</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
