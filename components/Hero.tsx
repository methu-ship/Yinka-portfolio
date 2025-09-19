'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const ParticleField = () => {
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; duration: number }>
  >([])

  useEffect(() => {
    const newParticles = Array(50)
      .fill(null)
      .map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 2,
      }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <div className="relative h-full w-full bg-gradient-to-br from-indigo-50 via-white to-pink-50 opacity-70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-indigo-500 opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface GeometricShapeProps {
  initialTop: string
  initialLeft: string
  size: string
  gradient: string
  opacity?: string
  sensitivity?: number
  mouseX: number
  mouseY: number
}

const GeometricShape = ({
  initialTop,
  initialLeft,
  size,
  gradient,
  opacity = 'opacity-30',
  sensitivity = 25,
  mouseX,
  mouseY,
}: GeometricShapeProps) => {
  const rotateX = mouseY / sensitivity
  const rotateY = -mouseX / sensitivity

  return (
    <motion.div
      className={`absolute ${size} ${opacity}`}
      style={{ top: initialTop, left: initialLeft, willChange: 'transform' }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="relative h-full w-full">
        <div
          className={`absolute inset-0 transform-gpu rounded-lg bg-gradient-to-br ${gradient}`}
        />
        <div
          className={`absolute inset-0 transform-gpu rounded-lg bg-gradient-to-br ${gradient} blur-xl`}
        />
      </div>
    </motion.div>
  )
}

const TypewriterText = ({ text, delay = 3 }: { text: string; delay?: number }) => {
  const controls = useAnimation()
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }
    }, delay * 50)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, delay])

  return <span>{displayText}</span>
}

const ModernHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)
      setMousePosition({ x, y })
    }

    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[80vh] overflow-hidden bg-white dark:bg-gray-900"
      style={{ perspective: '1000px' }}
    >
      <ParticleField />

      <GeometricShape
        initialTop="60%"
        initialLeft="75%"
        size="h-64 w-64"
        gradient="from-pink-500 to-indigo-500"
        opacity="opacity-30"
        sensitivity={25}
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
      />

      <GeometricShape
        initialTop="60%"
        initialLeft="15%"
        size="h-48 w-48"
        gradient="from-green-400 to-blue-500"
        opacity="opacity-25"
        sensitivity={40}
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
      />

      <GeometricShape
        initialTop="10%"
        initialLeft="40%"
        size="h-80 w-80"
        gradient="from-yellow-400 to-orange-500"
        opacity="opacity-20"
        sensitivity={15}
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
      />

      <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            >
              Hi, I'm{' '}
              <motion.span
                className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent inline-block"
                animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: 0.2 }}
              >
                <TypewriterText text="Yinka Habeeb" />
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-xl text-gray-600 dark:text-gray-300 md:text-2xl"
          >
            <TypewriterText text="Blockchain Engineer | Technical Writer" delay={2} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/about"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-indigo-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white dark:text-white"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Learn More About Me
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default ModernHero
