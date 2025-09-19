'use client'

import Image from 'next/image'
import Link from './Link'
import { motion } from 'framer-motion'

interface Technology {
  name: string
  icon: string
  link?: string
}

interface TechStackProps {
  programmingLanguages: Technology[]
  tools: Technology[]
}

const TechStack = ({ programmingLanguages, tools }: TechStackProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="my-12">
      <h2 className="mb-8 text-2xl font-bold">Tech Stack</h2>

      {/* Core Languages */}
      <div className="mb-12">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Core Languages & Development Tools
        </h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6"
        >
          {programmingLanguages.map((lang) => (
            <motion.div
              key={lang.name}
              variants={item}
              className="group flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800"
            >
              {lang.link ? (
                <Link href={lang.link} className="flex flex-col items-center">
                  <Image
                    src={lang.icon}
                    alt={lang.name}
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang.name}
                  </span>
                </Link>
              ) : (
                <>
                  <Image
                    src={lang.icon}
                    alt={lang.name}
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang.name}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* DevOps Tools */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Blockchain Stack
        </h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              className="group flex flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800"
            >
              {tool.link ? (
                <Link href={tool.link} className="flex flex-col items-center">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tool.name}
                  </span>
                </Link>
              ) : (
                <>
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tool.name}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
