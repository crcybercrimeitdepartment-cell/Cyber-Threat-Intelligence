import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cyberAssistanceData } from '../../data/cyberAssistance/cyberAssistanceData.js';
import NavPageHeader from '../../components/NavPageHeader';

const themes = [
    { gradient: 'from-[#558B2F] to-[#2E7D32]', text: 'text-[#2E7D32]' }, // Green (Matches the image)
    { gradient: 'from-[#1976D2] to-[#0D47A1]', text: 'text-[#1565C0]' }, // Blue
    { gradient: 'from-[#8E24AA] to-[#4A148C]', text: 'text-[#6A1B9A]' }, // Purple
    { gradient: 'from-[#F57C00] to-[#E65100]', text: 'text-[#E65100]' }, // Orange
    { gradient: 'from-[#D81B60] to-[#880E4F]', text: 'text-[#AD1457]' }, // Pink
    { gradient: 'from-[#0097A7] to-[#006064]', text: 'text-[#00838F]' }, // Cyan
    { gradient: 'from-[#D32F2F] to-[#B71C1C]', text: 'text-[#C62828]' }, // Red
];

const OrganicCard20 = ({ item, index }) => {
    const theme = themes[index % themes.length];
    
    // 3D Tilt Setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const IconComponent = Icons[item.icon];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                show: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                        type: "spring", stiffness: 100, damping: 15,
                        staggerChildren: 0.15,
                        delayChildren: 0.1
                    } 
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="group relative w-full pt-6 pl-4 sm:pl-6 cursor-pointer"
        >
            {/* 3D Colored Base / Lip */}
            <div className={`absolute top-4 left-2 sm:left-4 w-[calc(100%-8px)] sm:w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[40px_90px_50px_60px] bg-gradient-to-br ${theme.gradient} shadow-[0_12px_30px_rgba(0,0,0,0.15)] z-0 transition-transform duration-400 group-hover:-translate-y-1 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]`} />
            
            {/* White Card Body */}
            <div className="relative w-full min-h-[144px] bg-gradient-to-br from-[#ffffff] to-[#f4f7fb] rounded-[40px_90px_50px_60px] z-10 translate-x-[4px] -translate-y-[4px] border-t-2 border-r-2 border-white/80 shadow-[inset_-4px_-4px_15px_rgba(255,255,255,0.9)] flex items-center">
                
                {/* Top-Left Leaf Badge */}
                <motion.div 
                    variants={{
                        hidden: { opacity: 0, scale: 0.5, y: 10 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.6 } }
                    }}
                    className="absolute -top-4 -left-3 z-30 drop-shadow-lg group-hover:-translate-y-1 transition-transform duration-300"
                >
                    {/* Dark fold shadow */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-black/40 rounded-full blur-[4px]" />
                    
                    {/* Leaf Shape */}
                    <div className={`w-[85px] h-[50px] bg-gradient-to-br ${theme.gradient} rounded-tl-[40px] rounded-tr-[5px] rounded-br-[40px] rounded-bl-[10px] flex items-center justify-start pl-6 border-t border-l border-white/40 shadow-inner overflow-hidden relative`}>
                        {/* Curved Highlight */}
                        <div className="absolute top-0 left-0 w-full h-[55%] bg-white/20 rounded-b-[40px]" />
                        <span className="text-white font-bold text-2xl tracking-wide z-10 drop-shadow-md">
                            {String(item.id)}
                        </span>
                    </div>
                </motion.div>

                {/* Left Neumorphic Circle */}
                <motion.div 
                    variants={{
                        hidden: { opacity: 0, scale: 0 },
                        show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.6 } }
                    }}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] bg-[#f8f9fa] rounded-full shadow-[inset_6px_6px_10px_rgba(0,0,0,0.05),_inset_-6px_-6px_10px_rgba(255,255,255,1),_4px_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center z-20 border border-white/60 group-hover:scale-105 transition-transform duration-300"
                >
                    <div className="w-[70px] h-[70px] sm:w-[75px] sm:h-[75px] rounded-full shadow-[inset_3px_3px_6px_rgba(0,0,0,0.06),_inset_-3px_-3px_6px_rgba(255,255,255,0.9)] flex items-center justify-center bg-white/60 border border-white">
                        {IconComponent && <IconComponent className={`w-8 h-8 sm:w-9 h-9 ${theme.text}`} strokeWidth={1.5} />}
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div 
                    variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                    }}
                    className="ml-[100px] sm:ml-[110px] pr-10 sm:pr-14 py-6 flex flex-col justify-center min-h-[144px]"
                >
                    <h3 className="text-[17px] sm:text-[19px] font-extrabold text-[#1a1e4c] leading-[1.2] mb-3">
                        {item.title}
                    </h3>
                    {/* Tiny Divider */}
                    <div className={`w-7 h-[2px] bg-gradient-to-r ${theme.gradient} mb-3 rounded-full opacity-80`} />
                    
                    <p className="text-[12px] sm:text-[13px] text-[#4a4e70] font-medium leading-relaxed line-clamp-2">
                        {item.desc}
                    </p>
                </motion.div>

                {/* Bottom-Right Arrow Button */}
                <motion.div 
                    variants={{
                        hidden: { opacity: 0, scale: 0, rotate: -45 },
                        show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.7 } }
                    }}
                    className={`absolute bottom-4 sm:bottom-5 right-4 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-white/30 group-hover:scale-110 transition-all duration-300 z-20 cursor-pointer`}
                >
                    <Icons.ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                </motion.div>

            </div>
        </motion.div>
    );
};

const CyberAssistancePage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden bg-transparent">
      {/* Background Blobs inside the transparent page space */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-200/30 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-200/30 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      
      {/* Main Page Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 text-[#1a1a24] font-sans">
        
        {/* Animated Header */}
        <NavPageHeader
          title="Cyber Assistance Directory"
          description="Find verified cybersecurity organizations, technical support providers, victim assistance services, counselling resources, financial support channels, and other trusted services for cyber-related concerns."
        />

        {/* Animated Grid placed in transparent wrapper */}
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.05
                    }
                }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8 bg-transparent relative min-h-[300px]"
        >
            {cyberAssistanceData.map((item, index) => (
                <OrganicCard20 key={item.id} item={item} index={index} />
            ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default CyberAssistancePage;
