"use client"

import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/icons/animated-logo"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { HelpCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface OpeningScreenProps {
  onSignIn?: () => void
  onCreateAccount?: () => void
  onHelp?: () => void
}

export function OpeningScreen({ onSignIn, onCreateAccount, onHelp }: OpeningScreenProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={onHelp}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label={t.common.help}
          >
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Animated Logo */}
        <div className="mb-8">
          <AnimatedLogo size="xl" className="text-foreground" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight text-center mb-3">
          {t.opening.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-12 max-w-[280px]">
          {t.opening.description}
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={onSignIn}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            {t.opening.signIn}
          </Button>
          
          <Button 
            variant="outline"
            onClick={onCreateAccount}
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.opening.createAccount}
          </Button>
        </div>
      </div>
    </div>
  )
}
