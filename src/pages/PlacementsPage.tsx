import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import {
  TrendingUp,
  Briefcase,
  Globe,
  Award,
  Users,
  BookOpen,
  Target,
  CheckCircle2,
  Play,
  ArrowRight,
  MapPin,
  Building2,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import {
  BarChart, Bar, Cell, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

const DOMAIN_DATA = [
  { name: 'CSE', students: 164, color: '#3b82f6' },
  { name: 'AI/ML', students: 54, color: '#8b5cf6' },
  { name: 'ECE', students: 120, color: '#ec4899' },
  { name: 'Civil', students: 41, color: '#10b981' },
  { name: 'Mech', students: 65, color: '#f59e0b' },
  { name: 'Others', students: 85, color: '#64748b' },
];

const PACKAGE_DISTRIBUTION = [
  { range: '3-6 LPA', count: 350 },
  { range: '6-12 LPA', count: 420 },
  { range: '12-20 LPA', count: 150 },
  { range: '20+ LPA', count: 48 },
];

const COMPANIES = [
  "Amazon", "Microsoft", "Adobe", "Oracle", "IBM", "Accenture", "Bosch",
  "Goldman Sachs", "Morgan Stanley", "Samsung", "Cisco", "Intel", "TCS", "Infosys", "Wipro"
];

const PROCESS_STEPS = [
  { title: "Aptitude & Soft Skills", desc: "Rigorous training starting from the 6th semester to build foundational problem-solving skills.", icon: BookOpen },
  { title: "Technical Rounds", desc: "Mock coding tests and domain-specific technical interviews with industry experts.", icon: CodeIcon },
  { title: "HR Interviews", desc: "Personality development, resume building, and mock HR sessions.", icon: Users },
  { title: "The Offer", desc: "Securing the dream job with top-tier compensation packages.", icon: Award }
];

function CodeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

export function PlacementsPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Counter Animation
    const counters = document.querySelectorAll('.gsap-counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const isFloat = target % 1 !== 0;

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            ease: "power3.out",
            snap: { innerHTML: isFloat ? 0.1 : 1 },
            onUpdate: function () {
              if (counter) {
                const val = Number(this.targets()[0].innerHTML);
                counter.innerHTML = isFloat ? val.toFixed(1) : Math.round(val).toString();
              }
            }
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#0A0A0A] min-h-screen text-white overflow-hidden selection:bg-blue-500/30">

        {/* 1. HERO (CINEMATIC ENTRY) */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: yBackground, opacity: opacityHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              poster="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            >
              <source src="https://cdn.pixabay.com/video/2020/05/25/40131-424911735_large.mp4" type="video/mp4" />
            </video>
            {/* Cyberpunk Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
          </motion.div>

          <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">2025 Placement Season Live</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
                From Campus to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                  Corporate Giants
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto mt-8">
                Where talent meets opportunity — and careers are launched.
              </p>
            </motion.div>

            {/* Floating Numbers */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-1 hidden lg:block p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 rotate-[-10deg]"
            >
              <div className="text-2xl font-bold text-green-400">₹51.5 LPA</div>
              <div className="text-xs text-gray-500 uppercase">Highest Package</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-5 hidden lg:block p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 rotate-[10deg]"
            >
              <div className="text-2xl font-bold text-blue-400">1307+</div>
              <div className="text-xs text-gray-500 uppercase">Total Offers</div>
            </motion.div>
          </div>
        </section>

        {/* 2. LIVE STATS WALL (INSANE VISUAL) */}
        <section className="py-24 relative z-20 -mt-20" ref={statsRef}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Highest Package", value: 51.5, prefix: "₹", suffix: " LPA", color: "from-green-500/20 to-emerald-500/5", text: "text-green-400" },
                { label: "Average Package", value: 11.4, prefix: "₹", suffix: " LPA", color: "from-blue-500/20 to-cyan-500/5", text: "text-blue-400" },
                { label: "Companies Visited", value: 383, prefix: "", suffix: "+", color: "from-purple-500/20 to-pink-500/5", text: "text-purple-400" },
                { label: "Total Offers", value: 1307, prefix: "", suffix: "", color: "from-orange-500/20 to-red-500/5", text: "text-orange-400" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative p-8 rounded-3xl bg-gradient-to-b ${stat.color} border border-white/10 backdrop-blur-xl overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                  <div className="relative z-10">
                    <div className="text-sm text-gray-400 uppercase tracking-wider mb-4 font-medium">{stat.label}</div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${stat.text}`}>{stat.prefix}</span>
                      <span className={`text-6xl font-black text-white gsap-counter`} data-target={stat.value}>0</span>
                      <span className={`text-xl font-bold ${stat.text}`}>{stat.suffix}</span>
                    </div>
                  </div>
                  {/* Hover Glow */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-${stat.text.split('-')[1]}-500/30 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TOP RECRUITERS (INSANE LOGO WALL) */}
        <section className="py-20 bg-black border-y border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">Trusted by Industry Leaders</h2>

          <div className="relative w-full flex flex-col gap-8">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="flex whitespace-nowrap animate-marquee items-center">
              {[...COMPANIES, ...COMPANIES].map((company, i) => (
                <div key={i} className="mx-8 group relative cursor-pointer">
                  <div className="text-4xl md:text-6xl font-black text-white/10 transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    {company}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex whitespace-nowrap animate-marquee-reverse items-center">
              {[...COMPANIES, ...COMPANIES].reverse().map((company, i) => (
                <div key={i} className="mx-8 group relative cursor-pointer">
                  <div className="text-4xl md:text-6xl font-black text-white/10 transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    {company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. DOMAIN-WISE PLACEMENTS & 14. PACKAGE DISTRIBUTION */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Domain Wise */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-8">Domain-wise Placements</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DOMAIN_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#fff', fontSize: 12 }} width={60} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                      <Bar dataKey="students" radius={[0, 4, 4, 0]} animationDuration={1500}>
                        {DOMAIN_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Package Distribution */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-8">Package Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PACKAGE_DISTRIBUTION}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="count"
                        animationDuration={1500}
                      >
                        {PACKAGE_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {PACKAGE_DISTRIBUTION.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][idx % 4] }} />
                      <span className="text-gray-400">{item.range}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 15. PLACEMENT ECOSYSTEM (FLOW DIAGRAM) */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black mb-16">The Placement Ecosystem</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {[
                { icon: GraduationCap, label: "Student" },
                { icon: Target, label: "Training" },
                { icon: Briefcase, label: "Internship" },
                { icon: Building2, label: "Placement" },
                { icon: TrendingUp, label: "Growth" }
              ].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300 relative">
                      <step.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      {/* Glow */}
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-bold text-gray-300">{step.label}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "auto" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.1, duration: 0.5 }}
                      className="hidden md:block w-16 h-[2px] bg-gradient-to-r from-blue-500/20 to-purple-500/50 relative"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-purple-500/50" />
                    </motion.div>
                  )}
                  {i < arr.length - 1 && (
                    <div className="md:hidden h-8 w-[2px] bg-gradient-to-b from-blue-500/20 to-purple-500/50 my-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 6. NEW PLACEMENT PROCESS (ZIG-ZAG TIMELINE) */}
        <section className="py-32 relative bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6">The Placement Journey</h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">A structured path from preparation to securing your dream job.</p>
            </div>

            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />

              {/* Glowing Line Progress (Animated via CSS/Framer) */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 -translate-x-1/2 hidden md:block origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              <div className="space-y-12 md:space-y-0">
                {[
                  { title: "Preparation Phase", desc: "Rigorous training starting from the 6th semester.", points: ["Aptitude Training", "Resume Building", "Mock Interviews"], icon: BookOpen, color: "blue" },
                  { title: "Aptitude & Coding Tests", desc: "First round of screening by top recruiters.", points: ["Quantitative Analysis", "Logical Reasoning", "DSA Challenges"], icon: CodeIcon, color: "purple" },
                  { title: "Technical Interviews", desc: "Domain-specific evaluation by industry experts.", points: ["System Design", "Core Subjects", "Project Discussion"], icon: Target, color: "pink" },
                  { title: "HR / Final Round", desc: "Behavioral and cultural fitment assessment.", points: ["Communication Skills", "Leadership Traits", "Company Fit"], icon: Users, color: "orange" },
                  { title: "Offer & Onboarding", desc: "Securing the dream job with top-tier compensation.", points: ["Salary Negotiation", "Offer Acceptance", "Pre-joining Sessions"], icon: Award, color: "emerald" }
                ].map((step, i) => (
                  <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between md:h-64 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block w-5/12" />

                    {/* Center Node */}
                    <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 rounded-full bg-black border-4 border-[#0A0A0A] z-10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <div className={`w-8 h-8 rounded-full bg-${step.color}-500/20 flex items-center justify-center`}>
                        <span className={`text-${step.color}-400 font-bold text-sm`}>0{i + 1}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.02, rotateY: i % 2 === 0 ? -5 : 5 }}
                      className="w-full md:w-5/12 pl-16 md:pl-0 perspective-1000"
                    >
                      <div className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-${step.color}-500/50 transition-colors`}>
                        <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${step.color}-500/10 rounded-full blur-3xl group-hover:bg-${step.color}-500/20 transition-colors`} />

                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl bg-${step.color}-500/10 text-${step.color}-400`}>
                            <step.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        </div>

                        <p className="text-gray-400 mb-6">{step.desc}</p>

                        <ul className="space-y-2">
                          {step.points.map((point, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${step.color}-400`} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. TRAINING & 8. INTERNSHIPS */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Training */}
              <div>
                <h2 className="text-4xl font-black mb-12">Training & Preparation</h2>
                <div className="space-y-6">
                  {[
                    { title: "Aptitude Training", desc: "Quantitative, logical, and verbal reasoning modules." },
                    { title: "Mock Interviews", desc: "1-on-1 sessions with alumni and industry experts." },
                    { title: "Coding Practice", desc: "Competitive programming and DSA bootcamps." },
                    { title: "Resume Building", desc: "Crafting ATS-friendly, impactful resumes." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Internships */}
              <div>
                <h2 className="text-4xl font-black mb-12">Internships to PPOs</h2>
                <div className="relative h-full min-h-[400px] rounded-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 p-10 overflow-hidden flex flex-col justify-center">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                  <div className="relative z-10 text-center">
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                      775+
                    </div>
                    <div className="text-2xl font-bold text-white mb-8">Internship Offers (2024-25)</div>

                    <div className="flex flex-col gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-purple-400 font-bold">Step 1:</span> Secure 6-month industry internship
                      </div>
                      <div className="w-[2px] h-6 bg-purple-500/50 mx-auto" />
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-pink-400 font-bold">Step 2:</span> Perform and deliver real-world impact
                      </div>
                      <div className="w-[2px] h-6 bg-pink-500/50 mx-auto" />
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/50 backdrop-blur-md font-bold text-white">
                        Result: Pre-Placement Offer (PPO)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 13. DEPARTMENT INSIGHTS (EXPANDABLE) */}
        <section className="py-20 bg-black/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center mb-12">Department Insights</h2>
            <div className="space-y-4">
              {[
                { dept: "Computer Science (CSE)", insight: "Highest number of offers. Top recruiters include Microsoft, Amazon, and Adobe. Average package stands at ₹14.5 LPA." },
                { dept: "Electronics (ECE)", insight: "Strong core placements with companies like Intel, Texas Instruments, and Bosch. Growing trend in IoT and VLSI roles." },
                { dept: "Mechanical (ME)", insight: "Stable growth with core manufacturing and automotive giants like Volvo, Toyota, and L&T." },
                { dept: "Emerging Tech (AI/ML)", insight: "100% placement rate for the first graduating batch with specialized roles in Data Science and ML Engineering." }
              ].map((item, i) => (
                <ExpandableCard key={i} title={item.dept} content={item.insight} />
              ))}
            </div>
          </div>
        </section>

        {/* 16. FINAL CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Your Career <br /> Starts Here.</h2>
            <p className="text-xl text-gray-400 mb-12">Join the legacy of excellence and secure your future with BMSCE.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-black font-bold rounded-full text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

// Helper Component for Expandable Sections
function ExpandableCard({ title, content }: { title: string, content: string, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-xl font-bold text-white">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
