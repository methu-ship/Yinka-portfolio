'use client'

import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { motion } from 'framer-motion'
import { CoreContent } from 'pliny/utils/contentlayer'
import FloatingTOC from '@/components/FloatingTOC'

interface TocItem {
  value: string
  url: string
  depth: number
}

interface Props {
  children: ReactNode
  content: Authors
  toc?: TocItem[]
}

export default function AuthorLayout({ children, content, toc }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  const tocLinks = Array.isArray(toc)
    ? toc.map((item) => ({
        title: item.value,
        id: item.url.substring(1),
        level: (item.depth === 1 ? 1 : 2) as 1 | 2,
      }))
    : []

  return (
    <>
      {tocLinks.length > 0 && <FloatingTOC links={tocLinks} />}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-50 [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
          <div className="relative px-6 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-7xl"
            >
              <div className="flex flex-col items-center text-center">
                {avatar && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative mb-8"
                  >
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur" />
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={192}
                      height={192}
                      className="relative h-48 w-48 rounded-full border-2 border-white dark:border-gray-800"
                      priority
                    />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h1 className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-white sm:text-5xl">
                    {name}
                  </h1>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{occupation}</p>
                  {company && <p className="text-gray-500 dark:text-gray-400">{company}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 flex items-center justify-center space-x-6"
                >
                  <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
                  <SocialIcon kind="github" href={github} size={6} />
                  <SocialIcon kind="linkedin" href={linkedin} size={6} />
                  <SocialIcon kind="twitter" href={twitter} size={6} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10"
        >
          <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
