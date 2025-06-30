import { useState, useCallback } from 'react';

interface ToastState {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    type: 'info',
    message: '',
    isVisible: false
  });

  const showToast = useCallback((type: ToastState['type'], message: string) => {
    setToast({ type, message, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};