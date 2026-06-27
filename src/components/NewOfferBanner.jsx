import { Link } from 'react-router-dom'
import RevealSection from './RevealSection'

// Featured callout for the Website + Product Build offer.
// Drop above existing service grids on Home + Work With Me until first 2
// builds are booked + delivered, then convert to a standard service card.
export default function NewOfferBanner() {
  return (
    <section className="px-6 lg:px-10 py-14 md:py-20 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <Link
            to="/build"
            className="group relative block rounded-3xl bg-sunrise overflow-hidden border-2 border-ink/10 hover:border-ink/30 hover:shadow-xl transition-all duration-300"
          >
            {/* Decorative oversized text */}
            <p
              className="absolute bottom-0 right-0 font-heading text-[14vw] md:text-[8vw] font-black text-ink/[0.07] leading-none select-none pointer-events-none translate-y-3"
              aria-hidden="true"
            >
              BUILD
            </p>
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #2C2C2A 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
              aria-hidden="true"
            />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center p-7 md:p-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-ink text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunrise animate-pulse" />
                    New offer
                  </span>
                  <span className="text-ink/55 text-[11px] font-semibold uppercase tracking-[0.18em]">Two slots a month</span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink tracking-tight leading-[1.15] mb-3">
                  Website + Product Builds — done with AI, in your voice.
                </h3>
                <p className="text-ink/70 text-[15px] leading-relaxed max-w-2xl">
                  Coaches, consultants, ministries, small businesses, and creators — your site should sound like your work. Four tiers from $1,500. Ships in 3 days to 3 weeks. Built on your platform or a fresh one.
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end gap-3 md:text-right">
                <span className="font-heading text-3xl md:text-4xl font-black text-ink leading-none">
                  $2,500
                </span>
                <span className="text-ink/55 text-xs">most popular tier</span>
                <span className="inline-flex items-center gap-2 mt-1 md:mt-2 text-ink font-bold text-sm group-hover:gap-3 transition-all">
                  See the offer
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </RevealSection>
      </div>
    </section>
  )
}
