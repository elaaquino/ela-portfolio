import { useEffect, useRef } from 'react'
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from 'motion/react'

export type ImpactType = 'click' | 'type' | 'error' | 'complete'

type HomeImpactProps = {
  children: React.ReactNode
  impact: {
    id: number
    type: ImpactType
  } | null
}

export default function HomeImpact({
  children,
  impact,
}: HomeImpactProps) {
  const controls = useAnimationControls()
  const reducedMotion = useReducedMotion()
  const controlsRef = useRef(controls)
  controlsRef.current = controls

  useEffect(() => {
    if (!impact || reducedMotion) return

    const animations = {
      click: {
        y: [0, 7, -3, 0],
        scale: [1, 0.992, 1.004, 1],
        duration: 0.35,
      },
      type: {
        y: [0, 2, 0],
        scale: [1, 0.998, 1],
        duration: 0.16,
      },
        error: {
        x: [0, -3, 0],
        y: [0, 0, 0],
        duration: 0.12,
        },
      complete: {
        y: [0, -8, 2, 0],
        scale: [1, 1.025, 0.995, 1],
        duration: 0.4,
      },
    }

    const selected = animations[impact.type]

    controlsRef.current.stop()
    controlsRef.current.set({
      x: 0,
      y: 0,
      scale: 1,
    })

    void controlsRef.current.start({
      x: 'x' in selected ? selected.x : 0,
      y: selected.y,
      scale: 'scale' in selected ? selected.scale : 1,
      transition: {
        duration: selected.duration,
        ease: 'easeOut',
      },
    })
  }, [impact, reducedMotion])

  return (
    <motion.div
      className="home-impact"
      initial={false}
      animate={controls}
    >
      {children}
    </motion.div>
  )
}
