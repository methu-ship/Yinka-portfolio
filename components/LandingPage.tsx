'use client'

import React from 'react'
import Link from '@/components/Link'
import Hero from '@/components/Hero'

interface Post {
  slug: string
  title: string
  summary: string
}

interface LandingPageProps {
  posts: Post[]
}

const LandingPage = ({ posts }: LandingPageProps) => {
  return (
    <div className="relative w-full">
      <Hero />

      {/* Articles Section */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Latest Articles</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 5).map((post) => (
              <div key={post.slug} className="h-full">
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
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-indigo-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white dark:text-white"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                View All Articles
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative w-full px-8 py-20 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-pink-500/5" />
          <div className="absolute right-1/4 top-3/4 h-24 w-24 rounded-full bg-indigo-500/5" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-500/5 to-indigo-500/5" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Quote icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/10 to-indigo-500/10">
              <svg
                className="h-8 w-8 text-pink-500 dark:text-pink-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            {/* Testimonial text */}
            <blockquote className="text-center text-2xl font-medium italic leading-relaxed text-gray-700 dark:text-gray-300">
              "Building the future of blockchain technology, one line of code at a time."
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
