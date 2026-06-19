---
title: "Tailwind CSS v4 — Kraj config fajlova"
date: "2026-06-17"
excerpt: "Tailwind v4 donosi radikalno novu konfiguraciju: sve ide u CSS, nema više tailwind.config.ts. Šta to znači za projekte?"
tags: ["CSS", "Tailwind", "Web razvoj"]
slug: "tailwind-css-v4"
coverImage: "/post3.jpg"
---

## Tailwind v4 menja sve što znaš o konfiguraciji

Ako si navikao na `tailwind.config.ts` fajl, v4 će te iznenaditi. Cela konfiguracija seli se direktno u CSS fajl, koristeći nove `@theme` i `@plugin` direktive.

## Kako izgleda nova konfiguracija?

Umesto JavaScript konfiguracionog fajla, sve ide u `globals.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme inline {
  --color-accent: #6366f1;
  --font-sans: var(--font-geist-sans);
}
```

To je sve. Nema `tailwind.config.ts`, nema `content` arraya, nema `theme.extend`.

## Zašto je ovo bolje?

**1. CSS je jedini izvor istine**

Pre v4, tema je bila definisana u JavaScript fajlu koji bi se kompajlirao u CSS. Sada je CSS direktno izvor — nema prevođenja, nema posrednika.

**2. Brži build**

Tailwind v4 je značajno brži od v3. Novi Rust-bazirani engine (`@tailwindcss/oxide`) kompajlira stilove nekoliko puta brže.

**3. CSS varijable svuda**

Svaka vrednost iz `@theme` bloka automatski postaje CSS custom property. To znači da možeš koristiti `var(--color-accent)` direktno u svom CSS-u.

```css
.moj-element {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
```

## Plugins se menjaju

U v3:
```js
// tailwind.config.ts
plugins: [require('@tailwindcss/typography')]
```

U v4:
```css
/* globals.css */
@plugin "@tailwindcss/typography";
```

## Migracija sa v3

Tailwind tim je napravio automatski migracioni alat:

```bash
npx @tailwindcss/upgrade
```

Alat konvertuje `tailwind.config.ts` u ekvivalentni CSS, prepisuje `@apply` direktive koje su zastarele, i ažurira import sintaksu.

## Zaključak

Tailwind v4 je bolji Tailwind — brži, jednostavniji za konfiguraciju, i bolje integrisan sa modernim CSS-om. Jedina mana je što v3 projekti zahtevaju migraciju, ali automatski alat to čini relativno bezbolnim.
