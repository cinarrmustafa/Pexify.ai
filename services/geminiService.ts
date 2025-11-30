import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, the API key should be handled via backend proxy or environment variables.
// For this demo, we will check if the user has provided one or mock the response if strictly needed for UI preview.

export const analyzeDocumentText = async (apiKey: string, text: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is required");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    
    const systemPrompt = `
      You are Pexify AI, a specialized document auditor for the textile industry. 
      Analyze the provided document text (excerpt from an Invoice or Packing List).
      Identify potential errors such as:
      1. Mismatched dates.
      2. Formatting inconsistencies.
      3. Missing buyer details.
      4. Logic errors in quantities (e.g. total weight < net weight).
      
      Return a concise, JSON-formatted list of "issues" found. 
      If the text seems fine, return an empty list.
      
      Example input: "Date: 2023-13-01, Weight: 500kg"
      Example output JSON: { "issues": ["Invalid date format: 2023-13-01", "Missing Invoice Number"] }
    `;

    const response = await ai.models.generateContent({
      model,
      contents: text,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw error;
  }
};