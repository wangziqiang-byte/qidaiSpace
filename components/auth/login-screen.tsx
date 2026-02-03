"use client"

import { useState } from "react"
import { Smartphone, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { InlineError, useToast } from "@/components/ui/error-toast"
import { useI18n } from "@/lib/i18n"

interface LoginScreenProps {
  onBack?: () => void
  onLogin?: () => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  onPhoneLogin?: () => void
  onHelp?: () => void
}

export function LoginScreen({ 
  onBack, 
  onLogin, 
  onForgotPassword, 
  onSignUp,
  onPhoneLogin,
  onHelp
}: LoginScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email || !validateEmail(email)) {
      newErrors.email = t.login.errors.invalidEmail
    }
    if (!password || password.length < 8) {
      newErrors.password = t.login.errors.invalidPassword
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onLogin?.()
    } catch {
      showToast({
        type: "error",
        title: t.common.error,
        message: t.login.errors.networkError,
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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-8 text-left">
          {t.login.title} <span className="inline-block">&#128075;</span>
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              {t.login.emailLabel}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t.login.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <InlineError message={errors.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              {t.login.passwordLabel}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t.login.passwordPlaceholder}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <InlineError message={errors.password} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onForgotPassword}
              className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              disabled={isLoading}
            >
              {t.login.forgotPassword}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium mt-6"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.login.loginButton
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">{t.login.orWith}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Phone Login */}
        <Button 
          variant="outline"
          onClick={onPhoneLogin}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
        >
          <Smartphone className="w-5 h-5 mr-2" />
          {t.login.phone}
        </Button>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="text-center py-4">
        <span className="text-sm text-muted-foreground">
          {t.login.noAccount}{" "}
        </span>
        <button
          onClick={onSignUp}
          className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
          disabled={isLoading}
        >
          {t.login.signUp}
        </button>
      </div>
    </div>
  )
}
