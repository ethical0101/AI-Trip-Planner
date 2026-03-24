// Using Groq API (free tier) instead of Google Gemini
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY || "gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

// Create a custom chatSession object that mimics the Google API
class GroqChatSession {
    constructor() {
        this.history = [];
    }

    async sendMessage(message) {
        this.history.push({
            role: "user",
            content: message,
        });

        try {
            const response = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant", // Available in your account
                messages: this.history,
                temperature: 0.7,
                max_tokens: 8192,
                response_format: { type: "json_object" },
            });

            const assistantMessage = response.choices[0].message.content;
            this.history.push({
                role: "assistant",
                content: assistantMessage,
            });

            return {
                response: {
                    text: () => assistantMessage,
                },
            };
        } catch (error) {
            console.error("Groq API Error:", error);
            throw error;
        }
    }
}

export const chatSession = new GroqChatSession();
