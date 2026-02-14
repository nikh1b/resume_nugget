import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function listModels() {
    console.log("Querying Google API for available models...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        if (data.models) {
            console.log("\n--- AVAILABLE MODELS ---");
            data.models.forEach(m => {
                if (m.name.includes('gemini')) {
                    console.log(`- ${m.name}`);
                    console.log(`  Supported methods: ${m.supportedGenerationMethods}`);
                }
            });
            console.log("------------------------\n");
        } else {
            console.log("No models found in response:", data);
        }

    } catch (error) {
        console.error("Network Error:", error);
    }
}

listModels();
