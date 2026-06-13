import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const PinCodeChecker = () => {
  const { checkPinCode } = useContext(CartContext);
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pin) return;
    const res = checkPinCode(pin);
    setResult(res);
  };

  return (
    <div className="bg-cream-light border border-gold/15 p-4 rounded-xl shadow-sm max-w-sm">
      <h4 className="text-sm font-semibold text-darkbrown flex items-center mb-2">
        <MapPin className="w-4 h-4 text-terracotta mr-1.5" />
        Delivery Availability Checker
      </h4>
      <p className="text-xs text-gray-500 mb-3">
        Enter your 6-digit PIN code to check if we express air-ship fresh from Odisha to your location.
      </p>
      
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN"
          value={pin}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPin(val);
            setResult(null); // Clear result on edit
          }}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-terracotta font-medium placeholder:text-gray-400 placeholder:text-xs"
        />
        <button
          type="submit"
          disabled={pin.length !== 6}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            pin.length === 6
              ? 'bg-terracotta hover:bg-terracotta-dark text-cream hover:shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Check
        </button>
      </form>

      {result && (
        <div
          className={`mt-3 flex items-start gap-2 p-3 rounded-lg border text-xs animate-fadeIn ${
            result.valid
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
              : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}
        >
          {result.valid ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <p className="font-medium leading-relaxed">{result.message}</p>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PinCodeChecker;
