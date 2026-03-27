import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const companies = [
  "Amazon", "Microsoft", "Google", "Adobe", "Oracle", "Cisco", "Intel", "IBM", "TCS", "Infosys", "Wipro", "Accenture"
];

export function PlacementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Where Careers <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Take Flight
            </span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-12 mt-16"
          >
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold text-white mb-2 flex items-center justify-center">
                {isInView ? <AnimatedNumber value={300} /> : "0"}<span className="text-blue-500">+</span>
              </div>
              <div className="text-xl text-gray-400 uppercase tracking-widest font-medium">Recruiting Companies</div>
            </div>
            
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold text-white mb-2 flex items-center justify-center">
                <span className="text-green-400 mr-2">₹</span>{isInView ? <AnimatedNumber value={50} /> : "0"}<span className="text-green-400">L+</span>
              </div>
              <div className="text-xl text-gray-400 uppercase tracking-widest font-medium">Highest Package</div>
            </div>
          </motion.div>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full overflow-hidden flex flex-col gap-8 py-10">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap animate-marquee">
            {[...companies, ...companies].map((company, i) => (
              <div 
                key={i} 
                className="mx-8 text-3xl md:text-5xl font-bold text-white/20 hover:text-white/80 transition-colors duration-300 cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
          
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[...companies, ...companies].reverse().map((company, i) => (
              <div 
                key={i} 
                className="mx-8 text-3xl md:text-5xl font-bold text-white/20 hover:text-white/80 transition-colors duration-300 cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = gsap.to(node, {
      innerHTML: value,
      duration: 2.5,
      snap: { innerHTML: 1 },
      ease: "power3.out",
      onUpdate: function() {
        node.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
      }
    });

    return () => controls.kill();
  }, [value]);

  return <span ref={nodeRef}>0</span>;
}
