import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import LandingPage from '@/components/LandingPage'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <LandingPage
      posts={posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        summary: post.summary ?? '',
      }))}
    />
  )
}
