import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  X,
  MessageSquare,
  LifeBuoy,
  FileText,
  Send,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  heroData,
  sponsorBrands,
  statsData,
  helpCategories,
  coursesData
} from '../../data/help/helpData.js';

export default function HelpPage() {
  const [internalStep, setInternalStep] = useState(0); // 0: Hero & Search, 1: Help Articles Grid
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticle, setActiveArticle] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactTab, setContactTab] = useState('chat'); // 'chat' | 'ticket'
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [toast, setToast] = useState('');
  const [feedbackState, setFeedbackState] = useState({});

  // Chat State for Live Support Simulator
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! 👋 Welcome to Support. How can we help you today?' }
  ]);
  const [inputChat, setInputChat] = useState('');

  const stepRef = useRef(0);
  const cooldownRef = useRef(false);
  const containerRef = useRef(null);
  const slide2Ref = useRef(null);

  useEffect(() => {
    stepRef.current = internalStep;
  }, [internalStep]);

  // Toast Helper
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };


  // Filter Articles based on search query & selected category
  const filteredArticles = coursesData.filter((article) => {
    const matchesCategory =
      selectedCategory === 'ALL' || article.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Handle Search Input & auto switch to articles slide if user types
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() && internalStep === 0) {
      setInternalStep(1);
    }
  };

  const handlePopularSearchClick = (tag) => {
    setSearchQuery(tag);
    setSelectedCategory('ALL');
    setInternalStep(1);
  };

  // Handle Chat Message Send
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userMsg = inputChat.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputChat('');

    // Simulate Agent Auto-Reply
    setTimeout(() => {
      let reply = "Thanks for reaching out! A support specialist is reviewing your query. In the meantime, check our Help Articles!";
      const lower = userMsg.toLowerCase();
      if (lower.includes('password') || lower.includes('reset')) {
        reply = "To reset your password, visit Account Settings > Security or click 'View Article' on the Password Reset guide.";
      } else if (lower.includes('billing') || lower.includes('refund') || lower.includes('invoice')) {
        reply = "You can manage subscriptions, payment methods, and PDF invoices under Billing > Subscription Settings.";
      } else if (lower.includes('domain') || lower.includes('dns') || lower.includes('404')) {
        reply = "For DNS setup, point your CNAME record to host.domain.com and A-record to 76.76.21.21.";
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 900);
  };

  // Handle Ticket Submit
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMsg.trim()) return;
    setIsContactOpen(false);
    setTicketSubject('');
    setTicketMsg('');
    showToast('🎉 Support ticket submitted! Check your email for tracking.');
  };

  // Feedback thumb click handler
  const handleFeedback = (articleId, type) => {
    setFeedbackState((prev) => ({ ...prev, [articleId]: type }));
    showToast(type === 'yes' ? '👍 Thanks for your positive feedback!' : '🙏 Thanks! We will improve this article.');
  };

  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-transparent text-[#1E3038] flex flex-col animate-fade-in font-sans select-none pt-4 pb-20 relative">
      {/* Toast Notification Floating Banner */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1E3038] text-white border border-[#E8AF9B]/50 px-5 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#E8AF9B]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Navigation Bar */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-display font-extrabold text-base text-[#1E3038] tracking-tight pl-24 sm:pl-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF9B] animate-pulse" />
          <span>{heroData.brandName}</span>
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          <button
            onClick={() => setIsContactOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#E8AF9B] hover:bg-[#dfa08b] text-[#1E3038] font-extrabold text-xs shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Support</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mt-4 mb-auto py-1 px-4 max-w-6xl mx-auto w-full">
        <div
          ref={containerRef}
          className="relative w-full min-h-[610px] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2a5b6b] via-[#3d7484] to-[#d69f8b] shadow-2xl text-white border border-white/30 transition-all duration-500"
        >
          {/* SLIDE 1: Hero & Real-Time Search Hub */}
          {internalStep === 0 && (
          <div
            className="p-5 sm:p-7 md:p-8 flex flex-col justify-start md:justify-between space-y-6 md:space-y-0 pb-20 md:pb-8 animate-fade-in"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Content & Interactive Search Bar */}
                <div className="md:col-span-7 space-y-3.5">
                  <span className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-mono font-extrabold text-[#E8AF9B] border border-white/20 uppercase tracking-widest">
                    <LifeBuoy className="w-3.5 h-3.5" />
                    <span>Knowledge Base & Support</span>
                  </span>

                  <h1 className="text-3xl sm:text-4xl md:text-[40px] font-black font-display leading-[1.1] tracking-tight text-white drop-shadow-sm whitespace-pre-line">
                    {heroData.title}
                  </h1>

                  <p className="text-slate-100/90 text-xs sm:text-sm max-w-md font-sans leading-relaxed">
                    {heroData.subtitle}
                  </p>

                  {/* Real-time Search Box */}
                  <div className="relative max-w-lg pt-1">
                    <div className="relative flex items-center">
                      <Search className="absolute left-4 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={heroData.searchPlaceholder}
                        className="w-full pl-11 pr-10 py-3 rounded-full bg-white/95 text-[#1E3038] placeholder-slate-400 font-sans text-xs sm:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E8AF9B] transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Popular Search Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2.5 text-[11px]">
                      <span className="text-white/70 font-semibold">Popular:</span>
                      {heroData.popularSearches.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handlePopularSearchClick(tag)}
                          className="bg-white/15 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full font-medium transition-all hover:scale-105"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Illustration & Quick Help Action Card */}
                <div className="md:col-span-5 flex flex-col justify-center items-center">
                  <div className="flex relative w-full max-w-[280px] sm:max-w-[320px] items-center justify-center">
                    <img
                      src={heroData.illustrationSrc}
                      alt={heroData.illustrationAlt}
                      className="w-full h-auto object-contain mix-blend-multiply filter contrast-110 brightness-105"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>

                  <div className="w-full max-w-sm mt-2 flex items-center justify-center space-x-3">
                    <button
                      onClick={() => {
                        setInternalStep(1);
                        setSelectedCategory('ALL');
                      }}
                      className="flex-1 bg-white/15 hover:bg-white/25 text-white border border-white/20 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#E8AF9B]" />
                      <span>Browse 12 Articles</span>
                    </button>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="flex-1 bg-[#E8AF9B] hover:bg-[#dfa08b] text-[#1E3038] py-2 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 shadow-lg transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Support</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sponsor & Trust Badges */}
              <div className="pt-3 pb-1 border-t border-white/15">
                <div className="flex flex-wrap items-center justify-between gap-3 text-white font-display text-sm sm:text-base font-bold">
                  {sponsorBrands.map((brand) => (
                    <React.Fragment key={brand.id}>
                      {brand.type === 'serif' && (
                        <div className="flex items-center space-x-1.5">
                          <span className="text-base italic font-serif text-[#E8AF9B]">{brand.prefix}</span>
                          <span>{brand.name}</span>
                        </div>
                      )}
                      {brand.type === 'mono' && (
                        <div className="tracking-tighter uppercase font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">
                          {brand.badge}
                        </div>
                      )}
                      {brand.type === 'italic' && (
                        <div className="italic font-serif text-sm">
                          {brand.name}
                        </div>
                      )}
                      {brand.type === 'sans' && (
                        <div className="font-sans font-extrabold tracking-wide text-xs">
                          {brand.name}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom 3-Column Stats Container */}
            <div className="bg-[#FFF9F6] text-[#1E3038] p-4 sm:p-5 rounded-[22px] border border-white/80 shadow-xl mt-6 mb-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                {statsData.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={`space-y-1 relative pl-1 ${
                      index > 0 ? 'border-t md:border-t-0 md:border-l border-slate-200/80 pt-2 md:pt-0 md:pl-4' : ''
                    }`}
                  >
                    <div className="relative inline-block">
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#E8AF9B]/40 rounded-full z-0" />
                      <span className="relative z-10 text-2xl sm:text-3xl font-black font-display tracking-tight text-[#1E3038]">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans max-w-xs mx-auto md:mx-0">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* SLIDE 2: Interactive Help Knowledge Base Cards & Categories */}
          {internalStep === 1 && (
          <div
            ref={slide2Ref}
            className="p-5 sm:p-7 pb-20 flex flex-col justify-start animate-fade-in"
          >
            {/* Header & Search Bar inside Slide 2 */}
            <div className="space-y-3 mb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="pb-1">
                    <button
                      onClick={() => setInternalStep(0)}
                      className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#1E3038]/40 hover:bg-[#1E3038]/60 text-white border border-white/20 text-xs font-bold transition-all duration-300 shadow-md mb-2"
                    >
                      <span>Back to Search</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase text-[#E8AF9B] bg-white/10 px-3 py-0.5 rounded-full border border-white/20">
                    HELP CENTER CATALOG ({filteredArticles.length} ARTICLES)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                    Knowledge Base Articles
                  </h2>
                </div>

                {/* Search Input Filter */}
                <div className="relative w-full md:w-72 mt-2 md:mt-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter articles..."
                    className="w-full pl-9 pr-8 py-2 rounded-full bg-white/95 text-[#1E3038] text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8AF9B] shadow-md"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {helpCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-[#E8AF9B] text-[#1E3038] shadow-md scale-105'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zero State Result Notice */}
            {filteredArticles.length === 0 && (
              <div className="bg-[#FFF9F6] text-[#1E3038] p-8 rounded-[24px] text-center max-w-md mx-auto my-8 border border-white/80 shadow-xl space-y-3">
                <LifeBuoy className="w-12 h-12 mx-auto text-[#306C7E]" />
                <h3 className="text-lg font-bold font-display">No help articles found</h3>
                <p className="text-xs text-slate-600 font-sans">
                  We couldn't find any articles matching "{searchQuery}". Try searching for something else or contact our 24/7 support team.
                </p>
                <div className="pt-2 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-full text-xs font-bold"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-4 py-2 bg-[#306C7E] hover:bg-[#265766] text-white rounded-full text-xs font-bold"
                  >
                    Ask Live Agent
                  </button>
                </div>
              </div>
            )}

            {/* 12 Help Article Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {filteredArticles.map((article, idx) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  style={{ transitionDelay: `${Math.min(idx + 1, 8) * 50}ms` }}
                  className="group relative bg-[#FFF9F6] text-[#1E3038] p-4 sm:p-5 rounded-[22px] border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-[700ms] cubic-bezier(0.16,1,0.3,1) hover:-translate-y-2 hover:scale-[1.02] flex flex-col justify-between cursor-pointer select-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-extrabold tracking-widest uppercase text-[#306C7E] bg-[#306C7E]/10 px-2 py-0.5 rounded font-mono">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold font-display leading-snug text-[#1E3038] group-hover:text-[#306C7E] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-[11px] text-slate-600 font-sans mt-2 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200/80 flex items-end justify-between">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#306C7E] flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                      <span>{article.linkText}</span>
                    </span>

                    <div className="w-8 h-8 opacity-85 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0">
                      {article.iconType === 'clock' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="40" stroke="#306C7E" strokeWidth="6" />
                          <line x1="50" y1="50" x2="50" y2="24" stroke="#306C7E" strokeWidth="6" strokeLinecap="round" />
                          <line x1="50" y1="50" x2="68" y2="50" stroke="#E8AF9B" strokeWidth="6" strokeLinecap="round" />
                        </svg>
                      )}
                      {article.iconType === 'laptop' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <rect x="15" y="25" width="70" height="50" rx="6" fill="#E8AF9B" fillOpacity="0.3" stroke="#1E3038" strokeWidth="4" />
                          <rect x="25" y="35" width="22" height="30" rx="3" fill="#306C7E" />
                        </svg>
                      )}
                      {article.iconType === 'chart' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="35" stroke="#1E3038" strokeWidth="4" fill="none" />
                          <path d="M50 50 L50 15 A35 35 0 0 1 85 50 Z" fill="#306C7E" />
                        </svg>
                      )}
                      {article.iconType === 'rocket' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <path d="M50 15 C65 25 75 45 75 65 L25 65 C25 45 35 25 50 15 Z" fill="#306C7E" stroke="#1E3038" strokeWidth="4" />
                          <circle cx="50" cy="42" r="8" fill="#E8AF9B" />
                        </svg>
                      )}
                      {article.iconType === 'shoppingBag' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <rect x="25" y="35" width="50" height="50" rx="6" fill="#306C7E" stroke="#1E3038" strokeWidth="4" />
                          <path d="M38 35 V26 C38 19 62 19 62 26 V35" stroke="#E8AF9B" strokeWidth="5" />
                        </svg>
                      )}
                      {article.iconType === 'shield' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <path d="M50 15 L80 25 V50 C80 70 50 85 50 85 C50 85 20 70 20 50 V25 Z" fill="#306C7E" stroke="#1E3038" strokeWidth="4" />
                        </svg>
                      )}
                      {article.iconType === 'sparkles' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <path d="M50 15 C50 35 65 50 85 50 C65 50 50 65 50 85 C50 65 35 50 15 50 C35 50 50 35 50 15 Z" fill="#E8AF9B" stroke="#1E3038" strokeWidth="3" />
                        </svg>
                      )}
                      {article.iconType === 'dollar' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="35" fill="#306C7E" stroke="#1E3038" strokeWidth="4" />
                          <text x="50" y="63" fontSize="38" fontWeight="bold" fill="#E8AF9B" textAnchor="middle" fontFamily="sans-serif">$</text>
                        </svg>
                      )}
                      {article.iconType === 'palette' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <path d="M50 20 C25 20 15 35 15 55 C15 75 35 85 55 85 C65 85 70 78 70 72 C70 67 66 65 71 60 C76 55 85 60 85 45 C85 30 70 20 50 20 Z" fill="#E8AF9B" stroke="#1E3038" strokeWidth="4" />
                        </svg>
                      )}
                      {article.iconType === 'lightning' && (
                        <svg viewBox="0 0 100 100" fill="none">
                          <path d="M55 15 L25 52 H48 L42 85 L75 48 H52 L55 15 Z" fill="#E8AF9B" stroke="#306C7E" strokeWidth="4" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* Action Button positioned below the container */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setInternalStep(internalStep === 0 ? 1 : 0)}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#1E3038] hover:bg-black text-white border border-white/20 text-sm font-bold transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <span>{internalStep === 0 ? 'View Help Catalog' : 'Back to Search'}</span>
            {internalStep === 0 ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </main>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-[110] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFF9F6] text-[#1E3038] w-full max-w-2xl rounded-[28px] p-6 sm:p-8 shadow-2xl border border-white relative max-h-[85vh] overflow-y-auto custom-scrollbar space-y-5">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-200/60 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold tracking-widest uppercase bg-[#306C7E] text-white px-2.5 py-0.5 rounded font-mono">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeArticle.readTime}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-[#1E3038] leading-snug">
                {activeArticle.title}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans border-t border-b border-slate-200/80 py-4">
              <p className="font-semibold text-slate-900">{activeArticle.summary}</p>

              <div className="space-y-2 bg-slate-100 p-4 rounded-xl border border-slate-200/60">
                <h4 className="font-bold text-[#306C7E] font-display text-xs uppercase tracking-wider">
                  Step-by-Step Resolution Guide:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                  <li>Navigate to your Workspace Dashboard and select <strong>Settings</strong>.</li>
                  <li>Locate the target configuration panel matching this issue.</li>
                  <li>Review active tokens, credentials, or billing details.</li>
                  <li>Click <strong>Save Changes</strong> and allow 1-2 minutes for system sync.</li>
                </ol>
              </div>

              <p>
                If you encounter any unexpected error messages during setup, our automated system monitors logs continuously. Feel free to initiate a live chat session with our 24/7 technical team.
              </p>
            </div>

            {/* Helpful Feedback Section */}
            <div className="flex items-center justify-between bg-[#306C7E]/10 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#1E3038]">Was this article helpful?</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFeedback(activeArticle.id, 'yes')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    feedbackState[activeArticle.id] === 'yes'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => handleFeedback(activeArticle.id, 'no')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    feedbackState[activeArticle.id] === 'no'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 24/7 CONTACT SUPPORT & LIVE CHAT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[110] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFF9F6] text-[#1E3038] w-full max-w-xl rounded-[28px] shadow-2xl border border-white overflow-hidden flex flex-col h-[520px]">
            {/* Modal Top Header */}
            <div className="bg-[#306C7E] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#E8AF9B]" />
                <span className="font-display font-black text-base">24/7 Support Center</span>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-bold">
              <button
                onClick={() => setContactTab('chat')}
                className={`flex-1 py-3 text-center flex items-center justify-center space-x-1.5 transition-colors ${
                  contactTab === 'chat'
                    ? 'bg-[#FFF9F6] text-[#306C7E] border-b-2 border-[#306C7E]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant Live Chat</span>
              </button>
              <button
                onClick={() => setContactTab('ticket')}
                className={`flex-1 py-3 text-center flex items-center justify-center space-x-1.5 transition-colors ${
                  contactTab === 'ticket'
                    ? 'bg-[#FFF9F6] text-[#306C7E] border-b-2 border-[#306C7E]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </div>

            {/* Tab 1: Live Chat Simulator */}
            {contactTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs font-sans leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#306C7E] text-white rounded-br-none'
                            : 'bg-slate-200 text-slate-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="pt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#306C7E]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#306C7E] hover:bg-[#265766] text-white rounded-full transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Submit Support Ticket Form */}
            {contactTab === 'ticket' && (
              <form onSubmit={handleSubmitTicket} className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subject / Issue Summary</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Cannot access billing page"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#306C7E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Detailed Description</label>
                  <textarea
                    required
                    rows={4}
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe what happened and any error messages..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#306C7E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#306C7E] hover:bg-[#265766] text-white font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  Send Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}

     
    </div>
  );
}
