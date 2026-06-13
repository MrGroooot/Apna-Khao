import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { MapPin, CreditCard, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { cart, getTotal, placeOrder, checkPinCode, navigateTo } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    name: user ? user.name : '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pin: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [pinMessage, setPinMessage] = useState(null);
  const [pinValid, setPinValid] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Card details states
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigateTo('cart');
    }
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    if (name === 'pin') {
      const sanitizedPin = value.replace(/\D/g, '').substring(0, 6);
      setAddress((prev) => ({ ...prev, pin: sanitizedPin }));
      
      if (sanitizedPin.length === 6) {
        const check = checkPinCode(sanitizedPin);
        setPinMessage(check.message);
        setPinValid(check.valid);
        
        // Auto-fill city/state based on valid metro pin prefixes for premium UX
        if (check.valid) {
          const prefix = sanitizedPin.substring(0, 3);
          let city = 'Bhubaneswar';
          let state = 'Odisha';
          if (prefix === '560') { city = 'Bangalore'; state = 'Karnataka'; }
          else if (prefix === '400') { city = 'Mumbai'; state = 'Maharashtra'; }
          else if (prefix === '110') { city = 'New Delhi'; state = 'Delhi'; }
          else if (prefix === '500') { city = 'Hyderabad'; state = 'Telangana'; }
          else if (prefix === '411') { city = 'Pune'; state = 'Maharashtra'; }
          else if (prefix === '600') { city = 'Chennai'; state = 'Tamil Nadu'; }
          else if (prefix === '700') { city = 'Kolkata'; state = 'West Bengal'; }
          setAddress((prev) => ({ ...prev, city, state }));
        }
      } else {
        setPinMessage(null);
        setPinValid(false);
      }
    }
  };

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    if (!pinValid) {
      alert('Please enter a valid Tier 1 Metro deliverable PIN code.');
      return;
    }

    setPlacingOrder(true);
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const placed = placeOrder(address, paymentMethod);
    setPlacingOrder(false);
    
    alert(`Order Placed Successfully! Your tracking ID is: ${placed.orderId}`);
    navigateTo('orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-darkbrown mb-8 relative pb-2 inline-block">
        Secure Checkout
        <span className="absolute bottom-0 left-0 w-12 h-1 bg-terracotta rounded-full"></span>
      </h2>

      <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Delivery details & Payment details - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Address */}
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <MapPin className="w-5 h-5 text-terracotta" />
              1. Delivery Address
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Recipient Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={address.name}
                  onChange={handleInputChange}
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={address.phone}
                  onChange={(e) => setAddress((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Street Address & Landmark</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={address.street}
                  onChange={handleInputChange}
                  placeholder="Flat No, Building, Area, Near Landmark"
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">PIN Code</label>
                <input
                  type="text"
                  name="pin"
                  maxLength={6}
                  required
                  placeholder="e.g. 560001 (Bangalore)"
                  value={address.pin}
                  onChange={handleInputChange}
                  className="w-full bg-cream-light border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                />
                {pinMessage && (
                  <p className={`text-[10px] font-bold mt-1 ${pinValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {pinMessage}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  readOnly
                  value={address.city}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  readOnly
                  value={address.state}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment */}
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <CreditCard className="w-5 h-5 text-terracotta" />
              2. Payment Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* UPI */}
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-semibold ${
                  paymentMethod === 'upi'
                    ? 'border-terracotta bg-terracotta/5 text-terracotta'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                }`}
              >
                <div className="bg-gradient-to-tr from-saffron to-terracotta text-white h-7 w-7 rounded-full flex items-center justify-center font-bold text-[10px]">
                  UPI
                </div>
                <span className="text-xs">UPI QR Code</span>
              </button>

              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-semibold ${
                  paymentMethod === 'card'
                    ? 'border-terracotta bg-terracotta/5 text-terracotta'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                }`}
              >
                <CreditCard className="w-6 h-6 text-saffron" />
                <span className="text-xs">Credit/Debit Card</span>
              </button>

              {/* COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-semibold ${
                  paymentMethod === 'cod'
                    ? 'border-terracotta bg-terracotta/5 text-terracotta'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                }`}
              >
                <div className="bg-gray-200 text-darkbrown h-7 w-7 rounded-full flex items-center justify-center font-bold text-[10px]">
                  ₹
                </div>
                <span className="text-xs">Cash on Delivery</span>
              </button>
            </div>

            {/* Payment Method UI Details */}
            <div className="bg-cream-light p-5 rounded-2xl border border-gold/10">
              {paymentMethod === 'upi' && (
                <div className="text-center space-y-4">
                  <p className="text-xs font-bold text-darkbrown">Scan simulated QR Code with BHIM, GPay, or PhonePe</p>
                  
                  {/* Mock QR code container */}
                  <div className="bg-white border-2 border-dashed border-gray-200 p-4.5 rounded-xl inline-block shadow-sm">
                    <div className="bg-darkbrown w-36 h-36 mx-auto flex items-center justify-center relative">
                      {/* Grid representation of QR */}
                      <div className="grid grid-cols-4 gap-2.5 p-3 w-full h-full text-cream-light/35 font-serif font-bold text-[8px] overflow-hidden">
                        <div>■ □ ■</div> <div>□ ■ □</div> <div>■ ■ □</div> <div>□ □ ■</div>
                        <div>■ ■ □</div> <div>■ □ ■</div> <div>□ ■ ■</div> <div>■ ■ □</div>
                        <div>□ □ ■</div> <div>■ ■ □</div> <div>■ □ ■</div> <div>□ ■ □</div>
                        <div>■ ■ ■</div> <div>□ □ ■</div> <div>□ ■ ■</div> <div>■ ■ ■</div>
                      </div>
                      <span className="absolute bg-white text-terracotta font-serif text-[10px] font-bold px-2 py-1 border border-gold/10 rounded">
                        Apna Khao
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400">Order processing will complete instantly upon placing order below.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={card.number}
                      onChange={(e) => setCard((prev) => ({ ...prev, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400">Expiry Date</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={(e) => setCard((prev) => ({ ...prev, expiry: e.target.value.replace(/[^0-9/]/g, '') }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={card.cvv}
                        onChange={(e) => setCard((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-terracotta text-darkbrown"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-center py-4 text-xs text-gray-500 font-semibold space-y-2">
                  <p>✓ Pay with Cash or UPI upon receiving the order package.</p>
                  <p className="text-[10px] text-gray-400">Note: Please keep exact change ready to facilitate quick delivery contact.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Review panel - Right Side */}
        <div className="space-y-6">
          <div className="bg-white border border-gold/10 p-6 rounded-2xl shadow-premium space-y-6">
            <h3 className="font-serif text-lg font-bold text-darkbrown flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <ShoppingBag className="w-5 h-5 text-terracotta" />
              Order Review
            </h3>

            {/* Product list */}
            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.uniqueKey} className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-darkbrown line-clamp-1">{item.name}</h4>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase">Size: {item.selectedWeight} × {item.quantity}</span>
                  </div>
                  <span className="font-bold text-darkbrown">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 space-y-3.5 text-xs text-gray-500 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-darkbrown">₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-darkbrown font-extrabold border-t border-gray-100 pt-3">
                <span>Total Payable</span>
                <span className="text-lg text-terracotta font-extrabold">₹{getTotal()}</span>
              </div>
            </div>

            {/* Payment triggers */}
            <button
              type="submit"
              disabled={placingOrder || !pinValid}
              className={`w-full font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                pinValid && !placingOrder
                  ? 'bg-terracotta hover:bg-terracotta-dark text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              id="checkout-pay-btn"
            >
              {placingOrder ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
          
          <div className="bg-cream border border-gold/15 p-5 rounded-2xl flex items-start gap-2.5 text-[10px] text-gray-400 leading-relaxed font-semibold">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p>🔒 256-Bit SSL Encrypted Checkout. Your details are safe with us.</p>
              <p className="mt-1">In order to process fresh batches, COD orders may be verified via phone support call.</p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
