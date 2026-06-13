import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Rating from './Rating';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, navigateTo } = useContext(CartContext);
  const [weight, setWeight] = useState(product.baseWeight || product.weightOptions[0]);
  const [qty, setQty] = useState(1);

  const isWishlisted = wishlist.includes(product.id);

  // Simple weight modifier factor for price display
  let priceMultiplier = 1;
  if (weight === '500g') priceMultiplier = 1.8;
  if (weight === '1kg') priceMultiplier = 3.2;
  const currentPrice = Math.round(product.price * priceMultiplier);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, qty, weight);
    // Trigger brief visual feedback
    const btn = e.currentTarget;
    const oldText = btn.innerHTML;
    btn.innerHTML = 'Added ✓';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = oldText;
      btn.disabled = false;
    }, 1200);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, qty, weight);
    navigateTo('checkout');
  };

  return (
    <div 
      onClick={() => navigateTo('details', { id: product.id })}
      className="bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 shadow-premium hover:shadow-premium-hover transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Section */}
      <div className="relative overflow-hidden bg-cream-light aspect-[4/3] w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-darkbrown/85 backdrop-blur-sm text-gold text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {product.category}
        </span>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-darkbrown hover:text-rose-500 p-2 rounded-full shadow-sm hover:scale-110 transition-all duration-200 focus:outline-none"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-darkbrown'}`} />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="font-serif text-lg text-darkbrown group-hover:text-terracotta transition-colors duration-200 line-clamp-1 mb-1">
            {product.name}
          </h3>
          <Rating value={product.rating} count={product.reviewsCount} />
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Weight Selector Options */}
        <div className="mb-4">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1.5">Select Weight</span>
          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {product.weightOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setWeight(opt)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition-all duration-200 ${
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

        {/* Quantity and Price */}
        <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Price</span>
            <span className="text-xl font-bold text-darkbrown">₹{currentPrice}</span>
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2.5 py-1 text-gray-500 hover:text-darkbrown font-bold text-sm"
            >
              -
            </button>
            <span className="px-2 text-xs font-semibold text-darkbrown min-w-[20px] text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-2.5 py-1 text-gray-500 hover:text-darkbrown font-bold text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleAddToCart}
            className="border border-saffron text-saffron hover:bg-saffron/5 font-semibold text-xs py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 hover:shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
          
          <button
            onClick={handleBuyNow}
            className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 hover:shadow-sm"
          >
            Buy Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
