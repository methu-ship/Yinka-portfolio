'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TocLink {
  title: string
  id: string
  level: 1 | 2
}

interface FloatingTOCProps {
  links: TocLink[]
}

const FloatingTOC = ({ links }: FloatingTOCProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntry = entries.reverse().find((entry) => entry.isIntersecting)
      if (intersectingEntry) {
        setActiveId(intersectingEntry.target.id)
      }
    }

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-100px 0px -85% 0px',
      threshold: 0,
    })

    const elements = links.map(({ id }) => document.getElementById(id)).filter(Boolean)
    elements.forEach((el) => observer.current?.observe(el!))

    return () => observer.current?.disconnect()
  }, [links])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      })
      setActiveId(id)
    }
  }

  if (links.length === 0) {
    return null
  }

  return (
    <>
      {/* Minimal Progress Bar - Much cleaner */}
      <motion.div
        className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="group relative">
          {/* Progress bar background */}
          <div className="h-32 w-1 rounded-full bg-gray-200 dark:bg-gray-700">
            {/* Progress fill */}
            <div
              className="w-full rounded-full bg-primary-500 transition-all duration-300"
              style={{
                height: `${activeId ? ((links.findIndex((l) => l.id === activeId) + 1) / links.length) * 100 : 0}%`,
              }}
            />
          </div>

          {/* Show full TOC on hover */}
          <div className="pointer-events-none absolute right-6 top-0 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="w-64 rounded-lg border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/95">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Contents
              </h3>
              <nav className="max-h-60 overflow-y-auto">
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleScrollTo(link.id)}
                        className={`pointer-events-auto block w-full rounded px-2 py-1 text-left text-xs transition-colors ${
                          link.level === 2 ? 'ml-3' : ''
                        } ${
                          activeId === link.id
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        {link.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile: Simple button that doesn't interfere */}
      <motion.div
        className="fixed bottom-20 right-4 z-20 xl:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full bg-primary-500 p-2 text-white shadow-lg transition-all duration-200 hover:bg-primary-600 hover:shadow-xl"
          aria-label="Table of contents"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 right-0 w-64 rounded-lg border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/95"
          >
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Contents
            </h3>
            <nav className="max-h-60 overflow-y-auto">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        handleScrollTo(link.id)
                        setIsCollapsed(true)
                      }}
                      className={`block w-full rounded px-2 py-2 text-left text-sm transition-colors ${
                        link.level === 2 ? 'ml-3 text-xs' : ''
                      } ${
                        activeId === link.id
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default FloatingTOC
