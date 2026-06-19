import { Suspense } from 'react'
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  title: 'Blog',
  description: 'Svi postovi',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const [posts, allTags] = await Promise.all([
    tag ? getPostsByTag(tag) : getAllPosts(),
    getAllTags(),
  ])

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        {posts.length} {posts.length === 1 ? 'post' : 'postova'}
        {tag && <> sa tagom <span className="text-accent font-medium">{tag}</span></>}
      </p>

      <Suspense>
        <TagFilter tags={allTags} activeTag={tag ?? null} />
      </Suspense>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Nema postova sa ovim tagom.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
