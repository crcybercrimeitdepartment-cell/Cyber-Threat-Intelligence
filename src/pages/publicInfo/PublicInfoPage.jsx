import React from 'react';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { publicInfoData } from '../../data/publicInfo/publicInfoData.js';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const PublicInfoPage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-32 relative overflow-hidden bg-[#bac3c4]">
      {/* Main Page Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Outside the Page Box */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16 mt-12 md:mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 drop-shadow-sm leading-tight">
            Public Information Directory
          </h1>
          <p className="text-gray-700 text-lg font-medium leading-relaxed drop-shadow-sm">
            Access reliable statistics, public cyber advisories, trending threat reports, cybersecurity glossaries, digital hygiene guidelines, and other essential cyber information for general awareness.
          </p>
        </motion.div>

        {/* The Grid of Cards */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 sm:gap-y-24 gap-x-2 sm:gap-x-6 max-w-[1200px] mx-auto justify-items-center mt-10 px-1 sm:px-0"
        >
          {publicInfoData.map((card) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { type: "tween", ease: "easeOut", duration: 0.5 } 
                }
              }}
              key={card.id} 
              className="w-full flex justify-center h-[260px] sm:h-auto"
            >
              <div className="scale-[0.70] sm:scale-100 origin-top h-[340px]">
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
                  className="relative w-[220px] h-[340px] group cursor-pointer"
                >
              {/* Colored Background Box */}
              <div className="absolute bottom-0 left-0 w-full h-[82%] rounded-br-[50px] shadow-lg">
                {/* Base Color */}
                <div className="absolute inset-0 rounded-br-[50px]" style={{ backgroundColor: card.color }}></div>
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 rounded-br-[50px]"></div>
                
                {/* Permanent Footer Area */}
                <div className="absolute bottom-6 left-5 right-5 flex justify-between items-center z-10">
                  {/* Left Side: Arrows */}
                  <div className="flex -space-x-3 text-white/60 group-hover:text-white/90 transition-colors">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.15, duration: 0.4, type: "spring", stiffness: 100 }}
                      >
                        <ChevronRight 
                          size={28} 
                          strokeWidth={3.5} 
                          className="transition-all duration-300 ease-out group-hover:translate-x-1"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {/* Right Side: Click to View Button */}
                  <button className="px-4 py-2 text-[10px] font-black tracking-widest text-white bg-white/10 rounded-full backdrop-blur-md border border-white/30 shadow-sm hover:bg-white/25 active:scale-95 transition-all uppercase">
                    Click to View
                  </button>
                </div>
              </div>

              {/* White Foreground Box */}
              <div className="absolute top-0 left-[6%] w-[88%] z-10 drop-shadow-[0_12px_15px_rgba(0,0,0,0.25)] h-[72%]">
                {/* The actual white box */}
                <div className="absolute inset-0 bg-white rounded-tl-[45px] pb-6 flex flex-col items-center">
                  <div className="mt-8 mb-3 h-16 flex items-center justify-center w-full">
                    {(() => {
                      if (card.layout === 'password') {
                        return (
                          <div className="relative flex flex-col items-center justify-center h-[52px] w-[56px] border-[2px] rounded-xl bg-orange-50/20" style={{ borderColor: card.color }}>
                            <Icons.Lock size={16} color={card.color} strokeWidth={2.5} className="absolute -top-[10px] bg-white px-0.5" />
                            <span className="font-black tracking-[0.2em] text-xl mt-1" style={{ color: card.color }}>***_</span>
                          </div>
                        );
                      }

                      const PrimaryIcon = Icons[card.primaryIcon];
                      const SecondaryIcon = card.secondaryIcon ? Icons[card.secondaryIcon] : null;

                      if (!SecondaryIcon) {
                        return <PrimaryIcon size={52} strokeWidth={1.5} color={card.color} />;
                      }

                      return (
                        <div className="relative">
                          <PrimaryIcon size={52} strokeWidth={1.5} color={card.color} />
                          <div className={card.secondaryClass}>
                            <SecondaryIcon size={card.secondarySize || 20} strokeWidth={card.secondaryStroke || 2.5} color={card.color} />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <h3 
                    className="text-center font-black text-[15px] leading-tight px-4 uppercase tracking-tight" 
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[9px] text-justify text-gray-700 mt-2 px-5 leading-[1.35]">
                    {card.description}
                  </p>
                </div>
                
                {/* Triangle at the bottom */}
                <svg className="absolute -bottom-[19px] right-[20%] w-[34px] h-[20px]" viewBox="0 0 34 20" preserveAspectRatio="none">
                  <path d="M0,0 L17,20 L34,0 Z" fill="white" />
                </svg>
              </div>
              </motion.div>
            </div>
          </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default PublicInfoPage;
