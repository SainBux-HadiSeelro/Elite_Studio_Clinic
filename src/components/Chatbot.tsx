import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Stethoscope, 
  Bot, 
  User, 
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string; href?: string }[];
}

// Comprehensive Clinic Knowledge Base for 24/7 autonomous responses
const CLINIC_KNOWLEDGE = {
  name: "Elite Studio Clinic (Elite Dental Studio)",
  location: "123 Dental Street, Medical District, Manhattan, NY 10001",
  hours: "Monday – Friday: 8:00 AM – 8:00 PM | Saturday: 9:00 AM – 5:00 PM | Sunday: On-Call Urgent Dental Triage",
  phone: "+1 (555) 000-1234",
  email: "concierge@elitestudioclinic.com",
  doctors: [
    { name: "Dr. Elena Vance", role: "Lead Cosmetic Dentist & Founder", spec: "Porcelain Veneers & Digital Smile Design (14+ yrs exp, Harvard Dental Alum)" },
    { name: "Dr. James Roscoe", role: "Orthodontist Specialist", spec: "Invisalign Diamond Provider & Accelerated Clear Alignment" },
    { name: "Dr. Marcus Thorne", role: "Oral Surgeon & Implantologist", spec: "Same-Day Guided 3D Implants & Full Mouth Rejuvenation" }
  ],
  services: [
    { name: "Porcelain Veneers & Smile Makeovers", price: "$1,200 – $2,500 per tooth", duration: "2 appointments (1-2 weeks total)", pain: "Virtually painless with local sedation & digital prep" },
    { name: "Invisalign & Clear Aligners", price: "$3,200 – $5,800 full treatment", duration: "6 to 18 months average", pain: "Mild pressure during initial tray changes" },
    { name: "In-Office Laser Teeth Whitening", price: "$450 – $650 per session", duration: "60-90 minutes single session", pain: "Zero to minimal sensitivity with our enamel shield protocol" },
    { name: "Digital Guided Dental Implants", price: "$2,200 – $4,500 per tooth", duration: "Single-day placement with 3D surgical guide", pain: "Gentle local anesthesia with twilight sedation option" },
    { name: "Composite Resin Bonding", price: "$350 – $750 per tooth", duration: "Single visit (45 mins per tooth)", pain: "Painless, zero tooth reduction needed" },
    { name: "Routine Checkup & Guided Biofilm Cleaning", price: "$180 – $320", duration: "45 minutes", pain: "Comfortable, spa-like ultrasonic air-flow cleaning" }
  ],
  insurance: "We accept all major PPO insurance plans (Delta Dental, Cigna, MetLife, Aetna, Guardian, BlueCross). We also offer 0% APR 12-to-24 month financing via CareCredit and Cherry.",
  amenities: "Soundproof private suites, noise-canceling headphones, Netflix ceiling screens, sedation dentistry, and complimentary espresso/tea bar."
};

const INITIAL_SUGGESTIONS = [
  "✨ Veneers & Smile Makeovers",
  "💰 Pricing & Insurance",
  "📅 Book Appointment",
  "🦷 Invisalign Duration",
  "🚨 Dental Emergency Care"
];

function formatTime(date: Date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hello and welcome to Elite Studio Clinic! I'm Aura, your 24/7 Live Dental Concierge. How may I assist your smile transformation today?",
      timestamp: formatTime(),
      quickActions: [
        { label: "Book Consultation", action: "book", href: "/appointment" },
        { label: "View Pricing", action: "pricing" },
        { label: "Our Doctors", action: "doctors" }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  // Autonomous Clinic Intelligence Engine
  const generateClinicResponse = (query: string): { text: string; quickActions?: { label: string; action: string; href?: string }[] } => {
    const q = query.toLowerCase();

    // 1. Appointment / Booking
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('visit') || q.includes('consultation')) {
      return {
        text: "You can reserve your private consultation directly through our VIP booking calendar. We offer flexible slots Monday through Saturday, including early morning and evening hours.",
        quickActions: [
          { label: "Reserve Online Now", action: "book", href: "/appointment" },
          { label: "Call Us (+1 555-000-1234)", action: "call" }
        ]
      };
    }

    // 2. Pricing, Cost, Insurance, Financing
    if (q.includes('cost') || q.includes('price') || q.includes('fee') || q.includes('insurance') || q.includes('finance') || q.includes('payment') || q.includes('how much')) {
      return {
        text: `Here is our transparent investment guide:\n\n• Porcelain Veneers: $1,200 – $2,500/tooth\n• Invisalign Clear Aligners: $3,200 – $5,800 complete\n• Laser In-Office Whitening: $450 – $650 (1 session)\n• 3D Guided Implants: $2,200 – $4,500\n• Composite Bonding: $350 – $750/tooth\n\n💳 We accept all major PPOs and offer 0% APR 12-month financing with CareCredit and Cherry.`,
        quickActions: [
          { label: "Book Free Consult", action: "book", href: "/appointment" },
          { label: "Insurance Details", action: "insurance" }
        ]
      };
    }

    // 3. Veneers / Cosmetic Dentistry
    if (q.includes('veneer') || q.includes('cosmetic') || q.includes('bonding') || q.includes('makeover')) {
      return {
        text: `Our bespoke Porcelain Veneers are ultra-thin (0.3mm) custom porcelain shells crafted to enhance tooth shape, shade, and symmetry.\n\n✨ Lead Specialist: Dr. Elena Vance (14+ yrs exp)\n⏱ Timeline: 2 appointments within 10-14 days\n🛡 Longevity: 15–20+ years with proper care\n🎯 Ideal for: Chipped, discolored, gapped, or uneven teeth.`,
        quickActions: [
          { label: "Schedule Veneer Assessment", action: "book", href: "/appointment" },
          { label: "Compare with Bonding", action: "bonding" }
        ]
      };
    }

    // 4. Invisalign / Orthodontics
    if (q.includes('invisalign') || q.includes('brace') || q.includes('ortho') || q.includes('align')) {
      return {
        text: `Elite Studio is a Diamond-Tier Invisalign provider led by Dr. James Roscoe.\n\n• Average treatment: 6–14 months\n• Discreet, clear, removable medical-grade aligners\n• Includes digital 3D iTero scan with instant before-and-after smile simulation during your initial consult!`,
        quickActions: [
          { label: "Book 3D Smile Scan", action: "book", href: "/appointment" },
          { label: "Pricing Breakdown", action: "pricing" }
        ]
      };
    }

    // 5. Teeth Whitening
    if (q.includes('whiten') || q.includes('bleach') || q.includes('stain') || q.includes('bright')) {
      return {
        text: `Our in-office Laser Whitening delivers up to 8 shades whiter in a single 75-minute visit. We apply a protective potassium nitrate desensitizer to eliminate post-treatment sensitivity.`,
        quickActions: [
          { label: "Book Whitening Session", action: "book", href: "/appointment" },
          { label: "Ask About Veneers", action: "veneers" }
        ]
      };
    }

    // 6. Implants & Surgery
    if (q.includes('implant') || q.includes('missing') || q.includes('surgery') || q.includes('extraction')) {
      return {
        text: `Dr. Marcus Thorne specializes in 3D Computer-Guided Dental Implants. Using high-resolution CBCT scans, we place implants with sub-millimeter precision for faster osseointegration and near-zero discomfort.`,
        quickActions: [
          { label: "Book Implant Evaluation", action: "book", href: "/appointment" },
          { label: "Sedation Options", action: "sedation" }
        ]
      };
    }

    // 7. Doctors / Team
    if (q.includes('doctor') || q.includes('dentist') || q.includes('team') || q.includes('elena') || q.includes('thorne') || q.includes('roscoe')) {
      return {
        text: `Our clinical leadership team:\n\n• Dr. Elena Vance — Lead Cosmetic Dentist & Founder (Harvard Dental, Aesthetic Mastership)\n• Dr. James Roscoe — Orthodontics & Invisalign Diamond Specialist\n• Dr. Marcus Thorne — Oral Maxillofacial Surgeon & Implant Specialist.`,
        quickActions: [
          { label: "Meet the Team", action: "team" },
          { label: "Book Appointment", action: "book", href: "/appointment" }
        ]
      };
    }

    // 8. Emergency / Pain
    if (q.includes('emergency') || q.includes('pain') || q.includes('broken') || q.includes('hurt') || q.includes('urgent') || q.includes('bleed')) {
      return {
        text: `🚨 Urgent Dental Care: If you are in severe pain, have a knocked-out tooth, or excessive bleeding, please call our direct emergency line immediately at +1 (555) 000-1234. We accommodate same-day emergency appointments.`,
        quickActions: [
          { label: "Call Emergency (+1 555-000-1234)", action: "call" },
          { label: "Book Urgent Slot", action: "book", href: "/appointment" }
        ]
      };
    }

    // 9. Hours & Location
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('hour') || q.includes('time') || q.includes('open')) {
      return {
        text: `📍 Location: 123 Dental Street, Medical District, Manhattan, NY 10001\n\n🕒 Hours:\n• Monday – Friday: 8:00 AM – 8:00 PM\n• Saturday: 9:00 AM – 5:00 PM\n• Sunday: Emergency triage on-call\n\nValet parking is available for all reserved clients.`,
        quickActions: [
          { label: "Directions on Map", action: "map" },
          { label: "Book a Visit", action: "book", href: "/appointment" }
        ]
      };
    }

    // 10. Default Intelligent Response
    return {
      text: `Thank you for asking! Elite Studio Clinic provides premier cosmetic, restorative, and orthodontic dental care. I can help you with treatment details, pricing & insurance, doctor bios, or booking your private consultation. What would you like to explore?`,
      quickActions: [
        { label: "Book Consultation", action: "book", href: "/appointment" },
        { label: "Treatment Pricing", action: "pricing" },
        { label: "Veneers Info", action: "veneers" },
        { label: "Clinic Location", action: "location" }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: formatTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = generateClinicResponse(query);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: formatTime(),
        quickActions: response.quickActions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickAction = (action: string, href?: string) => {
    if (href) {
      setIsOpen(false);
      return;
    }
    let query = action;
    if (action === 'pricing') query = "What are your treatment costs and do you accept insurance?";
    if (action === 'doctors') query = "Tell me about your lead dentists and specialists.";
    if (action === 'veneers') query = "Can you explain the porcelain veneers procedure?";
    if (action === 'bonding') query = "What is composite bonding and how does it compare to veneers?";
    if (action === 'insurance') query = "Which insurance plans and financing options do you accept?";
    if (action === 'location') query = "Where is your clinic located and what are your opening hours?";
    if (action === 'team') query = "What are the credentials of your dentists?";
    if (action === 'sedation') query = "Do you offer sedation dentistry for anxious patients?";
    if (action === 'call') query = "How can I call the clinic?";
    if (action === 'map') query = "Where is your clinic located?";

    handleSend(query);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-400/30 text-xs font-semibold text-white shadow-xl cursor-pointer hover:border-brand-400 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            <span>24/7 AI Clinic Concierge</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full btn-gradient flex items-center justify-center text-background shadow-[0_10px_30px_rgba(79,209,197,0.4)] cursor-pointer"
          aria-label="Open 24/7 AI Concierge"
        >
          {isOpen ? <X size={24} /> : <Bot size={26} />}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg animate-pulse">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed z-50 rounded-3xl glass border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[540px] sm:h-[750px] h-[90vh]' 
                : 'bottom-22 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[600px] max-h-[80vh]'
            }`}
          >
            {/* Header */}
            <div className="p-4 px-6 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-brand-400/20 border border-brand-400/30 flex items-center justify-center text-brand-400">
                    <Sparkles size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c1219]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-heading font-bold text-sm">Aura Concierge</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-400/10 text-brand-400 border border-brand-400/20">
                      24/7 Live AI
                    </span>
                  </div>
                  <p className="text-white/40 text-[11px] flex items-center gap-1">
                    <ShieldCheck size={12} className="text-brand-400" /> Elite Studio Verified Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/50">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:block"
                  aria-label="Toggle Expand"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close Chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Live Operational Status Banner */}
            <div className="px-4 py-2 bg-brand-400/5 border-b border-white/5 flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-brand-400" /> Average response: &lt; 1 second
              </span>
              <span className="text-brand-400 font-semibold">Live Clinic Dispatch Ready</span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0 mb-1">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-400 text-background font-medium rounded-br-xs shadow-md shadow-brand-400/10'
                          : 'bg-white/[0.05] border border-white/10 text-white/90 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  <span className="text-[10px] text-white/30 px-9 mt-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Action Chips attached to message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-9">
                      {msg.quickActions.map((qa, i) => (
                        qa.href ? (
                          <Link 
                            key={i} 
                            to={qa.href} 
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-400/20 hover:bg-brand-400 text-brand-300 hover:text-background border border-brand-400/30 transition-all shadow-sm"
                          >
                            <Calendar size={12} /> {qa.label} <ChevronRight size={12} />
                          </Link>
                        ) : (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(qa.action)}
                            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                          >
                            {qa.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <div className="w-7 h-7 rounded-xl bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02]">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {INITIAL_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="shrink-0 text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 hover:bg-brand-400/20 text-white/60 hover:text-brand-300 border border-white/5 transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white/[0.03] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, pricing, recovery, booking..."
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm px-4 py-3 rounded-2xl outline-none focus:border-brand-400/50 transition-colors"
              />
              <Button
                type="submit"
                disabled={!input.trim()}
                className="w-11 h-11 rounded-2xl btn-gradient flex items-center justify-center p-0 shrink-0 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
