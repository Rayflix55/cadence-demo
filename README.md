# Cadence

**AI-powered sales enablement platform. Generate personalized cold emails at scale.**

Cadence solves the critical "conversion gap" in cold outreach by leveraging artificial intelligence to generate personalized sales copy that scales without sacrificing quality or relevance. All data stays on your device with local-first architecture.

---

## 🎯 What is Cadence?

Cadence is a full-stack demo SaaS application showcasing modern web technologies applied to B2B sales automation. Sign up, set your sales preferences, and let AI generate personalized cold emails tailored to your prospects—no backend server required.

**Key Features:**
- ✨ **AI Email Generation** — Intelligent copywriting powered by Claude API
- 🔐 **Local-First Auth** — Username/password stored securely in IndexedDB with encryption
- 📊 **Campaign Dashboard** — Real-time metrics, performance tracking, A/B testing insights
- 💰 **Dynamic Pricing** — Real-time calculator showing cost per email
- 🎨 **Dark Mode** — Full theme support with persistent preference
- 📱 **Fully Responsive** — Mobile, tablet, desktop—fully optimized

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cadence-sales-ai.git
cd cadence-sales-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your Anthropic API key
# NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **Data Visualization:** Recharts
- **Form Validation:** Zod + React Hook Form
- **Authentication:** Local-first (IndexedDB + Web Crypto API)
- **Deployment:** Vercel

### Database
- **IndexedDB** for local data persistence (user profiles, campaigns, sessions)
- **Encryption** with SubtleCrypto API for sensitive data
- **Password Hashing** with argon2-browser

### AI Integration
- **Claude API** (claude-sonnet-4-6) for email generation
- Personalized variants based on prospect and company data

---

## 📁 Project Structure

```
cadence-sales-ai/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── onboarding/             # Multi-step onboarding wizard
│   ├── dashboard/              # Main dashboard
│   ├── email-composer/         # AI email generation interface
│   └── api/                    # API routes (Claude integration)
├── components/
│   ├── auth/                   # Login/signup modals
│   ├── dashboard/              # Dashboard components
│   ├── forms/                  # Reusable form components
│   ├── ui/                     # shadcn/ui components
│   └── layout/                 # Header, sidebar, footer
├── lib/
│   ├── auth/                   # Authentication utilities
│   ├── db/                     # IndexedDB operations
│   ├── crypto/                 # Encryption/decryption
│   └── utils.ts                # Helper functions
├── store/
│   └── useAppStore.ts          # Zustand state management
├── types/
│   └── index.ts                # TypeScript type definitions
├── public/                     # Static assets
├── styles/                     # Global styles
├── tailwind.config.ts          # Tailwind configuration
└── .env.example                # Environment variables template
```

---

## 🔐 Authentication & Security

### How It Works
1. **Sign Up** → Username + Password
2. **Password Hashing** → Argon2 hashing (never stored in plain text)
3. **Session Token** → Encrypted with Web Crypto API, stored in IndexedDB
4. **Session Persistence** → Auto-restore session on page reload
5. **Session Expiry** → 24-hour expiration (user must log in again)

### Important Security Notes
- ✅ Passwords are hashed with `argon2-browser` before storage
- ✅ Session tokens are encrypted with `SubtleCrypto`
- ✅ IndexedDB is not directly exposed in dev tools
- ✅ Constant-time comparison prevents timing attacks
- ⚠️ This is appropriate for **demo/local-first apps**, not production with real users
- ⚠️ For production, implement server-side password validation and use HTTPS

---

## 🤖 AI Email Generation

### How It Works
1. User enters prospect data (name, title, company, recent activity)
2. Cadence fetches user's brand preferences and ICP from IndexedDB
3. Claude API generates 2-3 personalized email variants
4. User sees variants with predicted open/click rates
5. User can A/B test variants or edit before sending

### API Integration
```typescript
// Example API call to Claude
const response = await fetch('/api/generate-email', {
  method: 'POST',
  body: JSON.stringify({
    prospectData: { name, title, company },
    userProfile: { tone, valueProposition },
    brandTone: 'professional',
  }),
});
```

---

## 📊 Features Deep Dive

### Landing Page
Explore Cadence with hero section, problem/solution, feature highlights, pricing calculator, and social proof.

### Onboarding Wizard
4-step interactive form to collect:
1. User profile (name, company, role)
2. Ideal Customer Profile (ICP)
3. Brand tone and messaging
4. Review and confirm

All data persisted with Zustand and localStorage.

### Dashboard
Real-time campaign metrics:
- Open rates, click-through rates
- Emails sent, replies, meetings scheduled
- Pipeline value estimation
- Trend indicators and date range filtering

### Email Composer
- Paste prospect data
- Click "Generate with AI"
- See 2-3 variants instantly
- A/B test variants side-by-side
- View predicted performance metrics

### Pricing Calculator
- Adjust email volume with slider
- Real-time cost calculation
- Compare tiers (Starter, Growth, Enterprise)
- Cost per email transparency

---

## 🎨 Design System

Built with **Tailwind CSS** and **shadcn/ui** for a cohesive, professional aesthetic.

### Theme Support
- Light mode (default)
- Dark mode (toggle in header)
- User preference persisted in localStorage

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation throughout
- WCAG AA color contrast compliance
- Focus indicators on all interactive elements

### Responsive Design
- Mobile-first approach
- Optimized for 320px (mobile) through 2560px (ultra-wide)
- Touch-friendly button sizes
- Responsive typography

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push code to GitHub
git push origin main

# Connect repo to Vercel
# https://vercel.com/new

# Add environment variable in Vercel dashboard:
# NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key
```

### Self-Hosting

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📦 Environment Variables

Create a `.env.local` file in the root directory:


```

---

## 🔄 How Data Flows

```
Landing Page
    ↓
Sign Up / Log In (IndexedDB)
    ↓
Onboarding Wizard (Zustand + IndexedDB)
    ↓
Dashboard (IndexedDB campaigns)
    ↓
Email Composer
    ↓
Generate Email (Claude API)
    ↓
Save Campaign (IndexedDB, per-user)
```

All user data stays on the device. No backend server required.

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Next.js 14 App Router patterns
- ✅ TypeScript best practices
- ✅ Client-side authentication with IndexedDB
- ✅ Web Crypto API for encryption
- ✅ Zustand for state management
- ✅ Form validation with Zod + React Hook Form
- ✅ AI integration with Claude API
- ✅ Data visualization with Recharts
- ✅ Framer Motion animations
- ✅ Responsive design with Tailwind CSS
- ✅ shadcn/ui component patterns

Perfect for learning modern full-stack web development.

---

## 📈 Future Enhancements

Potential features for extending Cadence:
- [ ] Email template library
- [ ] Bulk prospect import (CSV)
- [ ] Email sending integration (Gmail API, SendGrid)
- [ ] Multi-device sync (cloud backup)
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Webhook support for CRM integration
- [ ] Custom AI model fine-tuning

---

## 🤝 Contributing

This is a demo project, but feel free to fork and customize!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **Vercel** — Next.js framework and deployment
- **Tailwind Labs** — Tailwind CSS and shadcn/ui
- **Framer** — Framer Motion animations
- **Recharts** — Data visualization

---

## 📞 Support & Feedback

Have questions or ideas? 
- 🐛 [Open an issue](https://github.com/rayflix55/cadence-demo/issues)
- 💬 [Start a discussion](https://github.com/rayflix55/cadence-demo/discussions)
- 📧 Reach out on Twitter or LinkedIn

---

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types

# Testing (if configured)
npm test             # Run tests
npm run test:watch   # Watch mode
```

---

**Built with ❤️ for modern sales teams. Explore. Personalize. Scale.**

**[Live Demo](#)** • **[Documentation](#)** • **[GitHub Issues](#)**