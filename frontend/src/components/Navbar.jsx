import { Sparkles, Menu, X, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { authAPI } from "../utils/api";

export default function Navbar({ onNavigate, user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      onNavigate('landing');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-on-surface-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold tracking-tight text-primary">ResumeFlow</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate(user ? 'dashboard' : 'landing')} className="text-on-background font-medium hover:text-primary transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('upload')} className="text-on-surface-variant hover:text-primary transition-colors">Upload</button>
            <button onClick={() => onNavigate('analysis')} className="text-on-surface-variant hover:text-primary transition-colors">Reports</button>
            <button onClick={() => onNavigate('landing')} className="text-on-surface-variant hover:text-primary transition-colors">Features</button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-4 rounded-full border border-on-surface-variant/10 hover:bg-on-surface-variant/5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user.userName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block font-bold text-on-background">{user.userName}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-on-surface-variant/10 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <button 
                      onClick={() => { onNavigate('dashboard'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-on-surface-variant/5 rounded-2xl transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </button>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-on-surface-variant/5 rounded-2xl transition-colors font-medium"
                    >
                      <UserIcon className="w-5 h-5" />
                      Profile
                    </button>
                    <div className="h-px bg-on-surface-variant/10 my-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/5 rounded-2xl transition-colors font-bold"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
            <button 
                onClick={() => onNavigate('upload')}
                className="hidden sm:block bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </button>
            )}

            <button
              className="md:hidden p-2 text-on-surface-variant"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-on-surface-variant/10 p-4 space-y-4 shadow-xl">
          <button onClick={() => { onNavigate(user ? 'dashboard' : 'landing'); setIsMenuOpen(false); }} className="block w-full text-left text-on-background font-medium py-2">Dashboard</button>
          <button onClick={() => { onNavigate('upload'); setIsMenuOpen(false); }} className="block w-full text-left text-on-surface-variant py-2">My Resumes</button>
          <button onClick={() => { onNavigate('analysis'); setIsMenuOpen(false); }} className="block w-full text-left text-on-surface-variant py-2">Analysis</button>
          <button onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }} className="block w-full text-left text-on-surface-variant py-2">Settings</button>
          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-error/10 text-error px-6 py-3 rounded-full font-bold"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('auth')}
              className="w-full bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
