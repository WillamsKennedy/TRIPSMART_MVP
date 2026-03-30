import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Planner from "./pages/Planner";
import TravelHistory from "./pages/TravelHistory";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ActivityDetail from "./pages/ActivityDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/planejar" element={<Planner />} />
            <Route path="/historico" element={<TravelHistory />} />
            <Route path="/comunidade" element={<Community />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/atividade/:cityId/:spotId" element={<ActivityDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
