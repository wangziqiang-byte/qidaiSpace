"use client"

import { useState, useCallback } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { OTPInput } from "@/components/ui/otp-input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/error-toast"
import { useI18n } from "@/lib/i18n"

interface PhoneVerifyScreenProps {
  phoneNumber?: string
  onBack?: () => void
  onVerify?: () => void
  onResend?: () => void
  onHelp?: () => void
}

export function PhoneVerifyScreen({ 
  phoneNumber = "+86 138 0000 0000",
  onBack, 
  onVerify,
  onResend,
  onHelp
}: PhoneVerifyScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [code, setCode] = useState<string[]>(Array(5).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleVerify = useCallback(async (codeString?: string) => {
    const finalCode = codeString || code.join("")
    if (finalCode.length !== 5) return

    setIsLoading(true)
    setError(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight text-center mb-3">
          {t.phoneVerify.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed text-center mb-8">
          {t.phoneVerify.description}{" "}
          <span className="text-foreground font-medium">{phoneNumber}</span>
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

        {/* Resend Link */}
        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">
            {t.phoneVerify.didntReceive}{" "}
          </span>
          <button
            onClick={onResend}
            className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
            disabled={isLoading}
          >
            {t.phoneVerify.resend}
          </button>
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
            t.phoneVerify.verify
          )}
        </Button>
      </div>
    </div>
  )
}
