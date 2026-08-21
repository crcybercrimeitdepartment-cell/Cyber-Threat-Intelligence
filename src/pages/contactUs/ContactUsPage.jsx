import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT_DATA, CATEGORIES } from '../../data/contactUs/contactData.js';

const glowStyles = {
  'text-glow-gold': { textShadow: '0 1px 3px rgba(217, 119, 6, 0.15)' },
  'text-glow-teal': { textShadow: '0 1px 3px rgba(13, 148, 136, 0.15)' },
  'text-glow-rose': { textShadow: '0 1px 3px rgba(225, 29, 72, 0.15)' },
  'text-glow-indigo': { textShadow: '0 1px 3px rgba(79, 70, 229, 0.15)' }
};

const ContactUsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCards = activeTab === 'all' 
    ? CONTACT_DATA 
    : CONTACT_DATA.filter(card => card.group === activeTab);

  return (
    <div className="bg-transparent min-h-[calc(100vh-100px)] w-full flex flex-col font-sans selection:bg-cyan-100 selection:text-cyan-900 relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sway-spotlight {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes zoom-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-entrance {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-sway-spotlight { animation: sway-spotlight 10s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; opacity: 0; }
        .animate-pulse-glow { animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-zoom-in { animation: zoom-in 1s ease-out forwards; opacity: 0; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-card-entrance { animation: card-entrance 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; opacity: 0; }

        .shimmer-overlay {
          transform: translateX(-100%);
        }
        .group:hover .shimmer-overlay {
          animation: shimmer 2s infinite;
        }
      `}} />
      
      {/* Starry Dust backdrop overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(rgba(180, 80, 120, 0.16) 1.5px, transparent 40px),
            radial-gradient(rgba(180, 80, 120, 0.12) 1px, transparent 30px),
            radial-gradient(rgba(180, 80, 120, 0.08) 1.5px, transparent 40px)
          `,
          backgroundSize: '550px 550px, 350px 350px, 250px 250px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px',
          opacity: 0.25
        }}
      ></div>

      {/* Swaying Spotlight rays */}
      <div className="absolute top-0 inset-x-0 h-[700px] overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-[-300px] left-[15%] w-[450px] h-[1000px] animate-sway-spotlight origin-top blur-[4px]"
          style={{
            background: 'repeating-linear-gradient(95deg, rgba(244, 63, 94, 0.04) 0px, rgba(244, 63, 94, 0.04) 50px, transparent 100px, transparent 200px)',
            maskImage: 'radial-gradient(circle at 50% 0%, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 25%, transparent 75%)',
            filter: 'blur(2px)'
          }}
        ></div>
        <div 
          className="absolute top-[-300px] left-[55%] w-[500px] h-[1000px] animate-sway-spotlight origin-top blur-[5px]" 
          style={{ 
            animationDelay: '-8s',
            background: 'repeating-linear-gradient(95deg, rgba(244, 63, 94, 0.04) 0px, rgba(244, 63, 94, 0.04) 50px, transparent 100px, transparent 200px)',
            maskImage: 'radial-gradient(circle at 50% 0%, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 25%, transparent 75%)',
            filter: 'blur(2px)'
          }}
        ></div>
      </div>

      {/* ================= HERO SECTION (MATCHES THE PROVIDED IMAGE EXACTLY) ================= */}
      <main className="flex-grow flex flex-col relative z-10">
        <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-4 pb-2 md:pb-4 bg-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-center lg:text-left">
              
              {/* Left Column - Content */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start space-y-6 md:space-y-8 z-10 w-full animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                <div className="space-y-2">
                  {/* "Contact Us" Title matching the italic bold styling */}
                  <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold font-display italic text-slate-950 tracking-tight leading-tight uppercase sm:normal-case">
                    Contact Us
                  </h1>
                  {/* "Landing Page" Subtitle matching the bright cyan styling */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00BDD6] font-display tracking-tight">
                    Landing Page
                  </h2>
                </div>

                {/* Paragraph copy exactly matching the image */}
                <p className="text-slate-500 leading-relaxed text-xs sm:text-sm md:text-base max-w-lg font-medium text-center lg:text-left">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                </p>

                {/* "REACH US" Button - Extremely eye-catching, glowing and animated */}
                <div className="pt-2">
                  <div className="relative inline-flex group">
                    {/* Outer glowing pulsing halo ring */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow"></div>
                    
                    <button
                      className="relative px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 overflow-hidden z-10"
                    >
                      {/* Shimmer sweep effect */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-overlay pointer-events-none"></div>

                      <span className="tracking-widest">REACH US</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column - 3D Illustration Image */}
              <div className="lg:col-span-7 w-full animate-zoom-in" style={{ animationDelay: '250ms' }}>
                <div className="flex justify-center items-center select-none animate-float-slow relative mt-4 lg:mt-0">
                  {/* Soft ambient glow blob behind the image */}
                  <div className="absolute w-[70%] h-[70%] bg-cyan-400/[0.12] rounded-full blur-[80px] pointer-events-none z-0"></div>
                  <img 
                    src="/contact_illustration.png" 
                    alt="Contact Us Illustration" 
                    className="max-w-full h-auto cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:drop-shadow-[0_20px_35px_rgba(0,189,214,0.25)] relative z-10"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= BADGES CARDS SECTION (MATCHES THE PROVIDED IMAGE EXACTLY) ================= */}
        <section className="bg-transparent pt-4 pb-20 md:pt-6 md:pb-24 border-t border-white/[0.03] relative z-20 -mt-16 md:-mt-20 lg:-mt-24">
          {/* Soft background glow blobs */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.1] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.1] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/[0.1] rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Section Heading */}
            <div className="text-center mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                Connect Your Way
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Choose the channel that best suits your needs. We are online and ready to assist you.
              </p>
            </div>

            {/* Category tabs selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              {CATEGORIES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'bg-white/60 text-slate-600 hover:bg-white/80 hover:text-slate-800 border border-slate-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
              {filteredCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`bg-[rgba(255,255,255,0.28)] border-[1.5px] border-[rgba(255,255,255,0.65)] backdrop-blur-[24px] shadow-[0_15px_35px_-10px_rgba(15,23,42,0.08),inset_0_12px_24px_rgba(255,255,255,0.35),inset_0_-12px_24px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between items-center hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.99] group ${card.hoverBorder} animate-card-entrance`}
                    style={{ animationDelay: `${600 + index * 60}ms` }}
                  >
                    {/* 3D Liquid Gloss Reflection Dome Overlay */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[2rem]"></div>

                    <div className="w-full flex flex-col items-center relative z-10">
                      {/* Card Title */}
                      <h3 
                        className={`text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r ${card.titleGrad} bg-clip-text text-transparent text-center`}
                        style={glowStyles[card.glowClass]}
                      >
                        {card.title}
                      </h3>
                      {/* Badge Subtext */}
                      <p className="text-slate-500 text-[11px] text-center max-w-[220px] leading-relaxed mt-2 font-medium">
                        {card.desc}
                      </p>

                      {/* Shield & Spotlights */}
                      <div className="my-8 relative flex justify-center w-24 h-28">
                        {/* Category pill */}
                        <div className={`absolute -top-2 text-[9px] font-black rounded-full px-2 py-0.5 shadow-sm z-20 select-none ${card.multBg}`}>
                          {card.category}
                        </div>

                        {/* SVG Shield shape */}
                        <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]">
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
                            strokeWidth="2.5"
                          />
                        </svg>

                        {/* Inside Shield Content */}
                        <div className="absolute inset-1 rounded-[1.25rem] overflow-hidden flex items-center justify-center">
                          {/* Central spotlight radial glow */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08)_0%,transparent_60%)]"></div>
                          {/* Vertical spotlights */}
                          <div 
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255, 255, 255, 0.04) 6px, rgba(255, 255, 255, 0.04) 9px)',
                              maskImage: 'radial-gradient(circle at 50% 25%, black 20%, transparent 75%)',
                              WebkitMaskImage: 'radial-gradient(circle at 50% 25%, black 20%, transparent 75%)'
                            }}
                          ></div>
                          
                          {/* Icon component */}
                          <IconComponent size={28} className="text-white relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Progress System / Contact Values */}
                    <div className="w-full mt-auto space-y-3 relative z-10">
                      {/* Copyable value field */}
                      <div 
                        title="Click to copy"
                        onClick={() => navigator.clipboard.writeText(card.value)}
                        className="w-full text-center py-2 px-3 rounded-xl bg-slate-50/50 border border-slate-200/40 text-[10px] font-bold text-slate-700 tracking-wide select-all hover:bg-white hover:border-slate-300/60 transition-all cursor-pointer relative shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span>{card.value}</span>
                      </div>

                      {/* Clean alignment Progress container, fixing wait label overlap */}
                      <div className="flex flex-col gap-2 w-full mt-2">
                        <div className="flex items-center justify-between w-full">
                          {/* Progress pill label */}
                          <div className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-wider shadow-sm ${card.progPill}`}>
                            {card.waitLabel}
                          </div>
                          
                          {/* Status Icon Indicator */}
                          <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </div>
                        </div>
                        
                        {/* Progress track */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 relative">
                          {/* Progress fill */}
                          <div className={`w-[85%] h-full rounded-full bg-gradient-to-r shadow-sm ${card.progFill}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default ContactUsPage;
