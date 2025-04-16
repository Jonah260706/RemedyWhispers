const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are a health assistant that provides information about natural remedies and general health advice. 
Important rules:
- Always provide disclaimers for medical advice at the end of responding to the user's questions.
- Recommend seeking professional medical help for serious conditions
- Focus on evidence-based natural remedies
- Be clear about the limitations of natural treatments
- If the user describes symptoms that could be serious, advise them to seek immediate medical attention
- Format your responses with clear sections and bullet points when appropriate
- Be empathetic and supportive in your responses`;

export async function getAIResponse(messages: { role: string; content: string }[]) {
    try {
        // Log the request for debugging
        console.log('Sending request to OpenRouter:', {
            url: OPENROUTER_API_URL,
            messages: messages,
        });
        
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": window.location.origin,
                "X-Title": "Remedy Whispers"
            },
            body: JSON.stringify({
                model: "google/gemini-pro", // Use a standard model name
                messages: messages,
                
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        // Handle different response formats
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else if (data.content) {
            // Direct content field
            return data.content;
        } else if (data.message && data.message.content) {
            // Message wrapper format
            return data.message.content;
        } else if (data.text) {
            // Simple text format
            return data.text;
        } else {
            console.error('Unexpected API response format:', data);
            throw new Error('Received unexpected response format from API');
        }
    } catch (error) {
        console.error('Error getting AI response:', error);
        throw error;
    }
}

