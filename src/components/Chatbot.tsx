import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  X, 
  Sparkles, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Stethoscope, 
  Bot, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Volume2,
  VolumeX,
  CreditCard,
  MapPin,
  HelpCircle,
  Zap,
  Award
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

// Complete Clinic Knowledge Graph for 24/7 autonomous responses
const CLINIC_KNOWLEDGE = {
  name: "Elite Studio Clinic (Elite Dental Studio)",
  tagline: "Ultra-Luxury Aesthetic & Restorative Dental Studio",
  address: "123 Dental Street, Medical District, Manhattan, NY 10001",
  landmark: "Direct subway access, private elevator, complimentary valet parking on arrival",
  hours: {
    weekdays: "Monday – Friday: 8:00 AM – 8:00 PM",
    saturday: "Saturday: 9:00 AM – 5:00 PM",
    sunday: "Sunday: On-Call Urgent Dental Triage & Priority Care"
  },
  contact: {
    phone: "+1 (555) 000-1234",
    email: "concierge@elitestudioclinic.com",
    desk: "Live Concierge Reception Desk & VIP Liaison"
  },
  doctors: [
    {
      name: "Dr. Elena Vance",
      title: "Lead Cosmetic Dentist & Founder",
      credentials: "DDS, Harvard School of Dental Medicine • AACD Accredited Fellow",
      experience: "14+ years refining elite smiles",
      specialty: "Handcrafted Porcelain Veneers, Smile Design & Aesthetic Rejuvenation",
      bio: "Pioneered micro-invasive digital veneer preparations with sub-millimeter precision."
    },
    {
      name: "Dr. James Roscoe",
      title: "Orthodontic Specialist",
      credentials: "MSc Orthodontics, Columbia University • Invisalign Diamond Plus Provider",
      experience: "12+ years in facial alignment",
      specialty: "Invisalign Clear Aligners & Accelerated Facial Harmonization",
      bio: "Specializes in non-extraction facial balance harmonizing and digital 3D bite correction."
    },
    {
      name: "Dr. Marcus Thorne",
      title: "Oral Maxillofacial & Implant Surgeon",
      credentials: "DDS, MD, NYU Langone Health • ICOI Diplomate",
      experience: "15+ years surgical expertise",
      specialty: "3D CBCT Computer-Guided Dental Implants & Twilight Sedation",
      bio: "Leader in same-day immediate implant restoration and 100% painless sedation dentistry."
    }
  ],
  services: [
    {
      name: "Porcelain Veneers & Smile Makeovers",
      price: "$1,200 – $2,500 per tooth",
      duration: "2 appointments across 10–14 days",
      pain: "Virtually painless; micro-prep (0.3mm) with gentle local anesthesia",
      details: "Custom hand-layered E.max ceramic shells tailored to enhance tooth shape, shade, and symmetry with 15–20+ year longevity."
    },
    {
      name: "Invisalign® Diamond Alignment",
      price: "$3,200 – $5,800 complete treatment",
      duration: "6 to 14 months average",
      pain: "Mild initial pressure with tray swaps; zero metal brackets or mouth sores",
      details: "Discreet medical-grade clear aligners with instant 3D iTero digital simulation of your completed smile."
    },
    {
      name: "In-Office Laser Teeth Whitening",
      price: "$450 – $650 per session",
      duration: "Single 75-minute appointment",
      pain: "Zero to minimal sensitivity with proprietary potassium nitrate enamel shield",
      details: "Medical-grade Biolase photo-activation lifting enamel up to 8 clinical shades in 1 visit."
    },
    {
      name: "3D Computer-Guided Dental Implants",
      price: "$2,200 – $4,500 per tooth",
      duration: "Single-day computer-guided placement",
      pain: "Gentle local anesthesia with twilight sedation; faster healing via 3D CBCT mapping",
      details: "Permanent biocompatible titanium/zirconia root replacements engineered for permanent function."
    },
    {
      name: "Composite Resin Bonding",
      price: "$350 – $750 per tooth",
      duration: "Single visit (45 mins per tooth)",
      pain: "Painless, non-invasive; zero natural tooth reduction needed",
      details: "Direct aesthetic resin sculpting to fix chips, small gaps, and uneven edges in 1 hour."
    },
    {
      name: "Routine Hygiene & Guided Biofilm Therapy",
      price: "$180 – $320",
      duration: "45 minutes",
      pain: "Spa-like gentle warmth; replaces traditional metal scraping",
      details: "Swiss-engineered warm water and erythritol powder cleaning that lifts stubborn calculus painlessly."
    }
  ],
  insurance: {
    accepted: "We accept all major PPO insurance plans including Delta Dental, Cigna, MetLife, Aetna, Guardian, and BlueCross BlueShield.",
    financing: "0% APR promotional financing for 12 to 24 months via CareCredit and Cherry with instant soft-credit approval."
  },
  technology: [
    "3D CBCT Low-Dose Imaging (80% less radiation than legacy machines)",
    "iTero® Lumina 3D Scanners (optical digital impression in 90 seconds — no messy paste)",
    "Guided Biofilm Swiss Air-Flow Therapy (painless calculus removal)",
    "Computerized Single-Tooth Wand Anesthesia (no facial numbness or drooping)"
  ],
  amenities: [
    "Private soundproof treatment suites",
    "Ceiling Netflix streaming screens with noise-canceling headphones",
    "Twilight oral & IV sedation for anxious patients",
    "Complimentary organic espresso and herbal tea bar",
    "Reserved valet parking on arrival"
  ]
};

const INITIAL_SUGGESTIONS = [
  "✨ Veneers & Smile Makeovers",
  "💰 Pricing & 0% Financing",
  "📅 Book Consultation",
  "🦷 Invisalign Duration",
  "👨‍⚕️ Meet Dr. Vance & Team",
  "🚨 Emergency Care"
];

function formatTime(date: Date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Subtle Web Audio tone generator (zero external assets needed)
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore audio restriction if browser blocks autoplay
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Welcome to Elite Studio Clinic! 💎\n\nI am Aura, your 24/7 Live Dental Concierge. I have complete access to our Manhattan studio's procedures, fees, doctor credentials, and real-time scheduling.\n\nHow may I assist your smile transformation today?",
      timestamp: formatTime(),
      quickActions: [
        { label: "Book Consultation", action: "book", href: "/appointment" },
        { label: "Pricing & Insurance", action: "pricing" },
        { label: "Our Specialists", action: "doctors" },
        { label: "Emergency Care", action: "emergency" }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  // Comprehensive 24/7 Live Autonomous Knowledge Engine (English + Roman Urdu / Hindi)
  const generateClinicResponse = (query: string): { text: string; quickActions?: { label: string; action: string; href?: string }[] } => {
    const q = query.toLowerCase();

    // 1. Roman Urdu / Urdu Queries Detection
    // Appointment / Booking in Roman Urdu
    if (q.includes('appointment lena') || q.includes('time lena') || q.includes('book karni') || q.includes('book krna') || q.includes('milan')) {
      return {
        text: "Ji bilkul! Aap hamara VIP consultation slot direct online book kar sakte hain.\n\n🗓️ Timing: Monday – Friday: 8:00 AM – 8:00 PM | Saturday: 9:00 AM – 5:00 PM.\n✨ Initial consult mein complimentary 3D digital smile scan shamil hai.\n\nNeeche 'Reserve Online Now' pe click karein:",
        quickActions: [
          { label: "Reserve Online Now", action: "book", href: "/appointment" },
          { label: "Call Concierge Desk", action: "call" }
        ]
      };
    }

    // Cost / Pricing in Roman Urdu
    if (q.includes('kitna kharcha') || q.includes('kitne paise') || q.includes('fees kitni') || q.includes('price kya hai') || q.includes('kharch')) {
      return {
        text: `Elite Studio Clinic ki transparent pricing details ye hain:\n\n• Porcelain Veneers: $1,200 – $2,500 per tooth\n• Invisalign Clear Aligners: $3,200 – $5,800 mukammal course\n• Laser Teeth Whitening: $450 – $650 (Single 75-minute session)\n• 3D Guided Implants: $2,200 – $4,500 per tooth\n• Composite Bonding: $350 – $750 per tooth\n\n💳 Hum tamam major PPO insurance accept karte hain aur 0% APR 12-24 month financing (CareCredit & Cherry) bhi available hai!`,
        quickActions: [
          { label: "Book Free Consult", action: "book", href: "/appointment" },
          { label: "Insurance Information", action: "insurance" }
        ]
      };
    }

    // Pain / Dard in Roman Urdu
    if (q.includes('dard') || q.includes('takleef') || q.includes('pain hoga') || q.includes('dard to nhi')) {
      return {
        text: `Elite Studio Clinic mein hamara 100% Pain-Free Protocol hai! 🛡️\n\n• Hum computerized Wand Anesthesia use karte hain jis se sui ka dard mehsoos nahi hota aur na hi chehra sunn hota hai.\n• Anxious patients ke liye twilight sedation (nend jaisi halat) ki sahulat mojood hai.\n• Cleaning ke liye Swiss Guided Biofilm Air-Flow technology use hoti hai jis mein scraping nahi hoti!`,
        quickActions: [
          { label: "Sedation Dentistry Details", action: "sedation" },
          { label: "Book Painless Visit", action: "book", href: "/appointment" }
        ]
      };
    }

    // Location / Address in Roman Urdu
    if (q.includes('kahan hai') || q.includes('address kya hai') || q.includes('location kahan') || q.includes('clinic kahan')) {
      return {
        text: `📍 Clinic Address: 123 Dental Street, Medical District, Manhattan, NY 10001\n\n🚗 Har registered patient ke liye complimentary valet parking mojood hai aur private elevator access direct suite tak jata hai.\n🕒 Hours: Mon-Fri 8am-8pm | Sat 9am-5pm.`,
        quickActions: [
          { label: "Book Consultation", action: "book", href: "/appointment" },
          { label: "Call Reception", action: "call" }
        ]
      };
    }

    // 2. Appointment & Scheduling
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('visit') || q.includes('consultation') || q.includes('slot') || q.includes('reserve')) {
      return {
        text: "You can reserve your VIP consultation directly through our real-time scheduling calendar.\n\n✨ Your consultation includes a high-definition 3D digital smile scan and 1-on-1 aesthetic case design with Dr. Elena Vance or Dr. Roscoe.\n\nWe offer flexible morning, afternoon, and evening slots Monday through Saturday.",
        quickActions: [
          { label: "Reserve Online Now", action: "book", href: "/appointment" },
          { label: "Call Concierge (+1 555-000-1234)", action: "call" }
        ]
      };
    }

    // 3. Pricing, Costs, Fees, Insurance & Financing
    if (q.includes('cost') || q.includes('price') || q.includes('fee') || q.includes('insurance') || q.includes('finance') || q.includes('payment') || q.includes('how much') || q.includes('afford') || q.includes('carecredit') || q.includes('cherry')) {
      return {
        text: `Here is our transparent clinical fee guide:\n\n• Porcelain Veneers: $1,200 – $2,500/tooth\n• Invisalign Clear Aligners: $3,200 – $5,800 complete treatment\n• Laser In-Office Whitening: $450 – $650 per session\n• 3D Guided Implants: $2,200 – $4,500/tooth\n• Composite Bonding: $350 – $750/tooth\n• Guided Biofilm Hygiene: $180 – $320\n\n💳 Insurance: We accept all major PPO networks (Delta, Cigna, MetLife, Aetna, Guardian, BCBS).\n💰 0% APR Financing: Flexible 12 to 24-month payment plans via CareCredit & Cherry with instant approval.`,
        quickActions: [
          { label: "Book Free Consult", action: "book", href: "/appointment" },
          { label: "Insurance Verification", action: "insurance" },
          { label: "Veneers Details", action: "veneers" }
        ]
      };
    }

    // 4. Porcelain Veneers & Smile Makeovers
    if (q.includes('veneer') || q.includes('makeover') || q.includes('porcelain') || q.includes('laminate') || q.includes('smile design')) {
      return {
        text: `✨ Porcelain Veneers at Elite Studio:\n\n• Material: Handcrafted ultra-thin (0.3mm) E.max porcelain laminates\n• Lead Specialist: Dr. Elena Vance (Harvard Dental, AACD Fellow, 14+ yrs exp)\n• Timeline: 2 comfortable appointments across 10–14 days\n• Longevity: 15–20+ years with proper oral hygiene\n• Best for: Correcting severe discoloration, chipped enamel, gaps, or uneven tooth shapes\n\nWe provide a live 3D preview of your proposed smile before any preparation begins.`,
        quickActions: [
          { label: "Book Veneer Consult", action: "book", href: "/appointment" },
          { label: "Compare with Bonding", action: "bonding" },
          { label: "Pricing Breakdown", action: "pricing" }
        ]
      };
    }

    // 5. Invisalign & Orthodontics
    if (q.includes('invisalign') || q.includes('brace') || q.includes('ortho') || q.includes('align') || q.includes('straight') || q.includes('crooked') || q.includes('crossbite') || q.includes('crowd')) {
      return {
        text: `🦷 Invisalign® Diamond Provider Care:\n\n• Lead Clinician: Dr. James Roscoe (Columbia University MSc)\n• Average Duration: 6 to 14 months (monitored via virtual digital check-ins)\n• Technology: Optical iTero Lumina 3D scan with zero messy impression trays\n• Comfort: Removable, discreet medical-grade aligners with minimal speech impact\n• Included: Full arch refinement and custom retainers upon completion.`,
        quickActions: [
          { label: "Book 3D Smile Scan", action: "book", href: "/appointment" },
          { label: "Invisalign Pricing", action: "pricing" },
          { label: "Dr. Roscoe Bio", action: "roscoe" }
        ]
      };
    }

    // 6. Laser Teeth Whitening
    if (q.includes('whiten') || q.includes('bleach') || q.includes('stain') || q.includes('bright') || q.includes('yellow') || q.includes('coffee')) {
      return {
        text: `⚡ In-Office Laser Whitening:\n\n• Speed: Single 75-minute luxury clinical session\n• Efficacy: Clinically lifts enamel 6 to 8 shades in one visit\n• Anti-Sensitivity Guarantee: We apply our proprietary potassium nitrate remineralizing shield before and after light activation\n• Investment: $450 – $650 per session (includes home touch-up maintenance kit).`,
        quickActions: [
          { label: "Book Whitening Session", action: "book", href: "/appointment" },
          { label: "Ask About Veneers", action: "veneers" }
        ]
      };
    }

    // 7. Dental Implants & Surgery
    if (q.includes('implant') || q.includes('missing') || q.includes('surgery') || q.includes('extract') || q.includes('denture') || q.includes('bone graft') || q.includes('tooth loss')) {
      return {
        text: `🔬 3D Computer-Guided Dental Implants:\n\n• Specialist: Dr. Marcus Thorne (NYU Langone Health, ICOI Diplomate)\n• Technology: 3D CBCT bone mapping and custom surgical guides for sub-millimeter accuracy\n• Experience: Same-day immediate placement with painless recovery and twilight sedation options\n• Durability: Biocompatible titanium or ceramic zirconia roots designed for a lifetime of natural bite strength.`,
        quickActions: [
          { label: "Book Implant Evaluation", action: "book", href: "/appointment" },
          { label: "Sedation Options", action: "sedation" },
          { label: "Pricing Info", action: "pricing" }
        ]
      };
    }

    // 8. Composite Bonding
    if (q.includes('bonding') || q.includes('composite') || q.includes('chip') || q.includes('gap')) {
      return {
        text: `💎 Composite Resin Bonding:\n\n• Ideal for: Minor chips, small spaces between teeth, or localized edge worn surfaces\n• Time: Completed in a single 45-minute visit per tooth\n• Preservation: 100% conservative — no removal of healthy natural tooth structure required\n• Investment: $350 – $750 per tooth\n• Duration: 5–8 years with routine polishing.`,
        quickActions: [
          { label: "Book Bonding Visit", action: "book", href: "/appointment" },
          { label: "Veneers vs Bonding", action: "veneers" }
        ]
      };
    }

    // 9. Pain, Fear, Sedation Dentistry
    if (q.includes('pain') || q.includes('hurt') || q.includes('afraid') || q.includes('anxiety') || q.includes('scared') || q.includes('sedat') || q.includes('needle') || q.includes('numb')) {
      return {
        text: `🌸 Zero-Anxiety & Pain-Free Dental Care:\n\nWe cater extensively to dental-phobic patients:\n\n1. Computerized Wand Anesthesia: Single-tooth numbing without the dreaded injection pain or lingering facial drooping.\n2. Twilight Sedation: Gentle oral or IV relaxation where you feel completely at peace during treatment.\n3. Spa Comfort: Soundproof suites, ceiling Netflix screens, noise-canceling headphones, and aromatherapy.\n4. Swiss Air-Flow: Pain-free ultrasonic cleaning without metal scraping.`,
        quickActions: [
          { label: "Book Anxiety-Free Visit", action: "book", href: "/appointment" },
          { label: "Speak to Concierge", action: "call" }
        ]
      };
    }

    // 10. Emergency Care & Trauma
    if (q.includes('emergency') || q.includes('broken tooth') || q.includes('knocked') || q.includes('bleeding') || q.includes('swelling') || q.includes('throbbing') || q.includes('urgent') || q.includes('infection')) {
      return {
        text: `🚨 Urgent Dental Triage Protocol:\n\nIf you are experiencing severe acute pain, a knocked-out tooth, or heavy bleeding, please call our 24/7 direct emergency line immediately at:\n\n📞 +1 (555) 000-1234\n\n💡 Immediate First Aid:\n• Knocked-out tooth: Handle only by crown, place in cold milk or saliva, and arrive within 60 minutes.\n• Severe throbbing: Take anti-inflammatory (ibuprofen) if tolerated, apply cold compress to exterior cheek. Never place aspirin directly on gums.`,
        quickActions: [
          { label: "Call Emergency (+1 555-000-1234)", action: "call" },
          { label: "Book Urgent Slot", action: "book", href: "/appointment" }
        ]
      };
    }

    // 11. Doctors & Credentials
    if (q.includes('doctor') || q.includes('dentist') || q.includes('team') || q.includes('elena') || q.includes('thorne') || q.includes('roscoe') || q.includes('who are') || q.includes('qualif')) {
      return {
        text: `👨‍⚕️ Elite Studio Clinical Directors:\n\n• Dr. Elena Vance — Lead Cosmetic Dentist & Founder (Harvard Dental Alum, AACD Fellow, 14+ yrs exp). Master of porcelain veneers and aesthetic smile architecture.\n• Dr. James Roscoe — Orthodontist Specialist (Columbia University MSc, Invisalign Diamond Plus Provider). Expert in accelerated adult alignment.\n• Dr. Marcus Thorne — Oral Maxillofacial & Implant Surgeon (NYU Langone Health, ICOI Diplomate). Pioneer in 3D CBCT guided implants.`,
        quickActions: [
          { label: "Book with Dr. Vance", action: "book", href: "/appointment" },
          { label: "Book with Dr. Roscoe", action: "book", href: "/appointment" },
          { label: "View Studio Home", action: "home", href: "/" }
        ]
      };
    }

    // 12. Location, Hours, Directions & Valet
    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('parking') || q.includes('valet') || q.includes('subway') || q.includes('map')) {
      return {
        text: `📍 Studio Location:\n123 Dental Street, Medical District, Manhattan, NY 10001\n\n🚗 Amenities:\n• Complimentary valet parking attendant for all reserved appointments\n• Direct private elevator to our soundproof 6th-floor suites\n\n🕒 Operating Hours:\n• Monday – Friday: 8:00 AM – 8:00 PM\n• Saturday: 9:00 AM – 5:00 PM\n• Sunday: 24/7 On-Call Emergency Triage.`,
        quickActions: [
          { label: "Reserve Your Visit", action: "book", href: "/appointment" },
          { label: "Call Reception", action: "call" }
        ]
      };
    }

    // 13. Technology Suite
    if (q.includes('technology') || q.includes('equipment') || q.includes('scanner') || q.includes('itero') || q.includes('cbct') || q.includes('x-ray') || q.includes('machine')) {
      return {
        text: `🔬 Our $1.5M Medical-Grade Technology Suite:\n\n• 3D CBCT Low-Dose Imaging: 80% lower radiation than legacy X-rays, providing sub-millimeter 3D bone and nerve mapping.\n• iTero® Lumina 3D Optical Scanner: Replaces gooey impression trays with a 90-second digital scan and instant before/after simulation.\n• Guided Biofilm Swiss Air-Flow: Cleans with warmed water and erythritol powder without touching enamel with metal scrapers.\n• Computerized Wand Anesthesia: Painless, targeted numbing.`,
        quickActions: [
          { label: "Book 3D Smile Scan", action: "book", href: "/appointment" },
          { label: "Pricing Details", action: "pricing" }
        ]
      };
    }

    // 14. Default Intelligent Response
    return {
      text: `Thank you for reaching out to Elite Studio Clinic! 💎\n\nAs your 24/7 Live AI Concierge, I can assist you with:\n\n• Treatment options (Porcelain Veneers, Invisalign, Laser Whitening, Guided Implants)\n• Transparent pricing, PPO insurance coverage, & 0% APR financing\n• Doctor credentials (Dr. Vance, Dr. Roscoe, Dr. Thorne)\n• Instant consultation reservation or 24/7 emergency care\n\nHow can I help customize your smile journey today?`,
      quickActions: [
        { label: "Book Consultation", action: "book", href: "/appointment" },
        { label: "Treatment Pricing", action: "pricing" },
        { label: "Veneers Info", action: "veneers" },
        { label: "Pain-Free Sedation", action: "sedation" }
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

    // Natural responsive delay
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
      if (soundEnabled) {
        playNotificationChime();
      }
    }, 450);
  };

  const handleQuickAction = (action: string, href?: string) => {
    if (href) {
      setIsOpen(false);
      return;
    }
    let query = action;
    if (action === 'pricing') query = "What are your treatment costs, insurance options, and 0% financing?";
    if (action === 'doctors') query = "Tell me about Dr. Elena Vance and your clinical specialists.";
    if (action === 'veneers') query = "Can you explain the porcelain veneers procedure, timeline, and pricing?";
    if (action === 'bonding') query = "What is composite bonding and how does it compare to porcelain veneers?";
    if (action === 'insurance') query = "Which PPO dental insurance plans and financing options do you accept?";
    if (action === 'emergency') query = "I have an urgent dental emergency. What should I do?";
    if (action === 'sedation') query = "What pain-free and twilight sedation options do you provide for anxious patients?";
    if (action === 'roscoe') query = "Tell me about Dr. James Roscoe and Invisalign clear alignment.";
    if (action === 'call') query = "What is your telephone number and concierge desk contact?";

    handleSend(query);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Conversation refreshed. Aura is ready to assist you 24/7 with any clinical, financial, or booking inquiry. How may I help?",
        timestamp: formatTime(),
        quickActions: [
          { label: "Book Consultation", action: "book", href: "/appointment" },
          { label: "Treatment Pricing", action: "pricing" },
          { label: "Meet the Doctors", action: "doctors" }
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-brand-400/30 text-xs font-semibold text-white shadow-xl cursor-pointer hover:border-brand-400 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-400" />
            </span>
            <span className="tracking-wide">24/7 Live AI Concierge</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full btn-gradient flex items-center justify-center text-background shadow-[0_10px_30px_rgba(79,209,197,0.45)] cursor-pointer"
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-50 rounded-[32px] glass border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[560px] sm:h-[780px] h-[92vh]' 
                : 'bottom-22 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[430px] h-[620px] max-h-[82vh]'
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
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-400/15 text-brand-400 border border-brand-400/30">
                      24/7 Live AI
                    </span>
                  </div>
                  <p className="text-white/40 text-[11px] flex items-center gap-1">
                    <ShieldCheck size={12} className="text-brand-400" /> Manhattan Studio Clinical AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/50">
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)} 
                  className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Toggle Sound"
                  title={soundEnabled ? "Mute notification chime" : "Enable notification chime"}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={handleResetChat} 
                  className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Reset Conversation"
                  title="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
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
            <div className="px-5 py-2 bg-brand-400/5 border-b border-white/5 flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-brand-400" /> Response: &lt; 0.5s instant
              </span>
              <span className="text-brand-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Dispatch Ready
              </span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0 mb-1">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-400 text-background font-semibold rounded-br-xs shadow-md shadow-brand-400/15'
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
                            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
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
                placeholder="Ask in English or Roman Urdu (fees, booking, pain)..."
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
