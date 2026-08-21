import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { aboutUsData } from '../../data/aboutUs/aboutUsData';

// Custom SVGs with advanced micro-animations for high-fidelity hover states
const SearchIcon = ({ isHovered }) => (
  <svg 
    className={`w-8 h-8 transition-all duration-500 ease-out ${
      isHovered ? 'scale-110 rotate-12 translate-x-0.5 -translate-y-0.5' : ''
    }`} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="6" />
    <line x1="21" y1="21" x2="15.2" y2="15.2" />
  </svg>
);

const ChartIcon = ({ isHovered }) => (
  <svg 
    className="w-8 h-8" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* 4 vertical bars with staggered upward translation on hover */}
    <rect 
      x="6" 
      y="14" 
      width="2" 
      height="6" 
      rx="0.5" 
      className={`transition-transform duration-500 ease-out ${isHovered ? '-translate-y-1' : ''}`} 
    />
    <rect 
      x="10" 
      y="11" 
      width="2" 
      height="9" 
      rx="0.5" 
      className={`transition-transform duration-500 ease-out delay-75 ${isHovered ? '-translate-y-1.5' : ''}`} 
    />
    <rect 
      x="14" 
      y="8" 
      width="2" 
      height="12" 
      rx="0.5" 
      className={`transition-transform duration-500 ease-out delay-100 ${isHovered ? '-translate-y-2' : ''}`} 
    />
    <rect 
      x="18" 
      y="5" 
      width="2" 
      height="15" 
      rx="0.5" 
      className={`transition-transform duration-500 ease-out delay-150 ${isHovered ? '-translate-y-2.5' : ''}`} 
    />
    
    {/* Trend line with arrow - slides up-right */}
    <g className={`transition-transform duration-500 ease-out ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}>
      <path d="M 4 15 L 20 3" />
      <path d="M 15 3 H 20 V 8" />
    </g>
  </svg>
);

const TargetIcon = ({ isHovered }) => (
  <svg 
    className="w-8 h-8" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Circles */}
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="5" />
    <circle cx="11" cy="13" r="2" />
    
    {/* Arrow hitting target - slides in along its vector on hover */}
    <g className={`transition-transform duration-500 ease-out ${isHovered ? '-translate-x-1.5 translate-y-1.5' : ''}`}>
      <line x1="20" y1="4" x2="12" y2="12" />
      <path d="M 12 9 L 12 12 H 15" />
      <line x1="18.5" y1="3.5" x2="20.5" y2="5.5" />
      <line x1="17" y1="5" x2="19" y2="7" />
    </g>
  </svg>
);

const RocketIcon = ({ isHovered }) => (
  <svg 
    className="w-8 h-8" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Rocket body group - tilts and thrusts upward on hover */}
    <g className={`transition-transform duration-500 ease-out ${isHovered ? 'scale-110 -translate-y-1 translate-x-1' : ''}`}>
      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L16.5 6.5c1.5-1.5 3-4.5 3-4.5s-3 1.5-4.5 3L4.5 16.5z" />
      <path d="M12 9l3 3" />
      <path d="M9 15l-3-3" />
    </g>
    {/* Thrust flames - scale and shake on hover */}
    <g className={`transition-transform duration-500 ease-out ${isHovered ? '-translate-x-0.5 translate-y-0.5' : ''}`}>
      <path d="M9 20a11.5 11.5 0 0 0-3-3" />
      <path d="M11 22a16.5 16.5 0 0 0-5-5" />
    </g>
  </svg>
);

const iconComponents = {
  search: SearchIcon,
  chart: ChartIcon,
  target: TargetIcon,
  rocket: RocketIcon,
};

const Card = ({ number, title, description, iconName, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isHovered || !isTouch) return;

    const handleOutsideClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsHovered(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isHovered, isTouch]);

  const handleTouchStart = () => {
    setIsTouch(true);
  };

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouch) setIsHovered(false);
  };

  const handleClick = () => {
    if (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches) {
      setIsHovered(!isHovered);
    }
  };

  const Icon = iconComponents[iconName] || SearchIcon;

  return (
    <div 
      ref={cardRef}
      style={{ 
        '--theme-color': color,
        animationDelay: `${0.1 + index * 0.12}s`
      }}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full aspect-[256/368] max-w-[256px] flex items-center justify-center select-none cursor-pointer animate-card-wave mx-auto"
    >
      {/* Background SVG - auto scales from 320x460 to 256x368 */}
      <svg 
        className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out ${
          isHovered ? 'scale-[1.02] translate-x-0.5 translate-y-0.5' : ''
        }`}
        viewBox="0 0 320 460"
        fill="none"
      >
        {/* Dotted curve on the left */}
        <path
          d="M 180 16 L 52 16 A 36 36 0 0 0 16 52 L 16 408 A 36 36 0 0 0 52 444 L 180 444"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${
            isHovered ? 'opacity-90' : 'opacity-70'
          }`}
        />
        
        {/* Solid thick bracket on the right with triangle pointer */}
        <path
          d="M 180 16 L 268 16 A 36 36 0 0 1 304 52 L 304 215 L 318 230 L 304 245 L 304 408 A 36 36 0 0 1 268 444 L 180 444"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-500 ease-out ${
            isHovered ? '[filter:drop-shadow(0_0_8px_var(--theme-color))]' : ''
          }`}
        />
      </svg>

      {/* Floating White Card */}
      <div 
        className={`absolute top-[6.1%] left-[8.75%] w-[82.5%] h-[87.8%] bg-white rounded-[16px] sm:rounded-[22px] border border-gray-50/50 z-10 flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          isHovered 
            ? '-translate-y-2 -translate-x-1 sm:-translate-y-3 sm:-translate-x-1 shadow-[0_20px_40px_rgba(0,0,0,0.12),_0_8px_16px_rgba(0,0,0,0.06)]' 
            : 'shadow-[0_12px_28px_rgba(0,0,0,0.05),_0_4px_12px_rgba(0,0,0,0.02)]'
        }`}
      >
        
        {/* Two corners color sweeping animation overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[22px] pointer-events-none">
          {/* Top-Left Overlay */}
          <div 
            style={{ backgroundColor: color }}
            className={`absolute top-0 left-0 w-28 h-28 rounded-br-full origin-top-left transition-all duration-[1500ms] ease-out pointer-events-none ${
              isHovered ? 'scale-[5] opacity-100' : 'scale-0 opacity-0'
            }`}
          />
          {/* Bottom-Right Overlay */}
          <div 
            style={{ backgroundColor: color }}
            className={`absolute bottom-0 right-0 w-28 h-28 rounded-tl-full origin-bottom-right transition-all duration-[1500ms] ease-out pointer-events-none ${
              isHovered ? 'scale-[5] opacity-100' : 'scale-0 opacity-0'
            }`}
          />
        </div>

        {/* Icon inside dotted circle (replaced number) */}
        <div 
          style={{ 
            borderColor: isHovered ? '#ffffff' : color, 
            color: isHovered ? '#ffffff' : color 
          }}
          className={`relative z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-dotted flex items-center justify-center mt-0.5 transition-all duration-[1500ms] ease-in-out ${
            isHovered ? 'scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''
          }`}
        >
          <div className="scale-[0.55] sm:scale-[0.75] transition-colors duration-[1500ms] flex items-center justify-center">
            <Icon isHovered={isHovered} />
          </div>
        </div>

        {/* Text content - turns white on hover */}
        <div className="relative z-10 text-center flex flex-col items-center gap-1 sm:gap-1.5 px-0.5 w-full">
          <h3 
            style={{ color: isHovered ? '#ffffff' : '#374151' }}
            className="font-extrabold text-[10px] sm:text-base tracking-wider uppercase font-sans transition-colors duration-[1500ms]"
          >
            {title}
          </h3>
          <div 
            style={{ 
              color: isHovered ? 'rgba(255, 255, 255, 0.9)' : '#9ca3af',
              whiteSpace: 'pre-line'
            }}
            className="text-[8px] sm:text-[10.5px] leading-relaxed font-normal w-full max-w-[95%] sm:max-w-[170px] transition-colors duration-[1500ms] line-clamp-3 sm:line-clamp-none"
          >
            {description}
          </div>
        </div>

        {/* Click to View Button at the bottom */}
        <button 
          style={{ 
            color: isHovered ? '#ffffff' : color,
            borderColor: isHovered ? 'rgba(255,255,255,0.4)' : `${color}40`,
            backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'
          }} 
          className="relative z-10 mb-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-[1500ms] cursor-pointer hover:!scale-105 active:!scale-95 group/btn"
        >
          <span className="text-[8px] sm:text-[9.5px] font-bold tracking-widest uppercase transition-colors duration-[1500ms] mt-px">
            Click to View
          </span>
          <ArrowRight 
            size={14} 
            strokeWidth={3} 
            className="transition-transform duration-300 group-hover/btn:translate-x-1" 
          />
        </button>

      </div>
    </div>
  );
};

// 24 curated, premium color palettes
const colors = [
  "#3b5a7c", "#e9294f", "#0d9488", "#d97706",
  "#059669", "#4f46e5", "#7c3aed", "#c026d3",
  "#ea580c", "#db2777", "#65a30d", "#2563eb",
  "#dc2626", "#334155", "#15803d", "#9d174d",
  "#b45309", "#0f766e", "#9333ea", "#0284c7",
  "#e11d48", "#1e3a8a", "#0891b2", "#581c87",
];

const iconNames = ["search", "chart", "target", "rocket"];

const AboutUsPage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
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
        @keyframes cardWaveEntrance {
            0% { opacity: 0; transform: translateY(50px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-wave {
            opacity: 0;
            animation: cardWaveEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        `
      }} />
      
      {/* Main Page Container */}
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Outside the Page Box */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 mt-16 md:mt-4">
          <h1 className="animate-header text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 leading-tight">
            About Us
          </h1>
          <p className="animate-desc text-gray-600 text-lg font-medium leading-relaxed">
            Learn about CR-OD CTI, our purpose, mission, vision, objectives, and commitment to building a safer, more aware, and digitally resilient society through cyber awareness, protection, support, and trusted information.
          </p>
        </div>

        {/* The "Page" Box containing everything */}
        <div className="bg-transparent relative">

          {/* Single Grid of Animated Cards Container */}
          <div className="bg-transparent p-2 sm:p-6 md:p-8 rounded-[1rem] sm:rounded-[2rem]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-12 justify-items-center">
              {aboutUsData.map((step, index) => {
                const color = colors[index % colors.length];
                const iconName = iconNames[index % iconNames.length];
                
                return (
                  <Card
                    key={index}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    iconName={iconName}
                    color={color}
                    index={index}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AboutUsPage;
