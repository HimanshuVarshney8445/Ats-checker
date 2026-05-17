import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Globe as Google, UserCircle as Linkedin, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { authAPI } from "../utils/api";

export default function Auth({ onNavigate, setUser }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.signup(formData);
      
      setSuccess(response.data.message || "Success!");
      
      if (!isLogin) {
        setFormData({ userName: "", email: "", password: "" });
        setTimeout(() => setIsLogin(true), 1500);
      } else {
        const profileRes = await authAPI.me();
        setUser(profileRes.data);
        setTimeout(() => {
          onNavigate('dashboard');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20 flex flex-col">
      <Navbar onNavigate={onNavigate} />
      
      <main className="flex-1 pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-50 -z-10" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/40"
          >
            {/* Header */}
            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-primary shadow-xl shadow-primary/30 mb-2 rotate-3">
                <Sparkles className="text-white w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-on-background">
                {isLogin ? "Welcome Back" : "Join ResumeFlow"}
              </h1>
              <p className="text-on-surface-variant text-lg">
                {isLogin 
                  ? "Access your dashboard and resume insights" 
                  : "The first step towards your dream tech career"}
              </p>
            </div>

            {/* Status Messages */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-3 text-error text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-600 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {success}
              </motion.div>
            )}

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border-2 border-on-surface-variant/10 font-bold hover:bg-on-surface-variant/5 transition-all active:scale-95">
                <Google className="w-5 h-5 text-primary" />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border-2 border-on-surface-variant/10 font-bold hover:bg-on-surface-variant/5 transition-all active:scale-95">
                <Linkedin className="w-5 h-5 text-secondary" />
                LinkedIn
              </button>
            </div>

            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-on-surface-variant/10"></div>
              </div>
              <span className="relative px-6 bg-white/50 backdrop-blur-sm text-sm font-bold text-on-surface-variant uppercase tracking-widest">
                or use email
              </span>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-background ml-1 uppercase tracking-wider opacity-60">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                    <input 
                      type="text" 
                      name="userName"
                      required
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-on-surface-variant/5 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none text-on-background font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-background ml-1 uppercase tracking-wider opacity-60">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-on-surface-variant/5 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none text-on-background font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-on-background uppercase tracking-wider opacity-60">Password</label>
                  {isLogin && (
                    <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot?</button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-on-surface-variant/5 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none text-on-background font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-on-surface-variant font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLogin ? "Sign Up Free" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
