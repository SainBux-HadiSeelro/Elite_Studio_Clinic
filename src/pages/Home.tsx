import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Stethoscope, 
  ChevronRight, 
  Star,
  CheckCircle2,
  CircleCheck,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'General Dentistry',
    description: 'Comprehensive care for all your basic oral health needs, from cleanings to fillings.',
    icon: Stethoscope,
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with porcelain veneers, bonding, and advanced aesthetic treatments.',
    icon: Sparkles,
  },
  {
    title: 'Teeth Whitening',
    description: 'Professional-grade whitening systems that deliver brilliant results in a single visit.',
    icon: Sparkles,
  },
  {
    title: 'Orthodontics',
    description: 'Modern alignment solutions including Invisalign and clear ceramic braces.',
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Marketing Executive',
    text: 'The glassmorphic design of the clinic is just the start. The care I received was truly world-class.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    text: 'I used to hate the dentist. Elite Dental Studio changed that. It feels like a spa for your teeth.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
  },
];

const team = [
  {
    name: 'Dr. Elena Vance',
    role: 'Lead Dentist & Founder',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. James Roscoe',
    role: 'Orthodontist Specialist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dr. Marcus Thorne',
    role: 'Cosmetic Surgeon',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-400/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-0 -z-10 w-[400px] h-[400px] bg-brand-300/10 blur-[100px] rounded-full -translate-x-1/2" />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-brand-400 text-sm font-bold uppercase tracking-[4px]">
              Elite Dental Studio
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-light leading-tight text-white mb-6">
              Designing <b>Perfect</b> <br /> 
              Smiles with <b>Soul</b>.
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              Experience a new standard of dental care where advanced technology meets bespoke aesthetics. High-end dentistry for those who value detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/appointment">
                <Button className="rounded-full h-14 px-10 btn-gradient uppercase text-[13px] tracking-widest">
                  Book Appointment <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-6 pt-8 border-t border-white/10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-background overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-white">2,500+ Happy Clients</p>
                <div className="flex text-brand-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28a3a7c4abd4?q=80&w=800&auto=format&fit=crop" 
                alt="Modern Clinic" 
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Glass Overlays */}
             <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 glass p-6 rounded-3xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-brand-400/10 p-3 rounded-2xl text-brand-400">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Wait Time</p>
                  <p className="font-heading font-bold text-white">Under 10 mins</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 z-20 glass p-6 rounded-3xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-brand-400/10 p-3 rounded-2xl text-brand-400">
                  <Heart size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Patients First</p>
                  <p className="font-heading font-bold text-white">Personalized Care</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Our Specialties</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-light text-white">Comprehensive <b>Dental Excellence</b></h3>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="p-8 rounded-[24px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="bg-brand-400/10 p-5 rounded-3xl text-brand-400 group-hover:bg-brand-400 group-hover:text-background transition-colors duration-300">
                    <service.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white">{service.title}</h4>
                  <p className="text-white/40 leading-relaxed text-sm">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=800&auto=format&fit=crop" 
              alt="Medical Team" 
              className="rounded-[40px] shadow-2xl relative z-10 border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-400/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-300/10 rounded-full blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">About Our Clinic</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-light text-white leading-tight">
              Where Technology Meets <br />
              <b>Human Compassion</b>
            </h3>
            <p className="text-white/50 text-lg leading-relaxed">
              Founded in 2018, Elite Dental Studio was born from a vision to strip away the "clinical" coldness of traditional dentistry. We believe that a beautiful smile shouldn't come with stress.
            </p>
            <div className="space-y-4">
              {[
                'State-of-the-art 3D digital imaging',
                'Minimalist, anxiety-free environment',
                'Transparent pricing & expert consultations',
                'Premium results for all ages'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/70">
                  <div className="bg-brand-400/10 p-1 rounded-full text-brand-400">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button className="rounded-full h-12 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm">
              Read Our Full Story
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dentist Team Section */}
      <section className="py-24 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Meet Our Professionals</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-light text-white">Expertise <b>You Can Trust</b></h3>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-[32px] shadow-xl aspect-[4/5] border border-white/10">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl shadow-xl">
                <h4 className="text-2xl font-bold text-white">{member.name}</h4>
                <p className="text-brand-400 font-bold uppercase text-xs tracking-widest">{member.role}</p>
                <div className="flex gap-4 mt-4">
                  <Instagram size={18} className="text-white/40 hover:text-brand-400 cursor-pointer transition-colors" />
                  <Twitter size={18} className="text-white/40 hover:text-brand-400 cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Reviews</h2>
              <h3 className="text-4xl font-heading font-light text-white">What Our <b>Patients Say</b></h3>
              <p className="text-white/50">Join thousands of patients who have transformed their oral health journey with us.</p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-extrabold text-white">4.9/5</div>
                <div>
                  <div className="flex text-brand-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-white/30 tracking-widest uppercase font-bold mt-1">Global Standard</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="glass p-10 rounded-[32px] space-y-6"
                >
                  <p className="text-white/80 italic text-lg leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow-md border border-white/20" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-brand-400 text-[10px] uppercase tracking-widest font-bold">{t.role}</p>
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
        <div className="max-w-7xl mx-auto rounded-[48px] bg-slate-900 relative overflow-hidden p-12 md:p-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-white">Get in Touch</h3>
                <p className="text-slate-400 text-lg">Have questions or ready to book? We're here to help you achieve your best smile yet.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="bg-brand-600/20 p-4 rounded-2xl text-brand-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Our Clinic</p>
                    <p className="text-slate-400">123 Dental Street, Medical District, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-brand-600/20 p-4 rounded-2xl text-brand-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Call Us</p>
                    <p className="text-slate-400">+1 (555) 000-1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-brand-600/20 p-4 rounded-2xl text-brand-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Email Us</p>
                    <p className="text-slate-400">hello@luminadental.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="rounded-[32px] overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 h-[300px]">
                {/* Static Map Mockup */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                  alt="Location" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center">
                <p className="text-white text-2xl font-heading font-bold mb-6">Ready to Book?</p>
                <Link to="/appointment">
                  <Button className="w-full h-16 rounded-3xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xl shadow-2xl shadow-brand-500/20">
                    Secure Your Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
