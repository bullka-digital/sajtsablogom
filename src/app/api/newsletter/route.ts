import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Unesite ispravan email' }, { status: 400 })
  }

  try {
    if (process.env.RESEND_AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      })
      if (contactError) {
        return NextResponse.json({ error: JSON.stringify(contactError) }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Greška pri slanju. Pokušajte ponovo.' }, { status: 500 })
  }
}
