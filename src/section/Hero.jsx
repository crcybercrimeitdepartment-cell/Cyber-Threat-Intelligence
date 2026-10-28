import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SharedPagination from '../components/SharedPagination';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [outgoingSlide, setOutgoingSlide] = useState(null);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroSlides = [
    {
      image: '/hero/1.jpg',
      badge: 'Threat Intelligence',
      headingPrefix: 'INTELLIGENCE-DRIVEN',
      headingHighlight: 'CYBERSECURITY',
      tagline: 'Explore cyber threat intelligence, understand emerging digital risks, and gain valuable insights to navigate the online world with greater awareness and confidence.'
    },
    {
      image: '/hero/2.jpg',
      badge: 'Proactive Security',
      headingPrefix: 'UNDERSTAND THREATS.',
      headingHighlight: 'STRENGTHEN SECURITY.',
      tagline: 'Discover cybersecurity knowledge, recognize potential online threats, and learn practical approaches to improving digital safety in an increasingly connected world.'
    },
    {
      image: '/hero/3.jpg',
      badge: 'Safer Digital Future',
      headingPrefix: 'BUILDING A SAFER',
      headingHighlight: 'DIGITAL FUTURE',
      tagline: 'Bringing together cyber awareness, threat research, and digital safety to make cybersecurity information more accessible, understandable, and useful for everyone.'
    },
    {
      image: '/hero/4.jpg',
      badge: 'Cyber Knowledge',
      headingPrefix: 'KNOWLEDGE THAT STRENGTHENS',
      headingHighlight: 'DIGITAL SAFETY',
      tagline: 'Gain a clearer understanding of cyber threats, online scams, and digital vulnerabilities through informative resources designed to encourage safer and more informed online decisions.'
    },
    {
      image: '/hero/5.jpg',
      badge: 'Public Awareness',
      headingPrefix: 'ADVANCING CYBER AWARENESS',
      headingHighlight: 'THROUGH INTELLIGENCE',
      tagline: 'Explore the connection between threat intelligence, cybersecurity research, and public awareness to better understand digital challenges and support responsible online practices.'
    }
  ];

  const changeSlide = (nextIndex, dir = 1) => {
    if (isTransitioning || nextIndex === currentSlide) return;
    setOutgoingSlide(currentSlide);
    setCurrentSlide(nextIndex);
    setDirection(dir);
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    changeSlide(prev, -1);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    changeSlide(next, 1);
  };

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    changeSlide(index, index > currentSlide ? 1 : -1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentSlide + 1) % heroSlides.length;
      changeSlide(next, 1);
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  /**
   * Helper to render the slide content placed in the middle of the screen.
   * Directly attached to each slide canvas so it rotates and scales seamlessly with the image.
   */
  const renderSlideContent = (slideIndex, isInteractive = false) => {
    const slide = heroSlides[slideIndex];
    if (!slide) return null;

    return (
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col items-center justify-center text-center">
        {/* Cyber Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/50 bg-cyan-950/75 backdrop-blur-md text-cyan-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3 shadow-[0_0_16px_rgba(0,240,255,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>{slide.badge}</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          {slide.headingPrefix}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_24px_rgba(0,240,255,0.5)]">
            {slide.headingHighlight}
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          {slide.tagline}
        </p>
      </div>
    );
  };

  return (
    <section className="relative w-full min-h-[82vh] md:min-h-[88vh] flex items-center justify-center bg-[#050c18] overflow-hidden">
      
      {/* ================= HIGH-TECH CYBER VORTEX IRIS SLIDER ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 flex items-center justify-center">
        
        {/* Layer 1: Incoming Slide (Revealed underneath in the center of the screen) */}
        <div
          key={`incoming-${currentSlide}`}
          className="absolute inset-0 w-full h-full overflow-hidden z-10 flex items-center justify-center"
        >
          {/* Incoming Background Image - Rock solid GPU layer */}
          <img 
            src={heroSlides[currentSlide].image} 
            alt={`Hero slide ${currentSlide + 1}`} 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Light Cyber Overlay for clear image visibility with balanced text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/10 to-slate-950/30 pointer-events-none" />

          {/* Incoming Centered Content - Smooth fade & scale */}
          <motion.div
            key={`content-${currentSlide}`}
            className="relative z-10 w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.65,
              delay: outgoingSlide !== null ? 0.35 : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {renderSlideContent(currentSlide, !isTransitioning)}
          </motion.div>
        </div>

        {/* Layer 2: Outgoing Slide - True Circular Rotation and Shrinking into the middle */}
        {outgoingSlide !== null && (
          <motion.div
            key={`circular-vortex-${outgoingSlide}-${currentSlide}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden pointer-events-none select-none z-20 flex items-center justify-center"
            style={{
              width: '120vmax',
              height: '120vmax',
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            initial={{
              scale: 1,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              scale: [1, 0],
              rotate: [0, direction * 360],
              opacity: [1, 1, 0.9, 0]
            }}
            transition={{
              duration: 1.2,
              ease: [0.35, 0, 0.25, 1],
              opacity: {
                times: [0, 0.8, 0.95, 1],
                duration: 1.2
              }
            }}
            onAnimationComplete={() => {
              setOutgoingSlide(null);
              setIsTransitioning(false);
            }}
          >
            {/* Canvas inside circular portal: contains both outgoing image and outgoing centered content */}
            <div
              className="relative flex items-center justify-center shrink-0"
              style={{
                width: '125vmax',
                height: '125vmax'
              }}
            >
              <img
                src={heroSlides[outgoingSlide].image}
                alt="Outgoing slide"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />

              {/* Light Cyber Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/10 to-slate-950/30 pointer-events-none" />

              {/* Connected Centered Content: Rotates circle-wise and shrinks seamlessly with the image */}
              {renderSlideContent(outgoingSlide, false)}
            </div>

            {/* Radiant Circular Neon Cyan Ring Border */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '3.5px solid rgba(0, 240, 255, 0.95)',
                boxShadow: '0 0 35px rgba(0, 240, 255, 0.85), inset 0 0 20px rgba(0, 112, 243, 0.6)'
              }}
            />

            {/* Circular High-Tech Dashed HUD Ring */}
            <div className="absolute inset-[6px] rounded-full border border-dashed border-cyan-300/70 pointer-events-none" />

            {/* Circular Targeting Crosshairs */}
            <div className="absolute inset-0 rounded-full pointer-events-none flex items-center justify-center opacity-40">
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              <div className="h-full w-[1.5px] bg-gradient-to-b from-transparent via-cyan-300 to-transparent absolute" />
            </div>
          </motion.div>
        )}

        {/* Layer 3: Center Cyber Shockwave Pulse when the vortex collapses */}
        {isTransitioning && (
          <motion.div
            key={`burst-${currentSlide}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-25 rounded-full border border-cyan-400"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.6, 2.8],
              opacity: [0, 0.9, 0],
              boxShadow: [
                '0 0 0px rgba(0,240,255,0)',
                '0 0 25px rgba(0,240,255,0.8)',
                '0 0 40px rgba(0,240,255,0)'
              ]
            }}
            transition={{
              duration: 0.55,
              delay: 1.05,
              ease: 'easeOut'
            }}
            style={{ width: '80px', height: '80px', willChange: 'transform, opacity' }}
          />
        )}
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full z-30 pointer-events-auto">
        <SharedPagination 
          totalItems={heroSlides.length}
          currentIndex={currentSlide}
          onPageChange={goToSlide}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      </div>

    </section>
  );
};

export default Hero;

