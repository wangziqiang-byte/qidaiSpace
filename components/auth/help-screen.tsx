"use client"

import { Mail, Phone, Clock, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/back-button"
import { StaticLogo } from "@/components/icons/animated-logo"
import { useI18n } from "@/lib/i18n"
import { useState } from "react"

interface HelpScreenProps {
  onBack?: () => void
}

export function HelpScreen({ onBack }: HelpScreenProps) {
  const { t } = useI18n()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <StaticLogo size="sm" className="text-foreground" />
      </div>

      {/* Content - Centered vertically */}
      <div className="flex-1 flex flex-col justify-center py-8">
        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-7 h-7 text-foreground" />
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">
            {t.help.title}
          </h1>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          {t.help.description}
        </p>

        {/* Contact Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t.help.contactUs}</h2>
          
          <div className="space-y-4">
            {/* Email */}
            <a 
              href={`mailto:${t.help.emailValue}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.help.email}</p>
                <p className="text-base font-medium text-foreground">{t.help.emailValue}</p>
              </div>
            </a>

            {/* Phone */}
            <a 
              href={`tel:${t.help.phoneValue.replace(/\s/g, "")}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.help.phone}</p>
                <p className="text-base font-medium text-foreground">{t.help.phoneValue}</p>
              </div>
            </a>

            {/* Working Hours */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.help.workingHours}</p>
                <p className="text-base font-medium text-foreground">{t.help.workingHoursValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t.help.faq}</h2>
          
          <div className="space-y-3">
            {t.help.faqItems.map((item, index) => (
              <div 
                key={index}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-base font-medium text-foreground pr-4">{item.q}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-auto">
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full h-14 rounded-xl text-base font-medium border-border bg-transparent"
          >
            {t.help.backButton}
          </Button>
        </div>
      </div>
    </div>
  )
}
