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
  Sparkles
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.service) newErrors.service = 'Service is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-lg w-full p-12 text-center rounded-[48px]"
        >
          <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-4">Appointment Requested!</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-lg">
            Thank you, <span className="font-bold text-slate-900">{formData.name}</span>! We've received your request for a <span className="font-bold text-brand-600">{formData.service}</span> appointment on <span className="font-bold">{date && format(date, 'PPP')}</span>. One of our coordinators will contact you shortly to confirm.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-lg shadow-xl shadow-brand-200">
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 bg-slate-50/50">
      <div className="max-w-4xl mx-auto pt-12 md:pt-20">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-600 font-medium mb-10 transition-colors group">
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} /> Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header Info */}
          <div className="lg:col-span-4 lg:py-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-brand-400/10 p-4 rounded-3xl text-brand-400 w-fit">
                <Sparkles size={32} />
              </div>
              <p className="text-brand-400 font-bold uppercase tracking-[4px] text-xs">Reservations</p>
              <h1 className="text-4xl font-heading font-light text-white">Book Your <br /><b>Elite Experience</b></h1>
              <p className="text-white/50 leading-relaxed text-sm">
                Take the first step toward a healthier, more beautiful smile. Our booking process is as seamless as our care.
              </p>
            </motion.div>

            <div className="space-y-6 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <CheckCircle2 size={20} />
                </div>
                <p className="font-medium text-slate-700">Initial consult included</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <CheckCircle2 size={20} />
                </div>
                <p className="font-medium text-slate-700">Digital X-rays available</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <CheckCircle2 size={20} />
                </div>
                <p className="font-medium text-slate-700">Insurance pre-check</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 glass p-8 md:p-12 rounded-[48px]"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Quick Booking</h2>
              <p className="text-white/40 text-sm">Select your luxury treatment plan.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Full Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Julian Thorne" 
                    className={cn("h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400", errors.name && "border-destructive")}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="j.thorne@premium.com" 
                    className={cn("h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400", errors.email && "border-destructive")}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    className={cn("h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400", errors.phone && "border-destructive")}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="service" className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} /> Treatment
                  </Label>
                  <Select onValueChange={(v) => setFormData({...formData, service: v})}>
                    <SelectTrigger className={cn("h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400", errors.service && "border-destructive")}>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl glass border-white/10 text-white">
                      <SelectItem value="Composite Bonding">Composite Bonding</SelectItem>
                      <SelectItem value="Veneers & Aesthetics">Veneers & Aesthetics</SelectItem>
                      <SelectItem value="Teeth Whitening">Teeth Whitening</SelectItem>
                      <SelectItem value="Digital Implants">Digital Implants</SelectItem>
                      <SelectItem value="Laser Treatment">Laser Treatment</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && <p className="text-xs text-destructive font-medium">{errors.service}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <CalendarIcon size={14} /> Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400",
                          !date && "text-white/30",
                          errors.date && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-3xl glass border-white/10 shadow-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-xs text-destructive font-medium">{errors.date}</p>}
                </div>
                <div className="space-y-3">
                  <Label className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Time
                  </Label>
                  <Select onValueChange={(v) => setFormData({...formData, time: v})}>
                    <SelectTrigger className={cn("h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400", errors.time && "border-destructive")}>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl glass border-white/10 text-white">
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                      <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-xs text-destructive font-medium">{errors.time}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-white/30 text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} /> Personal Requests
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your concerns..." 
                  className="rounded-xl bg-white/5 border-white/10 text-white focus:ring-brand-400 min-h-[120px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-18 rounded-3xl btn-gradient text-lg uppercase tracking-widest h-16"
              >
                {isLoading ? "Processing..." : "Finalize Appointment"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
