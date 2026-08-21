import React, { useRef } from 'react';
import * as Icons from 'lucide-react';
import { CYBER_LAW_LEGAL_AWARENESS_CARDS } from '../data/homepage/CyberLawPublicLegalAwarenessPageData';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';

// CyberLawLegalAwarenessCards component (renders the 10 Cyber Law & Public Legal Awareness cards)
export function CyberLawLegalAwarenessCards() {
 const scrollContainerRef = useRef(null);
 const totalItems = CYBER_LAW_LEGAL_AWARENESS_CARDS.length;
 
 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(scrollContainerRef, totalItems);

 return (
 <>
 <style dangerouslySetInnerHTML={{
 __html: `
 .cyber-law-cards-container {
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 overflow-x: auto;
 overflow-y: hidden;
 gap: 20px;
 padding: 20px 15px;
 scroll-behavior: smooth;
 width: 100%;
 scrollbar-width: none;
 -ms-overflow-style: none;
 scroll-snap-type: x mandatory;
 scroll-padding-left: 15px;
 }
 .cyber-law-cards-container::-webkit-scrollbar {
 display: none;
 }
 .cyber-law-card {
 /* Cute Doodle Palette */
 --bg-color: #fdfbf7;
 --ink-color: #2c2c2c;
 --paper-line: #e6e0d4;
 --tape-color: rgba(255, 221, 161, 0.85);
 --accent-coral: #ff8ba7;
 --accent-mint: #c6e377;
 --accent-lavender: #c0bbfe;
 --accent-yellow: #ffdf6c;

 font-size: 16px;
 position: relative;
 width: 17em;
 height: 25em;
 background:
 linear-gradient(var(--bg-color) 1.5em, transparent 1.5em) 0 0 / 100% 1.6em,
 linear-gradient(var(--paper-line) 0.08em, transparent 0.08em) 0 1.5em / 100%
 1.6em var(--bg-color);
 border: 0.25em solid var(--ink-color);
 /* Hand-drawn sketchy border radius */
 border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
 box-shadow:
 0.5em 0.5em 0 var(--ink-color),
 inset 0 0 1.2em rgba(0, 0, 0, 0.03);
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 3em 1.5em 2em;
 transition:
 transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
 box-shadow 0.4s ease,
 border-radius 0.4s ease;
 animation: floatCard 6s ease-in-out infinite;
 z-index: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 cursor: pointer;
 scroll-snap-align: center;
 }

 /* Paper Tape Corner */
 .cyber-law-card::before {
 content: "";
 position: absolute;
 top: -0.7em;
 left: 50%;
 transform: translateX(-50%) rotate(-4deg);
 width: 5em;
 height: 1.4em;
 background: var(--tape-color);
 border: 0.1em solid rgba(0, 0, 0, 0.1);
 box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.1);
 border-radius: 2px 4px 2px 5px;
 z-index: 10;
 animation: tapeFlutter 4s infinite alternate ease-in-out;
 }

 /* Hover Dynamics */
 .cyber-law-card:hover {
 transform: translateY(-0.8em) rotate(1deg);
 box-shadow:
 0.7em 0.9em 0 var(--ink-color),
 inset 0 0 1.2em rgba(0, 0, 0, 0.03);
 border-radius: 15px 255px 15px 225px / 255px 15px 225px 15px; /* Border sketch shift */
 }

 /* --- DOODLE DECORATIONS --- */
 .doodle {
 position: absolute;
 fill: none;
 stroke: var(--ink-color);
 stroke-width: 2;
 stroke-linecap: round;
 stroke-linejoin: round;
 z-index: 0;
 }
 .doodle.star {
 width: 1.8em;
 height: 1.8em;
 top: 1.5em;
 right: 1.5em;
 fill: var(--accent-yellow);
 animation: pulseSparkle 3s infinite alternate ease-in-out;
 }
 .doodle.sparkle {
 width: 1.5em;
 height: 1.5em;
 top: 4em;
 left: 1.5em;
 fill: var(--accent-mint);
 animation: pulseSparkle 2.5s infinite alternate-reverse ease-in-out;
 }
 .doodle.swirl {
 width: 2.5em;
 height: 2.5em;
 bottom: 2em;
 right: 1em;
 stroke: var(--accent-lavender);
 stroke-width: 6;
 opacity: 0.6;
 animation: rotateDoodle 15s linear infinite;
 }

 /* --- AVATAR / PHOTO --- */
 .card-photo {
 width: 6.5em;
 height: 6.5em;
 position: relative;
 margin-bottom: 1.2em;
 background: 
 /* Spiky Hair */
 radial-gradient(
 circle at 25% 10%,
 var(--accent-lavender) 15%,
 transparent 16%
 ),
 radial-gradient(
 circle at 50% 5%,
 var(--accent-lavender) 18%,
 transparent 19%
 ),
 radial-gradient(
 circle at 75% 10%,
 var(--accent-lavender) 15%,
 transparent 16%
 ),
 /* Hair Base */
 radial-gradient(
 ellipse at 50% 20%,
 var(--accent-lavender) 45%,
 transparent 46%
 ),
 /* Skin Tone */ #ffdeb3;
 border: 0.2em solid var(--ink-color);
 border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
 box-shadow: 0.3em 0.3em 0 var(--accent-coral);
 animation: avatarBounce 4s ease-in-out infinite;
 overflow: hidden;
 z-index: 2;
 }

 /* Face Details (Eyes & Blush) */
 .card-photo::before {
 content: "";
 position: absolute;
 width: 0.55em;
 height: 0.55em;
 background: var(--ink-color);
 border-radius: 50%;
 top: 3.2em;
 left: 1.8em;
 /* Right eye + two pink blushes */
 box-shadow:
 2.3em 0 0 var(--ink-color),
 -0.4em 0.9em 0.3em rgba(255, 139, 167, 0.8),
 2.7em 0.9em 0.3em rgba(255, 139, 167, 0.8);
 animation: avatarBlink 5s infinite;
 transform-origin: center;
 }

 /* Face Details (Smile) */
 .card-photo::after {
 content: "";
 position: absolute;
 width: 1.4em;
 height: 1.2em;
 border: 0.2em solid transparent;
 border-bottom-color: var(--ink-color);
 border-radius: 50%;
 top: 2.2em;
 left: 2.35em;
 animation: smileMove 3s ease-in-out infinite alternate;
 }

 /* --- TYPOGRAPHY --- */
 .card-title {
 text-align: center;
 color: var(--ink-color);
 font-size: 1.2em;
 font-weight: 900;
 font-family: "Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif;
 letter-spacing: 0.05em;
 margin-bottom: 0.5em;
 text-shadow: 0.08em 0.08em 0 var(--accent-lavender);
 z-index: 2;
 line-height: 1.25;
 }

 .cyber-law-card:hover .card-title {
 animation: titleWobble 0.6s ease-in-out infinite alternate;
 }

 /* Role Badge */
 .card-title span {
 display: inline-block;
 font-size: 0.55em;
 color: var(--ink-color);
 background: var(--accent-mint);
 padding: 0.4em 1em;
 border: 0.15em solid var(--ink-color);
 border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
 margin-top: 0.8em;
 font-weight: bold;
 text-transform: uppercase;
 letter-spacing: 0.1em;
 box-shadow: 0.2em 0.2em 0 var(--ink-color);
 animation: badgeFloat 3s ease-in-out infinite alternate;
 text-shadow: none;
 }

 /* --- SOCIAL BUTTONS --- */
 .card-socials {
 display: flex;
 gap: 1em;
 height: 0;
 opacity: 0;
 margin-top: 0;
 overflow: hidden;
 transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
 z-index: 2;
 }

 .cyber-law-card:hover .card-socials {
 height: 3em;
 opacity: 1;
 margin-top: 1.5em;
 overflow: visible;
 }

 .card-socials-btn {
 width: 2.8em;
 height: 2.8em;
 border: 0.15em solid var(--ink-color);
 background: #fff;
 border-radius: 50% 40% 60% 40% / 40% 60% 40% 50%; /* Skewed circle */
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 box-shadow: 0.2em 0.2em 0 var(--ink-color);
 transition: all 0.2s ease;
 }

 .card-socials-btn svg {
 width: 1.4em;
 height: 1.4em;
 fill: var(--ink-color);
 transition: transform 0.2s ease;
 }

 /* Interactive Button States */
 .card-socials-btn.facebook:hover {
 background: var(--accent-lavender);
 }
 .card-socials-btn.github:hover {
 background: var(--accent-coral);
 }
 .card-socials-btn.linkedin:hover {
 background: var(--accent-mint);
 }

 .card-socials-btn:hover {
 transform: translateY(-0.3em);
 animation: btnWiggle 0.6s ease-in-out infinite;
 }

 .card-socials-btn:focus-visible {
 outline: 0.2em dashed var(--accent-coral);
 outline-offset: 0.3em;
 transform: translateY(-0.3em);
 }

 .card-socials-btn:active {
 transform: translate(0.1em, 0.1em);
 box-shadow: 0.05em 0.05em 0 var(--ink-color);
 animation: none;
 }

 /* --- ANIMATIONS KEYFRAMES --- */
 @keyframes floatCard {
 0%,
 100% {
 transform: translateY(0);
 }
 50% {
 transform: translateY(-0.4em);
 }
 }

 @keyframes tapeFlutter {
 0% {
 transform: translateX(-50%) rotate(-4deg) scale(1);
 }
 100% {
 transform: translateX(-50%) rotate(-2deg) scale(1.02);
 }
 }

 @keyframes pulseSparkle {
 0% {
 transform: scale(0.8);
 opacity: 0.6;
 }
 100% {
 transform: scale(1.1);
 opacity: 1;
 }
 }

 @keyframes rotateDoodle {
 0% {
 transform: rotate(0deg);
 }
 100% {
 transform: rotate(360deg);
 }
 }

 @keyframes avatarBounce {
 0%,
 100% {
 transform: translateY(0) scale(1);
 border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
 }
 50% {
 transform: translateY(-0.3em) scale(1.02);
 border-radius: 45% 55% 50% 50% / 45% 50% 50% 55%;
 }
 }

 @keyframes avatarBlink {
 0%,
 4%,
 10%,
 100% {
 transform: scaleY(1);
 }
 5%,
 8% {
 transform: scaleY(0.1);
 }
 }

 @keyframes smileMove {
 0% {
 transform: translateY(0) scaleX(1);
 }
 100% {
 transform: translateY(-0.1em) scaleX(1.1);
 }
 }

 @keyframes titleWobble {
 0% {
 transform: rotate(-2deg) scale(1.02);
 }
 100% {
 transform: rotate(2deg) scale(1.02);
 }
 }

 @keyframes badgeFloat {
 0% {
 transform: translateY(0) rotate(-1deg);
 }
 100% {
 transform: translateY(-0.2em) rotate(1deg);
 }
 }

 @keyframes btnWiggle {
 0%,
 100% {
 transform: translateY(-0.3em) rotate(0deg);
 }
 25% {
 transform: translateY(-0.3em) rotate(-8deg);
 }
 75% {
 transform: translateY(-0.3em) rotate(8deg);
 }
 }
 ` }} />
 <section className="w-full bg-[#f8fafc] py-12 md:py-16 border-t border-slate-100 relative">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">

 {/* Title centered */}
  <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>

  <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-wider uppercase text-center">
  Cyber Law & Public Legal Awareness
  </h2>
  <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>

  </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Understand your digital rights and the legal frameworks protecting you.
  </p>
  </div>

 {/* Cards Wrapper */}
 <div className="relative max-w-[1400px] mx-auto">

 {/* Custom Cards Layout Row */}
 <div
 ref={scrollContainerRef}
 className="cyber-law-cards-container scrollbar-none px-0"
 >
 {CYBER_LAW_LEGAL_AWARENESS_CARDS.map((card, idx) => {
 return (
 <div
 key={idx}
 className="cyber-law-card"
 >
 {/* Doodle decorations */}
 <svg className="doodle star" viewBox="0 0 24 24">
 <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
 </svg>
 <svg className="doodle sparkle" viewBox="0 0 24 24">
 <path d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1zm10-5a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zM6 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zm11.07-5.07a1 1 0 0 1 0 1.41l-2.12 2.12a1 1 0 0 1-1.41-1.41l2.12-2.12a1 1 0 0 1 1.41 0zm-8.48 8.48a1 1 0 0 1 0 1.41l-2.12 2.12a1 1 0 0 1-1.41-1.41l2.12-2.12a1 1 0 0 1 1.41 0zm8.48 0a1 1 0 0 1 1.41 0l2.12 2.12a1 1 0 0 1-1.41 1.41l-2.12-2.12a1 1 0 0 1 0-1.41zM5.64 5.64a1 1 0 0 1 1.41 0l2.12 2.12a1 1 0 0 1-1.41 1.41L5.64 7.05a1 1 0 0 1 0-1.41z" />
 </svg>


 {/* Card Title */}
 <h3 className="card-title">
 {card.title}
 </h3>

 {/* Description & Detailed Content */}
 <p className="text-xs font-bold leading-relaxed mb-2 text-[#2c2c2c] z-[2] text-center">
 {card.desc}
 </p>
 <div className="h-[1px] w-full bg-[#e6e0d4] mb-2 z-[2] shrink-0"></div>
 <div 
 className=" pr-1 z-[2] text-left text-[#555555] font-semibold text-[11px] leading-[16px] w-full scrollbar-thin flex-1 overflow-y-auto min-h-0"
 >
 {card.content}
 </div>

 </div>
 );
 })}
 </div>

 {/* Navigation Controls positioned below the cards row */}
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
 </>
 );
}

