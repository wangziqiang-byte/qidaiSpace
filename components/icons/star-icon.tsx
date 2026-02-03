"use client"

export function StarIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <path d="M16 0L18.5 13.5L32 16L18.5 18.5L16 32L13.5 18.5L0 16L13.5 13.5L16 0Z" />
    </svg>
  )
}

export function StarIconOutline({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
    </svg>
  )
}

export function DoubleStarIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path d="M32 8L34 22L48 24L34 26L32 40L30 26L16 24L30 22L32 8Z" />
      <path d="M44 28L45.5 35.5L52 37L45.5 38.5L44 46L42.5 38.5L36 37L42.5 35.5L44 28Z" />
    </svg>
  )
}

export function DecorativeStars({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-64 h-48 ${className}`}>
      {/* Main large star shapes */}
      <svg viewBox="0 0 200 150" className="w-full h-full">
        {/* Small star top left */}
        <path
          d="M25 35L26 40L31 41L26 42L25 47L24 42L19 41L24 40L25 35Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/40"
        />
        
        {/* Small star top right */}
        <path
          d="M145 25L146.5 32L153 33.5L146.5 35L145 42L143.5 35L137 33.5L143.5 32L145 25Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/40"
        />
        
        {/* Large decorative shape 1 */}
        <path
          d="M70 30 Q100 50, 100 90 Q100 50, 130 30 Q100 50, 100 10 Q100 50, 70 30Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/70"
        />
        
        {/* Large decorative shape 2 - overlapping */}
        <path
          d="M60 60 Q90 80, 90 120 Q90 80, 120 60 Q90 80, 90 40 Q90 80, 60 60Z"
          fill="#f7f7f7"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/70"
        />
        
        {/* Large decorative shape 3 - bottom */}
        <path
          d="M100 70 Q130 90, 130 130 Q130 90, 160 70 Q130 90, 130 50 Q130 90, 100 70Z"
          fill="#f5f5f5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/70"
        />
      </svg>
    </div>
  )
}
