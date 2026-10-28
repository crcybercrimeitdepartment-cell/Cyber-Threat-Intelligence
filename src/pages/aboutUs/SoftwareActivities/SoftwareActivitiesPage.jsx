import React, { useState, useEffect, useRef, useCallback } from 'react'
import { classroomParagraphs } from './SoftwareActivitiesPageData'
import NavPageHeader from '../../../components/NavPageHeader'

const swissphoneStyles = `
/* =========================================================
   SWISSPHONE res.Q • DATA TERMINAL
   Theme: Pure White Studio / Stable Device / Data on Screen
   Responsive Design for All Devices (Mobile, Tablet, Desktop)
   ========================================================= */

.resq-page-root {
  --bg-white: #ffffff;
  --bg-subtle: #f8fafc;
  --chassis-navy: #182338;
  --chassis-navy-dark: #0f1726;
  --chassis-navy-light: #253655;
  --chassis-highlight: #3b5078;
  --lcd-bg: #b8cbbd;
  --lcd-pixel: #142218;
  --lcd-pixel-dim: #435b4b;
  --accent-red: #dc2626;
  --accent-yellow: #facc15;
  --button-white: #f1f5f9;
  --logo-coral: #ff4747;
}

.resq-page-root,
.resq-page-root *,
.resq-page-root *::before,
.resq-page-root *::after {
  box-sizing: border-box;
}

/* =========================================================
   PAGE CONTAINER (CLEAN WHITE THEME, FULLY RESPONSIVE)
   ========================================================= */
.resq-page-root {
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  background: transparent !important;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.software-activities-environment {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: transparent !important;
}

.watermark-bg:has(.software-activities-environment) {
  background-color: #f8fafc !important;
}

.watermark-bg:has(.software-activities-environment)::before {
  opacity: 0.18 !important;
  display: block !important;
}

/* Stable Main Container with Safe Centering */
.resq-main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: clamp(16px, 3.5vh, 40px) clamp(12px, 3vw, 24px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* =========================================================
   TOP DEMO HEADER (TITLE & DESCRIPTION)
   ========================================================= */
.resq-demo-header {
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto clamp(16px, 2.8vh, 28px);
  padding: 0 clamp(8px, 2vw, 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.resq-demo-title {
  font-size: clamp(1.35rem, 4vw, 2.05rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin: 0 0 8px;
  line-height: 1.25;
}

.resq-demo-desc {
  font-size: clamp(0.82rem, 2.1vw, 0.94rem);
  color: #64748b;
  line-height: 1.55;
  margin: 0;
  max-width: 520px;
}

/* =========================================================
   DEVICE WRAPPER (PREVENTS PROTRUDING CLIPS FROM OVERFLOWING)
   ========================================================= */
.resq-device-wrapper {
  position: relative;
  width: 100%;
  max-width: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  padding: 16px clamp(14px, 3.5vw, 18px) 20px;
  box-sizing: border-box;
}

/* =========================================================
   SWISSPHONE res.Q PAGER HARDWARE CHASSIS
   ========================================================= */
.resq-chassis {
  position: relative;
  width: 100%;
  max-width: 430px;
  background: linear-gradient(180deg, #243553 0%, var(--chassis-navy) 35%, var(--chassis-navy-dark) 100%);
  border-radius: clamp(26px, 6vw, 36px);
  padding: clamp(16px, 4vw, 22px) clamp(14px, 4vw, 24px) clamp(20px, 4.8vw, 26px);
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -4px 6px rgba(0, 0, 0, 0.6),
    inset 3px 0 4px rgba(255, 255, 255, 0.08),
    inset -3px 0 4px rgba(0, 0, 0, 0.4),
    0 20px 40px -10px rgba(15, 23, 42, 0.28),
    0 8px 16px -4px rgba(15, 23, 42, 0.16);
  border: 1px solid #334a70;
  box-sizing: border-box;
  margin: 0 auto;
}

/* Top Housing Antenna Crown */
.resq-chassis__top-crest {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(120px, 35vw, 160px);
  height: 16px;
  background: linear-gradient(180deg, #2a3c5d 0%, var(--chassis-navy) 100%);
  border-radius: 10px 10px 0 0;
  border: 1px solid #3b5078;
  border-bottom: none;
  box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.15);
}

.resq-crest-bump {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
}

/* Rubberized Side Clip Bumpers */
.resq-side-clip {
  position: absolute;
  top: clamp(65px, 16vw, 80px);
  width: clamp(12px, 3vw, 15px);
  height: clamp(100px, 24vw, 136px);
  background: #11141a;
  border: 1px solid #232733;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 8px 2px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.8), 0 3px 6px rgba(0, 0, 0, 0.4);
}

.resq-side-clip--left {
  left: -12px;
  border-radius: 6px 0 0 6px;
}

.resq-side-clip--right {
  right: -12px;
  border-radius: 0 6px 6px 0;
}

.resq-clip-rib {
  width: 100%;
  height: clamp(3px, 0.8vw, 4px);
  background: #2b303c;
  border-radius: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}

/* =========================================================
   LCD SCREEN HOUSING (WHERE ALL DATA IS DISPLAYED)
   ========================================================= */
.resq-screen-frame {
  background: #101826;
  padding: clamp(7px, 2vw, 10px);
  border-radius: clamp(12px, 3vw, 16px);
  border: 2px solid #233450;
  box-shadow:
    inset 0 3px 6px rgba(0, 0, 0, 0.8),
    0 1px 2px rgba(255, 255, 255, 0.12);
  margin-bottom: clamp(10px, 2.5vw, 14px);
  box-sizing: border-box;
}

.resq-screen-glass {
  position: relative;
  border-radius: clamp(8px, 2vw, 10px);
  overflow: hidden;
  border: 1px solid #1a2838;
}

/* Glass glare highlight */
.resq-glass-glare {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    transparent 35%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 5;
}

/* LCD Screen Surface */
.resq-lcd {
  background-color: var(--lcd-bg);
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.025) 50%, transparent 50%),
    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 50%, transparent 50%);
  background-size: 3px 3px;
  color: var(--lcd-pixel);
  padding: clamp(9px, 2.5vw, 12px) clamp(10px, 2.8vw, 14px) clamp(8px, 2vw, 10px);
  font-family: 'Share Tech Mono', 'Space Mono', monospace;
  box-shadow: inset 0 0 14px rgba(45, 62, 51, 0.35);
  min-height: clamp(230px, 40vh, 280px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* LCD Top Status Bar */
.resq-lcd__top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: clamp(0.72rem, 2vw, 0.82rem);
  border-bottom: 1.5px solid rgba(20, 34, 24, 0.3);
  padding-bottom: 4px;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  font-weight: 700;
  user-select: none;
}

.resq-lcd-antenna {
  font-size: clamp(0.74rem, 2vw, 0.8rem);
  font-weight: 800;
}

.resq-lcd-antenna span {
  font-size: 0.68rem;
  letter-spacing: -0.05em;
}

.resq-lcd-gsm {
  font-size: clamp(0.68rem, 1.8vw, 0.75rem);
  font-weight: 800;
  letter-spacing: 0.06em;
}

.resq-lcd-battery {
  display: flex;
  align-items: center;
}

.resq-bat-body {
  width: clamp(20px, 5.5vw, 25px);
  height: clamp(10px, 2.8vw, 12px);
  border: 1.5px solid var(--lcd-pixel);
  border-radius: 2px;
  padding: 1px;
  display: flex;
}

.resq-bat-fill {
  width: 85%;
  height: 100%;
  background: var(--lcd-pixel);
  display: block;
}

.resq-bat-tip {
  width: 2px;
  height: clamp(5px, 1.5vw, 6px);
  background: var(--lcd-pixel);
  border-radius: 0 1px 1px 0;
}

/* Metadata Bar: Topic Count + Live Clock */
.resq-lcd__meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  font-size: clamp(0.64rem, 1.8vw, 0.72rem);
  font-weight: 700;
  color: #172a1e;
  margin-bottom: 7px;
  flex-wrap: wrap;
}

.resq-lcd-page-num {
  background: rgba(20, 34, 24, 0.12);
  padding: 2px 5px;
  border-radius: 3px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.resq-lcd-live-clock {
  letter-spacing: 0.03em;
  white-space: nowrap;
}

/* =========================================================
   MAIN DATA CONTENT DISPLAYED INSIDE LCD SCREEN
   ========================================================= */
.resq-lcd__content-box {
  flex: 1;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(20, 34, 24, 0.2);
  border-radius: 4px;
  padding: clamp(8px, 2vw, 10px) clamp(9px, 2.2vw, 12px);
  overflow-y: auto;
  max-height: clamp(140px, 26vh, 180px);
  scrollbar-width: thin;
  scrollbar-color: rgba(20, 34, 24, 0.4) transparent;
  user-select: text;
  box-sizing: border-box;
}

.resq-lcd-heading {
  font-family: 'Share Tech Mono', 'Space Mono', monospace;
  font-size: clamp(0.92rem, 2.6vw, 1.05rem);
  font-weight: 800;
  color: #0b150f;
  line-height: 1.32;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border-bottom: 1px solid rgba(20, 34, 24, 0.2);
  padding-bottom: 4px;
}

.resq-lcd-paragraph {
  font-family: 'Share Tech Mono', 'Space Mono', monospace;
  font-size: clamp(0.78rem, 2.1vw, 0.88rem);
  line-height: 1.52;
  color: var(--lcd-pixel);
  letter-spacing: -0.01em;
  text-align: left;
}

.resq-lcd-cursor {
  display: inline-block;
  margin-left: 2px;
  color: #0b150f;
  font-weight: 900;
  animation: lcdCursorBlink 0.45s infinite alternate ease-in-out;
  vertical-align: baseline;
}

@keyframes lcdCursorBlink {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* LCD Bottom Bar */
.resq-lcd__bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  font-size: clamp(0.58rem, 1.6vw, 0.68rem);
  font-weight: 700;
  color: var(--lcd-pixel-dim);
  border-top: 1px dashed rgba(20, 34, 24, 0.25);
  padding-top: 5px;
  margin-top: 6px;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

/* =========================================================
   SWISSPHONE BRANDING WITH RED ARC
   ========================================================= */
.resq-swissphone-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: clamp(8px, 2vw, 12px) 0 clamp(10px, 2.2vw, 14px);
}

.resq-brand-arc {
  position: relative;
  width: clamp(110px, 28vw, 140px);
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resq-arc-line {
  position: absolute;
  top: 4px;
  width: 90%;
  height: 18px;
  border-top: 2.2px solid #ff4747;
  border-radius: 50% 50% 0 0;
}

.resq-arc-dot {
  position: absolute;
  top: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ff4747;
}

.resq-arc-dot--left { left: 4px; }
.resq-arc-dot--right { right: 4px; }

.resq-brand-text {
  font-weight: 800;
  font-size: clamp(0.85rem, 2.4vw, 0.98rem);
  letter-spacing: 0.18em;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  margin-top: -1px;
}

/* =========================================================
   RECESSED THUMB DISH & INTERACTIVE BUTTONS
   ========================================================= */
.resq-dish-recess {
  position: relative;
  background: radial-gradient(ellipse at 50% 50%, #101826 0%, #152238 80%, #1c2b46 100%);
  border-radius: clamp(20px, 5vw, 28px);
  padding: clamp(12px, 3.5vw, 18px) clamp(14px, 4vw, 24px);
  margin: 0 auto;
  border: 2px solid #101826;
  box-shadow:
    inset 0 6px 12px rgba(0, 0, 0, 0.75),
    inset 0 -2px 4px rgba(255, 255, 255, 0.08),
    0 1px 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;
}

/* Large Round Tactile Action Button */
.resq-main-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.resq-btn-yellow {
  position: relative;
  width: clamp(66px, 17vw, 86px);
  height: clamp(66px, 17vw, 86px);
  border-radius: 50%;
  background: radial-gradient(circle at 45% 45%, #ef4444 0%, #dc2626 60%, #991b1b 100%);
  border: none;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.5),
    inset 0 2px 3px rgba(255, 255, 255, 0.4),
    inset 0 -3px 5px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(6px, 1.5vw, 8px);
  transition: transform 0.08s ease, box-shadow 0.08s ease;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.resq-btn-yellow__inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #fff176 0%, #facc15 50%, #ca8a04 100%);
  box-shadow:
    inset 0 3px 5px rgba(255, 255, 255, 0.8),
    inset 0 -4px 6px rgba(161, 98, 7, 0.6),
    0 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.resq-btn-glyph {
  font-size: clamp(1rem, 2.8vw, 1.25rem);
  font-weight: 900;
  color: #713f12;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  user-select: none;
  line-height: 1;
}

.resq-btn-yellow:hover {
  transform: scale(1.03);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.55),
    inset 0 2px 3px rgba(255, 255, 255, 0.4),
    inset 0 -3px 5px rgba(0, 0, 0, 0.6);
}

.resq-btn-yellow:active {
  transform: scale(0.96);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.6),
    inset 0 1px 2px rgba(0, 0, 0, 0.5);
}

.resq-btn-label {
  font-size: clamp(0.64rem, 1.8vw, 0.72rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #e2e8f0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

/* Two Off-white Small Tactile Buttons */
.resq-small-buttons-col {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2.6vw, 16px);
  align-items: center;
}

.resq-small-btn-unit {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.8vw, 10px);
}

.resq-btn-white {
  width: clamp(34px, 8.5vw, 38px);
  height: clamp(34px, 8.5vw, 38px);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%);
  border: 1px solid #64748b;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.4),
    inset 0 2px 3px rgba(255, 255, 255, 0.9),
    inset 0 -2px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
  transition: transform 0.08s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.resq-btn-white__inner {
  font-size: clamp(0.72rem, 2vw, 0.8rem);
  font-weight: 800;
  color: #334155;
  user-select: none;
  line-height: 1;
}

.resq-btn-white:hover {
  transform: scale(1.06);
}

.resq-btn-white:active {
  transform: scale(0.94);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.6),
    inset 0 1px 2px rgba(0, 0, 0, 0.4);
}

.resq-small-label {
  font-size: clamp(0.62rem, 1.6vw, 0.68rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #94a3b8;
  width: clamp(36px, 10vw, 48px);
}

/* =========================================================
   "res.Q" NEON CORAL LOGO AT BOTTOM
   ========================================================= */
.resq-bottom-logo {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: clamp(12px, 3vw, 18px);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--logo-coral);
  text-shadow: 0 0 12px rgba(255, 71, 71, 0.4);
  user-select: none;
}

.resq-logo-res,
.resq-logo-q {
  font-size: clamp(1.8rem, 5.5vw, 2.3rem);
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: -0.06em;
  line-height: 1;
}

.resq-logo-dot {
  font-size: clamp(1.6rem, 5vw, 2.1rem);
  margin: 0 1px;
}

/* =========================================================
   RESPONSIVE DESIGN BREAKPOINTS
   ========================================================= */

/* Tablets and Below */
@media (max-width: 768px) {
  .resq-main-container {
    padding: 24px 14px;
  }
}

/* Mobile Screens (Phones) */
@media (max-width: 480px) {
  .resq-device-wrapper {
    padding: 14px 12px 18px;
  }
  .resq-chassis {
    padding: 16px 14px 20px;
    border-radius: 26px;
  }
  .resq-dish-recess {
    padding: 12px 14px;
  }
  .resq-lcd {
    min-height: 230px;
  }
  .resq-lcd__content-box {
    max-height: 145px;
  }
}

/* Ultra-Compact Screens (Galaxy Fold, iPhone SE, etc. <= 360px) */
@media (max-width: 360px) {
  .resq-device-wrapper {
    padding: 10px 8px 14px;
  }
  .resq-chassis {
    padding: 14px 10px 18px;
    border-radius: 22px;
  }
  .resq-side-clip {
    display: none; /* Hide outer side ribs on ultra-narrow screens to preserve screen space */
  }
  .resq-btn-yellow {
    width: 60px;
    height: 60px;
  }
  .resq-btn-white {
    width: 30px;
    height: 30px;
  }
  .resq-dish-recess {
    padding: 10px 10px;
    gap: 8px;
  }
  .resq-small-label {
    width: 32px;
  }
  .resq-lcd__bottom-bar {
    font-size: 0.52rem;
  }
}

/* Landscape Mode on Mobile & Low Height Displays */
@media (max-height: 680px) and (orientation: landscape) {
  .resq-main-container {
    padding: 12px 16px;
  }
  .resq-demo-header {
    margin-bottom: 12px;
  }
  .resq-demo-title {
    font-size: 1.25rem;
    margin-bottom: 4px;
  }
  .resq-demo-desc {
    font-size: 0.78rem;
    line-height: 1.35;
  }
  .resq-lcd {
    min-height: 180px;
  }
  .resq-lcd__content-box {
    max-height: 110px;
  }
  .resq-dish-recess {
    padding: 10px 16px;
  }
  .resq-btn-yellow {
    width: 62px;
    height: 62px;
  }
}
`

export default function SoftwareActivitiesPage() {
  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [liveTime, setLiveTime] = useState('')
  const [displayedHeading, setDisplayedHeading] = useState('')
  const [displayedContent, setDisplayedContent] = useState('')
  const [typingStage, setTypingStage] = useState('heading') // 'heading' | 'content' | 'done'

  const screenContentRef = useRef(null)
  const autoPlayTimerRef = useRef(null)
  const isCancelledRef = useRef(false)
  const typingTimeoutRef = useRef(null)

  const total = classroomParagraphs.length
  const current = classroomParagraphs[index] || classroomParagraphs[0] || { heading: '', content: '' }

  // Live real-time clock on LCD screen
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
      const day = days[now.getDay()]
      const date = String(now.getDate()).padStart(2, '0')
      const month = months[now.getMonth()]
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const mins = String(now.getMinutes()).padStart(2, '0')
      const secs = String(now.getSeconds()).padStart(2, '0')
      setLiveTime(`${day} ${date}.${month} ${year}  ${hours}:${mins}:${secs}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Instantly complete typing on click
  const completeImmediately = () => {
    if (typingStage === 'done') return
    isCancelledRef.current = true
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    setDisplayedHeading(current.heading)
    setDisplayedContent(current.content)
    setTypingStage('done')
  }

  // Typewriter text animation on page refresh (initial mount) and on next/prev navigation
  useEffect(() => {
    isCancelledRef.current = false
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    const headingText = current.heading
    const contentText = current.content

    if (screenContentRef.current) {
      screenContentRef.current.scrollTop = 0
    }

    let hIdx = 0
    let cIdx = 0

    function typeHeadingChar() {
      if (isCancelledRef.current) return
      hIdx++
      setDisplayedHeading(headingText.slice(0, hIdx))

      if (hIdx < headingText.length) {
        typingTimeoutRef.current = setTimeout(typeHeadingChar, 18)
      } else {
        setTypingStage('content')
        typingTimeoutRef.current = setTimeout(typeContentChar, 60)
      }
    }

    function typeContentChar() {
      if (isCancelledRef.current) return
      cIdx++
      setDisplayedContent(contentText.slice(0, cIdx))

      if (screenContentRef.current) {
        screenContentRef.current.scrollTop = screenContentRef.current.scrollHeight
      }

      if (cIdx < contentText.length) {
        const char = contentText[cIdx - 1]
        let delay = 10
        if (char === '.' || char === '?' || char === '!') {
          delay = 35
        } else if (char === ',' || char === ';') {
          delay = 20
        }
        typingTimeoutRef.current = setTimeout(typeContentChar, delay)
      } else {
        setTypingStage('done')
      }
    }

    typingTimeoutRef.current = setTimeout(typeHeadingChar, 30)

    return () => {
      isCancelledRef.current = true
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [index, current.heading, current.content])

  // Navigation handlers (Completely SILENT - NO BUTTON SOUND)
  const navigateTo = useCallback((nextIdx) => {
    setDisplayedHeading('')
    setDisplayedContent('')
    setTypingStage('heading')
    setIndex(nextIdx)
  }, [])

  const handleNext = useCallback(() => {
    const nextIdx = index < total - 1 ? index + 1 : 0
    navigateTo(nextIdx)
  }, [index, total, navigateTo])

  const handlePrev = useCallback(() => {
    const prevIdx = index > 0 ? index - 1 : total - 1
    navigateTo(prevIdx)
  }, [index, total, navigateTo])

  const handleAutoToggle = () => {
    setIsAutoPlaying(prev => !prev)
  }

  // Auto-play interval
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext()
      }, 7000)
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [isAutoPlaying, handleNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return
      if (e.key === ' ') {
        e.preventDefault()
        handleAutoToggle()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  return (
    <>
      <style>{swissphoneStyles}</style>
      <div className="resq-page-root software-activities-environment">
        {/* NavPageHeader with unified design */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20 pt-4 mb-1">
          <NavPageHeader
            title="Software Activities"
            description="Discover our key activities across cybersecurity awareness, threat-related information, and public safety resources across 50 data pager transmissions."
          />
        </div>

        {/* Main Stable Container */}
        <main className="resq-main-container">

          {/* SWISSPHONE res.Q PAGER DEVICE WRAPPER */}
          <div className="resq-device-wrapper">
            <div className="resq-chassis">
              {/* Top Housing Bump / Antenna Crown */}
              <div className="resq-chassis__top-crest">
                <div className="resq-crest-bump" />
              </div>

              {/* Left Rubberized Side Clip Bumper */}
              <div className="resq-side-clip resq-side-clip--left">
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
              </div>

              {/* Right Rubberized Side Clip Bumper */}
              <div className="resq-side-clip resq-side-clip--right">
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
                <span className="resq-clip-rib" />
              </div>

              {/* Device Front Panel */}
              <div className="resq-chassis__body">
                {/* ==================================================== */}
                {/* THE LCD SCREEN - ALL DATA IS DISPLAYED INSIDE HERE!  */}
                {/* ==================================================== */}
                <div className="resq-screen-frame">
                  <div className="resq-screen-glass">
                    {/* Subtle glass glare highlight */}
                    <div className="resq-glass-glare" />

                    {/* Backlit LCD Display */}
                    <div className="resq-lcd">
                      {/* Top Status Bar: Antenna, GSM GPS, Battery */}
                      <div className="resq-lcd__top-bar">
                        <div className="resq-lcd-icon resq-lcd-antenna">
                          Ψ <span>ıııı</span>
                        </div>
                        <div className="resq-lcd-gsm">GSM GPS</div>
                        <div className="resq-lcd-battery">
                          <span className="resq-bat-body">
                            <i className="resq-bat-fill" />
                          </span>
                          <span className="resq-bat-tip" />
                        </div>
                      </div>

                      {/* Topic Index Pill & Live Timestamp */}
                      <div className="resq-lcd__meta-bar">
                        <span className="resq-lcd-page-num">
                          MSG #{String(index + 1).padStart(2, '0')} / {total}
                        </span>
                        <span className="resq-lcd-live-clock">{liveTime}</span>
                      </div>

                      {/* =================================================== */}
                      {/* MAIN DATA READING AREA WITH TYPEWRITER ANIMATION   */}
                      {/* =================================================== */}
                      <div
                        className="resq-lcd__content-box"
                        ref={screenContentRef}
                        onClick={completeImmediately}
                        title={typingStage !== 'done' ? 'Click to show all text instantly' : undefined}
                        style={{ cursor: typingStage !== 'done' ? 'pointer' : 'default' }}
                      >
                        <h2 className="resq-lcd-heading">
                          {displayedHeading}
                          {typingStage === 'heading' && (
                            <span className="resq-lcd-cursor" aria-hidden="true">▌</span>
                          )}
                        </h2>
                        <p className="resq-lcd-paragraph">
                          {displayedContent}
                          {typingStage === 'content' && (
                            <span className="resq-lcd-cursor" aria-hidden="true">▌</span>
                          )}
                        </p>
                      </div>

                      {/* LCD Screen Footer Indicator */}
                      <div className="resq-lcd__bottom-bar">
                        <span>◄ WHITE: NEXT / PREV ►</span>
                        <span>{index + 1} OF {total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SWISSPHONE Brand Arc & Text */}
                <div className="resq-swissphone-brand">
                  <div className="resq-brand-arc">
                    <span className="resq-arc-dot resq-arc-dot--left" />
                    <span className="resq-arc-line" />
                    <span className="resq-arc-dot resq-arc-dot--right" />
                  </div>
                  <div className="resq-brand-text">SWISSPHONE</div>
                </div>

                {/* Ergonomic Recessed Thumb Dish with Interactive Buttons */}
                <div className="resq-dish-recess">
                  {/* Big Yellow Button: PAUSE / PLAY BUTTON (NO SOUND) */}
                  <div className="resq-main-btn-wrap">
                    <button
                      type="button"
                      className="resq-btn-yellow"
                      onClick={handleAutoToggle}
                      aria-label={isAutoPlaying ? "Pause" : "Play"}
                      title={isAutoPlaying ? "PAUSE AUTO CYCLE (Space)" : "PLAY AUTO CYCLE (Space)"}
                    >
                      <span className="resq-btn-yellow__inner">
                        <span className="resq-btn-glyph">{isAutoPlaying ? '❚❚' : '▶'}</span>
                      </span>
                    </button>
                    <span className="resq-btn-label">{isAutoPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </div>

                  {/* Two Off-white Small Tactile Buttons on Right: NEXT & PREV (NO SOUND) */}
                  <div className="resq-small-buttons-col">
                    {/* Top White Button: NEXT */}
                    <div className="resq-small-btn-unit">
                      <button
                        type="button"
                        className="resq-btn-white"
                        onClick={handleNext}
                        aria-label="Next Topic"
                        title="NEXT TOPIC (Right Arrow)"
                      >
                        <span className="resq-btn-white__inner">►</span>
                      </button>
                      <span className="resq-small-label">NEXT</span>
                    </div>

                    {/* Bottom White Button: PREVIOUS */}
                    <div className="resq-small-btn-unit">
                      <button
                        type="button"
                        className="resq-btn-white"
                        onClick={handlePrev}
                        aria-label="Previous Topic"
                        title="PREVIOUS TOPIC (Left Arrow)"
                      >
                        <span className="resq-btn-white__inner">◄</span>
                      </button>
                      <span className="resq-small-label">PREV</span>
                    </div>
                  </div>
                </div>

                {/* Neon Coral Red "res.Q" Logo at Bottom */}
                <div className="resq-bottom-logo">
                  <span className="resq-logo-res">res</span>
                  <span className="resq-logo-dot">.</span>
                  <span className="resq-logo-q">Q</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export { SoftwareActivitiesPage, SoftwareActivitiesPage as SwissphonePrinter }
