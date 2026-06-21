import Link from 'next/link'

type TagBadgeProps = {
  tag: string
  href?: string
  active?: boolean
}

const TAG_COLORS: Record<string, string> = {
  'Next.js':               'bg-black text-white hover:bg-gray-800',
  'React':                 'bg-sky-500 text-white hover:bg-sky-600',
  'Web razvoj':            'bg-violet-500 text-white hover:bg-violet-600',
  'CSS':                   'bg-blue-500 text-white hover:bg-blue-600',
  'Tailwind':              'bg-teal-500 text-white hover:bg-teal-600',
  'Uvod':                  'bg-emerald-500 text-white hover:bg-emerald-600',
  'Veštačka inteligencija':'bg-orange-500 text-white hover:bg-orange-600',
  'Ekonomija':             'bg-amber-500 text-white hover:bg-amber-600',
  'Budućnost rada':        'bg-rose-500 text-white hover:bg-rose-600',
}

const ACTIVE_RING: Record<string, string> = {
  'Next.js':               'ring-2 ring-black',
  'React':                 'ring-2 ring-sky-500',
  'Web razvoj':            'ring-2 ring-violet-500',
  'CSS':                   'ring-2 ring-blue-500',
  'Tailwind':              'ring-2 ring-teal-500',
  'Uvod':                  'ring-2 ring-emerald-500',
  'Veštačka inteligencija':'ring-2 ring-orange-500',
  'Ekonomija':             'ring-2 ring-amber-500',
  'Budućnost rada':        'ring-2 ring-rose-500',
}

const DEFAULT_COLOR = 'bg-gray-500 text-white hover:bg-gray-600'
const DEFAULT_RING  = 'ring-2 ring-gray-500'

export default function TagBadge({ tag, href, active }: TagBadgeProps) {
  const color = TAG_COLORS[tag] ?? DEFAULT_COLOR
  const ring  = ACTIVE_RING[tag] ?? DEFAULT_RING

  const className = [
    'inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors',
    color,
    active ? ring : '',
  ].join(' ').trim()

  if (href) {
    return (
      <Link href={href} className={className}>
        {tag}
      </Link>
    )
  }

  return <span className={className}>{tag}</span>
}
