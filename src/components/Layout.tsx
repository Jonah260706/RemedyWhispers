
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import TopNavigation from "./TopNavigation";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  // Scroll to top on page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-sandstone flex flex-col">
      {/* Top navigation only shows on desktop */}
      <TopNavigation />
      
      {/* Mobile logo/title in top left */}
      <div className="md:hidden fixed top-0 left-0 z-40 px-4 py-3 bg-white w-full shadow-sm">
        <span className="font-serif font-semibold text-xl text-ayurveda">RemedyWhisper</span>
      </div>
      
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="bg-white p-2 rounded-full shadow-md border border-sandstone-dark/10">
              <Menu className="h-6 w-6 text-charcoal" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white/95 backdrop-blur-md p-0">
            <div className="pt-12 px-4">
              <Navigation orientation="vertical" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <main className="flex-1 md:pt-16 pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
