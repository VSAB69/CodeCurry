import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { 
  Globe, Users, Building2, Rocket, MapPin, Briefcase, 
  GraduationCap, ArrowRight, X, ChevronRight, 
  Quote, Network, Calendar, Award, LineChart, Code, Brain, Lightbulb, TrendingUp,
  CheckCircle2
} from 'lucide-react';

// --- DATA ---
const STATS = [
  { label: "Alumni Worldwide", value: 40000, suffix: "+" },
  { label: "Countries", value: 70, suffix: "+" },
  { label: "Startups Founded", value: 500, suffix: "+" },
  { label: "Top Executives", value: 1200, suffix: "+" },
];

const MAP_NODES = [
  { top: '55%', left: '72%', label: "Bangalore", count: "20,000+", isHub: true },
  { top: '30%', left: '20%', label: "Silicon Valley", count: "5,000+" },
  { top: '28%', left: '22%', label: "Seattle", count: "2,000+" },
  { top: '35%', left: '26%', label: "New York", count: "2,500+" },
  { top: '40%', left: '21%', label: "Austin", count: "1,000+" },
  { top: '25%', left: '25%', label: "Toronto", count: "1,200+" },
  { top: '25%', left: '48%', label: "London", count: "1,500+" },
  { top: '28%', left: '50%', label: "Berlin", count: "800+" },
  { top: '26%', left: '49%', label: "Amsterdam", count: "600+" },
  { top: '60%', left: '78%', label: "Singapore", count: "2,000+" },
  { top: '75%', left: '85%', label: "Sydney", count: "1,000+" },
  { top: '40%', left: '60%', label: "Dubai", count: "3,000+" },
];

const FEATURED_ALUMNI = [
  {
    id: 1, name: "Rahul Sharma", role: "VP Engineering", company: "Google", tag: "Tech Leader",
    img: "https://picsum.photos/seed/rahul/600/600",
    story: "From coding in the BMSCE labs to leading a global engineering team at Google, Rahul's journey is a testament to the strong foundation built during his college years.",
    journey: [
      { year: "2010", text: "Graduated from BMSCE (CSE)" },
      { year: "2012", text: "Joined Startup as Lead Dev" },
      { year: "2015", text: "Moved to Google as Senior Engineer" },
      { year: "2023", text: "Promoted to VP Engineering" }
    ],
    advice: "Never stop learning. The technologies will change, but the problem-solving skills you learn now will last a lifetime."
  },
  {
    id: 2, name: "Priya Patel", role: "Founder & CEO", company: "TechNova", tag: "Founder",
    img: "https://picsum.photos/seed/priya/600/600",
    story: "Priya turned her final year project into a multi-million dollar startup. She credits the incubation center and her professors for the initial push.",
    journey: [
      { year: "2015", text: "Graduated from BMSCE (ISE)" },
      { year: "2016", text: "Incubated TechNova at BMSCE" },
      { year: "2019", text: "Raised Series A Funding" },
      { year: "2024", text: "Expanded globally" }
    ],
    advice: "Build a strong network. Your classmates today are your co-founders, investors, and partners tomorrow."
  },
  {
    id: 3, name: "Arjun Reddy", role: "Principal Data Scientist", company: "Amazon", tag: "AI Specialist",
    img: "https://picsum.photos/seed/arjun/600/600",
    story: "Arjun's passion for AI started in the BMSCE robotics club. Today, he builds algorithms that power recommendations for millions of users.",
    journey: [
      { year: "2014", text: "Graduated from BMSCE (ECE)" },
      { year: "2016", text: "Masters in AI" },
      { year: "2018", text: "Joined Amazon" },
      { year: "2022", text: "Became Principal Scientist" }
    ],
    advice: "Focus on the fundamentals. Math and logic are the bedrock of all advanced technologies."
  },
  {
    id: 4, name: "Sneha Rao", role: "Partner", company: "McKinsey", tag: "Consultant",
    img: "https://picsum.photos/seed/sneha/600/600",
    story: "Transitioning from core engineering to management consulting, Sneha uses her analytical skills to solve complex business problems globally.",
    journey: [
      { year: "2008", text: "Graduated from BMSCE (Mech)" },
      { year: "2012", text: "MBA from IIM" },
      { year: "2013", text: "Joined McKinsey" },
      { year: "2021", text: "Elected Partner" }
    ],
    advice: "Don't be afraid to pivot. Your engineering degree teaches you how to think, which is valuable in any industry."
  },
  {
    id: 5, name: "Vikram Singh", role: "Founder & CEO", company: "AeroSpace Dynamics", tag: "Startup Founder",
    img: "https://picsum.photos/seed/vikram/600/600",
    story: "Built a space-tech startup that recently launched its first micro-satellite, revolutionizing low-earth orbit communications.",
    journey: [
      { year: "2016", text: "Graduated from BMSCE (Aero)" },
      { year: "2018", text: "Worked at ISRO" },
      { year: "2020", text: "Founded AeroSpace Dynamics" },
      { year: "2025", text: "Launched first satellite" }
    ],
    advice: "Dream big, but execute in small, measurable steps. The universe rewards persistence."
  },
  {
    id: 6, name: "Dr. Ananya Sharma", role: "Head of AI Research", company: "DeepMind", tag: "AI / Research Expert",
    img: "https://picsum.photos/seed/ananya/600/600",
    story: "Leading breakthrough research in AGI and reinforcement learning, pushing the boundaries of what machines can learn.",
    journey: [
      { year: "2012", text: "Graduated from BMSCE (CSE)" },
      { year: "2017", text: "Ph.D. in Machine Learning (Stanford)" },
      { year: "2018", text: "Joined DeepMind as Researcher" },
      { year: "2024", text: "Appointed Head of AI Research" }
    ],
    advice: "Research is about asking the right questions. Don't just follow trends; seek to understand the underlying principles."
  }
];

const TIMELINE = [
  { year: "Year 0", title: "Student", desc: "Building foundations, exploring labs, and networking at BMSCE." },
  { year: "Year 2", title: "First Job", desc: "Applying skills as a Software Engineer, Analyst, or Associate." },
  { year: "Year 5", title: "Senior Role", desc: "Leading projects, mentoring juniors, and driving impact." },
  { year: "Year 10+", title: "Leadership / Founder", desc: "C-Level executives, Founders, and industry visionaries." }
];

const TOP_ROLES = [
  { title: "Software Engineer", icon: <Code />, companies: "Google, Microsoft, Amazon", growth: "SDE I → SDE III → Staff" },
  { title: "Product Manager", icon: <Lightbulb />, companies: "Meta, Uber, Atlassian", growth: "APM → PM → Group PM" },
  { title: "Data Scientist", icon: <Brain />, companies: "Netflix, Airbnb, Stripe", growth: "Data Analyst → DS → Lead DS" },
  { title: "Founder", icon: <Rocket />, companies: "Y Combinator, Sequoia backed", growth: "Idea → Seed → Series A+" },
  { title: "Consultant", icon: <TrendingUp />, companies: "McKinsey, BCG, Bain", growth: "Associate → Engagement Mgr → Partner" }
];

const ACHIEVEMENTS = [
  { title: "150+ Patents", desc: "Filed by alumni in tech & engineering globally.", icon: <Award className="text-yellow-400" /> },
  { title: "500+ Startups", desc: "Founded globally, raising over $2B in venture capital.", icon: <Rocket className="text-blue-400" /> },
  { title: "10,000+ Papers", desc: "Published in top-tier international journals.", icon: <Globe className="text-green-400" /> },
  { title: "1,200+ Execs", desc: "C-level leaders shaping Fortune 500 companies.", icon: <Briefcase className="text-purple-400" /> }
];

const MENTORSHIP = [
  { title: "Resume Reviews", desc: "Get your resume polished by industry pros who know what recruiters look for." },
  { title: "Mock Interviews", desc: "Practice technical and behavioral rounds with engineers from FAANG." },
  { title: "Career Guidance", desc: "1-on-1 sessions to navigate your career path and make informed decisions." }
];

const INDUSTRIES = [
  { name: "Big Tech", companies: "Google, Meta, Amazon, Apple, Microsoft", roles: "SDE, PM, Data Scientist, Designer" },
  { name: "Startups", companies: "Stripe, Airbnb, Uber, Scale AI, OpenAI", roles: "Founding Engineer, Growth Lead, CTO" },
  { name: "Finance", companies: "Goldman Sachs, Morgan Stanley, Jane Street", roles: "Quant, Tech Analyst, Trader" },
  { name: "Core Engg", companies: "Boeing, Tesla, Intel, ISRO, L&T", roles: "Hardware Eng, Systems Eng, R&D" },
  { name: "Consulting", companies: "McKinsey, BCG, Bain, Deloitte", roles: "Tech Consultant, Strategy, Analyst" }
];

const QUOTES = [
  "BMSCE gave me the foundation to build my career and the network to scale it.",
  "Focus on fundamentals — everything else follows.",
  "I met my co-founders in the campus cafeteria. That's the power of this ecosystem.",
  "More than just a degree, I gained a perspective that helps me lead global teams today.",
  "The labs, the professors, the late-night hackathons—it all prepared me for the real world."
];

const METRICS = [
  { label: "% in Tech & IT", value: 65, color: "bg-blue-500" },
  { label: "% in Startups & VC", value: 20, color: "bg-purple-500" },
  { label: "% in Global MNCs", value: 85, color: "bg-cyan-500" }
];

// --- HELPER COMPONENTS ---

const CountUp = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const GlassCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div onClick={onClick} className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl ${className} ${onClick ? 'cursor-pointer' : ''}`}>
    {children}
  </div>
);

// --- MAIN PAGE ---

export function Alumni() {
  const [selectedAlumni, setSelectedAlumni] = useState<typeof FEATURED_ALUMNI[0] | null>(null);
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (selectedAlumni) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAlumni]);

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-blue-500/30 font-sans">
        
        {/* 1. HERO */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: Math.random() * 2,
                }}
                animate={{ y: [null, Math.random() * -500], opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none">
                Built Here.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
                  Leading Everywhere.
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light"
            >
              Join a global network of <span className="text-white font-medium">40,000+ alumni</span> shaping industries, founding startups, and leading innovation across the globe.
            </motion.p>
          </div>
        </section>

        {/* 2. GLOBAL IMPACT MAP & STATS */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              {STATS.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GlassCard className="p-8 text-center group hover:border-blue-500/50 transition-colors">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-medium">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Global Impact</h2>
              <p className="text-gray-400 text-lg">BMSCE alumni are everywhere in the tech world.</p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[600px] rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-10 filter invert transition-opacity duration-700 group-hover:opacity-20" />
              
              {MAP_NODES.map((node, i) => (
                <div key={i} className="absolute group/node cursor-pointer z-20" style={{ top: node.top, left: node.left }}>
                  <div className={`absolute -inset-3 rounded-full animate-ping ${node.isHub ? 'bg-purple-500/40' : 'bg-blue-500/20'}`} />
                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] ${node.isHub ? 'bg-purple-500 w-4 h-4 -ml-0.5 -mt-0.5' : 'bg-blue-500'}`} />
                  
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none z-30">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs py-2 px-4 rounded-lg whitespace-nowrap shadow-2xl">
                      <div className="font-bold text-blue-400 text-sm">{node.label}</div>
                      <div className="text-gray-300">{node.count} Alumni</div>
                    </div>
                  </div>
                </div>
              ))}

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.8)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
                  </linearGradient>
                </defs>
                {MAP_NODES.filter(n => !n.isHub).map((node, i) => (
                  <motion.path 
                    key={i}
                    d={`M 72% 55% Q 50% 40% ${node.left} ${node.top}`} 
                    fill="none" 
                    stroke="url(#lineGrad)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                    className="animate-[dash_20s_linear_infinite]"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                  />
                ))}
              </svg>
            </motion.div>
          </div>
        </section>

        {/* 3. LEGACY MAKERS */}
        <section className="py-32 relative bg-[#080808] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-6">Legacy Makers.</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">These are the people you can become. Discover the stories of alumni redefining what's possible.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_ALUMNI.map((alumnus, i) => (
                <motion.div
                  key={alumnus.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard onClick={() => setSelectedAlumni(alumnus)} className="overflow-hidden h-full flex flex-col p-6 hover:bg-white/10 transition-all duration-300 border-white/5 hover:border-blue-500/50 group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                    <div className="w-full h-64 rounded-2xl overflow-hidden relative mb-6">
                      <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img src={alumnus.img} alt={alumnus.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-400 border border-white/10">
                        {alumnus.tag}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{alumnus.name}</h3>
                      <p className="text-gray-300 font-medium mb-1">{alumnus.role}</p>
                      <p className="text-blue-500 text-sm mb-4">{alumnus.company}</p>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6">{alumnus.story}</p>
                      <div className="mt-auto flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                        Read Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ALUMNI TIMELINE EVOLUTION */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-black mb-6">The Growth Trajectory</h2>
              <p className="text-xl text-gray-400">How our alumni evolve over time.</p>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {TIMELINE.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="relative text-center md:text-left">
                    <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-4 border-[#050505]" />
                    <h3 className="text-blue-400 font-bold text-xl mb-2">{item.year}</h3>
                    <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. TOP ROLES ACHIEVED */}
        <section className="py-24 bg-[#0A0A0A] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black mb-4">Top Roles Achieved</h2>
              <p className="text-gray-400">The positions our alumni hold globally.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_ROLES.map((role, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GlassCard className="p-8 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {role.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                    <div className="space-y-3 mt-6">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Top Companies</div>
                        <div className="text-sm text-gray-300">{role.companies}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Growth Path</div>
                        <div className="text-sm text-blue-400 font-medium">{role.growth}</div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ACHIEVEMENTS WALL */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black mb-4">Alumni Achievements Wall</h2>
              <p className="text-gray-400">Quantifying the impact of our network.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((ach, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GlassCard className="p-8 flex items-start gap-6 hover:bg-white/10 transition-colors group">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                      {ach.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2">{ach.title}</h3>
                      <p className="text-gray-400 text-lg">{ach.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. MENTORSHIP NETWORK */}
        <section className="py-24 bg-gradient-to-b from-[#050505] to-[#0A0A0A] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black mb-6">Mentorship Network</h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">Alumni actively help current students navigate their careers.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {MENTORSHIP.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <GlassCard className="p-8 h-full hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all group">
                    <CheckCircle2 className="w-8 h-8 text-blue-500 mb-6 mx-auto group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Find a Mentor
            </button>
          </div>
        </section>

        {/* 8. INDUSTRY DEEP DIVE */}
        <section className="py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Alumni by Industry</h2>
              <p className="text-gray-400">Deep dive into where our graduates excel.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {INDUSTRIES.map((ind, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndustryTab(i)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeIndustryTab === i ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustryTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-10 text-center">
                  <h3 className="text-3xl font-black text-white mb-8">{INDUSTRIES[activeIndustryTab].name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="p-6 bg-black/50 rounded-2xl border border-white/5">
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Top Companies</div>
                      <div className="text-lg text-gray-200">{INDUSTRIES[activeIndustryTab].companies}</div>
                    </div>
                    <div className="p-6 bg-black/50 rounded-2xl border border-white/5">
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Common Roles</div>
                      <div className="text-lg text-blue-400">{INDUSTRIES[activeIndustryTab].roles}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 9. ADVICE WALL (Marquee) */}
        <section className="py-20 bg-blue-900/10 border-y border-blue-500/10 overflow-hidden">
          <div className="mb-12 text-center">
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase">Words of Wisdom</h2>
          </div>
          <div className="flex w-[300%] md:w-max">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }} className="flex gap-8 px-4">
              {[...QUOTES, ...QUOTES].map((quote, i) => (
                <div key={i} className="w-[85vw] sm:w-[350px] md:w-[500px] shrink-0">
                  <GlassCard className="p-8 border-blue-500/20">
                    <Quote className="w-8 h-8 text-blue-500 mb-6 opacity-50" />
                    <p className="text-lg md:text-xl font-medium text-gray-200 leading-relaxed">"{quote}"</p>
                  </GlassCard>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 10. IMPACT METRICS */}
        <section className="py-32 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Alumni Impact Metrics</h2>
              <p className="text-gray-400">The numbers behind the legacy.</p>
            </div>
            <div className="space-y-10">
              {METRICS.map((metric, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex justify-between text-lg font-bold mb-3">
                    <span className="text-white">{metric.label}</span>
                    <span className="text-gray-400">{metric.value}%</span>
                  </div>
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FINAL SUPER CTA */}
        <section className="py-40 relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 z-0" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-7xl font-black mb-8">
              Join a Network That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Opens Doors Worldwide.
              </span>
            </motion.h2>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-black text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Apply Now
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
                Connect with Alumni
              </button>
            </motion.div>
          </div>
        </section>

        {/* FULLSCREEN STORY MODAL */}
        <AnimatePresence>
          {selectedAlumni && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedAlumni(null)} />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl max-h-[90vh] bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
                <button onClick={() => setSelectedAlumni(null)} className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10">
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                  <img src={selectedAlumni.img} alt={selectedAlumni.name} className="absolute inset-0 w-full h-full object-cover filter grayscale" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent" />
                </div>

                <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-4 border border-blue-500/20">{selectedAlumni.tag}</div>
                    <h2 className="text-4xl md:text-5xl font-black mb-2">{selectedAlumni.name}</h2>
                    <p className="text-xl text-gray-300 font-medium">{selectedAlumni.role} @ <span className="text-white">{selectedAlumni.company}</span></p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">The Story</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">{selectedAlumni.story}</p>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-6">The Journey</h3>
                    <div className="space-y-6 relative">
                      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
                      {selectedAlumni.journey.map((step, i) => (
                        <div key={i} className="flex gap-6 relative z-10">
                          <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#111] shrink-0 mt-1" />
                          <div>
                            <div className="text-blue-400 font-bold text-sm mb-1">{step.year}</div>
                            <div className="text-white font-medium">{step.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Advice to Students</h3>
                    <p className="text-gray-200 italic">"{selectedAlumni.advice}"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
