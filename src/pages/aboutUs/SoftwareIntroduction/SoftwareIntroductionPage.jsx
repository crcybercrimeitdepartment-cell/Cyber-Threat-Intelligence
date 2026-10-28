import React, { useState, useEffect, useRef, useCallback } from 'react'
import { classroomParagraphs } from './SoftwareIntroductionPageData'
import NavPageHeader from '../../../components/NavPageHeader'

// Synthesized Vintage TV Web Audio FX (pure Web Audio API, zero dependencies)
class VintageAudio {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playKnobClick() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(360, now)
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.045)
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.045)
    } catch {
      // Audio error suppressed safely
    }
  }

  playPowerClick(turnOn) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      // Heavy mechanical switch thunk
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'square'
      osc1.frequency.setValueAtTime(turnOn ? 180 : 120, now)
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.07)
      gain1.gain.setValueAtTime(0.3, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.07)

      // Cathode ray tube flyback coil whine / warm up hum
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'sine'
      if (turnOn) {
        osc2.frequency.setValueAtTime(100, now + 0.02)
        osc2.frequency.exponentialRampToValueAtTime(14000, now + 0.28)
        gain2.gain.setValueAtTime(0.08, now + 0.02)
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      } else {
        osc2.frequency.setValueAtTime(12000, now)
        osc2.frequency.exponentialRampToValueAtTime(40, now + 0.2)
        gain2.gain.setValueAtTime(0.09, now)
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
      }
      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)
      osc2.start(now)
      osc2.stop(now + 0.3)
    } catch {
      // Audio error suppressed safely
    }
  }

  playStaticNoise() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.14)
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.18
      }
      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 2200
      const gain = this.ctx.createGain()
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14)
      noise.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)
      noise.start()
    } catch {
      // Audio error suppressed safely
    }
  }
}

const audioFX = new VintageAudio()

const CRT_THEMES = [
  { id: 'classic', name: 'Warm White Phosphor', label: 'MONO' },
  { id: 'green', name: 'Matrix Green Phosphor', label: 'GREEN' },
  { id: 'amber', name: 'Retro Amber CRT', label: 'AMBER' },
  { id: 'cyan', name: 'Sci-Fi Cyan CRT', label: 'CYAN' },
]

export default function TVPage() {
  const [power, setPower] = useState(true)
  const [powerState, setPowerState] = useState('turning-on') // 'on', 'turning-off', 'off', 'turning-on'
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [isChangingChannel, setIsChangingChannel] = useState(false)
  const [themeIndex, setThemeIndex] = useState(0)
  const [knob1Angle, setKnob1Angle] = useState(0)
  const [knob2Angle, setKnob2Angle] = useState(0)
  const [knob3Angle, setKnob3Angle] = useState(0)
  const [soundMuted, setSoundMuted] = useState(false)

  const screenRef = useRef(null)

  const currentTheme = CRT_THEMES[themeIndex]
  const currentParagraph = classroomParagraphs[paragraphIndex] || classroomParagraphs[0] || { heading: '', content: '' }

  // Synchronize audio mute state
  useEffect(() => {
    audioFX.enabled = !soundMuted
  }, [soundMuted])

  // Trigger CRT power-on animation on initial page load / reload
  useEffect(() => {
    try {
      audioFX.playPowerClick(true)
    } catch {
      // Audio autoplay policy handled safely
    }

    const timer = setTimeout(() => {
      setPowerState('on')
    }, 550)

    return () => clearTimeout(timer)
  }, [])

  // Handle Power Toggle with authentic CRT collapse animation
  const handleTogglePower = useCallback(() => {
    if (powerState === 'turning-off' || powerState === 'turning-on') return

    if (power) {
      // Turn Off: Play collapse sequence
      audioFX.playPowerClick(false)
      setPowerState('turning-off')
      setTimeout(() => {
        setPower(false)
        setPowerState('off')
      }, 450)
    } else {
      // Turn On: Play power up sequence
      audioFX.playPowerClick(true)
      setPower(true)
      setPowerState('turning-on')
      setTimeout(() => {
        setPowerState('on')
      }, 550)
    }
  }, [power, powerState])

  // Handle Next button click (Top right knob)
  const handleNext = () => {
    if (!power || powerState !== 'on') return
    if (paragraphIndex >= classroomParagraphs.length - 1) return

    audioFX.playKnobClick()
    audioFX.playStaticNoise()
    setKnob1Angle((prev) => prev + 30)
    setIsChangingChannel(true)

    setParagraphIndex((prev) => Math.min(classroomParagraphs.length - 1, prev + 1))

    setTimeout(() => {
      setIsChangingChannel(false)
    }, 180)
  }

  // Handle Previous button click (Second right knob)
  const handlePrev = () => {
    if (!power || powerState !== 'on') return
    if (paragraphIndex <= 0) return

    audioFX.playKnobClick()
    audioFX.playStaticNoise()
    setKnob2Angle((prev) => prev - 30)
    setIsChangingChannel(true)

    setParagraphIndex((prev) => Math.max(0, prev - 1))

    setTimeout(() => {
      setIsChangingChannel(false)
    }, 180)
  }

  // Handle Theme / Color Tint Knob (Third right knob)
  const handleCycleTheme = () => {
    if (!power || powerState !== 'on') return
    audioFX.playKnobClick()
    setKnob3Angle((prev) => prev + 45)
    setThemeIndex((prev) => (prev + 1) % CRT_THEMES.length)
  }

  // Handle Sound / Mute toggle
  const handleToggleSound = () => {
    const nextMuted = !soundMuted
    setSoundMuted(nextMuted)
    if (!nextMuted) {
      audioFX.enabled = true
      audioFX.playKnobClick()
    }
  }

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        if (!power || powerState !== 'on') return
        audioFX.playKnobClick()
        audioFX.playStaticNoise()
        setKnob1Angle((prev) => prev + 30)
        setIsChangingChannel(true)
        setParagraphIndex((prev) => Math.min(classroomParagraphs.length - 1, prev + 1))
        setTimeout(() => setIsChangingChannel(false), 180)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        if (!power || powerState !== 'on') return
        audioFX.playKnobClick()
        audioFX.playStaticNoise()
        setKnob2Angle((prev) => prev - 30)
        setIsChangingChannel(true)
        setParagraphIndex((prev) => Math.max(0, prev - 1))
        setTimeout(() => setIsChangingChannel(false), 180)
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        handleTogglePower()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [power, powerState, handleTogglePower])

  // Scroll screen content back to top when channel changes
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = 0
    }
  }, [paragraphIndex])

  return (
    <div className="retro-environment">
      {/* Complete embedded CSS stylesheet inside the JSX file */}
      <style>{`
        .retro-environment *, .retro-environment *::before, .retro-environment *::after {
          box-sizing: border-box;
        }

        .watermark-bg:has(.retro-environment) {
          background-color: #f8fafc !important;
        }

        .watermark-bg:has(.retro-environment)::before {
          opacity: 0.18 !important;
          display: block !important;
        }

        /* Room Environment */
        .retro-environment {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: radial-gradient(circle at 45% 35%, rgba(244, 238, 226, 0.72) 0%, rgba(235, 227, 213, 0.76) 60%, rgba(222, 211, 193, 0.80) 100%);
          padding: clamp(12px, 2.5vh, 28px) clamp(8px, 2.5vw, 24px) clamp(24px, 4vh, 48px);
          overflow-x: hidden;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .room-wall {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 40% 25%, rgba(255, 255, 255, 0.20) 0%, transparent 65%),
            linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.04) 100%);
          pointer-events: none;
        }

        /* Top Page Header */
        .page-header {
          position: relative;
          z-index: 20;
          text-align: center;
          max-width: 720px;
          width: 100%;
          margin: clamp(8px, 1.8vh, 22px) auto clamp(20px, 3vh, 38px);
          padding: 0 clamp(8px, 2vw, 16px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 14px;
          border-radius: 20px;
          background: rgba(135, 87, 49, 0.12);
          border: 1px solid rgba(135, 87, 49, 0.28);
          color: #6e4321;
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(10px, 1.2vw, 12px);
          letter-spacing: 0.12em;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e65c00;
          box-shadow: 0 0 6px #e65c00;
          animation: badge-pulse 1.8s infinite ease-in-out;
        }

        @keyframes badge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }

        .header-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(24px, 3.4vw, 38px);
          font-weight: 700;
          color: #2b231d;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 10px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85);
        }

        .header-description {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(13px, 1.55vw, 15.5px);
          color: #5c5044;
          line-height: 1.55;
          max-width: 600px;
          margin: 0 auto;
        }

        /* TV Stage / Assembly Layout */
        .tv-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(840px, 94vw);
          margin-top: clamp(40px, 5vh, 60px);
          z-index: 10;
        }

        /* Telescopic Metallic Antenna (Side-mounted and angled outward to the right) */
        .tv-antenna {
          position: absolute;
          top: clamp(-85px, -11vh, -110px);
          right: clamp(16px, 4%, 38px);
          width: 12px;
          height: clamp(90px, 12vh, 120px);
          pointer-events: none;
          z-index: 5;
          transform: rotate(22deg);
          transform-origin: bottom center;
        }

        .antenna-base {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 10px;
          background: linear-gradient(90deg, #444, #888 40%, #ccc 60%, #333 100%);
          border-radius: 4px 4px 1px 1px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        .antenna-rod {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 3.5px;
          height: 100%;
          background: linear-gradient(90deg, #999, #f0f0f0 45%, #777 90%, #555 100%);
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
          border-radius: 2px;
        }

        .antenna-segment.segment-1 {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 55%;
        }

        .antenna-segment.segment-2 {
          position: absolute;
          bottom: 53%;
          width: 75%;
          left: 12.5%;
          height: 48%;
          background: linear-gradient(90deg, #aaa, #fff 50%, #777 100%);
        }

        .antenna-tip-ball {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #fff 0%, #bbb 50%, #444 100%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
        }

        /* TV Outer Cabinet (Caramel Woodgrain finish) */
        .tv-cabinet {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #a37248 0%, #875731 50%, #6e4321 100%);
          border-radius: clamp(14px, 2.2vw, 22px);
          padding: clamp(12px, 1.8vw, 18px);
          box-shadow: 
            0 16px 36px -6px rgba(45, 25, 10, 0.45),
            0 30px 60px -12px rgba(0, 0, 0, 0.35),
            inset 0 2px 4px rgba(255, 230, 190, 0.35),
            inset 0 -3px 6px rgba(30, 15, 5, 0.65),
            inset 2px 0 4px rgba(255, 230, 190, 0.2),
            inset -2px 0 4px rgba(30, 15, 5, 0.5);
          border: 1px solid #583315;
          z-index: 10;
        }

        /* TV Molded Faceplate (Cream / Ivory vintage plastic) */
        .tv-faceplate {
          position: relative;
          background: linear-gradient(180deg, #ece4d4 0%, #ded3c0 60%, #d4c8b3 100%);
          border-radius: clamp(8px, 1.4vw, 14px);
          padding: clamp(10px, 1.5vw, 16px);
          box-shadow: 
            inset 0 3px 6px rgba(255, 255, 255, 0.7),
            inset 0 -3px 8px rgba(0, 0, 0, 0.25),
            inset 2px 0 4px rgba(255, 255, 255, 0.4),
            inset -2px 0 4px rgba(0, 0, 0, 0.2),
            0 1px 3px rgba(0, 0, 0, 0.25);
          border: 1px solid #bfb29c;
        }

        .faceplate-top-groove {
          position: absolute;
          top: 6px;
          left: 20px;
          right: 20px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #b8ab96 20%, #b8ab96 80%, transparent);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        /* TV Main Section: Screen (Left) & Controls (Right) */
        .tv-main-section {
          display: grid;
          grid-template-columns: 1fr clamp(140px, 25%, 195px);
          gap: clamp(10px, 1.8vw, 18px);
          align-items: stretch;
        }

        /* CRT Screen Housing & Bezel */
        .crt-housing {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .crt-outer-bezel {
          position: relative;
          background: linear-gradient(145deg, #d3c7b2 0%, #bcb09c 100%);
          border-radius: clamp(10px, 1.5vw, 16px);
          padding: clamp(8px, 1.2vw, 14px);
          box-shadow: 
            inset 0 2px 5px rgba(255, 255, 255, 0.65),
            inset 0 -2px 6px rgba(0, 0, 0, 0.35),
            0 3px 8px rgba(0, 0, 0, 0.15);
          border: 1px solid #a69a85;
        }

        .crt-inner-bezel {
          position: relative;
          background: #1c1b1a;
          border-radius: clamp(16px, 2.5vw, 24px);
          padding: clamp(6px, 1vw, 10px);
          box-shadow: 
            inset 0 4px 12px rgba(0, 0, 0, 0.8),
            inset 0 -3px 8px rgba(0, 0, 0, 0.6),
            0 1px 2px rgba(255, 255, 255, 0.4);
          border: 2px solid #2e2c28;
        }

        /* Curved CRT Glass Screen Tube */
        .crt-glass-tube {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3.05;
          min-height: clamp(260px, 45vh, 400px);
          border-radius: clamp(20px, 3.2vw, 32px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background-color 0.4s ease, box-shadow 0.4s ease;
          user-select: text;
        }

        /* CRT Color Themes */
        .crt-glass-tube.theme-classic {
          --crt-bg: #111618;
          --crt-fg: #f2f5ea;
          --crt-sub: #b2c2be;
          --crt-glow: rgba(220, 240, 230, 0.55);
          --crt-accent: #8fe0ba;
          background: radial-gradient(ellipse at 50% 48%, #1d2629 0%, #12181a 65%, #0c1012 100%);
          box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.75), 0 0 25px rgba(180, 220, 205, 0.12);
        }

        .crt-glass-tube.theme-green {
          --crt-bg: #091a0e;
          --crt-fg: #46ff78;
          --crt-sub: #27bd50;
          --crt-glow: rgba(70, 255, 120, 0.65);
          --crt-accent: #65ff91;
          background: radial-gradient(ellipse at 50% 48%, #102e19 0%, #081a0e 65%, #040d07 100%);
          box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(50, 230, 95, 0.18);
        }

        .crt-glass-tube.theme-amber {
          --crt-bg: #1c1104;
          --crt-fg: #ffb84d;
          --crt-sub: #c9822a;
          --crt-glow: rgba(255, 175, 55, 0.7);
          --crt-accent: #ffd175;
          background: radial-gradient(ellipse at 50% 48%, #2d1c07 0%, #1b1004 65%, #0e0802 100%);
          box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 160, 40, 0.18);
        }

        .crt-glass-tube.theme-cyan {
          --crt-bg: #091724;
          --crt-fg: #50e4ff;
          --crt-sub: #309ebd;
          --crt-glow: rgba(80, 228, 255, 0.65);
          --crt-accent: #86ecff;
          background: radial-gradient(ellipse at 50% 48%, #10283c 0%, #081724 65%, #030a10 100%);
          box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(70, 220, 255, 0.18);
        }

        /* CRT Screen Off state */
        .crt-glass-tube.off,
        .crt-glass-tube.turning-off {
          background: radial-gradient(ellipse at 42% 38%, #202022 0%, #111112 70%, #080809 100%) !important;
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.95) !important;
        }

        /* Glass Curvature Glare, Scanlines & Vignette */
        .crt-glare {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 25% 18%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 60%);
          pointer-events: none;
          z-index: 15;
        }

        .crt-curvature-vignette {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 
            inset 0 0 clamp(16px, 3.5vw, 42px) rgba(0, 0, 0, 0.82),
            inset 0 0 4px rgba(255, 255, 255, 0.12);
          pointer-events: none;
          z-index: 16;
        }

        .crt-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.28) 0px,
            rgba(0, 0, 0, 0.28) 1.5px,
            transparent 1.5px,
            transparent 3.5px
          );
          pointer-events: none;
          opacity: 0.85;
          z-index: 14;
        }

        /* Screen Static Noise Burst */
        .crt-static-burst {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px),
            radial-gradient(rgba(0, 0, 0, 0.8) 1px, transparent 1px);
          background-size: 3px 3px, 4px 4px;
          background-position: 0 0, 2px 2px;
          animation: static-flicker 0.08s infinite alternate;
          z-index: 18;
          opacity: 0.92;
          mix-blend-mode: hard-light;
        }

        @keyframes static-flicker {
          0% { transform: translate(0, 0) scale(1); filter: brightness(1.3); }
          50% { transform: translate(-2px, 3px) scale(1.02); filter: brightness(1.6); }
          100% { transform: translate(3px, -2px) scale(0.98); filter: brightness(1.1); }
        }

        /* CRT Raster Layer: Content and background wrapper that scales with CRT electron beam */
        .crt-raster-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          background: var(--crt-bg);
          transform-origin: center center;
          overflow: hidden;
          z-index: 12;
        }

        /* Power-Off CRT Collapse Animation on the screen itself */
        .crt-raster-layer.crt-anim-turnoff {
          animation: crt-turn-off 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          pointer-events: none;
        }

        .crt-raster-layer.crt-anim-turnoff::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ffffff;
          pointer-events: none;
          animation: beam-flash-off 0.45s forwards;
          z-index: 25;
        }

        @keyframes beam-flash-off {
          0% { opacity: 0; }
          15% { opacity: 1; }
          100% { opacity: 1; }
        }

        @keyframes crt-turn-off {
          0% {
            transform: scale(1, 1);
            filter: brightness(1);
            opacity: 1;
          }
          22% {
            transform: scale(1, 0.0035);
            filter: brightness(8) contrast(2);
            box-shadow: 0 0 20px 4px #ffffff, 0 0 35px 8px #70e6ff;
            opacity: 1;
          }
          58% {
            transform: scale(0.005, 0.0035);
            filter: brightness(12);
            box-shadow: 0 0 25px 5px #ffffff, 0 0 45px 12px #70e6ff;
            opacity: 1;
          }
          85% {
            transform: scale(0.003, 0.003);
            filter: brightness(4);
            opacity: 0.7;
          }
          100% {
            transform: scale(0, 0);
            opacity: 0;
          }
        }

        /* Power-On CRT Expansion Animation starting directly from white beam into screen */
        .crt-raster-layer.crt-anim-turnon {
          animation: crt-turn-on 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .crt-raster-layer.crt-anim-turnon::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ffffff;
          pointer-events: none;
          animation: beam-flash-on 0.55s forwards;
          z-index: 25;
        }

        @keyframes beam-flash-on {
          0% { opacity: 1; }
          32% { opacity: 0.95; }
          65% { opacity: 0.2; }
          100% { opacity: 0; }
        }

        @keyframes crt-turn-on {
          0% {
            transform: scale(0.005, 0.0035);
            filter: brightness(12);
            box-shadow: 0 0 25px 6px #ffffff;
            opacity: 1;
          }
          28% {
            transform: scale(1, 0.0035);
            filter: brightness(8);
            box-shadow: 0 0 18px 4px #ffffff;
          }
          65% {
            transform: scale(1, 1);
            filter: brightness(3);
          }
          100% {
            transform: scale(1, 1);
            filter: brightness(1);
            opacity: 1;
          }
        }

        /* CRT Viewport & Typography */
        .crt-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          padding: clamp(14px, 2.8vw, 24px) clamp(16px, 3.2vw, 30px);
          overflow-y: auto;
          color: var(--crt-fg);
          z-index: 12;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: var(--crt-sub) transparent;
        }

        .crt-viewport::-webkit-scrollbar {
          width: 5px;
        }
        .crt-viewport::-webkit-scrollbar-track {
          background: transparent;
        }
        .crt-viewport::-webkit-scrollbar-thumb {
          background-color: var(--crt-sub);
          border-radius: 3px;
        }

        /* Top Heading */
        .crt-title {
          font-family: 'Share Tech Mono', 'Space Mono', monospace;
          font-size: clamp(16px, 2.2vw, 22px);
          font-weight: 700;
          line-height: 1.35;
          margin: 0;
          padding: 0 0 clamp(8px, 1.2vw, 12px) 0;
          letter-spacing: 0.04em;
          color: var(--crt-accent);
          text-shadow: 
            0 0 3px var(--crt-glow),
            0 0 8px var(--crt-glow);
          text-align: center;
          width: 100%;
        }

        /* Divider Line directly below heading */
        .crt-divider-line {
          width: 100%;
          border-bottom: 1px dashed var(--crt-sub);
          box-shadow: 0 0 5px var(--crt-glow);
          opacity: 0.85;
          margin: 0 0 clamp(14px, 2vw, 20px) 0;
          flex-shrink: 0;
        }

        /* CRT Body Content */
        .crt-body {
          font-family: 'Share Tech Mono', 'Space Mono', monospace;
          font-size: clamp(13px, 1.55vw, 16px);
          line-height: 1.75;
          letter-spacing: 0.02em;
          color: var(--crt-fg);
          opacity: 0.96;
          text-shadow: 0 0 3px var(--crt-glow);
          white-space: pre-wrap;
          word-break: break-word;
          text-align: justify;
          text-justify: inter-word;
          width: 100%;
          max-width: 100%;
          margin: 0;
          flex: 1;
        }

        /* Screen Off State Display */
        .crt-screen-off {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #55534f;
          z-index: 12;
          text-align: center;
          padding: 20px;
        }

        .crt-off-glass-reflection {
          position: absolute;
          top: 10%;
          left: 8%;
          width: 55%;
          height: 45%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%);
          border-radius: 40px;
          pointer-events: none;
        }

        .crt-off-tube-center {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(circle, #252422 0%, #141413 70%);
          margin-bottom: 12px;
          opacity: 0.6;
        }

        .crt-off-text-hint {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #646059;
        }

        .crt-off-text-hint span {
          display: block;
          font-size: clamp(11px, 1.3vw, 13px);
          font-weight: 400;
          letter-spacing: 0.03em;
          margin-top: 6px;
          color: #7a756d;
        }

        /* Right Control Panel */
        .tv-controls-panel {
          position: relative;
          background: linear-gradient(180deg, #dfd4c1 0%, #d5c8b3 50%, #cbbda5 100%);
          border-radius: clamp(8px, 1.2vw, 12px);
          padding: clamp(8px, 1.1vw, 12px) clamp(6px, 0.9vw, 10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 
            inset 0 1px 3px rgba(255, 255, 255, 0.65),
            inset 0 -2px 4px rgba(0, 0, 0, 0.25),
            0 2px 4px rgba(0, 0, 0, 0.12);
          border: 1px solid #b8ab96;
        }

        .panel-trim-groove {
          width: 90%;
          height: 2px;
          background: #a99d88;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
          margin-bottom: 6px;
        }

        .panel-divider-line {
          width: 82%;
          height: 2px;
          background: #a99d88;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
          margin: clamp(4px, 0.8vh, 8px) 0;
        }

        /* Knob Modules */
        .knob-module {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .knob-label-strip {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.1;
          margin-bottom: 3px;
          user-select: none;
        }

        .knob-label {
          font-size: clamp(9px, 1.1vw, 11px);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #4a4237;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .knob-sub-label {
          font-size: clamp(8px, 0.9vw, 9.5px);
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #726859;
        }

        /* Vintage Knobs */
        .vintage-knob-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
          transition: transform 0.12s ease;
        }

        .vintage-knob-btn:hover:not(:disabled) .knob-dial {
          box-shadow: 
            0 4px 10px rgba(0, 0, 0, 0.35),
            inset 0 2px 4px rgba(255, 255, 255, 0.85);
          filter: brightness(1.04);
        }

        .vintage-knob-btn:active:not(:disabled) {
          transform: scale(0.96);
        }

        .vintage-knob-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .vintage-knob-btn:focus-visible {
          outline: 2px solid #875731;
          outline-offset: 3px;
          border-radius: 50%;
        }

        /* 3D Knob Dial Construction */
        .knob-dial {
          position: relative;
          width: clamp(42px, 5.2vw, 54px);
          height: clamp(42px, 5.2vw, 54px);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #f2ebdd 0%, #dbcfbd 55%, #b5a793 100%);
          box-shadow: 
            0 3px 7px rgba(0, 0, 0, 0.3),
            inset 0 1px 3px rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px rgba(0, 0, 0, 0.35);
          border: 1.5px solid #a89a84;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.22s cubic-bezier(0.2, 0.85, 0.35, 1.2);
        }

        .knob-knurling {
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: repeating-conic-gradient(
            #b3a591 0deg 8deg,
            #cfc2ae 8deg 16deg
          );
          opacity: 0.45;
        }

        .knob-cap {
          position: relative;
          width: 66%;
          height: 66%;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #e2d6c3 0%, #c3b5a0 70%, #9e917d 100%);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.75),
            inset 0 -1px 2px rgba(0, 0, 0, 0.35),
            0 1px 3px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .knob-pointer-line {
          position: absolute;
          top: 3px;
          width: 2.5px;
          height: 38%;
          background: #3e372e;
          border-radius: 1px;
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }

        /* Small Knobs */
        .vintage-knob-btn.knob-small .knob-dial {
          width: clamp(32px, 4vw, 40px);
          height: clamp(32px, 4vw, 40px);
        }

        .knob-cap-small {
          width: 72%;
          height: 72%;
        }

        .knob-pointer-dot {
          position: absolute;
          top: 3px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #3a3227;
        }

        .vintage-knob-btn.knob-sound.muted .knob-pointer-dot {
          background: #c0392b;
        }

        /* Speaker Grille */
        .tv-speaker-grille {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(3px, 0.5vh, 4.5px);
          padding: clamp(6px, 1vh, 10px) 4px 4px;
          margin-top: auto;
        }

        .speaker-slat {
          width: 100%;
          height: clamp(3px, 0.45vw, 4.5px);
          background: #8e806c;
          border-radius: 2px;
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.75),
            0 1px 0 rgba(255, 255, 255, 0.55);
        }

        /* TV Bottom Bar */
        .tv-bottom-bar {
          display: grid;
          grid-template-columns: clamp(90px, 16%, 130px) 1fr clamp(140px, 25%, 195px);
          gap: clamp(10px, 1.8vw, 18px);
          align-items: center;
          margin-top: clamp(10px, 1.5vw, 16px);
          padding-top: clamp(8px, 1.2vw, 12px);
          border-top: 2px solid #b3a58f;
          box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.55);
        }

        .bottom-vent-cluster {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: clamp(28px, 4.5vh, 42px);
          padding: 0 clamp(4px, 0.8vw, 10px);
        }

        .vent-vertical-slot {
          width: clamp(2px, 0.35vw, 3.5px);
          height: 90%;
          background: #8e806c;
          border-radius: 2px;
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.8),
            1px 0 0 rgba(255, 255, 255, 0.5);
        }

        .bottom-access-compartment {
          height: clamp(28px, 4.5vh, 42px);
          display: flex;
          align-items: center;
        }

        .compartment-frame {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #d3c7b2 0%, #bcb09b 100%);
          border-radius: 4px;
          border: 1px solid #9e917d;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.25),
            0 1px 0 rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          padding: 0 12px;
        }

        .compartment-handle {
          width: 38%;
          height: 6px;
          background: #8a7c68;
          border-radius: 3px;
          margin-left: auto;
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.7),
            0 1px 0 rgba(255, 255, 255, 0.5);
        }

        /* Power Button Assembly */
        .bottom-power-section {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .power-assembly-well {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 14px);
        }

        .vintage-power-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          touch-action: manipulation;
        }

        .vintage-power-btn:focus-visible {
          outline: 2px solid #875731;
          outline-offset: 3px;
          border-radius: 50%;
        }

        .power-button-recess {
          position: relative;
          width: clamp(34px, 4.4vw, 44px);
          height: clamp(34px, 4.4vw, 44px);
          border-radius: 50%;
          background: radial-gradient(circle at 45% 45%, #7a6e5d 0%, #4a4237 70%, #28241f 100%);
          box-shadow: 
            inset 0 2px 5px rgba(0, 0, 0, 0.8),
            0 1px 2px rgba(255, 255, 255, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .power-button-core {
          width: 72%;
          height: 72%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #eae3d5 0%, #cfc3b0 60%, #998c79 100%);
          box-shadow: 
            0 2px 5px rgba(0, 0, 0, 0.4),
            inset 0 1px 2px rgba(255, 255, 255, 0.9),
            inset 0 -2px 3px rgba(0, 0, 0, 0.35);
          border: 1px solid #8d806e;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.12s ease, filter 0.15s ease;
          color: #3b342b;
        }

        .vintage-power-btn:hover .power-button-core {
          filter: brightness(1.08);
        }

        .vintage-power-btn:active .power-button-core {
          transform: scale(0.92);
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.3),
            inset 0 2px 3px rgba(0, 0, 0, 0.4);
        }

        .power-is-on .power-button-core {
          color: #1a6f3b;
        }

        .power-is-off .power-button-core {
          color: #8c2a1e;
        }

        /* Power LED Status Indicator */
        .power-status-indicator {
          display: flex;
          flex-direction: column;
          gap: 3px;
          user-select: none;
        }

        .power-led {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .power-led.led-active {
          background-color: #2ecc71;
          box-shadow: 0 0 8px #2ecc71, 0 0 2px #fff;
        }

        .power-led.led-standby {
          background-color: #e74c3c;
          box-shadow: 0 0 6px #e74c3c;
        }

        .power-label-text {
          font-size: clamp(8px, 0.95vw, 10px);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #4a4237;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        /* TV Rubber Base Feet */
        .tv-rubber-feet {
          position: absolute;
          bottom: clamp(-10px, -1.3vw, -14px);
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 clamp(40px, 12vw, 85px);
          pointer-events: none;
          z-index: 8;
        }

        .rubber-foot {
          width: clamp(34px, 5vw, 48px);
          height: clamp(12px, 1.6vw, 16px);
          background: linear-gradient(180deg, #1f1d1a 0%, #11100e 100%);
          border-radius: 2px 2px 6px 6px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
        }

        /* Vintage Wooden Table / Credenza Stand */
        .vintage-table {
          position: relative;
          width: 100%;
          margin-top: 0;
          z-index: 5;
          display: flex;
          flex-direction: column;
        }

        .table-top-surface {
          width: 100%;
          height: clamp(16px, 2.5vh, 22px);
          background: linear-gradient(90deg, #9a6538 0%, #ba8452 40%, #a6703f 80%, #89562d 100%);
          border-radius: 4px 4px 0 0;
          box-shadow: 
            0 -3px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
          border: 1px solid #784822;
          border-bottom: none;
        }

        .table-lip {
          width: 100%;
          height: 6px;
          background: #6e3e1b;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
        }

        .table-cabinet-front {
          width: 100%;
          height: clamp(90px, 16vh, 160px);
          background: linear-gradient(180deg, #ba8351 0%, #a26d3e 50%, #8e5a2e 100%);
          border: 1px solid #6b3d1b;
          border-top: none;
          padding: clamp(10px, 1.5vw, 16px) clamp(16px, 3vw, 32px);
          box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.25);
        }

        .table-drawer-panel {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #a47040 0%, #905d30 100%);
          border: 1px solid #633917;
          border-radius: 3px;
          box-shadow: 
            inset 0 1px 3px rgba(0, 0, 0, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.3);
          padding: 8px;
        }

        .table-drawer-inner {
          width: 100%;
          height: 100%;
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: 2px;
        }

        /* Screen Reader Accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Responsive Breakpoints Across All Devices */

        /* Tablets & Medium Screens (max-width: 820px) */
        @media (max-width: 820px) {
          .tv-stage {
            width: min(840px, 96vw);
            margin-top: clamp(24px, 4vh, 45px);
          }

          .tv-antenna {
            right: clamp(24px, 5%, 42px);
            transform: rotate(16deg);
            height: clamp(80px, 10vh, 105px);
            top: clamp(-75px, -9vh, -95px);
          }

          .tv-main-section {
            grid-template-columns: 1fr clamp(130px, 22%, 170px);
            gap: 12px;
          }

          .crt-viewport {
            padding: clamp(14px, 2.5vw, 22px) clamp(16px, 2.8vw, 26px);
          }
        }

        /* Compact Tablets & Mobile Viewports (max-width: 680px) */
        @media (max-width: 680px) {
          .retro-environment {
            padding: clamp(10px, 2vh, 20px) clamp(8px, 2vw, 16px) clamp(18px, 3vh, 32px);
          }

          .page-header {
            margin: clamp(6px, 1.5vh, 16px) auto clamp(14px, 2.5vh, 24px);
            padding: 0 8px;
          }

          .header-title {
            font-size: clamp(20px, 5vw, 28px);
            margin-bottom: 6px;
          }

          .header-description {
            font-size: clamp(12px, 3.2vw, 14px);
            line-height: 1.45;
          }

          .tv-stage {
            width: 100%;
            margin-top: 10px;
          }

          .tv-antenna {
            display: none;
          }

          /* Stack CRT screen and controls vertically */
          .tv-main-section {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          /* Controls become a sleek horizontal bottom-panel */
          .tv-controls-panel {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
            padding: 10px 8px;
            width: 100%;
            box-sizing: border-box;
          }

          .panel-divider-line,
          .panel-trim-groove,
          .tv-speaker-grille {
            display: none;
          }

          .knob-module {
            padding: 2px 0;
          }

          .knob-dial {
            width: clamp(38px, 9vw, 48px);
            height: clamp(38px, 9vw, 48px);
          }

          .vintage-knob-btn.knob-small .knob-dial {
            width: clamp(32px, 8vw, 40px);
            height: clamp(32px, 8vw, 40px);
          }

          /* CRT screen becomes flexible and comfortable */
          .crt-glass-tube {
            min-height: 280px;
            height: clamp(280px, 48vh, 390px);
            aspect-ratio: auto;
          }

          .crt-viewport {
            padding: 14px 14px;
            -webkit-overflow-scrolling: touch;
          }

          .crt-title {
            font-size: clamp(15px, 4vw, 19px);
            padding-bottom: 8px;
          }

          .crt-divider-line {
            margin-bottom: 12px;
          }

          .crt-body {
            font-size: clamp(12.5px, 3.2vw, 14.5px);
            line-height: 1.65;
            text-align: left;
          }

          .tv-bottom-bar {
            grid-template-columns: 1fr auto;
            gap: 8px;
            padding-top: 8px;
            margin-top: 8px;
          }

          .bottom-vent-cluster {
            display: none;
          }

          .table-cabinet-front {
            height: clamp(60px, 11vh, 90px);
            padding: 8px 16px;
          }
        }

        /* Standard Smartphones (max-width: 440px) */
        @media (max-width: 440px) {
          .retro-environment {
            padding: 8px 6px 20px;
          }

          .page-header {
            margin: 4px auto 12px;
            padding: 0 4px;
          }

          .header-title {
            font-size: clamp(18px, 5.5vw, 23px);
            margin-bottom: 4px;
          }

          .header-description {
            font-size: 12px;
            line-height: 1.4;
          }

          .tv-cabinet {
            padding: 8px 6px;
            border-radius: 14px;
          }

          .tv-faceplate {
            padding: 6px 5px;
            border-radius: 10px;
          }

          .crt-outer-bezel {
            padding: 5px 3px;
            border-radius: 10px;
          }

          .crt-inner-bezel {
            padding: 4px 3px;
            border-radius: 14px;
          }

          .crt-glass-tube {
            min-height: 290px;
            height: clamp(290px, 52vh, 410px);
            border-radius: 16px;
          }

          .crt-viewport {
            padding: 12px 10px;
          }

          .crt-title {
            font-size: 14.5px;
            letter-spacing: 0.02em;
          }

          .crt-body {
            font-size: 12px;
            line-height: 1.6;
          }

          .tv-controls-panel {
            padding: 8px 4px;
            gap: 4px;
          }

          .knob-dial {
            width: 38px;
            height: 38px;
          }

          .vintage-knob-btn.knob-small .knob-dial {
            width: 32px;
            height: 32px;
          }

          .knob-label {
            font-size: 8.5px;
            letter-spacing: 0.04em;
          }

          .knob-sub-label {
            font-size: 7.5px;
          }

          .bottom-access-compartment {
            display: none;
          }

          .tv-bottom-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 6px;
            margin-top: 6px;
          }

          .power-assembly-well {
            gap: 10px;
          }

          .power-button-recess {
            width: 36px;
            height: 36px;
          }

          .power-label-text {
            font-size: 8.5px;
          }

          .table-cabinet-front {
            height: 48px;
            padding: 4px 10px;
          }

          .table-top-surface {
            height: 14px;
          }

          .tv-rubber-feet {
            padding: 0 35px;
          }

          .rubber-foot {
            width: 30px;
            height: 10px;
          }
        }

        /* Ultra-Narrow Mobile Screens (max-width: 340px) */
        @media (max-width: 340px) {
          .knob-dial {
            width: 33px;
            height: 33px;
          }

          .vintage-knob-btn.knob-small .knob-dial {
            width: 28px;
            height: 28px;
          }

          .crt-title {
            font-size: 13.5px;
          }

          .crt-body {
            font-size: 11px;
            line-height: 1.5;
          }
        }

        /* Landscape Mobile & Low-Height Screens (max-height: 620px) */
        @media (max-height: 620px) {
          .retro-environment {
            padding-top: 6px;
            padding-bottom: 16px;
          }

          .page-header {
            margin: 4px auto 8px;
          }

          .header-title {
            font-size: 18px;
            margin-bottom: 2px;
          }

          .header-description {
            display: none;
          }

          .tv-stage {
            margin-top: 6px;
          }

          .tv-antenna {
            display: none;
          }

          .crt-glass-tube {
            min-height: 210px;
            height: 50vh;
            aspect-ratio: auto;
          }

          .table-cabinet-front {
            height: 36px;
            padding: 4px;
          }

          .table-top-surface {
            height: 12px;
          }
        }
      `}</style>

      {/* Wall & Ambient Shadow */}
      <div className="room-wall" />

      {/* Page Hero Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <NavPageHeader
          title="Software Introduction"
          description="Get introduced to our platform, its focus areas, and how it aims to make cybersecurity information more accessible and understandable across 50 dedicated educational topics."
          className="mb-4 px-4"
        />
      </div>

      {/* Main Vintage Television Assembly */}
      <div className="tv-stage">
        {/* Telescopic Antenna */}
        <div className="tv-antenna" aria-hidden="true">
          <div className="antenna-base" />
          <div className="antenna-rod">
            <span className="antenna-segment segment-1" />
            <span className="antenna-segment segment-2" />
            <span className="antenna-tip-ball" />
          </div>
        </div>

        {/* Vintage TV Cabinet (Warm Wood/Caramel outer shell) */}
        <div className="tv-cabinet">
          {/* Inner Molded Cream Faceplate */}
          <div className="tv-faceplate">
            {/* Top Bevel Highlight */}
            <div className="faceplate-top-groove" />

            {/* Main Area: Screen on Left, Controls on Right */}
            <div className="tv-main-section">
              {/* Left: CRT Screen Module */}
              <div className="crt-housing">
                {/* Outer Beveled Screen Frame */}
                <div className="crt-outer-bezel">
                  <div className="crt-inner-bezel">
                    {/* The Curved CRT Glass Tube */}
                    <div className={`crt-glass-tube theme-${currentTheme.id} ${powerState}`}>
                      {/* Glass Curvature & Specular Highlight */}
                      <div className="crt-glare" aria-hidden="true" />
                      <div className="crt-curvature-vignette" aria-hidden="true" />
                      <div className="crt-scanlines" aria-hidden="true" />

                      {/* Screen Static during channel switch */}
                      {isChangingChannel && power && powerState === 'on' && (
                        <div className="crt-static-burst" aria-hidden="true" />
                      )}

                      {/* Active CRT Raster Layer: Content and background scale directly with the white beam */}
                      {power && powerState !== 'off' && (
                        <div
                          className={`crt-raster-layer ${
                            powerState === 'turning-off'
                              ? 'crt-anim-turnoff'
                              : powerState === 'turning-on'
                              ? 'crt-anim-turnon'
                              : ''
                          }`}
                        >
                          <div className="crt-viewport" ref={screenRef}>
                            {/* Top Heading */}
                            <h1 className="crt-title">
                              {currentParagraph.heading}
                            </h1>

                            {/* Divider Line directly below heading */}
                            <div className="crt-divider-line" aria-hidden="true" />

                            {/* Paragraph Content cleanly aligned */}
                            <p className="crt-body">
                              {currentParagraph.content}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* When Power is OFF: Glass dark face with subtle ambient sheen */}
                      {(!power || powerState === 'off') && (
                        <div className="crt-screen-off" aria-label="Television screen is turned off">
                          <div className="crt-off-glass-reflection" />
                          <div className="crt-off-tube-center" />
                          <div className="crt-off-text-hint">
                            POWER OFF
                            <span>Press the power button at bottom-right to turn on</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Tactile Control Panel (Knobs, Dials & Speaker) */}
              <div className="tv-controls-panel" role="region" aria-label="Television Controls">
                {/* Control Panel Header / Trim */}
                <div className="panel-trim-groove" />

                {/* Knob 1: NEXT (Channel Up) */}
                <div className="knob-module knob-next-module">
                  <div className="knob-label-strip">
                    <span className="knob-label">NEXT</span>
                    <span className="knob-sub-label">CH +</span>
                  </div>
                  <button
                    type="button"
                    className="vintage-knob-btn knob-next"
                    onClick={handleNext}
                    disabled={!power || paragraphIndex >= classroomParagraphs.length - 1}
                    title="Next Channel / Paragraph (Click to advance)"
                    aria-label="Next channel"
                    id="btn-tv-next"
                  >
                    <div
                      className="knob-dial"
                      style={{ transform: `rotate(${knob1Angle}deg)` }}
                    >
                      <div className="knob-knurling" />
                      <div className="knob-cap">
                        <span className="knob-pointer-line" />
                      </div>
                    </div>
                  </button>
                </div>

                <div className="panel-divider-line" />

                {/* Knob 2: PREVIOUS (Channel Down) */}
                <div className="knob-module knob-prev-module">
                  <div className="knob-label-strip">
                    <span className="knob-label">PREV</span>
                    <span className="knob-sub-label">CH -</span>
                  </div>
                  <button
                    type="button"
                    className="vintage-knob-btn knob-prev"
                    onClick={handlePrev}
                    disabled={!power || paragraphIndex <= 0}
                    title="Previous Channel / Paragraph (Click to go back)"
                    aria-label="Previous channel"
                    id="btn-tv-prev"
                  >
                    <div
                      className="knob-dial"
                      style={{ transform: `rotate(${knob2Angle}deg)` }}
                    >
                      <div className="knob-knurling" />
                      <div className="knob-cap">
                        <span className="knob-pointer-line" />
                      </div>
                    </div>
                  </button>
                </div>

                <div className="panel-divider-line" />

                {/* Knob 3: COLOR TINT / PHOSPHOR MODE */}
                <div className="knob-module knob-color-module">
                  <div className="knob-label-strip">
                    <span className="knob-label">COLOR</span>
                    <span className="knob-sub-label">TINT</span>
                  </div>
                  <button
                    type="button"
                    className="vintage-knob-btn knob-small knob-tint"
                    onClick={handleCycleTheme}
                    disabled={!power}
                    title="Change Phosphor Color (Mono / Green / Amber / Cyan)"
                    aria-label="Change Phosphor Color"
                    id="btn-tv-tint"
                  >
                    <div
                      className="knob-dial"
                      style={{ transform: `rotate(${knob3Angle}deg)` }}
                    >
                      <div className="knob-cap knob-cap-small">
                        <span className="knob-pointer-dot" />
                      </div>
                    </div>
                  </button>
                </div>

                <div className="panel-divider-line" />

                {/* Knob 4: SOUND / AUDIO TOGGLE */}
                <div className="knob-module knob-vol-module">
                  <div className="knob-label-strip">
                    <span className="knob-label">SOUND</span>
                    <span className="knob-sub-label">{soundMuted ? 'MUTED' : 'ON'}</span>
                  </div>
                  <button
                    type="button"
                    className={`vintage-knob-btn knob-small knob-sound ${soundMuted ? 'muted' : ''}`}
                    onClick={handleToggleSound}
                    title="Toggle Vintage Relay & Static Sound"
                    aria-label="Toggle Sound"
                    id="btn-tv-sound"
                  >
                    <div className="knob-dial">
                      <div className="knob-cap knob-cap-small">
                        <span className="knob-pointer-dot" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Speaker Grille (Horizontal Slats) */}
                <div className="tv-speaker-grille" aria-hidden="true">
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                  <div className="speaker-slat" />
                </div>
              </div>
            </div>

            {/* Bottom Bar: Vent Slats, Compartment Flap & Power Button */}
            <div className="tv-bottom-bar">
              {/* Left: Vertical Ventilation Slats */}
              <div className="bottom-vent-cluster" aria-hidden="true">
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
                <span className="vent-vertical-slot" />
              </div>

              {/* Center: Recessed Service Flap / Compartment */}
              <div className="bottom-access-compartment" aria-hidden="true">
                <div className="compartment-frame">
                  <div className="compartment-handle" />
                </div>
              </div>

              {/* Right: POWER ON / OFF BUTTON ASSEMBLY */}
              <div className="bottom-power-section">
                <div className="power-assembly-well">
                  <button
                    type="button"
                    className={`vintage-power-btn ${power ? 'power-is-on' : 'power-is-off'}`}
                    onClick={handleTogglePower}
                    title={power ? 'Power OFF Television' : 'Power ON Television'}
                    aria-label={power ? 'Turn television off' : 'Turn television on'}
                    id="btn-tv-power"
                  >
                    <div className="power-button-recess">
                      <div className="power-button-core">
                        <svg
                          className="power-icon"
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                          <line x1="12" y1="2" x2="12" y2="12" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Power Status LED & Text */}
                  <div className="power-status-indicator">
                    <span
                      className={`power-led ${power ? 'led-active' : 'led-standby'}`}
                      aria-hidden="true"
                    />
                    <span className="power-label-text">
                      {power ? 'POWER ON' : 'STANDBY'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TV Feet (Resting on furniture table) */}
          <div className="tv-rubber-feet" aria-hidden="true">
            <span className="rubber-foot foot-left" />
            <span className="rubber-foot foot-right" />
          </div>
        </div>

        {/* Vintage Wooden Cabinet Stand / Table */}
        <div className="vintage-table" aria-hidden="true">
          <div className="table-top-surface" />
          <div className="table-lip" />
          <div className="table-cabinet-front">
            <div className="table-drawer-panel">
              <div className="table-drawer-inner" />
            </div>
          </div>
        </div>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        Current topic: {currentParagraph.heading}. {currentParagraph.content}. Page {paragraphIndex + 1} of {classroomParagraphs.length}.
      </div>
    </div>
  )
}

export { TVPage, TVPage as SoftwareIntroductionPage }
