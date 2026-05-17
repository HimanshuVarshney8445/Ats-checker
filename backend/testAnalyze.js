import dotenv from 'dotenv';
dotenv.config();

import { analyzeResume } from './utils/geminiAnalyzer.js';

async function test() {
    const resumeText = "Software Engineer with 5 years of experience in React and Node.js. Experienced in building scalable web applications. Familiar with MongoDB, Express, AWS.";
    const jobTitle = "Senior Full Stack Developer";
    const jobDescription = "Looking for a Senior Full Stack Developer with strong experience in React, Node.js, and MongoDB. Must have experience with cloud deployments (AWS or GCP).";

    console.log("Starting analysis test...");
    try {
        const result = await analyzeResume(resumeText, jobTitle, jobDescription);
        console.log("Analysis Result SUCCESS:", result);
    } catch (e) {
        console.error("Analysis Result FAILED:", e);
    }
}

test();
