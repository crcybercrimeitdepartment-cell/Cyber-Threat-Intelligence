import React, { useRef, useState, useEffect } from 'react';
import { cyberPsychologyCardsData } from '../data/homepage/cyberPsychologyData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';

const renderIcon = (type) => {
 switch (type) {
 case 'brain':
 return (
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
 <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
 <path d="M12 5v13"/>
 <path d="M9.5 9a1.5 1.5 0 0 0-1.5 1.5"/>
 <path d="M14.5 9a1.5 1.5 0 0 1 1.5 1.5"/>
 </svg>
 );
 case 'frown':
 return (
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10"/>
 <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
 <circle cx="9" cy="9" r="1.25" fill="currentColor"/>
 <circle cx="15" cy="9" r="1.25" fill="currentColor"/>
 </svg>
 );
 case 'activity':
 return (
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
 </svg>
 );
 case 'camera_alert':
 return (
 <div className="relative">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
 <circle cx="12" cy="13" r="3"/>
 </svg>
 <span className="absolute -bottom-1 -right-1 bg-amber-400 text-gray-900 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-md">!</span>
 </div>
 );
 case 'shield_alert':
 return (
 <div className="relative">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
 </svg>
 <span className="absolute inset-0 flex items-center justify-center text-white font-black text-xs pb-0.5">!</span>
 </div>
 );
 case 'card_alert':
 return (
 <div className="relative">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <rect x="2" y="5" width="20" height="14" rx="2"/>
 <line x1="2" y1="10" x2="22" y2="10"/>
 </svg>
 <span className="absolute -bottom-1 -right-1 bg-emerald-400 text-gray-900 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-md">!</span>
 </div>
 );
 case 'user_alert':
 return (
 <div className="relative">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
 </svg>
 <span className="absolute -bottom-1 -right-1 bg-amber-400 text-gray-900 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shadow-md">!</span>
 </div>
 );
 case 'meditation':
 return (
 <div className="relative flex items-center justify-center">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
 <circle cx="12" cy="4" r="2"/>
 <path d="M8 3.5h.5M15.5 3.5h.5M12 1v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
 <path d="M12 7c-2 0-3.5 1-4 2.5L6.5 12c-.5 1 0 2 1 2h9c1 0 1.5-1 1-2l-1.5-2.5C15.5 8 14 7 12 7z"/>
 <path d="M6 14.5c-1 0-2 .5-2 1.5s1 2 3 2h10c2 0 3-1 3-2s-1-1.5-2-1.5H6z"/>
 </svg>
 </div>
 );
 case 'counselling':
 return (
 <div className="relative flex items-center justify-center">
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
 <circle cx="7" cy="8" r="2"/>
 <path d="M7 11c-2 0-4 1-4 3v2h8v-2c0-2-2-3-4-3z"/>
 <circle cx="17" cy="8" r="2"/>
 <path d="M17 11c-2 0-4 1-4 3v2h8v-2c0-2-2-3-4-3z"/>
 </svg>
 <div className="absolute -top-1 bg-amber-400 text-gray-900 px-1.5 py-0.2 rounded-full text-[8px] font-black tracking-widest leading-none shadow-xs">...</div>
 </div>
 );
 case 'heart_hands':
 return (
 <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" opacity="0.35"/>
 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="2"/>
 <path d="M8 14c2 2 6 2 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
 </svg>
 );
 default:
 return null;
 }
};

const CyberPsychologyVictimCounsellingSection = ({ category }) => {
 const title = category?.title || "CYBER PSYCHOLOGY & VICTIM COUNSELLING";
 const sectionRef = useRef(null);
 const sliderRef = useRef(null);
 const [expandedCard, setExpandedCard] = useState(null);
 const totalItems = cyberPsychologyCardsData.length;

 const handleCardClick = (num) => {
 setExpandedCard(expandedCard === num ? null : num);
 };
 
 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(sliderRef, totalItems);

 return (
 <section ref={sectionRef} className="py-10 bg-[#f8fafc] text-gray-900 border-b border-gray-200 relative group/section transition-colors duration-300">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">
 
 {/* Section Header */}
 <div className="flex flex-col items-center justify-center relative mb-8 gap-2">
  
  <div className="flex items-center justify-center gap-4 w-full">
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
  <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
  <span>{title}</span>
  </h2>
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
  </div>

  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Find emotional support and psychological counseling for cybercrime victims.
  </p>
  </div>

 {/* 5-Cards Horizontal Slider */}
 <div className="relative group/slider max-w-[1400px] mx-auto">
 <div 
 ref={sliderRef}
 className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pt-8 pb-20 px-3 sm:px-2 snap-x snap-mandatory no-scrollbar items-start"
 style={{ 
 scrollbarWidth: 'none', 
 msOverflowStyle: 'none',
 WebkitOverflowScrolling: 'touch'
 }}
 >
 {cyberPsychologyCardsData.map((item) => {
 const isExpanded = expandedCard === item.num;
 return (
 <div 
 key={item.num}
 onClick={() => handleCardClick(item.num)}
 className={`w-[85vw] max-w-[350px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start bg-gradient-to-br ${item.cardGradient} rounded-[28px] border border-white/20 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.55)] hover:border-white/45 hover:ring-2 hover:ring-amber-300/40 hover:-translate-y-2 card-expand-transition relative flex flex-col justify-start items-center text-center p-5 pt-6 pb-6 min-h-[340px] group/card hover: hover:min-h-[340px] overflow-hidden cursor-pointer backdrop-blur-xl ring-1 ring-white/20 z-10 hover:z-30 transition-all duration-500 ease-in-out ${isExpanded ? ' ring-2 ring-amber-300/40 -translate-y-2 z-30 shadow-[0_25px_50px_-10px_rgba(0,0,0,0.55)]' : ''}`}
 >
 {/* Background Shimmer & Glow Effects */}
 <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl group-hover/card:scale-150 group-hover/card:bg-white/25 transition-all duration-1000 ease-out pointer-events-none" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 opacity-80 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

 {/* Top Badge & Icon Header */}
 <div className="flex flex-col items-center w-full z-10">
 {/* 3D Elevated Neumorphic Circle Icon Badge */}
 <div className={`w-16 h-16 rounded-full ${item.discBg} flex items-center justify-center shadow-[0_12px_24px_-6px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.25)] border border-white/20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/card:scale-110 group-hover/card:rotate-3 mb-2 relative`}>
 {renderIcon(item.type)}
 </div>

 {/* Topic Number Tag Badge */}
 <div className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full border ${item.badgeTag} shadow-xs mb-2 transition-transform duration-500 ease-out group-hover/card:scale-105`}>
 Topic {item.num}
 </div>

 {/* Card Title */}
 <h3 className="font-extrabold text-white text-base leading-snug tracking-tight mb-2 group-hover/card:text-amber-200 transition-colors duration-500">
 {item.title}
 </h3>
 </div>

 {/* Description & 50% to 100% Content Expansion */}
 <div className="w-full flex-1 flex flex-col justify-start items-center z-10 text-reveal-transition">
 {/* Summary Description */}
 <p className="text-[12px] text-amber-100/90 font-semibold leading-relaxed max-w-[96%] mb-2.5">
 {item.description}
 </p>

 {/* Content Box: 50% shown by default, 100% on hover */}
 <div className="w-full bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 shadow-inner text-left text-reveal-transition">
 <div className="flex items-center justify-between mb-1.5 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
 <span className="flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
 Detailed Guidance
 </span>
 <span className={`text-[9px] text-white/60 font-normal group-hover/card:opacity-0 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : ''}`}>
 {isExpanded ? 'Tap to close ↑' : 'Tap/Hover for details ↓'}
 </span>
 </div>
 <p className={`text-[11px] text-white/90 leading-relaxed font-normal group-hover/card:line-clamp-none text-reveal-transition ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}>
 {item.content}
 </p>
 </div>
 </div>
 </div>
 );
 })}
 </div>


 </div>

 {/* Navigation Controls */}
 <div className="mt-8">
 <SharedPagination 
 totalItems={maxIndex + 1}
 currentIndex={currentIndex}
 onPageChange={scrollToIndex}
 onPrev={slideLeft}
 onNext={slideRight}
 />
 </div>

 </div>
 </section>
 );
};

export default CyberPsychologyVictimCounsellingSection;

