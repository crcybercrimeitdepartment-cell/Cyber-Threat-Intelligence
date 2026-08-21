import React, { useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';
import { CYBER_SCAM_FRAUD_CARDS } from '../data/homepage/CyberScamFraudInformationPageData';

// Color schemes matching the 5 exact palette styles in the image
const getColorStyle = (index) => {
 const palette = [
 {
 // 01 Yellow
 stopStart: "#FFE002",
 stopMid: "#FFB300",
 stopEnd: "#FF8000",
 circleGradient: "from-[#FFE002] via-[#FFB300] to-[#FF8000]",
 textColor: "text-[#D97706]",
 iconBg: "bg-amber-50 border-amber-200/80",
 badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
 },
 {
 // 02 Orange
 stopStart: "#FF9E00",
 stopMid: "#FF6000",
 stopEnd: "#E63900",
 circleGradient: "from-[#FF9E00] via-[#FF6000] to-[#E63900]",
 textColor: "text-[#EA580C]",
 iconBg: "bg-orange-50 border-orange-200/80",
 badgeBg: "bg-orange-100 text-orange-800 border-orange-300",
 },
 {
 // 03 Pink / Magenta
 stopStart: "#FF3377",
 stopMid: "#FF0055",
 stopEnd: "#C20048",
 circleGradient: "from-[#FF3377] via-[#FF0055] to-[#C20048]",
 textColor: "text-[#E11D48]",
 iconBg: "bg-rose-50 border-rose-200/80",
 badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
 },
 {
 // 04 Teal / Cyan
 stopStart: "#00E5FF",
 stopMid: "#00B4D8",
 stopEnd: "#0077B6",
 circleGradient: "from-[#00E5FF] via-[#00B4D8] to-[#0077B6]",
 textColor: "text-[#0891B2]",
 iconBg: "bg-cyan-50 border-cyan-200/80",
 badgeBg: "bg-cyan-100 text-cyan-800 border-cyan-300",
 },
 {
 // 05 Purple
 stopStart: "#9D4EDD",
 stopMid: "#7B2CBF",
 stopEnd: "#3C096C",
 circleGradient: "from-[#9D4EDD] via-[#7B2CBF] to-[#3C096C]",
 textColor: "text-[#7C3AED]",
 iconBg: "bg-purple-50 border-purple-200/80",
 badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
 }
 ];
 return palette[index % palette.length];
};

const getScamIcon = (id) => {
 switch (id) {
 case 1: return Icons.Landmark;
 case 2: return Icons.Smartphone;
 case 3: return Icons.TrendingUp;
 case 4: return Icons.Briefcase;
 case 5: return Icons.Coins;
 case 6: return Icons.KeyRound;
 case 7: return Icons.Package;
 case 8: return Icons.ShieldAlert;
 case 9: return Icons.Share2;
 case 10: return Icons.Clock;
 default: return Icons.ShieldAlert;
 }
};

export default function CyberScamFraudInformationSection() {
 const scrollContainerRef = useRef(null);
 const [flippedCards, setFlippedCards] = useState(new Set());

 const totalItems = CYBER_SCAM_FRAUD_CARDS.length;
 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(scrollContainerRef, totalItems);

 const toggleCard = (tag) => {
 setFlippedCards(prev => {
 const next = new Set(prev);
 if (next.has(tag)) {
 next.delete(tag);
 } else {
 next.add(tag);
 }
 return next;
 });
 };

 return (
 <>
 <style dangerouslySetInnerHTML={{ __html: `
 .cyber-scam-fraud-cards-container {
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 overflow-x: auto;
 overflow-y: hidden;
 gap: 24px;
 padding: 30px 10px 60px 10px;
 scroll-behavior: smooth;
 width: 100%;
 scrollbar-width: none;
 -ms-overflow-style: none;
 scroll-snap-type: x mandatory;
 scroll-padding-left: 10px;
 }
 .cyber-scam-fraud-cards-container::-webkit-scrollbar {
 display: none;
 }
 ` }} />

 <section className="w-full bg-[#f8fafc] py-12 md:py-16 border-t border-slate-100 relative">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">

 {/* Title centered */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
 Cyber Scam & Fraud Information
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Identify and avoid common online scams to keep your personal information secure.
  </p>
</div>

 {/* Cards Wrapper */}
 <div className="relative max-w-[1400px] mx-auto">

 {/* Custom Cards Layout Row */}
 <div
 ref={scrollContainerRef}
 className="cyber-scam-fraud-cards-container px-0"
 >
 {CYBER_SCAM_FRAUD_CARDS.map((card, idx) => {
 const IconComponent = getScamIcon(card.id);
 const style = getColorStyle(idx);
 const isFlipped = flippedCards.has(card.tag);

 return (
 <div
 key={card.id}
 onClick={() => toggleCard(card.tag)}
 className="cyber-scam-card-wrapper w-[82vw] max-w-[310px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-center sm:snap-start relative group/card cursor-pointer flex flex-col pt-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5"
 >
 {/* TOP FLOATING NUMBER BADGE */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
 <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${style.circleGradient} border-[5px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.22)] flex items-center justify-center transition-all duration-500 ease-out group-hover/card:scale-110 group-hover/card:shadow-[0_14px_30px_rgba(0,0,0,0.35)]`}>
 <span className="text-white text-2xl font-black tracking-tight drop-shadow-md leading-none">
 {card.tag}
 </span>
 </div>
 </div>

 {/* WHITE CARD CONTAINER */}
 <div className="bg-white rounded-[34px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.09),0_6px_16px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between min-h-[360px] h-auto border border-gray-100 relative w-full">
 
 {/* FULL CARD GRADIENT BACKGROUND COVER */}
 <div 
 className={`absolute inset-0 bg-gradient-to-b ${style.circleGradient} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 pointer-events-none ${
 isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover/card:opacity-100 group-hover/card:scale-100'
 }`}
 />

 {/* TOP LIQUID WAVE HEADER */}
 <div 
 className={`absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0 ${
 isFlipped ? 'h-[120%]' : 'h-32 group-hover/card:h-[120%]'
 }`}
 >
 <svg 
 viewBox="0 0 300 130" 
 className="w-full h-full block filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.2)]" 
 preserveAspectRatio="none"
 >
 <defs>
 <linearGradient id={`grad-scam-no-wheel-v2-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor={style.stopStart} />
 <stop offset="50%" stopColor={style.stopMid} />
 <stop offset="100%" stopColor={style.stopEnd} />
 </linearGradient>
 </defs>
 <path 
 d="M 0,0 L 300,0 L 300,50 C 250,90 210,122 160,96 C 110,70 60,25 0,45 Z" 
 fill={`url(#grad-scam-no-wheel-v2-${idx})`} 
 />
 </svg>
 </div>

 {/* ================= LAYER 1: DEFAULT FRONT CONTENT ================= */}
 <div className={`px-6 pt-1 pb-5 flex-1 flex flex-col justify-between text-left relative z-20 transition-all duration-500 ease-out ${
 isFlipped
 ? 'opacity-0 pointer-events-none scale-95 translate-y-2'
 : 'opacity-100 pointer-events-auto scale-100 translate-y-0 group-hover/card:opacity-0 group-hover/card:pointer-events-none group-hover/card:scale-95 group-hover/card:translate-y-2'
 }`}>
 
 {/* Top Right Icon */}
 <div className="flex justify-end mb-1">
 <div className={`p-2 rounded-2xl ${style.iconBg} border shadow-2xs`}>
 <IconComponent className={`w-6 h-6 ${style.textColor}`} strokeWidth={1.9} />
 </div>
 </div>

 {/* Title & Short Summary */}
 <div className="flex-1 flex flex-col justify-start">
 <span className={`text-[11px] font-black uppercase tracking-widest block ${style.textColor} mb-1`}>
 INFOGRAPHIC
 </span>
 <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug tracking-tight mb-2 line-clamp-2">
 {card.title}
 </h3>
 <p className="text-[11.5px] text-gray-400 font-normal leading-relaxed line-clamp-3">
 {card.desc}
 </p>
 </div>

 {/* Front Footer */}
 <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10.5px] font-extrabold text-gray-400">
 <span className="uppercase tracking-wider">SCAM AWARENESS</span>
 <span className={`flex items-center gap-1 ${style.textColor} font-bold`}>
 Hover for Protection &rarr;
 </span>
 </div>

 </div>

 {/* ================= LAYER 2: REVEALED FULL DESCRIPTION PANE ================= */}
 <div className={`absolute inset-0 p-6 flex flex-col justify-between text-left z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
 isFlipped
 ? 'opacity-100 pointer-events-auto scale-100 translate-y-0'
 : 'opacity-0 pointer-events-none scale-95 translate-y-4 group-hover/card:opacity-100 group-hover/card:pointer-events-auto group-hover/card:scale-100 group-hover/card:translate-y-0'
 }`}>
 
 {/* Revealed Header */}
 <div className="flex items-center justify-between pt-6 border-b border-white/20 pb-3 mb-2">
 <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 text-amber-200 px-3 py-1 rounded-full border border-white/20">
 CASE {card.tag} • SCAM PROTECTION
 </span>
 <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
 <IconComponent className="w-4 h-4 text-white" strokeWidth={2} />
 </div>
 </div>

 {/* Revealed Title & Full Detailed Description */}
 <div className="flex-1 flex flex-col justify-start pt-1 overflow-hidden mb-3">
 <h4 className="font-extrabold text-white text-base leading-snug tracking-tight mb-2.5 drop-shadow-xs shrink-0">
 {card.title}
 </h4>

 {/* Full Detailed Description Box */}
 <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 shadow-inner no-scrollbar overflow-y-auto flex-1 min-h-0"
 onClick={(e) => e.stopPropagation()} // Prevent closing when scrolling inner content
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-[9.5px] font-black uppercase text-amber-300 tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
 Scam Pattern & Prevention
 </div>
 <p className="text-[11.5px] text-white/95 leading-relaxed font-normal">
 {card.content}
 </p>
 </div>
 </div>

 {/* Revealed Footer */}
 <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10.5px] font-bold text-white/90">
 <span className="uppercase tracking-wider">SCAM PREVENTION</span>
 <span className="flex items-center gap-1 text-amber-200">
 &larr; Unhover to return
 </span>
 </div>

 </div>

 </div>

 </div>
 );
 })}
 </div>

 {/* Navigation Controls */}
 <div className="mt-8 flex justify-center w-full relative z-30">
 <SharedPagination 
 totalItems={maxIndex + 1}
 currentIndex={currentIndex}
 onPageChange={(idx) => scrollToIndex(idx)}
 onPrev={slideLeft}
 onNext={slideRight}
 />
 </div>
 
 </div>

 </div>
 </section>
 </>
 );
}
