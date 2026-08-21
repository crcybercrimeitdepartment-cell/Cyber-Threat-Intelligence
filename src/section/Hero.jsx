import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import SharedPagination from '../components/SharedPagination';

const Hero = () => {
 const [currentSlide, setCurrentSlide] = useState(0);
 const heroImages = [
 '/hero/1.jpg',
 '/hero/2.jpg',
 '/hero/3.jpg',
 '/hero/4.jpg',
 '/hero/5.jpg',
 ];

 useEffect(() => {
 const timer = setInterval(() => {
 setCurrentSlide((prev) => (prev + 1) % heroImages.length);
 }, 5000); 
 return () => clearInterval(timer);
 }, []);

 const prevSlide = () => {
 setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
 };

 const nextSlide = () => {
 setCurrentSlide((prev) => (prev + 1) % heroImages.length);
 };

 return (
 <section className="relative w-full min-h-[80vh] flex items-center bg-[#fbf7f0] overflow-hidden">
 
 {/* ================= FULL BACKGROUND CROSSFADE CAROUSEL ================= */}
 <div className="absolute inset-0 z-0">
 {heroImages.map((src, idx) => (
 <div 
 key={idx} 
 className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
 currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
 }`}
 >
 <img 
 src={src} 
 alt={`Hero slide ${idx + 1}`} 
 className="w-full h-full object-cover object-center" 
 />
 {/* Removed artificial dark gradients to let the original image shine through exactly as requested */}
 </div>
 ))}
 </div>

 {/* ================= HERO CONTENT (ON TOP OF IMAGES) ================= */}
 {/* Aligned perfectly with the Navbar's 'HOME' link (px-10 + ml-96px = 136px) */}
 <div className="relative z-20 w-full flex flex-col items-start gap-3 pt-12 pb-28 md:py-10 pl-6 md:pl-16 xl:pl-[136px] pr-6">
 <h2 className="text-lg md:text-xl font-bold tracking-widest text-blue-800 uppercase mb-1 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
 Together For A
 </h2>
 <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] md:leading-tight text-gray-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
 SAFER DIGITAL <br className="hidden sm:block" />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">INDIA</span>
 </h1>
 <p className="text-base md:text-lg lg:text-xl text-gray-900 font-semibold mt-6 md:mt-4 leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
 Real-time cyber threat awareness, incident guidance, prevention resources and victim support for the public.
 </p>
 
 {/* Buttons */}
 <div className="flex flex-col sm:flex-row flex-wrap items-start gap-4 mt-8 md:mt-10 w-full sm:w-auto">
 <button className="w-full sm:w-auto bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold text-base transition-all duration-300 shadow-md shadow-red-500/20 hover:bg-red-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
 I Need Cyber Help
 </button>
 <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3.5 rounded-lg font-bold text-base transition-all duration-300 shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30">
 Check Cyber Threats
 </button>
 <button className="w-full sm:w-auto bg-white/90 border-2 border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-md">
 Learn Cyber Safety
 </button>
 </div>
 </div>

 {/* ================= CONTROLS ================= */}
 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full z-30">
 <SharedPagination 
 totalItems={heroImages.length}
 currentIndex={currentSlide}
 onPageChange={setCurrentSlide}
 onPrev={prevSlide}
 onNext={nextSlide}
 />
 </div>
 
 </section>
 );
};

export default Hero;
