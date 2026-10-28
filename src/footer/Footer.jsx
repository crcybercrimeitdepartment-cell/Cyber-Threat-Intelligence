import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import HotAirBalloon from './HotAirBalloon';
import SkyBackground from './SkyBackground';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative z-30 w-full overflow-hidden text-slate-800 font-sans border-t border-sky-300/60 select-none bg-[#f0f7fe] isolate">
      
      {/* =========================================================
          SKY BACKGROUND & MOVING CLOUDS
          ========================================================= */}
      <SkyBackground />

      {/* =========================================================
          ANIMATED HOT AIR BALLOON (Flies up on the right side)
          ========================================================= */}
      <HotAirBalloon />

      {/* =========================================================
          BACKGROUND ARTWORK: Waves and Dot Grids
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Left Sweeping Cyan / Sky Blue Waves */}
        <svg
          className="absolute -bottom-10 -left-10 w-[420px] md:w-[560px] h-auto opacity-75"
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50 220 C 120 220 220 300 320 420 L -50 420 Z"
            fill="url(#leftCyanWave1)"
          />
          <path
            d="M -50 280 C 140 270 240 330 360 450 L -50 450 Z"
            fill="url(#leftCyanWave2)"
          />
          <defs>
            <linearGradient id="leftCyanWave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="leftCyanWave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right Sweeping Deep Navy Wave */}
        <svg
          className="absolute -bottom-12 -right-10 w-[480px] md:w-[680px] h-auto opacity-95"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 120 400 C 260 280 420 180 620 190 L 620 400 Z"
            fill="url(#rightNavyWave1)"
          />
          <path
            d="M 220 400 C 330 310 470 240 620 250 L 620 400 Z"
            fill="url(#rightNavyWave2)"
          />
          <defs>
            <linearGradient id="rightNavyWave1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#082855" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="rightNavyWave2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#061833" stopOpacity="0.98" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left Dot Grid Matrix */}
        <div className="absolute top-28 left-4 opacity-40 hidden sm:block">
          <div className="grid grid-cols-4 gap-2.5">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#38bdf8]"></span>
            ))}
          </div>
        </div>

        {/* Right Dot Grid Matrix */}
        <div className="absolute top-8 right-8 opacity-45 hidden md:block">
          <div className="grid grid-cols-5 gap-3">
            {[...Array(25)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#60a5fa]"></span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN FOOTER COLUMNS CONTAINER (4 Columns)
          ========================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto pl-8 sm:pl-12 md:pl-16 lg:pl-20 pr-4 sm:pr-6 xl:pr-10 pt-7 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-5 xl:gap-7 items-start">
          
          {/* ---------------- COLUMN 1: Brand & Identity (4 cols) ---------------- */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Logo & Brand Title */}
            <div className="flex items-center gap-2.5 mb-2">
              {/* Stylized Modern CR Vector Icon */}
              <div className="relative w-9 h-9 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  {/* Cyan Outer Arc */}
                  <path
                    d="M 50 12 A 38 38 0 1 0 88 50 A 10 10 0 0 0 68 50 A 18 18 0 1 1 50 32 A 10 10 0 0 0 50 12 Z"
                    fill="url(#crCyanGrad)"
                  />
                  {/* Deep Navy 'R' Element */}
                  <path
                    d="M 56 34 L 56 68 L 66 68 L 66 54 L 75 68 L 88 68 L 76 51 C 82 48 85 43 85 39 C 85 34 80 34 74 34 Z M 66 41 L 74 41 C 76 41 77 42 77 44 C 77 46 76 47 74 47 L 66 47 Z"
                    fill="#0a1931"
                  />
                  {/* Top Orange Dot Accent */}
                  <circle cx="50" cy="14" r="5" fill="#f97316" />
                  <defs>
                    <linearGradient id="crCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00b4d8" />
                      <stop offset="100%" stopColor="#0077b6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Title & Slogan */}
              <div className="flex flex-col">
                <span className="text-[19px] font-black tracking-tight text-[#0a1629] leading-tight">
                  CR Intelligence
                </span>
                <span className="text-[9.5px] font-semibold text-slate-500 tracking-wider">
                  Research <span className="text-slate-300">|</span> Awareness <span className="text-slate-300">|</span> Digital Safety
                </span>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-[11.5px] leading-snug text-slate-600 font-normal my-1.5 max-w-[340px]">
              Providing knowledge, research, and awareness to build a safer and more secure digital world for individuals, organizations, and communities.
            </p>

            {/* Social Media Circular Buttons */}
            <div className="flex items-center gap-2 my-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                aria-label="X"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                aria-label="YouTube"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                }}
                aria-label="Instagram"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* Bottom Slogan Accent Bar */}
            <div className="mt-1 text-[10.5px] font-medium text-slate-500">
              <div className="w-12 h-0.5 bg-[#00a3ff] rounded-full mb-1"></div>
              <span>Empowering a <strong className="text-[#0a1629] font-bold">Safer Digital Tomorrow.</strong></span>
            </div>
          </div>

          {/* ---------------- COLUMN 2: Quick Links (2 cols) ---------------- */}
          <div className="lg:col-span-2 xl:col-span-2 flex flex-col">
            <h3 className="text-[13px] font-extrabold text-[#0a1629] tracking-tight">
              Quick Links
            </h3>
            <div className="w-5 h-0.5 bg-[#00a3ff] rounded-full mt-1 mb-2"></div>

            <ul className="space-y-1.5 text-[11.5px] font-medium text-slate-600">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about-us' },
                { label: 'Our Work', to: '/services' },
                { label: 'Products', to: '/public-cyber-services' },
                { label: 'Resources', to: '/public-info' },
                { label: 'News & Insights', to: '/notifications' },
                { label: 'Careers', to: '/become-member' },
                { label: 'Contact Us', to: '/contact-us' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 hover:text-[#0070f3] hover:translate-x-1 transition-all"
                  >
                    <ChevronRight size={11} className="text-[#00a3ff] shrink-0 group-hover:scale-125 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- COLUMN 3: Our Services (3 cols) ---------------- */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col">
            <h3 className="text-[13px] font-extrabold text-[#0a1629] tracking-tight">
              Our Services
            </h3>
            <div className="w-5 h-0.5 bg-[#2563eb] rounded-full mt-1 mb-2"></div>

            <ul className="space-y-1.5 text-[11.5px] font-medium text-slate-600">
              {[
                { label: 'Cyber Awareness', to: '/services' },
                { label: 'Threat Research', to: '/services' },
                { label: 'Digital Safety', to: '/public-cyber-services' },
                { label: 'Training & Workshops', to: '/partnership' },
                { label: 'Advisory & Consulting', to: '/cyber-assistance' },
                { label: 'Research Publications', to: '/public-info' },
                { label: 'Community Programs', to: '/become-member' },
                { label: 'Intelligence Solutions', to: '/services' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 hover:text-[#0070f3] hover:translate-x-1 transition-all"
                  >
                    <ChevronRight size={11} className="text-[#00a3ff] shrink-0 group-hover:scale-125 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- COLUMN 4: Get in Touch (3 cols) ---------------- */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col">
            <h3 className="text-[13px] font-extrabold text-[#0a1629] tracking-tight">
              Get in Touch
            </h3>
            <div className="w-5 h-0.5 bg-[#ea580c] rounded-full mt-1 mb-2"></div>

            <div className="space-y-2.5">
              {/* Location */}
              <div className="flex items-start gap-2.5 group">
                <div className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={13.5} />
                </div>
                <div className="flex flex-col text-[11.5px] leading-tight text-slate-700">
                  <span className="font-semibold text-[#0a1629]">Bhubaneswar, Odisha</span>
                  <span className="text-slate-500 mt-0.5">India</span>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:info@crintelligence.in"
                className="flex items-start gap-2.5 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={13.5} />
                </div>
                <div className="flex flex-col text-[11.5px] leading-tight">
                  <span className="font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
                    info@crintelligence.in
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-start gap-2.5 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={13.5} />
                </div>
                <div className="flex flex-col text-[11.5px] leading-tight">
                  <span className="font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
                    +91 98765 43210
                  </span>
                </div>
              </a>

              {/* Working Hours */}
              <div className="flex items-start gap-2.5 group">
                <div className="w-7 h-7 rounded-full bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Clock size={13.5} />
                </div>
                <div className="flex flex-col text-[11.5px] leading-tight text-slate-700">
                  <span className="font-semibold text-[#0a1629]">Mon - Fri : 9:00 AM - 6:00 PM</span>
                  <span className="text-slate-500 mt-0.5">(IST)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          FLOATING "STAY UPDATED" NEWSLETTER BAR
          ========================================================= */}
      <div className="relative z-20 max-w-[1220px] mx-auto px-4 sm:px-6 mb-4 mt-1">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-2.5 sm:p-3 md:py-2 md:px-5 shadow-[0_8px_24px_rgba(2,132,199,0.12)] border border-white/90 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left Text & Icon */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
              <Mail size={17} />
            </div>
            <div>
              <h4 className="text-[13px] font-extrabold text-[#0a1629] leading-tight">
                Stay Updated
              </h4>
              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                Get the latest updates on cyber awareness, research, and digital safety.
              </p>
            </div>
          </div>

          {/* Right Input and Button Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full sm:w-[260px] lg:w-[300px]">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-8.5 bg-slate-50 border border-slate-200/90 rounded-full px-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all pr-8"
              />
              <Mail
                size={13}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto h-8.5 px-5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00b4d8] hover:from-[#1d4ed8] hover:to-[#0284c7] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all cursor-pointer shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-300" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ChevronRight size={13} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* =========================================================
          DARK BOTTOM BAR (Copyright)
          ========================================================= */}
      <div className="relative z-40 w-full bg-[#050e1d] text-white py-2.5 px-5 sm:px-8 xl:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          
          {/* Copyright */}
          <span className="text-[11px] font-semibold text-slate-200 tracking-tight">
            &copy; {new Date().getFullYear()} CR Intelligence. All rights reserved.
          </span>

          <span className="text-[10px] text-slate-400 font-medium">
            Empowering a Safer Digital World Through Knowledge and Awareness.
          </span>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
