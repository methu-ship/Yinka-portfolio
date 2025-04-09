import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [blur, setBlur] = useState(true)

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setBlur(true)
  }, [src])

  const generateBlurDataURL = () => {
    return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${
      width || 400
    } ${height || 300}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='${src}'/%3E%3C/svg%3E`
  }

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ willChange: 'opacity' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ willChange: 'transform, filter' }}
        className={`object-cover transition-all duration-700 ease-in-out ${blur ? 'scale-110 blur-xl' : 'scale-100 blur-0'}`}
        onLoad={() => {
          setTimeout(() => setIsLoading(false), 100)
          setTimeout(() => setBlur(false), 50)
        }}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-100/10 backdrop-blur-sm dark:bg-gray-800/10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'opacity' }}
          >
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-pink-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProgressiveImage
