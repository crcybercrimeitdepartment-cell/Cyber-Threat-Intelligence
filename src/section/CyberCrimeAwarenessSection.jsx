import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";
import SharedPagination from "../components/SharedPagination";
import { cardsData } from "../data/homepage/cyberCrimeAwarenessData";

/* ─── ICONS & ILLUSTRATIONS ──────────────────────────────────────────────── */

const PhishingIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
 <rect x="3" y="5" width="18" height="14" rx="2" />
 </svg>
 {/* Hook */}
 <svg className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 2v10" />
 <path d="M12 12c-2 0-3.5-1.5-3.5-3.5" />
 <path d="M8.5 8.5l2 2" />
 </svg>
 {/* Red Alert */}
 <div className="absolute top-[8px] right-[8px] md:top-[12px] md:right-[12px] w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-[1.5px] border-white flex items-center justify-center">
 <span className="text-white text-[6px] md:text-[8px] font-bold">!</span>
 </div>
 </div>
);

const PhishingIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 {/* Wave */}
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave)" />
 <defs>
 <linearGradient id="bg-wave" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#DBEAFE" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>

 {/* Dotted Grid (Top Right) */}
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Background Leaves */}
 <svg className="absolute left-[-10px] md:left-[-20px] bottom-[30px] md:bottom-[40px] w-20 h-20 md:w-32 md:h-32 opacity-70" viewBox="0 0 100 100">
 <path d="M50,90 C10,90 0,50 0,20 C40,20 50,50 50,90 Z" fill="#BFDBFE" />
 <path d="M50,90 C90,90 100,50 100,20 C60,20 50,50 50,90 Z" fill="#DBEAFE" />
 </svg>

 {/* Laptop Base & Screen */}
 <div className="absolute bottom-[20px] w-[240px] md:w-[320px] h-[150px] md:h-[200px]">
 {/* Laptop Screen Hardware */}
 <div className="absolute inset-0 bg-[#E2E8F0] rounded-xl shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-white/50">
 <div className="w-full h-full bg-[#1E3A8A] rounded-lg relative overflow-hidden flex flex-col">
 {/* Browser Bar */}
 <div className="w-full h-4 md:h-5 bg-[#3B82F6] flex items-center px-2 gap-1 md:gap-1.5">
 <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
 </div>
 {/* Browser Content */}
 <div className="flex-1 bg-[#2563EB] relative flex items-center justify-center p-3 md:p-4">
 {/* Inner Login Form */}
 <div className="w-28 md:w-40 h-28 md:h-40 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-3 md:p-4 relative">
 <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full mb-2 md:mb-3 flex items-center justify-center">
 <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
 </div>
 <div className="w-full h-2.5 md:h-4 rounded border border-slate-200 mb-2 flex items-center px-1">
 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-0.5"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-0.5"></div>
 </div>
 <div className="w-full h-2.5 md:h-4 rounded border border-slate-200 mb-2 md:mb-3 flex items-center px-1">
 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-0.5"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-0.5"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-0.5"></div>
 </div>
 <div className="w-16 md:w-20 h-3 md:h-5 bg-red-500 rounded-full"></div>
 </div>
 </div>
 </div>
 </div>
 {/* Laptop Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[10px] left-[-10px] md:left-[-20px] right-[-10px] md:right-[-20px] h-[10px] md:h-[14px] bg-[#CBD5E1] rounded-b-xl rounded-t-sm shadow-md flex justify-center">
 <div className="w-12 md:w-20 h-1 md:h-1.5 bg-[#94A3B8] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Fish Hook */}
 <div className="absolute top-[-10px] md:top-[-20px] right-[80px] md:right-[110px] z-20 flex flex-col items-center animate-swing">
 <div className="w-[1.5px] md:w-0.5 h-20 md:h-24 bg-slate-700"></div>
 <svg className="w-8 h-10 md:w-12 md:h-16 text-slate-800 -mt-1 drop-shadow-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 2v6" />
 <path d="M12 8c-3.3 0-6 2.7-6 6v4" />
 <path d="M6 18c0 1.7 1.3 3 3 3s3-1.3 3-3v-2" />
 <circle cx="12" cy="8" r="2" />
 <path d="M9 15l3 3-3 3" />
 </svg>
 </div>

 {/* Lock Icon */}
 <div className="absolute left-[-10px] md:left-[10px] bottom-[30px] md:bottom-[40px] z-30 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-50 animate-float">
 <svg className="w-5 h-5 md:w-7 md:h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
 <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
 <path fillRule="evenodd" d="M18 10V7a6 6 0 10-12 0v3a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-10-3a4 4 0 118 0v3H8V7z" clipRule="evenodd" />
 </svg>
 </div>

 {/* Shield Icon */}
 <div className="absolute right-[-10px] md:right-[0px] bottom-[15px] md:bottom-[25px] z-30 animate-float-delayed">
 <svg className="w-16 h-20 md:w-24 md:h-28 drop-shadow-2xl" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#3B82F6" />
 <stop offset="100%" stopColor="#1E40AF" />
 </linearGradient>
 <linearGradient id="shieldHighlight" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGrad)" stroke="#DBEAFE" strokeWidth="2" />
 <path d="M50 5 L50 115 C50 115 90 90 90 60 L90 20 Z" fill="url(#shieldHighlight)" />
 {/* Exclamation Mark */}
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="75" r="5" fill="white" />
 </svg>
 </div>

 </div>
 </div>
);

const SocialEngIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Hacker / Spy Icon */}
 <svg className="w-7 h-7 md:w-9 md:h-9 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8.686 2 6 4.686 6 8v1.5C6 9.776 5.776 10 5.5 10S5 9.776 5 9.5V8c0-3.866 3.134-7 7-7s7 3.134 7 7v1.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5V8c0-3.314-2.686-6-6-6z" />
 <path d="M12 4C9.5 4 7 6.5 7 8v2h10V8C17 6.5 14.5 4 12 4z" />
 <rect x="5" y="9" width="14" height="2" rx="1" />
 <path d="M8.5 13a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm7 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="white" stroke="currentColor" strokeWidth="1.5" />
 <path d="M11 15.5h2" stroke="currentColor" strokeWidth="1.5" />
 <path d="M7 22V19c0-1.5 1.5-3 3-3h4c1.5 0 3 1.5 3 3v3H7z" />
 </svg>
 {/* Chat Bubble overlay */}
 <div className="absolute bottom-[-2px] right-[-4px] md:bottom-0 md:right-0">
 <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-500 drop-shadow-sm border-2 border-orange-50 rounded-full bg-orange-50" viewBox="0 0 24 24" fill="currentColor">
 <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
 <circle cx="8" cy="10" r="1.5" fill="white" />
 <circle cx="12" cy="10" r="1.5" fill="white" />
 <circle cx="16" cy="10" r="1.5" fill="white" />
 </svg>
 </div>
 </div>
);

const SocialEngIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 {/* Wave */}
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-orange)" />
 <defs>
 <linearGradient id="bg-wave-orange" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FFF7ED" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#FFEDD5" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>

 {/* Dotted Grid (Top Right) */}
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #F97316 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Background Leaves */}
 <svg className="absolute right-[-10px] md:right-[-10px] bottom-[20px] md:bottom-[40px] w-20 h-20 md:w-32 md:h-32 opacity-70" viewBox="0 0 100 100">
 <path d="M50,90 C90,90 100,50 100,20 C60,20 50,50 50,90 Z" fill="#FED7AA" />
 <path d="M50,90 C50,50 60,20 100,20 C100,50 90,90 50,90 Z" fill="#FFEDD5" />
 <path d="M50,90 C70,70 70,30 100,20 C80,40 60,40 50,90 Z" fill="#F97316" opacity="0.2" />
 </svg>

 {/* Smartphone Base */}
 <div className="absolute bottom-[20px] md:bottom-[30px] w-[140px] md:w-[170px] h-[190px] md:h-[240px] bg-[#1E293B] rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-slate-600">
 {/* Notch */}
 <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-[#1E293B] rounded-b-xl z-20"></div>
 {/* Screen */}
 <div className="w-full h-full bg-slate-50 rounded-[1.2rem] md:rounded-[1.7rem] relative overflow-hidden flex flex-col pt-6 md:pt-8 px-2 md:px-3">
 {/* Chat Bubble on screen */}
 <div className="w-20 md:w-24 h-8 md:h-10 bg-orange-400 rounded-2xl rounded-tl-sm self-start mb-3 relative flex items-center px-3 gap-1 shadow-sm">
 <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
 </div>

 {/* Message Card 1 */}
 <div className="w-full h-12 md:h-14 bg-white rounded-xl shadow-sm mb-3 flex items-center p-2 gap-2 border border-slate-100">
 <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200"></div>
 <div className="flex-1">
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full mb-1.5"></div>
 <div className="w-3/4 h-1.5 md:h-2 bg-slate-200 rounded-full"></div>
 </div>
 </div>

 {/* Message Card 2 (Popping out) */}
 <div className="absolute top-[45%] left-[-20%] md:left-[-30%] w-[120%] md:w-[140%] h-14 md:h-16 bg-white rounded-xl shadow-xl flex items-center p-2 md:p-3 gap-2 md:gap-3 z-30 border border-slate-100 animate-float">
 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-300 flex items-center justify-center">
 <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" /></svg>
 </div>
 <div className="flex-1">
 <div className="w-full h-2 md:h-2.5 bg-slate-200 rounded-full mb-2"></div>
 <div className="w-4/5 h-2 md:h-2.5 bg-slate-200 rounded-full mb-2"></div>
 <div className="w-1/2 h-2 md:h-2.5 bg-orange-400 rounded-full"></div>
 </div>
 </div>

 {/* Bottom screen element */}
 <div className="absolute bottom-4 left-2 right-2 h-10 md:h-12 bg-white rounded-xl shadow-sm flex items-center p-2 gap-2 border border-slate-100 opacity-60">
 <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 flex items-center justify-center">
 <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" /></svg>
 </div>
 <div className="flex-1">
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full mb-1.5"></div>
 <div className="w-3/4 h-1.5 md:h-2 bg-slate-200 rounded-full"></div>
 </div>
 </div>
 </div>
 </div>

 {/* Profile Circle Float (Top Right) */}
 <div className="absolute top-[20px] md:top-[40px] right-[40px] md:right-[50px] z-30 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg border-4 border-orange-50 flex items-center justify-center animate-pulse-glow">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
 </svg>
 </div>

 {/* Drama/Hacker Mask (Bottom Right) */}
 <div className="absolute right-[20px] md:right-[30px] bottom-[10px] md:bottom-[15px] z-40">
 <svg className="w-20 h-24 md:w-28 md:h-32 drop-shadow-[0_15px_25px_rgba(249,115,22,0.4)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="maskGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FDBA74" />
 <stop offset="100%" stopColor="#EA580C" />
 </linearGradient>
 <linearGradient id="maskHighlight" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
 </linearGradient>
 </defs>
 <path d="M50 10 C20 10 10 30 10 60 C10 90 30 110 50 115 C70 110 90 90 90 60 C90 30 80 10 50 10 Z" fill="url(#maskGrad)" />
 <path d="M50 10 C20 10 10 30 10 60 C10 90 30 110 50 115 C70 110 90 90 90 60 C90 30 80 10 50 10 Z" fill="url(#maskHighlight)" />
 {/* Left Eye */}
 <path d="M25 55 C25 45 40 45 40 55 C40 60 25 60 25 55 Z" fill="white" />
 {/* Right Eye */}
 <path d="M60 55 C60 45 75 45 75 55 C75 60 60 60 60 55 Z" fill="white" />
 {/* Smile */}
 <path d="M30 85 C40 95 60 95 70 85 C65 95 35 95 30 85 Z" fill="white" />
 </svg>
 </div>

 {/* Warning Sign (Bottom Left) */}
 <div className="absolute left-[30px] md:left-[40px] bottom-[10px] md:bottom-[20px] z-40 animate-float-delayed">
 <svg className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_10px_15px_rgba(249,115,22,0.3)]" viewBox="0 0 100 100">
 <defs>
 <linearGradient id="warnGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#F97316" />
 <stop offset="100%" stopColor="#C2410C" />
 </linearGradient>
 </defs>
 <path d="M50 10 L10 85 L90 85 Z" fill="url(#warnGrad)" stroke="white" strokeWidth="6" strokeLinejoin="round" />
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="72" r="5" fill="white" />
 </svg>
 </div>

 {/* Dotted Curved Arrow */}
 <div className="absolute left-[0px] md:left-[10px] top-[40%] z-20">
 <svg className="w-16 h-16 md:w-20 md:h-20 text-orange-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6">
 <path d="M10 70 Q 10 20 80 20" fill="none" />
 <path d="M70 10 L85 20 L70 30" strokeDasharray="none" strokeWidth="4" />
 </svg>
 </div>

 </div>
 </div>
);

const AccountTakeoverIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* User Profile */}
 <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />
 <path d="M7 20.5a7 7 0 0110 0" strokeWidth="2.5" />
 </svg>
 {/* Lock overlay */}
 <div className="absolute bottom-[-2px] right-[-2px] md:bottom-[2px] md:right-[2px]">
 <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600 fill-purple-600 border border-white rounded-md bg-white box-content" viewBox="0 0 24 24">
 <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" fill="white" />
 <path fillRule="evenodd" d="M18 10V7a6 6 0 10-12 0v3a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-10-3a4 4 0 118 0v3H8V7z" clipRule="evenodd" />
 </svg>
 </div>
 </div>
);

const AccountTakeoverIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-purple)" />
 <defs>
 <linearGradient id="bg-wave-purple" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FAF5FF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#F3E8FF" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #A855F7 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Background Leaves */}
 <svg className="absolute right-[-10px] md:right-[-10px] bottom-[20px] md:bottom-[40px] w-20 h-20 md:w-32 md:h-32 opacity-70" viewBox="0 0 100 100">
 <path d="M50,90 C90,90 100,50 100,20 C60,20 50,50 50,90 Z" fill="#D8B4FE" />
 <path d="M50,90 C50,50 60,20 100,20 C100,50 90,90 50,90 Z" fill="#E9D5FF" />
 <path d="M50,90 C70,70 70,30 100,20 C80,40 60,40 50,90 Z" fill="#A855F7" opacity="0.2" />
 </svg>

 {/* Laptop Base & Screen */}
 <div className="absolute bottom-[20px] md:bottom-[30px] w-[240px] md:w-[320px] h-[150px] md:h-[200px]">
 {/* Screen Hardware */}
 <div className="absolute inset-0 bg-[#2D2A3D] rounded-xl shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-slate-700">
 <div className="w-full h-full bg-[#E9D5FF] rounded-lg relative overflow-hidden flex flex-col items-center justify-center">
 {/* Purple Screen UI */}
 <div className="w-[85%] h-[85%] bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-4">
 {/* Profile Icon */}
 <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-100 rounded-full mb-3 md:mb-4 flex items-center justify-center">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
 </svg>
 </div>
 {/* Password Dots */}
 <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-5">
 {[1, 2, 3, 4, 5, 6, 7].map(i => (
 <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 bg-slate-800 rounded-full"></div>
 ))}
 </div>
 {/* Login Button */}
 <div className="w-[80%] h-6 md:h-8 bg-purple-600 rounded-full flex items-center justify-center gap-2">
 <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
 </div>
 </div>
 </div>
 </div>
 {/* Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[10px] left-[-15px] md:left-[-25px] right-[-15px] md:right-[-25px] h-[10px] md:h-[14px] bg-[#E2E8F0] rounded-b-xl rounded-t-sm shadow-md flex justify-center">
 <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#CBD5E1] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Floating Open Lock (Top Center/Right) */}
 <div className="absolute top-[-30px] md:top-[-45px] right-[40%] md:right-[35%] z-20 animate-swing">
 <svg className="w-16 h-20 md:w-20 md:h-24 drop-shadow-[0_15px_20px_rgba(168,85,247,0.4)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="lockGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#A855F7" />
 <stop offset="100%" stopColor="#7C3AED" />
 </linearGradient>
 </defs>
 {/* Shackle (Open) */}
 <path d="M25 50 V 30 C 25 10 75 10 75 30 V 40" fill="none" stroke="url(#lockGrad)" strokeWidth="12" strokeLinecap="round" />
 <path d="M75 30 V 40" fill="none" stroke="url(#lockGrad)" strokeWidth="12" strokeLinecap="round" transform="rotate(-20 75 40)" />
 {/* Sparkles near open shackle */}
 <path d="M80 15 L90 5 M95 25 L105 20 M85 35 L95 40" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
 {/* Body */}
 <rect x="15" y="50" width="70" height="60" rx="12" fill="url(#lockGrad)" />
 {/* Keyhole */}
 <circle cx="50" cy="70" r="8" fill="#4C1D95" />
 <path d="M46 75 L54 75 L52 90 L48 90 Z" fill="#4C1D95" />
 </svg>
 </div>

 {/* Shield Icon Overlay (Bottom Left) */}
 <div className="absolute left-[0px] md:left-[10px] bottom-[15px] md:bottom-[20px] z-30 animate-float">
 <svg className="w-20 h-24 md:w-28 md:h-32 drop-shadow-[0_15px_25px_rgba(168,85,247,0.5)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGradP" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#C084FC" />
 <stop offset="100%" stopColor="#7C3AED" />
 </linearGradient>
 <linearGradient id="shieldHighlightP" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGradP)" stroke="#E9D5FF" strokeWidth="2" />
 <path d="M50 5 L50 115 C50 115 90 90 90 60 L90 20 Z" fill="url(#shieldHighlightP)" />
 {/* Exclamation Mark */}
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="75" r="5" fill="white" />
 </svg>
 </div>

 {/* Smartphone (Bottom Right) */}
 <div className="absolute right-[-10px] md:right-[0px] bottom-[10px] md:bottom-[15px] z-40 w-[70px] md:w-[90px] h-[120px] md:h-[160px] bg-[#1E293B] rounded-2xl md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center p-1 md:p-1.5 border border-slate-600 animate-float-delayed">
 <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-8 md:w-10 h-2 md:h-3 bg-[#1E293B] rounded-b-lg z-20"></div>
 <div className="w-full h-full bg-slate-50 rounded-[0.8rem] md:rounded-[1.2rem] relative overflow-hidden flex flex-col items-center pt-8 md:pt-12 px-2">
 {/* Email Icon */}
 <div className="w-12 h-8 md:w-16 md:h-10 bg-purple-50 rounded-md shadow-md flex items-center justify-center relative mb-4">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
 <polyline points="22,6 12,13 2,6" />
 </svg>
 {/* Red Alert Dot */}
 <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
 <span className="text-white text-[8px] md:text-[10px] font-bold">!</span>
 </div>
 </div>
 {/* Skeleton Text */}
 <div className="w-[80%] h-1.5 md:h-2 bg-slate-200 rounded-full mb-1.5 md:mb-2"></div>
 <div className="w-[60%] h-1.5 md:h-2 bg-slate-200 rounded-full mb-1.5 md:mb-2"></div>
 <div className="w-[90%] h-1.5 md:h-2 bg-slate-200 rounded-full"></div>
 </div>
 </div>

 </div>
 </div>
);

const IdentityTheftIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Mask Head */}
 <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8 2 5 5 5 9c0 2 1.5 3.5 1.5 5 0 2 1 3 3 3h5c2 0 3-1 3-3 0-1.5 1.5-3 1.5-5 0-4-3-7-7-7z" fill="currentColor" />
 <rect x="7" y="7" width="10" height="4" rx="2" fill="white" />
 <circle cx="10" cy="9" r="1" fill="#14B8A6" />
 <circle cx="14" cy="9" r="1" fill="#14B8A6" />
 </svg>
 {/* Fingerprint Overlay */}
 <div className="absolute bottom-[2px] right-[0px] md:bottom-[4px] md:right-[2px]">
 <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-600 bg-teal-50 rounded-full box-content border border-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
 <path d="M12 4a8 8 0 00-6.8 3.9" />
 <path d="M18.8 7.9A8 8 0 0112 20" />
 <path d="M9 9a3 3 0 016 0c0 3-3 3-3 6" />
 <path d="M12 11v4" />
 </svg>
 </div>
 </div>
);

const IdentityTheftIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-teal)" />
 <defs>
 <linearGradient id="bg-wave-teal" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#F0FDF4" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#D1FAE5" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #10B981 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Background Leaves */}
 <svg className="absolute right-[0px] md:right-[10px] bottom-[20px] md:bottom-[40px] w-20 h-20 md:w-32 md:h-32 opacity-70" viewBox="0 0 100 100">
 <path d="M50,90 C90,90 100,50 100,20 C60,20 50,50 50,90 Z" fill="#6EE7B7" />
 <path d="M50,90 C50,50 60,20 100,20 C100,50 90,90 50,90 Z" fill="#A7F3D0" />
 </svg>
 <svg className="absolute left-[10px] md:left-[20px] top-[40px] md:top-[60px] w-16 h-16 md:w-24 md:h-24 opacity-60" viewBox="0 0 100 100">
 <path d="M50,90 C10,90 0,50 0,20 C40,20 50,50 50,90 Z" fill="#6EE7B7" />
 </svg>

 {/* Hacker Silhouette (Behind ID Card) */}
 <div className="absolute top-[10px] md:top-[20px] left-1/2 -translate-x-1/2 z-10 w-[120px] md:w-[150px]">
 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
 <path d="M50 10 C30 10 25 35 25 50 C25 60 10 70 10 90 L90 90 C90 70 75 60 75 50 C75 35 70 10 50 10 Z" fill="#0F172A" />
 {/* Face area */}
 <path d="M35 45 C35 35 65 35 65 45 C65 60 35 60 35 45 Z" fill="#1E293B" />
 {/* Mask Eyes */}
 <rect x="38" y="42" width="24" height="6" rx="3" fill="white" />
 <circle cx="43" cy="45" r="2" fill="#0F172A" />
 <circle cx="57" cy="45" r="2" fill="#0F172A" />
 </svg>
 </div>

 {/* Identity Card (Center) */}
 <div className="absolute top-[60px] md:top-[75px] w-[200px] md:w-[280px] h-[120px] md:h-[160px] bg-white rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] border-2 border-teal-500 overflow-hidden z-20 flex flex-col">
 <div className="w-full h-8 md:h-12 bg-teal-600 flex items-center justify-center">
 <span className="text-white font-bold text-[10px] md:text-sm tracking-widest">IDENTITY CARD</span>
 </div>
 <div className="flex-1 p-3 md:p-4 flex gap-3 md:gap-4 items-center">
 {/* Photo area */}
 <div className="w-16 h-20 md:w-20 md:h-24 bg-teal-50 rounded-lg border border-teal-100 flex flex-col items-center justify-end overflow-hidden pb-0">
 <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-600 rounded-full mb-1"></div>
 <div className="w-14 h-10 md:w-16 md:h-12 bg-teal-600 rounded-t-xl"></div>
 </div>
 {/* Lines area */}
 <div className="flex-1 flex flex-col gap-2 md:gap-3">
 <div className="w-full h-2 md:h-3 bg-slate-200 rounded-full"></div>
 <div className="w-3/4 h-2 md:h-3 bg-slate-200 rounded-full"></div>
 <div className="w-1/2 h-2 md:h-3 bg-slate-200 rounded-full"></div>
 <div className="text-teal-700 font-black text-lg md:text-xl tracking-widest mt-1 md:mt-2">**** 5678</div>
 </div>
 </div>
 </div>

 {/* Open Lock (Top Left) */}
 <div className="absolute top-[40px] md:top-[50px] left-[20px] md:left-[35px] z-30 animate-float">
 <svg className="w-12 h-16 md:w-16 md:h-20 drop-shadow-[0_10px_15px_rgba(16,185,129,0.3)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="lockGradT" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#10B981" />
 <stop offset="100%" stopColor="#047857" />
 </linearGradient>
 </defs>
 <path d="M25 50 V 30 C 25 10 75 10 75 30 V 40" fill="none" stroke="url(#lockGradT)" strokeWidth="12" strokeLinecap="round" />
 <rect x="15" y="50" width="70" height="60" rx="12" fill="url(#lockGradT)" />
 <circle cx="50" cy="70" r="8" fill="#F0FDF4" />
 <path d="M46 75 L54 75 L52 90 L48 90 Z" fill="#F0FDF4" />
 </svg>
 </div>

 {/* Shield Icon (Bottom Left) */}
 <div className="absolute left-[0px] md:left-[10px] bottom-[5px] md:bottom-[10px] z-40 animate-float-delayed">
 <svg className="w-20 h-24 md:w-24 md:h-28 drop-shadow-[0_15px_25px_rgba(4,120,87,0.4)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGradT" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#34D399" />
 <stop offset="100%" stopColor="#059669" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGradT)" stroke="#D1FAE5" strokeWidth="2" />
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="75" r="5" fill="white" />
 </svg>
 </div>

 {/* Document and Magnifying Glass (Bottom Right) */}
 <div className="absolute right-[0px] md:right-[20px] bottom-[-10px] md:bottom-[0px] z-40 w-[60px] md:w-[80px] h-[75px] md:h-[100px] bg-white rounded-lg shadow-xl border border-slate-100 flex flex-col items-center p-2 transform rotate-6 animate-wiggle">
 <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full mb-2 flex items-center justify-center">
 <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
 </svg>
 </div>
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full mb-1"></div>
 <div className="w-3/4 h-1.5 md:h-2 bg-slate-200 rounded-full mb-1"></div>
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full"></div>
 </div>

 {/* Magnifying Glass */}
 <div className="absolute right-[-10px] md:right-[-5px] bottom-[-20px] md:bottom-[-10px] z-50 animate-swing">
 <svg className="w-14 h-14 md:w-16 md:h-16 drop-shadow-lg" viewBox="0 0 100 100">
 <circle cx="40" cy="40" r="25" fill="#F0FDF4" stroke="#0F172A" strokeWidth="6" />
 <circle cx="35" cy="35" r="10" fill="white" opacity="0.6" />
 <line x1="58" y1="58" x2="85" y2="85" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
 <line x1="58" y1="58" x2="85" y2="85" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
 </svg>
 </div>

 </div>
 </div>
);

const FinancialCrimeIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 <svg className="w-7 h-7 md:w-9 md:h-9" viewBox="0 0 24 24">
 <rect x="2" y="5" width="20" height="14" rx="2" fill="#FCD34D" />
 <rect x="2" y="8" width="20" height="3" fill="#334155" />
 <rect x="5" y="13" width="4" height="3" rx="0.5" fill="#94A3B8" />
 </svg>
 {/* Rupee Coin */}
 <div className="absolute left-[2px] bottom-[2px] w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-amber-100">
 <span className="text-[10px] font-bold text-amber-600 leading-none">₹</span>
 </div>
 {/* Lock Overlay */}
 <div className="absolute bottom-[-2px] right-[-4px] md:bottom-[0px] md:right-[-2px]">
 <svg className="w-4 h-4 md:w-5 md:h-5 text-amber-500 fill-amber-500 rounded-md bg-white border border-white shadow-sm box-content" viewBox="0 0 24 24">
 <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" fill="white" />
 <path fillRule="evenodd" d="M18 10V7a6 6 0 10-12 0v3a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-10-3a4 4 0 118 0v3H8V7z" clipRule="evenodd" />
 </svg>
 </div>
 </div>
);

const FinancialCrimeIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-amber)" />
 <defs>
 <linearGradient id="bg-wave-amber" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#FEF3C7" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Background Leaves */}
 <svg className="absolute left-[10px] md:left-[20px] bottom-[40px] md:bottom-[60px] w-20 h-20 md:w-32 md:h-32 opacity-70" viewBox="0 0 100 100">
 <path d="M50,90 C10,90 0,50 0,20 C40,20 50,50 50,90 Z" fill="#FCD34D" />
 <path d="M50,90 C50,50 60,20 100,20 C100,50 90,90 50,90 Z" fill="#FDE68A" />
 </svg>

 {/* Bank Building (Right Background) */}
 <div className="absolute right-[10px] md:right-[20px] top-[30px] md:top-[40px] w-[100px] md:w-[130px] z-10 animate-float-slow">
 <svg viewBox="0 0 100 100" className="w-full drop-shadow-md">
 {/* Roof */}
 <polygon points="50,10 10,40 90,40" fill="#F59E0B" />
 <polygon points="50,10 50,40 90,40" fill="#D97706" />
 {/* Rupee Circle */}
 <circle cx="50" cy="30" r="8" fill="white" />
 <text x="50" y="34" fontSize="10" fontWeight="bold" fill="#D97706" textAnchor="middle">₹</text>
 {/* Pillars */}
 <rect x="15" y="40" width="10" height="40" fill="#FBBF24" />
 <rect x="35" y="40" width="10" height="40" fill="#FBBF24" />
 <rect x="55" y="40" width="10" height="40" fill="#FBBF24" />
 <rect x="75" y="40" width="10" height="40" fill="#FBBF24" />
 {/* Base */}
 <rect x="5" y="80" width="90" height="10" fill="#F59E0B" />
 </svg>
 </div>

 {/* Dark Credit Card (Behind Smartphone) */}
 <div className="absolute right-[10px] md:right-[20px] bottom-[30px] md:bottom-[40px] w-[140px] md:w-[180px] h-[85px] md:h-[110px] bg-[#1E293B] rounded-xl shadow-xl z-20 border border-slate-700 overflow-hidden transform rotate-2 animate-float">
 <div className="w-full h-8 md:h-12 bg-[#0F172A] mb-2 md:mb-3"></div>
 <div className="px-3 md:px-4">
 <div className="w-8 h-6 md:w-10 md:h-8 bg-[#D4AF37] rounded-md mb-2 md:mb-3"></div>
 <div className="text-white font-mono text-[10px] md:text-sm tracking-[0.2em] opacity-80">1234 5678 9012 3456</div>
 </div>
 </div>

 {/* Smartphone Base (Center) */}
 <div className="absolute top-[10px] md:top-[15px] left-[30px] md:left-[60px] w-[110px] md:w-[140px] h-[190px] md:h-[250px] bg-[#334155] rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-slate-600 z-30">
 {/* Notch */}
 <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-10 md:w-14 h-3 md:h-4 bg-[#334155] rounded-b-xl z-20"></div>
 {/* Screen */}
 <div className="w-full h-full bg-slate-50 rounded-[1.2rem] md:rounded-[1.7rem] relative overflow-hidden flex flex-col items-center pt-8 md:pt-10 px-3 md:px-4 pb-4">
 {/* Large Yellow Shield */}
 <div className="w-16 h-20 md:w-20 md:h-24 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-full shadow-lg flex items-center justify-center mb-3">
 <span className="text-white text-3xl md:text-4xl font-black">!</span>
 </div>
 <div className="text-slate-800 font-bold text-sm md:text-lg">₹ 25,000</div>
 <div className="text-amber-600 text-[10px] md:text-xs font-semibold mb-3">Transferred</div>
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full mb-1.5"></div>
 <div className="w-3/4 h-1.5 md:h-2 bg-slate-200 rounded-full mb-auto"></div>
 {/* Arrow Button */}
 <div className="w-full h-6 md:h-8 bg-amber-500 rounded-md flex items-center justify-center text-white font-bold mt-2">→</div>
 </div>
 </div>

 {/* Warning Triangle (Bottom Left) */}
 <div className="absolute left-[0px] md:left-[10px] bottom-[10px] md:bottom-[15px] z-40 animate-float-delayed">
 <svg className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_10px_15px_rgba(245,158,11,0.4)]" viewBox="0 0 100 100">
 <defs>
 <linearGradient id="warnGradY" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#FBBF24" />
 <stop offset="100%" stopColor="#D97706" />
 </linearGradient>
 </defs>
 <path d="M50 10 L10 85 L90 85 Z" fill="url(#warnGradY)" stroke="white" strokeWidth="6" strokeLinejoin="round" />
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="72" r="5" fill="white" />
 </svg>
 </div>

 {/* Stack of Coins (Bottom Right) */}
 <div className="absolute right-[-10px] md:right-[0px] bottom-[0px] md:bottom-[0px] z-40 flex flex-col items-center animate-swing">
 <svg className="w-16 h-16 md:w-24 md:h-28 drop-shadow-xl" viewBox="0 0 100 120">
 {/* Coin 1 (Bottom) */}
 <ellipse cx="50" cy="90" rx="40" ry="15" fill="#D97706" />
 <rect x="10" y="80" width="80" height="10" fill="#F59E0B" />
 <ellipse cx="50" cy="80" rx="40" ry="15" fill="#FBBF24" />
 {/* Coin 2 */}
 <rect x="10" y="65" width="80" height="15" fill="#F59E0B" />
 <ellipse cx="50" cy="65" rx="40" ry="15" fill="#FCD34D" />
 {/* Coin 3 */}
 <rect x="10" y="50" width="80" height="15" fill="#F59E0B" />
 <ellipse cx="50" cy="50" rx="40" ry="15" fill="#FDE047" />
 {/* Front Coin Leaning */}
 <g transform="translate(15, 30) rotate(15)">
 <circle cx="40" cy="40" r="35" fill="#F59E0B" />
 <circle cx="40" cy="40" r="30" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
 <text x="40" y="52" fontSize="30" fontWeight="bold" fill="#D97706" textAnchor="middle">₹</text>
 </g>
 </svg>
 </div>

 </div>
 </div>
);

const MalwareIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Magnifying Glass with Bug */}
 <div className="relative">
 <svg className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="11" cy="11" r="8" fill="#EEF2FF" />
 <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="3" />
 </svg>
 <div className="absolute top-[3px] left-[3px] w-6 h-6 flex items-center justify-center">
 <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
 <path d="M19 8h-1.81a5.98 5.98 0 00-1.82-3.18l1.34-1.34a.996.996 0 10-1.41-1.41l-1.46 1.46A6.05 6.05 0 0012 3c-.63 0-1.25.1-1.84.29L8.7 1.83a.996.996 0 10-1.41 1.41l1.34 1.34C7.54 5.6 6.78 6.74 6.31 8H4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h1.16c-.05.32-.1.66-.1.98v.04c0 2.8 1.94 5.17 4.54 5.82v1.65c0 .83.67 1.5 1.5 1.5h1.8c.83 0 1.5-.67 1.5-1.5v-1.65c2.6-.65 4.54-3.02 4.54-5.82v-.04c0-.32-.05-.66-.1-.98h1.16c.83 0 1.5-.67 1.5-1.5S19.83 8 19 8zm-8 4h-2V10h2v2zm4 0h-2V10h2v2z" />
 </svg>
 </div>
 </div>
 </div>
);

const MalwareIllustration = () => (
 <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-indigo)" />
 <defs>
 <linearGradient id="bg-wave-indigo" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#E0E7FF" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366F1 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[200px] md:w-[380px] md:h-[300px] z-10 flex items-center justify-center mt-4 md:mt-0">

 {/* Dotted Connections */}
 <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 300">
 <path d="M200 150 L100 80 M200 150 L300 80 M200 150 L100 250 M200 150 L300 250" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
 <path d="M150 50 Q 100 100 120 180" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
 <path d="M250 50 Q 300 100 280 200" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
 </svg>

 {/* Laptop Base & Screen */}
 <div className="absolute bottom-[20px] md:bottom-[30px] w-[220px] md:w-[280px] h-[140px] md:h-[180px] z-10">
 {/* Screen Hardware */}
 <div className="absolute inset-0 bg-[#2D2A3D] rounded-xl shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-slate-700">
 <div className="w-full h-full bg-indigo-600 rounded-lg relative overflow-hidden flex flex-col items-center justify-center">
 {/* Skull and Crossbones */}
 <svg className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.14 2.97 5.25L7.5 15.5 8.91 16.91 10.45 15.37C10.95 15.68 11.47 15.86 12 15.93V18h-2v2h4v-2h-2v-2.07c.53-.07 1.05-.25 1.55-.56l1.54 1.54 1.41-1.41-1.47-1.47C16.8 12.14 18 10.21 18 8c0-3.31-2.69-6-6-6zM10.5 9c-.83 0-1.5-.67-1.5-1.5S9.67 6 10.5 6 12 6.67 12 7.5 11.33 9 10.5 9zm3 0C12.67 9 12 8.33 12 7.5S12.67 6 13.5 6 15 6.67 15 7.5 14.33 9 13.5 9zm-2.25 4c-.41 0-.75-.34-.75-.75S10.84 11.5 11.25 11.5c.41 0 .75.34.75.75s-.34.75-.75.75z" />
 </svg>
 <div className="w-[60%] h-1 md:h-1.5 bg-indigo-800 rounded-full mt-4">
 <div className="w-[70%] h-full bg-white rounded-full"></div>
 </div>
 </div>
 </div>
 {/* Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[10px] left-[-15px] md:left-[-25px] right-[-15px] md:right-[-25px] h-[10px] md:h-[14px] bg-[#E2E8F0] rounded-b-xl rounded-t-sm shadow-md flex justify-center">
 <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#CBD5E1] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Email Icon (Top Center) */}
 <div className="absolute top-[-20px] md:top-[0px] left-[50%] -translate-x-1/2 z-20 animate-float">
 <div className="relative w-[70px] md:w-[90px] h-[50px] md:h-[60px] bg-white rounded-lg shadow-lg border border-slate-100 flex items-center justify-center">
 <svg className="absolute inset-0 w-full h-full text-indigo-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
 <path d="M3 8l9 6 9-6" />
 <rect x="3" y="5" width="18" height="14" rx="2" />
 </svg>
 <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-500 z-10" viewBox="0 0 24 24" fill="currentColor">
 <path d="M19 8h-1.81a5.98 5.98 0 00-1.82-3.18l1.34-1.34a.996.996 0 10-1.41-1.41l-1.46 1.46A6.05 6.05 0 0012 3c-.63 0-1.25.1-1.84.29L8.7 1.83a.996.996 0 10-1.41 1.41l1.34 1.34C7.54 5.6 6.78 6.74 6.31 8H4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h1.16c-.05.32-.1.66-.1.98v.04c0 2.8 1.94 5.17 4.54 5.82v1.65c0 .83.67 1.5 1.5 1.5h1.8c.83 0 1.5-.67 1.5-1.5v-1.65c2.6-.65 4.54-3.02 4.54-5.82v-.04c0-.32-.05-.66-.1-.98h1.16c.83 0 1.5-.67 1.5-1.5S19.83 8 19 8zm-8 4h-2V10h2v2zm4 0h-2V10h2v2z" />
 </svg>
 {/* Red Alert Dot */}
 <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
 <span className="text-white text-[10px] font-bold">!</span>
 </div>
 </div>
 </div>

 {/* Download File (Left) */}
 <div className="absolute left-[0px] md:left-[0px] top-[40px] md:top-[60px] z-30 animate-float-delayed">
 <div className="w-[60px] md:w-[80px] h-[70px] md:h-[90px] bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-2">
 <div className="w-8 h-10 md:w-10 md:h-12 bg-indigo-500 rounded-md relative flex items-center justify-center mb-1">
 <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-indigo-300 rounded-bl-md"></div>
 </div>
 <span className="text-[8px] md:text-[10px] font-bold text-indigo-800 tracking-wider">DOWNLOAD</span>
 {/* Arrow down circle */}
 <div className="absolute -bottom-2 md:-bottom-3 w-6 h-6 md:w-8 md:h-8 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center shadow-md">
 <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 5v14M19 12l-7 7-7-7" />
 </svg>
 </div>
 </div>
 </div>

 {/* Warning Triangle (Bottom Left) */}
 <div className="absolute left-[20px] md:left-[30px] bottom-[0px] md:bottom-[0px] z-40 animate-swing">
 <svg className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_10px_15px_rgba(99,102,241,0.4)]" viewBox="0 0 100 100">
 <defs>
 <linearGradient id="warnGradI" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#818CF8" />
 <stop offset="100%" stopColor="#4F46E5" />
 </linearGradient>
 </defs>
 <path d="M50 10 L10 85 L90 85 Z" fill="url(#warnGradI)" stroke="white" strokeWidth="6" strokeLinejoin="round" />
 <rect x="46" y="35" width="8" height="25" rx="4" fill="white" />
 <circle cx="50" cy="72" r="5" fill="white" />
 </svg>
 </div>

 {/* Browser Window (Right) */}
 <div className="absolute right-[-10px] md:right-[0px] top-[40px] md:top-[50px] z-30 animate-float">
 <div className="w-[80px] md:w-[100px] h-[70px] md:h-[80px] bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
 <div className="w-full h-4 md:h-5 bg-slate-100 flex items-center px-2 gap-1 border-b border-slate-200">
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400"></div>
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400"></div>
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></div>
 </div>
 <div className="flex-1 flex flex-col items-center justify-center p-2">
 <svg className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <line x1="2" y1="12" x2="22" y2="12" />
 <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
 </svg>
 <span className="text-[10px] md:text-xs font-bold text-indigo-800">WWW</span>
 </div>
 {/* Mouse Cursor */}
 <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 z-40 transform -rotate-12">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-slate-700 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
 <path d="M4 2v18l5.5-5.5H18L4 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
 </svg>
 </div>
 </div>
 </div>

 {/* USB Drive (Bottom Right) */}
 <div className="absolute right-[20px] md:right-[30px] bottom-[0px] md:bottom-[-10px] z-40 transform rotate-12 animate-float-slow">
 <div className="w-[30px] md:w-[40px] h-[60px] md:h-[80px] rounded-lg shadow-xl border border-slate-100 flex flex-col items-center">
 {/* USB Connector */}
 <div className="w-[16px] md:w-[20px] h-[10px] md:h-[15px] bg-slate-300 border-2 border-b-0 border-slate-400 rounded-t-sm flex justify-center gap-1 pt-1">
 <div className="w-[2px] h-[4px] bg-slate-500"></div>
 <div className="w-[2px] h-[4px] bg-slate-500"></div>
 </div>
 {/* USB Body */}
 <div className="w-full flex-1 bg-indigo-600 rounded-md flex flex-col items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
 <svg className="w-4 h-4 md:w-6 md:h-6 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.14 2.97 5.25L7.5 15.5 8.91 16.91 10.45 15.37C10.95 15.68 11.47 15.86 12 15.93V18h-2v2h4v-2h-2v-2.07c.53-.07 1.05-.25 1.55-.56l1.54 1.54 1.41-1.41-1.47-1.47C16.8 12.14 18 10.21 18 8c0-3.31-2.69-6-6-6z" />
 </svg>
 </div>
 </div>
 </div>

 </div>
 </div>
);

const RansomwareIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Laptop Icon */}
 <svg className="w-8 h-8 md:w-10 md:h-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
 <line x1="2" y1="20" x2="22" y2="20" strokeWidth="3" />
 </svg>
 {/* Red Lock overlay in center */}
 <div className="absolute top-[3px] left-[5px] md:top-[5px] md:left-[7px] w-5 h-5 flex items-center justify-center bg-red-50 rounded-sm">
 <svg className="w-3 h-3 text-red-600" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18 10v-4c0-3.3-2.7-6-6-6s-6 2.7-6 6v4H4v12h16V10h-2zM10 6c0-1.1.9-2 2-2s2 .9 2 2v4h-4V6z" />
 </svg>
 </div>
 {/* Skull Circle overlay bottom right */}
 <div className="absolute bottom-[-2px] right-[-2px] md:bottom-[0px] md:right-[0px]">
 <div className="w-5 h-5 md:w-6 md:h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
 <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.14 2.97 5.25L7.5 15.5 8.91 16.91 10.45 15.37C10.95 15.68 11.47 15.86 12 15.93V18h-2v2h4v-2h-2v-2.07c.53-.07 1.05-.25 1.55-.56l1.54 1.54 1.41-1.41-1.47-1.47C16.8 12.14 18 10.21 18 8c0-3.31-2.69-6-6-6z" />
 </svg>
 </div>
 </div>
 </div>
);

const RansomwareIllustration = () => (
 <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
 {/* Background Waves & Dots */}
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-red)" />
 <defs>
 <linearGradient id="bg-wave-red" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FEF2F2" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#FEE2E2" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #EF4444 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 {/* 3D Composition Container */}
 <div className="relative w-[280px] h-[180px] md:w-[380px] md:h-[260px] z-10 flex items-center justify-center mt-2 md:mt-0">

 {/* Dotted World Map or Lines (Background) */}
 <svg className="absolute inset-0 w-full h-full z-0 opacity-20" viewBox="0 0 400 300">
 <path d="M50 150 Q 200 50 350 150 T 50 150" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" fill="none" />
 <path d="M100 250 Q 250 100 300 250" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" fill="none" />
 </svg>

 {/* Laptop Base & Screen */}
 <div className="absolute bottom-[20px] md:bottom-[30px] w-[240px] md:w-[320px] h-[150px] md:h-[200px] z-10">
 {/* Screen Hardware */}
 <div className="absolute inset-0 bg-[#2D2A3D] rounded-xl shadow-2xl flex items-center justify-center p-1.5 md:p-2 border border-slate-700">
 <div className="w-full h-full bg-red-700 rounded-lg relative overflow-hidden flex flex-col items-center justify-center px-2 py-4">
 {/* Red Screen Content */}
 <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
 {/* Matrix/World map abstract */}
 <circle cx="20" cy="30" r="1" fill="white" />
 <circle cx="50" cy="20" r="1" fill="white" />
 <circle cx="80" cy="40" r="1" fill="white" />
 <circle cx="30" cy="70" r="1" fill="white" />
 <circle cx="70" cy="80" r="1" fill="white" />
 </svg>

 <div className="w-8 h-10 md:w-12 md:h-14 bg-red-600 rounded-md border-2 border-white flex flex-col items-center justify-center mb-2 shadow-lg">
 <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white rounded-t-full border-b-0 absolute -top-4 md:-top-5"></div>
 <div className="w-2 h-3 md:w-3 md:h-4 bg-white rounded-full"></div>
 </div>

 <div className="text-white font-black text-[10px] md:text-sm tracking-widest text-center shadow-sm z-10">YOUR FILES ARE ENCRYPTED!</div>
 <div className="text-red-200 font-semibold text-[8px] md:text-xs mb-3 md:mb-4 z-10">Pay $ 1000 to restore access</div>

 {/* Timer */}
 <div className="flex gap-2 md:gap-3 text-white font-mono z-10">
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-black/40 px-1.5 py-0.5 rounded">23</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-red-200">HOURS</span>
 </div>
 <span className="text-sm md:text-xl font-bold">:</span>
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-black/40 px-1.5 py-0.5 rounded">59</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-red-200">MINUTES</span>
 </div>
 <span className="text-sm md:text-xl font-bold">:</span>
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-black/40 px-1.5 py-0.5 rounded">47</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-red-200">SECONDS</span>
 </div>
 </div>
 </div>
 </div>
 {/* Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[10px] left-[-15px] md:left-[-25px] right-[-15px] md:right-[-25px] h-[10px] md:h-[14px] bg-[#E2E8F0] rounded-b-xl rounded-t-sm shadow-md flex justify-center">
 <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#CBD5E1] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Speech Bubble (Top Right) */}
 <div className="absolute top-[-20px] md:top-[-10px] right-[10%] md:right-[15%] z-20 animate-swing">
 <div className="relative bg-red-600 text-white rounded-xl shadow-xl px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 border border-red-500">
 <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shrink-0">
 <span className="text-red-600 font-bold text-lg md:text-xl">!</span>
 </div>
 <div>
 <div className="font-bold text-[8px] md:text-[10px] leading-tight">RANSOMWARE<br />DETECTED</div>
 <div className="text-[6px] md:text-[8px] text-red-200 leading-tight">Immediate action required!</div>
 </div>
 {/* Speech bubble tail */}
 <div className="absolute -bottom-2 left-10 w-4 h-4 bg-red-600 transform rotate-45 border-r border-b border-red-500"></div>
 </div>
 </div>

 {/* Shield Icon (Bottom Left) */}
 <div className="absolute left-[0px] md:left-[10px] bottom-[15px] md:bottom-[20px] z-30 animate-float-delayed">
 <svg className="w-20 h-24 md:w-28 md:h-32 drop-shadow-[0_15px_25px_rgba(239,68,68,0.5)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGradR" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#F87171" />
 <stop offset="100%" stopColor="#DC2626" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGradR)" stroke="#FCA5A5" strokeWidth="2" />
 {/* White Checkmark */}
 <path d="M30 60 L45 75 L70 40" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </div>

 {/* Document with Lock (Right) */}
 <div className="absolute right-[-5px] md:right-[0px] top-[40px] md:top-[60px] z-20 animate-float">
 <div className="w-[60px] md:w-[80px] h-[80px] md:h-[100px] bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col items-center justify-center p-2 relative">
 <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600 mb-2" viewBox="0 0 24 24" fill="currentColor">
 <path d="M18 10v-4c0-3.3-2.7-6-6-6s-6 2.7-6 6v4H4v12h16V10h-2zM10 6c0-1.1.9-2 2-2s2 .9 2 2v4h-4V6z" />
 </svg>
 <div className="w-full h-1.5 md:h-2 bg-slate-200 rounded-full mb-1"></div>
 <div className="w-3/4 h-1.5 md:h-2 bg-slate-200 rounded-full"></div>
 {/* Red X Circle */}
 <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
 <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
 <line x1="18" y1="6" x2="6" y2="18"></line>
 <line x1="6" y1="6" x2="18" y2="18"></line>
 </svg>
 </div>
 </div>
 </div>

 {/* Money Stacks (Bottom Right) */}
 <div className="absolute right-[10px] md:right-[20px] bottom-[5px] md:bottom-[0px] z-30 animate-float-slow">
 <svg className="w-20 h-20 md:w-28 md:h-28 drop-shadow-xl" viewBox="0 0 100 100">
 {/* Stack 1 (Bottom) */}
 <rect x="20" y="70" width="60" height="15" rx="2" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
 <rect x="20" y="70" width="60" height="5" fill="#FFE4E6" />
 {/* Stack 2 */}
 <rect x="20" y="55" width="60" height="15" rx="2" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
 <rect x="20" y="55" width="60" height="5" fill="#FFE4E6" />
 <text x="50" y="67" fontSize="12" fontWeight="bold" fill="#E11D48" textAnchor="middle">$</text>
 {/* Stack 3 (Top) */}
 <rect x="20" y="40" width="60" height="15" rx="2" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="1" />
 <rect x="20" y="40" width="60" height="5" fill="#FFE4E6" />
 <text x="50" y="52" fontSize="12" fontWeight="bold" fill="#E11D48" textAnchor="middle">$</text>
 {/* Coins */}
 <ellipse cx="85" cy="85" rx="10" ry="3" fill="#E11D48" />
 <rect x="75" y="80" width="20" height="5" fill="#F43F5E" />
 <ellipse cx="85" cy="80" rx="10" ry="3" fill="#FDA4AF" />

 <rect x="75" y="75" width="20" height="5" fill="#F43F5E" />
 <ellipse cx="85" cy="75" rx="10" ry="3" fill="#FDA4AF" />
 </svg>
 </div>
 </div>


 </div>
);

const FakeWebsiteIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Browser Window */}
 <div className="w-10 h-8 bg-blue-500 rounded-md border-2 border-blue-500 flex flex-col overflow-hidden relative">
 <div className="h-2.5 bg-white/20 w-full flex items-center px-1 gap-0.5">
 <div className="w-1 h-1 bg-white rounded-full"></div>
 <div className="w-1 h-1 bg-white rounded-full"></div>
 <div className="w-1 h-1 bg-white rounded-full"></div>
 </div>
 <div className="flex-1 bg-[#EEF2FF] flex items-end justify-center pb-0">
 {/* Hacker Silhouette */}
 <svg className="w-6 h-6 text-indigo-900" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8 2 5 5 5 9c0 2 1.5 3.5 1.5 5 0 2 1 3 3 3h5c2 0 3-1 3-3 0-1.5 1.5-3 1.5-5 0-4-3-7-7-7z" fill="currentColor" />
 <rect x="7" y="7" width="10" height="4" rx="2" fill="white" />
 <circle cx="10" cy="9" r="1" fill="#312E81" />
 <circle cx="14" cy="9" r="1" fill="#312E81" />
 </svg>
 </div>
 </div>
 {/* Fishing Hook */}
 <svg className="absolute -top-1 right-2 w-6 h-10 text-blue-700 drop-shadow-sm" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 0v20c0 4.4 3.6 8 8 8s8-3.6 8-8v-4" transform="scale(0.8) translate(0, -2)" />
 <path d="M17 18l3-3 3 3" transform="scale(0.8) translate(0, -2)" />
 </svg>
 </div>
);

const FakeWebsiteIllustration = () => (
 <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-blue)" />
 <defs>
 <linearGradient id="bg-wave-blue" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#DBEAFE" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 </div>

 <div className="relative w-[280px] h-[180px] md:w-[400px] md:h-[260px] z-10 flex items-center justify-center mt-2 md:mt-0">
 {/* Laptop Base */}
 <div className="absolute bottom-[30px] md:bottom-[40px] w-[260px] md:w-[360px] h-[160px] md:h-[220px] z-10">
 <div className="absolute inset-0 bg-[#1E293B] rounded-xl shadow-2xl p-1.5 md:p-2 border border-slate-700">
 {/* Screen */}
 <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
 {/* Browser Top Bar */}
 <div className="w-full h-5 md:h-7 bg-blue-100 flex items-center px-2 gap-1 border-b border-blue-200">
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400"></div>
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400"></div>
 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"></div>
 {/* URL Bar */}
 <div className="ml-2 flex-1 h-3 md:h-4 bg-white rounded flex items-center px-1.5 gap-1.5 border border-slate-200">
 <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
 <path fillRule="evenodd" d="M18 10V7a6 6 0 10-12 0v3a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-10-3a4 4 0 118 0v3H8V7z" clipRule="evenodd" />
 </svg>
 <span className="text-[6px] md:text-[8px] font-medium text-slate-800">www.secure-bank.com</span>
 <div className="ml-auto w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center">
 <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
 </div>
 </div>
 </div>
 {/* Page Content */}
 <div className="flex-1 bg-slate-50 p-2 md:p-4 flex flex-col items-center">
 {/* FAKE WEBSITE banner */}
 <div className="w-full bg-red-500 rounded text-white py-1.5 md:py-2 px-2 flex items-center justify-center gap-2 mb-2 md:mb-3 shadow-sm">
 <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
 <span className="text-[8px] md:text-xs font-bold tracking-widest">FAKE WEBSITE</span>
 </div>
 <div className="w-full border-t border-slate-200 pt-2 flex flex-col gap-1.5">
 <div className="flex items-center gap-1 text-[7px] md:text-[9px] text-red-600 font-bold bg-red-50 p-1 md:p-1.5 rounded border border-red-100">
 <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" /></svg>
 www.secure-bank-login.com
 </div>
 <div className="w-full h-1 md:h-1.5 bg-slate-200 rounded-full mt-1 md:mt-2"></div>
 <div className="w-5/6 h-1 md:h-1.5 bg-slate-200 rounded-full"></div>
 <div className="w-2/3 h-1 md:h-1.5 bg-slate-200 rounded-full"></div>
 </div>
 </div>
 </div>
 </div>
 {/* Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[12px] left-[-10px] md:left-[-15px] right-[-10px] md:right-[-15px] h-[10px] md:h-[14px] bg-[#64748B] rounded-b-xl rounded-t-sm shadow-xl flex justify-center">
 <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#475569] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Top Speech Bubble */}
 <div className="absolute top-[-10px] md:top-[0px] left-[50%] md:left-[55%] z-20 animate-float">
 <div className="relative bg-white rounded-xl shadow-lg px-2 py-1.5 md:px-3 md:py-2 flex items-center gap-1.5 md:gap-2 border border-slate-100">
 <svg className="w-5 h-5 md:w-6 md:h-6 text-red-500 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="none" />
 <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v5h-2V7zm0 7h2v2h-2v-2z" />
 </svg>
 <div>
 <div className="text-[7px] md:text-[9px] font-bold text-slate-800 leading-tight">Looks Real.</div>
 <div className="text-[7px] md:text-[9px] font-bold text-slate-800 leading-tight">Acts Criminal.</div>
 </div>
 {/* Tail */}
 <div className="absolute -bottom-2 md:-bottom-2.5 left-6 w-3 h-3 md:w-4 md:h-4 bg-white transform rotate-45 border-r border-b border-slate-100"></div>
 </div>
 </div>

 {/* Left Big Shield */}
 <div className="absolute left-[10px] md:left-[20px] bottom-[20px] md:bottom-[30px] z-30 animate-float-delayed">
 <svg className="w-20 h-24 md:w-28 md:h-32 drop-shadow-[0_15px_25px_rgba(59,130,246,0.4)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGradB" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#60A5FA" />
 <stop offset="100%" stopColor="#2563EB" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGradB)" stroke="#93C5FD" strokeWidth="3" strokeLinejoin="round" />
 {/* Inner layer for 3D effect */}
 <path d="M50 15 L80 27 L80 60 C80 83 50 102 50 102 C50 102 20 83 20 60 L20 27 Z" fill="#3B82F6" />
 {/* White Lock */}
 <rect x="40" y="55" width="20" height="16" rx="3" fill="white" />
 <path d="M44 55 V 47 C 44 40 56 40 56 47 V 55" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
 <circle cx="50" cy="63" r="2" fill="#2563EB" />
 </svg>
 </div>

 {/* Right Circle: Check URL */}
 <div className="absolute right-[0px] md:right-[10px] top-[40px] md:top-[60px] z-20 animate-swing">
 <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-white rounded-full shadow-lg border border-slate-100 flex flex-col items-center justify-center">
 <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <line x1="2" y1="12" x2="22" y2="12" />
 <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
 </svg>
 <span className="text-[6px] md:text-[8px] font-bold text-slate-700 text-center leading-tight tracking-wider">CHECK URL<br />CAREFULLY</span>
 </div>
 </div>

 {/* Bottom Right Magnifying Glass */}
 <div className="absolute right-[15px] md:right-[30px] bottom-[10px] md:bottom-[15px] z-30 animate-float-slow">
 <div className="relative">
 <svg className="w-16 h-16 md:w-24 md:h-24 drop-shadow-xl" viewBox="0 0 100 100">
 {/* Handle */}
 <line x1="60" y1="60" x2="85" y2="85" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" />
 {/* Rim */}
 <circle cx="40" cy="40" r="28" fill="#F8FAFC" stroke="#334155" strokeWidth="8" />
 {/* Glass inside */}
 <circle cx="40" cy="40" r="24" fill="white" />
 <circle cx="35" cy="35" r="10" fill="white" opacity="0.5" />
 {/* Red Triangle Inside Glass */}
 <path d="M40 18 L18 55 L62 55 Z" fill="#EF4444" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" />
 <rect x="38" y="30" width="4" height="12" rx="2" fill="white" />
 <circle cx="40" cy="48" r="2.5" fill="white" />
 </svg>
 </div>
 </div>
 </div>


 </div>
);

const ExtortionIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Hacker with Laptop */}
 <div className="relative w-12 h-12 flex flex-col items-center justify-end">
 {/* Body/Hoodie */}
 <svg className="w-12 h-12 text-fuchsia-700" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8 2 5 5 5 9c0 2 1.5 3.5 1.5 5 0 2 1 3 3 3h5c2 0 3-1 3-3 0-1.5 1.5-3 1.5-5 0-4-3-7-7-7z" />
 </svg>
 {/* Mask */}
 <div className="absolute top-2 w-6 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-1">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 </div>
 {/* Small Laptop in front */}
 <div className="absolute -bottom-1 w-8 h-5 bg-slate-800 rounded-t-sm flex items-center justify-center border-t border-slate-600">
 <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.14 2.97 5.25L7.5 15.5 8.91 16.91 10.45 15.37C10.95 15.68 11.47 15.86 12 15.93V18h-2v2h4v-2h-2v-2.07c.53-.07 1.05-.25 1.55-.56l1.54 1.54 1.41-1.41-1.47-1.47C16.8 12.14 18 10.21 18 8c0-3.31-2.69-6-6-6z" />
 </svg>
 </div>
 </div>
 {/* $ Bubble */}
 <div className="absolute top-[2px] right-[2px] md:top-[4px] md:right-[4px]">
 <div className="w-5 h-5 md:w-6 md:h-6 bg-fuchsia-600 rounded-full flex items-center justify-center shadow-sm border-2 border-fuchsia-50">
 <span className="text-white text-[10px] md:text-xs font-bold">$</span>
 </div>
 </div>
 </div>
);

const ExtortionIllustration = () => (
 <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-fuchsia)" />
 <defs>
 <linearGradient id="bg-wave-fuchsia" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FDF4FF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#FAE8FF" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #C026D3 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
 </div>

 <div className="relative w-[280px] h-[180px] md:w-[380px] md:h-[260px] z-10 flex items-center justify-center mt-2 md:mt-0">
 {/* Background Dotted Lines */}
 <svg className="absolute inset-0 w-full h-full z-0 opacity-30" viewBox="0 0 400 300">
 <path d="M30 150 Q 100 50 300 150" stroke="#C026D3" strokeWidth="2" strokeDasharray="4 4" fill="none" />
 <path d="M100 250 Q 200 150 350 250" stroke="#C026D3" strokeWidth="2" strokeDasharray="4 4" fill="none" />
 </svg>

 {/* Laptop */}
 <div className="absolute bottom-[30px] md:bottom-[40px] w-[240px] md:w-[320px] h-[150px] md:h-[200px] z-10">
 <div className="absolute inset-0 bg-[#312E81] rounded-xl shadow-2xl p-1 md:p-1.5 border border-[#1E1B4B]">
 {/* Screen */}
 <div className="w-full h-full bg-slate-900 rounded-lg relative overflow-hidden flex flex-col items-center pt-3 md:pt-4">
 <div className="absolute inset-0 bg-fuchsia-900/20"></div>
 <div className="w-full px-4 md:px-6 flex items-start gap-3 z-10">
 {/* Big Warning Triangle */}
 <svg className="w-12 h-12 md:w-16 md:h-16 text-red-500 drop-shadow-lg shrink-0" viewBox="0 0 24 24" fill="currentColor">
 <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
 </svg>
 <div className="flex-1 mt-1">
 <h3 className="text-white font-black text-[10px] md:text-sm tracking-widest leading-tight">WE HAVE YOUR DATA!</h3>
 <p className="text-slate-300 text-[8px] md:text-[10px] leading-tight mt-1 md:mt-2">Pay $ 1,000 in Bitcoin<br />or we will leak it.</p>
 </div>
 </div>
 {/* Timer */}
 <div className="flex gap-2 md:gap-3 text-white font-mono z-10 mt-2 md:mt-4">
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-[#4C1D95]/40 border border-[#7C3AED]/30 px-2 py-0.5 rounded text-red-400">02</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-slate-400">HOURS</span>
 </div>
 <span className="text-sm md:text-xl font-bold text-slate-500">:</span>
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-[#4C1D95]/40 border border-[#7C3AED]/30 px-2 py-0.5 rounded text-red-400">59</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-slate-400">MINUTES</span>
 </div>
 <span className="text-sm md:text-xl font-bold text-slate-500">:</span>
 <div className="flex flex-col items-center">
 <span className="text-sm md:text-xl font-bold bg-[#4C1D95]/40 border border-[#7C3AED]/30 px-2 py-0.5 rounded text-red-400">47</span>
 <span className="text-[6px] md:text-[8px] mt-1 text-slate-400">SECONDS</span>
 </div>
 </div>
 {/* Pay Now Button */}
 <div className="w-[120px] md:w-[150px] h-6 md:h-8 bg-gradient-to-r from-red-600 to-red-500 rounded mt-3 md:mt-5 z-10 flex items-center justify-center shadow-lg border border-red-400/50">
 <span className="text-white text-[8px] md:text-[10px] font-black tracking-widest">PAY NOW</span>
 </div>
 </div>
 </div>
 {/* Keyboard Base */}
 <div className="absolute -bottom-[8px] md:-bottom-[12px] left-[-15px] md:left-[-25px] right-[-15px] md:right-[-25px] h-[10px] md:h-[14px] bg-[#64748B] rounded-b-xl rounded-t-sm shadow-xl flex justify-center">
 <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#475569] rounded-b-md mt-0.5"></div>
 </div>
 </div>

 {/* Top Right Threats Bubble */}
 <div className="absolute top-[0px] right-[-10px] md:right-[0px] z-20 animate-float">
 <div className="relative bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-xl shadow-lg p-2 md:p-3 flex items-center gap-2 border border-purple-500">
 <svg className="w-5 h-5 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
 </svg>
 <div>
 <div className="text-[6px] md:text-[7px] font-bold text-white leading-tight">THREATS</div>
 <div className="text-[6px] md:text-[7px] font-bold text-white leading-tight">INTIMIDATION</div>
 <div className="text-[6px] md:text-[7px] font-bold text-white leading-tight">PRESSURE</div>
 </div>
 {/* Tail */}
 <div className="absolute -bottom-1.5 left-4 w-3 h-3 md:w-4 md:h-4 bg-purple-700 transform rotate-45 border-r border-b border-purple-500"></div>
 </div>
 </div>

 {/* Middle Right Info Box */}
 <div className="absolute top-[60px] md:top-[85px] right-[-20px] md:right-[-10px] z-20 animate-float-delayed">
 <div className="bg-white rounded-lg shadow-lg p-2 md:p-3 flex items-center gap-2 border border-slate-100">
 <div className="w-5 h-6 md:w-6 md:h-7 bg-orange-400 rounded flex flex-col items-center justify-end pb-1 border border-orange-500 relative">
 <div className="absolute -top-1 w-3 h-3 md:w-4 md:h-4 border-2 border-orange-400 rounded-t-full border-b-0"></div>
 <div className="w-1 h-1.5 bg-white rounded-full"></div>
 </div>
 <div>
 <div className="text-[6px] md:text-[8px] font-bold text-slate-800 leading-tight">KEEP YOUR</div>
 <div className="text-[6px] md:text-[8px] font-bold text-slate-800 leading-tight">INFORMATION</div>
 <div className="text-[6px] md:text-[8px] font-bold text-slate-800 leading-tight">SAFE</div>
 </div>
 </div>
 </div>

 {/* Bottom Left Email */}
 <div className="absolute left-[0px] md:left-[10px] bottom-[30px] md:bottom-[50px] z-20 animate-float-slow">
 <div className="w-[60px] md:w-[80px] h-[40px] md:h-[50px] bg-[#E9D5FF] rounded-lg shadow-xl border border-[#D8B4FE] relative flex items-center justify-center">
 <svg className="absolute inset-0 w-full h-full text-[#D8B4FE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
 <path d="M3 8l9 6 9-6" />
 <rect x="3" y="5" width="18" height="14" rx="2" />
 </svg>
 {/* Exclamation Circle */}
 <div className="absolute -top-3 -right-2 md:-top-4 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-fuchsia-600 rounded-full border-2 border-white flex items-center justify-center shadow-md">
 <span className="text-white text-xs md:text-sm font-bold">!</span>
 </div>
 </div>
 </div>

 {/* Bottom Right Shield */}
 <div className="absolute right-[20px] md:right-[40px] bottom-[10px] md:bottom-[20px] z-30 animate-swing">
 <svg className="w-20 h-24 md:w-28 md:h-32 drop-shadow-[0_15px_25px_rgba(225,29,72,0.4)]" viewBox="0 0 100 120">
 <defs>
 <linearGradient id="shieldGradF" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FDA4AF" />
 <stop offset="100%" stopColor="#E11D48" />
 </linearGradient>
 </defs>
 <path d="M50 5 L90 20 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 L10 20 Z" fill="url(#shieldGradF)" stroke="#FFE4E6" strokeWidth="2" strokeLinejoin="round" />
 {/* Inner layer for 3D effect */}
 <path d="M50 15 L80 27 L80 60 C80 83 50 102 50 102 C50 102 20 83 20 60 L20 27 Z" fill="#BE123C" />
 {/* White Lock */}
 <rect x="40" y="55" width="20" height="16" rx="3" fill="white" />
 <path d="M44 55 V 47 C 44 40 56 40 56 47 V 55" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
 <circle cx="50" cy="63" r="2" fill="#BE123C" />
 </svg>
 </div>
 </div>


 </div>
);

const ModusOperandiIcon = () => (
 <div className="relative w-full h-full flex items-center justify-center">
 <div className="w-10 h-10 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center border-2 border-cyan-400 relative">
 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
 </svg>
 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center border-2 border-cyan-100">
 <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="11" cy="11" r="8"></circle>
 <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
 </svg>
 </div>
 </div>
 </div>
);

const ModusOperandiIllustration = () => (
 <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
 <div className="absolute inset-0 overflow-hidden md:rounded-r-[2rem]">
 <svg className="absolute right-0 top-0 h-full w-full object-cover opacity-80" viewBox="0 0 400 400" preserveAspectRatio="none">
 <path d="M-50,400 C150,400 150,150 250,100 C320,60 400,50 400,0 L400,400 Z" fill="url(#bg-wave-cyan)" />
 <defs>
 <linearGradient id="bg-wave-cyan" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#ECFEFF" stopOpacity="0.8" />
 <stop offset="100%" stopColor="#CFFAFE" stopOpacity="1" />
 </linearGradient>
 </defs>
 </svg>
 {/* Grid Pattern Background */}
 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#06B6D4 1px, transparent 1px), linear-gradient(90deg, #06B6D4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
 </div>

 <div className="relative w-[280px] h-[180px] md:w-[400px] md:h-[260px] z-10 flex items-center justify-center mt-2 md:mt-0">
 {/* Main Holographic Screen */}
 <div className="absolute bottom-[30px] md:bottom-[40px] w-[260px] md:w-[360px] h-[160px] md:h-[220px] z-10">
 <div className="absolute inset-0 bg-[#083344] rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] p-1.5 md:p-2 border border-cyan-800/50 backdrop-blur-sm">
 <div className="w-full h-full bg-[#164E63]/40 rounded-lg relative overflow-hidden flex flex-col border border-cyan-700/50">
 {/* Header */}
 <div className="w-full h-6 md:h-8 border-b border-cyan-700/50 flex items-center px-3 justify-between bg-[#083344]/80">
 <div className="flex gap-1.5">
 <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
 <div className="w-2 h-2 rounded-full bg-cyan-400/50"></div>
 </div>
 <span className="text-[8px] md:text-[10px] text-cyan-300 font-mono tracking-widest font-bold">THREAT_INTEL_SYSTEM</span>
 </div>
 {/* Flowchart Content */}
 <div className="flex-1 p-2 md:p-4 flex flex-col justify-center items-center relative">
 {/* Radar Grid Graphic in BG */}
 <svg className="absolute inset-0 w-full h-full opacity-10 animate-spin-slow" viewBox="0 0 100 100">
 <circle cx="50" cy="50" r="40" stroke="#22D3EE" strokeWidth="1" fill="none" />
 <circle cx="50" cy="50" r="25" stroke="#22D3EE" strokeWidth="1" fill="none" />
 <circle cx="50" cy="50" r="10" stroke="#22D3EE" strokeWidth="1" fill="none" />
 <line x1="10" y1="50" x2="90" y2="50" stroke="#22D3EE" strokeWidth="1" />
 <line x1="50" y1="10" x2="50" y2="90" stroke="#22D3EE" strokeWidth="1" />
 </svg>

 <div className="flex items-center justify-between w-full px-2 md:px-4 z-10">
 {/* Step 1: Recon */}
 <div className="flex flex-col items-center">
 <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg border-2 border-cyan-500 bg-cyan-900/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
 <svg className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
 </div>
 <span className="text-[6px] md:text-[8px] text-cyan-200 mt-1.5 font-bold tracking-widest">1. RECON</span>
 </div>
 {/* Arrow */}
 <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 mx-2 relative">
 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-400 transform rotate-45"></div>
 </div>
 {/* Step 2: Exploit */}
 <div className="flex flex-col items-center">
 <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg border-2 border-red-500 bg-red-900/30 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
 <svg className="w-4 h-4 md:w-6 md:h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
 </div>
 <span className="text-[6px] md:text-[8px] text-red-300 mt-1.5 font-bold tracking-widest">2. EXPLOIT</span>
 </div>
 {/* Arrow */}
 <div className="flex-1 h-[2px] bg-gradient-to-r from-red-500/20 via-cyan-400 to-cyan-500/20 mx-2 relative">
 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-400 transform rotate-45"></div>
 </div>
 {/* Step 3: Exfiltrate */}
 <div className="flex flex-col items-center">
 <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg border-2 border-emerald-500 bg-emerald-900/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
 <svg className="w-4 h-4 md:w-6 md:h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
 </div>
 <span className="text-[6px] md:text-[8px] text-emerald-300 mt-1.5 font-bold tracking-widest">3. EXFILTRATE</span>
 </div>
 </div>

 <div className="w-full bg-cyan-950/50 rounded mt-3 md:mt-4 p-1 md:p-2 border border-cyan-800/30">
 <div className="flex justify-between text-[5px] md:text-[7px] text-cyan-400 font-mono mb-1">
 <span>SYSTEM_STATUS</span>
 <span className="text-red-400 animate-pulse">BREACH_DETECTED</span>
 </div>
 <div className="w-full h-1 md:h-1.5 bg-slate-800 rounded overflow-hidden">
 <div className="w-[75%] h-full bg-gradient-to-r from-cyan-500 to-red-500"></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 {/* Stand */}
 <div className="absolute -bottom-[6px] md:-bottom-[10px] left-1/2 -translate-x-1/2 w-16 md:w-24 h-[6px] md:h-[10px] bg-cyan-900 rounded-b-xl shadow-xl border border-cyan-800/50"></div>
 <div className="absolute -bottom-[12px] md:-bottom-[18px] left-1/2 -translate-x-1/2 w-24 md:w-36 h-[6px] md:h-[8px] bg-[#164E63] rounded shadow-2xl"></div>
 </div>

 {/* Top Left Floating Magnifier */}
 <div className="absolute top-[0px] left-[10px] md:left-[20px] z-20 animate-float">
 <div className="relative bg-white rounded-xl shadow-lg p-2 md:p-3 flex items-center gap-2 border border-slate-100">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <circle cx="11" cy="11" r="8" />
 <line x1="21" y1="21" x2="16.65" y2="16.65" />
 </svg>
 <div>
 <div className="text-[6px] md:text-[8px] font-bold text-slate-800 leading-tight uppercase">Analyze</div>
 <div className="text-[6px] md:text-[8px] font-bold text-slate-800 leading-tight uppercase">Patterns</div>
 </div>
 </div>
 </div>

 {/* Top Right Floating Folder */}
 <div className="absolute top-[20px] md:top-[30px] right-[-10px] md:right-[0px] z-20 animate-float-delayed">
 <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg p-2 flex flex-col items-center border border-amber-300">
 <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
 <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
 </svg>
 <div className="mt-1 bg-red-600 px-1 rounded">
 <span className="text-[5px] md:text-[6px] font-black text-white tracking-widest">TOP SECRET</span>
 </div>
 </div>
 </div>

 {/* Bottom Right Fingerprint */}
 <div className="absolute right-[10px] md:right-[30px] bottom-[20px] md:bottom-[40px] z-30">
 <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-white rounded-full shadow-xl flex items-center justify-center border border-cyan-100 relative overflow-hidden animate-pulse-glow">
 <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping opacity-75"></div>
 <svg className="w-8 h-8 md:w-10 md:h-10 text-cyan-600 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
 <path d="M12 2a10 10 0 0 0-6.88 2.77" />
 <path d="M4.28 9.5A10 10 0 0 0 12 22a10 10 0 0 0 7.72-12.5" />
 <path d="M20 12v.5" />
 <path d="M12 6a6 6 0 0 0-4.74 2.3" />
 <path d="M7 14v.5" />
 <path d="M17 12a6 6 0 0 0-5-5.91" />
 <path d="M12 10a2 2 0 0 0-1.41.59" />
 <path d="M12 14a2 2 0 0 0 1.41-.59" />
 </svg>
 </div>
 </div>
 </div>


 </div>
);

const CarouselIllustration = ({ id }) => {
 switch (id) {
 case 1: return <PhishingIllustration />;
 case 2: return <SocialEngIllustration />;
 case 3: return <AccountTakeoverIllustration />;
 case 4: return <IdentityTheftIllustration />;
 case 5: return <FinancialCrimeIllustration />;
 case 6: return <MalwareIllustration />;
 case 7: return <RansomwareIllustration />;
 case 8: return <FakeWebsiteIllustration />;
 case 9: return <ExtortionIllustration />;
 case 10: return <ModusOperandiIllustration />;
 default: return (
 <div className="w-full h-full flex flex-col items-center justify-center opacity-40 bg-slate-50 md:rounded-r-[2rem]">
 <ShieldAlert className="w-16 h-16 text-slate-400 mb-4" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">Illustration for<br />Card {id} Pending</p>
 </div>
 );
 }
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */

export default function CyberCrimeAwarenessSection() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [showDetails, setShowDetails] = useState(false);
 const lastScrollTime = useRef(0);

 // Auto-scroll functionality
 useEffect(() => {
 if (showDetails) return;
 const timer = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % cardsData.length);
 }, 3500);
 return () => clearInterval(timer);
 }, [currentIndex, showDetails]);

 // Keyboard navigation
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (showDetails) return;
 if (e.key === "ArrowRight") {
 setCurrentIndex((prev) => (prev + 1) % cardsData.length);
 setShowDetails(false);
 } else if (e.key === "ArrowLeft") {
 setCurrentIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
 setShowDetails(false);
 }
 };
 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [showDetails]);

 // Mouse wheel / trackpad scroll handler
 const handleWheel = (e) => {
 if (showDetails) return;
 
 // Determine if the scroll is primarily horizontal or vertical
 const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
 
 // Only intercept horizontal wheel scrolls (like trackpad swipes)
 // Ignore vertical scrolls to allow smooth native page scrolling
 if (isHorizontal) {
 if (Math.abs(e.deltaX) > 15) {
 const now = Date.now();
 if (now - lastScrollTime.current > 500) {
 lastScrollTime.current = now;
 if (e.deltaX > 0) {
 setCurrentIndex((prev) => (prev + 1) % cardsData.length);
 } else {
 setCurrentIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
 }
 setShowDetails(false);
 }
 }
 }
 };

 // Drag function to handle swipe
 const handleDragEnd = (event, info) => {
 if (showDetails) return; // Don't allow swipe while reading details
 const swipeThreshold = 30;
 if (info.offset.x < -swipeThreshold) {
 setCurrentIndex((prev) => (prev + 1) % cardsData.length);
 setShowDetails(false);
 } else if (info.offset.x > swipeThreshold) {
 setCurrentIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
 setShowDetails(false);
 }
 };

 const handleCardClick = (index, card) => {
 if (index !== currentIndex) {
 setCurrentIndex(index);
 setShowDetails(false);
 }
 };

 const getCardStyles = (index) => {
 const offset = index - currentIndex;
 const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
 const shift = isMobile ? 80 : 380;

 let normalizedOffset = offset;
 if (offset > cardsData.length / 2) normalizedOffset -= cardsData.length;
 if (offset < -cardsData.length / 2) normalizedOffset += cardsData.length;

 // If details are showing, slide non-active cards behind the main card and fade them out
 if (showDetails && normalizedOffset !== 0) {
 return {
 x: normalizedOffset > 0 ? 50 : -50,
 scale: 0.8,
 zIndex: 1,
 opacity: 0,
 rotateY: 0
 };
 }

 // Mobile tight stack
 if (isMobile) {
 if (normalizedOffset === 0) return { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 };
 else if (normalizedOffset === 1) return { x: shift, scale: 0.9, zIndex: 5, opacity: 0.5, rotateY: -10 };
 else if (normalizedOffset === -1) return { x: -shift, scale: 0.9, zIndex: 5, opacity: 0.5, rotateY: 10 };
 else return { x: normalizedOffset > 0 ? shift * 1.5 : -shift * 1.5, scale: 0.8, zIndex: 1, opacity: 0, rotateY: 0 };
 }

 // Desktop wide stack
 if (normalizedOffset === 0) {
 return { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 };
 } else if (normalizedOffset === 1) {
 return { x: shift, scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: -15 };
 } else if (normalizedOffset === -1) {
 return { x: -shift, scale: 0.85, zIndex: 5, opacity: 0.6, rotateY: 15 };
 } else if (normalizedOffset > 1) {
 return { x: shift * 1.5, scale: 0.7, zIndex: 1, opacity: 0, rotateY: -30 };
 } else {
 return { x: -shift * 1.5, scale: 0.7, zIndex: 1, opacity: 0, rotateY: 30 };
 }
 };

 return (
 <div className="relative w-full min-h-screen bg-[#F4F7FC] flex flex-col items-center justify-center overflow-hidden font-sans py-4 md:py-2">

 {/* Embedded CSS Animations */}
 <style>{`
 @keyframes float {
 0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-8px); }
 }
 @keyframes swing {
 0%, 100% { transform: rotate(-3deg); }
 50% { transform: rotate(3deg); }
 }
 @keyframes blink {
 0%, 100% { opacity: 1; }
 50% { opacity: 0.3; }
 }
 @keyframes pulseGlow {
 0%, 100% { transform: scale(1); opacity: 0.8; }
 50% { transform: scale(1.05); opacity: 1; }
 }
 @keyframes wiggle {
 0%, 100% { transform: rotate(-5deg); }
 50% { transform: rotate(5deg); }
 }
 @keyframes spin-slow {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }

 .animate-float {
 animation: float 4s ease-in-out infinite;
 }
 .animate-float-delayed {
 animation: float 4s ease-in-out 2s infinite;
 }
 .animate-float-slow {
 animation: float 6s ease-in-out infinite;
 }
 .animate-float-fast {
 animation: float 3s ease-in-out infinite;
 }
 .animate-swing {
 animation: swing 4s ease-in-out infinite;
 }
 .animate-blink {
 animation: blink 1.5s ease-in-out infinite;
 }
 .animate-pulse-glow {
 animation: pulseGlow 3s ease-in-out infinite;
 }
 .animate-wiggle {
 animation: wiggle 2s ease-in-out infinite;
 }
 .animate-spin-slow {
 animation: spin-slow 8s linear infinite;
 }
 `}</style>

 {/* Standard Header */}
 <div className="w-full max-w-5xl mx-auto px-4 z-20 mb-8 mt-6 flex justify-center flex-col items-center gap-2">
  <div className="flex items-center justify-center gap-4 w-full">
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
  <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
  CYBERCRIME & ONLINE CRIMINAL ACTIVITY AWARENESS
  </h2>
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
  </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed mt-0">
    Discover insights and real-world examples to better understand cyber threats.
  </p>
 </div>

 {/* Carousel Container */}
 <div onWheel={handleWheel} className="relative w-full max-w-7xl h-[440px] md:h-[500px] perspective-1000 touch-pan-y">
 <AnimatePresence initial={false}>
 {cardsData.map((card, index) => {
 let offset = index - currentIndex;
 if (offset > cardsData.length / 2) offset -= cardsData.length;
 if (offset < -cardsData.length / 2) offset += cardsData.length;

 const isVisible = Math.abs(offset) <= 2;
 if (!isVisible) return null;

 const isActive = index === currentIndex;
 const isShowingDetails = isActive && showDetails;
 const Icon = card.icon;

 // Dynamic Theme mapped by ID
 const theme = card.id === 10 ? {
 iconBg: "bg-cyan-50 border-cyan-100",
 textPrimary: "text-cyan-500",
 gradientLine: "from-cyan-400 to-cyan-500",
 buttonGrad: "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-[0_8px_20px_-6px_rgba(6,182,212,0.5)]",
 rightBg: "bg-cyan-50/40",
 iconComp: <ModusOperandiIcon />
 } : card.id === 9 ? {
 iconBg: "bg-fuchsia-50 border-fuchsia-100",
 textPrimary: "text-fuchsia-600",
 gradientLine: "from-fuchsia-500 to-fuchsia-600",
 buttonGrad: "from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700 shadow-[0_8px_20px_-6px_rgba(192,38,211,0.5)]",
 rightBg: "bg-fuchsia-50/40",
 iconComp: <ExtortionIcon />
 } : card.id === 8 ? {
 iconBg: "bg-blue-50 border-blue-100",
 textPrimary: "text-blue-500",
 gradientLine: "from-blue-500 to-blue-600",
 buttonGrad: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]",
 rightBg: "bg-blue-50/40",
 iconComp: <FakeWebsiteIcon />
 } : card.id === 7 ? {
 iconBg: "bg-red-50 border-red-100",
 textPrimary: "text-red-500",
 gradientLine: "from-red-500 to-red-600",
 buttonGrad: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-[0_8px_20px_-6px_rgba(239,68,68,0.5)]",
 rightBg: "bg-red-50/40",
 iconComp: <RansomwareIcon />
 } : card.id === 6 ? {
 iconBg: "bg-indigo-50 border-indigo-100",
 textPrimary: "text-indigo-500",
 gradientLine: "from-indigo-500 to-indigo-600",
 buttonGrad: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)]",
 rightBg: "bg-indigo-50/40",
 iconComp: <MalwareIcon />
 } : card.id === 5 ? {
 iconBg: "bg-amber-50 border-amber-100",
 textPrimary: "text-amber-500",
 gradientLine: "from-amber-400 to-amber-500",
 buttonGrad: "from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.5)]",
 rightBg: "bg-amber-50/40",
 iconComp: <FinancialCrimeIcon />
 } : card.id === 4 ? {
 iconBg: "bg-teal-50 border-teal-100",
 textPrimary: "text-teal-500",
 gradientLine: "from-teal-400 to-emerald-500",
 buttonGrad: "from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]",
 rightBg: "bg-teal-50/30",
 iconComp: <IdentityTheftIcon />
 } : card.id === 3 ? {
 iconBg: "bg-purple-50 border-purple-100",
 textPrimary: "text-purple-600",
 gradientLine: "from-purple-500 to-violet-500",
 buttonGrad: "from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.5)]",
 rightBg: "bg-purple-50/40",
 iconComp: <AccountTakeoverIcon />
 } : card.id === 2 ? {
 iconBg: "bg-orange-50 border-orange-100",
 textPrimary: "text-orange-500",
 gradientLine: "from-orange-400 to-orange-500",
 buttonGrad: "from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)]",
 rightBg: "bg-orange-50/30",
 iconComp: <SocialEngIcon />
 } : {
 iconBg: "bg-[#F0F4FF] border-white",
 textPrimary: "text-blue-600",
 gradientLine: "from-blue-500 to-indigo-400",
 buttonGrad: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)]",
 rightBg: "bg-blue-50/30",
 iconComp: card.id === 1 ? <PhishingIcon /> : <Icon className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
 };

 return (
 <motion.div
 key={card.id}
 onClick={() => handleCardClick(index, card)}
 drag={!showDetails ? "x" : false}
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.7}
 onDragEnd={handleDragEnd}
 initial={false}
 animate={getCardStyles(index)}
 transition={{ type: "spring", stiffness: 200, damping: 25 }}
 className={`absolute top-0 left-0 right-0 mx-auto w-[calc(100vw-40px)] max-w-[360px] md:max-w-none md:w-[700px] lg:w-[850px] h-[440px] md:h-[500px] rounded-[2rem] bg-white overflow-hidden transition-colors ${isActive ? "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100" : "shadow-lg border border-slate-200/50 cursor-pointer active:cursor-grabbing"
 }`}
 >
 <div className="flex flex-col md:flex-row w-full h-full relative">
 {/* Right Background & Illustration (Top on Mobile) */}
 <div className={`relative md:absolute right-0 top-0 w-full md:w-[55%] ${isShowingDetails ? 'hidden md:flex' : 'flex'} h-[45%] md:h-full ${theme.rightBg} md:bg-transparent overflow-hidden rounded-t-[2rem] md:rounded-t-none md:rounded-r-[2rem] z-10 flex items-center justify-center border-b md:border-b-0 border-slate-100`}>
 <CarouselIllustration id={card.id} />
 </div>

 {/* Content Left (Bottom on Mobile) */}
 <motion.div 
 layout 
 className={`relative z-20 w-full md:w-[50%] ${isShowingDetails ? 'h-full' : 'h-[55%]'} md:h-full p-6 md:p-8 flex flex-col bg-white md:bg-transparent rounded-b-[2rem] md:rounded-none transition-all duration-300 ${
 isShowingDetails ? 'justify-start pt-6 md:pt-8' : 'justify-center'
 }`}
 >

 {/* Close button for details */}
 <AnimatePresence>
 {isShowingDetails && (
 <motion.button
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}
 className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-30"
 >
 <X size={20} />
 </motion.button>
 )}
 </AnimatePresence>

 <motion.div layout className="flex flex-col shrink-0">
 <motion.div layout className={`flex items-center gap-3.5 ${isShowingDetails ? 'mb-2.5 pr-10 md:pr-16' : 'mb-3 md:mb-4'}`}>
 {/* Icon */}
 <motion.div 
 layout 
 className={`rounded-2xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,1)] border shrink-0 transition-all duration-300 ${
 isShowingDetails ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-16 md:h-16'
 } ${theme.iconBg}`}
 >
 {theme.iconComp}
 </motion.div>

 {/* Title */}
 <motion.h2 layout className={`font-black text-[#0B1536] leading-[1.2] tracking-tight pb-0.5 ${isShowingDetails ? 'text-lg md:text-2xl' : 'text-2xl md:text-3xl lg:text-[2.5rem]'}`}>
 {card.title}
 </motion.h2>
 </motion.div>

 <motion.div layout className={`w-12 md:w-16 h-1.5 bg-gradient-to-r ${theme.gradientLine} rounded-full shrink-0 ${isShowingDetails ? 'mb-2 md:mb-3' : 'mb-5 md:mb-6'}`} />
 </motion.div>

 <AnimatePresence mode="wait">
 {!isShowingDetails ? (
 <motion.div
 key="explore-btn"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 10 }}
 transition={{ duration: 0.2 }}
 >
 <button
 onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
 className={`bg-gradient-to-r ${theme.buttonGrad} text-white px-6 md:px-8 py-3 rounded-xl text-sm font-semibold flex items-center justify-center md:justify-start gap-2 w-full md:w-max transition-all active:scale-95 shrink-0`}
 >
 Explore Details <span className="text-[10px]">→</span>
 </button>
 </motion.div>
 ) : (
 <motion.div
 key="details-content"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3 }}
 className="flex-1 min-h-0 pr-2 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar"
 >
 <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
 <h3 className={`text-[10px] md:text-xs font-bold ${theme.textPrimary} mb-3 uppercase tracking-widest flex items-center gap-1.5`}>
 <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
 Detailed Analysis
 </h3>
 <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-medium text-justify">
 {card.content}
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 </motion.div>
 </div>
 </motion.div>
 );
 })}
 </AnimatePresence>
 </div>

 {/* Shared Pagination */}
 <SharedPagination 
 totalItems={cardsData.length}
 currentIndex={currentIndex}
 onPageChange={(index) => {
 setCurrentIndex(index);
 setShowDetails(false);
 }}
 onPrev={() => {
 setCurrentIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
 setShowDetails(false);
 }}
 onNext={() => {
 setCurrentIndex((prev) => (prev + 1) % cardsData.length);
 setShowDetails(false);
 }}
 />

 </div>
 );
}

