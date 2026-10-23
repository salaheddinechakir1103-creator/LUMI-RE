import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 border shadow-2xl backdrop-blur-md text-xs font-mono transition-all animate-slide-in ${
            toast.type === 'error'
              ? 'bg-red-950/90 border-red-500/40 text-red-200'
              : toast.type === 'info'
              ? 'bg-zinc-900/95 border-white/20 text-zinc-200'
              : 'bg-[#181824]/95 border-[#D4AF37]/40 text-amber-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-zinc-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            )}
            <span className="font-sans text-xs">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
