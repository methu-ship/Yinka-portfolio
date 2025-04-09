import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import dynamic from 'next/dynamic'
import { coreContent } from 'pliny/utils/contentlayer'

const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: true })

// Define TocItem type here, matching AuthorLayout
interface TocItem {
  value: string
  url: string
  depth: number
}

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  if (!author) {
    console.error('Author data not found')
    return <div>Author not found</div>
  }

  if (!author.body?.code) {
    console.error('Author MDX content not found')
    return <div>Content not found</div>
  }

  // Core Languages and Development Tools
  const programmingLanguages = [
    {
      name: 'Golang',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/go/go-original.svg',
      link: 'https://golang.org',
    },
    {
      name: 'Bash',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/bash/bash-original.svg',
      link: 'https://www.gnu.org/software/bash/',
    },
    {
      name: 'JavaScript',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/javascript/javascript-original.svg',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
  ]

  // DevOps and Cloud Tools
  const tools = [
    {
      name: 'Kubernetes',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/kubernetes/kubernetes-plain.svg',
      link: 'https://kubernetes.io',
    },
    {
      name: 'AWS',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      link: 'https://aws.amazon.com',
    },
    {
      name: 'Cilium',
      icon: 'https://cilium.io/static/cilium-light-1-508660eccad04d0ef109a0be1dc4d416.svg',
      link: 'https://cilium.io',
    },
    {
      name: 'Terraform',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/terraform/terraform-original-wordmark.svg',
      link: 'https://www.terraform.io',
    },
    {
      name: 'Docker',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/docker/docker-original-wordmark.svg',
      link: 'https://www.docker.com',
    },
    {
      name: 'Ansible',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/ansible/ansible-original-wordmark.svg',
      link: 'https://www.ansible.com',
    },
    {
      name: 'Linux',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/linux/linux-original.svg',
      link: 'https://www.kernel.org',
    },
    {
      name: 'Traefik',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/traefikproxy/traefikproxy-original-wordmark.svg',
      link: 'https://traefik.io',
    },
    {
      name: 'Helm',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/helm/helm-original.svg',
      link: 'https://helm.sh',
    },
    {
      name: 'Prometheus',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/prometheus/prometheus-original.svg',
      link: 'https://prometheus.io',
    },
    {
      name: 'Grafana',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/grafana/grafana-original.svg',
      link: 'https://grafana.com',
    },
    {
      name: 'GH Actions',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/githubactions/githubactions-original.svg',
      link: 'https://github.com/features/actions',
    },
    {
      name: 'Jenkins',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/jenkins/jenkins-original.svg',
      link: 'https://www.jenkins.io',
    },
    {
      name: 'MongoDB',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/mongodb/mongodb-original-wordmark.svg',
      link: 'https://www.mongodb.com',
    },
  ]

  return (
    <AuthorLayout content={author} toc={author.toc as unknown as TocItem[]}>
      <div className="prose max-w-none dark:prose-invert">
        <MDXLayoutRenderer code={author.body.code} />
        <TechStack programmingLanguages={programmingLanguages} tools={tools} />
      </div>
    </AuthorLayout>
  )
}
