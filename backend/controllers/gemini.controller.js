import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeJob = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Please summarize the following job description into 5 key bullet points, highlighting the main responsibilities and required skills:\n\n${jobDescription}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        return res.status(200).json({
            summary: summary,
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ message: "Error generating summary." });
    }
};