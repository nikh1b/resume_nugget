import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

async function testAnalyze() {
    console.log("Testing analyzeResume with gemini-3-flash-preview...");

    // Create a large dummy resume content (approx 5000 chars)
    const dummyResume = "Experience: Software Engineer at Tech Corp. ".repeat(200);

    const startTime = Date.now();

    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a strict resume critic. Analyze the resume and provide a score out of 100 based on impact, brevity, and formatting (implied).
            Provide specific, actionable suggestions to improve the score.
            Return a structured JSON object.`,
            schema: z.object({
                score: z.number().min(0).max(100),
                suggestions: z.array(z.string()).describe('List of specific improvements'),
                summary: z.string().describe('Brief overall critique'),
            }),
            prompt: `Analyze this resume content:\n\n${dummyResume}`,
        });

        const duration = (Date.now() - startTime) / 1000;
        console.log(`Success! Took ${duration} seconds.`);
        console.log("Score:", object.score);
    } catch (error) {
        const duration = (Date.now() - startTime) / 1000;
        console.error(`Failed after ${duration} seconds.`, error);
    }
}

testAnalyze();
