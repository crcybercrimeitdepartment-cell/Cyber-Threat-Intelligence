import React from 'react';
import { motion } from 'framer-motion';

/**
 * Helper to split a word-based structure into individual letter objects
 * while preserving full words for word-wrapping, non-breaking spaces,
 * and assigning global line index for symmetrical converging animation.
 */
function buildLineData(words, baseDelay = 0.05, step = 0.032, offsetRight = 0.016, xDistance = 80) {
  // First, calculate total characters including spaces
  let totalChars = 0;
  words.forEach((wordObj, wIdx) => {
    totalChars += wordObj.text.length;
    if (wIdx < words.length - 1) {
      totalChars += 1; // space
    }
  });

  const midpoint = (totalChars - 1) / 2;
  let charCounter = 0;

  const wordsWithLetters = words.map((wordObj, wIdx) => {
    const letters = [];
    for (let i = 0; i < wordObj.text.length; i++) {
      const char = wordObj.text[i];
      const globalIdx = charCounter;
      charCounter++;

      const isLeft = globalIdx < midpoint;
      const isRight = globalIdx > midpoint;
      const distFromEdge = Math.min(globalIdx, totalChars - 1 - globalIdx);

      // Symmetrical stagger: outer letters start first, inner letters follow
      let delay = baseDelay + distFromEdge * step;
      if (isRight) {
        delay += offsetRight; // Micro-offset so left and right arrive in alternating cadence
      }

      const initialX = isLeft ? -xDistance : isRight ? xDistance : 0;

      letters.push({
        char,
        globalIdx,
        color: wordObj.color,
        initialX,
        delay,
      });
    }

    // Account for trailing space if not the last word
    let spaceData = null;
    if (wIdx < words.length - 1) {
      const spaceIdx = charCounter;
      charCounter++;
      const isLeft = spaceIdx < midpoint;
      const isRight = spaceIdx > midpoint;
      const distFromEdge = Math.min(spaceIdx, totalChars - 1 - spaceIdx);
      let delay = baseDelay + distFromEdge * step;
      if (isRight) delay += offsetRight;

      spaceData = {
        char: '\u00A0', // Non-breaking space
        globalIdx: spaceIdx,
        initialX: isLeft ? -xDistance : isRight ? xDistance : 0,
        delay,
      };
    }

    return {
      word: wordObj.text,
      letters,
      spaceData,
    };
  });

  return { wordsWithLetters, totalChars };
}

// Line 1: "CR OD"
const LINE_1_DATA = buildLineData(
  [
    { text: 'CR', color: '#00A3FF' },
    { text: 'OD', color: '#0B2559' },
  ],
  0.04,   // baseDelay
  0.045,  // step
  0.02,   // offsetRight
  65      // xDistance
);

// Line 2: "CYBER THREAT INTELLIGENCE"
const LINE_2_DATA = buildLineData(
  [
    { text: 'CYBER', color: '#0B2559' },
    { text: 'THREAT', color: '#0B2559' },
    { text: 'INTELLIGENCE', color: '#0B2559' },
  ],
  0.08,   // baseDelay
  0.032,  // step
  0.016,  // offsetRight
  95      // xDistance
);

/**
 * Animated line renderer with GPU-accelerated framer-motion transitions
 */
const AnimatedLine = ({ lineData, className }) => {
  return (
    <div className={`inline-flex flex-wrap items-center justify-center select-none ${className}`}>
      {lineData.wordsWithLetters.map((wordGroup, wIdx) => (
        <React.Fragment key={wIdx}>
          <span className="inline-flex whitespace-nowrap">
            {wordGroup.letters.map((letterItem) => (
              <motion.span
                key={letterItem.globalIdx}
                className="inline-block will-change-transform will-change-opacity"
                style={{
                  color: letterItem.color,
                }}
                initial={{
                  x: letterItem.initialX,
                  opacity: 0,
                  filter: 'blur(6px)',
                  scale: 0.88,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  scale: 1,
                }}
                transition={{
                  duration: 0.46,
                  delay: letterItem.delay,
                  ease: [0.22, 1, 0.36, 1], // Smooth cinematic deceleration into center
                }}
              >
                {letterItem.char}
              </motion.span>
            ))}
          </span>

          {wordGroup.spaceData && (
            <motion.span
              className="inline-block select-none"
              initial={{
                x: wordGroup.spaceData.initialX,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.46,
                delay: wordGroup.spaceData.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {wordGroup.spaceData.char}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * ConvergingTitle:
 * Center header brand title that converges letter-by-letter from both sides
 * into the middle on every refresh.
 */
const ConvergingTitle = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center select-none py-0.5">
      {/* Subtle connection glow pulse that radiates across the center upon connection */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: [0, 0.6, 0],
          scaleX: [0.25, 1.25, 1],
        }}
        transition={{
          delay: 0.52,
          duration: 0.65,
          ease: 'easeOut',
        }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-md rounded-full -z-10"
      />

      {/* Main Title Heading: 2 lines with larger CR-OD size */}
      <h1 className="flex flex-col items-center justify-center font-black leading-tight drop-shadow-[0_1px_3px_rgba(0,163,255,0.08)]">
        {/* LINE 1: CR OD (Bigger letter size) */}
        <AnimatedLine
          lineData={LINE_1_DATA}
          className="text-xl sm:text-2xl md:text-[25px] xl:text-[28px] font-black tracking-[0.08em] leading-none"
        />

        {/* LINE 2: CYBER THREAT INTELLIGENCE */}
        <AnimatedLine
          lineData={LINE_2_DATA}
          className="text-xs sm:text-sm md:text-[14px] xl:text-[15.5px] font-black tracking-[0.05em] leading-tight mt-1"
        />
      </h1>
    </div>
  );
};

export default ConvergingTitle;
