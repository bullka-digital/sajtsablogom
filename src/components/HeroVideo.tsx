'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  function togglePlay() {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16">
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8 max-w-3xl tracking-tight">
          Misli, projekti i sve između.
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pauziraj video' : 'Pusti video'}
            className="w-10 h-10 flex items-center justify-center border border-white/60 text-white text-sm hover:border-white transition-colors"
          >
            {playing ? '⏸' : '▶'}
          </button>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-white text-sm hover:opacity-70 transition-opacity"
          >
            <span>›</span> Čitaj blog
          </Link>
        </div>
      </div>
    </section>
  )
}
