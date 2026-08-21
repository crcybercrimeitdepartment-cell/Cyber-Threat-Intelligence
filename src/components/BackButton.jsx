import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not render on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full px-4 md:px-8 xl:px-12 pt-6 z-50 pointer-events-none">
      <button 
        onClick={() => navigate(-1)}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.05)] rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-[0_4px_15px_rgba(37,99,235,0.15)] transition-all active:scale-95 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
