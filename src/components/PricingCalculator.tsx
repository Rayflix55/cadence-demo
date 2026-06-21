import { useState } from "react";
import { Check, ArrowRight, Zap, Target, Sliders, Sparkles, HelpCircle, Shield } from "lucide-react";

export default function PricingCalculator() {
  const [billingPeriod, setBillingPeriod] = useState<"weekly" | "annual">("weekly");
  const [subscribedInfo, setSubscribedInfo] = useState<{ tier: string; billing: string; price: string } | null>(null);
  const [enterpriseVolume, setEnterpriseVolume] = useState<number>(75000);

  // Compute live price quote estimates for Enterprise based on Custom Slider volume interaction
  const calculateEnterpriseQuote = () => {
    // Basic progression pricing logic: base $199 for 10,000 + $0.05 per extra email
    const baseVolume = 10000;
    const baseRate = 199;
    if (enterpriseVolume <= baseVolume) return baseRate;
    const additional = (enterpriseVolume - baseVolume) * 0.045;
    return Math.round(baseRate + additional);
  };

  const enterprisePrice = calculateEnterpriseQuote();

  const handleSubscribe = (tier: string, priceText: string) => {
    setSubscribedInfo({
      tier,
      billing: billingPeriod === "annual" ? "Annual (Save 80%)" : "Weekly cycle",
      price: priceText,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="pricing-calculator-container">
      
      {/* Description header styled elegantly with interviewPal aesthetic */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Choose The Perfect Plan <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">
            That Fits Your Outreach Goals
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re just starting out or preparing for your next massive high-volume acquisition campaign, Cadence offers flexible pricing plans tailored to your growth.
        </p>
      </div>

      {/* Pill billing toggle styled exactly after the design reference */}
      <div className="flex justify-center select-none pt-4">
        <div 
          className="inline-flex items-center p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-full border border-slate-200 dark:border-white/10 shadow-inner gap-1 relative"
          id="billing-toggle-pill"
        >
          <button
            onClick={() => setBillingPeriod("weekly")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
              billingPeriod === "weekly"
                ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Weekly
          </button>
          
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative z-10 flex items-center space-x-2 cursor-pointer ${
              billingPeriod === "annual"
                ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <span>Annual</span>
            <span className="bg-indigo-500 text-white text-[8px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
              Save 80%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Grid matching visually the 3-column reference */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 max-w-6xl mx-auto">
        
        {/* Tier 1: Free */}
        <div 
          className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-200/60 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-8"
          id="pricing-card-free"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">Free</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">
              Perfect for testing out our platform and practicing cold outbound copy authoring manually.
            </p>
            <div className="pt-2">
              <span className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-xs text-slate-400 tracking-wide font-mono">/month</span>
            </div>
          </div>

          {/* Divider: What's Included */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-2">
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 select-none whitespace-nowrap">What&apos;s Included?</span>
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow" />
            </div>

            <ul className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Get 25 outbound credits daily</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Free Copywriter Tone AI access</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Free templates repository copy</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 line-through">
                <div className="w-5 h-5 bg-transparent rounded-full flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/5">
                  <Check className="w-3 h-3 text-slate-400 opacity-40" />
                </div>
                <span>Predictive A/B Tone simulator</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe("Free", "$0/month")}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-white/5 text-center"
          >
            Start Free Outbounds
          </button>
        </div>


        {/* Tier 2: Pro (Premium / Highlighted) with liquid water reflection aesthetic in dark mode */}
        <div 
          className="relative bg-gradient-to-b from-indigo-50/50 via-white/80 to-indigo-50/20 dark:from-[#0e1330]/90 dark:via-[#090b1c]/95 dark:to-[#050611]/90 rounded-3xl p-8 border-2 border-indigo-600/30 dark:border-indigo-500/45 shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between space-y-8"
          id="pricing-card-pro"
        >
          {/* Ambient inner soft laser light glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Ethereal Water Wave Glow Header in Dark Mode */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-display font-black text-slate-950 dark:text-white flex items-center space-x-1.5">
                <span>Pro</span>
                <Sparkles className="w-5 h-5 text-indigo-500 dark:text-blue-400 animate-pulse" />
              </h3>

              {/* Glowing "Most popular" indicator badge */}
              <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md animate-bounce">
                Most popular
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed min-h-[40px]">
              Ideal for active marketers & sales reps. Access our full contextual authoring intelligence suite to refine copies.
            </p>

            <div className="pt-2 space-y-1">
              <div className="text-xs text-slate-400 line-through font-mono font-bold">
                {billingPeriod === "weekly" ? "$7.99" : "$29.99"}
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-4xl sm:text-5xl font-display font-black text-slate-900 dark:text-white">
                  {billingPeriod === "weekly" ? "$1.99" : "$0.99"}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-blue-400">/week</span>
              </div>
            </div>
          </div>

          {/* Divider: What's Included */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-2">
              <div className="h-[1px] bg-indigo-500/20 dark:bg-indigo-500/20 flex-grow" />
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-blue-400 select-none whitespace-nowrap">What&apos;s Included?</span>
              <div className="h-[1px] bg-indigo-500/20 dark:bg-indigo-500/20 flex-grow" />
            </div>

            <ul className="space-y-4 text-xs text-slate-600 dark:text-slate-200">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span><strong>Unlimited</strong> authoring credits</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Access all 20k+ intelligent contexts</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Full access to CRM custom tone variables</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>AI-enhanced dynamic A/B simulation</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-600 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Prioritized client support channel</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe("Pro", billingPeriod === "weekly" ? "$1.99/week" : "$0.99/week")}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 cursor-pointer text-center flex items-center justify-center space-x-2"
          >
            <span>Activate Pro Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>


        {/* Tier 3: Custom / Enterprise featuring embedded volume simulator */}
        <div 
          className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-200/60 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-8"
          id="pricing-card-custom"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">Custom Plan</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">
              Perfect for marketing agencies, outbound teams & high-volume corporate organizations.
            </p>
            
            <div className="pt-2">
              <span className="text-2xl sm:text-3.5xl font-display font-black text-slate-950 dark:text-white tracking-tight">Request a quote</span>
              <span className="text-xs text-slate-400 block mt-1 font-sans">Corporate custom enterprise terms apply</span>
            </div>

            {/* Embedded interactive volume slider quote simulator inside card */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 space-y-3 pt-3 shadow-inner">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center space-x-1">
                  <Sliders className="w-3 h-3 text-indigo-500" />
                  <span>Target Volume:</span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold bg-indigo-500/5 dark:bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-400/25">
                  {enterpriseVolume.toLocaleString()} / mo
                </span>
              </div>
              
              <input
                type="range"
                min={20000}
                max={500000}
                step={10000}
                value={enterpriseVolume}
                onChange={(e) => setEnterpriseVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              
              <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
                <span>20K outbounds</span>
                <span>500K max</span>
              </div>

              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-1.5 flex justify-between border-t border-slate-200/40 dark:border-slate-800/40">
                <span>Estimated custom rate:</span>
                <strong className="text-slate-850 dark:text-white">${enterprisePrice} / mo</strong>
              </div>
            </div>
          </div>

          {/* Divider: What's Included */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center space-x-2">
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 select-none whitespace-nowrap">What&apos;s Included?</span>
              <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-grow" />
            </div>

            <ul className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Custom outbound API integrations</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Custom team performance dashboards</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Corporate outbound custom analytics</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-blue-400" />
                </div>
                <span>Enterprise SLA support guarantees</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe("Custom Enterprise", `Custom quote $${enterprisePrice}/mo`)}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-white/5 text-center"
          >
            Request Custom Quote
          </button>
        </div>

      </div>

      {/* Trust guarantees footer to reinforce high craft */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500 pt-8 border-t border-slate-200/50 dark:border-white/5 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <span>No credit card required to sample trials</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Instantly scale outbound copies anytime</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Cancel or adjust plans with a single click</span>
        </div>
      </div>

      {/* High-Fidelity Subscription Confirmation Modal */}
      {subscribedInfo && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="subscription-success-modal">
          <div className="bg-white dark:bg-[#0c0e1a]/95 border border-indigo-200 dark:border-indigo-900/45 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient purple color stream */}
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-blue-400 mx-auto border border-indigo-100 dark:border-indigo-900/20">
              <Zap className="w-8 h-8 fill-indigo-600 text-indigo-600 dark:fill-blue-400 dark:text-blue-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">
                Subscription Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed px-2">
                Congratulations! You have successfully activated the <strong className="text-slate-950 dark:text-white">{subscribedInfo.tier}</strong> plan with <strong className="text-slate-950 dark:text-white">{subscribedInfo.billing}</strong> pricing parameters configured for <strong className="text-indigo-600 dark:text-blue-400">{subscribedInfo.price}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-150 dark:border-slate-800/80 text-[11px] text-slate-500 space-y-2 text-left">
              <div className="flex justify-between font-mono">
                <span>Selected Plan:</span>
                <span className="font-bold text-slate-800 dark:text-white uppercase">{subscribedInfo.tier}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Corporate Archetype:</span>
                <span className="font-bold text-slate-800 dark:text-white">Continuous Trace Outbound</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>Mock Billing Rate:</span>
                <span className="font-bold text-indigo-600 dark:text-blue-400">{subscribedInfo.price}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setSubscribedInfo(null)}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/10"
              >
                Launch Sandbox Workspace
              </button>
              <button
                onClick={() => setSubscribedInfo(null)}
                className="w-full py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer"
              >
                Return to Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
