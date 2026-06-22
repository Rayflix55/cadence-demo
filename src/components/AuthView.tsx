import { useState, FormEvent } from "react";
import { useStore } from "../store";
import { motion } from "motion/react";
import { Lock, User, Key, KeyRound, Sparkles, LogIn, UserPlus, ShieldCheck, AlertCircle } from "lucide-react";
import CadenceLogo from "./CadenceLogo";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { dbGetUser, dbAddUser } from "../utils/db";

export default function AuthView() {
  const { setUser, setOnboarded, setView, language } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Localized and standard state fields according to spec
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Localized textual assets matching Indian Hindi and other selections
  const text = {
    en: {
      loginTitle: "Sign in to Strategy Desk",
      signupTitle: "Create your Cadence Account",
      loginSubtitle: "Access your local-first predictive outbound workspace",
      signupSubtitle: "Start personalizing B2B sales outreach with high enterprise safety",
      usernameLabel: "Choose a username",
      usernameLoginLabel: "Your username",
      passwordLabel: "Create a strong password",
      passwordLoginLabel: "Your password",
      confirmPasswordLabel: "Confirm password",
      loginBtn: "Log In",
      signupBtn: "Create Account",
      toggleToSignup: "Don't have an account? Sign Up",
      toggleToLogin: "Already have an account? Log In",
      trustText: "Local-First IndexedDB SubtleCrypto Verification",
      requiredFields: "Please fill out all fields correctly.",
      invalidCreds: "Invalid username or password",
      userExists: "Username already taken",
      usernameValidationError: "Username must be 3-20 characters, alphanumeric only (no spaces)",
      passwordValidationError: "Password must be 8+ chars with uppercase, number, and special character",
      confirmPasswordValidationError: "Passwords do not match"
    },
    hi: {
      loginTitle: "रणनीति डेस्क में साइन इन करें",
      signupTitle: "अपना कैडेंस खाता बनाएं",
      loginSubtitle: "अपनी स्थानीय-प्रथम पूर्वानुमानित आउटबाउंड डैशबोर्ड तक पहुंचें",
      signupSubtitle: "उच्च उद्यम सुरक्षा के साथ बी2बी बिक्री आउटरीच को निजीकृत करना शुरू करें",
      usernameLabel: "एक उपयोगकर्ता नाम चुनें",
      usernameLoginLabel: "आपका उपयोगकर्ता नाम",
      passwordLabel: "एक मजबूत पासवर्ड बनाएं",
      passwordLoginLabel: "आपका पासवर्ड",
      confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
      loginBtn: "लॉग इन करें",
      signupBtn: "खाता बनाएं",
      toggleToSignup: "खाता नहीं है? साइन अप करें",
      toggleToLogin: "पहले से ही एक खाता है? लॉग इन करें",
      trustText: "स्थानीय-प्रथम इंडेक्स्डडीबी कस्टमाइज्ड सिफर सुरक्षा",
      requiredFields: "कृपया सभी फ़ील्ड सही ढंग से भरें।",
      invalidCreds: "अमान्य उपयोगकर्ता नाम या पासवर्ड",
      userExists: "उपयोगकर्ता नाम पहले से ही लिया जा चुका है",
      usernameValidationError: "उपयोगकर्ता नाम अक्षरांकीय, 3-20 वर्णों का और बिना रिक्त स्थान के होना चाहिए",
      passwordValidationError: "पासवर्ड कम से कम 8 वर्ण लंबा होना चाहिए जिसमें एक अपरकेस, संख्या और विशेष वर्ण हो",
      confirmPasswordValidationError: "पासवर्ड मेल नहीं खाते हैं"
    },
    es: {
      loginTitle: "Iniciar sesión en la consola",
      signupTitle: "Crear su cuenta de Cadence",
      loginSubtitle: "Acceso seguro local-first a su consola predictiva",
      signupSubtitle: "Comience a personalizar prospección de ventas B2B con alta seguridad",
      usernameLabel: "Elija un nombre de usuario",
      usernameLoginLabel: "Su nombre de usuario",
      passwordLabel: "Cree una contraseña segura",
      passwordLoginLabel: "Su contraseña",
      confirmPasswordLabel: "Confirmar contraseña",
      loginBtn: "Iniciar Sesión",
      signupBtn: "Crear Cuenta",
      toggleToSignup: "¿No tiene una cuenta? Registrarse",
      toggleToLogin: "¿Ya tiene una cuenta? Iniciar Sesión",
      trustText: "Cifrado local con SubtleCrypto en IndexedDB",
      requiredFields: "Por favor complete todos los campos requeridos.",
      invalidCreds: "Usuario o contraseña inválidos",
      userExists: "El nombre de usuario ya está tomado",
      usernameValidationError: "El nombre de usuario debe tener 3-20 caracteres alfanuméricos",
      passwordValidationError: "La contraseña debe tener más de 8 caracteres con mayúscula, número y símbolo",
      confirmPasswordValidationError: "Las contraseñas no coinciden"
    }
  };

  const t = text[language as "en" | "hi" | "es"] || text.en;

  // Validation rules
  const validateUsername = (name: string): boolean => {
    // Alphanumeric, 3-20 chars, no spaces
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(name);
  };

  const validatePasswordStrength = (pass: string): boolean => {
    // min 8 chars, at least 1 uppercase, 1 number, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pass);
  };

  // Helper to generate a strong random session token string
  const generateSessionToken = (): string => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(byte => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!username.trim() || !password) {
      setError(t.requiredFields);
      return;
    }

    if (isSignUp) {
      // 1. Username validation check
      if (!validateUsername(username)) {
        setError(t.usernameValidationError);
        return;
      }
      // 2. Password strength validation
      if (!validatePasswordStrength(password)) {
        setError(t.passwordValidationError);
        return;
      }
      // 3. Confirm password matches
      if (password !== confirmPassword) {
        setError(t.confirmPasswordValidationError);
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        // Query database to see if the user already exists locally
        const existingUser = await dbGetUser(username.trim());
        if (existingUser) {
          setError(t.userExists);
          setIsLoading(false);
          return;
        }

        // Hash password with Argon2 with secure fallbacks
        const passwordHash = await hashPassword(password, username.trim());
        
        // Save user inside IndexedDB
        await dbAddUser({
          username: username.trim(),
          passwordHash: passwordHash,
          createdAt: Date.now()
        });

        // Set login & generate safe session encryption key
        const secureToken = generateSessionToken();
        await setUser(username.trim(), secureToken);
        
        setSuccessMsg("Success! Directing to onboarding workspace...");
        setOnboarded(false);
        setTimeout(() => {
          setView("onboarding");
        }, 800);

      } else {
        // Log in path
        const userRecord = await dbGetUser(username.trim());
        if (!userRecord) {
          setError(t.invalidCreds);
          setIsLoading(false);
          return;
        }

        // Verify hash using constant-time comparison inside verifyPassword
        const isMatch = await verifyPassword(password, userRecord.passwordHash, username.trim());
        if (!isMatch) {
          setError(t.invalidCreds);
          setIsLoading(false);
          return;
        }

        const secureToken = generateSessionToken();
        await setUser(username.trim(), secureToken);
        
        setSuccessMsg("Welcome back!");
        setOnboarded(true);
        setTimeout(() => {
          setView("dashboard");
        }, 800);
      }
    } catch (err: any) {
      console.error("Local core auth pipeline exception:", err);
      setError(err?.message || "An authentication pipeline error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 min-h-[75vh] flex flex-col justify-center" id="auth-viewport-stage">
      <div className="text-center mb-8 space-y-3">
        <div className="flex justify-center mb-2">
          <CadenceLogo />
        </div>
        <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-wider text-brand-primary bg-brand-primary/10 rounded-full font-bold uppercase inline-block">
          Predictive Outbound Sandbox
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-cadence-slate-900 border border-cadence-slate-200 dark:border-cadence-slate-800 rounded-2xl shadow-xl p-8 transition-colors relative overflow-hidden"
      >
        {/* Ambient subtle outline glow effect */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-primary via-brand-secondary to-orange-500" />
        
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? t.signupTitle : t.loginTitle}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-sans">
            {isSignUp ? t.signupSubtitle : t.loginSubtitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-start space-x-2.5 font-medium leading-relaxed">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-semibold">
            ✓ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="auth-username-input">
              {isSignUp ? t.usernameLabel : t.usernameLoginLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 select-none">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white placeholder-slate-400 font-medium"
                placeholder={isSignUp ? "e.g. sarahChen85" : "Your username"}
                id="auth-username-input"
              />
            </div>
            {isSignUp && (
              <span className="block text-[9px] text-slate-400 mt-1 dark:text-slate-500">
                Alphanumeric characters only, no spaces.
              </span>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="auth-password-input">
              {isSignUp ? t.passwordLabel : t.passwordLoginLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 select-none">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white placeholder-slate-400 font-medium"
                placeholder="••••••••"
                id="auth-password-input"
              />
            </div>
            {isSignUp && (
              <span className="block text-[9px] text-slate-400 mt-1 dark:text-slate-500">
                Requires 8+ chars: 1 uppercase, 1 number, 1 special character.
              </span>
            )}
          </div>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-1.5"
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="auth-confirm-password-input">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 select-none">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-cadence-slate-850 border border-slate-200 dark:border-cadence-slate-750 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none dark:text-white placeholder-slate-400 font-medium"
                  placeholder="••••••••"
                  id="auth-confirm-password-input"
                />
              </div>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 btn-primary-custom text-white text-xs font-extrabold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
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
              setConfirmPassword("");
            }}
            className="text-xs font-semibold text-brand-primary hover:opacity-85 transition-colors cursor-pointer"
            id="auth-toggle-btn"
          >
            {isSignUp ? t.toggleToLogin : t.toggleToSignup}
          </button>
        </div>
      </motion.div>

      {/* Trust guarantees badge footer */}
      <div className="flex items-center justify-center space-x-2 text-slate-400 dark:text-slate-500 text-[10px] mt-6 select-none leading-none">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
        <span className="uppercase tracking-widest font-mono font-bold text-center leading-relaxed">
          {t.trustText}
        </span>
      </div>
    </div>
  );
}
