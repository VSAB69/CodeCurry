import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import {
    Map, BookOpen, FlaskConical, Home, Dumbbell, Coffee,
    HeartPulse, Users, Moon, Sun, ArrowRight, ChevronRight,
    MonitorPlay, Cpu, Wrench, Building2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CampusLife() {
    const [isNightMode, setIsNightMode] = useState(false);
    const { scrollYProgress } = useScroll();
    const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP Animations for sections
        const sections = gsap.utils.toArray('.reveal-section');
        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <PageTransition>
            <div
                ref={containerRef}
                className={`min-h-screen transition-colors duration-1000 ${isNightMode ? 'bg-[#050505] text-white' : 'bg-[#0A0A0A] text-white'
                    } overflow-hidden selection:bg-blue-500/30`}
            >
                {/* Day/Night Toggle (Sticky) */}
                <div className="fixed top-24 right-6 z-50">
                    <button
                        onClick={() => setIsNightMode(!isNightMode)}
                        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 ${isNightMode
                            ? 'bg-white/10 border-white/20 text-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.2)]'
                            : 'bg-black/50 border-white/10 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                            }`}
                    >
                        {isNightMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </button>
                </div>

                {/* 1. HERO - "ENTER THE CAMPUS" */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div style={{ y: yBackground, opacity: opacityHero }} className="absolute inset-0 z-0">
                        <div className={`absolute inset-0 transition-colors duration-1000 ${isNightMode ? 'bg-black/80' : 'bg-black/40'} z-10`} />
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            poster="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361119.webp"
                        >
                            <source src="https://cdn.pixabay.com/video/2021/08/11/84687-587865245_large.mp4" type="video/mp4" />
                        </video>
                        {/* Overlay Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
                    </motion.div>

                    <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
                                Experience Life <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500">
                                    at BMSCE
                                </span>
                            </h1>
                            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto mt-8">
                                An 11-acre urban campus where innovation meets culture, community, and growth.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
                    >
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll to Explore</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent" />
                    </motion.div>
                </section>

                {/* 2. INTERACTIVE CAMPUS MAP */}
                <section className="py-32 relative z-20 bg-black">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16 reveal-section">
                            <h2 className="text-4xl md:text-6xl font-black mb-6">Explore the Campus</h2>
                            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Take a virtual tour of our state-of-the-art facilities and vibrant spaces.</p>
                        </div>

                        <div className="relative w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm reveal-section">
                            <iframe
                                src="https://www.easytourz.com/BT-EmabedTour/all/4f169a745c0555c0"
                                width="100%"
                                height="600"
                                frameBorder="0"
                                allowFullScreen={true}
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                className="w-full h-[500px] md:h-[600px] border-none"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* 3. ACADEMIC BUILDINGS */}
                <section className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="mb-16 reveal-section">
                            <h2 className="text-4xl md:text-5xl font-black mb-4">Engineering Blocks</h2>
                            <p className="text-gray-400 text-lg">Where theoretical knowledge meets practical application.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "CSE / IS Block", desc: "Smart classrooms & advanced computing labs.", icon: MonitorPlay, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" },
                                { title: "Mechanical Block", desc: "Heavy machinery, CAD/CAM and robotics workshops.", icon: Wrench, img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" },
                                { title: "Civil Block", desc: "Material testing, surveying and structural labs.", icon: Building2, img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop" },
                                { title: "Electrical Block", desc: "Power electronics, micro-devices and circuits.", icon: Cpu, img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop" }
                            ].map((block, i) => (
                                <motion.div
                                    key={i}
                                    className="group relative h-96 rounded-3xl overflow-hidden reveal-section cursor-pointer"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="absolute inset-0 bg-black">
                                        <img src={block.img} alt={block.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 group-hover:bg-blue-500/50 transition-colors">
                                            <block.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{block.title}</h3>
                                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{block.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. CENTRAL LIBRARY */}
                <section className="py-32 relative bg-[#080808] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.bmsca.org/assets/images/portfolio/library/4.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/30 rounded-full"
                                animate={{
                                    y: ['-100%', '1000%'],
                                    x: Math.sin(i) * 50,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 5
                                }}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * -20}%`
                                }}
                            />
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="reveal-section">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                                    <BookOpen className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">1.1 Acre Knowledge Hub</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">Central Library</h2>
                                <p className="text-xl text-gray-400 mb-8 font-light leading-relaxed">
                                    A sanctuary of silence and knowledge. Housing over 150,000 books, 14,500+ e-books, and 7000+ journals, it's the academic heart of BMSCE.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        "Silent Study Halls", "Digital Library", "Research Journals", "Group Discussion Rooms"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. LABS & INNOVATION */}
                <section className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-section">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">Labs & Innovation</h2>
                                <p className="text-gray-400 text-lg">130+ state-of-the-art laboratories across departments.</p>
                            </div>
                            <div className="mt-6 md:mt-0 flex items-center gap-2 text-blue-400 font-medium">
                                <span>Scroll to explore</span> <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
                            {[
                                { title: "AI & Machine Learning Lab", desc: "High-performance computing clusters for deep learning models.", color: "blue", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
                                { title: "Robotics & Automation", desc: "Industrial robotic arms and automation control systems.", color: "purple", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" },
                                { title: "Power Electronics", desc: "Advanced testing equipment for electrical systems.", color: "emerald", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2070&auto=format&fit=crop" },
                                { title: "Material Testing", desc: "Heavy-duty civil engineering testing infrastructure.", color: "orange", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" }
                            ].map((lab, i) => (
                                <motion.div
                                    key={i}
                                    className="min-w-[350px] md:min-w-[450px] h-[500px] rounded-3xl relative overflow-hidden snap-center group cursor-pointer"
                                    whileHover={{ scale: 0.98 }}
                                >
                                    <img src={lab.img} alt={lab.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />

                                    {/* Scanner Effect on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${lab.color}-500/20 to-transparent h-20 -translate-y-full group-hover:animate-scan`} />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className={`w-12 h-1 h-1 bg-${lab.color}-500 mb-6 rounded-full`} />
                                        <h3 className="text-3xl font-bold text-white mb-3">{lab.title}</h3>
                                        <p className="text-gray-300">{lab.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. HOSTELS */}
                <section className="py-32 relative bg-black border-y border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1)_0%,transparent_50%)]" />
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-20 reveal-section">
                            <h2 className="text-4xl md:text-6xl font-black mb-6">Your Home Away From Home</h2>
                            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Accommodating ~2900 students with modern amenities, 24/7 security, and a vibrant community life.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
                            {/* Main Image Area */}
                            <div className="lg:col-span-8 rounded-3xl overflow-hidden relative group">
                                <img src="https://content3.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.170901133203.v7b3/catalogue/bmsce-hostel-hanumantha-nagar-bangalore-35od262q2a.jpg" alt="Hostel" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 backdrop-blur-md mb-4">
                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-xs font-bold text-orange-400 uppercase">Premium Living</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Main Hostel Blocks</h3>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="lg:col-span-4 flex flex-col gap-4">
                                {[
                                    { title: "Room Types", desc: "Single, Twin, and Triple sharing available.", img: "https://content3.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.170901133203.v7b3/catalogue/bmsce-hostel-hanumantha-nagar-bangalore-94en6ooecf.jpg" },
                                    { title: "Dining & Mess", desc: "Centralized kitchen serving hygienic, nutritious meals.", img: "https://content3.jdmagicbox.com/v2/comp/bangalore/r3/080pxx80.xx80.170906203243.w2r3/catalogue/bms-hostel-banashankari-bangalore-hostels-hsjq80l402.jpg" },
                                    { title: "Amenities", desc: "Wi-Fi, 24/7 Power, Gym, TV Lounges, Study Rooms.", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer">
                                        <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                                        <div className="absolute inset-0 p-6 flex flex-col justify-center">
                                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{feature.title}</h4>
                                            <p className="text-sm text-gray-300">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. SPORTS & 8. CAFETERIA */}
                <section className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                            {/* Sports */}
                            <div className="reveal-section">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                        <Dumbbell className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h2 className="text-4xl font-black">Sports Complex</h2>
                                </div>
                                <p className="text-gray-400 mb-8">Indoor stadium, multi-gym, and extensive outdoor facilities for holistic development.</p>

                                <div className="grid grid-cols-2 gap-4">
                                    {["Cricket", "Football", "Basketball", "Tennis", "Swimming", "Indoor Stadium"].map((sport, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-red-500/10 hover:border-red-500/30 transition-colors cursor-pointer group">
                                            <div className="w-2 h-2 rounded-full bg-red-500/50 group-hover:bg-red-500 group-hover:scale-150 transition-all" />
                                            <span className="font-medium text-gray-300 group-hover:text-white">{sport}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cafeteria */}
                            <div className="reveal-section">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                        <Coffee className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <h2 className="text-4xl font-black">Cafeteria & Social</h2>
                                </div>
                                <p className="text-gray-400 mb-8">Vibrant food courts and hangout zones serving diverse, hygienic meals and snacks.</p>

                                <div className="relative h-64 rounded-3xl overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" alt="Cafeteria" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    {/* Floating Steam Animation */}
                                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">Main Food Court</h4>
                                            <p className="text-sm text-gray-300">Multi-cuisine dining hall</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <ChevronRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 9. HEALTHCARE & 10. CLUBS */}
                <section className="py-32 relative bg-black border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Healthcare */}
                            <div className="lg:col-span-1 rounded-3xl bg-white/5 border border-white/10 p-8 reveal-section hover:bg-white/10 transition-colors">
                                <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                                    <HeartPulse className="w-7 h-7 text-pink-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">BMS Hospital</h3>
                                <p className="text-gray-400 mb-6">On-campus healthcare facility providing emergency services, OPD, radiology, and labs for students and staff.</p>
                                <ul className="space-y-3">
                                    {["24/7 Emergency", "Specialist OPD", "Diagnostic Labs"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-pink-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Clubs & Culture */}
                            <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 p-8 reveal-section relative overflow-hidden group">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full group-hover:bg-purple-500/40 transition-colors duration-700" />

                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <Users className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold">Clubs, Fests & Culture</h3>
                                        <p className="text-gray-400">A thriving ecosystem of student-led initiatives.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                    {[
                                        { title: "Technical Clubs", desc: "Robotics, Coding, IEEE, AeroBMS" },
                                        { title: "Cultural Fests", desc: "Utsav - One of Bangalore's biggest fests" },
                                        { title: "Hackathons", desc: "24-hour coding challenges & ideathons" },
                                        { title: "Social Initiatives", desc: "NSS, NCC, and Rotaract Club" }
                                    ].map((club, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/50 transition-colors">
                                            <h4 className="text-lg font-bold text-purple-300 mb-1">{club.title}</h4>
                                            <p className="text-sm text-gray-400">{club.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 11. CAMPUS ATMOSPHERE (SPLIT SCREEN) */}
                <section className="h-[70vh] flex flex-col md:flex-row">
                    <div className="flex-1 relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop" alt="Bangalore City" className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <h3 className="text-3xl md:text-5xl font-black text-white/50 group-hover:text-white transition-colors duration-700">Busy Outside</h3>
                            <p className="text-gray-400 mt-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700">Located in the heart of Bangalore's tech hub.</p>
                        </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden group">
                        <img src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361119.webp" alt="Campus Calm" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <h3 className="text-3xl md:text-5xl font-black text-white">Calm Inside</h3>
                            <p className="text-white/80 mt-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700">A serene, green oasis dedicated to learning.</p>
                        </div>
                    </div>
                </section>

                {/* 13. FINAL CTA */}
                <section className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent z-0" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-emerald-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center reveal-section">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                            This isn't just a campus. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">It's your next home.</span>
                        </h2>

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
                                className="px-10 py-5 bg-white/5 text-white font-bold rounded-full text-lg border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md"
                            >
                                Explore Academics
                            </motion.button>
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
}

// CheckCircle2 icon since it wasn't imported from lucide-react in the original list
function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
