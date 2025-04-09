'use client'

import { motion } from 'framer-motion'
import projectsData from '@/data/projectsData'
import CardSmall from '@/components/CardSmall'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ProjectsContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
        >
          Projects
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg leading-7 text-gray-500 dark:text-gray-400"
        >
          A collection of projects I've worked on, from CLI tools to full-stack applications.
        </motion.p>
      </div>

      <motion.div
        animate="animate"
        variants={stagger}
        className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projectsData.map((project) => (
          <motion.div key={project.title} variants={fadeInUp}>
            <CardSmall
              title={project.title}
              description={project.description}
              imgSrc={project.imgSrc}
              href={project.href}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
