"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScreenNavigatorProps {
  screens: { id: string; label: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export function ScreenNavigator({ screens, currentIndex, onNavigate }: ScreenNavigatorProps) {
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < screens.length - 1

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-foreground text-background px-2 py-2 rounded-full shadow-lg z-50 max-w-[90vw]">
      <button
        onClick={() => canGoBack && onNavigate(currentIndex - 1)}
        disabled={!canGoBack}
        className="p-1.5 hover:bg-background/10 rounded-full transition-colors disabled:opacity-30 flex-shrink-0"
        aria-label="Previous screen"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Page Indicator Dots */}
      <div className="flex items-center gap-1 px-2 overflow-x-auto scrollbar-hide">
        {screens.map((screen, index) => (
          <button
            key={screen.id}
            onClick={() => onNavigate(index)}
            className={`flex-shrink-0 transition-all duration-200 ${
              index === currentIndex 
                ? "w-6 h-2 bg-background rounded-full" 
                : "w-2 h-2 bg-background/40 rounded-full hover:bg-background/60"
            }`}
            aria-label={`Go to ${screen.label}`}
            title={screen.label}
          />
        ))}
      </div>
      
      <button
        onClick={() => canGoForward && onNavigate(currentIndex + 1)}
        disabled={!canGoForward}
        className="p-1.5 hover:bg-background/10 rounded-full transition-colors disabled:opacity-30 flex-shrink-0"
        aria-label="Next screen"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
