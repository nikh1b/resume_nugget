import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function testGoogle() {
    console.log('Testing Google Gemini API...');

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error('Error: GOOGLE_GENERATIVE_AI_API_KEY is missing.');
        return;
    }

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const models = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-flash-latest'];

    for (const modelName of models) {
        console.log(`Testing model: ${modelName}...`);
        try {
            const { text } = await generateText({
                model: google(modelName),
                prompt: 'Hello, are you working?',
            });
            console.log(`SUCCESS with ${modelName}! Response:`, text);
            return; // Exit on first success
        } catch (error: any) {
            console.error(`FAILED with ${modelName}:`, error.message?.substring(0, 100) || error);
        }
    }
}

testGoogle();
