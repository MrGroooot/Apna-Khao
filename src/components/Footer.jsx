import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Mail, Phone, MapPin, Heart, Compass } from 'lucide-react';

const Footer = () => {
  const { navigateTo } = useContext(CartContext);

  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Shop Delicacies', page: 'shop' },
    { name: 'Our Sourcing Story', page: 'about' },
    { name: 'Contact Support', page: 'contact' },
    { name: 'Track Order', page: 'orders' }
  ];

  return (
    <footer className="bg-darkbrown text-cream-light border-t-4 border-gold pt-16 pb-8 relative z-10 overflow-hidden">
      
      {/* Decorative Traditional Odia-inspired Border Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:10px_10px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-gradient-to-tr from-terracotta to-saffron text-white h-9 w-9 rounded-lg flex items-center justify-center font-serif text-lg font-bold border border-gold/20">
                AK
              </div>
              <h2 className="font-serif text-lg font-bold text-cream">Apna Khao</h2>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Bringing the rich culinary heritage of Odisha directly to your doorstep. Handmade, 100% organic, and packed with nostalgia for Odia people living away from home.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="bg-white/5 hover:bg-saffron hover:text-white p-2 rounded-full transition-all duration-300 border border-cream/5 flex items-center justify-center" title="Facebook">
                <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a href="#" className="bg-white/5 hover:bg-saffron hover:text-white p-2 rounded-full transition-all duration-300 border border-cream/5 flex items-center justify-center" title="Instagram">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="bg-white/5 hover:bg-saffron hover:text-white p-2 rounded-full transition-all duration-300 border border-cream/5 flex items-center justify-center" title="Twitter">
                <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="bg-white/5 hover:bg-saffron hover:text-white p-2 rounded-full transition-all duration-300 border border-cream/5" title="Heritage Blog">
                <Compass className="w-4 h-4 text-gold" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-gold uppercase mb-5">Quick Links</h3>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="hover:text-gold transition-colors duration-200 flex items-center group text-left"
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 mr-1.5 text-gold/40">›</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sourcing Hub */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-gold uppercase mb-5">Sourced Directly From</h3>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mr-2"></span>
                Puri (Lord Jagannath Temple Bhog Karigars)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mr-2"></span>
                Pahala Sweets Hub (Bhubaneswar Highway)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mr-2"></span>
                Local Women Self-Help Groups (SHGs)
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mr-2"></span>
                Organic Jaggery Farms in Nayagarh
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-gold uppercase mb-5">Contact Details</h3>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <span>Apna Khao Fulfillment Hub, VIP Road, Bhubaneswar, Odisha, 751015</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4.5 h-4.5 text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4.5 h-4.5 text-gold shrink-0" />
                <span>support@apnakhao.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Made in Odisha & Copyright Section */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="text-xs text-gray-500 font-semibold tracking-wide order-2 md:order-1">
            © 2026 Apna Khao. Bringing Odisha’s tradition to your home.
          </div>
          
          <div className="flex items-center text-xs text-gold/90 bg-white/5 border border-gold/15 px-4.5 py-2 rounded-full font-semibold tracking-wider uppercase order-1 md:order-2">
            Made in Odisha with
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1.5 animate-pulse" />
            for the world
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
