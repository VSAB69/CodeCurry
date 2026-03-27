import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { title: "Modern Hostels", img: "https://www.bmsca.org/slider/a2.webp", desc: "Comfortable living spaces with Wi-Fi, dining, and recreational facilities." },
  { title: "Advanced Labs", img: "https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361116.webp", desc: "State-of-the-art laboratories equipped with the latest technology." },
  { title: "Utsav - The Fest", img: "https://images.shiksha.com/mediadata/images/1642140252php6C2Sgv.jpeg", desc: "One of South India's largest techno-cultural festivals." },
  { title: "Sports Complex", img: "https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp", desc: "Indoor and outdoor sports facilities for holistic development." }
];

export function CampusLifePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.campus-slide');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollRef.current?.offsetWidth
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white mb-6"
        >
          More Than Just <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            A Campus
          </span>
        </motion.h1>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={containerRef} className="h-screen bg-[#0A0A0A] overflow-hidden relative">
        <div ref={scrollRef} className="flex h-full w-[400vw]">
          {slides.map((slide, i) => (
            <div key={i} className="campus-slide w-screen h-full relative flex items-center justify-center p-10">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="relative z-20 max-w-4xl text-center">
                <h3 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter">
                  {slide.title}
                </h3>
                <p className="text-2xl md:text-3xl text-gray-200 drop-shadow-xl font-light">
                  {slide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">Student Clubs & Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Coding Club', 'Robotics Society', 'NSS Unit', 'NCC Wing', 'Drama Club', 'Music Society'].map((club, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-64 rounded-3xl overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img 
                  src={`https://picsum.photos/seed/${club.replace(' ', '')}/600/400`} 
                  alt={club} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{club}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 transition-all duration-300">
                    <p className="text-sm text-gray-300">Join a community of like-minded individuals and pursue your passions.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
