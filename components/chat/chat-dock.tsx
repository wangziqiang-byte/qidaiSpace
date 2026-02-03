"use client"

import { MessageCircle, User, Settings, Search } from "lucide-react"
import { forwardRef } from "react"
import { motion } from "framer-motion"

type Tab = "contacts" | "chat" | "settings"

interface ChatDockProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export const ChatDock = forwardRef<HTMLDivElement, ChatDockProps>(
  function ChatDock({ activeTab, onTabChange }, ref) {
    const isContacts = activeTab === "contacts"
    const tabs: { id: Tab; icon: typeof MessageCircle; isCenter: boolean }[] = [
      { id: "contacts", icon: User, isCenter: false },
      { id: "chat", icon: MessageCircle, isCenter: true },
      { id: "settings", icon: Settings, isCenter: false },
    ]

    return (
      <div ref={ref} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="
            relative flex items-center h-14
            transition-[width] duration-200 ease-out
            backdrop-blur-2xl 
            bg-white/30
            border border-white/40 
            rounded-full 
            shadow-xl shadow-black/10
            overflow-hidden
          "
          style={{ width: isContacts ? 216 : 172 }}
        >
          <div
            className={`absolute left-0 -translate-x-full transition-all duration-200 ease-out ${
              isContacts ? "opacity-100 scale-100 -translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-white/40 border border-white/50 backdrop-blur-xl flex items-center justify-center text-foreground/60 shadow-md">
              <Search className="w-5 h-5" />
            </div>
          </div>

          {isContacts && (
            <button
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full text-foreground/50 hover:text-foreground/70 transition-all duration-200 ease-out"
              type="button"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-0 px-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon

              return (
                <motion.button
                  key={tab.id}
                  layout
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex items-center justify-center px-4 py-2 rounded-full
                    transition-colors duration-200
                    active:scale-90
                    ${isActive 
                      ? 'text-foreground' 
                      : 'text-foreground/40 hover:text-foreground/60'
                    }
                  `}
                >
                  <Icon 
                    className={`
                      transition-all duration-200
                      w-5 h-5
                      ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}
                    `} 
                  />
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>
    )
  }
)
