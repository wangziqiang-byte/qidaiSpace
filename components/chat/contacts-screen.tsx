"use client"

import { useState, useCallback, useMemo, type TouchEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { 
  mockContacts, 
  getContactsByLetter, 
  getAlphabetIndex,
  type Contact 
} from "@/lib/contacts-data"
import { StaticLogo } from "@/components/icons/animated-logo"
import { useI18n } from "@/lib/i18n"

function ContactAvatar({ 
  contact, 
  size = "md",
  showStatus = true 
}: { 
  contact: Contact
  size?: "sm" | "md" | "lg"
  showStatus?: boolean
}) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  }

  const statusColors = {
    online: "ring-emerald-400",
    away: "ring-amber-400",
    offline: "ring-transparent",
  }

  const getInitials = (name: string) => {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-rose-100 text-rose-600",
      "bg-blue-100 text-blue-600",
      "bg-emerald-100 text-emerald-600",
      "bg-amber-100 text-amber-600",
      "bg-violet-100 text-violet-600",
      "bg-cyan-100 text-cyan-600",
    ]
    return colors[name.charCodeAt(0) % colors.length]
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center font-semibold
        ${getAvatarColor(contact.name)}
        ${showStatus ? `ring-2 ${statusColors[contact.status]}` : ""}
      `}
    >
      {getInitials(contact.name)}
    </div>
  )
}

function ContactListItem({ 
  contact, 
  onTap 
}: { 
  contact: Contact
  onTap?: () => void 
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onClick={onTap}
      className="flex items-center gap-4 py-3 active:bg-muted/50 cursor-pointer rounded-xl transition-colors"
    >
      <ContactAvatar contact={contact} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{contact.name}</p>
        {contact.bio && (
          <p className="text-sm text-muted-foreground truncate">{contact.bio}</p>
        )}
      </div>
    </motion.div>
  )
}

function AlphabetIndex({ 
  letters, 
  activeLetter,
  onLetterChange 
}: { 
  letters: string[]
  activeLetter: string | null
  onLetterChange: (letter: string | null) => void
}) {
  const [bubbleY, setBubbleY] = useState<number | null>(null)

  const updateFromTouch = useCallback((touch: React.Touch) => {
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const letter = element?.getAttribute("data-letter")
    if (letter && letter !== activeLetter) {
      onLetterChange(letter)
      if (navigator.vibrate) {
        navigator.vibrate(8)
      }
    }
    const minY = 72
    const maxY = window.innerHeight - 72
    const clampedY = Math.min(Math.max(touch.clientY, minY), maxY)
    setBubbleY(clampedY)
  }, [activeLetter, onLetterChange])

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    updateFromTouch(touch)
  }, [updateFromTouch])

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    updateFromTouch(touch)
  }, [updateFromTouch])

  const handleTouchEnd = useCallback(() => {
    onLetterChange(null)
    setBubbleY(null)
  }, [onLetterChange])

  return (
    <>
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 w-[30px] h-[70%] touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1">
          {letters.map((letter) => (
            <div
              key={letter}
              data-letter={letter}
              className="text-[9px] text-muted-foreground/40 py-0.5 px-1"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeLetter && bubbleY !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 1, x: 12 }}
            animate={{ opacity: 1, scale: 1.5, x: -8 }}
            exit={{ opacity: 0, scale: 1, x: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="fixed z-[60] pointer-events-none right-10 -translate-y-1/2"
            style={{ top: bubbleY }}
          >
            <div className="w-12 h-12 rounded-2xl backdrop-blur-2xl bg-foreground/10 shadow-2xl shadow-black/50 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground/90">{activeLetter}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function ContactsScreen({ 
  onHelp 
}: { 
  onHelp?: () => void 
}) {
  const { t } = useI18n()
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const contactsByLetter = useMemo(() => getContactsByLetter(mockContacts), [])
  const alphabetIndex = useMemo(() => getAlphabetIndex(mockContacts), [])

  const handleLetterChange = useCallback((letter: string | null) => {
    setActiveLetter(letter)
    if (letter) {
      const section = document.getElementById(`contact-section-${letter}`)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [])

  const handleContactTap = useCallback((contact: Contact) => {
    console.log("[v0] Contact tapped:", contact.name)
  }, [])

  return (
    <div className="relative flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header - Consistent with auth pages */}
      <div className="absolute top-0 left-0 right-0 z-40 px-6 py-4 bg-gradient-to-b from-background via-background to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-foreground tracking-tight">
            {t.contacts?.title || "Contacts"}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={onHelp}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label={t.common?.help || "Help"}
            >
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </button>
            <StaticLogo size="sm" className="text-foreground" />
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto pt-20 pb-32 px-6"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 80px, black calc(100% - 220px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 80px, black calc(100% - 220px), transparent 100%)",
        }}
      >
        {Object.entries(contactsByLetter).map(([letter, contacts]) => (
          <div key={letter} id={`contact-section-${letter}`}>
            <div className="sticky top-0 z-10 py-2 bg-background/80 backdrop-blur-sm">
              <span className="text-sm font-semibold text-muted-foreground">{letter}</span>
            </div>
            {contacts.map((contact) => (
              <ContactListItem key={contact.id} contact={contact} onTap={() => handleContactTap(contact)} />
            ))}
          </div>
        ))}
      </div>

      <AlphabetIndex 
        letters={alphabetIndex} 
        activeLetter={activeLetter}
        onLetterChange={handleLetterChange}
      />

    </div>
  )
}
