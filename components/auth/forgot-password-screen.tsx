"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { InlineError, useToast } from "@/components/ui/error-toast"
import { useI18n } from "@/lib/i18n"

interface ForgotPasswordScreenProps {
  onBack?: () => void
  onSendCode?: () => void
  onLogin?: () => void
  onHelp?: () => void
}

export function ForgotPasswordScreen({ onBack, onSendCode, onLogin, onHelp }: ForgotPasswordScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSendCode = async () => {
    if (!email || !validateEmail(email)) {
      setError(t.login.errors.invalidEmail)
      return
    }

    setError(undefined)
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSendCode?.()
    } catch {
      showToast({
        type: "error",
        title: t.common.error,
        message: t.errors.network,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <button
            onClick={onHelp}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label={t.common.help}
          >
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </button>
          <StaticLogo size="sm" className="text-foreground" />
        </div>
      </div>

      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col justify-center py-8">
        {/* Title */}
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-3 text-left">
          {t.forgotPassword.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {t.forgotPassword.description}
        </p>

        {/* Form */}
        <div className="space-y-2">
          <Label htmlFor="forgot-email" className="text-sm font-medium text-foreground">
            {t.forgotPassword.emailLabel}
          </Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder={t.forgotPassword.emailPlaceholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(undefined)
            }}
            className={`h-14 rounded-xl text-base px-4 ${error ? "border-red-500" : "border-border"}`}
            disabled={isLoading}
          />
          <InlineError message={error} />
        </div>

        {/* Send Code Button */}
        <Button 
          onClick={handleSendCode}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium mt-8"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.forgotPassword.sendCode
          )}
        </Button>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="text-center py-4">
        <span className="text-sm text-muted-foreground">
          {t.forgotPassword.rememberPassword}{" "}
        </span>
        <button
          onClick={onLogin}
          className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
          disabled={isLoading}
        >
          {t.forgotPassword.logIn}
        </button>
      </div>
    </div>
  )
}
