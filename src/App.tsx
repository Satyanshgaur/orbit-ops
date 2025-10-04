import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrbitAirLanding from "./pages/OrbitAirLanding";
import NotFound from "./pages/NotFound";
import NYCMap from "./components/NYCMap";  // ✅ Import your map component
import Index from "./pages/Index"; // Import your main page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrbitAirLanding />} /> {/* Landing page */}
          <Route path="/home" element={<Index />} />       {/* Main website page */}
          <Route path="/map" element={<NYCMap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
