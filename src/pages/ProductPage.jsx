import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'
import { programs, accentMap } from '../data/programs'

function ThriveCartEmbed({ embedId, productId }) {
  useEffect(() => {
    if (!embedId) return
    if (document.getElementById(embedId)) return

    const script = document.createElement('script')
    script.src = '//tinder.thrivecart.com/embed/v2/thrivecart.js'
    script.async = true
    script.id = embedId
    document.body.appendChild(script)

    return () => {
      const el = document.getElementById(embedId)
      if (el) el.remove()
    }
  }, [embedId])

  if (!embedId) {
    return (
      <div className="py-6 mb-4">
        <p className="text-ink/40 text-xs font-bold uppercase tracking-[0.2em] mb-2">Checkout</p>
        <p role="status" aria-live="polite" className="text-ink/30 text-sm italic">
          Checkout coming soon.
        </p>
      </div>
    )
  }

  return (
    <div
      className="tc-v2-embeddable-target w-full"
      data-thrivecart-account="osilpistole"
      data-thrivecart-tpl="v2"
      data-thrivecart-product={productId}
      data-thrivecart-embeddable={embedId}
    />
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const program = programs.find((p) => p.slug === slug)

  if (!program) return <Navigate to="/programs" replace />

  const accent = accentMap[program.accent] ?? accentMap.sunrise
  const isActive = program.status === 'active'

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 md:pt-44 px-6 lg:px-14 bg-ink text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-7xl mx-auto">
          {/* Back link — py-2 for touch target */}
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm py-2 mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Products
          </Link>

          <RevealSection>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>{program.label}</span>
              {!isActive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-growth/20 border border-growth/35 text-xs font-bold uppercase tracking-wider text-growth">
                  <span className="w-1 h-1 rounded-full bg-growth animate-pulse" />
                  Coming Soon
                </span>
              )}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-3xl">
              {program.title}
            </h1>
            <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-2xl">{program.tagline}</p>
          </RevealSection>
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: product info — max-height guard so sticky doesn't overflow viewport */}
            <div className="lg:sticky lg:top-28">
              <RevealSection>
                {/* Image */}
                <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-5 mb-8">
                  {program.description.split('\n\n').map((para, i) => (
                    <p key={i} className="text-ink/70 text-base leading-relaxed">{para}</p>
                  ))}
                </div>

                {/* Price */}
                {isActive && (
                  <div className={`inline-flex items-baseline gap-3 ${accent.bg} border ${accent.border} rounded-2xl px-7 py-5 mb-8`}>
                    <span className={`font-heading text-5xl font-black ${accent.text}`}>{program.price}</span>
                    <span className="text-ink/50 text-xs font-semibold uppercase tracking-wider leading-tight">{program.priceNote}</span>
                  </div>
                )}

                {/* Session list */}
                {program.sessions && (
                  <div className="mb-8">
                    <p className="text-xs text-ink/60 font-bold uppercase tracking-[0.2em] mb-4">What You&apos;ll Cover</p>
                    <div className="flex flex-col gap-2">
                      {program.sessions.map((title, i) => (
                        <div key={title} className="flex items-center gap-3 py-2.5 border-b border-ink/6 last:border-0">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${accent.text} w-6 shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-ink/75 text-sm font-medium">{title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's included */}
                {program.includes && (
                  <>
                    <p className="text-xs text-ink/60 font-bold uppercase tracking-[0.2em] mb-4">What&apos;s included</p>
                    <div className="flex flex-col gap-3">
                      {program.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                          <span className="text-ink/70 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Journal spotlight */}
                {program.journalSpotlight && (
                  <div className="mt-8 rounded-2xl bg-sunrise/8 border border-sunrise/25 p-6">
                    <p className="text-xs text-ink/60 font-bold uppercase tracking-[0.2em] mb-3">Optional Add-On: The Meditation Journal</p>
                    <p className="text-ink/70 text-sm leading-relaxed">{program.journalSpotlight}</p>
                  </div>
                )}

                {/* Coaching / coming-soon Calendly */}
                {!isActive && program.calendly && (
                  <a
                    href={program.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 bg-sunrise hover:bg-[#f0be2e] text-ink text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(245,200,66,0.25)] hover:-translate-y-0.5 mt-8"
                  >
                    Book a Call
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                )}

                {!isActive && !program.calendly && (
                  <p className="text-ink/40 text-sm italic mt-8">Launching soon — check back here.</p>
                )}
              </RevealSection>
            </div>

            {/* Right: checkout */}
            {isActive && (
              <RevealSection delay={0.1}>
                {program.embedId ? (
                  <div className="rounded-2xl overflow-hidden border border-ink/8 shadow-[0_8px_40px_rgba(44,44,42,0.09)]">
                    <div className={`${accent.bg} border-b border-ink/8 px-6 py-3.5 flex items-center gap-2.5`}>
                      <div className={`w-2 h-2 rounded-full ${accent.dot}`} />
                      <span className="text-ink/60 text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                      {program.bump && (
                        <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sunrise/15 border border-sunrise/30 text-xs font-bold tracking-wide text-ink/70">
                          Journal add-on at checkout
                        </span>
                      )}
                    </div>
                    <div className="bg-white p-6 md:p-8">
                      <ThriveCartEmbed embedId={program.embedId} productId={program.productId} />
                    </div>
                  </div>
                ) : program.purchaseUrl ? (
                  <div className={`rounded-2xl border ${accent.border} ${accent.bg} p-8 text-center`}>
                    <p className="text-ink/60 text-sm mb-6 leading-relaxed">
                      After purchase you&apos;ll receive a Calendly link to schedule your session.
                    </p>
                    <a
                      href={program.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 bg-ink text-white text-sm font-bold px-8 py-4 rounded-full hover:bg-ink/85 transition-all duration-200 shadow-lg hover:-translate-y-0.5`}
                    >
                      Purchase — {program.price}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <div className={`rounded-2xl border ${accent.border} ${accent.bg} p-8 text-center`}>
                    <p className="text-ink/50 text-sm mb-2">Purchase link coming soon.</p>
                    <p className="text-ink/35 text-xs">
                      <Link to="/contact" className="underline underline-offset-2 hover:text-ink transition-colors">Contact Osil</Link> to reserve your spot now.
                    </p>
                  </div>
                )}
              </RevealSection>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
