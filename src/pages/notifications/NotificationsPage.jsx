import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { notificationData } from '../../data/notification/notificationData.js';

const FlashMessage = ({ type, title, message }) => {
    // 9 distinct styles for 9 different cards
    const styleMap = {
        type1: { bg: '#de4365', dark: '#912037', Icon: Icons.ShieldAlert },
        type2: { bg: '#529981', dark: '#196350', Icon: Icons.CheckCircle },
        type3: { bg: '#ef8b22', dark: '#a65313', textIcon: '!' },
        type4: { bg: '#0c72e9', dark: '#06439b', Icon: Icons.Video },
        type5: { bg: '#8b5cf6', dark: '#5b21b6', Icon: Icons.RefreshCw },
        type6: { bg: '#0f766e', dark: '#042f2e', Icon: Icons.Key },
        type7: { bg: '#ec4899', dark: '#831843', Icon: Icons.Handshake },
        type8: { bg: '#4f46e5', dark: '#312e81', Icon: Icons.WifiOff },
        type9: { bg: '#eab308', dark: '#713f12', Icon: Icons.Settings },
    };

    const style = styleMap[type] || styleMap.type4; // default to blue if unknown

    const cardHoverVariants = {
        rest: { y: 0, scale: 1, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        hover: { 
            y: -8, 
            scale: 1.02, 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: { type: 'spring', stiffness: 300, damping: 20 }
        }
    };

    const bubbleVariants = {
        rest: { rotate: 0, scale: 1 },
        hover: { 
            rotate: [0, -12, 12, -8, 8, 0], 
            scale: 1.05,
            transition: { duration: 0.6, ease: "easeInOut" } 
        }
    };

    const blobVariants = {
        rest: { scale: 1, opacity: 1 },
        hover: { 
            scale: 1.15, 
            opacity: 0.85,
            transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } 
        }
    };

    // Function to generate slightly varied blobs based on type name to make them all unique
    const renderBlobs = (typeKey, darkColor) => {
        const hash = parseInt(typeKey.replace('type', '')) || 1;
        
        if (hash % 3 === 1) {
            return (
                <motion.div variants={blobVariants} className="absolute inset-0 origin-bottom-left">
                    <div className="absolute -bottom-10 -left-6 w-32 h-32" style={{ backgroundColor: darkColor, borderRadius: '43% 57% 70% 30% / 39% 50% 50% 61%' }} />
                    <div className="absolute bottom-6 left-20 w-6 h-6 rounded-full" style={{ backgroundColor: darkColor }} />
                    <div className="absolute bottom-3 left-28 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: darkColor }} />
                    <div className="absolute top-[40%] -left-1 w-4 h-4 rounded-full" style={{ backgroundColor: darkColor }} />
                </motion.div>
            );
        } else if (hash % 3 === 2) {
            return (
                <motion.div variants={blobVariants} className="absolute inset-0 origin-top-right">
                    <div className="absolute -top-6 -right-6 w-28 h-28 opacity-80" style={{ backgroundColor: darkColor, borderRadius: '50% 50% 20% 80% / 60% 40% 60% 40%' }} />
                    <div className="absolute top-12 right-24 w-4 h-4 rounded-full opacity-80" style={{ backgroundColor: darkColor }} />
                    <div className="absolute bottom-2 left-6 w-12 h-12 rounded-full opacity-80" style={{ backgroundColor: darkColor }} />
                    <div className="absolute bottom-10 left-2 w-3 h-3 rounded-full opacity-80" style={{ backgroundColor: darkColor }} />
                </motion.div>
            );
        } else {
            return (
                <motion.div variants={blobVariants} className="absolute inset-0 origin-right">
                    <div className="absolute -bottom-16 right-4 w-40 h-40 opacity-70" style={{ backgroundColor: darkColor, borderRadius: '60% 40% 70% 30% / 40% 50% 50% 60%' }} />
                    <div className="absolute top-1/2 right-12 w-5 h-5 rounded-full opacity-70" style={{ backgroundColor: darkColor }} />
                    <div className="absolute top-8 left-4 w-8 h-8 rounded-full opacity-70" style={{ backgroundColor: darkColor }} />
                </motion.div>
            );
        }
    };

    return (
        <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardHoverVariants}
            className="relative w-full h-full min-h-[170px] flex flex-col justify-center rounded-[40px] shadow-lg cursor-pointer overflow-visible"
            style={{ backgroundColor: style.bg }}
        >
            {/* ── Outer Icon Bubble ── */}
            <motion.div 
                variants={bubbleVariants}
                className="absolute -top-6 -left-6 z-20 drop-shadow-md origin-center"
            >
                <div 
                    className="relative w-14 h-14 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: style.dark }}
                >
                    {style.Icon ? (
                        <style.Icon size={24} color="#fff" strokeWidth={2.5} />
                    ) : (
                        <span className="text-white font-black text-2xl pb-0.5">{style.textIcon}</span>
                    )}
                    
                    {/* Speech Bubble Tail */}
                    <div 
                        className="absolute -bottom-1 -right-1.5 w-6 h-6"
                        style={{
                            backgroundColor: style.dark,
                            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                            transform: 'rotate(15deg)'
                        }}
                    />
                </div>
            </motion.div>

            {/* ── Inner Content & Blobs ── */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col justify-center">
                
                {/* Decorative Blobs */}
                {renderBlobs(type, style.dark)}

                {/* Text Content */}
                <div className="relative z-10 px-8 py-7 pl-[76px]">
                    {/* Close Button */}
                    <button className="absolute top-5 right-6 text-white/80 hover:text-white transition-colors cursor-pointer">
                        <Icons.X size={16} strokeWidth={2} />
                    </button>
                    
                    <h3 className="text-[26px] font-medium text-white mb-1.5 tracking-wide leading-none">
                        {title}
                    </h3>
                    <p className="text-white/90 text-[14px] font-normal leading-relaxed pr-6">
                        {message}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const NotificationsPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: {
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', stiffness: 120, damping: 15 }
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden bg-transparent">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes headerSlideDown {
                    0% { opacity: 0; transform: translateY(-30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-header {
                    opacity: 0;
                    animation: headerSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes descriptionFade {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-desc {
                    opacity: 0;
                    animation: descriptionFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                }
                `
            }} />
            <div className="max-w-[1280px] mx-auto px-6 md:px-8 relative z-10">
                
                {/* ── PAGE HEADER ── */}
                <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 mt-16 md:mt-4 relative z-20">
                    <h1 className="animate-header text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 leading-tight">
                        Notifications
                    </h1>
                    <p className="animate-desc text-gray-700 text-lg font-medium leading-relaxed">
                        Stay updated with the latest security alerts, intelligence reports, and platform announcements.
                    </p>
                </div>

                {/* ── NOTIFICATIONS GRID ── */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 max-w-[1200px] mx-auto mt-8"
                >
                    {notificationData.map((item) => (
                        <motion.div key={item.id} variants={itemVariants} className="h-full">
                            <FlashMessage 
                                type={item.type} 
                                title={item.title} 
                                message={item.message} 
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default NotificationsPage;
