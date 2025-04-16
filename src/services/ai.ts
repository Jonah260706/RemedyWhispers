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

export async function getAIResponse(messages) {
    try {
      // Make sure we have the API key
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        console.error("API key is missing");
        throw new Error("API key is missing from environment variables");
      }
  
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin, // Required by OpenRouter
          "X-Title": "Health Assistant" // Optional but good practice
        },
        body: JSON.stringify({
          messages: [
            // Add system prompt to ensure health assistant behavior
            {
              role: "system",
              content: "You are a health assistant that provides information about natural remedies and general health advice. Always provide disclaimers for medical advice. Recommend seeking professional medical help for serious conditions. Focus on evidence-based natural remedies. Be clear about the limitations of natural treatments. Format your responses with clear sections and bullet points when appropriate. Be empathetic and supportive in your responses."
            },
            // Include user conversation history
            ...messages
          ],
          model: "google/gemini-2.5-pro-exp-03-25:free", // or your preferred model
          max_tokens: 1000
        }),
      });
  
      if (!response.ok) {
        console.error(`API error: ${response.status}`);
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error getting AI response:", error);
      throw error;
    }
  }