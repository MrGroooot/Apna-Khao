import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { User, Mail, Lock, UserPlus, LogIn, AlertCircle } from 'lucide-react';

const LoginRegister = () => {
  const { user, login, register, error, loading, setError } = useContext(AuthContext);
  const { navigateTo } = useContext(CartContext);

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Auto redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      const redirect = sessionStorage.getItem('auth_redirect');
      if (redirect) {
        sessionStorage.removeItem('auth_redirect');
        navigateTo(redirect);
      } else {
        navigateTo('home');
      }
    }
  }, [user]);

  // Clear errors on tab toggle
  useEffect(() => {
    setError('');
  }, [isLoginTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginTab) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      
      {/* Tab select cards */}
      <div className="bg-white border border-gold/10 rounded-3xl shadow-premium overflow-hidden">
        
        {/* Toggle header tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              isLoginTab ? 'border-terracotta text-terracotta bg-white' : 'border-transparent text-gray-400'
            }`}
          >
            <LogIn className="w-4.5 h-4.5" />
            Sign In
          </button>
          
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              !isLoginTab ? 'border-terracotta text-terracotta bg-white' : 'border-transparent text-gray-400'
            }`}
          >
            <UserPlus className="w-4.5 h-4.5" />
            Register
          </button>
        </div>

        {/* Auth Body Panel */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-lg font-bold text-darkbrown">
              {isLoginTab ? 'Welcome Back!' : 'Create Your Account'}
            </h3>
            <p className="text-gray-400 text-xs font-medium">
              {isLoginTab 
                ? 'Sign in to track orders and checkout faster.' 
                : 'Join Apna Khao to get fresh sweets updates.'}
            </p>
          </div>

          {/* Error display */}
          {error && (
            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-start gap-2 text-rose-800 text-xs font-semibold leading-relaxed">
              <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input (Register only) */}
            {!isLoginTab && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-cream-light border border-gray-200 focus:border-terracotta rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none text-darkbrown placeholder:text-gray-400 placeholder:text-xs"
                  />
                  <User className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            {/* Email input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. odia@apnakhao.com"
                  className="w-full bg-cream-light border border-gray-200 focus:border-terracotta rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none text-darkbrown placeholder:text-gray-400 placeholder:text-xs"
                />
                <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full bg-cream-light border border-gray-200 focus:border-terracotta rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none text-darkbrown placeholder:text-gray-400 placeholder:text-xs"
                />
                <Lock className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow"
            >
              {loading ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isLoginTab ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Quick Demo login hint */}
          {isLoginTab && (
            <div className="bg-cream border border-gold/15 p-4 rounded-2xl text-[10px] text-gray-400 leading-relaxed font-semibold">
              <span className="text-darkbrown font-bold uppercase block mb-1">💡 Developer Quick Login</span>
              Email: <span className="text-saffron-dark select-all">odia@apnakhao.com</span> <br />
              Password: <span className="text-saffron-dark select-all">apnakhao123</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
