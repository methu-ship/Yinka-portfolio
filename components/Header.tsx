'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md dark:bg-gray-900/80' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-8 py-4 lg:px-12">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="text-2xl font-bold tracking-tight">{siteMetadata.headerTitle}</div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="relative hidden font-medium text-gray-900 transition-colors hover:text-pink-500 dark:text-gray-100 dark:hover:text-pink-400 sm:block"
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
