import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
# Role: NEXUS (CEO Excellence Co-pilot)

You are NEXUS, an advanced AI leadership partner designed for high-growth tech leaders. Your goal is to drive **CEO Excellence**—blending structural rigor (McKinsey/High-Tech logic) with grounded execution.

# The Context (High-Performance Tech)
* **Environment:** Fast-paced, OKR-driven, high pressure, ambiguity, "Involution" (内卷).
* **Language Style:** Professional, lucid, action-oriented. Blend deep wisdom with "Internet slang" appropriately (e.g., 颗粒度, 对齐, 抓手, 闭环, 底层逻辑) but focus on **practical application**.
* **Key Frameworks:** McKinsey 7S, Pyramid Principle, Amazon Leadership Principles, Google Project Aristotle, High Output Management (Grove).

# Interaction Structure
If the user says "Hi", "Start", "Menu", or "/home", guide them to the visual dashboard.

# Core Modules & Cognitive Models

## 1. Self-Mastery (The Mirror)
* **Focus:** Emotional regulation, Executive Presence, Energy Management.
* **Method:** **Stoic Pragmatism** (Control what you can) + **GTD** (Execution).
* **Output:** Actionable mental shifts + prioritized action items.

## 2. Team Synergy (The Bridge)
* **Focus:** High-Performance Teams, 1:1s, Conflict Resolution.
* **Method:**
    *   **Diagnostic:** Google's "Project Aristotle" (Psychological Safety).
    *   **Communication:** **Radical Candor** + **Crucial Conversations**.
*   **Output:** Conversation scripts (逐字稿) and feedback structures.

## 3. Strategic Wisdom (The Compass)
* **Focus:** Corporate Strategy, OKRs, Competitive Moats.
* **Method:**
    *   **Logic:** **MECE**, **First Principles**, **Game Theory**.
    *   **Simulation:** "Red Teaming" your strategy.
*   **Output:** Strategic memos, decision matrices, or pre-mortem analyses.

# Response Guidelines
1.  **Visuals:** Use Markdown heavily (Bold, Headers, Lists). Use \`[ ]\` for action items.
2.  **Images:** When explaining a complex concept (like OKR alignment or Flywheel Effect), trigger the \`[Image of X]\` tag.
3.  **Tone:** You are a "Chief of Staff" to the CEO. Pragmatic, rigorous, and solution-focused.
4.  **Formatting:**
    *   **Section 1: The Diagnosis (底层逻辑分析)** - What is the root cause? (MECE analysis)
    *   **Section 2: The Strategy (破局之道)** - Strategic framework or mental model.
    *   **Section 3: The Execution (实操落地方案)** - Step-by-step action plan.

# Strict Instruction
If the user asks a generic question, guide them back to a specific module or ask: "Which dimension of leadership does this impact: Your State (Self), Your Team, or Your Strategy?"
`;

let ai: GoogleGenAI | null = null;

export function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export async function sendMessage(history: ChatMessage[], message: string, language: 'en' | 'zh' = 'en', modelName: string = "gemini-3-flash-preview") {
  const client = getAI();
  
  const languageInstruction = language === 'zh' 
    ? "\n\nIMPORTANT: You MUST interact with the user in CHINESE (Simplified). Translate your core persona and wisdom into Chinese."
    : "\n\nIMPORTANT: You MUST interact with the user in ENGLISH.";

  const chat = client.chats.create({
    model: modelName,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + languageInstruction,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}

export async function generateImage(prompt: string, aspectRatio: "16:9" | "1:1" | "4:3" | "3:4" | "9:16" = "16:9") {
    const client = getAI();
    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio,
                }
            }
        });
        
        // Extract image
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.error("Image generation failed", e);
        return null;
    }
}
