"use client"

export interface Contact {
  id: string
  name: string
  avatar?: string
  bio?: string
  status: "online" | "away" | "offline"
  isFavorite?: boolean
}

// Mock contacts data sorted alphabetically
export const mockContacts: Contact[] = [
  { id: "1", name: "Alex Chen", bio: "Always exploring new places", status: "online", isFavorite: true },
  { id: "2", name: "Alice Wang", bio: "Designer at heart", status: "away" },
  { id: "3", name: "Bob Zhang", bio: "Coffee enthusiast", status: "offline" },
  { id: "4", name: "Cherish Liu", bio: "Living my best life", status: "online", isFavorite: true },
  { id: "5", name: "Chris Lee", bio: "Music producer | Night owl", status: "online" },
  { id: "6", name: "David Wu", bio: "Tech geek", status: "offline" },
  { id: "7", name: "Diana Xu", bio: "Bookworm", status: "away" },
  { id: "8", name: "Emma Zhou", bio: "Fitness lover", status: "online", isFavorite: true },
  { id: "9", name: "Frank Huang", bio: "Photographer", status: "offline" },
  { id: "10", name: "Grace Lin", bio: "Foodie | Travel addict", status: "online" },
  { id: "11", name: "Henry Zhao", bio: "Gaming is life", status: "away" },
  { id: "12", name: "Ivy Chen", bio: "Art student", status: "offline" },
  { id: "13", name: "Jack Liu", bio: "Startup founder", status: "online" },
  { id: "14", name: "Karen Wang", bio: "Yoga instructor", status: "away" },
  { id: "15", name: "Leo Zhang", bio: "Minimalist", status: "offline" },
  { id: "16", name: "Lisa Xu", bio: "Movie buff", status: "online" },
  { id: "17", name: "Mike Chen", bio: "Sports fan", status: "offline" },
  { id: "18", name: "Nancy Wu", bio: "Plant mom", status: "away" },
  { id: "19", name: "Oliver Li", bio: "Runner | Early bird", status: "online" },
  { id: "20", name: "Penny Zhou", bio: "Cat lover", status: "offline" },
  { id: "21", name: "Quinn Huang", bio: "DJ on weekends", status: "away" },
  { id: "22", name: "Rachel Lin", bio: "Blogger", status: "online" },
  { id: "23", name: "Sam Zhao", bio: "Chef at home", status: "offline" },
  { id: "24", name: "Tina Wang", bio: "Fashion enthusiast", status: "online" },
  { id: "25", name: "Victor Chen", bio: "Investor", status: "away" },
  { id: "26", name: "Wendy Liu", bio: "Dog person", status: "offline" },
  { id: "27", name: "Xavier Zhang", bio: "Architect", status: "online" },
  { id: "28", name: "Yolanda Xu", bio: "Dancer", status: "away" },
  { id: "29", name: "Zack Wu", bio: "Gamer | Streamer", status: "online" },
]

// Get contacts grouped by first letter
export function getContactsByLetter(contacts: Contact[]): Record<string, Contact[]> {
  return contacts.reduce((acc, contact) => {
    const letter = contact.name[0].toUpperCase()
    if (!acc[letter]) {
      acc[letter] = []
    }
    acc[letter].push(contact)
    return acc
  }, {} as Record<string, Contact[]>)
}

// Get favorite contacts
export function getFavoriteContacts(contacts: Contact[]): Contact[] {
  return contacts.filter(c => c.isFavorite)
}

// Get all unique first letters
export function getAlphabetIndex(contacts: Contact[]): string[] {
  const letters = new Set(contacts.map(c => c.name[0].toUpperCase()))
  return Array.from(letters).sort()
}
