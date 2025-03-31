
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search remedies or symptoms..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-charcoal-light" />
        </div>
        <input
          type="search"
          className="w-full p-4 pl-12 pr-4 text-sm text-charcoal bg-white border border-sandstone-dark/10 rounded-xl shadow-inner-subtle focus:ring-2 focus:ring-ayurveda/30 focus:border-ayurveda/30 focus:outline-none transition-all duration-200"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 bg-ayurveda hover:bg-ayurveda-dark text-white rounded-lg text-sm px-4 py-2 transition-all duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
