import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const StickyCart = () => {
  const { cart, navigateTo, currentPage } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger bounce animation when cart changes
  useEffect(() => {
    if (totalItems === 0) return;
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [totalItems]);

  // Don't show on checkout or cart pages
  if (totalItems === 0 || currentPage === 'cart' || currentPage === 'checkout') {
    return null;
  }

  return (
    <button
      onClick={() => navigateTo('cart')}
      className={`fixed bottom-6 left-6 z-40 bg-darkbrown hover:bg-darkbrown-dark text-cream p-4 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105 flex items-center justify-center border border-gold/20 focus:outline-none ${
        animate ? 'animate-bounce-short' : ''
      }`}
      title="View Cart"
      id="floating-cart"
    >
      <ShoppingBag className="w-6 h-6 text-gold" />
      
      {/* Item Count Badge */}
      <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-darkbrown animate-pulse">
        {totalItems}
      </span>

      {/* Floating cart label on hover */}
      <span className="absolute left-16 bg-darkbrown text-cream text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none hover:opacity-100 transition-all duration-300 shadow-premium border border-gold/15 whitespace-nowrap hidden md:inline">
        ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)} (Cart)
      </span>

      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-short {
          animation: bounceShort 0.5s ease-in-out;
        }
      `}</style>
    </button>
  );
};

export default StickyCart;
