import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { partnershipData } from '../../data/cybersecurityPartnership/cybersecurityPartnershipData.js';




// ── Single Card Component ──────────────────────────────────────────────────
const PartnershipCard = ({ item, isSelected, isOtherSelected, onSelect }) => {
    const Icon = Icons[item.icon] || Icons.HelpCircle;
    const [hovered, setHovered] = React.useState(false);
    const [shimmer, setShimmer] = React.useState(false);

    // Trigger shimmer sweep on hover start
    const handleHoverStart = React.useCallback(() => {
        setHovered(true);
        setShimmer(false);
        setTimeout(() => setShimmer(true), 10);
        setTimeout(() => setShimmer(false), 700);
    }, []);

    const BLOB = '22px 110px 58px 48px / 30px 92px 52px 70px';
    const SHIELD = '18px 18px 48% 48% / 18px 18px 55px 55px';

    return (
        <div
            onMouseEnter={handleHoverStart}
            onMouseLeave={() => setHovered(false)}
            onClick={onSelect}
            className="card-animate"
            style={{
                position: 'relative',
                paddingTop: '24px',
                paddingLeft: '18px',
                paddingBottom: '8px',
                paddingRight: '4px',
                width: '100%',
                cursor: 'pointer',
                opacity: isOtherSelected ? 0.35 : 1,
                filter: isOtherSelected ? 'blur(1.5px) grayscale(0.2)' : 'none',
                transition: 'opacity 0.4s ease, filter 0.4s ease',
            }}
        >
            <motion.div
                animate={{ y: hovered ? 5 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '30px', left: '12px', right: '-3px', bottom: '2px',
                    borderRadius: BLOB,
                    background: 'linear-gradient(135deg, #060b18 0%, #0c1530 100%)',
                    zIndex: 0,
                }}
            />

            <motion.div
                animate={{
                    y: hovered ? 4 : 0,
                    boxShadow: hovered
                        ? `0 22px 52px ${item.color}60, 0 0 28px ${item.color}30`
                        : `0 20px 48px ${item.color}45`,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '26px', left: '6px', right: '-2px', bottom: '4px',
                    borderRadius: BLOB,
                    background: item.gradient,
                    zIndex: 1,
                }}
            />

            <motion.div
                animate={{
                    y: hovered ? -5 : 0,
                    boxShadow: hovered
                        ? `inset -5px -5px 22px rgba(255,255,255,1), 0 6px 36px rgba(0,0,0,0.07), 0 0 0 1.5px ${item.color}18`
                        : 'inset -5px -5px 22px rgba(255,255,255,1), 0 2px 24px rgba(0,0,0,0.04)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'relative',
                    zIndex: 10,
                    borderRadius: BLOB,
                    minHeight: '170px',
                    background: 'linear-gradient(148deg, #ffffff 0%, #eef1ff 100%)',
                    border: '1.5px solid rgba(255,255,255,0.97)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 14px 16px 12px',
                    overflow: 'hidden',
                }}
            >
                <motion.div
                    initial={{ x: '-110%', skewX: '-15deg', opacity: 0 }}
                    animate={{
                        x: shimmer ? '200%' : '-110%',
                        opacity: shimmer ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0,
                        width: '35%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
                        zIndex: 50,
                        pointerEvents: 'none',
                        transform: 'skewX(-15deg)',
                    }}
                />

                <motion.div
                    style={{ position: 'absolute', top: '-18px', left: '-12px', zIndex: 60 }}
                >
                    <div style={{
                        position: 'relative',
                        width: '56px', height: '56px',
                        borderRadius: '50%',
                        border: `2.5px solid ${item.color}`,
                        padding: '4px',
                        background: 'transparent',
                        boxShadow: `0 6px 18px ${item.color}60, 0 2px 6px rgba(0,0,0,0.25)`,
                    }}>
                        {hovered && (
                            <motion.div
                                initial={{ scale: 1, opacity: 0.7 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute', inset: '-3px',
                                    borderRadius: '50%',
                                    border: `2px solid ${item.color}`,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}
                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%', background: '#eef1ff', padding: '4px',
                        }}>
                            <motion.div
                                animate={{
                                    scale: hovered ? 1.08 : 1,
                                    boxShadow: hovered
                                        ? `inset 0 -4px 12px rgba(0,0,0,0.25), 0 0 20px ${item.color}50`
                                        : 'inset 0 -4px 12px rgba(0,0,0,0.22)',
                                }}
                                transition={{ type: 'spring', stiffness: 260, damping: 15 }}
                                style={{
                                    width: '100%', height: '100%',
                                    borderRadius: '50%',
                                    background: item.gradient,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <span style={{
                                    color: '#fff', fontWeight: 900, fontSize: '16px',
                                    lineHeight: 1, letterSpacing: '0.2px',
                                    fontFamily: "'Inter', sans-serif",
                                }}>{item.id}</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <div style={{
                    position: 'absolute', top: '14px', right: '22px',
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px',
                    zIndex: 20,
                }}>
                    {Array.from({ length: 9 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={hovered
                                ? { scale: [1, 1.5, 1], opacity: [0.48, 0.9, 0.48] }
                                : { scale: 1, opacity: 0.48 }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.055,
                                ease: 'easeInOut',
                            }}
                            style={{
                                width: '4px', height: '4px',
                                borderRadius: '50%',
                                background: item.color,
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    style={{ flexShrink: 0, alignSelf: 'center' }}
                >
                    <motion.div
                        animate={{
                            scale: hovered ? 1.1 : 1,
                            y: hovered ? -5 : 0,
                            boxShadow: hovered
                                ? `0 18px 40px ${item.color}40, inset 3px 3px 14px rgba(255,255,255,1), 0 0 0 5px ${item.color}20`
                                : `0 12px 32px ${item.color}28, inset 3px 3px 14px rgba(255,255,255,1), 0 0 0 4px ${item.color}14`,
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                        style={{
                            position: 'relative',
                            width: '60px', height: '65px',
                            borderRadius: SHIELD,
                            background: `linear-gradient(145deg, #ffffff 55%, ${item.color}12)`,
                            border: `1.5px solid ${item.color}35`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <motion.div
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute', inset: 0,
                                background: `radial-gradient(circle at 50% 120%, ${item.color}30 0%, transparent 70%)`,
                                borderRadius: SHIELD,
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: hovered ? 1.15 : 1,
                                rotate: hovered ? [0, -8, 8, -4, 0] : 0,
                            }}
                            transition={{
                                scale: { type: 'spring', stiffness: 200, damping: 14 },
                                rotate: { duration: 0.5, ease: 'easeInOut' },
                            }}
                            style={{ position: 'relative', zIndex: 1 }}
                        >
                            <Icon style={{
                                width: '32px', height: '32px',
                                color: item.color, fill: item.color, strokeWidth: 1,
                            }} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{
                        flexGrow: 1, display: 'flex', flexDirection: 'column',
                        minWidth: 0, paddingRight: '36px', paddingTop: '2px',
                    }}
                >
                    <motion.h3
                        animate={{ x: hovered ? 3 : 0, color: hovered ? '#0f1340' : '#1a1e4c' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        style={{
                            whiteSpace: 'pre-line', fontSize: '15px', fontWeight: 800,
                            lineHeight: 1.25, marginBottom: '6px',
                            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                            letterSpacing: '-0.3px',
                        }}
                    >{item.title}</motion.h3>

                    <motion.div
                        animate={{ width: hovered ? '55px' : '36px' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        style={{ height: '2.5px', background: item.gradient, borderRadius: '99px', marginBottom: '10px' }}
                    />

                    <p style={{
                        fontSize: '11.5px', fontWeight: 500, color: '#2e3566', lineHeight: 1.6,
                        marginBottom: '10px',
                        display: '-webkit-box', WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{item.desc}</p>

                    <motion.div
                        animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.7 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}
                    >
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                        <div style={{ width: '36px', height: '2px', borderRadius: '99px', background: item.gradient, flexShrink: 0 }} />
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    </motion.div>
                </motion.div>

                <motion.div
                    animate={{
                        scale: hovered ? 1.2 : 1,
                        y: hovered ? -4 : 0,
                        rotate: hovered ? 45 : 0,
                        boxShadow: hovered
                            ? `0 12px 30px ${item.color}70`
                            : `0 8px 24px ${item.color}60`,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    style={{
                        position: 'absolute', bottom: '12px', right: '12px',
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: item.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2.5px solid rgba(255,255,255,0.92)',
                        zIndex: 30, cursor: 'pointer',
                    }}
                >
                    <Icons.ArrowRight style={{ width: '14px', height: '14px', color: '#fff', strokeWidth: 2.5 }} />
                </motion.div>

            </motion.div>
        </div>
    );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function PartnershipPage() {
    const [selectedCardId, setSelectedCardId] = useState(null);

    return (
        <div
            className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .card-animate {
                    will-change: transform, opacity;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
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
                @keyframes cardWaveEntrance {
                    0% { opacity: 0; transform: translateY(50px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-wave {
                    opacity: 0;
                    /* 1.2s duration gives a very slow, luxurious, non-rushed feel */
                    animation: cardWaveEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            ` }} />

            <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8">

                {/* ── PAGE HEADER ── */}
                <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 mt-16 md:mt-4 relative z-20">
                  <h1 className="animate-header text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 leading-tight">
                    Cybersecurity Partnership
                  </h1>
                  <p className="animate-desc text-gray-600 text-lg font-medium leading-relaxed px-4">
                    Collaborate with CR-OD CTI to enhance collective cyber defense. Partner with us to share intelligence, integrate security solutions, sponsor awareness campaigns, and strengthen community resilience against evolving digital threats.
                  </p>
                </div>

                {/* ── CARD GRID ── */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    style={{ rowGap: '40px', columnGap: '20px', paddingBottom: '40px' }}
                >
                    {partnershipData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className="animate-card-wave" 
                            /* Starts immediately at 0.1s, then loads one-by-one with a 0.2s gap */
                            style={{ width: '100%', animationDelay: `${0.1 + index * 0.2}s` }}
                        >
                            <PartnershipCard
                                item={item}
                                isSelected={selectedCardId === item.id}
                                isOtherSelected={selectedCardId !== null && selectedCardId !== item.id}
                                onSelect={() => setSelectedCardId(selectedCardId === item.id ? null : item.id)}
                            />
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );
}
