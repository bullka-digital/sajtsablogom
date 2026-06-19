'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import TagBadge from './TagBadge'

type TagFilterProps = {
  tags: string[]
  activeTag: string | null
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (activeTag?.toLowerCase() === tag.toLowerCase()) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    router.push(`/blog?${params.toString()}`)
  }

  function clearFilter() {
    router.push('/blog')
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={clearFilter}
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors border ${
          !activeTag
            ? 'bg-accent text-white border-accent'
            : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-accent hover:text-accent'
        }`}
      >
        Sve
      </button>
      {tags.map((tag) => (
        <button key={tag} onClick={() => handleTag(tag)} className="cursor-pointer">
          <TagBadge tag={tag} active={activeTag?.toLowerCase() === tag.toLowerCase()} />
        </button>
      ))}
    </div>
  )
}
