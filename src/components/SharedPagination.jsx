import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SharedPagination
 * 
 * A standardized pagination and navigation component.
 * 
 * @param {number} totalItems - Total number of indicator dots.
 * @param {number} currentIndex - The currently active dot index.
 * @param {function} onPageChange - Callback when a dot is clicked: (index) => void.
 * @param {function} onPrev - Callback when the Left Arrow is clicked.
 * @param {function} onNext - Callback when the Right Arrow is clicked.
 * @param {string} [className] - Optional additional CSS classes for the container.
 */
export default function SharedPagination({ 
 totalItems, 
 currentIndex, 
 onPageChange, 
 onPrev, 
 onNext,
 className = ""
}) {
 const uniqueId = React.useId();

 return (
 <div className={`flex flex-row items-center justify-center gap-2 sm:gap-4 mt-4 md:mt-5 z-20 w-full flex-wrap sm:flex-nowrap ${className}`}>
 
 {/* Left Navigation Button */}
 <button
 onClick={onPrev}
 className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100 hover:bg-slate-50 text-slate-700 transition-all active:scale-95 cursor-pointer shrink-0"
 aria-label="Previous slide"
 >
 <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
 </button>

 {/* Indicator Dots */}
 <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-slate-200/40 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] mx-1 sm:mx-2 flex-wrap">
 {Array.from({ length: totalItems }).map((_, index) => {
 const isActive = index === currentIndex;
 // Theme colors mapping matching the original design
 let dotColorClass = "bg-blue-600";

 return (
 <button
 key={index}
 onClick={() => onPageChange(index)}
 className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center focus:outline-none group cursor-pointer shrink-0"
 aria-label={`Go to slide ${index + 1}`}
 >
 {isActive ? (
 <motion.div
 layoutId={`activeDotShared-${uniqueId}`}
 className={`h-2 w-4 sm:h-2.5 sm:w-6 rounded-full ${dotColorClass}`}
 transition={{ type: "spring", stiffness: 350, damping: 25 }}
 />
 ) : (
 <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-slate-400/80 sm:bg-slate-300/80 rounded-full group-hover:bg-slate-400 group-hover:scale-110 transition-all duration-200" />
 )}
 </button>
 );
 })}
 </div>

 {/* Right Navigation Button */}
 <button
 onClick={onNext}
 className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100 hover:bg-slate-50 text-slate-700 transition-all active:scale-95 cursor-pointer shrink-0"
 aria-label="Next slide"
 >
 <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
 </button>

 </div>
 );
}
