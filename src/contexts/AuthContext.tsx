import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('aarogya_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Validate user object structure
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.name) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('aarogya_user');
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('aarogya_user');
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    setLoading(true);
    try {
      // Simulate API call - In real app, this would connect to Firebase/Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials check
      if (email === 'demo@aarogyaai.com' && password === 'demo123') {
        const mockUser: User = {
          id: 'demo_user_1',
          email,
          name: 'Demo User',
          subscription: 'premium',
          createdAt: new Date(),
          tavusApiKey: 'demo_tavus_key_' + Math.random().toString(36).substr(2, 9)
        };
        
        setUser(mockUser);
        localStorage.setItem('aarogya_user', JSON.stringify(mockUser));
      } else {
        // Create user for any valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address');
        }

        const mockUser: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          subscription: 'basic',
          createdAt: new Date(),
          tavusApiKey: 'tavus_key_' + Math.random().toString(36).substr(2, 9)
        };
        
        setUser(mockUser);
        localStorage.setItem('aarogya_user', JSON.stringify(mockUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name,
        subscription: 'basic',
        createdAt: new Date(),
        tavusApiKey: 'tavus_key_' + Math.random().toString(36).substr(2, 9)
      };
      
      setUser(mockUser);
      localStorage.setItem('aarogya_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aarogya_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};