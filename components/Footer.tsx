'use client'

import { motion } from 'framer-motion'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function Footer() {
  return (
    <footer className="relative mt-20 ">
      <div className="mx-auto w-full px-8 py-12 lg:px-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Social Icons */}
          <motion.div
            variants={fadeInUp}
            className="mx-auto flex w-full max-w-md items-center justify-center gap-4"
          >
            <div className="transform transition-transform duration-300 hover:scale-110">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 text-sm font-medium"
          >
            <Link
              href="/about"
              className="relative text-gray-600 transition-colors duration-300 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
            >
              About
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/projects"
              className="relative text-gray-600 transition-colors duration-300 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
            >
              Projects
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/blog"
              className="relative text-gray-600 transition-colors duration-300 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
            >
              Blog
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-200 group-hover:w-full" />
            </Link>
          </motion.nav>

          {/* Copyright */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="mb-3 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{siteMetadata.author}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span>{`© ${new Date().getFullYear()}`}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
