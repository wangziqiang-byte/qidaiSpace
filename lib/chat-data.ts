// Chat data types and mock data

export interface ChatItem {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline?: boolean
  isGroup?: boolean
  groupMemberCount?: number
  lastSender?: string // For group chats
}

// Helper to create relative time
function minutesAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60 * 1000)
}

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000)
}

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

// Mock chat data - sorted from oldest to newest (will display bottom-up)
export const mockChats: ChatItem[] = [
  {
    id: "12",
    name: "College Roommates",
    lastMessage: "Who's coming to the reunion?",
    lastMessageTime: daysAgo(14),
    unreadCount: 0,
    isGroup: true,
    groupMemberCount: 6,
    lastSender: "Mike",
    isOnline: false,
  },
  {
    id: "11",
    name: "Grandma",
    lastMessage: "Thank you for the gift, dear!",
    lastMessageTime: daysAgo(10),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "10",
    name: "Gym Buddy",
    lastMessage: "Skip today, feeling sore",
    lastMessageTime: daysAgo(7),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "9",
    name: "Sarah",
    lastMessage: "That movie was amazing!",
    lastMessageTime: daysAgo(5),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "8",
    name: "Mom",
    lastMessage: "Remember to eat well!",
    lastMessageTime: daysAgo(3),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "7",
    name: "Work Updates",
    lastMessage: "Meeting rescheduled to 3pm",
    lastMessageTime: daysAgo(2),
    unreadCount: 0,
    isGroup: true,
    groupMemberCount: 28,
    lastSender: "HR",
  },
  {
    id: "6",
    name: "David",
    lastMessage: "Thanks for the recommendation!",
    lastMessageTime: daysAgo(1),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "5",
    name: "Lisa",
    lastMessage: "See you tomorrow then",
    lastMessageTime: hoursAgo(8),
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "4",
    name: "Boss",
    lastMessage: "Got it, see you at the meeting tomorrow.",
    lastMessageTime: hoursAgo(3),
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: "3",
    name: "Product Team",
    lastMessage: "What do you want for dinner?",
    lastMessageTime: minutesAgo(45),
    unreadCount: 8,
    isGroup: true,
    groupMemberCount: 12,
    lastSender: "Cherish",
  },
  {
    id: "2",
    name: "Cherish",
    lastMessage: "Brought you dessert, open the door!",
    lastMessageTime: minutesAgo(1),
    unreadCount: 3,
    isOnline: true,
  },
]

// Older chats that can be loaded on pull-down
export const olderChats: ChatItem[] = [
  {
    id: "older-1",
    name: "High School Group",
    lastMessage: "Happy anniversary everyone!",
    lastMessageTime: daysAgo(30),
    unreadCount: 0,
    isGroup: true,
    groupMemberCount: 45,
    lastSender: "Tom",
    isOnline: false,
  },
  {
    id: "older-2",
    name: "Uncle Bob",
    lastMessage: "See you at Christmas!",
    lastMessageTime: daysAgo(25),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "older-3",
    name: "Dentist Appointment",
    lastMessage: "Your appointment is confirmed for next month",
    lastMessageTime: daysAgo(21),
    unreadCount: 0,
    isOnline: false,
  },
]

// New incoming message mock (will appear after 1 second)
export const newIncomingChat: ChatItem = {
  id: "new-1",
  name: "Alex",
  lastMessage: "Hey! Are you free this weekend? Let's grab coffee!",
  lastMessageTime: new Date(),
  unreadCount: 1,
  isOnline: true,
}

// Format time for display
export function formatChatTime(date: Date, locale: string = 'en'): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) {
    return locale === 'zh' ? '刚刚' : 'Just now'
  }
  if (diffMins < 60) {
    return locale === 'zh' ? `${diffMins}分钟前` : `${diffMins}m`
  }
  if (diffHours < 24) {
    return date.toLocaleTimeString(locale === 'zh' ? 'zh-CN' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  if (diffDays === 1) {
    return locale === 'zh' ? '昨天' : 'Yesterday'
  }
  if (diffDays < 7) {
    const days = locale === 'zh' 
      ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[date.getDay()]
  }
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}
