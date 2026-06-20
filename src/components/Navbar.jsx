import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Search, Heart, ShoppingBag, User, LogOut, Menu, X, MapPin } from 'lucide-react';

const Navbar = () => {
  const { cart, wishlist, currentPage, navigateTo } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('shop', { search: searchVal });
    setSearchVal('');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Shop Delicacies', page: 'shop' },
    { name: 'Our Story', page: 'about' },
    { name: 'Contact Us', page: 'contact' },
    { name: 'My Orders', page: 'orders' }
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-cream/95 backdrop-blur-md shadow-premium border-b border-gold/15 py-3' 
          : 'bg-cream border-b border-gold/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center space-x-2.5 cursor-pointer shrink-0"
          >
            <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md border border-gold/20 bg-white flex items-center justify-center p-0.5">
              <img src="/assets/logo_icon.png" alt="ApnaKhao Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-serif text-xl leading-none text-darkbrown font-extrabold tracking-wide">
                ApnaKhao
              </h1>
              <span className="text-[9px] font-semibold text-terracotta tracking-widest uppercase block mt-0.5">
                Taste of Odisha
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md relative bg-white border border-gray-200 focus-within:border-saffron rounded-full overflow-hidden transition-all duration-200 shadow-sm"
          >
            <input
              type="text"
              placeholder="Search authentic Khaja, Arisa Pitha..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-5 py-2 text-sm bg-transparent border-none focus:outline-none text-darkbrown placeholder:text-gray-400"
            />
            <button 
              type="submit" 
              className="absolute right-2 bg-saffron hover:bg-saffron-dark text-white p-1.5 rounded-full transition-colors duration-200"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`text-sm font-semibold tracking-wide hover:text-terracotta transition-colors duration-200 ${
                  currentPage === link.page 
                    ? 'text-terracotta border-b-2 border-terracotta pb-0.5' 
                    : 'text-darkbrown/80'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Search Toggle Mobile (only shown on md) */}
            <button 
              onClick={() => navigateTo('shop')}
              className="hidden sm:block md:hidden text-darkbrown hover:text-terracotta p-1.5"
              title="Search Shop"
            >
              <Search className="w-5.5 h-5.5" />
            </button>

            {/* Wishlist Icon */}
            <button 
              onClick={() => navigateTo('shop', { filterWishlist: true })}
              className="text-darkbrown hover:text-rose-500 p-1.5 relative transition-colors duration-200"
              title="View Wishlist"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-cream">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => navigateTo('cart')}
              className="text-darkbrown hover:text-terracotta p-1.5 relative transition-colors duration-200"
              title="View Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-cream">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Profile Dropdown / User Link - Desktop & Tablet only */}
            <div className="hidden sm:flex border-l border-gray-200 pl-3 flex items-center">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="hidden md:block text-right">
                    <span className="text-[10px] text-gray-400 font-bold block leading-none">Namaskar,</span>
                    <span className="text-xs font-bold text-darkbrown line-clamp-1">{user.name.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="bg-gray-100 hover:bg-rose-50 text-darkbrown hover:text-rose-600 p-2 rounded-full transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('login')}
                  className="bg-darkbrown hover:bg-darkbrown-dark text-cream hover:text-gold text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 transition-all duration-300"
                  id="nav-login-btn"
                >
                  <User className="w-3.5 h-3.5" />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-darkbrown p-1.5 hover:text-terracotta focus:outline-none"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream border-t border-gold/10 px-4 py-5 space-y-4 animate-slideDown shadow-inner">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative bg-white border border-gray-200 rounded-full overflow-hidden flex items-center px-4 py-1.5">
            <input
              type="text"
              placeholder="Search sweets & snacks..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full text-sm focus:outline-none bg-transparent"
            />
            <button type="submit" className="text-saffron p-1">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  navigateTo(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-semibold py-1 border-b border-gray-100 hover:text-terracotta transition-colors duration-200 ${
                  currentPage === link.page ? 'text-terracotta pl-2 border-l-2 border-terracotta-dark' : 'text-darkbrown/95'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile User Profile Section */}
          <div className="border-t border-gold/10 pt-4 sm:hidden">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 font-bold block leading-none">Namaskar,</span>
                  <span className="text-xs font-bold text-darkbrown">{user.name}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigateTo('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-darkbrown hover:bg-darkbrown-dark text-cream hover:text-gold text-xs font-bold py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
