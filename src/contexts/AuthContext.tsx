import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { validateEmail, validatePassword } from '../utils/validation';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';
import { logError } from '../utils/errorHandler';
import { revenueCatService } from '../services/revenueCatService';

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
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (isValidUserObject(parsedUser)) {
          // Check subscription status with RevenueCat
          if (revenueCatService.isConfigured()) {
            const subscription = await revenueCatService.getSubscriberInfo(parsedUser.id);
            if (subscription) {
              parsedUser.subscription = subscription.planId;
            }
          }
          setUser(parsedUser);
        } else {
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      }
    } catch (error) {
      logError(error as Error, 'AuthProvider.initializeAuth');
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  };

  const isValidUserObject = (user: any): boolean => {
    return user && 
           typeof user.id === 'string' && 
           typeof user.email === 'string' && 
           typeof user.name === 'string' &&
           validateEmail(user.email);
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials check
      if (email === 'demo@aarogyaai.com' && password === 'demo123') {
        const mockUser: User = {
          id: 'demo_user_1',
          email,
          name: 'Demo User',
          subscription: 'premium',
          createdAt: new Date(),
          tavusApiKey: 'demo_tavus_key_' + Math.random().toString(36).substr(2, 9),
          avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
        };
        
        setUser(mockUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
        return;
      }

      // For any other valid email, create a user
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        subscription: 'basic',
        createdAt: new Date(),
        tavusApiKey: 'tavus_key_' + Math.random().toString(36).substr(2, 9),
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
      };
      
      setUser(mockUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
    } catch (error) {
      logError(error as Error, 'AuthProvider.login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors[0]);
    }

    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name,
        subscription: 'basic',
        createdAt: new Date(),
        tavusApiKey: 'tavus_key_' + Math.random().toString(36).substr(2, 9),
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100'
      };
      
      setUser(mockUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
    } catch (error) {
      logError(error as Error, 'AuthProvider.register');
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Clear other user-specific data
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};