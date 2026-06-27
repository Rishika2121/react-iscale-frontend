import { useState, useCallback } from 'react';

let globalShowToast = null;

export const registerToast = (fn) => {
  globalShowToast = fn;
};

export const showToast = (message, type = 'info') => {
  if (globalShowToast) globalShowToast(message, type);
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, show, dismiss };
};
