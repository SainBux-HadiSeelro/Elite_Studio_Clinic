import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const VIP_BENEFITS = [
  { icon: Sparkles, title: "Complimentary 3D Digital Scan", desc: "High-resolution intraoral imaging & instant before/after simulation" },
  { icon: ShieldCheck, title: "100% Painless Guarantee", desc: "Computer-assisted local anesthesia & twilight sedation options" },
  { icon: Award, title: "Direct Specialist Consultation", desc: "1-on-1 private case design with Dr. Elena Vance or Dr. Roscoe" },
  { icon: Zap, title: "Insurance & 0% APR Financing", desc: "Immediate benefits pre-check with CareCredit & Cherry support" }
];

export default function Appointment() {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!date) newErrors.date = 'Please select a preferred date';
    if (!formData.time) newErrors.time = 'Please select a preferred time slot';
    if (!formData.service) newErrors.service = 'Please select a service';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1200);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/10 blur-[140px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass max-w-xl w-full p-8 md:p-14 text-center rounded-[40px] border border-white/10 shadow-2xl relative z-10"
        >
          <div className="w-20 h-20 bg-brand-400/20 text-brand-400 border border-brand-400/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(79,209,197,0.3)]">
            <CheckCircle2 size={44} />
          </div>

          <span className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Reservation Confirmed</span>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-white mt-2 mb-4">
            Appointment <b>Requested</b>
          </h2>
          
          <p className="text-white/60 mb-8 leading-relaxed text-base">
            Thank you, <span className="font-bold text-white">{formData.name}</span>! We have reserved your VIP consultation request for <span className="font-bold text-brand-400">{formData.service}</span> on <span className="font-bold text-white">{date && format(date, 'EEEE, MMMM do, yyyy')}</span> at <span className="font-bold text-brand-400">{formData.time}</span>.
          </p>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left mb-8 space-y-2 text-xs text-white/50">
            <div className="flex justify-between">
              <span>Patient Name:</span>
              <span className="text-white font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Contact:</span>
              <span className="text-white font-medium">{formData.phone} • {formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Clinic Location:</span>
              <span className="text-white font-medium">123 Dental St, Manhattan NY</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full h-14 rounded-full btn-gradient uppercase tracking-widest text-xs font-bold">
                Return to Clinic Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-400/10 blur-[130px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-1/3 left-0 -z-10 w-[500px] h-[500px] bg-brand-300/10 blur-[120px] rounded-full -translate-x-1/3" />

      <div className="max-w-7xl mx-auto pt-8 md:pt-14">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/50 hover:text-brand-400 font-semibold mb-8 transition-colors group text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} /> Back to Clinic
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header Info & VIP Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-400 text-xs font-bold uppercase tracking-[3px]">
                <Sparkles size={14} /> VIP Concierge Booking
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-light leading-tight text-white">
                Reserve Your <b>Elite Smile</b> Experience.
              </h1>
              <p className="text-white/60 leading-relaxed text-base">
                Experience bespoke aesthetics where cutting-edge technology meets calm luxury. Choose your preferred specialist, treatment, and schedule below.
              </p>
            </motion.div>

            {/* VIP Benefits Cards */}
            <div className="space-y-4 pt-4">
              <p className="text-xs font-bold text-brand-400 uppercase tracking-[3px]">What's Included In Your Visit</p>
              <div className="grid grid-cols-1 gap-3">
                {VIP_BENEFITS.map((b, idx) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-4 rounded-2xl glass border border-white/5 flex items-start gap-4 hover:border-brand-400/30 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-brand-400/10 text-brand-400 shrink-0">
                      <b.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{b.title}</h4>
                      <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Direct Assistance Card */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-400/10 text-brand-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Need Immediate Assistance?</p>
                  <p className="text-white font-bold text-base">+1 (555) 000-1234</p>
                </div>
              </div>
              <p className="text-xs text-white/40">Our concierge desk is live Monday – Saturday, 8am – 8pm EST.</p>
            </div>
          </div>

          {/* Booking Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-7 glass p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl relative"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-light text-white">Treatment <b>Reservation</b></h2>
                  <p className="text-white/40 text-sm mt-1">Direct calendar sync with clinical specialists.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Availability
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} className="text-brand-400" /> Full Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Julian Thorne" 
                    className={cn(
                      "h-13 rounded-2xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-brand-400 focus:ring-brand-400/20",
                      errors.name && "border-destructive focus:border-destructive"
                    )}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={13} className="text-brand-400" /> Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="e.g. j.thorne@luxury.com" 
                    className={cn(
                      "h-13 rounded-2xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-brand-400 focus:ring-brand-400/20",
                      errors.email && "border-destructive focus:border-destructive"
                    )}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={13} className="text-brand-400" /> Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    className={cn(
                      "h-13 rounded-2xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-brand-400 focus:ring-brand-400/20",
                      errors.phone && "border-destructive focus:border-destructive"
                    )}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={13} className="text-brand-400" /> Select Treatment
                  </Label>
                  <Select onValueChange={(v) => setFormData({...formData, service: v})}>
                    <SelectTrigger className={cn(
                      "h-13 rounded-2xl bg-white/[0.03] border-white/10 text-white focus:border-brand-400 focus:ring-brand-400/20",
                      errors.service && "border-destructive"
                    )}>
                      <SelectValue placeholder="Choose luxury service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl glass border-white/15 text-white bg-[#0c1219]/95 backdrop-blur-xl">
                      <SelectItem value="Porcelain Veneers & Makeover">Porcelain Veneers & Smile Makeover</SelectItem>
                      <SelectItem value="Invisalign Clear Aligners">Invisalign & Orthodontic Alignment</SelectItem>
                      <SelectItem value="In-Office Laser Whitening">In-Office Laser Whitening</SelectItem>
                      <SelectItem value="3D Guided Dental Implants">3D Guided Dental Implants</SelectItem>
                      <SelectItem value="Composite Resin Bonding">Composite Resin Bonding</SelectItem>
                      <SelectItem value="Comprehensive Checkup & Cleaning">Comprehensive Checkup & Spa Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon size={13} className="text-brand-400" /> Appointment Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-13 justify-start text-left font-normal rounded-2xl bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.08] hover:text-white focus:border-brand-400",
                          !date && "text-white/30",
                          errors.date && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-brand-400" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-3xl glass border-white/15 shadow-2xl bg-[#0c1219]/95 backdrop-blur-xl" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-400" /> Preferred Time
                  </Label>
                  <Select onValueChange={(v) => setFormData({...formData, time: v})}>
                    <SelectTrigger className={cn(
                      "h-13 rounded-2xl bg-white/[0.03] border-white/10 text-white focus:border-brand-400",
                      errors.time && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl glass border-white/15 text-white bg-[#0c1219]/95 backdrop-blur-xl">
                      <SelectItem value="09:00 AM (Morning VIP)">09:00 AM (Morning VIP)</SelectItem>
                      <SelectItem value="10:30 AM (Morning)">10:30 AM (Morning)</SelectItem>
                      <SelectItem value="01:00 PM (Afternoon)">01:00 PM (Afternoon)</SelectItem>
                      <SelectItem value="02:30 PM (Afternoon)">02:30 PM (Afternoon)</SelectItem>
                      <SelectItem value="04:00 PM (Late Afternoon)">04:00 PM (Late Afternoon)</SelectItem>
                      <SelectItem value="06:00 PM (Evening Executive)">06:00 PM (Evening Executive)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
                </div>
              </div>

              {/* Personal Notes / Concerns */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-brand-400" /> Patient Goals & Clinical Notes (Optional)
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Share any aesthetic goals, dental anxieties, previous dental history, or questions..." 
                  className="rounded-2xl bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-brand-400 min-h-[110px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-15 rounded-full btn-gradient text-sm uppercase tracking-[3px] font-bold shadow-xl shadow-brand-400/20 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    Reserving Consultation...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Confirm VIP Reservation <ChevronRight size={18} />
                  </span>
                )}
              </Button>

              <p className="text-center text-[11px] text-white/30">
                🔒 Privacy Protected. No payment required until your treatment plan is agreed upon.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
