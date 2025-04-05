
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

  // Sample responses based on symptoms (in a real app, this would be more sophisticated)
  const getResponse = (input: string): Message => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for emergency conditions first
    if (checkForEmergency(input)) {
      return {
        role: "assistant",
        content: "This sounds like a medical emergency. Please call emergency services (911) immediately or go to the nearest emergency room.",
        isEmergency: true
      };
    }
    
    // Check for common symptoms and provide relevant responses
    if (lowercaseInput.includes("headache") || lowercaseInput.includes("migraine") || lowercaseInput.includes("fever")) {
      return {
        role: "assistant",
        content: "For headaches, migraines or fever, you could try:\n\n• Drinking plenty of water to stay hydrated\n• Applying a cold compress to your forehead\n• Resting in a dark, quiet room\n• Taking ginger tea to reduce inflammation\n\nHow long have you been experiencing the headache?"
      };
    } else if (lowercaseInput.includes("sore throat") || lowercaseInput.includes("throat pain")) {
      return {
        role: "assistant",
        content: "For a sore throat, these remedies may help:\n\n• Honey and warm water or tea\n• Gargling with salt water\n• Staying hydrated\n• Throat lozenges with honey or herbs\n\nDo you have any other symptoms like fever or cough?"
      };
    } else if (lowercaseInput.includes("cold") || lowercaseInput.includes("flu") || lowercaseInput.includes("cough")) {
      return {
        role: "assistant",
        content: "For cold and flu symptoms:\n\n• Rest and stay hydrated\n• Try honey-lemon tea with ginger\n• Use a humidifier\n• Gargle with salt water for sore throat\n\nHow long have you been feeling unwell?"
      };
    } else if (lowercaseInput.includes("stomach") || lowercaseInput.includes("nausea") || lowercaseInput.includes("indigestion")) {
      return {
        role: "assistant",
        content: "For stomach issues and nausea:\n\n• Ginger tea can help reduce nausea\n• Peppermint tea may ease indigestion\n• Try the BRAT diet (bananas, rice, applesauce, toast)\n• Stay hydrated but take small sips\n\nIs the discomfort constant or does it come and go?"
      };
    } else if (lowercaseInput.includes("fever")) {
      return {
        role: "assistant",
        content: "For fever management:\n\n• Stay hydrated with water and clear liquids\n• Rest and avoid exertion\n• Use a cool compress on your forehead\n• Dress in light clothing\n\nWhat's your current temperature? If it's above 103°F (39.4°C), please consult a doctor."
      };
    } else if (lowercaseInput.includes("allergies") || lowercaseInput.includes("allergy")) {
      return {
        role: "assistant",
        content: "For allergy symptoms:\n\n• Local honey may help with seasonal allergies\n• Steam inhalation with eucalyptus oil\n• Saline nasal rinses\n• Keep windows closed during high pollen days\n\nDo you know what triggers your allergies?"
      };
    } else {
      return {
        role: "assistant",
        content: "I'm not sure I understand your symptoms completely. Could you provide more details about what you're experiencing? For example, when did it start and are you having any other symptoms?"
      };
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
      setMessages(prev => [...prev, response]);
      setIsProcessing(false);
      
      // Show emergency toast if needed
      if (response.isEmergency) {
        toast.error("Medical Emergency Detected", {
          description: "Please seek immediate medical attention!",
          duration: 5000,
        });
      }
    }, 1000);
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-sandstone-dark/20">
      <div className="p-4 bg-ayurveda/10 border-b border-sandstone-dark/20">
        <div className="flex items-center">
          <Bot className="h-5 w-5 text-ayurveda mr-2" />
          <h3 className="font-serif font-medium text-lg">Health Assistant</h3>
        </div>
        <p className="text-xs text-charcoal-light mt-1">
          Describe your symptoms for personalized remedy suggestions
        </p>
      </div>

      <div className="p-4 h-72 overflow-y-auto bg-sandstone/30">
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
                  : message.isEmergency
                  ? "bg-pomegranate/15 text-charcoal border border-pomegranate/30"
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
                <div>
                  {message.isEmergency && (
                    <div className="flex items-center mb-1 text-pomegranate">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="font-medium text-sm">Emergency</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                </div>
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

      <form onSubmit={handleSubmit} className="p-3 border-t border-sandstone-dark/20 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms..."
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

export default AIAssistant;
