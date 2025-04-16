import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getAIResponse } from "@/services/ai";

interface Message {
  role: "assistant" | "user";
  content: string;
  isEmergency?: boolean;
}

const EMERGENCY_KEYWORDS = [
  "chest pain", "difficulty breathing", "shortness of breath",
  "stroke", "heart attack", "unconscious", "not breathing",
  "severe bleeding", "head injury", "seizure", "suicide"
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant. How can I help you today? You can describe your symptoms or ask about natural remedies."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Emergency detection function
  const checkForEmergency = (text: string): boolean => {
    const lowercaseText = text.toLowerCase();
    return EMERGENCY_KEYWORDS.some(keyword => lowercaseText.includes(keyword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    // Check for emergency conditions first
    if (checkForEmergency(inputValue)) {
      const emergencyMessage: Message = {
        role: "assistant",
        content: "This sounds like a medical emergency. Please call emergency services (106) immediately or go to the nearest emergency room.",
        isEmergency: true
      };
      setMessages(prev => [...prev, { role: "user", content: inputValue }, emergencyMessage]);
      setInputValue("");
      toast.error("Medical Emergency Detected", {
        description: "Please seek immediate medical attention!",
        duration: 5000,
      });
      return;
    }

    // Add user message
    const userMessage: Message = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    try {
      // Format messages for API - include previous messages AND the new user message
      const apiMessages = [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        // Add the current user message
        { role: "user", content: inputValue }
      ];

      // Get AI response
      const response = await getAIResponse(apiMessages);

      // Add AI response to messages
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error("Failed to get response", {
        description: "Please try again later",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-sandstone-dark/20 flex flex-col">
      <div className="p-6 bg-ayurveda/15 border-b border-sandstone-dark/20">
        <div className="flex items-center">
          <Bot className="h-8 w-8 text-ayurveda mr-4" />
          <h3 className="font-serif font-medium text-2xl">Health Assistant</h3>
        </div>
        <p className="text-base text-charcoal-light mt-3 ml-12">
          Describe your symptoms for personalized remedy suggestions
        </p>
      </div>

      <div className="p-6 overflow-y-auto bg-sandstone/10 flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-8 flex ${message.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-6 ${message.role === "user"
                ? "bg-indigo/15 text-charcoal"
                : message.isEmergency
                  ? "bg-pomegranate/15 text-charcoal border border-pomegranate/30"
                  : "bg-white text-charcoal border border-sandstone-dark/20"
                }`}
            >
              <div className="flex items-start">
                {message.role === "assistant" && (
                  <Bot className="h-7 w-7 mr-4 mt-1 flex-shrink-0 text-ayurveda" />
                )}
                {message.role === "user" && (
                  <User className="h-7 w-7 mr-4 mt-1 flex-shrink-0 text-indigo" />
                )}
                <div>
                  {message.isEmergency && (
                    <div className="flex items-center mb-3 text-pomegranate">
                      <AlertTriangle className="h-6 w-6 mr-2" />
                      <span className="font-medium text-lg">Emergency</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-xl leading-relaxed">{message.content}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="mb-8 flex justify-start">
            <div className="max-w-[85%] rounded-2xl p-6 bg-white text-charcoal border border-sandstone-dark/20">
              <div className="flex items-center">
                <Bot className="h-7 w-7 mr-4 text-ayurveda" />
                <Loader2 className="h-7 w-7 animate-spin text-ayurveda" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-sandstone-dark/20 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms or ask health questions..."
            className="flex-1 p-5 rounded-l-lg border border-sandstone-dark/20 focus:outline-none focus:ring-2 focus:ring-ayurveda text-xl"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className={`bg-ayurveda text-white p-5 rounded-r-lg ${!inputValue.trim() || isProcessing
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-ayurveda/90"
              }`}
          >
            <Send className="h-7 w-7" />
          </button>
        </div>
        <p className="text-sm text-charcoal-light italic mt-4 ml-2">
          Disclaimer: This is not a substitute for professional medical advice.
        </p>
      </form>
    </div>
  );
};

export default AIAssistant;
