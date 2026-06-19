---
title: "Next.js 16 — Šta je novo?"
date: "2026-06-18"
excerpt: "Pregled najvažnijih promena u Next.js 16: async params, novi turbopack, i zašto je App Router sada zreliji nego ikad."
tags: ["Next.js", "React", "Web razvoj"]
slug: "nextjs-16-novosti"
coverImage: "/post2.jpg"
---

## Next.js 16 donosi važne promene

Nova verzija Next.js dolazi sa nekoliko promena koje je važno razumeti pre nego što počnete da pišete kod. Ovo nisu sitne ispravke — neke stvari funkcionišu drugačije nego u prethodnim verzijama.

## Async params i searchParams

Jedna od najvažnijih promena je da su `params` i `searchParams` u page komponentama sada **Promise** — moraju se čekati pre korišćenja:

```typescript
// Next.js 15 i stariji — NEĆE raditi u v16
export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // Greška!
}

// Next.js 16 — ispravan način
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Ispravno
}
```

Ista stvar važi i za `searchParams` na listama:

```typescript
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
}
```

## App Router je sada zreo

App Router koji je uveden u Next.js 13 sada je potpuno stabilan i preporučen za sve nove projekte. Pages Router i dalje postoji ali se ne preporučuje za nove projekte.

Glavne prednosti App Routera:

1. **Server Components po defaultu** — manje JavaScript-a na klijentu
2. **Streaming i Suspense** — bolje korisničko iskustvo
3. **Layouts** — deljeni UI bez ponovnog renderovanja
4. **generateStaticParams** — statičko generisanje dinamičkih ruta

## Tailwind CSS v4

Next.js 16 se odlično slaže sa Tailwind v4 koji dolazi sa novim načinom konfiguracije. Umesto `tailwind.config.ts`, sve ide u `globals.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme inline {
  --color-accent: #6366f1;
}
```

Ovo je elegantniji pristup koji drži stilizovanje na jednom mestu.

## Zaključak

Next.js 16 je solidna verzija koja donosi potrebnu zrelost ekosistemu. Async params je jedina "zamka" na koju treba obratiti pažnju pri migraciji ili pisanju novog koda.
