import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const legacyRef = useRef<HTMLDivElement>(null);
  const acadRef = useRef<HTMLDivElement>(null);
  const placeRef = useRef<HTMLDivElement>(null);
  const lifeRef = useRef<HTMLDivElement>(null);
  const alumniRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const highestObj = { val: 0 };
  const avgObj = { val: 0 };
  const companiesObj = { val: 0 };

  const highestRef = useRef<HTMLSpanElement>(null);
  const avgRef = useRef<HTMLSpanElement>(null);
  const compRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. HERO
      let heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      heroTl.to('.hero-bg', { scale: 1.08, ease: 'none' }, 0)
            .fromTo('.hero-text-wrap', { opacity: 0, y: 30 }, { opacity: 1, y: -20, ease: 'none' }, 0);

      // 2. LEGACY
      let legacyTl = gsap.timeline({
        scrollTrigger: {
          trigger: legacyRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      legacyTl.to('.legacy-old', { opacity: 0, ease: 'none' }, 0)
              .fromTo('.legacy-modern', { scale: 1 }, { scale: 1.1, ease: 'none' }, 0)
              .fromTo('.legacy-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: 'none' }, 0);

      // 3. ACADEMICS
      let acadTl = gsap.timeline({
        scrollTrigger: {
          trigger: acadRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      acadTl.fromTo('.acad-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: 'none' }, 0)
            .fromTo('.acad-card', 
              { y: 100, opacity: 0 }, 
              { y: -20, opacity: 1, stagger: 0.1, ease: 'none' }, 0);

      // 4. PLACEMENTS
      let placeTl = gsap.timeline({
        scrollTrigger: {
          trigger: placeRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      placeTl.fromTo('.place-content', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, ease: 'none' }, 0)
             .to(highestObj, { 
                val: 51.5, 
                ease: 'none',
                onUpdate: () => {
                  if (highestRef.current) highestRef.current.innerText = `₹${highestObj.val.toFixed(1)} LPA`;
                }
             }, 0)
             .to(avgObj, { 
                val: 11.4, 
                ease: 'none',
                onUpdate: () => {
                  if (avgRef.current) avgRef.current.innerText = `₹${avgObj.val.toFixed(1)} LPA`;
                }
             }, 0)
             .to(companiesObj, { 
                val: 350, 
                ease: 'none',
                onUpdate: () => {
                  if (compRef.current) compRef.current.innerText = `${Math.floor(companiesObj.val)}+`;
                }
             }, 0);

      // 5. CAMPUS LIFE
      let lifeTl = gsap.timeline({
        scrollTrigger: {
          trigger: lifeRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      lifeTl.to('.life-bg', { scale: 1.15, y: -50, ease: 'none' }, 0)
            .fromTo('.life-text', { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'none' }, 0);

      // 6. ALUMNI
      let alumniTl = gsap.timeline({
        scrollTrigger: {
          trigger: alumniRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });
      alumniTl.fromTo('.alumni-bg', { scale: 1 }, { scale: 1.05, ease: 'none' }, 0)
              .fromTo('.alumni-content', { opacity: 0, y: 40 }, { opacity: 1, y: -20, ease: 'none' }, 0)
              .fromTo('.alumni-map', { opacity: 0, scale: 0.95 }, { opacity: 0.6, scale: 1, ease: 'none' }, 0);

      // 7. CTA
      let ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        }
      });
      ctaTl.fromTo('.cta-bg', { scale: 1 }, { scale: 1.1, ease: 'none' }, 0)
           .fromTo('.cta-text', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1.05, ease: 'none' }, 0)
           .to('.cta-overlays', { opacity: 0, ease: 'none' }, 0.5);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-[#0A0A0A] text-white overflow-x-hidden w-full font-sans">
        
        {/* 1. HERO */}
        <div ref={heroRef} className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070" 
              alt="BMSCE Campus" 
              className="hero-bg w-full h-full object-cover origin-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="hero-text-wrap relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto opacity-0 translate-y-8">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-widest text-blue-300 uppercase">
              BMS College of Engineering
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Where Engineers <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Become Legends</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl">
              Since 1946, shaping the future of engineering in Bangalore.
            </p>
          </div>
        </div>

        {/* 2. LEGACY */}
        <div ref={legacyRef} className="legacy-section relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070" 
              alt="Old BMSCE Campus" 
              className="legacy-old absolute inset-0 w-full h-full object-cover z-10 opacity-70 sepia-[.3] grayscale-[.4]"
            />
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086" 
              alt="Modern BMSCE Campus" 
              className="legacy-modern absolute inset-0 w-full h-full object-cover z-0 opacity-40 origin-center"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/60 z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-20"></div>
          </div>

          <div className="legacy-text relative z-30 text-center px-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">75+ Years of Excellence</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
              A rich heritage of innovation meeting modern technological advancement.
            </p>
          </div>
        </div>

        {/* 3. ACADEMICS */}
        <div ref={acadRef} className="academics-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.1)_0%,transparent_70%)]"></div>
          
          <div className="acad-text relative z-10 text-center mb-16 opacity-0 translate-y-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Brilliance</span></h2>
            <p className="text-xl text-white/60">World-class departments forging tomorrow's leaders</p>
          </div>

          <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl">
            {['Computer Science', 'Artificial Intelligence', 'Electronics', 'Mechanical', 'Civil'].map((dept, i) => (
              <div key={i} className="acad-card opacity-0 translate-y-24 bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{dept}</h3>
                <p className="text-sm text-white/50">Department of Excellence</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PLACEMENTS */}
        <div ref={placeRef} className="placements-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>

          <div className="place-content relative z-10 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-widest text-purple-300 uppercase">
                Career Horizons
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Outcomes That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Matter.</span></h2>
              <p className="text-xl text-white/60 max-w-lg mb-8">
                Where industry meets academia. Our graduates don't just find jobs; they redefine industries across the globe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="text-sm text-white/50 uppercase tracking-widest mb-2">Highest Package</div>
                <div ref={highestRef} className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">₹0 LPA</div>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="text-sm text-white/50 uppercase tracking-widest mb-2">Average Package</div>
                <div ref={avgRef} className="text-5xl font-bold text-white">₹0 LPA</div>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm sm:col-span-2">
                <div className="text-sm text-white/50 uppercase tracking-widest mb-2">Top Recruiters</div>
                <div className="flex items-baseline gap-2">
                  <div ref={compRef} className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">0</div>
                  <div className="text-2xl text-white/70">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CAMPUS LIFE */}
        <div ref={lifeRef} className="campus-life-section relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
              alt="Campus Life" 
              className="life-bg w-full h-full object-cover origin-bottom opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]"></div>
          </div>
          
          <div className="life-text relative z-10 text-center max-w-4xl px-4 opacity-0 translate-y-16">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">More Than Just <br/><span className="italic font-light text-white/80">Academics</span></h2>
            <p className="text-2xl text-white/60 font-light">
              Dive into a culture of creation, sports, arts, and endless possibilities.
            </p>
          </div>
        </div>

        {/* 6. ALUMNI */}
        <div ref={alumniRef} className="alumni-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#0A0A0A] z-10 opacity-80 mix-blend-multiply"></div>
             <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072" 
                  className="alumni-bg w-full h-full object-cover opacity-30" alt="World Map" />
             <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-20"></div>
          </div>

          <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-5xl w-full">
            <div className="alumni-content opacity-0 translate-y-10">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">From Bangalore<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">To The World</span></h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-16">
                Our global network of trailblazers shaping societies and pioneering technologies across 100+ countries.
              </p>
            </div>

            <div className="alumni-map w-full max-w-4xl h-64 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
               <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12"></div>
               <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12"></div>
               <div className="text-center z-10">
                 <div className="text-4xl font-bold text-white mb-2">50,000+</div>
                 <div className="text-sm tracking-widest text-white/50 uppercase">Global Alumni Network</div>
               </div>
            </div>
          </div>
        </div>

        {/* 7. CTA */}
        <div ref={ctaRef} className="cta-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="cta-bg absolute inset-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
          </div>

          <div className="cta-text relative z-20 flex flex-col items-center text-center px-4">
            <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter">Your Journey<br/>Starts Here</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
                Apply Now
              </button>
              <button className="px-10 py-5 border border-white/20 bg-white/5 backdrop-blur-md rounded-full font-bold text-lg text-white hover:bg-white/10 transition-colors duration-300">
                Explore Campus
              </button>
            </div>
          </div>
          <div className="cta-overlays absolute inset-0 bg-black pointer-events-none z-30"></div>
        </div>

      </div>
    </PageTransition>
  );
}
