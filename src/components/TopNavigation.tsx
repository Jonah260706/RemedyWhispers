import { NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, Stethoscope, User, Microscope, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Define Suggestion interface
interface Suggestion {
  label: string;
  path: string; // The URL to navigate to
}

// Sample suggestions data with paths (replace with actual data source/API call)
const allSuggestions: Suggestion[] = [
  // Symptoms (linking to remedies filtered by symptom)
  { label: "Headache", path: "/remedies?symptom=Headache" },
  { label: "Fever", path: "/remedies?symptom=Fever" },
  { label: "Cough", path: "/remedies?symptom=Cough" },
  { label: "Sore Throat", path: "/remedies?symptom=Sore+Throat" },
  { label: "Fatigue", path: "/remedies?symptom=Fatigue" },

  // Remedies (linking to specific remedy pages - assuming slugified names)
  { label: "Turmeric Paste", path: "/remedies/turmeric-paste" },
  { label: "Ginger Tea", path: "/remedies/ginger-tea" },
  { label: "Honey Lemon Water", path: "/remedies/honey-lemon-water" },
  { label: "Steam Inhalation", path: "/remedies/steam-inhalation" },

  // Educational Topics (linking to education pages - assuming slugified names)
  { label: "Ayurvedic Diet Tips", path: "/education/ayurvedic-diet-tips" },
  { label: "Common Cold Remedies", path: "/education/common-cold-remedies" },
  { label: "Digestive Health", path: "/education/digestive-health" },
];

// Helper function to create search paths (customize as needed)
const createSearchPath = (query: string): string => {
  // Example: navigate to a general remedies page with a search query
  return `/remedies?search=${encodeURIComponent(query)}`;
}

const TopNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Update suggestions state type
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  // Initialize useNavigate
  const navigate = useNavigate();

  // Debounced effect to update suggestions (update filtering logic)
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchQuery.trim() !== "") {
      debounceTimeout.current = setTimeout(() => {
        const filtered = allSuggestions.filter(s =>
          s.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // Limit suggestions
        setShowSuggestions(true);
      }, 300); // 300ms debounce
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  // Effect to handle clicks outside (no change needed here)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to handle scroll behavior (no change needed here)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/remedies", icon: BookOpen, label: "Remedies" },
    { to: "/symptom-checker", icon: Stethoscope, label: "Symptoms" },
    { to: "/education", icon: Microscope, label: "Learn" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  // Updated handler to navigate using suggestion's path
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.label); // Keep label in search bar for feedback
    setShowSuggestions(false);
    setIsSearchFocused(false);
    navigate(suggestion.path);
  };

  // Handler for Enter key press in search input
  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      setShowSuggestions(false);
      setIsSearchFocused(false);
      // Option 1: Navigate to the path of the first suggestion if available
      // if (suggestions.length > 0) {
      //   navigate(suggestions[0].path);
      // }
      // Option 2: Navigate to a general search results page/view
      const searchPath = createSearchPath(searchQuery);
      navigate(searchPath);
      // Optionally clear the search query after submission
      // setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-background shadow-md hidden md:block p-2">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-left justify-between text-2xl font-semibold">
        <div className="flex items-left">
          <NavLink to="/" className="flex items-center">
            <span className="font-serif font-bold text-3xl text-secondary">RemedyWhisper</span>
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive
                    ? 'text-secondary*5 font-xl font-semibold bg-secondary/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`
                }
                end={item.to === "/"}
              >
                <item.icon size={18} className="mr-1.5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div ref={searchContainerRef} className="relative flex items-center group">
            <Search
              size={18}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 pointer-events-none ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'
                }`}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchQuery.trim() !== "") {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={handleSearchSubmit}
              className={`pl-9 pr-3 py-1.5 border rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary bg-background ${isSearchFocused
                ? 'w-48 border-primary/50 shadow-sm'
                : 'w-32 border-border hover:border-foreground/30 focus:w-48'
                }`}
              style={{ caretColor: 'hsl(var(--primary))' }}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50 animate-fade-in duration-150">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.path}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer transition-colors duration-100"
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
