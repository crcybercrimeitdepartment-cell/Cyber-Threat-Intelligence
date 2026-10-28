import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  X, 
  MessageSquare, 
  Phone, 
  Mail,
  Clock, 
  Briefcase,
  MousePointerClick
} from 'lucide-react';
import { CONTACT_DATA, CATEGORIES, DIRECT_CONTACT_CHANNELS } from './contactData.js';

const renderChannelIcon = (type, className = "w-5 h-5") => {
  switch (type) {
    case 'phone':
      return <Phone className={className} strokeWidth={2.2} />;
    case 'email':
      return <Mail className={className} strokeWidth={2.2} />;
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      );
    case 'biz-whatsapp':
      return (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="absolute -bottom-1 -right-1 text-[7px] font-black bg-white text-emerald-800 rounded px-0.5 border border-emerald-400 leading-none shadow-xs">B</span>
        </div>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return <Phone className={className} />;
  }
};

const glowStyles = {
  'text-glow-gold': { textShadow: '0 1px 3px rgba(217, 119, 6, 0.2)' },
  'text-glow-teal': { textShadow: '0 1px 3px rgba(13, 148, 136, 0.2)' },
  'text-glow-rose': { textShadow: '0 1px 3px rgba(225, 29, 72, 0.2)' },
  'text-glow-indigo': { textShadow: '0 1px 3px rgba(79, 70, 229, 0.2)' },
  'text-glow-orange': { textShadow: '0 1px 3px rgba(234, 88, 12, 0.2)' },
  'text-glow-green': { textShadow: '0 1px 3px rgba(22, 163, 74, 0.2)' },
  'text-glow-sky': { textShadow: '0 1px 3px rgba(2, 132, 199, 0.2)' }
};

const ContactUsPage = () => {
  // selectedCategory: null shows the 4 BIG CARDS in section 2
  // 'instant' | 'direct' | 'operations' | 'inquiries' shows the 2 inner cards for that category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPhoneChannel, setSelectedPhoneChannel] = useState(DIRECT_CONTACT_CHANNELS[0]);
  
  const [copiedId, setCopiedId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'agent', text: 'Hello! I am your CR OD Cyber Threat Intelligence assistant. How can we support your security needs today?' }
  ]);

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);
  const categoryCards = selectedCategory 
    ? CONTACT_DATA.filter(card => card.group === selectedCategory) 
    : [];

  const handleSelectCategory = (catId, shouldScroll = true) => {
    setSelectedCategory(catId);
    if (shouldScroll) {
      setTimeout(() => {
        const el = document.getElementById('contact-channels');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleCopy = (id, text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const handleCardAction = (card, e) => {
    e.stopPropagation();
    if (card.actionType === 'chat') {
      setActiveModal('chat');
    } else if (card.actionType === 'calendar') {
      setActiveModal('calendar');
    } else if (card.actionUrl) {
      window.open(card.actionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage('');
    setTimeout(() => {
      setChatLog(prev => [
        ...prev, 
        { sender: 'agent', text: 'Thank you for reaching out. A security intelligence officer has received your message and will provide immediate guidance.' }
      ]);
    }, 900);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col font-sans text-slate-900 relative selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap');

        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: 'Inter', system-ui, sans-serif; background: #ffffff; color: #0f172a; overflow-x: clip; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif !important; }
        button { cursor: pointer; }
        ::selection { background: #00bdd6; color: #ffffff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        @keyframes float-phone {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        /* Increased floating amplitude for noticeable organic float */
        @keyframes float-bubble-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-1.5deg); }
          50% { transform: translateY(-18px) translateX(4px) rotate(2deg); }
        }
        @keyframes float-bubble-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(1.5deg); }
          50% { transform: translateY(-22px) translateX(-5px) rotate(-2deg); }
        }
        @keyframes float-bubble-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(1.8deg); }
          50% { transform: translateY(-17px) translateX(5px) rotate(-1.5deg); }
        }
        @keyframes float-bubble-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-1.8deg); }
          50% { transform: translateY(-20px) translateX(-4px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-card {
          0% { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        /* 1. Contact Us: Letter-by-letter Drop & Land on Page Load / Refresh (Zero Clipping) */
        @keyframes letter-land {
          0% {
            opacity: 0;
            transform: translateY(-42px) scale(1.35) rotate(-6deg);
            filter: blur(5px);
          }
          65% {
            opacity: 1;
            transform: translateY(5px) scale(0.97) rotate(1deg);
            filter: blur(0px);
          }
          85% {
            transform: translateY(-2px) scale(1.01) rotate(-0.5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }
        .animate-letter-land {
          display: inline-block;
          opacity: 0;
          overflow: visible !important;
          padding: 0 1px;
          animation: letter-land 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        /* 2. Connect Your Way: Curved Arc Swoop Entrance on Page Load / Refresh */
        @keyframes curve-swoop {
          0% {
            opacity: 0;
            transform: translateY(55px) translateX(-45px) rotate(-9deg) scale(0.88);
            filter: blur(6px);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) translateX(12px) rotate(3deg) scale(1.04);
            filter: blur(0px);
          }
          82% {
            transform: translateY(3px) translateX(-3px) rotate(-1deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
            filter: blur(0px);
          }
        }
        .animate-curve-swoop {
          display: inline-block;
          opacity: 0;
          animation: curve-swoop 0.8s cubic-bezier(0.25, 1, 0.35, 1) forwards;
          will-change: transform, opacity;
        }

        /* 3. 4 Cards Heading Animation on Page Load */
        @keyframes card-heading-in {
          0% {
            opacity: 0;
            transform: translateY(-16px) scale(0.92);
            filter: blur(4px);
          }
          70% {
            opacity: 1;
            transform: translateY(3px) scale(1.02);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }
        .animate-card-heading {
          opacity: 0;
          animation: card-heading-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Category Heading shimmer & entrance */
        @keyframes heading-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes heading-pop {
          0% { opacity: 0; transform: translateY(-12px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-heading-shimmer {
          background-size: 200% auto;
          animation: heading-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, heading-shimmer 4.5s ease infinite;
        }

        .animate-float-phone { animation: float-phone 6s ease-in-out infinite; }
        .animate-bubble-1 { animation: float-bubble-1 4.6s ease-in-out infinite; }
        .animate-bubble-2 { animation: float-bubble-2 5.2s ease-in-out infinite 0.3s; }
        .animate-bubble-3 { animation: float-bubble-3 4.8s ease-in-out infinite 0.6s; }
        .animate-bubble-4 { animation: float-bubble-4 5.5s ease-in-out infinite 0.9s; }
        .animate-pulse-glow { animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pop-card { animation: pop-card 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .shimmer-sweep {
          transform: translateX(-100%);
        }
        .group:hover .shimmer-sweep {
          animation: shimmer 1.8s infinite;
        }
      `}} />

      {/* Subtle modern background ambient layers */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 15%, rgba(0, 189, 214, 0.05) 0%, transparent 45%),
            radial-gradient(circle at 90% 25%, rgba(249, 115, 22, 0.05) 0%, transparent 40%),
            radial-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 32px 32px',
          backgroundPosition: '0 0, 0 0, 0 0'
        }}
      ></div>

      {/* =========================================================================
          HERO SECTION:
          LEFT: Heading ("Contact Us"), Description, "REACH US" button
          RIGHT: Phone with "LET'S TALK!" in center + 4 Cards on its 2 sides
          ========================================================================= */}
      <main className="flex-grow flex flex-col relative z-10">
        <section className="relative overflow-visible pt-2 sm:pt-4 pb-10 md:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center text-center lg:text-left">
              
              {/* Left Column - Heading, Description, REACH US button */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start space-y-5 md:space-y-6 z-10 w-full pt-1">
                
                {/* Brand Tag Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold tracking-wider uppercase shadow-xs">
                  <ShieldCheck size={14} className="text-cyan-600" />
                  <span>CR OD Cyber Threat Intelligence</span>
                </div>

                {/* Heading: Contact Us (Letter-by-Letter Drop & Land on Load/Refresh - Zero Clipping) */}
                <div className="space-y-2 overflow-visible">
                  <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold font-display italic tracking-tight leading-normal overflow-visible flex flex-wrap items-center justify-center lg:justify-start">
                    <span className="inline-flex mr-3 sm:mr-4 overflow-visible">
                      {"Contact".split("").map((ch, i) => (
                        <span
                          key={i}
                          className="animate-letter-land text-slate-950 overflow-visible px-[1px] hover:text-cyan-600 transition-colors cursor-default"
                          style={{ animationDelay: `${i * 70}ms` }}
                        >
                          {ch}
                        </span>
                      ))}
                    </span>
                    <span className="inline-flex overflow-visible">
                      {"Us".split("").map((ch, i) => (
                        <span
                          key={i}
                          className="animate-letter-land text-cyan-600 overflow-visible px-[1px] hover:text-amber-500 transition-colors cursor-default"
                          style={{ animationDelay: `${(7 + i) * 70}ms` }}
                        >
                          {ch}
                        </span>
                      ))}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl font-normal text-center lg:text-left">
                  Connect with CR OD Cyber Threat Intelligence for cybersecurity information, general inquiries, and digital safety guidance. We welcome your questions and feedback as we work toward a more informed and secure digital environment.
                </p>

                {/* REACH US Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative inline-flex group">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 blur-lg opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse-glow"></div>
                    
                    <button
                      onClick={() => {
                        const el = document.getElementById('contact-channels');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="relative px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 overflow-hidden z-10 cursor-pointer"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-sweep pointer-events-none"></div>
                      <span className="tracking-widest">REACH US</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <MousePointerClick size={14} className="text-cyan-600 animate-bounce" />
                    <span>Click cards or scroll to explore</span>
                  </span>
                </div>

              </div>

              {/* Right Column - Enriched Large 3D Phone with "LET'S TALK!" + 4 Framing Cards */}
              <div className="lg:col-span-7 w-full relative">
                <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[480px] sm:min-h-[520px] md:min-h-[540px] px-2 sm:px-4">
                  
                  {/* Soft ambient glow behind phone */}
                  <div className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-cyan-400/25 via-orange-400/18 to-transparent rounded-full blur-[85px] pointer-events-none z-0"></div>

                  {/* 3D Phone with centered LET'S TALK (Generously Sized & Perfectly Positioned) */}
                  <div className="relative z-10 w-full max-w-[380px] sm:max-w-[430px] md:max-w-[470px] lg:max-w-[490px] flex items-center justify-center animate-float-phone">
                    <img 
                      src="/phone_lets_talk.png" 
                      alt="CR OD Cyber Threat Intelligence - Rotary Phone" 
                      className="w-full h-auto select-none pointer-events-none filter drop-shadow-[0_20px_40px_rgba(14,165,233,0.22)] transition-all duration-300"
                    />
                  </div>

                  {/* ==============================================================
                      THE 4 CARDS SET ON THE TWO SIDES OF THE PHONE:
                      Card 1 (Left Top): Direct Contact
                      Card 2 (Left Bottom): Instant Chat
                      Card 3 (Right Top): Operational Hours
                      Card 4 (Right Bottom): Inquiry / Job
                      ============================================================== */}

                  {/* 1. Direct Contact (Left Top Side - Card 1) */}
                  <div 
                    onClick={() => handleSelectCategory('direct', true)}
                    className={`hidden sm:flex absolute top-12 sm:top-16 md:top-20 -left-2 sm:-left-6 lg:-left-10 z-20 cursor-pointer animate-bubble-1 group transition-all duration-300 ${
                      selectedCategory === 'direct' ? 'scale-105 z-30' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border-2 shadow-xl transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === 'direct' 
                        ? 'border-amber-500 shadow-amber-500/25 ring-4 ring-amber-100' 
                        : 'border-amber-300 hover:border-amber-500 shadow-amber-500/10'
                    }`}>
                      <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-amber-300 rotate-45 transform"></div>

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                        <Phone size={18} strokeWidth={2.4} />
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            7 Channels • Priority
                          </span>
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                          Direct Contact
                        </h4>
                        <p className="text-[9px] text-slate-500 font-medium">Phone, Email &amp; Socials ➜</p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Instant Chat (Left Bottom Side - Card 2) */}
                  <div 
                    onClick={() => handleSelectCategory('instant', true)}
                    className={`hidden sm:flex absolute bottom-5 -left-4 sm:-left-10 lg:-left-16 z-20 cursor-pointer animate-bubble-3 group transition-all duration-300 ${
                      selectedCategory === 'instant' ? 'scale-105 z-30' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border-2 shadow-xl transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === 'instant' 
                        ? 'border-sky-500 shadow-sky-500/25 ring-4 ring-sky-100' 
                        : 'border-sky-300 hover:border-sky-500 shadow-sky-500/10'
                    }`}>
                      <div className="absolute -top-2 left-8 w-3.5 h-3.5 bg-white border-t-2 border-l-2 border-sky-300 rotate-45 transform"></div>

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 text-white flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                        <MessageSquare size={18} strokeWidth={2.4} />
                      </div>

                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                          Fastest • &lt; 1 Min
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                          Instant Chat
                        </h4>
                        <p className="text-[9px] text-slate-500 font-medium">Live Chat &amp; WhatsApp ➜</p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Operational Hours (Right Top Side) */}
                  <div 
                    onClick={() => handleSelectCategory('operations', true)}
                    className={`hidden sm:flex absolute top-12 sm:top-16 md:top-20 -right-2 sm:-right-6 lg:-right-10 z-20 cursor-pointer animate-bubble-2 group transition-all duration-300 ${
                      selectedCategory === 'operations' ? 'scale-105 z-30' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border-2 shadow-xl transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === 'operations' 
                        ? 'border-indigo-500 shadow-indigo-500/25 ring-4 ring-indigo-100' 
                        : 'border-indigo-300 hover:border-indigo-500 shadow-indigo-500/10'
                    }`}>
                      <div className="absolute -bottom-2 right-6 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-indigo-300 rotate-45 transform"></div>

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                        <Clock size={18} strokeWidth={2.4} />
                      </div>

                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Active Schedule
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Operational Hours
                        </h4>
                        <p className="text-[9px] text-slate-500 font-medium">9AM-6PM &amp; Briefings ➜</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Inquiry / Job (Right Bottom Side) */}
                  <div 
                    onClick={() => handleSelectCategory('inquiries', true)}
                    className={`hidden sm:flex absolute bottom-5 -right-4 sm:-right-10 lg:-right-16 z-20 cursor-pointer animate-bubble-4 group transition-all duration-300 ${
                      selectedCategory === 'inquiries' ? 'scale-105 z-30' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border-2 shadow-xl transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === 'inquiries' 
                        ? 'border-emerald-500 shadow-emerald-500/25 ring-4 ring-emerald-100' 
                        : 'border-emerald-300 hover:border-emerald-500 shadow-emerald-500/10'
                    }`}>
                      <div className="absolute -top-2 right-8 w-3.5 h-3.5 bg-white border-t-2 border-l-2 border-emerald-300 rotate-45 transform"></div>

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                        <Briefcase size={18} strokeWidth={2.4} />
                      </div>

                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Opportunities
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                          Inquiry / Job
                        </h4>
                        <p className="text-[9px] text-slate-500 font-medium">Enterprise &amp; Careers ➜</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile screen cards grid */}
                <div className="grid grid-cols-2 gap-2 sm:hidden mt-4 px-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.id, true)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : cat.iconBg}`}>
                            <Icon size={14} />
                          </div>
                          <span className={`text-[8px] font-black uppercase px-1 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : cat.badgeBg}`}>
                            {cat.badge}
                          </span>
                        </div>
                        <div className="font-bold text-xs">{cat.label}</div>
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: "Connect Your Way"
            - Shows the 4 BIG CARDS initially
            - When any card is clicked, reveals that category's 2 detailed inner cards
            - With "← Back to 4 Categories" button to return to the 4 cards
            ========================================================================= */}
        <section id="contact-channels" className="bg-slate-50/70 pt-16 pb-24 border-t border-slate-200/80 relative z-20 scroll-mt-6">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Section Header: ONLY visible on initial 4-card overview with curved arc entrance on load/refresh */}
            {!selectedCategory && (
              <div className="text-center mb-12 max-w-2xl mx-auto overflow-visible">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight flex items-center justify-center gap-3 sm:gap-4 overflow-visible">
                  <span 
                    className="animate-curve-swoop text-slate-900"
                    style={{ animationDelay: '100ms' }}
                  >
                    Connect
                  </span>
                  <span 
                    className="animate-curve-swoop text-teal-600"
                    style={{ animationDelay: '250ms' }}
                  >
                    Your
                  </span>
                  <span 
                    className="animate-curve-swoop text-amber-500"
                    style={{ animationDelay: '400ms' }}
                  >
                    Way
                  </span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2.5 font-medium animate-fade-in-up" style={{ animationDelay: '550ms' }}>
                  Choose a communication category below to access direct channels and cybersecurity specialists.
                </p>
              </div>
            )}

            {/* IF NO CATEGORY IS SELECTED: SHOW THE 4 3D TACTILE CARDS (EXACT DITTO TO USER IMAGE) */}
            {!selectedCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-stretch animate-fade-in-up">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id, true)}
                      className="group bg-[#fcfdff] rounded-[2.5rem] p-6 border-2 border-slate-100 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.12),0_6px_18px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-4px_6px_rgba(15,23,42,0.03)] hover:shadow-[0_25px_55px_-10px_rgba(15,23,42,0.18)] hover:-translate-y-2 transition-all duration-300 cursor-pointer relative flex flex-col justify-between"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      {/* Top-Right Floating 3D White Envelope (Exact match to reference image) */}
                      <div className="absolute -top-3.5 -right-2 z-20 w-13 h-10 bg-white rounded-xl shadow-[0_8px_18px_rgba(15,23,42,0.16),inset_0_1px_2px_rgba(255,255,255,1)] border border-slate-200/70 flex items-center justify-center transform rotate-[14deg] group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-300">
                        {/* 3D Envelope Fold SVG */}
                        <svg viewBox="0 0 38 28" className="w-8 h-6 text-slate-400 drop-shadow-xs">
                          <rect x="2" y="2" width="34" height="24" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                          <path d="M 3,3 L 19,16 L 35,3" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M 3,25 L 13,13" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M 35,25 L 25,13" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Content Form Body with Debossed / Inset Fields */}
                      <div className="space-y-3 pt-1 relative z-10">
                        
                        {/* Inset Slot 1: Complete Heading (Steady, no floating) */}
                        <div className="bg-[#f1f4f8] rounded-2xl py-3 px-4 border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(15,23,42,0.06),inset_0_-1px_1px_rgba(255,255,255,0.9)] flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Icon size={16} strokeWidth={2.4} />
                          </div>
                          <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                            {cat.label}
                          </span>
                        </div>

                        {/* Inset Slot 2: Channel 1 Pill */}
                        <div className="bg-[#f1f4f8] rounded-2xl py-2 px-3.5 border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(15,23,42,0.06),inset_0_-1px_1px_rgba(255,255,255,0.9)] flex items-center justify-between text-[11px] font-semibold text-slate-700">
                          <span className="truncate">
                            {cat.id === 'instant' && '💬 Live Chat (< 1 Min)'}
                            {cat.id === 'direct' && '📞 Phone & ✉️ Email Desks'}
                            {cat.id === 'operations' && '🕒 Mon - Fri (9AM - 6PM PST)'}
                            {cat.id === 'inquiries' && '💼 Enterprise Intelligence'}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        </div>

                        {/* Inset Slot 3: Channel 2 Pill */}
                        <div className="bg-[#f1f4f8] rounded-2xl py-2 px-3.5 border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(15,23,42,0.06),inset_0_-1px_1px_rgba(255,255,255,0.9)] flex items-center justify-between text-[11px] font-semibold text-slate-700">
                          <span className="truncate">
                            {cat.id === 'instant' && '📱 WhatsApp Desk (+1-555)'}
                            {cat.id === 'direct' && '📱 WhatsApp, Instagram, Telegram & X'}
                            {cat.id === 'operations' && '📅 Strategy Zoom Call'}
                            {cat.id === 'inquiries' && '🚀 Careers & Analyst Jobs'}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">
                            {cat.id === 'direct' ? '7 Channels' : '2 Channels'}
                          </span>
                        </div>

                        {/* Inset Slot 4: Large Message Box (Exact match to reference image) */}
                        <div className="bg-[#f1f4f8] rounded-2xl p-3.5 min-h-[88px] border border-slate-200/60 shadow-[inset_0_2px_5px_rgba(15,23,42,0.07),inset_0_-1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-center">
                          <p className="text-slate-600 text-xs leading-relaxed font-medium">
                            {cat.description}
                          </p>
                        </div>

                      </div>

                      {/* Bottom Glowing 3D Golden/Amber Capsule Button (Exact match to reference image) */}
                      <div className="relative mt-6 pt-1">
                        {/* Glowing diffuse aura beneath the button */}
                        <div className="absolute inset-x-2 -bottom-1 h-7 bg-amber-400/60 rounded-full blur-md group-hover:bg-amber-400/90 transition-all duration-300"></div>

                        <button className="relative w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.5),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
                          <span>Open {cat.label}</span>
                          <ArrowRight size={14} className="stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* IF A CATEGORY IS SELECTED: CLEAN OPEN VIEW WITH STANDALONE BACK BUTTON, HEADING, DESCRIPTION, AND ICONS/CARDS */
              <div className="space-y-6 animate-pop-card mx-auto max-w-4xl">
                
                {/* Standalone Back Button on Left ("alag sa rahega, left me") */}
                <div className="flex items-center justify-start">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md group hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Heading & Small Description - Centered inside the clicked card's page with letter-by-letter entrance animation */}
                <div className="text-center flex flex-col items-center justify-center space-y-2.5 max-w-2xl mx-auto overflow-visible">
                  <div className="inline-flex items-center justify-center gap-3 overflow-visible">
                    {activeCategoryData && (
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${activeCategoryData.iconBg} flex items-center justify-center shrink-0 shadow-md animate-pop-card`}>
                        <activeCategoryData.icon size={22} strokeWidth={2.2} />
                      </div>
                    )}
                    <h2 
                      key={activeCategoryData?.id}
                      className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-950 flex flex-wrap items-center justify-center overflow-visible"
                    >
                      {activeCategoryData?.label.split("").map((ch, idx) => (
                        <span
                          key={idx}
                          className={`animate-letter-land inline-block overflow-visible ${ch === ' ' ? 'w-2.5' : 'px-[0.5px]'} text-slate-950`}
                          style={{ animationDelay: `${idx * 45}ms` }}
                        >
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      ))}
                    </h2>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto text-center leading-relaxed animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                    {activeCategoryData?.description}
                  </p>
                </div>

                {/* When category is 'direct': Render the 7 Contact Icons inside the Mobile Phone Design */}
                {selectedCategory === 'direct' ? (
                  <div className="py-6 sm:py-10 flex flex-col items-center justify-center animate-fade-in-up">
                    
                    {/* The Smartphone Frame (matching user's uploaded mobile design) */}
                    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]">
                      
                      {/* Ambient Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-b from-teal-500/10 via-sky-500/10 to-amber-500/10 rounded-[60px] blur-2xl -z-10" />

                      {/* Phone Chassis (Charcoal Grey body with smooth rounded corners) */}
                      <div className="relative bg-[#4a4d55] rounded-[48px] sm:rounded-[52px] p-3.5 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_10px_25px_-10px_rgba(0,0,0,0.2)] border-4 border-[#3c3e45]">
                        
                        {/* Top Bezel Area */}
                        <div className="pt-2 pb-3.5 flex flex-col items-center justify-center gap-1.5 select-none">
                          {/* Front Camera Dot */}
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600/70 shadow-inner" />
                          {/* Earpiece / Speaker Pill */}
                          <div className="w-14 h-1.5 rounded-full bg-slate-300 shadow-inner" />
                        </div>

                        {/* Smartphone Screen Area */}
                        <div className="bg-white rounded-2xl overflow-hidden relative border border-slate-200/80 shadow-inner flex flex-col justify-between min-h-[500px]">
                          
                          {/* Top Status Bar */}
                          <div className="pt-2.5 px-4 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-800 select-none bg-slate-50/90 border-b border-slate-100">
                            <span className="font-bold tracking-tight">9:41</span>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              {/* Cellular Signal Bars */}
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M2 20h20L12 4z"/>
                              </svg>
                              {/* Wi-Fi Icon */}
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z"/>
                              </svg>
                              {/* Battery Capsule */}
                              <div className="w-5 h-2.5 rounded-[4px] border border-slate-700 p-0.5 flex items-center">
                                <div className="w-full h-full bg-slate-800 rounded-[2px]" />
                              </div>
                            </div>
                          </div>

                          {/* Screen Header */}
                          <div className="px-4 pt-3 pb-2 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                            <div className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200/80 rounded-full px-2.5 py-0.5 inline-block mb-1">
                              CR OD Intel
                            </div>
                            <p className="text-[11px] font-medium text-slate-500">
                              Tap any channel to connect
                            </p>
                          </div>

                          {/* App Icons Grid (The 7 Contact Icons inside the phone screen) */}
                          <div className="px-3.5 py-4 flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-3 gap-y-4 gap-x-2 items-center justify-items-center">
                              {DIRECT_CONTACT_CHANNELS.map((ch, idx) => {
                                const isSelected = selectedPhoneChannel?.id === ch.id;
                                return (
                                  <div
                                    key={ch.id}
                                    onClick={() => setSelectedPhoneChannel(ch)}
                                    onMouseEnter={() => setSelectedPhoneChannel(ch)}
                                    className={`flex flex-col items-center group cursor-pointer transition-all ${
                                      idx === 6 ? 'col-span-3' : ''
                                    }`}
                                  >
                                    {/* App Icon */}
                                    <a
                                      href={ch.actionUrl}
                                      target={ch.actionUrl.startsWith('http') ? '_blank' : undefined}
                                      rel={ch.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                                      title={`Connect on ${ch.name}`}
                                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${ch.iconBg} flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg active:scale-95 relative ${
                                        isSelected ? 'ring-3 ring-teal-500 ring-offset-2 scale-105 shadow-md' : ''
                                      }`}
                                    >
                                      {renderChannelIcon(ch.type, "w-6 h-6 sm:w-7 sm:h-7")}
                                    </a>

                                    {/* App Name */}
                                    <span className="mt-1.5 text-[11px] font-bold text-slate-700 group-hover:text-slate-950 transition-colors tracking-tight text-center leading-tight">
                                      {ch.shortName || ch.name}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Active App Details Dock inside Screen */}
                          <div className="p-3 bg-slate-50/95 border-t border-slate-200/90">
                            <div className="flex items-center justify-between gap-2 bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs">
                              <div className="min-w-0 flex-1">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                  {selectedPhoneChannel?.name}
                                </div>
                                <div className="text-xs font-mono font-bold text-slate-800 truncate">
                                  {selectedPhoneChannel?.handle}
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {/* Copy Button */}
                                <button
                                  type="button"
                                  onClick={(e) => handleCopy(selectedPhoneChannel?.id, selectedPhoneChannel?.handle, e)}
                                  title="Copy handle"
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {copiedId === selectedPhoneChannel?.id ? (
                                    <>
                                      <Check size={12} className="text-emerald-600 stroke-[3]" />
                                      <span className="text-emerald-600 text-[10px]">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={11} />
                                      <span className="text-[10px]">Copy</span>
                                    </>
                                  )}
                                </button>
                                {/* Direct Action Link */}
                                <a
                                  href={selectedPhoneChannel?.actionUrl}
                                  target={selectedPhoneChannel?.actionUrl.startsWith('http') ? '_blank' : undefined}
                                  rel={selectedPhoneChannel?.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  title={`Open ${selectedPhoneChannel?.name}`}
                                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                                >
                                  <span>Open</span>
                                  <ExternalLink size={10} />
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Bottom Bezel Area: White Circular Home Button */}
                        <div className="pt-3 pb-1 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setSelectedPhoneChannel(DIRECT_CONTACT_CHANNELS[0])}
                            title="Reset to Phone Hotline"
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-300/80 shadow-xs flex items-center justify-center cursor-pointer transition-transform duration-150 active:scale-90 hover:bg-slate-50 focus:outline-none group/home"
                          >
                            <div className="w-5 h-5 rounded-md border border-slate-300/80 group-hover/home:border-slate-400 transition-colors" />
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                ) : (
                  /* The 2 Detailed Contact Cards right below ("uske niche woh card rahega") */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
                  {categoryCards.map((card, index) => {
                    const IconComponent = card.icon;
                    const isCopied = copiedId === card.id;

                    return (
                      <div
                        key={card.id}
                        className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-center relative overflow-hidden group ${card.hoverBorder} animate-fade-in-up`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-full flex flex-col items-center relative z-10">
                          {/* Card Title */}
                          <h3 
                            className={`text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${card.titleGrad} bg-clip-text text-transparent text-center`}
                            style={glowStyles[card.glowClass]}
                          >
                            {card.title}
                          </h3>

                          {/* Subtext */}
                          <p className="text-slate-600 text-xs text-center max-w-[280px] leading-relaxed mt-2.5 font-medium">
                            {card.desc}
                          </p>

                          {/* 3D Shield Badge with Central Spotlight */}
                          <div className="my-8 relative flex justify-center w-28 h-32">
                            {/* Category Tag Pill */}
                            <div className={`absolute -top-3 text-[9px] font-black tracking-wider rounded-full px-2.5 py-0.5 border shadow-xs z-20 select-none ${card.multBg}`}>
                              {card.category}
                            </div>

                            {/* SVG Shield shape */}
                            <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)]">
                              <defs>
                                <linearGradient id={card.shieldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={card.shieldStops[0]} />
                                  <stop offset="50%" stopColor={card.shieldStops[1]} />
                                  <stop offset="100%" stopColor={card.shieldStops[2]} />
                                </linearGradient>
                              </defs>
                              <path
                                d="M 50,5 Q 75,3 90,15 L 90,65 Q 90,95 50,105 Q 10,95 10,65 L 10,15 Q 25,3 50,5 Z"
                                fill="#0f172a"
                                stroke={`url(#${card.shieldGradId})`}
                                strokeWidth="2.8"
                              />
                            </svg>

                            {/* Inside Shield Content */}
                            <div className="absolute inset-1.5 rounded-[1.25rem] overflow-hidden flex items-center justify-center">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15)_0%,transparent_65%)]"></div>
                              <IconComponent size={32} className="text-white relative z-10 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] group-hover:scale-115 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        {/* Interactive Contact Value & Direct Actions */}
                        <div className="w-full mt-2 space-y-4 relative z-10">
                          {/* Copyable Value Container */}
                          <div 
                            title="Click to copy"
                            onClick={(e) => handleCopy(card.id, card.value, e)}
                            className="w-full py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 tracking-wide hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-2 group/copy"
                          >
                            <span className="font-mono text-center flex-grow truncate">{card.value}</span>
                            <div className="shrink-0 flex items-center gap-1 text-slate-400 group-hover/copy:text-slate-700">
                              {isCopied ? (
                                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                  <Check size={14} className="text-emerald-600 stroke-[3]" /> Copied!
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[11px] font-semibold">
                                  <Copy size={13} /> Copy
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Wait Time & Live Status Indicator */}
                          <div className="flex items-center justify-between w-full px-1">
                            <div className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider border shadow-xs ${card.progPill}`}>
                              {card.waitLabel}
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700">Online</span>
                            </div>
                          </div>

                          {/* Progress track */}
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 relative">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${card.progFill} transition-all duration-500`}
                              style={{ width: card.progressWidth || '90%' }}
                            ></div>
                          </div>

                          {/* Direct Action Button */}
                          <button
                            onClick={(e) => handleCardAction(card, e)}
                            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                          >
                            <span>{card.actionLabel}</span>
                            <ExternalLink size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              </div>
            )}

          </div>
        </section>

      </main>

      {/* ================= INTERACTIVE MODALS ================= */}
      {/* 1. Live Chat Modal */}
      {activeModal === 'chat' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-fade-in-up flex flex-col h-[520px]">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">CR OD Cyber Intel Live Chat</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Officer on Duty
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatLog.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your security inquiry..."
                className="flex-grow px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Calendar / Meeting Modal */}
      {activeModal === 'calendar' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Schedule Strategy Call</h3>
                  <p className="text-xs text-slate-600">30-Minute Threat Briefing</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Connect with senior threat analysts from CR OD Cyber Threat Intelligence to review organizational attack surface, threat advisories, and defense postures.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Available Slots: Mon - Fri</span>
                <span className="font-bold text-slate-900">9:00 AM - 5:00 PM PST</span>
              </div>
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <Check size={14} className="text-emerald-600" /> Secure Zoom / Google Meet Link Provided
              </div>
            </div>

            <a
              href="mailto:consult@crod-intel.com?subject=Schedule Threat Intelligence Briefing"
              onClick={() => setActiveModal(null)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              Confirm Appointment Request
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactUsPage;
