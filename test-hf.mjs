import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const huggingface = createOpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
});

async function main() {
    console.log("Testing HuggingFace API...");
    console.log("Token exists:", !!process.env.HF_TOKEN);
    console.log("Token length:", process.env.HF_TOKEN ? process.env.HF_TOKEN.length : 0);

    console.log("Testing new key with HF Router...");
    try {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "meta-llama/Meta-Llama-3-8B-Instruct",
                    messages: [{ role: "user", content: "Say hello!" }],
                    max_tokens: 50
                }),
            }
        );

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error(errorBody);
        } else {
            const result = await response.json();
            console.log("Success! Router Response:", JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.error("Router Fetch Error:", error);
    }

    console.log("Testing with GPT2 (Free) on old API...");
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: "Hello," }),
            }
        );

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error(errorBody);
        } else {
            const result = await response.json();
            console.log("Success! Response:", JSON.stringify(result, null, 2));
        }

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

main();
