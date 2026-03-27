import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ArrowRight, BookOpen, Users, Globe, Award, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function Counter({ to, suffix = "", duration = 2 }: { to: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * to));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function About() {
  return (
    <PageTransition>
      <div className="bg-[#0A0A0A] text-white font-sans min-h-screen selection:bg-blue-500/30">

        {/* 1. HERO SECTION */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <img
            src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361119.webp"
            alt="BMSCE Campus"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0A0A0A]" />
          <motion.div
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              About BMS College of Engineering
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              A premier engineering institution shaping future innovators since 1946
            </p>
          </motion.div>
        </section>

        {/* 2. OVERVIEW */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">A Legacy of Excellence</h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Founded in 1946, BMS College of Engineering (BMSCE) is one of India's first private engineering colleges. Located in the heart of Bangalore, the IT capital of India, BMSCE has been at the forefront of technical education for over seven decades.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Our institution is dedicated to producing highly skilled engineers and leaders who contribute to the technological and socio-economic development of the nation and the world.
              </p>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <img
                src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp"
                alt="BMSCE Campus Building"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          </div>
        </section>

        {/* 3. HISTORY & LEGACY */}
        <section className="py-24 bg-[#050505] px-6 lg:px-8 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">History & Legacy</h2>
              <p className="text-lg text-gray-400">A timeline of our growth and key milestones.</p>
            </motion.div>

            <div className="space-y-12">
              {[
                { year: "1946", title: "Foundation", desc: "Established by Late Sri. B. M. Sreenivasaiah, a visionary and philanthropist." },
                { year: "2008", title: "Autonomous Status", desc: "Granted academic autonomy by UGC, allowing for innovative curriculum design." },
                { year: "2013", title: "TEQIP Institution", desc: "Recognized under the Technical Education Quality Improvement Programme." },
                { year: "2023", title: "Diamond Jubilee & Beyond", desc: "Continuing to set benchmarks in engineering education and research globally." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 md:gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mt-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    {index !== 3 && <div className="w-0.5 h-full bg-blue-900/50 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <span className="text-blue-400 font-bold text-xl">{item.year}</span>
                    <h3 className="text-2xl font-semibold text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ACADEMICS OVERVIEW */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Academics Overview</h2>
            <p className="text-lg text-gray-400">Comprehensive programs designed for the future.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Undergraduate (UG)", desc: "14 B.E. programs spanning core and emerging engineering disciplines.", icon: <BookOpen className="w-8 h-8 text-blue-400" /> },
              { title: "Postgraduate (PG)", desc: "M.Tech, MBA, and MCA programs fostering advanced specialization.", icon: <Award className="w-8 h-8 text-blue-400" /> },
              { title: "Doctoral (PhD)", desc: "14 recognized research centers driving innovation and discovery.", icon: <FlaskConical className="w-8 h-8 text-blue-400" /> }
            ].map((prog, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="mb-6 bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center border border-blue-500/20">
                  {prog.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{prog.title}</h3>
                <p className="text-gray-400 leading-relaxed">{prog.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5. INFRASTRUCTURE */}
        <section className="py-24 bg-[#050505] px-6 lg:px-8 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">World-Class Infrastructure</h2>
              <p className="text-lg text-gray-400">Facilities that empower learning and innovation.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { title: "Advanced Labs", desc: "130+ state-of-the-art laboratories equipped with modern technology.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
                { title: "Central Library", desc: "A vast repository of knowledge with digital and physical resources.", img: "https://www.bmsca.org/assets/images/portfolio/library/4.jpg" },
                { title: "Student Hostels", desc: "Comfortable, secure, and vibrant living spaces for over 2900 students.", img: "https://content3.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.170901133203.v7b3/catalogue/bmsce-hostel-hanumantha-nagar-bangalore-35od262q2a.jpg" }
              ].map((infra, i) => (
                <motion.div key={i} variants={fadeInUp} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={infra.img} alt={infra.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{infra.title}</h3>
                    <p className="text-gray-400">{infra.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. GLOBAL PRESENCE */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Global Presence</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our impact extends far beyond the campus. With a strong alumni network spread across the globe and deep-rooted industry connections, BMSCE students are positioned for international success.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black text-blue-400 mb-2">
                    <Counter to={40000} suffix="+" />
                  </div>
                  <div className="text-gray-400 font-medium">Global Alumni</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-blue-400 mb-2">
                    <Counter to={350} suffix="+" />
                  </div>
                  <div className="text-gray-400 font-medium">Industry Partners</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-8 flex items-center justify-center min-h-[300px] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
              <Globe className="w-48 h-48 text-blue-500/20 relative z-10" />
            </motion.div>
          </motion.div>
        </section>

        {/* 7. STUDENT COMMUNITY */}
        <section className="py-24 bg-[#050505] px-6 lg:px-8 border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Vibrant Student Community</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Life at BMSCE is dynamic and engaging, with numerous opportunities for personal and professional growth outside the classroom.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { title: "Technical Clubs", desc: "Coding, Robotics, Aero" },
                { title: "Cultural Forums", desc: "Dance, Music, Theatre" },
                { title: "Sports Teams", desc: "Cricket, Basketball, Athletics" },
                { title: "Social Initiatives", desc: "NSS, Rotaract, Outreach" }
              ].map((club, i) => (
                <motion.div key={i} variants={fadeInUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{club.title}</h3>
                  <p className="text-gray-400 text-sm">{club.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-32 px-6 lg:px-8 bg-blue-900/10 border-t border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">Join a legacy of excellence</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/academics"
                className="px-8 py-4 rounded-full bg-transparent text-white font-bold text-lg hover:bg-white/10 transition-colors border border-white/30 flex items-center justify-center"
              >
                Explore Academics
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
