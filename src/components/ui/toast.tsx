import React, { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToastProps } from "./use-toast"

export function Toaster() {
  const { visibleToast, dismissToast } = useToast()
  
  useEffect(() => {
    if (visibleToast) {
      const timer = setTimeout(() => {
        dismissToast()
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [visibleToast, dismissToast])
  
  if (!visibleToast) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Toast
        variant={visibleToast.variant}
        title={visibleToast.title}
        description={visibleToast.description}
        onClose={dismissToast}
      />
    </div>
  )
}

interface ToastComponentProps extends ToastProps {
  onClose: () => void
}

function Toast({
  variant = "default",
  title,
  description,
  onClose,
}: ToastComponentProps) {
  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-md items-start gap-4 rounded-lg border p-6 shadow-lg transition-all",
        variant === "destructive" 
          ? "border-red-200 bg-red-50 text-red-900" 
          : "border-gray-200 bg-white text-gray-900"
      )}
      role="alert"
    >
      <div className="grid gap-1 flex-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        className="absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Reexport the hook for easy access
export { useToast } from "./use-toast"