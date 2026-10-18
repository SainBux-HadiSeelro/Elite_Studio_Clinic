import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Stethoscope, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Bot, 
  Check, 
  Zap, 
  Eye, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Porcelain Veneers & Makeovers',
    description: 'Ultra-thin, handcrafted porcelain laminates designed to correct gaps, chips, and discolorations with sub-millimeter precision.',
    icon: Sparkles,
    tag: 'Signature Aesthetic',
    time: '2 Sessions (10-14 days)',
    price: 'From $1,200/tooth'
  },
  {
    title: 'Invisalign® Diamond Alignment',
    description: 'Discreet, clear, removable medical-grade aligners paired with 3D digital simulation for accelerated teeth straightening.',
    icon: ShieldCheck,
    tag: 'Diamond Provider',
    time: '6–14 Months',
    price: 'From $3,200 complete'
  },
  {
    title: 'Laser In-Office Whitening',
    description: 'Medical-grade laser activation lifting enamel up to 8 shades in a single session with our proprietary anti-sensitivity shield.',
    icon: Zap,
    tag: 'Same-Day Glow',
    time: '75 Minutes',
    price: '$450 – $650'
  },
  {
    title: '3D Computer-Guided Implants',
    description: 'Permanent titanium/zirconia root replacements planned via 3D CBCT scans for maximum bone integration and rapid healing.',
    icon: Stethoscope,
    tag: 'Permanent Restoration',
    time: 'Single Visit Placement',
    price: 'From $2,200'
  },
];

const transformationCases = [
  {
    id: 'veneers',
    title: 'Full Arch Porcelain Smile Makeover',
    category: 'Cosmetic Dentistry',
    doctor: 'Dr. Elena Vance',
    timeframe: '2 Weeks • 2 Visits',
    details: '10 Hand-layered E.max porcelain veneers correcting severe enamel fluorosis and midline asymmetry.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
    shadeChange: 'A3.5 to BL1 (8 Shades Lighter)',
    patientReview: '“The change in my self-confidence is immeasurable. The digital preview showed me exactly what my smile would look like before we even began.”'
  },
  {
    id: 'invisalign',
    title: 'Accelerated Clear Alignment',
    category: 'Orthodontics',
    doctor: 'Dr. James Roscoe',
    timeframe: '9 Months • 18 Trays',
    details: 'Comprehensive crossbite correction and upper crowd resolution without metal brackets or tooth extractions.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=800&auto=format&fit=crop',
    shadeChange: 'Perfect Alignment & Arch Expansion',
    patientReview: '“Totally invisible trays, no pain, and we finished 2 months earlier than the original estimate!”'
  },
  {
    id: 'whitening',
    title: 'Laser Enamel Rejuvenation',
    category: 'Aesthetic Whitening',
    doctor: 'Dr. Elena Vance',
    timeframe: '75 Minutes Single Visit',
    details: 'Deep stain removal caused by years of espresso and red wine using Biolase dual-wave photo-activation.',
    beforeImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    shadeChange: 'Lifted 7 Full Clinical Shades',
    patientReview: '“I felt zero sensitivity afterwards thanks to the remineralizing paste they applied. Incredible result.”'
  }
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Marketing Executive, Manhattan',
    treatment: 'Porcelain Veneers (Upper 8)',
    text: 'Elite Studio stripped away every ounce of dental anxiety I held for 15 years. The glassmorphic clinic feels like a boutique spa, and Dr. Vance is a true artist.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Fintech Founder, Brooklyn',
    treatment: 'Invisalign & Laser Whitening',
    text: 'I used to dread dental visits. The 3D iTero scan was done in 3 minutes, aligners arrived within a week, and my smile is now flawless. Truly world-class standard.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Amara Sterling',
    role: 'Fashion Creative Director',
    treatment: 'Digital Smile Rejuvenation',
    text: 'Their 24/7 AI concierge answered my late-night questions about veneer longevity and booked my consultation immediately. The in-clinic experience exceeded even higher expectations.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5
  }
];

const team = [
  {
    name: 'Dr. Elena Vance',
    role: 'Lead Cosmetic Dentist & Founder',
    credentials: 'DDS, Harvard School of Dental Medicine • AACD Accredited Fellow',
    bio: 'Pioneered micro-invasive digital veneer preparations with over 14 years refining elite smiles.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. James Roscoe',
    role: 'Orthodontic Specialist',
    credentials: 'MSc Orthodontics, Columbia University • Diamond Plus Provider',
    bio: 'Specialist in accelerated clear aligners and non-extraction facial balance harmonizing.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Marcus Thorne',
    role: 'Maxillofacial & Implant Surgeon',
    credentials: 'DDS, MD, NYU Langone Health • ICOI Diplomate',
    bio: 'Leader in 3D CBCT computer-guided immediate implant restoration and painless sedation.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
];

const clinicTech = [
  { title: "3D CBCT Low-Dose Imaging", desc: "Sub-millimeter 3D bone mapping with 80% lower radiation than traditional machines." },
  { title: "iTero® Lumina 3D Scanners", desc: "No messy molds. Optical 3D impressions captured in under 90 seconds with instant simulation." },
  { title: "Guided Biofilm Air-Flow Therapy", desc: "Swiss-engineered warm water and erythritol powder cleaning that replaces painful scraping." },
  { title: "Computerized Wand Anesthesia", desc: "Single-tooth computer-controlled numbing that eliminates facial drooping and needle discomfort." }
];

export default function Home() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[650px] h-[650px] bg-brand-400/10 blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 left-0 -z-10 w-[500px] h-[500px] bg-brand-300/10 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 -z-10 w-[600px] h-[600px] bg-brand-500/10 blur-[130px] rounded-full translate-x-1/3 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-400 text-xs font-bold uppercase tracking-[4px]">
              <Sparkles size={14} /> Manhattan Medical District
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-light leading-[1.1] text-white">
              Designing <b>Flawless</b> <br /> 
              Smiles with <b>Soul</b>.
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Experience the pinnacle of modern aesthetic dentistry. Where micro-precision porcelain artistry meets anxiety-free clinical luxury and 24/7 intelligent patient care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/appointment">
                <Button className="rounded-full h-15 px-9 btn-gradient uppercase text-xs tracking-widest font-bold shadow-lg shadow-brand-400/25">
                  Reserve VIP Consultation <ChevronRight className="ml-2" size={16} />
                </Button>
              </Link>
              <a href="#transformations">
                <Button variant="outline" className="rounded-full h-15 px-8 glass text-white hover:text-brand-400 border-white/10 uppercase text-xs tracking-widest font-bold">
                  View Transformations
                </Button>
              </a>
            </div>

            {/* Social Proof & Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-heading font-bold text-white">4,800+</p>
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mt-1">Smiles Rejuvenated</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-brand-400">99.4%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mt-1">Patient Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-white">100%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mt-1">Pain-Free Protocol</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[44px] overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28a3a7c4abd4?q=80&w=900&auto=format&fit=crop" 
                alt="Elite Dental Studio Interior" 
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                  Private Surgical Suites • Soundproof Glass
                </span>
                <span className="font-bold text-white">Manhattan, NY</span>
              </div>
            </div>

            {/* Floating Glass Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 glass p-5 rounded-3xl hidden md:flex items-center gap-4 border border-white/10 shadow-xl"
            >
              <div className="bg-brand-400/20 p-3 rounded-2xl text-brand-400 border border-brand-400/30">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Wait Time Guarantee</p>
                <p className="font-heading font-bold text-white text-sm">Under 5 Minutes</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 z-20 glass p-5 rounded-3xl hidden md:flex items-center gap-4 border border-white/10 shadow-xl"
            >
              <div className="bg-brand-400/20 p-3 rounded-2xl text-brand-400 border border-brand-400/30">
                <Bot size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Aura Concierge</p>
                <p className="font-heading font-bold text-brand-400 text-sm">24/7 Live AI Active</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Clinical Excellence</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white">
              Bespoke Procedures & <b>Modern Solutions</b>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base">
              Every smile plan is personalized using high-resolution 3D digital facial aesthetics and minimally invasive protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[32px] glass border border-white/5 hover:border-brand-400/40 transition-all duration-500 group flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="bg-brand-400/10 p-4 rounded-2xl text-brand-400 group-hover:bg-brand-400 group-hover:text-background transition-colors duration-300">
                      <service.icon size={28} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-white/60">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/30 block uppercase tracking-wider text-[10px]">Timeline</span>
                    <span className="text-white font-medium">{service.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white/30 block uppercase tracking-wider text-[10px]">Investment</span>
                    <span className="text-brand-400 font-bold">{service.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/appointment">
              <Button className="rounded-full px-8 h-13 btn-gradient uppercase tracking-widest text-xs font-bold">
                Schedule a Consultation for Any Procedure <ChevronRight className="ml-1" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Smile Transformation Studio */}
      <section id="transformations" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Verified Patient Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white">
              Smile <b>Transformation Studio</b>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base">
              Explore before-and-after results documented in our Manhattan clinical facility with shade-matching verification.
            </p>
          </div>

          {/* Case Navigation Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {transformationCases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(idx)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCase === idx 
                    ? 'btn-gradient shadow-lg shadow-brand-400/20' 
                    : 'glass text-white/60 hover:text-white border-white/5'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>

          {/* Active Case Display Card */}
          <motion.div 
            key={activeCase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-[40px] p-8 md:p-14 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Visual Transformation Showcase */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
                  <img 
                    src={transformationCases[activeCase].beforeImage} 
                    alt="Before Treatment" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0c1219]/80 backdrop-blur-md text-white/70 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    Initial Condition
                  </span>
                </div>
                <p className="text-xs text-white/40 text-center font-medium">Pre-treatment clinical analysis</p>
              </div>

              <div className="space-y-3">
                <div className="relative rounded-3xl overflow-hidden border border-brand-400/40 aspect-[4/3] shadow-[0_0_30px_rgba(79,209,197,0.15)]">
                  <img 
                    src={transformationCases[activeCase].afterImage} 
                    alt="After Treatment" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-400 text-background text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Finished Result ✨
                  </span>
                </div>
                <p className="text-xs text-brand-400 text-center font-semibold">{transformationCases[activeCase].shadeChange}</p>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-brand-400 text-xs font-bold uppercase tracking-[3px]">{transformationCases[activeCase].category}</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
                  {transformationCases[activeCase].title}
                </h3>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                {transformationCases[activeCase].details}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40">Attending Specialist:</span>
                  <span className="text-white font-bold">{transformationCases[activeCase].doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Treatment Duration:</span>
                  <span className="text-brand-400 font-bold">{transformationCases[activeCase].timeframe}</span>
                </div>
              </div>

              <div className="border-l-2 border-brand-400 pl-4 py-1 italic text-white/80 text-sm">
                {transformationCases[activeCase].patientReview}
              </div>

              <Link to="/appointment" className="block pt-2">
                <Button className="w-full rounded-full h-13 btn-gradient uppercase tracking-widest text-xs font-bold">
                  Assess My Transformation Potential
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Suite Section */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Medical Grade Standards</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white leading-tight">
              Technology Designed to <b>Eliminate Discomfort</b>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              We have invested over $1.5M in next-generation imaging, laser therapy, and digital CAD/CAM milling so our patients experience zero fear and optimal precision.
            </p>
            <div className="pt-2">
              <Link to="/appointment">
                <Button variant="outline" className="rounded-full h-12 px-7 glass text-white hover:text-brand-400 border-white/10 uppercase text-xs tracking-widest font-bold">
                  Tour Our Clinic Suites
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {clinicTech.map((tech, i) => (
              <div key={i} className="p-6 rounded-3xl glass border border-white/5 space-y-3">
                <div className="w-9 h-9 rounded-xl bg-brand-400/10 text-brand-400 flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </div>
                <h4 className="text-white font-bold text-base">{tech.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 AI Concierge Highlight Banner */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto rounded-[40px] glass p-8 md:p-14 border border-brand-400/20 relative overflow-hidden bg-gradient-to-r from-brand-400/10 via-transparent to-brand-500/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-400/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
                <Bot size={14} /> Always-On Autonomous Intelligence
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-light text-white">
                Meet <b>Aura</b> — Your 24/7 Live Dental Concierge.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                Have urgent tooth discomfort late at night? Wondering if your dental insurance covers porcelain veneers? Aura is trained with complete clinic protocol, doctor schedules, and treatment pricing to assist you instantaneously.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch">
              <Link to="/appointment">
                <Button className="w-full h-14 rounded-full btn-gradient uppercase tracking-widest text-xs font-bold">
                  Book Priority Visit
                </Button>
              </Link>
              <div className="p-3 text-center text-xs text-white/40">
                💬 Click the teal badge in the bottom-right corner to start chatting now!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dentist Team Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Medical Leadership</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white">
              Specialists <b>You Can Trust</b>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Our clinicians lecture internationally on aesthetic smile architecture and hold master fellowships in cosmetic and surgical dentistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass rounded-[36px] overflow-hidden border border-white/10 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-white">{member.name}</h4>
                    <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
                    <p className="text-white/40 text-[11px] font-medium mt-1">{member.credentials}</p>
                    <p className="text-white/60 text-xs mt-3 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Award size={14} className="text-brand-400" /> Board Certified
                    </span>
                    <div className="flex gap-3">
                      <Instagram size={16} className="hover:text-brand-400 cursor-pointer transition-colors" />
                      <Twitter size={16} className="hover:text-brand-400 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Patient Testimonials</span>
              <h2 className="text-4xl font-heading font-light text-white leading-tight">
                What Our <b>Patients Experience</b>
              </h2>
              <p className="text-white/50 text-sm">
                Join thousands of discerning individuals who have elevated their oral wellness with our bespoke team.
              </p>
              <div className="p-6 rounded-3xl glass border border-white/5 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-extrabold text-white">4.98</div>
                  <div>
                    <div className="flex text-brand-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-xs text-white/40 tracking-wider uppercase font-bold mt-1">Google & Healthgrades</p>
                  </div>
                </div>
                <p className="text-xs text-white/50">Based on 650+ verified patient reviews across Manhattan.</p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="glass p-7 rounded-[32px] border border-white/5 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex text-brand-400 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-white/70 italic text-sm leading-relaxed">"{t.text}"</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-11 h-11 rounded-full object-cover border border-white/20 shrink-0" 
                      referrerPolicy="no-referrer" 
                    />
                    <div>
                      <p className="font-bold text-white text-xs">{t.name}</p>
                      <p className="text-brand-400 text-[10px] uppercase tracking-wider font-semibold">{t.treatment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-7xl mx-auto rounded-[48px] glass relative overflow-hidden p-8 md:p-16 border border-white/10 shadow-2xl bg-gradient-to-b from-[#121c27] to-[#0c1219]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Direct Concierge</span>
                <h3 className="text-4xl md:text-5xl font-heading font-light text-white">
                  Visit Our <b>Manhattan Studio</b>
                </h3>
                <p className="text-white/60 text-base">
                  Conveniently situated in the Medical District with reserved valet parking and direct subway access.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-5">
                  <div className="bg-brand-400/10 p-3.5 rounded-2xl text-brand-400 border border-brand-400/20 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Clinic Location</p>
                    <p className="text-white/50 text-sm mt-0.5">123 Dental Street, Medical District, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-brand-400/10 p-3.5 rounded-2xl text-brand-400 border border-brand-400/20 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Telephone Inquiries</p>
                    <p className="text-white/50 text-sm mt-0.5">+1 (555) 000-1234 (Live Concierge Desk)</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-brand-400/10 p-3.5 rounded-2xl text-brand-400 border border-brand-400/20 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Direct Email</p>
                    <p className="text-white/50 text-sm mt-0.5">concierge@elitestudioclinic.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[36px] overflow-hidden border border-white/10 h-[280px] relative shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                  alt="Manhattan Dental District Location" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Valet Attendant Available on Arrival</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Link to="/appointment">
                  <Button className="w-full h-16 rounded-full btn-gradient text-sm uppercase tracking-[3px] font-bold shadow-xl shadow-brand-400/25">
                    Reserve Your VIP Smile Consultation
                  </Button>
                </Link>
                <p className="text-xs text-white/40">Zero commitment initial assessment • 3D Scan Included</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
