import Link from './Link'

export default function CardSeeAll() {
  return (
    <div className="flex h-full transform flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow transition hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <Link
        href="/projects"
        className="text-xl font-bold text-primary-500 transition duration-300 hover:text-primary-600"
        aria-label="See all projects"
      >
        See All Projects &rarr;
      </Link>
    </div>
  )
}
