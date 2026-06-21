import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Post API route for copywriting generation
  app.post("/api/generate-copy", async (req, res) => {
    try {
      const {
        companyName,
        companyDescription,
        industry,
        teamSize,
        prospectName,
        prospectTitle,
        prospectCompany,
        recentActivity,
        brandTone,
        valueProposition,
        cta,
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY environment variable is not set. Using high-fidelity template generator instead.");
        // Return elegant fallback templates to keep the app functional
        return res.json({
          variants: getPlaceholderVariants(
            companyName || "TechFlow",
            prospectName || "Sarah",
            prospectCompany || "Target Corp",
            brandTone || "consultative",
            valueProposition || "save 10 hours a week on scheduling"
          ),
          mode: "fallback-demo"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const userPrompt = `Generate 3 variants of a cold email with the following details:

Sender Company: ${companyName || 'My Company'}
Sender Value Proposition/Solution: ${valueProposition || 'SaaS sales automation'}
Sender Industry: ${industry || 'B2B Software'}
Sender Team Size: ${teamSize || '10-50'}

Prospect Name: ${prospectName || 'Sarah'}
Prospect Title: ${prospectTitle || 'VP of Sales'}
Prospect Company: ${prospectCompany || 'TargetCorp'}
Recent Activity: ${recentActivity || 'They posted on LinkedIn about scaling outreach challenges.'}

Brand Tone Mode: ${brandTone || 'consultative'}
Call to Action (Objective): ${cta || 'A quick 10-minute introductory call next Tuesday'}

Generate 3 distinct email variants. Make sure they are highly engaging, short, personalized, and under 150 words each. Do not sound generic or pushy. Ensure variant A, B and C have slightly different narrative hooks or focal points (e.g. one leading with their recent LinkedIn activity, one focusing on direct pain relief, one consultative).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: "You are an expert sales copywriter specializing in high-converting cold outreach B2B SaaS emails. Generate personalized, compelling cold emails that drive responses. Keep emails concise (under 150 words). Always vary tone and approach across different variants.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "List of exactly 3 different credit/engagement-optimized email copy variants.",
            items: {
              type: Type.OBJECT,
              properties: {
                subjectLine: {
                  type: Type.STRING,
                  description: "Subject line of the email. Keep it short, punchy, and curiosity-driven.",
                },
                emailBody: {
                  type: Type.STRING,
                  description: "Email body in standard text format. Must be under 150 words. Do not include subject line in the body. Start with Hi {{Prospect Name}}, or similar.",
                },
                keyPersonalizationElements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "The specific triggers or elements used to customize this variant (e.g., 'Recent LinkedIn activity referring to outbound efficiency').",
                },
                predictedOpenRate: {
                  type: Type.INTEGER,
                  description: "A calculated, highly realistic open rate probability (e.g. 25-68) based on copywriting style.",
                },
                predictedClickRate: {
                  type: Type.INTEGER,
                  description: "A calculated, highly realistic CTR probability (e.g. 5-25) based on call to action clarity.",
                },
              },
              required: [
                "subjectLine",
                "emailBody",
                "keyPersonalizationElements",
                "predictedOpenRate",
                "predictedClickRate",
              ],
            },
          },
        },
      });

      const rawText = response.text?.trim() || "[]";
      const variants = JSON.parse(rawText);

      return res.json({
        variants,
        mode: "live-ai"
      });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      return res.status(500).json({
        error: "Failed to generate sales copy due to upstream AI service issue.",
        details: error.message,
      });
    }
  });

  // Serve static assets in production, otherwise hook Vite HMR
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cadence Server running on http://0.0.0.0:${PORT}`);
  });
}

function getPlaceholderVariants(
  companyName: string,
  prospectName: string,
  prospectCompany: string,
  brandTone: string,
  valueProposition: string
) {
  return [
    {
      subjectLine: `Quick question about ${prospectCompany}'s scaling plan`,
      emailBody: `Hi ${prospectName},\n\nI noticed your recent activity regarding expanding your outbound capabilities. Many sales teams struggle to scale while keeping outreach hyper-relevant.\n\nAt ${companyName}, we help teams ${valueProposition}. If you're open to it, could we schedule 5 minutes next Tuesday to share how we can support your goal?\n\nBest,\n[Your Name]`,
      keyPersonalizationElements: ["Referencing outward scaling", "Direct pain resolution hook"],
      predictedOpenRate: 52,
      predictedClickRate: 14,
    },
    {
      subjectLine: `Outreach efficiency at ${prospectCompany}`,
      emailBody: `Hi ${prospectName},\n\nAs ${prospectCompany} scales, keeping email campaigns highly personalized normally takes a significant chunk of time.\n\nWe recently enabled sales reps to ${valueProposition} without sacrificing high standards or conversions. Are you available for a 5-minute chat next Wednesday to see if this matches your focus?\n\nSincerely,\n[Your Name]`,
      keyPersonalizationElements: ["Workplace efficiency focus", "Direct value pitch"],
      predictedOpenRate: 46,
      predictedClickRate: 11,
    },
    {
      subjectLine: `Idea for ${prospectCompany}'s sales team`,
      emailBody: `Hi ${prospectName},\n\nOur research suggests that hyper-relevant consultative outreach yields up to 3x higher replies. \n\nI put together a quick mockup illustrating how ${companyName} helps companies ${valueProposition} with AI-powered customization. Would you be open to a 2-minute overview this week?\n\nBest regards,\n[Your Name]`,
      keyPersonalizationElements: ["Consultative stats trigger", "Interactive mockup offer"],
      predictedOpenRate: 58,
      predictedClickRate: 18,
    }
  ];
}

startServer();
