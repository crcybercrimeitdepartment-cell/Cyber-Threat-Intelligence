import React from 'react';

/**
 * HotAirBalloon Component:
 * Renders 3 distinct, whimsical hot air balloons floating upwards through the sky:
 * 1. Balloon 1 (Medium): "Candy Sunset" - Striped bands with a friendly smiley face (Right side)
 * 2. Balloon 2 (Small): "Emerald Star" - Vertical gores with a golden adventure star (Mid-right, distant)
 * 3. Balloon 3 (Large): "Royal Cruiser" - Zig-zag chevrons with an adorable winking face (Left side)
 */
const HotAirBalloon = () => {
  return (
    <>
      {/* Scoped CSS animations for smooth upward flight & natural aerodynamic sway */}
      <style>{`
        @keyframes balloonRiseFlight {
          0% {
            top: 105%;
          }
          100% {
            top: -28%;
          }
        }
        @keyframes balloonGentleSway1 {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          30% {
            transform: translateX(12px) rotate(2.4deg);
          }
          70% {
            transform: translateX(-10px) rotate(-2deg);
          }
        }
        @keyframes balloonGentleSway2 {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          35% {
            transform: translateX(-8px) rotate(-1.8deg);
          }
          75% {
            transform: translateX(8px) rotate(1.8deg);
          }
        }
        @keyframes balloonGentleSway3 {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          28% {
            transform: translateX(14px) rotate(2.6deg);
          }
          72% {
            transform: translateX(-12px) rotate(-2.4deg);
          }
        }
      `}</style>

      {/* =========================================================
          BALLOON 1: Standard Medium (Candy Sunset - Right Side)
          ========================================================= */}
      <div
        className="absolute right-2 sm:right-3 md:right-5 lg:right-7 xl:right-10 w-20 sm:w-22 md:w-24 lg:w-26 pointer-events-none z-[3] select-none"
        style={{
          animation: 'balloonRiseFlight 24s linear infinite',
          animationDelay: '0s',
          willChange: 'top',
        }}
      >
        <div
          className="w-full cursor-pointer pointer-events-auto group hover:scale-110 transition-transform duration-300"
          style={{ animation: 'balloonGentleSway1 5.2s ease-in-out infinite' }}
          title="CR Sky Explorer - Candy Sunset"
        >
          <svg
            viewBox="0 0 200 300"
            fill="none"
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(2,132,199,0.32)] group-hover:drop-shadow-[0_18px_36px_rgba(2,132,199,0.5)] transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Envelope Base (Sky Blue) */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="#2977d4"
            />
            {/* Crimson Red Crown */}
            <path
              d="M 100,14 C 132,14 158,28 172,50 C 152,56 128,60 100,60 C 72,60 48,56 28,50 C 42,28 68,14 100,14 Z"
              fill="#e11d48"
            />
            {/* Sunny Yellow Band */}
            <path
              d="M 28,50 C 48,56 72,60 100,60 C 128,60 152,56 172,50 C 178,61 182,73 184,86 C 160,94 132,98 100,98 C 68,98 40,94 16,86 C 18,73 22,61 28,50 Z"
              fill="#ffd129"
            />
            {/* Candy Pink Face Band */}
            <path
              d="M 16,86 C 40,94 68,98 100,98 C 132,98 160,94 184,86 C 184,106 178,128 168,148 C 148,156 125,160 100,160 C 75,160 52,156 32,148 C 22,128 16,106 16,86 Z"
              fill="#f04285"
            />
            {/* Royal Purple Band */}
            <path
              d="M 32,148 C 52,156 75,160 100,160 C 125,160 148,156 168,148 C 154,178 135,204 116,228 L 84,228 C 65,204 46,178 32,148 Z"
              fill="#753587"
            />

            {/* Cute Friendly Smiley Face */}
            <circle cx="76" cy="120" r="5.5" fill="#181818" />
            <circle cx="74" cy="118.5" r="1.8" fill="#ffffff" />
            <circle cx="124" cy="120" r="5.5" fill="#181818" />
            <circle cx="122" cy="118.5" r="1.8" fill="#ffffff" />
            <path
              d="M 88,126 Q 100,137 112,126"
              fill="none"
              stroke="#181818"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="128" rx="8" ry="5.5" fill="#fda4af" />
            <ellipse cx="140" cy="128" rx="8" ry="5.5" fill="#fda4af" />

            {/* Seams */}
            <path d="M 100,14 L 100,228" stroke="#000000" strokeWidth="1.2" opacity="0.3" />
            <path
              d="M 100,14 C 70,50 66,150 93,228"
              stroke="#000000"
              strokeWidth="1.2"
              opacity="0.3"
              fill="none"
            />
            <path
              d="M 100,14 C 130,50 134,150 107,228"
              stroke="#000000"
              strokeWidth="1.2"
              opacity="0.3"
              fill="none"
            />

            {/* Perimeter Outline */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.6"
            />

            {/* Suspension Ropes */}
            <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
              <line x1="86" y1="228" x2="88" y2="252" />
              <line x1="96" y1="228" x2="97" y2="252" />
              <line x1="104" y1="228" x2="103" y2="252" />
              <line x1="114" y1="228" x2="112" y2="252" />
            </g>

            {/* Wicker Basket */}
            <path
              d="M 76,252 L 73,284 C 73,292 127,292 127,284 L 124,252 Z"
              fill="#c28b4f"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <ellipse cx="100" cy="252" rx="24" ry="5" fill="#58310c" stroke="#0f172a" strokeWidth="2" />
            {/* Festive Bunting loops */}
            <path d="M 76,260 Q 88,270 100,260 Q 112,270 124,260" fill="none" stroke="#e11d48" strokeWidth="2" />
            <path d="M 74,266 Q 87,276 100,266 Q 113,276 126,266" fill="none" stroke="#ffd129" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* =========================================================
          BALLOON 2: Small Distant (Indian Flag / Tiranga Balloon - Mid Right)
          ========================================================= */}
      <div
        className="absolute right-[16%] sm:right-[18%] md:right-[20%] lg:right-[22%] w-14 sm:w-15 md:w-16 lg:w-18 pointer-events-none z-[2] select-none"
        style={{
          animation: 'balloonRiseFlight 24s linear infinite',
          animationDelay: '-8s',
          willChange: 'top',
        }}
      >
        <div
          className="w-full cursor-pointer pointer-events-auto group hover:scale-115 transition-transform duration-300"
          style={{ animation: 'balloonGentleSway2 6.2s ease-in-out infinite' }}
          title="CR Tiranga Balloon - Indian Flag"
        >
          <svg
            viewBox="0 0 200 300"
            fill="none"
            className="w-full h-auto drop-shadow-[0_8px_18px_rgba(255,153,51,0.32)] group-hover:drop-shadow-[0_14px_28px_rgba(255,153,51,0.5)] transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Deep Navy Base */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="#000080"
            />
            {/* Left Gore: Deep Saffron (Kesari) */}
            <path
              d="M 100,14 C 52,14 16,48 16,96 C 16,142 48,192 84,228 C 65,150 70,50 100,14 Z"
              fill="#FF9933"
            />
            {/* Center-Left Gore: Pure White */}
            <path
              d="M 100,14 C 70,50 65,150 84,228 L 100,228 L 100,14 Z"
              fill="#ffffff"
            />
            {/* Center-Right Gore: Pure White */}
            <path
              d="M 100,14 C 130,50 135,150 116,228 L 100,228 L 100,14 Z"
              fill="#ffffff"
            />
            {/* Right Gore: India Green */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 C 135,150 130,50 100,14 Z"
              fill="#138808"
            />

            {/* Perimeter Outline */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.6"
            />

            {/* ================= CENTER INDIAN FLAG (TIRANGA) ================= */}
            <g transform="translate(62, 84)">
              {/* Flag Drop Shadow */}
              <rect x="11" y="4" width="68" height="46" rx="3.5" fill="#000000" opacity="0.18" />

              {/* Crisp Flag Card Background with Border */}
              <rect
                x="10"
                y="3"
                width="68"
                height="46"
                rx="3"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="1.4"
              />

              {/* 1. Saffron (Top Stripe) */}
              <path d="M 11,4 L 77,4 L 77,19 L 11,19 Z" fill="#FF9933" />

              {/* 2. White (Middle Stripe) */}
              <path d="M 11,19 L 77,19 L 77,33 L 11,33 Z" fill="#FFFFFF" />

              {/* 3. Green (Bottom Stripe) */}
              <path d="M 11,33 L 77,33 L 77,48 L 11,48 Z" fill="#138808" />

              {/* 4. Ashoka Chakra (Navy Blue) */}
              <circle cx="44" cy="26" r="6" stroke="#000080" strokeWidth="1.2" fill="none" />
              <circle cx="44" cy="26" r="1.3" fill="#000080" />
              {/* Spokes */}
              <line x1="44" y1="20.5" x2="44" y2="31.5" stroke="#000080" strokeWidth="0.8" />
              <line x1="38.5" y1="26" x2="49.5" y2="26" stroke="#000080" strokeWidth="0.8" />
              <line x1="40" y1="22" x2="48" y2="30" stroke="#000080" strokeWidth="0.8" />
              <line x1="40" y1="30" x2="48" y2="22" stroke="#000080" strokeWidth="0.8" />

              {/* Flagpole */}
              <line x1="10" y1="0" x2="10" y2="54" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
              {/* Golden Finial Ball */}
              <circle cx="10" cy="0" r="2.8" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            </g>

            {/* Suspension Cords */}
            <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
              <line x1="88" y1="228" x2="90" y2="252" />
              <line x1="112" y1="228" x2="110" y2="252" />
            </g>

            {/* Honey Wicker Basket */}
            <path
              d="M 78,252 L 75,282 C 75,290 125,290 125,282 L 122,252 Z"
              fill="#b45309"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <ellipse cx="100" cy="252" rx="21" ry="4" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
            {/* Tricolor Bunting on basket */}
            <path d="M 78,260 Q 89,270 100,260 Q 111,270 122,260" fill="none" stroke="#FF9933" strokeWidth="1.8" />
            <path d="M 76,266 Q 88,276 100,266 Q 112,276 124,266" fill="none" stroke="#138808" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      {/* =========================================================
          BALLOON 3: Large Prominent (Royal Purple & Coral ZigZag - Left Side)
          ========================================================= */}
      <div
        className="absolute left-1 sm:left-2 md:left-3 lg:left-4 xl:left-5 w-18 sm:w-20 md:w-22 lg:w-24 pointer-events-none z-[3] select-none"
        style={{
          animation: 'balloonRiseFlight 24s linear infinite',
          animationDelay: '-16s',
          willChange: 'top',
        }}
      >
        <div
          className="w-full cursor-pointer pointer-events-auto group hover:scale-110 transition-transform duration-300"
          style={{ animation: 'balloonGentleSway3 5.6s ease-in-out infinite' }}
          title="CR Sky Cruiser - Royal Violet"
        >
          <svg
            viewBox="0 0 200 300"
            fill="none"
            className="w-full h-auto drop-shadow-[0_14px_28px_rgba(109,40,217,0.32)] group-hover:drop-shadow-[0_20px_40px_rgba(109,40,217,0.5)] transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Midnight Base */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="#1e1b4b"
            />
            {/* Royal Purple Crown */}
            <path
              d="M 100,14 C 132,14 158,28 172,50 C 152,56 128,60 100,60 C 72,60 48,56 28,50 C 42,28 68,14 100,14 Z"
              fill="#7c3aed"
            />
            {/* Bright Yellow Chevron Teeth */}
            <path
              d="M 28,50 C 48,56 72,60 100,60 C 128,60 152,56 172,50 L 178,72 L 152,86 L 126,72 L 100,86 L 74,72 L 48,86 L 22,72 L 28,50 Z"
              fill="#fde047"
            />
            {/* Neon Coral Pink Band */}
            <path
              d="M 22,72 L 48,86 L 74,72 L 100,86 L 126,72 L 152,86 L 178,72 C 182,82 184,94 184,106 C 182,126 176,144 168,156 L 144,144 L 120,156 L 96,144 L 72,156 L 48,144 L 32,156 C 24,144 18,126 16,106 C 16,94 18,82 22,72 Z"
              fill="#ec4899"
            />
            {/* Bright Cyan Chevron Belt */}
            <path
              d="M 32,156 L 48,144 L 72,156 L 96,144 L 120,156 L 144,144 L 168,156 C 158,178 144,198 128,214 L 100,202 L 72,214 C 56,198 42,178 32,156 Z"
              fill="#06b6d4"
            />

            {/* Cute Winking Face */}
            <path d="M 66,118 Q 78,106 90,118" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="126" cy="115" r="7.5" fill="#ffffff" />
            <circle cx="124" cy="113" r="3" fill="#1e1b4b" />
            <circle cx="128" cy="117" r="1.5" fill="#ffffff" />
            <ellipse cx="56" cy="126" rx="9" ry="6" fill="#fef08a" opacity="0.85" />
            <ellipse cx="144" cy="126" rx="9" ry="6" fill="#fef08a" opacity="0.85" />
            <path d="M 90,125 Q 102,140 114,125" fill="#be185d" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

            {/* Glossy Highlights */}
            <ellipse cx="148" cy="45" rx="8" ry="18" fill="#ffffff" opacity="0.32" transform="rotate(22, 148, 45)" />
            <ellipse cx="164" cy="100" rx="6" ry="24" fill="#ffffff" opacity="0.35" transform="rotate(25, 164, 100)" />

            {/* Perimeter */}
            <path
              d="M 100,14 C 148,14 184,48 184,96 C 184,142 152,192 116,228 L 84,228 C 48,192 16,142 16,96 C 16,48 52,14 100,14 Z"
              fill="none"
              stroke="#1e1b4b"
              strokeWidth="2.8"
            />

            {/* Cords */}
            <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
              <line x1="86" y1="228" x2="88" y2="252" />
              <line x1="96" y1="228" x2="97" y2="252" />
              <line x1="104" y1="228" x2="103" y2="252" />
              <line x1="114" y1="228" x2="112" y2="252" />
            </g>

            {/* Mahogany Wicker Basket with Hanging Sandbags */}
            <path
              d="M 74,252 L 71,286 C 71,294 129,294 129,286 L 126,252 Z"
              fill="#854d0e"
              stroke="#1e1b4b"
              strokeWidth="2"
            />
            <ellipse cx="100" cy="252" rx="26" ry="5" fill="#451a03" stroke="#1e1b4b" strokeWidth="2" />
            {/* Hanging Sandbags */}
            <circle cx="67" cy="270" r="5" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="133" cy="270" r="5" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HotAirBalloon;
