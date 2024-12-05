import React, { createContext, useContext, useState, useEffect } from 'react';
import { Admin, login as apiLogin } from '../services/auth';
import { setAuthToken, removeAuthToken } from '../services/api';

interface AuthContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setAdmin(adminData);
      setAuthToken(adminData.id.toString());
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const adminData = await apiLogin({ username, password });
      setAdmin(adminData);
      setAuthToken(adminData.id.toString());
      localStorage.setItem('admin', JSON.stringify(adminData));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAdmin(null);
    removeAuthToken();
    localStorage.removeItem('admin');
  };

  return (
      <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}