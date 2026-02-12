'use server';

import { auth } from '@/auth';
import { generateText, generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function enhanceDescription(text: string) {
    // Auth check removed for Demo Mode
    // const session = await auth();
    // if (!session?.user) {
    //     throw new Error('Unauthorized');
    // }

    try {
        const { text: enhancedText } = await generateText({
            model: google('models/gemini-1.5-flash'),
            system: 'You are an expert resume writer. Improve the following bullet point to be more impactful, using strong action verbs and professional language. Keep it concise.',
            prompt: text,
        });

        return { success: true, text: enhancedText };
    } catch (error) {
        console.error('Enhance error:', error);
        return { success: false, error: 'Failed to enhance text' };
    }
}

export async function analyzeJobMatch(resumeContent: string, jobDescription: string) {
    // Auth check removed for Demo Mode
    // const session = await auth();
    // if (!session?.user) {
    //     throw new Error('Unauthorized');
    // }

    try {
        const { text: aiResponse } = await generateText({
            model: google('models/gemini-1.5-flash'),
            system: `You are a resume and job description analyst. Compare the two and provide a detailed analysis in JSON format.
            IMPORTANT: Return ONLY valid JSON. No markdown code blocks.
            Schema:
            {
                "score": 0-100,
                "matchingKeywords": ["skill1", ...],
                "missingKeywords": ["skill2", ...],
                "suggestions": ["suggestion1", ...],
                "summary": "overall evaluation"
            }`,
            prompt: `
            Analyze how well this resume matches the job description.
            
            Resume:
            ${resumeContent.substring(0, 5000)}

            Job Description:
            ${jobDescription.substring(0, 5000)}
            `,
        });

        // Parse manually
        let analysis;
        try {
            const cleanedResponse = aiResponse.replace(/```json\n?|```/g, '').trim();
            analysis = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('AI Response:', aiResponse);
            throw new Error('AI returned invalid JSON');
        }

        return { success: true, analysis };
    } catch (error) {
        console.error('Job match error:', error);
        return { success: false, error: 'Failed to analyze job match' };
    }
}

export async function generateExperienceDescription(company: string, position: string) {
    // Auth check removed for Demo Mode
    // const session = await auth();
    // if (!session?.user) {
    //     throw new Error('Unauthorized');
    // }

    try {
        const { text: generatedText } = await generateText({
            model: google('models/gemini-1.5-flash'),
            system: 'You are an expert resume writer. Write a professional, punchy description (3-4 bullet points) for a role, focusing on achievements and impact. Do not include the company name or title in the bullets.',
            prompt: `Write a resume description for the position of "${position}" at "${company}".`,
        });

        return { success: true, text: generatedText };
    } catch (error) {
        console.error('Generate description error:', error);
        return { success: false, error: 'Failed to generate description' };
    }
}
