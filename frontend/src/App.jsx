import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";
import AnalysisDetail from "./pages/AnalysisDetail";
import Dashboard from "./pages/Dashboard";
import { authAPI } from "./utils/api";

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authAPI.me();
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleNavigate = (page) => {
    // If navigating to a protected page and not logged in, redirect to auth
    if (['upload', 'analysis', 'dashboard'].includes(page) && !user) {
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <Auth onNavigate={handleNavigate} setUser={setUser} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} user={user} setUser={setUser} />;
      case 'upload':
        return <Upload onNavigate={handleNavigate} user={user} setUser={setUser} />;
      case 'analysis':
        return <AnalysisDetail onNavigate={handleNavigate} user={user} setUser={setUser} />;
      case 'landing':
      default:
        return <Landing onNavigate={handleNavigate} user={user} setUser={setUser} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}