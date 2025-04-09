'use client'

import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TerminalUI from '@/components/TerminalUI'
import { ThemeProviders } from '../app/theme-providers'

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <Header />
      <main className="w-full pt-16">
        <div className="flex min-h-screen flex-col justify-between font-sans">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </main>
      <Analytics />
      <TerminalUI />
    </ThemeProviders>
  )
}
