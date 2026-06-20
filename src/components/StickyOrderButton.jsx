import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const StickyOrderButton = () => {
  const { currentPage, navigateTo } = useContext(CartContext);

  // Show only on Home, About Us, Contact Us, and My Orders pages
  const visiblePages = ['home', 'about', 'contact', 'orders'];
  if (!visiblePages.includes(currentPage)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto px-4 max-w-full">
      <button
        onClick={() => navigateTo('shop')}
        className="bg-gradient-to-r from-terracotta to-saffron hover:from-terracotta-dark hover:to-saffron-dark text-cream font-bold text-xs sm:text-sm tracking-wider uppercase pl-6 pr-5 py-3.5 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border border-gold/30 hover:border-gold whitespace-nowrap focus:outline-none"
        id="sticky-order-now"
      >
        <ShoppingBag className="w-4 h-4 text-cream animate-pulse" />
        Order Now
        <ArrowRight className="w-4 h-4 ml-0.5 text-cream" />
      </button>
    </div>
  );
};

export default StickyOrderButton;
