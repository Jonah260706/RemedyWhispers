import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Search, MessageCircle } from "lucide-react";
import ChatBot from "@/components/AIAssistant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sandstone p-4 relative">
      <div className="premium-card text-center max-w-md w-full animate-fade-in">
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 flex items-center justify-center mx-auto rounded-full bg-ayurveda/10 text-ayurveda">
              <span className="text-4xl font-serif font-bold">404</span>
            </div>
            <div className="absolute -right-2 -bottom-2 transform rotate-12">
              <Search className="h-10 w-10 text-charcoal-light" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-serif font-semibold mb-3">
          Page Not Found
        </h1>
        <p className="text-charcoal-light mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
          <Link to="/remedies" className="btn-outline">
            Browse Remedies
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
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle className="text-xl">Chat with our Health Assistant</DrawerTitle>
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
          <DialogContent className="max-w-5xl max-h-[90vh] w-[90vw] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl">Chat with our Health Assistant</DialogTitle>
            </DialogHeader>
            <div className="overflow-hidden h-full max-h-[calc(90vh-80px)]">
              <ChatBot />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NotFound;
