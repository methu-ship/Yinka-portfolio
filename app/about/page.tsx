import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import TechStack from '@/components/TechStack'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  // Define arrays for programming languages and tools/technologies
  const programmingLanguages = [
    {
      name: 'Golang',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/go/go-original.svg',
      link: 'https://golang.org',
    },
    {
      name: 'JavaScript',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/javascript/javascript-original.svg',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'React',
      icon: 'https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/react/react-original-wordmark.svg',
      link: 'https://reactjs.org',
    },
    {
      name: 'Node.js',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/nodejs/nodejs-original-wordmark.svg',
      link: 'https://nodejs.org',
    },
  ]

  const tools = [
    {
      name: 'Kubernetes',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/kubernetes/kubernetes-plain.svg',
      link: 'https://kubernetes.io',
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
      name: 'Cilium',
      icon: 'https://cilium.io/static/cilium-light-1-508660eccad04d0ef109a0be1dc4d416.svg',
      link: 'https://cilium.io',
    },
    {
      name: 'AWS',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      link: 'https://aws.amazon.com',
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
      name: 'Docker',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/docker/docker-original-wordmark.svg',
      link: 'https://www.docker.com',
    },
    {
      name: 'Terraform',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/terraform/terraform-original-wordmark.svg',
      link: 'https://www.terraform.io',
    },
    {
      name: 'GH Actions',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/githubactions/githubactions-original.svg',
      link: 'https://github.com/features/actions',
    },
    {
      name: 'MongoDB',
      icon: 'https://github.com/devicons/devicon/raw/refs/heads/master/icons/mongodb/mongodb-original-wordmark.svg',
      link: 'https://www.mongodb.com',
    },
  ]

  return (
    <AuthorLayout content={mainContent}>
      <>
        <MDXLayoutRenderer code={author.body.code} />
        <TechStack programmingLanguages={programmingLanguages} tools={tools} />
      </>
    </AuthorLayout>
  )
}
