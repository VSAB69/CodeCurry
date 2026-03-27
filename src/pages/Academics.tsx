import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { 
  Search, 
  Cpu, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  Settings, 
  Building2, 
  Microscope, 
  Activity, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  X,
  BookOpen,
  Users,
  LineChart,
  Code,
  Rocket
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

export type ProgramLevel = 'UG' | 'PG' | 'PhD';

export interface Department {
  id: string;
  name: string;
  level: ProgramLevel;
  category: 'Core' | 'Advanced' | 'Science' | 'Interdisciplinary' | 'Management' | 'Research';
  icon: React.ElementType;
  description: string;
  color: string;
  stats: {
    intake: string;
    duration: string;
    placement: string;
  };
  careers: string[];
}

export const DEPARTMENTS: Department[] = [
  // UG - Core
  { id: 'cse', name: 'Computer Science and Engineering', level: 'UG', category: 'Core', icon: Code, description: 'Foundational computing, algorithms, and software development.', color: 'from-blue-500 to-cyan-500', stats: { intake: '240', duration: '4 Years', placement: '98%' }, careers: ['Software Engineer', 'Systems Architect', 'Full Stack Developer'] },
  { id: 'ise', name: 'Information Science and Engineering', level: 'UG', category: 'Core', icon: Database, description: 'Information systems, data management, and network engineering.', color: 'from-indigo-500 to-blue-500', stats: { intake: '180', duration: '4 Years', placement: '96%' }, careers: ['Data Engineer', 'Cloud Architect', 'IT Consultant'] },
  { id: 'ece', name: 'Electronics and Communication', level: 'UG', category: 'Core', icon: Cpu, description: 'VLSI, embedded systems, and communication networks.', color: 'from-purple-500 to-pink-500', stats: { intake: '180', duration: '4 Years', placement: '94%' }, careers: ['VLSI Engineer', 'Network Specialist', 'IoT Developer'] },
  { id: 'eee', name: 'Electrical and Electronics', level: 'UG', category: 'Core', icon: Zap, description: 'Power systems, renewable energy, and control systems.', color: 'from-yellow-500 to-orange-500', stats: { intake: '120', duration: '4 Years', placement: '90%' }, careers: ['Power Engineer', 'Control Systems Engineer', 'Energy Analyst'] },
  { id: 'me', name: 'Mechanical Engineering', level: 'UG', category: 'Core', icon: Settings, description: 'Thermodynamics, manufacturing, and design engineering.', color: 'from-red-500 to-orange-500', stats: { intake: '120', duration: '4 Years', placement: '88%' }, careers: ['Design Engineer', 'Manufacturing Head', 'Automotive Engineer'] },
  { id: 'ce', name: 'Civil Engineering', level: 'UG', category: 'Core', icon: Building2, description: 'Structural design, urban planning, and infrastructure.', color: 'from-emerald-500 to-teal-500', stats: { intake: '120', duration: '4 Years', placement: '85%' }, careers: ['Structural Engineer', 'Urban Planner', 'Construction Manager'] },
  { id: 'ete', name: 'Electronics and Telecommunication', level: 'UG', category: 'Core', icon: Globe, description: 'Telecommunication networks, signal processing, and wireless tech.', color: 'from-violet-500 to-purple-500', stats: { intake: '60', duration: '4 Years', placement: '92%' }, careers: ['Telecom Engineer', 'RF Engineer', 'Network Analyst'] },
  { id: 'iem', name: 'Industrial Engineering and Management', level: 'UG', category: 'Core', icon: Briefcase, description: 'Operations research, supply chain, and industrial management.', color: 'from-amber-500 to-yellow-500', stats: { intake: '60', duration: '4 Years', placement: '90%' }, careers: ['Operations Manager', 'Supply Chain Analyst', 'Quality Engineer'] },

  // UG - Advanced
  { id: 'aids', name: 'Artificial Intelligence and Data Science', level: 'UG', category: 'Advanced', icon: Microscope, description: 'Deep learning, big data analytics, and AI systems.', color: 'from-fuchsia-500 to-pink-500', stats: { intake: '120', duration: '4 Years', placement: '100%' }, careers: ['Data Scientist', 'AI Researcher', 'ML Engineer'] },
  { id: 'aiml', name: 'Machine Learning (AI and ML)', level: 'UG', category: 'Advanced', icon: Activity, description: 'Predictive modeling, neural networks, and computer vision.', color: 'from-rose-500 to-red-500', stats: { intake: '60', duration: '4 Years', placement: '98%' }, careers: ['ML Engineer', 'Computer Vision Engineer', 'NLP Scientist'] },
  { id: 'cseds', name: 'CSE (Data Science)', level: 'UG', category: 'Advanced', icon: Database, description: 'Specialized computer science with focus on data engineering.', color: 'from-blue-600 to-indigo-600', stats: { intake: '60', duration: '4 Years', placement: '98%' }, careers: ['Data Engineer', 'Big Data Architect', 'Analytics Consultant'] },
  { id: 'cseiot', name: 'CSE (IoT and Cyber Security)', level: 'UG', category: 'Advanced', icon: Shield, description: 'Network security, cryptography, and connected devices.', color: 'from-emerald-600 to-green-600', stats: { intake: '60', duration: '4 Years', placement: '97%' }, careers: ['Security Analyst', 'IoT Architect', 'Penetration Tester'] },
  { id: 'csbs', name: 'Computer Science and Business Systems', level: 'UG', category: 'Advanced', icon: LineChart, description: 'TCS-designed curriculum blending tech and business acumen.', color: 'from-cyan-500 to-blue-500', stats: { intake: '60', duration: '4 Years', placement: '95%' }, careers: ['Business Analyst', 'Tech Consultant', 'Product Manager'] },

  // UG - Interdisciplinary
  { id: 'bt', name: 'Bio-Technology', level: 'UG', category: 'Interdisciplinary', icon: Microscope, description: 'Genetic engineering, bioinformatics, and bioprocesses.', color: 'from-green-500 to-emerald-500', stats: { intake: '60', duration: '4 Years', placement: '85%' }, careers: ['Biotechnologist', 'Clinical Researcher', 'Bioinformatics Analyst'] },
  { id: 'ml', name: 'Medical Electronics Engineering', level: 'UG', category: 'Interdisciplinary', icon: Activity, description: 'Healthcare tech, medical imaging, and diagnostic equipment.', color: 'from-rose-400 to-pink-500', stats: { intake: '60', duration: '4 Years', placement: '88%' }, careers: ['Biomedical Engineer', 'Clinical Engineer', 'Medical Device Designer'] },
  { id: 'che', name: 'Chemical Engineering', level: 'UG', category: 'Interdisciplinary', icon: Microscope, description: 'Process engineering, materials science, and thermodynamics.', color: 'from-orange-500 to-red-500', stats: { intake: '60', duration: '4 Years', placement: '85%' }, careers: ['Process Engineer', 'Materials Scientist', 'Chemical Plant Manager'] },
  { id: 'ae', name: 'Aerospace Engineering', level: 'UG', category: 'Interdisciplinary', icon: Rocket, description: 'Aerodynamics, propulsion, and spacecraft design.', color: 'from-slate-500 to-gray-700', stats: { intake: '60', duration: '4 Years', placement: '82%' }, careers: ['Aerospace Engineer', 'Propulsion Specialist', 'Avionics Engineer'] },

  // UG - Science
  { id: 'chem', name: 'Chemistry Department', level: 'UG', category: 'Science', icon: Microscope, description: 'Applied chemistry and materials research.', color: 'from-teal-500 to-emerald-500', stats: { intake: 'N/A', duration: 'Core', placement: 'N/A' }, careers: ['Researcher', 'Academic'] },
  { id: 'math', name: 'Mathematics Department', level: 'UG', category: 'Science', icon: LineChart, description: 'Applied mathematics, cryptography, and logic.', color: 'from-indigo-500 to-purple-500', stats: { intake: 'N/A', duration: 'Core', placement: 'N/A' }, careers: ['Data Analyst', 'Cryptographer'] },
  { id: 'phy', name: 'Physics Department', level: 'UG', category: 'Science', icon: Zap, description: 'Applied physics, quantum mechanics, and optics.', color: 'from-blue-500 to-indigo-500', stats: { intake: 'N/A', duration: 'Core', placement: 'N/A' }, careers: ['Research Scientist', 'Optics Engineer'] },

  // PG
  { id: 'mca', name: 'Computer Applications (MCA)', level: 'PG', category: 'Core', icon: Code, description: 'Advanced software development and application architecture.', color: 'from-blue-500 to-purple-500', stats: { intake: '60', duration: '2 Years', placement: '95%' }, careers: ['Software Developer', 'Systems Analyst', 'Web Architect'] },
  { id: 'mba', name: 'Management Studies (MBA)', level: 'PG', category: 'Management', icon: Briefcase, description: 'Business administration, finance, marketing, and HR.', color: 'from-amber-500 to-orange-500', stats: { intake: '120', duration: '2 Years', placement: '92%' }, careers: ['Business Manager', 'Financial Analyst', 'Marketing Director'] },
  { id: 'mtech', name: 'MTech Programs', level: 'PG', category: 'Core', icon: Settings, description: 'Specialized master degrees across various engineering disciplines.', color: 'from-slate-500 to-gray-500', stats: { intake: 'Varies', duration: '2 Years', placement: '90%' }, careers: ['Specialist Engineer', 'R&D Lead', 'Consultant'] },

  // PhD
  { id: 'phd-ai', name: 'PhD in AI/ML', level: 'PhD', category: 'Research', icon: Microscope, description: 'Advanced research in artificial intelligence and machine learning.', color: 'from-fuchsia-500 to-purple-500', stats: { intake: 'Limited', duration: '3-5 Years', placement: 'N/A' }, careers: ['Research Scientist', 'Professor', 'AI Director'] },
  { id: 'phd-ds', name: 'PhD in Data Science', level: 'PhD', category: 'Research', icon: Database, description: 'Research in big data, predictive modeling, and analytics.', color: 'from-blue-500 to-cyan-500', stats: { intake: 'Limited', duration: '3-5 Years', placement: 'N/A' }, careers: ['Chief Data Scientist', 'Academic Researcher'] },
  { id: 'phd-ece', name: 'PhD in Electronics', level: 'PhD', category: 'Research', icon: Cpu, description: 'Research in VLSI, nano-electronics, and communication.', color: 'from-pink-500 to-rose-500', stats: { intake: 'Limited', duration: '3-5 Years', placement: 'N/A' }, careers: ['Principal Engineer', 'R&D Head'] },
  { id: 'phd-me', name: 'PhD in Mechanical Systems', level: 'PhD', category: 'Research', icon: Settings, description: 'Research in advanced manufacturing, thermal systems, and robotics.', color: 'from-orange-500 to-red-500', stats: { intake: 'Limited', duration: '3-5 Years', placement: 'N/A' }, careers: ['Lead Researcher', 'Robotics Specialist'] },
  { id: 'phd-inter', name: 'Interdisciplinary Research', level: 'PhD', category: 'Research', icon: Globe, description: 'Cross-domain research combining multiple engineering fields.', color: 'from-emerald-500 to-teal-500', stats: { intake: 'Limited', duration: '3-5 Years', placement: 'N/A' }, careers: ['Innovation Lead', 'Research Director'] },
];

const LABS = [
  { name: "AI & Deep Learning Lab", desc: "Equipped with NVIDIA DGX systems for advanced model training.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { name: "Robotics & Automation", desc: "State-of-the-art KUKA robots and industrial automation setups.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" },
  { name: "VLSI Design Center", desc: "Cadence and Synopsys tools for chip design and verification.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
  { name: "Advanced Materials Lab", desc: "Scanning Electron Microscopes and material testing rigs.", img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop" }
];

import { useNavigate } from 'react-router-dom';

export function Academics() {
  const [activeLevel, setActiveLevel] = useState<ProgramLevel>('UG');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigate = useNavigate();
  
  const labsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll for labs
      const labsContainer = document.querySelector('.labs-container');
      if (labsContainer) {
        gsap.to(labsContainer, {
          x: () => -(labsContainer.scrollWidth - window.innerWidth + 40),
          ease: "none",
          scrollTrigger: {
            trigger: ".labs-section",
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }
    }, labsRef);

    return () => ctx.revert();
  }, []);

  const filteredDepartments = DEPARTMENTS.filter(dept => {
    const matchesLevel = dept.level === activeLevel;
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dept.category === activeCategory;
    
    return matchesLevel && matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(DEPARTMENTS.filter(d => d.level === activeLevel).map(d => d.category)))];

  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0A0A0A] z-10" />
          {/* Animated Particles/Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="text-gray-300 font-medium tracking-wider text-sm uppercase">Academic Ecosystem</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          >
            Explore Knowledge. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Build the Future.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            From foundational engineering to cutting-edge AI, discover programs designed for the next generation of innovators.
          </motion.p>
        </div>
      </section>

      {/* 2. PROGRAM LEVEL SWITCHER (STICKY) */}
      <section className="sticky top-20 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center gap-2 md:gap-4">
          {(['UG', 'PG', 'PhD'] as ProgramLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => {
                setActiveLevel(level);
                setActiveCategory('All');
              }}
              className={`relative px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-bold transition-colors ${
                activeLevel === level ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeLevel === level && (
                <motion.div
                  layoutId="activeLevelTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                {level === 'UG' ? 'Undergraduate (UG)' : level === 'PG' ? 'Postgraduate (PG)' : 'PhD / Research'}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3 & 4. SEARCH, FILTER & DEPARTMENTS GRID */}
      <section className="py-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search departments, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDepartments.map((dept) => (
                <motion.div
                  key={dept.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  onClick={() => navigate(`/academics/${dept.id}`)}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden hover:border-white/20 transition-all duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                >
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Glow Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-[-1px] rounded-3xl bg-gradient-to-br ${dept.color} [mask-image:linear-gradient(white,white)] [mask-composite:exclude] p-[1px]`} style={{ WebkitMaskComposite: 'xor' }} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg`}>
                        <dept.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium border border-white/5">
                        {dept.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {dept.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                      {dept.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors mt-auto">
                      Explore Program <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredDepartments.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                No departments found matching your criteria.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 5. LABS & RESEARCH SECTION (GSAP HORIZONTAL SCROLL) */}
      <section className="labs-section bg-black py-20 overflow-hidden" ref={labsRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">Innovation Labs</h2>
          <p className="text-gray-400 mt-4 text-lg">Where theory meets cutting-edge practice.</p>
        </div>
        
        <div className="pl-6 lg:pl-8">
          <div className="labs-container flex gap-8 w-max pb-10">
            {LABS.map((lab, i) => (
              <div key={i} className="w-[85vw] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] relative rounded-3xl overflow-hidden group shrink-0">
                <img src={lab.img} alt={lab.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{lab.name}</h3>
                  <p className="text-gray-300">{lab.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GLOBAL RELEVANCE SECTION */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Designed for the Future of Engineering</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
            Our curriculum is continuously updated in collaboration with industry leaders to ensure global relevance and impact.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Industry Collaboration", desc: "Partnerships with Fortune 500 tech companies for curriculum design and internships.", icon: Building2 },
              { title: "Research Impact", desc: "Over 1000+ research papers published annually in high-impact international journals.", icon: Globe },
              { title: "Innovation Focus", desc: "Dedicated incubation centers supporting student startups and patents.", icon: Zap }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-blue-900/20 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Find Your Path. <br/> Build Your Future.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-black font-bold rounded-full text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 text-white font-bold rounded-full text-lg border border-white/20 flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              Download Brochure
            </motion.button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN MODAL FOR DEPARTMENT DETAILS REMOVED IN FAVOR OF NAVIGATION */}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </PageTransition>
  );
}
