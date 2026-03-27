import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "State-of-the-Art Labs",
    desc: "Where theory meets practice. Equipped with the latest technology to fuel your innovations.",
    img: "https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361116.webp"
  },
  {
    title: "Vibrant Campus Life",
    desc: "11 acres of lush green, urban campus in the heart of Bangalore's tech hub.",
    img: "https://images.shiksha.com/mediadata/images/1642140252php6C2Sgv.jpeg"
  },
  {
    title: "Global Hackathons",
    desc: "Compete with the best minds. Build solutions for real-world problems.",
    img: "https://www.bmsca.org/slider/a2.webp"
  }
];

export function CampusLifeSection() {
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
    <section ref={containerRef} className="h-screen bg-[#0A0A0A] overflow-hidden relative">
      <div className="absolute top-10 left-10 z-20">
        <h2 className="text-4xl md:text-6xl font-bold text-white mix-blend-difference">
          Life at <span className="text-blue-400">BMSCE</span>
        </h2>
      </div>

      <div ref={scrollRef} className="flex h-full w-[300vw]">
        {slides.map((slide, i) => (
          <div key={i} className="campus-slide w-screen h-full relative flex items-center justify-center p-10">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src={slide.img} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="relative z-20 max-w-3xl text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
              >
                {slide.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-3xl text-gray-200 drop-shadow-xl font-light"
              >
                {slide.desc}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
