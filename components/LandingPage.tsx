'use client'

import React from 'react'
import Link from '@/components/Link'
import CardSmall from '@/components/CardSmall'
import CardSeeAll from '@/components/CardSeeAll'
import projectsData from '@/data/projectsData'
import Hero from '@/components/Hero'
import { motion } from 'framer-motion'

interface Post {
  slug: string
  title: string
  summary: string
}

interface LandingPageProps {
  posts: Post[]
}

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

const LandingPage = ({ posts }: LandingPageProps) => {
  const displayedProjects = projectsData.slice(0, 4)
  const hasExtraProjects = projectsData.length >= 4

  return (
    <div className="relative w-full">
      <Hero />

      {/* Projects Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="relative w-full px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
        <div className="mx-auto max-w-7xl">
          <motion.h2
            variants={fadeInUp}
            className="mb-12 text-center text-3xl font-bold tracking-tight"
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <motion.div key={project.title} variants={fadeInUp}>
                <CardSmall
                  title={project.title}
                  description={project.description}
                  imgSrc={project.imgSrc}
                  href={project.href}
                />
              </motion.div>
            ))}
            {hasExtraProjects && (
              <motion.div variants={fadeInUp}>
                <CardSeeAll />
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Articles Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="w-full px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <motion.h2
            variants={fadeInUp}
            className="mb-12 text-center text-3xl font-bold tracking-tight"
          >
            Latest Articles
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 5).map((post) => (
              <motion.div key={post.slug} variants={fadeInUp} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full transform transition-all duration-300 hover:-translate-y-1"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold leading-8 tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-pink-500 dark:text-white dark:group-hover:text-pink-400">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">{post.summary}</p>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-500 dark:text-white dark:group-hover:text-pink-400">
                      Read more
                      <svg
                        className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
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

                    {/* Border gradient effect */}
                    <div className="absolute inset-0 rounded-xl p-[1px]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Link
              href="/blog"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-indigo-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white dark:text-white"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                View All Articles
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="relative w-full px-8 py-20 lg:px-12"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-pink-500/5" />
          <div className="absolute right-1/4 top-3/4 h-24 w-24 rounded-full bg-indigo-500/5" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-500/5 to-indigo-500/5" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Quote icon */}
          <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/10 to-indigo-500/10">
              <svg
                className="h-8 w-8 text-pink-500 dark:text-pink-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </motion.div>

          <div className="relative">
            {/* Testimonial text */}
            <motion.blockquote
              variants={fadeInUp}
              className="text-center text-2xl font-medium italic leading-relaxed text-gray-700 dark:text-gray-300"
            >
              <span className="relative">
                <span className="relative z-10">
                  Shedrack is a positive and energetic individual who brings a smile to what he
                  does. He works well with others and has a collaborative approach that makes him
                  easy to work with.
                </span>
                <div className="absolute -inset-1 -z-10 block h-full w-full rotate-1 bg-gradient-to-r from-pink-500/5 to-indigo-500/5" />
              </span>
              <br />
              <span className="relative">
                <span className="relative z-10">
                  Shedrack is a team player who is approachable and fosters a sense of camaraderie
                  among his colleagues.
                </span>
                <div className="absolute -inset-1 -z-10 block h-full w-full -rotate-1 bg-gradient-to-r from-indigo-500/5 to-pink-500/5" />
              </span>
            </motion.blockquote>

            {/* Author info */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center space-y-2"
            >
              <div className="h-px w-12 bg-gradient-to-r from-pink-500/50 to-indigo-500/50" />
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Bill Mulligan
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Community, Isovalent at Cisco
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default LandingPage
