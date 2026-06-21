import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import HeroVideo from '@/components/HeroVideo'
import NewsletterSection from '@/components/NewsletterSection'

export default async function Home() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <>
      <HeroVideo />

      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold mb-8">Najnoviji postovi</h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {posts.length > 3 && (
            <div className="mt-10 text-center">
              <Link href="/blog" className="text-accent hover:underline font-medium">
                Vidi sve postove →
              </Link>
            </div>
          )}
        </section>
      )}

      <NewsletterSection />
    </>
  )
}
