"use client"

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react"
import { AlertCircle, X, WifiOff, ServerCrash, Ban, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "error" | "warning" | "success" | "network" | "banned" | "locked"

interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, toast.duration || 4000)
    }
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(onClose, 200)
  }

  const Icon = {
    error: AlertCircle,
    warning: AlertCircle,
    success: AlertCircle,
    network: WifiOff,
    banned: Ban,
    locked: Lock,
  }[toast.type]

  const colorClasses = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    network: "bg-orange-50 border-orange-200 text-orange-800",
    banned: "bg-red-50 border-red-200 text-red-800",
    locked: "bg-amber-50 border-amber-200 text-amber-800",
  }[toast.type]

  const iconColorClasses = {
    error: "text-red-500",
    warning: "text-amber-500",
    success: "text-green-500",
    network: "text-orange-500",
    banned: "text-red-500",
    locked: "text-amber-500",
  }[toast.type]

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-200",
        colorClasses,
        isExiting ? "opacity-0 translate-y-[-10px]" : "opacity-100 translate-y-0"
      )}
      role="alert"
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColorClasses)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{toast.title}</p>
        <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Inline error for form fields
interface InlineErrorProps {
  message?: string
  className?: string
}

export function InlineError({ message, className }: InlineErrorProps) {
  if (!message) return null

  return (
    <div className={cn("flex items-center gap-1.5 mt-1.5", className)}>
      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
      <p className="text-sm text-red-500">{message}</p>
    </div>
  )
}
