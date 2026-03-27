import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 100,
        filter: 'blur(10px)',
        rotateX: -90
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.2
      }
    );

    gsap.fromTo(
      '.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, delay: 1.8, ease: 'power3.out' }
    );
  }, []);

  const title = "Where Engineers Become Legends";

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A] z-10" />
        <img
          src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp"
          alt="BMSCE Campus"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Floating Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse z-0" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
        <div className="mb-6 inline-block">
          <span className="
  px-5 py-2 
  rounded-full 
  border border-white/10 
  bg-white/5 backdrop-blur-md 
  text-sm md:text-base lg:text-lg   /* 👈 bigger text */
  font-semibold 
  tracking-wider 
  text-blue-400 
  uppercase
">
            B.M.S. College of Engineering
          </span>
        </div>

        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1]"
          style={{ perspective: '1000px' }}
        >
          {title.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em] whitespace-nowrap">
              {word.split('').map((char, j) => (
                <span key={j} className="char inline-block origin-bottom">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-sub text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Since <span className="text-white font-semibold">1946</span>, shaping India's brightest minds in the heart of Bangalore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="hero-btn group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10">Explore Campus</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-20">
              Explore Campus
            </span>
          </button>

          <button className="hero-btn px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>


    </section>
  );
}
