import React, { useRef, useState, useEffect } from 'react';
import { cyberCommunityCardsData } from '../data/homepage/cyberCommunityData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';

const renderCardIcon = (iconType) => {
 switch (iconType) {
 case 'users':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
 <circle cx="9" cy="7" r="4"/>
 <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
 <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
 </svg>
 );
 case 'student':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
 <path d="M6 12v5c3 3 9 3 12 0v-5"/>
 </svg>
 );
 case 'home':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
 <polyline points="9 22 9 12 15 12 15 22"/>
 </svg>
 );
 case 'senior':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
 </svg>
 );
 case 'workplace':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
 <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
 </svg>
 );
 case 'school':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="m4 6 8-4 8 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
 <path d="M12 22V10"/>
 <path d="M12 10 4 6"/>
 <path d="m12 10 8-4"/>
 </svg>
 );
 case 'college':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="m16 6 4 14"/>
 <path d="M12 6v14"/>
 <path d="M8 8v12"/>
 <path d="M4 4v16"/>
 </svg>
 );
 case 'programs':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
 <line x1="4" x2="4" y1="22" y2="15"/>
 </svg>
 );
 case 'citizenship':
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <circle cx="12" cy="12" r="10"/>
 <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
 <path d="M2 12h20"/>
 </svg>
 );
 case 'resilience':
 default:
 return (
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
 <path d="m9 12 2 2 4-4"/>
 </svg>
 );
 }
};

const renderCornerPattern = (type, color) => {
 switch (type) {
 case 'wave_topo':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-90" viewBox="0 0 140 140" fill="none">
 <path d="M40 140 C 60 110, 80 120, 140 70" stroke={color} strokeWidth="2.5" />
 <path d="M20 140 C 45 100, 75 110, 140 50" stroke={color} strokeWidth="2" />
 <path d="M0 140 C 30 85, 70 95, 140 30" stroke={color} strokeWidth="2" />
 <path d="M-20 140 C 15 70, 60 80, 140 10" stroke={color} strokeWidth="1.5" />
 <path d="M60 140 C 80 125, 100 130, 140 90" stroke={color} strokeWidth="2" />
 </svg>
 );

 case 'dotted_grid':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 {Array.from({ length: 7 }).map((_, r) =>
 Array.from({ length: 7 }).map((_, c) => {
 const cx = 50 + c * 13 + Math.sin(r) * 6;
 const cy = 40 + r * 13 + Math.cos(c) * 6;
 return <circle key={`${r}-${c}`} cx={cx} cy={cy} r={1.5 + (r + c) * 0.25} fill={color} />;
 })
 )}
 </svg>
 );

 case 'chevrons':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-90" viewBox="0 0 140 140" fill="none">
 <polygon points="140,40 140,65 75,140 50,140" fill={color} />
 <polygon points="140,75 140,100 100,140 75,140" fill={color} opacity="0.8" />
 <polygon points="140,110 140,135 135,140 110,140" fill={color} opacity="0.6" />
 <polygon points="140,10 140,30 30,140 10,140" fill={color} opacity="0.9" />
 </svg>
 );

 case 'scatter_dots':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <circle cx="110" cy="110" r="18" fill={color} opacity="0.3" />
 <circle cx="95" cy="85" r="12" fill={color} opacity="0.5" />
 <circle cx="120" cy="70" r="8" fill={color} opacity="0.7" />
 <circle cx="75" cy="115" r="9" fill={color} opacity="0.6" />
 <circle cx="60" cy="90" r="6" fill={color} opacity="0.8" />
 <circle cx="130" cy="130" r="5" fill={color} opacity="0.9" />
 <circle cx="85" cy="65" r="4" fill={color} opacity="0.9" />
 <circle cx="110" cy="45" r="5" fill={color} />
 </svg>
 );

 case 'arc_hatching':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-90" viewBox="0 0 140 140" fill="none">
 <path d="M40 140 A 100 100 0 0 1 140 40 L 140 140 Z" fill="none" stroke={color} strokeWidth="2.5" />
 {Array.from({ length: 10 }).map((_, i) => (
 <line 
 key={i} 
 x1={60 + i * 8} 
 y1="140" 
 x2="140" 
 y2={60 + i * 8} 
 stroke={color} 
 strokeWidth="3.5" 
 />
 ))}
 </svg>
 );

 case 'confetti_dashes':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <rect x="110" y="80" width="16" height="4" rx="2" fill={color} transform="rotate(35 110 80)" />
 <rect x="80" y="110" width="20" height="4.5" rx="2" fill={color} transform="rotate(-25 80 110)" />
 <rect x="95" y="60" width="14" height="4" rx="2" fill={color} transform="rotate(65 95 60)" />
 <rect x="65" y="85" width="18" height="4" rx="2" fill={color} transform="rotate(15 65 85)" />
 <rect x="120" y="115" width="15" height="4" rx="2" fill={color} transform="rotate(-45 120 115)" />
 <rect x="125" y="45" width="12" height="3.5" rx="1.5" fill={color} transform="rotate(10 125 45)" />
 <rect x="50" y="120" width="16" height="4" rx="2" fill={color} transform="rotate(50 50 120)" />
 </svg>
 );

 case 'interlocking_loops':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <circle cx="100" cy="100" r="35" stroke={color} strokeWidth="3" fill="none" />
 <circle cx="120" cy="80" r="25" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
 <circle cx="80" cy="120" r="20" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
 </svg>
 );

 case 'radial_waves':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <circle cx="140" cy="140" r="30" stroke={color} strokeWidth="3" />
 <circle cx="140" cy="140" r="55" stroke={color} strokeWidth="2.5" opacity="0.8" />
 <circle cx="140" cy="140" r="80" stroke={color} strokeWidth="2" opacity="0.6" />
 <circle cx="140" cy="140" r="105" stroke={color} strokeWidth="1.5" opacity="0.4" />
 </svg>
 );

 case 'honeycomb_mesh':
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <path d="M100 80 L115 90 L115 110 L100 120 L85 110 L85 90 Z" stroke={color} strokeWidth="2" />
 <path d="M125 50 L140 60 L140 80 L125 90 L110 80 L110 60 Z" stroke={color} strokeWidth="2" opacity="0.8" />
 <path d="M70 110 L85 120 L85 140 L70 150 L55 140 L55 120 Z" stroke={color} strokeWidth="2" opacity="0.6" />
 </svg>
 );

 case 'geometric_grid':
 default:
 return (
 <svg className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none opacity-85" viewBox="0 0 140 140" fill="none">
 <line x1="60" y1="140" x2="140" y2="60" stroke={color} strokeWidth="3" />
 <line x1="80" y1="140" x2="140" y2="80" stroke={color} strokeWidth="2.5" />
 <line x1="100" y1="140" x2="140" y2="100" stroke={color} strokeWidth="2" />
 <line x1="120" y1="140" x2="140" y2="120" stroke={color} strokeWidth="1.5" />
 <line x1="40" y1="140" x2="140" y2="40" stroke={color} strokeWidth="2" opacity="0.7" />
 </svg>
 );
 }
};

const CyberCommunityResilienceSection = ({ category }) => {
 const title = category?.title || "CYBER COMMUNITY & RESILIENCE";
 const sectionRef = useRef(null);
 const sliderRef = useRef(null);
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);
 const [expandedCard, setExpandedCard] = useState(null);
 const totalItems = cyberCommunityCardsData.length;

 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(sliderRef, totalItems);

 const handleCardClick = (num) => {
 setExpandedCard(expandedCard === num ? null : num);
 };

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
    Join a supportive community working together to build a safer digital space.
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
 {cyberCommunityCardsData.map((item) => {
 const isExpanded = expandedCard === item.num;
 return (
 <div 
 key={item.num}
 onClick={() => handleCardClick(item.num)}
 className={`w-[85vw] max-w-[350px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start bg-[#18181c] rounded-[28px] border border-zinc-800/90 hover:border-emerald-500/60 shadow-2xl hover:shadow-[0_25px_50px_-10px_rgba(16,185,129,0.3)] hover:ring-2 hover:ring-emerald-400/40 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative min-h-[360px] h-[360px] group/card overflow-hidden cursor-pointer backdrop-blur-xl z-10 hover:z-30 ${isExpanded ? 'ring-2 ring-emerald-400/40 -translate-y-2 z-30 shadow-[0_25px_50px_-10px_rgba(16,185,129,0.3)]' : ''}`}
 >
 {/* Background Shimmer & Radial Ambient Glow */}
 <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover/card:scale-150 group-hover/card:bg-emerald-500/25 transition-all duration-1000 ease-out pointer-events-none" />

 {/* Abstract Corner Pattern */}
 {renderCornerPattern(item.patternType, item.patternColor)}

 {/* ================= FRONT PANE (SLIDES OUT TO LEFT ON HOVER) ================= */}
 <div className={`w-full h-full flex flex-col justify-between p-5 sm:p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover/card:-translate-x-[110%] group-hover/card:opacity-0 relative z-10 ${isExpanded ? '-translate-x-[110%] opacity-0' : ''}`}>
 {/* Top Header */}
 <div>
 <div className="flex items-center justify-between mb-4">
 <div className={`w-14 h-14 rounded-2xl ${item.bgBadge} flex items-center justify-center shadow-lg`}>
 {renderCardIcon(item.iconType)}
 </div>
 <span className="text-[11px] font-semibold text-zinc-400 tracking-tight bg-zinc-800/60 px-3 py-1 rounded-full border border-zinc-700/50">
 {item.subtitle}
 </span>
 </div>

 {/* Badge Tag & Title */}
 <div className="text-left mb-3">
 <span className="inline-block text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-1.5">
 Topic {item.num} • {item.badge}
 </span>
 <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug tracking-tight">
 {item.title}
 </h3>
 </div>

 {/* Description Summary */}
 <p className="text-xs text-zinc-300 font-normal leading-relaxed text-left line-clamp-3">
 {item.description}
 </p>
 </div>

 {/* Front Bottom Bar */}
 <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
 <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
 {item.location}
 </span>
 <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
 Tap/Hover for Details &rarr;
 </span>
 </div>
 </div>

 {/* ================= BACK PANE (SLIDES IN FROM RIGHT ON HOVER) ================= */}
 <div className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-zinc-900/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform z-20 text-left border border-emerald-500/40 rounded-[28px] group-hover/card:translate-x-0 group-hover/card:opacity-100 ${isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'}`}>
 
 {/* Back Header */}
 <div className="flex-1 flex flex-col overflow-hidden">
 <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2.5">
 <div className="flex items-center gap-2.5">
 <div className={`w-8 h-8 rounded-xl ${item.bgBadge} flex items-center justify-center shadow-md`}>
 {renderCardIcon(item.iconType)}
 </div>
 <div>
 <span className="text-[9px] font-extrabold text-emerald-400 tracking-wider uppercase">
 Topic {item.num}
 </span>
 <h4 className="text-xs font-extrabold text-white leading-tight">
 {item.title}
 </h4>
 </div>
 </div>
 <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
 Resilience
 </span>
 </div>

 {/* Detailed Content Body */}
 <div className="flex-1 flex flex-col overflow-hidden mb-2">
 <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider shrink-0 mb-2">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
 Complete Guidance & Action Plan
 </div>
 <div 
 className="bg-black/40 rounded-xl p-3.5 border border-zinc-800 shadow-inner no-scrollbar overflow-y-auto flex-1 min-h-0"
 onClick={(e) => e.stopPropagation()}
 >
 <p className="text-[11px] text-zinc-200 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>
 </div>

 {/* Back Footer */}
 <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
 <span className="text-[10px] text-zinc-400 font-medium">
 Target: {item.location}
 </span>
 <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
 &larr; Tap to Close
 </span>
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

export default CyberCommunityResilienceSection;
