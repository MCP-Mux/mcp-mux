import { useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/cn';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export function Toast({
  id,
  type,
  title,
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  const Icon = iconMap[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
        'bg-surface border-[rgb(var(--border))]',
        'animate-in slide-in-from-right-full duration-300'
      )}
      role="alert"
      data-testid={`toast-${type}`}
    >
      <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', colorMap[type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {message && (
          <p className="text-xs text-[rgb(var(--muted))] mt-1">{message}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors flex-shrink-0"
        aria-label="Close notification"
        data-testid="toast-close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
      data-testid="toast-container"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
