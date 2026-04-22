import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../components/notifications/NotificationBell";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl shadow-[0_20px_40px_rgba(25,28,29,0.04)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-slate-900 font-headline">
            Campus Hub
          </div>
          <div className="hidden md:flex items-center space-x-8 font-headline text-sm font-semibold tracking-tight">
            <a className="text-slate-600 hover:text-slate-900 transition-colors" href="#">
              Solutions
            </a>
            <a className="text-slate-600 hover:text-slate-900 transition-colors" href="#">
              Features
            </a>
            <a className="text-slate-600 hover:text-slate-900 transition-colors" href="#">
              Pricing
            </a>
            <a className="text-slate-600 hover:text-slate-900 transition-colors" href="#">
              About
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <button
                onClick={() => navigate("/notifications")}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                Notifications
              </button>
            </div>
            <div className="hidden md:block">
              <NotificationBell />
            </div>
            <button 
              onClick={() => navigate("/login")}
              className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-br from-primary to-primary-container rounded-lg shadow-lg hover:scale-95 transition-all duration-200 ease-in-out"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-8 py-20 md:py-32 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 space-y-8 z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
                The Future of <span className="text-primary">Campus Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
                Orchestrate every square foot of your institution with Ethereal Command. A unified operational hub designed for modern architectural complexity and human-centric flow.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-xl hover:scale-[0.98] transition-transform"
                >
                  Get Started Free
                </button>
                <button className="px-8 py-4 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-colors">
                  View Live Demo
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  alt="Campus Headquarters" 
                  className="w-full h-[500px] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRLFCwHAzTzwaF0_k-_FxC-LbLxqRo4e89EQxfY06NK6TjhvjalCpKeNUsFK-4pTbdxBFcGDGZ7_1Y4SWCOCfL3ceyhK6Us0hlfdP1pel64GO11bQswSvNGAj6qMpGhB-Gtk28Sjlo2R7wfklBSs7lhvifqoatr6u4cahf0vJgPqvK7akdjN_0kWma5GPYzjwNMNOp7MuLKGB42Rn2xKEAnoP3z2ZDNaouu9wiUxV5ynSfRnfuReyZXS2eRzalp4LPMPlfaecvbPE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {/* Floating Glass Metric */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-6 rounded-xl border border-white/20 flex justify-around">
                  <div className="text-center">
                    <span className="block text-2xl font-bold font-headline text-primary">94%</span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Energy Efficiency</span>
                  </div>
                  <div className="w-px h-10 bg-outline-variant/30"></div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold font-headline text-primary">2.4k</span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Live Assets</span>
                  </div>
                  <div className="w-px h-10 bg-outline-variant/30"></div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold font-headline text-primary">0ms</span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Latent Delay</span>
                  </div>
                </div>
              </div>
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-screen-2xl mx-auto px-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-10">
              Trusted by Global Institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-bold font-headline">STANFORD</div>
              <div className="text-xl font-bold font-headline">MIT</div>
              <div className="text-xl font-bold font-headline">OXFORD</div>
              <div className="text-xl font-bold font-headline">ETH ZÜRICH</div>
              <div className="text-xl font-bold font-headline">TUM</div>
            </div>
          </div>
        </section>

        {/* Core Pillars Bento Grid */}
        <section className="py-24 px-8 max-w-screen-2xl mx-auto">
          <div className="mb-16 text-center md:text-left max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">The Command Stack</span>
            <h2 className="text-4xl font-extrabold font-headline mt-4 leading-tight">
              Everything you need to govern modern education.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
            {/* Resource Booking */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined">event_seat</span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-4">Resource Booking</h3>
                  <p className="text-on-surface-variant max-w-sm">
                    Real-time management of lecture halls and labs. Eliminate scheduling conflicts with AI-optimized routing.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-48 border border-outline-variant/20 shadow-inner">
                  <img 
                    alt="Modern Lab" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxBt7XdwMVPh5_eQPUqt9ulanyEuLDeCEM30HkhOqvg0hjDXpUsUNGcQyg1KRwmiGk7QVlhadcZM68QJjc5Q1l2OG-djSZqIYmv-AjMhDZNQwz5RFbdoZh2IHESYebduKo6xVQUA3QFGkuAYdUO9rNReXJXLvwPcovI5d7yuW5owAjjMp8EUWgDTf-EK6vqRoDjkrOKjQuISR9sfIp1QhS_Cld1GAnYADTRTOQDrBeMHbd9Xdbg_hE6zejkiPecr-xABCPX27B8IY"
                  />
                </div>
              </div>
            </div>

            {/* Intelligent Safety */}
            <div className="md:col-span-5 bg-inverse-surface text-inverse-on-surface rounded-xl p-8 relative overflow-hidden group">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  security
                </span>
              </div>
              <h3 className="text-2xl font-bold font-headline mb-4">Intelligent Safety</h3>
              <p className="text-outline-variant mb-12">
                AI-driven monitoring and automated emergency protocols that react faster than the eye can see.
              </p>
              <div className="absolute bottom-0 right-0 left-0 h-1/2 p-8 pt-0">
                <div className="w-full h-full border-t border-l border-white/20 rounded-tl-3xl bg-white/5 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)]"></div>
                    <span className="text-xs font-mono uppercase">System Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-white/30"></div>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-white/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Hub */}
            <div className="md:col-span-5 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between border border-outline-variant/10">
              <div>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-on-surface mb-6 shadow-sm">
                  <span className="material-symbols-outlined">construction</span>
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">Maintenance Hub</h3>
                <p className="text-on-surface-variant">
                  Automated incident ticketing and predictive technician dispatching.
                </p>
              </div>
              <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg flex items-center gap-2 self-start text-sm font-bold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                No active incidents
              </div>
            </div>

            {/* Live Analytics */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center text-on-tertiary-fixed mb-6">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">Live Analytics</h3>
                <p className="text-on-surface-variant max-w-sm">
                  A granular view of campus energy expenditure and foot traffic heatmaps in real-time.
                </p>
                <div className="mt-auto pt-10 flex gap-4 items-end h-32">
                  <div className="flex-1 bg-primary/20 rounded-t-lg h-[40%]"></div>
                  <div className="flex-1 bg-primary/40 rounded-t-lg h-[70%]"></div>
                  <div className="flex-1 bg-primary rounded-t-lg h-[100%]"></div>
                  <div className="flex-1 bg-primary/60 rounded-t-lg h-[85%]"></div>
                  <div className="flex-1 bg-primary/30 rounded-t-lg h-[55%]"></div>
                  <div className="flex-1 bg-primary/50 rounded-t-lg h-[75%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-8 py-24 mb-24">
          <div className="max-w-screen-2xl mx-auto bg-primary rounded-[2rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight">
                Evolve your campus operations today
              </h2>
              <p className="text-lg md:text-xl text-primary-fixed opacity-90 font-body">
                Join hundreds of world-class universities using Campus Nexus to streamline safety, utility, and student experience.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button 
                  onClick={() => navigate("/register")}
                  className="px-10 py-5 bg-white text-primary font-extrabold rounded-xl shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  Request a Demo
                </button>
                <button className="px-10 py-5 border-2 border-white/30 text-white font-extrabold rounded-xl hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
            {/* Abstract visual accents */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-12 bg-slate-50 border-t border-slate-200/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline font-bold text-slate-900">Campus Hub</div>
            <p className="font-inter text-xs text-slate-500 uppercase tracking-widest text-center md:text-left">
              © 2024 Architectural Intelligence Hub. Designed for Ethereal Command.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors" href="#">
              Campus Map
            </a>
            <a className="font-inter text-xs text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}