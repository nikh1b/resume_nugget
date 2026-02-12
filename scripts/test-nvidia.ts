import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // Load from .env

async function testNvidia() {
    console.log('Testing NVIDIA API...');
    console.log('URL:', process.env.NVIDIA_BASE_URL);
    console.log('Model:', process.env.NVIDIA_MODEL);

    const nvidia = createOpenAI({
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: process.env.NVIDIA_BASE_URL,
    });

    try {
        const { text } = await generateText({
            model: nvidia(process.env.NVIDIA_MODEL || 'minimaxai/minimax-m2.1'),
            prompt: 'Hello, are you working?',
        });
        console.log('Success! Response:', text);
    } catch (error) {
        console.error('Error:', error);
    }
}

testNvidia();
