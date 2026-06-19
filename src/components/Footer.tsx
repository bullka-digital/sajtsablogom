import Link from 'next/link'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#252d3d] text-white/60 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-white/50 text-xs tracking-wide">
          © {year} DBRL Digital
        </span>

        <nav className="flex items-center gap-6 flex-wrap justify-center">
          <Link href="/blog" className="hover:text-white transition-colors tracking-wide">
            Blog
          </Link>
          <Link href="/o-meni" className="hover:text-white transition-colors tracking-wide">
            O meni
          </Link>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <LinkedInIcon />
          </a>
        </nav>

        <span className="text-white/50 text-xs tracking-wide">
          Design / Build — DBRL Digital
        </span>
      </div>
    </footer>
  )
}
