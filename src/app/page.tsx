import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default async function Home() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <section className="mb-20">
        <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
          Misli, projekti i{' '}
          <span className="text-accent">sve između.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Blog o web razvoju, tehnologiji i svemu što me zanima. Bez filtera, bez formalnosti.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Čitaj blog →
        </Link>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-8">Najnoviji postovi</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {posts.length > 3 && (
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="text-accent hover:underline font-medium"
              >
                Vidi sve postove →
              </Link>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
