"use client"

import { useMemo } from "react"

function createSquirclePath(cx: number, cy: number, width: number, height: number, n = 4) {
  const points: string[] = []
  const a = width / 2
  const b = height / 2
  const steps = 120

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI
    const cosT = Math.cos(t)
    const sinT = Math.sin(t)

    const x = cx + Math.pow(Math.abs(cosT), 2 / n) * a * Math.sign(cosT)
    const y = cy + Math.pow(Math.abs(sinT), 2 / n) * b * Math.sign(sinT)

    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)
  }

  points.push("Z")
  return points.join(" ")
}

interface AnimatedLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function AnimatedLogo({ className = "", size = "md" }: AnimatedLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 64,
    lg: 100,
    xl: 200,
  }
  
  const dimension = sizeMap[size]
  const pathData = useMemo(() => createSquirclePath(0, 0, 130, 130), [])

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      role="img"
      className={className}
    >
      <defs>
        <filter id="halo" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.3 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#halo)">
        {/* Bottom Left Shape */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="172.5 227.5; 227.5 172.5; 172.5 227.5"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            keyTimes="0; 0.5; 1"
          />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 0.85; 1"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            keyTimes="0; 0.5; 1"
            additive="sum"
          />
          <path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>

        {/* Top Right Shape */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="227.5 172.5; 172.5 227.5; 227.5 172.5"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            keyTimes="0; 0.5; 1"
          />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 1.15; 1"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            keyTimes="0; 0.5; 1"
            additive="sum"
          />
          <path d={pathData} fill="currentColor" />
        </g>
      </g>
    </svg>
  )
}

// Static version for header icons (no animation)
export function StaticLogo({ className = "", size = "sm" }: AnimatedLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 64,
    lg: 100,
    xl: 200,
  }
  
  const dimension = sizeMap[size]
  const pathData = useMemo(() => createSquirclePath(0, 0, 130, 130), [])

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      role="img"
      className={className}
    >
      {/* Bottom Left Shape - Outline */}
      <g transform="translate(172.5, 227.5)">
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinejoin="round"
        />
      </g>

      {/* Top Right Shape - Filled */}
      <g transform="translate(227.5, 172.5)">
        <path d={pathData} fill="currentColor" />
      </g>
    </svg>
  )
}

// Success icon - one filled, one outline for consistency
export function SuccessLogo({ className = "", size = "lg" }: AnimatedLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 64,
    lg: 100,
    xl: 200,
  }
  
  const dimension = sizeMap[size]
  const pathData = useMemo(() => createSquirclePath(0, 0, 110, 110), [])

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Success"
      role="img"
      className={className}
    >
      {/* Bottom Left Shape - Outline (white/transparent) */}
      <g transform="translate(165, 235)">
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </g>

      {/* Top Right Shape - Filled (solid) */}
      <g transform="translate(235, 165)">
        <path d={pathData} fill="currentColor" />
      </g>
    </svg>
  )
}
