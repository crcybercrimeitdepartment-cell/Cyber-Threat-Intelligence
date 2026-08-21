import React, { useRef, useState, useEffect } from 'react';
import { cyberAwarenessCardsData } from '../data/homepage/cyberAwarenessData';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';

const CyberAwarenessSection = ({ category }) => {
 const title = category?.title || "CYBER AWARENESS & PUBLIC SAFETY";
 const focus = category?.focus || "Public ko daily cyber risks se aware aur safe banana";
 const id = category?.id || 3;
 const sectionRef = useRef(null);
 const sliderRef = useRef(null);
 const [flippedCards, setFlippedCards] = useState([]);
 const totalItems = cyberAwarenessCardsData.length;

 const { 
 currentIndex, 
 maxIndex, 
 canScrollLeft,
 canScrollRight,
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(sliderRef, totalItems);

 const handleCardClick = (num) => {
 setFlippedCards(prev => 
 prev.includes(num) ? prev.filter(id => id !== num) : [...prev, num]
 );
 };

 return (
 <section ref={sectionRef} className="w-full py-12 md:py-16 bg-[#f8fafc] text-gray-900 border-b border-gray-200 relative overflow-hidden group/section transition-colors duration-300">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">
 
 {/* Title centered */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
 {title}
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Stay informed with the latest trends and essential tips for digital safety.
  </p>
</div>

 {/* 4 Cards Per View Slider Matching Image Design */}
 <div className="relative max-w-[1400px] mx-auto group/slider">
 <div 
 ref={sliderRef}
 className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth pt-8 pb-20 px-4 snap-x snap-mandatory no-scrollbar items-start"
 style={{ 
 scrollbarWidth: 'none', 
 msOverflowStyle: 'none',
 WebkitOverflowScrolling: 'touch'
 }}
 >
 {cyberAwarenessCardsData.map((item) => {
 const IconComponent = item.icon;
 const isFlipped = flippedCards.includes(item.num);
 return (
 <div 
 key={item.num}
 onClick={() => handleCardClick(item.num)}
 className="w-[82vw] max-w-[310px] sm:w-[calc(50%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-center sm:snap-start relative group/card cursor-pointer py-4 min-h-[410px] sm:min-h-[430px]"
 >
 {/* LAYER 1: FRONT WHITE CARD */}
 <div 
 className={`relative bg-white rounded-[32px] p-6 sm:p-7 h-full min-h-[380px] sm:min-h-[440px] flex flex-col items-center text-center justify-between border border-gray-100/90 shadow-[0_15px_30px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 ease-in-out transform ${
 isFlipped
 ? 'rotate-[14deg] translate-x-6 translate-y-4 scale-90 opacity-10 z-0 pointer-events-none'
 : 'z-10 opacity-100 rotate-0 scale-100 group-hover/card:rotate-[14deg] group-hover/card:translate-x-6 group-hover/card:translate-y-4 group-hover/card:scale-90 group-hover/card:opacity-10 group-hover/card:z-0'
 }`}
 >
 
 {/* Top Icon */}
 <div className="flex flex-col items-center w-full pt-1">
 <div className="w-12 h-12 mb-3 flex items-center justify-center text-gray-900 transition-transform duration-700 ease-out group-hover/card:scale-110">
 <IconComponent className="w-8 h-8 stroke-[1.6]" />
 </div>

 {/* STEP Text */}
 <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">
 STEP
 </span>

 {/* Giant Step Number */}
 <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">
 {item.num}
 </h3>

 {/* Subtitle / Title */}
 <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest leading-snug mb-3">
 {item.title}
 </h4>
 </div>

 {/* Middle Body Paragraph */}
 <div className="flex-1 flex items-center justify-center my-2">
 <p className="text-[11px] text-gray-400 font-normal leading-relaxed max-w-[95%]">
 {item.description}
 </p>
 </div>

 {/* Front Bottom Indicator */}
 <div className="pt-2 border-t border-gray-100 w-full text-center">
 <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
 Tap / Hover to Swap &rarr;
 </span>
 </div>

 </div>

 {/* LAYER 2: COLORED BACK CARD */}
 <div 
 className={`absolute inset-x-1 inset-y-4 rounded-[36px] ${item.bgOuter} text-white p-6 sm:p-7 flex flex-col text-left transform transition-all duration-500 ease-in-out overflow-hidden ${
 isFlipped
 ? 'rotate-0 translate-x-0 translate-y-0 scale-100 opacity-100 z-20 shadow-[0_25px_50px_-10px_rgba(0,0,0,0.35)]'
 : '-rotate-[9deg] scale-95 opacity-90 z-0 pointer-events-none group-hover/card:rotate-0 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 group-hover/card:z-20 group-hover/card:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.35)] group-hover/card:pointer-events-auto'
 }`}
 >
 {/* Back Header */}
 <div className="flex-1 flex flex-col overflow-hidden mb-3">
 <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2 shrink-0">
 <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full border border-white/20">
 STEP {item.num} • Details
 </span>
 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
 <IconComponent className="w-4 h-4 text-white stroke-[2]" />
 </div>
 </div>

 <h3 className="font-extrabold text-white text-base sm:text-lg leading-snug mb-3 shrink-0">
 {item.title}
 </h3>

 {/* Full Guidance Content Box */}
 <div 
 className="bg-black/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 shadow-inner flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-amber-200 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
 Full Public Guidance
 </div>
 <p className="text-[11px] text-white/95 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 {/* Back Footer */}
 <div className="flex items-center justify-end pt-3 border-t border-white/20 text-[10px] font-bold text-white shrink-0">
 <span className="flex items-center gap-1">&larr; Tap to Return</span>
 </div>
 </div>

 </div>
 );
 })}
 </div>

 {/* Removed Floating Side Arrows for Desktop */}
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

export default CyberAwarenessSection;
