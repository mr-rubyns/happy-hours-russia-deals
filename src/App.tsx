
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import DealDetails from "@/pages/DealDetails";
import UserDashboard from "@/pages/UserDashboard";
import SellerDashboard from "@/pages/SellerDashboard";
import MapSearch from "@/pages/MapSearch";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Navbar />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/map" element={<MapSearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
