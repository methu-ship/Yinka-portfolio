'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TerminalUI from '@/components/TerminalUI'
import { ThemeProviders } from '../app/theme-providers'

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    setIsInitialLoad(false)
  }, [])

  return (
    <ThemeProviders>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="w-full pt-16"
          style={{ willChange: 'opacity, transform' }}
          initial={isInitialLoad ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex min-h-screen flex-col justify-between font-sans">
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </motion.main>
      </AnimatePresence>
      <Analytics />
      <TerminalUI />
    </ThemeProviders>
  )
}
