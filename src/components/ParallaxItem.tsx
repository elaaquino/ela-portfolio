import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'

type ParallaxItemProps = {
  children: React.ReactNode
  strength?: number
  floatDistance?: number
  floatDuration?: number
  floatDelay?: number
}

export default function ParallaxItem({
  children,
  strength = 15,
  floatDistance = 10,
  floatDuration = 6,
  floatDelay = 0,
}: ParallaxItemProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
    mass: 1,
  })

  const y = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
    mass: 1,
  })

  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX =
        (event.clientX / window.innerWidth - 0.5) * 2

      const normalizedY =
        (event.clientY / window.innerHeight - 0.5) * 2

      mouseX.set(normalizedX * strength)
      mouseY.set(normalizedY * strength)
    }

    const resetPosition = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    window.addEventListener('pointermove', handleMouseMove)
    document.addEventListener('mouseleave', resetPosition)

    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
      document.removeEventListener('mouseleave', resetPosition)
    }
  }, [mouseX, mouseY, strength, reducedMotion])

  return (
    <motion.div
      style={{
        x: x,
        y: y,
      }}
    >
            <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, -floatDistance, 0, floatDistance * 0.4, 0],
                x: [0, floatDistance * 0.3, 0],
                rotate: [0, 0.4, 0],
              }
        }
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
