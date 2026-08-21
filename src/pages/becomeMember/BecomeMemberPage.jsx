import React, { useState } from 'react';
import { 
  Fingerprint, ShieldCheck, Award, Zap, Terminal, Building, 
  Eye, AlertTriangle, BarChart, Target, Globe, Cpu,
  ArrowRight, MoveRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Logo = ({ color = "#139a9c", textColor = "#139a9c", Icon = Fingerprint, text = "LILO" }) => (
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 flex items-center justify-center">
      <Icon color={color} strokeWidth={2.5} className="w-full h-full" />
    </div>
    <span className="font-black text-xl mt-1 tracking-widest" style={{ color: textColor }}>{text}</span>
  </div>
);

// --- CSS Art Components (No SVGs) ---
const ArtShip = () => (
  <div className="absolute bottom-0 w-full h-[240px] overflow-hidden rounded-bl-2xl">
    <div className="absolute -bottom-[120px] -left-[100px] w-[350px] h-[200px] bg-[#f0a202] rounded-[50%]"></div>
    <div className="absolute -bottom-[100px] right-[10px] w-[300px] h-[180px] bg-[#f0a202] rounded-[50%]"></div>
    <div className="absolute -bottom-[130px] -right-[100px] w-[300px] h-[200px] bg-[#f0a202] rounded-[50%]"></div>
    <div className="absolute bottom-[65px] left-[15%] w-[120px] h-[100px] z-10 drop-shadow-md">
      <div className="absolute top-[10px] right-[25px] w-[14px] h-[50px] bg-[#1B2945]">
        <div className="absolute top-[8px] w-full h-[6px] bg-[#f0a202]"></div>
        <div className="absolute top-[20px] w-full h-[6px] bg-[#f0a202]"></div>
      </div>
      <div className="absolute top-[35px] left-[25px] w-[55px] h-[25px] bg-[#8CD5D4] rounded-tl-[15px] rounded-tr-[5px]">
        <div className="absolute bottom-0 -left-[12px] w-[12px] h-[14px] bg-[#1B2945] rounded-l-[3px]"></div>
        <div className="absolute top-[8px] left-[12px] w-[7px] h-[7px] bg-[#139a9c] rounded-full"></div>
        <div className="absolute top-[8px] left-[26px] w-[7px] h-[7px] bg-[#139a9c] rounded-full"></div>
        <div className="absolute top-[8px] left-[40px] w-[7px] h-[7px] bg-[#139a9c] rounded-full"></div>
      </div>
      <div className="absolute top-[60px] left-[0px] w-[110px] h-[35px] bg-[#C5E8E7] rounded-b-[20px] rounded-tl-[6px]">
        <div className="absolute top-[10px] left-[15px] w-[8px] h-[10px] bg-[#139a9c] rounded-[3px]"></div>
        <div className="absolute top-[10px] left-[35px] w-[8px] h-[10px] bg-[#1B2945] rounded-[3px]"></div>
        <div className="absolute top-[10px] left-[55px] w-[8px] h-[10px] bg-[#1B2945] rounded-[3px]"></div>
        <div className="absolute top-[10px] left-[75px] w-[8px] h-[10px] bg-[#139a9c] rounded-[3px]"></div>
      </div>
    </div>
    <div className="absolute -bottom-[100px] -left-[50px] w-[280px] h-[180px] bg-white rounded-[50%] z-20"></div>
    <div className="absolute -bottom-[90px] -right-[20px] w-[250px] h-[150px] bg-white rounded-[50%] z-20"></div>
    <div className="absolute -bottom-[70px] -left-[30px] w-[200px] h-[120px] bg-[#0B7A79] rounded-[50%] z-30"></div>
    <div className="absolute -bottom-[80px] right-[10px] w-[220px] h-[130px] bg-[#0B7A79] rounded-[50%] z-30"></div>
  </div>
);

const ArtAbstractCurve = () => (
  <>
    <div className="absolute top-0 right-0 h-full w-[60px] pointer-events-none overflow-hidden rounded-r-2xl">
      <div className="absolute top-[-10%] right-[-50px] w-[100px] h-[120%] bg-[#EBF4F4] rounded-[50%]"></div>
    </div>
    <div className="absolute bottom-0 w-full h-[160px] pointer-events-none z-0 overflow-hidden rounded-b-2xl">
      <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border-[12px] border-[#EBF4F4]"></div>
      <div className="absolute bottom-12 left-20 w-10 h-10 rounded-full bg-[#f0a202] shadow-sm"></div>
      <div className="absolute bottom-24 left-8 w-4 h-4 rounded-full bg-[#139a9c] opacity-70"></div>
      <div className="absolute bottom-8 right-12 w-[70px] h-[70px] rounded-full border-[3px] border-dashed border-[#139a9c] opacity-20"></div>
    </div>
  </>
);

const ArtMountains = () => (
  <div className="absolute bottom-0 left-0 w-full h-[150px] overflow-hidden rounded-b-2xl opacity-80 pointer-events-none">
     <div className="absolute bottom-[-20px] left-[-20px] w-0 h-0 border-l-[150px] border-r-[150px] border-b-[180px] border-transparent border-b-white/20"></div>
     <div className="absolute bottom-[-10px] right-[-50px] w-0 h-0 border-l-[120px] border-r-[120px] border-b-[150px] border-transparent border-b-white/30"></div>
     <div className="absolute bottom-[-30px] left-[60px] w-0 h-0 border-l-[100px] border-r-[100px] border-b-[120px] border-transparent border-b-white/40"></div>
  </div>
);

const ArtRadar = () => (
  <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full border-[2px] border-white/20 overflow-hidden pointer-events-none">
     <div className="absolute inset-4 rounded-full border-[2px] border-white/10"></div>
     <div className="absolute inset-10 rounded-full border-[2px] border-white/10"></div>
     <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10"></div>
     <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white/10"></div>
  </div>
);

const ArtCyberGrid = () => (
  <div className="absolute bottom-[-20px] left-[-20px] w-[120%] h-[150px] opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #ffffff 100%), linear-gradient(90deg, transparent 95%, #ffffff 100%)', backgroundSize: '30px 30px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom' }}></div>
);

const ArtSkyline = () => (
  <div className="absolute bottom-0 left-0 w-full h-[120px] flex items-end opacity-20 pointer-events-none">
     <div className="w-[15%] h-[40%] bg-black ml-[5%]"></div>
     <div className="w-[20%] h-[80%] bg-black ml-[2%]"></div>
     <div className="w-[12%] h-[60%] bg-black ml-[2%]"></div>
     <div className="w-[25%] h-[100%] bg-black ml-[2%] relative"><div className="absolute top-[10px] left-1/2 w-[4px] h-[30px] bg-black -translate-x-1/2 -translate-y-full"></div></div>
     <div className="w-[15%] h-[50%] bg-black ml-[2%]"></div>
  </div>
);

const ArtOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
     <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
     <div className="absolute top-20 right-[-20px] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
     <div className="absolute bottom-[-30px] right-20 w-40 h-40 bg-black/20 rounded-full blur-2xl"></div>
  </div>
);

const ArtStripes = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}></div>
);

const ArtDataBars = () => (
  <div className="absolute bottom-4 left-4 right-4 h-[80px] flex items-end gap-2 opacity-20 pointer-events-none">
     {[40, 70, 30, 90, 50, 80, 20, 60].map((h, i) => (
        <div key={i} className="flex-1 bg-black rounded-t-sm" style={{ height: `${h}%` }}></div>
     ))}
  </div>
);

const ArtRings = () => (
  <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] pointer-events-none overflow-hidden opacity-10">
     <div className="absolute inset-0 rounded-full border-[20px] border-black"></div>
     <div className="absolute inset-8 rounded-full border-[15px] border-black"></div>
     <div className="absolute inset-16 rounded-full bg-black"></div>
  </div>
);

const ArtSun = () => (
  <div className="absolute bottom-0 w-full h-[150px] overflow-hidden rounded-b-2xl pointer-events-none">
     <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] bg-white/20 rounded-full"></div>
     <div className="absolute bottom-[-20px] left-[-10%] w-[120%] h-[60px] bg-black/10 rounded-[50%]"></div>
     <div className="absolute bottom-[-40px] left-[-20%] w-[140%] h-[70px] bg-black/20 rounded-[50%]"></div>
  </div>
);

const ArtTechSquares = () => (
  <div className="absolute bottom-[-20px] right-[-20px] w-[150px] h-[150px] opacity-10 pointer-events-none">
     <div className="absolute top-0 right-0 w-[80px] h-[80px] border-[6px] border-black rotate-45"></div>
     <div className="absolute bottom-10 right-10 w-[60px] h-[60px] border-[6px] border-black rotate-12"></div>
     <div className="absolute bottom-0 left-10 w-[40px] h-[40px] bg-black rotate-45"></div>
  </div>
);

// --- Data Configuration ---
const CARDS_DATA = [
  { id: 1, type: "ship", title: "Premium Member", color: "#139a9c", iconColor: "#139a9c", textColor: "text-white/90", titleColor: "text-white", logoColor: "#139a9c", logoBg: "bg-white", icon: Fingerprint, logoText: "LILO", desc: "Gain exclusive access to advanced security tools, premium resources, and a dedicated professional network.", Art: ArtShip },
  { id: 2, type: "abstract", title: "Verified Member", color: "#FFFFFF", iconColor: "#139a9c", textColor: "text-slate-800", titleColor: "text-slate-900", logoColor: "#139a9c", logoBg: "bg-transparent", icon: ShieldCheck, logoText: "CERT", desc: "Join our active cyber resilience community for individuals and organizations.", Art: ArtAbstractCurve },
  { id: 3, type: "mountains", title: "Gold Member", color: "#3B82F6", iconColor: "#3B82F6", textColor: "text-white/90", titleColor: "text-white", logoColor: "#3B82F6", logoBg: "bg-white", icon: Award, logoText: "GOLD", desc: "Unlock priority threat intel and round-the-clock emergency support.", Art: ArtMountains },
  { id: 4, type: "radar", title: "Platinum Member", color: "#10B981", iconColor: "#10B981", textColor: "text-white/90", titleColor: "text-white", logoColor: "#10B981", logoBg: "bg-white", icon: Zap, logoText: "PLAT", desc: "Early access to zero-day vulnerability reports and beta tools.", Art: ArtRadar },
  { id: 5, type: "cyberGrid", title: "Cyber Elite", color: "#0F172A", iconColor: "#0F172A", textColor: "text-slate-300", titleColor: "text-white", logoColor: "#0F172A", logoBg: "bg-slate-100", icon: Terminal, logoText: "ELIT", desc: "Elite networking with top CISOs and advanced penetration testing tools.", Art: ArtCyberGrid },
  { id: 6, type: "skyline", title: "Enterprise", color: "#8B5CF6", iconColor: "#8B5CF6", textColor: "text-white/90", titleColor: "text-white", logoColor: "#8B5CF6", logoBg: "bg-white", icon: Building, logoText: "CORP", desc: "Full organizational coverage with dedicated account management.", Art: ArtSkyline },
  { id: 7, type: "orbs", title: "Visionary", color: "#6366F1", iconColor: "#6366F1", textColor: "text-white/90", titleColor: "text-white", logoColor: "#6366F1", logoBg: "bg-white", icon: Eye, logoText: "VISN", desc: "Access cutting-edge AI security models and predictive analytics.", Art: ArtOrbs },
  { id: 8, type: "stripes", title: "Action Team", color: "#EF4444", iconColor: "#EF4444", textColor: "text-white/90", titleColor: "text-white", logoColor: "#EF4444", logoBg: "bg-white", icon: AlertTriangle, logoText: "ACT", desc: "On-call rapid response team integration and active defense.", Art: ArtStripes },
  { id: 9, type: "dataBars", title: "Analyst", color: "#64748B", iconColor: "#64748B", textColor: "text-white/90", titleColor: "text-white", logoColor: "#64748B", logoBg: "bg-white", icon: BarChart, logoText: "DATA", desc: "Deep dive into raw telemetry data and forensic artifacts.", Art: ArtDataBars },
  { id: 10, type: "rings", title: "Defender", color: "#F43F5E", iconColor: "#F43F5E", textColor: "text-white/90", titleColor: "text-white", logoColor: "#F43F5E", logoBg: "bg-white", icon: Target, logoText: "CORE", desc: "Solidify your infrastructure with our core hardening frameworks.", Art: ArtRings },
  { id: 11, type: "sun", title: "Global Intel", color: "#F59E0B", iconColor: "#F59E0B", textColor: "text-white/90", titleColor: "text-white", logoColor: "#F59E0B", logoBg: "bg-white", icon: Globe, logoText: "GLOB", desc: "Global threat intelligence feeds from across 150+ countries.", Art: ArtSun },
  { id: 12, type: "techGrid", title: "Innovator", color: "#06B6D4", iconColor: "#06B6D4", textColor: "text-white/90", titleColor: "text-white", logoColor: "#06B6D4", logoBg: "bg-white", icon: Cpu, logoText: "INNO", desc: "Shape the future of cybersecurity with our research grants.", Art: ArtTechSquares }
];

// --- Card Component (Fixed Size 320x400) ---
const MembershipCard = ({ card, isClicked }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.05}
      transitionSpeed={1000}
      className="relative w-[320px] h-[400px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group"
      style={{ backgroundColor: card.color }}
    >
      {/* Dynamic Art */}
      <card.Art />

      {/* Top Right Logo Cutout */}
      {card.logoBg !== "bg-transparent" ? (
        <div className={`absolute -top-[45px] -right-[45px] w-[160px] h-[160px] ${card.logoBg} rounded-full flex items-end justify-start p-8 pl-8 pb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 z-10`}>
          <Logo color={card.iconColor} textColor={card.logoColor} text={card.logoText} Icon={card.icon} />
        </div>
      ) : (
        <div className="absolute top-[25px] right-[25px] group-hover:scale-110 transition-transform duration-500 z-10">
          <Logo color={card.iconColor} textColor={card.logoColor} text={card.logoText} Icon={card.icon} />
        </div>
      )}

      {/* Card Name */}
      <div className="absolute top-[40px] left-[30px] z-20 max-w-[160px] pr-2">
        <h3 className={`${card.titleColor} font-black text-[25px] leading-tight drop-shadow-sm`}>
          {card.title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
        </h3>
      </div>

      {/* Description */}
      <div className="absolute top-[140px] left-[30px] z-20">
        <p className={`${card.textColor} text-[13.5px] font-medium leading-relaxed max-w-[160px]`}>
          {card.desc}
        </p>
      </div>

      {/* Click to View Button */}
      <div className="absolute bottom-[30px] left-[30px] z-30">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className={`cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] group/btn ${
            card.titleColor === 'text-white' 
              ? 'bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30' 
              : 'bg-slate-900/5 backdrop-blur-md border border-slate-900/10 text-slate-900 hover:bg-slate-900/10'
          }`}
        >
          <span>Click to View</span>
          <div className="relative w-4 h-4 flex items-center justify-center">
             <ArrowRight 
               className={`absolute w-4 h-4 transition-all duration-300 ${isClicked ? 'translate-x-10 opacity-0' : 'group-hover/btn:translate-x-5 group-hover/btn:opacity-0'}`} 
               strokeWidth={2.5} 
             />
             <MoveRight 
               className={`absolute w-4 h-4 transition-all duration-300 ${isClicked ? 'translate-x-10 opacity-0' : '-translate-x-5 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100'}`} 
               strokeWidth={2.5} 
             />
          </div>
        </motion.button>
      </div>
    </Tilt>
  );
};

// --- Responsive Scaling Wrapper ---
const MembershipCardWrapper = ({ card }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset after animation so user can see it again (simulate routing delay)
    setTimeout(() => setIsClicked(false), 800);
  };

  return (
      <motion.div 
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { 
          opacity: 1, 
          y: 0, 
          transition: { type: "spring", stiffness: 80, damping: 15 } 
        }
      }}
      animate={isClicked ? { 
        scale: 0.85, 
        rotateY: 15,
        opacity: 0,
        zIndex: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      } : {}}
      whileTap={!isClicked ? { scale: 0.95, rotate: -1 } : {}}
      onClick={handleClick}
      className="card-wrapper-responsive relative mx-auto flex-shrink-0 cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div className="absolute top-0 left-0 w-[320px] h-[400px] origin-top-left card-scaler-responsive">
        <MembershipCard card={card} isClicked={isClicked} />
      </div>
    </motion.div>
  );
};

const BecomeMemberPage = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden bg-slate-50/50">
      <style>{`
        .card-wrapper-responsive {
          width: 140px; height: 175px;
        }
        .card-scaler-responsive {
          transform: scale(0.4375);
        }
        @media (min-width: 360px) {
          .card-wrapper-responsive { width: 155px; height: 193px; }
          .card-scaler-responsive { transform: scale(0.4843); }
        }
        @media (min-width: 400px) {
          .card-wrapper-responsive { width: 175px; height: 218px; }
          .card-scaler-responsive { transform: scale(0.5468); }
        }
        @media (min-width: 640px) {
          .card-wrapper-responsive { width: 280px; height: 350px; }
          .card-scaler-responsive { transform: scale(0.875); }
        }
        @media (min-width: 768px) {
          .card-wrapper-responsive { width: 220px; height: 275px; }
          .card-scaler-responsive { transform: scale(0.6875); }
        }
        @media (min-width: 1024px) {
          .card-wrapper-responsive { width: 290px; height: 362px; }
          .card-scaler-responsive { transform: scale(0.9062); }
        }
        @media (min-width: 1280px) {
          .card-wrapper-responsive { width: 275px; height: 343px; }
          .card-scaler-responsive { transform: scale(0.8593); }
        }
        @media (min-width: 1440px) {
          .card-wrapper-responsive { width: 320px; height: 400px; }
          .card-scaler-responsive { transform: scale(1); }
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 mt-16 md:mt-4"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 drop-shadow-sm leading-tight">
            Explore Memberships
          </h1>
          <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            Choose from a variety of distinct membership tiers to support digital resilience, collaborate on safety initiatives, and participate in creating a secure digital environment.
          </p>
        </motion.div>

        {/* 12-Card Grid Layout (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 lg:gap-8 w-full max-w-[1360px] mx-auto mt-8 justify-items-center"
        >
          {CARDS_DATA.map((card) => (
            <MembershipCardWrapper key={card.id} card={card} />
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default BecomeMemberPage;
