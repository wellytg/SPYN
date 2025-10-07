
import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// We assume this is pre-configured. Do not add any UI for it.
const API_KEY = process.env.API_KEY || ""; 

if (!API_KEY) {
  console.warn("Gemini API key not found. Using mock responses. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MOCK_COMPATIBILITY_RESPONSE = "High Compatibility Score: 92%. Skills are an excellent match, and the 4-year vesting schedule meets the partner's long-term upside criteria. Both parties are aligned on the high-impact, low-cash nature of this early-stage venture, suggesting a strong foundation for partnership.";
const MOCK_LEGAL_RESPONSE = "Plain Language Summary: This means the company automatically owns everything you create for them, immediately, as soon as you create it. You are transferring all your rights to the work product to the company, and you can't take it with you if you leave.";
const MOCK_SURVEY_ANALYSIS_RESPONSE = "This is a primary risk. Unclear or insecure legal agreements can lead to disputes over equity, ownership, and responsibilities down the line. SPYN mitigates this by providing standardized, legally-vetted EFS contracts that clearly define terms, vesting, and IP assignment from the start, ensuring both parties are protected.";

export const generateCompatibilitySummary = async (founderNeed: string, professionalProfile: string): Promise<string> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return MOCK_COMPATIBILITY_RESPONSE;
  }
  
  try {
    const prompt = `Analyze the following Founder Need and the Professional's Profile. Generate a concise, single-paragraph summary of the Compatibility Score based on skill, commitment match, and equity expectation alignment.

    Founder Need: "${founderNeed}"
    
    Professional's Profile: "${professionalProfile}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating compatibility summary:", error);
    return "An error occurred while analyzing compatibility. Please try again.";
  }
};

export const explainLegalClause = async (clause: string): Promise<string> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return MOCK_LEGAL_RESPONSE;
  }

  try {
    const prompt = `Take the following dense legal text and provide a simple, plain-language summary of this clause for a non-lawyer.

    Legal Text: "${clause}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error explaining legal clause:", error);
    return "An error occurred while explaining the clause. Please try again.";
  }
};

export const analyzeSurveyResponse = async (question: string, answer: string): Promise<string> => {
    if (!API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        return MOCK_SURVEY_ANALYSIS_RESPONSE;
    }

    try {
        const prompt = `A user is filling out a "Partnership Readiness Assessment".
        Question: "${question}"
        Their selected answer representing their biggest fear is: "${answer}"

        Please provide a concise, one-paragraph analysis. Explain why this is a valid fear and a significant risk in a typical Equity-for-Services partnership. Then, briefly explain how a platform that provides standardized legal agreements and automated governance (like SPYN) would mitigate this specific risk.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing survey response:", error);
        return "An error occurred while analyzing the response. Please try again.";
    }
};
