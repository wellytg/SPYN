
import { GoogleGenAI, Type } from "@google/genai";

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


export const generateMatchScoreAndSummary = async (
  founderProfile: string,
  professionalPreferences: string
): Promise<{ score: number; summary: string }> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    // Make the mock score deterministic for consistent testing
    let hash = 0;
    const str = founderProfile + professionalPreferences;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    const score = 75 + (Math.abs(hash) % 25);
    return { 
        score, 
        summary: "High compatibility based on skill alignment and a good fit with the company's stage." 
    };
  }

  try {
    const prompt = `Based on the Founder's opportunity and the Professional's preferences, calculate a match score from 0 to 100 and provide a brief, one-sentence summary of why.

    Founder Opportunity:
    ${founderProfile}

    Professional's Preferences:
    ${professionalPreferences}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'A match score between 0 and 100.'
            },
            summary: {
              type: Type.STRING,
              description: 'A brief, one-sentence summary explaining the score.'
            }
          },
          required: ['score', 'summary']
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error generating match score:", error);
    return {
      score: 0,
      summary: "An error occurred while analyzing the match."
    };
  }
};

export const explainLegalTerm = async (term: string): Promise<string> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    return `In simple terms, "${term}" refers to a common concept in startup agreements where value or ownership is earned over a specific period of time or upon hitting certain goals. [Mock Explanation]`;
  }

  try {
    const prompt = `In one or two simple sentences, explain the following legal or business term for a non-lawyer founder or professional. Keep the tone helpful and straightforward.

    Term: "${term}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 10 },
      },
    });
    
    return response.text;
  } catch (error) {
    console.error(`Error explaining legal term "${term}":`, error);
    return "An error occurred while explaining this term.";
  }
};
