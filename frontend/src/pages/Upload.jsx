import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, FileText, Briefcase, AlignLeft, Sparkles, Loader2, 
  CheckCircle2, AlertCircle, X, ArrowRight, Zap, Target
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { atsAPI } from "../utils/api";

export default function Upload({ onNavigate, user, setUser }) {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [step, setStep] = useState(1); // 1: Upload, 2: Details, 3: Processing
  const [status, setStatus] = useState("idle"); // idle, uploading, analyzing, error
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a valid PDF resume.");
    }
  };

  const handleStartAnalysis = async () => {
    if (!file || !jobTitle || !jobDescription) {
      setError("Please provide all required information.");
      return;
    }

    setStep(3);
    setStatus("uploading");
    setError("");

    try {
      // 1. Upload Resume
      const formData = new FormData();
      formData.append("resume", file);
      
      const uploadRes = await atsAPI.uploadResume(formData);
      const resumeUrl = uploadRes.data.fileUrl;

      // 2. Analyze Resume
      setStatus("analyzing");
      const analysisRes = await atsAPI.analyzeResume({
        resumeUrl,
        jobTitle,
        jobDescription
      });

      console.log("Analysis Result from Backend:", analysisRes.data);

      // 3. Save and Redirect
      localStorage.setItem('lastAnalysis', JSON.stringify(analysisRes.data));
      onNavigate('analysis');
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <Navbar onNavigate={onNavigate} user={user} setUser={setUser} />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-on-surface-variant/10 -translate-y-1/2 -z-10" />
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 ${
                  step >= s ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-white text-on-surface-variant border border-on-surface-variant/20'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {step === 1 && "Upload Your Resume"}
              {step === 2 && "Target Job Details"}
              {step === 3 && "AI at Work"}
            </h1>
            <p className="text-on-surface-variant text-lg">
              {step === 1 && "The first step to optimizing your career path."}
              {step === 2 && "Help us tailor the analysis to your dream role."}
              {step === 3 && "Our AI is dissecting your resume against ATS standards."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-12 rounded-[40px] text-center"
              >
                <div 
                  className={`border-3 border-dashed rounded-3xl p-16 transition-all cursor-pointer group ${
                    file ? 'border-primary bg-primary/5' : 'border-on-surface-variant/20 hover:border-primary/50'
                  }`}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input 
                    type="file" 
                    id="fileInput" 
                    hidden 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                  />
                  
                  {file ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
                        <FileText className="w-10 h-10" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-on-background">{file.name}</p>
                        <p className="text-on-surface-variant">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-error font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
                      >
                        <X className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="w-20 h-20 bg-on-surface-variant/5 rounded-3xl flex items-center justify-center text-on-surface-variant/40 mx-auto group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">Drop your resume here</p>
                        <p className="text-on-surface-variant">or click to browse from your computer</p>
                      </div>
                      <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">Supports PDF format up to 10MB</p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-6 p-4 rounded-2xl bg-error/10 text-error flex items-center gap-3 font-medium">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <button 
                  disabled={!file}
                  onClick={() => setStep(2)}
                  className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  Continue to Details
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-12 rounded-[40px] space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-1">Target Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40" />
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Frontend Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-on-surface-variant/5 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-medium text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-1">Job Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-5 top-6 w-5 h-5 text-on-surface-variant/40" />
                    <textarea 
                      placeholder="Paste the job description here for a tailored analysis..."
                      rows={8}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-on-surface-variant/5 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all outline-none font-medium resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 rounded-2xl font-bold text-on-surface-variant hover:bg-on-surface-variant/5 transition-all border border-on-surface-variant/10"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleStartAnalysis}
                    className="flex-[2] bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    Start AI Analysis
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-16 rounded-[40px] text-center space-y-12"
              >
                <div className="relative w-40 h-40 mx-auto">
                  <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
                  <motion.div 
                    className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {status === "uploading" ? "Uploading Resume..." : "Analyzing Data..."}
                  </h2>
                  <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                    Our AI is comparing your skills, experience, and keywords against the target role. This usually takes 10-15 seconds.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Parsing structure", done: status !== "uploading" },
                    { label: "Extracting keywords", done: status === "analyzing" },
                    { label: "Calculating match score", done: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between max-w-xs mx-auto px-6 py-3 rounded-2xl bg-on-surface-variant/5">
                      <span className={`font-medium ${item.done ? 'text-on-background' : 'text-on-surface-variant/40'}`}>
                        {item.label}
                      </span>
                      {item.done ? (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      ) : (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      )}
                    </div>
                  ))}
                </div>

                {status === "error" && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-error/10 text-error border border-error/20 max-w-md mx-auto">
                      <p className="font-bold mb-2">Analysis Failed</p>
                      <p className="text-sm opacity-80">{error}</p>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="bg-on-background text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
