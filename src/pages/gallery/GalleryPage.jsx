import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { galleryHeaderData, galleryCards } from '../../data/gallery/galleryData.js';
import NavPageHeader from '../../components/NavPageHeader';

// CardItem Component (Embedded)
function CardItem({ card, isActive, onClick }) {
  const [liked, setLiked] = useState(card.isLiked || false);
  const [imgError, setImgError] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full rounded-[30px] overflow-hidden cursor-pointer select-none bg-[#1C2534] border transition-all duration-500 ease-out flex flex-col justify-between shadow-2xl group ${
        isActive
          ? 'ring-2 ring-rose-500/80 border-rose-500/40 shadow-[0_20px_50px_rgba(244,63,94,0.25)] scale-[1.03]'
          : 'border-slate-700/60 opacity-95 hover:brightness-105'
      }`}
    >
      {/* Top Full-Bleed Cover Image Container */}
      <div className="relative w-full h-[58%] overflow-hidden bg-[#1C2534]">
        {!imgError ? (
          <img
            src={card.image}
            alt={card.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 block"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${card.fallbackBg} flex items-center justify-center p-4 text-center`}>
            <span className="text-white font-display font-bold text-xl drop-shadow-md">
              {card.title}
            </span>
          </div>
        )}

        {/* Gradient Overlay on Image for seamless bottom blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2534] via-transparent to-black/20 pointer-events-none" />

        {/* Top-Left Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-mono tracking-wider border border-white/20 flex items-center space-x-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>{card.category}</span>
        </div>

        {/* Heart / Favorite Button (Top Right) */}
        <button
          onClick={toggleLike}
          className={`absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            liked
              ? 'bg-rose-600/90 border-rose-400 text-white shadow-lg scale-110'
              : 'bg-white/20 hover:bg-white/35 border-white/30 text-white'
          }`}
          title="Like artwork"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Bottom Content Area for Art Gallery Metadata */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between flex-1 -mt-2 bg-[#1C2534]">
        <div>
          {/* Title & Likes Counter Row */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-[19px] font-bold text-white font-display tracking-tight truncate max-w-[190px]" title={card.title}>
              {card.title}
            </h3>
            <span className="flex items-center space-x-1 bg-slate-700/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10 shrink-0 ml-2">
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline mr-1" />
              <span>{card.likes}</span>
            </span>
          </div>

          {/* Artist Subtitle */}
          <p className="text-rose-400 text-xs font-semibold font-mono tracking-wide mt-0.5">
            By {card.artist}
          </p>

          {/* Description */}
          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mt-2 font-sans opacity-90">
            {card.description}
          </p>

          {/* Tags Row */}
          <div className="flex items-center space-x-2 mt-3 flex-wrap gap-y-1.5">
            <div className="bg-slate-700/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-200 border border-white/10 whitespace-nowrap">
              {card.tag1}
            </div>
            <div className="bg-slate-700/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-200 border border-white/10 whitespace-nowrap">
              {card.tag2}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width "View Artwork" Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Viewing artwork: ${card.title} by ${card.artist}`);
          }}
          className="w-full py-3 mt-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-full transition-all duration-300 shadow-md text-sm text-center tracking-tight active:scale-95"
        >
          View Artwork
        </button>
      </div>
    </div>
  );
}

// CardStack3D Component (Embedded)
function CardStack3D({
  cards,
  activeIndex,
  setActiveIndex,
  perspectiveAngle = 18,
  cardGap = 72,
  depthScale = 0.045,
  deckLayout = 'dual'
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const numCards = cards.length;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diffX = currentX - startX;
    setDragOffset(diffX);

    if (Math.abs(diffX) > 75) {
      if (diffX < 0) {
        setActiveIndex((prev) => (prev + 1) % numCards);
        setIsDragging(false);
        setDragOffset(0);
      } else if (diffX > 0) {
        setActiveIndex((prev) => (prev - 1 + numCards) % numCards);
        setIsDragging(false);
        setDragOffset(0);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full h-[520px] sm:h-[620px] md:h-[680px] flex items-center justify-center perspective-container select-none cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[440px] sm:h-[500px] md:h-[560px] card-3d-preserve">
        {cards.map((card, index) => {
          let diff = index - activeIndex;
          if (diff > numCards / 2) diff -= numCards;
          if (diff < -numCards / 2) diff += numCards;

          const isActive = diff === 0;

          const dragShift = isDragging ? dragOffset * 0.25 : 0;
          const translateX = diff * cardGap + dragShift;
          const translateZ = -Math.abs(diff) * 65;
          const scale = isActive ? 1.05 : Math.max(0.72, 1 - Math.abs(diff) * depthScale);

          let rotateY = 0;
          if (deckLayout === 'dual') {
            if (diff < 0) {
              rotateY = Math.min(32, Math.max(14, perspectiveAngle + Math.abs(diff) * 1.5));
            } else if (diff > 0) {
              rotateY = -Math.min(32, Math.max(14, perspectiveAngle + Math.abs(diff) * 1.5));
            } else {
              rotateY = 0;
            }
          } else {
            rotateY = perspectiveAngle + (diff < 0 ? 8 : diff > 0 ? -4 : 0);
          }

          const opacity = Math.max(0.35, 1 - Math.abs(diff) * 0.11);
          const zIndex = 100 - Math.abs(diff) * 10;
          const filter = isActive
            ? 'none'
            : `brightness(${Math.max(0.65, 1 - Math.abs(diff) * 0.08)}) contrast(${1 + Math.abs(diff) * 0.02})`;

          return (
            <div
              key={card.id}
              className="absolute inset-0 card-3d-preserve"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                filter: filter,
              }}
            >
              <CardItem
                card={card}
                isActive={isActive}
                onClick={() => {
                  setActiveIndex(index);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main Gallery Page Component
export default function GalleryPage() {
  const [cards] = useState(galleryCards);
  const [activeIndex, setActiveIndex] = useState(5); // Start on Card 6 ("Quantum Synthesis")
  const [themeMode] = useState('light');
  const [autoPlay] = useState(true);

  const isLight = themeMode === 'light';
  const numCards = cards.length;

  // Smooth Auto-Play Movement Timer
  useEffect(() => {
    let interval = null;
    if (autoPlay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % numCards);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, numCards]);

  // Keyboard Shortcuts (Left/Right Arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + numCards) % numCards);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % numCards);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numCards]);

  return (
    <div
      className={`relative min-h-[calc(100vh-100px)] pt-4 pb-20 ${
        isLight ? 'theme-light' : 'theme-dark'
      } flex flex-col justify-between overflow-x-hidden transition-colors duration-500`}
    >
      {/* Background Halftone & Soft Ambient Glow Overlay */}
      <div
        className={`fixed inset-0 ${
          isLight ? 'bg-halftone-pattern-light opacity-10' : 'bg-halftone-pattern-dark opacity-10'
        } pointer-events-none z-0`}
      />
      {/* Center Rose Glow directly behind the main active card */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] ${
          isLight ? 'bg-rose-400/20' : 'bg-rose-600/15'
        } rounded-full blur-[160px] pointer-events-none z-0`}
      />



      {/* Main Gallery Stage */}
      <main className="relative z-10 flex-1 pt-8 pb-6 sm:pb-10 flex flex-col items-center justify-start">
        {/* Original Static Header (Kept intact to match style) */}
        <NavPageHeader
          title="Gallery"
          description={galleryHeaderData.subDescription}
        />

        {/* 3D Perspective Gallery Deck Stage */}
        <div className="w-full flex flex-col items-center">
          <CardStack3D
            cards={cards}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            perspectiveAngle={18}
            cardGap={72}
            deckLayout="dual"
          />

          {/* Pagination Bullet Indicators */}
          <div className="flex items-center space-x-2 mt-4">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveIndex(i);
                }}
                className={`transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-7 h-2 bg-rose-500 rounded-full shadow-sm'
                    : isLight
                    ? 'w-2 h-2 bg-slate-300/80 hover:bg-slate-400 rounded-full'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full'
                }`}
                title={`Jump to artwork ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
