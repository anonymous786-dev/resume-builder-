import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateResumeContent(prompt: string) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert resume writer. Help the user write professional, high-impact bullet points or summaries for their resume. Keep it concise and action-oriented.",
    },
  });
  
  const response = await model;
  return response.text;
}
