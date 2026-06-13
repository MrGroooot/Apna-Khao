import React from 'react';
import { Heart, Compass, Shield, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-cream-light">
      
      {/* Page Header */}
      <section className="bg-darkbrown text-cream py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] bg-[size:20px_20px] bg-fixed"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4">
          <span className="text-gold font-bold text-xs uppercase tracking-widest block">Our Legacy & Mission</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-cream">
            The Sourcing Story of Apna Khao
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Bridging the gap between the authentic kitchens of Odisha and the homes of Odias living in India's metropolitan hubs.
          </p>
        </div>
      </section>

      {/* Main Sourcing Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Block */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block">How It Began</span>
            <h2 className="font-serif text-2xl md:text-3xl text-darkbrown font-bold leading-tight">
              A Nostalgic Dream to Bring Cuttack & Puri closer to Bangalore & Delhi
            </h2>
            
            <div className="space-y-4 text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              <p>
                The seed of Apna Khao was planted in a small apartment in Bangalore. Surrounded by standard commercial snacks and sweets, a group of Odia expats realized how deeply they craved the true, comforting taste of home—the soft texture of a highway-side Pahala Rasagola, the crunch of a Puri Ghee Khaja, and the earthy sweetness of jaggery-rich Arisa Pitha.
              </p>
              <p>
                Locally available alternatives lacked the authentic craftsmanship of traditional sweet-makers (Karigars) and the organic purity of Odisha’s raw materials. Thus, <strong>Apna Khao</strong> was born—a brand dedicated to bringing authentic, handmade traditional foods directly from Odisha to metro cities across India.
              </p>
              <p>
                Our vision is dual: to satisfy the nostalgic culinary cravings of the Odia diaspora in Tier 1 cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai, Kolkata) and, equally, to empower local rural artisans, women's self-help groups (SHGs), and farmers back in Odisha.
              </p>
            </div>
          </div>

          {/* Sourcing Visual Illustration / Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-premium aspect-square relative border border-gold/15">
              <img src="/assets/khaja.png" alt="Karigar sweets making" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/60 to-transparent flex items-end p-3">
                <span className="text-[10px] font-bold text-cream">Generational Karigars in Puri</span>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-premium aspect-square relative border border-gold/15 translate-y-6">
              <img src="/assets/arisa_pitha.png" alt="Mission Shakti SHG women" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/60 to-transparent flex items-end p-3">
                <span className="text-[10px] font-bold text-cream">Women Self-Help Groups (SHGs)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sourcing Pillars Section */}
      <section className="bg-cream py-16 border-y border-gold/10 bg-odia-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-terracotta tracking-widest uppercase block mb-2">Our Sourcing Pillars</span>
            <h2 className="font-serif text-2xl md:text-3xl text-darkbrown font-bold">
              Upholding Authenticity & Empowerment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-4">
              <div className="bg-terracotta/10 text-terracotta w-11 h-11 rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Empowering Women SHGs</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
                We partner with local women self-help groups (SHGs) under Mission Shakti in Nayagarh and Khurda districts, creating sustainable income channels for rural women artisans who craft traditional Pithas.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-4">
              <div className="bg-saffron/10 text-saffron-dark w-11 h-11 rounded-xl flex items-center justify-center mx-auto">
                <Compass className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Protecting Heritage Recipes</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
                Our recipes are sacred. From the specific layered flour folding of Puri Ghee Khaja to the clay oven baking of Chhena Poda, we document and protect heritage culinary methods.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-4">
              <div className="bg-emerald-50 text-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">100% Organic Sourcing</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
                We procure organic raw materials directly from Odisha farmers: native rice grains, unbleached jaggery, cardamom, sesame, and dairy from grass-fed local cows.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-premium text-center space-y-4">
              <div className="bg-gold/10 text-gold-dark w-11 h-11 rounded-xl flex items-center justify-center mx-auto">
                <Heart className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-darkbrown">Giving Back to the Soil</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
                A percentage of every single purchase goes directly to the Karigar Welfare Fund, providing health coverage and educational support to families of sweet artisans in Odisha.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Cultural Heritage Detail Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-darkbrown font-bold">
          A Culinary Bridge Back Home
        </h2>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
          "For an Odia living in Bangalore or Mumbai, a bite of Arisa Pitha is not just about sweetness; it is about festivals, the scent of parched earth after the first rain, the security of family gatherings, and a nostalgic prayer offered to the Lord. Apna Khao is our humble effort to pack those emotions carefully and fly them directly to you."
        </p>
        <div className="flex justify-center items-center gap-1 text-[10px] text-terracotta font-extrabold uppercase tracking-widest">
          <span>Apna Khao Team</span>
          <span>•</span>
          <span>Sourced in Odisha ❤️</span>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
