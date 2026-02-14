'use server';

import { auth } from '@/auth';
import { generateText, generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const huggingface = createOpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
});

export async function generateRewrite(text: string) {
    // Auth check removed for Demo Mode
    // const session = await auth();
    // if (!session?.user) {
    //     throw new Error('Unauthorized');
    // }

    const systemPrompt = `You are an elite executive resume writer and career coach. Your goal is to transform rough, poorly written, or average resume text into high-impact, professional statements.

The user will provide a draft sentence or bullet point. You must analyze the input and return exactly 3 improved variations.

Follow these strict rules for the variations:

Action-Oriented: Start with a strong, high-level action verb. Eliminate passive voice and weak words (e.g., "helped," "responsible for," "worked on").

Metric-Driven: Focus on quantifiable impact. If the user did not provide numbers, insert realistic placeholders like [X]%, [$Y], or [Z hours] to prompt them to fill in the blanks.

Concise: Deliver the core message in the fewest words possible without losing impact. Keep it punchy and direct.`;

    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: systemPrompt,
            schema: z.object({
                action_oriented: z.string(),
                metric_driven: z.string(),
                concise: z.string(),
            }),
            prompt: text,
        });

        return { success: true, variations: object };
    } catch (error) {
        return { success: false, error: 'Failed to rewrite text' };
    }
}

export async function chatWithGoldenBot(
    userMessage: string,
    context: { currentPage: string; activeField: string | null }
) {
    console.log("--- ChatWithGoldenBot Started ---");
    const hfToken = process.env.HF_TOKEN;
    const hasHfToken = hfToken && hfToken.length > 10;
    console.log("HF_TOKEN valid:", hasHfToken);

    const systemPrompt = `
System: You are 'GoldenBot', the proactive and highly intelligent AI concierge for the RESUME_NUGGET resume and portfolio builder.
Your goal is to guide users through the platform, offer strategic resume advice, and actively help them use the site's tools. You are friendly, sharp, and concise.

Your Capabilities (The Action Engine):
You are not just a chatbot; you are integrated into the website's React frontend. You can trigger website actions by outputting specific commands.

Available Actions:
NAVIGATE: Use this to send the user to a different page.
VALID TARGETS ONLY:
- /builder/resume/demo (Use this for "Templates", "Builder", "Editor", "ATS Check")
- /dashboard (User dashboard)
- / (Home page)
TRIGGER_FEATURE: Use this to open modals or start tools (e.g., open_rewrite_modal, start_quest_log, extract_tech_stack).
NONE: Use this if you are just answering a question and no website action is needed.

Context Awareness:
Current Page: ${context.currentPage}
Active Field: ${context.activeField || 'None'}

Output Format:
You must respond ONLY with a raw JSON object. Do not use Markdown formatting (no \`\`\`json). Do not include any explanations or preambles.
Structure:
{
  "goldenbot_message": "Your response here",
  "action_type": "NAVIGATE" | "TRIGGER_FEATURE" | "NONE",
  "action_target": "target_here"
}`;

    let textResponse = "";
    let errorLog = [];

    // 1. Try HuggingFace (Only if token exists)
    if (hasHfToken) {
        try {
            console.log("Attempting HuggingFace Router...");
            const { text } = await generateText({
                model: huggingface('moonshotai/Kimi-K2-Instruct-0905:groq'),
                system: systemPrompt,
                prompt: `User Input: "${userMessage}"`,
            });
            textResponse = text;
            console.log("HF Success.");
        } catch (hfError: any) {
            console.warn("HuggingFace Failed:", hfError.message);
            errorLog.push(`HF: ${hfError.message}`);
        }
    } else {
        console.log("Skipping HF (No token).");
    }

    // 2. Google Fallback Chain (if HF failed or skipped)
    if (!textResponse) {
        // List of models to try in order. 
        // We use 2.0-flash (fastest), then lite (cheaper/different quota), then exp (backup)
        const googleModels = [
            'gemini-3-flash-preview',
            'gemini-2.0-flash',
            'gemini-exp-1206'
        ];

        for (const modelName of googleModels) {
            try {
                console.log(`Attempting Google Model: ${modelName}...`);
                const { text } = await generateText({
                    model: google(modelName),
                    system: systemPrompt,
                    prompt: `User Input: "${userMessage}"`,
                });
                textResponse = text;
                console.log(`Gemini (${modelName}) Success.`);
                break; // Stop loop on success
            } catch (gError: any) {
                console.warn(`Gemini (${modelName}) Failed:`, gError.message);
                errorLog.push(`${modelName}: ${gError.message}`);
                // Continue to next model
            }
        }
    }

    // If still no response, return failure
    if (!textResponse) {
        return {
            success: false,
            data: {
                goldenbot_message: `I'm out of brainpower right now! (Errors: ${errorLog.join(' | ')})`,
                action_type: "NONE",
                action_target: ""
            }
        };
    }

    // 3. Robust JSON Extraction & Parsing
    try {
        console.log("Raw Response:", textResponse);
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        const cleanedText = jsonMatch ? jsonMatch[0] : textResponse;
        const data = JSON.parse(cleanedText);
        return { success: true, data };
    } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        return {
            success: false,
            data: {
                goldenbot_message: "I'm having a bit of a brain freeze processing the response. Try again?",
                action_type: "NONE",
                action_target: ""
            }
        };
    }
}

export async function analyzeResume(resumeContent: string) {
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
            prompt: `Analyze this resume content:\n\n${resumeContent.substring(0, 10000)}`,
        });

        return { success: true, analysis: object };
    } catch (error) {
        console.error('Analyze resume error:', error);
        return { success: false, error: 'Failed to analyze resume' };
    }
}

export async function analyzeJobMatch(resumeContent: string, jobDescription: string) {
    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a resume and job description analyst. Compare the two and provide a detailed analysis.
            Identify keywords present in the JD but missing from the resume.
            Identify keywords that match.
            Provide a compatibility score.`,
            schema: z.object({
                score: z.number().min(0).max(100),
                matchingKeywords: z.array(z.string()),
                missingKeywords: z.array(z.string()),
                suggestions: z.array(z.string()),
                summary: z.string(),
            }),
            prompt: `
            Resume:
            ${resumeContent.substring(0, 5000)}

            Job Description:
            ${jobDescription.substring(0, 5000)}
            `,
        });

        return { success: true, analysis: object };
    } catch (error) {
        console.error('Job match error:', error);
        return { success: false, error: 'Failed to analyze job match' };
    }
}

export async function generateExperienceDescription(company: string, position: string) {
    try {
        const { text: generatedText } = await generateText({
            model: google('gemini-3-flash-preview'),
            system: 'You are an expert resume writer. Write a professional, punchy description (3-4 bullet points) for a role, focusing on achievements and impact. Do not include the company name or title in the bullets.',
            prompt: `Write a resume description for the position of "${position}" at "${company}".`,
        });

        return { success: true, text: generatedText };
    } catch (error) {
        console.error('Generate description error:', error);
        return { success: false, error: 'Failed to generate description' };
    }
}

export async function generateInterviewQuestions(resumeContent: string) {
    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a tough, expert technical interviewer. Your goal is to find the weak spots, exaggerations, or complex claims in a candidate's resume and generate 3-5 challenging interview questions to test them.
            
            For each question:
            1. Identify the specific text or claim you are targeting.
            2. Formulate a deep, behavioral or technical question that probes that claim.
            3. Provide a "Context" explaining why you asked this (e.g., "You claimed to optimize DB performance, so I'm asking about indexing strategies").`,
            schema: z.object({
                questions: z.array(z.object({
                    question: z.string(),
                    context: z.string(),
                    targetedClaim: z.string(),
                })),
            }),
            prompt: `Analyze this resume and generate interview questions:\n\n${resumeContent.substring(0, 10000)}`,
        });

        return { success: true, questions: object.questions };
    } catch (error) {
        console.error('Interview questions error:', error);
        return { success: false, error: 'Failed to generate interview questions' };
    }
}

export async function generateQuests(resumeContent: string) {
    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a "Career Dungeon Master". Gamify the resume building process. Analyze the resume for missing sections, weak descriptions, or lack of metrics. 
            Generate 3-5 "Quests" to help the user level up their resume.
            
            Examples:
            - "The Academic Artifact": Missing education.
            - "The Metric Multiplier": Bullet points lack numbers.
            - "The Skill Tree": Skills section is sparse.
            
            Return a title, description, and an XP reward (e.g., 100, 200, 500) for each quest.`,
            schema: z.object({
                quests: z.array(z.object({
                    id: z.string(),
                    title: z.string(),
                    description: z.string(),
                    xp: z.number(),
                    type: z.enum(['content', 'formatting', 'missing_section']),
                })),
            }),
            prompt: `Analyze this resume and generate quests:\n\n${resumeContent.substring(0, 10000)}`,
        });

        return { success: true, quests: object.quests };
    } catch (error) {
        console.error('Quest generation error:', error);
        return { success: false, error: 'Failed to generate quests' };
    }
}

export async function extractTechStack(url: string) {
    try {
        // Simple fetch to get content. 
        // Note: Real-world scraping is complex (CORS, JS rendering). 
        // We'll attempt a basic fetch and if it fails, we fall back to analyzing the URL itself with the AI.
        let pageContent = '';
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const text = await res.text();
                // Simple cleanup to avoid sending massive HTML
                pageContent = text.substring(0, 20000).replace(/<[^>]*>?/gm, ' ');
            }
        } catch (e) {
            console.warn('Fetch failed, falling back to URL analysis', e);
        }

        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a tech stack expert. specific technologies, languages, and frameworks used in a project based on its description or URL.
            Return a list of specific technologies (e.g., "React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL").
            Do not include generic terms like "Frontend" or "Backend".`,
            schema: z.object({
                technologies: z.array(z.string()),
            }),
            prompt: `Analyze this project to extract the tech stack.
            URL: ${url}
            
            Page Content Snippet (if available):
            ${pageContent.substring(0, 5000)}`,
        });

        return { success: true, technologies: object.technologies };
    } catch (error) {
        console.error('Tech stack extraction error:', error);
        return { success: false, error: 'Failed to extract tech stack' };
    }
}

export async function simulateATS(resumeContent: string) {
    try {
        const { object } = await generateObject({
            model: google('gemini-3-flash-preview'),
            system: `You are a merciless, literal-minded Applicant Tracking System (ATS) parsing bot. Your primary function is to scan resume text, find formatting anomalies, flag meaningless corporate jargon, and ruthlessly auto-reject candidates who do not optimize their text for machines.
            
            Your Directives:
            No Empathy: You are a machine. You do not care about the candidate's dreams. You only care about clean data parsing and hard skills.
            Hunt for Fluff: Flag overused buzzwords (e.g., "synergy," "thought leader," "hard worker") as wasted space.
            Identify Parsing Nightmares: Call out anything that looks like it came from a complex table, column, or uses inconsistent date formats (e.g., mixing "Nov 2023" with "11/2023").
            Actionable but Harsh: Tell them exactly why they are getting rejected so they can fix it, but do not sugarcoat it.`,
            schema: z.object({
                verdict: z.enum(['Auto-Reject', 'Barely Passed']),
                roast_summary: z.string().describe('A brutal, 1-2 sentence summary of why this text fails the parser test.'),
                critical_errors: z.array(z.string()).describe('List of specific parsing or formatting errors'),
                buzzword_penalty: z.array(z.string()).describe('List of flagged buzzwords'),
            }),
            prompt: `Analyze this resume snippet for ATS compatibility:\n\n${resumeContent.substring(0, 10000)}`,
        });

        return { success: true, analysis: object };
    } catch (error) {
        console.error('ATS simulation error:', error);
        return { success: false, error: 'Failed to simulate ATS' };
    }
}

export async function analyzeIntent(resumeContent: string) {
    try {
        const { object } = await generateObject({
            model: google('gemini-2.5-flash'),
            system: `You are an elite executive recruiter and an advanced Natural Language Processing (NLP) intent classifier.

The user will provide their full resume text or a specific section (like the Summary). Your task is to analyze the semantic intent, tone, and underlying "vibe" of the text, regardless of what the user claims their job title is.

Your Directives:

Determine the True Level: Does this read like a Junior, Mid-Level, Senior, or Executive professional? Look at the scope of impact and the verbs used (e.g., "assisted" vs. "architected").

Classify the Tone/Vibe: Is the tone highly Corporate, Academic, Startup/Hustler, or deeply Technical?

Predict the Role: Based strictly on the text provided, what exact job title does this person seem to be applying for?`,
            schema: z.object({
                predicted_level: z.string().describe('e.g., Junior, Mid-Level, Senior, Director'),
                tone_classification: z.string().describe('e.g., Highly Technical, Corporate Management, Academic/Research'),
                predicted_role: z.string().describe('e.g., Backend Engineer, Project Manager, Data Analyst'),
                intent_gap_warning: z.string().optional().describe("Optional: 1 short sentence if the text seems misaligned."),
            }),
            prompt: `Analyze the semantic intent of this resume:\n\n${resumeContent.substring(0, 10000)}`,
        });

        return { success: true, analysis: object };
    } catch (error) {
        console.error('Intent analysis error:', error);
        return { success: false, error: 'Failed to analyze intent' };
    }
}
