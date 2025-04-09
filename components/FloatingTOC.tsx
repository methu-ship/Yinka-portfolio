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
    <motion.div
      ref={tocRef}
      className="fixed right-8 top-24 z-30 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-md dark:bg-gray-800/70">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
          On this page
        </h3>
        <nav>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id} className={`${link.level === 2 ? 'ml-3' : ''}`}>
                {' '}
                {/* Indent H2 */}
                <button
                  onClick={() => handleScrollTo(link.id)}
                  className={`block w-full text-left text-xs transition-colors duration-200 ${
                    activeId === link.id
                      ? 'font-semibold text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}

export default FloatingTOC
