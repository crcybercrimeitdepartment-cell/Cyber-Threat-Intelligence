import React from 'react';
import { servicesData } from '../../data/services/servicesData';
import NavPageHeader from '../../components/NavPageHeader';

const serviceStyles = `
  @keyframes cardEntrance {
    0% { opacity: 0; transform: translateY(60px) scale(0.9); }
    50% { opacity: 0.5; transform: translateY(-5px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-service-card {
    opacity: 0;
    transform-origin: bottom center;
    animation: cardEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const ServicesPage = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: serviceStyles }} />
      <div className="min-h-[calc(100vh-100px)] w-full pt-4 pb-20 relative overflow-hidden">
      {/* Main Page Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Outside the Page Box */}
        <NavPageHeader
          title="Our Services"
          description="Explore CR-OD CTI services for cyber safety, incident assistance, victim support, threat awareness, legal information, cybersecurity education, public resources, and community-focused digital protection."
        />

        {/* The "Page" Box containing content */}
        <div className="bg-transparent relative min-h-[300px]">
          
          <div className="bg-transparent p-2 sm:p-4 md:p-8 rounded-[1.5rem] sm:rounded-[2rem]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
              {servicesData.map((service, index) => (
                <div 
                  key={index} 
                  className="animate-service-card bg-white rounded-tl-lg rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-br-lg sm:rounded-tl-[1rem] sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] sm:rounded-br-[1rem] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] sm:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] sm:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] relative border border-gray-50"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  
                  {/* Top Image Section */}
                  <div className="h-28 sm:h-44 md:h-48 xl:h-52 w-full relative overflow-hidden rounded-bl-[1.5rem] sm:rounded-bl-[3rem] z-10 bg-gray-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Subtle inner shadow overlay for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] sm:shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-bl-[1.5rem] sm:rounded-bl-[3rem]"></div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-3 sm:p-5 xl:p-6 text-center flex flex-col items-center flex-1 relative z-0 -mt-1 sm:-mt-2">
                    <h3 className="text-[13px] sm:text-lg xl:text-xl font-black text-gray-900 mb-1.5 sm:mb-2 tracking-tight leading-tight">{service.title}</h3>
                    <p className="text-[9px] sm:text-xs xl:text-[13px] text-gray-500 mb-3 sm:mb-6 leading-snug sm:leading-relaxed font-medium flex-1 line-clamp-3">
                      {service.description}
                    </p>
                    
                    <button className="flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[#0a0a0a] text-white text-[8px] sm:text-[10px] xl:text-xs font-bold uppercase tracking-wider rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg active:scale-95">
                      <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      Learn More
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
    </>
  );
};

export default ServicesPage;
