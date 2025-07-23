import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileNavigation, DesktopNavigation } from "@/components/ui/navigation";
import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis";
import Voice from "./pages/Voice";
import Patients from "./pages/Patients";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen w-full">
          <DesktopNavigation />
          <main className="flex-1 overflow-auto pb-16 lg:pb-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <MobileNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
