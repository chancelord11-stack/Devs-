import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto min-w-[300px] max-w-sm flex items-center p-4 rounded-xl shadow-2xl border backdrop-blur-md animate-fade-in transition-all ${
                toast.type === 'success' ? 'bg-nexus-success/10 border-nexus-success/50 text-white' :
                toast.type === 'error' ? 'bg-nexus-error/10 border-nexus-error/50 text-white' :
                'bg-nexus-surface border-white/10 text-white'
            }`}
          >
            <div className="mr-3">
                {toast.type === 'success' && <CheckCircle size={20} className="text-nexus-success" />}
                {toast.type === 'error' && <AlertCircle size={20} className="text-nexus-error" />}
                {toast.type === 'info' && <Info size={20} className="text-nexus-primary" />}
            </div>
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="ml-3 text-white/50 hover:text-white">
                <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};