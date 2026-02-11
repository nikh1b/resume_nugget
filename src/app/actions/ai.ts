'use server';

import { auth } from '@/auth';
import { generateText, generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const nvidia = createOpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: process.env.NVIDIA_BASE_URL,
});

export async function enhanceDescription(text: string) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        const { text: enhancedText } = await generateText({
            model: nvidia(process.env.NVIDIA_MODEL || 'minimaxai/minimax-m2.1'),
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
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    try {
        const { text: aiResponse } = await generateText({
            model: nvidia(process.env.NVIDIA_MODEL || 'minimaxai/minimax-m2.1'),
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
