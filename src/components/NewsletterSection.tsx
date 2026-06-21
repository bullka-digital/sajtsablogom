'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Hvala! Uspešno si se pretplatio/la.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Greška pri slanju.')
      }
    } catch {
      setStatus('error')
      setMessage('Greška pri slanju. Pokušajte ponovo.')
    }
  }

  return (
    <section className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/newsletter.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row md:items-center gap-10 md:gap-20">
        <div className="md:w-1/3 flex-shrink-0">
          <p className="text-white text-xl font-semibold leading-snug">
            Prijavi se na newsletter
          </p>
        </div>

        <div className="flex-1">
          {status === 'success' ? (
            <p className="text-white text-lg">{message}</p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Unesi svoj email"
                  required
                  className="flex-1 px-5 py-4 bg-white text-gray-900 placeholder-gray-400 text-sm outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-4 bg-[#2d2d2d] text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {status === 'loading' ? '...' : 'Prijavi se'}
                </button>
              </div>
              {status === 'error' && (
                <p className="mt-2 text-red-400 text-sm">{message}</p>
              )}
              <p className="mt-3 text-white/50 text-xs">
                Prijavom prihvataš našu Politiku privatnosti i daješ saglasnost za primanje vesti.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
