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
import { PasswordStrength } from "@/components/ui/password-strength"
import { useI18n } from "@/lib/i18n"

interface ResetPasswordScreenProps {
  onBack?: () => void
  onReset?: () => void
  onLogin?: () => void
  onHelp?: () => void
}

export function ResetPasswordScreen({ onBack, onReset, onLogin, onHelp }: ResetPasswordScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})

  const handleReset = async () => {
    const newErrors: typeof errors = {}

    if (!password || password.length < 8) {
      newErrors.password = t.signup.errors.weakPassword
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.resetPassword.errors.passwordMismatch
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onReset?.()
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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-3">
          {t.resetPassword.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {t.resetPassword.description}
        </p>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium text-foreground">
              {t.resetPassword.newPasswordLabel}
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder={t.resetPassword.newPasswordPlaceholder}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.password ? "border-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <PasswordStrength password={password} />
            <InlineError message={errors.password} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
              {t.resetPassword.confirmPasswordLabel}
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder={t.resetPassword.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.confirmPassword ? "border-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <InlineError message={errors.confirmPassword} />
          </div>
        </div>

        {/* Reset Button */}
        <Button 
          onClick={handleReset}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium mt-8"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.resetPassword.resetButton
          )}
        </Button>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="text-center py-4">
        <span className="text-sm text-muted-foreground">
          {t.resetPassword.hasAccount}{" "}
        </span>
        <button
          onClick={onLogin}
          className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
          disabled={isLoading}
        >
          {t.resetPassword.logIn}
        </button>
      </div>
    </div>
  )
}
