/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import {
  Rocket,
  UploadCloud,
  CheckCircle2,
  BarChart3,
  Key,
  Lightbulb,
  ArrowRight,
  CheckCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing({ onNavigate, user, setUser }) {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20">
      <Navbar onNavigate={onNavigate} user={user} setUser={setUser} />

      <main className="pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 hero-pattern -z-10" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-10 left-0 w-72 h-72 bg-secondary-container/20 rounded-full blur-[80px] -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/30 text-secondary border border-secondary-container/50 font-semibold text-sm uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                New: AI-Powered Resume Optimization 2.0
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-on-background leading-tight">
                Beat the Bots. <br />
                <span className="text-primary italic">Get the Job.</span>
              </h1>

              <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                The ultimate AI co-pilot for your job search. Optimize your resume for ATS algorithms, uncover hidden keywords, and visualize your success in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => onNavigate('upload')}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                >
                  <UploadCloud className="w-5 h-5" />
                  Upload Resume
                </button>

                <button className="border-2 border-on-surface-variant/20 text-on-background px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-on-surface-variant/5 transition-colors">
                  View Demo
                </button>
              </div>

              <div className="flex items-center gap-6 pt-8">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3F9QZWHv1xOYjNuraJwpMbTlE1vdveaJ0pgeBVzrOSh9cmwSKpMbs4RrE9OFGkzTFRTuAuPjTu01E_HaWt1Icw9mKR93beORw9aBXQCQfMRlpnzBhtmkxDfDY6OwKs4yI15ptyqyzwBxo413u4bvzuknr4BXC9MRdktTox_EQdm_kIseQvbgRBWMLy9LH7RG-VINIhIvcOCTi-V6SotNKHFhGwXyYByqb4ww8W0VY5cL_df9GxHJNj7T4qmu_tNTdP0qhl7z4doki"
                    alt="User 1"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4RRpYyKiP2usm1haWi7IFHHhDQfg5Q8WTVQ1CjEffupy-YYKbmb4ekiDw2Nuzv1fP-beaHqWpVVvY2J_omefw49r61zKtEH1VTpldbY8xzUNS7Zva8eklJp2awF4b8XmymDGMeTnYUPMgnhhwberwQPQgbZlN3IXwsBTnmWwMfCnb-EuI3qnRfUYqkGRQN-ovgZnODmfy3r3PIdQ672yxNpoK_-nLPdd5f7QqyVz9ZCa38VwiQl0prfbNphfqFVJYR5FcsaCLn0x2"
                    alt="User 2"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxjuUL9NCuPIv1hXSSeoHvq2A8TDoeEY3bIH0qUkyuuiNX-YY1a01mg5mS8cCH8gNCCxvsEzd7YcWE5R-vo3U49wA7Enl8eppGRQ_Bscx6RbQsury6421VUCkpsTs0ROYtcG7WrTkV0CVhP6k9N-OSTBRZ4G8_qxIF7cA0Z7tRuEp5Tu5ej91v-jC1jLltC3q10q_AaQ-AvtotbNDbBn5QbYXnHQX0fHM0W3Da7vJfgHHsUNN2L-0r2N2DmJXPTdwZHsWOV7IQ6FhE"
                    alt="User 3"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm font-medium text-on-surface-variant">
                  Trusted by <span className="font-bold text-primary">50,000+</span> Job Seekers
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Resume Preview Card */}
              <div className="relative z-10 p-8 rounded-[32px] bg-white shadow-2xl border border-on-surface-variant/10 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <div className="space-y-2">
                    <div className="w-24 h-2.5 bg-on-surface-variant/10 rounded-full" />
                    <div className="w-32 h-2.5 bg-on-surface-variant/5 rounded-full" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-bold text-xl">
                    88
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex gap-4 items-center mb-4">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <div className="flex-1 h-3 bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "80%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                    <div className="h-2 w-full bg-on-surface-variant/5 rounded-full" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold border border-secondary-container/30">#Keywords</span>
                    <span className="px-4 py-1.5 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold border border-secondary-container/30">#Optimization</span>
                    <span className="px-4 py-1.5 rounded-full bg-on-surface-variant/5 text-on-surface-variant text-xs font-bold border border-on-surface-variant/10">#ATS_Score</span>
                  </div>
                </div>

                {/* Scanner Line Effect */}
                <motion.div
                  animate={{ top: ["20%", "80%", "20%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-1 bg-primary/40 shadow-[0_0_15px_#7c3aed] blur-[1.5px] z-20"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/5 rounded-3xl rotate-12 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border-4 border-secondary/20 rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-on-surface-variant/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold text-on-background">Precision Tools for Modern Careers</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                We've reverse-engineered the world's most advanced Applicant Tracking Systems to give you the competitive edge you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ATS Scoring Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="md:col-span-2 glass-card p-10 rounded-[32px] flex flex-col md:flex-row gap-10 items-center overflow-hidden"
              >
                <div className="space-y-6 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-background">Advanced ATS Scoring</h3>
                  <p className="text-on-surface-variant">
                    Get a deep-dive analysis of how your resume ranks against specific job descriptions. Our algorithm scans for structural errors and formatting pitfalls.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-on-background font-medium">
                      <CheckCheck className="w-5 h-5 text-secondary" />
                      Structure & Layout Audit
                    </li>
                    <li className="flex items-center gap-3 text-on-background font-medium">
                      <CheckCheck className="w-5 h-5 text-secondary" />
                      Formatting Consistency
                    </li>
                  </ul>
                </div>
                <div className="relative w-56 h-56 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-on-surface-variant/10" cx="112" cy="112" fill="transparent" r="100" stroke="currentColor" strokeWidth="12" />
                    <motion.circle
                      initial={{ strokeDashoffset: 628 }}
                      whileInView={{ strokeDashoffset: 628 * (1 - 0.92) }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-secondary"
                      cx="112" cy="112" fill="transparent" r="100" stroke="currentColor" strokeDasharray="628.32" strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-on-background">92</span>
                    <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Match</span>
                  </div>
                </div>
              </motion.div>

              {/* Keyword Magic Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-10 rounded-[32px] space-y-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <Key className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-on-background">Keyword Magic</h3>
                <p className="text-on-surface-variant italic leading-relaxed">
                  Instantly identify the high-value keywords missing from your profile that recruiters are actively searching for.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">Product Design</span>
                  <span className="px-4 py-1.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold">UI/UX</span>
                  <span className="px-4 py-1.5 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-xs font-bold">Agile</span>
                  <span className="px-4 py-1.5 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-xs font-bold">Strategy</span>
                </div>
              </motion.div>

              {/* Live Feedback */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-10 rounded-[32px] space-y-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-on-background">Live Feedback</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Our "Paper" editor provides real-time content suggestions as you type to improve readability and impact.
                </p>
                <div className="p-4 bg-red-500/10 rounded-2xl border-l-4 border-red-500 space-y-1">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Tip: Use stronger action verbs</p>
                  <p className="text-sm text-on-background font-medium italic opacity-70 italic">Instead of "Worked on", try "Spearheaded".</p>
                </div>
              </motion.div>

              {/* Bio Generator */}
              <motion.div
                whileHover={{ y: -5 }}
                className="md:col-span-2 glass-card p-10 rounded-[32px] flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-primary/10 to-secondary/10 border-0"
              >
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold text-on-background tracking-tight">Professional Bio Generator</h3>
                  <p className="text-lg text-on-surface-variant leading-relaxed">
                    Don't struggle with writing your "About" section. Let our AI craft a compelling narrative based on your experience and career goals.
                  </p>
                  <button className="text-primary font-bold flex items-center gap-2 group text-lg">
                    Generate my bio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden shadow-2xl relative border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBZA70qscYMEwhAPwNHGQEEP_czJK1V_iL_XUocz58ww1h3TXEsYK66eawvymoNQe9xVYsri0pXewUaN8q3co6fEEhLtihcNx2FKB1Job4-44Z4Cuf-xu_WP9648Ohcr5GpmIYuw2NAM4GjMFDJKNRbHTAJqSzFqS2eknGOr6lDiYJ-1HlwzdiuPk5QEUv2wj7MntgVRnPO70KQU-jwzYu9Z-ubsNF0qCVSl2sWcZIEbotBdUmRWXwX87pZ9xpqgY_y5irsJnqOizs"
                    alt="Bio Generator Preview"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="py-20 border-y border-on-surface-variant/10 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-12">
              Our alumni work at global innovators
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="text-3xl font-black tracking-tighter">TECHGIANT</span>
              <span className="text-3xl font-black tracking-tighter">CLOUDCORE</span>
              <span className="text-3xl font-black tracking-tighter">PIXELMIND</span>
              <span className="text-3xl font-black tracking-tighter">NEXUSLABS</span>
              <span className="text-3xl font-black tracking-tighter">STRATA</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="bg-white rounded-[48px] p-12 md:p-20 text-center space-y-10 shadow-2xl relative overflow-hidden border border-on-surface-variant/5"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container/20 rounded-bl-full -z-10" />

              <h2 className="text-4xl lg:text-6xl font-bold text-on-background tracking-tight">
                Ready to land your dream interview?
              </h2>
              <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Join thousands of successful candidates who used ResumeFlow to bypass the ATS filter and get noticed by human recruiters.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <button 
                  onClick={() => onNavigate('upload')}
                  className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
                >
                  Build My Resume Now
                </button>
                <button 
                  onClick={() => onNavigate('upload')}
                  className="bg-secondary-container text-secondary px-10 py-5 rounded-full font-bold text-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  Check ATS Score
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
