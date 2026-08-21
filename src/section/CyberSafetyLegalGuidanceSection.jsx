import React, { useState, useEffect, useRef } from "react";
import {
 FileText, ShieldAlert, Gavel, UserCheck, Database,
 AlertTriangle, MessageCircleWarning, Smartphone, Fingerprint, Users, X
} from "lucide-react";
import { legalCardsData } from "../data/homepage/CyberSafetyLegalGuidencePageData.js";

/* ─── PREMIUM ANIMATED SVG ILLUSTRATIONS (High-Tech / Glassmorphism) ──────── */

const SharedDefs = () => (
 <defs>
 {/* Glow Filters */}
 <filter id="glowBlue" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.6" />
 </filter>
 <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#06B6D4" floodOpacity="0.6" />
 </filter>
 <filter id="glowPurple" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#8B5CF6" floodOpacity="0.6" />
 </filter>
 <filter id="glowRed" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F43F5E" floodOpacity="0.6" />
 </filter>
 <filter id="glowAmber" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.6" />
 </filter>
 <filter id="glowEmerald" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#10B981" floodOpacity="0.6" />
 </filter>
 <filter id="glowPink" x="-30%" y="-30%" width="160%" height="160%">
 <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#EC4899" floodOpacity="0.6" />
 </filter>

 {/* Soft Drop Shadow for Glass/3D items */}
 <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
 <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000000" floodOpacity="0.08" />
 </filter>

 {/* Gradients */}
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
 <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.7" />
 </linearGradient>
 <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#F8FAFC" />
 <stop offset="50%" stopColor="#E2E8F0" />
 <stop offset="100%" stopColor="#CBD5E1" />
 </linearGradient>

 <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#60A5FA" />
 <stop offset="100%" stopColor="#2563EB" />
 </linearGradient>
 <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#A855F7" />
 <stop offset="100%" stopColor="#6366F1" />
 </linearGradient>
 <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#22D3EE" />
 <stop offset="100%" stopColor="#0891B2" />
 </linearGradient>
 <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FB7185" />
 <stop offset="100%" stopColor="#E11D48" />
 </linearGradient>
 <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#FBBF24" />
 <stop offset="100%" stopColor="#D97706" />
 </linearGradient>
 <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#34D399" />
 <stop offset="100%" stopColor="#059669" />
 </linearGradient>
 <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#F472B6" />
 <stop offset="100%" stopColor="#DB2777" />
 </linearGradient>
 </defs>
);

const IllustrationComplaint = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-pulse">
 <rect x="40" y="40" width="120" height="120" rx="20" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
 <circle cx="100" cy="100" r="70" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 6" />
 </g>
 <g className="svg-float">
 <path d="M60 40 C60 30 70 20 80 20 L130 20 L160 50 L160 150 C160 160 150 170 140 170 L80 170 C70 170 60 160 60 150 Z" fill="url(#glass)" filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M130 20 L130 50 L160 50 Z" fill="url(#metal)" opacity="0.6" />
 <rect x="75" y="60" width="30" height="6" rx="3" fill="url(#blueGrad)" filter="url(#glowBlue)" />
 <rect x="75" y="80" width="60" height="4" rx="2" fill="#CBD5E1" />
 <rect x="75" y="95" width="50" height="4" rx="2" fill="#CBD5E1" />
 <rect x="75" y="110" width="70" height="4" rx="2" fill="#CBD5E1" />
 <rect x="75" y="125" width="40" height="4" rx="2" fill="#CBD5E1" />
 <g transform="translate(10, 20)">
 <path d="M100 80 L130 90 L130 115 C130 135 115 150 100 160 C85 150 70 135 70 115 L70 90 Z" fill="url(#purpleGrad)" filter="url(#glowPurple)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M90 120 L98 128 L115 105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
 </g>
 </g>
 </svg>
);

const IllustrationReport = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-float">
 <rect x="30" y="40" width="140" height="110" rx="10" fill="url(#glass)" filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M30 50 C30 44 34 40 40 40 L160 40 C166 40 170 44 170 50 L170 60 L30 60 Z" fill="#F1F5F9" />
 <circle cx="45" cy="50" r="3" fill="#CBD5E1" />
 <circle cx="55" cy="50" r="3" fill="#CBD5E1" />
 <circle cx="65" cy="50" r="3" fill="#CBD5E1" />
 <rect x="45" y="80" width="50" height="6" rx="3" fill="#E2E8F0" />
 <rect x="45" y="100" width="80" height="6" rx="3" fill="#E2E8F0" />
 <rect x="45" y="120" width="60" height="6" rx="3" fill="#E2E8F0" />
 <line x1="40" y1="70" x2="160" y2="70" stroke="url(#cyanGrad)" strokeWidth="2" filter="url(#glowCyan)" />
 <g transform="translate(130, 95)" className="svg-pulse">
 <circle cx="0" cy="0" r="25" fill="url(#blueGrad)" filter="url(#glowBlue)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M-10 0 L-4 6 L10 -8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
 </g>
 </g>
 </svg>
);

const IllustrationAction = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <circle cx="100" cy="100" r="70" stroke="url(#purpleGrad)" strokeWidth="1.5" strokeDasharray="4 12" opacity="0.6" filter="url(#glowPurple)" className="svg-rotate-cw" />
 <circle cx="100" cy="100" r="85" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 8" opacity="0.8" className="svg-rotate-ccw" />
 <g className="svg-float">
 <path d="M40 150 L160 150 L150 165 L50 165 Z" fill="url(#metal)" filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="1" />
 <path d="M50 165 L150 165 L140 175 L60 175 Z" fill="#94A3B8" opacity="0.2" />
 <rect x="60" y="145" width="80" height="5" fill="url(#blueGrad)" filter="url(#glowBlue)" />
 <g transformOrigin="120px 120px" className="svg-wobble">
 <g transform="rotate(-30 100 100)">
 <rect x="95" y="70" width="12" height="75" rx="4" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <rect x="95" y="95" width="12" height="20" fill="url(#purpleGrad)" opacity="0.5" />
 <rect x="55" y="55" width="90" height="28" rx="8" fill="url(#purpleGrad)" filter="url(#glowPurple)" stroke="#FFFFFF" strokeWidth="2" />
 <rect x="55" y="55" width="90" height="12" rx="8" fill="url(#glass)" />
 <path d="M45 58 L55 55 L55 83 L45 80 Z" fill="url(#metal)" stroke="#FFFFFF" strokeWidth="1" />
 <path d="M155 58 L145 55 L145 83 L155 80 Z" fill="url(#metal)" stroke="#FFFFFF" strokeWidth="1" />
 </g>
 </g>
 </g>
 </svg>
);

const IllustrationSafeguards = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <circle cx="100" cy="100" r="70" stroke="url(#redGrad)" strokeWidth="2" fill="none" opacity="0.2" filter="url(#glowRed)" />
 <circle cx="100" cy="100" r="85" stroke="url(#redGrad)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" className="svg-rotate-cw" />
 <g className="svg-float">
 <rect x="55" y="40" width="90" height="120" rx="16" fill="url(#glass)" filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2" />
 <circle cx="100" cy="80" r="22" fill="url(#metal)" />
 <path d="M65 140 C65 110 135 110 135 140 Z" fill="url(#metal)" />
 <g transform="translate(100, 100)" className="svg-pulse">
 <path d="M-25 0 L0 12 L25 0 L25 25 C25 45 10 60 0 70 C-10 60 -25 45 -25 25 Z" fill="url(#redGrad)" filter="url(#glowRed)" stroke="#FFFFFF" strokeWidth="2.5" />
 <path d="M-10 25 L-2 33 L12 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
 </g>
 </g>
 </svg>
);

const IllustrationEvidence = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-float">
 <path d="M30 60 L70 60 L85 75 L170 75 L170 150 L30 150 Z" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <g>
 <rect x="45" y="45" width="90" height="100" fill="url(#metal)" opacity="0.9" transform="rotate(6 90 95)" />
 <rect x="55" y="60" width="70" height="4" fill="url(#blueGrad)" filter="url(#glowBlue)" transform="rotate(6 90 95)" />
 <rect x="55" y="75" width="50" height="4" fill="#CBD5E1" transform="rotate(6 90 95)" />
 <rect x="55" y="90" width="60" height="4" fill="#CBD5E1" transform="rotate(6 90 95)" />
 </g>
 <path d="M20 85 L180 85 L165 160 L35 160 Z" fill="url(#blueGrad)" filter="url(#glowBlue)" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
 <g transform="translate(100, 115)" className="svg-pulse">
 <circle cx="0" cy="0" r="18" fill="url(#amberGrad)" filter="url(#glowAmber)" stroke="#FFFFFF" strokeWidth="2" />
 <rect x="-6" y="-8" width="12" height="10" rx="2" fill="#FFFFFF" />
 <path d="M-3 -8 C-3 -12 3 -12 3 -8" stroke="#FFFFFF" strokeWidth="2" fill="none" />
 <circle cx="0" cy="0" r="3" fill="url(#amberGrad)" />
 <path d="M0 3 L0 8" stroke="#FFFFFF" strokeWidth="2" />
 </g>
 </g>
 </svg>
);

const IllustrationFraud = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g opacity="0.3" className="svg-rotate-cw">
 <rect x="40" y="40" width="120" height="120" fill="none" stroke="url(#cyanGrad)" strokeWidth="1" strokeDasharray="10 10" />
 <rect x="60" y="60" width="80" height="80" fill="none" stroke="url(#cyanGrad)" strokeWidth="1" />
 </g>
 <g className="svg-float">
 <rect x="25" y="60" width="150" height="95" rx="12" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <rect x="25" y="80" width="150" height="20" fill="#334155" opacity="0.8" />
 <rect x="45" y="115" width="25" height="18" rx="4" fill="url(#metal)" stroke="#94A3B8" strokeWidth="1" />
 <path d="M45 124 L70 124 M53 115 L53 133 M62 115 L62 133" stroke="#94A3B8" strokeWidth="1" />
 <rect x="90" y="125" width="60" height="6" rx="3" fill="#CBD5E1" opacity="0.5" />
 <g transform="translate(150, 120)" className="svg-pulse">
 <circle cx="0" cy="0" r="22" fill="url(#cyanGrad)" filter="url(#glowCyan)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
 </g>
 </g>
 </svg>
);

const IllustrationHarassment = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-float">
 <g className="svg-pulse">
 <path d="M30 60 L120 60 C128 60 135 67 135 75 L135 105 C135 113 128 120 120 120 L90 120 L60 140 L60 120 L30 120 C22 120 15 113 15 105 L15 75 C15 67 22 60 30 60 Z" fill="url(#glass)" filter="url(#shadow)" stroke="#FFFFFF" strokeWidth="2" />
 <rect x="35" y="80" width="80" height="6" rx="3" fill="#CBD5E1" />
 <rect x="35" y="95" width="50" height="6" rx="3" fill="#CBD5E1" />
 </g>
 <g transform="translate(70, -20)" opacity="0.6">
 <path d="M30 30 L110 30 C118 30 125 37 125 45 L125 70 C125 78 118 85 110 85 L90 85 L60 100 L60 85 L30 85 C22 85 15 78 15 70 L15 45 C15 37 22 30 30 30 Z" fill="url(#glass)" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
 <rect x="35" y="50" width="70" height="4" rx="2" fill="#E2E8F0" />
 </g>
 <g transform="translate(130, 100)" className="svg-pulse">
 <circle cx="0" cy="0" r="22" fill="url(#pinkGrad)" filter="url(#glowPink)" stroke="#FFFFFF" strokeWidth="2" />
 <line x1="-12" y1="12" x2="12" y2="-12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
 <circle cx="0" cy="0" r="16" stroke="#FFFFFF" strokeWidth="2" fill="none" />
 </g>
 </g>
 </svg>
);

const IllustrationBullying = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-float">
 <rect x="50" y="20" width="80" height="150" rx="15" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="3" filter="url(#shadow)" />
 <rect x="60" y="30" width="60" height="120" rx="6" fill="#F1F5F9" />
 <rect x="80" y="155" width="20" height="4" rx="2" fill="#CBD5E1" />
 <rect x="65" y="40" width="40" height="15" rx="5" fill="#E2E8F0" />
 <rect x="75" y="65" width="40" height="15" rx="5" fill="url(#purpleGrad)" opacity="0.6" />
 <g transform="translate(100, 100)" className="svg-pulse">
 <path d="M-20 -10 L0 0 L20 -10 L20 15 C20 30 10 40 0 50 C-10 40 -20 30 -20 15 Z" fill="url(#blueGrad)" filter="url(#glowBlue)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M-8 15 L-2 21 L10 8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
 </g>
 </g>
 </svg>
);

const IllustrationIdentity = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-float">
 <rect x="25" y="50" width="140" height="90" rx="10" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <rect x="40" y="70" width="35" height="45" rx="6" fill="#F1F5F9" />
 <circle cx="57.5" cy="85" r="10" fill="#CBD5E1" />
 <path d="M45 110 C45 95 70 95 70 110" fill="#CBD5E1" />
 <rect x="90" y="75" width="55" height="5" rx="2.5" fill="#CBD5E1" />
 <rect x="90" y="90" width="40" height="5" rx="2.5" fill="#CBD5E1" />
 <rect x="90" y="105" width="30" height="5" rx="2.5" fill="#CBD5E1" />
 <g transform="translate(125, 95)" filter="url(#glowEmerald)">
 <circle cx="0" cy="0" r="24" fill="url(#emeraldGrad)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M-8 -6 C-8 -12 8 -12 8 -6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
 <path d="M-12 0 C-12 -10 12 -10 12 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
 <path d="M-16 6 C-16 -8 16 -8 16 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
 <path d="M-6 8 C-6 2 6 2 6 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
 </g>
 </g>
 </svg>
);

const IllustrationReferral = () => (
 <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
 <SharedDefs />
 <g className="svg-wobble">
 <line x1="60" y1="60" x2="140" y2="80" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" />
 <line x1="60" y1="140" x2="140" y2="120" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" />
 <line x1="60" y1="60" x2="60" y2="140" stroke="#CBD5E1" strokeWidth="3" />
 <circle cx="60" cy="60" r="18" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <circle cx="60" cy="140" r="18" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" filter="url(#shadow)" />
 <g transform="translate(130, 100)">
 <circle cx="0" cy="0" r="30" fill="url(#purpleGrad)" filter="url(#glowPurple)" stroke="#FFFFFF" strokeWidth="2" />
 <path d="M-12 2 L-4 10 L14 -6" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
 <circle cx="0" cy="0" r="40" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.6" className="svg-rotate-cw" />
 </g>
 </g>
 </svg>
);

const LegalIllustration = ({ id }) => {
 switch (id) {
 case 1: return <IllustrationComplaint />;
 case 2: return <IllustrationReport />;
 case 3: return <IllustrationAction />;
 case 4: return <IllustrationSafeguards />;
 case 5: return <IllustrationEvidence />;
 case 6: return <IllustrationFraud />;
 case 7: return <IllustrationHarassment />;
 case 8: return <IllustrationBullying />;
 case 9: return <IllustrationIdentity />;
 case 10: return <IllustrationReferral />;
 default: return null;
 }
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */

export default function CyberSafetyLegalGuidanceSection() {
 const [activeIndex, setActiveIndex] = useState(0);
 const [expandedCardId, setExpandedCardId] = useState(null); // Keep for mobile inline expansion
 const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false); // For Desktop pause
 const [isHovered, setIsHovered] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 const containerRef = useRef(null);
 const cardsContainerRef = useRef(null);
 const lastWheelTime = useRef(0);
 const dragStartY = useRef(0);

 const totalCards = legalCardsData.length;
 const normalizedActiveIndex = ((activeIndex % totalCards) + totalCards) % totalCards;
 // Always track the active card for the side panel
 const activeCard = legalCardsData[normalizedActiveIndex];

 useEffect(() => {
 const checkMobile = () => setIsMobile(window.innerWidth < 768);
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // Sync expandedCardId with active index (Mobile only)
 useEffect(() => {
 if (isMobile && expandedCardId !== null) {
 setExpandedCardId(legalCardsData[normalizedActiveIndex].id);
 }
 }, [normalizedActiveIndex, isMobile, expandedCardId]);

 // Auto-scroll
 useEffect(() => {
 if (isHovered || expandedCardId !== null || isAutoScrollPaused) return;
 const timer = setInterval(() => setActiveIndex((prev) => prev + 1), 2500);
 return () => clearInterval(timer);
 }, [isHovered, expandedCardId, isAutoScrollPaused]);

 // Touch Swipe handlers
 const handleTouchStart = (e) => {
 if (isMobile) return;
 if (!e.target.closest('[data-card="true"]')) return;
 dragStartY.current = e.touches[0].clientY;
 };
 const handleTouchEnd = (e) => {
 if (isMobile) return;
 if (!e.target.closest('[data-card="true"]')) return;
 const diffY = e.changedTouches[0].clientY - dragStartY.current;
 if (diffY < -50) setActiveIndex((prev) => prev + 1);
 else if (diffY > 50) setActiveIndex((prev) => prev - 1);
 };

 // Mouse Drag handlers
 const handleMouseDown = (e) => {
 if (isMobile) return;
 if (!e.target.closest('[data-card="true"]')) return;
 dragStartY.current = e.clientY;
 };
 const handleMouseUp = (e) => {
 if (isMobile) return;
 if (!e.target.closest('[data-card="true"]')) return;
 const diffY = e.clientY - dragStartY.current;
 if (diffY < -50) setActiveIndex((prev) => prev + 1);
 else if (diffY > 50) setActiveIndex((prev) => prev - 1);
 };

  // Mouse Wheel Navigation (Up/Down)
  useEffect(() => {
    let lastFlipTime = 0;

    const handleWheel = (e) => {
      if (isMobile) return;
      
      // Only capture wheel if hovering over an actual card
      if (!e.target.closest('[data-card="true"]')) {
        return;
      }

      e.preventDefault(); 
      e.stopPropagation(); 

      // Ignore tiny momentum tail events so they don't trigger flips
      if (Math.abs(e.deltaY) < 20) return;

      const now = Date.now();
      // Hard cooldown of 600ms between flips
      if (now - lastFlipTime < 600) return;

      // Trigger flip
      if (e.deltaY > 0) {
        setActiveIndex((prev) => prev + 1);
      } else if (e.deltaY < 0) {
        setActiveIndex((prev) => prev - 1);
      }

      lastFlipTime = now;
    };

    const cardsContainer = cardsContainerRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile]);

 // Keyboard Arrow Keys Navigation (Up/Down)
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (isMobile) return;
 if (e.key === "ArrowDown") {
 setActiveIndex((prev) => prev + 1);
 } else if (e.key === "ArrowUp") {
 setActiveIndex((prev) => prev - 1);
 }
 };
 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [isMobile]);

  const getCardStyles = (index) => {
    let offset = index - normalizedActiveIndex;
    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;

    const absOffset = Math.abs(offset);
    const shiftY = isMobile ? 65 : 120;


 if (absOffset > 3) {
 return {
 transform: `translateY(${offset * shiftY}px) scale(0.8)`,
 opacity: 0,
 zIndex: -10,
 pointerEvents: "none"
 };
 }

 // Light theme soft hierarchy (no heavy blur filter for high performance)
 let scale = 1, opacity = 1;
 if (absOffset === 1) { scale = isMobile ? 0.96 : 0.95; opacity = isMobile ? 0.45 : 0.6; }
 else if (absOffset === 2) { scale = isMobile ? 0.92 : 0.90; opacity = isMobile ? 0.25 : 0.3; }
 else if (absOffset > 2) { scale = isMobile ? 0.88 : 0.85; opacity = 0.1; }

 return {
 transform: `translateY(${offset * shiftY}px) scale(${scale})`,
 zIndex: 10 - absOffset,
 opacity: opacity,
 pointerEvents: "auto"
 };
 };

 return (
 <section className="w-full bg-[#F8FAFC] py-12 md:py-16 relative overflow-hidden border-t border-slate-100">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">
 
 {/* Title centered */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
 Cyber Safety Legal Guidance
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Navigate the legal aspects of digital safety with expert guidance.
  </p>
</div>

 <div
 ref={containerRef}
 className="relative w-full flex flex-col md:flex-row items-center justify-center md:justify-between font-sans gap-8 md:gap-12"
 onTouchStart={handleTouchStart}
 onTouchEnd={handleTouchEnd}
 onMouseDown={handleMouseDown}
 onMouseUp={handleMouseUp}
 >
 <style dangerouslySetInnerHTML={{
 __html: `
 @keyframes svgFloat {
 0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-6px); }
 }
 .svg-float {
 animation: svgFloat 5s ease-in-out infinite;
 }
 @keyframes svgPulse {
 0%, 100% { opacity: 0.3; }
 50% { opacity: 0.6; }
 }
 .svg-pulse {
 animation: svgPulse 4s ease-in-out infinite;
 }
 @keyframes svgRotate {
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
 }
 .svg-rotate-cw {
 animation: svgRotate 25s linear infinite;
 transform-origin: center;
 }
 .svg-rotate-ccw {
 animation: svgRotate 35s linear infinite reverse;
 transform-origin: center;
 }
 @keyframes svgWobble {
 0%, 100% { transform: rotate(-2deg); }
 50% { transform: rotate(2deg); }
 }
 .svg-wobble {
 animation: svgWobble 4s ease-in-out infinite;
 transform-origin: center;
 }
 `
 }} />

 {/* Left Side: Vertical stack of fluid light-theme cards */}
 <div
    ref={cardsContainerRef}
    onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
    onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
    className="relative w-full md:w-[60%] h-[420px] sm:h-[480px] md:h-[600px] lg:h-[700px] flex items-center justify-center perspective-1000 order-2 md:order-1"
    style={{ touchAction: 'pan-x' }}
  >
 {legalCardsData.map((card, index) => {
 const Icon = card.icon;
 const isActive = index === normalizedActiveIndex;
 const isExpanded = isMobile && expandedCardId === card.id;
 const cardNumber = String(card.id).padStart(2, '0');
 const absOffset = Math.abs(index - normalizedActiveIndex);
 const currentStyle = getCardStyles(index);

 return (
 <div
 key={card.id}
 data-active={isActive ? "true" : "false"}
 data-card="true"
 onClick={(e) => {
 e.stopPropagation();
 if (index !== normalizedActiveIndex) {
 setActiveIndex(index);
 if (expandedCardId !== null) {
 setExpandedCardId(card.id);
 }
 }
 }}
 style={{
 ...currentStyle,
 height: isMobile ? (isExpanded ? 'auto' : 320) : 300,
 minHeight: isMobile && isExpanded ? 420 : undefined,
 zIndex: isExpanded ? 50 : 10 - absOffset,
 transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s",
 willChange: "transform, opacity"
 }}
 className={`absolute w-[calc(100vw-32px)] sm:w-[500px] md:w-[440px] lg:w-[580px] xl:w-[720px] bg-white rounded-[2rem] overflow-hidden 
 ${isActive ? "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white" : "shadow-lg border border-slate-100"}
 ${isExpanded ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
 >
 {/* Right-Side Visuals Wrapper (Fades out when card is expanded for clean reading) */}
 <div
 style={{ opacity: isExpanded ? 0 : 1, transition: "opacity 0.3s" }}
 className="absolute inset-0 pointer-events-none z-0"
 >
 {/* Modern Vibrant Background Elements (Masked to fade on left) */}
 <div
 className="absolute inset-0 rounded-[2rem]"
 style={{ maskImage: 'linear-gradient(to right, transparent 20%, black 70%)', WebkitMaskImage: 'linear-gradient(to right, transparent 20%, black 70%)' }}
 >
 {/* Intense Glowing Orbs */}
 <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[130%] bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-full blur-[80px] opacity-[0.45] mix-blend-multiply" />
 <div className="absolute -bottom-[20%] right-[10%] w-[70%] h-[110%] bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-[70px] opacity-[0.45] mix-blend-multiply" />
 <div className="absolute top-[20%] right-[30%] w-[60%] h-[90%] bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-[70px] opacity-30 mix-blend-multiply" />

 {/* Tech Grid Overlay */}
 <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#4F46E5 1.5px, transparent 1.5px), linear-gradient(90deg, #4F46E5 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

 {/* Large Dot Matrix Accent */}
 <div className="absolute top-8 right-8 w-32 h-32 opacity-30"
 style={{ backgroundImage: 'radial-gradient(circle, #4F46E5 2px, transparent 2px)', backgroundSize: '16px 16px' }}
 />
 </div>

 {/* Right Side HIGH-TECH ANIMATED SVG Illustration */}
 <div className="absolute right-[-15px] bottom-[-15px] sm:right-6 md:right-8 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 z-10 opacity-[0.25] sm:opacity-[0.8] lg:opacity-100 pointer-events-none">
 <LegalIllustration id={card.id} />
 </div>
 </div>



 {/* Main Horizontal Layout Area (Rigid when swiping, fluid when expanded) */}
 <div className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full px-6 py-5 sm:p-8 md:p-10 ${!isExpanded ? "h-full" : ""}`}>
 {/* Mobile Header (Icon + Label) */}
 <div className="flex items-center gap-4 w-full sm:w-auto shrink-0 relative z-20">
 <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#F0F4FF] to-[#E5EDFF] shadow-[inset_0_2px_10px_rgba(255,255,255,1)] flex items-center justify-center border border-white">
 <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-[#2563EB]" strokeWidth={2.5} />
 </div>
 <div className="block sm:hidden text-[#2563EB] font-bold text-[10px] tracking-[0.2em] uppercase shrink-0">
 GUIDANCE // {cardNumber}
 </div>
 </div>

 {/* Content Column */}
 <div className={`flex-1 w-full sm:max-w-[85%] md:max-w-[55%] flex flex-col ${!isExpanded ? "h-full justify-center" : "justify-start"} relative z-20`}>
 <div className="hidden sm:block text-[#2563EB] font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2 shrink-0">
 GUIDANCE // {cardNumber}
 </div>

 {/* Title Area */}
 <div className={`${!isExpanded ? "h-[54px] sm:h-[64px]" : "mb-2"} flex items-start shrink-0 mt-1 sm:mt-0`}>
 <h2 className={`font-black text-[#0B1536] leading-[1.25] tracking-tight ${!isExpanded ? "line-clamp-2" : ""}`} style={{ fontSize: 'clamp(1.15rem, 4vw, 1.75rem)' }}>
 {card.title}
 </h2>
 </div>

 {/* Description Area */}
 <div className={`${!isExpanded ? "h-[60px] sm:h-[66px] w-[90%] sm:w-full" : "w-full mb-1"} shrink-0`}>
 <p className={`text-slate-600 text-[13px] sm:text-sm leading-relaxed pr-2 sm:pr-4 ${!isExpanded ? "line-clamp-3" : ""}`}>
 {card.desc}
 </p>
 </div>

 {/* Content Paragraph inside card (Mobile view only when expanded) */}
 {isExpanded && (
 <div 
 className="mt-2 text-slate-700 text-[12px] sm:text-[13px] leading-relaxed pr-2 scrollbar-thin shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-300"
 >
 {card.content}
 </div>
 )}

 {/* CTA Position */}
 <div className={`${!isExpanded ? "mt-2 sm:mt-4 h-[44px]" : "hidden"} shrink-0`}>
 <button
 onClick={(e) => { 
 e.stopPropagation(); 
 if (isMobile) {
 setExpandedCardId(card.id);
 } else {
 setIsAutoScrollPaused(!isAutoScrollPaused);
 }
 }}
 className={`text-white px-5 sm:px-7 h-full rounded-xl text-sm font-semibold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md ${!isMobile && isAutoScrollPaused ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/40 hover:from-emerald-600 hover:to-teal-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-500/40 hover:from-blue-600 hover:to-indigo-700'}`}
 >
 {!isMobile && isAutoScrollPaused ? 'Resume Scrolling' : 'Explore Details'} 
 {!isMobile && isAutoScrollPaused ? (
 <span className="text-[14px]">⟳</span>
 ) : (
 <span className="text-[10px]">→</span>
 )}
 </button>
 </div>

 {/* Close button inside card (Mobile view only when expanded) */}
 {isExpanded && (
 <div className="mt-6 mb-2 shrink-0 animate-in fade-in duration-300 flex justify-center w-full">
 <button
 onClick={(e) => { e.stopPropagation(); setExpandedCardId(null); }}
 className="border border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-700 px-6 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white shadow-sm w-[200px]"
 >
 Close Details
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Right Side Header Content */}
 <div className="w-full md:w-[35%] flex flex-col items-center md:items-start text-center md:text-left z-20 order-1 md:order-2 px-6 sm:px-0 mb-8 md:mb-0 md:self-start transition-all duration-500 mt-2 md:mt-[45px]">
 {/* Selected Card Details Panel (Always open on Desktop) */}
 {!isMobile && (
 <div 
 key={activeCard.id}
 className="w-full bg-white/90 border border-slate-200/60 rounded-3xl p-6 backdrop-blur-md shadow-xl shadow-slate-200/40 text-left relative animate-in fade-in slide-in-from-right-4 duration-500"
 >
 {isAutoScrollPaused && (
 <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-sm">
 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
 Paused
 </div>
 )}

 <div className="text-blue-600 font-extrabold text-[10px] tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
 <span className={`w-2 h-2 rounded-full bg-blue-500 ${!isAutoScrollPaused ? 'animate-pulse' : ''}`} /> 
 {isAutoScrollPaused ? 'READING MODE' : 'AUTO SCROLLING'}
 </div>
 <h2 className="text-xl font-black text-slate-800 leading-tight mb-3">
 {activeCard.title}
 </h2>

 <p className="text-slate-700 text-[13.5px] leading-relaxed font-semibold text-left mt-2 whitespace-pre-line">
 {activeCard.content}
 </p>
 </div>
 )}
 </div>
 </div>
 </div>
 </section>
 );
}

