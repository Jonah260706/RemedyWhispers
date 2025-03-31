
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sandstone p-4">
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
    </div>
  );
};

export default NotFound;
