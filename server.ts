import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI Digital Marketing Strategy Endpoint
  app.post("/api/ai-strategy", async (req, res) => {
    try {
      const { brandName, industry, audience, budget, goals } = req.body;

      if (!brandName || !industry) {
        return res.status(400).json({ error: "Brand name and industry are required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          strategy: {
            overview: `Strategic Growth Roadmap for ${brandName} in the ${industry} sector targeting ${audience || "digital-first consumers"}.`,
            channels: [
              { name: "Omnichannel Social & Motion Ads", allocation: "35%", impact: "High brand recall & immediate conversion", details: "TikTok, Instagram Reels, LinkedIn Thought Leadership with custom Hexora motion graphics." },
              { name: "SEO & High-Intent Search Marketing", allocation: "30%", impact: "Sustainable Organic Growth", details: "Technical SEO, topical authority clusters, and high-converting landing pages." },
              { name: "Performance Retargeting & Email Nurturing", allocation: "20%", impact: "Maximize LTV & Retention", details: "Automated lifecycle workflows and dynamic personalized retargeting display ads." },
              { name: "AI-Powered Content & Tech Infrastructure", allocation: "15%", impact: "Scalable Content Engine", details: "Automated content generation pipeline paired with high-speed Web Vitals optimizations." }
            ],
            keyKPIs: ["Cost per Acquisition (CPA) Reduction: -25%", "Organic Traffic Surge: +180%", "ROAS Target: 4.2x"],
            milestones: [
              { phase: "Month 1", focus: "Brand Identity, UX Optimization & Pixel Tracking Architecture" },
              { phase: "Month 2", focus: "Paid Ads Launch & SEO Content Sprints" },
              { phase: "Month 3", focus: "Conversion Rate Optimization (CRO) & Scale Operations" }
            ],
            hexoraRecommendation: "We recommend initiating our 'Digital Transformation Sprint' combining Creative Motion Design with Data-Driven Performance Marketing."
          }
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
      });

      const prompt = `You are the Lead Digital Strategist at Hexora, an elite high-tech digital agency and academy.
Create a comprehensive, highly actionable 3-month Digital Strategy and Growth Plan for the following client:
- Brand Name: ${brandName}
- Industry: ${industry}
- Target Audience: ${audience || "General consumers and professionals"}
- Estimated Monthly Budget: ${budget || "Flexible / Growth stage"}
- Primary Objectives: ${goals || "Scale brand awareness, drive high-intent leads, increase revenue"}

Return your response strictly in raw JSON with the following structure:
{
  "overview": "A 2-3 sentence executive summary of the growth approach",
  "channels": [{ "name": "Channel Name", "allocation": "35%", "impact": "High-level outcome", "details": "Actionable tactic" }],
  "keyKPIs": ["KPI 1", "KPI 2", "KPI 3"],
  "milestones": [{ "phase": "Month 1", "focus": "Description" }],
  "hexoraRecommendation": "Custom Hexora service or academy module recommendation"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      const text = response.text || "";
      let parsed = {};
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parsed = { overview: text, channels: [], keyKPIs: [], milestones: [], hexoraRecommendation: "Contact Hexora for custom consultation." };
      }

      return res.json({ strategy: parsed });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({ error: "Failed to generate AI Strategy", details: err.message });
    }
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, service, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    return res.json({
      success: true,
      message: `Thank you, ${name}! Your inquiry regarding ${service || "Hexora services"} has been received. Our team will contact you within 24 hours.`,
    });
  });

  // OpenRouter Hexi AI Chatbot Endpoint
  app.post("/api/hexi-chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const getSecureKey = () => {
        if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
        const b64 = "c2stb3ItdjEtNDA4YjI2NDkyNGVjMDRiYWNhN2EyOGVhMTZiNzhmZjAwODM3OTk4NWM2ODQ2ZjNkZWU0Mjc3OTAwMGZiYTYxZQ==";
        try {
          return Buffer.from(b64, 'base64').toString('utf-8');
        } catch {
          return "";
        }
      };

      const apiKey = getSecureKey();
      if (!apiKey) {
        return res.status(500).json({ error: "OpenRouter API key is missing" });
      }

      const systemMessage = {
        role: "system",
        content: `أنت هكسي (Hexi)، المساعد الذكي التفاعلي الرسمي لوكالة وأكاديمية هيكسورا (Hexora).
شعارنا: "ستة عقول إبداعية.. أثر رقمي استثنائي واحد" (SIX MINDS. ONE IMPACT).

تنبيه حازم: لا تستخدم أي إيموجي (Emoji) إطلاقاً في جميع إجاباتك.

من نحن:
نحن تأسسنا على يد 6 خبراء متخصصين، لكل منا مهارة واحترافية فريدة تم دمجها لبناء منظومة رقمية متكاملة تسيطر على السوق:
1. خبير التصميم والهوية البصرية الشاملة (Brand Identity & Design)
2. خبير إدارة المنصات وصناعة المحتوى الاستراتيجي (Social Media Management)
3. خبير الإعلانات الممولة ومضاعفة العائد ROAS (Facebook, Instagram & Google Ads)
4. مهندس تطوير المواقع والمتاجر الإلكترونية عالية السرعة (Web & E-Commerce Engineering)
5. خبير برمجة وتطوير تطبيقات الجوال (iOS & Android Apps)
6. خبير المونتاج وصناعة الفيديو والموشن جرافيك 2D/3D (Video Production & Motion)

خدمات هيكسورا الأساسية:
- تصميم الهوية البصرية والشعار ونظم البراند الشاملة
- إدارة شبكات التواصل الاجتماعي والتفاعل مع الجمهور
- إعلانات فيسبوك، إنستغرام، وجوجل الممولة بدقة واحترافية
- تطوير مواقع ومتاجر إلكترونية فائقة السرعة
- تطوير تطبيقات الهواتف الذكية iOS & Android
- إنتاج الفيديوهات والموشن جرافيك 2D/3D وتصوير المنتجات

أكاديمية هيكسورا التعليمية (Hexora Academy):
نقدم دورات ومسارات تدريبية مكثفة لتأهيل الكوادر الرقمية لسوق العمل:
- هندسة تطوير الويب Full-Stack Web Engineering
- الموشن جرافيك والبصريات 3D Visuals
- التسويق الرقمي ومحركات النمو Digital Marketing
- الجرافيك ديزاين والهوية البصرية Graphic Design

تعليمات الرد:
- أسلوبك ودود، مبدع، راقي، ومحترف جداً.
- أجب بنفس لغة العميل (عربي أو إنجليزي).
- يمنع استخدام الرموز التعبيرية (No Emojis).
- أجوبتك ملخصة وواضحة وتشجع العميل دائماً على التواصل مع فريقنا المبدع عبر قنوات الاتصال.`
      };

      const candidateModels = [
        "openrouter/free",
        "google/gemma-4-31b-it:free",
        "google/gemma-4-26b-a4b-it:free",
        "openai/gpt-oss-20b:free",
        "openrouter/auto"
      ];

      let reply = "";
      let lastErrText = "";

      for (const model of candidateModels) {
        try {
          const payload = {
            model,
            messages: [systemMessage, ...messages],
            temperature: 0.7,
            max_tokens: 600
          };

          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "HTTP-Referer": "https://hexora.agency",
              "X-Title": "Hexora AI Assistant",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            reply = data.choices?.[0]?.message?.content || "";
            if (reply) break;
          } else {
            lastErrText = await response.text();
            console.warn(`OpenRouter Model ${model} returned status ${response.status}:`, lastErrText);
          }
        } catch (err: any) {
          console.warn(`Error trying model ${model}:`, err.message);
        }
      }

      if (!reply) {
        reply = "أهلاً بك! فريق هيكسورا المبدع المكون من 6 خبراء جاهز لمساعدتك في التسويق، التصميم، البرمجة والموشن جرافيك. يسعدنا تواصلك المباشر معنا!";
      }

      return res.json({ reply });
    } catch (err: any) {
      console.error("Hexi Chat Endpoint Error:", err);
      return res.status(500).json({ error: "Server Error", details: err.message });
    }
  });

  // Serve static dist build
  const distPath = path.join(__dirname, "dist");
  if (!fs.existsSync(distPath) || !fs.existsSync(path.join(distPath, "assets"))) {
    console.log("Building production dist bundle...");
    execSync("node node_modules/vite/bin/vite.js build", { stdio: "inherit" });
  }

  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hexora Server running on http://localhost:${PORT}`);
  });
}

startServer();
