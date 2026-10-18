import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Stethoscope, Menu, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'py-3' : 'py-6'
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto rounded-3xl transition-all duration-500 overflow-hidden',
          isScrolled 
            ? 'glass py-2 px-6 shadow-xl' 
            : 'bg-transparent py-2 px-6'
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-400 p-2 rounded-xl text-background group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(79,209,197,0.4)]">
              <Stethoscope size={24} />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-[2px] text-white">
              ELITE<span className="text-brand-400">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[13px] font-bold text-white/60 hover:text-brand-400 uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to="/appointment">
              <Button className="rounded-full px-8 btn-gradient">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-4 right-4 glass rounded-3xl p-6 shadow-2xl flex flex-col gap-3 bg-[#0c1219]/95 border border-white/10"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-base font-semibold text-white/80 hover:text-brand-400 py-2.5 border-b border-white/10 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)} className="pt-2">
            <Button className="w-full rounded-full btn-gradient uppercase tracking-widest text-xs font-bold h-12">
              Book Appointment
            </Button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
