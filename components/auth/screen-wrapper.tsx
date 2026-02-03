"use client"

import { ReactNode } from "react"

interface ScreenWrapperProps {
  children: ReactNode
}

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background shadow-xl">
        {children}
      </div>
    </div>
  )
}
