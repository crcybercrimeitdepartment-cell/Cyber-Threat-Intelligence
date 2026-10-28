import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Image,
  HelpCircle,
  Headphones,
  Phone,
  Menu,
  X,
  Globe,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Settings,
  Users,
  Scale,
  FileText,
  UserPlus,
  Home,
  AlertTriangle,
  Flame,
  CheckCircle2,
  PlayCircle,
  Shield
} from 'lucide-react';
import ConvergingTitle from './ConvergingTitle';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Auto-dismiss the Welcome message banner after 4 seconds on page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus and popups on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'od', label: 'Odia', native: 'ଓଡ଼ିଆ' }
  ];

  const popularSearches = [
    { term: 'Ransomware Alert', to: '/public-info' },
    { term: 'Report Financial Fraud', to: '/incident-report' },
    { term: 'National Helpline 1930', to: '/cyber-assistance' },
    { term: 'Phishing Detection', to: '/services' },
    { term: 'Cyber Legal Directory', to: '/cyber-legal-directory' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/help?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSearchSuggestion = (term, targetUrl) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    if (targetUrl) {
      navigate(targetUrl);
    } else {
      navigate(`/help?search=${encodeURIComponent(term)}`);
    }
  };

  const handleDropdownEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };



  // 10 Navigation Items — every item supports the animated active pill and color icon/text transition
  const navItems = [
    {
      id: 'home',
      label: 'HOME',
      to: '/',
      isExact: true,
      renderIcon: (isActive) => (
        <Home size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#0070f3]'}`} />
      ),
      hasChevron: false,
      subItems: []
    },
    {
      id: 'about',
      label: 'ABOUT US',
      to: '/about-us',
      isExact: false,
      renderIcon: (isActive) => (
        <Building2 size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#2563eb]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Who We Are & Overview', to: '/about-us' },
        { title: 'Mission & Vision', to: '/about-us' },
        { title: 'Leadership & Panel', to: '/about-us' },
        { title: 'Core Capabilities', to: '/about-us' }
      ]
    },
    {
      id: 'services',
      label: 'OUR SERVICES',
      to: '/services',
      isExact: false,
      renderIcon: (isActive) => (
        <Settings size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#0284c7]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Threat Intelligence Feeds', to: '/services' },
        { title: 'Incident Response & Support', to: '/services' },
        { title: 'Vulnerability Assessment (VAPT)', to: '/services' },
        { title: 'Digital Forensics Analysis', to: '/services' }
      ]
    },
    {
      id: 'public-cyber',
      label: 'PUBLIC CYBER',
      to: '/public-cyber-services',
      isExact: false,
      renderIcon: (isActive) => (
        <Users size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#1d4ed8]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Citizen Cyber Safety Advisory', to: '/public-cyber-services' },
        { title: 'Community Security Outreach', to: '/public-cyber-services' },
        { title: 'Cyber Hygiene Guidelines', to: '/public-cyber-services' },
        { title: 'Student & Youth Protection', to: '/public-cyber-services' }
      ]
    },
    {
      id: 'cyber-crime',
      label: 'CYBER CRIME',
      to: '/incident-report',
      isExact: false,
      renderIcon: (isActive) => (
        <ShieldAlert size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#f97316]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Report Incident Online', to: '/incident-report' },
        { title: 'Financial Fraud & Scam Alerts', to: '/incident-report' },
        { title: 'Identity Theft & Impersonation', to: '/incident-report' },
        { title: 'National Cyber Portal (1930)', to: '/incident-report' }
      ]
    },
    {
      id: 'cyber-assist',
      label: 'CYBER ASSIST',
      to: '/cyber-assistance',
      isExact: false,
      renderIcon: (isActive) => (
        <Headphones size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#0ea5e9]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: '24/7 Helpline Directory', to: '/cyber-assistance' },
        { title: 'Victim Psychological Counseling', to: '/cyber-assistance' },
        { title: 'Evidence Preservation Checklist', to: '/cyber-assistance' },
        { title: 'Cyber First-Aid Protocols', to: '/cyber-assistance' }
      ]
    },
    {
      id: 'cyber-legal',
      label: 'CYBER & LEGAL',
      to: '/cyber-legal-directory',
      isExact: false,
      renderIcon: (isActive) => (
        <Scale size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#4f46e5]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Cyber Legal Directory', to: '/cyber-legal-directory' },
        { title: 'IT Act 2000 & Provisions', to: '/cyber-legal-directory' },
        { title: 'Panel Advocates & Legal Aid', to: '/cyber-legal-directory' },
        { title: 'Victim Rights & Redressal', to: '/cyber-legal-directory' }
      ]
    },
    {
      id: 'public-info',
      label: 'PUBLIC INFO',
      to: '/public-info',
      isExact: false,
      renderIcon: (isActive) => (
        <FileText size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#0d9488]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Threat Advisories & Bulletins', to: '/public-info' },
        { title: 'Official Press Releases', to: '/public-info' },
        { title: 'Annual Cyber Reports', to: '/public-info' },
        { title: 'Downloadable Toolkits', to: '/public-info' }
      ]
    },
    {
      id: 'become-member',
      label: 'BECOME MEMBER',
      to: '/become-member',
      isExact: false,
      renderIcon: (isActive) => (
        <UserPlus size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#2563eb]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Cyber Volunteer Network', to: '/become-member' },
        { title: 'Expert Advisory Registration', to: '/become-member' },
        { title: 'Campus Ambassador Program', to: '/become-member' },
        { title: 'Institutional Alliances', to: '/become-member' }
      ]
    },
    {
      id: 'cybersecurity',
      label: 'CYBERSECURITY',
      to: '/partnership',
      isExact: false,
      renderIcon: (isActive) => (
        <ShieldCheck size={14} className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#06b6d4]'}`} />
      ),
      hasChevron: true,
      subItems: [
        { title: 'Strategic Partnerships', to: '/partnership' },
        { title: 'Law Enforcement Collaboration', to: '/partnership' },
        { title: 'Threat Sharing Hub', to: '/partnership' },
        { title: 'Joint Research & Cyber Drills', to: '/partnership' }
      ]
    }
  ];

  const checkIsActive = (item) => {
    if (item.isExact) {
      return location.pathname === item.to;
    }
    return location.pathname.startsWith(item.to);
  };

  return (
    <header
      ref={headerRef}
      data-protection-ignore="true"
      className="w-full relative z-30 bg-white text-slate-800 font-sans border-b border-slate-200/90 shadow-xs"
    >
      
      {/* =========================================================
          ANIMATED TEMPORARY WELCOME BANNER (Appears on refresh, auto-hides after ~3s)
          ========================================================= */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="top-welcome-banner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-gradient-to-r from-[#01142f] via-[#003884] to-[#01142f] border-b border-cyan-500/30 text-white relative shadow-[0_2px_12px_rgba(0,112,243,0.25)] z-30"
          >
            {/* Moving Cyber Scan Beam / Shimmer Effect */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 sm:gap-3 text-center relative z-10">
              {/* Pulsing Cyber Beacon Dot */}
              <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-300 shadow-[0_0_8px_#00dfd8]"></span>
              </span>

              {/* Security Shield Icon */}
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-cyan-300 flex items-center justify-center shrink-0"
              >
                <Shield size={13} className="text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              </motion.div>

              {/* Welcome Message Text */}
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="flex items-center gap-1.5 flex-wrap justify-center text-xs font-medium tracking-tight text-slate-100"
              >
                <span className="text-slate-300 text-[11px] sm:text-xs">Welcome to</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300 tracking-wide text-[11.5px] sm:text-xs drop-shadow-[0_0_10px_rgba(0,180,255,0.4)]">
                  CR-OD Cyber Threat Intelligence
                </span>
                <span className="hidden md:inline-flex items-center gap-1 ml-1.5 px-2 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-[9.5px] font-bold text-cyan-200 tracking-wider uppercase">
                  Active Portal
                </span>
              </motion.div>

              {/* Dismiss 'X' Button on Right */}
              <button
                type="button"
                onClick={() => setShowWelcome(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          ROW 1: MAIN EXECUTIVE BRANDING, CENTER TITLE & ACTIONS BAR
          ========================================================= */}
      <div className="relative bg-white px-3 sm:px-6 xl:px-8 py-2 border-b border-slate-100 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 z-20">
        
        {/* Subtle Cyber Grid Accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0 bg-[linear-gradient(to_right,#0070f308_1px,transparent_1px),linear-gradient(to_bottom,#0070f308_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* 1. Left Element: Logo Badge with Brand Identity Text */}
        <div className="relative z-10 flex items-center shrink-0 justify-start">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer" title="CR-OD Cyber Threat Intelligence">
            {/* Prominent Logo Badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_4px_16px_rgba(0,112,243,0.28)] border border-blue-400/40 group-hover:scale-105 group-hover:border-cyan-400 group-hover:shadow-[0_6px_22px_rgba(0,180,255,0.45)] transition-all shrink-0 bg-[#020b18]">
              <img src="/logo.jpg" alt="CR-OD Logo" className="w-full h-full object-cover" />
            </div>

            {/* Brand Title Text */}
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-xl font-black tracking-wide leading-none text-[#0070f3] group-hover:text-[#0052cc] transition-colors">
                CR-OD
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[10.5px] font-semibold text-slate-500 leading-tight mt-0.5 tracking-tight whitespace-nowrap">
                Cyber Threat Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Center Element: DEAD-CENTER Title, Divider, Description & Glowing Search Bar */}
        <div className="relative z-10 hidden lg:flex flex-col items-center justify-center text-center w-full max-w-[560px] xl:max-w-[640px] mx-auto px-2">
          
          {/* Converging Title with prominent CR-OD font size */}
          <ConvergingTitle />

          {/* Cyber Divider with cyan glowing dot */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.9 }}
            transition={{ delay: 0.58, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-full max-w-[200px] my-0.5 opacity-90 pointer-events-none"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00dfd8] shadow-[0_0_8px_rgba(0,223,216,0.9)] mx-2 shrink-0 animate-pulse"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </motion.div>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.45, ease: 'easeOut' }}
            className="text-[9.5px] sm:text-[10px] xl:text-[10.5px] text-slate-500 font-medium leading-tight tracking-tight max-w-[530px] xl:max-w-[610px] text-center my-0.5"
          >
            Advancing cyber awareness, strengthening digital knowledge, and promoting safer online experiences through{' '}
            <span className="text-[#0070f3] font-semibold">cybersecurity insights</span>,{' '}
            <span className="text-[#0284c7] font-semibold">threat intelligence</span>, and{' '}
            <span className="text-slate-700 font-semibold">responsible digital practices</span>.
          </motion.p>

          {/* Cyber Glowing Search Bar directly under Description */}
          <div className="relative w-full max-w-[440px] xl:max-w-[480px] mx-auto mt-1 group/search" ref={searchRef}>
            {/* Ambient Cyber Glow Aura */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/25 via-cyan-400/35 to-blue-600/25 rounded-full blur-[4px] opacity-70 group-hover/search:opacity-100 group-hover/search:blur-[6px] group-focus-within/search:opacity-100 group-focus-within/search:blur-[7px] transition-all duration-300 pointer-events-none"></div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center bg-white rounded-full h-8 sm:h-9 w-full border border-blue-200/90 shadow-[0_2px_8px_rgba(0,112,243,0.06)] group-hover/search:border-cyan-400 group-focus-within/search:border-[#0070f3] group-focus-within/search:shadow-[0_0_14px_rgba(0,112,243,0.3)] transition-all duration-200 pl-3 pr-1">
                <Search size={13} className="text-[#0070f3] shrink-0 mr-1.5 transition-transform duration-200 group-hover/search:scale-110" />
                <input
                  type="text"
                  data-allow-interaction="true"
                  placeholder="Search threat intelligence, alerts, advisories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-transparent text-[11px] xl:text-xs text-slate-800 placeholder-slate-400 outline-none pr-1 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-0.5 cursor-pointer"
                  >
                    <X size={11} />
                  </button>
                )}
                <button
                  type="submit"
                  className="h-6 sm:h-7 px-3 sm:px-3.5 rounded-full bg-gradient-to-r from-[#0070f3] via-[#0080ff] to-[#0052cc] hover:from-[#0060d0] hover:to-[#0041a8] text-white text-[10.5px] font-bold flex items-center gap-1 shadow-[0_2px_8px_rgba(0,112,243,0.35)] hover:shadow-[0_2px_14px_rgba(0,180,255,0.5)] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* 3. Right Element: Action Buttons with Cyber Glowing Hover Effects (Desktop) + Mobile Controls */}
        <div className="relative z-10 flex items-center justify-end shrink-0">
          
          {/* Desktop Action Buttons: Demo, Alerts, Gallery, FAQ, Help, Contact */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
            {/* 0. Demo */}
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(true)}
              className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform"
              title="Interactive Platform Demo"
            >
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>
              
              <div className="relative w-9 h-9 rounded-full border border-slate-200/90 bg-white shadow-xs group-hover:scale-110 group-hover:border-blue-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:shadow-[0_0_16px_rgba(0,112,243,0.45)] transition-all duration-300 flex items-center justify-center text-slate-700">
                <PlayCircle size={15} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="relative text-[8.5px] xl:text-[9px] font-semibold text-slate-600 group-hover:text-blue-600 mt-1 leading-none transition-colors">
                Demo
              </span>
            </button>

            {/* 1. Alerts / Notifications */}
            <Link to="/notifications" className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform" title="Notifications & Alerts">
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>

              <div className={`relative w-9 h-9 rounded-full border shadow-xs group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                location.pathname.startsWith('/notifications')
                  ? 'bg-red-500 border-red-500 text-white shadow-[0_0_14px_rgba(239,68,68,0.5)]'
                  : 'bg-white border-slate-200/90 text-slate-700 group-hover:border-red-400 group-hover:bg-red-50 group-hover:text-red-600 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.45)]'
              }`}>
                <Bell size={15} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ef4444] text-white text-[7.5px] font-bold flex items-center justify-center shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse">
                  3
                </span>
              </div>
              <span className={`relative text-[8.5px] xl:text-[9px] mt-1 leading-none transition-colors ${
                location.pathname.startsWith('/notifications') ? 'text-red-600 font-bold' : 'font-semibold text-slate-600 group-hover:text-red-600'
              }`}>
                Alerts
              </span>
            </Link>

            {/* 2. Gallery */}
            <Link to="/gallery" className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform" title="Photo & Media Gallery">
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>

              <div className={`relative w-9 h-9 rounded-full border shadow-xs group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                location.pathname.startsWith('/gallery')
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_14px_rgba(99,102,241,0.5)]'
                  : 'bg-white border-slate-200/90 text-slate-700 group-hover:border-indigo-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.45)]'
              }`}>
                <Image size={15} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className={`relative text-[8.5px] xl:text-[9px] mt-1 leading-none transition-colors ${
                location.pathname.startsWith('/gallery') ? 'text-indigo-600 font-bold' : 'font-semibold text-slate-600 group-hover:text-indigo-600'
              }`}>
                Gallery
              </span>
            </Link>

            {/* 3. FAQ */}
            <Link to="/faq" className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform" title="Frequently Asked Questions">
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>

              <div className={`relative w-9 h-9 rounded-full border shadow-xs group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                location.pathname.startsWith('/faq')
                  ? 'bg-cyan-600 border-cyan-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.5)]'
                  : 'bg-white border-slate-200/90 text-slate-700 group-hover:border-cyan-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.45)]'
              }`}>
                <HelpCircle size={15} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className={`relative text-[8.5px] xl:text-[9px] mt-1 leading-none transition-colors ${
                location.pathname.startsWith('/faq') ? 'text-cyan-600 font-bold' : 'font-semibold text-slate-600 group-hover:text-cyan-600'
              }`}>
                FAQ
              </span>
            </Link>

            {/* 4. Help */}
            <Link to="/help" className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform" title="Help & Support Desk">
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-sky-500/0 group-hover:bg-sky-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>

              <div className={`relative w-9 h-9 rounded-full border shadow-xs group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                location.pathname.startsWith('/help')
                  ? 'bg-sky-600 border-sky-600 text-white shadow-[0_0_14px_rgba(14,165,233,0.5)]'
                  : 'bg-white border-slate-200/90 text-slate-700 group-hover:border-sky-400 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:shadow-[0_0_16px_rgba(14,165,233,0.45)]'
              }`}>
                <Headphones size={15} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className={`relative text-[8.5px] xl:text-[9px] mt-1 leading-none transition-colors ${
                location.pathname.startsWith('/help') ? 'text-sky-600 font-bold' : 'font-semibold text-slate-600 group-hover:text-sky-600'
              }`}>
                Help
              </span>
            </Link>

            {/* 5. Contact Us */}
            <Link to="/contact-us" className="group relative flex flex-col items-center cursor-pointer p-0.5 transition-transform" title="Contact Cyber Crime Cell">
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/25 blur-md transition-all duration-300 pointer-events-none -top-0.5"></div>

              <div className={`relative w-9 h-9 rounded-full border shadow-xs group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                location.pathname.startsWith('/contact-us')
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-[0_0_14px_rgba(16,185,129,0.5)]'
                  : 'bg-white border-slate-200/90 text-slate-700 group-hover:border-emerald-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.45)]'
              }`}>
                <Phone size={15} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className={`relative text-[8.5px] xl:text-[9px] mt-1 leading-none transition-colors ${
                location.pathname.startsWith('/contact-us') ? 'text-emerald-600 font-bold' : 'font-semibold text-slate-600 group-hover:text-emerald-600'
              }`}>
                Contact
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls: Helpline 1930, Notification, and Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsHelplineModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/80 text-[10.5px] font-extrabold flex items-center gap-1 shadow-xs cursor-pointer"
              title="1930 Cyber Helpline"
            >
              <Phone size={11} className="text-red-500" />
              <span>1930</span>
            </button>

            <Link
              to="/notifications"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center relative text-slate-700 hover:text-blue-600 shadow-xs"
              title="Notifications"
            >
              <Bell size={14} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ef4444] text-white text-[7.5px] font-bold flex items-center justify-center shadow-xs">
                3
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="p-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================
          ROW 2: FLOATING CAPSULE NAVIGATION BAR (Desktop View)
          Compact & Slim with Animated Active Gradient Pill
          ========================================================= */}
      <div className="hidden lg:flex w-full justify-center px-3 xl:px-6 pt-0 pb-1.5">
        <nav
          aria-label="Main Navigation"
          className="inline-flex items-center bg-white rounded-full border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-0.5 max-w-full relative z-30"
        >
          {navItems.map((item, index) => {
            const isActive = checkIsActive(item);
            const isMenuOpen = activeDropdown === index;
            const nextItemActive = index < navItems.length - 1 && checkIsActive(navItems[index + 1]);

            return (
              <React.Fragment key={item.id}>
                {/* Navigation Tab with smooth Framer Motion active pill */}
                <div
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <NavLink
                    to={item.to}
                    className="relative px-2.5 xl:px-3 py-1 rounded-full flex items-center gap-1 text-[9.5px] xl:text-[10px] font-bold tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-200"
                  >
                    {/* Animated Active Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavCapsule"
                        className="absolute inset-0 bg-gradient-to-r from-[#0070f3] to-[#00b4d8] rounded-full shadow-[0_2px_8px_rgba(0,112,243,0.3)] z-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}

                    {/* Icon, Text, and Chevron with relative z-index above the animated pill */}
                    <span className="relative z-10 flex items-center">
                      {item.renderIcon(isActive)}
                    </span>

                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? 'text-white font-extrabold'
                          : 'text-slate-700 group-hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </span>

                    {item.hasChevron && (
                      <ChevronDown
                        size={9}
                        className={`relative z-10 transition-all duration-200 ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-blue-600'
                        } ${isMenuOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </NavLink>

                  {/* Dropdown Flyout Card for sections with sub-items */}
                  {item.hasChevron && isMenuOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 z-50 min-w-[220px] animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="bg-white rounded-2xl p-1.5 shadow-xl border border-slate-200/90">
                        <div className="px-2.5 py-1 border-b border-slate-100 mb-0.5 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                            {item.label}
                          </span>
                          <CheckCircle2 size={11} className="text-blue-500" />
                        </div>
                        {item.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.to}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span>{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* =========================================================
          MOBILE SLIDE-DOWN DRAWER MENU
          ========================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          
          {/* Quick Mobile Action Buttons Bar with Demo icon */}
          <div className="grid grid-cols-6 gap-1.5 pb-4 border-b border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDemoModalOpen(true);
              }}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <PlayCircle size={18} className="text-[#0070f3]" />
              <span className="text-[10px] font-semibold mt-1">Demo</span>
            </button>

            <Link
              to="/notifications"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ef4444] text-white text-[8px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="text-[10px] font-semibold mt-1">Alerts</span>
            </Link>

            <Link
              to="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Image size={18} />
              <span className="text-[10px] font-semibold mt-1">Gallery</span>
            </Link>

            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <HelpCircle size={18} />
              <span className="text-[10px] font-semibold mt-1">FAQ</span>
            </Link>

            <Link
              to="/help"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Headphones size={18} />
              <span className="text-[10px] font-semibold mt-1">Help</span>
            </Link>

            <Link
              to="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <Phone size={18} />
              <span className="text-[10px] font-semibold mt-1">Contact</span>
            </Link>
          </div>

          {/* Emergency Helpline Banner */}
          <div className="my-3 p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <ShieldAlert size={22} className="text-amber-300 shrink-0" />
              <div>
                <p className="text-[11px] font-bold tracking-wide uppercase">Cyber Crime Helpline</p>
                <p className="text-xs font-black tracking-wider text-amber-200">Dial 1930 (Toll Free 24/7)</p>
              </div>
            </div>
            <a
              href="tel:1930"
              className="px-3 py-1.5 bg-white text-blue-600 rounded-full text-xs font-bold shadow-xs hover:bg-blue-50 transition-colors"
            >
              Call Now
            </a>
          </div>

          {/* Navigation Accordion List */}
          <div className="flex flex-col gap-1 mt-2">
            {navItems.map((item) => {
              const isActive = checkIsActive(item);
              const isExpanded = mobileExpandedSection === item.id;

              return (
                <div key={item.id} className="rounded-xl border border-slate-100 overflow-hidden">
                  <div
                    className={`flex items-center justify-between px-3.5 py-2.5 transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0070f3] to-[#00b4d8] text-white shadow-xs'
                        : 'bg-slate-50/70 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <NavLink
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 text-xs font-bold tracking-wide flex-1"
                    >
                      {item.renderIcon(isActive)}
                      <span className={isActive ? 'text-white font-extrabold' : 'text-slate-800'}>
                        {item.label}
                      </span>
                    </NavLink>

                    {item.hasChevron && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedSection(isExpanded ? null : item.id)
                        }
                        className={`p-1 cursor-pointer ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.hasChevron && isExpanded && (
                    <div className="bg-white px-4 py-2 border-t border-slate-100 flex flex-col gap-1.5">
                      {item.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          <ChevronRight size={12} className="text-blue-500 shrink-0" />
                          <span>{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Language selector in mobile menu */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold flex items-center gap-1.5">
              <Globe size={14} className="text-blue-600" />
              Language:
            </span>
            <div className="flex items-center gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.label)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    selectedLang === lang.label
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* =========================================================
          HELPLINE EMERGENCY MODAL
          ========================================================= */}
      {isHelplineModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsHelplineModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  National Cyber Helpline
                </h3>
                <p className="text-xs text-slate-500">24/7 Citizen Cyber Crime Support</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 text-center">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Toll Free Emergency Number
              </p>
              <a
                href="tel:1930"
                className="text-3xl font-black text-blue-600 hover:underline tracking-wider"
              >
                1930
              </a>
              <p className="text-[11px] text-slate-500 mt-1">
                Immediate financial fraud freezing & victim reporting assistance
              </p>
            </div>

            <div className="space-y-2 mb-5 text-xs text-slate-600">
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Report within 2-4 hours to maximize chances of fund recovery.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Keep transaction SMS, bank account details, and screenshot evidence ready.</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to="/incident-report"
                onClick={() => setIsHelplineModalOpen(false)}
                className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                File Online Report
              </Link>
              <Link
                to="/cyber-assistance"
                onClick={() => setIsHelplineModalOpen(false)}
                className="flex-1 py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Assistance Directory
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          INTERACTIVE PLATFORM DEMO MODAL
          ========================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0070f3] to-[#0047cc] text-white flex items-center justify-center shrink-0 shadow-md">
                <PlayCircle size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  CR-OD Intelligence Platform Demo
                </h3>
                <p className="text-xs text-slate-500">Cyber Intelligence Operations & Safety Framework</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Explore cyber threat intelligence feeds, incident response protocols, citizen cyber awareness resources, and verified legal directories.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <Link
                to="/services"
                onClick={() => setIsDemoModalOpen(false)}
                className="p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-50 border border-blue-100 text-left transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Shield size={15} />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Our Services</h4>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Threat Intel & VAPT Analysis</p>
              </Link>

              <Link
                to="/incident-report"
                onClick={() => setIsDemoModalOpen(false)}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-50 border border-amber-100 text-left transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ShieldAlert size={15} />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Incident Report</h4>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Online Cyber Crime Reporting</p>
              </Link>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#0070f3] to-[#0052cc] hover:from-[#0060d0] hover:to-[#0041a8] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
