import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, ExternalLink, Check } from 'lucide-react';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "🙏 Namaskar!\n\nWelcome to ApnaKhao.\n\nAuthentic Odia traditional foods delivered to your doorstep.\n\nWhat would you like to order today?\n\n📋 Available Items:\n\n1. Khaja\n2. Arisa Pitha\n3. Chhena Poda\n4. Manda Pitha\n5. Poda Pitha\n6. Other Traditional Odia Snacks\n\nPlease reply with:\n\n* Item Name\n* Quantity\n\nExample:\nKhaja - 2 Boxes",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Listen to custom toggle events from Hero CTA
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setUnreadCount(0);
    };
    window.addEventListener('open-whatsapp-chat', handleOpenChat);
    return () => window.removeEventListener('open-whatsapp-chat', handleOpenChat);
  }, []);

  // Bot response logic
  const handleBotResponse = (userMsg) => {
    setIsTyping(true);
    
    // Process input
    const cleanMsg = userMsg.toLowerCase().trim();
    
    let botReply = '';
    let delay = 1000;

    if (
      cleanMsg === 'hi' ||
      cleanMsg === 'hello' ||
      cleanMsg === 'hey' ||
      cleanMsg === 'hey there' ||
      cleanMsg === 'namaskar'
    ) {
      botReply = "🙏 Namaskar!\n\nWelcome to ApnaKhao.\n\nAuthentic Odia traditional foods delivered to your doorstep.\n\nWhat would you like to order today?\n\n📋 Available Items:\n\n1. Khaja\n2. Arisa Pitha\n3. Chhena Poda\n4. Manda Pitha\n5. Poda Pitha\n6. Other Traditional Odia Snacks\n\nPlease reply with:\n\n* Item Name\n* Quantity\n\nExample:\nKhaja - 2 Boxes";
    } else if (
      cleanMsg.includes('price') ||
      cleanMsg.includes('cost') ||
      cleanMsg.includes('how much') ||
      cleanMsg.includes('rate')
    ) {
      botReply = "Please tell us which item you would like the price for.\n\nAvailable Items:\n\n* Khaja\n* Arisa Pitha\n* Chhena Poda\n* Manda Pitha\n* Poda Pitha";
    } else if (
      // Checks if user is sharing details (Name + Address + Phone or items list)
      cleanMsg.includes('name:') ||
      cleanMsg.includes('address:') ||
      cleanMsg.includes('mobile:') ||
      cleanMsg.includes('quantity:') ||
      (cleanMsg.match(/\d{10}/) && cleanMsg.length > 25) || // Address / contact details
      cleanMsg.includes('road') ||
      cleanMsg.includes('street') ||
      cleanMsg.includes('sector') ||
      cleanMsg.includes('society')
    ) {
      botReply = "✅ Order Request Received\n\nOur team will contact you shortly for confirmation and payment details.\n\nThank you for choosing ApnaKhao.\n\nTaste of Odisha, delivered with love ❤️";
    } else if (
      cleanMsg.includes('khaja') ||
      cleanMsg.includes('arisa') ||
      cleanMsg.includes('chhena') ||
      cleanMsg.includes('poda') ||
      cleanMsg.includes('manda') ||
      cleanMsg.includes('snack') ||
      cleanMsg.includes('box') ||
      cleanMsg.includes('kg')
    ) {
      botReply = "Thank you for your order request.\n\nPlease share:\n\n1. Full Name\n2. Delivery Address\n3. Mobile Number\n4. Quantity Required\n\nOur team will confirm your order shortly.";
    } else {
      // Fallback
      botReply = "Namaskar! Feel free to choose an option or share your details:\n\n1. Full Name\n2. Delivery Address\n3. Mobile Number\n4. Quantity Required\n\nOr ask for the pricing of Khaja, Arisa Pitha, or Chhena Poda.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, delay);
  };

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    
    // Get bot reply
    handleBotResponse(textToSend);
  };

  const handleFloatingClick = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const openRealWhatsApp = () => {
    const defaultText = "Hello ApnaKhao! I want to order traditional Odia sweets and snacks.";
    const message = encodeURIComponent(inputText || defaultText);
    window.open(`https://wa.me/919556964425?text=${message}`, '_blank');
  };

  const quickReplies = [
    { label: "Hello 👋", text: "Hello" },
    { label: "Khaja - 2 Boxes 🥮", text: "Khaja - 2 Boxes" },
    { label: "Price List 💰", text: "What is the price of sweets?" },
    { label: "Share Details 📝", text: "Name: Debasis Das\nAddress: Chandrasekharpur, Bhubaneswar\nMobile: 9556964425\nQuantity: 2 Boxes Khaja" }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* 1. Simulated WhatsApp Chat Drawer */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[500px] bg-[#efeae2] rounded-3xl shadow-2xl border border-gray-200/50 flex flex-col overflow-hidden mb-4 animate-scaleUp transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-terracotta to-saffron flex items-center justify-center font-serif font-bold text-sm text-white border border-white/20">
                  AK
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#075e54]"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight tracking-wide">ApnaKhao Support</h3>
                <span className="text-[10px] text-emerald-300 font-bold tracking-wider animate-pulse">Online AI Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2 rounded-2xl shadow-sm text-xs md:text-[13px] leading-relaxed whitespace-pre-line font-medium ${
                    msg.sender === 'user'
                      ? 'bg-[#d9fdd3] text-gray-800 rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}
                >
                  {msg.text}
                  <div className="text-[9px] text-gray-400 text-right mt-1.5 flex items-center justify-end gap-1">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <Check className="w-3 h-3 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 mr-auto bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-2xl rounded-tl-none">
                <span className="text-xs text-gray-400 italic">ApnaKhao is typing</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Carousel */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
            {quickReplies.map((qr, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qr.text)}
                className="bg-white hover:bg-cream-light border border-gold/15 text-darkbrown text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0 transition hover:scale-105 active:scale-95"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input & Redirection CTAs */}
          <div className="p-3 bg-[#f0f2f5] border-t border-gray-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Type your message here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs md:text-sm focus:outline-none focus:border-[#075e54] text-darkbrown"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="bg-[#075e54] hover:bg-[#128c7e] text-white p-2.5 rounded-full transition disabled:opacity-40"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
            
            {/* Real WhatsApp Redirect Link Button */}
            <button
              onClick={openRealWhatsApp}
              className="bg-[#25D366] hover:bg-[#20BA56] text-white p-2.5 rounded-full transition"
              title="Open in WhatsApp"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Action Button */}
      <button
        onClick={handleFloatingClick}
        className="bg-[#25D366] hover:bg-[#20BA56] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105 flex items-center justify-center group focus:outline-none relative"
        title="Order on WhatsApp"
        id="whatsapp-support"
      >
        {/* Pulse rings */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 left-0 top-0"></span>

        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.472 5.354 1.473 5.383 0 9.765-4.344 9.768-9.686.002-2.589-1.002-5.023-2.826-6.847-1.824-1.825-4.253-2.83-6.848-2.831-5.39 0-9.773 4.347-9.776 9.69-.001 2.016.528 3.864 1.532 5.527L2.146 21.8l5.501-1.446zm11.365-4.664c-.29-.146-1.722-.849-1.988-.946-.266-.097-.459-.146-.652.146-.193.29-.748.946-.917 1.14-.169.193-.338.217-.628.072-.29-.146-1.227-.452-2.337-1.442-.864-.771-1.448-1.724-1.618-2.016-.169-.292-.018-.45.127-.594.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.361-.024-.507-.072-.146-.652-1.57-.893-2.15-.235-.565-.473-.489-.652-.498-.17-.008-.362-.01-.555-.01s-.507.072-.772.361c-.266.29-1.013.99-1.013 2.414 0 1.424 1.037 2.798 1.182 2.992.145.193 2.04 3.114 4.943 4.37.69.299 1.23.478 1.65.612.693.22 1.324.19 1.823.115.556-.083 1.722-.703 1.963-1.383.24-.68.24-1.261.169-1.383-.071-.122-.266-.22-.556-.366z" />
        </svg>

        {/* Notification indicator */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Injected custom scale-up animations */}
      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
