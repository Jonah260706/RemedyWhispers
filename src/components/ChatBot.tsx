
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your wellness assistant. How can I help with your health questions today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses based on keywords
  const getResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("headache")) {
      return "For headaches, you might try:\n• Peppermint oil on your temples\n• Stay hydrated\n• Rest in a dark, quiet room\n• Try a cold compress on your forehead";
    } 
    else if (lowercaseInput.includes("sleep") || lowercaseInput.includes("insomnia")) {
      return "To improve sleep quality:\n• Drink chamomile tea before bed\n• Create a regular sleep schedule\n• Avoid screens 1 hour before bed\n• Try lavender essential oil on your pillow";
    }
    else if (lowercaseInput.includes("stress") || lowercaseInput.includes("anxiety")) {
      return "For stress relief:\n• Practice deep breathing exercises\n• Try a calming tea like lemon balm or ashwagandha\n• Take a walk in nature\n• Use lavender or chamomile essential oils";
    }
    else if (lowercaseInput.includes("cold") || lowercaseInput.includes("flu") || lowercaseInput.includes("cough")) {
      return "For cold and flu symptoms:\n• Drink ginger tea with honey and lemon\n• Stay hydrated and rest\n• Try elderberry syrup\n• Use a humidifier for congestion";
    }
    else if (lowercaseInput.includes("energy") || lowercaseInput.includes("tired")) {
      return "To boost energy naturally:\n• Try adaptogens like ashwagandha or rhodiola\n• Eat vitamin B-rich foods\n• Take a short 15-minute walk\n• Stay hydrated throughout the day";
    }
    else {
      return "I'm not quite sure how to help with that specific concern. Could you tell me more about what you're experiencing, or try asking about common issues like headaches, sleep, energy levels, stress, or cold symptoms?";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    // Add user message
    const userMessage: Message = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = getResponse(userMessage.content);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsProcessing(false);
    }, 1000);
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.role === "user"
                  ? "bg-indigo/15 text-charcoal"
                  : "bg-white text-charcoal border border-sandstone-dark/20"
              }`}
            >
              <div className="flex items-start">
                {message.role === "assistant" && (
                  <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-ayurveda" />
                )}
                {message.role === "user" && (
                  <User className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-indigo" />
                )}
                <div className="whitespace-pre-line text-sm">{message.content}</div>
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] rounded-2xl p-3 bg-white text-charcoal border border-sandstone-dark/20">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2 text-ayurveda" />
                <Loader2 className="h-4 w-4 animate-spin text-ayurveda" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-sandstone-dark/20 bg-white mt-auto">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about natural remedies..."
            className="flex-1 p-2 rounded-l-lg border border-sandstone-dark/20 focus:outline-none focus:ring-1 focus:ring-ayurveda"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className={`bg-ayurveda text-white p-2 rounded-r-lg ${
              !inputValue.trim() || isProcessing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-ayurveda/90"
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-charcoal-light italic mt-2">
          Disclaimer: This is not a substitute for professional medical advice.
        </p>
      </form>
    </div>
  );
};

export default ChatBot;
