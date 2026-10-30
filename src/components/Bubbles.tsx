import { useState } from 'react'
import './Bubbles.css'

type Bubble = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
}

export default function Bubbles() {
  const [bubbles] = useState<Bubble[]>(() =>
    Array.from({ length: 28 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      size: 5 + Math.random() * 24,
      duration: 12 + Math.random() * 15,
      delay: -Math.random() * 27,
      drift: -35 + Math.random() * 70,
      opacity: 0.15 + Math.random() * 0.3,
    }))
  )

  return (
    <div className="bubbles-container" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="bubble"
          style={
            {
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              '--drift': `${bubble.drift}px`,
              '--bubble-opacity': bubble.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}