import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { ABOUT_CARDS, ABOUT_PAGE_CONTENT } from '../data/homepage/AboutUsDataPage';
import SharedPagination from '../components/SharedPagination';

const SmartIcon = ({ name, className }) => {
 const Icon = Icons[name];
 return Icon ? <Icon className={className} /> : null;
};

// 1. AboutCards component (renders the 5 About CTI cards as an interactive accordion slider matching your screen recording)
export function AboutCards({ onNavigate }) {
 const [activeIndex, setActiveIndex] = useState(0);
 const [isHovered, setIsHovered] = useState(false);

 // Auto-play animation: slides cards every 5 seconds, paused on hover
 useEffect(() => {
 if (isHovered) return;
 const timer = setInterval(() => {
 setActiveIndex((prev) => (prev + 1) % ABOUT_CARDS.length);
 }, 5000);
 return () => clearInterval(timer);
 }, [isHovered]);

 const handlePrev = () => {
 setActiveIndex((prev) => (prev - 1 + ABOUT_CARDS.length) % ABOUT_CARDS.length);
 };

 const handleNext = () => {
 setActiveIndex((prev) => (prev + 1) % ABOUT_CARDS.length);
 };

 return (
 <section className="w-full bg-[#f8fafc] py-12 md:py-16 overflow-hidden">
 <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10">

 {/* Title */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-wider uppercase text-center">
 About Us
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Learn more about our mission, vision, and the team dedicated to protecting you online.
  </p>
</div>

 {/* Accordion Viewport (Centered Absolute Container with sharp borders) */}
 <div 
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 className="relative w-full max-w-[1000px] mx-auto h-[360px] flex items-center justify-center px-4 overflow-hidden md:overflow-visible"
 >

 {/* Removed old Left Arrow Navigation */}

 {/* Absolute Accordion Cards Container */}
 <div className="relative w-full h-full flex items-center justify-center">
 {ABOUT_CARDS.map((card, idx) => {
 const isActive = idx === activeIndex;
 const glow = card.borderGlow;

 // Calculate shortest loop distance from activeIndex (-2, -1, 0, 1, 2)
 let offset = idx - activeIndex;
 if (offset < -2) offset += ABOUT_CARDS.length;
 if (offset > 2) offset -= ABOUT_CARDS.length;

 // Determine dynamic translation classes, heights, widths, and opacities (No rounded corners)
 let styleClass = "";

 if (offset === 0) {
 // Active Card: Center position, largest size
 styleClass = `w-[250px] md:w-[480px] h-[280px] md:h-[340px] translate-x-0 z-20 ${glow} opacity-100`;
 } else if (offset === -1) {
 // Left 1 Card: Shuffled to left adjacent
 styleClass = "w-[40px] md:w-[75px] h-[240px] md:h-[295px] -translate-x-[152px] md:-translate-x-[292px] z-10 border-slate-200 shadow-xs opacity-85 hover:opacity-100";
 } else if (offset === -2) {
 // Left 2 Card: Shuffled to outermost left
 styleClass = "w-[40px] md:w-[75px] h-[200px] md:h-[250px] -translate-x-[202px] md:-translate-x-[380px] z-0 border-slate-200/60 shadow-xs opacity-65 hover:opacity-100";
 } else if (offset === 1) {
 // Right 1 Card: Shuffled to right adjacent
 styleClass = "w-[40px] md:w-[75px] h-[240px] md:h-[295px] translate-x-[152px] md:translate-x-[292px] z-10 border-slate-200 shadow-xs opacity-85 hover:opacity-100";
 } else if (offset === 2) {
 // Right 2 Card: Shuffled to outermost right
 styleClass = "w-[40px] md:w-[75px] h-[200px] md:h-[250px] translate-x-[202px] md:translate-x-[380px] z-0 border-slate-200/60 shadow-xs opacity-65 hover:opacity-100";
 }

 const imageUrl = card.image;

 return (
 <div
 key={idx}
 onClick={() => setActiveIndex(idx)}
 className={`absolute border transition-all duration-700 ease-in-out flex flex-col overflow-hidden cursor-pointer ${styleClass}`}
 style={{
 backgroundImage: `url(${imageUrl})`,
 backgroundSize: 'cover',
 backgroundPosition: 'center'
 }}
 >
 {isActive ? (
 /* Active Expanded Card Details */
 <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 animate-in fade-in duration-500 text-left">
 {/* Dark overlay for readability */}
 <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

 <div className="relative z-10 flex flex-col justify-start h-full w-full space-y-3">
 {/* Top text details */}
 <div className="space-y-1">
 <h3 className="font-extrabold text-white text-lg md:text-xl tracking-wide uppercase leading-tight">
 {card.title}
 </h3>
 <p className="text-[13px] md:text-[14px] text-slate-200 font-extrabold leading-relaxed">
 {card.desc}
 </p>
 </div>

 <div className="h-[1px] w-full bg-white/10"></div>

 {/* Detailed Content */}
 <p className="text-[12.5px] md:text-[13.5px] leading-relaxed text-slate-300 font-medium flex-1 pr-1 scrollbar-none">
 {card.content}
 </p>
 </div>

 </div>
 ) : (
 /* Inactive Faded Vertical Strip */
 <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 select-none z-10 animate-in fade-in duration-500">
 {/* Dark overlay for strip */}
 <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/75 transition-colors duration-500 z-0"></div>

 {/* Vertical text title for Desktop, horizontal for mobile */}
 <div className="relative z-10 flex-1 flex items-center justify-center h-full w-full">
 <span className="text-white/80 group-hover:text-white font-extrabold tracking-widest text-[8px] md:text-[10px] uppercase whitespace-nowrap [writing-mode:vertical-lr] rotate-180 text-center block w-auto font-sans transition-colors duration-300">
 {card.title}
 </span>
 </div>

 </div>
 )}
 </div>
 );
 })}
 </div>

 {/* Removed old Right Arrow Navigation */}

 </div>

 {/* Navigation Controls */}
 <div className="mt-8">
 <SharedPagination 
 totalItems={ABOUT_CARDS.length}
 currentIndex={activeIndex}
 onPageChange={(idx) => setActiveIndex(idx)}
 onPrev={handlePrev}
 onNext={handleNext}
 />
 </div>

 </div>
 </section>
 );
}

// 2. AboutPage component (renders the full detailed view for the ABOUT US page)
export function AboutPage() {
 const { header, features, contact } = ABOUT_PAGE_CONTENT;
 return (
 <div className="w-full max-w-[1200px] mx-auto px-4 py-12 text-left space-y-8 animate-in fade-in duration-300">
 <div className="text-center max-w-2xl mx-auto space-y-2">
 <h2 className="text-3xl font-black text-slate-800">{header.title}</h2>
 <p className="text-sm text-slate-500 font-semibold leading-relaxed">
 {header.subtitle}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
 {features.map((feature, idx) => (
 <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
 <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
 <SmartIcon name={feature.icon} className="w-5 h-5" /> {feature.title}
 </h3>
 <p className="text-xs text-slate-600 leading-relaxed font-semibold">
 {feature.desc}
 </p>
 </div>
 ))}
 </div>

 <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center space-y-4">
 <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">{contact.title}</h3>
 <p className="text-xs text-slate-600 max-w-md mx-auto font-semibold">
 {contact.desc}
 </p>
 <p className="font-mono text-sm text-blue-600 font-extrabold">{contact.email}</p>
 </div>
 </div>
 );
}

export default function AboutUsSection() {
 return (
 <div className="w-full bg-[#f8fafc] text-gray-900 border-b border-gray-200">
 <AboutCards />
 </div>
 );
}
