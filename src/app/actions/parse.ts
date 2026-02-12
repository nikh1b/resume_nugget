'use server';

import { auth } from '@/auth';
import { generateText, generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

import { randomUUID } from 'crypto';

// Schema for parsing — uses .default('') to match the Resume interface (required strings)
// Schema for parsing — Strict Mode requires all fields to be required. 
// We instruct the AI to use empty strings for missing data in the prompt.
const responseSchema = z.object({
    personalInfo: z.object({
        fullName: z.string().describe("The user's full name"),
        email: z.string().describe("Email address, or empty string if not found"),
        phone: z.string().describe("Phone number, or empty string if not found"),
        address: z.string().describe("Address, or empty string if not found"),
        summary: z.string().describe("Professional summary, or empty string if not found"),
    }),
    education: z.array(z.object({
        institution: z.string(),
        degree: z.string(),
        fieldOfStudy: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
    })),
    experience: z.array(z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        current: z.boolean(),
        description: z.string(),
    })),
    skills: z.array(z.string()),
    projects: z.array(z.object({
        name: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        link: z.string(),
    })),
});

export async function parseResume(formData: FormData) {
    // Auth check removed for Demo Mode
    // const session = await auth();
    // if (!session?.user) {
    //     return { success: false, error: 'Unauthorized' };
    // }

    const file = formData.get('file') as File;
    if (!file) {
        return { success: false, error: 'No file uploaded' };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // PDF Parse
        // @ts-ignore
        const pdf = require('pdf-parse');
        const data = await pdf(buffer);
        const text = data.text;

        // AI Extraction
        console.log('Starting resume parsing with model: gemini-flash-latest');
        const { text: aiResponse } = await generateText({
            model: google('gemini-flash-latest'),
            system: `You are a resume parser. Extract structured data into a valid JSON object matching the requested schema.
            IMPORTANT: Return ONLY the JSON object. Do not include markdown code blocks or any other text.
            If a field is missing, use "" or false. Do NOT omit any fields from the schema.`,
            prompt: `Extract resume data from this text into a JSON object:
            
            Schema:
            - personalInfo: { fullName, email, phone, address, summary }
            - education: Array of { institution, degree, fieldOfStudy, startDate, endDate, description }
            - experience: Array of { company, position, startDate, endDate, current (boolean), description }
            - skills: Array of strings
            - projects: Array of { name, description, technologies (array), link }

            Text:
            ${text.substring(0, 20000)}`,
        });

        // Parse and validate manually
        let object;
        try {
            // Remove markdown code blocks if present
            const cleanedResponse = aiResponse.replace(/```json\n?|```/g, '').trim();
            object = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('AI Response:', aiResponse);
            throw new Error('AI returned invalid JSON format');
        }

        // Transform to match Resume type with IDs
        const resume = {
            personalInfo: object.personalInfo,
            education: (object.education || []).map((e: any) => ({ ...e, id: randomUUID() })),
            experience: (object.experience || []).map((e: any) => ({ ...e, id: randomUUID() })),
            skills: object.skills || [],
            projects: (object.projects || []).map((p: any) => ({ ...p, id: randomUUID() })),
        };

        return { success: true, resume };

    } catch (error) {
        console.error('Parsing error:', error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}
