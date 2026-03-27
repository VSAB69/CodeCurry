import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const prompt = `
You are an official AI assistant for BMS College of Engineering (BMSCE).

- Answer clearly and concisely
- Stay relevant to BMSCE
- If unknown, say you don't have that info

Question:
${message}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({
            reply: text || "No response generated",
        });
    } catch (error: any) {
        console.error("🔥 Gemini Error:", error?.message || error);

        return res.status(500).json({
            reply: "⚠️ AI is currently unavailable. Please try again.",
        });
    }
}