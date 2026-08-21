import React, { useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import SharedPagination from '../components/SharedPagination';
import { useNativeScroll } from '../hooks/useNativeScroll';
import { CYBER_INCIDENT_CARDS, CYBER_INCIDENT_DETAILS } from '../data/homepage/CyberIncidentVictimSupportPageData';

const cardHeaderMapping = {
 "Cyber Incident Assistance": { tag: "CYBER INCIDENT", title: "ASSISTANCE" },
 "Financial Fraud Victim Support": { tag: "FINANCIAL FRAUD", title: "VICTIM SUPPORT" },
 "Account Compromise Support": { tag: "ACCOUNT COMPROMISE", title: "SUPPORT" },
 "Identity Theft Support": { tag: "IDENTITY THEFT", title: "SUPPORT" },
 "Online Harassment Incident Support": { tag: "ONLINE HARASSMENT", title: "INCIDENT SUPPORT" },
 "Cyberbullying Incident Support": { tag: "CYBERBULLEYING", title: "INCIDENT SUPPORT" },
 "Data Breach Victim Support": { tag: "DATA BREACH", title: "VICTIM SUPPORT" },
 "Malware Incident Support": { tag: "MALWARE", title: "INCIDENT SUPPORT" },
 "Evidence Preservation Support": { tag: "EVIDENCE PRESERVATION", title: "SUPPORT" },
 "Incident Follow-up Support": { tag: "INCIDENT FOLLOW-UP", title: "SUPPORT" }
};

export default function CyberIncidentVictimSupport() {
 const sliderRef = useRef(null);
 const totalItems = CYBER_INCIDENT_CARDS.length;
 const [expandedCard, setExpandedCard] = useState(null);

 const { 
 currentIndex, 
 maxIndex, 
 scrollToIndex, 
 slideLeft, 
 slideRight 
 } = useNativeScroll(sliderRef, totalItems);

 const handleCardClick = (num) => {
 setExpandedCard(expandedCard === num ? null : num);
 };

 const topicIds = [
 "incident-assistance",
 "financial-victim-support",
 "account-compromise-support",
 "identity-theft-support",
 "harassment-support",
 "cyberbullying-support",
 "data-breach-victim-support",
 "malware-incident-support",
 "evidence-preservation-support",
 "incident-follow-up-support"
 ];

 return (
 <section className="w-full bg-white py-12 md:py-16 relative overflow-hidden">
 <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 relative">

 {/* Title centered */}
 <div className="flex flex-col items-center justify-center mb-10 gap-2">
  <div className="flex items-center justify-center gap-4">
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 <h2 className="text-xl md:text-2xl font-black text-[#0a1526] tracking-wider uppercase text-center">
 Cyber Incident & Victim Support
 </h2>
 <div className="h-[2px] w-12 bg-cyan-500 hidden sm:block"></div>
 </div>
  <p className="text-[14px] md:text-[15px] text-slate-500 font-medium text-center max-w-2xl px-4 leading-relaxed">
    Get immediate assistance and guidance if you've been affected by a cyber incident.
  </p>
</div>

 {/* Cards Wrapper */}
 <div className="relative max-w-[1400px] mx-auto">
 {/* Custom Cards Layout Row */}
 <div
 ref={sliderRef}
 className="cyber-incident-cards-container flex overflow-x-auto gap-6 pt-6 pb-20 scroll-smooth snap-x snap-mandatory scrollbar-none px-4 group/carousel"
 >
 {CYBER_INCIDENT_CARDS.map((card, idx) => {
 const themeColors = [
 { border: "border-t-rose-500", tagText: "text-rose-500" },
 { border: "border-t-blue-500", tagText: "text-blue-500" },
 { border: "border-t-emerald-500", tagText: "text-emerald-500" },
 { border: "border-t-purple-500", tagText: "text-purple-500" },
 { border: "border-t-orange-500", tagText: "text-orange-500" }
 ];
 const theme = themeColors[idx % themeColors.length];
 const topicId = topicIds[idx];
 const details = CYBER_INCIDENT_DETAILS[topicId] || { description: card.desc, content: "" };
 const headerInfo = cardHeaderMapping[card.title] || { tag: "SUPPORT", title: card.title.toUpperCase() };

 return (
 <div
 key={idx}
 className={`cyber-support-card bg-white border border-slate-100 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col justify-start p-6 shrink-0 w-[85vw] sm:w-[350px] md:w-[320px] lg:w-[340px] snap-center border-t-[6px] ${theme.border} 
 transition-all duration-500 ease-out
 group-hover/carousel:blur-[3px] group-hover/carousel:opacity-60 group-hover/carousel:scale-95
 hover:!blur-none hover:!opacity-100 hover:!scale-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 z-10 hover:z-20`}
 >
 <div className="space-y-4 flex-1">
 {/* Header Block */}
 <div className="text-left border-b border-slate-100 pb-3">
 <span className="block text-[10px] font-black tracking-wider text-slate-400 uppercase">
 {headerInfo.tag}
 </span>
 <h3 className="text-[13px] font-black text-slate-800 tracking-wide uppercase leading-tight mt-1">
 {headerInfo.title}
 </h3>
 </div>

 {/* Description */}
 <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed text-left">
 {details.description}
 </p>

 <div className="h-[1px] w-full bg-slate-100/80 my-2"></div>

 {/* Content Section */}
 <div className="text-left space-y-2 flex-1">
 <span className={`block font-black text-[10px] tracking-wider uppercase ${theme.tagText}`}>
 Recovery Guidelines & Details
 </span>
 <div 
 className="text-[11px] leading-relaxed text-slate-600 font-medium pr-2 custom-scrollbar"
 >
 {details.content}
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Navigation Controls */}
 <div className="mt-8">
 <SharedPagination 
 totalItems={maxIndex + 1}
 currentIndex={currentIndex}
 onPageChange={(idx) => scrollToIndex(idx)}
 onPrev={slideLeft}
 onNext={slideRight}
 />
 </div>

 </div>

 </div>
 </section>
 );
}


