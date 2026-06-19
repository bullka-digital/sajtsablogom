import Link from 'next/link'

type TagBadgeProps = {
  tag: string
  href?: string
  active?: boolean
}

export default function TagBadge({ tag, href, active }: TagBadgeProps) {
  const baseClass =
    'inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors'
  const activeClass = 'bg-accent text-white'
  const inactiveClass =
    'border border-accent text-accent hover:bg-accent hover:text-white'

  const className = `${baseClass} ${active ? activeClass : inactiveClass}`

  if (href) {
    return (
      <Link href={href} className={className}>
        {tag}
      </Link>
    )
  }

  return <span className={className}>{tag}</span>
}
