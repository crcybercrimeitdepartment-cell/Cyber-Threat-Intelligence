import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { directoryData, themes } from '../../data/cyberLegal/cyberLegalData';
import NavPageHeader from '../../components/NavPageHeader';

const CyberDirectoryCard = ({ item, index }) => {
    const Icon = item.icon;
    const theme = themes[index % themes.length];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                    opacity: 1, y: 0,
                    transition: {
                        type: 'tween', ease: 'easeOut', duration: 0.5
                    }
                }
            }}
            whileHover={{ y: -5, scale: 1.02, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } }}
            className="relative w-full min-h-[160px] sm:min-h-[190px] lg:min-h-[210px] cursor-pointer group transform-gpu will-change-transform"
        >
            {/* Right Panel (Dark, Tinted) */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: 40 },
                    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                }}
                className="absolute right-0 top-0 bottom-2 sm:bottom-3 left-[55px] sm:left-[80px] lg:left-[70px] rounded-[24px] sm:rounded-[32px] overflow-hidden transition-all duration-500 group-hover:brightness-[1.15] transform-gpu"
                style={{
                    background: theme.baseGrad,
                    boxShadow: `0 15px 35px -5px rgba(0,0,0,0.15), inset -3px -3px 20px ${theme.shadow}, inset 1px 1px 2px rgba(255,255,255,0.05)`,
                    border: `1px solid ${theme.shadow}`
                }}
            >
                <div className="pl-[60px] sm:pl-[75px] lg:pl-[75px] pr-2 sm:pr-4 py-4 sm:py-6 lg:py-6 h-full flex flex-col">
                    <div className="flex-grow flex flex-col items-center justify-center text-center -mt-4">
                        <h3 className="text-white text-[14px] sm:text-[18px] lg:text-[16px] font-bold leading-[1.3] mb-2 sm:mb-3 tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                            {item.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                        </h3>
                        <div className="w-8 sm:w-12 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500 ease-out h-[2px] sm:h-[3px] rounded-full" style={{ background: theme.underlayGrad }} />
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                        {/* Pagination dots (Pure CSS Animation for performance) */}
                        <div className="flex gap-1 sm:gap-1.5 pb-1 sm:pb-2">
                            {[0, 1, 2, 3, 4].map((dotIndex) => (
                                <div
                                    key={dotIndex}
                                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full dot-loading-anim"
                                    style={{ 
                                        '--accent': theme.accent,
                                        animationDelay: `${dotIndex * 0.3}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Action Button */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            style={{
                                background: theme.underlayGrad,
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: `0 4px 15px ${theme.shadow}`
                            }}
                        >
                            <ArrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Left Panel Area (Container) */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -40, scale: 0.9 },
                    show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                }}
                className="absolute left-0 bottom-0 sm:bottom-1 top-0 w-[100px] sm:w-[130px] lg:w-[130px] z-10 transform-gpu"
            >

                {/* Thin Underlay (Continuous thin line) */}
                <div
                    className="absolute left-[2px] sm:left-[4px] bottom-[2px] sm:bottom-[4px] top-[2px] sm:top-[4px] right-[2px] sm:right-[4px] rounded-tl-[16px] sm:rounded-tl-[24px] rounded-tr-[100px] sm:rounded-tr-[140px] lg:rounded-tr-[160px] rounded-br-[24px] sm:rounded-br-[40px] rounded-bl-[100px] sm:rounded-bl-[130px] lg:rounded-bl-[140px]"
                    style={{
                        background: theme.underlayGrad,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                />

                {/* Thick Step Piece (The 3D Cut on the curve) */}
                <div
                    className="absolute left-[0px] bottom-[20px] sm:bottom-[30px] w-[30px] sm:w-[40px] h-[90px] sm:h-[130px] rounded-bl-[10px] sm:rounded-bl-[14px] rounded-tl-[80px] sm:rounded-tl-[100px]"
                    style={{
                        background: theme.underlayGrad,
                        boxShadow: '-4px 4px 15px rgba(0,0,0,0.2)',
                        borderBottom: '2px solid rgba(255,255,255,0.4)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)'
                    }}
                />

                {/* White Panel (Top) */}
                <div
                    className="absolute left-[4px] sm:left-[8px] bottom-[4px] sm:bottom-[8px] top-0 right-0 overflow-hidden rounded-tl-[16px] sm:rounded-tl-[24px] rounded-tr-[100px] sm:rounded-tr-[140px] lg:rounded-tr-[160px] rounded-br-[24px] sm:rounded-br-[40px] rounded-bl-[100px] sm:rounded-bl-[130px] lg:rounded-bl-[140px]"
                    style={{
                        background: 'linear-gradient(145deg, #FFFFFF 0%, #F0F4F8 100%)',
                        boxShadow: 'inset 4px 4px 12px rgba(255,255,255,1), inset -4px -4px 15px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(255,255,255,0.8)'
                    }}
                >
                    <div className="p-3 sm:p-5 h-full flex flex-col relative z-10">
                        {/* ID Number */}
                        <div className="text-[22px] sm:text-[28px] lg:text-[34px] font-black tracking-tighter leading-none mb-1 sm:mb-2 drop-shadow-sm" style={{ color: theme.accent }}>
                            {item.id}
                        </div>

                        {/* Icon Container */}
                        <div className="flex-grow flex items-center justify-center mb-4 sm:mb-6 pl-0 sm:pl-1">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0, rotate: -45 },
                                    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 12 } }
                                }}
                            >
                                <motion.div
                                    className="relative transition-all duration-300 group-hover:-translate-y-2"
                                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
                                >
                                    {/* Simulated 3D shadow for icon */}
                                    <div
                                        className="absolute inset-2 bg-slate-400/20 blur-md rounded-full transition-all duration-300 group-hover:scale-90 group-hover:opacity-30"
                                        style={{ transform: 'translateY(12px)' }}
                                    />
                                    <Icon
                                        className="relative w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                                        style={{ color: '#1E293B' }}
                                        strokeWidth={1.5}
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Bottom Dots Pattern (Exact match: 4 dots row 1, 7 dots row 2) */}
                        <div className="absolute bottom-[10px] sm:bottom-[16px] lg:bottom-[24px] left-[10px] sm:left-[16px] lg:left-[24px] flex flex-col gap-[6px] sm:gap-[10px] opacity-[0.5] group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex gap-[6px] sm:gap-[10px]">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={`r1-${i}`} className="w-[3px] sm:w-[4px] h-[3px] sm:h-[4px] rounded-full" style={{ background: theme.accent, boxShadow: `0 0 3px ${theme.accent}` }} />
                                ))}
                            </div>
                            <div className="flex gap-[6px] sm:gap-[10px]">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div key={`r2-${i}`} className="w-[3px] sm:w-[4px] h-[3px] sm:h-[4px] rounded-full" style={{ background: theme.accent, boxShadow: `0 0 3px ${theme.accent}` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const CyberLegalPage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dotPulseTheme {
          0%, 100% {
            background-color: #334155;
            box-shadow: 0 0 0px transparent;
            opacity: 0.5;
          }
          50% {
            background-color: var(--accent);
            box-shadow: 0 0 8px var(--accent);
            opacity: 1;
          }
        }
        .dot-loading-anim {
          animation: dotPulseTheme 2s infinite ease-in-out;
        }
        `
      }} />
      {/* Main Page Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Outside the Page Box */}
        <NavPageHeader
          title="Cyber & Legal Directory"
          description="Find verified information about cybercrime police, law-enforcement agencies, courts, legal institutions, regulatory authorities, legal-support organizations, and relevant cyber and legal services."
        />

        {/* The "Page" Box containing content */}
        <div className="bg-transparent relative min-h-[300px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-3 sm:gap-x-6 lg:gap-x-8 pb-10 mt-8"
          >
            {directoryData.map((item, index) => (
              <CyberDirectoryCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default CyberLegalPage;
