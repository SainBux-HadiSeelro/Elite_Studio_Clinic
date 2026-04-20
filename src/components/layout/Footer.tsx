import { Stethoscope, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-transparent text-white/60 pt-20 pb-10 px-4 mt-20 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-400 p-2 rounded-xl text-background shadow-[0_0_15px_rgba(79,209,197,0.3)]">
                <Stethoscope size={24} />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-[2px] text-white">
                ELITE<span className="text-brand-400">STUDIO</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed text-sm">
              Experience the future of dentistry with our minimalist, tech-forward approach to oral health and beauty.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-400 hover:text-background transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-400 hover:text-background transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-400 hover:text-background transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-[13px] uppercase tracking-[2px] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
              <li><a href="/#services" className="hover:text-brand-400 transition-colors">Services</a></li>
              <li><a href="/#about" className="hover:text-brand-400 transition-colors">About Us</a></li>
              <li><Link to="/appointment" className="hover:text-brand-400 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-[13px] uppercase tracking-[2px] mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Veneers & Aesthetics</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Digital Implants</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Laser Treatment</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Teeth Whitening</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-[13px] uppercase tracking-[2px] mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3 items-start">
                <MapPin className="text-brand-400 shrink-0" size={18} />
                <span className="text-white/40">123 Dental Street, Medical District, NY 10001</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-brand-400 shrink-0" size={18} />
                <span className="text-white/40">+1 (555) 000-1234</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-brand-400 shrink-0" size={18} />
                <span className="text-white/40">hello@luminadental.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[11px] uppercase tracking-[2px] font-bold">
          <div>128 Madison Ave, Manhattan NY</div>
          <div>EST. 2012 — Elite Medical Group</div>
          <p>© {new Date().getFullYear()} Elite Dental Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
