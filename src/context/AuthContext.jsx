import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('apna_khao_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return false;
    }

    // Handle dummy credential check or retrieve registered user
    const registeredUsers = JSON.parse(localStorage.getItem('apna_khao_registered_users') || '[]');
    const matchedUser = registeredUsers.find(u => u.email === email.toLowerCase());

    if (matchedUser) {
      if (matchedUser.password === password) {
        const loggedUser = { name: matchedUser.name, email: matchedUser.email };
        setUser(loggedUser);
        localStorage.setItem('apna_khao_user', JSON.stringify(loggedUser));
        setLoading(false);
        return true;
      } else {
        setError('Incorrect password.');
        setLoading(false);
        return false;
      }
    } else {
      // Default fallback demo user
      if (email.toLowerCase() === 'odia@apnakhao.com' && password === 'apnakhao123') {
        const demoUser = { name: 'Sambalpur Exp', email: 'odia@apnakhao.com' };
        setUser(demoUser);
        localStorage.setItem('apna_khao_user', JSON.stringify(demoUser));
        setLoading(false);
        return true;
      }
      
      setError('User account not found. Please register first.');
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError('');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!name || !email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return false;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('apna_khao_registered_users') || '[]');
    const userExists = registeredUsers.some(u => u.email === email.toLowerCase());

    if (userExists) {
      setError('Email is already registered.');
      setLoading(false);
      return false;
    }

    const newUser = { name, email: email.toLowerCase(), password };
    registeredUsers.push(newUser);
    localStorage.setItem('apna_khao_registered_users', JSON.stringify(registeredUsers));

    // Auto-login after registration
    const loggedUser = { name, email: email.toLowerCase() };
    setUser(loggedUser);
    localStorage.setItem('apna_khao_user', JSON.stringify(loggedUser));
    
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apna_khao_user');
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
