"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { InlineError, useToast } from "@/components/ui/error-toast"
import { PasswordStrength } from "@/components/ui/password-strength"
import { useI18n } from "@/lib/i18n"

interface SignUpScreenProps {
  onBack?: () => void
  onSignUp?: () => void
  onLogin?: () => void
  onHelp?: () => void
  onTerms?: () => void
  onPrivacy?: () => void
}

export function SignUpScreen({ onBack, onSignUp, onLogin, onHelp, onTerms, onPrivacy }: SignUpScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ 
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string 
  }>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSignUp = async () => {
    const newErrors: typeof errors = {}

    if (!username || username.length < 3) {
      newErrors.username = t.signup.errors.usernameTaken
    }
    if (!email || !validateEmail(email)) {
      newErrors.email = t.signup.errors.emailTaken
    }
    if (!password || password.length < 8) {
      newErrors.password = t.signup.errors.weakPassword
    }
    if (!confirmPassword || confirmPassword !== password) {
      newErrors.confirmPassword = t.signup.errors.passwordMismatch
    }
    if (!acceptTerms) {
      newErrors.terms = t.signup.errors.termsRequired
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSignUp?.()
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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-6 text-left">
          {t.signup.title}
        </h1>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-foreground">
              {t.signup.usernameLabel}
            </Label>
            <Input
              id="username"
              type="text"
              placeholder={t.signup.usernamePlaceholder}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (errors.username) setErrors({ ...errors, username: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.username ? "border-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <InlineError message={errors.username} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">
              {t.signup.emailLabel}
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder={t.signup.emailPlaceholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              className={`h-14 rounded-xl text-base px-4 ${errors.email ? "border-red-500" : "border-border"}`}
              disabled={isLoading}
            />
            <InlineError message={errors.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">
              {t.signup.passwordLabel}
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder={t.signup.passwordPlaceholder}
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
            <Label htmlFor="signup-confirm-password" className="text-sm font-medium text-foreground">
              {t.signup.confirmPasswordLabel}
            </Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder={t.signup.confirmPasswordPlaceholder}
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

          {/* Terms Checkbox */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setAcceptTerms(!acceptTerms)
                if (errors.terms) setErrors({ ...errors, terms: undefined })
              }}
              className="flex items-start gap-3"
              disabled={isLoading}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                acceptTerms 
                  ? "bg-foreground text-background" 
                  : "border-2 border-border"
              }`}>
                {acceptTerms && <Check className="w-4 h-4" />}
              </div>
              <span className="text-sm text-foreground text-left">
                {t.signup.acceptTerms}{" "}
                <button onClick={(e) => { e.stopPropagation(); onTerms?.() }} className="underline font-medium">
                  {t.signup.termsLink}
                </button>
                {" "}{t.signup.and}{" "}
                <button onClick={(e) => { e.stopPropagation(); onPrivacy?.() }} className="underline font-medium">
                  {t.signup.privacyLink}
                </button>
              </span>
            </button>
            <InlineError message={errors.terms} />
          </div>
        </div>

        {/* Sign Up Button */}
        <Button 
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium mt-6"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.signup.signUpButton
          )}
        </Button>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="text-center py-4">
        <span className="text-sm text-muted-foreground">
          {t.signup.hasAccount}{" "}
        </span>
        <button
          onClick={onLogin}
          className="text-sm font-semibold text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors"
          disabled={isLoading}
        >
          {t.signup.logIn}
        </button>
      </div>
    </div>
  )
}
