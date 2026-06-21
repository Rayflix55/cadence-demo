import { useState, useMemo, FormEvent } from "react";
import { useStore } from "../store";
import { 
  Sparkles, 
  Send, 
  Play, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Info,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Mail,
  Edit2
} from "lucide-react";
import { EmailVariant } from "../types";

export default function EmailComposerView() {
  const { 
    userProfile, 
    brandToneInfo, 
    addCampaign, 
    setView 
  } = useStore();

  // Prospect Form State
  const [prospectName, setProspectName] = useState("Jonathan Miller");
  const [prospectTitle, setProspectTitle] = useState("Director of Demand Generation");
  const [prospectCompany, setProspectCompany] = useState("Aperture Labs");
  const [recentActivity, setRecentActivity] = useState(
    "Shared a post on LinkedIn about lacking the staff to configure hyper-personalized sales messaging at scale."
  );
  const [cta, setCta] = useState("A brief 10-minute introductory call next Tuesday");
  const [brandTone, setBrandTone] = useState(brandToneInfo.tone);

  // States for generation outcomes
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [variants, setVariants] = useState<EmailVariant[]>([
    {
      subjectLine: "Quick question about Aperture Labs's outreach scaling plan",
      emailBody: `Hi Jonathan,\n\nI noticed your recent post on LinkedIn about lacking the staff to configure hyper-personalized messaging at scale. Many growth teams face this exact bottleneck when scaling outbound pipelines.\n\nAt ${userProfile.companyName || "TechFlow SOLUTIONS"}, we built Cadence precisely to help companies generate contextually relevant sales letters without sacrificing response rates or massive operational hours. \n\nWould you be open to a brief 10-minute introductory call next Tuesday to see if we might support your pipeline expansion?\n\nBest regards,\nSarah Chen`,
      keyPersonalizationElements: ["Referencing LinkedIn staff post", "Outbound bottleneck resolution"],
      predictedOpenRate: 59,
      predictedClickRate: 18,
    },
    {
      subjectLine: "outbound efficiency at Aperture Labs",
      emailBody: `Hi Jonathan,\n\nAs Aperture Labs scales demand generation, keeping individual emails highly personalized typically burns a lot of rep hours.\n\nWe recently enabled teams in SaaS platform consulting to automate custom client research hooks while keeping outbound quality pristine. Our initial cases show up to a 34% increase in prospect replies.\n\nAre you open to a brief 10-minute introductory call next Tuesday to see if we can save your team some serious outreach hours?\n\nSincerely,\nSarah`,
      keyPersonalizationElements: ["Workplace efficiency focus", "Statistical performance evidence"],
      predictedOpenRate: 48,
      predictedClickRate: 14,
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [winningIndex, setWinningIndex] = useState<number | null>(0);
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [editedBodyText, setEditedBodyText] = useState("");

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: userProfile.companyName,
          companyDescription: brandToneInfo.companyDescription,
          industry: userProfile.industry,
          teamSize: userProfile.teamSize,
          prospectName,
          prospectTitle,
          prospectCompany,
          recentActivity,
          brandTone,
          valueProposition: brandToneInfo.brandTagline,
          cta,
        }),
      });

      if (!response.ok) {
        throw new Error("Copywriter API server returned an unexpected error.");
      }

      const data = await response.json();
      if (data.variants && Array.isArray(data.variants)) {
        setVariants(data.variants);
        setActiveIndex(0);
        setWinningIndex(0); // Initialize first as mock winner
        setIsEditingBody(false);
      } else {
        throw new Error("Invalid format returned by upstream AI server.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong during email copy generation.");
    } finally {
      setLoading(false);
    }
  };

  // Turn edit text body on
  const enableEdit = () => {
    setEditedBodyText(variants[activeIndex].emailBody);
    setIsEditingBody(true);
  };

  // Save edited text back to local variants list
  const saveEditedText = () => {
    const updated = [...variants];
    updated[activeIndex].emailBody = editedBodyText;
    setVariants(updated);
    setIsEditingBody(false);
  };

  // Adds a mock active campaign to main list and routes to dashboard
  const handleSaveCampaign = () => {
    const selectedVariant = variants[activeIndex];
    const newCampName = `CTA Outreach to ${prospectCompany}`;
    addCampaign({
      id: `camp-${Date.now()}`,
      name: newCampName,
      status: "Active",
      emailsSent: 1, // Start sent
      openRate: selectedVariant.predictedOpenRate,
      clickRate: selectedVariant.predictedClickRate,
      repliesReceived: 0,
      meetingsScheduled: 0,
      estimatedPipelineValue: 15000,
      createdAt: new Date().toISOString().split("T")[0]
    });
    setView("dashboard");
  };

  // Compare rates helper
  const abMetrics = useMemo(() => {
    if (variants.length < 2) return null;
    const v0 = variants[0];
    const v1 = variants[1];
    
    const diffOpen = Math.abs(v0.predictedOpenRate - v1.predictedOpenRate);
    const outperformOpen = v0.predictedOpenRate > v1.predictedOpenRate ? "Variant A" : "Variant B";
    
    return {
      diffOpen,
      outperformOpen,
      hasConfidence: diffOpen > 5
    };
  }, [variants]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8" id="email-composer-view-container">
      
      {/* Page Title Header */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          <span>AI Outbound Copywriter Workshop</span>
        </h1>
        <p className="text-sm text-cadence-slate-500 mt-1 max-w-2xl">
          Author and optimize client-specific copy grounded in individual history hooks alongside brand voice anchors.
        </p>
      </div>

      {/* Primary Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Form Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-3xl p-6 shadow-sm transition-colors">
          <h3 className="text-md font-bold text-cadence-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span>Target Prospect Context</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-1">
                  Prospect Name
                </label>
                <input
                  type="text"
                  required
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  className="w-full px-3 py-2 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                  placeholder="Jonathan Miller"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-1">
                  Target Company
                </label>
                <input
                  type="text"
                  required
                  value={prospectCompany}
                  onChange={(e) => setProspectCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                  placeholder="Aperture Labs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-1">
                Prospect Corporate Title
              </label>
              <input
                type="text"
                required
                value={prospectTitle}
                onChange={(e) => setProspectTitle(e.target.value)}
                className="w-full px-3 py-2 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                placeholder="Director of Demand Generation"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-1">
                LinkedIn Activity or Context Trigger
              </label>
              <textarea
                rows={3}
                required
                value={recentActivity}
                onChange={(e) => setRecentActivity(e.target.value)}
                className="w-full px-3 py-2 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                placeholder="Mention an article they published or a pain point they outlined on social media..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-1">
                Campaign Calls to Action (Objectives)
              </label>
              <input
                type="text"
                required
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full px-3 py-2 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                placeholder="A brief 10-minute call next Tuesday at 3pm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cadence-slate-500 mb-2">
                Outbound Brand Voice Override
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["professional", "friendly", "direct", "consultative"] as const).map((wt) => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => setBrandTone(wt)}
                    className={`py-2 px-3 border rounded-xl text-xs capitalize font-semibold transition-all ${
                      brandTone === wt
                        ? "bg-primary border-primary text-white"
                        : "bg-cadence-slate-50 hover:bg-cadence-slate-100 dark:bg-cadence-slate-850 dark:hover:bg-cadence-slate-800 border-cadence-slate-200 dark:border-cadence-slate-750 text-cadence-slate-750 dark:text-cadence-slate-300"
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Error messaging block */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl flex items-center space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-tr from-primary to-primary-hover hover:from-primary-hover hover:to-primary disabled:from-cadence-slate-300 disabled:to-cadence-slate-300 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 cursor-pointer"
              id="ai-generate-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Copy Options...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Email Options</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Copy outcome, previewing, winner picking & edits */}
        <div className="lg:col-span-7 space-y-6">

          {/* Skeletons block during loading */}
          {loading ? (
            <div className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-3xl p-8 space-y-6 animate-pulse">
              <div className="h-6 bg-cadence-slate-100 dark:bg-cadence-slate-800 rounded w-1/4" />
              <div className="space-y-3">
                <div className="h-4 bg-cadence-slate-100 dark:bg-cadence-slate-800 rounded w-3/4" />
                <div className="h-4 bg-cadence-slate-100 dark:bg-cadence-slate-800 rounded w-5/6" />
                <div className="h-4 bg-cadence-slate-100 dark:bg-cadence-slate-800 rounded w-2/3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-cadence-slate-50 dark:bg-cadence-slate-850 rounded" />
                <div className="h-16 bg-cadence-slate-50 dark:bg-cadence-slate-850 rounded" />
              </div>
            </div>
          ) : (
            <>
              {/* Variant Selector header */}
              <div className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 p-4 rounded-2xl flex items-center justify-between transition-colors">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-cadence-slate-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cadence-slate-400">Copy Variations:</span>
                </div>
                
                {/* Variant Switcher buttons */}
                <div className="flex space-x-1.5 bg-cadence-slate-100 dark:bg-cadence-slate-850 p-1 rounded-xl">
                  {variants.map((v, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsEditingBody(false);
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        activeIndex === index
                          ? "bg-white dark:bg-cadence-slate-800 text-cadence-slate-900 dark:text-white shadow-sm"
                          : "text-cadence-slate-500 hover:text-cadence-slate-950"
                      }`}
                      id={`variant-tab-${index}`}
                    >
                      Option {index === 0 ? "A" : index === 1 ? "B" : "C"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Email Preview Canvas */}
              {variants[activeIndex] && (
                <div className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-3xl overflow-hidden shadow-sm transition-colors">
                  {/* Mock mail header */}
                  <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 p-5 border-b border-cadence-slate-150 dark:border-cadence-slate-800 text-xs space-y-2">
                    <p className="text-cadence-slate-400">
                      Subject Line Option: <strong className="text-cadence-slate-800 dark:text-white font-mono bg-white dark:bg-cadence-slate-800 py-1 px-2 rounded border border-cadence-slate-200 dark:border-cadence-slate-705 ml-1">{variants[activeIndex].subjectLine}</strong>
                    </p>
                    <p className="text-cadence-slate-400">
                      From: <span className="text-cadence-slate-650 dark:text-cadence-slate-350 font-semibold">{userProfile.fullName || "Me"} &lt;sarah@techflow.io&gt;</span>
                    </p>
                    <p className="text-cadence-slate-400">
                      To: <span className="text-cadence-slate-650 dark:text-cadence-slate-350 font-semibold">{prospectName} &lt;{prospectName.toLowerCase().replace(/\s/g, "")}@{prospectCompany.toLowerCase().replace(/\s/g, "")}.com&gt;</span>
                    </p>
                  </div>

                  {/* Mail Body text area */}
                  <div className="p-6">
                    {isEditingBody ? (
                      <div className="space-y-4">
                        <textarea
                          rows={10}
                          value={editedBodyText}
                          onChange={(e) => setEditedBodyText(e.target.value)}
                          className="w-full p-4 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setIsEditingBody(false)}
                            className="px-3 py-1.5 border border-cadence-slate-300 dark:border-cadence-slate-700 text-cadence-slate-600 dark:text-cadence-slate-350 text-xs font-semibold rounded-lg hover:bg-cadence-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveEditedText}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover"
                          >
                            Save Edits
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-cadence-slate-700 dark:text-cadence-slate-300 leading-relaxed min-h-60">
                          {variants[activeIndex].emailBody}
                        </pre>

                        <button
                          onClick={enableEdit}
                          className="absolute right-0 bottom-0 p-2 bg-cadence-slate-100 hover:bg-cadence-slate-200 dark:bg-cadence-slate-800 dark:hover:bg-cadence-slate-700 rounded-lg text-cadence-slate-700 dark:text-cadence-slate-300 flex items-center space-x-1 border border-cadence-slate-200 dark:border-cadence-slate-700 cursor-pointer"
                          title="Modify Text Inline"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">Edit Message</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Context tags list */}
                  <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850/60 p-4 border-t border-cadence-slate-200 dark:border-cadence-slate-800 flex items-center flex-wrap gap-2 text-[10px]">
                    <span className="text-cadence-slate-400 font-bold uppercase tracking-wider">Applied Anchors:</span>
                    {variants[activeIndex].keyPersonalizationElements.map((pt, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary-light text-primary dark:bg-primary-dark/30 rounded-md font-medium">
                        ✦ {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* A/B Testing & Predicted conversion metrics bar */}
              <div className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-3xl p-6 shadow-sm transition-colors">
                <h4 className="text-xs font-bold text-cadence-slate-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Interactive A/B Predictor Performance</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rate 1 */}
                  <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 rounded-2xl p-4 border border-cadence-slate-100 dark:border-cadence-slate-800">
                    <span className="text-[11px] font-bold text-cadence-slate-400 uppercase block">Predicted Open Rate Probability</span>
                    <div className="flex items-center space-x-4 mt-2">
                      <strong className="text-3xl font-display font-extrabold text-cadence-slate-900 dark:text-white">
                        {variants[activeIndex]?.predictedOpenRate}%
                      </strong>
                      {/* Interactive Slider Indicator */}
                      <div className="flex-1 h-2 bg-cadence-slate-200 dark:bg-cadence-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500" 
                          style={{ width: `${variants[activeIndex]?.predictedOpenRate || 0}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rate 2 */}
                  <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 rounded-2xl p-4 border border-cadence-slate-100 dark:border-cadence-slate-800">
                    <span className="text-[11px] font-bold text-cadence-slate-400 uppercase block">Predicted Click-Through (CTR)</span>
                    <div className="flex items-center space-x-4 mt-2">
                      <strong className="text-3xl font-display font-extrabold text-indigo-500">
                        {variants[activeIndex]?.predictedClickRate}%
                      </strong>
                      <div className="flex-1 h-2 bg-cadence-slate-200 dark:bg-cadence-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                          style={{ width: `${variants[activeIndex]?.predictedClickRate || 0}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-cadence-slate-100 dark:border-cadence-slate-800 pt-4 gap-3 text-xs">
                  {winningIndex === activeIndex ? (
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold rounded-lg flex items-center space-x-1.5">
                      <Check className="w-4 h-4" />
                      <span>Marked as Outbound Winner</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setWinningIndex(activeIndex)}
                      className="px-3 py-1.5 bg-cadence-slate-100 hover:bg-cadence-slate-200 dark:bg-cadence-slate-800 text-cadence-slate-700 dark:text-white rounded-lg font-semibold flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <span>Mark as Winner</span>
                    </button>
                  )}

                  {abMetrics && (
                    <div className="text-cadence-slate-500 text-right flex items-center space-x-1">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <span>
                        Recommendation: <strong>Option A</strong> outperforms <strong>Option B</strong> by <strong>11%</strong> in curiosity tests.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action trigger: save as active campaign */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveCampaign}
                  className="px-6 py-3 bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-650 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/10 flex items-center space-x-2 cursor-pointer"
                  id="save-campaign-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Synchronize & Send Campaign</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
