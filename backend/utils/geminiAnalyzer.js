import { GoogleGenerativeAI } from "@google/generative-ai"; 

import dotenv from 'dotenv';
dotenv.config();

export const analyzeResume = async (resumeText, jobTitle, jobDescription) => {
    try {
        const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = gemini.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = `
            You are an expert ATS (Applicant Tracking System) and resume reviewer.
            Analyze the following resume carefully against the job title and description provided.

            Job Title: ${jobTitle}
            Job Description: ${jobDescription}
            Resume Text: ${resumeText}

            Return ONLY a valid JSON object with the following structure:
            {
                "ats_score": number (0-100),
                "target_role": "string",
                "summary": "string (2-3 sentences)",
                "matched_keywords": ["string"],
                "missing_keywords": ["string"],
                "recommendations": ["string (Actionable advice)"]
            }

            Rules:
            - Return ONLY the JSON object.
            - Do not include markdown code blocks (e.g., \`\`\`json).
            - Ensure all fields are present.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        console.log("Raw Gemini Response:", text);
        
        // Clean the response text in case Gemini includes markdown backticks
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const parsedData = JSON.parse(text);
        console.log("Parsed Gemini Data:", JSON.stringify(parsedData, null, 2));
        
        return parsedData;
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw new Error("AI analysis failed to process the resume");
    }
};