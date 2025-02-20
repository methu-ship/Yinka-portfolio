import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

export default function CardSmall({ title, description, imgSrc, href }: CardProps) {
  return (
    <div className="flex h-full transform flex-col rounded-lg border border-gray-200 bg-white p-4 shadow transition hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {imgSrc && (
        <div className="relative h-40 w-full">
          <Image
            src={imgSrc}
            alt={title}
            className="rounded-t-lg object-cover"
            fill
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="mt-auto text-sm font-medium leading-6 text-primary-500 transition duration-300 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Learn more about ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}
