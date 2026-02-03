"use client"

import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { type ChatItem, formatChatTime } from "@/lib/chat-data"
import { useI18n } from "@/lib/i18n"

interface ChatCardProps {
  chat: ChatItem
  isNewest?: boolean
  fadeOpacity?: number
  scale?: number
  isNew?: boolean
  onClick?: () => void
}

const ChatCardComponent = ({ 
  chat, 
  isNewest = false, 
  fadeOpacity = 1, 
  scale = 1,
  isNew = false,
  onClick 
}: ChatCardProps) => {
  const { language } = useI18n()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate a consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-rose-100 text-rose-600',
      'bg-blue-100 text-blue-600',
      'bg-emerald-100 text-emerald-600',
      'bg-amber-100 text-amber-600',
      'bg-violet-100 text-violet-600',
      'bg-cyan-100 text-cyan-600',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <motion.div
      layout
      layoutId={chat.id}
      initial={isNew ? { opacity: 0, y: 20, scale: 0.98 } : false}
      animate={{ 
        opacity: fadeOpacity, 
        y: 0, 
        scale: scale 
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: { duration: 0.2 }
      }}
      data-chat-id={chat.id}
      onClick={onClick}
      className={`
        relative px-4 py-4 rounded-2xl transition-colors duration-200 cursor-pointer
        ${isNewest 
          ? 'bg-background border border-border/50 shadow-sm' 
          : 'bg-transparent hover:bg-muted/30'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm
            ${getAvatarColor(chat.name)}
            ${chat.unreadCount > 0 ? 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background' : ''}
          `}>
            {getInitials(chat.name)}
          </div>
          {/* Online indicator */}
          {chat.isOnline && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            {/* Name */}
            <h3 className="font-medium text-foreground truncate">
              {chat.name}
              {chat.isGroup && (
                <span className="text-xs text-muted-foreground ml-1">
                  ({chat.groupMemberCount})
                </span>
              )}
            </h3>
            {/* Time */}
            <span className="text-xs text-muted-foreground/60 flex-shrink-0 ml-2">
              {isMounted ? formatChatTime(chat.lastMessageTime, language) : ""}
            </span>
          </div>
          
          {/* Last message */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate pr-2">
              {chat.isGroup && chat.lastSender && (
                <span className="text-foreground/70">[{chat.lastSender}]: </span>
              )}
              {chat.lastMessage}
            </p>
            {/* Unread badge with number */}
            {chat.unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-shrink-0 min-w-[20px] h-5 px-2 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center shadow-sm"
              >
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* New message glow effect */}
      {isNew && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-2xl bg-primary/10 pointer-events-none" 
        />
      )}
    </motion.div>
  )
}

// Memoize to prevent unnecessary re-renders
export const ChatCard = memo(ChatCardComponent, (prev, next) => {
  return (
    prev.chat.id === next.chat.id &&
    prev.chat.lastMessage === next.chat.lastMessage &&
    prev.chat.unreadCount === next.chat.unreadCount &&
    prev.isNewest === next.isNewest &&
    prev.fadeOpacity === next.fadeOpacity &&
    prev.scale === next.scale &&
    prev.isNew === next.isNew
  )
})

ChatCard.displayName = "ChatCard"
