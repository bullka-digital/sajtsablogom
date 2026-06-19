import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'O meni',
  description: 'Ko sam ja i o čemu pišem.',
}

export default function OMeniPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">O meni</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-accent prose-a:text-accent">
        <p>
          Zdravo! Ja sam <strong>Daniel</strong>, web developer koji voli da gradi stvari na internetu.
        </p>

        <p>
          Ovaj blog je mesto gde delim svoje misli o web razvoju, projektima na kojima radim,
          i svemu što me zanima. Pišem o Next.js, React-u, TypeScript-u i modernom web ekosistemu.
        </p>

        <h2>Šta radim</h2>
        <p>
          Bavim se front-end i full-stack razvojem. Volim čist kod, dobre performanse i korisničko
          iskustvo koje ima smisla.
        </p>

        <h2>Kontakt</h2>
        <p>
          Možeš me pronaći na{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub-u
          </a>{' '}
          ili me kontaktirati putem email-a.
        </p>
      </div>

      <div className="mt-12">
        <Link href="/blog" className="text-accent hover:underline font-medium">
          Čitaj blog →
        </Link>
      </div>
    </main>
  )
}
