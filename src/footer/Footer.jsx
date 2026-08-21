import { Globe, MessageCircle, Share2, Mail, ShieldCheck, MapPin, Fingerprint, ShieldAlert, Lock, Search, Eye, AlertTriangle, Server, Network } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#fbf7f0] overflow-hidden font-sans border-t-4 border-cyan-500">
      
      {/* ================= DESKTOP BACKGROUND (SVG Wave) ================= */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <rect width="1000" height="1000" fill="#fbf7f0" />
          <path d="M0,0 L420,0 C480,300 320,700 460,1000 L0,1000 Z" fill="#06b6d4" />
          <path d="M0,0 L400,0 C460,300 300,700 440,1000 L0,1000 Z" fill="#0a1526" />
        </svg>
      </div>

      {/* ================= DECORATIVE SVGS (From Image Template) ================= */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none overflow-hidden max-w-[1400px] mx-auto">
        {/* Small Scattered Cyber Crime Background Icons */}
        <div className="absolute top-[15%] left-[45%] opacity-[0.04]"><Lock size={32} className="text-[#0a1526]" /></div>
        <div className="absolute top-[80%] left-[52%] opacity-[0.04]"><Fingerprint size={28} className="text-[#0a1526]" /></div>
        <div className="absolute top-[25%] left-[75%] opacity-[0.04]"><Search size={36} className="text-[#0a1526]" /></div>
        <div className="absolute top-[65%] left-[90%] opacity-[0.04]"><ShieldAlert size={28} className="text-[#0a1526]" /></div>
        <div className="absolute top-[15%] left-[85%] opacity-[0.04]"><Eye size={30} className="text-[#0a1526]" /></div>
        <div className="absolute top-[80%] left-[38%] opacity-[0.04]"><AlertTriangle size={24} className="text-[#0a1526]" /></div>
        <div className="absolute top-[45%] left-[95%] opacity-[0.04]"><Server size={28} className="text-[#0a1526]" /></div>
        <div className="absolute top-[85%] left-[72%] opacity-[0.04]"><Network size={32} className="text-[#0a1526]" /></div>

        <div className="absolute top-[35%] left-[45%] lg:left-[48%] opacity-40">
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="#facc15" strokeWidth="2.5"><circle cx="18" cy="18" r="12" /><circle cx="32" cy="32" r="12" /></svg>
        </div>
        <div className="absolute top-[25%] left-[62%] opacity-30">
          <svg width="22" height="18" viewBox="0 0 28 20" fill="#06b6d4"><rect x="0" y="0" width="4" height="20" rx="1"/><rect x="8" y="0" width="4" height="20" rx="1"/><rect x="16" y="0" width="4" height="20" rx="1"/><rect x="24" y="0" width="4" height="20" rx="1"/></svg>
        </div>
        <div className="absolute top-[45%] right-[32%] lg:right-[35%] opacity-20">
          <svg width="8" height="45" viewBox="0 0 8 45" fill="#64748b"><rect x="2.5" y="0" width="3" height="45" rx="1.5" /><rect x="0" y="10" width="8" height="4" rx="1" /><rect x="0" y="30" width="8" height="4" rx="1" /></svg>
        </div>
        <div className="absolute bottom-[20%] right-[10%] opacity-20 hidden lg:block">
          <svg width="18" height="26" viewBox="0 0 18 26" fill="#64748b">
            <rect x="0" y="0" width="4" height="4" /><rect x="7" y="0" width="4" height="4" /><rect x="14" y="0" width="4" height="4" /><rect x="0" y="7" width="4" height="4" /><rect x="7" y="7" width="4" height="4" /><rect x="14" y="7" width="4" height="4" /><rect x="0" y="14" width="4" height="4" /><rect x="7" y="14" width="4" height="4" /><rect x="14" y="14" width="4" height="4" /><rect x="0" y="21" width="4" height="4" /><rect x="7" y="21" width="4" height="4" /><rect x="14" y="21" width="4" height="4" />
          </svg>
        </div>
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch md:items-center md:py-8 lg:py-10 px-0 md:px-6">
        
        {/* Left Dark Content */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start text-white bg-[#0a1526] md:bg-transparent pt-12 pb-16 px-6 md:pt-0 md:pb-0 md:px-0 md:pl-10 lg:pl-16 relative">
          
          {/* MOBILE WAVE SEPARATOR (Only visible on small screens) */}
          <div className="absolute top-full left-0 w-full overflow-hidden leading-none md:hidden z-20 -mt-[1px]">
             <svg className="relative block w-full h-[40px]" preserveAspectRatio="none" viewBox="0 0 1000 100">
               <path d="M0,0 C300,100 700,0 1000,100 L1000,0 Z" fill="#06b6d4" />
               <path d="M0,0 C300,80 700,-20 1000,80 L1000,0 Z" fill="#0a1526" />
             </svg>
          </div>

          <div className="w-full flex justify-between items-center mb-6 md:pr-12">
            <h2 className="text-2xl lg:text-3xl font-black tracking-widest text-white drop-shadow-md">CR-OD</h2>
            <div className="hidden lg:grid grid-cols-3 gap-1 opacity-20">
              {[...Array(9)].map((_, i) => (<div key={i} className="w-1 h-1 bg-white rounded-sm"></div>))}
            </div>
          </div>
          
          <div className="w-full flex justify-center md:justify-start md:pl-4">
            <div className="w-40 h-40 lg:w-44 lg:h-44 rounded-full border-4 border-cyan-500 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-white flex items-center justify-center p-2 relative group">
              <div className="absolute inset-0 border-4 border-white rounded-full z-10 pointer-events-none"></div>
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Right Light Content */}
        <div className="w-full md:w-[60%] flex flex-col md:flex-row md:pl-24 lg:pl-32 gap-10 md:gap-6 lg:gap-8 px-6 md:px-0 pt-16 md:pt-0 pb-10 md:pb-0">
          
          {/* About Column */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-3 relative inline-block">
              About CR-OD
              <span className="absolute -bottom-1 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-10 h-1 bg-cyan-500 rounded-full"></span>
            </h3>
            <p className="text-[13px] text-gray-700 leading-relaxed font-medium mt-1">
              Awareness. Knowledge. Protection. Your Safety is Our Responsibility. We build a cyber-secure society through continuous awareness, actionable intelligence, and robust support frameworks.
            </p>
            
            <div className="mt-6 flex flex-col gap-2 items-center md:items-start">
              <span className="text-[10px] font-extrabold text-gray-900 uppercase tracking-widest">Follow Us</span>
              <div className="flex gap-2.5">
                <a href="#" className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 hover:-translate-y-1 transition-all shadow-md shadow-cyan-500/30"><Globe size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 hover:-translate-y-1 transition-all shadow-md shadow-cyan-500/30"><MessageCircle size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 hover:-translate-y-1 transition-all shadow-md shadow-cyan-500/30"><Share2 size={14} /></a>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="hidden md:block w-px bg-gray-300 mx-1"></div>
          <div className="md:hidden h-px w-full bg-gray-300 my-1"></div>

          {/* Contact / Title Column */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left pt-2 md:pt-0">
            <h2 className="text-xl font-black text-[#0a1526] leading-tight mb-0.5">
              CYBER THREAT <span className="text-cyan-500">INTELLIGENCE</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-medium mb-5">Official Portal</p>
            
            <div className="flex flex-col gap-4 w-full max-w-[280px] md:max-w-none mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 group cursor-pointer bg-white/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/30 group-hover:bg-cyan-600 transition-colors"><Mail size={14} /></div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">contact@crod.in</span>
                  <span className="text-[10px] text-gray-500">Official email address</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 group cursor-pointer bg-white/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/30 group-hover:bg-cyan-600 transition-colors"><ShieldCheck size={14} /></div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">Report Cybercrime</span>
                  <span className="text-[10px] text-gray-500">24/7 Incident Response</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 group cursor-pointer bg-white/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/30 group-hover:bg-cyan-600 transition-colors"><MapPin size={14} /></div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">New Delhi, India</span>
                  <span className="text-[10px] text-gray-500">Headquarters</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="relative z-10 w-full bg-[#050a14] py-3 text-center px-4">
        <p className="text-[11px] text-gray-400 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} CR-OD Cyber Threat Intelligence. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
