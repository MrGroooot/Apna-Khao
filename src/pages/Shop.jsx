import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Eye, Heart, RotateCcw } from 'lucide-react';

const Shop = () => {
  const { products, pageParams, navigateTo } = useContext(CartContext);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(500);
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Parse routing params
  useEffect(() => {
    if (pageParams.search) {
      setSearchQuery(pageParams.search);
    }
    if (pageParams.filterWishlist) {
      setOnlyWishlist(true);
    } else {
      setOnlyWishlist(false);
    }
  }, [pageParams]);

  // Categories list
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sweets', name: 'Sweets & Desserts' },
    { id: 'pitha', name: 'Traditional Pithas' },
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

    // Search query match
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Price match
    const priceMatch = product.price <= priceRange;

    // Wishlist match
    const savedWishlist = JSON.parse(localStorage.getItem('apna_khao_wishlist') || '[]');
    const wishlistMatch = !onlyWishlist || savedWishlist.includes(product.id);

    return categoryMatch && searchMatch && priceMatch && wishlistMatch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default Featured
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setSearchQuery('');
    setPriceRange(500);
    setOnlyWishlist(false);
    navigateTo('shop', {}); // Clear route params
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-tr from-darkbrown to-darkbrown-dark text-cream-light p-8 md:p-12 rounded-3xl border border-gold/15 mb-10 shadow-premium relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:14px_14px]"></div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block">Odisha Premium Store</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-cream">Authentic Traditional Foods</h2>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            Handcrafted with love by local sweetmakers, prepared under strict hygiene standards and delivered via express air-freight directly to your metro city homes.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-between items-center bg-white border border-gold/10 p-4 rounded-2xl shadow-sm w-full">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs font-bold text-darkbrown hover:text-terracotta transition-colors uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-4 h-4 text-terracotta" />
            {showMobileFilters ? 'Hide Filters' : 'Filter Delicacies'}
          </button>
          
          <button 
            onClick={clearFilters}
            className="text-[10px] uppercase font-bold text-terracotta hover:text-terracotta-dark flex items-center gap-0.5"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Sidebar Filter */}
        <aside className={`w-full lg:w-64 shrink-0 bg-white border border-gold/10 p-6 rounded-2xl shadow-premium h-fit space-y-6 ${
          showMobileFilters ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-serif text-base font-bold text-darkbrown flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-terracotta" />
              Filter Delicacies
            </h3>
            <button 
              onClick={clearFilters}
              className="text-[10px] uppercase font-bold text-terracotta hover:text-terracotta-dark flex items-center gap-0.5"
              title="Reset Filters"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Search bar inside sidebar */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Search</span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-cream-light border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-terracotta text-darkbrown font-semibold placeholder:text-gray-400 placeholder:text-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Categories select */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Categories</span>
            <div className="flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-terracotta text-cream'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {cat.name}
                  {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-cream"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              <span>Max Price</span>
              <span className="text-darkbrown font-bold font-sans text-xs">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min={150}
              max={500}
              step={10}
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-terracotta cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-semibold font-sans">
              <span>₹150</span>
              <span>₹500</span>
            </div>
          </div>

          {/* Toggle Wishlist View */}
          <div className="pt-2">
            <button
              onClick={() => setOnlyWishlist(!onlyWishlist)}
              className={`w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-xl border transition-all duration-300 ${
                onlyWishlist
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-gray-200 hover:border-rose-300 text-gray-600 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${onlyWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              {onlyWishlist ? 'Showing Wishlist' : 'Filter by Wishlist'}
            </button>
          </div>
        </aside>

        {/* Products Catalog section */}
        <div className="flex-1 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gold/10 p-4.5 rounded-2xl shadow-sm gap-4">
            <div className="text-xs text-gray-500 font-semibold tracking-wide">
              Showing <span className="text-darkbrown font-bold">{sortedProducts.length}</span> delicacies
              {searchQuery && <span> matching "{searchQuery}"</span>}
              {selectedCategory !== 'all' && <span> in {selectedCategory}</span>}
              {onlyWishlist && <span> in wishlist</span>}
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold self-end sm:self-auto">
              <span className="text-gray-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream-light border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-terracotta text-darkbrown font-semibold text-xs"
              >
                <option value="featured">Featured Sourcing</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gold/10 text-center py-20 px-8 rounded-2xl shadow-sm space-y-4">
              <div className="bg-gray-100 text-gray-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-darkbrown">No Delicacies Found</h3>
              <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
                We couldn't find any traditional foods matching your filters. Try resetting the filters or broadening your search queries!
              </p>
              <button
                onClick={clearFilters}
                className="bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Shop;
