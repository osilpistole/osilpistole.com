import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { trackPurchase } from '../lib/metaPixel'

// Backup Purchase event page.
//
// Set this URL as the "success URL" on any ThriveCart product if you'd
// rather fire Purchase from your own domain than from ThriveCart's
// built-in Meta integration. Pass product details via the query string:
//
//   https://osilpistole.com/thank-you?product=presence&value=27
//
// Possible product slugs match Pixel events on landing pages:
//   presence (27), awaken-align-series (47), awaken-align-journal (27),
//   awaken-align-bundle (67), build (2500)
//
// If a buyer lands here, Meta's Pixel records a Purchase event with the
// matching value — so Sales-objective campaigns can optimize correctly.

const PRODUCT_BY_SLUG = {
  'presence':                { name: 'Presence — 30-Day Lectio Divina Journal', value: 27 },
  'awaken-align-series':     { name: 'Awaken & Align Meditation Series',         value: 47 },
  'awaken-align-journal':    { name: 'Awaken & Align Journal',                   value: 27 },
  'awaken-align-bundle':     { name: 'Awaken & Align Bundle',                    value: 67 },
  'build':                   { name: 'Website + Product Build',                  value: 2500 },
}

export default function ThankYouPage() {
  const [search] = useSearchParams()
  const slug = search.get('product') || 'presence'
  const overrideValue = search.get('value')

  const product = PRODUCT_BY_SLUG[slug] || PRODUCT_BY_SLUG.presence

  useEffect(() => {
    trackPurchase({
      name: product.name,
      id: slug,
      value: overrideValue ? Number(overrideValue) : product.value,
      currency: 'USD',
      num_items: 1,
    })
  }, [slug, overrideValue, product])

  return (
    <section className="min-h-screen bg-parchment text-ink flex items-center justify-center px-6 lg:px-14 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-ink/65 text-xs font-bold uppercase tracking-[0.25em] mb-4">Thank you</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          You're in. Your purchase is confirmed.
        </h1>
        <p className="text-ink/65 text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Check your email for your access details and receipt. If anything looks off, reply to that email — I'll sort it out personally.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink/85 transition-all"
          >
            Back to home
          </Link>
          <a
            href="https://members.osilpistole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-ink/25 text-ink text-sm font-semibold hover:border-ink/50 hover:bg-ink/5 transition-all"
          >
            Open the member portal
          </a>
        </div>
        <p className="text-ink/45 text-xs mt-8">— Osil</p>
      </div>
    </section>
  )
}
