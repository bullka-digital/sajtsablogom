'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'POCETNA' },
  { href: '/blog', label: 'BLOG' },
  { href: '/o-meni', label: 'O MENI' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          DBRL DIGITAL
        </Link>
        <nav className="flex gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-widest transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'hover:opacity-60'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
