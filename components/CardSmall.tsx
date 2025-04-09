'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from './Link'
import ProgressiveImage from './ProgressiveImage'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

export default function CardSmall({ title, description, imgSrc, href }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-transparent to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      {/* Image container */}
      {imgSrc && (
        <div className="relative h-48 w-full overflow-hidden">
          <ProgressiveImage
            src={imgSrc}
            alt={title}
            className="transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content container */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-4 flex-grow text-sm text-gray-600 dark:text-gray-400">{description}</p>

        <div className="group/link mt-2 inline-flex items-center text-sm font-semibold text-gray-900 transition duration-300 hover:text-pink-500 dark:text-white dark:hover:text-pink-400">
          Learn more
          <svg
            className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover/link:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* Border gradient effect */}
      <div className="absolute inset-0 rounded-xl p-[1px]">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  )

  return href ? (
    <Link href={href} className="block h-full" aria-label={`View project: ${title}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}
