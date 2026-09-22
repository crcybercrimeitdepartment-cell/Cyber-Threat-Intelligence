import React, { useState, useRef, useEffect } from 'react';
import NavPageHeader from '../../components/NavPageHeader';

// Custom CSS styles injected directly for 100% self-contained card styling
const posterStyles = `
  html {
    scroll-behavior: smooth;
  }
  
  /* Removed global body background to preserve global watermark */
  .poster-page-wrapper {
    font-family: 'Outfit', sans-serif;
  }

  /* Custom styles for paper shadow effect with GPU hints */
  .paper-shadow {
    /* Removed expensive SVG filters to fix scroll lag */
  }

  .paper-shadow-deep {
    /* Removed expensive SVG filters to fix scroll lag */
  }

  .parallax-layer {
    will-change: transform;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  /* Wave Float & Draw Animations */
  .animate-float-1 {
    animation: float-1 20s ease-in-out infinite;
  }
  .animate-float-2 {
    animation: float-2 25s ease-in-out infinite;
  }
  .animate-float-3 {
    animation: float-3 18s ease-in-out infinite;
  }
  .animate-float-4 {
    animation: float-4 22s ease-in-out infinite;
  }
  .animate-draw {
    animation: draw 4s ease-in-out infinite alternate;
  }

  @keyframes float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(2%, 1.5%) scale(1.015); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-1.5%, 2.5%) scale(1.01); }
  }
  @keyframes float-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(2.5%, -2%) scale(1.02); }
  }
  @keyframes float-4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-2%, -1.5%) scale(1.015); }
  }
  @keyframes draw {
    0% { stroke-dashoffset: 2000; opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { stroke-dashoffset: 0; opacity: 0.9; }
  }

  /* Shimmer Loading Animations */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-card {
    background: linear-gradient(90deg, #f2f7fa 25%, #e1ebf2 37%, #f2f7fa 63%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }

  .shimmer-element-1 {
    background: linear-gradient(90deg, #d3e2ed 25%, #c0d3e2 37%, #d3e2ed 63%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }

  .shimmer-element-2 {
    background: linear-gradient(90deg, #c7dbe8 25%, #b4cce0 37%, #c7dbe8 63%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }

  .shimmer-element-3 {
    background: linear-gradient(90deg, #cbd5e1 25%, #a1b1c7 37%, #cbd5e1 63%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }

  /* Fade-in and Slide-up Staggered Animation */
  @keyframes cardWaveEntrance {
    0% {
      opacity: 0;
      transform: translateY(80px) rotateX(15deg) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotateX(0) scale(1);
    }
  }

  .animate-wave-entrance {
    opacity: 0;
    transform-origin: bottom center;
    animation: cardWaveEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes textWaveReveal {
    0% {
      clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      clip-path: polygon(0 -20%, 100% -20%, 100% 120%, 0 120%);
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-text-wave {
    opacity: 0;
    animation: textWaveReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Page Header Animations */
  @keyframes headerSlideDown {
    0% { opacity: 0; transform: translateY(-30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-header {
    opacity: 0;
    animation: headerSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes descriptionFade {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-desc {
    opacity: 0;
    animation: descriptionFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  }
`;

export const posterThemes = {
  ocean: {
    bg: "#f3f7fa",
    primary: "#1b3e64",
    secondary: "#336d8d",
    tertiary: "#7caec3",
    accent: "#a9d1db",
    white: "#ffffff",
    text: "#132b45",
    line: "#ffffff"
  },
  sunset: {
    bg: "#fdf8f5",
    primary: "#4a121a",
    secondary: "#8b2635",
    tertiary: "#d14949",
    accent: "#f3a261",
    white: "#ffffff",
    text: "#3a0910",
    line: "#ffffff"
  },
  aurora: {
    bg: "#f4f8f5",
    primary: "#0c2c24",
    secondary: "#1f5e49",
    tertiary: "#519e7a",
    accent: "#9bd2a8",
    white: "#ffffff",
    text: "#081d18",
    line: "#ffffff"
  },
  cyber: {
    bg: "#f5f3f7",
    primary: "#35254f",
    secondary: "#665582",
    tertiary: "#a596bd",
    accent: "#dcd6e8",
    white: "#ffffff",
    text: "#2a1a40",
    line: "#ffffff"
  },
  dunes: {
    bg: "#f6f3ee",
    primary: "#2b221a",
    secondary: "#5c4033",
    tertiary: "#a87c53",
    accent: "#d4b38d",
    white: "#ffffff",
    text: "#1f1813",
    line: "#ffffff"
  }
};

export const posterContent = [
  { title: "DYNAMIC", subtitle: "POSTER", tagline: "COLLECTION", theme: "ocean" },
  { title: "SUNSET", subtitle: "EMBER", tagline: "COLLECTION", theme: "sunset" },
  { title: "FOREST", subtitle: "AURORA", tagline: "COLLECTION", theme: "aurora" },
  { title: "DESERT", subtitle: "DUNES", tagline: "COLLECTION", theme: "dunes" },
  { title: "OCEAN", subtitle: "BREEZE", tagline: "SERIES", theme: "ocean" },
  { title: "VOLCANIC", subtitle: "ASH", tagline: "SERIES", theme: "sunset" },
  { title: "TROPICAL", subtitle: "PALM", tagline: "SERIES", theme: "aurora" },
  { title: "MIDNIGHT", subtitle: "SHADOW", tagline: "ART", theme: "cyber" },
  { title: "COSMIC", subtitle: "NEBULA", tagline: "ART", theme: "cyber" },
  { title: "NORDIC", subtitle: "FJORD", tagline: "ART", theme: "ocean" },
  { title: "CANYON", subtitle: "ROCKS", tagline: "VISION", theme: "dunes" },
  { title: "WINTER", subtitle: "FROST", tagline: "VISION", theme: "ocean" },
  { title: "AUTUMN", subtitle: "LEAVES", tagline: "VISION", theme: "sunset" },
  { title: "RETRO", subtitle: "WAVE", tagline: "RETREAT", theme: "cyber" },
  { title: "MOUNTAIN", subtitle: "PEAKS", tagline: "RETREAT", theme: "dunes" },
  { title: "GLACIAL", subtitle: "SHELF", tagline: "RETREAT", theme: "ocean" },
  { title: "DEEP", subtitle: "ABYSS", tagline: "SPACE", theme: "cyber" },
  { title: "CYBER", subtitle: "PUNK", tagline: "SPACE", theme: "cyber" },
  { title: "SILICON", subtitle: "DUST", tagline: "SPACE", theme: "dunes" },
  { title: "GOLDEN", subtitle: "HOUR", tagline: "EDITION", theme: "sunset" },
  { title: "ECLIPSE", subtitle: "MOON", tagline: "EDITION", theme: "cyber" },
  { title: "SPRING", subtitle: "BLOOM", tagline: "EDITION", theme: "aurora" },
  { title: "COPPER", subtitle: "CRUST", tagline: "ARCHIVE", theme: "dunes" },
  { title: "SILENT", subtitle: "STONE", tagline: "ARCHIVE", theme: "dunes" }
];

export const postersData = Array.from({ length: 24 }).map((_, i) => {
  const types = [1, 2, 3, 4];
  const item = posterContent[i % posterContent.length];
  
  return {
    id: i + 1,
    type: types[i % types.length],
    title: item.title,
    subtitle: item.subtitle,
    tagline: item.tagline,
    theme: item.theme
  };
});

// Reusable Poster Art Component
export function Poster({ 
  type = 1, 
  title = "DYNAMIC", 
  subtitle = "POSTER", 
  tagline = "COLLECTION", 
  theme = "ocean",
  interactive = true,
  animate = false,
  customColors = null,
  small = false,
  loading = false
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const colors = loading 
    ? {
        bg: "#e2ecf2",
        primary: "#cedce6",
        secondary: "#c0cdd9",
        tertiary: "#b4c3cf",
        accent: "#a9b8c4",
        white: "#f4f8fa",
        text: "transparent",
        line: "#f4f8fa"
      }
    : (customColors || posterThemes[theme] || posterThemes.ocean);

  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Parallax translation helpers
  const getTranslationStyle = (intensity) => {
    if (!interactive) return {};
    
    const xTrans = mousePos.x * intensity;
    const yTrans = mousePos.y * intensity;
    return {
      transform: `translate3d(${xTrans}px, ${yTrans}px, 0)`,
      transition: isHovered ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
    };
  };

  // Render SVG layers for Poster Type 1
  const renderPoster1 = () => (
    <svg 
      viewBox="0 0 800 1200" 
      className="w-full h-full select-none absolute inset-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="1200" fill={colors.bg} />

      <g style={getTranslationStyle(-4)} className="parallax-layer">
        <path 
          d="M -20,-20 L 820,-20 L 820,180 C 650,220 500,80 350,150 C 200,220 80,100 -20,120 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={getTranslationStyle(-8)} className="parallax-layer paper-shadow">
        <path 
          d="M -20,-20 L 820,-20 L 820,105 C 700,165 580,225 460,115 C 320,5 150,225 -20,155 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={getTranslationStyle(-12)} className="parallax-layer paper-shadow">
        <path 
          d="M -20,-20 L 820,-20 L 820,60 C 750,130 650,50 550,110 C 450,170 300,-10 -20,80 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(-16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -20,120 C 250,280 450,20 620,190 C 700,260 820,150 820,150" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>

      <g style={getTranslationStyle(6)} className="parallax-layer paper-shadow-deep">
        <path 
          d="M -20,1220 L 820,1220 L 820,1110 C 820,1110 700,1140 600,1100 C 450,1040 480,820 330,730 C 180,640 120,460 -20,440 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-4' : ''}`}
          style={{ transformOrigin: 'bottom left' }}
        />
      </g>

      <g style={getTranslationStyle(10)} className="parallax-layer paper-shadow">
        <path 
          d="M -20,1220 L 820,1220 L 820,1130 C 820,1130 750,1160 680,1120 C 580,1060 480,950 380,860 C 280,770 180,680 -20,650 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={getTranslationStyle(12)} className="parallax-layer paper-shadow">
        <path 
          d="M -20,1220 L 620,1220 C 580,1160 520,1020 420,1030 C 320,1040 260,860 210,810 C 160,760 60,660 -20,580 Z" 
          fill={colors.secondary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'bottom left' }}
        />
      </g>

      <g style={getTranslationStyle(14)} className="parallax-layer paper-shadow">
        <path 
          d="M -20,1220 L 820,1220 L 820,1180 C 720,1140 550,1220 420,1140 C 280,1060 160,1180 -10,1190 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -20,780 C 80,880 120,980 280,1080 C 380,1140 580,820 810,840" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  // Render SVG layers for Poster Type 2
  const renderPoster2 = () => (
    <svg 
      viewBox="0 0 800 1200" 
      className="w-full h-full select-none absolute inset-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="1200" fill={colors.bg} />

      <g style={getTranslationStyle(-4)} className="parallax-layer">
        <path 
          d="M -10,-10 L 810,-10 L 810,250 C 720,290 600,140 500,150 C 400,160 300,50 -10,120 Z" 
          fill={colors.accent}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={getTranslationStyle(-8)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,220 C 750,160 700,240 600,180 C 500,120 420,-10 -10,60 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'top right' }}
        />
      </g>

      <g style={getTranslationStyle(-12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,100 C 720,130 650,40 550,90 C 450,140 250,-10 -10,110 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'top left' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(-16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,80 C 220,180 400,-20 580,140 C 680,220 810,160 810,160" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>

      <g style={getTranslationStyle(6)} className="parallax-layer paper-shadow-deep">
        <path 
          d="M -10,1210 L 810,1210 L 810,720 C 750,760 700,900 600,950 C 500,1000 450,1150 350,1210 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-4' : ''}`}
          style={{ transformOrigin: 'bottom right' }}
        />
      </g>

      <g style={getTranslationStyle(10)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,880 C 720,940 650,970 580,940 C 480,900 380,1050 280,1080 C 180,1110 80,1210 -10,1210 Z" 
          fill={colors.secondary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'bottom right' }}
        />
      </g>

      <g style={getTranslationStyle(12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1020 C 740,1060 650,1080 580,1030 C 480,960 360,820 -10,800 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'bottom left' }}
        />
      </g>

      <g style={getTranslationStyle(14)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1180 C 700,1140 500,1200 400,1150 C 300,1100 200,1180 -10,1190 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,850 C 120,950 250,980 420,1040 C 550,1080 700,900 810,920" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  // Render SVG layers for Poster Type 3
  const renderPoster3 = () => (
    <svg 
      viewBox="0 0 800 1200" 
      className="w-full h-full select-none absolute inset-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="1200" fill={colors.bg} />

      <g style={getTranslationStyle(-4)} className="parallax-layer">
        <path 
          d="M -10,-10 L 810,-10 L 810,120 C 700,250 550,50 400,100 C 250,150 120,50 -10,80 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={getTranslationStyle(-8)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,220 C 700,150 500,250 350,150 C 200,50 80,180 -10,120 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'top left' }}
        />
      </g>

      <g style={getTranslationStyle(-12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,80 C 750,150 650,20 500,80 C 350,140 180,-10 -10,60 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'top right' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(-16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,100 C 200,220 380,40 550,160 C 650,230 810,120 810,120" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>

      <g style={getTranslationStyle(6)} className="parallax-layer paper-shadow-deep">
        <path 
          d="M -10,1210 L 810,1210 L 810,950 C 700,980 620,820 480,880 C 340,940 250,1020 -10,950 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-4' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={getTranslationStyle(10)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1050 C 720,1020 600,1080 480,980 C 360,885 180,950 -10,920 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={getTranslationStyle(12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 700,1210 C 650,1160 550,1020 450,1050 C 350,1080 280,950 200,900 C 120,850 50,920 -10,880 Z" 
          fill={colors.secondary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'bottom left' }}
        />
      </g>

      <g style={getTranslationStyle(14)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1150 C 720,1120 580,1200 450,1130 C 320,1060 180,1160 -10,1170 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,900 C 150,980 300,850 480,1020 C 600,1100 700,950 810,980" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  // Render SVG layers for Poster Type 4
  const renderPoster4 = () => (
    <svg 
      viewBox="0 0 800 1200" 
      className="w-full h-full select-none absolute inset-0 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="1200" fill={colors.bg} />

      <g style={getTranslationStyle(-4)} className="parallax-layer">
        <path 
          d="M -10,-10 L 810,-10 L 810,80 C 700,180 580,240 450,140 C 320,40 180,120 -10,50 Z" 
          fill={colors.accent}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'top center' }}
        />
      </g>

      <g style={getTranslationStyle(-8)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,150 C 720,80 600,180 480,120 C 360,60 220,-10 -10,80 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'top right' }}
        />
      </g>

      <g style={getTranslationStyle(-12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,-10 L 810,-10 L 810,120 C 700,150 550,50 420,100 C 290,150 150,20 -10,100 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'top left' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(-16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,110 C 200,200 420,20 600,150 C 680,200 810,130 810,130" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>

      <g style={getTranslationStyle(6)} className="parallax-layer paper-shadow-deep">
        <path 
          d="M -10,1210 L 810,1210 L 810,850 C 750,880 700,750 600,820 C 500,890 400,980 -10,900 Z" 
          fill={colors.primary}
          className={`${animate ? 'animate-float-4' : ''}`}
          style={{ transformOrigin: 'bottom right' }}
        />
      </g>

      <g style={getTranslationStyle(10)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,980 C 720,1020 650,900 580,950 C 500,1000 380,1080 -10,1020 Z" 
          fill={colors.secondary}
          className={`${animate ? 'animate-float-3' : ''}`}
          style={{ transformOrigin: 'bottom right' }}
        />
      </g>

      <g style={getTranslationStyle(12)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1080 C 740,1125 680,1020 600,1050 C 520,1080 320,950 -10,980 Z" 
          fill={colors.tertiary}
          className={`${animate ? 'animate-float-1' : ''}`}
          style={{ transformOrigin: 'bottom left' }}
        />
      </g>

      <g style={getTranslationStyle(14)} className="parallax-layer paper-shadow">
        <path 
          d="M -10,1210 L 810,1210 L 810,1170 C 700,1120 520,1210 400,1140 C 280,1070 150,1180 -10,1160 Z" 
          fill={colors.white}
          className={`${animate ? 'animate-float-2' : ''}`}
          style={{ transformOrigin: 'bottom center' }}
        />
      </g>

      <g style={{ ...getTranslationStyle(16), opacity: 0.8 }} className="parallax-layer">
        <path 
          d="M -10,920 C 150,1020 280,900 450,1080 C 580,1180 700,960 810,980" 
          fill="none" 
          stroke={colors.line} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );

  return (
    <div 
      ref={containerRef}
      onMouseMove={loading ? undefined : handleMouseMove}
      onMouseEnter={loading ? undefined : handleMouseEnter}
      onMouseLeave={loading ? undefined : handleMouseLeave}
      className={`relative w-full aspect-[2/3] ${small ? 'max-w-[270px] rounded-2xl' : 'max-w-[450px] rounded-3xl'} mx-auto overflow-hidden select-none flex flex-col justify-center items-center ${loading ? 'cursor-default bg-[#e2ecf2]' : 'cursor-pointer group bg-white'} ${theme === 'cyber' && !loading ? 'border border-purple-500/10' : ''}`}
      style={{
        transform: (isHovered && !loading)
          ? `perspective(1000px) rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg) scale3d(1.045, 1.045, 1.045)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: (isHovered && !loading)
          ? 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s' 
          : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s',
        boxShadow: (isHovered && !loading)
          ? `0 35px 70px -15px rgba(12, 24, 43, 0.38), 0 0 35px ${colors.primary}18` 
          : '0 8px 30px -15px rgba(12, 24, 43, 0.12)',
      }}
    >
      {/* Background Graphic Layer */}
      {type === 1 && renderPoster1()}
      {type === 2 && renderPoster2()}
      {type === 3 && renderPoster3()}
      {type === 4 && renderPoster4()}

      {/* Shimmer Overlay for Card */}
      {loading && <div className="absolute inset-0 shimmer-card opacity-30 z-10 pointer-events-none" />}

      {/* Ambient shadow glow behind the card */}
      {!loading && (
        <div 
          className="absolute -inset-2 z-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 pointer-events-none"
          style={{
            backgroundColor: `${colors.primary}18`,
            transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, -10px)`
          }}
        />
      )}

      {/* Text Content Overlay */}
      <div 
        className="relative z-30 text-center flex flex-col items-center justify-center px-4 transition-transform duration-500 animate-text-wave"
        style={{
          animationDelay: '0.4s',
          ...getTranslationStyle(4),
          transform: `${getTranslationStyle(4).transform} ${isHovered ? 'scale(1.04) translateY(-8px)' : 'scale(1) translateY(0px)'}`,
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
            {/* Title skeleton */}
            <div className="w-24 h-6 sm:h-7 rounded bg-[#94a3b8]/40 shimmer-element-1" />
            {/* Subtitle skeleton */}
            <div className="w-36 h-9 sm:h-11 rounded-md bg-[#94a3b8]/50 shimmer-element-2 my-1" />
            {/* Tagline skeleton */}
            <div className="w-20 h-3.5 sm:h-4.5 rounded bg-[#94a3b8]/35 shimmer-element-1" />
          </div>
        ) : (
          <div className="pointer-events-none flex flex-col items-center">
            <h2 
              className={`font-montserrat font-bold ${small ? 'text-[18px] sm:text-[22px] tracking-[0.2em] translate-x-[0.1em]' : 'text-[32px] sm:text-[38px] tracking-[0.25em] translate-x-[0.125em]'} leading-[1.1] transition-all duration-300`}
              style={{ color: colors.text }}
            >
              {title}
            </h2>
            <h1 
              className={`font-outfit font-extralight ${small ? 'text-[26px] sm:text-[30px] tracking-[0.3em] translate-x-[0.15em] my-0.5' : 'text-[46px] sm:text-[54px] tracking-[0.35em] translate-x-[0.175em] my-1'} leading-[1.1] transition-all duration-300`}
              style={{ color: colors.text }}
            >
              {subtitle}
            </h1>
            <h3 
              className={`font-montserrat font-semibold ${small ? 'text-[8px] sm:text-[9px] tracking-[0.4em] translate-x-[0.2em]' : 'text-[13px] sm:text-[15px] tracking-[0.45em] translate-x-[0.225em]'} leading-[1.2] transition-all duration-300 opacity-90`}
              style={{ color: colors.text }}
            >
              {tagline}
            </h3>
          </div>
        )}

        {/* Click to View Button positioned directly below the heading */}
        {!loading && (
          <div className="mt-6 sm:mt-8 opacity-100 pointer-events-auto">
            <button 
              onClick={handleButtonClick}
              className={`group/btn relative overflow-hidden rounded-full backdrop-blur-sm border px-4 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${isClicked ? 'scale-90 opacity-70' : 'hover:scale-105 active:scale-95 animate-pulse'}`}
              style={{ 
                color: colors.bg, 
                borderColor: `${colors.text}30`, 
                backgroundColor: `${colors.text}D0` 
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Click to View
                <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Glossy reflection overlay */}
      {!loading && (
        <div 
          className="absolute inset-0 z-40 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 240px at ${((mousePos.x + 0.5) * 100)}% ${((mousePos.y + 0.5) * 100)}%, rgba(255, 255, 255, 0.25) 0%, transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />
      )}

      {/* Type badge on corner for UI design appeal */}
      {loading ? (
        <div className={`absolute ${small ? 'bottom-4 right-5' : 'bottom-6 right-8'} w-10 h-3 rounded bg-[#94a3b8]/20 shimmer-element-1`} />
      ) : (
        <div 
          className={`absolute ${small ? 'bottom-4 right-5 text-[8px]' : 'bottom-6 right-8 text-[10px]'} font-mono tracking-widest uppercase opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
          style={{ color: colors.text }}
        >
          No. 0{type}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function PublicCyberServicesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: posterStyles }} />
      <div className="poster-page-wrapper min-h-[calc(100vh-100px)] w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 select-none bg-transparent">
        
        {/* Header */}
        <NavPageHeader
          title="Public Cyber Services"
          description="Access public-focused cyber services and practical guidance designed to help individuals and communities understand digital risks, improve online safety, prevent cybercrime, and find appropriate support."
        />

        <div className="w-full max-w-[1200px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-center justify-center pb-8 mx-auto px-1 sm:px-0">
          {postersData.map((poster, index) => (
            <div 
              key={poster.id} 
              id={`poster-container-${poster.id}`} 
              className="w-full flex justify-center animate-wave-entrance"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Poster 
                type={poster.type}
                title={poster.title}
                subtitle={poster.subtitle}
                tagline={poster.tagline}
                theme={poster.theme}
                interactive={true}
                animate={true}
                small={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
