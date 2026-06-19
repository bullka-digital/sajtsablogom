import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import TagBadge from './TagBadge'

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('sr-RS', { dateStyle: 'long' }).format(
    new Date(dateStr)
  )
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-accent transition-colors group">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime} min čitanja</span>
      </div>

      <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
        ))}
      </div>
    </article>
  )
}
