"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ChatCard } from "./chat-card"
import { ChatDock } from "./chat-dock"
import { mockChats, newIncomingChat, olderChats, type ChatItem } from "@/lib/chat-data"
import { useI18n } from "@/lib/i18n"

export function ChatListScreen() {
  const { t } = useI18n()
  const [chats, setChats] = useState<ChatItem[]>(mockChats)
  const [activeTab, setActiveTab] = useState<"contacts" | "chat" | "settings">("chat")
  const [newChatId, setNewChatId] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showPullHint, setShowPullHint] = useState(true)
  const [olderChatsIndex, setOlderChatsIndex] = useState(0)
  const [showNewMessageBubble, setShowNewMessageBubble] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(true)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  // Simulate new message arriving after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setChats(prev => [...prev, { ...newIncomingChat, lastMessageTime: new Date() }])
      setNewChatId(newIncomingChat.id)
      
      // Show new message bubble if user is not at bottom
      if (!isNearBottom) {
        setShowNewMessageBubble(true)
      } else {
        // Auto-scroll to bottom if already near bottom
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
          })
        }, 100)
      }
      
      setTimeout(() => setNewChatId(null), 1000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isNearBottom])

  // Handle scroll - only for functional state updates, no visual calculations
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    
    // Show/hide pull hint (only at very top)
    setShowPullHint(scrollTop < 30)
    
    // Check if near bottom (within 200px)
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    setIsNearBottom(distanceFromBottom < 200)
  }, [])

  // Pull to load older messages
  const handlePullRefresh = useCallback(() => {
    if (isRefreshing || olderChatsIndex >= olderChats.length) return
    if (!scrollRef.current || scrollRef.current.scrollTop > 10) return
    
    setIsRefreshing(true)
    
    // Save current scroll height
    const previousScrollHeight = scrollRef.current.scrollHeight
    
    setTimeout(() => {
      const nextOlderChat = olderChats[olderChatsIndex]
      if (nextOlderChat) {
        setChats(prev => [nextOlderChat, ...prev])
        setOlderChatsIndex(prev => prev + 1)
        
        // Maintain scroll position after adding items at top
        setTimeout(() => {
          if (scrollRef.current) {
            const newScrollHeight = scrollRef.current.scrollHeight
            const scrollDiff = newScrollHeight - previousScrollHeight
            scrollRef.current.scrollTop = scrollDiff
          }
        }, 50)
      }
      setIsRefreshing(false)
    }, 800)
  }, [isRefreshing, olderChatsIndex])

  // Calculate base opacity based on position in list (older = slightly more faded)
  const getCardBaseStyle = (index: number, total: number) => {
    const position = index / Math.max(total - 1, 1)
    const baseOpacity = 0.6 + (position * 0.4) // 60% to 100%
    const baseScale = 0.98 + (position * 0.02) // 98% to 100%
    return { baseOpacity, baseScale }
  }

  // Scroll to bottom when clicking new message bubble
  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
    setShowNewMessageBubble(false)
  }

  return (
    <div className="relative flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Floating History Indicator - Absolute positioned above fading messages */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div 
          className="pt-5 pb-3 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 60%, transparent 100%)',
          }}
        >
          {/* Pull down hint with bouncing arrow */}
          <AnimatePresence>
            {showPullHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <ChevronUp className="w-4 h-4 text-muted-foreground/40" />
                  <span className="text-xs text-muted-foreground/40 font-light tracking-wide">
                    {t.chat?.pullDown || "Pull down for more"}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading spinner */}
          <AnimatePresence>
            {isRefreshing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-2"
              >
                <div className="w-5 h-5 border-2 border-muted-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat List Zone - Pure CSS masking for edge fading, 80% visible area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{
          // Fast top fade (50px), moderate bottom fade (100px) = ~80% visible
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 100px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50px, black calc(100% - 100px), transparent 100%)',
          paddingTop: '3.5rem',
          paddingBottom: '8rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {/* Pull down trigger area */}
        <div 
          className="h-8 flex items-center justify-center mb-2 pointer-events-auto"
          onTouchEnd={() => {
            if (scrollRef.current && scrollRef.current.scrollTop <= 10) {
              handlePullRefresh()
            }
          }}
          onClick={handlePullRefresh}
        />

        {/* Chat cards with AnimatePresence for layout animations */}
        <motion.div layout className="space-y-2">
          <AnimatePresence initial={false}>
            {chats.map((chat, index) => {
              const { baseOpacity, baseScale } = getCardBaseStyle(index, chats.length)
              const isNewest = index === chats.length - 1
              const isNew = chat.id === newChatId
              
              return (
                <ChatCard
                  key={chat.id}
                  chat={chat}
                  isNewest={isNewest}
                  fadeOpacity={baseOpacity}
                  scale={baseScale}
                  isNew={isNew}
                  onClick={() => {
                    console.log("[v0] Open chat:", chat.name)
                  }}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* New Message Floating Bubble */}
      <AnimatePresence>
        {showNewMessageBubble && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToBottom}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40
              px-4 py-2 rounded-full
              bg-primary text-primary-foreground
              shadow-lg shadow-primary/30
              flex items-center gap-2
              text-sm font-medium
              hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronDown className="w-4 h-4" />
            New message
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Dock */}
      <ChatDock 
        ref={dockRef}
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  )
}
