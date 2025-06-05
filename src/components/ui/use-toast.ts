import { useEffect, useRef, useState } from "react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const [visibleToast, setVisibleToast] = useState<ToastProps | null>(null)
  const toastTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (toasts.length > 0 && !visibleToast) {
      setVisibleToast(toasts[0])
      setToasts(prevToasts => prevToasts.slice(1))
      
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
      }
      
      toastTimerRef.current = window.setTimeout(() => {
        setVisibleToast(null)
        toastTimerRef.current = null
      }, 3000)
    }
    
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [toasts, visibleToast])

  function toast(props: ToastProps) {
    setToasts(prevToasts => [...prevToasts, props])
  }

  return {
    toast,
    visibleToast,
    dismissToast: () => setVisibleToast(null),
  }
}