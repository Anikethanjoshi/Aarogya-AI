import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';
import Toast from '../components/UI/Toast';

interface ToastContextType {
  showToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};