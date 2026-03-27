import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LegacySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legacy-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.legacy-container',
          start: 'top 80%',
        }
      });

      gsap.to('.timeline-line', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.legacy-container',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden legacy-container">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Animated Timeline */}
          <div className="relative h-[600px] flex items-center justify-center">
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/10">
              <div className="timeline-line w-full bg-gradient-to-b from-blue-500 to-purple-600 h-0" />
            </div>
            
            <div className="space-y-32 relative z-10 w-full">
              {[
                { year: '1946', title: 'Foundation', desc: 'Established as the first private engineering college in India.' },
                { year: '2008', title: 'Autonomy', desc: 'Granted academic autonomy by VTU.' },
                { year: '2024', title: 'Legacy', desc: '70+ years of shaping the future of engineering.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
                >
                  <div className={`w-1/2 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {item.year}
                    </h3>
                    <h4 className="text-xl font-semibold mt-2">{item.title}</h4>
                    <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-500 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8">
            <h2 className="legacy-text text-5xl md:text-6xl font-bold tracking-tight">
              A Legacy of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Excellence
              </span>
            </h2>
            
            <p className="legacy-text text-xl text-gray-400 leading-relaxed">
              Founded in 1946 by Late Sri. B. M. Sreenivasaiah, BMSCE holds the proud distinction of being the first private engineering college in India.
            </p>
            
            <p className="legacy-text text-lg text-gray-500 leading-relaxed">
              Located in the heart of Bangalore, the Silicon Valley of India, we blend traditional academic rigor with modern innovation, creating an ecosystem where ideas flourish and leaders are born.
            </p>

            <div className="legacy-text grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {isInView ? <Counter from={0} to={70} /> : "0"}+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Years of Legacy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {isInView ? <Counter from={0} to={100} /> : "0"}K+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Global Alumni</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Counter({ from, to }: { from: number, to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = gsap.to(node, {
      innerHTML: to,
      duration: 2,
      snap: { innerHTML: 1 },
      ease: "power2.out",
      onUpdate: function() {
        node.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
      }
    });

    return () => controls.kill();
  }, [to]);

  return <span ref={nodeRef}>{from}</span>;
}
