import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, FileText,
  Video, Microscope, ExternalLink, Award,
  Download, Wifi, WifiOff, MessageCircle
} from "lucide-react";
import ChatBot from "@/components/AIAssistant";
import DownloadableGuide from "../components/DownloadableGuide";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const Education = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  // Sample articles data (in a real app, this would come from a database or API)
  const articles = [
    {
      id: "1",
      title: "When to See a Doctor vs. Using Home Remedies",
      category: "Health Guide",
      excerpt: "Understanding when self-care is appropriate and when professional medical help is necessary.",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "2",
      title: "The Science Behind Traditional Remedies",
      category: "Research",
      excerpt: "How modern science is validating traditional healing practices from around the world.",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "3",
      title: "Common Myths About Cold & Flu Remedies",
      category: "Myth Busting",
      excerpt: "Separating fact from fiction when it comes to treating seasonal illnesses at home.",
      readTime: "6 min read",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.muxpiAMJ60IuLV0m0HjSfwHaD4&pid=Api&P=0&h=180",
    },
    {
      id: "4",
      title: "Building Your Natural Medicine Cabinet",
      category: "Practical Guide",
      excerpt: "Essential ingredients to keep on hand for common ailments and how to store them properly.",
      readTime: "7 min read",
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.2T9nJTiYq0SZHBA2SMpSfAHaHa&pid=Api&P=0&h=180",
    },
    {
      id: "5",
      title: "The Placebo Effect: How Belief Impacts Healing",
      category: "Medical Science",
      excerpt: "Understanding the powerful role of the mind in the effectiveness of remedies and treatments.",
      readTime: "10 min read",
      imageUrl: "https://images.unsplash.com/photo-1543333995-a78aea2eee50?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "6",
      title: "Global Healing Traditions: Ayurveda, TCM, and Beyond",
      category: "Cultural Medicine",
      excerpt: "Exploring healing practices from different cultures and their unique approaches to wellness.",
      readTime: "9 min read",
      imageUrl: "https://images.unsplash.com/photo-1537861836117-2d33e4cad261?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    }
  ];

  // Sample downloadable guides (in a real app, this would come from an API)
  const downloadableGuides = [
    {
      id: "guide-1",
      title: "Complete Cold & Flu Remedy Guide",
      description: "A comprehensive guide to treating cold and flu symptoms with natural remedies, including recipes and instructions.",
      fileSize: "13 6kb",
      imageUrl: "src/downloads/cold&flu.jpg",
      fileUrl: "src/downloads/coldandflu.pdf",
      category: "Seasonal Health"
    },
    {
      id: "guide-2",
      title: "Natural First Aid Kit",
      description: "Learn how to create and use a natural first aid kit with common household ingredients for minor injuries and ailments.",
      fileSize: "764 kb",
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP._IPZvz_VHXC1f5g_61W60wAAAA&pid=Api&P=0&h=180",
      fileUrl: "src/downloads/First-Aid-Kit-Contents-Full-With-COVID.pdf",
      category: "Emergency Preparedness"
    },
    {
      id: "guide-3",
      title: "Herbal Remedies for Sleep & Stress",
      description: "Detailed guide on herbs and natural remedies to improve sleep quality and reduce stress and anxiety.",
      fileSize: "5.1 MB",
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.--SyiKIPVeIMFkLvhuYiEAHaJh&pid=Api&P=0&h=180",
      fileUrl: "src/downloads/EmanPublisher_3_5654ahi-21207811.pdf",
      category: "Mental Wellness"
    }
  ];

  return (
    <div className="page-container">
      <header className="text-center mb-8 animate-fade-in">
        <span className="heading-badge mb-3">Knowledge Center</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-charcoal">
          Educational Resources
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          Learn about natural healing, traditional medicines, and the science behind home remedies.
        </p>
      </header>

      <section className="mb-12 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="premium-card text-center group card-transition">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-saffron/20 text-saffron mb-4 mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2">Educational Articles</h2>
            <p className="text-charcoal-light mb-4">
              In-depth articles on home remedies, natural ingredients, and traditional healing practices.
            </p>
            <span className="inline-flex items-center text-ayurveda font-medium group-hover:underline">
              Browse Articles <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>

          <div className="premium-card text-center group card-transition">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-ayurveda/20 text-ayurveda mb-4 mx-auto">
              <Video className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2">Video Tutorials</h2>
            <p className="text-charcoal-light mb-4">
              Step-by-step video guides on preparing and applying various home remedies safely.
            </p>
            <span className="inline-flex items-center text-ayurveda font-medium group-hover:underline">
              Watch Videos <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>

          <div className="premium-card text-center group card-transition">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-terracotta/20 text-terracotta mb-4 mx-auto">
              <Microscope className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2">Scientific Research</h2>
            <p className="text-charcoal-light mb-4">
              Summaries of clinical studies and scientific evidence supporting traditional remedies.
            </p>
            <span className="inline-flex items-center text-ayurveda font-medium group-hover:underline">
              Explore Studies <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Downloadable Guides */}
      <section className="mb-12 animate-slide-up animate-delay-100">
        <div className="bg-ayurveda/5 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="flex items-center mb-2">
                <Download className="h-5 w-5 text-ayurveda mr-2" />
                <h2 className="text-xl font-serif font-medium">Offline Guides</h2>
              </div>
              <p className="text-charcoal-light md:max-w-xl">
                Download these comprehensive guides for reference even without internet access. Perfect for travel, emergencies, or areas with limited connectivity.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-ayurveda mb-1">
                  <WifiOff className="h-5 w-5" />
                </div>
                <p className="text-xs text-charcoal-light">Available Offline</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-saffron mb-1">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-xs text-charcoal-light">Expert Verified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloadableGuides.map(guide => (
            <DownloadableGuide
              key={guide.id}
              title={guide.title}
              description={guide.description}
              fileSize={guide.fileSize}
              imageUrl={guide.imageUrl}
              fileUrl={guide.fileUrl}
              category={guide.category}
            />
          ))}
        </div>
      </section>

      <section className="mb-12 animate-slide-up animate-delay-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Featured Articles</h2>
          <button className="text-ayurveda hover:text-ayurveda-dark font-medium text-sm inline-flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 4).map((article) => (
            <div key={article.id} className="premium-card group card-transition">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 heading-badge">
                  {article.category}
                </span>
              </div>
              <h3 className="text-lg font-serif font-medium mb-2 transition-colors duration-200 group-hover:text-ayurveda-dark">
                {article.title}
              </h3>
              <p className="text-charcoal-light text-sm mb-4">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-charcoal-light flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  {article.readTime}
                </span>
                <button className="text-sm font-medium text-ayurveda group-hover:underline flex items-center">
                  Read article <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 animate-slide-up animate-delay-200">
        <h2 className="section-title">Myths vs. Facts</h2>
        <div className="premium-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-indigo/10 relative">
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-indigo">
                Myth
              </div>
              <h3 className="text-lg font-serif font-semibold mb-4 text-indigo">
                "Feed a cold, starve a fever"
              </h3>
              <p className="text-charcoal mb-4">
                This old adage suggests you should eat more when you have a cold and eat less when you have a fever.
              </p>
            </div>
            <div className="p-6 bg-ayurveda/10 relative">
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-ayurveda">
                Fact
              </div>
              <h3 className="text-lg font-serif font-semibold mb-4 text-ayurveda">
                Good nutrition helps all illnesses
              </h3>
              <p className="text-charcoal mb-4">
                Proper nutrition is important whether you have a cold or a fever. Your body needs energy and fluids to fight infection.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="animate-slide-up animate-delay-300">
        <div className="premium-card text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Join Our Community
          </h2>
          <p className="text-charcoal-light mb-6 max-w-2xl mx-auto">
            Connect with others interested in natural healing, share your experiences with remedies, and learn from our community of experts and enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/profile" className="btn-primary">
              Create Your Profile
            </Link>
            <a href="#" className="btn-outline">
              Subscribe to Newsletter
            </a>
          </div>
        </div>
      </section>

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

export default Education;
