import { Sparkles, Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-on-surface-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-primary">ResumeFlow</span>
            </div>
            <p className="text-on-surface-variant max-w-sm text-lg leading-relaxed">
              Empowering the next generation of creative tech professionals with AI-driven career tools.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-on-surface-variant/5 rounded-full text-on-surface-variant hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="p-3 bg-on-surface-variant/5 rounded-full text-on-surface-variant hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-on-background">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Safety Center</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-on-background">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">API Docs</a></li>
              <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-on-surface-variant/5 text-center text-on-surface-variant font-medium">
          © 2024 ResumeFlow. Built for the creative tech generation.
        </div>
      </div>
    </footer>
  );
}
