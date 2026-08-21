import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, Image, MessageCircle, HelpCircle, Phone, Menu, X } from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer whitespace-nowrap"
    : "hover:text-blue-600 pb-1 cursor-pointer transition-colors whitespace-nowrap";

const mobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-600 cursor-pointer text-center"
    : "hover:text-blue-600 cursor-pointer transition-colors text-center";

const iconLinkClass = ({ isActive }) =>
  isActive
    ? "flex flex-col items-center cursor-pointer text-blue-600 transition-colors relative"
    : "flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors relative";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fbf7f0] text-gray-900 px-4 md:px-8 xl:px-10 py-2 sticky top-0 z-50 shadow-sm border-b border-[#eaddc9] flex flex-col gap-2 md:gap-1">
      
      {/* ================= TOP ROW ================= */}
      <div className="flex justify-between items-start md:items-center w-full relative">
        
        {/* Left Logo Block */}
        <Link to="/" className="flex items-start md:items-center gap-2 md:gap-4 shrink-0 cursor-pointer">
          <div className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(26,115,232,0.3)] shrink-0">
            <img src="/logo.jpg" alt="CR-OD Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center mt-1 md:mt-0">
            <h1 className="text-lg md:text-xl xl:text-2xl font-extrabold tracking-widest leading-none text-gray-900">CR-OD</h1>
            <p className="text-[8px] md:text-[10px] xl:text-[11px] font-medium text-blue-600 leading-tight mt-1">Cyber Threat Intelligence</p>
          </div>
        </Link>

        {/* Absolute Dead-Center Heading (Desktop Only) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex-col items-center w-full max-w-[700px] pointer-events-none mt-1">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl xl:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 drop-shadow-[0_2px_4px_rgba(6,182,212,0.2)] pointer-events-auto uppercase">
              CR OD Cyber Threat Intelligence
            </h2>
            
            {/* Cyber Divider */}
            <div className="flex items-center w-full max-w-[350px] mt-1.5 mb-2 opacity-80 pointer-events-none">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] mx-2 shrink-0"></div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>

            <p className="text-[10px] xl:text-[11px] font-semibold text-gray-500 tracking-widest uppercase whitespace-nowrap pointer-events-auto">
              Awareness • Knowledge • Protection • Your Safety is Our Responsibility
            </p>
          </div>
        </div>

        {/* Right Logo Block & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-6 justify-end shrink-0">
          <div className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden flex items-center justify-center bg-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-105 transition-transform cursor-pointer shrink-0">
            <img src="/jagannath-logo.jpg" alt="Lord Jagannath, Subhadra, Balabhadra Logo" className="w-full h-full object-cover" />
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden text-gray-800 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ================= BOTTOM ROW (Desktop Only) ================= */}
      <div className="hidden lg:flex justify-between items-center w-full mt-2 pb-1 px-4 lg:px-8 xl:px-12 gap-2">
        
        {/* Left Side - Nav Links (Part 1) */}
        <div className="flex-1 flex justify-start">
          <div className="flex flex-nowrap items-center gap-x-3 xl:gap-x-4 text-[9px] xl:text-[10px] font-bold text-gray-500">
            <NavLink to="/" className={navLinkClass} title="Home">HOME</NavLink>
            <NavLink to="/about-us" className={navLinkClass} title="About Us">ABOUT US</NavLink>
            <NavLink to="/services" className={navLinkClass} title="Our Services">OUR SERVICES</NavLink>
            <NavLink to="/public-cyber-services" className={navLinkClass} title="Public Cyber Services">PUBLIC CYBER...</NavLink>
            <NavLink to="/incident-report" className={navLinkClass} title="Cyber Crime Incident Report">CYBER CRIME...</NavLink>
            <NavLink to="/cyber-assistance" className={navLinkClass} title="Cyber Assistance Directory">CYBER ASSIST...</NavLink>
            <NavLink to="/cyber-legal-directory" className={navLinkClass} title="Cyber & Legal Directory">CYBER & LEGAL...</NavLink>
          </div>
        </div>

        {/* Center - Search Bar (Middle, original size) */}
        <div className="shrink-0 flex justify-center px-2">
          <div className="relative w-[180px] xl:w-[240px] group cursor-text">
            {/* Outer Glowing Effect */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 rounded-full opacity-40 blur-[3px] group-hover:opacity-80 group-hover:blur-[4px] transition-all duration-500"></div>
            
            {/* Inner Content */}
            <div className="relative flex items-center bg-white rounded-full h-10 xl:h-11 w-full border border-[#eaddc9] group-hover:border-blue-400 transition-colors shadow-inner">
              <Search className="absolute left-4 text-blue-500 group-hover:text-blue-600 transition-colors pointer-events-none" size={18} />
              <input 
                type="text" 
                placeholder="Search threat intel..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent pl-11 pr-4 text-sm focus:outline-none text-gray-900 placeholder-gray-400 relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Nav Links (Part 2) & Action Icons */}
        <div className="flex-1 flex justify-end items-center gap-2 xl:gap-4">
          <div className="flex flex-nowrap items-center justify-end gap-x-3 xl:gap-x-4 text-[9px] xl:text-[10px] font-bold text-gray-500 pr-3 border-r border-[#eaddc9]">
            <NavLink to="/public-info" className={navLinkClass} title="Public Information Directory">PUBLIC INFO...</NavLink>
            <NavLink to="/become-member" className={navLinkClass} title="Become a Member">BECOME MEMBER</NavLink>
            <NavLink to="/partnership" className={navLinkClass} title="Cybersecurity Partnership">CYBERSECURITY...</NavLink>
          </div>
          
          <div className="flex items-center gap-3 xl:gap-4 pl-3 text-[9px] xl:text-[10px] text-gray-500 shrink-0">
            <NavLink to="/notifications" className={iconLinkClass}>
              <Bell size={16} className="mb-1" />
              <span className="whitespace-nowrap">Notification</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center font-bold">3</span>
            </NavLink>
            <NavLink to="/gallery" className={iconLinkClass}>
              <Image size={16} className="mb-1" />
              <span className="whitespace-nowrap">Gallery</span>
            </NavLink>
            <NavLink to="/faq" className={iconLinkClass}>
              <MessageCircle size={16} className="mb-1" />
              <span className="whitespace-nowrap">FAQ</span>
            </NavLink>
            <NavLink to="/help" className={iconLinkClass}>
              <HelpCircle size={16} className="mb-1" />
              <span className="whitespace-nowrap">Help</span>
            </NavLink>
            <NavLink to="/contact-us" className={iconLinkClass}>
              <Phone size={16} className="mb-1" />
              <span className="whitespace-nowrap">Contact Us</span>
            </NavLink>
          </div>
        </div>

      </div>

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-2 pt-4 border-t border-[#eaddc9] pb-2">
          
          {/* Mobile Center Heading */}
          <div className="text-center mb-4 flex flex-col items-center">
            <h2 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700 drop-shadow-[0_2px_4px_rgba(6,182,212,0.2)] uppercase">
              CR OD Cyber Threat Intelligence
            </h2>
            
            {/* Cyber Divider */}
            <div className="flex items-center w-[80%] max-w-[200px] my-1.5 opacity-80">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] mx-2 shrink-0"></div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>

            <p className="text-[8px] font-semibold text-gray-500 tracking-widest uppercase">
              Awareness • Knowledge • Protection <br/> Your Safety is Our Responsibility
            </p>
          </div>

          {/* Mobile Search */}
          <div className="relative w-full group cursor-text">
            {/* Outer Glowing Effect */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 rounded-full opacity-40 blur-[3px] group-hover:opacity-80 group-hover:blur-[4px] transition-all duration-500"></div>
            
            {/* Inner Content */}
            <div className="relative flex items-center bg-white rounded-full h-11 w-full border border-[#eaddc9] group-hover:border-blue-400 transition-colors shadow-inner">
              <Search className="absolute left-4 text-blue-500 group-hover:text-blue-600 transition-colors pointer-events-none" size={18} />
              <input 
                type="text" 
                placeholder="Search threat intel..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-transparent pl-11 pr-4 text-sm focus:outline-none text-gray-900 placeholder-gray-400 relative z-10"
              />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col items-center gap-y-4 mt-4 text-xs font-bold text-gray-500">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Home">HOME</NavLink>
            <NavLink to="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="About Us">ABOUT US</NavLink>
            <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Our Services">OUR SERVICES</NavLink>
            <NavLink to="/public-cyber-services" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Public Cyber Services">PUBLIC CYBER SERVICES</NavLink>
            <NavLink to="/incident-report" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Cyber Crime Incident Report">CYBER CRIME INCIDENT REPORT</NavLink>
            <NavLink to="/cyber-assistance" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Cyber Assistance Directory">CYBER ASSISTANCE DIRECTORY</NavLink>
            <NavLink to="/cyber-legal-directory" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Cyber & Legal Directory">CYBER & LEGAL DIRECTORY</NavLink>
            <NavLink to="/public-info" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Public Information Directory">PUBLIC INFORMATION DIRECTORY</NavLink>
            <NavLink to="/become-member" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Become a Member">BECOME A MEMBER</NavLink>
            <NavLink to="/partnership" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClass} title="Cybersecurity Partnership">CYBERSECURITY PARTNERSHIP</NavLink>
          </div>

          {/* Mobile Action Icons */}
          <div className="flex justify-between items-center text-xs text-gray-500 mt-4 border-t border-gray-100 pt-4 px-2">
            <NavLink to="/notifications" onClick={() => setIsMobileMenuOpen(false)} className={iconLinkClass}>
              <Bell size={20} className="mb-1" />
              <span className="text-[10px] whitespace-nowrap">Notification</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center font-bold">3</span>
            </NavLink>
            <NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={iconLinkClass}>
              <Image size={20} className="mb-1" />
              <span className="text-[10px] whitespace-nowrap">Gallery</span>
            </NavLink>
            <NavLink to="/faq" onClick={() => setIsMobileMenuOpen(false)} className={iconLinkClass}>
              <MessageCircle size={20} className="mb-1" />
              <span className="text-[10px] whitespace-nowrap">FAQ</span>
            </NavLink>
            <NavLink to="/help" onClick={() => setIsMobileMenuOpen(false)} className={iconLinkClass}>
              <HelpCircle size={20} className="mb-1" />
              <span className="text-[10px] whitespace-nowrap">Help</span>
            </NavLink>
            <NavLink to="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className={iconLinkClass}>
              <Phone size={20} className="mb-1" />
              <span className="text-[10px] whitespace-nowrap">Contact Us</span>
            </NavLink>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
