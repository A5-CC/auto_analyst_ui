'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  authenticated: boolean;
  initialized: boolean;            // NEW: tells consumers when initial check finished
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // read sessionStorage synchronously in effect, then mark initialized
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') setAuthenticated(true);
    setInitialized(true);
  }, []);

  const login = (username: string, password: string) => {
    const validUser = process.env.NEXT_PUBLIC_LOGIN_USER;
    const validPass = process.env.NEXT_PUBLIC_LOGIN_PASS;

    if (username === validUser && password === validPass) {
      setAuthenticated(true);
      sessionStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider value={{ authenticated, initialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
