import { Link } from "react-router-dom";
import {
  BookOpen,
  Stethoscope,
  User,
  ArrowRight,
  Leaf,
  Milestone,
  Award,
  Droplet,
  Microscope,
  Heart,
  Sun,
  Shield,
  Coffee,
  Clock,
  Zap,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatBot from "@/components/AIAssistant";
import DidYouKnow from "@/components/DidYouKnow";
import SeasonalTips from "@/components/SeasonalTips";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="page-container relative pb-20">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-charcoal">
          Natural Remedies At Your Fingertips
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto mb-8">
          Discover traditional remedies, check your symptoms, and take charge of your wellbeing
          with our comprehensive natural health companion.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/remedies" className="btn-primary">
            Explore Remedies <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link to="/symptom-checker" className="btn-outline">
            Check Symptoms <Stethoscope className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Tip Sections - Grouped together */}
      <SeasonalTips />
      <DidYouKnow />

      {/* Popular Categories */}
      <section className="py-8 animate-fade-in animate-delay-200">
        <div className="section-header text-center mb-8">
          <span className="heading-badge">Browse</span>
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">
            Explore our most popular remedy collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/remedies?category=respiratory" className="premium-card text-center hover:bg-sandstone/20 transition-colors">
            <Droplet className="h-8 w-8 text-ayurveda mx-auto mb-3" />
            <h3 className="font-medium">Respiratory</h3>
            <p className="text-sm text-charcoal-light">Cough, Cold & Flu</p>
          </Link>

          <Link to="/remedies?category=digestive" className="premium-card text-center hover:bg-sandstone/20 transition-colors">
            <Leaf className="h-8 w-8 text-ayurveda mx-auto mb-3" />
            <h3 className="font-medium">Digestive</h3>
            <p className="text-sm text-charcoal-light">Stomach & Gut Health</p>
          </Link>

          <Link to="/remedies?category=immunity" className="premium-card text-center hover:bg-sandstone/20 transition-colors">
            <Shield className="h-8 w-8 text-ayurveda mx-auto mb-3" />
            <h3 className="font-medium">Immunity</h3>
            <p className="text-sm text-charcoal-light">Boost Your Defenses</p>
          </Link>

          <Link to="/remedies?category=skin" className="premium-card text-center hover:bg-sandstone/20 transition-colors">
            <Sun className="h-8 w-8 text-ayurveda mx-auto mb-3" />
            <h3 className="font-medium">Skin Care</h3>
            <p className="text-sm text-charcoal-light">Natural Remedies</p>
          </Link>
        </div>
      </section>

      {/* NEW SECTION: Health Tips */}
      <section className="py-8 animate-fade-in animate-delay-300">
        <div className="section-header text-center mb-8">
          <span className="heading-badge">Daily Habits</span>
          <h2 className="section-title">Wellness Habits</h2>
          <p className="section-subtitle">
            Simple practices for everyday health and wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="premium-card">
            <div className="flex items-start">
              <Coffee className="h-6 w-6 text-saffron mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Morning Ritual</h3>
                <p className="text-sm text-charcoal-light">
                  Start your day with warm lemon water to boost digestion, hydrate your body, and provide
                  a natural source of vitamin C to strengthen immunity.
                </p>
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-saffron mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Mindful Breathing</h3>
                <p className="text-sm text-charcoal-light">
                  Take three minutes daily for deep breathing exercises. Inhale for 4 counts, hold for 7,
                  and exhale for 8 to reduce stress and increase mental clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-start">
              <Zap className="h-6 w-6 text-saffron mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Natural Energy</h3>
                <p className="text-sm text-charcoal-light">
                  Boost afternoon energy naturally with a small handful of nuts and seeds instead of caffeine,
                  providing sustainable energy without the crash.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Remedies */}
      <section className="py-8 animate-fade-in animate-delay-300">
        <div className="section-header text-center mb-8">
          <span className="heading-badge">Quick Relief</span>
          <h2 className="section-title">Common Ailments</h2>
          <p className="section-subtitle">
            Fast natural solutions for everyday health issues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="premium-card">
            <div className="flex items-start">
              <Milestone className="h-6 w-6 text-saffron mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Headache Relief</h3>
                <p className="text-sm text-charcoal-light mb-3">
                  Peppermint oil applied to temples can help relieve tension headaches.
                  Also try staying hydrated and a cold compress.
                </p>
                <Link to="/remedies/peppermint-tea" className="text-ayurveda font-medium text-sm inline-flex items-center">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-saffron mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Sore Throat Soother</h3>
                <p className="text-sm text-charcoal-light mb-3">
                  Mix honey with warm water or tea, and add a squeeze of lemon for
                  quick sore throat relief and antibacterial benefits.
                </p>
                <Link to="/remedies/honey-lemon-tea" className="text-ayurveda font-medium text-sm inline-flex items-center">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Tip */}
      <section className="py-8 mb-12 animate-fade-in animate-delay-400">
        <div className="premium-card bg-ayurveda/10">
          <div className="flex items-start">
            <Award className="h-8 w-8 text-ayurveda mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">Daily Wellness Tip</h3>
              <p className="mb-4">
                Start your day with a glass of warm water and lemon. This simple habit
                helps stimulate digestion, supports liver function, and provides a boost
                of vitamin C to strengthen your immune system.
              </p>
              <Link to="/education" className="btn-outline-sm">
                More Wellness Tips <Microscope className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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

export default Home;
