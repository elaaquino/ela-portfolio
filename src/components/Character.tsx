import { useEffect, useRef, useState } from 'react'
import './Character.css'

export type CharacterExpression =
  | 'neutral'
  | 'joy'
  | 'wink'
  | 'shy'
  | 'happy'
  | 'angry'

type CharacterProps = {
  expression: CharacterExpression
}

export const pageExpressions = {
  'about me': 'joy',
  'projects': 'wink',
  'experience': 'happy',
  'contact me': 'shy',
} as const satisfies Record<string, CharacterExpression>

export default function Character({ expression }: CharacterProps) {
  const characterRef = useRef<HTMLDivElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })

    const targetOffset = useRef({ x: 0, y: 0 })
    const currentOffset = useRef({ x: 0, y: 0 })

    useEffect(() => {
    if (expression !== 'neutral') {
        targetOffset.current = { x: 0, y: 0 }
        currentOffset.current = { x: 0, y: 0 }
        setPupilOffset({ x: 0, y: 0 })
        return
    }

    let animationFrame: number
    let lastTime = 0

    const handleMouseMove = (event: MouseEvent) => {
        const character = characterRef.current
        if (!character) return

        const rect = character.getBoundingClientRect()

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dx = event.clientX - centerX
        const dy = event.clientY - centerY

        const angle = Math.atan2(dy, dx)
        const distance = Math.min(Math.hypot(dx, dy) / 150, 1)

        const maxMovement = 7

        targetOffset.current = {
        x: Math.cos(angle) * maxMovement * distance,
        y: Math.sin(angle) * maxMovement * distance,
        }
    }

    const animate = (time: number) => {
        const delta = lastTime ? Math.min(time - lastTime, 50) : 16
        lastTime = time

        // Smaller = slower, more delayed movement
        const smoothing = 1 - Math.exp(-delta / 110)

        const current = currentOffset.current
        const target = targetOffset.current

        const nextX = current.x + (target.x - current.x) * smoothing
        const nextY = current.y + (target.y - current.y) * smoothing

        currentOffset.current = { x: nextX, y: nextY }

        setPupilOffset({ x: nextX, y: nextY })

        animationFrame = requestAnimationFrame(animate)
    }

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
        window.addEventListener('mousemove', handleMouseMove)
        animationFrame = requestAnimationFrame(animate)
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        cancelAnimationFrame(animationFrame)
    }
    }, [expression])

  return (
    <div
      ref={characterRef}
      className="character"
      role="img"
      aria-label="Illustrated character with interactive expressions"
    >
      <img
        className="character-layer"
        src="/character/base.png"
        alt=""
      />

      <img
        className="character-layer"
        src={`/character/features-${expression}.png`}
        alt=""
      />

      {expression === 'neutral' && (
        <>
          <img
            className="character-layer character-pupil"
            src="/character/pupil-left.png"
            alt=""
            style={{
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            }}
          />

          <img
            className="character-layer character-pupil"
            src="/character/pupil-right.png"
            alt=""
            style={{
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            }}
          />
        </>
      )}
    </div>
  )
}
