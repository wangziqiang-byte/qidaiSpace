"use client"

import { Button } from "@/components/ui/button"
import { SuccessLogo } from "@/components/icons/animated-logo"
import { useI18n } from "@/lib/i18n"

interface PasswordChangedScreenProps {
  onBackToLogin?: () => void
}

export function PasswordChangedScreen({ onBackToLogin }: PasswordChangedScreenProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Success Icon */}
        <div className="mb-8">
          <SuccessLogo size="lg" className="text-foreground" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight text-center mb-3">
          {t.passwordChanged.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-12 max-w-[280px]">
          {t.passwordChanged.description}
        </p>

        {/* Back to Login Button */}
        <Button 
          onClick={onBackToLogin}
          className="w-full h-14 rounded-xl text-base font-medium"
        >
          {t.passwordChanged.backToLogin}
        </Button>
      </div>
    </div>
  )
}
