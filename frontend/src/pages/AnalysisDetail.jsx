import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, AlertCircle, Sparkles, ChevronRight, Download, Share2, Target, Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AnalysisDetail = ({ onNavigate, user, setUser }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const lastAnalysis = localStorage.getItem('lastAnalysis');
    if (lastAnalysis) {
      setData(JSON.parse(lastAnalysis));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-background text-on-background flex flex-col">
        <Navbar onNavigate={onNavigate} user={user} setUser={setUser} />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="animate-spin inline-block mb-4"><Zap size={40} className="text-primary" /></div>
          <h2 className="text-2xl font-bold">Loading Analysis...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const score = data.ats_score || data.atsScore || 0;
  const targetRole = data.target_role || data.targetRole || data.job_title || "Professional Role";
  const summary = data.summary || data.description || "Analysis complete.";
  const matchedKeywords = data.matched_keywords || data.matchedKeywords || data.skillsDetected || [];
  const missingKeywords = data.missing_keywords || data.missingKeywords || data.skillsMissing || [];
  const recommendations = data.recommendations || data.improvementSuggestions || data.feedback || [];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <Navbar onNavigate={onNavigate} user={user} setUser={setUser} />

      <main className="flex-1 container py-32 px-4">
        <button
          className="flex items-center gap-2 text-neutral/40 font-bold hover:text-primary mb-8 transition-colors group"
          onClick={() => onNavigate('upload')}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Analyze Another Resume
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Score & Summary */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              className="card p-10 flex flex-col md:flex-row items-center gap-12 bg-white shadow-xl border-none overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    className="text-neutral/5"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={628}
                    strokeDashoffset={628 - (628 * score) / 100}
                    className="text-primary"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-primary">{score}</span>
                  <span className="text-xs font-black text-neutral/30 tracking-widest uppercase mt-1">MATCH SCORE</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold mb-4">
                  <Target size={14} />
                  <span>Target: {targetRole}</span>
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">
                  {score >= 80 ? "You're in the " : "Keep working, "}
                  <span className="text-primary">{score >= 80 ? "Top 10%!" : "Creative!"}</span>
                </h2>
                <p className="text-neutral/50 mb-8 leading-relaxed font-medium text-lg">
                  {summary}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className="btn-primary">
                    Download Improved PDF
                    <Download size={18} />
                  </button>
                  <button className="btn-outline px-8">
                    Share Report
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-8 shadow-sm">
                <h3 className="font-bold text-xl flex items-center gap-3 mb-8">
                  <div className="p-2 bg-secondary/10 rounded-xl">
                    <CheckCircle2 className="text-secondary" size={24} />
                  </div>
                  Found Keywords
                </h3>
                <div className="flex flex-wrap gap-3">
                  {matchedKeywords.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-secondary/10 text-secondary rounded-2xl text-sm font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card p-8 shadow-sm border-tertiary/10 bg-tertiary/5">
                <h3 className="font-bold text-xl flex items-center gap-3 mb-8">
                  <div className="p-2 bg-tertiary/10 rounded-xl">
                    <AlertCircle className="text-tertiary" size={24} />
                  </div>
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-3">
                  {missingKeywords.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-white text-tertiary shadow-sm rounded-2xl text-sm font-bold border border-tertiary/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actionable Feedback */}
          <div className="space-y-8">
            <div className="card p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                AI Recommendations
              </h3>
              <div className="space-y-5">
                {recommendations.map((fix, idx) => (
                  <div key={idx} className="p-5 bg-neutral/5 rounded-2xl border-l-4 border-primary hover:bg-neutral/10 transition-colors">
                    <h4 className="font-bold text-neutral mb-2">{typeof fix === 'string' ? fix.split(':')[0] : "Improvement"}</h4>
                    <p className="text-sm text-neutral/50 font-medium leading-relaxed">
                      {typeof fix === 'string' ? fix.split(':')[1] || fix : fix.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8 bg-neutral text-white border-none relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-6">Market Outlook</h3>
                <p className="text-sm opacity-70 mb-8 font-medium leading-relaxed">
                  Based on your current score and target role, your application is highly competitive.
                </p>
                <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase opacity-60">Success Probability</span>
                    <span className="text-sm font-black text-secondary">HIGH</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-secondary shadow-[0_0_20px_rgba(45,212,191,0.5)]"
                    />
                  </div>
                </div>
              </div>
              <Target className="absolute -bottom-6 -right-6 opacity-10" size={120} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalysisDetail;

