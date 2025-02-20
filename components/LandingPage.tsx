import React from 'react'
import Link from '@/components/Link'
import CardSmall from '@/components/CardSmall'
import CardSeeAll from '@/components/CardSeeAll'
import projectsData from '@/data/projectsData'

interface LandingPageProps {
  posts: any[] // Adjust type as needed
}

const LandingPage = ({ posts }: LandingPageProps) => {
  const displayedProjects = projectsData.slice(0, 5)
  const hasExtraProjects = projectsData.length > 3

  return (
    <div>
      {/* Hero Section with solid background */}
      <section className="flex items-center justify-center bg-white py-20 text-center dark:bg-gray-900">
        <div className="px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Hi, I'm <span className="text-pink-500">Shedrack Akintayo</span>
          </h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            DevOps | Solutions Architect | Technical Writer
          </p>
          <Link
            href="/about"
            className="inline-block rounded bg-pink-500 px-8 py-3 text-white transition duration-300 hover:bg-pink-600"
            aria-label="Learn more about me"
          >
            Learn More About Me
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="relative my-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-lg font-semibold text-gray-500 dark:bg-gray-900">
            Projects
          </span>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <CardSmall
                key={project.title}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
              />
            ))}
            {hasExtraProjects && <CardSeeAll />}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative my-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-lg font-semibold text-gray-500 dark:bg-gray-900">
            Articles
          </span>
        </div>
      </div>

      {/* Blog Preview Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Latest Articles</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.slice(0, 5).map((post) => {
              const { slug, title, summary } = post
              return (
                <li key={slug} className="py-6">
                  <article>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{summary}</p>
                  </article>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-block rounded bg-primary-500 px-6 py-3 text-white transition duration-300 hover:bg-primary-600"
              aria-label="View all articles"
            >
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 px-4 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <blockquote className="text-2xl italic text-gray-700 dark:text-gray-300">
            "Shedrack is a positive and energetic individual who brings a smile to what he does. He
            works well with others and has a collaborative approach that makes him easy to work
            with. Shedrack is a team player who is approachable and fosters a sense of camaraderie
            among his colleagues."
          </blockquote>
          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            – Bill Mulligan, Community, Isovalent at Cisco
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
