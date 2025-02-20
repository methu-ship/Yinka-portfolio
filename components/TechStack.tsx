import React from 'react'
import Image from './Image'
import Link from './Link'

interface TechItem {
  name: string
  icon: string
  link?: string
}

interface TechStackProps {
  programmingLanguages: TechItem[]
  tools: TechItem[]
}

const TechStack = ({ programmingLanguages, tools }: TechStackProps) => {
  return (
    <section className="my-12">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Programming Languages
      </h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {programmingLanguages.map((lang) => (
          <div key={lang.name} className="flex flex-col items-center">
            {lang.link ? (
              <Link href={lang.link}>
                <Image
                  src={lang.icon}
                  alt={lang.name}
                  width={48}
                  height={48}
                  className="object-contain"
                  loading="lazy"
                />
              </Link>
            ) : (
              <Image
                src={lang.icon}
                alt={lang.name}
                width={48}
                height={48}
                className="object-contain"
                loading="lazy"
              />
            )}
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">{lang.name}</span>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Tools &amp; Technologies
      </h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {tools.map((tool) => (
          <div key={tool.name} className="flex flex-col items-center">
            {tool.link ? (
              <Link href={tool.link}>
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={48}
                  height={48}
                  className="object-contain"
                  loading="lazy"
                />
              </Link>
            ) : (
              <Image
                src={tool.icon}
                alt={tool.name}
                width={48}
                height={48}
                className="object-contain"
                loading="lazy"
              />
            )}
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStack
