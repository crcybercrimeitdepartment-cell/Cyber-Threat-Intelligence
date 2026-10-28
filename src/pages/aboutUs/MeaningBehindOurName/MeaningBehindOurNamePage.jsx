import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Sparkles, RotateCcw, ChevronRight, ChevronLeft, Feather, 
  BookOpen 
} from 'lucide-react';
import NavPageHeader from '../../../components/NavPageHeader';
import {
  wireThemes,
  notebookConfig,
  loopPositions,
  journalData,
  bookplateData,
  bookChapters,
  meaningPagesData,
} from './MeaningBehindOurNamePageData.js';

/* ========================================================
   EMBEDDED STYLES & GOOGLE FONTS FOR HANDWRITTEN NOTEBOOK
   ======================================================== */
const EmbeddedStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&display=swap');
    
    @keyframes pulseGlow {
      0%, 100% {
        opacity: 0.6;
        transform: translateY(0px) scale(1);
      }
      50% {
        opacity: 1;
        transform: translateY(-3px) scale(1.02);
      }
    }
    .animate-pulse-glow {
      animation: pulseGlow 2.4s ease-in-out infinite;
    }
  `}</style>
);

/* ========================================================
   1. FLORAL TEACUP ILLUSTRATION COMPONENT
   ======================================================== */
function FloralTeacupIllustration({ 
  mode = 'vector', // 'vector' | 'authentic' | 'hybrid'
  cupColor = '#8BAFB2',
  isHovered = false,
  className = '',
  size = 280
}) {
  const [, setAnimating] = useState(false);

  return (
    <div 
      className={`relative select-none flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-[1.02]' : ''} ${className}`}
      style={{ width: size, height: size * 0.96 }}
      onMouseEnter={() => setAnimating(true)}
      onAnimationEnd={() => setAnimating(false)}
    >
      {/* AUTHENTIC MODE: High-res cutout from reference */}
      {(mode === 'authentic' || mode === 'hybrid') && (
        <img 
          src="/teacup_floral_art.png" 
          alt="Hand-painted floral teacup"
          className={`w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
            mode === 'hybrid' ? 'opacity-85 mix-blend-multiply' : 'opacity-100'
          }`}
          onError={(e) => {
            // Fallback to SVG if image not found
            e.currentTarget.style.display = 'none';
          }}
        />
      )}

      {/* VECTOR SVG MODE: Scalable hand-drawn vector art */}
      {(mode === 'vector' || mode === 'hybrid') && (
        <svg
          viewBox="0 0 320 300"
          className={`w-full h-full overflow-visible ${mode === 'hybrid' ? 'absolute inset-0 opacity-40' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="soft-watercolor" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={cupColor} stopOpacity="0.9" />
              <stop offset="35%" stopColor={cupColor} stopOpacity="1" />
              <stop offset="70%" stopColor={cupColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={cupColor} stopOpacity="0.85" />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* BOTANICALS & FOLIAGE */}
          <g id="foliage-back" className="transition-transform duration-700 ease-out origin-bottom">
            <g stroke="#718664" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <path d="M 105 138 C 100 120 95 105 108 90" />
              <circle cx="107" cy="91" r="2.2" fill="#718664" />
              <circle cx="102" cy="104" r="2.4" fill="#7E9472" />
              <circle cx="98" cy="116" r="2.6" fill="#718664" />
              <circle cx="106" cy="126" r="2.5" fill="#7E9472" />

              <path d="M 148 115 C 145 95 142 85 146 72" />
              <circle cx="146" cy="73" r="2" fill="#849977" />
              <circle cx="143" cy="85" r="2.2" fill="#7E9472" />
              <circle cx="147" cy="97" r="2.5" fill="#718664" />
            </g>

            <g>
              <path d="M 132 120 C 134 100 135 88 138 78" stroke="#5D8832" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <ellipse cx="138" cy="76" rx="2.8" ry="4.2" transform="rotate(15 138 76)" fill="#DF6C8F" />

              <path d="M 160 115 C 160 96 162 84 165 74" stroke="#5D8832" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <ellipse cx="166" cy="72" rx="2.5" ry="4" transform="rotate(20 166 72)" fill="#DF6C8F" />

              <path d="M 153 105 C 154 92 153 82 153 77" stroke="#68933A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="153" cy="76" r="2.2" fill="#E887A5" />
            </g>

            <g fill="#5F8B2F">
              <path d="M 105 130 C 90 120 78 110 68 100" stroke="#487224" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M 67 100 C 65 92 73 85 82 89 C 85 96 78 102 67 100 Z" fill="#679532" />
              <path d="M 75 110 C 66 108 67 120 78 120 C 82 116 80 112 75 110 Z" fill="#5A832A" />
              <path d="M 88 118 C 90 108 99 107 103 115 C 101 122 93 123 88 118 Z" fill="#719F37" />
            </g>

            <path 
              d="M 183 125 C 182 105 180 88 184 75 C 187 88 188 105 186 125 Z" 
              fill="#4A7522" 
            />

            <g>
              <path d="M 215 125 C 225 110 236 96 252 87" stroke="#4B7724" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M 252 87 C 257 88 262 82 258 75 C 251 77 248 83 252 87 Z" fill="#5F8B2F" />
              <path d="M 245 92 C 242 86 248 78 255 83 C 257 89 251 94 245 92 Z" fill="#6C9A36" />
              <path d="M 233 103 C 227 96 235 91 242 97 C 243 103 238 106 233 103 Z" fill="#557D28" />
              <path d="M 235 120 C 241 113 247 110 250 110" stroke="#718664" strokeWidth="1.2" fill="none" />
              <circle cx="251" cy="109" r="2.2" fill="#E67D9C" />
            </g>
          </g>

          {/* BLOOMING FLOWERS */}
          <g id="flowers" className="transition-transform duration-500 ease-out origin-center">
            {/* 1. Blush Pink Blossom */}
            <g id="flower-blush-left" transform="translate(125, 128)">
              <ellipse cx="-13" cy="-10" rx="9" ry="11" transform="rotate(-30 -13 -10)" fill="#E496AD" opacity="0.95" />
              <ellipse cx="6" cy="-14" rx="10" ry="11" transform="rotate(15 6 -14)" fill="#E8A4B8" opacity="0.95" />
              <ellipse cx="14" cy="2" rx="9" ry="10" transform="rotate(60 14 2)" fill="#DF8EAA" opacity="0.95" />
              <ellipse cx="-2" cy="11" rx="10" ry="9" transform="rotate(10 -2 11)" fill="#EAAAC0" opacity="0.95" />
              <ellipse cx="-15" cy="3" rx="9" ry="9" transform="rotate(-65 -15 3)" fill="#E092AB" opacity="0.95" />
              <circle cx="-1" cy="-1" r="3.5" fill="#FDF3E5" opacity="0.8" />
              <circle cx="-0.5" cy="-0.5" r="1.5" fill="#C96884" />
            </g>

            {/* 2. Peachy Coral Flower */}
            <g id="flower-coral" transform="translate(108, 145)">
              <ellipse cx="-8" cy="-6" rx="7" ry="8" transform="rotate(-20 -8 -6)" fill="#EEA286" />
              <ellipse cx="6" cy="-8" rx="8" ry="7" transform="rotate(20 6 -8)" fill="#F2AB91" />
              <ellipse cx="9" cy="4" rx="7" ry="8" transform="rotate(70 9 4)" fill="#E89679" />
              <ellipse cx="-4" cy="9" rx="8" ry="7" transform="rotate(10 -4 9)" fill="#EEA286" />
              <ellipse cx="-11" cy="2" rx="7" ry="8" transform="rotate(-60 -11 2)" fill="#E58F72" />
              <circle cx="1" cy="0" r="2.8" fill="#FFF5EE" opacity="0.9" />
              <circle cx="1.2" cy="0.2" r="1.2" fill="#BD5D3C" />
            </g>

            {/* 3. Fuchsia Blossom */}
            <g id="flower-fuchsia" transform="translate(133, 148)">
              <circle cx="-6" cy="-5" r="6" fill="#D9457B" />
              <circle cx="5" cy="-6" r="6.2" fill="#DE5287" />
              <circle cx="7" cy="4" r="5.8" fill="#CF3B71" />
              <circle cx="-2" cy="7" r="6" fill="#E25C8F" />
              <circle cx="-7" cy="2" r="5.5" fill="#C9356B" />
              <circle cx="0" cy="1" r="2.2" fill="#FFDFEC" />
            </g>

            {/* 4. Lavender Blossom */}
            <g id="flower-lavender" transform="translate(162, 142)">
              <ellipse cx="-8" cy="-8" rx="8" ry="9" transform="rotate(-25 -8 -8)" fill="#D9ACCB" />
              <ellipse cx="7" cy="-8" rx="9" ry="8" transform="rotate(25 7 -8)" fill="#E0B6D2" />
              <ellipse cx="10" cy="5" rx="8" ry="9" transform="rotate(75 10 5)" fill="#D29EC2" />
              <ellipse cx="-2" cy="10" rx="9" ry="8" transform="rotate(5 -2 10)" fill="#DEB3D1" />
              <ellipse cx="-11" cy="3" rx="8" ry="8" transform="rotate(-55 -11 3)" fill="#CF97BF" />
              <circle cx="0" cy="1" r="3" fill="#FFF8FC" opacity="0.9" />
              <circle cx="0" cy="1" r="1.4" fill="#9C5C88" />
            </g>

            {/* 5. Mauve Daisy */}
            <g id="flower-mauve" transform="translate(192, 138)">
              <ellipse cx="0" cy="-10" rx="4.8" ry="7.5" fill="#CB7694" />
              <ellipse cx="9" cy="-5" rx="4.8" ry="7.5" transform="rotate(50 9 -5)" fill="#D2809D" />
              <ellipse cx="9" cy="6" rx="4.8" ry="7.5" transform="rotate(110 9 6)" fill="#C66E8C" />
              <ellipse cx="0" cy="11" rx="4.8" ry="7.5" transform="rotate(180 0 11)" fill="#CB7694" />
              <ellipse cx="-9" cy="6" rx="4.8" ry="7.5" transform="rotate(240 -9 6)" fill="#D484A1" />
              <ellipse cx="-9" cy="-5" rx="4.8" ry="7.5" transform="rotate(300 -9 -5)" fill="#BF6583" />
              <circle cx="0" cy="0" r="4.2" fill="#7E2948" />
              <circle cx="0.5" cy="-0.5" r="1.8" fill="#FDEEF3" />
            </g>

            {/* 6. Cerise Blossom */}
            <g id="flower-cerise-accent" transform="translate(208, 150)">
              <circle cx="-4" cy="-4" r="5" fill="#D94077" />
              <circle cx="4" cy="-4" r="5.2" fill="#E24C83" />
              <circle cx="5" cy="3" r="4.8" fill="#D0356C" />
              <circle cx="-1" cy="6" r="5.2" fill="#DC477E" />
              <circle cx="-5" cy="2" r="4.5" fill="#C52B62" />
              <circle cx="0" cy="1" r="2" fill="#FFF" opacity="0.8" />
            </g>

            {/* 7. Violet-Pink Blossom */}
            <g id="flower-right-pink" transform="translate(228, 142)">
              <ellipse cx="-7" cy="-7" rx="8" ry="9" transform="rotate(-30 -7 -7)" fill="#C88CB7" />
              <ellipse cx="7" cy="-7" rx="9" ry="8" transform="rotate(30 7 -7)" fill="#D499C3" />
              <ellipse cx="8" cy="6" rx="8" ry="9" transform="rotate(80 8 6)" fill="#BF7FA5" />
              <ellipse cx="-3" cy="9" rx="9" ry="8" transform="rotate(5 -3 9)" fill="#D194C0" />
              <ellipse cx="-10" cy="2" rx="8" ry="8" transform="rotate(-60 -10 2)" fill="#BD7DAA" />
              <circle cx="0" cy="1" r="3.2" fill="#FFF4F9" opacity="0.9" />
              <circle cx="0" cy="1" r="1.4" fill="#8B4A76" />
            </g>
          </g>

          {/* CERAMIC TEACUP WITH STRIPES */}
          <g id="teacup" className="transition-colors duration-500">
            {/* Handle */}
            <path 
              d="M 235 152 C 265 152 268 185 240 188 C 236 188 232 186 228 185 C 238 180 252 178 252 166 C 252 158 244 156 235 156 Z" 
              fill={cupColor}
              opacity="0.95"
            />
            <path 
              d="M 233 154 C 262 153 264 182 236 186" 
              stroke={cupColor}
              strokeWidth="5.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />

            {/* Striped Cup Body */}
            <path d="M 98 152 C 140 154 185 154 228 152 C 231 152 232 158 228 159 C 185 160 140 160 98 158 C 95 158 95 152 98 152 Z" fill={cupColor} />
            <path d="M 103 166 C 145 168 180 168 223 166 C 226 166 227 172 223 173 C 180 174 145 174 103 172 C 100 172 100 166 103 166 Z" fill={cupColor} />
            <path d="M 110 180 C 145 182 175 182 215 180 C 218 180 219 186 215 187 C 175 188 145 188 110 186 C 107 186 107 180 110 180 Z" fill={cupColor} />
            <path d="M 116 194 C 148 196 172 196 208 194 C 211 194 212 200 208 201 C 172 202 148 202 116 200 C 113 200 113 194 116 194 Z" fill={cupColor} />
            <path d="M 123 208 C 148 210 170 210 200 208 C 203 208 204 214 200 215 C 170 216 148 216 123 214 C 120 214 120 208 123 208 Z" fill={cupColor} />
            <path d="M 132 222 C 150 223 168 223 190 222 C 193 222 193 227 190 228 C 168 229 150 229 132 228 C 129 228 129 222 132 222 Z" fill={cupColor} />
          </g>

          {/* TRAILING VINE & BLOSSOM */}
          <g id="bottom-vine" className="transition-transform duration-700 ease-out origin-center">
            <path d="M 106 238 C 135 233 175 228 245 227" stroke="#587C2B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M 124 238 C 126 245 133 246 137 241 C 135 235 128 235 124 238 Z" fill="#628B36" />
            <path d="M 143 234 C 144 241 151 242 155 237 C 153 231 146 231 143 234 Z" fill="#557A28" />
            <path d="M 172 230 C 175 236 182 236 186 231 C 183 225 176 226 172 230 Z" fill="#679434" />
            <path d="M 176 228 C 177 222 183 221 187 225 C 185 229 180 230 176 228 Z" fill="#587E29" />
            <path d="M 203 227 C 205 233 212 234 215 229 C 213 223 207 223 203 227 Z" fill="#5F8830" />
            <path d="M 230 227 C 232 232 238 232 241 228 C 239 223 234 224 230 227 Z" fill="#6E9A38" />

            <g id="bottom-pink-flower" transform="translate(125, 226)">
              <ellipse cx="-4" cy="-4" rx="4.5" ry="5.2" transform="rotate(-25 -4 -4)" fill="#DF99B2" />
              <ellipse cx="4" cy="-4" rx="5.2" ry="4.5" transform="rotate(25 4 -4)" fill="#E6A6BD" />
              <ellipse cx="5" cy="3" rx="4.5" ry="5.2" transform="rotate(75 5 3)" fill="#D78DA6" />
              <ellipse cx="-1" cy="5" rx="5.2" ry="4.5" transform="rotate(10 -1 5)" fill="#E19EB6" />
              <ellipse cx="-5" cy="1" rx="4.5" ry="4.5" transform="rotate(-60 -5 1)" fill="#D489A2" />
              <circle cx="0.5" cy="0.5" r="1.8" fill="#FFF5F9" />
              <circle cx="0.5" cy="0.5" r="0.8" fill="#B8567A" />
            </g>

            <g id="bottom-pink-bud" transform="translate(247, 227)">
              <ellipse cx="0" cy="0" rx="2.5" ry="4" transform="rotate(70 0 0)" fill="#DE5987" />
              <circle cx="-1.5" cy="0" r="1.5" fill="#789A42" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}

/* ========================================================
   2. FOUNTAIN PEN COMPONENT
   ======================================================== */
function FountainPen({
  x = 0,
  y = 0,
  angle = 38,
  visible = false,
  isWriting = false,
}) {
  if (!visible) return null;

  return (
    <div
      className="absolute pointer-events-none select-none z-[100]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        transform: `translate3d(-4px, ${isWriting ? '-4px' : visible ? '-10px' : '-22px'}, 60px) rotate(${angle}deg)`,
        transformOrigin: '4px 4px',
        transition: isWriting
          ? 'left 50ms cubic-bezier(0.2, 0.8, 0.2, 1), top 50ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 90ms ease-out, filter 150ms ease, opacity 250ms ease'
          : 'left 600ms cubic-bezier(0.25, 1, 0.35, 1), top 600ms cubic-bezier(0.25, 1, 0.35, 1), transform 400ms cubic-bezier(0.25, 1, 0.35, 1), filter 400ms ease, opacity 400ms ease',
        filter: isWriting
          ? 'drop-shadow(1.5px 2px 2px rgba(20, 15, 10, 0.45)) drop-shadow(8px 16px 14px rgba(25, 20, 15, 0.35))'
          : 'drop-shadow(3px 8px 6px rgba(20, 15, 10, 0.25)) drop-shadow(14px 24px 20px rgba(25, 20, 15, 0.22))',
      }}
    >
      <svg 
        width="145" 
        height="50" 
        viewBox="0 0 145 50" 
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="fpNibGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="25%" stopColor="#fff3bf" />
            <stop offset="55%" stopColor="#e5be42" />
            <stop offset="85%" stopColor="#996515" />
            <stop offset="100%" stopColor="#7a4e0a" />
          </linearGradient>

          <linearGradient id="fpNibSilver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="fpPenBarrel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a6f72" />
            <stop offset="20%" stopColor="#719ba0" />
            <stop offset="45%" stopColor="#3c595c" />
            <stop offset="85%" stopColor="#25383a" />
            <stop offset="100%" stopColor="#1a2729" />
          </linearGradient>

          <linearGradient id="fpGoldTrim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        <path d="M 4 4 L 14 0 L 16 8 Z" fill="#161514" />
        <path d="M 4 4 L 28 -7 C 32 -7 34 -5 36 -2 L 36 10 C 34 13 32 15 28 15 Z" fill="url(#fpNibGold)" stroke="#8c6214" strokeWidth="0.6" />
        <path d="M 12 4 L 28 -3 L 28 11 Z" fill="url(#fpNibSilver)" opacity="0.85" />
        <line x1="4" y1="4" x2="21" y2="4" stroke="#45310b" strokeWidth="0.75" />
        <circle cx="21" cy="4" r="1.3" fill="#362507" />
        <path d="M 16 1 Q 20 4 16 7" stroke="#9e731b" strokeWidth="0.6" fill="none" />
        <circle cx="4" cy="4" r="1.1" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.4" />
        {isWriting && (
          <circle cx="4.5" cy="4" r="0.9" fill="#1c1917" opacity="0.9" />
        )}

        <path d="M 36 -3 L 56 -5 L 56 13 L 36 11 Z" fill="#1f2224" stroke="#121415" strokeWidth="0.5" />
        <line x1="37" y1="-1" x2="55" y2="-2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="56" y="-6" width="3.5" height="20" rx="0.5" fill="url(#fpGoldTrim)" />
        <path d="M 59.5 -6 L 140 -9 C 143 -9 144 -7 144 -5 L 144 13 C 144 15 143 17 140 17 L 59.5 14 Z" fill="url(#fpPenBarrel)" />
        <path d="M 60 -3 L 140 -5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 60 -1 L 140 -3" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <rect x="76" y="-7" width="2" height="22" fill="url(#fpGoldTrim)" opacity="0.9" />
        <path d="M 140 -9 C 143 -9 145 -5 145 4 C 145 13 143 17 140 17 Z" fill="url(#fpGoldTrim)" />
      </svg>
    </div>
  );
}

/* ========================================================
   3. INSIDE COVER DIRECTORY (NESTED TABLE OF CONTENTS)
   ======================================================== */
function InsideCoverBookplate({
  pages = meaningPagesData,
  chapters = bookChapters,
  onSelectPage = () => {},
  cupColor = '#8BAFB2',
  onClose = () => {},
}) {
  const [activeChapter, setActiveChapter] = useState('all');

  const filteredPages = useMemo(() => {
    if (activeChapter === 'all') return pages;
    const ch = chapters.find((c) => c.id === activeChapter);
    return ch ? pages.filter((p) => ch.pageIds.includes(p.id)) : pages;
  }, [activeChapter, pages, chapters]);

  return (
    <div className="relative w-full h-full p-5 pr-9 flex flex-col justify-between select-none overflow-hidden text-[#241e17]">
      {/* FULL-PAGE ORNAMENTAL DOUBLE HAIRLINE BORDER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 375 535">
        <defs>
          <g id="cornerScroll">
            <path
              d="M 0 0 C 8 0 14 3 17 8 C 19 12 18 17 14 19 C 10 21 5 19 4 15 C 3 11 7 7 11 7 C 14 7 16 9 16 12 M 0 0 C 0 8 3 14 8 17 C 12 19 17 18 19 14 C 21 10 19 5 15 4 C 11 3 7 7 7 11 C 7 14 9 16 12 16"
              stroke="#b59a67"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="1.4" fill="#a48852" />
          </g>
        </defs>

        <rect x="12" y="12" width="327" height="511" rx="18" fill="none" stroke="#cfbd9b" strokeWidth="0.8" opacity="0.85" />
        <rect x="16" y="16" width="319" height="503" rx="15" fill="none" stroke="#dfcfb3" strokeWidth="0.6" />

        <g transform="translate(18, 18)"><use href="#cornerScroll" /></g>
        <g transform="translate(325, 18) scale(-1, 1)"><use href="#cornerScroll" /></g>
        <g transform="translate(18, 507) scale(1, -1)"><use href="#cornerScroll" /></g>
        <g transform="translate(325, 507) scale(-1, -1)"><use href="#cornerScroll" /></g>
      </svg>

      {/* HEADER: DIRECTORY TITLE */}
      <div className="relative z-20 pt-1 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eee5d3] border border-[#d8cca8] text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#69573f] mb-1">
          <Sparkles className="w-2.5 h-2.5 text-[#a88746]" />
          <span>Table of Contents</span>
          <Sparkles className="w-2.5 h-2.5 text-[#a88746]" />
        </div>

        <h3 className="font-['Playfair_Display',serif] font-black text-[13px] tracking-[0.18em] text-[#1a1714] uppercase">
          CR Cyber Threat Intelligence
        </h3>
        <p className="font-['Playfair_Display',serif] italic text-[10.5px] text-[#554b3c] tracking-wider">
          Meaning Behind Our Name • 30 Archival Facets
        </p>

        {/* NESTED CHAPTER CHIPS */}
        <div className="flex items-center gap-1 mt-2 mb-1 max-w-[310px] overflow-x-auto scrollbar-none py-0.5">
          <button
            type="button"
            onClick={() => setActiveChapter('all')}
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeChapter === 'all'
                ? 'bg-[#3b3225] text-[#f8f5ed] shadow-2xs'
                : 'bg-[#ede5d4] hover:bg-[#e4dac5] text-[#594d3c] border border-[#d6c7ab]'
            }`}
          >
            All (30)
          </button>
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(ch.id)}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeChapter === ch.id
                  ? 'bg-[#3b3225] text-[#f8f5ed] shadow-2xs'
                  : 'bg-[#ede5d4] hover:bg-[#e4dac5] text-[#594d3c] border border-[#d6c7ab]'
              }`}
            >
              {ch.chapter}
            </button>
          ))}
        </div>
      </div>

      {/* NESTED DIRECTORY ENTRIES LIST */}
      <div className="relative z-20 flex-1 my-1 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
        <div className="space-y-1">
          {filteredPages.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPage(item.id)}
              className="w-full text-left px-2 py-1.5 rounded-lg bg-[#f9f6ec]/80 hover:bg-[#f1ecd9] border border-[#e4d9c2] hover:border-[#bda57b] transition-all duration-150 group cursor-pointer flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <span className="font-mono text-[9.5px] font-bold text-[#8c744f] bg-[#ede5d4] px-1.5 py-0.5 rounded border border-[#dfd2ba] shrink-0">
                  #{item.number}
                </span>
                <span className="font-['Playfair_Display',serif] text-[11px] font-bold text-[#2b241c] group-hover:text-teal-900 truncate">
                  {item.shortTitle}
                </span>
              </div>
              <ChevronRight className="w-3 h-3 text-[#a89574] group-hover:text-[#423521] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-20 pt-2 border-t border-[#dfd3bd] flex items-center justify-between text-[11px] text-[#635544]">
        <button
          type="button"
          onClick={() => onSelectPage(1)}
          className="px-3 py-1 rounded-full bg-gradient-to-r from-[#efe5cf] to-[#e4d4b8] hover:from-[#f6ecd6] hover:to-[#ebdcbe] active:scale-95 text-[#2a2217] font-['Playfair_Display',serif] font-bold text-[10.5px] transition-all cursor-pointer shadow-xs border border-[#c4b396] flex items-center gap-1 hover:shadow-sm"
        >
          <span>Read Page 01</span>
          <ChevronRight className="w-3 h-3 text-[#735d3b]" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="px-2.5 py-1 rounded-full bg-[#ede5d4] hover:bg-[#e4dac5] active:scale-95 text-[#42372b] font-['Playfair_Display',serif] font-semibold text-[10.5px] transition-all cursor-pointer border border-[#d6c7ab] flex items-center gap-1"
          title="Click to close notebook"
        >
          <RotateCcw className="w-3 h-3 text-[#695437]" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
}

/* ========================================================
   4. ANIMATED HANDWRITTEN PAGE COMPONENT (3D NESTED PAGES)
   ======================================================== */
function AnimatedHandwrittenPage({
  pages = meaningPagesData,
  currentPage = 1,
  onPageChange = () => {},
  isOpen = false,
  loopPositions: loops = loopPositions,
  onPenUpdate = () => {},
  onClose = () => {},
}) {
  const [turningState, setTurningState] = useState(null);
  const isTurningRef = useRef(false);

  // Active page on right side (1 to 30)
  const activeRightPage = pages[currentPage - 1] || pages[0];
  // Active page on left side (if currentPage > 1)
  const activeLeftPage = currentPage > 1 ? (pages[currentPage - 2] || pages[0]) : null;

  // Handwriting states for current right page
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  const cursorRef = useRef(null);
  const pageRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Turn to Next Page with 3D Leaf Flip
  const handleNextPage = (e) => {
    e?.stopPropagation();
    if (currentPage >= pages.length || isTurningRef.current) return;
    isTurningRef.current = true;
    const targetPage = currentPage + 1;

    setTurningState({
      leafPage: activeRightPage,
      nextRightPage: pages[targetPage - 1],
      flipped: false,
    });

    // Start 3D turn on next frame
    setTimeout(() => {
      setTurningState(prev => prev ? { ...prev, flipped: true } : null);
    }, 25);

    // Complete turn after 3D animation
    setTimeout(() => {
      onPageChange(targetPage);
      setTurningState(null);
      isTurningRef.current = false;
    }, 650);
  };

  // Turn to Previous Page with 3D Leaf Flip
  const handlePrevPage = (e) => {
    e?.stopPropagation();
    if (currentPage <= 1 || isTurningRef.current) return;
    isTurningRef.current = true;
    const targetPage = currentPage - 1;

    setTurningState({
      leafPage: pages[targetPage - 1],
      nextRightPage: pages[targetPage - 1],
      flipped: true,
    });

    // Start 3D reverse turn
    setTimeout(() => {
      setTurningState(prev => prev ? { ...prev, flipped: false } : null);
    }, 25);

    // Complete reverse turn after 3D animation
    setTimeout(() => {
      onPageChange(targetPage);
      setTurningState(null);
      isTurningRef.current = false;
    }, 650);
  };

  // Trigger typing simulation when page or open state changes
  useEffect(() => {
    if (!isOpen) {
      setIsWriting(false);
      setDisplayedLength(0);
      onPenUpdate({ visible: false, isWriting: false });
      return;
    }

    setDisplayedLength(0);
    setIsWriting(false);

    const penTimer = setTimeout(() => {
      if (isOpenRef.current) {
        onPenUpdate({
          x: 36,
          y: 54,
          visible: true,
          angle: 38,
          isWriting: false,
        });
      }
    }, 450);

    const startTimer = setTimeout(() => {
      if (isOpenRef.current) {
        setIsWriting(true);
      }
    }, 700);

    return () => {
      clearTimeout(penTimer);
      clearTimeout(startTimer);
    };
  }, [isOpen, currentPage]);

  // Typing loop
  useEffect(() => {
    if (!isOpen || !isWriting) return;

    if (displayedLength >= activeRightPage.text.length) {
      setIsWriting(false);
      onPenUpdate({ visible: false, isWriting: false });
      return;
    }

    const char = activeRightPage.text[displayedLength];
    let delay = 14 + Math.random() * 8;
    if (char === ' ') delay = 28;
    if (char === ',' || char === ';') delay = 80;
    if (char === '.' || char === '!' || char === '?') delay = 140;
    if (char === '\n') delay = 160;

    const timer = setTimeout(() => {
      setDisplayedLength(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, isWriting, displayedLength, activeRightPage.text]);

  // Pen tracking
  useEffect(() => {
    if (!isOpen || !isWriting || displayedLength >= activeRightPage.text.length || !cursorRef.current || !pageRef.current) return;

    const cursorRect = cursorRef.current.getBoundingClientRect();
    const pageRect = pageRef.current.getBoundingClientRect();
    const x = cursorRect.left - pageRect.left;
    const y = cursorRect.bottom - pageRect.top;
    const angleJitter = Math.sin(displayedLength * 0.9) * 2.2;
    const verticalJitter = Math.sin(displayedLength * 1.4) * 0.8;

    onPenUpdate({
      x: Math.max(25, x),
      y: y - 5 + verticalJitter,
      visible: true,
      angle: 38 + angleJitter,
      isWriting: true,
    });
  }, [isOpen, isWriting, displayedLength, activeRightPage.text]);

  // Click-to-complete handler
  const completeImmediately = () => {
    setDisplayedLength(activeRightPage.text.length);
    setIsWriting(false);
    onPenUpdate({ visible: false, isWriting: false });
  };

  const currentText = activeRightPage.text.slice(0, displayedLength);

  return (
    <>
      {/* ========================================================
          LEFT PAGE (Inside Cover Bookplate on Page 1, or Left Diary Page)
          ======================================================== */}
      {currentPage > 1 && activeLeftPage && (
        <div 
          className="absolute top-0 bottom-0 rounded-tl-[27px] rounded-bl-[27px] rounded-tr-[2px] rounded-br-[2px] bg-[#faf7ee] border-l border-b border-[#dfd7c4] overflow-hidden select-none z-20 py-5 px-0 flex flex-col justify-between [background-image:radial-gradient(ellipse_95%_85%_at_50%_15%,rgba(255,255,255,0.65)_0%,rgba(251,248,240,0.95)_75%,rgba(242,236,222,0.9)_100%),repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(195,185,168,0.4)_27px,rgba(195,185,168,0.4)_28px)]"
          style={{
            left: '0px',
            width: '50%',
            boxShadow: '-10px 18px 35px -8px rgba(25, 35, 50, 0.22)',
          }}
        >
          {/* Spine Gutter Shadow on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 [background:linear-gradient(to_left,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_60%,transparent_100%)]" />

          {/* Punch Holes on right margin */}
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20">
            {loops.map((loop) => (
              <div 
                key={`left-loop-${loop.id}`} 
                className="absolute w-[3.8px] h-[9.5px] rounded-[1.2px] bg-[#221f1c] shadow-[inset_-0.8px_0.8px_1.5px_rgba(0,0,0,0.85),0_0.5px_0.5px_rgba(255,255,255,0.7)]" 
                style={{
                  right: '6.5px',
                  top: `${loop.y - 4.75}px`,
                }}
              />
            ))}
          </div>

          {/* LEFT HEADER */}
          <div className="pr-9 pl-6 pt-1 pb-1 relative z-20">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-teal-800 text-[10px]">✿</span>
                <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#70604b]">
                  {activeLeftPage.tag}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPageChange(1)}
                  className="px-2 py-0.5 rounded-full bg-[#ede5d4] hover:bg-[#e4dac5] text-[9.5px] font-bold text-[#594d3c] border border-[#d6c7ab] transition-all cursor-pointer flex items-center gap-1 hover:text-teal-900"
                  title="Return to Table of Contents"
                >
                  <BookOpen className="w-2.5 h-2.5 text-teal-700" />
                  <span>Index</span>
                </button>
                <span className="text-[11px] font-['Playfair_Display',serif] italic text-[#786b59]">
                  {activeLeftPage.date}
                </span>
              </div>
            </div>

            <h2 className="font-['Playfair_Display',serif] font-black text-[14.5px] sm:text-[15.5px] text-[#221c15] tracking-tight leading-snug">
              {activeLeftPage.title}
            </h2>

            <div className="flex items-center gap-2 pt-1.5 pb-0.5">
              <div className="h-px flex-1 bg-gradient-to-r from-[#cfc3ad] to-transparent" />
              <span className="text-[#a39072] text-[8px] tracking-widest">◆</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#cfc3ad] to-transparent" />
            </div>
          </div>

          {/* LEFT TEXT BODY */}
          <div className="relative pr-9 pl-6 flex-1 max-h-[350px] overflow-y-auto scrollbar-thin">
            <p 
              className="font-['Caveat',cursive] text-[19.5px] sm:text-[21.5px] text-[#241e17] tracking-wide whitespace-pre-line select-text max-w-[315px] break-words"
              style={{
                lineHeight: '27px',
                paddingTop: '2px',
              }}
            >
              {activeLeftPage.text}
            </p>
          </div>

          {/* LEFT FOOTER */}
          <div className="pr-9 pl-6 pt-2 flex items-center justify-between text-[11px] text-[#9b9282] font-['Playfair_Display',serif] border-t border-[#ded8c4]/40 mt-1 relative z-20">
            <span className="italic flex items-center gap-1.5 text-[#5e5445] font-semibold text-[10.5px]">
              <span>Page {activeLeftPage.id} of 30</span>
            </span>

            <button
              type="button"
              onClick={handlePrevPage}
              className="px-2.5 py-1 rounded-full bg-[#f0e9d8] hover:bg-[#e2d8c3] active:scale-95 text-[#3d3326] font-['Playfair_Display',serif] font-bold text-[10.5px] transition-all cursor-pointer shadow-2xs border border-[#cfc3ad] flex items-center gap-1 hover:shadow-xs"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Page</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          RIGHT BASE PAGE (Underneath Base on Right)
          ======================================================== */}
      <div 
        className="absolute top-0 bottom-0 rounded-tr-[27px] rounded-br-[27px] rounded-tl-[2px] rounded-bl-[2px] bg-[#faf7ee]"
        style={{
          left: '50%',
          width: '50%',
          boxShadow: isOpen
            ? '18px 24px 45px -8px rgba(35, 45, 60, 0.28), 4px 8px 16px -2px rgba(35, 45, 60, 0.15)'
            : '18px 24px 45px -8px rgba(35, 45, 60, 0.38), 6px 12px 20px -5px rgba(35, 45, 60, 0.22)',
          transition: 'box-shadow 850ms ease',
          zIndex: 10,
        }}
      >
        <div 
          className="absolute inset-0 bg-[#e2decb] rounded-tr-[30px] rounded-br-[30px] rounded-tl-[2px] rounded-bl-[2px] -z-30 shadow-[18px_24px_45px_-8px_rgba(35,45,60,0.38)]"
          style={{ transform: 'translate3d(9px, 8px, -14px)' }}
        />
        <div 
          className="absolute inset-0 bg-[#ede9db] rounded-tr-[29px] rounded-br-[29px] rounded-tl-[2px] rounded-bl-[2px] border-r border-b border-[#d8d3c1] -z-20"
          style={{ transform: 'translate3d(5px, 5px, -8px)' }}
        />
        <div 
          className="absolute inset-0 bg-[#f4f0e2] rounded-tr-[28px] rounded-br-[28px] rounded-tl-[2px] rounded-bl-[2px] border-r border-b border-[#e5e0cf] -z-10"
          style={{ transform: 'translate3d(2.5px, 2.5px, -3px)' }}
        />

        {/* RIGHT INNER CONTAINER */}
        <div 
          ref={pageRef}
          onClick={completeImmediately}
          className="relative w-full h-full py-5 px-0 flex flex-col justify-between select-none rounded-tr-[27px] rounded-br-[27px] rounded-tl-[2px] rounded-bl-[2px] overflow-hidden border-r border-b border-[#dfd7c4] shadow-[inset_0_0_15px_rgba(0,0,0,0.02)] bg-[#faf7ee] [background-image:radial-gradient(ellipse_95%_85%_at_50%_15%,rgba(255,255,255,0.65)_0%,rgba(251,248,240,0.95)_75%,rgba(242,236,222,0.9)_100%),repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(195,185,168,0.4)_27px,rgba(195,185,168,0.4)_28px)]"
          title={isWriting ? "Click anywhere to finish writing instantly" : undefined}
        >
          {/* Spine Gutter Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_60%,transparent_100%)]" />

          {/* Punch Holes on Left Margin */}
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20">
            {loops.map((loop) => (
              <div 
                key={`right-loop-${loop.id}`} 
                className="absolute w-[3.8px] h-[9.5px] rounded-[1.2px] bg-[#221f1c] shadow-[inset_0.8px_0.8px_1.5px_rgba(0,0,0,0.85),0_0.5px_0.5px_rgba(255,255,255,0.7)]" 
                style={{
                  left: '6.5px',
                  top: `${loop.y - 4.75}px`,
                }}
              />
            ))}
          </div>

          {/* RIGHT HEADER */}
          <div className="pl-9 pr-6 pt-1 pb-1 relative z-20">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-teal-800 text-[10px]">✿</span>
                <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#70604b]">
                  {activeRightPage.tag}
                </span>
              </div>
              <span className="text-[11px] font-['Playfair_Display',serif] italic text-[#786b59]">
                {activeRightPage.date}
              </span>
            </div>

            <h2 className="font-['Playfair_Display',serif] font-black text-[14.5px] sm:text-[15.5px] text-[#221c15] tracking-tight leading-snug">
              {activeRightPage.title}
            </h2>

            <div className="flex items-center gap-2 pt-1.5 pb-0.5">
              <div className="h-px flex-1 bg-gradient-to-r from-[#cfc3ad] to-transparent" />
              <span className="text-[#a39072] text-[8px] tracking-widest">◆</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#cfc3ad] to-transparent" />
            </div>
          </div>

          {/* RIGHT TEXT BODY */}
          <div className="relative pl-9 pr-6 flex-1 max-h-[350px] overflow-y-auto scrollbar-thin">
            <p 
              className="font-['Caveat',cursive] text-[19.5px] sm:text-[21.5px] text-[#241e17] tracking-wide whitespace-pre-line select-text max-w-[315px] break-words"
              style={{
                lineHeight: '27px',
                paddingTop: '2px',
              }}
            >
              {currentText}
              <span 
                ref={cursorRef} 
                className="inline-block w-[1px] h-[1px] opacity-0 pointer-events-none -ml-[1px]" 
              />
            </p>
          </div>

          {/* RIGHT FOOTER */}
          <div className="pl-9 pr-6 pt-2 flex items-center justify-between text-[11px] text-[#9b9282] font-['Playfair_Display',serif] border-t border-[#ded8c4]/40 mt-1 relative z-20">
            <span className="italic flex items-center gap-1.5 text-[#5e5445] font-semibold text-[10.5px]">
              <span>Page {activeRightPage.id} of 30</span>
              {isWriting && (
                <span className="inline-flex items-center gap-1 text-[9.5px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                  <span>Writing...</span>
                </span>
              )}
            </span>

            <div className="flex items-center gap-1.5">
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="px-2.5 py-1 rounded-full bg-[#f0e9d8] hover:bg-[#e2d8c3] active:scale-95 text-[#3d3326] font-['Playfair_Display',serif] font-bold text-[10.5px] transition-all cursor-pointer shadow-2xs border border-[#cfc3ad] flex items-center gap-1 hover:shadow-xs"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Page</span>
                </button>
              )}

              {currentPage < pages.length ? (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#efe5cf] to-[#e4d4b8] hover:from-[#f6ecd6] hover:to-[#ebdcbe] active:scale-95 text-[#2a2217] font-['Playfair_Display',serif] font-bold text-[10.5px] transition-all cursor-pointer shadow-xs border border-[#c4b396] flex items-center gap-1 hover:shadow-sm"
                  title="Next Page"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#735d3b]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onPageChange(1)}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#efe5cf] to-[#e4d4b8] hover:from-[#f6ecd6] hover:to-[#ebdcbe] active:scale-95 text-[#2a2217] font-['Playfair_Display',serif] font-bold text-[10.5px] transition-all cursor-pointer shadow-xs border border-[#c4b396] flex items-center gap-1 hover:shadow-sm"
                  title="Return to Table of Contents"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#735d3b]" />
                  <span>Return to Start</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3D FLIPPING LEAF (Turn Animation)
          ======================================================== */}
      {turningState && (
        <div 
          className="absolute top-0 bottom-0 [transform-style:preserve-3d]"
          style={{
            left: '50%',
            width: '50%',
            transformOrigin: '0% 50%',
            transform: turningState.flipped 
              ? 'rotateY(-180deg) translateZ(2px)' 
              : 'rotateY(0deg) translateZ(1px)',
            transition: 'transform 600ms cubic-bezier(0.25, 1, 0.35, 1), box-shadow 600ms ease',
            zIndex: 35,
            pointerEvents: 'none',
          }}
        >
          {/* FRONT FACE OF TURNING LEAF (Right page layout) */}
          <div 
            className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] py-5 px-0 flex flex-col justify-between select-none rounded-tr-[27px] rounded-br-[27px] rounded-tl-[2px] rounded-bl-[2px] overflow-hidden border-r border-b border-[#dfd7c4] bg-[#faf7ee] [background-image:radial-gradient(ellipse_95%_85%_at_50%_15%,rgba(255,255,255,0.65)_0%,rgba(251,248,240,0.95)_75%,rgba(242,236,222,0.9)_100%),repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(195,185,168,0.4)_27px,rgba(195,185,168,0.4)_28px)]"
            style={{
              boxShadow: turningState.flipped
                ? '-8px 12px 25px -5px rgba(25, 35, 50, 0.18)'
                : '2px 4px 12px -2px rgba(35, 45, 60, 0.1)',
            }}
          >
            <div className="pl-9 pr-6 pt-1 pb-1">
              <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#70604b]">
                {turningState.leafPage.tag}
              </span>
              <h2 className="font-['Playfair_Display',serif] font-black text-[14.5px] sm:text-[15.5px] text-[#221c15] tracking-tight leading-snug">
                {turningState.leafPage.title}
              </h2>
            </div>
            <div className="relative pl-9 pr-6 flex-1 max-h-[350px] overflow-hidden">
              <p className="font-['Caveat',cursive] text-[19.5px] sm:text-[21.5px] text-[#241e17] tracking-wide leading-[27px]">
                {turningState.leafPage.text}
              </p>
            </div>
            <div className="pl-9 pr-6 pt-2 flex items-center justify-between text-[11px] text-[#9b9282] font-['Playfair_Display',serif] border-t border-[#ded8c4]/40">
              <span className="italic font-semibold text-[10.5px]">Page {turningState.leafPage.id} of 30</span>
            </div>
          </div>

          {/* BACK FACE OF TURNING LEAF (Left page layout) */}
          <div 
            className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] py-5 px-0 flex flex-col justify-between select-none rounded-tl-[27px] rounded-bl-[27px] rounded-tr-[2px] rounded-br-[2px] overflow-hidden border-l border-b border-[#dfd7c4] bg-[#faf7ee] [background-image:radial-gradient(ellipse_95%_85%_at_50%_15%,rgba(255,255,255,0.65)_0%,rgba(251,248,240,0.95)_75%,rgba(242,236,222,0.9)_100%),repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(195,185,168,0.35)_27px,rgba(195,185,168,0.35)_28px)]"
            style={{
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: '-10px 18px 35px -8px rgba(25, 35, 50, 0.22)',
            }}
          >
            <div className="pr-9 pl-6 pt-1 pb-1">
              <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#70604b]">
                {turningState.leafPage.tag}
              </span>
              <h2 className="font-['Playfair_Display',serif] font-black text-[14.5px] sm:text-[15.5px] text-[#221c15] tracking-tight leading-snug">
                {turningState.leafPage.title}
              </h2>
            </div>
            <div className="relative pr-9 pl-6 flex-1 max-h-[350px] overflow-hidden">
              <p className="font-['Caveat',cursive] text-[19.5px] sm:text-[21.5px] text-[#241e17] tracking-wide leading-[27px]">
                {turningState.leafPage.text}
              </p>
            </div>
            <div className="pr-9 pl-6 pt-2 flex items-center justify-between text-[11px] text-[#9b9282] font-['Playfair_Display',serif] border-t border-[#ded8c4]/40">
              <span className="italic font-semibold text-[10.5px]">Page {turningState.leafPage.id} of 30</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================
   5. SPIRAL NOTEBOOK 3D MAIN STAGE COMPONENT
   ======================================================== */
function SpiralNotebook3D({
  artMode = notebookConfig.defaultArtMode,
  wireStyle = notebookConfig.defaultWireStyle,
  cupColor = notebookConfig.defaultCupColor,
  coverTitle = notebookConfig.defaultTitle,
  enable3DTilt = true,
  scale = 1,
  currentPage: externalPage,
  onPageChange: externalPageChange,
  isOpen: externalIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (val) => {
    const next = typeof val === 'function' ? val(isOpen) : val;
    if (onOpenChange) onOpenChange(next);
    setInternalIsOpen(next);
  };

  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalPage !== undefined ? externalPage : internalCurrentPage;
  const setCurrentPage = (val) => {
    const nextVal = typeof val === 'function' ? val(currentPage) : val;
    const clamped = Math.max(1, Math.min(meaningPagesData.length, nextVal));
    if (externalPageChange) externalPageChange(clamped);
    setInternalCurrentPage(clamped);
    setIsPageFlipped(clamped % 2 === 0);
  };

  const [isPageFlipped, setIsPageFlipped] = useState(false);
  const isBusyRef = useRef(false);

  const [penState, setPenState] = useState({
    x: 35,
    y: 55,
    visible: false,
    angle: 38,
    isWriting: false,
  });

  const handlePenUpdate = (updater) => {
    setPenState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return { ...prev, ...next };
    });
  };

  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 45, y: 30, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const theme = wireThemes[wireStyle] || wireThemes.black;

  const handleMouseMove = (e) => {
    if (isOpen || isBusyRef.current || !enable3DTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 5,
      y: normX * 7,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    if (isOpen) return;
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  const handleToggle = (targetState) => {
    setIsOpen(current => {
      const next = targetState !== undefined ? targetState : !current;
      if (next === current) return current;

      if (!next) {
        setIsPageFlipped(false);
      }

      setTilt({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      isBusyRef.current = true;

      setTimeout(() => {
        isBusyRef.current = false;
      }, 860);

      return next;
    });
  };

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowWidth = dimensions.width;
  const windowHeight = dimensions.height;
  const isMobile = windowWidth < 768;

  const baseStageWidth = notebookConfig.baseStageWidth;
  const mobileVisibleWidth = notebookConfig.mobileVisibleWidth;
  const pageHeight = notebookConfig.pageHeight;

  const availableWidth = isMobile
    ? Math.max(280, windowWidth - 16)
    : Math.max(320, windowWidth - 32);

  const availableHeight = Math.max(380, windowHeight - 130);

  const widthScale = isMobile
    ? availableWidth / mobileVisibleWidth
    : availableWidth / baseStageWidth;

  const heightScale = availableHeight / pageHeight;

  const responsiveScale = Math.min(1, widthScale, heightScale) * scale;

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2 sm:py-4 w-full">
      <EmbeddedStyles />
      
      {/* Top Controls Bar when book is open */}
      {isOpen && (
        <div className="mb-3 flex items-center justify-center w-full max-w-[750px] px-2 z-50 gap-2">
          {/* Contents / Index Button */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-stone-700 text-xs font-['Playfair_Display',serif] font-semibold border border-stone-200 shadow-2xs flex items-center gap-1 transition-all cursor-pointer hover:text-teal-800"
            title="Table of Contents"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden sm:inline">Index</span>
          </button>

            {/* Prev / Next Pagination Controls */}
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full border border-stone-200 shadow-2xs p-0.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`p-1 rounded-full transition-all ${
                  currentPage <= 1
                    ? 'opacity-30 cursor-not-allowed text-stone-400'
                    : 'hover:bg-stone-100 cursor-pointer text-stone-700 hover:text-teal-800'
                }`}
                title="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-['Playfair_Display',serif] italic font-semibold text-stone-700 select-none">
                {currentPage} / 30
              </span>
              <button
                type="button"
                disabled={currentPage >= meaningPagesData.length}
                onClick={() => setCurrentPage((p) => Math.min(meaningPagesData.length, p + 1))}
                className={`p-1 rounded-full transition-all ${
                  currentPage >= meaningPagesData.length
                    ? 'opacity-30 cursor-not-allowed text-stone-400'
                    : 'hover:bg-stone-100 cursor-pointer text-stone-700 hover:text-teal-800'
                }`}
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Book Button */}
            <button
              type="button"
              onClick={() => handleToggle(false)}
              className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white active:scale-95 text-stone-700 text-xs font-['Playfair_Display',serif] font-semibold border border-stone-200 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer hover:text-teal-800"
              title="Close Notebook"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">Close Book</span>
              <span className="sm:hidden">Close</span>
            </button>
        </div>
      )}

      {/* RESPONSIVE STAGE CONTAINER */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: `${(isMobile ? mobileVisibleWidth : baseStageWidth) * responsiveScale}px`,
          height: `${pageHeight * responsiveScale}px`,
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: isMobile ? `${mobileVisibleWidth}px` : `${baseStageWidth}px`,
            height: `${pageHeight}px`,
            transform: `scale(${responsiveScale})`,
            transformOrigin: 'top center',
            overflow: isMobile ? 'hidden' : 'visible',
          }}
        >
          <div 
            className="relative flex items-center justify-center [perspective:2200px]"
            style={{
              width: `${baseStageWidth}px`,
              height: `${pageHeight}px`,
              position: isMobile ? 'absolute' : 'relative',
              left: isMobile ? '-355px' : '0px',
              top: '0px',
            }}
          >
            <div 
              ref={containerRef}
              onMouseMove={!isMobile ? handleMouseMove : undefined}
              onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
              onMouseLeave={!isMobile ? handleMouseLeave : undefined}
              className="relative [transform-style:preserve-3d]"
              style={{
                width: `${baseStageWidth}px`,
                height: `${pageHeight}px`,
                transform: `
                  translateX(${isMobile ? '0px' : isOpen ? '0px' : `${-baseStageWidth / 4}px`})
                  ${!isOpen && enable3DTilt && !isMobile ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : ''}
                `,
                transition: 'transform 850ms cubic-bezier(0.25, 1, 0.35, 1)',
              }}
            >

              {/* ANIMATED JOURNAL SPREAD */}
              <AnimatedHandwrittenPage
                pages={meaningPagesData}
                currentPage={currentPage}
                onPageChange={(p) => setCurrentPage(p)}
                isOpen={isOpen}
                loopPositions={loopPositions}
                onPenUpdate={handlePenUpdate}
                isPageFlipped={isPageFlipped}
                onPageTurn={setIsPageFlipped}
              />

              {/* 3D FLIPPING FRONT COVER LEAF */}
              <div 
                onClick={!isOpen ? () => handleToggle(true) : undefined}
                className={`absolute top-0 bottom-0 [transform-style:preserve-3d] ${
                  !isOpen ? 'cursor-pointer group' : ''
                }`}
                style={{
                  left: '50%',
                  width: '50%',
                  transformOrigin: '0% 50%',
                  transform: isOpen 
                    ? 'rotateY(-180deg) translateZ(1px)' 
                    : 'rotateY(0deg) translateZ(1px)',
                  transition: 'transform 850ms cubic-bezier(0.25, 1, 0.35, 1), box-shadow 850ms ease',
                  zIndex: isOpen ? (currentPage > 1 ? 5 : 25) : 40,
                }}
              >

                {/* FRONT FACE OF COVER */}
                <div 
                  onClick={!isOpen ? () => handleToggle(true) : undefined}
                  className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-tr-[27px] rounded-br-[27px] rounded-tl-[2px] rounded-bl-[2px] overflow-hidden flex flex-col justify-between bg-[#f7f4ea] [background-image:radial-gradient(ellipse_90%_80%_at_20%_15%,rgba(255,255,255,0.7)_0%,rgba(247,244,234,0.95)_60%,rgba(238,233,219,0.9)_100%)]"
                  style={{
                    boxShadow: isOpen
                      ? '-8px 12px 25px -5px rgba(25, 35, 50, 0.18)'
                      : '2px 3px 8px -2px rgba(0, 0, 0, 0.1)',
                    pointerEvents: isOpen ? 'none' : 'auto',
                  }}
                >
                  {/* VERTICAL RULED LINES */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 [background-image:repeating-linear-gradient(to_right,transparent_0px,transparent_22.8px,rgba(195,186,168,0.45)_23px,rgba(195,186,168,0.45)_23.8px,transparent_24px)]"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent 18px, black 28px, black calc(100% - 15px), transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent 18px, black 28px, black calc(100% - 15px), transparent 100%)',
                    }}
                  />

                  {/* Spine margin shade */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_50%,transparent_100%)]"
                  />

                  {/* Punch Holes on Front Cover */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20">
                    {loopPositions.map((loop) => (
                      <div 
                        key={loop.id} 
                        className="absolute w-[3.8px] h-[9.5px] rounded-[1.2px] bg-[#221f1c] shadow-[inset_0.8px_0.8px_1.5px_rgba(0,0,0,0.85),0_0.5px_0.5px_rgba(255,255,255,0.7)]" 
                        style={{
                          left: '6.5px',
                          top: `${loop.y - 4.75}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Cover Title */}
                  <div className="relative z-20 pt-8 px-12 text-center h-16 flex items-center justify-center">
                    {coverTitle ? (
                      <span 
                        className="font-['Caveat',cursive] text-2xl font-bold tracking-wide"
                        style={{
                          color: '#4a443a',
                          textShadow: '0 1px 1px rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.15)',
                        }}
                      >
                        {coverTitle}
                      </span>
                    ) : (
                      <div className="w-full" />
                    )}
                  </div>

                  {/* CENTER ARTWORK */}
                  <div className="relative z-20 flex-1 flex items-center justify-center pl-6 pr-3 -mt-6">
                    <FloralTeacupIllustration
                      mode={artMode}
                      cupColor={cupColor}
                      size={290 * scale}
                      isHovered={isHovered}
                    />
                  </div>

                  {/* Bottom hint */}
                  <div className="relative z-20 h-10 px-8 flex items-center justify-between text-[11px] text-[#9c9384] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-['Playfair_Display',serif] italic">click cover to open</span>
                    <span className="tracking-wider">★ handmade edition</span>
                  </div>

                  {/* Glare overlay */}
                  {enable3DTilt && (
                    <div
                      className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-150"
                      style={{
                        opacity: glare.opacity,
                        background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.65) 0%, transparent 80%)`,
                      }}
                    />
                  )}

                  {/* Corner highlight */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 pointer-events-none z-20 rounded-tr-[27px] rounded-br-[27px] [background:linear-gradient(to_left,rgba(255,255,255,0.6)_0%,transparent_100%)]"
                  />
                </div>

                {/* BACK FACE OF COVER (Inside Front Cover) */}
                <div 
                  className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-tl-[27px] rounded-bl-[27px] rounded-tr-[2px] rounded-br-[2px] overflow-hidden bg-[#faf7ee] [background-image:radial-gradient(ellipse_90%_80%_at_80%_20%,rgba(255,255,255,0.8)_0%,rgba(251,249,242,0.95)_70%,rgba(240,235,222,0.8)_100%)]"
                  style={{
                    transform: 'rotateY(180deg) translateZ(1px)',
                    boxShadow: '-10px 18px 35px -8px rgba(25, 35, 50, 0.22)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                  }}
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10 [background:linear-gradient(to_left,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_60%,transparent_100%)]"
                  />

                  <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20">
                    {loopPositions.map((loop) => (
                      <div 
                        key={loop.id} 
                        className="absolute w-[3.8px] h-[9.5px] rounded-[1.2px] bg-[#221f1c] shadow-[inset_-0.8px_0.8px_1.5px_rgba(0,0,0,0.85),0_0.5px_0.5px_rgba(255,255,255,0.7)]" 
                        style={{
                          right: '6.5px',
                          top: `${loop.y - 4.75}px`,
                        }}
                      />
                    ))}
                  </div>

                  <InsideCoverBookplate
                    pages={meaningPagesData}
                    chapters={bookChapters}
                    onSelectPage={(p) => setCurrentPage(p)}
                    cupColor={cupColor}
                    onClose={() => handleToggle(false)}
                  />
                </div>

              </div>

              {/* CLOSED NOTEBOOK CLICK OVERLAY */}
              {!isOpen && (
                <div 
                  role="button"
                  tabIndex={0}
                  aria-label="Click to open notebook"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(true);
                    }
                  }}
                  className="absolute top-0 bottom-0 cursor-pointer z-50 group"
                  style={{
                    left: 'calc(50% - 24px)',
                    width: 'calc(50% + 24px)',
                  }}
                >
                  <div className="absolute right-5 bottom-5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-stone-700 text-[11px] font-['Playfair_Display',serif] font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5 border border-stone-200/90 pointer-events-none">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin-slow" />
                    <span>Click cover to open</span>
                  </div>
                </div>
              )}

              {/* TWIN-WIRE SPIRAL BINDING */}
              <svg 
                viewBox="0 0 750 535" 
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-50 overflow-visible"
              >
                <defs>
                  <linearGradient id={`wireGradClosed-${wireStyle}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.gradStart} />
                    <stop offset="35%" stopColor={theme.gradMid} />
                    <stop offset="65%" stopColor={theme.gradEnd} />
                    <stop offset="100%" stopColor={theme.gradMid} />
                  </linearGradient>

                  <linearGradient id={`wireGradArch-${wireStyle}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={theme.gradMid} />
                    <stop offset="25%" stopColor={theme.gradStart} />
                    <stop offset="50%" stopColor={theme.gradEnd} />
                    <stop offset="75%" stopColor={theme.gradStart} />
                    <stop offset="100%" stopColor={theme.gradMid} />
                  </linearGradient>

                  <filter id="wireDropShadow" x="-20%" y="-40%" width="150%" height="200%">
                    <feDropShadow dx="0" dy="1.4" stdDeviation="1.0" floodColor={theme.shadow} />
                  </filter>

                  <linearGradient id="centerGutterShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
                    <stop offset="50%" stopColor="rgba(0,0,0,0.04)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
                  </linearGradient>
                </defs>

                {/* CLOSED STATE SPIRAL BINDING */}
                <g 
                  id="spiral-closed-state"
                  style={{
                    opacity: isOpen ? 0 : 1,
                    transition: 'opacity 420ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {loopPositions.slice(0, -1).map((loop, i) => {
                    const nextY = loopPositions[i + 1].y;
                    return (
                      <path
                        key={`backbone-${i}`}
                        d={`M 358.5 ${loop.y + 2.5} C 356.5 ${loop.y + 8} 356.5 ${nextY - 8} 358.5 ${nextY - 2.5}`}
                        stroke={theme.backWire}
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.9"
                      />
                    );
                  })}

                  {loopPositions.map((loop) => {
                    const y = loop.y;
                    return (
                      <g key={`closed-loop-${loop.id}`}>
                        <path
                          d={`M 359 ${y - 2.2} C 361 ${y + 2} 367 ${y + 4.5} 375 ${y + 4}`}
                          stroke={theme.backWire}
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.85"
                        />

                        <g filter="url(#wireDropShadow)">
                          <path
                            d={`
                              M 384 ${y - 2.5} 
                              L 366 ${y - 2.5} 
                              C 358.5 ${y - 2.5} 356.5 ${y - 1} 356.5 ${y} 
                              C 356.5 ${y + 1} 358.5 ${y + 2.5} 366 ${y + 2.5} 
                              L 384 ${y + 2.5}
                            `}
                            stroke={`url(#wireGradClosed-${wireStyle})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />

                          <path
                            d={`M 363 ${y - 3.3} L 382.5 ${y - 3.3}`}
                            stroke={theme.highlight}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            fill="none"
                          />

                          <path
                            d={`M 363 ${y + 1.7} L 382.5 ${y + 1.7}`}
                            stroke={theme.highlight}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            fill="none"
                          />

                          <path
                            d={`M 359.5 ${y - 1.8} C 357.5 ${y - 0.7} 357.5 ${y + 0.7} 359.5 ${y + 1.8}`}
                            stroke={theme.highlight}
                            strokeWidth="0.85"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>

                        <ellipse cx="383.8" cy={y - 2.5} rx="0.9" ry="1.2" fill="#0d0c0a" />
                        <ellipse cx="383.8" cy={y + 2.5} rx="0.9" ry="1.2" fill="#0d0c0a" />
                      </g>
                    );
                  })}
                </g>

                {/* OPEN STATE SPIRAL BINDING */}
                <g 
                  id="spiral-open-state"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 420ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <rect x="370" y="0" width="10" height="535" fill="url(#centerGutterShadow)" />

                  {loopPositions.slice(0, -1).map((loop, i) => {
                    const nextY = loopPositions[i + 1].y;
                    return (
                      <path
                        key={`open-backbone-${i}`}
                        d={`M 375 ${loop.y + 2.5} L 375 ${nextY - 2.5}`}
                        stroke={theme.backWire}
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.75"
                      />
                    );
                  })}

                  {loopPositions.map((loop) => {
                    const y = loop.y;
                    return (
                      <g key={`open-loop-${loop.id}`}>
                        <path
                          d={`M 366.6 ${y} C 371 ${y + 5.5} 379 ${y + 5.5} 383.4 ${y}`}
                          stroke={theme.backWire}
                          strokeWidth="2.1"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.85"
                        />

                        <g filter="url(#wireDropShadow)">
                          <path
                            d={`M 366.6 ${y - 2.5} C 371.5 ${y - 5.5} 378.5 ${y - 5.5} 383.4 ${y - 2.5}`}
                            stroke={`url(#wireGradArch-${wireStyle})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d={`M 368.5 ${y - 3.8} C 372.5 ${y - 6.2} 377.5 ${y - 6.2} 381.5 ${y - 3.8}`}
                            stroke={theme.highlight}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            fill="none"
                          />

                          <path
                            d={`M 366.6 ${y + 2.5} C 371.5 ${y - 0.5} 378.5 ${y - 0.5} 383.4 ${y + 2.5}`}
                            stroke={`url(#wireGradArch-${wireStyle})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d={`M 368.5 ${y + 1.2} C 372.5 ${y - 1.2} 377.5 ${y - 1.2} 381.5 ${y + 1.2}`}
                            stroke={theme.highlight}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>

                        <ellipse cx="366.6" cy={y - 2.5} rx="0.8" ry="1.1" fill="#0d0c0a" />
                        <ellipse cx="366.6" cy={y + 2.5} rx="0.8" ry="1.1" fill="#0d0c0a" />
                        <ellipse cx="383.4" cy={y - 2.5} rx="0.8" ry="1.1" fill="#0d0c0a" />
                        <ellipse cx="383.4" cy={y + 2.5} rx="0.8" ry="1.1" fill="#0d0c0a" />
                      </g>
                    );
                  })}
                </g>
              </svg>

            </div>

            {/* TOP-LEVEL 2D LUXURY FOUNTAIN PEN OVERLAY */}
            {isOpen && penState.visible && (
              <div 
                className="absolute pointer-events-none select-none z-[9999]"
                style={{
                  width: `${baseStageWidth}px`,
                  height: `${pageHeight}px`,
                  left: '0px',
                  top: '0px',
                }}
              >
                <FountainPen
                  x={375 + penState.x}
                  y={penState.y}
                  angle={penState.angle}
                  visible={penState.visible}
                  isWriting={penState.isWriting}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SUBTLE INVITATION HINT */}
      {!isOpen && (
        <div 
          onClick={() => handleToggle(true)}
          className="mt-4 sm:mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-semibold shadow-sm border border-slate-200/90 cursor-pointer animate-pulse-glow transition-transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>{isMobile ? 'Tap cover to open notebook' : 'Click on the cover to open notebook'}</span>
        </div>
      )}

    </div>
  );
}

/* ========================================================
   6. TOP-LEVEL PAGE COMPONENT FOR ABOUT US ROUTE
   ======================================================== */
export function MeaningBehindOurNamePage() {
  const [artMode] = useState('vector');
  const [wireStyle] = useState('black');
  const [cupColor] = useState('#8BAFB2');
  const [coverTitle] = useState('CR Cyber Threat Intelligence');
  const [enable3DTilt] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [isNotebookOpen, setIsNotebookOpen] = useState(true);
  return (
    <div className="w-full flex-1 bg-transparent text-slate-800 flex flex-col justify-between selection:bg-teal-200 overflow-x-hidden pt-2 pb-20">
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 flex flex-col items-center justify-center">
        
        {/* Page Hero Header */}
        <NavPageHeader
          title="Meaning Behind Our Name"
          description="Discover the 30 facets and core principles defining CR Cyber Threat Intelligence — from public cyber-safety literacy to institutional cyber resilience, written across the pages of our archival diary."
          className="mb-6 px-4"
        />

        {/* 3D Interactive Spiral Notebook (The 30 Facets as Sequential Pages) */}
        <div className="w-full flex flex-col items-center mb-10">
          <SpiralNotebook3D
            artMode={artMode}
            wireStyle={wireStyle}
            cupColor={cupColor}
            coverTitle={coverTitle}
            enable3DTilt={enable3DTilt}
            scale={1}
            currentPage={currentPage}
            onPageChange={(p) => setCurrentPage(p)}
            isOpen={isNotebookOpen}
            onOpenChange={(val) => setIsNotebookOpen(val)}
          />
        </div>

      </main>
    </div>
  );
}

export { SpiralNotebook3D, FloralTeacupIllustration, FountainPen, InsideCoverBookplate, AnimatedHandwrittenPage };
export const SpiralNotebookApp = MeaningBehindOurNamePage;
export default MeaningBehindOurNamePage;
