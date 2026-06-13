import React from 'react';

const OfferBanner = () => {
  return (
    <div className="bg-terracotta text-cream text-sm py-2 px-4 text-center font-medium overflow-hidden border-b border-gold/20 relative z-50">
      <div className="inline-flex items-center space-x-8 whitespace-nowrap animate-marquee">
        <span className="flex items-center text-xs md:text-sm">
          <span className="mr-2">✨</span> 
          RAJA FESTIVAL SPECIAL: Get 10% Off on all authentic Odia sweets! Use code: 
          <strong className="text-gold font-bold ml-1 tracking-wider">ODISHA10</strong>
        </span>
        <span className="hidden md:inline-block text-gold/60">•</span>
        <span className="hidden md:flex items-center text-xs md:text-sm">
          <span className="mr-2">🚚</span> 
          Free express air shipping across India on orders above ₹500
        </span>
        <span className="hidden md:inline-block text-gold/60">•</span>
        <span className="hidden md:flex items-center text-xs md:text-sm">
          <span className="mr-2">❤️</span> 
          Directly sourced from local sweet makers in Puri & Bhubaneswar
        </span>
      </div>
      
      {/* CSS style injected directly for the custom marquee marquee-speed and loop */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OfferBanner;
