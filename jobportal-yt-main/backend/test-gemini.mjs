import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function runTest() {
    console.log("--- Starting Gemini API Test Script ---");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("🔴 ERROR: GEMINI_API_KEY not found in your .env file.");
        console.log("Please ensure your .env file is in the same directory and contains the key.");
        return;
    }
    console.log("✅ API Key loaded successfully.");

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        
        console.log("⏳ Sending a simple request to the Gemini API...");
        const result = await model.generateContent("Can you say 'Hello, World!'?");
        const response = await result.response;
        const text = response.text();

        console.log("✅✅✅ SUCCESS! Gemini responded: ✅✅✅");
        console.log(text);

    } catch (error) {
        console.error("🔴🔴🔴 TEST FAILED. The API call produced an error: 🔴🔴🔴");
        console.error(error);
    }
}

runTest();