import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ChatBot from "@/components/AIAssistant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

// Placeholder Icons (replace with actual icons later)
const IconSymptom = () => <span className="text-2xl">🩺</span>; // Example emoji
const IconRemedy = () => <span className="text-2xl">🌿</span>; // Example emoji
const IconPersonalized = () => <span className="text-2xl">👤</span>; // Example emoji

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-8 relative pb-20">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 via-white to-blue-50 rounded-lg shadow-md mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to Remedy Whisper
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your intelligent guide to understanding symptoms and discovering natural remedies. Find personalized insights and holistic solutions for your well-being.
        </p>
        <Link to="/remedies"> {/* Add Link wrapper */}
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore Remedies
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconSymptom />
              <div>
                <CardTitle>Symptom Checker</CardTitle>
                <CardDescription>Enter your symptoms to get potential insights.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Our AI-powered checker helps you understand possible causes.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconRemedy />
              <div>
                <CardTitle>Natural Remedies</CardTitle>
                <CardDescription>Explore a vast library of natural solutions.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Discover traditional and evidence-based remedies.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <IconPersonalized />
              <div>
                <CardTitle>Personalized Insights</CardTitle>
                <CardDescription>Get recommendations tailored to you.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Receive guidance based on your unique profile and needs.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl mb-3">1</div>
            <h3 className="font-semibold mb-2">Describe Symptoms</h3>
            <p className="text-sm text-gray-600">Use our intuitive interface to detail how you're feeling.</p>
          </Card>
          <Card className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl mb-3">2</div>
            <h3 className="font-semibold mb-2">Get Insights</h3>
            <p className="text-sm text-gray-600">Our AI analyzes your input and suggests potential remedies.</p>
          </Card>
          <Card className="text-center p-6 bg-white rounded-lg shadow">
            <div className="text-3xl mb-3">3</div>
            <h3 className="font-semibold mb-2">Explore Solutions</h3>
            <p className="text-sm text-gray-600">Browse detailed information on recommended natural remedies.</p>
          </Card>
        </div>
      </section>

      {/* Placeholder for more content */}
      <div className="text-center py-10 border-t border-gray-200">
        <p className="text-gray-500">More content coming soon...</p>
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

export default Index;
