import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock, Star, Check, AlertCircle,
  ArrowLeft, Bookmark, BookmarkCheck,
  Share2, FileText, MessageCircle
} from "lucide-react";
import { getRemedyById } from "../data/remedies";
import ChatBot from "@/components/AIAssistant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const RemedyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [remedy, setRemedy] = useState(id ? getRemedyById(id) : undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!remedy) {
      // Remedy not found, could redirect to 404 or remedies page
      console.error(`Remedy with ID ${id} not found`);
    }
  }, [id, remedy]);

  const handleSaveRemedy = () => {
    setIsSaved(!isSaved);
    // In a real app, we would save to user's profile
  };

  const handleShare = () => {
    // In a real app, this would trigger sharing functionality
    alert("Sharing functionality would be implemented here");
  };

  if (!remedy) {
    return (
      <div className="page-container text-center">
        <p className="text-charcoal-light mb-6">Remedy not found.</p>
        <button onClick={() => navigate("/remedies")} className="btn-primary">
          Back to Remedies
        </button>
      </div>
    );
  }

  return (
    <div className="page-container relative pb-20">
      <div className="mb-4 animate-fade-in">
        <Link to="/remedies" className="inline-flex items-center text-charcoal-light hover:text-charcoal transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Remedies
        </Link>
      </div>

      <div className="premium-card mb-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-xl order-2 md:order-1">
            <img
              src={remedy.imageUrl || "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
              alt={remedy.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <div className="flex justify-between items-start mb-4">
              <span className="heading-badge">{remedy.category}</span>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveRemedy}
                  className="p-2 rounded-full bg-sandstone hover:bg-sandstone-dark/30 transition-colors"
                  aria-label={isSaved ? "Unsave remedy" : "Save remedy"}
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-5 w-5 text-ayurveda" />
                  ) : (
                    <Bookmark className="h-5 w-5 text-charcoal-light" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-sandstone hover:bg-sandstone-dark/30 transition-colors"
                  aria-label="Share remedy"
                >
                  <Share2 className="h-5 w-5 text-charcoal-light" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-serif font-semibold mb-3">{remedy.title}</h1>

            <div className="flex items-center mb-4">
              <Clock className="h-4 w-4 text-charcoal-light mr-1" />
              <span className="text-sm text-charcoal-light mr-4">{remedy.prepTime}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < remedy.effectiveness
                        ? "text-saffron fill-saffron"
                        : "text-charcoal-light"
                      }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-charcoal mb-6">{remedy.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {remedy.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm bg-saffron/15 text-saffron-dark"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="premium-card animate-slide-up animate-delay-100">
          <h2 className="text-xl font-serif font-medium mb-4">Instructions</h2>
          <ol className="space-y-3">
            {remedy.instructions.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-ayurveda/15 text-ayurveda font-medium text-sm flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <span className="text-charcoal mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="premium-card animate-slide-up animate-delay-200">
          <h2 className="text-xl font-serif font-medium mb-4">Benefits</h2>
          <ul className="space-y-2 mb-6">
            {remedy.benefits.map((benefit, index) => (
              <li key={index} className="flex">
                <Check className="h-5 w-5 text-ayurveda mr-2 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-serif font-medium mb-4">Precautions</h2>
          <ul className="space-y-2">
            {remedy.precautions.map((precaution, index) => (
              <li key={index} className="flex">
                <AlertCircle className="h-5 w-5 text-terracotta mr-2 flex-shrink-0 mt-0.5" />
                <span>{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="premium-card mb-8 animate-slide-up animate-delay-300">
        <div className="flex items-start">
          <FileText className="h-6 w-6 text-indigo mr-3 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-serif font-medium mb-2">Scientific Evidence</h2>
            <p className="text-charcoal mb-4">{remedy.scientificEvidence}</p>

            <h3 className="text-lg font-medium mb-2">Sources</h3>
            <ul className="space-y-1 text-sm text-charcoal-light">
              {remedy.sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-12 animate-fade-in animate-delay-300">
        <p className="text-sm text-charcoal-light italic mb-6 max-w-xl mx-auto">
          <strong>Disclaimer:</strong> This information is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/remedies" className="btn-outline">
            Browse More Remedies
          </Link>
          <Link to="/symptom-checker" className="btn-primary">
            Check Your Symptoms
          </Link>
        </div>
      </div>

      {/* Floating chat button (visible only on desktop) */}
      {isMobile ? (
        <Drawer open={chatOpen} onOpenChange={setChatOpen}>
          <DrawerTrigger asChild>
            <button
              className="fixed bottom-6 right-6 z-50 bg-ayurveda text-white p-3 rounded-full shadow-elevation hover:bg-ayurveda-dark transition-colors"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Chat with our Health Assistant</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 h-full overflow-hidden">
              <ChatBot />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-ayurveda text-white p-3 rounded-full shadow-elevation hover:bg-ayurveda-dark transition-colors"
            aria-label="Open chat assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
          <DialogContent className="max-w-md max-h-[70vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Chat with our Health Assistant</DialogTitle>
            </DialogHeader>
            <div className="overflow-hidden h-full max-h-[calc(70vh-80px)]">
              <ChatBot />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RemedyDetail;
