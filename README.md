# Cadence 🚀

**Cadence** is an AI-powered B2B cold outreach sequence engine and sales enablement platform designed to craft, validate, and track premium personalized emails at scale. By leveraging advanced contextual intelligence, Cadence helps sales and marketing teams build precise target-audience profiles, formulate bespoke outreach strategies, and draft optimal sequence variations.

---

## 🎨 Design Philosophy & Aesthetic Quality

Cadence breaks away from generic, cookie-cutter templates to deliver an ultra-sleek, immersive visual experience. Built from the ground up prioritizing high-contrast legibility, elegant font pairings, and organic animations, the platform transitions gracefully between light and dark modes without losing component contrast.

- **Double-Layer Color System**: High-contrast, meticulously designed light slate and deep, light-safe dark space theme values.
- **Micro-Animations**: Staggered transition arrays and interactive scroll guides using the modern `@motion` library.
- **Aesthetic Geometric Accents**: Handcrafted concentric dashed bounds, layered gradients, and active pulse beacons.

---

## 🛠️ Main Feature Modules

### 1. Unified Landing & Conversion Portal
A premium SaaS product greeting experience complete with:
- **Feature Matrix Comparison Grid**: Interactive checklist showcasing classic email templates vs. Cadence’s context-synchronized sequence variations.
- **Outreach Pricing Calculator**: A responsive estimator enabling visitors to customize lead volumes and calculate target CTR, open success rates, and dynamic ROI projections.

### 2. Multi-Step Onboarding Journey
A structured configuration wizard guiding users through three key areas of outreach identity:
1. **User Profile Establishment**: Basic personalization parameters, role context, and industry fields.
2. **Ideal Customer Profile (ICP) Builder**: Industry sectors, companies sizes, decision-maker job titles, and pressing pain points.
3. **Tone & Context Anchors**: Tone select array (creative, professional, formal) accompanied by key recurring value proposition pillars.

### 3. High-Integrity Analytical Dashboard
Provides real-time insight into outreach sequences:
- **KPI Metrics Ribbon**: Dynamic visualizations of aggregate emails sent, actual average open rates, baseline conversion indexes, and response indicators.
- **Recharts Integration**: Implements rich custom interactive bar and area charts displaying monthly performance trends, sequence CTR distributions, and platform usage logs.

### 4. Interactive AI Email Composer Proxier
Crafts, inspects, and modifies copy securely:
- **Server-Side Gemini Integration**: Leverages the official `@google/genai` TypeScript SDK to securely handle text generation on the backend, safeguarding critical API keys.
- **Variations tab & Copy Action**: Prompts multiple alternate subject-lines and message bodies, supporting fully responsive interactive selector panels.

---

## 🏗️ Architecture & Technology Stack

The application uses a full-stack Node.js + Express setup:

### 💻 Client Side (Frontend)
*   **React 19**: Standard SPA architecture utilizing functional hooks and store states.
*   **Zustand**: Fast, lightweight state store providing reliable state-synchronization and non-blocking session restoration.
*   **Tailwind CSS (v4.0)**: Utility-first, lightning-fast styling with custom responsive definitions.
*   **Motion**: Modern animations imported from `motion/react` for fluid modal transitions.
*   **Recharts & Lucide React**: Declarative chart visualization and vector asset layout.

### 🔌 Server Side (Backend)
*   **Express**: Custom Node server serving as a secure proxy to call Gemini API and manage static production assets.
*   **Vite Dev Middleware**: Mounted dynamically in development mode (`process.env.NODE_ENV !== "production"`) to facilitate fluid assets HMR without double-serving.
*   **esbuild Bundle Engine**: Compiles backend TypeScript server files cleanly down into a self-contained CJS bundle inside `dist/server.cjs` ensuring fast, warning-free runtime start scripts.

---

## 🚀 Setup & Execution Guide

### Prerequisites
Make sure Node.js (v18+) is installed on your local machine.

### 1. Environment Configuration
Define your environment values by duplicating the standard example file:
```bash
cp .env
```
Add your private Gemini API token inside the configuration:
```env
# .env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Keep this token server-side only; do not prefix with `VITE_` or expose it to client-side scripts).*

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:3000`.

### 4. Production Build & Execution
To compile frontend static files and bundle the optimized Node.js server:
```bash
npm run build
```
Once the compilation succeeds, run the compiled distribution natively:
```bash
npm run start
```

---

## 📁 Directory Layout

```text
├── server.ts              # Express web server with Vite development middleware
├── vite.config.ts         # Vite build bundler configuration
├── package.json           # Declared dependencies and NPM scripts
├── src/
│   ├── main.tsx           # Application boilerplate bootstrap
│   ├── App.tsx            # Root view router & structural layout frame
│   ├── store.ts           # Central state store (Zustand configuration)
│   ├── index.css          # Core custom global Tailwind styles
│   └── components/
│       ├── Header.tsx             # Responsive header with mobile hamburger drawer
│       ├── LandingView.tsx        # Brand marketing presentation
│       ├── PricingCalculator.tsx  # Dynamic performance & ROI calculator
│       ├── OnboardingWizard.tsx   # Progressive outreach config profile setup
│       ├── DashboardView.tsx      # Multi-view charts and metrics center
│       ├── EmailComposerView.tsx  # Dedicated AI email draft generation engine
│       ├── AuthView.tsx           # Slate-safe modal login/signup layout
│       └── CadenceLogo.tsx        # Vector branding logo module
```

---
*Crafted with absolute attention to detail, optimized metrics, and stunning pixel precision.*
