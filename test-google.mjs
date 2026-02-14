import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Hardcoding the key here for immediate testing as requested by user
const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBWftAzsJEuLF9tQ-wVyQLeOUKmvGdwjgY",
});

async function main() {
    console.log("Testing Google API Key (AIza...) with gemini-2.0-flash...");
    try {
        const { text } = await generateText({
            model: google('gemini-2.0-flash'),
            prompt: 'Are you working?',
        });
        console.log("Success! Gemini response:", text);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
