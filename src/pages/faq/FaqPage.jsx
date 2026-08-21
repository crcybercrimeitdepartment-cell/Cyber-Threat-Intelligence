import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { faqData } from '../../data/faq/faqData.js';

const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="mb-4 shadow-sm rounded-[4px] bg-white overflow-hidden">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-4 bg-white transition-all duration-300 text-left ${
                    isOpen 
                    ? 'border border-orange-400' 
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
            >
                <span className={`font-semibold text-[14px] ${isOpen ? 'text-gray-800' : 'text-gray-600'}`}>
                    {item.question}
                </span>
                <span className="text-gray-400 ml-4 flex-shrink-0">
                    {isOpen ? <Icons.Minus size={16} strokeWidth={3} /> : <Icons.Plus size={16} strokeWidth={3} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white border-x border-b border-orange-400"
                    >
                        {/* Orange Accent Line */}
                        <div className="w-16 h-[3px] bg-orange-400 ml-4 mt-2"></div>
                        <div className="p-4 pt-3 text-gray-600 text-[13px] leading-relaxed">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqHeader = ({ onAddQuestionClick, onUploadPhotoClick }) => {
    return (
        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-8 mb-12 relative z-10 mt-14 md:mt-2">
            <div className="w-full bg-[#0e3b9f] rounded-[16px] overflow-hidden relative min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-center shadow-lg border border-[#0c389f]/30 py-8 md:py-0">
                
                {/* ── LEFT ILLUSTRATION BLOCK (3D Image) ── */}
                <div className="hidden md:flex absolute bottom-0 left-0 w-64 h-[240px] bg-[#6366f1] rounded-tr-[40px] flex-col items-center justify-end z-10">
                    {/* Floating Bubble */}
                    <motion.div 
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        className="absolute -top-6 -right-6 bg-[#8b5cf6] p-4 rounded-[20px] rounded-bl-sm shadow-xl transform rotate-6 z-20"
                    >
                        <div className="w-10 h-6 bg-white/20 rounded-md border-2 border-white/40 flex items-center justify-center">
                            <div className="w-6 h-1.5 bg-white/50 rounded-full"></div>
                        </div>
                    </motion.div>
                    
                    {/* Character Image Container */}
                    <div className="relative h-[85%] w-[75%] border-[6px] border-b-0 border-[#0e3b9f] rounded-t-[40px]">
                        {/* Image Mask for scaling without overflowing border */}
                        <div className="absolute inset-0 rounded-t-[34px] overflow-hidden shadow-inner">
                            <img 
                                src="/images/3d_girl_laptop.jpg" 
                                alt="Online Assistance" 
                                className="w-full h-full object-cover transform scale-[1.2]"
                            />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT ILLUSTRATION BLOCK (3D Image) ── */}
                <div className="hidden md:flex absolute bottom-0 right-0 w-64 h-[240px] bg-[#6366f1] rounded-tl-[40px] flex-col items-center justify-end z-10">
                    {/* Floating Bubble */}
                    <motion.div 
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="absolute -top-8 -left-10 bg-[#8b5cf6] p-5 rounded-[24px] rounded-br-sm shadow-xl transform -rotate-6 z-20"
                    >
                        <div className="w-12 h-8 bg-white/20 rounded-md border-2 border-white/40 flex items-center justify-center">
                            <div className="w-8 h-2 bg-white/50 rounded-full"></div>
                        </div>
                    </motion.div>
                    
                    {/* Character Image Container */}
                    <div className="relative h-[85%] w-[75%] border-[6px] border-b-0 border-[#0e3b9f] rounded-t-[40px]">
                        {/* Image Mask for scaling without overflowing border */}
                        <div className="absolute inset-0 rounded-t-[34px] overflow-hidden shadow-inner">
                            <img 
                                src="/images/3d_boy_pointing.jpg" 
                                alt="Online Guidance" 
                                className="w-full h-full object-cover transform scale-[1.2]"
                            />
                        </div>
                    </div>
                </div>

                {/* ── CENTER CONTENT ── */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-[550px] mt-4 mb-4">
                    <h1 className="text-3xl md:text-[40px] font-medium text-white mb-8 tracking-wide drop-shadow-md">
                        How can we help?
                    </h1>
                    
                    {/* Highlighted Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-4 sm:mt-2 w-full max-w-[320px] sm:max-w-none mx-auto">
                        <button 
                            onClick={onUploadPhotoClick} 
                            className="flex items-center justify-center gap-2.5 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <Icons.UploadCloud size={20} className="sm:w-[22px] sm:h-[22px]" />
                            <span className="text-[15px] sm:text-[16px]">Upload Photos</span>
                        </button>
                        
                        <button 
                            onClick={onAddQuestionClick} 
                            className="flex items-center justify-center gap-2.5 w-full sm:w-auto bg-white text-[#0e3b9f] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <Icons.MessageSquarePlus size={20} className="sm:w-[22px] sm:h-[22px]" />
                            <span className="text-[15px] sm:text-[16px]">Add Question</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

const FaqPage = () => {
    const [openId, setOpenId] = useState(null); // All items closed by default
    const [activeForm, setActiveForm] = useState(null); // Controls which form is visible: 'question', 'upload', or null

    return (
        <div className="min-h-[calc(100vh-100px)] w-full relative overflow-hidden flex flex-col items-center justify-start pt-6 pb-28">

            {/* ── CUSTOM BANNER / HEADING ── */}
            <FaqHeader 
                onAddQuestionClick={() => setActiveForm(activeForm === 'question' ? null : 'question')} 
                onUploadPhotoClick={() => setActiveForm(activeForm === 'upload' ? null : 'upload')} 
            />

            {/* ── INTERACTIVE FORMS ── */}
            <AnimatePresence mode="wait">
                {activeForm === 'question' && (
                    <motion.div 
                        key="question-form"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="w-full max-w-[900px] px-4 md:px-8 mb-6 z-10 origin-top"
                    >
                        <div className="bg-white rounded-[16px] shadow-xl border border-gray-100 p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Ask a Question</h3>
                                <button onClick={() => setActiveForm(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Icons.X size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Problem Title</label>
                                    <input type="text" placeholder="E.g. Unable to report an incident" className="w-full p-3.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all text-[15px]" />
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Describe your question or problem</label>
                                    <textarea rows="4" placeholder="Please provide details about your issue..." className="w-full p-3.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all resize-none text-[15px]"></textarea>
                                </div>
                                <div className="flex justify-end pt-3">
                                    <button 
                                        onClick={() => {
                                            alert("Your question has been submitted!");
                                            setActiveForm(null);
                                        }}
                                        className="bg-[#1746c8] text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-md shadow-blue-500/30"
                                    >
                                        Submit Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeForm === 'upload' && (
                    <motion.div 
                        key="upload-form"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="w-full max-w-[900px] px-4 md:px-8 mb-6 z-10 origin-top"
                    >
                        <div className="bg-white rounded-[16px] shadow-xl border border-gray-100 p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Upload Photo for Assistance</h3>
                                <button onClick={() => setActiveForm(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Icons.X size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                            
                            <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-10 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-blue-400 transition-colors cursor-pointer group">
                                <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Icons.UploadCloud size={32} className="text-[#1746c8]" />
                                </div>
                                <p className="text-gray-800 font-medium mb-1">Click to upload or drag and drop</p>
                                <p className="text-gray-500 text-sm mb-6">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm">
                                    Select File
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT CONTAINER (SPEECH BUBBLE) ── */}
            <div className="relative w-full max-w-[900px] px-4 md:px-8 z-10 mt-6">
                
                {/* The Box itself (Cream Color, Less Rounded) */}
                <div className="relative bg-[#f6f7f2] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 py-10 md:px-12 md:py-14">
                    
                    {/* HUGE Speech Bubble Tail on the Left */}
                    <div 
                        className="absolute -bottom-[60px] left-[15%] w-0 h-0"
                        style={{
                            borderTop: '65px solid #f6f7f2',
                            borderRight: '50px solid transparent',
                            filter: 'drop-shadow(-5px 10px 5px rgba(0,0,0,0.05))'
                        }}
                    />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative z-10">
                        
                        {/* ── LEFT: ACCORDION ── */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <div className="w-full">
                                {faqData.slice(0, 4).map((item) => (
                                    <AccordionItem 
                                        key={item.id}
                                        item={item}
                                        isOpen={openId === item.id}
                                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: ILLUSTRATION COMPOSITE (Redesigned & Eye-Catching) ── */}
                        <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[250px] md:min-h-[350px] mt-8 md:mt-0">
                            
                            {/* Organic Light Blobs behind illustration */}
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-orange-200/50 rounded-full filter blur-[50px] z-0" />
                            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-200/50 rounded-full filter blur-[40px] z-0" />

                            {/* Huge 3D-like Question Mark */}
                            <motion.div 
                                animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-0"
                            >
                                <span 
                                    className="text-[180px] md:text-[240px] font-black leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-500"
                                    style={{
                                        filter: 'drop-shadow(5px 12px 15px rgba(245, 158, 11, 0.4))'
                                    }}
                                >
                                    ?
                                </span>
                            </motion.div>

                            {/* Person/Laptop Composite Area */}
                            <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="relative z-10 flex flex-col items-center justify-center mr-16 md:mr-32"
                            >
                                {/* Thought Bubble with Animated Dots */}
                                <div className="absolute -top-12 -right-16 bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-sm shadow-[0_12px_30px_rgba(0,0,0,0.1)] flex items-center justify-center transform rotate-6 z-20">
                                    <div className="flex gap-1.5 items-center justify-center">
                                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.span>
                                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-orange-500 rounded-full"></motion.span>
                                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.span>
                                    </div>
                                </div>

                                {/* Person Avatar Container */}
                                <div className="relative w-28 h-28 md:w-40 md:h-40 z-10 mt-6">
                                    
                                    {/* The Circular 3D Image (Replaces flat user icon) */}
                                    <div className="w-full h-full rounded-full overflow-hidden shadow-[0_15px_35px_rgba(59,130,246,0.35)] border-4 border-white bg-blue-100 relative z-10">
                                        <img 
                                            src="/images/3d_boy_laptop.jpg" 
                                            alt="Support Avatar" 
                                            className="w-full h-full object-cover transform scale-[1.35] translate-y-3 md:translate-y-4 hover:scale-[1.4] transition-transform duration-500" 
                                        />
                                    </div>
                                    
                                    {/* Laptop floating in front (Glassmorphism) */}
                                    <div className="absolute -bottom-2 -right-4 md:-bottom-4 md:-right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-2 md:p-3 border border-white z-20 hover:scale-105 transition-transform">
                                        <div className="bg-orange-50 rounded-xl p-2 md:p-2.5 text-orange-500 shadow-inner">
                                            <Icons.Monitor size={20} strokeWidth={2.5} className="md:w-[28px] md:h-[28px]" />
                                        </div>
                                    </div>
                                    
                                    {/* Decorative Spinning Ring */}
                                    <motion.div 
                                        animate={{ rotate: 360 }} 
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} 
                                        className="absolute -inset-3 md:-inset-4 border-2 border-dashed border-blue-200 rounded-full opacity-80 z-0 pointer-events-none" 
                                    />
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
