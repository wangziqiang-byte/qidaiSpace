"use client"

import { useRef, useState, KeyboardEvent, ClipboardEvent, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  value?: string[]
  onChange?: (value: string[]) => void
  onComplete?: (code: string) => void
  error?: boolean
  disabled?: boolean
}

export function OTPInput({ 
  length = 5, 
  value: controlledValue, 
  onChange,
  onComplete,
  error = false,
  disabled = false
}: OTPInputProps) {
  const [internalValue, setInternalValue] = useState<string[]>(Array(length).fill(""))
  const value = controlledValue || internalValue
  const setValue = onChange || setInternalValue
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (error) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }, [error])

  // Auto-submit when all fields are filled
  useEffect(() => {
    const code = value.join("")
    if (code.length === length && value.every(v => v !== "")) {
      onComplete?.(code)
    }
  }, [value, length, onComplete])

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return
    const digit = inputValue.replace(/\D/g, "").slice(-1)
    const newValue = [...value]
    newValue[index] = digit
    setValue(newValue)

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    const newValue = [...value]
    pastedData.split("").forEach((char, i) => {
      if (i < length) newValue[i] = char
    })
    setValue(newValue)
    const nextEmptyIndex = newValue.findIndex((v) => !v)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
    }
  }

  return (
    <div className={cn("flex gap-3", shake && "animate-shake")}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-14 h-14 text-center text-xl font-semibold border rounded-xl",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            "transition-all bg-background text-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error 
              ? "border-red-500 focus:ring-red-500" 
              : "border-border focus:ring-foreground",
            value[index] && !error && "border-foreground"
          )}
        />
      ))}
    </div>
  )
}
