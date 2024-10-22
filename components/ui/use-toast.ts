// Simplified version of the use-toast hook
import { useState } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, duration = 3000 }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }, duration)
  }

  return { toast, toasts }
}