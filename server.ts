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
