"use client"

import { useI18n, Language } from "@/lib/i18n"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useI18n()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border 
                 hover:bg-muted/50 transition-colors text-sm font-medium text-foreground"
      aria-label={language === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "en" ? "中文" : "EN"}</span>
    </button>
  )
}
