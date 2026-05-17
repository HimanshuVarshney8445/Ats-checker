import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.log("No API key");
        return;
    }
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    if (data.models) {
        console.log("Models:", data.models.map(m => m.name));
    } else {
        console.log("Error:", data);
    }
}
listModels();
