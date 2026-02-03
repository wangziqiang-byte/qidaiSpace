"use client"

import { useState, ReactNode } from "react"
import { I18nContext, Language, translations } from "@/lib/i18n"

interface I18nProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function I18nProvider({ children, defaultLanguage = "zh" }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
