import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Sparkles, Plus, Clock, ArrowRight, BarChart3, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard({ onNavigate, user, setUser }) {
  const [lastAnalysis, setLastAnalysis] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastAnalysis');
    if (saved) {
      setLastAnalysis(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <Navbar onNavigate={onNavigate} user={user} setUser={setUser} />

      <main className="flex-1 container pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-on-background">Welcome back, {user?.userName || 'Creative'}! 👋</h1>
          <p className="text-on-surface-variant text-lg">Here's what's happening with your resume optimizations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New Analysis Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-card p-10 rounded-[32px] bg-primary text-white relative overflow-hidden cursor-pointer"
            onClick={() => onNavigate('upload')}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Plus size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Start New Analysis</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Upload a new resume and target job description to get instant AI feedback and optimize your ATS score.
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                Upload Resume <ArrowRight size={20} />
              </button>
            </div>
            <Sparkles className="absolute right-10 bottom-10 w-48 h-48 opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-20 -mr-20" />
          </motion.div>

          {/* Stats/Quick Info Card */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[32px] bg-white shadow-sm border border-outline/30">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-on-surface">
                <BarChart3 className="text-secondary" />
                Quick Stats
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold mb-1">Total Analyses</p>
                  <p className="text-3xl font-black text-on-surface">{lastAnalysis ? '1' : '0'}</p>
                </div>
                <div className="h-px bg-on-surface-variant/20" />
                <div>
                  <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold mb-1">Avg. Score</p>
                  <p className="text-3xl font-black text-primary">{lastAnalysis?.ats_score || lastAnalysis?.atsScore || '--'}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Analysis Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-on-background">
            <Clock className="text-primary" />
            Recent Activity
          </h2>

          {lastAnalysis ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card p-6 rounded-[24px] bg-white shadow-sm border border-outline/30 flex flex-col md:flex-row items-center gap-6 cursor-pointer"
              onClick={() => onNavigate('analysis')}
            >
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center flex-shrink-0 relative">
                <span className="text-xl font-bold text-primary">{lastAnalysis.ats_score || lastAnalysis.atsScore}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="36" cy="36" r="34" fill="none"
                    stroke="currentColor" strokeWidth="4" className="text-primary"
                    strokeDasharray={213}
                    strokeDashoffset={213 - (213 * (lastAnalysis.ats_score || lastAnalysis.atsScore || 0)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1 text-on-surface">{lastAnalysis.target_role || lastAnalysis.job_title || 'Target Role'}</h3>
                <p className="text-on-surface-variant text-sm line-clamp-1">{lastAnalysis.summary}</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <div className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold flex items-center gap-2 flex-1 justify-center">
                  <CheckCircle2 size={16} /> Analysis Complete
                </div>
                <button className="p-3 bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 glass-card rounded-[32px] bg-white border border-dashed border-on-surface-variant/50 cursor-pointer hover:bg-on-surface-variant/5 transition-colors" onClick={() => onNavigate('upload')}>
              <FileText className="w-16 h-16 text-on-surface-variant/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-on-surface">No analyses yet</h3>
              <p className="text-on-surface-variant">Click here to upload your first resume and get started.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
