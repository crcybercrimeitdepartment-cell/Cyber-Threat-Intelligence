import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import * as Icons from 'lucide-react';
import { incidentReportData } from '../../data/incidentReport/incidentReportData.js';
import NavPageHeader from '../../components/NavPageHeader';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 120, damping: 14 } 
  }
};

const CyberCrimeCard = ({ crime, itemVariants }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2.5;
    const newRipple = { x, y, size, id: Date.now() };
    
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  const Icon = Icons[crime.icon];
  const isBlue = crime.id % 2 !== 0;
  
  const theme = isBlue ? {
    topDark: 'bg-gradient-to-r from-[#1E45B8] to-[#18399B]',
    topLight: 'bg-gradient-to-r from-[#3B72E5] to-[#2F5BD4]',
    badgeStart: '#407BFA',
    badgeEnd: '#153CBD',
    foldColor: 'bg-[#10297A]',
    dashMain: 'bg-[#2563EB]',
    dashEnd: 'bg-[#93C5FD]',
    arrowBtn: 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8]',
    arrowShadow: 'shadow-[0_2px_6px_rgba(29,78,216,0.4)]',
    iconColor: 'text-[#1D4ED8]',
  } : {
    topDark: 'bg-gradient-to-r from-[#5B21B6] to-[#4C1D95]',
    topLight: 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9]',
    badgeStart: '#8B5CF6',
    badgeEnd: '#5B21B6',
    foldColor: 'bg-[#3A1175]',
    dashMain: 'bg-[#7C3AED]',
    dashEnd: 'bg-[#C4B5FD]',
    arrowBtn: 'bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]',
    arrowShadow: 'shadow-[0_2px_6px_rgba(109,40,217,0.4)]',
    iconColor: 'text-[#6D28D9]',
  };

  return (
    <motion.div variants={itemVariants}>
      <Tilt 
        tiltMaxAngleX={8} 
        tiltMaxAngleY={8} 
        perspective={1000} 
        scale={1.02} 
        transitionSpeed={2000}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="24px"
        className="h-full"
      >
        <motion.div 
          whileHover="hover"
          onClick={addRipple}
          className="relative bg-gradient-to-b from-[#FFFFFF] to-[#F2F6FA] rounded-[24px] shadow-[0_12px_24px_rgba(0,0,0,0.07)] h-[176px] cursor-pointer border border-white group overflow-hidden"
        >
          {/* Ripple Container */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] pointer-events-none">
            {ripples.map((r) => (
              <motion.div
                key={r.id}
                initial={{ scale: 0.1, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  position: 'absolute',
                  left: r.x - r.size / 2,
                  top: r.y - r.size / 2,
                  width: r.size,
                  height: r.size,
                  backgroundColor: theme.badgeStart,
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>

          {/* Two-tone Top Bar */}
          <div className={`h-[28px] w-full ${theme.topDark} rounded-t-[23px] relative z-10`}></div>
          <div className={`h-[8px] w-full ${theme.topLight} relative z-10`}></div>
          
          {/* The Ribbon Fold Triangle */}
          <div className={`absolute top-[-8px] left-[46px] w-[10px] h-[8px] ${theme.foldColor} [clip-path:polygon(0_0,0_100%,100%_100%)] z-0`}></div>

          {/* The SVG Badge */}
          <div className="absolute top-[-8px] left-0 w-[48px] h-[62px] z-20 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.2)]">
            <svg width="48" height="62" viewBox="0 0 48 62" fill="none" className="w-full h-full">
              <path d="
                M 0 8 
                Q 0 0 8 0 
                L 40 0 
                Q 48 0 48 8 
                L 48 42 
                Q 48 46 45 48 
                L 27 57 
                Q 24 59 21 57 
                L 3 48 
                Q 0 46 0 42 
                Z" 
                fill={`url(#badgeGrad-${crime.id})`} 
                stroke={`url(#badgeStroke-${crime.id})`} 
                strokeWidth="1.5" 
              />
              <defs>
                <linearGradient id={`badgeGrad-${crime.id}`} x1="0" y1="0" x2="0" y2="62" gradientUnits="userSpaceOnUse">
                  <stop stopColor={theme.badgeStart} />
                  <stop offset="1" stopColor={theme.badgeEnd} />
                </linearGradient>
                <linearGradient id={`badgeStroke-${crime.id}`} x1="0" y1="0" x2="0" y2="62" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* The Text */}
            <div className="absolute top-0 left-0 w-full h-[46px] flex items-center justify-center">
              <span className="text-white font-[900] text-[20px] tracking-tight drop-shadow-md">
                {crime.id.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-3 sm:px-5 py-4 flex gap-2 sm:gap-4 h-[131px] relative z-10">
            
            {/* Icon Section */}
            <div className="relative mt-1 flex-shrink-0">
              <div className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full bg-[#F4F7FB] shadow-[-4px_-4px_10px_#ffffff,6px_6px_14px_rgba(0,0,0,0.07)] border-[1.5px] border-white flex items-center justify-center p-[4px] sm:p-[5px]">
                <motion.div 
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-full h-full rounded-full bg-[#E5EAF3] shadow-[inset_3px_4px_8px_rgba(0,0,0,0.14),inset_-3px_-4px_8px_rgba(255,255,255,0.9)] flex items-center justify-center relative overflow-hidden"
                >
                  {Icon && <Icon className={`w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] ${theme.iconColor} drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]`} strokeWidth={1.5} />}
                </motion.div>
              </div>
            </div>
            
            {/* Text Section */}
            <div className="flex flex-col justify-start flex-grow pt-1 sm:pt-2.5 pr-6 sm:pr-10 whitespace-pre-wrap">
              <h3 className="text-[13px] sm:text-[17px] font-[800] leading-[1.2] sm:leading-[1.25] text-[#111827] tracking-[-0.01em]">
                {crime.title}
              </h3>
              <div className="flex gap-[4px] sm:gap-[5px] mt-3 sm:mt-3.5">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    variants={{ hover: { width: "18px" } }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ 
                      opacity: { duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" },
                      width: { duration: 0.3 }
                    }}
                    className={`w-[10px] sm:w-[16px] h-[4px] sm:h-[4.5px] rounded-full ${theme.dashMain}`}
                  />
                ))}
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                  className={`w-[6px] sm:w-[10px] h-[4px] sm:h-[4.5px] rounded-full ${theme.dashEnd}`}
                />
              </div>
            </div>
          </div>

          {/* Arrow Button */}
          <div className="absolute bottom-[12px] sm:bottom-[16px] right-[12px] sm:right-[16px] z-10" data-allow-interaction="true">
            <div className="w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-[10px] sm:rounded-[12px] bg-[#EEF2F7] shadow-[inset_2px_3px_6px_rgba(0,0,0,0.12),inset_-2px_-3px_6px_rgba(255,255,255,1)] flex items-center justify-center border border-white/60">
              <motion.div 
                variants={{ hover: { x: 3 } }}
                whileTap={{ scale: 0.9, boxShadow: "inset 0px 3px 6px rgba(0,0,0,0.3)" }}
                className={`w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] ${theme.arrowBtn} rounded-[6px] sm:rounded-[8px] ${theme.arrowShadow} flex items-center justify-center`}
              >
                <Icons.ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-white" strokeWidth={3} />
              </motion.div>
            </div>
          </div>

          {/* 3D Stepped Chin (SVG) */}
          <div className="absolute bottom-0 left-0 w-full h-[18px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 18">
              <path d="M0,1 L38,1 C41,1 42,12 45,12 L100,12 L100,18 L0,18 Z" fill="#D4DCE8" />
              <path d="M0,1 L38,1 C41,1 42,12 45,12 L100,12" fill="none" stroke="#FFFFFF" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

        </motion.div>
      </Tilt>
    </motion.div>
  );
};

const IncidentReportPage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden bg-transparent">
      <style dangerouslySetInnerHTML={{__html: "html { scroll-behavior: smooth; }" }} />
      {/* Main Page Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 text-[#1a1a24] font-sans">
        
        {/* Animated Header inside the transparent box */}
        <NavPageHeader
          title="Cyber Crime Incident Report"
          description="Get guidance for understanding, documenting, preparing, and reporting cybercrime incidents while preserving relevant information and identifying appropriate official reporting channels and support resources."
        />

        {/* Animated Grid placed in transparent wrapper */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-7 gap-y-8 sm:gap-y-10"
        >
          {incidentReportData.map((crime) => (
            <CyberCrimeCard key={crime.id} crime={crime} itemVariants={itemVariants} />
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default IncidentReportPage;
