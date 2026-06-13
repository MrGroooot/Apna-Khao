import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, HeartHandshake, Leaf, Gift, Sparkles, MapPin } from 'lucide-react';

const Home = () => {
  const { products, navigateTo } = useContext(CartContext);

  const testimonials = [
    {
      id: 1,
      name: "Sujata Mohapatra",
      role: "Software Engineer, Bangalore (Native: Cuttack)",
      text: "Apna Khao is a blessing! The Arisa Pitha tastes exactly like the ones my grandmother makes back home. It arrived super fresh and crispy. I ordered it for Raja festival and my flatmates loved it!",
      rating: 5
    },
    {
      id: 2,
      name: "Debasis Nayak",
      role: "Marketing Manager, Mumbai (Native: Balasore)",
      text: "The Ghee Khaja is phenomenal. So layered and flaky, not overly sweet. It took me straight back to my childhood days in Puri. Saffron-express delivery was fast and packaging was airtight.",
      rating: 5
    },
    {
      id: 3,
      name: "Rinki Samal",
      role: "Ph.D. Scholar, Delhi (Native: Bhubaneswar)",
      text: "Authentic Pahala Rasagola in Delhi! I couldn't believe it was this soft. It was packed in a beautiful food-grade container and tasted absolutely fresh. Finally, real Odia sweets in the capital!",
      rating: 5
    }
  ];

  return (
    <div className="bg-cream-light">
      
      {/* 1. Hero Section */}
      <section className="relative bg-darkbrown text-cream overflow-hidden">
        {/* Banner Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero_banner.png" 
            alt="Traditional Odia Sweets" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darkbrown via-darkbrown/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col justify-center min-h-[500px]">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-saffron/20 border border-saffron/40 text-saffron-light text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-gold" />
              Authentic & Homemade
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-cream leading-tight">
              Taste the Tradition of Odisha
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Authentic, handmade Odia delicacies prepared with pure ghee and organic ingredients. Sourced fresh and delivered across India’s metro cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-saffron hover:bg-saffron-dark text-cream hover:text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 w-full sm:w-auto"
                id="hero-shop-now"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('storytelling-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-cream/30 hover:border-gold hover:text-gold text-cream font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
              >
                Explore Traditional Foods
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-terracotta tracking-widest uppercase block mb-2">Our Signature Offerings</span>
          <h2 className="font-serif text-3xl md:text-4xl text-darkbrown font-bold relative inline-block pb-3">
            Handcrafted Traditional Delicacies
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-saffron to-terracotta rounded-full"></span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-3.5 leading-relaxed">
            Every dish is prepared by specialized Karigars using generational recipes. No preservatives, 100% organic, and packed with heritage flavor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-cream py-16 md:py-20 border-y border-gold/10 relative overflow-hidden bg-odia-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block mb-2">The Apna Khao Promise</span>
            <h2 className="font-serif text-2xl md:text-3xl text-darkbrown font-bold">
              Why Our Delicacies Taste Extraordinary
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Box 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">100% Organic Ingredients</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">Made using organic rice, pure jaggery, and unadulterated cold-pressed grains.</p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-saffron/10 text-saffron-dark w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Homemade Taste</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">Handmade by traditional Karigars following authentic family recipes.</p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gold/10 text-gold-dark w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Directly Sourced</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">Sourced directly from sourcing hubs in Puri and Bhubaneswar, Odisha.</p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-terracotta/10 text-terracotta w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Hygienic Packaging</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">Packed in triple-layer food grade airtight seal wraps for fresh transit.</p>
            </div>

            {/* Box 5 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-darkbrown/5 text-darkbrown w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Pan India Delivery</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed">Fast air-ship express delivery to Tier-1 cities within 2 to 3 days.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. About Odisha Food Culture (Storytelling) */}
      <section id="storytelling-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Story Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-premium border border-gold/25 aspect-[4/3] w-full">
            <img
              src="/assets/chhena_poda.png"
              alt="Odia Sweets Culture"
              className="w-full h-full object-cover"
            />
            {/* Warm overlay card */}
            <div className="absolute bottom-6 left-6 right-6 bg-darkbrown/90 backdrop-blur-sm p-5 rounded-xl border border-gold/15 text-cream">
              <h4 className="font-serif text-sm font-bold text-gold mb-1">Lord Jagannath temple heritage</h4>
              <p className="text-[10px] text-gray-300 leading-relaxed">
                Sweethood in Odisha is deeply integrated with Lord Jagannath temple bhog offerings since the 12th century.
              </p>
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block">Our Cultural Heritage</span>
            <h2 className="font-serif text-3xl md:text-4xl text-darkbrown font-bold leading-tight">
              Sweets Born in the Land of Jagannath
            </h2>
            
            <div className="space-y-4 text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              <p>
                In Odisha, food is not just sustenance; it is a sacred offering and an emotional expression. The core of Odisha's culinary legacy lies in the ancient kitchens of the Jagannath Temple in Puri, recognized as the largest kitchen in the world. For centuries, specialized Karigars have prepared 56 kinds of bhog (Chapan Bhog) daily, using firewood and clay pots.
              </p>
              <p>
                Our signature sweets like <strong>Khaja</strong> have been offered to the deities for over 800 years. Similarly, the soft, jaggery-rich <strong>Arisa Pitha</strong> is prepared during local harvest festivals to mark abundance and blessings, while the soft highway specialty <strong>Pahala Rasagola</strong> and caramelized <strong>Chhena Poda</strong> highlight the state's dairy rich heritage.
              </p>
              <p>
                At Apna Khao, we are on a mission to keep this spiritual nostalgic connection alive. We partner directly with veteran karigars who have prepared temple offerings for generations, packaging their authentic craftsmanship safely so that Odias living in Bangalore, Mumbai, or Delhi can taste their heritage again.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => navigateTo('about')}
                className="text-terracotta hover:text-terracotta-dark text-sm font-bold flex items-center gap-1 group"
              >
                Read More About Odia Sourcing Heritage 
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Customer Reviews (Testimonials) */}
      <section className="bg-cream py-16 md:py-24 border-t border-gold/10 bg-odia-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block mb-2">Customer Testimonials</span>
            <h2 className="font-serif text-2xl md:text-3xl text-darkbrown font-bold">
              Loved by Odias Across India
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-3">
              Hear from our happy customers living across Tier 1 cities who finally found their authentic taste of home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-7 rounded-2xl border border-gold/15 shadow-premium flex flex-col justify-between hover:shadow-premium-hover transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed italic font-medium">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-darkbrown">{t.name}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">{t.role}</span>
                  </div>
                  <div className="bg-saffron/10 text-saffron-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Verified
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <section className="bg-gradient-to-tr from-darkbrown to-darkbrown-dark text-cream py-16 relative overflow-hidden">
        {/* Subtle Odia pattern watermark */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block">Festive Sweets & Updates</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream">
            Stay Connected to Odisha’s Flavors
          </h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Subscribe to our newsletter to receive direct notifications of fresh batches, seasonal delicacies, and festival discounts straight in your inbox.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const inp = e.target.querySelector('input');
              if (inp.value) {
                alert(`Namaskar! You have subscribed with: ${inp.value}. We will send you exclusive offers soon!`);
                inp.value = '';
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 w-full"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full flex-1 bg-white/10 border border-cream/20 rounded-xl px-4.5 py-3 text-xs md:text-sm focus:outline-none focus:border-gold text-cream placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-saffron hover:bg-saffron-dark text-cream hover:text-white font-bold text-xs md:text-sm tracking-wider uppercase px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
