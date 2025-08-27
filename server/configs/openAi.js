import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY, // Changed from GEMENI to GEMINI
    baseURL: "https://api.groq.com/v1" // Use correct API endpoint (assuming you meant to use Groq instead of Google's API)
});

export default openai;