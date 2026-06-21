import { useState, FormEvent } from "react";
import { useStore } from "../store";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Sparkles, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import CadenceLogo from "./CadenceLogo";

export default function AuthView() {
  const { setLoggedIn, setOnboarded, setView, language } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simple localized helpers inside AuthView to match Indian Hindi and other selections
  const text = {
    en: {
      loginTitle: "Sign in to Strategy Desk",
      signupTitle: "Create your Cadence Account",
      loginSubtitle: "Access your server-side predictive outbound dashboard",
      signupSubtitle: "Start personalizing B2B sales outreach at unlimited scale",
      emailLabel: "Work Email Address",
      passwordLabel: "Secure Access Password",
      nameLabel: "Your Full Name",
      companyLabel: "Company / Brand Name",
      loginBtn: "Access Workspace",
      signupBtn: "Create & Begin Onboarding",
      toggleToSignup: "New to Cadence? Create a B2B Account",
      toggleToLogin: "Already have an account? Sign In",
      trustText: "Enterprise Grade SSL Encryption Active",
      requiredFields: "Please fill out all required fields",
      mockSuccessLogin: "Logged in successfully! Redirecting...",
      mockSuccessSignup: "Account created! Let's set up your outbound brand tone.",
    },
    hi: {
      loginTitle: "रणनीति डेस्क में साइन इन करें",
      signupTitle: "अपना कैडेंस खाता बनाएं",
      loginSubtitle: "अपने पूर्वानुमानित आउटबाउंड डैशबोर्ड तक पहुंचें",
      signupSubtitle: "असीमित पैमाने पर बी2बी बिक्री आउटरीच को निजीकृत करना शुरू करें",
      emailLabel: "काम का ईमेल पता",
      passwordLabel: "सुरक्षित एक्सेस पासवर्ड",
      nameLabel: "आपका पूरा नाम",
      companyLabel: "कंपनी / ब्रांड का नाम",
      loginBtn: "कार्यक्षेत्र में प्रवेश करें",
      signupBtn: "खाता बनाएं और ऑनबोर्डिंग शुरू करें",
      toggleToSignup: "कैडेंस पर नए हैं? एक बी2बी खाता बनाएं",
      toggleToLogin: "पहले से ही एक खाता है? साइन इन करें",
      trustText: "एंटरप्राइज ग्रेड एसएसएल एन्क्रिप्शन सक्रिय",
      requiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
      mockSuccessLogin: "सफलतापूर्वक लॉगिन हो गया! रीडायरेक्ट किया जा रहा है...",
      mockSuccessSignup: "खाता बन गया! चलिए आपकी ऑनबोर्डिंग ब्रांड शैली सेट करते हैं।",
    },
    es: {
      loginTitle: "Iniciar sesión en la consola",
      signupTitle: "Crear su cuenta de Cadence",
      loginSubtitle: "Acceda a su panel predictivo de prospección",
      signupSubtitle: "Comience a personalizar correos a escala ilimitada",
      emailLabel: "Correo Electrónico de Trabajo",
      passwordLabel: "Contraseña de Acceso Seguro",
      nameLabel: "Nombre Completo",
      companyLabel: "Nombre de la Empresa",
      loginBtn: "Acceder al Panel",
      signupBtn: "Crear Cuenta e Iniciar Configuración",
      toggleToSignup: "¿Nuevo en Cadence? Registre su cuenta B2B",
      toggleToLogin: "¿Ya tiene cuenta? Iniciar Sesión",
      trustText: "Cifrado SSL de grado empresarial activo",
      requiredFields: "Por favor complete todos los campos requeridos",
      mockSuccessLogin: "¡Inicio de sesión exitoso! Redirigiendo...",
      mockSuccessSignup: "¡Cuenta creada! Configuremos su tono de marca.",
    }
  };

  const t = text[language as "en" | "hi" | "es"] || text.en;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && (!fullName || !company))) {
      setError(t.requiredFields);
      return;
    }

    setIsLoading(true);

    // Simulate database authentication with delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (isSignUp) {
        // Sign up path: register and prompt onboarding
        setLoggedIn(true, email);
        setOnboarded(false); // Make sure they go to onboarding wizard
        setView("onboarding");
      } else {
        // Login path
        setLoggedIn(true, email);
        // If they had previously finished onboarding, take them directly to dashboard
        setOnboarded(true);
        setView("dashboard");
      }
    }, 1100);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 min-h-[75vh] flex flex-col justify-center" id="auth-viewport-stage">
      <div className="text-center mb-8 space-y-3">
        <div className="flex justify-center mb-2">
          <CadenceLogo />
        </div>
        <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full font-bold uppercase inline-block">
          B2B Personalization Platform
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-2xl shadow-xl p-8 transition-colors relative overflow-hidden"
      >
        {/* Ambient subtle outline glow effect */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
        
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? t.signupTitle : t.loginTitle}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-sans">
            {isSignUp ? t.signupSubtitle : t.loginSubtitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-xl font-semibold">
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <UserPlus className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="Sarah Chen"
                    id="auth-register-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t.companyLabel}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                    placeholder="TechFlow Solutions"
                    id="auth-register-company"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t.emailLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                placeholder="you@company.com"
                id="auth-email-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                placeholder="••••••••"
                id="auth-password-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/15 flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
            id="auth-submit-btn"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? t.signupBtn : t.loginBtn}</span>
                {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            id="auth-toggle-btn"
          >
            {isSignUp ? t.toggleToLogin : t.toggleToSignup}
          </button>
        </div>
      </motion.div>

      {/* Trust guarantees badge footer */}
      <div className="flex items-center justify-center space-x-2 text-slate-400 dark:text-slate-500 text-[10px] mt-6 select-none leading-none">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
        <span className="uppercase tracking-widest font-mono font-bold">{t.trustText}</span>
      </div>
    </div>
  );
}
