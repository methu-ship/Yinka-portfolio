'use client'

import Link from './Link'
import { motion } from 'framer-motion'

export default function CardSeeAll() {
  return (
    <Link href="/projects" className="block h-full" aria-label="See all projects">
      <motion.div
        className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-transparent to-indigo-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center text-xl font-bold text-gray-900 transition duration-300 group-hover:text-pink-500 dark:text-white dark:group-hover:text-pink-400">
            See All Projects
            <svg
              className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
    </Link>
  )
}
