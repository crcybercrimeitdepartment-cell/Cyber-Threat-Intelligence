import React, { useState, useEffect, useCallback } from 'react';
import { blackComputerSections, CRT_THEMES, BIOS_LINES } from './SoftwareOverviewPageData';
import NavPageHeader from '../../../components/NavPageHeader';

export default function BlackComputer({ className = '' }) {
  // Screen power state: true by default to show rich terminal content
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [crtColorTheme, setCrtColorTheme] = useState('green');
  const [pressedKeyId, setPressedKeyId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState('next');
  
  // Option 2: ROM BIOS Boot Sequence State & CRT Ignition
  const [isBooting, setIsBooting] = useState(true);
  const [isCrtIgniting, setIsCrtIgniting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const bootTimeoutsRef = React.useRef([]);

  const activeTheme = CRT_THEMES[crtColorTheme] || CRT_THEMES.green;
  const currentSec = blackComputerSections[currentSectionIndex] || blackComputerSections[0];

  // Terminal audio removed as requested by user (100% silent operation)
  const playTerminalChirp = useCallback(() => {}, []);

  // Cancel/Skip boot sequence directly to Section 1
  const skipBoot = useCallback(() => {
    bootTimeoutsRef.current.forEach(clearTimeout);
    bootTimeoutsRef.current = [];
    setIsCrtIgniting(false);
    setIsBooting(false);
  }, []);

  // Trigger Mainframe ROM BIOS Boot & CRT Ignition Sequence on Page Load / Refresh
  const triggerBiosBoot = useCallback(() => {
    bootTimeoutsRef.current.forEach(clearTimeout);
    bootTimeoutsRef.current = [];

    setIsCrtIgniting(true);
    setIsBooting(true);
    setBootStep(0);

    // Phase 1: High-Voltage Cathode Ray Tube (CRT) Electron Beam Ignition Flash (0 to 360ms)
    const igniteId = setTimeout(() => {
      setIsCrtIgniting(false);
    }, 360);
    bootTimeoutsRef.current.push(igniteId);

    // Phase 2: Sequential Mainframe Diagnostics Telemetry lines
    const scheduleStep = (step, delay) => {
      const id = setTimeout(() => {
        setBootStep(step);
      }, delay);
      bootTimeoutsRef.current.push(id);
    };

    scheduleStep(1, 400);
    scheduleStep(2, 650);
    scheduleStep(3, 900);
    scheduleStep(4, 1150);
    scheduleStep(5, 1400);

    // Phase 3: CRT Raster Sweep down to Section 1
    const finishId = setTimeout(() => {
      setIsTransitioning(true);
      setTransitionDir('next');
      setIsBooting(false);
      setTimeout(() => setIsTransitioning(false), 280);
    }, 1850);
    bootTimeoutsRef.current.push(finishId);
  }, []);

  // Run BIOS Boot on initial load / page refresh
  useEffect(() => {
    triggerBiosBoot();
    return () => {
      bootTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [triggerBiosBoot]);

  // Tactile click sound disabled (silent operation)
  const playMechanicalClick = () => {};

  // Section Navigation Handlers with Authentic CRT Raster Animation Timing
  const handlePrevSection = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    playTerminalChirp(780);
    setIsTransitioning(true);
    setTransitionDir('prev');
    setCurrentSectionIndex((prev) => (prev > 0 ? prev - 1 : blackComputerSections.length - 1));
    setTimeout(() => setIsTransitioning(false), 280);
  }, [playTerminalChirp]);

  const handleNextSection = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    playTerminalChirp(1050);
    setIsTransitioning(true);
    setTransitionDir('next');
    setCurrentSectionIndex((prev) => (prev < blackComputerSections.length - 1 ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), 280);
  }, [playTerminalChirp]);

  const handleSelectSection = useCallback((index) => {
    playTerminalChirp(920);
    setIsTransitioning(true);
    setTransitionDir(index >= currentSectionIndex ? 'next' : 'prev');
    setCurrentSectionIndex(index);
    setTimeout(() => setIsTransitioning(false), 280);
  }, [currentSectionIndex, playTerminalChirp]);

  const handleKeyPress = (keyObj) => {
    setPressedKeyId(keyObj.id);
    playMechanicalClick(keyObj.type || 'alpha');
    setTimeout(() => setPressedKeyId(null), 140);

    // Keyboard keys navigate sections or trigger audio
    if (keyObj.label === '←' || keyObj.isArrow) {
      handlePrevSection();
    } else if (keyObj.type === 'return' || keyObj.label === 'Return') {
      handleNextSection();
    } else if (keyObj.type === 'space') {
      handleNextSection();
    }
  };

  // Touch swipe gesture handlers for fluid mobile/tablet navigation
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Only swipe if horizontal movement is dominant and greater than 40px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextSection();
      } else {
        handlePrevSection();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Physical Keyboard navigation listener (Left/Right Arrows, PageUp/PageDown, Space, Enter, R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If booting, any key press (except R) skips directly to Section 1
      if (isBooting && e.key !== 'r' && e.key !== 'R') {
        skipBoot();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevSection();
      } else if (e.key === ' ') {
        handleKeyPress({ id: 'space', label: '␣', type: 'space' });
      } else if (e.key === 'Enter') {
        handleKeyPress({ id: 'r3-k13', label: 'Return', type: 'return' });
      } else if (e.key === 'Backspace') {
        handlePrevSection();
      } else if (e.key === 'r' || e.key === 'R') {
        handleKeyPress({ id: 'r3-5', label: 'R', type: 'alpha' });
        triggerBiosBoot();
      } else if (e.key.length === 1) {
        handleKeyPress({ id: `key-${e.key.toLowerCase()}`, label: e.key.toUpperCase(), type: 'alpha' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSection, handlePrevSection, triggerBiosBoot, skipBoot, isBooting]);

  // Exact 6-Row Precision Key Definition Arrays (1:1 with media_1792056060845.png)
  const row1Keys = [
    { id: 'r1-1', x: 166.3, w: 37.5, label: '—', type: 'alpha' },
    { id: 'r1-2', x: 205.3, w: 43.6, label: '—', type: 'alpha' },
    { id: 'r1-3', x: 252.0, w: 42.1, label: '—', type: 'alpha' },
    { id: 'r1-4', x: 297.2, w: 42.1, label: '—', type: 'alpha' },
    { id: 'r1-5', x: 343.1, w: 42.1, label: '—', type: 'alpha' },
    { id: 'r1-6', x: 388.3, w: 42.9, label: '—', type: 'alpha' },
    { id: 'r1-7', x: 435.0, w: 42.9, label: '—', type: 'alpha' },
    { id: 'r1-8', x: 481.7, w: 42.9, label: '—', type: 'alpha' },
    { id: 'r1-9', x: 527.7, w: 42.9, label: '—', type: 'alpha' },
    { id: 'r1-10', x: 574.4, w: 40.6, label: '—', type: 'alpha' },
    { id: 'r1-11', x: 633.3, w: 29.1, label: '—', type: 'alpha' },
    { id: 'r1-12', x: 665.5, w: 29.9, label: '—', type: 'alpha' },
    { id: 'r1-13', x: 717.5, w: 31.4, label: '—', type: 'alpha' },
    { id: 'r1-14', x: 751.2, w: 31.4, label: '—', type: 'alpha' },
    { id: 'r1-15', x: 784.9, w: 31.4, label: '+', type: 'alpha' },
    { id: 'r1-16', x: 818.6, w: 44.4, label: '—', type: 'alpha' },
  ];

  const row2Keys = [
    { id: 'r2-1', x: 156.3, w: 32.9, label: '|', type: 'alpha' },
    { id: 'r2-2', x: 192.3, w: 32.2, label: '1', sub: '!', type: 'alpha' },
    { id: 'r2-3', x: 227.5, w: 32.2, label: '2', sub: '"', type: 'alpha' },
    { id: 'r2-4', x: 262.8, w: 31.4, label: '3', sub: '#', type: 'alpha' },
    { id: 'r2-5', x: 298.0, w: 31.4, label: '4', sub: '$', type: 'alpha' },
    { id: 'r2-6', x: 333.2, w: 31.4, label: '5', sub: '%', type: 'alpha' },
    { id: 'r2-7', x: 368.4, w: 31.4, label: '6', sub: '&', type: 'alpha' },
    { id: 'r2-8', x: 403.6, w: 31.4, label: '7', sub: "'", type: 'alpha' },
    { id: 'r2-9', x: 438.1, w: 32.2, label: '8', sub: '(', type: 'alpha' },
    { id: 'r2-10', x: 474.1, w: 31.4, label: '9', sub: ')', type: 'alpha' },
    { id: 'r2-11', x: 509.3, w: 31.4, label: '0', sub: '~', type: 'alpha' },
    { id: 'r2-12', x: 544.5, w: 31.4, label: ':', sub: '+', type: 'alpha' },
    { id: 'r2-13', x: 579.7, w: 39.0, label: '←', isArrow: true, type: 'alpha' },
    { id: 'r2-14', x: 637.1, w: 29.9, label: '—', type: 'alpha' },
    { id: 'r2-15', x: 670.8, w: 29.9, label: '—', type: 'alpha' },
    { id: 'r2-16', x: 722.9, w: 32.2, label: '7', type: 'alpha' },
    { id: 'r2-17', x: 758.1, w: 31.4, label: '8', type: 'alpha' },
    { id: 'r2-18', x: 791.8, w: 32.9, label: '9', type: 'alpha' },
    { id: 'r2-19', x: 827.0, w: 45.2, label: '+', type: 'alpha' },
  ];

  const row3Keys = [
    { id: 'r3-1', x: 147.9, w: 51.3, label: '—', type: 'alpha' },
    { id: 'r3-2', x: 201.5, w: 32.9, label: 'Q', type: 'alpha' },
    { id: 'r3-3', x: 237.5, w: 33.7, label: 'W', type: 'alpha' },
    { id: 'r3-4', x: 274.2, w: 32.9, label: 'E', type: 'alpha' },
    { id: 'r3-5', x: 310.2, w: 32.9, label: 'R', type: 'alpha' },
    { id: 'r3-6', x: 346.2, w: 33.7, label: 'T', type: 'alpha' },
    { id: 'r3-7', x: 382.2, w: 32.9, label: 'Y', type: 'alpha' },
    { id: 'r3-8', x: 418.9, w: 32.2, label: 'U', type: 'alpha' },
    { id: 'r3-9', x: 454.9, w: 32.2, label: 'I', type: 'alpha' },
    { id: 'r3-10', x: 490.9, w: 32.9, label: 'O', type: 'alpha' },
    { id: 'r3-11', x: 526.9, w: 32.9, label: 'P', type: 'alpha' },
    { id: 'r3-12', x: 563.6, w: 58.2, label: '←', isArrow: true, isReturnHead: true, type: 'return' },
    { id: 'r3-13', x: 639.4, w: 32.2, label: '—', type: 'alpha' },
    { id: 'r3-14', x: 674.7, w: 31.4, label: '—', type: 'alpha' },
    { id: 'r3-15', x: 726.0, w: 33.7, label: '7', type: 'alpha' },
    { id: 'r3-16', x: 762.7, w: 32.9, label: '8', type: 'alpha' },
    { id: 'r3-17', x: 797.9, w: 33.7, label: '9', type: 'alpha' },
    { id: 'r3-18', x: 833.9, w: 45.9, label: '×', type: 'alpha' },
  ];

  const row4Keys = [
    { id: 'r4-1', x: 140.2, w: 55.1, label: '—', type: 'alpha' },
    { id: 'r4-2', x: 199.2, w: 36.0, label: 'A', type: 'alpha' },
    { id: 'r4-3', x: 238.2, w: 34.5, label: 'S', type: 'alpha' },
    { id: 'r4-4', x: 275.8, w: 33.7, label: 'D', type: 'alpha' },
    { id: 'r4-5', x: 313.3, w: 33.7, label: 'F', type: 'alpha' },
    { id: 'r4-6', x: 350.0, w: 34.5, label: 'G', type: 'alpha' },
    { id: 'r4-7', x: 387.5, w: 33.7, label: 'H', type: 'alpha' },
    { id: 'r4-8', x: 424.3, w: 33.7, label: 'J', type: 'alpha' },
    { id: 'r4-9', x: 461.8, w: 33.7, label: 'K', type: 'alpha' },
    { id: 'r4-10', x: 499.3, w: 33.7, label: 'L', type: 'alpha' },
    { id: 'r4-11', x: 536.1, w: 36.8, label: '!', type: 'alpha' },
    { id: 'r4-12', x: 579.0, w: 45.9, label: '', isReturnStem: true, type: 'return' },
    { id: 'r4-13', x: 642.5, w: 32.2, label: '+', type: 'alpha' },
    { id: 'r4-14', x: 677.7, w: 32.2, label: '—', type: 'alpha' },
    { id: 'r4-15', x: 730.5, w: 33.7, label: '4', type: 'alpha' },
    { id: 'r4-16', x: 767.3, w: 33.7, label: '5', type: 'alpha' },
    { id: 'r4-17', x: 804.0, w: 33.7, label: '6', type: 'alpha' },
    { id: 'r4-18', x: 840.0, w: 46.7, label: '—', type: 'alpha' },
  ];

  const row5Keys = [
    { id: 'r5-1', x: 131.8, w: 77.3, label: '—', type: 'alpha' },
    { id: 'r5-2', x: 213.0, w: 35.2, label: 'Z', type: 'alpha' },
    { id: 'r5-3', x: 252.0, w: 34.5, label: 'X', type: 'alpha' },
    { id: 'r5-4', x: 290.3, w: 34.5, label: 'C', type: 'alpha' },
    { id: 'r5-5', x: 328.6, w: 33.7, label: 'V', type: 'alpha' },
    { id: 'r5-6', x: 366.1, w: 34.5, label: 'B', type: 'alpha' },
    { id: 'r5-7', x: 403.6, w: 34.5, label: 'N', type: 'alpha' },
    { id: 'r5-8', x: 441.9, w: 34.5, label: 'M', type: 'alpha' },
    { id: 'r5-9', x: 480.2, w: 34.5, label: '<', sub: ',', type: 'alpha' },
    { id: 'r5-10', x: 518.5, w: 34.5, label: '>', sub: '.', type: 'alpha' },
    { id: 'r5-11', x: 556.8, w: 69.7, label: '←', isArrow: true, type: 'alpha' },
    { id: 'r5-12', x: 645.6, w: 32.2, label: '—', type: 'alpha' },
    { id: 'r5-13', x: 681.5, w: 32.2, label: '—', type: 'alpha' },
    { id: 'r5-14', x: 734.4, w: 35.2, label: '1', type: 'alpha' },
    { id: 'r5-15', x: 772.7, w: 34.5, label: '2', type: 'alpha' },
    { id: 'r5-16', x: 809.4, w: 34.5, label: '3', type: 'alpha' },
    { id: 'r5-17', x: 846.9, w: 47.5, label: '—', type: 'alpha' },
  ];

  const row6Keys = [
    { id: 'r6-1', x: 128.0, w: 49.0, label: '—', type: 'alpha' },
    { id: 'r6-2', x: 179.3, w: 62.8, label: '—', type: 'alpha' },
    { id: 'r6-3', x: 244.4, w: 276.4, label: '', isSpace: true, type: 'space' },
    { id: 'r6-4', x: 523.8, w: 51.3, label: '—', type: 'alpha' },
    { id: 'r6-5', x: 579.0, w: 51.3, label: '←', isArrow: true, type: 'alpha' },
    { id: 'r6-6', x: 648.6, w: 33.7, label: '—', type: 'alpha' },
    { id: 'r6-7', x: 685.4, w: 33.7, label: '—', type: 'alpha' },
    { id: 'r6-8', x: 739.0, w: 74.3, label: '0', type: 'alpha' },
    { id: 'r6-9', x: 817.1, w: 35.2, label: '.', type: 'alpha' },
    { id: 'r6-10', x: 855.3, w: 48.2, label: '—', type: 'alpha' },
  ];

  // Helper to render the unified Big-Ass Return Key (spanning Row 3 & Row 4)
  const renderReturnKey = (k, isPressed) => {
    const dy = isPressed ? 2 : 0;
    const topY = 482.0;
    const baseY = 534.5;
    const frontY = 523.0;
    const stepY = 507.0;

    const headX = 563.6;
    const headW = 58.2;
    const stemX = 579.0;
    const stemW = 45.9;
    const rightTop = headX + headW; // 621.8
    const rightBot = stemX + stemW; // 624.9

    const topDishX = headX + 1.8;
    const topDishW = headW - 3.6;
    const stemDishX = stemX + 1.8;
    const stemDishW = stemW - 3.6;

    return (
      <g
        key={k.id}
        transform={`translate(0, ${dy})`}
        onClick={() => handleKeyPress(k)}
        className="cursor-pointer transition-transform duration-75 select-none"
      >
        {/* Contact Occlusion Drop Shadow */}
        <rect
          x={stemX + 1}
          y={baseY - 1}
          width={stemW - 2}
          height="3.2"
          rx="1.6"
          fill="rgba(0, 0, 0, 0.75)"
          filter="url(#keyShadowBlur)"
        />

        {/* Unified Outer Monolithic L-Shaped Hull with Rounded Corners */}
        <path
          d={`
            M ${headX + 3} ${topY}
            L ${rightTop - 3} ${topY}
            Q ${rightTop} ${topY}, ${rightTop} ${topY + 3}
            L ${rightBot} ${baseY - 3}
            Q ${rightBot} ${baseY}, ${rightBot - 3} ${baseY}
            L ${stemX + 3} ${baseY}
            Q ${stemX} ${baseY}, ${stemX} ${baseY - 3}
            L ${stemX} ${stepY + 3}
            Q ${stemX} ${stepY}, ${stemX - 3} ${stepY}
            L ${headX + 3} ${stepY}
            Q ${headX} ${stepY}, ${headX} ${stepY - 3}
            L ${headX} ${topY + 3}
            Q ${headX} ${topY}, ${headX + 3} ${topY}
            Z
          `}
          fill="url(#keyBodyBaseGrad)"
        />

        {/* Right Flank Ambient Shadow */}
        <polygon
          points={`
            ${rightTop - 2},${topY + 1}
            ${rightTop},${topY + 2.5}
            ${rightBot},${baseY - 1.5}
            ${rightBot - 2},${frontY}
          `}
          fill="url(#keyRightFlankGrad)"
        />

        {/* Bottom Front Skirt */}
        <path
          d={`
            M ${stemDishX} ${frontY}
            L ${stemDishX + stemDishW} ${frontY}
            L ${stemX + stemW} ${baseY - 2.5}
            Q ${stemX + stemW} ${baseY}, ${stemX + stemW - 2.5} ${baseY}
            L ${stemX + 2.5} ${baseY}
            Q ${stemX} ${baseY}, ${stemX} ${baseY - 2.5}
            Z
          `}
          fill="url(#keyFrontSkirtGrad)"
        />

        {/* L-Shaped Top Face */}
        <path
          d={`
            M ${topDishX + 2} ${topY + 0.8}
            L ${rightTop - 2.2} ${topY + 0.8}
            L ${rightBot - 2.2} ${frontY}
            L ${stemDishX} ${frontY}
            L ${stemDishX} ${stepY}
            L ${topDishX} ${stepY}
            Z
          `}
          fill="url(#keyDishBaseGrad)"
        />

        {/* Subtle Dish Scoop in Head Area */}
        <ellipse
          cx={topDishX + topDishW / 2}
          cy={topY + 12}
          rx={topDishW * 0.42}
          ry="7.5"
          fill="url(#subtleDishScoopGrad)"
        />

        {/* Return Arrow Legend */}
        <g>
          <line
            x1={topDishX + topDishW / 2 + 6}
            y1={topY + 12}
            x2={topDishX + topDishW / 2 - 5}
            y2={topY + 12}
            stroke="#382818"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <polyline
            points={`
              ${topDishX + topDishW / 2 - 1.5},${topY + 12 - 3.2}
              ${topDishX + topDishW / 2 - 5.5},${topY + 12}
              ${topDishX + topDishW / 2 - 1.5},${topY + 12 + 3.2}
            `}
            stroke="#382818"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1={topDishX + topDishW / 2 + 6}
            y1={topY + 8}
            x2={topDishX + topDishW / 2 + 6}
            y2={topY + 12}
            stroke="#382818"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Ridge specular filament */}
        <line
          x1={stemDishX + 1.2}
          y1={frontY}
          x2={stemDishX + stemDishW - 1.2}
          y2={frontY}
          stroke="#f6ecd8"
          strokeWidth="0.8"
          opacity="0.85"
        />
      </g>
    );
  };

  // Helper to render an authentic 3D SA spherical dish keycap
  const renderKeycap = (k, yPos, h = 27) => {
    // Stem is rendered as part of the monolithic return key
    if (k.isReturnStem) return null;
    const isPressed = pressedKeyId === k.id;
    if (k.isReturnHead) return renderReturnKey(k, isPressed);

    const dy = isPressed ? 2 : 0;

    // Calculate 3D sloping front skirt & top dish face
    const frontRatio = k.isSpace ? 0.36 : 0.34;
    const frontH = Math.round(h * frontRatio);
    const topH = h - frontH;

    // Subtle side taper
    const insetX = k.w > 60 ? 2.4 : k.w > 35 ? 1.8 : 1.4;
    const topX = k.x + insetX;
    const topW = k.w - insetX * 2;
    const topY = yPos;
    const frontY = yPos + topH;
    const baseY = yPos + h;

    return (
      <g
        key={k.id}
        transform={`translate(0, ${dy})`}
        onClick={() => handleKeyPress(k)}
        className="cursor-pointer transition-transform duration-75 select-none"
      >
        {/* 1. Contact Occlusion Drop Shadow */}
        <rect
          x={k.x + 0.8}
          y={baseY - 1}
          width={k.w - 1.6}
          height="3.2"
          rx="1.6"
          fill="rgba(0, 0, 0, 0.75)"
          filter="url(#keyShadowBlur)"
        />

        {/* 2. Main Outer Molded Body (Soft Rounded Rect Prism) */}
        <rect
          x={k.x}
          y={yPos}
          width={k.w}
          height={h}
          rx="3.2"
          ry="3.2"
          fill="url(#keyBodyBaseGrad)"
        />

        {/* 3. Left Bevel Cheek (Soft diffuse fill light) */}
        <polygon
          points={`
            ${k.x},${yPos + 2.5}
            ${topX},${topY + 0.8}
            ${topX},${frontY}
            ${k.x},${baseY - 1.5}
          `}
          fill="url(#keyLeftFlankGrad)"
        />

        {/* 4. Right Bevel Cheek (Soft ambient shadow flank) */}
        <polygon
          points={`
            ${topX + topW},${topY + 0.8}
            ${k.x + k.w},${yPos + 2.5}
            ${k.x + k.w},${baseY - 1.5}
            ${topX + topW},${frontY}
          `}
          fill="url(#keyRightFlankGrad)"
        />

        {/* 5. Angled Front Skirt (Rounded Bottom Chamfer) */}
        <path
          d={`
            M ${topX} ${frontY}
            L ${topX + topW} ${frontY}
            L ${k.x + k.w} ${baseY - 2.5}
            Q ${k.x + k.w} ${baseY}, ${k.x + k.w - 2.5} ${baseY}
            L ${k.x + 2.5} ${baseY}
            Q ${k.x} ${baseY}, ${k.x} ${baseY - 2.5}
            Z
          `}
          fill={k.isSpace ? 'url(#spacebarFrontGrad)' : 'url(#keyFrontSkirtGrad)'}
        />

        {/* 6. Top Dish Face (Uniform Warm Vintage Cream) */}
        <rect
          x={topX}
          y={topY}
          width={topW}
          height={topH}
          rx="2.6"
          ry="2.6"
          fill={k.isSpace ? 'url(#spacebarTopGrad)' : 'url(#keyDishBaseGrad)'}
        />

        {/* 7. Gentle Concave Dish Scoop (Subtle Natural Occlusion, NO WHITE HALO) */}
        {!k.isSpace && (
          <ellipse
            cx={topX + topW / 2}
            cy={topY + topH / 2}
            rx={Math.max(2, (topW - 3) * 0.44)}
            ry={Math.max(2, (topH - 2) * 0.40)}
            fill="url(#subtleDishScoopGrad)"
          />
        )}

        {/* 8. Bottom Dish Ridge Specular Line */}
        <line
          x1={topX + 1.2}
          y1={frontY}
          x2={topX + topW - 1.2}
          y2={frontY}
          stroke="#f6ecd8"
          strokeWidth="0.8"
          opacity="0.85"
        />

        {/* 9. Top Rim Soft Specular Glint */}
        <line
          x1={topX + 2.2}
          y1={topY + 0.6}
          x2={topX + topW - 2.2}
          y2={topY + 0.6}
          stroke="#fcf7ee"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* 10. Key Legends (Crisp Vintage Dark Umber Ink #382818) */}
        {k.isArrow ? (
          <g>
            <line
              x1={topX + topW / 2 + 5}
              y1={topY + topH / 2}
              x2={topX + topW / 2 - 4.5}
              y2={topY + topH / 2}
              stroke="#382818"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <polyline
              points={`
                ${topX + topW / 2 - 1.2},${topY + topH / 2 - 3.2}
                ${topX + topW / 2 - 4.8},${topY + topH / 2}
                ${topX + topW / 2 - 1.2},${topY + topH / 2 + 3.2}
              `}
              stroke="#382818"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        ) : k.label === '—' ? (
          <line
            x1={topX + topW / 2 - (k.w > 45 ? 7.5 : 4.8)}
            y1={topY + topH / 2}
            x2={topX + topW / 2 + (k.w > 45 ? 7.5 : 4.8)}
            y2={topY + topH / 2}
            stroke="#382818"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        ) : k.label ? (
          <text
            x={topX + topW / 2}
            y={topY + topH / 2 + (k.sub ? 3.5 : 2.5)}
            fill="#382818"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize={k.w > 42 ? '9.2' : k.w < 26 ? '7.5' : '8.4'}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {k.label}
          </text>
        ) : null}

        {/* Sub-Legend (stacked for number row keys) */}
        {k.sub && (
          <text
            x={topX + topW / 2}
            y={topY + topH / 2 - 3.8}
            fill="#54402a"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="6.6"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {k.sub}
          </text>
        )}
      </g>
    );
  };

  return (
    <div
      className={`w-full min-h-screen bg-[#e9e5e2]/85 flex flex-col items-center justify-start py-4 sm:py-6 px-2 sm:px-4 select-none overflow-x-hidden ${className}`}
    >
      {/* Page Hero Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <NavPageHeader
          title="Software Overview"
          description="Explore an overview of CR Cyber Threat Intelligence, its core focus, key areas, and role in promoting cybersecurity knowledge, awareness, and scam prevention across 50 detailed sections."
          className="mb-6 px-4"
        />
      </div>

      {/* 
        MAIN 1024 x 768 VECTOR COMPOSITE CANVAS
        Precision-locked to the exact coordinates of the studio photograph
      */}
      <main
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-[1040px] flex flex-col items-center justify-center mb-10"
      >
        <div
          className="order-2 md:order-1 relative w-full aspect-[1024/768] flex items-center justify-center select-none crt-terminal-power-entrance"
          style={{
            filter: `
              drop-shadow(0 38px 54px rgba(0, 0, 0, 0.42))
              drop-shadow(0 16px 24px rgba(0, 0, 0, 0.28))
              drop-shadow(0 4px 6px rgba(0, 0, 0, 0.16))
            `,
          }}
        >
          <svg
            viewBox="0 0 1024 768"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* ============================================================= */}
              {/* SHADERS & GRADIENTS                                           */}
              {/* ============================================================= */}

              {/* Textured Bakelite Plastic Surface Filter */}
              <filter id="bakeliteTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.12  0 0 0 0 0.13  0 0 0 0 0.14  0 0 0 0 0.16 0"
                  result="coloredNoise"
                />
                <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
              </filter>

              {/* Scanline pattern for active CRT display */}
              <pattern id="scanlinePattern" width="100" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
              </pattern>

              {/* Outer Molded Chassis Body Gradient */}
              <linearGradient id="chassisBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#303236" />
                <stop offset="6%" stopColor="#222326" />
                <stop offset="35%" stopColor="#18191c" />
                <stop offset="60%" stopColor="#1c1d20" />
                <stop offset="85%" stopColor="#151618" />
                <stop offset="97%" stopColor="#0d0e0f" />
                <stop offset="100%" stopColor="#070708" />
              </linearGradient>

              {/* Top Brow Cylindrical Highlight */}
              <linearGradient id="topBrowHighlight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.24)" />
                <stop offset="25%" stopColor="rgba(255, 255, 255, 0.10)" />
                <stop offset="60%" stopColor="rgba(255, 255, 255, 0.02)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Recessed Screen Bevel Chamfer (Cast Shadows & Rim Lights) */}
              <linearGradient id="screenBevelTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45484d" />
                <stop offset="25%" stopColor="#25272a" />
                <stop offset="80%" stopColor="#0e0f11" />
                <stop offset="100%" stopColor="#070809" />
              </linearGradient>

              {/* CRT Glass Surface: Smoked deep black with authentic curved tube sheen */}
              <linearGradient id="crtGlassGrad" x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="#282a2e" />
                <stop offset="20%" stopColor="#191a1d" />
                <stop offset="55%" stopColor="#101114" />
                <stop offset="90%" stopColor="#0a0b0d" />
                <stop offset="100%" stopColor="#050607" />
              </linearGradient>

              {/* CRT Ambient Top-Left Tube Specular Reflection */}
              <radialGradient id="crtGlassReflection" cx="30%" cy="25%" r="65%">
                <stop offset="0%" stopColor="rgba(235, 245, 255, 0.14)" />
                <stop offset="35%" stopColor="rgba(235, 245, 255, 0.05)" />
                <stop offset="65%" stopColor="rgba(255, 255, 255, 0.01)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Flared Side Cheek Bevel Highlight (Left Wing) */}
              <linearGradient id="leftCheekHighlight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
                <stop offset="30%" stopColor="rgba(255, 255, 255, 0.04)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Flared Side Cheek Bevel Highlight (Right Wing) */}
              <linearGradient id="rightCheekHighlight" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
                <stop offset="30%" stopColor="rgba(255, 255, 255, 0.04)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Keyboard Well Inner Sloping Shadow */}
              <linearGradient id="wellFloorShadow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#101113" />
                <stop offset="15%" stopColor="#181a1c" />
                <stop offset="85%" stopColor="#1f2124" />
                <stop offset="100%" stopColor="#161719" />
              </linearGradient>

              {/* Front Lip Specular Highlight Stripe */}
              <linearGradient id="frontLipSpecular" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9e9590" />
                <stop offset="40%" stopColor="#4f4a47" />
                <stop offset="75%" stopColor="#252423" />
                <stop offset="100%" stopColor="#101010" />
              </linearGradient>

              {/* Soft Contact Drop Shadow Blur for Keycaps */}
              <filter id="keyShadowBlur" x="-20%" y="-20%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="0.75" />
              </filter>

              {/* Keycap Outer Molded Body Base Gradient */}
              <linearGradient id="keyBodyBaseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ebd4b2" />
                <stop offset="35%" stopColor="#dfc399" />
                <stop offset="70%" stopColor="#b68d56" />
                <stop offset="100%" stopColor="#755227" />
              </linearGradient>

              {/* Top Dish Surface Gradient (Uniform Matte Vintage Cream) */}
              <linearGradient id="keyDishBaseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#edd6b5" />
                <stop offset="50%" stopColor="#e5cba1" />
                <stop offset="100%" stopColor="#dec194" />
              </linearGradient>

              {/* Subtle Natural Scoop Occlusion (Gentle Vignette Shadow, NO WHITE HALO) */}
              <radialGradient id="subtleDishScoopGrad" cx="50%" cy="48%" r="55%">
                <stop offset="0%" stopColor="rgba(175, 138, 92, 0.22)" />
                <stop offset="65%" stopColor="rgba(195, 160, 115, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>

              {/* Front Skirt Gradient (Sloping Face) */}
              <linearGradient id="keyFrontSkirtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b68d56" />
                <stop offset="30%" stopColor="#a77f48" />
                <stop offset="70%" stopColor="#8f6835" />
                <stop offset="100%" stopColor="#755227" />
              </linearGradient>

              {/* Left Bevel Flank (Soft Diffuse Fill-Light) */}
              <linearGradient id="keyLeftFlankGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#dcb985" />
                <stop offset="50%" stopColor="#caa36e" />
                <stop offset="100%" stopColor="#b38a54" />
              </linearGradient>

              {/* Right Bevel Flank (Soft Ambient Shadow) */}
              <linearGradient id="keyRightFlankGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9f763f" />
                <stop offset="50%" stopColor="#87602e" />
                <stop offset="100%" stopColor="#6c4d23" />
              </linearGradient>

              {/* Spacebar Cylindrical Top Gradient (Smooth, Uniform Curved Bar) */}
              <linearGradient id="spacebarTopGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eed5b0" />
                <stop offset="40%" stopColor="#ead0a8" />
                <stop offset="100%" stopColor="#f3dec2" />
              </linearGradient>

              {/* Spacebar Front Skirt Gradient */}
              <linearGradient id="spacebarFrontGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9e7f56" />
                <stop offset="40%" stopColor="#85673e" />
                <stop offset="100%" stopColor="#56462e" />
              </linearGradient>

              {/* Embedded Front Lip Buttons Gradient */}
              <linearGradient id="embeddedBtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#363942" />
                <stop offset="28%" stopColor="#282a30" />
                <stop offset="75%" stopColor="#1c1d22" />
                <stop offset="100%" stopColor="#141518" />
              </linearGradient>

              {/* Inset Shadow & Glint Filter */}
              <filter id="specularGlint" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>

            {/* ============================================================= */}
            {/* 1. TABLE SURFACE DROP SHADOW                                  */}
            {/* ============================================================= */}
            <ellipse
              cx="512"
              cy="718"
              rx="475"
              ry="26"
              fill="rgba(25, 23, 21, 0.48)"
              filter="blur(14px)"
            />
            <ellipse
              cx="512"
              cy="715"
              rx="450"
              ry="14"
              fill="rgba(10, 10, 10, 0.75)"
              filter="blur(6px)"
            />

            {/* ============================================================= */}
            {/* 2. CHASSIS MOLDED BAKELITE MONOBLOCK SHELL                     */}
            {/* ============================================================= */}
            {/* Outer Silhouette matching exact contour data */}
            <path
              d="
                M 140 60
                C 260 51, 764 51, 884 60
                C 930 63, 948 95, 951 150
                C 957 210, 960 270, 964 360
                C 965 390, 971 450, 978 510
                C 985 570, 990 630, 990 660
                C 990 688, 976 710, 944 712
                C 760 714, 264 714, 80 712
                C 48 710, 33 688, 33 660
                C 33 630, 39 570, 46 510
                C 54 450, 60 390, 62 360
                C 64 270, 67 210, 72 150
                C 76 95, 94 63, 140 60
                Z
              "
              fill="url(#chassisBodyGrad)"
              stroke="#0a0a0c"
              strokeWidth="1.5"
            />

            {/* Top Brow Overhead Specular Rim Highlight */}
            <path
              d="
                M 140 60
                C 260 51, 764 51, 884 60
                C 920 63, 940 85, 946 115
                C 800 108, 224 108, 78 115
                C 84 85, 104 63, 140 60
                Z
              "
              fill="url(#topBrowHighlight)"
            />

            {/* Flared Left Cheek Surface Highlight */}
            <path
              d="
                M 62 360
                C 60 390, 54 450, 46 510
                C 39 570, 33 630, 33 660
                L 62 650
                C 68 590, 76 480, 84 390
                Z
              "
              fill="url(#leftCheekHighlight)"
            />

            {/* Flared Right Cheek Surface Highlight */}
            <path
              d="
                M 964 360
                C 965 390, 971 450, 978 510
                C 985 570, 990 630, 990 660
                L 962 650
                C 956 590, 948 480, 940 390
                Z
              "
              fill="url(#rightCheekHighlight)"
            />

            {/* ============================================================= */}
            {/* 3. RECESSED CRT SCREEN HOUSING & DISPLAY                       */}
            {/* ============================================================= */}

            {/* Deep Recessed Bezel Outer Frame */}
            <rect
              x="114"
              y="138"
              width="796"
              height="254"
              rx="12"
              ry="12"
              fill="url(#screenBevelTop)"
            />

            {/* Screen Bevel Upper Rim Specular Line */}
            <line
              x1="126"
              y1="138.5"
              x2="898"
              y2="138.5"
              stroke="#e4dedb"
              strokeWidth="1.2"
              opacity="0.85"
            />

            {/* Screen Bevel Left & Right Inset Shadow */}
            <rect
              x="117"
              y="142"
              width="790"
              height="246"
              rx="10"
              ry="10"
              fill="#0d0e10"
            />

            {/* CRT Smoked Glass Monitor Face */}
            <g className="select-none">
              {/* Smoked glass outer base */}
              <rect
                x="122"
                y="146"
                width="780"
                height="238"
                rx="8"
                ry="8"
                fill="url(#crtGlassGrad)"
              />

              {/* Glowing Retro Phosphor CRT Screen Mode (When Active) */}
              {isPowerOn ? (
                <g>
                  {/* CRT Phosphor Raster Backlight */}
                  <rect
                    x="126"
                    y="150"
                    width="772"
                    height="230"
                    rx="6"
                    ry="6"
                    fill={activeTheme.bg}
                  />

                  {/* HIGH-PRECISION ALIGNED HTML CRT DISPLAY CONTENT */}
                  <foreignObject
                    x="131"
                    y="155"
                    width="762"
                    height="220"
                    className="overflow-hidden select-none pointer-events-auto"
                  >
                    <div
                      className={`w-full h-full flex flex-col justify-between p-3 box-border text-left relative ${
                        !isBooting ? 'crt-screen-degauss' : ''
                      }`}
                      style={{
                        fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', ui-monospace, monospace",
                        color: activeTheme.primary,
                      }}
                    >
                      {/* CRT Electron Beam Ignition Flash on Page Load / Reload */}
                      {isCrtIgniting && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/85">
                          <div
                            className="w-full h-[2.5px] crt-electron-beam-flash"
                            style={{
                              backgroundColor: '#ffffff',
                              boxShadow: `0 0 18px 4px #ffffff, 0 0 36px 8px ${activeTheme.primary}`,
                            }}
                          />
                        </div>
                      )}

                      {isBooting ? (
                        /* ======================================================== */
                        /* OPTION 2: MAINFRAME ROM BIOS BOOT DIAGNOSTICS SCREEN    */
                        /* ======================================================== */
                        <div
                          onClick={skipBoot}
                          className="w-full h-full flex flex-col justify-between cursor-pointer select-none"
                          title="Click anywhere to skip boot sequence"
                        >
                          {/* BIOS Diagnostic Header */}
                          <div
                            className="flex items-center justify-between pb-1.5 border-b"
                            style={{
                              borderColor: activeTheme.border,
                              textShadow: `0 0 6px ${activeTheme.glow}`,
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-full animate-ping"
                                style={{ backgroundColor: activeTheme.accent }}
                              />
                              <span className="font-extrabold text-[11px] tracking-widest uppercase">
                                OI-TERMINAL 8000 // ROM BIOS DIAGNOSTICS
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[8.5px] opacity-60 tracking-wider uppercase font-mono">
                                [CLICK TO SKIP]
                              </span>
                              <span
                                className="px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-wider"
                                style={{
                                  backgroundColor: activeTheme.primary,
                                  color: activeTheme.bg,
                                }}
                              >
                                POST ACTIVE
                              </span>
                            </div>
                          </div>

                          {/* Diagnostic Terminal Lines */}
                          <div className="flex-1 flex flex-col justify-center py-1 space-y-1 font-mono text-[11px]">
                            {BIOS_LINES.slice(0, bootStep + 1).map((line, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between leading-tight crt-bios-line-reveal"
                                style={{
                                  textShadow: `0 0 4px ${activeTheme.glow}`,
                                }}
                              >
                                <div className="flex items-center space-x-1.5 truncate">
                                  <span className="opacity-50 text-[10px]">&gt;</span>
                                  <span
                                    className={line.isFinal ? 'font-bold' : 'font-medium'}
                                    style={{ color: line.isFinal ? activeTheme.accent : activeTheme.content }}
                                  >
                                    {line.text}
                                  </span>
                                  {line.isFinal && (
                                    <span
                                      className="inline-block w-2 h-3.5 ml-1 crt-cursor-blink align-middle"
                                      style={{ backgroundColor: activeTheme.primary }}
                                    />
                                  )}
                                </div>
                                <span
                                  className="text-[9.5px] font-black tracking-widest px-1.5 py-0.5 rounded shrink-0 ml-2"
                                  style={{
                                    backgroundColor: activeTheme.badgeBg,
                                    color: line.tagColor === 'accent' ? activeTheme.accent : activeTheme.primary,
                                    border: `1px solid ${activeTheme.border}`,
                                  }}
                                >
                                  [{line.tag}]
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Diagnostic Bottom Status */}
                          <div
                            className="flex items-center justify-between pt-1 border-t text-[9px] opacity-60 font-mono"
                            style={{ borderColor: activeTheme.border }}
                          >
                            <span>ROM ADDR: 0x0000-0xFFFF</span>
                            <span className="animate-pulse">PARITY: PASSED</span>
                            <span>DIAG LEVEL: {bootStep + 1}/6</span>
                          </div>
                        </div>
                      ) : (
                        /* ======================================================== */
                        /* REGULAR TERMINAL SCREEN DISPLAY                          */
                        /* ======================================================== */
                        <>
                          {/* --- TOP STATUS BAR --- */}
                          <div
                            className="flex items-center justify-between pb-1.5 border-b"
                            style={{
                              borderColor: activeTheme.border,
                              textShadow: `0 0 6px ${activeTheme.glow}`,
                            }}
                          >
                            {/* System Identity & Indicator (Clickable to re-trigger BIOS Boot) */}
                            <div
                              onClick={triggerBiosBoot}
                              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                              title="Click to re-trigger ROM BIOS Boot"
                            >
                              <span
                                className="inline-block w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: activeTheme.primary }}
                              />
                              <span className="font-bold text-[11px] tracking-wider">
                                OI-TERMINAL 8000
                              </span>
                              <span className="text-[8px] opacity-40 uppercase tracking-widest ml-1 font-mono">
                                [REBOOT]
                              </span>
                            </div>

                            {/* Top-Right Controls: Theme Switcher & Section Counter */}
                            <div className="flex items-center space-x-2.5">
                              {/* Phosphor Theme Selector */}
                              <div className="flex items-center space-x-1 text-[9px] font-bold">
                                <span className="opacity-60 mr-0.5">CRT:</span>
                                {['green', 'amber', 'cyan'].map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                      playTerminalChirp(1200);
                                      setCrtColorTheme(t);
                                    }}
                                    className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold transition-all cursor-pointer ${
                                      crtColorTheme === t ? 'scale-105 font-black' : 'opacity-50 hover:opacity-100'
                                    }`}
                                    style={{
                                      backgroundColor: crtColorTheme === t ? activeTheme.primary : 'transparent',
                                      color: crtColorTheme === t ? activeTheme.bg : activeTheme.primary,
                                      border: `1px solid ${activeTheme.primary}`,
                                    }}
                                    title={`Switch to ${t.toUpperCase()} phosphor theme`}
                                  >
                                    {t === 'green' ? 'GRN' : t === 'amber' ? 'AMB' : 'CYN'}
                                  </button>
                                ))}
                              </div>

                              <span className="opacity-30">|</span>

                              {/* Section Badge */}
                              <span
                                className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide"
                                style={{
                                  backgroundColor: activeTheme.primary,
                                  color: activeTheme.bg,
                                }}
                              >
                                {currentSec.sectionNumber} / SEC-50
                              </span>
                            </div>
                          </div>

                          {/* --- MAIN CONTENT STAGE (AUTHENTIC CRT PHOSPHOR BURN-IN) --- */}
                          <div
                            key={currentSectionIndex}
                            className={`flex-1 flex flex-col justify-center px-2 py-1.5 overflow-y-auto custom-crt-scrollbar ${
                              transitionDir === 'next' ? 'crt-animate-next' : 'crt-animate-prev'
                            }`}
                          >
                            {/* Section Title */}
                            <div className="flex items-center justify-between mb-2">
                              <h2
                                className="text-[13.5px] font-extrabold tracking-wide m-0 flex items-center space-x-2 truncate"
                                style={{
                                  color: activeTheme.primary,
                                  textShadow: `0 0 8px ${activeTheme.glow}`,
                                }}
                              >
                                <span className="opacity-70 text-[11.5px]">&gt;&gt;</span>
                                <span>{currentSec.title}</span>
                              </h2>
                            </div>

                            {/* Content Body: Exactly 50-60 words with crisp, comfortable line height */}
                            <p
                              className="text-[11.8px] leading-[1.62] font-medium text-justify m-0 select-text"
                              style={{
                                color: activeTheme.content,
                                letterSpacing: '-0.005em',
                                textShadow: `0 0 1px ${activeTheme.glow}`,
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                                textAlignLast: 'left',
                              }}
                            >
                              {currentSec.content}
                            </p>
                          </div>
                        </>
                      )}

                      {/* CRT Raster Electron Beam Sweep Overlay during section change */}
                      {isTransitioning && !isBooting && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                          <div
                            className="w-full h-[3px] absolute left-0"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, #ffffff 30%, #ffffff 70%, transparent 100%)',
                              boxShadow: `0 0 8px 2px #ffffff, 0 0 18px 5px ${activeTheme.primary}`,
                              animation: 'crtRasterSweep 0.28s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </foreignObject>

                  {/* Scanline pattern overlay (Photorealistic CRT feel) */}
                  <rect
                    x="126"
                    y="150"
                    width="772"
                    height="230"
                    rx="6"
                    ry="6"
                    fill="url(#scanlinePattern)"
                    opacity="0.18"
                    className="pointer-events-none"
                  />
                </g>
              ) : (
                /* Screen Powered Off Message */
                <g
                  onClick={() => setIsPowerOn(true)}
                  className="cursor-pointer"
                  title="Click screen to Turn Power ON"
                >
                  <text
                    x="512"
                    y="270"
                    textAnchor="middle"
                    fill="#3a3c42"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="13"
                    fontWeight="700"
                    letterSpacing="2"
                  >
                    [ CRT POWER OFF - CLICK TO INITIALIZE ]
                  </text>
                </g>
              )}

              {/* Ambient Specular Curved Tube Reflection (Glass sheen over display) */}
              <rect
                x="122"
                y="146"
                width="780"
                height="238"
                rx="8"
                ry="8"
                fill="url(#crtGlassReflection)"
                className="pointer-events-none"
              />

              {/* Inner CRT Vignette Rim Shadow */}
              <rect
                x="122"
                y="146"
                width="780"
                height="238"
                rx="8"
                ry="8"
                fill="none"
                stroke="rgba(0, 0, 0, 0.7)"
                strokeWidth="5"
                className="pointer-events-none"
              />

              {/* =========================================================== */}
              {/* EXACT ORANGE PINSTRIPE BORDER (#d8441d)                     */}
              {/* Bounds: X=[129, 896], Y=[153, 377], W=767, H=224           */}
              {/* =========================================================== */}
              <rect
                x="129"
                y="153"
                width="767"
                height="224"
                rx="7"
                ry="7"
                fill="none"
                stroke="#d8441d"
                strokeWidth="2.4"
                strokeLinejoin="round"
                className="pointer-events-none"
              />
            </g>

            {/* Ridge between Screen and Keyboard Well */}
            <path
              d="M 112 390 C 310 387, 714 387, 912 390 L 920 395 C 714 392, 310 392, 104 395 Z"
              fill="#524d49"
            />
            <line
              x1="104"
              y1="395"
              x2="920"
              y2="395"
              stroke="#1b1c1e"
              strokeWidth="1.5"
            />

            {/* ============================================================= */}
            {/* 4. RECESSED KEYBOARD TRAY & WELL                              */}
            {/* ============================================================= */}
            <path
              d="
                M 104 395
                L 920 395
                C 928 440, 938 520, 946 612
                L 78 612
                C 86 520, 96 440, 104 395
                Z
              "
              fill="url(#wellFloorShadow)"
              stroke="#0a0a0b"
              strokeWidth="2"
            />

            {/* Inner Left Sloping Well Chamfer Shadow */}
            <polygon
              points="104,395 120,402 92,610 78,612"
              fill="rgba(0, 0, 0, 0.55)"
            />

            {/* Inner Right Sloping Well Chamfer Shadow */}
            <polygon
              points="920,395 904,402 932,610 946,612"
              fill="rgba(0, 0, 0, 0.55)"
            />

            {/* ============================================================= */}
            {/* 5. COMPLETE 6-ROW SA SPHERICAL KEYCAP KEYBOARD                */}
            {/* ============================================================= */}
            {/* ROW 1: Function row (Y = 412, H = 32) */}
            <g id="keyboard-row-1">
              {row1Keys.map((k) => renderKeycap(k, 412, 32))}
            </g>

            {/* ROW 2: Number row (Y = 451, H = 27.5) */}
            <g id="keyboard-row-2">
              {row2Keys.map((k) => renderKeycap(k, 451, 27.5))}
            </g>

            {/* ROW 3: QWERTY row (Y = 482, H = 24.5) */}
            <g id="keyboard-row-3">
              {row3Keys.map((k) => renderKeycap(k, 482, 24.5))}
            </g>

            {/* ROW 4: Home row (Y = 510, H = 24.5) */}
            <g id="keyboard-row-4">
              {row4Keys.map((k) => renderKeycap(k, 510, 24.5))}
            </g>

            {/* ROW 5: ZXCV row (Y = 537, H = 27) */}
            <g id="keyboard-row-5">
              {row5Keys.map((k) => renderKeycap(k, 537, 27))}
            </g>

            {/* ROW 6: Spacebar row (Y = 567, H = 37.5) */}
            <g id="keyboard-row-6">
              {row6Keys.map((k) => renderKeycap(k, 567, 37.5))}
            </g>

            {/* ============================================================= */}
            {/* 6. FRONT LIP CHASSIS BUMPER & PALMREST                        */}
            {/* ============================================================= */}
            {/* Front Lip Upper Bevel Highlight Ridge */}
            <path
              d="
                M 78 612
                L 946 612
                L 962 630
                L 62 630
                Z
              "
              fill="url(#frontLipSpecular)"
            />

            {/* Crisp Highlight Filament along the front top chamfer */}
            <line
              x1="64"
              y1="629.5"
              x2="960"
              y2="629.5"
              stroke="#cfc7c0"
              strokeWidth="1.2"
              opacity="0.9"
            />

            {/* Front Vertical Drop Face down to base */}
            <path
              d="
                M 62 630
                L 962 630
                C 976 650, 988 670, 990 690
                C 986 708, 970 712, 944 712
                L 80 712
                C 54 712, 38 708, 34 690
                C 36 670, 48 650, 62 630
                Z
              "
              fill="#101113"
              stroke="#0a0a0b"
              strokeWidth="1"
            />

            {/* ============================================================= */}
            {/* EMBEDDED PREV & NEXT CONTROLS ON FRONT CHASSIS LIP            */}
            {/* Spaced out symmetrically across the lower front drop face     */}
            {/* Exactly in the image region provided by the user             */}
            {/* ============================================================= */}

            {/* --- PREV BUTTON (Shifted to Left Wing: cx = 250, cy = 671) --- */}
            <g
              className="cursor-pointer select-none transition-transform duration-75 active:scale-95 crt-btn-ready-glow"
              onClick={handlePrevSection}
              title="Previous Section (Left Arrow)"
            >
              {/* Inset Cavity Shadow */}
              <rect
                x="163"
                y="649"
                width="174"
                height="44"
                rx="22"
                fill="rgba(0, 0, 0, 0.85)"
                filter="url(#specularGlint)"
              />
              {/* Outer Molded Bezel */}
              <rect
                x="165"
                y="651"
                width="170"
                height="40"
                rx="20"
                fill="url(#embeddedBtnGrad)"
                stroke="rgba(255, 255, 255, 0.16)"
                strokeWidth="1.4"
              />
              {/* Top Chamfer Highlight */}
              <path
                d="M 187 652.5 L 313 652.5"
                stroke="rgba(255, 255, 255, 0.28)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Prev Icon Chevron (◀) */}
              <path
                d="M 212 671 L 224 663.5 L 224 678.5 Z"
                fill="#ffffff"
                opacity="0.95"
              />
              {/* Prev Label Text */}
              <text
                x="238"
                y="671"
                fill="#ffffff"
                fontSize="16"
                fontWeight="800"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                letterSpacing="0.05em"
                dominantBaseline="central"
              >
                Prev
              </text>
            </g>

            {/* --- CENTER SECTION TRACKER (Centered at cx = 512, cy = 671) --- */}
            <g className="select-none">
              {/* Inset Bezel Slot */}
              <rect
                x="417"
                y="655"
                width="190"
                height="32"
                rx="16"
                fill="#090a0c"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.2"
              />
              {/* Inner Cavity Depth */}
              <rect
                x="419"
                y="657"
                width="186"
                height="28"
                rx="14"
                fill="#050608"
              />
              {/* Live Status LED with Phosphor Pulse on Transition & BIOS POST */}
              <circle
                cx="438"
                cy="671"
                r={isBooting ? (bootStep % 2 === 0 ? 5.2 : 3.0) : isTransitioning ? 4.8 : 3.5}
                fill={isBooting ? (bootStep % 2 === 0 ? '#ffffff' : activeTheme.accent) : isTransitioning ? '#ffffff' : activeTheme.primary}
                className="transition-all duration-75"
              />
              {/* Live Section Tracker Text */}
              <text
                x="454"
                y="671"
                fill="#e2e8f0"
                fontSize="12"
                fontWeight="800"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                letterSpacing="0.06em"
                dominantBaseline="central"
              >
                {`${currentSec.sectionNumber} / SEC-50`}
              </text>
            </g>

            {/* --- NEXT BUTTON (Shifted to Right Wing: cx = 774, cy = 671) --- */}
            <g
              className="cursor-pointer select-none transition-transform duration-75 active:scale-95 crt-btn-ready-glow"
              onClick={handleNextSection}
              title="Next Section (Right Arrow)"
            >
              {/* Inset Cavity Shadow */}
              <rect
                x="687"
                y="649"
                width="174"
                height="44"
                rx="22"
                fill="rgba(0, 0, 0, 0.85)"
                filter="url(#specularGlint)"
              />
              {/* Outer Molded Bezel */}
              <rect
                x="689"
                y="651"
                width="170"
                height="40"
                rx="20"
                fill="url(#embeddedBtnGrad)"
                stroke="rgba(255, 255, 255, 0.16)"
                strokeWidth="1.4"
              />
              {/* Top Chamfer Highlight */}
              <path
                d="M 711 652.5 L 837 652.5"
                stroke="rgba(255, 255, 255, 0.28)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Next Label Text */}
              <text
                x="729"
                y="671"
                fill="#ffffff"
                fontSize="16"
                fontWeight="800"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                letterSpacing="0.05em"
                dominantBaseline="central"
              >
                Next
              </text>
              {/* Next Icon Chevron (▶) */}
              <path
                d="M 801 671 L 789 663.5 L 789 678.5 Z"
                fill="#ffffff"
                opacity="0.95"
              />
            </g>

            {/* Front Bottom Lip Underside Shadow */}
            <path
              d="M 70 706 L 954 706 L 944 712 L 80 712 Z"
              fill="#050505"
            />
          </svg>

          {/* DEDICATED INVISIBLE HTML CLICK TARGET OVER EMBEDDED PREV BUTTON */}
          <button
            type="button"
            onClick={handlePrevSection}
            className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 z-30 touch-manipulation"
            style={{
              left: '15.5%',
              top: '83.0%',
              width: '17.8%',
              height: '8.4%',
              background: 'transparent',
              border: 'none',
            }}
            title="Previous Section (Left Arrow)"
            aria-label="Previous Section"
          />

          {/* DEDICATED INVISIBLE HTML CLICK TARGET OVER EMBEDDED NEXT BUTTON */}
          <button
            type="button"
            onClick={handleNextSection}
            className="absolute rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 z-30 touch-manipulation"
            style={{
              left: '66.7%',
              top: '83.0%',
              width: '17.8%',
              height: '8.4%',
              background: 'transparent',
              border: 'none',
            }}
            title="Next Section (Right Arrow)"
            aria-label="Next Section"
          />

          {/* VINTAGE CRT ELECTRON BEAM & PHOSPHOR BURN-IN ANIMATION STYLES */}
          <style>{`
            /* --- TERMINAL MAINFRAME POWER-ON WORKSTATION ENTRANCE --- */
            @keyframes terminalPowerOnEntrance {
              0% {
                opacity: 0;
                transform: scale(0.96) translateY(26px);
              }
              35% {
                opacity: 0.85;
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            .crt-terminal-power-entrance {
              animation: terminalPowerOnEntrance 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              transform-origin: center bottom;
            }

            /* --- CATHODE RAY TUBE (CRT) ELECTRON BEAM TURN-ON IGNITION --- */
            @keyframes electronBeamFlash {
              0% {
                opacity: 0;
                transform: scaleX(0) scaleY(1);
              }
              25% {
                opacity: 1;
                transform: scaleX(1) scaleY(1);
              }
              55% {
                opacity: 1;
                transform: scaleX(1) scaleY(6);
              }
              80% {
                opacity: 0.85;
                transform: scaleX(1) scaleY(80);
              }
              100% {
                opacity: 0;
                transform: scaleX(1) scaleY(180);
              }
            }
            .crt-electron-beam-flash {
              animation: electronBeamFlash 0.36s cubic-bezier(0.16, 0.9, 0.2, 1) forwards;
            }

            /* --- CRT DEGAUSS & STABILIZATION WARP --- */
            @keyframes crtDegaussWobble {
              0% {
                transform: scale(1.015, 0.985);
                filter: brightness(1.6) contrast(1.4);
              }
              35% {
                transform: scale(0.995, 1.005);
                filter: brightness(1.2) contrast(1.15);
              }
              70% {
                transform: scale(1.003, 0.997);
                filter: brightness(1.05) contrast(1.05);
              }
              100% {
                transform: scale(1) translateY(0);
                filter: brightness(1) contrast(1);
              }
            }
            .crt-screen-degauss {
              animation: crtDegaussWobble 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            }

            /* --- EMBEDDED CONTROLS READY PULSE --- */
            @keyframes buttonReadyGlow {
              0% {
                opacity: 0.65;
                filter: brightness(0.85);
              }
              60% {
                opacity: 1;
                filter: brightness(1.3) drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
              }
              100% {
                opacity: 1;
                filter: brightness(1);
              }
            }
            .crt-btn-ready-glow {
              animation: buttonReadyGlow 1.2s ease-out 0.6s backwards;
            }

            /* --- OPTION 2: MAINFRAME ROM BIOS BOOT KEYFRAMES --- */
            @keyframes biosLineReveal {
              0% {
                opacity: 0;
                transform: translateX(-4px);
                filter: brightness(2.2) blur(0.8px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
                filter: brightness(1) blur(0px);
              }
            }
            .crt-bios-line-reveal {
              animation: biosLineReveal 0.18s ease-out forwards;
            }
            @keyframes biosCursorBlink {
              0%, 49% { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            .crt-cursor-blink {
              animation: biosCursorBlink 0.5s infinite;
            }

            /* Sleek Micro-Scrollbar for CRT text viewport */
            .custom-crt-scrollbar::-webkit-scrollbar {
              width: 3px;
            }
            .custom-crt-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-crt-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.25);
              border-radius: 2px;
            }

            /* --- SECTION NAVIGATION RASTER & PHOSPHOR KEYFRAMES --- */
            @keyframes crtRasterSweep {
              0% {
                top: -6%;
                opacity: 0.95;
              }
              80% {
                opacity: 0.95;
              }
              100% {
                top: 106%;
                opacity: 0;
              }
            }
            @keyframes crtPhosphorNext {
              0% {
                opacity: 0.12;
                transform: translateY(5px);
                filter: brightness(2.2) contrast(1.5) blur(0.6px);
                text-shadow: 0 0 16px currentColor;
              }
              35% {
                opacity: 0.75;
                transform: translateY(-1px);
                filter: brightness(1.35) blur(0.2px);
                text-shadow: 0 0 10px currentColor;
              }
              100% {
                opacity: 1;
                transform: translateY(0);
                filter: brightness(1) blur(0);
                text-shadow: 0 0 2px currentColor;
              }
            }
            @keyframes crtPhosphorPrev {
              0% {
                opacity: 0.12;
                transform: translateY(-5px);
                filter: brightness(2.2) contrast(1.5) blur(0.6px);
                text-shadow: 0 0 16px currentColor;
              }
              35% {
                opacity: 0.75;
                transform: translateY(1px);
                filter: brightness(1.35) blur(0.2px);
                text-shadow: 0 0 10px currentColor;
              }
              100% {
                opacity: 1;
                transform: translateY(0);
                filter: brightness(1) blur(0);
                text-shadow: 0 0 2px currentColor;
              }
            }
            .crt-animate-next {
              animation: crtPhosphorNext 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .crt-animate-prev {
              animation: crtPhosphorPrev 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>
        </div>

        {/* MOBILE / TABLET RESPONSIVE READING HUD (Fixed height so PREV/NEXT buttons NEVER jump or shift) */}
        <div
          className="order-1 md:order-2 w-full mb-3 md:mb-0 p-3.5 sm:p-4 rounded-xl border md:hidden select-text transition-all duration-200 flex flex-col justify-between h-[340px] sm:h-[320px]"
          style={{
            backgroundColor: activeTheme.bg,
            borderColor: activeTheme.border,
            boxShadow: `0 8px 30px -4px ${activeTheme.glow}`,
          }}
        >
          {/* Top Status & Controls (Fixed Height) */}
          <div
            className="flex items-center justify-between pb-2 border-b shrink-0 h-[36px]"
            style={{ borderColor: activeTheme.border }}
          >
            <div className="flex items-center space-x-2">
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeTheme.primary }}
              />
              <span
                className="font-mono text-xs font-bold tracking-wider"
                style={{ color: activeTheme.primary }}
              >
                {currentSec.sectionNumber} / SEC-50
              </span>
            </div>

            {/* Phosphor Theme Switcher */}
            <div className="flex items-center space-x-1.5 text-xs font-mono">
              {['green', 'amber', 'cyan'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCrtColorTheme(t)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    crtColorTheme === t ? 'font-black scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: crtColorTheme === t ? activeTheme.primary : 'transparent',
                    color: crtColorTheme === t ? activeTheme.bg : activeTheme.primary,
                    border: `1px solid ${activeTheme.primary}`,
                  }}
                >
                  {t === 'green' ? 'GRN' : t === 'amber' ? 'AMB' : 'CYN'}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Body: Fixed Height Title & Scrollable Text so card height stays constant */}
          <div className="flex-1 flex flex-col justify-start overflow-hidden my-1.5">
            {/* Section Title (Min-height to smoothly fit 1 or 2 lines without moving buttons) */}
            <h2
              className="min-h-[42px] flex items-center text-sm sm:text-base font-extrabold leading-snug shrink-0 m-0"
              style={{ color: activeTheme.primary }}
            >
              <span className="opacity-70 text-xs mr-1.5">&gt;&gt;</span>
              <span>{currentSec.title}</span>
            </h2>

            {/* Section Content with smooth custom scrollbar and clean justified right-alignment */}
            <div
              key={currentSectionIndex}
              className={`flex-1 overflow-y-auto custom-crt-scrollbar pr-2 mt-1 text-xs sm:text-[13px] leading-[1.62] font-mono text-justify select-text ${
                transitionDir === 'next' ? 'crt-animate-next' : 'crt-animate-prev'
              }`}
              style={{
                color: activeTheme.content,
                textAlign: 'justify',
                textJustify: 'inter-word',
                textAlignLast: 'left',
              }}
            >
              {currentSec.content}
            </div>
          </div>

          {/* Bottom Action Navigation Buttons (Rigidly anchored at bottom, never shifts) */}
          <div
            className="flex items-center justify-between pt-2.5 border-t shrink-0 h-[46px]"
            style={{ borderColor: activeTheme.border }}
          >
            <button
              type="button"
              onClick={handlePrevSection}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg font-bold text-xs font-mono transition-transform active:scale-95 cursor-pointer touch-manipulation select-none"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: activeTheme.primary,
                border: `1px solid ${activeTheme.border}`,
              }}
            >
              <span>‹</span>
              <span>PREV</span>
            </button>

            <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest" style={{ color: activeTheme.content }}>
              SWIPE ◄ ►
            </span>

            <button
              type="button"
              onClick={handleNextSection}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg font-bold text-xs font-mono transition-transform active:scale-95 cursor-pointer touch-manipulation select-none"
              style={{
                backgroundColor: activeTheme.primary,
                color: activeTheme.bg,
              }}
            >
              <span>NEXT</span>
              <span>›</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export { BlackComputer, BlackComputer as SoftwareOverviewPage };
