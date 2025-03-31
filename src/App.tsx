import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// Keep other page imports for now, even if routes are commented
import Remedies from "./pages/Remedies";
import SymptomChecker from "./pages/SymptomChecker";
import RemedyDetail from "./pages/RemedyDetail";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Keep only the index route initially */}
            {<Route path="remedies" element={<Remedies />} />}
            {<Route path="remedies/:id" element={<RemedyDetail />} />}
            {<Route path="symptom-checker" element={<SymptomChecker />} /> }
            { <Route path="profile" element={<Profile />} /> }
            { <Route path="education" element={<Education />} /> }
            { <Route path="*" element={<NotFound />} /> }
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;