import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PageTransition } from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      
      // SCENE 1: Intro (Pinned)
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-1",
          start: "top top",
          end: "+=100%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        }
      })
      .to(".s1-img", { scale: 1.1, ease: "none", duration: 1 }, 0)
      .fromTo(".s1-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", duration: 1 }, 0);

      // SCENE 2: Foundation (Morph)
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-2",
          start: "top top",
          end: "+=100%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        }
      })
      .to(".s2-bg-wrapper", { scale: 1.05, ease: "none", duration: 1 }, 0)
      .to(".s2-old-img", { opacity: 0, ease: "none", duration: 1 }, 0)
      .fromTo(".s2-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", duration: 1 }, 0);

      // SCENE 3: Time Flow (Horizontal Scroll)
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-3",
          start: "top top",
          end: "+=200%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        }
      })
      .to(".s3-wrapper", { xPercent: -66.666, ease: "none", duration: 1 });

      // SCENE 4: Knowledge (Depth Effect)
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-4",
          start: "top top",
          end: "+=100%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        }
      })
      .to(".s4-bg", { yPercent: 15, ease: "none", duration: 1 }, 0)
      .to(".s4-mid", { yPercent: 5, ease: "none", duration: 1 }, 0);

      // SCENE 5: Future + CTA
      gsap.timeline({
        scrollTrigger: {
          trigger: ".scene-5",
          start: "top top",
          end: "+=100%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        }
      })
      .to(".s5-dark-overlay", { opacity: 0, ease: "none", duration: 1 }, 0)
      .to(".s5-text", { opacity: 0, ease: "none", duration: 0.5 }, 0)
      .fromTo(".s5-cta-wrapper", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", duration: 1 }, 0);

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-black text-white overflow-hidden font-sans">
        
        {/* SCENE 1: INTRO */}
        <section className="scene-1 relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <img 
            src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361119.webp" 
            alt="Vision" 
            className="s1-img absolute inset-0 w-full h-full object-cover opacity-50 sepia-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="s1-text relative z-10 text-4xl md:text-6xl lg:text-8xl font-serif italic tracking-tight text-center px-4">
            Every legacy begins <br />
            <span className="font-sans not-italic font-bold text-white uppercase tracking-tighter">with a vision.</span>
          </h1>
        </section>

        {/* SCENE 2: FOUNDATION */}
        <section className="scene-2 relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <div className="s2-bg-wrapper absolute inset-0 w-full h-full">
            <img 
              src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp" 
              alt="Modern Campus" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361119.webp" 
              alt="Old Campus" 
              className="s2-old-img absolute inset-0 w-full h-full object-cover opacity-80 sepia-[0.5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="s2-text relative z-10 text-center px-4">
            <div className="text-blue-400 font-mono text-xl md:text-2xl mb-6 tracking-widest">1946</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The beginning of <br />
              <span className="text-gray-400 font-serif italic">something bigger.</span>
            </h2>
          </div>
        </section>

        {/* SCENE 3: TIME FLOW */}
        <section className="scene-3 relative h-screen w-full overflow-hidden bg-black">
          <div className="s3-wrapper flex h-full w-[300vw]">
            {/* Panel 1 */}
            <div className="w-screen h-full relative flex items-center justify-center">
              <img src="https://www.bmsca.org/assets/images/portfolio/library/4.jpg" alt="Growth" className="absolute inset-0 w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
              <h2 className="relative z-10 text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">Growth</h2>
            </div>
            {/* Panel 2 */}
            <div className="w-screen h-full relative flex items-center justify-center">
              <img src="https://content3.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.170901133203.v7b3/catalogue/bmsce-hostel-hanumantha-nagar-bangalore-35od262q2a.jpg" alt="Expansion" className="absolute inset-0 w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
              <h2 className="relative z-10 text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">Expansion</h2>
            </div>
            {/* Panel 3 */}
            <div className="w-screen h-full relative flex items-center justify-center">
              <img src="https://content3.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.170901133203.v7b3/catalogue/bmsce-hostel-hanumantha-nagar-bangalore-94en6ooecf.jpg" alt="Innovation" className="absolute inset-0 w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
              <h2 className="relative z-10 text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">Innovation</h2>
            </div>
          </div>
        </section>

        {/* SCENE 4: KNOWLEDGE */}
        <section className="scene-4 relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {/* Background Layer (Slow) */}
            <img 
              src="https://www.collegebatch.com/static/clg-gallery/bms-college-of-engineering-bangalore-361123.webp" 
              alt="Knowledge BG" 
              className="s4-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
            {/* Mid Layer (Medium) */}
            <div className="s4-mid absolute inset-0 w-full h-[110%] -top-[5%] bg-gradient-to-t from-black via-transparent to-black opacity-80" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Knowledge.<br/>
              <span className="text-gray-500">Built.</span><br/>
              <span className="font-serif italic text-blue-500 lowercase">Daily.</span>
            </h2>
          </div>
        </section>

        {/* SCENE 5: FUTURE + CTA */}
        <section className="scene-5 relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
          {/* Dark Overlay that fades out */}
          <div className="s5-dark-overlay absolute inset-0 bg-black z-20" />
          
          {/* Initial Text (on dark) */}
          <h2 className="s5-text absolute z-30 text-5xl md:text-8xl font-serif italic text-white text-center px-4">
            Now it's your turn.
          </h2>

          {/* Final CTA (on light) */}
          <div className="s5-cta-wrapper relative z-10 flex flex-col items-center text-center px-4">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black mb-12">
              Shape the future.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/admissions" 
                className="px-10 py-5 rounded-full bg-black text-white font-bold text-xl hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                Apply Now <ArrowRight size={24} />
              </Link>
              <Link 
                to="/academics" 
                className="px-10 py-5 rounded-full bg-transparent text-black font-bold text-xl hover:bg-gray-200 transition-colors border border-black/20"
              >
                Explore Academics
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
