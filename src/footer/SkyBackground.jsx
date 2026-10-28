import React from 'react';

/**
 * SkyBackground:
 * Renders a vibrant, serene blue sky gradient with a gentle sun glow
 * and small, fluffy cumulus clouds continuously drifting horizontally across.
 */
const cloudsData = [
  { id: 1, type: 'fluffy', width: 95, top: '4%', duration: 44, delay: 18, opacity: 0.92, floatDuration: 5.2 },
  { id: 2, type: 'breezy', width: 120, top: '14%', duration: 36, delay: 30, opacity: 0.88, floatDuration: 6.4 },
  { id: 3, type: 'small', width: 75, top: '24%', duration: 50, delay: 8, opacity: 0.85, floatDuration: 4.8 },
  { id: 4, type: 'fluffy', width: 105, top: '38%', duration: 40, delay: 24, opacity: 0.82, floatDuration: 5.8 },
  { id: 5, type: 'small', width: 70, top: '52%', duration: 56, delay: 42, opacity: 0.78, floatDuration: 4.2 },
  { id: 6, type: 'breezy', width: 110, top: '64%', duration: 34, delay: 12, opacity: 0.8, floatDuration: 6.0 },
  { id: 7, type: 'fluffy', width: 85, top: '76%', duration: 46, delay: 34, opacity: 0.75, floatDuration: 5.0 },
  { id: 8, type: 'small', width: 80, top: '8%', duration: 32, delay: 4, opacity: 0.9, floatDuration: 4.5 },
];

const SkyBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#f0f7fe]">
      {/* 1. Serene Daytime Sky Gradient with Solid Base */}
      <div 
        className="absolute inset-0 bg-[#60a5fa]"
        style={{
          background: 'linear-gradient(180deg, #5ba4fc 0%, #8bc5fc 20%, #b8defc 48%, #dfedfe 76%, #f0f7fe 100%)'
        }}
      />

      {/* 2. Soft Ambient Sun Glow at the Top */}
      <div 
        className="absolute -top-24 right-[18%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(254, 240, 138, 0.28) 32%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Secondary gentle sunbeam flare on top-left */}
      <div 
        className="absolute -top-32 left-[8%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(224, 242, 254, 0.2) 40%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      {/* 3. Embedded Animation Styles for Drift and Float */}
      <style>{`
        @keyframes cloudDriftX {
          0% {
            transform: translateX(-180px);
          }
          100% {
            transform: translateX(calc(100vw + 180px));
          }
        }
        @keyframes cloudGentleBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      {/* 4. Drifting Small Clouds */}
      {cloudsData.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: 0,
            width: `${cloud.width}px`,
            opacity: cloud.opacity,
            animation: `cloudDriftX ${cloud.duration}s linear infinite`,
            animationDelay: `-${cloud.delay}s`,
            willChange: 'transform',
          }}
        >
          <div
            style={{
              animation: `cloudGentleBob ${cloud.floatDuration}s ease-in-out infinite alternate`,
              filter: 'drop-shadow(0 6px 14px rgba(2, 132, 199, 0.18))',
            }}
          >
            {cloud.type === 'fluffy' && (
              <svg viewBox="0 0 140 70" fill="none" className="w-full h-auto">
                <ellipse cx="70" cy="48" rx="55" ry="16" fill="#ffffff" />
                <circle cx="42" cy="40" r="22" fill="#ffffff" />
                <circle cx="70" cy="30" r="26" fill="#ffffff" />
                <circle cx="98" cy="38" r="20" fill="#ffffff" />
                <circle cx="118" cy="46" r="14" fill="#ffffff" />
                <circle cx="24" cy="46" r="15" fill="#ffffff" />
                {/* 3D soft highlight */}
                <ellipse cx="68" cy="24" rx="14" ry="7" fill="#ffffff" opacity="0.9" />
              </svg>
            )}

            {cloud.type === 'breezy' && (
              <svg viewBox="0 0 170 75" fill="none" className="w-full h-auto">
                <ellipse cx="85" cy="52" rx="70" ry="18" fill="#ffffff" />
                <circle cx="32" cy="48" r="18" fill="#ffffff" />
                <circle cx="56" cy="36" r="24" fill="#ffffff" />
                <circle cx="90" cy="26" r="28" fill="#ffffff" />
                <circle cx="122" cy="36" r="22" fill="#ffffff" />
                <circle cx="145" cy="48" r="16" fill="#ffffff" />
                <ellipse cx="88" cy="22" rx="16" ry="8" fill="#ffffff" opacity="0.9" />
              </svg>
            )}

            {cloud.type === 'small' && (
              <svg viewBox="0 0 100 55" fill="none" className="w-full h-auto">
                <ellipse cx="50" cy="38" rx="40" ry="12" fill="#ffffff" />
                <circle cx="28" cy="32" r="15" fill="#ffffff" />
                <circle cx="50" cy="24" r="19" fill="#ffffff" />
                <circle cx="72" cy="32" r="14" fill="#ffffff" />
                <ellipse cx="48" cy="20" rx="10" ry="5" fill="#ffffff" opacity="0.9" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkyBackground;
