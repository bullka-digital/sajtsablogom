import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import TagBadge from '@/components/TagBadge'
import ProseContent from '@/components/ProseContent'
import ShareButtons from '@/components/ShareButtons'

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
    <main>
      {/* Hero sekcija — 2/3 visine ekrana */}
      <div className="relative h-[67vh] w-full overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        {/* Tamni overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Naslov centriran */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">
        <Link
          href="/blog"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors mb-8 inline-block"
        >
          ← Svi postovi
        </Link>

        <article>
          <header className="mb-10">
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
          <ShareButtons title={post.title} slug={post.slug} />
        </article>
      </div>
    </main>
  )
}
