/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  Layers,
  Star,
  Quote,
  Menu,
  X,
  Globe,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode, MouseEvent } from "react";

// --- Components ---

const SpotlightCard = ({
  children,
  className = "",
  span = "",
}: {
  children: ReactNode;
  className?: string;
  span?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative p-10 rounded-[2.5rem] glass-card group transition-all duration-500 overflow-hidden ${span} ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
      {/* Layered border effect */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
      <div className="absolute inset-[1px] rounded-[2.45rem] border border-white/5 pointer-events-none" />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`glass-card rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? "bg-slate-950/80 shadow-2xl" : "bg-transparent border-transparent"}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
              <Sparkles className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter font-display uppercase">
              LUMINA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Intelligence", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Log In
            </button>
            <button className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-sky-400 transition-all shadow-lg shadow-white/10">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MarketIntelligenceWidget = () => {
  const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true",
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Failed to fetch market data", error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (!prices) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide font-mono">
      {Object.entries(prices).map(([id, data]: [string, any]) => (
        <div
          key={id}
          className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl min-w-[140px]"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {id}
            </span>
            <span
              className={`text-[10px] font-bold ${data.usd_24h_change >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {data.usd_24h_change >= 0 ? "+" : ""}
              {data.usd_24h_change.toFixed(2)}%
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            ${data.usd.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/20 blur-[140px] rounded-full opacity-50"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[140px] rounded-full opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-8 font-mono backdrop-blur-sm">
            <span className="relative flex h-2 w-2 inline-block mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Now in Private Beta
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-[1] font-display">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Your Personal
            </motion.span>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-gradient block"
            >
              Intelligence Layer
            </motion.span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-sans">
            Lumina turns the world's noise into your competitive advantage.
            Automate your research, synthesize complex data, and find the "so
            what" in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_rgba(14,165,233,0.3)] flex items-center justify-center gap-3 group">
              Start Researching Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-full text-lg font-bold transition-all border border-white/10 backdrop-blur-md">
              Watch Demo
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 font-display text-sm tracking-[0.2em]">
            <span>FORBES</span>
            <span>TECHCRUNCH</span>
            <span>WIRED</span>
            <span>THE VERGE</span>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="mt-24 relative mx-auto max-w-6xl group"
        >
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-3 backdrop-blur-xl shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 opacity-50" />
            <div className="rounded-[2rem] overflow-hidden bg-slate-950 aspect-[16/9] relative border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15)_0%,transparent_50%)]" />
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-12 w-full">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    }}
                    className="w-24 h-24 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-sky-500/20 relative"
                  >
                    <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full animate-pulse" />
                    <Zap className="text-sky-400 w-10 h-10 relative z-10" />
                  </motion.div>
                  <div className="max-w-xl mx-auto mb-12">
                    <MarketIntelligenceWidget />
                  </div>
                  <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                    Interactive Intelligence Dashboard v2.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Floating elements */}
          <div className="absolute -top-12 -right-12 hidden lg:block">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="glass-card p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-green-400 w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Insights Generated
                  </p>
                  <p className="text-2xl font-bold text-white font-display">
                    +1,240%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-12 -left-12 hidden lg:block">
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="glass-card p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="text-sky-400 w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Global Reach
                  </p>
                  <p className="text-2xl font-bold text-white font-display">
                    50+ Lang
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problem = () => {
  return (
    <section className="py-32 bg-slate-950 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight font-display">
              The world is drowning in data, <br />
              <span className="text-slate-500">but starving for wisdom.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Every day, you're bombarded with thousands of signals.
              Newsletters, research papers, market reports, and social feeds.
              Most of it is noise. Finding the actionable truth takes hours you
              don't have.
            </p>
            <ul className="space-y-6">
              {[
                "Information overload leads to decision paralysis.",
                "Valuable insights are buried in 50-page PDFs.",
                "Manual research is slow, expensive, and prone to bias.",
                "Missing a single trend can cost your business millions.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                    <X className="text-red-500 w-4 h-4" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden font-mono">
            <div className="bg-slate-950/50 p-8 group hover:bg-slate-900/80 transition-colors">
              <p className="text-xs text-sky-500 font-bold uppercase tracking-[0.2em] mb-4">
                Metric_01
              </p>
              <p className="text-5xl font-bold text-white mb-2 font-display tracking-tight">
                4.2h
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Avg. Daily Search Time
              </p>
              <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  className="h-full bg-sky-500"
                />
              </div>
            </div>
            <div className="bg-slate-950/50 p-8 group hover:bg-slate-900/80 transition-colors">
              <p className="text-xs text-indigo-500 font-bold uppercase tracking-[0.2em] mb-4">
                Metric_02
              </p>
              <p className="text-5xl font-bold text-white mb-2 font-display tracking-tight">
                78%
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Overwhelmed Professionals
              </p>
              <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </div>
            <div className="bg-slate-950/50 p-8 group hover:bg-slate-900/80 transition-colors">
              <p className="text-xs text-purple-500 font-bold uppercase tracking-[0.2em] mb-4">
                Metric_03
              </p>
              <p className="text-5xl font-bold text-white mb-2 font-display tracking-tight">
                $1.2T
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Annual Productivity Loss
              </p>
              <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  className="h-full bg-purple-500"
                />
              </div>
            </div>
            <div className="bg-sky-500 p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent)]" />
              <p className="text-xs text-sky-100 font-bold uppercase tracking-[0.2em] mb-4 relative z-10">
                Solution_01
              </p>
              <p className="text-5xl font-bold text-white mb-2 font-display tracking-tight relative z-10">
                Lumina
              </p>
              <p className="text-[10px] text-sky-100 uppercase tracking-widest font-bold relative z-10">
                The Intelligence Layer
              </p>
              <Sparkles className="absolute bottom-4 right-4 text-white/20 w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Instant Market Clarity",
      desc: "Stop drowning in tabs. Lumina scans thousands of global sources to give you a clear, high-level view of any market or trend in seconds.",
      benefit: "Get a week's worth of research in 30 seconds.",
      icon: <Cpu className="w-6 h-6" />,
      span: "md:col-span-2 md:row-span-1",
      color: "bg-sky-500",
    },
    {
      title: "Natural Conversations",
      desc: "No more complex search queries. Just ask Lumina anything like you would a colleague, and get precise answers backed by real-world data.",
      benefit: "Find the exact answer instantly.",
      icon: <Search className="w-6 h-6" />,
      span: "md:col-span-1 md:row-span-1",
      color: "bg-indigo-500",
    },
    {
      title: "Decision-Ready Intelligence",
      desc: "Don't just read data—use it. Lumina identifies the 'so what' in every report, highlighting the risks you need to avoid and the opportunities you can't miss.",
      benefit: "Move from 'knowing' to 'doing' instantly.",
      icon: <Zap className="w-6 h-6" />,
      span: "md:col-span-1 md:row-span-1",
      color: "bg-purple-500",
    },
    {
      title: "Your Private Brain",
      desc: "Turn your internal documents, emails, and reports into a searchable goldmine. Lumina learns your business context to provide answers tailored specifically to your team.",
      benefit: "Your private data, supercharged.",
      icon: <Layers className="w-6 h-6" />,
      span: "md:col-span-2 md:row-span-1",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-32 bg-slate-900/30 font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
            Built for the <br />
            <span className="text-gradient">Speed of Thought</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Lumina combines cutting-edge AI with a focus on human productivity.
            No more busy work, just pure intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={f.span}
            >
              <SpotlightCard className="h-full">
                <div
                  className={`w-16 h-16 ${f.color}/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 ${f.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">{f.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-base mb-8 leading-relaxed">
                  {f.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3 text-sky-400 font-bold text-sm">
                  <div className="w-6 h-6 rounded-full bg-sky-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>{f.benefit}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Connect Your Sources",
      desc: "Sync your browser, upload PDFs, or connect your enterprise apps like Notion and Slack.",
    },
    {
      title: "Define Your Focus",
      desc: "Tell Lumina what you're looking for. A market trend? A competitor's weakness? A technical summary?",
    },
    {
      title: "Receive Synthesized Intelligence",
      desc: "Lumina delivers a structured report with citations, key takeaways, and recommended actions.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-slate-950 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 font-display tracking-tight">
              How Lumina Works
            </h2>
            <div className="space-y-12 relative">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold shrink-0 z-10">
                      {i + 1}
                    </div>
                    {i !== steps.length - 1 && (
                      <div className="w-px h-full bg-slate-800 my-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-slate-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.1)_0%,transparent_50%)]" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Lumina_Terminal_v4.0
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-950/80 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center text-sky-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-300 font-mono">
                  <span className="text-sky-500 mr-2">$</span>
                  "Summarize the Q3 earnings for all SaaS competitors."
                </p>
              </div>
              <div className="p-6 bg-slate-950/80 rounded-xl border border-white/5 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-sky-400 w-4 h-4" />
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] font-mono">
                      Neural_Synthesis_Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-500">
                      Processing...
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    className="h-1.5 bg-slate-800 rounded"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.1 }}
                    className="h-1.5 bg-slate-800 rounded"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ delay: 0.2 }}
                    className="h-1.5 bg-slate-800 rounded"
                  />
                  <div className="pt-6 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-sky-500/5 rounded-lg border border-sky-500/10">
                      <p className="text-[10px] text-slate-500 uppercase mb-1 font-mono">
                        Growth_Delta
                      </p>
                      <p className="text-lg font-bold text-sky-400 font-display">
                        +12.4%
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                      <p className="text-[10px] text-slate-500 uppercase mb-1 font-mono">
                        Market_Sentiment
                      </p>
                      <p className="text-lg font-bold text-indigo-400 font-display">
                        Bullish
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Product, FinTech Global",
      text: "Lumina has cut our market research time by 70%. We're making decisions based on data that used to take weeks to compile.",
      avatar: "https://picsum.photos/seed/sarah/100/100",
    },
    {
      name: "Marcus Thorne",
      role: "Lead Researcher, BioGen",
      text: "The ability to upload 100+ medical journals and ask specific cross-referencing questions is a game changer for our lab.",
      avatar: "https://picsum.photos/seed/marcus/100/100",
    },
    {
      name: "Elena Rodriguez",
      role: "Founder, Insight Media",
      text: "I used to spend my mornings reading news. Now I spend 5 minutes with my Lumina Daily Brief and I'm better informed than ever.",
      avatar: "https://picsum.photos/seed/elena/100/100",
    },
  ];

  return (
    <section className="py-32 bg-slate-950 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
            Trusted by the{" "}
            <span className="text-gradient">World's Sharpest Minds</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {["TechCrunch", "Wired", "Forbes", "The Verge", "Bloomberg"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-2xl font-bold text-white font-display tracking-tighter"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-10 rounded-[2.5rem] relative group"
            >
              <div className="absolute top-8 right-10 text-sky-500/20 group-hover:text-sky-500/40 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-slate-950 font-sans relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your intelligence needs. No hidden fees,
            no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 max-w-5xl mx-auto gap-10">
          {/* Pro Plan */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-12 rounded-[3rem] glass-card flex flex-col relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              Professional
            </h3>
            <p className="text-slate-400 text-sm mb-8">
              For individual researchers and executives.
            </p>
            <div className="mb-10 flex items-baseline gap-1">
              <span className="text-7xl font-bold text-white font-display tracking-tighter">
                $49
              </span>
              <span className="text-slate-500 text-lg font-medium">/mo</span>
            </div>
            <ul className="space-y-6 mb-12 flex-grow">
              {[
                "Unlimited Neural Synthesis",
                "1,000 Semantic Queries / mo",
                "50GB Knowledge Base",
                "Real-time Global Monitoring",
                "Standard Support",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-sky-500 w-3 h-3" />
                  </div>
                  <span className="text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-2xl bg-white text-slate-950 font-bold hover:bg-sky-400 transition-all text-lg shadow-xl shadow-white/5">
              Start 14-Day Free Trial
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-12 rounded-[3rem] bg-slate-900/60 border border-sky-500/30 flex flex-col relative overflow-hidden group shadow-[0_0_50px_rgba(14,165,233,0.15)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-sky-500" />
            <div className="absolute top-8 right-8 bg-sky-500 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-sky-500/40">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              Enterprise
            </h3>
            <p className="text-slate-400 text-sm mb-8">
              For teams requiring deep collaboration.
            </p>
            <div className="mb-10">
              <span className="text-7xl font-bold text-white font-display tracking-tighter">
                Custom
              </span>
            </div>
            <ul className="space-y-6 mb-12 flex-grow">
              {[
                "Everything in Pro",
                "Unlimited Knowledge Base",
                "Team Collaboration Tools",
                "Custom LLM Fine-tuning",
                "Dedicated Account Manager",
                "SSO & Advanced Security",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-sky-500 w-3 h-3" />
                  </div>
                  <span className="text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-2xl bg-sky-500 text-white font-bold hover:bg-sky-400 transition-all shadow-[0_0_40px_rgba(14,165,233,0.4)] text-lg">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-32 bg-slate-950 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.15)_0%,transparent_50%)]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 p-12 md:p-20 rounded-[4rem] border border-white/10 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display tracking-tight leading-tight">
            Ready to <span className="text-gradient">Ascend</span> Above the
            Noise?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ high-performers using Lumina to synthesize the world's
            information in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all text-lg"
            />
            <button className="bg-sky-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-400 transition-all shadow-[0_0_30px_rgba(14,165,233,0.4)] text-lg whitespace-nowrap">
              Join the Waitlist
            </button>
          </div>
          <p className="mt-8 text-slate-500 text-sm font-medium">
            Limited early access slots available. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sky-500 rounded flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight font-display">
              Lumina AI
            </span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Lumina Intelligence Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-sky-500/30 selection:text-sky-200">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
