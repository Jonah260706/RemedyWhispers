import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import RemedyCard from "../components/RemedyCard";
import ChatBot from "@/components/AIAssistant";
import { remedies, getAllCategories } from "../data/remedies";
import { Filter, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const Remedies = () => {
  const [filteredRemedies, setFilteredRemedies] = useState(remedies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();
  const categories = getAllCategories();

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterRemedies(query, selectedCategory);
  };

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    filterRemedies(searchQuery, category);
  };

  // Filter remedies based on search query and category
  const filterRemedies = (query: string, category: string | null) => {
    let results = remedies;

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        remedy =>
          remedy.title.toLowerCase().includes(lowerQuery) ||
          remedy.category.toLowerCase().includes(lowerQuery) ||
          remedy.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(lowerQuery)
          )
      );
    }

    // Filter by category
    if (category) {
      results = results.filter(
        remedy => remedy.category === category
      );
    }

    setFilteredRemedies(results);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container relative pb-20">
      <header className="text-center mb-8 animate-fade-in">
        <span className="heading-badge mb-3">Library</span>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-charcoal">
          Home Remedies
        </h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          Browse our collection of natural remedies for common ailments, sourced from traditional medicine and backed by science.
        </p>
      </header>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} placeholder="Search by remedy, ingredient, or ailment..." />
      </div>

      <div className="mb-8 animate-fade-in animate-delay-100">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-charcoal-light mr-2" />
          <h2 className="text-lg font-medium">Filter by Category</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedCategory === null
              ? "bg-ayurveda text-white"
              : "bg-sandstone-dark hover:bg-sandstone-dark/80 text-charcoal"
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedCategory === category
                ? "bg-ayurveda text-white"
                : "bg-sandstone-dark hover:bg-sandstone-dark/80 text-charcoal"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredRemedies.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <p className="text-charcoal-light mb-2">No remedies found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
              setFilteredRemedies(remedies);
            }}
            className="btn-outline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up animate-delay-200">
          {filteredRemedies.map((remedy) => (
            <RemedyCard key={remedy.id} {...remedy} />
          ))}
        </div>
      )}

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

export default Remedies;
