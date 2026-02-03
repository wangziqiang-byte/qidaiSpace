"use client"

import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  onClick?: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-border hover:bg-secondary transition-colors"
      aria-label="Go back"
    >
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </button>
  )
}
