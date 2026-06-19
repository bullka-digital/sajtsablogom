import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import TagBadge from '@/components/TagBadge'
import ProseContent from '@/components/ProseContent'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return { title: post.title, description: post.excerpt }
  } catch {
    return { title: 'Post nije pronađen' }
  }
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('sr-RS', { dateStyle: 'long' }).format(
    new Date(dateStr)
  )
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors mb-8 inline-block"
      >
        ← Svi postovi
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-5">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime} min čitanja</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
            ))}
          </div>
        </header>

        <ProseContent html={post.contentHtml} />
      </article>
    </main>
  )
}
