import React, { useRef, useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';
import { CYBER_EDUCATION_CARDS } from '../data/homepage/cyberEducationLearningData';

// 1. CyberEducationCards component (renders the 10 Cyber Education & Learning cards displaying titles, descriptions and learning content directly inside)
export default function CyberEducationLearningSection() {
 const scrollContainerRef = useRef(null);
 const totalItems = CYBER_EDUCATION_CARDS.length;

 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(scrollContainerRef, totalItems);



 return (
 <section className="w-full bg-[#f8fafc] py-12 md:py-16 relative">
 <style>{`
 .cyber-edu-card {
 position: relative;
 width: calc(100% - 10px) !important;
 height: auto !important;
 min-height: 240px;
 display: flex;
 align-items: stretch;
 justify-content: flex-start;
 flex-direction: column;
 border-radius: 15px;
 cursor: pointer;
 overflow: hidden;
 flex-shrink: 0;
 scroll-snap-align: center;
 transition: transform 400ms, box-shadow 400ms;
 box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
 padding: 16px;
 }

 .cyber-edu-card:hover {
 transform: translateY(-5px);
 box-shadow: 0 20px 35px rgba(0, 0, 0, 0.25);
 }

 .cyber-edu-card::before,
 .cyber-edu-card::after {
 position: absolute;
 content: "";
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: all 0.5s ease-in-out;
 z-index: 1;
 border-radius: 15px;
 }

 .cyber-edu-card::before {
 top: 0;
 right: 0;
 }

 .cyber-edu-card::after {
 bottom: 0;
 left: 0;
 }

 .cyber-edu-card.rose-sweep {
 background: #f43f5e;
 }

 .cyber-edu-card.rose-sweep::before,
 .cyber-edu-card.rose-sweep::after {
 background-color: #ffe4e6;
 }

 .cyber-edu-card.blue-sweep {
 background: #3b82f6;
 }

 .cyber-edu-card.blue-sweep::before,
 .cyber-edu-card.blue-sweep::after {
 background-color: #dbeafe;
 }

 .cyber-edu-card.emerald-sweep {
 background: #10b981;
 }

 .cyber-edu-card.emerald-sweep::before,
 .cyber-edu-card.emerald-sweep::after {
 background-color: #d1fae5;
 }

 .cyber-edu-card.purple-sweep {
 background: #8b5cf6;
 }

 .cyber-edu-card.purple-sweep::before,
 .cyber-edu-card.purple-sweep::after {
 background-color: #f3e8ff;
 }

 .cyber-edu-card.orange-sweep {
 background: #f97316;
 }

 .cyber-edu-card.orange-sweep::before,
 .cyber-edu-card.orange-sweep::after {
 background-color: #ffedd5;
 }

 @media (min-width: 1024px) {
 .cyber-edu-card {
 width: calc((100% - 60px) / 4) !important;
 min-height: 260px;
 scroll-snap-align: start;
 }

 .cyber-edu-card::before,
 .cyber-edu-card::after {
 width: 20%;
 height: 20%;
 border-radius: 0;
 }

 .cyber-edu-card::before {
 border-radius: 0 15px 0 100%;
 }

 .cyber-edu-card::after {
 border-radius: 0 100% 0 15px;
 }

 .cyber-edu-card:hover::before,
 .cyber-edu-card:hover::after {
 width: 100%;
 height: 100%;
 border-radius: 15px;
 }
 }
 `}</style>
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">

 {/* Title centered */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-wider uppercase text-center">
 Cyber Education & Learning
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Enhance your cybersecurity skills with our curated educational resources.
  </p>
</div>

 {/* Cards Wrapper */}
 <div className="relative max-w-[1400px] mx-auto">
 
 {/* Desktop Left Button (positioned outside on the left side - hidden on mobile) */}
 {/* Removed in favor of SharedPagination */}

 {/* Desktop Right Button (positioned outside on the right side - hidden on mobile) */}
 {/* Removed in favor of SharedPagination */}

 {/* Custom Cards Layout Row */}
 <div 
 ref={scrollContainerRef}
 className="cyber-education-cards-container flex overflow-x-auto gap-5 pt-4 pb-20 scroll-smooth snap-x snap-mandatory scrollbar-none px-2"
 >
 {CYBER_EDUCATION_CARDS.map((card, idx) => {
 const themeClasses = [
 "rose-sweep",
 "blue-sweep",
 "emerald-sweep",
 "purple-sweep",
 "orange-sweep"
 ];
 const themeClass = themeClasses[idx % themeClasses.length];
 return (
 <div
 key={idx}
 className={`cyber-edu-card group ${themeClass}`}
 >
 {/* Default State Content (Centered Card Title, visible initially only on desktop) */}
 <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center p-4 text-center z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 select-none pointer-events-none">
 <h2 className="text-lg font-black text-white tracking-widest uppercase px-2 leading-snug">
 {card.title}
 </h2>
 </div>

 {/* Hover State Content (Always visible on mobile, reveals on hover on desktop) */}
 <div className="w-full flex flex-col justify-start text-left z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 select-none">
 <div className="space-y-3">
 <div>
 <h3 className="text-base font-black text-slate-900 tracking-wider uppercase leading-tight">
 {card.title}
 </h3>
 </div>
 <p className="text-[13.5px] text-slate-800 font-extrabold leading-relaxed">
 {card.desc}
 </p>
 <div className="h-[1px] w-full bg-slate-900/10"></div>
 <p className="text-[13px] leading-relaxed text-slate-700 font-medium">
 {card.content}
 </p>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Navigation Controls */}
 <div className="mt-8">
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
 );
}

