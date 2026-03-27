import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { PageTransition } from '../components/PageTransition';

export function About() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0A0A0A] z-10" />
          <img 
            src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp" 
            alt="Campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            75+ Years of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Engineering Excellence
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 bg-[#0A0A0A] relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Students", value: 6000, suffix: "+" },
              { label: "Alumni Network", value: 40000, suffix: "+" },
              { label: "Departments", value: 14, suffix: "+" }
            ].map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-32 bg-[#0A0A0A] relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="space-y-12">
            {[
              { year: "1946", title: "Inception", desc: "Founded by Late Sri. B. M. Sreenivasaiah, becoming India's first private engineering college." },
              { year: "2008", title: "Academic Autonomy", desc: "Granted autonomous status by Visvesvaraya Technological University (VTU)." },
              { year: "2024", title: "NAAC A++", desc: "Achieved the highest accreditation grade, reflecting our commitment to quality education." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex gap-6"
              >
                <div className="w-24 shrink-0 text-2xl font-bold text-blue-500">{item.year}</div>
                <div className="pb-12 border-l border-white/10 pl-8 relative">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BMSCE */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">The BMSCE Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Legacy', 'Research', 'Innovation', 'Industry-Ready'].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-400 text-sm">
                  Empowering students with state-of-the-art facilities and a curriculum designed for the future.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function StatCard({ stat, index }: { stat: any, index: number, key?: React.Key }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && nodeRef.current) {
      gsap.to(nodeRef.current, {
        innerHTML: stat.value,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        onUpdate: function() {
          if (nodeRef.current) {
            nodeRef.current.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
          }
        }
      });
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg text-center"
    >
      <div className="text-5xl font-bold text-white mb-2">
        <span ref={nodeRef}>0</span>
        <span className="text-blue-500">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</div>
    </motion.div>
  );
}
