import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PRINTER_DATA } from './SoftwarePurposePageData';
import NavPageHeader from '../../../components/NavPageHeader';

/**
 * SoftwarePurposePage Component (Printer Model PX-900)
 * 100% Self-Contained Pure Code Graphics (Scalable Vector SVG - Zero Raster Images)
 * 
 * Features:
 * - Molded matte black polycarbonate chassis with 3D fillets & specular glints
 * - Deep paper exit trough with inner feed roller shadow
 * - Pure SVG vertical printed document with smooth retraction and feed animation
 * - Built-in physical Prev and Next buttons on printer face
 * - Digital center status tracker displaying current paragraph (e.g. DOC 01 / 50)
 * - Chrome bezel tactile power/feed button
 * - Electric cyan status LED with radial halo bloom
 * - Fully responsive for all mobile, tablet, laptop, and desktop screen sizes
 * - Built-in mobile touch-swipe gesture support (Swipe Left: Next, Swipe Right: Prev)
 */
export default function SoftwarePurposePage({ className = '' }) {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [isPrinting, setIsPrinting] = useState(true);
  const [isReloading, setIsReloading] = useState(true);
  const [reloadPhase, setReloadPhase] = useState('booting'); // 'retracting' | 'booting' | 'feeding' | 'ready'
  const [printProgress, setPrintProgress] = useState(0.04);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalParagraphs = PRINTER_DATA.length;
  const currentItem = PRINTER_DATA[currentDocIndex] || PRINTER_DATA[0] || {};
  const currentNum = String(currentDocIndex + 1).padStart(2, '0');
  const totalNum = String(totalParagraphs).padStart(2, '0');

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isDropdownOpen]);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Filtered documents for search
  const filteredDocs = PRINTER_DATA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const idMatch = String(item.id) === q || String(item.id).padStart(2, '0') === q;
    const titleMatch = item.title.toLowerCase().includes(q);
    return idMatch || titleMatch;
  });

  // Document feed animation sequence (silent operation)
  const feedDocument = useCallback((targetIndex) => {
    if (isPrinting || isReloading) return;
    setIsPrinting(true);
    setPrintProgress(0.12); // retract current paper into slot

    setTimeout(() => {
      setCurrentDocIndex(targetIndex);
      setPrintProgress(1); // smoothly feed out new document
      setTimeout(() => {
        setIsPrinting(false);
      }, 1600);
    }, 220);
  }, [isPrinting, isReloading]);

  // Hardware Reload Sequence (plays motor, sensor recalibration & thermal print scan)
  const handleReload = useCallback(() => {
    if (isPrinting || isReloading) return;
    setIsReloading(true);
    setIsPrinting(true);
    setReloadPhase('retracting');
    setIsDropdownOpen(false);

    // Step 1: Smoothly retract paper into slot
    setPrintProgress(0.04);

    // Step 2: Recalibrate diagnostic hardware
    const t1 = setTimeout(() => {
      setReloadPhase('booting');
    }, 280);

    // Step 3: Dispense paper with thermal laser scan beam
    const t2 = setTimeout(() => {
      setReloadPhase('feeding');
      setPrintProgress(1);
    }, 620);

    // Step 4: Ready steady state
    const t3 = setTimeout(() => {
      setReloadPhase('ready');
      setIsReloading(false);
      setIsPrinting(false);
    }, 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isPrinting, isReloading]);

  // Initial Hardware Boot & Feed Sequence on page load / refresh
  useEffect(() => {
    const t1 = setTimeout(() => {
      setReloadPhase('feeding');
      setPrintProgress(1);
    }, 450);

    const t2 = setTimeout(() => {
      setReloadPhase('ready');
      setIsReloading(false);
      setIsPrinting(false);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentDocIndex + 1) % totalParagraphs;
    feedDocument(nextIndex);
  }, [currentDocIndex, feedDocument, totalParagraphs]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentDocIndex - 1 + totalParagraphs) % totalParagraphs;
    feedDocument(prevIndex);
  }, [currentDocIndex, feedDocument, totalParagraphs]);

  const handlePrintCurrent = useCallback(() => {
    handleReload();
  }, [handleReload]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDropdownOpen) return; // Prevent key conflict while typing in dropdown
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handlePrintCurrent();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handlePrintCurrent, handleReload, isDropdownOpen]);

  // Mobile Touch Swipe Handlers for seamless phone & tablet navigation
  const handleTouchStart = (e) => {
    if (isDropdownOpen) return;
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (isDropdownOpen) return;
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Detect horizontal swipe if deltaX is significantly larger than vertical deltaY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext(); // Swiped left -> Next document
      } else {
        handlePrev(); // Swiped right -> Previous document
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className={`relative min-h-[100dvh] w-full software-purpose-environment flex flex-col items-center justify-start transition-colors duration-300 overflow-x-hidden bg-transparent text-slate-800 p-2 sm:p-4 md:p-6 select-none ${className}`}>
      {/* Embedded Component Styles */}
      <style>{`
        .software-purpose-environment {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          color-scheme: light;
          background: transparent !important;
        }

        .watermark-bg:has(.software-purpose-environment) {
          background-color: #f8fafc !important;
        }

        .watermark-bg:has(.software-purpose-environment)::before {
          opacity: 0.18 !important;
          display: block !important;
        }

        /* Custom Scrollbars */
        .software-purpose-environment ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .software-purpose-environment ::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.6);
        }
        .software-purpose-environment ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.45);
          border-radius: 9999px;
        }
        .software-purpose-environment ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.65);
        }

        /* Subtle glow and shadow utilities */
        .glow-cyan {
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.25);
        }

        .glow-ambient {
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
        }

        .glass-panel {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>

      {/* Background Ambient Studio Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-[15%] left-1/2 -translate-x-1/2 w-[950px] h-[500px] bg-cyan-400/10 blur-[130px] rounded-full transition-all duration-700 ${isReloading ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`} />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-white/40 blur-[150px] rounded-full" />
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-200/20 blur-[120px] rounded-full" />
      </div>

      {/* NavPageHeader with unified design */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20 mb-2 sm:mb-4">
        <NavPageHeader
          title="Software Purpose"
          description="Learn why the platform exists and how it aims to help people recognize digital risks and make more informed online decisions across 50 dedicated documentation outputs."
        />
      </div>

      {/* Center Stage: Hardware Printer with Vertical Document */}
      <main
        className="relative flex items-center justify-center w-full max-w-5xl mx-auto z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Responsive Stage Container */}
        <div
          className="relative w-full max-w-[940px] transition-all duration-300"
          style={{
            aspectRatio: '960 / 760',
          }}
        >
        {/* =================================================================== */}
        {/* 100% PURE SVG VECTOR HARDWARE ARTWORK (MATTE BLACK CHASSIS)        */}
        {/* =================================================================== */}
        <svg
          viewBox="20 120 960 760"
          className="w-full h-full block pointer-events-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Ambient & Contact Shadow Filters */}
            <filter id="floorSoftBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="22" />
            </filter>

            <filter id="floorContactBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>

            <filter id="paperShadowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>

            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="specularGlint" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>

            {/* Matte Black Polycarbonate Gradients */}
            <linearGradient id="frontUpperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3c3e44" />
              <stop offset="15%" stopColor="#2c2d33" />
              <stop offset="65%" stopColor="#1e2023" />
              <stop offset="100%" stopColor="#161719" />
            </linearGradient>

            <linearGradient id="frontLowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1b1e" />
              <stop offset="40%" stopColor="#141517" />
              <stop offset="85%" stopColor="#101113" />
              <stop offset="100%" stopColor="#1b1c20" />
            </linearGradient>

            <linearGradient id="topSurfaceGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#36383e" />
              <stop offset="35%" stopColor="#2b2d32" />
              <stop offset="75%" stopColor="#1f2024" />
              <stop offset="100%" stopColor="#17181a" />
            </linearGradient>

            <linearGradient id="topChamferHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.04)" />
              <stop offset="12%" stopColor="rgba(255, 255, 255, 0.25)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="88%" stopColor="rgba(255, 255, 255, 0.25)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
            </linearGradient>

            <linearGradient id="leftEndShading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#101113" />
              <stop offset="55%" stopColor="#1e2023" />
              <stop offset="100%" stopColor="#2c2e33" />
            </linearGradient>

            <linearGradient id="rightEndShading" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#101113" />
              <stop offset="55%" stopColor="#1e2023" />
              <stop offset="100%" stopColor="#2c2e33" />
            </linearGradient>

            <linearGradient id="chromeBezel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="32%" stopColor="#d5dbe4" />
              <stop offset="68%" stopColor="#818894" />
              <stop offset="100%" stopColor="#434750" />
            </linearGradient>

            <linearGradient id="buttonCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2c31" />
              <stop offset="100%" stopColor="#141517" />
            </linearGradient>

            <radialGradient id="cyanLedHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="28%" stopColor="#67e8f9" />
              <stop offset="65%" stopColor="#00a6ff" />
              <stop offset="100%" stopColor="rgba(0, 166, 255, 0)" />
            </radialGradient>

            <linearGradient id="latchCavityShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0a0c" />
              <stop offset="40%" stopColor="#121315" />
              <stop offset="100%" stopColor="#1a1b1e" />
            </linearGradient>

            <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#fafbfc" />
              <stop offset="96%" stopColor="#f3f5f8" />
              <stop offset="100%" stopColor="#e5e9ee" />
            </linearGradient>

            <linearGradient id="embeddedBtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#32353c" />
              <stop offset="30%" stopColor="#25272c" />
              <stop offset="75%" stopColor="#1a1b1f" />
              <stop offset="100%" stopColor="#141517" />
            </linearGradient>

            {/* Thermal Print Laser Scan Beam Gradient */}
            <linearGradient id="thermalLaserGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="12%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="88%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Realistic Multi-Layer Floor Drop Shadows */}
          <ellipse
            cx="500"
            cy="860"
            rx="475"
            ry="58"
            fill="rgba(15, 23, 42, 0.22)"
            filter="url(#floorSoftBlur)"
          />
          <rect
            x="58"
            y="832"
            width="884"
            height="28"
            rx="14"
            fill="rgba(10, 12, 15, 0.48)"
            filter="url(#floorContactBlur)"
          />
          <rect
            x="76"
            y="842"
            width="848"
            height="8"
            rx="4"
            fill="rgba(5, 6, 8, 0.75)"
            filter="url(#specularGlint)"
          />

          {/* 2. Chassis Lower & Upper Face */}
          <path
            d="M 44 764 L 44 814 C 44 834, 60 848, 80 848 L 920 848 C 940 848, 956 834, 956 814 L 956 764 Z"
            fill="url(#frontLowerGrad)"
          />
          <path
            d="M 80 680 L 920 680 C 940 680, 956 696, 956 716 L 956 764 L 44 764 L 44 716 C 44 696, 60 680, 80 680 Z"
            fill="url(#frontUpperGrad)"
          />

          {/* Rounded End Shading */}
          <path
            d="M 80 680 C 60 680, 44 696, 44 716 L 44 814 C 44 834, 60 848, 80 848 L 120 848 L 120 680 Z"
            fill="url(#leftEndShading)"
            opacity="0.65"
          />
          <path
            d="M 920 680 C 940 680, 956 696, 956 716 L 956 814 C 956 834, 940 848, 920 848 L 880 848 L 880 680 Z"
            fill="url(#rightEndShading)"
            opacity="0.65"
          />

          {/* Bottom Lip Highlight */}
          <path
            d="M 80 847 L 920 847"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* 3. Embedded Prev Button (Hardware Face) */}
          <g
            className="cursor-pointer group"
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            aria-label="Previous Paragraph"
          >
            <rect
              x="173"
              y="784"
              width="158"
              height="44"
              rx="22"
              fill="rgba(5, 6, 8, 0.75)"
              filter="url(#specularGlint)"
            />
            <rect
              x="175"
              y="786"
              width="154"
              height="40"
              rx="20"
              fill="url(#embeddedBtnGrad)"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.4"
            />
            <path
              d="M 195 787.5 L 305 787.5"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 218 806 L 229 799 L 229 813 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            <text
              x="244"
              y="806"
              fill="#ffffff"
              fontSize="16"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="0.04em"
              dominantBaseline="central"
            >
              Prev
            </text>
          </g>

          {/* Center Document Tracker Display with Dropdown Trigger */}
          <g
            className="cursor-pointer group"
            onClick={() => !isReloading && setIsDropdownOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-label="Jump to Document Dropdown"
          >
            <rect
              x="427"
              y="791"
              width="146"
              height="30"
              rx="15"
              fill="#0d0e11"
              stroke={isDropdownOpen ? '#38bdf8' : isReloading ? '#06b6d4' : 'rgba(255, 255, 255, 0.16)'}
              strokeWidth="1.2"
              className="transition-colors group-hover:stroke-cyan-400"
            />
            <circle cx="443" cy="806" r="3" fill="#38bdf8">
              {isReloading && (
                <animate
                  attributeName="opacity"
                  values="0.2; 1; 0.2"
                  dur="0.24s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <text
              x="454"
              y="806"
              fill={isReloading ? '#38bdf8' : '#cbd5e1'}
              fontSize="11.5"
              fontWeight="700"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              letterSpacing="0.03em"
              dominantBaseline="central"
            >
              {isReloading
                ? reloadPhase === 'retracting'
                  ? 'CALIBRATING...'
                  : reloadPhase === 'booting'
                  ? 'BOOTING PX-900'
                  : 'FEEDING PAPER'
                : `DOC ${currentNum} / ${totalNum}`}
            </text>
            {/* Dropdown Chevron Indicator (Hidden during reload) */}
            {!isReloading && (
              <path
                d={isDropdownOpen ? "M 552 808 L 556 804 L 560 808" : "M 552 804 L 556 808 L 560 804"}
                stroke={isDropdownOpen ? "#38bdf8" : "#94a3b8"}
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors group-hover:stroke-cyan-300"
              />
            )}
          </g>

          {/* Embedded Next Button (Hardware Face) */}
          <g
            className="cursor-pointer group"
            onClick={handleNext}
            role="button"
            tabIndex={0}
            aria-label="Next Paragraph"
          >
            <rect
              x="668"
              y="784"
              width="158"
              height="44"
              rx="22"
              fill="rgba(5, 6, 8, 0.75)"
              filter="url(#specularGlint)"
            />
            <rect
              x="670"
              y="786"
              width="154"
              height="40"
              rx="20"
              fill="url(#embeddedBtnGrad)"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.4"
            />
            <path
              d="M 690 787.5 L 800 787.5"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <text
              x="706"
              y="806"
              fill="#ffffff"
              fontSize="16"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="0.04em"
              dominantBaseline="central"
            >
              Next
            </text>
            <path
              d="M 776 806 L 765 799 L 765 813 Z"
              fill="#ffffff"
              opacity="0.95"
            />
          </g>

          {/* 4. Horizontal Parting Line Groove */}
          <line
            x1="44"
            y1="764"
            x2="956"
            y2="764"
            stroke="#090a0c"
            strokeWidth="2.6"
          />
          <line
            x1="46"
            y1="765.5"
            x2="954"
            y2="765.5"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.8"
          />

          {/* 5. Receding Top Surface */}
          <path
            d="M 80 680 L 920 680 C 940 680, 956 664, 952 644 L 934 576 C 928 562, 914 558, 898 558 L 102 558 C 86 558, 72 562, 66 576 L 48 644 C 44 664, 60 680, 80 680 Z"
            fill="url(#topSurfaceGrad)"
          />
          <path
            d="M 80 679.5 L 920 679.5"
            stroke="url(#topChamferHighlight)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#specularGlint)"
          />
          <path
            d="M 102 558 L 898 558"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* 6. Release Latches */}
          {/* Left Latch */}
          <g>
            <rect
              x="88"
              y="564"
              width="96"
              height="72"
              rx="14"
              fill="url(#latchCavityShadow)"
              stroke="#090a0c"
              strokeWidth="1.8"
            />
            <path d="M 90 565 L 182 565" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            <rect x="92" y="568" width="88" height="64" rx="11" fill="#191a1d" />
            <path d="M 96 626 L 176 626" stroke="#0b0b0d" strokeWidth="1.8" />
          </g>

          {/* Right Latch */}
          <g>
            <rect
              x="816"
              y="564"
              width="96"
              height="72"
              rx="14"
              fill="url(#latchCavityShadow)"
              stroke="#090a0c"
              strokeWidth="1.8"
            />
            <path d="M 818 565 L 910 565" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            <rect x="820" y="568" width="88" height="64" rx="11" fill="#191a1d" />
            <path d="M 824 626 L 904 626" stroke="#0b0b0d" strokeWidth="1.8" />
          </g>

          {/* 7. Chrome Power / Feed Button */}
          <g
            className="cursor-pointer"
            onClick={handlePrintCurrent}
            role="button"
            tabIndex={0}
            aria-label="Power / Feed Button"
            transform="translate(806, 650)"
          >
            <rect
              x="-39"
              y="-14"
              width="78"
              height="28"
              rx="14"
              fill="rgba(5, 6, 8, 0.72)"
              filter="url(#specularGlint)"
            />
            <rect
              x="-38"
              y="-13"
              width="76"
              height="26"
              rx="13"
              fill="none"
              stroke="url(#chromeBezel)"
              strokeWidth="2.5"
            />
            <rect
              x="-35"
              y="-10"
              width="70"
              height="20"
              rx="10"
              fill="url(#buttonCapGrad)"
            />
            <rect
              x="-29"
              y="-6"
              width="58"
              height="12"
              rx="6"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1"
            />
          </g>

          {/* 8. Cyan Status LED (Continuous Heartbeat / Rapid Diagnostic Pulse when Reloading) */}
          <g transform="translate(738, 650)">
            {/* Outer Radial Halo Glow */}
            <circle
              cx="0"
              cy="0"
              r="13"
              fill="url(#cyanLedHalo)"
              filter="url(#cyanGlow)"
            >
              <animate
                attributeName="opacity"
                values={isReloading ? "0.15; 1; 0.15" : "0.25; 1; 0.25"}
                dur={isReloading ? "0.18s" : isPrinting ? "0.32s" : "1.5s"}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={isReloading ? "8; 17; 8" : "9; 15; 9"}
                dur={isReloading ? "0.18s" : isPrinting ? "0.32s" : "1.5s"}
                repeatCount="indefinite"
              />
            </circle>

            {/* Inner Electric Cyan LED Core */}
            <circle cx="0" cy="0" r="3.8" fill="#38bdf8">
              <animate
                attributeName="fill"
                values={isReloading ? "#0284c7; #a5f3fc; #0284c7" : "#0284c7; #67e8f9; #0284c7"}
                dur={isReloading ? "0.18s" : isPrinting ? "0.32s" : "1.5s"}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.65; 1; 0.65"
                dur={isReloading ? "0.18s" : isPrinting ? "0.32s" : "1.5s"}
                repeatCount="indefinite"
              />
            </circle>

            {/* Dome Glass Specular Hotspot */}
            <circle cx="-0.8" cy="-0.8" r="1.3" fill="#ffffff">
              <animate
                attributeName="opacity"
                values="0.4; 1; 0.4"
                dur={isReloading ? "0.18s" : isPrinting ? "0.32s" : "1.5s"}
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* 9. Paper Exit Trough & Slot */}
          <rect x="184" y="618" width="632" height="18" rx="2" fill="#060607" />
          <rect x="184" y="618" width="632" height="5" fill="#000000" />
          <line
            x1="186"
            y1="636"
            x2="814"
            y2="636"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
          />
          <rect
            x="186"
            y="612"
            width="628"
            height="22"
            fill="rgba(6, 8, 11, 0.45)"
            filter="url(#paperShadowBlur)"
          />

          {/* Active Thermal Print Laser Scan Array during Printing & Reload */}
          {(isPrinting || isReloading) && (
            <g className="transition-opacity duration-300 pointer-events-none">
              {/* Diffuse horizontal cyan aura along slot */}
              <rect
                x="184"
                y="630"
                width="632"
                height="6"
                rx="3"
                fill="url(#thermalLaserGlow)"
                filter="url(#cyanGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.45; 0.95; 0.45"
                  dur="0.35s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Ultra-hot bright core laser line */}
              <line
                x1="186"
                y1="633"
                x2="814"
                y2="633"
                stroke="#e0f2fe"
                strokeWidth="2.2"
                filter="url(#cyanGlow)"
              >
                <animate
                  attributeName="stroke"
                  values="#7dd3fc; #ffffff; #38bdf8; #ffffff; #7dd3fc"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Dynamic sweeping thermal scan focal bead */}
              <circle cy="633" r="5" fill="#ffffff" filter="url(#cyanGlow)">
                <animate
                  attributeName="cx"
                  values="210; 790; 210"
                  dur="0.75s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="3.5; 6; 3.5"
                  dur="0.75s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}

          {/* 10. Printed Document Sheet with Smooth Feed Animation */}
          <g
            style={{
              transform: `scaleY(${printProgress})`,
              transformOrigin: '500px 636px',
              transition: isReloading
                ? reloadPhase === 'feeding'
                  ? 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* Paper Base White Sheet */}
            <rect x="186" y="146" width="628" height="490" fill="url(#paperGrad)" />
            <rect
              x="186"
              y="146"
              width="628"
              height="490"
              fill="none"
              stroke="#e2e6eb"
              strokeWidth="1.2"
            />
            <line x1="186" y1="146" x2="814" y2="146" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="186" y="622" width="628" height="14" fill="rgba(0, 0, 0, 0.07)" />

            {/* Document Content Inside foreignObject */}
            <foreignObject
              x="186"
              y="146"
              width="628"
              height="490"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="w-full h-full font-sans text-neutral-900 antialiased select-none flex flex-col"
                style={{
                  padding: '42px 48px 36px 48px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Title & Page Indicator */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-[21px] sm:text-[22px] font-extrabold tracking-tight text-neutral-900 leading-snug flex-1">
                    {currentItem.title || `CR CTI Purpose #${currentNum}`}
                  </h1>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100/90 border border-neutral-300 text-neutral-700 shrink-0 font-mono text-xs font-bold tracking-wider shadow-xs select-none">
                    <span className="text-neutral-400 text-[10px] uppercase tracking-widest font-semibold">PAGE</span>
                    <span className="text-neutral-900 font-extrabold">{currentNum}</span>
                    <span className="text-neutral-300 font-light">/</span>
                    <span className="text-neutral-500 font-semibold">{totalNum}</span>
                  </div>
                </div>

                {/* Divider Line directly below Title */}
                <div className="w-full border-b-[1.5px] border-neutral-300 mt-3.5 mb-5" />

                {/* Beautifully Formatted Content */}
                <div className="text-[15px] leading-[1.82] text-neutral-800 text-justify font-normal tracking-[-0.01em] overflow-y-auto pr-1">
                  {currentItem.text}
                </div>
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* =================================================================== */}
        {/* Invisible Accessible Click Overlays for All Pointer/Touch Devices   */}
        {/* =================================================================== */}
        {/* Power / Feed Button Overlay */}
        <button
          type="button"
          onClick={handlePrintCurrent}
          className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 z-20"
          style={{
            left: '76%',
            top: '66%',
            width: '12%',
            height: '8%',
          }}
          title="Click Power / Feed Button to Re-print"
          aria-label="Feed or Re-print Document"
        />

        {/* Embedded Prev Button Overlay (Generous touch target) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 touch-manipulation z-20"
          style={{
            left: '15.0%',
            top: '85.0%',
            width: '19%',
            height: '10%',
          }}
          title="Previous Document (Swipe Right / Left-Arrow)"
          aria-label="Previous Document"
        />

        {/* Center Dropdown Tracker Button Overlay (Generous touch target) */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 z-20"
          style={{
            left: '41.0%',
            top: '85.0%',
            width: '18%',
            height: '10%',
          }}
          title="Click to jump to any document (1 - 50)"
          aria-label="Select Document Dropdown"
        />

        {/* Embedded Next Button Overlay (Generous touch target) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 touch-manipulation z-20"
          style={{
            left: '66.0%',
            top: '85.0%',
            width: '19%',
            height: '10%',
          }}
          title="Next Document (Swipe Left / Right-Arrow)"
          aria-label="Next Document"
        />

        {/* =================================================================== */}
        {/* Interactive Quick-Jump Document Dropdown (Responsive Drawer/Modal)  */}
        {/* =================================================================== */}
        {isDropdownOpen && (
          <>
            {/* Backdrop for click outside */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setIsDropdownOpen(false)}
            />

            <div
              ref={dropdownRef}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="fixed inset-x-3 bottom-4 sm:bottom-[13%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 w-auto sm:w-[94%] sm:max-w-[500px] max-h-[82vh] sm:max-h-[380px] bg-[#0c0e13]/98 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-2xl p-3 sm:p-4 text-slate-100 transition-all duration-200 flex flex-col"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(6, 182, 212, 0.25)',
              }}
            >
              {/* Dropdown Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-300">
                    Jump to Purpose
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    {totalParagraphs} Documents
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="sm:hidden text-slate-400 hover:text-white px-2 py-0.5 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Search Input Filter */}
              <div className="relative mb-2.5 shrink-0">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search purpose (e.g. Scam, Privacy, 15)..."
                  className="w-full bg-[#151821] border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 font-sans tracking-wide transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Scrollable Document List */}
              <div className="overflow-y-auto space-y-1 pr-1 flex-1 custom-scroll">
                {filteredDocs.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400 font-mono">
                    No matching purpose found
                  </div>
                ) : (
                  filteredDocs.map((item) => {
                    const itemIndex = item.id - 1;
                    const isCurrent = itemIndex === currentDocIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          feedDocument(itemIndex);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 text-xs transition-all ${
                          isCurrent
                            ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-semibold shadow-sm'
                            : 'hover:bg-white/10 text-slate-300 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded shrink-0 ${
                              isCurrent
                                ? 'bg-cyan-400 text-black font-extrabold'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {String(item.id).padStart(2, '0')}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </div>
                        {isCurrent && (
                          <span className="text-cyan-400 text-xs font-mono shrink-0">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bottom Tip */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0">
                <span>Click any to jump & print</span>
                <span>ESC to close</span>
              </div>
            </div>
          </>
        )}
        </div>
      </main>
    </div>
  );
}

export { SoftwarePurposePage, SoftwarePurposePage as Printer };
