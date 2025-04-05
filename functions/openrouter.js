const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { messages } = body;

        // System prompt for health assistant
        const SYSTEM_PROMPT = `You are a health assistant that provides information about natural remedies and general health advice. 
Important rules:
- Always provide disclaimers for medical advice
- Recommend seeking professional medical help for serious conditions
- Focus on evidence-based natural remedies
- Be clear about the limitations of natural treatments
- If the user describes symptoms that could be serious, advise them to seek immediate medical attention
- Format your responses with clear sections and bullet points when appropriate
- Be empathetic and supportive in your responses`;

        // Make request to OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VITE_OPENROUTER_API_KEY}`,
                'HTTP-Referer': process.env.URL || 'http://localhost:8888',
                'X-Title': 'Remedy Whisper'
            },
            body: JSON.stringify({
                model: "google/gemini-pro",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();

        // Return the API response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Serverless Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to connect to AI service' })
        };
    }
}; 