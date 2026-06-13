import React from 'react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Apna Khao! I am looking to order traditional Odia sweets and snacks.");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA56] text-white p-3.5 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-110 flex items-center justify-center group focus:outline-none"
      title="Chat on WhatsApp"
      id="whatsapp-support"
    >
      {/* Pulse rings */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
      
      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.472 5.354 1.473 5.383 0 9.765-4.344 9.768-9.686.002-2.589-1.002-5.023-2.826-6.847-1.824-1.825-4.253-2.83-6.848-2.831-5.39 0-9.773 4.347-9.776 9.69-.001 2.016.528 3.864 1.532 5.527L2.146 21.8l5.501-1.446zm11.365-4.664c-.29-.146-1.722-.849-1.988-.946-.266-.097-.459-.146-.652.146-.193.29-.748.946-.917 1.14-.169.193-.338.217-.628.072-.29-.146-1.227-.452-2.337-1.442-.864-.771-1.448-1.724-1.618-2.016-.169-.292-.018-.45.127-.594.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.361-.024-.507-.072-.146-.652-1.57-.893-2.15-.235-.565-.473-.489-.652-.498-.17-.008-.362-.01-.555-.01s-.507.072-.772.361c-.266.29-1.013.99-1.013 2.414 0 1.424 1.037 2.798 1.182 2.992.145.193 2.04 3.114 4.943 4.37.69.299 1.23.478 1.65.612.693.22 1.324.19 1.823.115.556-.083 1.722-.703 1.963-1.383.24-.68.24-1.261.169-1.383-.071-.122-.266-.22-.556-.366z" />
      </svg>
      
      {/* Tooltip on hover */}
      <span className="absolute right-14 bg-darkbrown text-cream text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 shadow-premium whitespace-nowrap border border-gold/15">
        Need Help? Chat on WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
