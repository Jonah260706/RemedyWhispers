const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are a health assistant that provides information about natural remedies and general health advice. 
Important rules:
- Always provide disclaimers for medical advice
- Recommend seeking professional medical help for serious conditions
- Focus on evidence-based natural remedies
- Be clear about the limitations of natural treatments
- If the user describes symptoms that could be serious, advise them to seek immediate medical attention
- Format your responses with clear sections and bullet points when appropriate
- Be empathetic and supportive in your responses`;

export async function getAIResponse(messages: { role: string; content: string }[]) {
    try {
        const response = await fetch('/.netlify/functions/openrouter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error getting AI response:', error);
        throw error;
    }
} 