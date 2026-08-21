import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SharedPagination from "../components/SharedPagination";
import { cardsData } from "../data/homepage/cyberScamBroadcastingData";

const chunkArray = (arr, size) =>
 Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
 arr.slice(i * size, i * size + size)
 );

/* ─── THEMATIC SVG ILLUSTRATIONS ─────────────────────────────────────────── */

const IllustrationBell = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="bellGlow" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 </defs>
 <circle cx="80" cy="80" r="55" fill="url(#bellGlow)" />
 <circle cx="80" cy="80" r="50" stroke={accent} strokeWidth="0.75" strokeDasharray="4 4" opacity="0.18" />
 <circle cx="80" cy="80" r="35" stroke={accent} strokeWidth="1" opacity="0.15" />
 
 {/* Swinging Bell Group */}
 <g>
 <animateTransform 
 attributeName="transform" 
 type="rotate" 
 values="-4 80 35; 4 80 35; -4 80 35" 
 dur="2.5s" 
 repeatCount="indefinite" 
 />
 <path d="M80 35 C68 35 60 45 60 55 L60 72 L50 80 L110 80 L100 72 L100 55 C100 45 92 35 80 35 Z" stroke={accent} strokeWidth="1.5" opacity="0.4" />
 <path d="M80 35 C73 35 68 40 68 48 L68 70 M92 48 L92 70" stroke={accent} strokeWidth="0.75" opacity="0.25" />
 <path d="M72 80 C72 85 76 89 80 89 C84 89 88 85 88 80" stroke={accent} strokeWidth="1.5" opacity="0.45" />
 </g>

 <line x1="80" y1="20" x2="80" y2="120" stroke={accent} strokeWidth="0.5" strokeDasharray="1 5" opacity="0.3" />
 <line x1="30" y1="80" x2="130" y2="80" stroke={accent} strokeWidth="0.5" strokeDasharray="1 5" opacity="0.3" />
 <circle cx="110" cy="45" r="6" fill={accent} opacity="0.7" />
 <circle cx="110" cy="45" r="12" stroke={accent} strokeWidth="1" opacity="0.3">
 <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
 <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
 </circle>
 </svg>
);

const IllustrationPulse = ({ accent }) => (
 <svg viewBox="0 0 140 100" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 <filter id="pulseDotGlow" x="-50%" y="-50%" width="200%" height="200%">
 <feGaussianBlur stdDeviation="1.5" result="blur" />
 <feMerge>
 <feMergeNode in="blur" />
 <feMergeNode in="SourceGraphic" />
 </feMerge>
 </filter>
 </defs>
 <rect x="10" y="10" width="120" height="80" rx="4" stroke={accent} strokeWidth="0.75" opacity="0.12" />
 <path d="M10 30 H130 M10 50 H130 M10 70 H130 M30 10 V90 M50 10 V90 M70 10 V90 M90 10 V90 M110 10 V90" stroke={accent} strokeWidth="0.5" opacity="0.06" />
 <circle cx="70" cy="50" r="40" fill="url(#pulseGlow)" />
 
 {/* Heartbeat Pulse Line */}
 <path d="M10 50 H45 L50 25 L55 75 L60 45 L65 55 L70 50 H85 L90 15 L95 85 L100 40 L105 60 L110 50 H130" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
 
 {/* Traveling Laser Dot on Heartbeat Path */}
 <circle r="3" fill={accent} opacity="0.9" filter="url(#pulseDotGlow)">
 <animateMotion 
 path="M10 50 H45 L50 25 L55 75 L60 45 L65 55 L70 50 H85 L90 15 L95 85 L100 40 L105 60 L110 50 H130" 
 dur="4s" 
 repeatCount="indefinite" 
 />
 </circle>

 <circle cx="50" cy="25" r="2.5" fill={accent} opacity="0.8" />
 <circle cx="55" cy="75" r="2.5" fill={accent} opacity="0.8" />
 <circle cx="90" cy="15" r="2.5" fill={accent} opacity="0.8" />
 <circle cx="95" cy="85" r="2.5" fill={accent} opacity="0.8" />
 <rect x="18" y="18" width="20" height="4" rx="1" fill={accent} opacity="0.25" />
 <circle cx="118" cy="20" r="2" fill={accent} opacity="0.6">
 <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
 </circle>
 </svg>
);

const IllustrationChart = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </linearGradient>
 <filter id="chartDotGlow" x="-50%" y="-50%" width="200%" height="200%">
 <feGaussianBlur stdDeviation="1.5" result="blur" />
 <feMerge>
 <feMergeNode in="blur" />
 <feMergeNode in="SourceGraphic" />
 </feMerge>
 </filter>
 </defs>
 <path d="M20 110 H120 M20 90 H120 M20 70 H120 M20 50 H120 M20 30 H120" stroke={accent} strokeWidth="0.5" strokeDasharray="1 4" opacity="0.15" />
 <line x1="20" y1="20" x2="20" y2="110" stroke={accent} strokeWidth="1" opacity="0.2" />
 <line x1="20" y1="110" x2="120" y2="110" stroke={accent} strokeWidth="1" opacity="0.2" />
 
 {/* Animated Area Fill Chart */}
 <path d="M20 95 L40 85 L60 55 L80 65 L100 35 L120 45 V110 H20 Z" fill="url(#chartGrad)" />
 
 {/* Animated Dashed Flow Line */}
 <path d="M20 95 L40 85 L60 55 L80 65 L100 35 L120 45" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" strokeDasharray="6 3">
 <animate attributeName="strokeDashoffset" values="0;36" dur="3s" repeatCount="indefinite" />
 </path>
 
 {/* Traveling Dot on Trend Line */}
 <circle r="3.5" fill={accent} opacity="0.95" filter="url(#chartDotGlow)">
 <animateMotion 
 path="M20 95 L40 85 L60 55 L80 65 L100 35 L120 45" 
 dur="3s" 
 repeatCount="indefinite" 
 />
 </circle>

 <circle cx="60" cy="55" r="3" fill={accent} opacity="0.8" />
 <circle cx="100" cy="35" r="3.5" fill={accent} opacity="0.9" />
 <circle cx="100" cy="35" r="8" stroke={accent} strokeWidth="0.75" opacity="0.3">
 <animate attributeName="r" values="3.5;10;3.5" dur="2.5s" repeatCount="indefinite" />
 </circle>
 <rect x="105" y="15" width="12" height="6" rx="1" stroke={accent} strokeWidth="0.75" opacity="0.3" />
 <path d="M109 18 H113" stroke={accent} strokeWidth="0.75" opacity="0.4" />
 </svg>
);

const IllustrationSiren = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="sirenGlow" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
 <stop offset="60%" stopColor={accent} stopOpacity="0.08" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 </defs>
 <circle cx="70" cy="70" r="50" fill="url(#sirenGlow)" />
 <circle cx="70" cy="70" r="45" stroke={accent} strokeWidth="0.75" opacity="0.15" />
 
 {/* Fast Concentric Siren Alert Wave */}
 <circle cx="70" cy="70" r="32" stroke={accent} strokeWidth="0.75" opacity="0">
 <animate attributeName="r" values="32;52;32" dur="2.2s" repeatCount="indefinite" />
 <animate attributeName="opacity" values="0.45;0;0.45" dur="2.2s" repeatCount="indefinite" />
 </circle>

 <circle cx="70" cy="70" r="32" stroke={accent} strokeWidth="1.25" strokeDasharray="6 3" opacity="0.25">
 <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="4s" repeatCount="indefinite" />
 </circle>
 <path d="M70 70 L40 40 M70 70 L100 40 M70 70 L70 25" stroke={accent} strokeWidth="1.25" opacity="0.35" strokeDasharray="3 1" />
 <path d="M52 82 C52 70 60 62 70 62 C80 62 88 70 88 82 H52 Z" fill={accent} opacity="0.35" />
 <rect x="44" y="85" width="52" height="8" rx="2" fill={accent} opacity="0.5" />
 <rect x="48" y="95" width="44" height="4" rx="1" fill={accent} opacity="0.25" />
 
 {/* Bright Blinking Warning Node */}
 <circle cx="70" cy="50" r="4.5" fill={accent} opacity="0.85">
 <animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite" />
 <animate attributeName="r" values="4.5;7.5;4.5" dur="0.6s" repeatCount="indefinite" />
 </circle>
 </svg>
);

const IllustrationMap = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="mapGlow" cx="60%" cy="60%" r="40%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 </defs>
 
 {/* Asynchronously fading regional targets */}
 <circle cx="35" cy="50" r="1.5" fill={accent}>
 <animate attributeName="opacity" values="0.1;0.7;0.1" dur="2s" repeatCount="indefinite" />
 </circle>
 <circle cx="50" cy="45" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="65" cy="40" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="80" cy="45" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="95" cy="50" r="1.5" fill={accent}>
 <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.4s" repeatCount="indefinite" />
 </circle>
 <circle cx="110" cy="55" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="30" cy="70" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="45" cy="65" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="60" cy="60" r="2" fill={accent} opacity="0.3" />
 <circle cx="75" cy="65" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="90" cy="70" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="105" cy="75" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="40" cy="85" r="1.5" fill={accent}>
 <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1.7s" repeatCount="indefinite" />
 </circle>
 <circle cx="55" cy="80" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="70" cy="75" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="85" cy="80" r="1.5" fill={accent} opacity="0.15" />
 <circle cx="100" cy="85" r="1.5" fill={accent}>
 <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.1s" repeatCount="indefinite" />
 </circle>
 
 <circle cx="75" cy="70" r="35" fill="url(#mapGlow)" />
 <circle cx="75" cy="70" r="25" stroke={accent} strokeWidth="0.75" opacity="0.2" />
 
 {/* Concentric expanding map ping wave */}
 <circle cx="75" cy="70" r="4" stroke={accent} strokeWidth="1" opacity="0.8">
 <animate attributeName="r" values="4;26;4" dur="2.5s" repeatCount="indefinite" />
 <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
 </circle>
 
 <circle cx="75" cy="70" r="4" fill={accent} opacity="0.8" />
 <path d="M75 35 V105 M40 70 H110" stroke={accent} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
 <line x1="75" y1="70" x2="100" y2="50" stroke={accent} strokeWidth="1.25" opacity="0.5">
 <animateTransform attributeName="transform" type="rotate" from="0 75 70" to="360 75 70" dur="6s" repeatCount="indefinite" />
 </line>
 </svg>
);

const IllustrationCoins = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <linearGradient id="coinGrad" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
 <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
 </linearGradient>
 </defs>
 <path d="M20 90 L60 70 L120 90 L80 110 Z" stroke={accent} strokeWidth="0.5" opacity="0.15" />
 <path d="M40 85 L80 105 M60 80 L100 100 M50 75 L70 95 M90 75 L70 95" stroke={accent} strokeWidth="0.5" opacity="0.1" />
 
 {/* Animated dollar coin stack */}
 <g transform="translate(45, 65)">
 <ellipse cx="20" cy="30" rx="18" ry="6" fill="url(#coinGrad)" stroke={accent} strokeWidth="1" opacity="0.5" />
 <path d="M2 30 V38 C2 41 10 44 20 44 C30 44 38 41 38 38 V30" stroke={accent} strokeWidth="1" opacity="0.4" fill="url(#coinGrad)" />
 <ellipse cx="20" cy="22" rx="18" ry="6" fill="url(#coinGrad)" stroke={accent} strokeWidth="1" opacity="0.6" />
 <path d="M2 22 V30 C2 33 10 36 20 36 C30 36 38 33 38 30 V22" stroke={accent} strokeWidth="1" opacity="0.5" fill="none" />
 
 {/* Floating Dollar Text Sign */}
 <text x="16" y="27" fontSize="11" fill="white" fontWeight="bold" opacity="0.8" fontFamily="sans-serif">
 <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="2.5s" repeatCount="indefinite" />
 $
 </text>
 </g>
 
 <g transform="translate(75, 78)">
 <ellipse cx="15" cy="20" rx="14" ry="5" fill="url(#coinGrad)" stroke={accent} strokeWidth="0.75" opacity="0.4" />
 <path d="M1 20 V26 C1 28 7 31 15 31 C23 31 29 28 29 26 V20" stroke={accent} strokeWidth="0.75" opacity="0.3" fill="url(#coinGrad)" />
 <ellipse cx="15" cy="14" rx="14" ry="5" fill="url(#coinGrad)" stroke={accent} strokeWidth="0.75" opacity="0.5" />
 <path d="M1 14 V20 C1 16 7 19 15 19 C23 19 29 16 29 20 V14" stroke={accent} strokeWidth="0.75" opacity="0.4" fill="none" />
 </g>
 
 {/* Flowing Transaction Line */}
 <path d="M30 75 Q60 50 85 58 T120 35" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4">
 <animate attributeName="strokeDashoffset" values="0;40" dur="3s" repeatCount="indefinite" />
 </path>
 
 {/* Glowing node traveling along financial flow */}
 <circle r="2.5" fill={accent} opacity="0.85">
 <animateMotion 
 path="M30 75 Q60 50 85 58 T120 35" 
 dur="3s" 
 repeatCount="indefinite" 
 />
 </circle>
 
 <path d="M120 35 L110 35 M120 35 L120 45" stroke={accent} strokeWidth="1.5" opacity="0.6" />
 <circle cx="85" cy="58" r="3" fill={accent} opacity="0.7" />
 </svg>
);

const IllustrationFish = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="fishGlow" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 </defs>
 <circle cx="70" cy="70" r="45" fill="url(#fishGlow)" />
 <polygon points="70,30 105,45 105,80 70,105 35,80 35,45" stroke={accent} strokeWidth="1" opacity="0.25" />
 <polygon points="70,36 98,49 98,76 70,98 42,76 42,49" stroke={accent} strokeWidth="1.5" opacity="0.4" />
 
 {/* Bobbing Phishing Hook Group */}
 <g>
 <animateTransform attributeName="transform" type="translate" values="0 -3; 0 3; 0 -3" dur="2s" repeatCount="indefinite" />
 <path d="M85 20 Q105 50 80 85 T55 90 Q40 85 45 70 T65 75" stroke={accent} strokeWidth="1.75" strokeLinecap="round" opacity="0.7" />
 <circle cx="85" cy="20" r="4.5" fill={accent} opacity="0.8" />
 </g>
 
 {/* Vertically scanning threat line */}
 <line x1="40" y1="35" x2="100" y2="35" stroke={accent} strokeWidth="1.25" opacity="0.4">
 <animate attributeName="y1" values="35;95;35" dur="3s" repeatCount="indefinite" />
 <animate attributeName="y2" values="35;95;35" dur="3s" repeatCount="indefinite" />
 <animate attributeName="opacity" values="0.1;0.6;0.1" dur="3s" repeatCount="indefinite" />
 </line>

 <rect x="62" y="60" width="16" height="12" rx="1.5" fill={accent} opacity="0.3" stroke={accent} strokeWidth="0.75" />
 <path d="M66 60 V56 C66 52 74 52 74 56 V60" stroke={accent} strokeWidth="0.75" opacity="0.45" />
 <circle cx="80" cy="85" r="8" stroke={accent} strokeWidth="0.75" strokeDasharray="2 2" opacity="0.5" />
 <circle cx="80" cy="85" r="2" fill={accent} opacity="0.8" />
 </svg>
);

const IllustrationPhone = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <rect x="45" y="25" width="50" height="90" rx="8" stroke={accent} strokeWidth="1.5" opacity="0.35" />
 <rect x="49" y="32" width="42" height="68" rx="3" stroke={accent} strokeWidth="0.75" opacity="0.15" fill={accent} fillOpacity="0.04" />
 <line x1="62" y1="28" x2="78" y2="28" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
 <circle cx="70" cy="107" r="3.5" stroke={accent} strokeWidth="1" opacity="0.4" />
 
 {/* Sequentially ringing sound waves */}
 <path d="M40 55 Q35 62 35 70 T40 85" stroke={accent} strokeWidth="2.25" strokeLinecap="round" opacity="0.5">
 <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1.5s" repeatCount="indefinite" begin="0s" />
 </path>
 <path d="M35 50 Q28 60 28 70 T35 90" stroke={accent} strokeWidth="1.75" strokeLinecap="round" opacity="0.35">
 <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1.5s" repeatCount="indefinite" begin="0.25s" />
 </path>
 <path d="M30 45 Q22 55 22 70 T30 95" stroke={accent} strokeWidth="1.25" strokeLinecap="round" opacity="0.2">
 <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
 </path>
 
 {/* Pulsating alert button */}
 <g>
 <animateTransform attributeName="transform" type="scale" values="1; 1.08; 1" dur="1.5s" repeatCount="indefinite" transformOrigin="70 55" />
 <circle cx="70" cy="55" r="14" stroke={accent} strokeWidth="1" strokeDasharray="3 1" opacity="0.3" />
 <circle cx="70" cy="55" r="10" fill={accent} opacity="0.25" />
 <path d="M66 51 L74 59 M74 51 L66 59" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
 </g>
 
 <rect x="105" y="40" width="10" height="5" rx="1" fill={accent} opacity="0.2" />
 <circle cx="110" cy="55" r="1.5" fill={accent} opacity="0.4" />
 </svg>
);

const IllustrationMessage = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <radialGradient id="msgGlow" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
 <stop offset="100%" stopColor={accent} stopOpacity="0" />
 </radialGradient>
 </defs>
 <circle cx="70" cy="70" r="45" fill="url(#msgGlow)" />
 
 {/* Floating Bubble 1 */}
 <g>
 <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
 <rect x="25" y="35" width="80" height="52" rx="8" stroke={accent} strokeWidth="1.25" opacity="0.35" fill="none" />
 <path d="M35 87 L30 98 L46 87" stroke={accent} strokeWidth="1.25" opacity="0.35" fill="none" />
 <rect x="35" y="47" width="60" height="4" rx="1" fill={accent} opacity="0.2" />
 <rect x="35" y="57" width="48" height="4" rx="1" fill={accent} opacity="0.2" />
 <rect x="35" y="67" width="30" height="4" rx="1" fill={accent} opacity="0.3" />
 </g>
 
 {/* Out of phase Floating Bubble 2 */}
 <g>
 <animateTransform attributeName="transform" type="translate" values="0 2; 0 -2; 0 2" dur="2.5s" repeatCount="indefinite" />
 <rect x="75" y="70" width="45" height="30" rx="5" stroke={accent} strokeWidth="1" opacity="0.5" fill="none" />
 <path d="M82 100 L80 106 L90 100" stroke={accent} strokeWidth="1" opacity="0.5" fill="none" />
 
 {/* Blinking Alert Light */}
 <circle cx="97" cy="85" r="6" fill={accent} opacity="0.75">
 <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
 </circle>
 
 <line x1="97" y1="82" x2="97" y2="86" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
 <circle cx="97" cy="89" r="0.75" fill="white" />
 </g>
 </svg>
);

const IllustrationWeb = ({ accent }) => (
 <svg viewBox="0 0 140 140" className="absolute bottom-0 right-0 w-40 h-40 md:w-48 md:h-48 pointer-events-none select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
 <rect x="25" y="30" width="90" height="75" rx="6" stroke={accent} strokeWidth="1.25" opacity="0.3" fill="none" />
 <path d="M25 45 H115" stroke={accent} strokeWidth="1" opacity="0.25" />
 <circle cx="33" cy="37" r="2" fill={accent} opacity="0.4" />
 <circle cx="40" cy="37" r="2" fill={accent} opacity="0.4" />
 <circle cx="47" cy="37" r="2" fill={accent} opacity="0.4" />
 <rect x="58" y="33" width="48" height="8" rx="2" stroke={accent} strokeWidth="0.75" opacity="0.25" />
 <line x1="62" y1="37" x2="80" y2="37" stroke={accent} strokeWidth="0.5" opacity="0.3" />
 
 {/* Loading address bar progress */}
 <rect x="60" y="35" width="0" height="4" rx="1" fill={accent} opacity="0.4">
 <animate attributeName="width" values="0;44;0" dur="4s" repeatCount="indefinite" />
 </rect>

 {/* Rotating warning badge */}
 <g>
 <animateTransform attributeName="transform" type="rotate" values="0 70 72; 8 70 72; -8 70 72; 0 70 72" dur="5s" repeatCount="indefinite" />
 <circle cx="70" cy="72" r="20" stroke={accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
 <circle cx="70" cy="72" r="14" fill={accent} opacity="0.25" />
 <path d="M64 78 L76 66" stroke="white" strokeWidth="1.75" strokeLinecap="round" opacity="0.85" />
 <path d="M65 67 C62 70 62 74 65 77" stroke="white" strokeWidth="1.25" strokeLinecap="round" opacity="0.85" fill="none" />
 <path d="M75 77 C78 74 78 70 75 67" stroke="white" strokeWidth="1.25" strokeLinecap="round" opacity="0.85" fill="none" />
 </g>
 </svg>
);

/* ─── CARD THEME CONFIG ───────────────────────────────────────────────────── */
const CARD_THEMES = [
 { id: 1, gradient: 'linear-gradient(135deg,#0a1628 0%,#1d4ed8 100%)', accent: '#60a5fa', border: 'rgba(96,165,250,0.22)', btnBg: 'linear-gradient(90deg,#1d4ed8,#3b82f6)', badge: 'NEW ALERTS', btn: 'View Details', Illo: IllustrationBell },
 { id: 2, gradient: 'linear-gradient(135deg,#042014 0%,#166534 100%)', accent: '#4ade80', border: 'rgba(74,222,128,0.22)', btnBg: 'linear-gradient(90deg,#15803d,#22c55e)', badge: 'ACTIVE ALERTS', btn: 'View Details', Illo: IllustrationPulse },
 { id: 3, gradient: 'linear-gradient(135deg,#150a3a 0%,#4c1d95 100%)', accent: '#c084fc', border: 'rgba(192,132,252,0.22)', btnBg: 'linear-gradient(90deg,#7c3aed,#a855f7)', badge: 'TRENDING ALERTS', btn: 'View Details', Illo: IllustrationChart },
 { id: 4, gradient: 'linear-gradient(135deg,#280000 0%,#991b1b 100%)', accent: '#f87171', border: 'rgba(248,113,113,0.22)', btnBg: 'linear-gradient(90deg,#b91c1c,#ef4444)', badge: 'URGENT WARNINGS', btn: 'View Details', Illo: IllustrationSiren },
 { id: 5, gradient: 'linear-gradient(135deg,#1c0a00 0%,#92400e 100%)', accent: '#fbbf24', border: 'rgba(251,191,36,0.22)', btnBg: 'linear-gradient(90deg,#d97706,#f59e0b)', badge: 'REGIONAL ALERTS', btn: 'View Details', Illo: IllustrationMap },
 { id: 6, gradient: 'linear-gradient(135deg,#012118 0%,#065f46 100%)', accent: '#34d399', border: 'rgba(52,211,153,0.22)', btnBg: 'linear-gradient(90deg,#059669,#10b981)', badge: 'FINANCIAL ALERTS', btn: 'View Details', Illo: IllustrationCoins },
 { id: 7, gradient: 'linear-gradient(135deg,#2d0024 0%,#9d174d 100%)', accent: '#f472b6', border: 'rgba(244,114,182,0.22)', btnBg: 'linear-gradient(90deg,#be185d,#ec4899)', badge: 'PHISHING ALERTS', btn: 'View Details', Illo: IllustrationFish },
 { id: 8, gradient: 'linear-gradient(135deg,#150c2e 0%,#5b21b6 100%)', accent: '#a78bfa', border: 'rgba(167,139,250,0.22)', btnBg: 'linear-gradient(90deg,#6d28d9,#7c3aed)', badge: 'FAKE CALL ALERTS', btn: 'View Details', Illo: IllustrationPhone },
 { id: 9, gradient: 'linear-gradient(135deg,#0a1a2e 0%,#0369a1 100%)', accent: '#38bdf8', border: 'rgba(56,189,248,0.22)', btnBg: 'linear-gradient(90deg,#0369a1,#0ea5e9)', badge: 'MESSAGE ALERTS', btn: 'View Details', Illo: IllustrationMessage },
 { id: 10, gradient: 'linear-gradient(135deg,#0f172a 0%,#334155 100%)', accent: '#94a3b8', border: 'rgba(148,163,184,0.22)', btnBg: 'linear-gradient(90deg,#475569,#64748b)', badge: 'WEBSITE ALERTS', btn: 'View Details', Illo: IllustrationWeb },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function ScamBroadcastingCarousel() {
 const [[page, direction], setPage] = useState([0, 0]);
 const [expandedId, setExpandedId] = useState(null);
 const [isHovered, setIsHovered] = useState(false);
 const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

 // Dynamic resize listener for real-time responsiveness
 useEffect(() => {
 const handleResize = () => {
 setWindowWidth(window.innerWidth);
 };
 window.addEventListener("resize", handleResize);
 return () => window.removeEventListener("resize", handleResize);
 }, []);

 const isMobile = windowWidth < 768;
 const cardsPerPage = isMobile ? 1 : 2;
 const pages = chunkArray(cardsData, cardsPerPage);
 const totalPages = pages.length;
 const activeIndex = ((page % totalPages) + totalPages) % totalPages;

 // Reset pagination cleanly on screen size changes
 useEffect(() => {
 setPage([0, 0]);
 setExpandedId(null);
 }, [cardsPerPage]);

 const collapsedH = isMobile ? 340 : 406;
 const expandedH = "auto";

 const paginate = (dir) => {
 setExpandedId(null);
 setPage(([p]) => [p + dir, dir]);
 };

 /* Auto-scroll */
 useEffect(() => {
 if (expandedId !== null || isHovered) return;
 const t = setInterval(() => paginate(1), 4000);
 return () => clearInterval(t);
 }, [page, expandedId, isHovered]);

 const handleDragEnd = (_, { offset, velocity }) => {
 if (expandedId !== null) return;
 const swipe = Math.abs(offset.x) * velocity.x;
 if (swipe < -10000 || offset.x < -50) paginate(1);
 else if (swipe > 10000 || offset.x > 50) paginate(-1);
 };

 return (
 <div className="relative w-full bg-white flex flex-col items-center justify-start pt-16 md:pt-24 pb-12 px-4 font-sans">

 {/* Page ambient decoration */}
 <div className="absolute inset-0 pointer-events-none" style={{
 backgroundImage: [
 'radial-gradient(ellipse at 15% 50%,rgba(59,130,246,0.05) 0%,transparent 50%)',
 'radial-gradient(ellipse at 85% 50%,rgba(168,85,247,0.05) 0%,transparent 50%)',
 ].join(','),
 }} />

 {/* App Header */}
 <div className="w-full max-w-5xl mx-auto px-4 z-20 mb-8 flex flex-col items-center gap-2">
 <div className="flex items-center justify-center gap-4 w-full">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
 CYBER SCAM BROADCASTING
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
 <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
 Stay updated with real-time broadcasts on emerging cyber scams and frauds.
 </p>
 </div>

 {/* ── Carousel ───────────────────────────────────────────────── */}
 <div
 className="relative w-full max-w-5xl flex justify-center items-start transition-all duration-300 ease-in-out"
 style={{ minHeight: expandedId !== null ? undefined : collapsedH + 24 }}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 >
 <AnimatePresence initial={false} custom={direction} mode="wait">
 <motion.div
 key={page}
 custom={direction}
 variants={{ enter: {}, center: {}, exit: {} }}
 initial="enter"
 animate="center"
 exit="exit"
 drag={expandedId === null ? 'x' : false}
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.4}
 onDragEnd={handleDragEnd}
 className="flex gap-6 md:gap-8 px-4 justify-center w-full items-start"
 style={{ cursor: expandedId ? 'default' : 'grab' }}
 >
 {pages[activeIndex].map((card, index) => {
 const theme = CARD_THEMES.find(t => t.id === card.id) || CARD_THEMES[0];
 const isExpanded = expandedId === card.id;
 const { Illo, accent, gradient, border, btnBg, badge, btn } = theme;
 const CardIcon = card.icon;

 return (
 /* 🔥 Split & Drop Animation Handled Here 🔥 */
 <motion.div
 key={card.id}
 custom={direction}
 variants={{
 enter: (d) => {
 const xOff = isMobile ? (d < 0 ? -140 : 140) : (index === 0 ? -140 : 140);
 const yOff = isMobile ? -160 : (d < 0 ? 160 : -160);
 return { opacity: 0, x: xOff, y: yOff, scale: 0.85, height: collapsedH };
 },
 center: {
 opacity: 1, x: 0, y: 0, scale: 1, height: isExpanded ? expandedH : collapsedH
 },
 exit: (d) => {
 const xOff = isMobile ? (d < 0 ? 140 : -140) : (index === 0 ? -140 : 140);
 const yOff = isMobile ? 160 : (d < 0 ? -160 : 160);
 return { opacity: 0, x: xOff, y: yOff, scale: 0.85, height: collapsedH };
 }
 }}
 transition={{ 
  default: { type: 'spring', stiffness: 90, damping: 20, mass: 1 },
  height: { type: 'tween', ease: 'easeInOut', duration: 0.35 }
 }}
 onClick={() => { if (!isExpanded) setExpandedId(card.id); }}
 className="relative flex-shrink-0 rounded-[22px] overflow-hidden flex flex-col"
 style={{
 width: isMobile ? 272 : 318,
 background: gradient,
 border: `1px solid ${border}`,
 boxShadow: isExpanded
 ? `0 20px 60px ${accent}28, 0 0 0 1px ${accent}18`
 : '0 8px 36px rgba(0,0,0,0.20)',
 cursor: isExpanded ? 'default' : 'pointer',
 }}
 >
 {/* Background Illustration & Radial Glow (Stays behind text) */}
 <Illo accent={accent} />
 <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 75% 75%,${accent}14 0%,transparent 60%)` }} />

 {/* ── PART 1: TOP SECTION (Fixed Height Area) ── */}
 <div className={`relative z-10 flex-shrink-0 flex flex-col px-5 md:px-6 pt-5 md:pt-6 transition-all duration-300 ${isExpanded ? 'pb-3' : 'pb-5 h-full'}`}>
 
 {/* Icon Box + Number */}
 <div className="flex justify-between items-start mb-5">
 <div
 className="w-[52px] h-[52px] rounded-[13px] flex items-center justify-center flex-shrink-0"
 style={{ background: `linear-gradient(135deg,${accent}28 0%,${accent}14 100%)`, border: `1.5px solid ${accent}38` }}
 >
 <CardIcon className="w-6 h-6" style={{ color: accent }} strokeWidth={2.2} />
 </div>
 <span className="text-sm font-bold tracking-wider tabular-nums" style={{ color: `${accent}65` }}>
 {String(card.id).padStart(2, '0')}
 </span>
 </div>

 {/* Badge */}
 <div className="flex items-center gap-1.5 mb-3">
 <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
 <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase" style={{ color: accent }}>{badge}</span>
 </div>

 {/* Title */}
 <h2 className="text-[20px] md:text-[22px] font-extrabold text-white leading-[1.2] mb-3">
 {card.title}
 </h2>

 {/* Short Desc & CTA (Hide smoothly when expanded to make room for full details) */}
 <AnimatePresence>
 {!isExpanded && (
 <motion.div 
 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
 className="flex flex-col flex-1"
 >
 <p className="text-white/55 text-[12px] md:text-[13px] leading-relaxed line-clamp-3 pr-8">
 {card.description}
 </p>
 <button
 className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[12px] md:text-[13px] font-bold self-start transition-opacity hover:opacity-85 active:scale-95"
 style={{ background: btnBg, boxShadow: `0 4px 14px ${accent}38` }}
 onClick={(e) => { e.stopPropagation(); setExpandedId(card.id); }}
 >
 {btn} <span className="text-sm leading-none">→</span>
 </button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* ── PART 2: EXPANDED SCROLLABLE SECTION ── */}
 <AnimatePresence>
 {isExpanded && (
 <motion.div
 key="details"
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.3 }}
 className="relative z-10 flex flex-col w-full overflow-hidden"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Visual Divider */}
 <div className="mx-5 md:mx-6 h-px flex-shrink-0 mb-4" style={{ backgroundColor: `${accent}30` }} />

 {/* Details Content Container (No scroll, dynamic height) */}
 <div className="flex-1 px-5 md:px-6 pb-4">
 {/* Overview */}
 <p className="text-white/80 text-[13px] leading-[1.6] mb-5 text-justify">
 {card.details.overview}
 </p>

 {/* Key Indicators Section */}
 {card.details.indicators && (
 <div className="mb-5">
 <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] block mb-2.5" style={{ color: accent }}>
 Key Indicators
 </span>
 <ul className="space-y-2">
 {card.details.indicators.map((ind, i) => (
 <li key={i} className="text-white/70 text-[12px] leading-relaxed flex items-start gap-2.5">
 <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
 <span className="flex-1">{ind}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 {/* Recommended Actions Section */}
 {card.details.actions && (
 <div className="mb-4">
 <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] block mb-2.5" style={{ color: accent }}>
 Recommended Action
 </span>
 <ul className="space-y-2">
 {card.details.actions.map((act, i) => (
 <li key={i} className="text-white/70 text-[12px] leading-relaxed flex items-start gap-2.5">
 <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
 <span className="flex-1">{act}</span>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>

 {/* Sticky Footer with Close Button */}
 <div className="px-5 md:px-6 py-3 flex justify-end flex-shrink-0 bg-black/15 border-t border-white/5 backdrop-blur-sm">
 <button
 onClick={() => setExpandedId(null)}
 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all hover:bg-white/10 active:scale-95"
 style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}
 >
 <X size={11} strokeWidth={3} /> Close
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
 })}
 </motion.div>
 </AnimatePresence>
 </div>

 {/* ── Shared Pagination ─────────────────────────────────────────────── */}
 <SharedPagination 
 totalItems={pages.length}
 currentIndex={activeIndex}
 onPageChange={(index) => {
 setExpandedId(null);
 setPage([index, index > activeIndex ? 1 : -1]);
 }}
 onPrev={() => paginate(-1)}
 onNext={() => paginate(1)}
 />
 </div>
 );
}