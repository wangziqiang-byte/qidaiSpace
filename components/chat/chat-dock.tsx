"use client"

import { MessageCircle, User, Settings } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { forwardRef } from "react"

type Tab = "contacts" | "chat" | "settings"

interface ChatDockProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export const ChatDock = forwardRef<HTMLDivElement, ChatDockProps>(
  function ChatDock({ activeTab, onTabChange }, ref) {
    const { t } = useI18n()

    const tabs: { id: Tab; icon: typeof MessageCircle; label: string }[] = [
      { id: "contacts", icon: User, label: t.chat?.dock?.contacts || "Contacts" },
      { id: "chat", icon: MessageCircle, label: t.chat?.dock?.chat || "Chat" },
      { id: "settings", icon: Settings, label: t.chat?.dock?.settings || "Settings" },
    ]

    return (
      <div ref={ref} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="
          flex items-center gap-12 px-12 py-4
          backdrop-blur-2xl 
          bg-white/30
          border border-white/40 
          rounded-full 
          shadow-xl shadow-black/10
        ">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center gap-1.5 px-3 py-2 rounded-full
                  transition-all duration-200
                  active:scale-90
                  ${isActive 
                    ? 'text-foreground' 
                    : 'text-foreground/40 hover:text-foreground/60'
                  }
                `}
              >
                <Icon 
                  className={`
                    w-6 h-6 transition-all duration-200
                    ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}
                  `} 
                />
                <span className="text-[10px] font-medium">
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)
