"use client"

import { WifiOff, Ban, Lock, RefreshCw, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

interface NetworkErrorScreenProps {
  onRetry?: () => void
  onHelp?: () => void
}

export function NetworkErrorScreen({ onRetry, onHelp }: NetworkErrorScreenProps) {
  const { t, language } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-6">
          <WifiOff className="w-10 h-10 text-orange-500" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight text-center mb-3">
          {language === "zh" ? "网络连接失败" : "Network Error"}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-8 max-w-[280px]">
          {t.errors.network}
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={onRetry}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            {t.common.retry}
          </Button>
          
          <Button 
            variant="outline"
            onClick={onHelp}
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.common.help}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface AccountBannedScreenProps {
  reason?: string
  onAppeal?: () => void
  onHelp?: () => void
}

export function AccountBannedScreen({ reason, onAppeal, onHelp }: AccountBannedScreenProps) {
  const { language, t } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <Ban className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight text-center mb-3">
          {language === "zh" ? "账户已被封禁" : "Account Suspended"}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-4 max-w-[280px]">
          {language === "zh" 
            ? "您的账户因违反服务条款已被暂停使用。" 
            : "Your account has been suspended for violating our terms of service."}
        </p>

        {reason && (
          <div className="bg-red-50 rounded-xl p-4 mb-8 w-full">
            <p className="text-sm text-red-800">
              <span className="font-medium">{language === "zh" ? "原因：" : "Reason: "}</span>
              {reason}
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="w-full space-y-3 mb-8">
          <p className="text-sm text-muted-foreground text-center">
            {language === "zh" ? "如有疑问，请联系客服：" : "Contact support for assistance:"}
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href={`mailto:${t.help.emailValue}`} className="flex items-center gap-2 text-sm text-foreground hover:underline">
              <Mail className="w-4 h-4" />
              {t.help.emailValue}
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={onAppeal}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            {language === "zh" ? "申诉账户" : "Appeal Decision"}
          </Button>
          
          <Button 
            variant="outline"
            onClick={onHelp}
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.common.help}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface AccountLockedScreenProps {
  remainingMinutes?: number
  onHelp?: () => void
  onBack?: () => void
}

export function AccountLockedScreen({ remainingMinutes = 30, onHelp, onBack }: AccountLockedScreenProps) {
  const { language, t } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-amber-500" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight text-center mb-3">
          {language === "zh" ? "账户已锁定" : "Account Locked"}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-4 max-w-[280px]">
          {language === "zh" 
            ? "由于多次登录失败，您的账户已被暂时锁定。" 
            : "Your account has been temporarily locked due to multiple failed login attempts."}
        </p>

        {/* Timer */}
        <div className="bg-amber-50 rounded-xl p-4 mb-8 w-full text-center">
          <p className="text-sm text-amber-800">
            {language === "zh" 
              ? `请在 ${remainingMinutes} 分钟后重试` 
              : `Please try again in ${remainingMinutes} minutes`}
          </p>
        </div>

        {/* Contact Info */}
        <div className="w-full space-y-3 mb-8">
          <p className="text-sm text-muted-foreground text-center">
            {language === "zh" ? "如需立即解锁，请联系客服：" : "Contact support to unlock immediately:"}
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href={`tel:${t.help.phoneValue.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-foreground hover:underline">
              <Phone className="w-4 h-4" />
              {t.help.phoneValue}
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={onHelp}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            {t.common.help}
          </Button>
          
          <Button 
            variant="outline"
            onClick={onBack}
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.common.back}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ServerErrorScreenProps {
  onRetry?: () => void
  onHelp?: () => void
}

export function ServerErrorScreen({ onRetry, onHelp }: ServerErrorScreenProps) {
  const { language, t } = useI18n()

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M7 8h.01" />
            <path d="M12 8h.01" />
            <path d="M17 8h.01" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight text-center mb-3">
          {language === "zh" ? "服务暂时不可用" : "Service Unavailable"}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-base leading-relaxed mb-8 max-w-[280px]">
          {t.errors.server}
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={onRetry}
            className="w-full h-14 rounded-xl text-base font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t.common.retry}
          </Button>
          
          <Button 
            variant="outline"
            onClick={onHelp}
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.common.help}
          </Button>
        </div>
      </div>
    </div>
  )
}
