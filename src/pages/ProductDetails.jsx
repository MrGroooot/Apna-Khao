import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Rating from '../components/Rating';
import PinCodeChecker from '../components/PinCodeChecker';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, RefreshCw, Calendar, Flame } from 'lucide-react';

const ProductDetails = () => {
  const { products, pageParams, addToCart, toggleWishlist, wishlist, navigateTo } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [weight, setWeight] = useState('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const productId = pageParams.id || 'khaja'; // Fallback
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setWeight(foundProduct.baseWeight || foundProduct.weightOptions[0]);
      setQty(1);
    }
  }, [pageParams, products]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  // Weight pricing logic
  let priceMultiplier = 1;
  if (weight === '500g') priceMultiplier = 1.8;
  if (weight === '1kg') priceMultiplier = 3.2;
  const currentPrice = Math.round(product.price * priceMultiplier);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e) => {
    addToCart(product, qty, weight);
    const btn = e.currentTarget;
    const oldText = btn.innerHTML;
    btn.innerHTML = 'Added to Cart ✓';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = oldText;
      btn.disabled = false;
    }, 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, weight);
    navigateTo('checkout');
  };

  // Sourcing related products (excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back to Shop link */}
      <button
        onClick={() => navigateTo('shop')}
        className="flex items-center text-xs font-bold text-gray-500 hover:text-terracotta uppercase tracking-wider mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Delicacies
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border border-gold/10 p-6 md:p-10 rounded-3xl shadow-premium mb-16">
        
        {/* Left Side: Product Image & Badges */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-gold/15 bg-cream-light aspect-[4/3] w-full shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Pure Ghee badge */}
            <span className="absolute top-4 left-4 bg-gradient-to-r from-saffron to-terracotta text-cream text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
              ✨ 100% Traditional Recipe
            </span>
          </div>
          
          {/* Trust points list under image */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-cream-light border border-gold/5 p-3 rounded-xl text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <span className="text-[10px] font-bold text-darkbrown block">100% Organic</span>
            </div>
            <div className="bg-cream-light border border-gold/5 p-3 rounded-xl text-center space-y-1">
              <Calendar className="w-5 h-5 text-saffron-dark mx-auto" />
              <span className="text-[10px] font-bold text-darkbrown block">Shelf Life: {product.shelfLife.split(' ')[0]} Days</span>
            </div>
            <div className="bg-cream-light border border-gold/5 p-3 rounded-xl text-center space-y-1">
              <RefreshCw className="w-5 h-5 text-gold-dark mx-auto" />
              <span className="text-[10px] font-bold text-darkbrown block">Zero Preservatives</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block">{product.category}</span>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-3xl font-extrabold text-darkbrown leading-tight">
                {product.name}
              </h2>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="bg-gray-100 hover:bg-rose-50 text-darkbrown hover:text-rose-500 p-2.5 rounded-full shadow-sm hover:scale-105 transition-all duration-200 shrink-0"
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            <Rating value={product.rating} count={product.reviewsCount} />
          </div>

          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
            {product.shortDescription}
          </p>

          <div className="py-4 border-y border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Package Price</span>
              <span className="text-3xl font-extrabold text-darkbrown">₹{currentPrice}</span>
            </div>

            <div className="space-y-1.5 w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block text-left sm:text-right">Select Weight Package</span>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWeight(opt)}
                    className={`text-xs px-3.5 py-2 rounded-xl border font-bold transition-all duration-200 ${
                      weight === opt
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quantity select */}
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 justify-between p-3.5 sm:min-w-[120px]">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-2.5 text-gray-500 hover:text-darkbrown font-bold text-lg"
              >
                -
              </button>
              <span className="px-4 font-bold text-darkbrown text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-2.5 text-gray-500 hover:text-darkbrown font-bold text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-saffron hover:bg-saffron/5 text-saffron font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Saffron PIN code availability checker integration */}
          <div className="pt-2">
            <PinCodeChecker />
          </div>

          {/* Details & Info Tabs */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden bg-cream-light/30">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 text-center py-3 text-[10px] xs:text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'description' ? 'border-terracotta text-terracotta bg-white' : 'border-transparent text-gray-400'
                }`}
              >
                Detailed Story
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 text-center py-3 text-[10px] xs:text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'ingredients' ? 'border-terracotta text-terracotta bg-white' : 'border-transparent text-gray-400'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`flex-1 text-center py-3 text-[10px] xs:text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'storage' ? 'border-terracotta text-terracotta bg-white' : 'border-transparent text-gray-400'
                }`}
              >
                Storage & Shelf
              </button>
            </div>
            
            <div className="p-5 text-xs md:text-sm text-gray-500 leading-relaxed font-medium bg-white">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'ingredients' && (
                <p>{product.ingredients}</p>
              )}
              {activeTab === 'storage' && (
                <div className="space-y-2">
                  <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                  <p><strong>Storage Instructions:</strong> Keep in a dry, cool environment. For Pahala Rasagola and Chhena Poda, refrigerate immediately upon receiving to retain moisture and freshness.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Carousel */}
      <div>
        <div className="text-center md:text-left mb-8">
          <h3 className="font-serif text-2xl font-bold text-darkbrown">Explore Other Odia Sweets</h3>
          <p className="text-gray-400 text-xs mt-1">Sourced fresh and handmade with authentic ingredients.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => navigateTo('details', { id: p.id })}
              className="bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/25 shadow-premium hover:shadow-premium-hover transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-light w-full">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-darkbrown group-hover:text-terracotta transition-colors duration-200 line-clamp-1 mb-1">{p.name}</h4>
                  <Rating value={p.rating} />
                </div>
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                  <span className="text-sm font-bold text-darkbrown">₹{p.price} <span className="text-[10px] text-gray-400 font-semibold">/ {p.baseWeight}</span></span>
                  <span className="text-[10px] font-bold text-terracotta hover:underline uppercase tracking-wider flex items-center">View Detail →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
