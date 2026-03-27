import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  ChevronDown, 
  GraduationCap, 
  Building2, 
  Users, 
  FileCheck, 
  IndianRupee, 
  BookOpen, 
  Award 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const SEAT_DATA = [
  { name: 'KCET (Govt. Quota)', value: 45, color: '#3b82f6' },
  { name: 'COMEDK (Private Quota)', value: 30, color: '#8b5cf6' },
  { name: 'Management Quota', value: 25, color: '#10b981' },
];

const EXAMS = [
  { 
    title: 'KCET', 
    desc: 'Karnataka Common Entrance Test for state domiciles.', 
    icon: FileText, 
    colorClass: 'text-blue-400', 
    bgClass: 'from-blue-500/10' 
  },
  { 
    title: 'COMEDK', 
    desc: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka.', 
    icon: BookOpen, 
    colorClass: 'text-purple-400', 
    bgClass: 'from-purple-500/10' 
  },
  { 
    title: 'JEE Main', 
    desc: 'Accepted for specific quotas and supernumerary seats.', 
    icon: Award, 
    colorClass: 'text-emerald-400', 
    bgClass: 'from-emerald-500/10' 
  },
  { 
    title: 'PGCET / GATE', 
    desc: 'For M.Tech and MBA postgraduate admissions.', 
    icon: GraduationCap, 
    colorClass: 'text-orange-400', 
    bgClass: 'from-orange-500/10' 
  },
];

const FAQS = [
  { 
    q: "What is the minimum eligibility for B.Tech?", 
    a: "Candidates must have passed 10+2 with a minimum of 45% marks in Physics, Mathematics, and Chemistry/Biology/Computer Science (40% for reserved categories)." 
  },
  { 
    q: "Does BMSCE offer direct admission?", 
    a: "Yes, direct admission is possible through the Management Quota. However, seats are limited and subject to specific criteria." 
  },
  { 
    q: "What is the fee structure for COMEDK students?", 
    a: "The tuition fee for students admitted through COMEDK is approximately ₹2,01,960 per year, excluding hostel and other miscellaneous fees." 
  },
  { 
    q: "Are hostel facilities available?", 
    a: "Yes, BMSCE provides excellent hostel facilities for both boys and girls. The approximate fee is ₹1.2L per year." 
  }
];

const DOCUMENTS = [
  "10th & 12th Marksheets",
  "Entrance Exam Scorecard",
  "Transfer Certificate (TC)",
  "Migration Certificate",
  "Passport Size Photographs",
  "Identity Proof (Aadhar/Passport)"
];

export function Admissions() {
  const [activePath, setActivePath] = useState('UG');
  const [eligibilityResult, setEligibilityResult] = useState<null | boolean>(null);
  const [pcmScore, setPcmScore] = useState('');
  const [category, setCategory] = useState('general');
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.process-step');
      
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top center",
        end: "bottom center",
        animation: gsap.fromTo('.process-line-fill', 
          { height: "0%" }, 
          { height: "100%", ease: "none" }
        ),
        scrub: 1,
      });

      steps.forEach((step: any, i) => {
        gsap.fromTo(step, 
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { 
            opacity: 1, 
            x: 0, 
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseFloat(pcmScore);
    if (isNaN(score)) return;
    
    const required = category === 'reserved' ? 40 : 45;
    setEligibilityResult(score >= required);
  };

  return (
    <PageTransition>
      {/* 1. HERO (HIGH EMOTION ENTRY) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#0A0A0A] z-10" />
          <img 
            src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp" 
            alt="BMSCE Campus" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">Admissions 2024-25</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          >
            Your Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
              Starts Here
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            Join one of India’s top engineering institutions through a competitive, merit-based admission process.
          </motion.p>
        </div>
      </section>

      {/* 2. ADMISSION PATH SELECTOR */}
      <section className="py-20 bg-[#0A0A0A] relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['UG', 'PG', 'PhD'].map((path) => (
              <button
                key={path}
                onClick={() => setActivePath(path)}
                className={`relative px-8 py-4 rounded-2xl text-lg font-bold transition-colors ${
                  activePath === path ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {activePath === path && (
                  <motion.div
                    layoutId="activePath"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {path === 'UG' ? 'Undergraduate (B.E.)' : path === 'PG' ? 'Postgraduate (M.Tech/MBA)' : 'Doctoral (PhD)'}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePath}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activePath === 'UG' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">B.E. Admissions</h3>
                      <p className="text-gray-400 mb-6">100% entrance-based admissions for 14+ undergraduate engineering programs.</p>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 className="text-blue-400 w-5 h-5" /> 45% in 10+2 (PCM)
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 className="text-blue-400 w-5 h-5" /> KCET / COMEDK Mandatory
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 className="text-blue-400 w-5 h-5" /> 4 Years Duration
                        </li>
                      </ul>
                    </div>
                    <div className="bg-black/50 rounded-2xl p-6 border border-white/5">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-400" /> Eligibility Checker
                      </h4>
                      <form onSubmit={checkEligibility} className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Category</label>
                          <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="general">General (45% required)</option>
                            <option value="reserved">SC/ST/OBC (40% required)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">12th PCM Percentage</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={pcmScore}
                            onChange={(e) => setPcmScore(e.target.value)}
                            placeholder="e.g. 85.5"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            required
                          />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
                          Check Eligibility
                        </button>
                      </form>
                      {eligibilityResult !== null && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`mt-4 p-4 rounded-xl text-center font-bold ${
                            eligibilityResult 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {eligibilityResult ? '🎉 You are eligible to apply!' : '⚠️ Minimum percentage criteria not met.'}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
                
                {activePath !== 'UG' && (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold text-white mb-2">{activePath} Admissions</h3>
                    <p className="text-gray-400">
                      Detailed guidelines for {activePath} admissions will be updated shortly. Please refer to PGCET/GATE notifications.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. EXAM BREAKDOWN */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Accepted Exams</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We accept scores from major state and national level entrance examinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXAMS.map((exam, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${exam.bgClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <exam.icon className={`w-12 h-12 ${exam.colorClass} mb-6`} />
                <h3 className="text-2xl font-bold text-white mb-3">{exam.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{exam.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADMISSION PROCESS FLOW (GSAP) */}
      <section className="py-32 bg-[#0A0A0A] overflow-hidden" ref={processRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-24 text-center">The Process</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full" />
            <div className="process-line-fill absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 md:-translate-x-1/2 rounded-full" />

            {[
              { step: "01", title: "Application", desc: "Register and submit your application through the official portal." },
              { step: "02", title: "Entrance Exam", desc: "Appear for KCET, COMEDK, or relevant entrance tests." },
              { step: "03", title: "Counseling", desc: "Participate in the centralized counseling process based on your rank." },
              { step: "04", title: "Seat Allotment", desc: "Report to the college with allotted seat order and original documents." }
            ].map((item, i) => (
              <div key={i} className={`process-step relative flex items-center justify-between mb-24 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-black border-4 border-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xl z-10 md:-translate-x-1/2 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  {item.step}
                </div>
                <div className={`w-full md:w-5/12 pl-24 md:pl-0 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DATA VISUALIZATION: SEATS & FEES */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Seat Distribution */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Seat Distribution</h2>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SEAT_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {SEAT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Merit Based</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {SEAT_DATA.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-300">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees Breakdown */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Fee Structure (Approx.)</h2>
              <div className="space-y-4">
                {[
                  { title: "KCET Quota", fee: "₹58,806", period: "per year", icon: Building2 },
                  { title: "COMEDK Quota", fee: "₹2,01,960", period: "per year", icon: Users },
                  { title: "Hostel & Mess", fee: "₹1,20,000", period: "per year", icon: IndianRupee },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">Tuition & Misc.</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{item.fee}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{item.period}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-6">* Fees are indicative and subject to change as per VTU and Govt. of Karnataka guidelines.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. DOCUMENTS REQUIRED (Hover Flip Cards) */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Documents Required</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DOCUMENTS.map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center gap-4 transition-colors cursor-default"
              >
                <FileCheck className="w-8 h-8 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">{doc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900/20 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Ready to Build <br/> Your Future?</h2>
          <p className="text-xl text-gray-400 mb-12">Take the first step towards a world-class engineering education.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black font-bold rounded-full text-xl flex items-center gap-4 mx-auto hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all"
          >
            Apply Now <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>
    </PageTransition>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-bold text-white text-lg">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 text-gray-400"
          >
            <div className="pb-5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
