/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Previous
          </Link>
        )}
        <span className="text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Next →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Exploring technical writing, Web3 best practices, and doing protocol level stuffs through detailed
          guides and tutorials.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Tags Sidebar */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-64"
        >
          <div className="sticky top-24 rounded-xl bg-gray-50 p-6 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h2>
            <div className="space-y-2">
              <Link
                href="/blog"
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/blog'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                All Posts
              </Link>
              {sortedTags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === `/tags/${slug(t)}`
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {t} ({tagCounts[t]})
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div variants={container} animate="show" className="flex-1">
          <div className="space-y-6">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <motion.article
                  key={path}
                  variants={item}
                  className="group relative rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-900/70 dark:shadow-gray-800/40"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">
                          <Link
                            href={`/${path}`}
                            className="text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                          >
                            {title}
                          </Link>
                        </h2>
                        <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                    </div>
                    <p className="prose prose-sm max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/${path}`}
                        className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
