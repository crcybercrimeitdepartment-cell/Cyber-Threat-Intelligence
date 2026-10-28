import React, { useState, useEffect, useCallback } from 'react';
import { ovenSections } from './SoftwareMissionPageData';
import NavPageHeader from '../../../components/NavPageHeader';

/**
 * Oven Component
 * 1:1 Pixel-to-Pixel Photorealistic Reproduction of the Prestige Oven Toaster Grill (OTG):
 * - Molded matte-black powder-coated steel chassis with smooth rounded corners and sturdy rubber feet
 * - Heavy-duty tempered glass door framed with bottom scalloped contour and authentic 'Prestige®' branding
 * - Brushed stainless steel tubular horizontal door handle with precision end stanchions
 * - Aluminized galvanized steel interior cavity with stamped side rack runners
 * - Upper & lower horizontal heating quartz element rods with realistic incandescent glow simulation
 * - Enameled black steel baking tray (middle shelf) & chrome wire grill rack (lower shelf)
 * - Precision right control console:
 *   1. Temperature Dial (100°C - 250°C) with thermometer insignia & interactive knob
 *   2. Heater Selector (Off, Upper, Lower, Dual) with radiant red pilot lamp
 *   3. Mechanical Timer Dial (Off, 10 - 60 min) with live countdown & authentic oven bell chime
 * - Interactive baking simulation with food selector (Cookies, Pizza, Croissants, Toast)
 * - 100% Responsive SVG coordinate space (1000 x 750) adapting seamlessly across mobile, tablet, and desktop
/**
 * Photorealistic 3D Sculpted Ergonomic Knob:
 * - Circular base bezel with specular edge
 * - Deep concave thumb scoops with top crescent specular gleam
 * - Domed ergonomic central grip bridge with twin studio light gloss reflections
 * - Integrated precision white pointer notch
 */
function SculptedKnob({
  cx = 0,
  cy = 0,
  angle = 0,
  onClick,
  title = '',
  id = '',
}) {
  return (
    <g
      id={id}
      transform={`translate(${cx}, ${cy})`}
      onClick={onClick}
      className="cursor-pointer select-none group"
      title={title}
    >
      {/* 0. Invisible Touch Cushion for Mobile & Tablet Tap Ergonomics */}
      <circle cx="0" cy="0" r="48" fill="transparent" pointerEvents="all" />

      {/* 1. Base Drop Shadow on panel */}
      <circle cx="0" cy="0" r="37" fill="rgba(0, 0, 0, 0.68)" filter="blur(3px)" pointerEvents="none" />

      {/* 2. Outer Circular Base Bezel */}
      <circle
        cx="0"
        cy="0"
        r="35.5"
        fill="url(#sculptedKnobBaseGrad)"
        stroke="#060708"
        strokeWidth="1.4"
        pointerEvents="none"
      />

      {/* 3. Outer Chamfer Rim Specular Highlight Ring */}
      <circle
        cx="0"
        cy="0"
        r="34.2"
        fill="none"
        stroke="rgba(255, 255, 255, 0.24)"
        strokeWidth="0.8"
        className="group-hover:stroke-amber-400/60 transition-colors"
        pointerEvents="none"
      />

      {/* 4. Deep Recessed Dish Floor */}
      <circle cx="0" cy="0" r="31" fill="#0d0e10" pointerEvents="none" />

      {/* 5-8. ROTATING SCULPTED CORE: Perfectly Centered on (0, 0) with Smooth Mechanical Physics */}
      <g
        transform={`rotate(${angle})`}
        style={{
          transformOrigin: '0px 0px',
          transition: 'transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1)',
        }}
        className="group-hover:brightness-110 transition-all"
        pointerEvents="none"
      >
        {/* Invisible Symmetrical Bounding Circle to guarantee exact (0, 0) center in all browser SVG engines */}
        <circle cx="0" cy="0" r="35" fill="none" pointerEvents="none" opacity="0" />
        {/* 5. TOP CONCAVE THUMB SCOOP (Upper half crescent depression) */}
        <path
          d="M -27 -4 C -20 -9, -10 -11, 0 -11 C 10 -11, 20 -9, 27 -4 A 29 29 0 0 0 -27 -4 Z"
          fill="url(#scoopTopGrad)"
        />
        {/* Upper scoop deep shadow */}
        <path
          d="M -25 -5 C -18 -10, 18 -10, 25 -5 A 28 28 0 0 0 -25 -5 Z"
          fill="rgba(0, 0, 0, 0.72)"
        />
        {/* Upper Scoop Rim Specular Crescent Gleam (Photorealistic High-Gloss Glint!) */}
        <path
          d="M -22 -14 A 27 27 0 0 1 22 -14"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
          filter="drop-shadow(0 0 2px rgba(255,255,255,0.7))"
        />
        <path
          d="M -16 -18 A 26 26 0 0 1 16 -18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />

        {/* 6. BOTTOM CONCAVE THUMB SCOOP (Lower half crescent depression) */}
        <path
          d="M -27 4 C -20 9, -10 11, 0 11 C 10 11, 20 9, 27 4 A 29 29 0 0 1 -27 4 Z"
          fill="url(#scoopBottomGrad)"
        />
        {/* Lower scoop deep shadow */}
        <path
          d="M -25 5 C -18 10, 18 10, 25 5 A 28 28 0 0 1 -25 5 Z"
          fill="rgba(0, 0, 0, 0.62)"
        />
        {/* Lower Scoop Subtle Rim Specular Reflection */}
        <path
          d="M -20 18 A 27 27 0 0 0 20 18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.32)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 7. CENTRAL SCULPTED ERGONOMIC GRIP BRIDGE (The Raised Horizontal Bar) */}
        {/* Main Bridge Contour: wider in the center, tapering smoothly into the perimeter */}
        <path
          d="
            M -33 -2.8
            C -20 -8.5, -8 -9.5, 0 -9.5
            C 8 -9.5, 20 -8.5, 33 -2.8
            C 35 -1.2, 35 1.2, 33 2.8
            C 20 8.5, 8 9.5, 0 9.5
            C -8 9.5, -20 8.5, -33 2.8
            C -35 1.2, -35 -1.2, -33 -2.8
            Z
          "
          fill="url(#bridgeBodyGrad)"
          stroke="#060708"
          strokeWidth="0.9"
        />

        {/* Bridge 3D Specular Highlight Line along Upper Ridge */}
        <path
          d="
            M -29 -2.6
            C -18 -7.5, 18 -7.5, 29 -2.6
          "
          fill="none"
          stroke="rgba(255, 255, 255, 0.52)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Bridge Center Twin Glossy Studio Reflections */}
        {/* Upper glossy capsule reflection */}
        <ellipse
          cx="0"
          cy="-1.8"
          rx="14"
          ry="4.5"
          fill="url(#knobGlossStreakGrad)"
        />
        {/* Core pure-white hotspot */}
        <ellipse
          cx="0"
          cy="-1.2"
          rx="9"
          ry="2.2"
          fill="#ffffff"
          opacity="0.88"
        />
        {/* Lower secondary fill bounce glint */}
        <ellipse
          cx="0"
          cy="3.8"
          rx="11"
          ry="2.0"
          fill="rgba(255, 255, 255, 0.26)"
        />

        {/* 8. WHITE POINTER NOTCH (At Left Tip: points directly to current calibration) */}
        <rect
          x="-34.5"
          y="-1.5"
          width="8"
          height="3"
          rx="1.5"
          fill="#ffffff"
          filter="drop-shadow(0 0 1.2px rgba(0,0,0,0.9))"
        />
      </g>
    </g>
  );
}

export default function Oven({ className = '' }) {
  // Oven State - Initialized exactly to match reference studio photograph
  const [temperature, setTemperature] = useState(100); // 100 to 250 C (Horizontal at 100C)
  const [heaterMode, setHeaterMode] = useState('both'); // 'off', 'upper', 'lower', 'both' (Horizontal at Both)
  const [timerMinutes, setTimerMinutes] = useState(55); // 0 to 60 (Tilted at 55 min)
  // Is oven actively heating?
  const isHeating = timerMinutes > 0 && heaterMode !== 'off';

  // Timer Countdown Effect (Silent)
  useEffect(() => {
    if (timerMinutes <= 0) return;
    const interval = setInterval(() => {
      setTimerMinutes((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 2500); // Scaled speed for smooth demonstration

    return () => clearInterval(interval);
  }, [timerMinutes]);

  // Handle Knob Rotations (Silent)
  const cycleTemperature = () => {
    const temps = [100, 150, 200, 250];
    const nextIdx = (temps.indexOf(temperature) + 1) % temps.length;
    setTemperature(temps[nextIdx]);
  };

  const cycleHeaterMode = () => {
    const modes = ['both', 'off', 'upper', 'lower'];
    const nextIdx = (modes.indexOf(heaterMode) + 1) % modes.length;
    setHeaterMode(modes[nextIdx]);
  };

  const cycleTimer = () => {
    const times = [0, 10, 20, 30, 40, 50, 55, 60];
    const nextIdx = (times.indexOf(timerMinutes) + 1) % times.length;
    setTimerMinutes(times[nextIdx]);
  };

  // Reload / Thermal Preheat Ignition Animation Sequence
  const [isPreheating, setIsPreheating] = useState(true);
  const [preheatPhase, setPreheatPhase] = useState(0); // 0: ignition, 1: heat surge, 2: ready
  const preheatTimeoutsRef = React.useRef([]);

  const skipPreheat = useCallback(() => {
    preheatTimeoutsRef.current.forEach(clearTimeout);
    preheatTimeoutsRef.current = [];
    setIsPreheating(false);
  }, []);

  const triggerPreheatSequence = useCallback(() => {
    preheatTimeoutsRef.current.forEach(clearTimeout);
    preheatTimeoutsRef.current = [];

    setIsPreheating(true);
    setPreheatPhase(0);

    // Phase 1: Heat Surge (Quartz elements blossom to incandescent amber-white at 360ms)
    const id1 = setTimeout(() => {
      setPreheatPhase(1);
    }, 360);
    preheatTimeoutsRef.current.push(id1);

    // Phase 2: Cavity at Temperature / Ready at 950ms
    const id2 = setTimeout(() => {
      setPreheatPhase(2);
    }, 950);
    preheatTimeoutsRef.current.push(id2);

    // Phase 3: Settle into active reading mode at 1700ms
    const id3 = setTimeout(() => {
      setIsPreheating(false);
    }, 1700);
    preheatTimeoutsRef.current.push(id3);
  }, []);

  // Run Thermal Preheat sequence on initial load / reload
  useEffect(() => {
    triggerPreheatSequence();
    return () => {
      preheatTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [triggerPreheatSequence]);

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

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSection();
      } else {
        prevSection();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Knob Rotation Angles (with preheat micro-spring calibration)
  const tempAngleMap = { 100: 0, 150: -45, 200: -135, 250: -180 };
  const tempAngle = isPreheating && preheatPhase === 0 ? -180 : (tempAngleMap[temperature] ?? 0);

  const modeAngleMap = { both: 0, off: 90, upper: 180, lower: 270 };
  const modeAngle = isPreheating && preheatPhase === 0 ? 0 : (modeAngleMap[heaterMode] ?? 0);

  const timerAngle = isPreheating && preheatPhase === 0
    ? 330
    : timerMinutes === 0
    ? 90
    : (90 + (timerMinutes / 60) * 270) % 360;

  // 50 Sections Data & Navigation (From Oven.js)
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'

  const currentSection = (ovenSections && ovenSections.length > 0)
    ? (ovenSections[currentSectionIdx] || ovenSections[0])
    : { id: 1, sectionNumber: 'SEC-01', title: 'Awaiting Data...', content: 'Awaiting data...' };

  // Dynamic Real-Time Dial Rotation synchronized with every section's culinary parameters!
  useEffect(() => {
    if (!ovenSections || ovenSections.length === 0) return;
    const presets = [
      { temp: 100, mode: 'both', timer: 55 },
      { temp: 150, mode: 'both', timer: 45 },
      { temp: 200, mode: 'upper', timer: 30 },
      { temp: 250, mode: 'upper', timer: 20 },
      { temp: 200, mode: 'lower', timer: 40 },
      { temp: 250, mode: 'both', timer: 25 },
      { temp: 150, mode: 'lower', timer: 35 },
      { temp: 100, mode: 'both', timer: 50 },
      { temp: 200, mode: 'both', timer: 45 },
      { temp: 250, mode: 'both', timer: 15 },
    ];
    const setting = presets[currentSectionIdx % presets.length];
    setTemperature(setting.temp);
    setHeaterMode(setting.mode);
    setTimerMinutes(setting.timer);
  }, [currentSectionIdx]);

  const nextSection = useCallback(() => {
    if (!ovenSections || ovenSections.length === 0) return;
    setSlideDirection('next');
    setCurrentSectionIdx((prev) => (prev + 1) % ovenSections.length);
  }, []);

  const prevSection = useCallback(() => {
    if (!ovenSections || ovenSections.length === 0) return;
    setSlideDirection('prev');
    setCurrentSectionIdx((prev) => (prev - 1 + ovenSections.length) % ovenSections.length);
  }, []);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPreheating && (e.key === ' ' || e.key === 'Enter')) {
        skipPreheat();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSection();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSection, prevSection, isPreheating, skipPreheat]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`w-full min-h-screen software-mission-environment flex flex-col items-center justify-start py-4 sm:py-6 px-2 sm:px-4 select-none overflow-x-hidden relative z-10 ${className}`}
    >
      {/* Page Hero Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <NavPageHeader
          title="Software Mission"
          description="Understand our mission to improve cybersecurity awareness, strengthen digital knowledge, and encourage safer online behaviour across 50 dedicated sections."
          className="mb-4 sm:mb-6 px-4"
        />
      </div>

      {/* Main Vector Appliance Stage */}
      <main className="relative w-full max-w-[1020px] flex flex-col items-center justify-center mx-auto transition-all duration-300">
        <div
          className="order-2 md:order-1 relative w-full aspect-[1000/750] flex items-center justify-center select-none"
          style={{
            aspectRatio: '1000 / 750',
            animation: 'applianceEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
            filter: `
              drop-shadow(0 24px 38px rgba(0, 0, 0, 0.30))
              drop-shadow(0 8px 16px rgba(0, 0, 0, 0.20))
            `,
          }}
        >
          <svg
            viewBox="0 0 1000 750"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            style={{ touchAction: 'manipulation' }}
          >
            <defs>
              {/* --- CHASSIS SHADERS --- */}
              {/* Outer Powder-Coated Satin Black Chassis */}
              <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#323438" />
                <stop offset="3%" stopColor="#25272a" />
                <stop offset="25%" stopColor="#1a1b1e" />
                <stop offset="70%" stopColor="#141517" />
                <stop offset="96%" stopColor="#0f1011" />
                <stop offset="100%" stopColor="#080809" />
              </linearGradient>

              {/* Upper Top Rim Specular Glint */}
              <linearGradient id="topRimGlint" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.36)" />
                <stop offset="30%" stopColor="rgba(255, 255, 255, 0.10)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Left Flank Soft Diffuse Highlight */}
              <linearGradient id="leftCheekGlint" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.03)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Right Flank Soft Ambient Shadow */}
              <linearGradient id="rightCheekShadow" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.45)" />
                <stop offset="40%" stopColor="rgba(0, 0, 0, 0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* --- DOOR & GLASS SHADERS --- */}
              {/* Stainless Steel Handle Bar Cylinder */}
              <linearGradient id="steelHandleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#767b82" />
                <stop offset="18%" stopColor="#b6bcc4" />
                <stop offset="42%" stopColor="#ffffff" />
                <stop offset="68%" stopColor="#c5cbd4" />
                <stop offset="85%" stopColor="#878d96" />
                <stop offset="100%" stopColor="#4e5258" />
              </linearGradient>

              {/* Handle Mounting Stanchion */}
              <linearGradient id="stanchionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3d42" />
                <stop offset="50%" stopColor="#1e2023" />
                <stop offset="100%" stopColor="#111214" />
              </linearGradient>

              {/* Door Frame Inner Recess Shadow */}
              <linearGradient id="doorFrameShadow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d0e0f" />
                <stop offset="100%" stopColor="#181a1d" />
              </linearGradient>

              {/* Glass Door Ambient Room Reflection */}
              <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
                <stop offset="25%" stopColor="rgba(255, 255, 255, 0.06)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.01)" />
                <stop offset="75%" stopColor="rgba(255, 255, 255, 0.04)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
              </linearGradient>

              {/* --- INTERIOR CAVITY SHADERS --- */}
              {/* Galvanized Aluminized Cavity Back Wall */}
              <linearGradient id="cavityBackWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7d8791" />
                <stop offset="30%" stopColor="#96a1ab" />
                <stop offset="70%" stopColor="#848e98" />
                <stop offset="100%" stopColor="#626b74" />
              </linearGradient>

              {/* Cavity Ambient Bake Glow when ON */}
              <radialGradient id="bakeGlow" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="rgba(255, 170, 40, 0.55)" />
                <stop offset="45%" stopColor="rgba(255, 120, 20, 0.32)" />
                <stop offset="75%" stopColor="rgba(255, 80, 0, 0.14)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Glowing Quartz Heating Rod (Upper & Lower) */}
              <linearGradient id="glowingHeatingRod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5500" />
                <stop offset="25%" stopColor="#ffaa00" />
                <stop offset="50%" stopColor="#fff7c2" />
                <stop offset="75%" stopColor="#ffaa00" />
                <stop offset="100%" stopColor="#d93b00" />
              </linearGradient>

              {/* Inactive Quartz Heating Rod */}
              <linearGradient id="inactiveHeatingRod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#555c63" />
                <stop offset="50%" stopColor="#9ba4ad" />
                <stop offset="100%" stopColor="#43494f" />
              </linearGradient>



              {/* Chrome Grill Wire Rod Highlight */}
              <linearGradient id="chromeWire" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7a828a" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#cad2da" />
                <stop offset="100%" stopColor="#535960" />
              </linearGradient>

              {/* --- CONTROL PANEL SHADERS --- */}
              {/* Inset Control Panel Plate Brushed Charcoal */}
              <linearGradient id="controlPanelPlateGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a1c1e" />
                <stop offset="6%" stopColor="#26292e" />
                <stop offset="85%" stopColor="#1f2125" />
                <stop offset="100%" stopColor="#141517" />
              </linearGradient>

              {/* Control Panel Left Recessed Shadow */}
              <linearGradient id="panelLeftShadowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.72)" />
                <stop offset="50%" stopColor="rgba(0, 0, 0, 0.28)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Sculpted Knob Outer Bezel Gradient */}
              <radialGradient id="sculptedKnobBaseGrad" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#3c4046" />
                <stop offset="35%" stopColor="#25272b" />
                <stop offset="70%" stopColor="#151618" />
                <stop offset="100%" stopColor="#090a0b" />
              </radialGradient>

              {/* Upper Concave Thumb Scoop Inner Shadow */}
              <linearGradient id="scoopTopGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#080809" />
                <stop offset="60%" stopColor="#141518" />
                <stop offset="100%" stopColor="#26292e" />
              </linearGradient>

              {/* Lower Concave Thumb Scoop Inner Shadow */}
              <linearGradient id="scoopBottomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#26292e" />
                <stop offset="40%" stopColor="#141518" />
                <stop offset="100%" stopColor="#080809" />
              </linearGradient>

              {/* Central Raised Ergonomic Grip Bridge Body */}
              <linearGradient id="bridgeBodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16181b" />
                <stop offset="18%" stopColor="#2e3137" />
                <stop offset="50%" stopColor="#434850" />
                <stop offset="82%" stopColor="#2a2d32" />
                <stop offset="100%" stopColor="#121315" />
              </linearGradient>

              {/* Glossy Studio Light Specular Reflection Streak */}
              <linearGradient id="knobGlossStreakGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.75)" />
                <stop offset="80%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Red Pilot Lamp Faceted Ruby Lens */}
              <radialGradient id="pilotLensGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="35%" stopColor="#e60000" />
                <stop offset="70%" stopColor="#990000" />
                <stop offset="92%" stopColor="#550000" />
                <stop offset="100%" stopColor="#300000" />
              </radialGradient>

              {/* Radiant Red Pilot Lamp Aura when Heating */}
              <radialGradient id="pilotLampAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 60, 0, 0.95)" />
                <stop offset="40%" stopColor="rgba(255, 30, 0, 0.6)" />
                <stop offset="75%" stopColor="rgba(255, 0, 0, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              {/* Console Navigation Button Gradients */}
              <linearGradient id="consoleBtnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#373b42" />
                <stop offset="45%" stopColor="#282a30" />
                <stop offset="100%" stopColor="#1a1c20" />
              </linearGradient>

              <linearGradient id="consoleBtnNextGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>

            </defs>

            {/* ============================================================= */}
            {/* 1. TABLETOP SURFACE CONTACT & DROP SHADOWS                     */}
            {/* ============================================================= */}
            {/* Soft Ambient Spread Shadow */}
            <ellipse
              cx="500"
              cy="684"
              rx="470"
              ry="32"
              fill="rgba(0, 0, 0, 0.32)"
              filter="blur(16px)"
            />
            {/* Intense Bottom Chassis Occlusion Shadow */}
            <ellipse
              cx="500"
              cy="670"
              rx="440"
              ry="14"
              fill="rgba(0, 0, 0, 0.65)"
              filter="blur(5px)"
            />

            {/* Left Foot Peg Contact Shadow */}
            <ellipse cx="106" cy="682" rx="22" ry="7" fill="rgba(0,0,0,0.55)" filter="blur(3px)" />
            {/* Right Foot Peg Contact Shadow */}
            <ellipse cx="894" cy="682" rx="22" ry="7" fill="rgba(0,0,0,0.55)" filter="blur(3px)" />

            {/* ============================================================= */}
            {/* 2. RUBBER FOOT PEGS (4 Base Legs)                              */}
            {/* ============================================================= */}
            {/* Left Foot */}
            <g id="left-foot">
              <rect x="88" y="654" width="36" height="26" rx="6" fill="#141517" stroke="#080809" strokeWidth="1.2" />
              <line x1="92" y1="656" x2="120" y2="656" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            </g>
            {/* Right Foot */}
            <g id="right-foot">
              <rect x="876" y="654" width="36" height="26" rx="6" fill="#141517" stroke="#080809" strokeWidth="1.2" />
              <line x1="880" y1="656" x2="908" y2="656" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            </g>

            {/* ============================================================= */}
            {/* 3. MAIN CHASSIS BODY (Satin Powder-Coated Black Shell)        */}
            {/* ============================================================= */}
            {/* Outer Rounded Monoblock Hull */}
            <rect
              x="50"
              y="118"
              width="900"
              height="552"
              rx="34"
              ry="34"
              fill="url(#chassisGrad)"
              stroke="#0a0a0c"
              strokeWidth="1.8"
            />

            {/* Top Overhead Specular Highlight Rim */}
            <path
              d="
                M 84 119
                L 916 119
                Q 948 119, 948 152
                L 948 160
                Q 940 126, 910 125
                L 90 125
                Q 60 126, 52 160
                L 52 152
                Q 52 119, 84 119
                Z
              "
              fill="url(#topRimGlint)"
            />

            {/* Left Cheek Diffuse Light Reflection */}
            <rect
              x="51"
              y="145"
              width="45"
              height="490"
              rx="22"
              fill="url(#leftCheekGlint)"
              className="pointer-events-none"
            />

            {/* Right Cheek Ambient Flank Shadow */}
            <rect
              x="904"
              y="145"
              width="45"
              height="490"
              rx="22"
              fill="url(#rightCheekShadow)"
              className="pointer-events-none"
            />

            {/* ============================================================= */}
            {/* 4. OVEN DOOR BEZEL & CAVITY (Left 75% of Front Face)          */}
            {/* ============================================================= */}
            {/* Recessed Outer Bezel Well */}
            <rect
              x="74"
              y="144"
              width="694"
              height="500"
              rx="20"
              fill="url(#doorFrameShadow)"
              stroke="#050607"
              strokeWidth="2"
            />

            {/* Inner Molded Door Rim */}
            <rect
              x="78"
              y="148"
              width="686"
              height="492"
              rx="18"
              fill="#1b1c1f"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.2"
            />

            {/* ============================================================= */}
            {/* 5. INTERIOR CAVITY (Visible Through Glass Door)               */}
            {/* ============================================================= */}
            <g id="oven-cavity-interior">
              {/* Cavity Steel Walls Backplate */}
              <rect
                x="98"
                y="198"
                width="646"
                height="404"
                rx="10"
                fill="url(#cavityBackWall)"
              />

              {/* Upper Ceiling Shadow */}
              <rect
                x="98"
                y="198"
                width="646"
                height="42"
                fill="rgba(0, 0, 0, 0.45)"
              />

              {/* Lower Floor Shadow */}
              <rect
                x="98"
                y="566"
                width="646"
                height="36"
                fill="rgba(0, 0, 0, 0.38)"
              />

              {/* --- STAMPED SIDE RUNNERS (Left Wall) --- */}
              <g id="left-wall-runners" opacity="0.85">
                {/* Upper runner indent */}
                <path d="M 106 270 L 142 270 L 148 290 L 106 290 Z" fill="#69727a" stroke="#485057" strokeWidth="1" />
                <line x1="106" y1="271" x2="142" y2="271" stroke="#b0b8c2" strokeWidth="1.2" />
                {/* Middle runner indent */}
                <path d="M 106 375 L 146 375 L 152 405 L 106 405 Z" fill="#656e76" stroke="#454c53" strokeWidth="1" />
                <line x1="106" y1="376" x2="146" y2="376" stroke="#b8c0ca" strokeWidth="1.2" />
                {/* Lower runner indent */}
                <path d="M 106 480 L 142 480 L 148 510 L 106 510 Z" fill="#616a72" stroke="#424950" strokeWidth="1" />
                <line x1="106" y1="481" x2="142" y2="481" stroke="#b0b8c2" strokeWidth="1.2" />
              </g>

              {/* --- STAMPED SIDE RUNNERS (Right Wall) --- */}
              <g id="right-wall-runners" opacity="0.85">
                {/* Upper runner indent */}
                <path d="M 736 270 L 700 270 L 694 290 L 736 290 Z" fill="#69727a" stroke="#485057" strokeWidth="1" />
                <line x1="736" y1="271" x2="700" y2="271" stroke="#b0b8c2" strokeWidth="1.2" />
                {/* Middle runner indent with Rotisserie Socket */}
                <path d="M 736 375 L 696 375 L 690 405 L 736 405 Z" fill="#656e76" stroke="#454c53" strokeWidth="1" />
                <line x1="736" y1="376" x2="696" y2="376" stroke="#b8c0ca" strokeWidth="1.2" />
                {/* Rotisserie center socket notch */}
                <circle cx="712" cy="390" r="7.5" fill="#32363b" stroke="#88929c" strokeWidth="1.4" />
                <circle cx="712" cy="390" r="3" fill="#181a1c" />
                {/* Lower runner indent */}
                <path d="M 736 480 L 700 480 L 694 510 L 736 510 Z" fill="#616a72" stroke="#424950" strokeWidth="1" />
                <line x1="736" y1="481" x2="700" y2="481" stroke="#b0b8c2" strokeWidth="1.2" />
              </g>

              {/* --- HEATING ELEMENTS (Quartz / Stainless Rods) --- */}
              {/* Upper Heating Rod */}
              <g id="upper-heating-rod">
                <rect
                  x="130"
                  y="226"
                  width="582"
                  height="11"
                  rx="5.5"
                  fill={
                    isPreheating
                      ? preheatPhase === 0
                        ? '#dc2626'
                        : 'url(#glowingHeatingRod)'
                      : isHeating && (heaterMode === 'upper' || heaterMode === 'both')
                      ? 'url(#glowingHeatingRod)'
                      : 'url(#inactiveHeatingRod)'
                  }
                  filter={
                    isPreheating
                      ? preheatPhase === 0
                        ? 'drop-shadow(0 0 8px #dc2626)'
                        : 'drop-shadow(0 0 16px #ff6600) drop-shadow(0 0 28px #ffaa00)'
                      : isHeating && (heaterMode === 'upper' || heaterMode === 'both')
                      ? 'drop-shadow(0 0 10px #ff6600)'
                      : 'none'
                  }
                />
              </g>

              {/* Lower Heating Rod */}
              <g id="lower-heating-rod">
                <rect
                  x="130"
                  y="576"
                  width="582"
                  height="11"
                  rx="5.5"
                  fill={
                    isPreheating
                      ? preheatPhase === 0
                        ? '#dc2626'
                        : 'url(#glowingHeatingRod)'
                      : isHeating && (heaterMode === 'lower' || heaterMode === 'both')
                      ? 'url(#glowingHeatingRod)'
                      : 'url(#inactiveHeatingRod)'
                  }
                  filter={
                    isPreheating
                      ? preheatPhase === 0
                        ? 'drop-shadow(0 0 8px #dc2626)'
                        : 'drop-shadow(0 0 16px #ff6600) drop-shadow(0 0 28px #ffaa00)'
                      : isHeating && (heaterMode === 'lower' || heaterMode === 'both')
                      ? 'drop-shadow(0 0 10px #ff6600)'
                      : 'none'
                  }
                />
              </g>

              {/* --- OVEN CAVITY 50-SECTION EXPANDED CONTENT DISPLAY TERMINAL --- */}
              <foreignObject
                x="132"
                y="238"
                width="578"
                height="256"
                className="overflow-visible select-none"
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className="w-full h-[256px] bg-slate-950/85 backdrop-blur-xl rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 border border-white/25 shadow-2xl flex flex-col justify-between text-white transition-all duration-300 hover:border-amber-400/60 overflow-hidden select-none"
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                >
                  {isPreheating ? (
                    /* ======================================================== */
                    /* THERMAL SYSTEM PREHEAT RELOAD ANIMATION HUD              */
                    /* ======================================================== */
                    <div
                      onClick={skipPreheat}
                      className="w-full h-full flex flex-col justify-between p-2 cursor-pointer select-none"
                      title="Click anywhere to skip preheat sequence"
                    >
                      {/* Top status */}
                      <div className="flex items-center justify-between pb-2 border-b border-amber-500/30">
                        <div className="flex items-center space-x-2">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                          <span className="font-mono font-bold text-xs tracking-wider text-amber-400">
                            CTI OTG-8000 // THERMAL SYSTEM IGNITION
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-amber-500 text-slate-950 font-mono">
                          {preheatPhase === 0 ? 'IGNITING' : preheatPhase === 1 ? 'PREHEATING' : 'READY'}
                        </span>
                      </div>

                      {/* Middle telemetry & visual heat progress bar */}
                      <div className="flex-1 flex flex-col justify-center items-center py-2 space-y-2">
                        <div className="text-center">
                          <div className="text-amber-300 font-black text-sm tracking-wide font-mono drop-shadow">
                            {preheatPhase === 0
                              ? '⚡ HEATER QUARTZ RODS ENERGIZING...'
                              : preheatPhase === 1
                              ? '🔥 RAPID CAVITY PREHEAT [250°C DUAL MODE]'
                              : '✓ OPTIMAL THERMAL EQUILIBRIUM ACHIEVED'}
                          </div>
                          <div className="text-slate-400 text-[11px] font-mono mt-1">
                            {preheatPhase === 0
                              ? 'Calibrating thermostat & quartz element coils'
                              : preheatPhase === 1
                              ? 'Infrared thermal radiation reaching 50 sections'
                              : 'Loading Card 2: Software Mission content'}
                          </div>
                        </div>

                        {/* Animated Heat Progress Meter */}
                        <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-amber-500/30 p-0.5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-300 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                            style={{
                              width: preheatPhase === 0 ? '30%' : preheatPhase === 1 ? '75%' : '100%',
                            }}
                          />
                        </div>
                      </div>

                      {/* Bottom status bar */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-400 font-mono">
                        <span>THERMOSTAT: 250°C</span>
                        <span className="text-amber-400 font-bold">[CLICK TO SKIP]</span>
                        <span>SECTIONS: 50 LOADED</span>
                      </div>
                    </div>
                  ) : (
                    /* ======================================================== */
                    /* REGULAR 50-SECTION CULINARY DISPLAY                      */
                    /* ======================================================== */
                    <>
                      {/* Top Header Row: Section Title & Interactive Nav Controls */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/15 shrink-0 gap-3">
                        <div className="flex items-center space-x-2 truncate flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={triggerPreheatSequence}
                            className="px-1.5 py-0.5 rounded text-[8.5px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/30 transition-all cursor-pointer font-mono shrink-0"
                            title="Click to re-trigger thermal preheat reload sequence"
                          >
                            [PREHEAT]
                          </button>
                          <h3
                            key={`title-${currentSectionIdx}`}
                            className="text-[14px] sm:text-[15px] font-black text-white tracking-tight leading-snug m-0 drop-shadow truncate"
                            style={{
                              animation: `${slideDirection === 'next' ? 'contentSlideNext' : 'contentSlidePrev'} 0.3s cubic-bezier(0.16, 1, 0.3, 1) both`,
                            }}
                            title={currentSection.title}
                          >
                            {currentSection.title}
                          </h3>
                        </div>

                        {/* Cavity Section Switcher Controls */}
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            type="button"
                            onClick={prevSection}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-sm font-black transition cursor-pointer"
                            title="Previous Section (Arrow Left)"
                          >
                            ‹
                          </button>
                          <span
                            key={`counter-${currentSectionIdx}`}
                            className="text-xs font-mono font-black text-slate-200 px-1 inline-block"
                            style={{
                              animation: 'counterPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
                            }}
                          >
                            {(ovenSections && ovenSections.length > 0) ? (currentSectionIdx + 1) : 0} / {(ovenSections && ovenSections.length) || 0}
                          </span>
                          <button
                            type="button"
                            onClick={nextSection}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-sm font-black transition cursor-pointer"
                            title="Next Section (Arrow Right)"
                          >
                            ›
                          </button>
                        </div>
                      </div>

                      {/* The 50-60 Words Content: Clean, Perfectly Visible with Generous Clearance */}
                      <div
                        key={`content-${currentSectionIdx}`}
                        className="flex-1 min-h-0 overflow-y-auto custom-crt-scrollbar pr-1 pt-1"
                        style={{
                          animation: `${slideDirection === 'next' ? 'contentSlideNext' : 'contentSlidePrev'} 0.34s cubic-bezier(0.16, 1, 0.3, 1) 0.03s both`,
                        }}
                      >
                        <p
                          className="text-[12px] sm:text-[12.8px] text-slate-100 leading-relaxed sm:leading-[1.62] font-normal text-justify m-0"
                          style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            textAlignLast: 'left',
                          }}
                        >
                          {currentSection.content}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </foreignObject>

              {/* --- LOWER SHELF: CHROME WIRE GRILL RACK --- */}
              <g id="lower-wire-rack">
                {/* Horizontal Front Crossbar */}
                <line
                  x1="112"
                  y1="506"
                  x2="730"
                  y2="506"
                  stroke="url(#chromeWire)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Front Crossbar Specular Line */}
                <line
                  x1="114"
                  y1="505"
                  x2="728"
                  y2="505"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0.9"
                />

                {/* Rear Parallel Crossbar */}
                <line
                  x1="150"
                  y1="486"
                  x2="692"
                  y2="486"
                  stroke="url(#chromeWire)"
                  strokeWidth="4"
                  opacity="0.75"
                />

                {/* Longitudinal Chrome Wire Tines (19 tines) */}
                {[
                  125, 155, 185, 215, 245, 275, 305, 335, 365, 395,
                  425, 455, 485, 515, 545, 575, 605, 635, 665, 695, 715
                ].map((xFront, idx) => {
                  // Slight perspective convergence toward rear
                  const xRear = 421 + (xFront - 421) * 0.90;
                  return (
                    <g key={idx}>
                      {/* Wire contact drop shadow */}
                      <line
                        x1={xFront}
                        y1={509}
                        x2={xRear}
                        y2={489}
                        stroke="rgba(0, 0, 0, 0.45)"
                        strokeWidth="3.2"
                      />
                      {/* Wire chrome body */}
                      <line
                        x1={xFront}
                        y1={506}
                        x2={xRear}
                        y2={486}
                        stroke="url(#chromeWire)"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      {/* Top Specular Glint */}
                      <line
                        x1={xFront}
                        y1={505.2}
                        x2={xRear}
                        y2={485.4}
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        opacity="0.85"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Radiant Warm Ambient Glow Overlay When Heating or Preheating */}
              {(isHeating || isPreheating) && (
                <rect
                  x="98"
                  y="198"
                  width="646"
                  height="404"
                  rx="10"
                  fill="url(#bakeGlow)"
                  className="pointer-events-none"
                  style={{
                    mixBlendMode: 'screen',
                    animation: isPreheating
                      ? 'ovenThermalSweep 1.2s ease-in-out infinite'
                      : 'ovenHeatPulse 3s ease-in-out infinite',
                  }}
                />
              )}
            </g>

            {/* ============================================================= */}
            {/* 6. TEMPERED GLASS DOOR FACEPLATE & SHEEN                       */}
            {/* ============================================================= */}
            <g id="glass-door-window">
              {/* Outer Tinted Glass Sheet */}
              <rect
                x="94"
                y="194"
                width="654"
                height="412"
                rx="10"
                fill="url(#glassReflection)"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1.2"
                className="pointer-events-none"
              />

              {/* Diagonal Room Light Glass Sheen Streak */}
              <polygon
                points="110,195 240,195 140,605 100,605"
                fill="rgba(255, 255, 255, 0.05)"
                className="pointer-events-none"
              />
              <polygon
                points="280,195 440,195 280,605 180,605"
                fill="rgba(255, 255, 255, 0.03)"
                className="pointer-events-none"
              />
            </g>

            {/* ============================================================= */}
            {/* 7. DOOR LOWER EMBOSSED LIP & PRESTIGE BRAND LOGO               */}
            {/* ============================================================= */}
            <g id="door-bottom-lip">
              {/* Outer Molded Scalloped Bottom Edge Bar */}
              <path
                d="
                  M 94 576
                  L 748 576
                  L 748 642
                  Q 748 646, 742 646
                  L 100 646
                  Q 94 646, 94 642
                  Z
                "
                fill="#141517"
                stroke="#080809"
                strokeWidth="1.2"
              />

              {/* Upper Scalloped Decorative Notch Curve */}
              <path
                d="
                  M 94 576
                  Q 120 577, 140 594
                  Q 160 608, 220 608
                  L 622 608
                  Q 682 608, 702 594
                  Q 722 577, 748 576
                  L 748 584
                  Q 720 585, 700 602
                  Q 680 616, 620 616
                  L 222 616
                  Q 162 616, 142 602
                  Q 122 585, 94 584
                  Z
                "
                fill="#1c1e21"
              />

              {/* Top Scallop Highlight Line */}
              <path
                d="
                  M 94 576.5
                  Q 120 577.5, 140 594.5
                  Q 160 608.5, 220 608.5
                  L 622 608.5
                  Q 682 608.5, 702 594.5
                  Q 722 577.5, 748 576.5
                "
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* =========================================================== */}
              {/* CTI BRAND LOGO                                              */}
              {/* Centered at X: 421, Y: 627                                  */}
              {/* =========================================================== */}
              <g id="cti-logo-mark" className="select-none pointer-events-none">
                <text
                  x="421"
                  y="628"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
                  fontSize="24"
                  fontWeight="900"
                  letterSpacing="0.22em"
                  style={{
                    filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))',
                  }}
                >
                  CTI
                </text>
              </g>
            </g>

            {/* ============================================================= */}
            {/* 8. BRUSHED STAINLESS STEEL DOOR HANDLE BAR                     */}
            {/* ============================================================= */}
            <g id="oven-door-handle" className="select-none">
              {/* Invisible Touch Cushion for Handle Tap Ergonomics */}
              <rect x="74" y="145" width="694" height="42" fill="transparent" pointerEvents="all" />

              {/* Handle Under-bar Occlusion Drop Shadow */}
              <rect
                x="84"
                y="172"
                width="674"
                height="10"
                rx="5"
                fill="rgba(0, 0, 0, 0.65)"
                filter="blur(3px)"
              />

              {/* Left Mounting Stanchion */}
              <rect
                x="78"
                y="155"
                width="14"
                height="22"
                rx="3"
                fill="url(#stanchionGrad)"
                stroke="#08080a"
                strokeWidth="1.2"
              />
              <line x1="80" y1="156" x2="90" y2="156" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

              {/* Right Mounting Stanchion */}
              <rect
                x="750"
                y="155"
                width="14"
                height="22"
                rx="3"
                fill="url(#stanchionGrad)"
                stroke="#08080a"
                strokeWidth="1.2"
              />
              <line x1="752" y1="156" x2="762" y2="156" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

              {/* Main Cylindrical Stainless Steel Bar */}
              <rect
                x="88"
                y="158"
                width="666"
                height="16"
                rx="8"
                fill="url(#steelHandleGrad)"
                stroke="#3f434a"
                strokeWidth="1.2"
              />

              {/* Razor-Sharp Cylindrical Specular Glint along Top Axis */}
              <line
                x1="92"
                y1="162"
                x2="750"
                y2="162"
                stroke="#ffffff"
                strokeWidth="2.2"
                opacity="0.95"
              />
              <line
                x1="92"
                y1="166"
                x2="750"
                y2="166"
                stroke="#ffffff"
                strokeWidth="0.8"
                opacity="0.55"
              />

              {/* Handle End Bevel Caps */}
              <ellipse cx="89" cy="166" rx="2" ry="7" fill="#696f78" stroke="#36393e" strokeWidth="0.8" />
              <ellipse cx="753" cy="166" rx="2" ry="7" fill="#696f78" stroke="#36393e" strokeWidth="0.8" />
            </g>

            {/* ============================================================= */}
            {/* 9. RIGHT CONTROL PANEL (Precision Inset Console from Image)   */}
            {/* ============================================================= */}
            <g id="right-control-console" className="select-none">
              {/* Outer Inset Panel Plate with Recessed Border Groove */}
              <rect
                x="780"
                y="144"
                width="148"
                height="504"
                rx="16"
                fill="url(#controlPanelPlateGrad)"
                stroke="#090a0c"
                strokeWidth="2.5"
              />

              {/* Inner Recessed Bezel Groove */}
              <rect
                x="783"
                y="147"
                width="142"
                height="498"
                rx="13"
                fill="none"
                stroke="#121315"
                strokeWidth="1.6"
              />

              {/* Fine Specular Chamfer Rim Contour */}
              <rect
                x="784.5"
                y="148.5"
                width="139"
                height="495"
                rx="12"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.8"
              />

              {/* Left Edge Door-Cavity Shadow */}
              <rect
                x="780"
                y="144"
                width="14"
                height="504"
                rx="16"
                fill="url(#panelLeftShadowGrad)"
              />

              {/* ----------------------------------------------------------- */}
              {/* TOP SECTION: TEMPERATURE (°C)                               */}
              {/* ----------------------------------------------------------- */}
              <g id="section-temperature">
                {/* Thermometer Icon & Label */}
                <g transform="translate(816, 154)">
                  {/* Thermometer Icon */}
                  <path
                    d="M 5 2 L 5 9 A 3 3 0 1 0 7 9 L 7 2 A 1 1 0 0 0 5 2 Z"
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                  <circle cx="6" cy="11.5" r="1.8" fill="#ffffff" />
                  {/* Label Text */}
                  <text
                    x="14"
                    y="9.2"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="8.6"
                    fontWeight="900"
                    letterSpacing="0.04em"
                  >
                    TEMPERATURE (°C)
                  </text>
                </g>

                {/* Dial Markings: 100 at 9:00, arc of dots, 100, 200, 250 */}
                <g id="temp-dial-markings" opacity="0.95">
                  {/* 100 at 9:00 (left) */}
                  <text
                    x="806"
                    y="244"
                    textAnchor="end"
                    fill="#ffffff"
                    fontSize="9.2"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                  >
                    100
                  </text>

                  {/* Arc Dots & Calibration Numbers */}
                  {/* Dot at 10:00 */}
                  <circle cx="816" cy="224" r="1.6" fill="#ffffff" />

                  {/* 100 at 10:30 */}
                  <text
                    x="824"
                    y="208"
                    fill="#ffffff"
                    fontSize="8.6"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                  >
                    100
                  </text>

                  {/* 4 Intermediate Dots between 100 & 200 */}
                  <circle cx="835" cy="202" r="1.6" fill="#ffffff" />
                  <circle cx="848" cy="199" r="1.6" fill="#ffffff" />
                  <circle cx="861" cy="199" r="1.6" fill="#ffffff" />
                  <circle cx="874" cy="202" r="1.6" fill="#ffffff" />

                  {/* 200 at 1:30 */}
                  <text
                    x="888"
                    y="209"
                    fill="#ffffff"
                    fontSize="8.6"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                  >
                    200
                  </text>

                  {/* 2 Intermediate Dots between 200 & 250 */}
                  <circle cx="893" cy="219" r="1.6" fill="#ffffff" />
                  <circle cx="897" cy="230" r="1.6" fill="#ffffff" />

                  {/* 250 at 3:00 (right) */}
                  <text
                    x="901"
                    y="244"
                    fill="#ffffff"
                    fontSize="8.6"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                  >
                    250
                  </text>
                </g>

                {/* Rotary Knob 1: Sculpted Temperature Controller with Smooth Spring Rotation */}
                <SculptedKnob
                  id="knob-temperature"
                  cx={854}
                  cy={240}
                  angle={tempAngle}
                  onClick={cycleTemperature}
                  title="Click to adjust Temperature (100°C, 150°C, 200°C, 250°C)"
                />
              </g>

              {/* ----------------------------------------------------------- */}
              {/* MIDDLE SECTION: HEATER POWER & PILOT LAMP                   */}
              {/* ----------------------------------------------------------- */}
              <g id="section-heater">
                {/* Header Label: HEATER POWER */}
                <text
                  x="810"
                  y="323"
                  fill="#ffffff"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="8.6"
                  fontWeight="900"
                  letterSpacing="0.04em"
                >
                  HEATER POWER
                </text>

                {/* 3D JEWELED RED PILOT INDICATOR LAMP */}
                <g id="pilot-indicator-lamp" transform="translate(896, 319)">
                  {/* Radiant Hot Volumetric Aura - Blinking Beep Glow */}
                  <circle
                    cx="0"
                    cy="0"
                    r="18"
                    fill="url(#pilotLampAura)"
                    className="pointer-events-none"
                    style={{ animation: 'pilotLightBeep 1s ease-in-out infinite' }}
                  />

                  {/* Outer Heavy Black Housing Ring */}
                  <circle cx="0" cy="0" r="12" fill="#141517" stroke="#090a0c" strokeWidth="1.2" />
                  {/* Inset Beveled Reflector Ring */}
                  <circle cx="0" cy="0" r="10" fill="#2b2d32" stroke="#161719" strokeWidth="0.8" />
                  {/* Chrome Inner Reflector Wall */}
                  <circle cx="0" cy="0" r="8.8" fill="#464b54" />

                  {/* Glowing Animated Red Convex Lens (Continuously Beeping/Blinking, Bursts on Preheat) */}
                  <g
                    onClick={triggerPreheatSequence}
                    className="cursor-pointer"
                    title="Click to trigger Thermal Preheat ignition sequence"
                    style={{
                      animation: isPreheating
                        ? 'pilotIgnitionBurst 0.6s ease-in-out infinite'
                        : 'pilotLensBeep 1s ease-in-out infinite',
                    }}
                  >
                    {/* Translucent Ruby Red Convex Lens */}
                    <circle cx="0" cy="0" r="7.4" fill="url(#pilotLensGrad)" />
                    {/* Core Neon Hotspot during blink */}
                    <circle cx="0" cy="0" r="4.6" fill="#ff2211" opacity="0.85" />
                    {/* Photorealistic High-Gloss Curved Studio Specular Hotspot */}
                    <ellipse cx="-2.2" cy="-2.2" rx="3.2" ry="1.8" fill="#ffffff" opacity="0.95" />
                    <ellipse cx="2" cy="2.2" rx="2" ry="1" fill="rgba(255, 200, 200, 0.4)" />
                  </g>
                </g>

                {/* Heating Function Mode Icons around Middle Dial */}
                <g id="heater-mode-icons">
                  {/* 1. TOP (12:00): 'O' (Off) */}
                  <circle cx="854" cy="354" r="4.4" fill="none" stroke="#ffffff" strokeWidth="1.6" />

                  {/* 2. TOP-RIGHT (~1:30, below red pilot light): Rotisserie / Broil Mode */}
                  <g transform="translate(889, 363)">
                    <rect x="-7" y="-5.5" width="14" height="11" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <line x1="-5" y1="-2.8" x2="5" y2="-2.8" stroke="#ffffff" strokeWidth="1.8" />
                    <path d="M 5 -1 Q 8 -1, 6 2" stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  </g>

                  {/* 3. RIGHT (3:00): Upper Heating Element Only */}
                  <g transform="translate(900, 390)">
                    <rect x="-7" y="-5.5" width="14" height="11" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <line x1="-5" y1="-2.8" x2="5" y2="-2.8" stroke="#ffffff" strokeWidth="1.8" />
                  </g>

                  {/* 4. BOTTOM (6:00): Lower Heating Element Only */}
                  <g transform="translate(854, 428)">
                    <rect x="-7" y="-5.5" width="14" height="11" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <line x1="-5" y1="2.8" x2="5" y2="2.8" stroke="#ffffff" strokeWidth="1.8" />
                  </g>

                  {/* 5. LEFT (9:00): Both Upper & Lower Elements (Active in image!) */}
                  <g transform="translate(808, 390)">
                    <rect x="-7" y="-5.5" width="14" height="11" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <line x1="-5" y1="-2.8" x2="5" y2="-2.8" stroke="#ffffff" strokeWidth="1.8" />
                    <line x1="-5" y1="2.8" x2="5" y2="2.8" stroke="#ffffff" strokeWidth="1.8" />
                  </g>
                </g>

                {/* Rotary Knob 2: Sculpted Heater Function Controller with Smooth Spring Rotation */}
                <SculptedKnob
                  id="knob-heater"
                  cx={854}
                  cy={390}
                  angle={modeAngle}
                  onClick={cycleHeaterMode}
                  title="Click to cycle Heater Mode (Both, Off, Upper, Lower)"
                />
              </g>

              {/* ----------------------------------------------------------- */}
              {/* BOTTOM SECTION: MECHANICAL TIMER DIAL (MIN)                 */}
              {/* ----------------------------------------------------------- */}
              <g id="section-timer">
                {/* Clock Icon & Label */}
                <g transform="translate(816, 472)">
                  <circle cx="6" cy="6" r="5" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                  <polyline points="6,3 6,6 8,6" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <text
                    x="14"
                    y="9.2"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="8.6"
                    fontWeight="900"
                    letterSpacing="0.04em"
                  >
                    TIMER(MIN)
                  </text>
                </g>

                {/* Timer Dial Track Markings */}
                <g id="timer-dial-markings">
                  {/* Top: OFF at 12:00 */}
                  <text
                    x="854"
                    y="490"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                  >
                    OFF
                  </text>
                  {/* OFF Pointer Line */}
                  <line x1="854" y1="494" x2="854" y2="502" stroke="#ffffff" strokeWidth="2.5" />

                  {/* THICK WHITE CURVED SEGMENTED ARC BAND */}
                  <path
                    d="M 864.5 500.9 A 40.5 40.5 0 1 1 814.9 550.5"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5.5"
                    strokeLinecap="butt"
                  />

                  {/* Radial Dark Ticks Cutting across the White Arc */}
                  {[
                    18, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 128,
                    138, 148, 158, 168, 178, 188, 198, 208, 218, 228, 238, 248
                  ].map((deg, idx) => {
                    const rad = (deg * Math.PI) / 180;
                    const isMajor = deg % 30 < 10;
                    const rIn = isMajor ? 36.5 : 37.8;
                    const rOut = isMajor ? 44.5 : 43.2;
                    const x1 = 854 + rIn * Math.sin(rad);
                    const y1 = 540 - rIn * Math.cos(rad);
                    const x2 = 854 + rOut * Math.sin(rad);
                    const y2 = 540 - rOut * Math.cos(rad);
                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#141518"
                        strokeWidth={isMajor ? 1.8 : 1.2}
                      />
                    );
                  })}

                  {/* Calibration Numbers & Markings */}
                  {/* 10 at ~1:30 */}
                  <text x="890" y="506" fill="#ffffff" fontSize="9.2" fontWeight="800" fontFamily="sans-serif">
                    10
                  </text>

                  {/* Dot at ~2:30 */}
                  <circle cx="904" cy="527" r="1.8" fill="#ffffff" />

                  {/* 50 at ~3:30 */}
                  <text x="903" y="558" fill="#ffffff" fontSize="9.2" fontWeight="800" fontFamily="sans-serif">
                    50
                  </text>

                  {/* 20 at ~5:00 */}
                  <text x="886" y="585" fill="#ffffff" fontSize="9.2" fontWeight="800" fontFamily="sans-serif">
                    20
                  </text>

                  {/* Dot between 20 & 30 */}
                  <circle cx="871" cy="594" r="1.8" fill="#ffffff" />

                  {/* 30 at ~6:00 */}
                  <text x="854" y="600" textAnchor="middle" fill="#ffffff" fontSize="9.2" fontWeight="800" fontFamily="sans-serif">
                    30
                  </text>

                  {/* Dot between 30 & 40 */}
                  <circle cx="837" cy="594" r="1.8" fill="#ffffff" />

                  {/* 40 at ~7:30 */}
                  <text x="820" y="583" textAnchor="end" fill="#ffffff" fontSize="9.2" fontWeight="800" fontFamily="sans-serif">
                    40
                  </text>

                  {/* Dot at ~8:20 */}
                  <circle cx="806" cy="557" r="1.8" fill="#ffffff" />

                  {/* Coiled Wire Heating Symbol + ON at ~9:00 */}
                  <g transform="translate(801, 536)">
                    <path
                      d="M 0 -8 C -4 -8, -5 -4, 0 -4 C 5 -4, 4 0, 0 0 C -4 0, -5 4, 0 4 C 4 4, 3 8, 0 8"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <text
                      x="3"
                      y="2"
                      fill="#ffffff"
                      fontSize="7.2"
                      fontWeight="900"
                      fontFamily="system-ui, sans-serif"
                    >
                      ON
                    </text>
                  </g>
                </g>

                {/* Rotary Knob 3: Sculpted Timer Controller with Smooth Spring Rotation */}
                <SculptedKnob
                  id="knob-timer"
                  cx={854}
                  cy={540}
                  angle={timerAngle}
                  onClick={cycleTimer}
                  title="Click to cycle Timer (Off, 10m, 20m, 30m, 40m, 50m, 55m, 60m)"
                />
              </g>

              {/* ----------------------------------------------------------- */}
              {/* SECTION NAVIGATION CONTROLS (INTEGRATED IN CONTROL PANEL)   */}
              {/* ----------------------------------------------------------- */}
              <g id="console-section-navigator" transform="translate(854, 626)">
                {/* Outer Recessed Bezel Pocket */}
                <rect
                  x="-68"
                  y="-15"
                  width="136"
                  height="30"
                  rx="7"
                  fill="#0e0f12"
                  stroke="#08090a"
                  strokeWidth="1.2"
                />
                <rect
                  x="-67"
                  y="-14"
                  width="134"
                  height="28"
                  rx="6"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.8"
                />

                {/* PREV BUTTON */}
                <g
                  id="btn-console-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSection();
                  }}
                  className="cursor-pointer group select-none active:opacity-70 transition-opacity"
                  transform="translate(-33, 0)"
                  title="Previous Section (Arrow Left)"
                >
                  {/* Invisible Touch Cushion for Mobile Ergonomics */}
                  <rect x="-35" y="-18" width="70" height="36" fill="transparent" pointerEvents="all" />

                  {/* Button Drop Shadow */}
                  <rect x="-29" y="-11" width="58" height="22" rx="5" fill="rgba(0, 0, 0, 0.65)" filter="blur(1.5px)" pointerEvents="none" />

                  {/* Button Body Bevel */}
                  <rect
                    x="-29"
                    y="-11"
                    width="58"
                    height="22"
                    rx="5"
                    fill="url(#consoleBtnGrad)"
                    stroke="#2e3238"
                    strokeWidth="1"
                    className="group-hover:stroke-slate-400 group-active:stroke-amber-400 transition-colors"
                    pointerEvents="none"
                  />

                  {/* Button Top Specular Glint */}
                  <line x1="-25" y1="-9.5" x2="25" y2="-9.5" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" pointerEvents="none" />

                  {/* Text Label: ‹ PREV */}
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="9"
                    fontWeight="900"
                    letterSpacing="0.04em"
                    className="group-hover:fill-amber-300 transition-colors"
                    pointerEvents="none"
                  >
                    ‹ PREV
                  </text>
                </g>

                {/* Center Divider Groove */}
                <line x1="0" y1="-9" x2="0" y2="9" stroke="#16181b" strokeWidth="1.2" />

                {/* NEXT BUTTON */}
                <g
                  id="btn-console-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSection();
                  }}
                  className="cursor-pointer group select-none active:opacity-70 transition-opacity"
                  transform="translate(33, 0)"
                  title="Next Section (Arrow Right)"
                >
                  {/* Invisible Touch Cushion for Mobile Ergonomics */}
                  <rect x="-35" y="-18" width="70" height="36" fill="transparent" pointerEvents="all" />

                  {/* Button Drop Shadow */}
                  <rect x="-29" y="-11" width="58" height="22" rx="5" fill="rgba(0, 0, 0, 0.65)" filter="blur(1.5px)" pointerEvents="none" />

                  {/* Button Body Bevel - Radiant Prestige Red Accent */}
                  <rect
                    x="-29"
                    y="-11"
                    width="58"
                    height="22"
                    rx="5"
                    fill="url(#consoleBtnNextGrad)"
                    stroke="#b91c1c"
                    strokeWidth="1"
                    className="group-hover:stroke-red-400 group-active:stroke-rose-300 transition-colors"
                    pointerEvents="none"
                  />

                  {/* Button Top Specular Glint */}
                  <line x1="-25" y1="-9.5" x2="25" y2="-9.5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" pointerEvents="none" />

                  {/* Text Label: NEXT › */}
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="9"
                    fontWeight="900"
                    letterSpacing="0.04em"
                    pointerEvents="none"
                  >
                    NEXT ›
                  </text>
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* MOBILE / TABLET RESPONSIVE READING HUD CARD (Pinned height so PREV/NEXT buttons NEVER shift) */}
        <div
          className="order-1 md:order-2 w-full mb-3 md:mb-0 p-3.5 sm:p-4 rounded-2xl border select-text transition-all duration-200 flex flex-col justify-between h-[340px] sm:h-[320px] md:hidden shadow-2xl"
          style={{
            backgroundColor: '#0d1117',
            borderColor: 'rgba(245, 158, 11, 0.4)',
            boxShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.65), 0 0 24px -2px rgba(245, 158, 11, 0.2)',
          }}
        >
          {/* Top Status & Navigation Controls (Fixed Height) */}
          <div className="flex items-center justify-between pb-2 border-b border-white/15 shrink-0 h-[38px]">
            <div className="flex items-center space-x-2">
              <span
                onClick={triggerPreheatSequence}
                className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse cursor-pointer"
                title="Click to trigger Thermal Preheat"
              />
              <span className="font-extrabold text-[11px] sm:text-xs tracking-wider text-amber-400 uppercase font-mono">
                {currentSection.category || 'SOFTWARE MISSION'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={triggerPreheatSequence}
                className="px-2 py-0.5 rounded text-[9px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer font-mono"
                title="Re-trigger Thermal Preheat"
              >
                ⚡ PREHEAT
              </button>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide bg-amber-500 text-slate-950 font-mono">
                {(ovenSections && ovenSections.length > 0) ? (currentSectionIdx + 1) : 0} / {(ovenSections && ovenSections.length) || 0}
              </span>
            </div>
          </div>

          {/* Middle Body: Fixed Height Title & Scrollable Text so card height stays constant */}
          <div className="flex-1 flex flex-col justify-start overflow-hidden my-1.5">
            {/* Section Title (Min-height to smoothly fit 1 or 2 lines without moving buttons) */}
            <h2 className="min-h-[42px] flex items-center text-sm sm:text-base font-extrabold leading-snug shrink-0 m-0 text-white drop-shadow">
              <span className="text-amber-400 text-xs mr-1.5">&gt;&gt;</span>
              <span>{currentSection.title}</span>
            </h2>

            {/* Section Content with smooth custom scrollbar & clean justified right-alignment */}
            <div
              key={currentSectionIdx}
              className={`flex-1 overflow-y-auto custom-crt-scrollbar pr-2 mt-1 text-xs sm:text-[13px] leading-[1.62] font-sans select-text text-slate-100 ${
                slideDirection === 'next' ? 'contentSlideNext' : 'contentSlidePrev'
              }`}
              style={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                textAlignLast: 'left',
              }}
            >
              {currentSection.content}
            </div>
          </div>

          {/* Bottom Action Navigation Buttons (Rigidly anchored at bottom, never shifts) */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/15 shrink-0 h-[46px]">
            <button
              type="button"
              onClick={prevSection}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg font-bold text-xs font-mono transition-transform active:scale-95 cursor-pointer touch-manipulation select-none bg-white/10 text-slate-200 border border-white/20 hover:bg-white/15"
            >
              <span>‹</span>
              <span>PREV</span>
            </button>

            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              SWIPE ◄ ►
            </span>

            <button
              type="button"
              onClick={nextSection}
              className="flex items-center space-x-1 px-4 py-2 rounded-lg font-bold text-xs font-mono transition-transform active:scale-95 cursor-pointer touch-manipulation select-none bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30"
            >
              <span>NEXT</span>
              <span>›</span>
            </button>
          </div>
        </div>
      </main>

      {/* Animation Styles */}
      <style>{`
        @keyframes pilotLightBeep {
          0%, 18% {
            opacity: 0;
            filter: drop-shadow(0 0 0px transparent);
          }
          32%, 52% {
            opacity: 1;
            filter: drop-shadow(0 0 10px #ff1a00) drop-shadow(0 0 18px #ff4400) drop-shadow(0 0 28px #ff0000);
          }
          68%, 100% {
            opacity: 0;
            filter: drop-shadow(0 0 0px transparent);
          }
        }
        @keyframes pilotLensBeep {
          0%, 18% {
            filter: brightness(0.28) saturate(0.7);
            opacity: 0.4;
          }
          32%, 52% {
            filter: brightness(1.5) saturate(1.35) drop-shadow(0 0 8px #ff2200);
            opacity: 1;
          }
          68%, 100% {
            filter: brightness(0.28) saturate(0.7);
            opacity: 0.4;
          }
        }
        @keyframes pilotIgnitionBurst {
          0% {
            transform: scale(0.85);
            filter: drop-shadow(0 0 4px #ff1a00);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.35);
            filter: drop-shadow(0 0 22px #ff2200) drop-shadow(0 0 35px #ff5500);
            opacity: 1;
          }
          100% {
            transform: scale(0.85);
            filter: drop-shadow(0 0 4px #ff1a00);
            opacity: 0.7;
          }
        }
        @keyframes ovenThermalSweep {
          0% {
            opacity: 0.35;
            filter: brightness(1) drop-shadow(0 0 10px rgba(255, 170, 40, 0.4));
          }
          50% {
            opacity: 0.95;
            filter: brightness(1.4) drop-shadow(0 0 25px rgba(255, 120, 20, 0.8));
          }
          100% {
            opacity: 0.35;
            filter: brightness(1) drop-shadow(0 0 10px rgba(255, 170, 40, 0.4));
          }
        }
        @keyframes ovenHeatPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.72; }
        }
        @keyframes applianceEntrance {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes contentSlideNext {
          0% {
            opacity: 0;
            transform: translateX(20px);
            filter: blur(1.5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }
        @keyframes contentSlidePrev {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            filter: blur(1.5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }
        @keyframes counterPop {
          0% {
            opacity: 0.4;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .custom-crt-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-crt-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-crt-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.45);
          border-radius: 4px;
        }
        .custom-crt-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.8);
        }

        .software-mission-environment {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: transparent !important;
        }

        .watermark-bg:has(.software-mission-environment) {
          background-color: #f8fafc !important;
        }

        .watermark-bg:has(.software-mission-environment)::before {
          opacity: 0.18 !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
}

export { Oven, Oven as SoftwareMissionPage };

