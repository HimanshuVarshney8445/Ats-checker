import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { analyzeResume } from "../utils/geminiAnalyzer.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
        
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "raw",
          folder: "resumes",
        });
    
        console.log("Cloudinary upload result:", result);
    
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully");
            }
        });
    
        res.status(200).json({
          message: "File uploaded successfully",
          fileUrl: result.secure_url
        });
    
      } catch (error) {
        res.status(500).json({
          error: error.message
        });
      }
}

export const analyzeResumeController = async (req, res) => {
  try{
    const { resumeUrl, jobTitle, jobDescription } = req.body;

    if(!resumeUrl){
      return res.status(400).json({ error: "Resume URL is required" });
    }

    const resumeText = await extractTextFromPDF(resumeUrl);

    if (!resumeText || resumeText.trim().length === 0) {
      console.warn("No text could be extracted from the resume.");
      return res.status(422).json({ 
        error: "Could not extract text from the PDF. Please ensure the PDF is not an image scan or encrypted." 
      });
    }

    console.log(`Extracted ${resumeText.length} characters from resume.`);

    const analyzeResult = await analyzeResume(resumeText, jobTitle, jobDescription);
    res.status(200).json(analyzeResult);

  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
}