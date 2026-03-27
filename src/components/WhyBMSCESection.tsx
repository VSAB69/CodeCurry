import { motion } from 'framer-motion';
import { Award, MapPin, Briefcase, Users } from 'lucide-react';

const reasons = [
  {
    icon: <Award className="w-10 h-10 text-blue-400" />,
    title: "70+ Years Legacy",
    desc: "A rich history of academic excellence and producing industry leaders since 1946."
  },
  {
    icon: <MapPin className="w-10 h-10 text-purple-400" />,
    title: "Heart of Bangalore",
    desc: "Located in India's tech hub, providing unparalleled access to startups and tech giants."
  },
  {
    icon: <Briefcase className="w-10 h-10 text-green-400" />,
    title: "Stellar Placements",
    desc: "Consistent 90%+ placement record with top-tier product and service companies."
  },
  {
    icon: <Users className="w-10 h-10 text-orange-400" />,
    title: "Global Alumni Network",
    desc: "100,000+ strong alumni network spread across the globe, ready to mentor and guide."
  }
];

export function WhyBMSCESection() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">BMSCE?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            More than just an institution, we are a launchpad for your dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
