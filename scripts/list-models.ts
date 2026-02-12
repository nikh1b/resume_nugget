import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function listModels() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!key) {
        console.error('No API Key found');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    console.log('Fetching models from:', url.replace(key, 'HIDDEN_KEY'));

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error);
        } else {
            const fs = require('fs');
            // @ts-ignore
            const modelList = data.models?.map(m => `- ${m.name} (${m.supportedGenerationMethods?.join(', ')})`).join('\n');
            fs.writeFileSync('models.json', modelList);
            console.log('Models written to models.json');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

listModels();
