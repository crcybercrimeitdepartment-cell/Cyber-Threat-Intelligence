import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';
import { BOOK_DEMO_CONTENT, BOOK_OVERVIEW } from './WhatWeDoPageData';
import NavPageHeader from '../../../components/NavPageHeader';

const TOTAL_SERVICES = BOOK_DEMO_CONTENT.length;
const TOTAL_PAGES = TOTAL_SERVICES + 1;

/**
 * Web Audio Sound Effects (Pure Web Audio API - zero external audio files)
 */
class BookAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPageFlip() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.26);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.32));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1500, t);
      filter.frequency.exponentialRampToValueAtTime(360, t + 0.22);
      filter.Q.setValueAtTime(2.4, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.38, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + 0.27);
    } catch {
      // Audio fallback
    }
  }

  playCoverThud() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(115, t);
      osc.frequency.exponentialRampToValueAtTime(42, t + 0.32);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.42);

      setTimeout(() => this.playPageFlip(), 150);
    } catch {
      // Audio fallback
    }
  }

  playBookmarkChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(784, t);
      osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.15);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    } catch {
      // Audio fallback
    }
  }
}

const audio = new BookAudioEngine();

/**
 * 100% PURE CSS & SVG BOOK COVER
 * ZERO IMAGE FILES (No JPG, No PNG, No <img> tag).
 * Exact reproduction of "The Quiet Places - A Journey Within" by Elian Blackwood:
 * - Exact deep midnight slate navy leather color (#0c1524)
 * - Authentic hardcover hinge groove / spine joint indentation
 * - Outer and inner metallic gold foil borders
 * - 4 ornate gold corner 4-pointed star ornaments
 * - High-contrast gold serif typography ("THE", "QUIET", "PLACES", "A JOURNEY WITHIN", "ELIAN BLACKWOOD")
 * - Radiant golden stippled moon
 * - Layered mountain peaks with sharp gold faceted contour lines
 * - Shoreline with dense pine tree silhouettes
 * - Shimmering horizontal golden lake ripples reflecting the moonlight
 */
function PureCssBookCover({ isClosed = true }) {
  return (
    <div className="relative w-full h-full bg-[#0c1524] rounded-r-[4px] overflow-hidden select-none">
      {/* Deep Midnight Navy Leather Texture Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 38%, #142236 0%, #0c1524 65%, #070c16 100%)',
        }}
      />

      {/* Fine Leather Grain Micro-Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#deb85d 0.6px, transparent 0.6px)`,
          backgroundSize: '5px 5px',
        }}
      />

      {/* Realistic Hardcover Spine Hinge Groove */}
      <div
        className="absolute top-0 bottom-0 left-[20px] w-[3px] pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.55) 100%)',
          boxShadow: '0 0 2px rgba(0,0,0,0.85)',
        }}
      />

      {/* Left Spine Crease Shadow */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[20px] pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 80%, transparent 100%)',
        }}
      />

      {/* 100% PURE SVG VECTOR GOLD FOIL ARTWORK */}
      <svg
        viewBox="0 0 360 520"
        className="w-full h-full relative z-10 block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Foil Linear Gradient */}
          <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faeec5" />
            <stop offset="20%" stopColor="#dfb758" />
            <stop offset="45%" stopColor="#fff6d8" />
            <stop offset="70%" stopColor="#ba8b28" />
            <stop offset="90%" stopColor="#f3d78c" />
            <stop offset="100%" stopColor="#9e7019" />
          </linearGradient>

          {/* Gold Stroke Gradient */}
          <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c89d3c" />
            <stop offset="50%" stopColor="#fdf0be" />
            <stop offset="100%" stopColor="#b48424" />
          </linearGradient>

          {/* Radiant Moon Glow Gradient */}
          <radialGradient id="moonGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9e2" />
            <stop offset="35%" stopColor="#f4d17b" />
            <stop offset="75%" stopColor="#c79732" />
            <stop offset="100%" stopColor="#8a6216" />
          </radialGradient>

          {/* Water reflection ripple fade */}
          <linearGradient id="waterRippleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fedb82" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#d1a238" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#966a1a" stopOpacity="0" />
          </linearGradient>

          {/* Gold Foil Emboss Drop Shadow */}
          <filter id="goldEmbossFilter" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="0.7" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* Outer Thin Gold Border */}
        <rect
          x="30"
          y="18"
          width="312"
          height="484"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="1.2"
          opacity="0.88"
        />

        {/* Inner Ornate Gold Border with Corner Indentations */}
        <path
          d="M 38 40 
             L 38 480 
             M 46 488 
             L 326 488 
             M 334 480 
             L 334 40 
             M 326 32 
             L 46 32"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="1.5"
          opacity="0.95"
        />

        {/* 4 Corner 4-Point Star Bursts */}
        <g transform="translate(38, 32)" filter="url(#goldEmbossFilter)">
          <path d="M 0 -8 L 1.8 -1.8 L 8 0 L 1.8 1.8 L 0 8 L -1.8 1.8 L -8 0 L -1.8 -1.8 Z" fill="url(#goldFoilGrad)" />
          <circle cx="0" cy="0" r="1.3" fill="#ffffff" />
        </g>
        <g transform="translate(334, 32)" filter="url(#goldEmbossFilter)">
          <path d="M 0 -8 L 1.8 -1.8 L 8 0 L 1.8 1.8 L 0 8 L -1.8 1.8 L -8 0 L -1.8 -1.8 Z" fill="url(#goldFoilGrad)" />
          <circle cx="0" cy="0" r="1.3" fill="#ffffff" />
        </g>
        <g transform="translate(38, 488)" filter="url(#goldEmbossFilter)">
          <path d="M 0 -8 L 1.8 -1.8 L 8 0 L 1.8 1.8 L 0 8 L -1.8 1.8 L -8 0 L -1.8 -1.8 Z" fill="url(#goldFoilGrad)" />
          <circle cx="0" cy="0" r="1.3" fill="#ffffff" />
        </g>
        <g transform="translate(334, 488)" filter="url(#goldEmbossFilter)">
          <path d="M 0 -8 L 1.8 -1.8 L 8 0 L 1.8 1.8 L 0 8 L -1.8 1.8 L -8 0 L -1.8 -1.8 Z" fill="url(#goldFoilGrad)" />
          <circle cx="0" cy="0" r="1.3" fill="#ffffff" />
        </g>

        {/* "T H E" */}
        <text
          x="186"
          y="94"
          textAnchor="middle"
          fill="url(#goldFoilGrad)"
          filter="url(#goldEmbossFilter)"
          fontFamily="'Cinzel', serif"
          fontSize="13"
          letterSpacing="0.48em"
          fontWeight="600"
        >
          T H E
        </text>

        {/* "Q U I E T" */}
        <text
          x="186"
          y="136"
          textAnchor="middle"
          fill="url(#goldFoilGrad)"
          filter="url(#goldEmbossFilter)"
          fontFamily="'Cinzel', serif"
          fontSize="36"
          letterSpacing="0.26em"
          fontWeight="700"
        >
          QUIET
        </text>

        {/* "P L A C E S" */}
        <text
          x="186"
          y="178"
          textAnchor="middle"
          fill="url(#goldFoilGrad)"
          filter="url(#goldEmbossFilter)"
          fontFamily="'Cinzel', serif"
          fontSize="36"
          letterSpacing="0.26em"
          fontWeight="700"
        >
          PLACES
        </text>

        {/* Center Diamond Divider */}
        <g transform="translate(186, 196)" filter="url(#goldEmbossFilter)">
          <line x1="-30" y1="0" x2="-8" y2="0" stroke="url(#goldStrokeGrad)" strokeWidth="1.1" />
          <path d="M 0 -3.5 L 3.5 0 L 0 3.5 L -3.5 0 Z" fill="url(#goldFoilGrad)" />
          <line x1="8" y1="0" x2="30" y2="0" stroke="url(#goldStrokeGrad)" strokeWidth="1.1" />
        </g>

        {/* "A J O U R N E Y W I T H I N" */}
        <text
          x="186"
          y="216"
          textAnchor="middle"
          fill="url(#goldFoilGrad)"
          filter="url(#goldEmbossFilter)"
          fontFamily="'Cinzel', serif"
          fontSize="9"
          letterSpacing="0.38em"
          fontWeight="500"
        >
          A JOURNEY WITHIN
        </text>

        {/* Full Radiant Moon */}
        <g transform="translate(186, 276)" filter="url(#goldEmbossFilter)">
          <circle cx="0" cy="0" r="28" fill="url(#moonGlowGrad)" />
          <circle cx="-6" cy="-8" r="3.5" fill="#a4751f" opacity="0.35" />
          <circle cx="8" cy="3" r="5" fill="#a4751f" opacity="0.3" />
          <circle cx="-8" cy="9" r="4" fill="#a4751f" opacity="0.25" />
          <circle cx="4" cy="-11" r="3" fill="#a4751f" opacity="0.3" />
        </g>

        {/* Mountains & Ridge Highlights */}
        <g filter="url(#goldEmbossFilter)">
          <polygon
            points="92,346 136,314 168,332 186,290 212,322 250,304 284,346"
            fill="#09111c"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="0.8"
          />

          <polygon
            points="65,356 130,328 186,290 252,332 308,356"
            fill="#060c14"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="1.2"
          />

          <path
            d="M 186 290 Q 182 314, 177 336 Q 173 348, 169 356"
            stroke="url(#goldFoilGrad)"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M 186 290 L 154 320 L 130 328 M 160 311 L 140 334 M 174 301 L 164 322"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M 186 290 L 220 320 L 252 332 M 204 311 L 228 334 M 194 304 L 208 322"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M 130 328 L 102 342 L 65 356 M 252 332 L 282 344 L 308 356"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="0.9"
            fill="none"
          />

          {/* Pine Trees */}
          <path
            d="M 76 356 L 78 350 L 80 356 M 84 356 L 86 348 L 88 356 M 93 356 L 96 347 L 99 356 
               M 106 356 L 108 349 L 110 356 M 117 356 L 120 346 L 123 356 M 131 356 L 133 349 L 135 356
               M 143 356 L 146 348 L 149 356 M 156 356 L 158 350 L 160 356"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 215 356 L 217 350 L 219 356 M 226 356 L 228 347 L 230 356 M 237 356 L 240 346 L 243 356 
               M 251 356 L 253 349 L 255 356 M 263 356 L 266 348 L 269 356 M 277 356 L 279 350 L 281 356 
               M 290 356 L 293 348 L 296 356"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="1.2"
            fill="none"
          />

          <line x1="62" y1="356" x2="312" y2="356" stroke="url(#goldFoilGrad)" strokeWidth="1.4" />

          {/* Water Ripples */}
          <line x1="171" y1="360" x2="201" y2="360" stroke="url(#waterRippleGrad)" strokeWidth="1.4" />
          <line x1="159" y1="364" x2="213" y2="364" stroke="url(#waterRippleGrad)" strokeWidth="1.5" />
          <line x1="149" y1="369" x2="223" y2="369" stroke="url(#waterRippleGrad)" strokeWidth="1.6" />
          <line x1="162" y1="374" x2="210" y2="374" stroke="url(#waterRippleGrad)" strokeWidth="1.4" />
          <line x1="145" y1="380" x2="227" y2="380" stroke="url(#waterRippleGrad)" strokeWidth="1.7" />
          <line x1="155" y1="386" x2="217" y2="386" stroke="url(#waterRippleGrad)" strokeWidth="1.5" />
          <line x1="165" y1="392" x2="207" y2="392" stroke="url(#waterRippleGrad)" strokeWidth="1.3" />
          <line x1="151" y1="399" x2="221" y2="399" stroke="url(#waterRippleGrad)" strokeWidth="1.6" />
          <line x1="159" y1="406" x2="213" y2="406" stroke="url(#waterRippleGrad)" strokeWidth="1.4" />
          <line x1="169" y1="413" x2="203" y2="413" stroke="url(#waterRippleGrad)" strokeWidth="1.2" />
          <line x1="175" y1="420" x2="197" y2="420" stroke="url(#waterRippleGrad)" strokeWidth="1.1" />
          <line x1="181" y1="427" x2="191" y2="427" stroke="url(#waterRippleGrad)" strokeWidth="1.0" />
        </g>

        {/* "E L I A N   B L A C K W O O D" */}
        <text
          x="186"
          y="456"
          textAnchor="middle"
          fill="url(#goldFoilGrad)"
          filter="url(#goldEmbossFilter)"
          fontFamily="'Cinzel', serif"
          fontSize="10.5"
          letterSpacing="0.45em"
          fontWeight="600"
        >
          ELIAN BLACKWOOD
        </text>

        <g transform="translate(186, 471)" filter="url(#goldEmbossFilter)">
          <line x1="-26" y1="0" x2="-6" y2="0" stroke="url(#goldStrokeGrad)" strokeWidth="1" />
          <path d="M 0 -3 L 2.5 0 L 0 3 L -2.5 0 Z" fill="url(#goldFoilGrad)" />
          <line x1="6" y1="0" x2="26" y2="0" stroke="url(#goldStrokeGrad)" strokeWidth="1" />
        </g>
      </svg>

      {/* Dynamic Gold Sheen on Hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            'linear-gradient(115deg, transparent 25%, rgba(255, 230, 160, 0.16) 48%, rgba(255, 255, 255, 0.28) 52%, rgba(255, 220, 130, 0.16) 56%, transparent 78%)',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="absolute inset-0 border border-amber-300/20 pointer-events-none rounded-r-[4px]" />
    </div>
  );
}

/**
 * Inside Back of Cover: Deep Blue Celestial Marbled Endpaper with Golden Ex Libris
 */
function InsideCoverEndpaper() {
  return (
    <div
      className="relative w-full h-full p-8 sm:p-10 flex flex-col items-center justify-between overflow-hidden select-none bg-[#0c1524] text-slate-100 rounded-l-[4px]"
      style={{
        boxShadow: 'inset 0 0 35px rgba(0,0,0,0.7)',
      }}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 25% 25%, rgba(212, 175, 55, 0.35) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(212, 175, 55, 0.25) 0%, transparent 55%)',
        }}
      />

      <div className="absolute inset-5 border border-amber-500/30 rounded pointer-events-none" />

      <div className="relative z-10 w-full max-w-[280px] p-6 bg-[#080d16]/90 border-2 border-amber-500/40 rounded-lg text-center shadow-2xl mt-10">
        <div className="w-8 h-8 mx-auto mb-2 rounded-full border border-amber-400/60 flex items-center justify-center text-amber-300">
          ✦
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] font-['Cinzel',serif] text-amber-300 font-bold">
          EX LIBRIS
        </div>
        <h3 className="text-base font-serif text-amber-100 font-['Cinzel',serif] tracking-wider mt-1">
          {BOOK_OVERVIEW.title || "CR CYBER THREAT INTELLIGENCE"}
        </h3>
        <p className="text-[10.5px] text-amber-200/70 italic font-['Cormorant_Garamond',serif] mt-0.5">
          {BOOK_OVERVIEW.subtitle || "Software What We Do — Planned Activities"}
        </p>

        <div className="my-3 w-16 h-[1px] bg-amber-500/40 mx-auto" />

        <p className="text-[11px] text-slate-300 font-['Cormorant_Garamond',serif] leading-relaxed italic">
          "{BOOK_OVERVIEW.description || "A comprehensive study of cyber threat awareness, scam prevention, and digital safety guidance."}"
        </p>

        <div className="mt-4 text-[9px] font-mono tracking-widest text-amber-400/70 uppercase">
          VOLUME 01 • {TOTAL_SERVICES} CHAPTERS
        </div>
      </div>

      <div className="relative z-10 text-center text-[10px] font-['Cinzel',serif] tracking-widest text-amber-500/60 uppercase">
        Plate 0 • Inside Front Cover
      </div>
    </div>
  );
}

/**
 * Crisp Parchment Page Layout for Content inside the Book
 */
function ParchmentPage({
  pageNumber,
  totalServices = TOTAL_SERVICES,
  totalPages = TOTAL_PAGES,
  service,
  isLeftPage = false,
  isTitlePage = false,
  onBookmark,
  isBookmarked,
}) {
  if (isTitlePage) {
    return (
      <div
        className="relative w-full h-full p-4 sm:p-6 md:p-7 flex flex-col justify-between select-none text-slate-900 bg-[#fbf8ef] rounded-r-[4px] overflow-hidden"
        style={{
          boxShadow: 'inset 15px 0 20px -10px rgba(0,0,0,0.1)',
        }}
      >
        <div className="absolute inset-2 sm:inset-3 md:inset-3.5 border border-[#d6c7a1] rounded pointer-events-none" />

        <div className="text-center pt-2 sm:pt-4">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-['Cinzel',serif] text-[#8c6d37] font-bold">
            CR CYBER THREAT INTELLIGENCE
          </div>
          <div className="text-[11px] sm:text-xs text-[#735e45] italic font-['Cormorant_Garamond',serif] mt-0.5">
            {BOOK_OVERVIEW.subtitle || "Software What We Do — Planned Activities"}
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#1e1309] font-['Cinzel',serif] font-bold tracking-wide mt-2 sm:mt-3 leading-tight">
            {BOOK_OVERVIEW.title || "The Architecture of Modern Systems"}
          </h2>

          <div className="my-2 sm:my-3 flex items-center justify-center gap-2 sm:gap-3 text-[#9b8054]">
            <div className="w-8 sm:w-10 h-[1px] bg-[#ccb88f]" />
            <span className="text-[10px] sm:text-xs">✦</span>
            <div className="w-8 sm:w-10 h-[1px] bg-[#ccb88f]" />
          </div>

          <p className="text-[11px] sm:text-xs md:text-[12.5px] text-[#524131] font-['Cormorant_Garamond',serif] italic leading-relaxed max-w-[280px] mx-auto">
            "{BOOK_OVERVIEW.description}"
          </p>
        </div>

        <div className="p-2.5 sm:p-3.5 md:p-4 rounded bg-[#f1e7cf]/70 border border-[#cbbb93] text-[10px] sm:text-[11px] text-[#4d3a27] leading-relaxed my-1.5 sm:my-2">
          <div className="font-['Cinzel',serif] font-bold text-[#755931] text-[9.5px] sm:text-[10px] uppercase tracking-wider mb-0.5">
            Summary of Contents
          </div>
          <p className="font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] leading-relaxed">
            This volume details {TOTAL_SERVICES} foundational chapters exploring cyber threat awareness, threat-related information, scam prevention, digital safety guidance, victim-oriented guidance, and research.
          </p>
        </div>

        <div className="flex items-center justify-between text-[9px] sm:text-[10px] md:text-[10.5px] text-[#7d674f] font-['Cinzel',serif] pt-1.5 sm:pt-2 border-t border-[#d8cbb0]">
          <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#8a7251]">Preface</span>
          <span className="font-bold text-[#8c6d37]">Page 1 / {totalPages}</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="w-full h-full p-4 sm:p-6 flex flex-col items-center justify-center bg-[#fbf8ef] text-stone-600 select-none">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] font-['Cinzel',serif] text-[#8c6d37] font-bold mb-2">
            Volume 01 Complete
          </div>
          <div className="w-10 h-[1px] bg-[#ccb88f] mx-auto my-2" />
          <p className="text-xs italic font-['Cormorant_Garamond',serif] text-stone-500">
            End of {totalServices} Chapters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full px-4 py-3.5 sm:px-6 sm:py-5 md:px-7 md:py-6 flex flex-col justify-between select-none text-slate-900 bg-[#fbf8ef] overflow-hidden ${
        isLeftPage ? 'rounded-l-[4px]' : 'rounded-r-[4px]'
      }`}
      style={{
        boxShadow: isLeftPage
          ? 'inset -15px 0 20px -10px rgba(0,0,0,0.1)'
          : 'inset 15px 0 20px -10px rgba(0,0,0,0.1)',
      }}
    >
      <div className="absolute inset-2 sm:inset-3 md:inset-3.5 border border-[#d6c7a1] rounded pointer-events-none" />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between pb-1 sm:pb-1.5 border-b border-[#d8cbb0] shrink-0">
          <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] font-['Cinzel',serif] text-[#8c6d37] font-bold">
            Chapter {String(service.id).padStart(2, '0')} / {totalServices}
          </span>

          {onBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(service.id);
              }}
              className="p-1 rounded text-[#7d674f] hover:text-[#2a1d12] transition-colors"
              title="Bookmark Chapter"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
              )}
            </button>
          )}
        </div>

        <h3 className="text-[13.5px] sm:text-[15px] md:text-[16px] font-serif text-[#1e1309] font-['Cinzel',serif] font-bold tracking-tight mt-1.5 sm:mt-2 leading-snug shrink-0">
          {service.title}
        </h3>

        {service.subtitle && (
          <p className="mt-1 text-[10.5px] sm:text-[11px] md:text-[11.5px] text-[#6b553e] italic font-['Cormorant_Garamond',serif] leading-tight border-l-2 border-[#b59e74] pl-2 shrink-0">
            "{service.subtitle}"
          </p>
        )}

        <div className="my-1.5 sm:my-2 md:my-2.5 flex items-center justify-center gap-2 text-[#9b8054] shrink-0">
          <div className="w-8 sm:w-9 h-[1px] bg-[#ccb88f]" />
          <span className="text-[9px] sm:text-[10px]">✦</span>
          <div className="w-8 sm:w-9 h-[1px] bg-[#ccb88f]" />
        </div>

        <div className="flex-1 overflow-y-auto custom-parchment-scroll pr-1 text-[11px] sm:text-[12px] md:text-[12.5px] text-[#2b2118] font-['Cormorant_Garamond',serif] leading-[1.45] sm:leading-[1.5] text-justify">
          <span className="float-left text-2xl sm:text-3xl font-['Cinzel',serif] text-[#8c6d37] font-bold mr-1.5 sm:mr-2 mt-[-2px] leading-none">
            {service.description.charAt(0)}
          </span>
          {service.description.slice(1)}
        </div>
      </div>

      <div className="pt-1.5 sm:pt-2 border-t border-[#d8cbb0] flex items-center justify-between text-[9px] sm:text-[10px] md:text-[10.5px] text-[#7d674f] font-['Cinzel',serif] shrink-0">
        <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#8a7251]">
          CR Threat Intel • Part {String(service.id).padStart(2, '0')}
        </span>
        <span className="font-bold text-[#8c6d37]">
          Pg. {pageNumber} / {totalPages}
        </span>
      </div>
    </div>
  );
}


/**
 * Main FlipBook3D Component
 * Ultra-clean, distraction-free view with ONLY Next / Prev buttons and center page counter below the book
 */
export default function WhatWeDoPage() {
  const [currentSheet, setCurrentSheet] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippingSheetIndex, setFlippingSheetIndex] = useState(null);
  const [bookmarkedPages, setBookmarkedPages] = useState(new Set([1, 4, 12]));

  // Bookmark toggle
  const toggleBookmark = useCallback((serviceId) => {
    audio.playBookmarkChime();
    setBookmarkedPages(prev => {
      const next = new Set(prev);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
  }, []);

  // Map 60 demo chapters into flippable sheets
  const sheets = useMemo(() => {
    const list = [];

    // Sheet 0: Cover
    list.push({
      type: 'cover',
      id: 0,
    });

    // Sheet 1: Preface & Chapter 1
    list.push({
      type: 'content',
      id: 1,
      front: { isTitlePage: true, pageNum: 1 },
      back: { service: BOOK_DEMO_CONTENT[0], pageNum: 2 },
    });

    // Pair remaining 59 chapters across sheets
    let pageCounter = 3;
    for (let i = 1; i < BOOK_DEMO_CONTENT.length; i += 2) {
      list.push({
        type: 'content',
        id: list.length,
        front: { service: BOOK_DEMO_CONTENT[i], pageNum: pageCounter++ },
        back: BOOK_DEMO_CONTENT[i + 1]
          ? { service: BOOK_DEMO_CONTENT[i + 1], pageNum: pageCounter++ }
          : null,
      });
    }

    return list;
  }, []);

  const totalSheets = sheets.length;
  const isBookOpen = currentSheet > 0;

  // Responsive mobile/tablet screen detection (< 768px for portrait tablets & smartphones)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Mobile single page state (0 = Cover, 1 = Page 1, 2 = Page 2, ..., 51 = Page 51)
  const [mobilePage, setMobilePage] = useState(0);
  // mobileFlip: null | { from: number, to: number, direction: 'next' | 'prev', isFlipped: boolean }
  const [mobileFlip, setMobileFlip] = useState(null);
  const isMobileFlipping = mobileFlip !== null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open book from closed cover (Desktop)
  const handleOpenBook = useCallback(() => {
    if (isFlipping) return;
    audio.playCoverThud();
    setIsFlipping(true);
    setFlippingSheetIndex(0);
    setCurrentSheet(1);
    setMobilePage(1);
    setTimeout(() => {
      setIsFlipping(false);
      setFlippingSheetIndex(null);
    }, 1100);
  }, [isFlipping]);

  // Flip to Next Page (Desktop)
  const handleNextPage = useCallback(() => {
    if (isFlipping || currentSheet >= totalSheets) return;
    audio.playPageFlip();
    setIsFlipping(true);
    setFlippingSheetIndex(currentSheet);
    setCurrentSheet(s => {
      const next = s + 1;
      setMobilePage(next === 0 ? 0 : (next - 1) * 2);
      return next;
    });
    setTimeout(() => {
      setIsFlipping(false);
      setFlippingSheetIndex(null);
    }, 1000);
  }, [currentSheet, totalSheets, isFlipping]);

  // Flip to Prev Page (Desktop)
  const handlePrevPage = useCallback(() => {
    if (isFlipping || currentSheet <= 0) return;
    if (currentSheet === 1) {
      audio.playCoverThud();
    } else {
      audio.playPageFlip();
    }
    setIsFlipping(true);
    setFlippingSheetIndex(currentSheet - 1);
    setCurrentSheet(s => {
      const prev = s - 1;
      setMobilePage(prev <= 0 ? 0 : (prev - 1) * 2 + 1);
      return prev;
    });
    setTimeout(() => {
      setIsFlipping(false);
      setFlippingSheetIndex(null);
    }, 1000);
  }, [currentSheet, isFlipping]);

  // Close book directly back to Cover (Desktop)
  const handleCloseBook = useCallback(() => {
    if (isFlipping || currentSheet === 0) return;
    audio.playCoverThud();
    setIsFlipping(true);
    setCurrentSheet(0);
    setMobilePage(0);
    setTimeout(() => {
      setIsFlipping(false);
      setFlippingSheetIndex(null);
    }, 1100);
  }, [isFlipping, currentSheet]);

  // Jump directly to specific sheet (Desktop)
  const jumpToSheet = useCallback((targetSheet) => {
    if (isFlipping || targetSheet === currentSheet) return;
    if (targetSheet === 0) {
      handleCloseBook();
      return;
    }
    audio.playPageFlip();
    setIsFlipping(true);
    setCurrentSheet(targetSheet);
    setMobilePage((targetSheet - 1) * 2);
    setTimeout(() => {
      setIsFlipping(false);
      setFlippingSheetIndex(null);
    }, 1000);
  }, [isFlipping, currentSheet, handleCloseBook]);

  // Handle direct page jump from dropdown (Desktop)
  const handleDropdownChange = useCallback((e) => {
    const target = Number(e.target.value);
    if (target === 0) {
      handleCloseBook();
    } else {
      jumpToSheet(target);
    }
  }, [handleCloseBook, jumpToSheet]);

  // Render Mobile Page Content
  const renderMobilePageContent = useCallback((pageNum) => {
    if (pageNum === 0) {
      return <PureCssBookCover isClosed={true} />;
    }
    if (pageNum === 1) {
      return (
        <ParchmentPage
          pageNumber={1}
          isTitlePage={true}
          totalPages={TOTAL_PAGES}
          totalServices={TOTAL_SERVICES}
          isLeftPage={false}
          onBookmark={toggleBookmark}
          isBookmarked={false}
        />
      );
    }
    if (pageNum >= 2 && pageNum <= TOTAL_PAGES) {
      const service = BOOK_DEMO_CONTENT[pageNum - 2];
      return (
        <ParchmentPage
          pageNumber={pageNum}
          service={service}
          totalPages={TOTAL_PAGES}
          totalServices={TOTAL_SERVICES}
          isLeftPage={false}
          onBookmark={toggleBookmark}
          isBookmarked={service ? bookmarkedPages.has(service.id) : false}
        />
      );
    }
    return (
      <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-[#fbf8ef] text-stone-600 select-none">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] font-['Cinzel',serif] text-[#8c6d37] font-bold mb-2">
            Volume 01 Complete
          </div>
          <div className="w-10 h-[1px] bg-[#ccb88f] mx-auto my-2" />
          <p className="text-xs italic font-['Cormorant_Garamond',serif] text-stone-500">
            End of {TOTAL_SERVICES} Chapters
          </p>
        </div>
      </div>
    );
  }, [toggleBookmark, bookmarkedPages]);

  // Mobile Handlers with Real 3D Book Open & 3D Backward Page Fold Animation
  const handleMobileNext = useCallback(() => {
    if (mobileFlip || mobilePage >= TOTAL_PAGES) return;
    const from = mobilePage;
    const to = mobilePage + 1;

    if (from === 0) {
      audio.playCoverThud();
    } else {
      audio.playPageFlip();
    }

    setMobileFlip({ from, to, direction: 'next' });

    setTimeout(() => {
      setMobilePage(to);
      setCurrentSheet(Math.ceil(to / 2));
      setMobileFlip(null);
    }, 700);
  }, [mobileFlip, mobilePage]);

  const handleMobilePrev = useCallback(() => {
    if (mobileFlip || mobilePage <= 0) return;
    const from = mobilePage;
    const to = mobilePage - 1;

    if (to === 0) {
      audio.playCoverThud();
    } else {
      audio.playPageFlip();
    }

    setMobileFlip({ from, to, direction: 'prev' });

    setTimeout(() => {
      setMobilePage(to);
      setCurrentSheet(to === 0 ? 0 : Math.ceil(to / 2));
      setMobileFlip(null);
    }, 700);
  }, [mobileFlip, mobilePage]);

  const handleMobileOpenBook = useCallback(() => {
    if (mobileFlip) return;
    handleMobileNext();
  }, [mobileFlip, handleMobileNext]);

  const handleMobileDropdownChange = useCallback((e) => {
    const targetPage = Number(e.target.value);
    if (mobileFlip || targetPage === mobilePage) return;
    const from = mobilePage;
    const to = targetPage;
    const direction = to > from ? 'next' : 'prev';

    if (to === 0 || from === 0) {
      audio.playCoverThud();
    } else {
      audio.playPageFlip();
    }

    setMobileFlip({ from, to, direction });

    setTimeout(() => {
      setMobilePage(to);
      setCurrentSheet(to === 0 ? 0 : Math.ceil(to / 2));
      setMobileFlip(null);
    }, 700);
  }, [mobileFlip, mobilePage]);


  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (isMobile) {
          if (mobilePage === 0) handleMobileOpenBook();
          else handleMobileNext();
        } else {
          if (!isBookOpen) handleOpenBook();
          else handleNextPage();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (isMobile) {
          handleMobilePrev();
        } else if (isBookOpen) {
          handlePrevPage();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, mobilePage, isBookOpen, handleMobileOpenBook, handleMobileNext, handleMobilePrev, handleOpenBook, handleNextPage, handlePrevPage]);

  // Touch swipe handling for phones and tablets
  const touchStartXRef = React.useRef(null);
  const touchStartYRef = React.useRef(null);

  const handleTouchStart = useCallback((e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    if (e.changedTouches && e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

      // Only swipe if horizontal movement is dominant and > 38px
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 38) {
        if (deltaX < 0) {
          // Swiped Left -> Go Next
          if (isMobile) {
            if (mobilePage === 0) handleMobileOpenBook();
            else handleMobileNext();
          } else {
            if (!isBookOpen) handleOpenBook();
            else handleNextPage();
          }
        } else {
          // Swiped Right -> Go Prev
          if (isMobile) {
            handleMobilePrev();
          } else {
            handlePrevPage();
          }
        }
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  }, [isMobile, mobilePage, isBookOpen, handleMobileOpenBook, handleMobileNext, handleMobilePrev, handleOpenBook, handleNextPage, handlePrevPage]);

  return (
    <div className="relative min-h-screen w-full what-we-do-environment text-slate-800 flex flex-col items-center justify-start py-4 px-2 sm:py-6 sm:px-4 md:px-6 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-900 bg-transparent">
      {/* Light subtle studio aura without blocking background watermark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-amber-100/30 via-transparent to-transparent rounded-full blur-[100px]" />
      </div>

      {/* NavPageHeader with unified design */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20 mb-2 sm:mb-4">
        <NavPageHeader
          title="What We Do"
          description="A comprehensive 50-part specification outlining cyber threat awareness, threat-related information, scam prevention, digital safety guidance, victim-oriented general guidance, and research."
        />
      </div>

      {/* Main 3D Book Stage (Centered) */}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {isMobile ? (
          /* ======================================================== */
          /* MOBILE SINGLE PAGE 3D FLIP STAGE (Phone Only: < 640px)  */
          /* ======================================================== */
          <div
            className="flex flex-col items-center justify-center select-none w-full"
            style={{
              perspective: '1800px',
              perspectiveOrigin: '50% 50%',
            }}
          >
          <div
            className="relative"
            style={{
              width: 'min(360px, calc(100vw - 28px), calc((100vh - 190px) * 0.692))',
              height: 'min(530px, calc(100vh - 190px), calc((100vw - 28px) * 1.45))',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 1. BASE LAYER (Underlying Page: revealed when leaf lifts) */}
            <div
              onClick={() => {
                if (mobilePage === 0 && !mobileFlip) handleMobileOpenBook();
              }}
              className={`absolute inset-0 w-full h-full rounded-r-[6px] overflow-hidden ${
                mobilePage === 0 && !mobileFlip ? 'cursor-pointer' : ''
              }`}
              style={{
                transform: 'translateZ(0px)',
                zIndex: 20,
                boxShadow:
                  mobilePage === 0 && !mobileFlip
                    ? '0 20px 45px -10px rgba(12, 21, 36, 0.45), 0 0 0 1px rgba(0,0,0,0.1)'
                    : '0 16px 36px -8px rgba(28, 19, 11, 0.25), 0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor:
                  (mobileFlip
                    ? mobileFlip.direction === 'next'
                      ? mobileFlip.to
                      : mobileFlip.from
                    : mobilePage) === 0
                    ? '#0c1524'
                    : '#fbf8ef',
              }}
            >
              {/* Left Spine Crease Shadow */}
              <div
                className="absolute top-0 bottom-0 left-0 w-4 pointer-events-none z-20"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
                }}
              />

              {/* Render the underlying page */}
              {mobileFlip
                ? mobileFlip.direction === 'next'
                  ? renderMobilePageContent(mobileFlip.to)
                  : renderMobilePageContent(mobileFlip.from)
                : renderMobilePageContent(mobilePage)}

              {/* Shadow on base page that fades away as top leaf lifts */}
              {mobileFlip && mobileFlip.direction === 'next' && (
                <div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                    animation: 'mobileBaseShadow 700ms ease-out forwards',
                  }}
                />
              )}
            </div>

            {/* 2. 3D FLIPPING LEAF (The Turning Page / Opening Cover - Folds backward behind book) */}
            {mobileFlip && (
              <div
                key={`${mobileFlip.from}-${mobileFlip.to}-${mobileFlip.direction}`}
                className="absolute inset-0 w-full h-full rounded-r-[6px]"
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  animation:
                    mobileFlip.direction === 'next'
                      ? 'mobilePageFoldNext 700ms cubic-bezier(0.25, 1, 0.5, 1) forwards'
                      : 'mobilePageFoldPrev 700ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
                  willChange: 'transform, opacity',
                  pointerEvents: 'none',
                }}
              >
                {/* FRONT FACE OF FLIPPING LEAF */}
                <div
                  className="absolute inset-0 w-full h-full rounded-r-[6px] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    backgroundColor:
                      (mobileFlip.direction === 'next' ? mobileFlip.from : mobileFlip.to) === 0
                        ? '#0c1524'
                        : '#fbf8ef',
                    boxShadow: 'inset 12px 0 16px -8px rgba(0,0,0,0.15), 3px 0 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 w-4 pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 100%)',
                    }}
                  />
                  {mobileFlip.direction === 'next'
                    ? renderMobilePageContent(mobileFlip.from)
                    : renderMobilePageContent(mobileFlip.to)}
                </div>

                {/* BACK FACE OF FLIPPING LEAF (Visible when folded past 90deg) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-l-[6px] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor:
                      (mobileFlip.direction === 'next' ? mobileFlip.from : mobileFlip.to) === 0
                        ? '#0c1524'
                        : '#fbf8ef',
                    boxShadow: 'inset -12px 0 16px -8px rgba(0,0,0,0.15), -3px 0 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* If flipping the cover, back is the inside cover endpaper! */}
                  {(mobileFlip.direction === 'next' ? mobileFlip.from : mobileFlip.to) === 0 ? (
                    <InsideCoverEndpaper />
                  ) : (
                    /* Elegant textured parchment back */
                    <div className="relative w-full h-full p-6 flex flex-col justify-between bg-[#fbf8ef] text-slate-800">
                      <div className="absolute inset-3 border border-[#d6c7a1] rounded pointer-events-none" />
                      <div className="text-center pt-8 opacity-40">
                        <div className="text-xs uppercase tracking-[0.2em] font-['Cinzel',serif] text-[#8c6d37]">
                          {BOOK_OVERVIEW.title || "CR Cyber Threat Intelligence"}
                        </div>
                      </div>
                      <div className="text-center text-[10px] text-[#8c6d37] font-['Cinzel',serif] opacity-40">
                        ✦
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* DESKTOP 3D TWO-PAGE SPREAD STAGE (Desktop Only: >= 640px) */
        /* ======================================================== */
        <div
          className="relative select-none flex items-center justify-center"
          style={{
            perspective: '2200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* The 3D Book Assembly (Fully responsive width & height for all desktop, laptop, and tablet displays) */}
          <div
            className="relative transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: 'min(360px, calc((100vw - 64px) / 2), calc((100vh - 190px) * 0.692))',
              height: 'min(520px, calc(100vh - 190px), calc(((100vw - 64px) / 2) / 0.692))',
              transformStyle: 'preserve-3d',
              transform: !isBookOpen
                ? 'translateX(0px) rotateY(0deg) rotateX(0deg)'
                : 'translateX(calc(min(360px, calc((100vw - 64px) / 2), calc((100vh - 190px) * 0.692)) / 2)) rotateY(0deg) rotateX(0deg)',
            }}
          >
            {/* Left Cover Base (Visible when open) */}
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-l-[4px] bg-[#0c1524] border border-amber-600/30 transition-all duration-700 pointer-events-none z-0 ${
                isBookOpen && (!isFlipping || flippingSheetIndex !== 0)
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              style={{
                transformOrigin: 'left center',
                transform: 'rotateY(-180deg)',
                boxShadow: '-15px 25px 45px rgba(15, 23, 42, 0.2), -5px 10px 15px rgba(15, 23, 42, 0.12)',
              }}
            >
              <div
                className="absolute top-1 bottom-1 right-0 rounded-l"
                style={{
                  width: `${Math.min(currentSheet * 2 + 4, 26)}px`,
                  background: 'repeating-linear-gradient(to right, #cfc5a4 0px, #faf6ee 1px, #c2b793 2px, #b2a67e 3px)',
                  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* Right Cover Base & Remaining Pages Stack */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-r-[4px] bg-[#0c1524] pointer-events-none transition-all duration-700"
              style={{
                boxShadow: isBookOpen
                  ? '15px 25px 45px rgba(15, 23, 42, 0.2), 5px 10px 15px rgba(15, 23, 42, 0.12)'
                  : '0 25px 50px -12px rgba(15, 23, 42, 0.35), 0 12px 24px -8px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(0,0,0,0.1)',
              }}
            >
              <div
                className="absolute top-1 bottom-1 right-0 rounded-r"
                style={{
                  width: `${Math.max((totalSheets - currentSheet) * 2 + 4, 6)}px`,
                  background: 'repeating-linear-gradient(to right, #cfc5a4 0px, #faf6ee 1px, #c2b793 2px, #b2a67e 3px)',
                  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* 3D FLIPPABLE SHEETS (LEAVES) */}
            {sheets.map((sheet, index) => {
              const isFlipped = index < currentSheet;
              const isCurrentlyFlipping = index === flippingSheetIndex;

              let zIndex = isFlipped ? index + 5 : totalSheets - index;
              if (isCurrentlyFlipping) zIndex = totalSheets + 20;

              return (
                <div
                  key={sheet.id}
                  onClick={() => {
                    if (!isBookOpen) {
                      handleOpenBook();
                    } else {
                      handleCloseBook();
                    }
                  }}
                  title={!isBookOpen ? 'Click to open book' : 'Click to close book'}
                  className={`group absolute top-0 left-0 w-full h-full cursor-pointer rounded-r-[4px] transition-transform ${isCurrentlyFlipping ? 'duration-1000' : 'duration-1000'
                    } ease-[cubic-bezier(0.25,1,0.5,1)]`}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    zIndex: zIndex,
                  }}
                >
                  {/* FRONT SIDE OF SHEET */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-r-[4px] overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                      backgroundColor: sheet.type === 'cover' ? '#0c1524' : '#fbf8ef',
                      boxShadow: isFlipped
                        ? 'none'
                        : 'inset 12px 0 16px -8px rgba(0,0,0,0.12), 2px 0 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    {sheet.type === 'cover' ? (
                      <PureCssBookCover isClosed={!isBookOpen} />
                    ) : (
                      <ParchmentPage
                        pageNumber={sheet.front?.pageNum}
                        service={sheet.front?.service}
                        isTitlePage={sheet.front?.isTitlePage}
                        isLeftPage={false}
                        totalPages={TOTAL_PAGES}
                        totalServices={TOTAL_SERVICES}
                        onBookmark={toggleBookmark}
                        isBookmarked={sheet.front?.service && bookmarkedPages.has(sheet.front.service.id)}
                      />
                    )}

                    {/* Page shadow during flip */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 60%)',
                        opacity: isCurrentlyFlipping && isFlipped ? 0.35 : 0,
                      }}
                    />
                  </div>

                  {/* BACK SIDE OF SHEET (Revealed on Left when flipped) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-l-[4px] overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      backgroundColor: sheet.type === 'cover' ? '#0c1524' : '#fbf8ef',
                      boxShadow: isFlipped
                        ? 'inset -12px 0 16px -8px rgba(0,0,0,0.12), -2px 0 6px rgba(0,0,0,0.08)'
                        : 'none',
                    }}
                  >
                    {sheet.type === 'cover' ? (
                      <InsideCoverEndpaper />
                    ) : (
                      <ParchmentPage
                        pageNumber={sheet.back?.pageNum}
                        service={sheet.back?.service}
                        isLeftPage={true}
                        totalPages={TOTAL_PAGES}
                        totalServices={TOTAL_SERVICES}
                        onBookmark={toggleBookmark}
                        isBookmarked={sheet.back?.service && bookmarkedPages.has(sheet.back.service.id)}
                      />
                    )}

                    {/* Page shadow during flip */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, transparent 60%)',
                        opacity: isCurrentlyFlipping && !isFlipped ? 0.35 : 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Realistic Central Book Gutter Crease Shadow */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-8 -translate-x-4 pointer-events-none z-30 transition-opacity duration-700 ${
                isBookOpen && (!isFlipping || flippingSheetIndex !== 0)
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.03) 25%, transparent 45%, transparent 55%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.18) 100%)',
              }}
            />
          </div>
        </div>
      )}

        {/* ======================================================== */}
        {/* ONLY PREV, PAGE NUMBERS IN CENTER, AND NEXT BUTTON */}
        {/* ======================================================== */}
        <div className="mt-3 sm:mt-4 md:mt-5 w-full max-w-[360px] sm:max-w-md md:max-w-none px-2 sm:px-4 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 md:gap-6">
          {/* Prev Button */}
          <button
            onClick={isMobile ? handleMobilePrev : handlePrevPage}
            disabled={isMobile ? (mobilePage === 0 || isMobileFlipping) : (currentSheet === 0 || isFlipping)}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-['Cinzel',serif] tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 border transition-all shrink-0 min-h-[40px] touch-manipulation ${
              (isMobile ? mobilePage === 0 : currentSheet === 0)
                ? 'opacity-35 cursor-not-allowed border-stone-200 text-stone-400 bg-white/60'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 hover:border-amber-500 shadow-sm hover:shadow active:scale-95'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
            <span>Prev</span>
          </button>

          {/* Direct Page Jump Dropdown in Centre (Only Page Numbers) */}
          <div className="relative inline-flex items-center flex-1 sm:flex-initial min-w-0 sm:min-w-[195px] max-w-[210px] sm:max-w-none">
            {isMobile ? (
              <select
                id="book-mobile-page-jump-select"
                value={mobilePage}
                onChange={handleMobileDropdownChange}
                disabled={isMobileFlipping}
                className="w-full appearance-none cursor-pointer bg-white hover:bg-stone-50 border border-stone-300 hover:border-amber-600/70 focus:border-amber-600 rounded-full py-2 sm:py-2.5 pl-3 pr-8 text-[11px] sm:text-xs font-['Cinzel',serif] font-bold text-stone-800 shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all text-center truncate disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] touch-manipulation"
                title="Select page to jump directly"
              >
                <option value={0}>Cover (0 / {TOTAL_PAGES})</option>
                <option value={1}>Page 1 / {TOTAL_PAGES}</option>
                {Array.from({ length: TOTAL_SERVICES }, (_, idx) => {
                  const pNum = idx + 2;
                  return (
                    <option key={pNum} value={pNum}>
                      Page {pNum} / {TOTAL_PAGES}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                id="book-page-jump-select"
                value={currentSheet}
                onChange={handleDropdownChange}
                disabled={isFlipping}
                className="appearance-none cursor-pointer bg-white hover:bg-stone-50 border border-stone-300 hover:border-amber-600/70 focus:border-amber-600 rounded-full py-2.5 pl-5 pr-9 text-xs sm:text-[13px] font-['Cinzel',serif] font-bold text-stone-800 shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all min-w-[170px] sm:min-w-[195px] text-center disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] touch-manipulation"
                title="Select page to jump directly"
              >
                <option value={0}>Cover (0 / {TOTAL_PAGES})</option>
                <option value={1}>Page 1 / {TOTAL_PAGES}</option>
                {sheets.slice(2).map((s, idx) => {
                  const sheetIdx = idx + 2;
                  const pLeft = (sheetIdx - 1) * 2;
                  const pRight = (sheetIdx - 1) * 2 + 1;
                  const label = pRight <= TOTAL_PAGES ? `Page ${pLeft} - ${pRight} / ${TOTAL_PAGES}` : `Page ${pLeft} / ${TOTAL_PAGES}`;
                  return (
                    <option key={sheetIdx} value={sheetIdx}>
                      {label}
                    </option>
                  );
                })}
                <option value={totalSheets}>End of Volume ({TOTAL_PAGES} / {TOTAL_PAGES})</option>
              </select>
            )}
            <div className="pointer-events-none absolute right-2.5 sm:right-3.5 flex items-center text-amber-700">
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              if (isMobile) {
                if (mobilePage === 0) handleMobileOpenBook();
                else handleMobileNext();
              } else {
                if (!isBookOpen) handleOpenBook();
                else handleNextPage();
              }
            }}
            disabled={isMobile ? (mobilePage >= TOTAL_PAGES || isMobileFlipping) : (currentSheet >= totalSheets || isFlipping)}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-['Cinzel',serif] tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 border transition-all shrink-0 min-h-[40px] touch-manipulation ${
              (isMobile ? mobilePage >= TOTAL_PAGES : currentSheet >= totalSheets)
                ? 'opacity-35 cursor-not-allowed border-stone-200 text-stone-400 bg-white/60'
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-amber-400 font-bold shadow-md shadow-amber-600/20 hover:shadow-lg active:scale-95'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>

      <style>{`
        .what-we-do-environment {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: transparent !important;
        }
        .watermark-bg:has(.what-we-do-environment) {
          background-color: #f8fafc !important;
        }
        .watermark-bg:has(.what-we-do-environment)::before {
          opacity: 0.18 !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
}

export { WhatWeDoPage, WhatWeDoPage as FlipBook3D };
