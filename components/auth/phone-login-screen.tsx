"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { InlineError, useToast } from "@/components/ui/error-toast"
import { useI18n } from "@/lib/i18n"

interface PhoneLoginScreenProps {
  onBack?: () => void
  onContinue?: () => void
  onHelp?: () => void
}

export function PhoneLoginScreen({ onBack, onContinue, onHelp }: PhoneLoginScreenProps) {
  const { t } = useI18n()
  const { showToast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [syncContacts, setSyncContacts] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const validatePhone = (phone: string) => {
    // Simple validation - at least 9 digits
    return phone.replace(/\D/g, "").length >= 9
  }

  const handleContinue = async () => {
    if (!validatePhone(phoneNumber)) {
      setError(t.phoneLogin.errors.invalidPhone)
      return
    }

    setError(undefined)
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onContinue?.()
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
          {t.phoneLogin.title}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {t.phoneLogin.description}
        </p>

        {/* Phone Input */}
        <div className="mb-2">
          <div className={`flex items-center gap-3 py-4 border-b ${error ? "border-red-500" : "border-border"}`}>
            <span className="text-base text-foreground font-medium">+86</span>
            <div className="w-px h-6 bg-border" />
            <input
              type="tel"
              placeholder="138 0000 0000"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                if (error) setError(undefined)
              }}
              className="flex-1 text-base bg-transparent outline-none placeholder:text-muted-foreground"
              disabled={isLoading}
            />
          </div>
          <InlineError message={error} />
        </div>

        {/* Sync Contacts */}
        <div className="flex items-center justify-between py-4 mt-4">
          <span className="text-base text-foreground">{t.phoneLogin.syncContacts}</span>
          <Switch 
            checked={syncContacts} 
            onCheckedChange={setSyncContacts}
            disabled={isLoading}
          />
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full h-14 rounded-xl text-base font-medium mt-8"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
              {t.common.loading}
            </span>
          ) : (
            t.phoneLogin.continue
          )}
        </Button>
      </div>
    </div>
  )
}
