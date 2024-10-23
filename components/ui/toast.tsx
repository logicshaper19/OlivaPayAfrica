"use client";

import { useToast, ToastType } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  const getToastStyle = (type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`border rounded-md shadow-lg p-4 max-w-sm ${getToastStyle(toast.type as ToastType)}`}
        >
          {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
          {toast.description && <p className="text-sm">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
