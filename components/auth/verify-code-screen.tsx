"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { OTPInput } from "@/components/ui/otp-input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/error-toast"
import { useI18n } from "@/lib/i18n"
import { HelpCircle } from "lucide-react"

interface VerifyCodeScreenProps {
  email?: string
  phone?: string
  title?: string
  onBack?: () => void
  onVerify?: () => void
  onResend?: () => void
  onHelp?: () => void
}

export function VerifyCodeScreen({ 
  email = "helloworld@gmail.com",
  phone,
  title,
  onBack, 
  onVerify,
  onResend,
  onHelp
}: VerifyCodeScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [code, setCode] = useState<string[]>(Array(5).fill(""))
  const [countdown, setCountdown] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const maxResendAttempts = 5

  const displayTitle = title || (phone ? t.verifyCode.titlePhone : t.verifyCode.titleEmail)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerify = useCallback(async (codeString?: string) => {
    const finalCode = codeString || code.join("")
    if (finalCode.length !== 5) return

    setIsLoading(true)
    setError(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Simulate verification - in real app, this would call API
      onVerify?.()
    } catch {
      setError(true)
      showToast({
        type: "error",
        title: t.common.error,
        message: t.verifyCode.errors.invalidCode,
      })
    } finally {
      setIsLoading(false)
    }
  }, [code, onVerify, showToast, t])

  const handleResend = () => {
    if (resendCount >= maxResendAttempts) {
      showToast({
        type: "warning",
        title: t.common.error,
        message: t.verifyCode.errors.tooManyAttempts,
      })
      return
    }
    setCountdown(60)
    setResendCount(prev => prev + 1)
    setCode(Array(5).fill(""))
    setError(false)
    onResend?.()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleOTPComplete = useCallback((completedCode: string) => {
    handleVerify(completedCode)
  }, [handleVerify])

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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight mb-3 text-center">
          {displayTitle}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8 text-center">
          {phone ? t.verifyCode.descriptionPhone : t.verifyCode.descriptionEmail}{" "}
          <span className="text-foreground font-medium">
            {phone || email}
          </span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-center mb-8">
          <OTPInput 
            value={code} 
            onChange={setCode}
            onComplete={handleOTPComplete}
            error={error}
            disabled={isLoading}
          />
        </div>

        {/* Verify Button */}
        <Button 
          onClick={() => handleVerify()}
          disabled={code.some(c => !c) || isLoading}
          className="w-full h-14 rounded-xl text-base font-medium"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.verifyCode.verify
          )}
        </Button>

        {/* Resend Link */}
        <div className="mt-8 text-center">
          <span className="text-sm text-muted-foreground">
            {t.verifyCode.sendAgain}{" "}
          </span>
          {countdown > 0 ? (
            <span className="text-sm text-muted-foreground">
              {formatTime(countdown)}
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
              disabled={isLoading || resendCount >= maxResendAttempts}
            >
              {t.verifyCode.resend}
            </button>
          )}
          {resendCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              ({resendCount}/{maxResendAttempts})
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
