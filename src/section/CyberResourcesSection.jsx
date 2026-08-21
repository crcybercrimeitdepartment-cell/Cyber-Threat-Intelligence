import React, { useRef, useState, useEffect } from 'react';
import { cyberResourcesCardsData } from '../data/homepage/cyberResourcesData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';

const CyberResourcesSection = ({ category }) => {
 const title = category?.title || "CYBER RESOURCES & PUBLIC INFORMATION";
 const id = category?.id || 10;
 const sectionRef = useRef(null);
 const sliderRef = useRef(null);
 const [expandedCard, setExpandedCard] = useState(null);
 const totalItems = cyberResourcesCardsData.length;
 
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

 const renderCardContent = (item) => {
 switch (item.cardType) {
 case 'split_bar':
 return (
 <div className="flex h-full w-full justify-between overflow-hidden">
 <div className="flex-1 p-5 flex flex-col justify-between">
 <div>
 <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-4">
 <span className="w-4 h-4 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px]">✔</span>
 <span>CR-OD</span>
 </div>
 <h3 className="font-extrabold text-gray-900 text-lg leading-snug mb-1">
 {item.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-3 font-normal leading-relaxed">
 {item.description}
 </p>
 </div>
 <span className="text-[11px] font-bold text-gray-500 mt-3">{item.hashtag}</span>
 </div>

 <div className="w-24 shrink-0 flex flex-col h-full font-sans">
 <div className={`${item.splitTopBg} flex-1 p-3 flex flex-col justify-between text-gray-900`}>
 <span className="text-[10px] font-bold uppercase">{item.splitTopText}</span>
 <span className="text-xl font-extrabold leading-none">{item.splitTopVal}</span>
 </div>
 <div className={`${item.splitBotBg} flex-1 p-3 flex flex-col justify-between text-gray-900`}>
 <span className="text-[10px] font-bold uppercase">{item.splitBotText}</span>
 <span className="text-xl font-extrabold leading-none">{item.splitBotVal}</span>
 </div>
 </div>
 </div>
 );

 case 'giant_stat':
 return (
 <div className="p-5 flex flex-col justify-between h-full relative overflow-hidden bg-white">
 <div className="z-10">
 <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-3">
 <span className="text-2xl font-black text-gray-900 tracking-tight">{item.statValue}</span>
 <span className="text-[10px] font-bold text-gray-400">CR-OD Verified</span>
 </div>
 <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
 {item.title}
 </h3>
 <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-normal">
 {item.description}
 </p>
 </div>

 <div className="z-10 mt-3">
 <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.statLabel}</span>
 </div>

 <div className={`w-32 h-32 ${item.blobColor} rounded-full absolute -bottom-10 -right-10 pointer-events-none`}></div>
 </div>
 );

 case 'yin_yang_wave':
 return (
 <div className="relative p-5 flex flex-col justify-between h-full overflow-hidden bg-white">
 <div className="z-10">
 <p className="text-[11px] font-extrabold text-gray-900 text-center mb-1">{item.headerLabel}</p>
 <h3 className="text-center font-bold text-gray-800 text-xs mb-3">{item.title}</h3>
 </div>

 <div className={`absolute inset-x-0 bottom-0 top-14 ${item.waveBg} rounded-t-[100px] pointer-events-none transition-all`}></div>

 <div className="z-10 grid grid-cols-2 gap-2 text-center my-auto pointer-events-none">
 <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-gray-100 shadow-2xs">
 <span className="block text-xl font-black text-gray-900">{item.stat1Val}</span>
 <span className="text-[10px] font-bold text-gray-600">{item.stat1Label}</span>
 </div>
 <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-gray-100 shadow-2xs">
 <span className="block text-xl font-black text-gray-900">{item.stat2Val}</span>
 <span className="text-[10px] font-bold text-gray-600">{item.stat2Label}</span>
 </div>
 </div>

 <div className="z-10 text-center">
 <span className="text-[10px] text-gray-500 font-medium">Click to access full details →</span>
 </div>
 </div>
 );

 case 'mint_hero':
 return (
 <div className={`p-5 ${item.mintBg} text-gray-900 flex flex-col justify-between h-full relative overflow-hidden`}>
 <div>
 <h3 className="font-black text-xl leading-tight mb-1 text-gray-900">
 {item.title}
 </h3>
 <p className="text-xs text-gray-800 font-medium leading-snug">
 {item.subtitle}
 </p>
 </div>

 <div className="my-auto flex items-center justify-center relative">
 <div className="w-24 h-24 rounded-full bg-white/70 flex items-center justify-center shadow-lg">
 <div className="w-16 h-10 rounded-lg bg-gray-900 text-emerald-400 flex items-center justify-center font-bold text-xs shadow-md">
 CR-OD
 </div>
 </div>
 </div>

 <div className="flex justify-between items-center text-[11px] font-bold text-gray-900 z-10">
 <span>● CR-OD Knowledge</span>
 <span>Explore →</span>
 </div>
 </div>
 );

 case 'pie_chart':
 return (
 <div className="p-5 flex flex-col justify-between h-full bg-[#f8fafc]">
 <div className="text-center">
 <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
 {item.title}
 </h3>
 <p className="text-[11px] text-gray-500 line-clamp-2">{item.description}</p>
 </div>

 <div className="my-auto flex items-center justify-center">
 <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-sm flex items-center justify-center border-4 border-white">
 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
 <circle r="16" cx="16" cy="16" fill="#fef08a" stroke="#f59e0b" strokeWidth="32" strokeDasharray="20 100" />
 <circle r="16" cx="16" cy="16" fill="#f472b6" stroke="#ec4899" strokeWidth="32" strokeDasharray="25 100" strokeDashoffset="-20" />
 <circle r="16" cx="16" cy="16" fill="#34d399" stroke="#10b981" strokeWidth="32" strokeDasharray="25 100" strokeDashoffset="-45" />
 <circle r="16" cx="16" cy="16" fill="#60a5fa" stroke="#3b82f6" strokeWidth="32" strokeDasharray="30 100" strokeDashoffset="-70" />
 </svg>
 </div>
 </div>

 <div className="flex justify-around text-[10px] font-extrabold text-gray-700">
 {item.pieLabels.map((lbl, idx) => (
 <span key={idx}>• {lbl}</span>
 ))}
 </div>
 </div>
 );

 case 'pastel_gold':
 return (
 <div className={`p-5 ${item.goldBg} text-gray-900 flex flex-col justify-between h-full relative overflow-hidden`}>
 <div>
 <span className="block text-2xl font-black tracking-tight text-gray-900">{item.statVal}</span>
 <p className="text-xs font-bold text-gray-800 mt-0.5">{item.subStatLabel}</p>
 </div>

 <div className="my-auto bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-md text-center">
 <div className="flex items-center gap-2 mb-1 justify-center">
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
 <span className="text-[11px] font-bold text-gray-900">{item.floatingText}</span>
 </div>
 <p className="text-[10px] text-gray-500 font-medium">Verified Official Emergency Channel</p>
 </div>

 <div className="flex justify-between items-center text-[11px] font-bold text-gray-900">
 <span>● CR-OD Helpline</span>
 <span>Access Now →</span>
 </div>
 </div>
 );

 default:
 return null;
 }
 };

 const renderBackCardContent = (item) => {
 switch (item.cardType) {
 case 'split_bar':
 return (
 <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 bg-slate-900 text-white border border-slate-700 shadow-2xl flex flex-col text-left overflow-hidden">
 <div className="flex-1 min-h-0 flex flex-col overflow-hidden mb-3">
 <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2 shrink-0">
 <div className="flex items-center gap-1.5">
 <span className={`text-[9px] font-extrabold text-gray-900 px-2 py-0.5 rounded-full ${item.splitTopBg}`}>
 {item.splitTopText}: {item.splitTopVal}
 </span>
 <span className={`text-[9px] font-extrabold text-gray-900 px-2 py-0.5 rounded-full ${item.splitBotBg}`}>
 {item.splitBotText}: {item.splitBotVal}
 </span>
 </div>
 <span className="text-[10px] font-bold text-gray-400">{item.hashtag}</span>
 </div>

 <h3 className="font-extrabold text-white text-base leading-snug mb-2 shrink-0">
 {item.title}
 </h3>

 <div 
 className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80 shadow-inner flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
 Full Guidance & Details
 </div>
 <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] font-bold text-emerald-400 shrink-0">
 <span>● CR-OD Verified</span>
 <span>&larr; Flip Back</span>
 </div>
 </div>
 );

 case 'giant_stat':
 return (
 <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 bg-white text-gray-900 border border-gray-200 shadow-2xl flex flex-col text-left overflow-hidden relative">
 <div className="z-10 flex-1 min-h-0 flex flex-col overflow-hidden mb-3">
 <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2 shrink-0">
 <span className="text-xl font-black text-gray-900 tracking-tight">{item.statValue}</span>
 <span className="text-[10px] font-bold text-gray-400">Topic {item.num}</span>
 </div>

 <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 shrink-0">
 {item.title}
 </h3>

 <div 
 className="bg-slate-50 rounded-2xl p-3.5 border border-gray-200 shadow-inner flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-pink-600 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
 Official Guidance Details
 </div>
 <p className="text-[11px] text-gray-700 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="z-10 flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] font-bold text-gray-600 shrink-0">
 <span>{item.statLabel || "Verified Channel"}</span>
 <span className="text-gray-900">&larr; Flip Back</span>
 </div>

 <div className={`w-32 h-32 ${item.blobColor} rounded-full absolute -bottom-10 -right-10 pointer-events-none`}></div>
 </div>
 );

 case 'yin_yang_wave':
 return (
 <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 bg-white text-gray-900 border border-emerald-200 shadow-2xl flex flex-col text-left overflow-hidden relative">
 
 <div className="relative z-10 flex-1 min-h-0 flex flex-col overflow-hidden mb-3">
 <div className="flex items-center justify-between mb-3 shrink-0">
 <span className="text-[10px] font-extrabold text-gray-900 uppercase bg-white/90 px-2.5 py-0.5 rounded-full shadow-xs border border-gray-200">
 {item.headerLabel}
 </span>
 <span className="text-[10px] font-bold text-emerald-700">{item.stat1Val} • {item.stat2Val}</span>
 </div>

 <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 shrink-0">
 {item.title}
 </h3>

 <div 
 className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200 shadow-inner flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
 Reporting Content & Guidance
 </div>
 <p className="text-[11px] text-gray-800 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="relative z-10 flex items-center justify-between pt-2 border-t border-emerald-100 text-[10px] font-bold text-emerald-700 shrink-0">
 <span>Verified Reporting Channel</span>
 <span>&larr; Flip Back</span>
 </div>

 <div className={`absolute inset-x-0 top-0 h-14 ${item.waveBg} rounded-b-[40px] pointer-events-none opacity-60 z-0`}></div>
 </div>
 );

 case 'mint_hero':
 return (
 <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 ${item.mintBg} text-gray-900 border border-emerald-400 shadow-2xl flex flex-col justify-between text-left overflow-hidden`}>
 <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
 <div className="flex items-center justify-between mb-2 shrink-0">
 <span className="text-[10px] font-extrabold text-gray-900 uppercase bg-white/80 px-2.5 py-0.5 rounded-full border border-emerald-400">
 Mint Hero • Topic {item.num}
 </span>
 <span className="text-[10px] font-bold text-gray-900">● CR-OD</span>
 </div>

 <h3 className="font-black text-lg leading-tight mb-2 shrink-0">
 {item.title}
 </h3>

 <div 
 className="bg-gray-900/90 text-white rounded-2xl p-3.5 border border-gray-800 shadow-xl flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
 Complete Knowledge Material
 </div>
 <p className="text-[11px] text-zinc-200 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="flex items-center justify-between pt-2 border-t border-emerald-500/30 text-[10px] font-bold text-gray-900 shrink-0">
 <span>Knowledge Base</span>
 <span>&larr; Flip Back</span>
 </div>
 </div>
 );

 case 'pie_chart':
 return (
 <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 bg-[#f8fafc] text-gray-900 border border-slate-300 shadow-2xl flex flex-col justify-between text-left overflow-hidden">
 <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
 <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2 shrink-0">
 <div className="flex gap-1 text-[9px] font-bold text-gray-700">
 {item.pieLabels.slice(0, 3).map((lbl, idx) => (
 <span key={idx} className="bg-slate-200/80 px-1.5 py-0.5 rounded">
 • {lbl}
 </span>
 ))}
 </div>
 <span className="text-[10px] font-bold text-gray-500">Topic {item.num}</span>
 </div>

 <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 shrink-0">
 {item.title}
 </h3>

 <div 
 className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-blue-600 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
 Detailed Tools Guidance
 </div>
 <p className="text-[11px] text-gray-700 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-bold text-gray-700 shrink-0">
 <span>Verified Tools Directory</span>
 <span>&larr; Flip Back</span>
 </div>
 </div>
 );

 case 'pastel_gold':
 return (
 <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-5 sm:p-6 ${item.goldBg} text-gray-900 border border-amber-300 shadow-2xl flex flex-col text-left overflow-hidden`}>
 <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
 <div className="flex items-center justify-between mb-3 border-b border-amber-300/50 pb-2 shrink-0">
 <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-widest">{item.title}</span>
 <span className="text-[10px] font-bold text-gray-700">Topic {item.num}</span>
 </div>

 <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-2 shrink-0">
 Emergency Information & Guidance
 </h3>

 <div 
 className="bg-white/80 rounded-2xl p-3.5 border border-amber-200/50 shadow-inner flex-1 min-h-0 no-scrollbar overflow-y-auto relative z-20"
 onClick={(e) => e.stopPropagation()}
 style={{ transform: 'translateZ(1px)', WebkitOverflowScrolling: 'touch' }}
 >
 <div className="flex items-center gap-1.5 mb-1.5 text-amber-600 text-[10px] font-extrabold uppercase tracking-wider">
 <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
 Emergency Guidance Content
 </div>
 <p className="text-[11px] text-gray-800 leading-relaxed font-normal">
 {item.content || item.description}
 </p>
 </div>
 </div>

 <div className="flex items-center justify-between pt-2 border-t border-amber-300/50 text-[10px] font-bold text-amber-900 shrink-0">
 <span>{item.subStatLabel || "Urgent Support"}</span>
 <span>&larr; Flip Back</span>
 </div>
 </div>
 );

 default:
 return (
 <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[28px] p-6 bg-slate-900 text-white border border-emerald-500/40 shadow-2xl flex flex-col justify-between text-left overflow-hidden">
 <div>
 <h3 className="font-extrabold text-white text-base leading-snug mb-2">{item.title}</h3>
 <p className="text-xs text-slate-200 leading-relaxed">{item.content}</p>
 </div>
 <div className="text-[10px] font-bold text-emerald-400">&larr; Flip Back</div>
 </div>
 );
 }
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
    Access a comprehensive collection of tools and guides for robust cybersecurity.
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
 {cyberResourcesCardsData.map((item) => (
 <div 
 key={item.num}
 onClick={() => handleCardClick(item.num)}
 className="w-[85vw] max-w-[350px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center sm:snap-start h-[360px] min-h-[360px] perspective-1000 group cursor-pointer z-10 hover:z-30"
 >
 {/* 3D Flipping Card Container */}
 <div className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:rotate-y-180 ${expandedCard === item.num ? 'rotate-y-180' : ''} rounded-[28px] shadow-xl`}>
 
 {/* FRONT SIDE (Exact Original Front Card Design Preserved) */}
 <div className="absolute inset-0 w-full h-full backface-hidden rounded-[28px] overflow-hidden border border-gray-200/90 shadow-md">
 {renderCardContent(item)}
 </div>

 {/* BACK SIDE (Themed Back Card matching front design colors & style) */}
 {renderBackCardContent(item)}

 </div>
 </div>
 ))}
 </div>


 </div>

 {/* Navigation Controls */}
 <SharedPagination 
 totalItems={maxIndex + 1}
 currentIndex={currentIndex}
 onPageChange={scrollToIndex}
 onPrev={slideLeft}
 onNext={slideRight}
 />

 </div>
 </section>
 );
};

export default CyberResourcesSection;

