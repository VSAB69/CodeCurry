import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DEPARTMENTS, Department } from './Academics';
import { PageTransition } from '../components/PageTransition';
import { 
  ArrowLeft,
  BookOpen, 
  Users, 
  Clock, 
  Award,
  FlaskConical,
  Microscope,
  Briefcase
} from 'lucide-react';

interface FacultyProfile {
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
}

export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<Department | null>(null);
  const [faculties, setFaculties] = useState<FacultyProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find department details
    const foundDept = DEPARTMENTS.find(d => d.id === id);
    
    if (foundDept) {
      setDepartment(foundDept);
    } else {
      navigate('/academics');
    }

    // Load faculties from JSON
    const loadFaculties = async () => {
      try {
        // We use dynamic import for JSON. 
        // Vite handles JSON imports automatically, but since it's dynamic, we might need to fetch from public 
        // OR we can dynamic import. Dynamic import is better:
        const data = await import(`../data/departments/${id}.json`);
        // If it's a default export due to vite import
        setFaculties(data.default || data);
      } catch (err) {
        console.error("Failed to load faculties for", id, err);
        setFaculties([]); // JSON might be empty or missing
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadFaculties();
    }
  }, [id, navigate]);

  if (!department) {
    return null;
  }

  // Fallback random labs/research if none found
  const randomLabs = [
    { name: "Advanced Computing Lab", desc: "Equipped with high-performance workstations for complex simulations and modeling." },
    { name: "Innovation & Tinkering Space", desc: "A collaborative workspace with 3D printers, IoT kits, and modern prototyping tools." },
    { name: "Research & Development Facility", desc: "Dedicated space for faculty and senior students to conduct specialized experiments." }
  ];

  const randomResearch = [
    "Exploring scalable architectures in next-gen distributed systems.",
    "Applying state-of-the-art machine learning models to real-time unstructured data.",
    "Developing sustainable and resilient infrastructural solutions for smart environments."
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <button 
            onClick={() => navigate('/academics')}
            className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Academics
          </button>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-10 md:p-16 rounded-[2rem] bg-gradient-to-br ${department.color} relative overflow-hidden mb-16 shadow-2xl`}
          >
            <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shrink-0 shadow-lg">
                <department.icon className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  <span className="px-4 py-1.5 rounded-full bg-black/40 text-white text-sm font-bold backdrop-blur-md border border-white/10">
                    {department.level} Level
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-black/40 text-white text-sm font-bold backdrop-blur-md border border-white/10">
                    {department.category} Category
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 text-center md:text-left leading-tight">
                  {department.name}
                </h1>
                <p className="text-white/90 text-xl max-w-3xl text-center md:text-left font-light leading-relaxed">
                  {department.description}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Department Overview */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Department Overview</h2>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    The {department.name} department strives for excellence in education and research. 
                    It blends rigorous theoretical knowledge with extensive practical training. Through industry-collaborative 
                    curriculums, advanced labs, and dedicated faculty, we aim to nurture the next generation of engineers, 
                    leaders, and innovators. Our comprehensive ecosystem supports deep-tech exploration and holistic development.
                  </p>
                </div>
              </motion.section>

              {/* Lab Facilities */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <FlaskConical className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Laboratory Facilities</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {randomLabs.map((lab, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <h3 className="text-xl font-bold text-white mb-3">{lab.name}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{lab.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Research Focus */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Microscope className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Research Focus</h2>
                </div>
                <div className="space-y-4">
                  {randomResearch.map((res, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400 shrink-0" />
                      <p className="text-gray-300 text-lg">{res}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Faculty Profiles */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Faculty Profiles</h2>
                </div>
                
                {loading ? (
                  <div className="text-gray-400 p-8 text-center bg-white/5 rounded-3xl border border-white/10">
                    Loading faculties...
                  </div>
                ) : faculties && faculties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faculties.map((faculty, fIndex) => (
                      <div key={fIndex} className="p-6 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                            <Users className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{faculty.name}</h3>
                            <p className="text-orange-400/80 text-sm font-medium">{faculty.designation}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-400">
                          <p><strong className="text-gray-300">Qualification:</strong> {faculty.qualification || 'N/A'}</p>
                          <p><strong className="text-gray-300">Experience:</strong> {faculty.experience || 'N/A'}</p>
                          <p><strong className="text-gray-300">Specialization:</strong> {faculty.specialization || 'N/A'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 p-12 text-center bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No faculty data currently available. JSON files are initialized and await population.</p>
                  </div>
                )}
              </motion.section>

            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                
                {/* At a Glance */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">At a Glance</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <Clock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Duration</p>
                        <p className="text-xl font-bold text-white">{department.stats.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Annual Intake</p>
                        <p className="text-xl font-bold text-white">{department.stats.intake}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <Award className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Placement Rate</p>
                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                          {department.stats.placement}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Curriculum Summary */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-white mb-6">4-Year Curriculum Snapshot</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {/* Time line items */}
                    {['Year 1: Foundations', 'Year 2: Core Engineering', 'Year 3: Advanced Concepts', 'Year 4: Capstone & Industry'].map((year, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-[#0f0f0f] text-gray-500 group-hover:text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-colors z-10">
                          <div className="w-2 h-2 bg-white/30 group-hover:bg-white rounded-full transition-colors"/>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl shadow border border-white/5 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
                          {year}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-colors">
                    Download Full Syllabus
                  </button>
                </motion.div>

                {/* Top Careers */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-8 rounded-3xl bg-black border border-white/10 shadow-2xl relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${department.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> Top Career Roles
                  </h3>
                  <div className="flex flex-col gap-3">
                    {department.careers.map((career, idx) => (
                      <div key={idx} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                        {career}
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
