import Image from 'next/image'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(new Date(dateStr))
    .toUpperCase()
}

export default function PostCard({ post }: { post: PostMeta }) {
  const category = post.tags[0] ?? 'Blog'

  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-gray-100 dark:bg-gray-900">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" />
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase font-medium">
            {category}
          </span>
          <span className="w-2 h-2 bg-orange-500 flex-shrink-0 inline-block" />
          <time
            dateTime={post.date}
            className="text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className="text-xl font-bold leading-snug group-hover:opacity-70 transition-opacity">
          {post.title}
        </h2>
      </Link>
    </article>
  )
}
