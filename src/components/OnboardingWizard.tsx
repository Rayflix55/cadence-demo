import { useState } from "react";
import { useStore } from "../store";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Target, 
  Megaphone, 
  CheckSquare, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  HelpCircle,
  Plus,
  Trash2
} from "lucide-react";

export default function OnboardingWizard() {
  const { 
    userProfile, 
    icpInfo, 
    brandToneInfo, 
    updateUserProfile, 
    updateICPInfo, 
    updateBrandToneInfo, 
    setOnboarded, 
    setView 
  } = useStore();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State mirror
  const [profile, setProfile] = useState(userProfile);
  const [icp, setIcp] = useState(icpInfo);
  const [tone, setTone] = useState(brandToneInfo);
  const [newPillar, setNewPillar] = useState("");

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!profile.fullName.trim()) errs.fullName = "Full name is required";
      if (!profile.companyName.trim()) errs.companyName = "Company name is required";
      if (!profile.jobTitle.trim()) errs.jobTitle = "Job title is required";
      if (!profile.industry.trim()) errs.industry = "Industry context is required";
    } else if (s === 2) {
      if (!icp.targetIndustry.trim()) errs.targetIndustry = "Target industry is required";
      if (!icp.targetJobTitles.trim()) errs.targetJobTitles = "Target job titles are required";
      if (!icp.keyPainPoints.trim()) errs.keyPainPoints = "Pain points description required";
    } else if (s === 3) {
      if (!tone.brandTagline.trim()) errs.brandTagline = "Brand tagline or hook is required";
      if (!tone.companyDescription.trim()) errs.companyDescription = "Value prop/description is required";
      if (tone.keyMessagingPillars.length === 0) errs.messagingPillars = "Please add at least one core pillar";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 1) updateUserProfile(profile);
      if (step === 2) updateICPInfo(icp);
      if (step === 3) updateBrandToneInfo(tone);
      setStep((p) => Math.min(p + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((p) => Math.max(p - 1, 1));
  };

  const handleComplete = () => {
    updateUserProfile(profile);
    updateICPInfo(icp);
    updateBrandToneInfo(tone);
    setOnboarded(true);
    setView("dashboard");
  };

  const addPillar = () => {
    if (newPillar.trim() && tone.keyMessagingPillars.length < 3) {
      setTone({
        ...tone,
        keyMessagingPillars: [...tone.keyMessagingPillars, newPillar.trim()]
      });
      setNewPillar("");
    }
  };

  const removePillar = (index: number) => {
    setTone({
      ...tone,
      keyMessagingPillars: tone.keyMessagingPillars.filter((_, i) => i !== index)
    });
  };

  const stepsList = [
    { number: 1, name: "User Profile", icon: User },
    { number: 2, name: "Target ICP", icon: Target },
    { number: 3, name: "Brand Voice", icon: Megaphone },
    { number: 4, name: "Review & Sync", icon: CheckSquare },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col min-h-screen" id="onboarding-wizard-container">
      {/* Back button link */}
      <div className="mb-6">
        <button
          onClick={() => setView("landing")}
          className="text-xs font-semibold text-cadence-slate-500 hover:text-cadence-slate-800 dark:text-cadence-slate-400 dark:hover:text-white flex items-center space-x-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Exit to Landing Page</span>
        </button>
      </div>

      {/* Progress Multi-step track */}
      <div className="bg-white dark:bg-cadence-slate-900 rounded-2xl p-6 border border-cadence-slate-200 dark:border-cadence-slate-800 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 relative">
          {stepsList.map((s, idx) => {
            const IconComp = s.icon;
            const isCompleted = step > s.number;
            const isCurrent = step === s.number;

            return (
              <div key={s.number} className="flex-1 flex items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm transition-all ${
                      isCompleted
                        ? "bg-primary text-white"
                        : isCurrent
                          ? "bg-primary-light dark:bg-primary-dark/30 text-primary border-2 border-primary"
                          : "bg-cadence-slate-100 dark:bg-cadence-slate-800 text-cadence-slate-400"
                    }`}
                  >
                    {isCompleted ? <CheckSquare className="w-4 h-4" /> : s.number}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold leading-3 uppercase tracking-wider ${
                      isCurrent ? "text-primary" : "text-cadence-slate-400 dark:text-cadence-slate-600"
                    }`}>
                      Step 0{s.number}
                    </h4>
                    <p className={`text-sm font-semibold ${
                      isCurrent ? "text-cadence-slate-900 dark:text-white" : "text-cadence-slate-400 dark:text-cadence-slate-500"
                    }`}>
                      {s.name}
                    </p>
                  </div>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className="hidden md:block flex-1 h-[2px] mx-4 bg-cadence-slate-100 dark:bg-cadence-slate-850" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Form Stage Card */}
      <div className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-2xl shadow-xl p-8 flex-1 flex flex-col justify-between transition-colors">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              key="step-1"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <User className="text-primary w-6 h-6" />
                  <span>Build your Sender Persona</span>
                </h2>
                <p className="text-sm text-cadence-slate-500 mt-1">
                  Tell prospect clients who is reaching out and frame the value of your B2B enterprise.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="Sarah Chen"
                    id="onboard-fullname"
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Sender Company Name
                  </label>
                  <input
                    type="text"
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="TechFlow Solutions"
                    id="onboard-company"
                  />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Your Job Title
                  </label>
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="VP of Sales / BizDev Founder"
                    id="onboard-jobtitle"
                  />
                  {errors.jobTitle && <p className="text-xs text-red-500 mt-1">{errors.jobTitle}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Company Industry
                  </label>
                  <input
                    type="text"
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="SaaS / Cloud Engineering"
                    id="onboard-industry"
                  />
                  {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Team Size
                  </label>
                  <select
                    value={profile.teamSize}
                    onChange={(e) => setProfile({ ...profile, teamSize: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    id="onboard-teamsize"
                  >
                    <option value="1-5">1-5 reps</option>
                    <option value="6-11">6-11 reps</option>
                    <option value="12-15">12-15 reps</option>
                    <option value="16-50">16-50 reps</option>
                    <option value="50+">50+ reps</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              key="step-2"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <Target className="text-primary w-6 h-6" />
                  <span>Map Ideal Customer Profile (ICP)</span>
                </h2>
                <p className="text-sm text-cadence-slate-500 mt-1">
                  Relevance stems from focus. Specifying your exact buyer helps Cadence isolate pain points logically.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Target Prospect Industry
                  </label>
                  <input
                    type="text"
                    value={icp.targetIndustry}
                    onChange={(e) => setIcp({ ...icp, targetIndustry: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="B2B Technology & Fintech / High-Growth Startups"
                    id="onboard-icp-industry"
                  />
                  {errors.targetIndustry && <p className="text-xs text-red-500 mt-1">{errors.targetIndustry}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                      Company Size Range
                    </label>
                    <input
                      type="text"
                      value={icp.companySizeRange}
                      onChange={(e) => setIcp({ ...icp, companySizeRange: e.target.value })}
                      className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                      placeholder="50-500 employees"
                      id="onboard-icp-companysize"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                      Target Job Titles
                    </label>
                    <input
                      type="text"
                      value={icp.targetJobTitles}
                      onChange={(e) => setIcp({ ...icp, targetJobTitles: e.target.value })}
                      className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                      placeholder="VP Revenue, Head of Marketing, CFO, Founder"
                      id="onboard-icp-titles"
                    />
                    {errors.targetJobTitles && <p className="text-xs text-red-500 mt-1">{errors.targetJobTitles}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Key Client Pain Points we solve
                  </label>
                  <textarea
                    rows={3}
                    value={icp.keyPainPoints}
                    onChange={(e) => setIcp({ ...icp, keyPainPoints: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="Wasting too much time typing individual emails, poor reply rates, failing to secure initial meetings."
                    id="onboard-icp-painpoints"
                  />
                  {errors.keyPainPoints && <p className="text-xs text-red-500 mt-1">{errors.keyPainPoints}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Estimated Budget Range (ICP)
                  </label>
                  <input
                    type="text"
                    value={icp.budgetRange}
                    onChange={(e) => setIcp({ ...icp, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="$1,000 - $5,000/month"
                    id="onboard-icp-budget"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              key="step-3"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <Megaphone className="text-primary w-6 h-6" />
                  <span>Define Brand Tone & Voice</span>
                </h2>
                <p className="text-sm text-cadence-slate-500 mt-1">
                  How should Cadence author your outbound? Your message tone dictates open rates and credibility.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Outbound Brand Tone Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {(["professional", "friendly", "direct", "consultative"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone({ ...tone, tone: t })}
                        className={`py-3 px-4 rounded-xl border text-xs font-semibold capitalize transition-all ${
                          tone.tone === t
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                            : "bg-cadence-slate-50 hover:bg-cadence-slate-100 dark:bg-cadence-slate-850 dark:hover:bg-cadence-slate-800 border-cadence-slate-200 dark:border-cadence-slate-755 text-cadence-slate-700 dark:text-cadence-slate-300"
                        }`}
                        id={`tone-select-${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                      Brand Tagline or Key Hook
                    </label>
                    <input
                      type="text"
                      value={tone.brandTagline}
                      onChange={(e) => setTone({ ...tone, brandTagline: e.target.value })}
                      className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                      placeholder="Personalize first, scale second"
                      id="onboard-tone-tagline"
                    />
                    {errors.brandTagline && <p className="text-xs text-red-500 mt-1">{errors.brandTagline}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                      Primary Value Prop / Product Description
                    </label>
                    <input
                      type="text"
                      value={tone.companyDescription}
                      onChange={(e) => setTone({ ...tone, companyDescription: e.target.value })}
                      className="w-full px-4 py-3 bg-cadence-slate-50 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                      placeholder="We provide custom analytical insights helping teams save 10 hours a week."
                      id="onboard-tone-desc"
                    />
                    {errors.companyDescription && <p className="text-xs text-red-500 mt-1">{errors.companyDescription}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cadence-slate-500 dark:text-cadence-slate-400 mb-2">
                    Core Messaging Pillars (Up to 3)
                  </label>
                  <p className="text-xs text-cadence-slate-400 mb-3">
                    These context anchors are injected directly into Cadence emails to showcase your distinctive features.
                  </p>
                  
                  {/* Dynamic pillars row */}
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newPillar}
                      onChange={(e) => setNewPillar(e.target.value)}
                      disabled={tone.keyMessagingPillars.length >= 3}
                      className="flex-1 px-4 py-2.5 bg-cadence-slate-50 disabled:bg-cadence-slate-200 dark:disabled:bg-cadence-slate-900 dark:bg-cadence-slate-850 border border-cadence-slate-250 dark:border-cadence-slate-750 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                      placeholder={tone.keyMessagingPillars.length >= 3 ? "Maximum 3 pillars reached" : "Enter a messaging focus..."}
                      id="new-pillar-input"
                    />
                    <button
                      type="button"
                      onClick={addPillar}
                      disabled={tone.keyMessagingPillars.length >= 3 || !newPillar.trim()}
                      className="px-4 bg-primary hover:bg-primary-hover disabled:bg-cadence-slate-200 text-white font-semibold text-xs rounded-xl flex items-center space-x-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                  {errors.messagingPillars && <p className="text-xs text-red-500 mb-2">{errors.messagingPillars}</p>}

                  {/* Pillars pillbox */}
                  <div className="flex flex-wrap gap-2">
                    {tone.keyMessagingPillars.map((p, idx) => (
                      <div
                        key={idx}
                        className="bg-primary-light dark:bg-primary-dark/30 border border-primary/20 rounded-xl px-3 py-1.5 flex items-center space-x-2 text-primary font-medium text-xs animate-fade-in"
                      >
                        <span>{p}</span>
                        <button
                          type="button"
                          onClick={() => removePillar(idx)}
                          className="text-primary hover:text-red-500 focus:outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {tone.keyMessagingPillars.length === 0 && (
                      <p className="text-xs text-cadence-slate-400 italic">No message anchors defined. At least 1 anchor recommended.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              key="step-4"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-extrabold text-cadence-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <CheckSquare className="text-primary w-6 h-6" />
                  <span>Review Configuration Parameters</span>
                </h2>
                <p className="text-sm text-cadence-slate-500 mt-1">
                  Ensure the settings below are accurate before synchronizing with the AI outreach model.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Block 1 */}
                <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 p-5 rounded-2xl border border-cadence-slate-100 dark:border-cadence-slate-800">
                  <div className="flex items-center space-x-2 mb-3 text-primary text-xs font-bold uppercase tracking-wider">
                    <User className="w-4 h-4" />
                    <span>Sender Profile</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Name: <strong className="text-cadence-slate-800 dark:text-white">{profile.fullName}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Company: <strong className="text-cadence-slate-800 dark:text-white">{profile.companyName}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Job Title: <strong className="text-cadence-slate-800 dark:text-white">{profile.jobTitle}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Industry: <strong className="text-cadence-slate-800 dark:text-white">{profile.industry}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Team: <strong className="text-cadence-slate-800 dark:text-white">{profile.teamSize}</strong>
                    </p>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 p-5 rounded-2xl border border-cadence-slate-100 dark:border-cadence-slate-800">
                  <div className="flex items-center space-x-2 mb-3 text-primary text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Target Ideal Customer</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Industry: <strong className="text-cadence-slate-800 dark:text-white">{icp.targetIndustry}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Size Range: <strong className="text-cadence-slate-800 dark:text-white">{icp.companySizeRange}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Focus Job: <strong className="text-cadence-slate-800 dark:text-white">{icp.targetJobTitles}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Key Pain: <strong className="text-cadence-slate-800 dark:text-white line-clamp-2">{icp.keyPainPoints}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Budget: <strong className="text-cadence-slate-800 dark:text-white">{icp.budgetRange}</strong>
                    </p>
                  </div>
                </div>

                {/* Block 3 */}
                <div className="bg-cadence-slate-50 dark:bg-cadence-slate-850 p-5 rounded-2xl border border-cadence-slate-100 dark:border-cadence-slate-800">
                  <div className="flex items-center space-x-2 mb-3 text-primary text-xs font-bold uppercase tracking-wider">
                    <Megaphone className="w-4 h-4" />
                    <span>Outbound Brand Voice</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400 capitalize">
                      Main Tone: <strong className="text-cadence-slate-800 dark:text-white">{tone.tone}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Tagline: <strong className="text-cadence-slate-800 dark:text-white">{tone.brandTagline}</strong>
                    </p>
                    <p className="text-cadence-slate-500 dark:text-cadence-slate-400">
                      Value Prop: <strong className="text-cadence-slate-800 dark:text-white line-clamp-2">{tone.companyDescription}</strong>
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] font-bold text-cadence-slate-400 uppercase tracking-wider mb-1">Context Anchors:</p>
                      <div className="flex flex-wrap gap-1">
                        {tone.keyMessagingPillars.map((p, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white dark:bg-cadence-slate-800 text-cadence-slate-700 dark:text-white border border-cadence-slate-200 dark:border-cadence-slate-705 rounded-md text-[10px] font-medium">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="bg-primary/5 border border-primary/25 rounded-2xl p-4 flex items-start space-x-3 text-xs text-primary-dark dark:text-primary">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">Sync details with Cadence Copywriter</h5>
                  <p className="mt-0.5 leading-relaxed text-cadence-slate-600 dark:text-cadence-slate-300">
                    These criteria are saved to your session store. The AI engine will dynamically utilize them as core constraints to ensure any cold outreach copy generated is fully consistent with your style and target client market.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons drawer */}
        <div className="flex items-center justify-between border-t border-cadence-slate-100 dark:border-cadence-slate-800 pt-6 mt-8">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-cadence-slate-300 hover:bg-cadence-slate-50 dark:border-cadence-slate-700 dark:hover:bg-cadence-slate-800 text-cadence-slate-600 dark:text-cadence-slate-350 text-xs font-semibold flex items-center space-x-1.5 transition-all"
                id="wizard-back-btn"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-primary/20 transition-all cursor-pointer"
                id="wizard-next-btn"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="px-8 py-3 rounded-xl bg-gradient-to-tr from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-lg shadow-primary/30 transition-all cursor-pointer"
                id="wizard-complete-btn"
              >
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Synchronize & Launch</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
