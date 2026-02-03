"use client"

import { useMemo } from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

interface PasswordStrengthProps {
  password: string
  showRequirements?: boolean
}

interface PasswordRequirement {
  key: string
  label: string
  validator: (password: string) => boolean
}

export function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
  const { t } = useI18n()

  const requirements: PasswordRequirement[] = useMemo(() => [
    {
      key: "length",
      label: t.signup.passwordRequirements.length,
      validator: (p: string) => p.length >= 8,
    },
    {
      key: "uppercase",
      label: t.signup.passwordRequirements.uppercase,
      validator: (p: string) => /[A-Z]/.test(p),
    },
    {
      key: "lowercase",
      label: t.signup.passwordRequirements.lowercase,
      validator: (p: string) => /[a-z]/.test(p),
    },
    {
      key: "number",
      label: t.signup.passwordRequirements.number,
      validator: (p: string) => /[0-9]/.test(p),
    },
    {
      key: "special",
      label: t.signup.passwordRequirements.special,
      validator: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
    },
  ], [t])

  const passedCount = useMemo(() => {
    return requirements.filter((req) => req.validator(password)).length
  }, [password, requirements])

  const strength = useMemo(() => {
    if (password.length === 0) return null
    if (passedCount <= 2) return "weak"
    if (passedCount <= 4) return "medium"
    return "strong"
  }, [password, passedCount])

  const strengthLabel = useMemo(() => {
    if (!strength) return ""
    return {
      weak: t.signup.passwordStrength.weak,
      medium: t.signup.passwordStrength.medium,
      strong: t.signup.passwordStrength.strong,
    }[strength]
  }, [strength, t])

  const strengthColor = {
    weak: "bg-red-500",
    medium: "bg-amber-500",
    strong: "bg-green-500",
  }

  const strengthTextColor = {
    weak: "text-red-500",
    medium: "text-amber-500",
    strong: "text-green-500",
  }

  if (password.length === 0) return null

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-1 w-16 rounded-full transition-colors",
                  strength && level <= (strength === "weak" ? 1 : strength === "medium" ? 2 : 3)
                    ? strengthColor[strength]
                    : "bg-border"
                )}
              />
            ))}
          </div>
          {strength && (
            <span className={cn("text-xs font-medium", strengthTextColor[strength])}>
              {strengthLabel}
            </span>
          )}
        </div>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && (
        <div className="space-y-1.5">
          {requirements.map((req) => {
            const passed = req.validator(password)
            return (
              <div
                key={req.key}
                className={cn(
                  "flex items-center gap-2 text-xs transition-colors",
                  passed ? "text-green-600" : "text-muted-foreground"
                )}
              >
                {passed ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <X className="w-3.5 h-3.5" />
                )}
                <span>{req.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function usePasswordStrength(password: string) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passedCount = Object.values(checks).filter(Boolean).length

  return {
    checks,
    passedCount,
    isWeak: passedCount <= 2,
    isMedium: passedCount > 2 && passedCount < 5,
    isStrong: passedCount === 5,
    isValid: passedCount >= 3,
  }
}
