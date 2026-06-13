import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    // Simulate sending email API
    setSubmitted(true);
    setTimeout(() => {
      alert(`Thank you ${form.name}! Your inquiry has been sent to our customer care team. We will get back to you within 24 hours. Jai Jagannath!`);
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Heading */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-bold text-terracotta tracking-widest uppercase block mb-2">Get In Touch</span>
        <h2 className="font-serif text-3xl md:text-4xl text-darkbrown font-bold relative inline-block pb-3">
          We’d Love to Hear From You
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-saffron to-terracotta rounded-full"></span>
        </h2>
        <p className="text-gray-500 text-xs md:text-sm mt-3">
          Have questions about shipping times, festive custom orders, or corporate gifting? Contact our Odia support desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Panel - Left Side */}
        <div className="bg-darkbrown text-cream-light p-8 rounded-3xl shadow-premium border border-gold/15 space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:12px_12px]"></div>
          
          <div className="relative z-10 space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold">Apna Khao Hub</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Our support desk is run by native Odias ready to answer any questions or organize bulk shipments for celebrations.
            </p>
          </div>

          <div className="relative z-10 space-y-6 text-xs">
            {/* Phone */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-white/5 border border-cream/10 p-2.5 rounded-xl text-gold shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-300 mb-1">Call Support</h4>
                <p className="text-gray-400 font-semibold">+91 98765 43210</p>
                <span className="text-[10px] text-gray-500">Mon - Sat: 9 AM - 6 PM</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-white/5 border border-cream/10 p-2.5 rounded-xl text-gold shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-300 mb-1">Email Support</h4>
                <p className="text-gray-400 font-semibold">support@apnakhao.com</p>
                <p className="text-gray-400 font-semibold">gifting@apnakhao.com</p>
              </div>
            </div>

            {/* Hubs */}
            <div className="flex items-start space-x-3.5">
              <div className="bg-white/5 border border-cream/10 p-2.5 rounded-xl text-gold shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-300 mb-1">Fulfillment Hub</h4>
                <p className="text-gray-400">VIP Road, Bhubaneswar, Odisha</p>
                <h4 className="font-bold text-gray-300 mt-3 mb-1">Sourcing Kitchens</h4>
                <p className="text-gray-400">Grand Road (Bada Danda), Puri, Odisha</p>
              </div>
            </div>
          </div>

          {/* Saffron CTA */}
          <div className="relative z-10 pt-4 border-t border-cream/10">
            <button
              onClick={() => {
                const message = encodeURIComponent("Namaskar Apna Khao! I need help with ordering traditional sweets.");
                window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
              }}
              className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white font-bold text-xs tracking-wider uppercase py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-white" />
              WhatsApp Live Support
            </button>
          </div>
        </div>

        {/* Contact Form - Right Side */}
        <div className="lg:col-span-2 bg-white border border-gold/10 p-8 rounded-3xl shadow-premium">
          <h3 className="font-serif text-lg font-bold text-darkbrown mb-6 pb-2 border-b border-gray-100">Send an Inquiry</h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Bulk order for Durga Puja, Delivery status"
                className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400">Message Details</label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your query details here..."
                className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs tracking-wider uppercase py-3.5 px-7 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow hover:shadow-md hover:scale-[1.01]"
            >
              {submitted ? (
                'Sending Inquiry...'
              ) : (
                <>
                  Send Message
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
