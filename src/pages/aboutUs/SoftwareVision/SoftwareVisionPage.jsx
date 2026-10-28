import React, { useState, useEffect, useRef, useCallback } from 'react'
import { classroomParagraphs } from './SoftwareVisionPageData'
import NavPageHeader from '../../../components/NavPageHeader'

const whiteboardStyles = `
/* ==========================================================================
   EASEL WHITEBOARD PRESENTATION DESIGN SYSTEM (FULL MULTI-DEVICE RESPONSIVE)
   Supports: Mobile Portrait/Landscape, Tablets, Laptops, Desktops, 4K Displays
   ========================================================================== */

.easel-stage {
  --font-whiteboard-heading: 'Plus Jakarta Sans', 'Patrick Hand', sans-serif;
  --font-marker: 'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive;
  --font-ui: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Metallic brushed aluminum gradients */
  --metal-shine: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #94a3b8 50%, #f1f5f9 75%, #64748b 100%);
  --metal-tube: linear-gradient(90deg, #94a3b8 0%, #cbd5e1 20%, #ffffff 45%, #e2e8f0 60%, #64748b 85%, #475569 100%);
  --metal-dark: linear-gradient(90deg, #64748b 0%, #94a3b8 30%, #cbd5e1 55%, #64748b 85%, #334155 100%);
  --metal-clamp: linear-gradient(180deg, #94a3b8 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #64748b 100%);
  --metal-tray: linear-gradient(180deg, #cbd5e1 0%, #f1f5f9 35%, #94a3b8 70%, #64748b 100%);
}

.easel-stage,
.easel-stage *,
.easel-stage *::before,
.easel-stage *::after {
  box-sizing: border-box;
}

/* Studio Background Environment */
.easel-stage {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: clamp(12px, 2vh, 26px) clamp(10px, 3vw, 20px) clamp(30px, 6vh, 70px);
  user-select: none;
  background: transparent !important;
  overflow-x: hidden;
}

.software-vision-environment {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: transparent !important;
}

.watermark-bg:has(.software-vision-environment) {
  background-color: #f8fafc !important;
}

.watermark-bg:has(.software-vision-environment)::before {
  opacity: 0.18 !important;
  display: block !important;
}

/* Demo Header (Title & Description above Whiteboard) */
.easel-header {
  position: relative;
  z-index: 15;
  text-align: center;
  max-width: min(680px, 92vw);
  margin: 0 auto clamp(8px, 1.8vh, 16px);
  padding: 0 clamp(8px, 2vw, 16px);
  animation: headerEntrance 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.easel-header__badge {
  display: inline-block;
  padding: clamp(3px, 0.8vw, 4px) clamp(10px, 2vw, 14px);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  font-family: var(--font-ui);
  font-size: clamp(10px, 2vw, 11px);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
  margin-bottom: 6px;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.06);
}

.easel-header__title {
  font-family: var(--font-whiteboard-heading);
  font-size: clamp(20px, 3.8vw, 30px);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin: 0 0 5px 0;
}

.easel-header__description {
  font-family: var(--font-ui);
  font-size: clamp(12.5px, 2.2vw, 14.5px);
  color: #64748b;
  line-height: 1.45;
  margin: 0;
}

.easel-stage__backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.easel-stage__wall-light {
  position: absolute;
  inset: 0 0 25% 0;
  background: radial-gradient(ellipse 65% 55% at 50% 32%, #ffffff 0%, #f1f5f9 45%, #e2e8f0 85%, #cbd5e1 100%);
}

.easel-stage__floor-horizon {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(70px, 14vh, 120px);
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.25) 30%, rgba(148, 163, 184, 0.4) 50%, rgba(148, 163, 184, 0.25) 70%, transparent 100%);
}

.easel-stage__floor-surface {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: clamp(70px, 14vh, 120px);
  background: linear-gradient(180deg, #dbe2ea 0%, #cfd8e3 35%, #bfcbd8 100%);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Easel Assembly (Fluid Responsive Container) */
.easel-assembly {
  position: relative;
  z-index: 10;
  width: min(720px, 96vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: clamp(2px, 1vh, 10px);
  animation: easelEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Whiteboard Unit */
.whiteboard-unit {
  position: relative;
  z-index: 20;
  width: min(650px, 100%);
  height: clamp(390px, 58vh, 490px);
  min-height: 380px;
  max-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 clamp(8px, 2vw, 16px) clamp(16px, 3.5vw, 30px) rgba(15, 23, 42, 0.18));
}

/* Top Paper Clamp Mechanism */
.whiteboard-top-clamp {
  position: relative;
  width: 100%;
  height: clamp(30px, 4.5vw, 38px);
  flex: 0 0 clamp(30px, 4.5vw, 38px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 25;
  margin-bottom: -3px;
}

.clamp-cylinder {
  position: relative;
  width: clamp(86px, 18vw, 110px);
  height: clamp(22px, 3.8vw, 28px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.28);
  border-radius: 14px;
}

.clamp-cylinder__body {
  position: relative;
  flex: 1;
  height: 100%;
  background: var(--metal-clamp);
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.9),
    inset 0 -2px 3px rgba(0, 0, 0, 0.35);
  border-top: 1px solid #f8fafc;
  border-bottom: 1px solid #64748b;
}

.clamp-cylinder__groove {
  width: 2px;
  height: 60%;
  background: rgba(51, 65, 85, 0.4);
  box-shadow: 1px 0 0 rgba(255, 255, 255, 0.7);
}

.clamp-cylinder__cap {
  width: clamp(9px, 2vw, 12px);
  height: clamp(20px, 3.5vw, 26px);
  background: linear-gradient(90deg, #64748b, #cbd5e1, #94a3b8);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.8);
}

.clamp-cylinder__cap--left {
  border-radius: 12px 0 0 12px;
}

.clamp-cylinder__cap--right {
  border-radius: 0 12px 12px 0;
}

.clamp-bracket {
  width: clamp(34px, 8vw, 44px);
  height: clamp(6px, 1.2vw, 8px);
  background: var(--metal-dark);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
}

.clamp-horizontal-bar {
  position: relative;
  width: 98%;
  height: clamp(9px, 1.8vw, 12px);
  background: var(--metal-clamp);
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(12px, 3.5vw, 24px);
  box-shadow:
    inset 0 1px 2px #fff,
    0 2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid #94a3b8;
  border-bottom: none;
}

.clamp-screw {
  width: clamp(5px, 1.2vw, 7px);
  height: clamp(5px, 1.2vw, 7px);
  border-radius: 50%;
  background: #64748b;
  box-shadow: inset 1px 1px 1px #000, 0 1px 0 #fff;
}

/* Whiteboard Frame & Writing Surface */
.whiteboard-frame {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  padding: clamp(6px, 1.5vw, 10px);
  background: var(--metal-shine);
  border-radius: clamp(6px, 1.2vw, 8px);
  box-shadow:
    0 12px 32px -4px rgba(15, 23, 42, 0.25),
    0 4px 12px rgba(15, 23, 42, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.9),
    inset 0 -1px 3px rgba(0, 0, 0, 0.35);
  border: 1px solid #94a3b8;
  display: flex;
}

.whiteboard-surface {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: radial-gradient(circle at 45% 25%, #ffffff 0%, #fbfcfd 60%, #f3f5f8 100%);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow:
    inset 0 2px 8px rgba(15, 23, 42, 0.08),
    inset 0 0 0 1px rgba(148, 163, 184, 0.3);
  user-select: text;
}

.whiteboard-sheen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.1) 45%, transparent 60%);
  pointer-events: none;
  z-index: 2;
}

.whiteboard-subtle-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

/* Reading Zone (Fluid scrolling content area) */
.whiteboard__reading-zone {
  position: relative;
  z-index: 5;
  flex: 1 1 auto;
  min-height: 0;
  padding: clamp(12px, 2.8vw, 20px) clamp(12px, 3.5vw, 30px) clamp(6px, 1.5vw, 10px);
  overflow-y: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
  -webkit-overflow-scrolling: touch;
}

.whiteboard__reading-zone::-webkit-scrollbar {
  width: 5px;
}

.whiteboard__reading-zone::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.45);
  border-radius: 3px;
}

.whiteboard__header-row {
  min-height: clamp(28px, 4vw, 38px);
  margin-bottom: clamp(6px, 1.5vw, 12px);
  flex-shrink: 0;
}

.whiteboard__heading {
  font-family: var(--font-whiteboard-heading);
  font-size: clamp(17px, 3.2vw, 27px);
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink-color, #181a1f);
  letter-spacing: -0.015em;
  transition: color 0.25s ease;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
  word-break: break-word;
}

.whiteboard__content-box {
  flex: 1 1 auto;
  min-height: 0;
}

.whiteboard__paragraph {
  font-family: var(--font-marker);
  font-size: clamp(16px, 2.7vw, 23.5px);
  line-height: clamp(1.4, 2.8vw, 1.52);
  color: var(--ink-color, #181a1f);
  white-space: pre-wrap;
  word-break: break-word;
  transition: color 0.25s ease;
  letter-spacing: 0.01em;
}

/* Authentic dry-erase marker cursor */
.whiteboard__marker-cursor {
  display: inline-block;
  width: 3px;
  height: 1.15em;
  margin-left: 3px;
  vertical-align: -0.15em;
  background-color: var(--ink-color, #181a1f);
  border-radius: 1.5px;
  box-shadow: 0 0 4px var(--ink-color, #181a1f);
  animation: marker-blink 0.5s infinite alternate ease-in-out;
}

@keyframes marker-blink {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
    transform: scaleY(0.9);
  }
}

.whiteboard__click-hint {
  margin-top: 6px;
  font-family: var(--font-ui);
  font-size: clamp(9.5px, 1.8vw, 11px);
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  animation: pulse-hint 2s infinite ease-in-out;
}

@keyframes pulse-hint {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
}

/* Navigation Controls (Prev / Counter Jump / Next) */
.whiteboard-nav {
  position: relative;
  z-index: 10;
  height: clamp(44px, 6.5vw, 52px);
  min-height: clamp(44px, 6.5vw, 52px);
  max-height: clamp(44px, 6.5vw, 52px);
  flex: 0 0 clamp(44px, 6.5vw, 52px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px clamp(8px, 2.5vw, 20px) 6px;
  border-top: 1px dashed rgba(148, 163, 184, 0.4);
  background: rgba(248, 250, 252, 0.85);
  backdrop-filter: blur(4px);
  gap: clamp(6px, 1.5vw, 12px);
}

.whiteboard-nav__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(3px, 1vw, 6px);
  min-width: clamp(62px, 12vw, 82px);
  height: clamp(30px, 4.5vw, 34px);
  padding: 0 clamp(6px, 1.5vw, 12px);
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: #1e293b;
  font-family: var(--font-ui);
  font-size: clamp(11.5px, 1.8vw, 13px);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  touch-action: manipulation;
}

.whiteboard-nav__btn:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: #94a3b8;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(15, 23, 42, 0.12);
}

.whiteboard-nav__btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.whiteboard-nav__btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  box-shadow: none;
}

.whiteboard-nav__counter-wrapper {
  position: relative;
}

.whiteboard-nav__counter-btn {
  display: inline-flex;
  align-items: center;
  gap: clamp(4px, 1vw, 6px);
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: clamp(3px, 0.8vw, 4px) clamp(6px, 1.5vw, 10px);
  color: #334155;
  font-family: var(--font-ui);
  font-size: clamp(11.5px, 1.8vw, 13px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.whiteboard-nav__counter-btn:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

.whiteboard-nav__page-badge {
  letter-spacing: 0.04em;
}

/* Topic Jump Dropdown */
.whiteboard-nav__dropdown {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: min(340px, 88vw);
  max-height: min(280px, 46vh);
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  animation: slide-up-dropdown 0.2s ease-out;
}

@keyframes slide-up-dropdown {
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.whiteboard-nav__dropdown-header {
  padding: clamp(8px, 1.5vw, 10px) clamp(10px, 2vw, 14px);
  font-size: clamp(10px, 1.8vw, 11px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.whiteboard-nav__dropdown-list {
  overflow-y: auto;
  max-height: min(230px, 38vh);
  padding: 4px;
  -webkit-overflow-scrolling: touch;
}

.whiteboard-nav__dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 8px 10px;
  background: transparent;
  border: none;
  border-radius: 4px;
  text-align: left;
  font-family: var(--font-ui);
  font-size: clamp(12px, 2vw, 12.8px);
  color: #334155;
  cursor: pointer;
  transition: background 0.15s ease;
  touch-action: manipulation;
}

.whiteboard-nav__dropdown-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.whiteboard-nav__dropdown-item.active {
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 600;
}

.dropdown-item__number {
  min-width: 22px;
  color: #94a3b8;
  font-weight: 500;
}

.dropdown-item__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Marker Shelf & Items (Responsive Tray & Touch Targets) */
.whiteboard-tray {
  position: relative;
  width: min(84%, 580px);
  height: clamp(18px, 3vw, 22px);
  min-height: clamp(18px, 3vw, 22px);
  max-height: clamp(18px, 3vw, 22px);
  flex: 0 0 clamp(18px, 3vw, 22px);
  z-index: 30;
  margin-top: -3px;
  display: flex;
  justify-content: center;
}

.whiteboard-tray__aluminum-shelf {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--metal-tray);
  border-radius: 0 0 4px 4px;
  box-shadow:
    0 4px 10px rgba(15, 23, 42, 0.28),
    inset 0 1px 1px #ffffff,
    inset 0 -2px 3px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #64748b;
  border-top: none;
}

.whiteboard-tray__lip {
  position: absolute;
  top: -4px;
  left: 2px;
  right: 2px;
  height: 5px;
  background: var(--metal-shine);
  border-radius: 2px 2px 0 0;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.15);
  border-top: 1px solid #fff;
}

.whiteboard-tray__endcap {
  position: absolute;
  top: -4px;
  bottom: 0;
  width: clamp(4px, 1vw, 6px);
  background: #475569;
}

.whiteboard-tray__endcap--left {
  left: -1px;
  border-radius: 3px 0 0 3px;
}

.whiteboard-tray__endcap--right {
  right: -1px;
  border-radius: 0 3px 3px 0;
}

.whiteboard-tray__items {
  position: absolute;
  bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 1.6vw, 18px);
}

/* Dry-Erase Marker with Touch Cushion */
.dry-erase-marker {
  position: relative;
  display: flex;
  align-items: center;
  height: clamp(11px, 2vw, 14px);
  width: clamp(46px, 9vw, 82px);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
  touch-action: manipulation;
}

/* Invisible touch expansion cushion for easy tapping on mobile */
.dry-erase-marker::before {
  content: '';
  position: absolute;
  inset: -10px -5px;
  z-index: 1;
}

.dry-erase-marker:hover {
  transform: translateY(-4px) scale(1.06);
}

.dry-erase-marker.active {
  transform: translateY(-3px) scale(1.05);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.45));
}

.dry-erase-marker.active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(4px, 1vw, 6px);
  height: clamp(4px, 1vw, 6px);
  border-radius: 50%;
  background: var(--marker-color);
  box-shadow: 0 0 4px var(--marker-color);
}

.marker__cap {
  width: 28%;
  height: 100%;
  background: var(--cap-color);
  border-radius: 0 3px 3px 0;
  box-shadow: inset 0 2px 2px rgba(255, 255, 255, 0.4), inset 0 -2px 2px rgba(0, 0, 0, 0.4);
}

.marker__barrel {
  flex: 1;
  height: 85%;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #e2e8f0 100%);
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 1px #fff, inset 0 -1px 2px rgba(0, 0, 0, 0.2);
}

.marker__label {
  font-size: clamp(5.5px, 1vw, 7.5px);
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--marker-color);
}

.marker__grip {
  width: 10%;
  height: 90%;
  background: var(--marker-color);
}

.marker__nib {
  width: 8%;
  height: 45%;
  background: var(--marker-color);
  border-radius: 3px 0 0 3px;
}

/* Whiteboard Felt Eraser with Touch Cushion */
.whiteboard-eraser {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: clamp(13px, 2.3vw, 17px);
  width: clamp(40px, 7vw, 58px);
  background: #1e293b;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease;
  overflow: hidden;
  touch-action: manipulation;
}

.whiteboard-eraser::before {
  content: '';
  position: absolute;
  inset: -10px -5px;
  z-index: 1;
}

.whiteboard-eraser:hover {
  transform: translateY(-3px) scale(1.05);
}

.eraser__top-grip {
  height: 30%;
  background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  border-bottom: 1px solid #475569;
}

.eraser__foam {
  height: 38%;
  background: #0f172a;
}

.eraser__felt-bottom {
  height: 32%;
  background: #475569;
  border-radius: 0 0 2px 2px;
}

.eraser__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(5px, 0.9vw, 6.5px);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

/* Easel Legs & Stand (Adaptively Angles on Smaller Screens) */
.easel-stand-under {
  position: relative;
  z-index: 5;
  width: 100%;
  height: clamp(130px, 20vh, 220px);
  min-height: 120px;
  pointer-events: none;
}

.easel-leg--front-left {
  position: absolute;
  top: -12px;
  left: 42%;
  bottom: 8px;
  width: clamp(14px, 2.2vw, 18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: top center;
  transform: rotate(23deg);
}

.easel-leg--front-right {
  position: absolute;
  top: -12px;
  right: 42%;
  bottom: 8px;
  width: clamp(14px, 2.2vw, 18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: top center;
  transform: rotate(-23deg);
}

.easel-leg--rear {
  position: absolute;
  top: -12px;
  left: calc(50% - 6px);
  bottom: clamp(24px, 4.5vh, 38px);
  width: clamp(11px, 1.8vw, 14px);
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: brightness(0.82);
}

.easel-leg--rear .easel-leg__pole {
  width: 100%;
  height: 100%;
  background: var(--metal-dark);
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
}

.easel-leg--rear .easel-leg__rubber-foot {
  position: absolute;
  bottom: 0;
  width: clamp(15px, 2.4vw, 20px);
  height: clamp(12px, 2vw, 16px);
  border-radius: 3px 3px 6px 6px;
  background: #111827;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.easel-leg__mount {
  position: absolute;
  top: 0;
  width: clamp(16px, 2.6vw, 22px);
  height: clamp(10px, 1.8vw, 14px);
  background: var(--metal-shine);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.easel-leg__pole {
  position: absolute;
  top: 0;
  bottom: clamp(15px, 2.5vw, 20px);
  width: 100%;
  background: var(--metal-tube);
  border-radius: 4px;
  box-shadow:
    inset 1px 0 2px rgba(255, 255, 255, 0.8),
    inset -1px 0 2px rgba(0, 0, 0, 0.3),
    2px 4px 8px rgba(0, 0, 0, 0.25);
}

.easel-leg__clamp {
  position: absolute;
  top: 48%;
  width: clamp(16px, 2.6vw, 22px);
  height: clamp(9px, 1.5vw, 12px);
  border-radius: 2px;
  background: linear-gradient(180deg, #475569 0%, #1e293b 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
  border: 1px solid #64748b;
}

.easel-leg__rubber-foot {
  position: absolute;
  bottom: 0;
  width: clamp(18px, 3.2vw, 26px);
  height: clamp(17px, 3vw, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rubber-foot__collar {
  width: clamp(16px, 2.6vw, 22px);
  height: clamp(4px, 0.8vw, 6px);
  background: var(--metal-tube);
  border-radius: 2px 2px 0 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.rubber-foot__tip {
  width: clamp(18px, 3.2vw, 26px);
  height: clamp(13px, 2.2vw, 18px);
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, #1f2937 0%, #030712 100%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.5);
  border-top: 1px solid #374151;
}





/* ==========================================================================
   MULTI-DEVICE MEDIA QUERIES & BREAKPOINTS
   ========================================================================== */

/* 1. Large Monitors / 4K / Ultrawide (1440px+) */
@media (min-width: 1440px) {
  .easel-assembly {
    width: min(780px, 85vw);
  }
  .whiteboard-unit {
    width: min(720px, 100%);
    height: 520px;
    max-height: 540px;
  }
  .whiteboard__heading {
    font-size: 29px;
  }
  .whiteboard__paragraph {
    font-size: 25px;
  }
  .whiteboard-nav__btn {
    min-width: 88px;
    height: 36px;
    font-size: 13.5px;
  }
  .whiteboard-nav__counter-btn {
    padding: 5px 12px;
    font-size: 13.5px;
  }
}

/* 2. Tablets & Small Desktops (769px to 1024px) */
@media (max-width: 1024px) {
  .easel-assembly {
    width: min(700px, 94vw);
  }
  .whiteboard-unit {
    height: clamp(420px, 58vh, 480px);
  }
}

/* 3. Tablets in Portrait (600px to 768px) */
@media (max-width: 768px) {
  .easel-stage {
    padding: clamp(10px, 2vh, 18px) 12px clamp(24px, 5vh, 50px);
  }
  .easel-assembly {
    width: min(640px, 96vw);
    margin-top: 4px;
  }
  .whiteboard-unit {
    width: 100%;
    height: clamp(400px, 56vh, 470px);
  }
  .whiteboard-tray {
    width: 90%;
  }
  .easel-leg--front-left {
    left: 44%;
    transform: rotate(18deg);
  }
  .easel-leg--front-right {
    right: 44%;
    transform: rotate(-18deg);
  }
}

/* 4. Smartphones & Compact Screens (<= 480px) */
@media (max-width: 480px) {
  .easel-stage {
    padding: 8px 8px 24px;
    justify-content: flex-start;
  }
  .easel-header {
    margin-bottom: 8px;
    padding: 0 6px;
  }
  .easel-header__badge {
    padding: 3px 10px;
    font-size: 10px;
    margin-bottom: 4px;
  }
  .easel-header__title {
    font-size: clamp(18px, 5.2vw, 22px);
    margin-bottom: 3px;
  }
  .easel-header__description {
    font-size: 12px;
    line-height: 1.35;
  }
  .easel-assembly {
    width: 100%;
    margin-top: 0;
  }
  .whiteboard-unit {
    width: 100%;
    height: clamp(380px, 58dvh, 450px);
    min-height: 360px;
  }
  .whiteboard-frame {
    padding: 6px;
    border-radius: 6px;
  }
  .whiteboard__reading-zone {
    padding: 10px 12px 6px;
  }
  .whiteboard__header-row {
    min-height: 26px;
    margin-bottom: 6px;
  }
  .whiteboard__heading {
    font-size: clamp(16px, 4.4vw, 20px);
    line-height: 1.25;
  }
  .whiteboard__paragraph {
    font-size: clamp(15px, 4.2vw, 18px);
    line-height: 1.42;
  }
  .whiteboard-nav {
    height: 44px;
    min-height: 44px;
    max-height: 44px;
    padding: 4px 8px;
    gap: 6px;
  }
  .whiteboard-nav__btn {
    min-width: 60px;
    height: 30px;
    padding: 0 8px;
    font-size: 11.5px;
    gap: 4px;
  }
  .whiteboard-nav__counter-btn {
    padding: 4px 7px;
    font-size: 11px;
    gap: 4px;
  }
  .whiteboard-tray {
    width: 96%;
    height: 19px;
    min-height: 19px;
  }
  .whiteboard-tray__items {
    bottom: 3px;
    gap: clamp(4px, 1.8vw, 8px);
  }
  .dry-erase-marker {
    width: clamp(42px, 11vw, 54px);
    height: 12px;
  }
  .whiteboard-eraser {
    width: clamp(38px, 9vw, 44px);
    height: 14px;
  }
  .easel-stand-under {
    height: clamp(110px, 18vh, 150px);
    min-height: 100px;
  }
  .easel-leg--front-left {
    left: 45%;
    transform: rotate(14deg);
  }
  .easel-leg--front-right {
    right: 45%;
    transform: rotate(-14deg);
  }
}

/* 5. Very Narrow Devices & Small Foldables (<= 360px - e.g. iPhone SE, Galaxy Fold Cover) */
@media (max-width: 360px) {
  .easel-stage {
    padding: 6px 4px 18px;
  }
  .easel-header__title {
    font-size: 17px;
  }
  .easel-header__description {
    font-size: 11px;
  }
  .whiteboard-unit {
    height: 370px;
    min-height: 350px;
  }
  .whiteboard__reading-zone {
    padding: 8px 10px 4px;
  }
  .whiteboard__heading {
    font-size: 15.5px;
  }
  .whiteboard__paragraph {
    font-size: 14.5px;
    line-height: 1.38;
  }
  .whiteboard-nav {
    padding: 3px 6px;
    gap: 4px;
  }
  .whiteboard-nav__btn {
    min-width: 52px;
    height: 28px;
    padding: 0 6px;
    font-size: 10.5px;
  }
  .whiteboard-nav__btn span {
    display: inline-block;
  }
  .whiteboard-nav__counter-btn {
    padding: 3px 5px;
    font-size: 10px;
  }
  .dry-erase-marker {
    width: 38px;
    height: 11px;
  }
  .marker__label {
    display: none;
  }
  .whiteboard-eraser {
    width: 34px;
    height: 13px;
  }
  .eraser__text {
    font-size: 5px;
  }
  .easel-leg--front-left {
    left: 46%;
    transform: rotate(11deg);
  }
  .easel-leg--front-right {
    right: 46%;
    transform: rotate(-11deg);
  }
}

/* 6. Mobile Landscape Mode (Phone turned sideways: height <= 500px) */
@media (max-height: 520px) and (orientation: landscape) {
  .easel-stage {
    min-height: 100vh;
    padding: 6px 12px 18px;
    justify-content: flex-start;
  }
  .easel-header {
    margin-bottom: 4px;
    padding: 0;
  }
  .easel-header__badge {
    display: none;
  }
  .easel-header__title {
    font-size: 16px;
    margin: 0;
  }
  .easel-header__description {
    display: none;
  }
  .easel-assembly {
    width: min(580px, 94vw);
    margin-top: 2px;
  }
  .whiteboard-unit {
    height: clamp(260px, 72dvh, 340px);
    min-height: 240px;
  }
  .whiteboard-top-clamp {
    height: 26px;
    flex: 0 0 26px;
  }
  .clamp-cylinder {
    height: 20px;
    width: 80px;
  }
  .whiteboard__reading-zone {
    padding: 8px 14px 4px;
  }
  .whiteboard__heading {
    font-size: 16px;
  }
  .whiteboard__paragraph {
    font-size: 14.5px;
    line-height: 1.35;
  }
  .whiteboard-nav {
    height: 38px;
    min-height: 38px;
    max-height: 38px;
    padding: 2px 8px;
  }
  .whiteboard-nav__btn {
    height: 28px;
    font-size: 11px;
  }
  .whiteboard-nav__counter-btn {
    padding: 3px 6px;
    font-size: 11px;
  }
  .easel-stand-under {
    height: 85px;
    min-height: 75px;
  }
  .easel-leg--front-left {
    transform: rotate(17deg);
  }
  .easel-leg--front-right {
    transform: rotate(-17deg);
  }
}

/* Reload Wipe Animation */
.whiteboard-wipe-overlay {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: auto;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.wipe-overlay__gleam {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0%;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(241, 245, 249, 0.85) 60%,
      rgba(255, 255, 255, 0.4) 95%,
      transparent 100%);
  box-shadow: 6px 0 24px rgba(255, 255, 255, 0.95);
  animation: gleamSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  pointer-events: none;
}

.wipe-overlay__tool {
  position: absolute;
  top: 40%;
  left: -140px;
  transform: translateY(-50%) rotate(-4deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 35;
  filter: drop-shadow(0 12px 20px rgba(15, 23, 42, 0.38));
  animation: eraserSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  pointer-events: none;
}

.wipe-tool__body {
  position: relative;
  width: clamp(78px, 16vw, 104px);
  height: clamp(34px, 7vw, 46px);
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-radius: 8px 8px 3px 3px;
  border: 1px solid #334155;
  border-bottom: 2px solid #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.28),
    inset 0 -2px 4px rgba(0, 0, 0, 0.6);
}

.wipe-tool__felt {
  width: clamp(82px, 17vw, 108px);
  height: clamp(8px, 1.8vw, 12px);
  background: repeating-linear-gradient(90deg, #475569, #334155 3px, #475569 6px);
  border-radius: 0 0 5px 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.45);
  border-top: 1px solid #1e293b;
}

.wipe-tool__brand {
  font-family: var(--font-ui);
  font-size: clamp(9px, 1.8vw, 11px);
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}

.wipe-tool__label {
  font-family: var(--font-ui);
  font-size: clamp(6.5px, 1.3vw, 8px);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  padding: 1px 4px;
  border-radius: 3px;
}

.wipe-overlay__badge {
  position: absolute;
  bottom: clamp(14px, 3vh, 22px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 4px clamp(10px, 2.5vw, 14px);
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(8px);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  font-family: var(--font-ui);
  font-size: clamp(10px, 2vw, 11.5px);
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
  animation: badgeFade 0.85s ease forwards;
  pointer-events: none;
  white-space: nowrap;
}

.wipe-badge__icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
  animation: badgePulse 0.5s infinite alternate;
}

/* Keyframes */
@keyframes eraserSweep {
  0% {
    left: -140px;
    opacity: 0;
    transform: translateY(-50%) rotate(-7deg) scale(0.92);
  }
  14% {
    opacity: 1;
    transform: translateY(-50%) rotate(-3deg) scale(1);
  }
  85% {
    opacity: 1;
    transform: translateY(-50%) rotate(2deg) scale(1);
  }
  100% {
    left: calc(100% + 70px);
    opacity: 0;
    transform: translateY(-50%) rotate(5deg) scale(0.95);
  }
}

@keyframes gleamSweep {
  0% {
    width: 0%;
    opacity: 0.95;
  }
  65% {
    width: 88%;
    opacity: 0.9;
  }
  90% {
    width: 100%;
    opacity: 0.4;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}

@keyframes badgeFade {
  0% {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -6px);
  }
}

@keyframes badgePulse {
  0% {
    transform: scale(0.85);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.25);
    opacity: 1;
  }
}

@keyframes headerEntrance {
  0% {
    opacity: 0;
    transform: translateY(-14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes easelEntrance {
  0% {
    opacity: 0;
    transform: translateY(22px) scale(0.985);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .easel-stage,
  .easel-stage *,
  .easel-stage *::before,
  .easel-stage *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

const INK_COLORS = [
  { id: 'black', name: 'Charcoal Black', hex: '#181a1f', capColor: '#1e232a' },
  { id: 'blue', name: 'Royal Blue', hex: '#1d4ed8', capColor: '#2563eb' },
  { id: 'red', name: 'Crimson Red', hex: '#dc2626', capColor: '#ef4444' },
  { id: 'green', name: 'Forest Green', hex: '#15803d', capColor: '#16a34a' },
]

function WhiteboardReading({ paragraph = { heading: '', content: '' }, animate, inkColor, isWiping }) {
  const safeHeading = paragraph?.heading || ''
  const safeContent = paragraph?.content || ''
  const [displayedHeading, setDisplayedHeading] = useState('')
  const [displayedContent, setDisplayedContent] = useState('')
  const [writingStage, setWritingStage] = useState(animate && !isWiping ? 'heading' : 'done')

  const readingAreaRef = useRef(null)
  const isCancelledRef = useRef(false)
  const timeoutRef = useRef(null)

  const completeImmediately = useCallback(() => {
    if (writingStage === 'done' || isWiping) return
    isCancelledRef.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDisplayedHeading(safeHeading)
    setDisplayedContent(safeContent)
    setWritingStage('done')
  }, [safeHeading, safeContent, writingStage, isWiping])

  useEffect(() => {
    if (isWiping || !animate) return

    isCancelledRef.current = false

    const headingText = safeHeading
    const contentText = safeContent

    let hIdx = 0
    let cIdx = 0

    function typeHeadingChar() {
      if (isCancelledRef.current) return
      hIdx++
      setDisplayedHeading(headingText.slice(0, hIdx))

      if (hIdx < headingText.length) {
        timeoutRef.current = setTimeout(typeHeadingChar, 18)
      } else {
        setWritingStage('content')
        timeoutRef.current = setTimeout(typeContentChar, 70)
      }
    }

    function typeContentChar() {
      if (isCancelledRef.current) return
      cIdx++
      setDisplayedContent(contentText.slice(0, cIdx))

      if (readingAreaRef.current) {
        readingAreaRef.current.scrollTop = readingAreaRef.current.scrollHeight
      }

      if (cIdx < contentText.length) {
        const char = contentText[cIdx - 1]
        let delay = 9
        if (char === '.' || char === '?' || char === '!') {
          delay = 45
        } else if (char === ',' || char === ';') {
          delay = 25
        }
        timeoutRef.current = setTimeout(typeContentChar, delay)
      } else {
        setWritingStage('done')
      }
    }

    timeoutRef.current = setTimeout(typeHeadingChar, 30)

    return () => {
      isCancelledRef.current = true
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [paragraph, animate, isWiping, safeHeading, safeContent])

  const currentInk = INK_COLORS.find(c => c.id === inkColor) || INK_COLORS[0]
  const renderedHeading = isWiping ? '' : (animate ? displayedHeading : safeHeading)
  const renderedContent = isWiping ? '' : (animate ? displayedContent : safeContent)
  const isTyping = !isWiping && animate && writingStage !== 'done'

  return (
    <div
      className="whiteboard__reading-zone"
      ref={readingAreaRef}
      onClick={completeImmediately}
      title={isTyping ? 'Click to show all text' : undefined}
      style={{ '--ink-color': currentInk.hex }}
    >
      <div className="whiteboard__header-row">
        <h2 className="whiteboard__heading">
          {renderedHeading}
          {!isWiping && writingStage === 'heading' && <span className="whiteboard__marker-cursor" aria-hidden="true" />}
        </h2>
      </div>

      <div className="whiteboard__content-box">
        <p className="whiteboard__paragraph">
          {renderedContent}
          {!isWiping && writingStage === 'content' && <span className="whiteboard__marker-cursor" aria-hidden="true" />}
        </p>
      </div>

      {isTyping && (
        <div className="whiteboard__click-hint" aria-hidden="true">
          <span>Click board to reveal instantly</span>
        </div>
      )}
    </div>
  )
}

export default function SoftwareVisionPage() {
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [inkColor, setInkColor] = useState('black')
  const [showTopicList, setShowTopicList] = useState(false)
  const [isWiping, setIsWiping] = useState(true)

  const currentParagraph = classroomParagraphs[paragraphIndex] || { heading: '', content: '' }

  // Trigger reload wipe animation on initial page load / mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWiping(false)
      setAnimate(true)
    }, 850)
    return () => clearTimeout(timer)
  }, [])

  const handlePrev = useCallback(() => {
    setIsWiping(false)
    setAnimate(true)
    setParagraphIndex((index) => Math.max(0, index - 1))
    setShowTopicList(false)
  }, [])

  const handleNext = useCallback(() => {
    setIsWiping(false)
    setAnimate(true)
    setParagraphIndex((index) => Math.min(Math.max(0, classroomParagraphs.length - 1), index + 1))
    setShowTopicList(false)
  }, [])

  const handleReplay = useCallback(() => {
    setIsWiping(true)
    setAnimate(false)
    setTimeout(() => {
      setIsWiping(false)
      setAnimate(true)
    }, 850)
  }, [])

  const handleSkipWipe = useCallback(() => {
    setIsWiping(false)
    setAnimate(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        if (paragraphIndex < classroomParagraphs.length - 1) handleNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        if (paragraphIndex > 0) handlePrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setIsWiping(false)
        setAnimate(true)
        setParagraphIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setIsWiping(false)
        setAnimate(true)
        setParagraphIndex(classroomParagraphs.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paragraphIndex, handleNext, handlePrev])

  return (
    <main className="easel-stage software-vision-environment w-full" aria-label="Easel Whiteboard Presentation">
      {/* Self-contained whiteboard styles - full multi-device responsive design */}
      <style dangerouslySetInnerHTML={{ __html: whiteboardStyles }} />

      {/* NavPageHeader with unified design */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20 mb-2 sm:mb-4">
        <NavPageHeader
          title="Software Vision"
          description="Explore our vision for a more informed, security-conscious digital world where people can better understand and respond to online risks across 50 interactive whiteboard chapters."
        />
      </div>

      {/* Presentation Easel Assembly */}
      <div className="easel-assembly">
        {/* Whiteboard Board Unit (Elevated on the stand, completely clean & unobstructed) */}
        <section className="whiteboard-unit" aria-label="Whiteboard presentation board">
          {/* Top Paper Clamp Mechanism (Matches reference photo) */}
          <div className="whiteboard-top-clamp" aria-hidden="true">
            <div className="clamp-cylinder">
              <span className="clamp-cylinder__cap clamp-cylinder__cap--left" />
              <div className="clamp-cylinder__body">
                <span className="clamp-cylinder__groove" />
                <span className="clamp-cylinder__groove" />
                <span className="clamp-cylinder__groove" />
              </div>
              <span className="clamp-cylinder__cap clamp-cylinder__cap--right" />
            </div>
            <div className="clamp-bracket" />
            <div className="clamp-horizontal-bar">
              <span className="clamp-screw clamp-screw--left" />
              <span className="clamp-screw clamp-screw--right" />
            </div>
          </div>

          {/* Whiteboard Frame & Writing Surface */}
          <div className="whiteboard-frame">
            <div className="whiteboard-surface">
              {/* Glossy ambient reflection sheen */}
              <div className="whiteboard-sheen" aria-hidden="true" />
              <div className="whiteboard-subtle-glow" aria-hidden="true" />

              {/* Whiteboard Reload / Clean Wipe Animation Overlay */}
              {isWiping && (
                <div
                  className="whiteboard-wipe-overlay"
                  onClick={handleSkipWipe}
                  title="Click to reveal immediately"
                  aria-hidden="true"
                >
                  <div className="wipe-overlay__gleam" />
                  <div className="wipe-overlay__tool">
                    <div className="wipe-tool__felt" />
                    <div className="wipe-tool__body">
                      <span className="wipe-tool__brand">EXPO</span>
                      <span className="wipe-tool__label">CLEAN</span>
                    </div>
                  </div>
                  <div className="wipe-overlay__badge">
                    <span className="wipe-badge__icon" />
                    <span>Preparing Whiteboard...</span>
                  </div>
                </div>
              )}

              {/* Whiteboard Content Area */}
              <WhiteboardReading
                key={paragraphIndex}
                paragraph={currentParagraph}
                animate={animate}
                inkColor={inkColor}
                isWiping={isWiping}
              />

              <span className="sr-only" aria-live="polite">
                {currentParagraph.heading} - {currentParagraph.content}
              </span>

              {/* Bottom Navigation Toolbar */}
              <nav className="whiteboard-nav" aria-label="Topic navigation">
                <button
                  type="button"
                  className="whiteboard-nav__btn"
                  onClick={handlePrev}
                  disabled={paragraphIndex === 0}
                  aria-label="Previous Topic"
                  title="Previous topic (Left Arrow)"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Prev</span>
                </button>

                <div className="whiteboard-nav__counter-wrapper">
                  <button
                    type="button"
                    className="whiteboard-nav__counter-btn"
                    onClick={() => setShowTopicList(!showTopicList)}
                    aria-expanded={showTopicList}
                    aria-label={`Topic ${paragraphIndex + 1} of ${classroomParagraphs.length}. Click to select topic.`}
                    title="Click to jump to a specific topic"
                  >
                    <span className="whiteboard-nav__page-badge">
                      {classroomParagraphs.length > 0 ? `${paragraphIndex + 1} / ${classroomParagraphs.length}` : '0 / 0'}
                    </span>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Topic Jump Dropdown */}
                  {showTopicList && (
                    <div className="whiteboard-nav__dropdown">
                      <div className="whiteboard-nav__dropdown-header">Select Vision Topic</div>
                      <div className="whiteboard-nav__dropdown-list">
                        {classroomParagraphs.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`whiteboard-nav__dropdown-item ${idx === paragraphIndex ? 'active' : ''}`}
                            onClick={() => {
                              setAnimate(true)
                              setParagraphIndex(idx)
                              setShowTopicList(false)
                            }}
                          >
                            <span className="dropdown-item__number">{idx + 1}.</span>
                            <span className="dropdown-item__title">{item.heading}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="whiteboard-nav__btn"
                  onClick={handleNext}
                  disabled={classroomParagraphs.length === 0 || paragraphIndex >= classroomParagraphs.length - 1}
                  aria-label="Next Topic"
                  title="Next topic (Right Arrow)"
                >
                  <span>Next</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>

          {/* Metallic Pen & Marker Tray (Mounted at bottom edge of board) */}
          <div className="whiteboard-tray" aria-label="Dry-erase marker tray">
            <div className="whiteboard-tray__aluminum-shelf">
              <span className="whiteboard-tray__lip" />
              <span className="whiteboard-tray__endcap whiteboard-tray__endcap--left" />
              <span className="whiteboard-tray__endcap whiteboard-tray__endcap--right" />

              {/* Markers & Eraser on the tray */}
              <div className="whiteboard-tray__items">
                {INK_COLORS.map((ink) => (
                  <button
                    key={ink.id}
                    type="button"
                    className={`dry-erase-marker ${inkColor === ink.id ? 'active' : ''}`}
                    onClick={() => setInkColor(ink.id)}
                    title={`Use ${ink.name} dry-erase marker`}
                    aria-label={`Select ${ink.name} ink`}
                    style={{ '--marker-color': ink.hex, '--cap-color': ink.capColor }}
                  >
                    <span className="marker__nib" />
                    <span className="marker__grip" />
                    <span className="marker__barrel">
                      <span className="marker__label">EXPO</span>
                    </span>
                    <span className="marker__cap" />
                  </button>
                ))}

                {/* Felt Whiteboard Eraser */}
                <button
                  type="button"
                  className="whiteboard-eraser"
                  onClick={handleReplay}
                  title="Wipe & Rewrite topic"
                  aria-label="Wipe and rewrite topic"
                >
                  <span className="eraser__top-grip" />
                  <span className="eraser__foam" />
                  <span className="eraser__felt-bottom" />
                  <span className="eraser__text">ERASER</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Easel Stand Structure: STRICTLY UNDER AND BEHIND THE BOARD */}
        <div className="easel-stand-under" aria-hidden="true">
          {/* Rear Leg (Tripod back support, extending down to floor) */}
          <div className="easel-leg easel-leg--rear">
            <span className="easel-leg__pole" />
            <span className="easel-leg__rubber-foot">
              <span className="rubber-foot__collar" />
              <span className="rubber-foot__tip" />
            </span>
          </div>

          {/* Front Left Leg: Angled outward to the left below the board */}
          <div className="easel-leg easel-leg--front-left">
            <span className="easel-leg__mount" />
            <span className="easel-leg__pole" />
            <span className="easel-leg__clamp" />
            <span className="easel-leg__rubber-foot">
              <span className="rubber-foot__collar" />
              <span className="rubber-foot__tip" />
            </span>
          </div>

          {/* Front Right Leg: Angled outward to the right below the board */}
          <div className="easel-leg easel-leg--front-right">
            <span className="easel-leg__mount" />
            <span className="easel-leg__pole" />
            <span className="easel-leg__clamp" />
            <span className="easel-leg__rubber-foot">
              <span className="rubber-foot__collar" />
              <span className="rubber-foot__tip" />
            </span>
          </div>

        </div>
      </div>
    </main>
  )
}

export { SoftwareVisionPage, SoftwareVisionPage as WhiteBoardPage }
