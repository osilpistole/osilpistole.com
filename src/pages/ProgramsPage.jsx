import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'
import { programs, freeResources, accentMap } from '../data/programs'

// Override the generic /programs/:slug route for products that have
// their own dedicated marketing landing page. Anything not listed here
// falls through to /programs/:slug.
const LANDING_PAGE = {
  'awaken-and-align': '/awaken-and-align',
  'awaken-journal':   '/awaken-journal',
  'bundle':           '/awaken-and-align', // bundle is sold prominently from the series page
  'presence':         '/presence',
  '30-days-done':     '/30-days-done',
  'ad-strategy':      '/ad-strategy',
  'build':            '/build',
}

export default function ProgramsPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 md:pt-44 px-6 lg:px-14 bg-ink text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-sunrise text-xs font-bold uppercase tracking-[0.25em] mb-6">Products &amp; Resources</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight md:leading-[1.05] tracking-tight max-w-3xl">
              You know there&apos;s more.<br />
              <span className="gradient-text-animated">Let&apos;s find it together.</span>
            </h1>
            <p className="mt-8 text-white/80 text-lg leading-relaxed max-w-xl">
              Guided tools for the person who feels pulled toward something bigger but can&apos;t quite name it yet. No fluff — just focused work that moves you forward.
            </p>
          </RevealSection>

          {/* Category strip */}
          <div className="mt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4" role="list" aria-label="Product categories">
            {['Meditations', 'Courses', 'Coaching', 'Mentorship'].map((cat, i) => (
              <div
                key={cat}
                role="listitem"
                className={`py-5 px-4 md:px-6 flex items-center gap-3 border-white/10
                  ${i > 0 ? 'border-l' : ''}
                  ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
              >
                <div aria-hidden="true" className={`w-1.5 h-1.5 rounded-full shrink-0 ${['bg-sunrise', 'bg-growth', 'bg-morning', 'bg-white/60'][i]}`} />
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catalog grid ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {programs.filter((p) => p.status === 'active').map((program, i) => {
              const accent = accentMap[program.accent] ?? accentMap.sunrise

              return (
                <RevealSection key={program.slug} delay={i * 0.08}>
                  <div className={`group relative rounded-3xl overflow-hidden border ${accent.border} bg-white shadow-[0_2px_24px_rgba(44,44,42,0.07)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(44,44,42,0.13)] hover:-translate-y-1 flex flex-col h-[480px]`}>

                    {/* Photo */}
                    <div className="relative overflow-hidden h-56 shrink-0">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className={`w-8 h-0.5 rounded-full ${accent.dot} mb-4`} />
                      <h2 className="font-heading text-xl font-bold text-ink leading-snug mb-1">{program.shortTitle}</h2>

                      {/* Price — moved out of photo for readability */}
                      <div className={`inline-flex items-baseline gap-2 mb-3`}>
                        <span className={`font-heading text-2xl font-black ${accent.text}`}>{program.price}</span>
                        <span className="text-ink/40 text-xs font-medium">{program.priceNote}</span>
                      </div>

                      <p className="text-ink/70 text-sm leading-relaxed flex-1 mb-6">{program.tagline}</p>

                      <Link
                        to={LANDING_PAGE[program.slug] ?? `/programs/${program.slug}`}
                        aria-label={`Learn more — ${program.shortTitle}`}
                        className={`inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${accent.bg} border ${accent.border} ${accent.text} hover:brightness-95 hover:-translate-y-0.5`}
                      >
                        {LANDING_PAGE[program.slug] ? 'Learn More' : 'Get Access'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </RevealSection>
              )
            })}
          </div>

          {/* Free Resources */}
          <RevealSection>
            <div className="border-t border-ink/10 pt-12 mb-12">
              <p className="text-ink/40 text-xs font-bold uppercase tracking-widest mb-6">Free Resources</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {freeResources.map((resource) => (
                  <div key={resource.slug} className="group flex items-center gap-5 bg-white border border-ink/8 rounded-2xl p-5 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(245,200,66,0.1)] transition-all duration-200">
                    <div className="text-3xl shrink-0">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-ink text-base leading-snug mb-1">{resource.title}</h3>
                      <p className="text-ink/50 text-sm leading-relaxed">{resource.tagline}</p>
                    </div>
                    <Link
                      to={resource.link}
                      className="shrink-0 inline-flex items-center gap-1.5 bg-gold/15 border border-gold/35 text-ink font-heading font-bold text-xs px-4 py-2 rounded-lg hover:bg-gold hover:border-gold transition-all duration-200 whitespace-nowrap"
                    >
                      {resource.cta}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Coming soon note */}
          <RevealSection>
            <div className="border-t border-ink/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-growth/20 border border-growth/35 text-xs font-bold uppercase tracking-wider text-growth shrink-0">
                <span className="w-1 h-1 rounded-full bg-growth animate-pulse" />
                Coming Soon
              </span>
              <p className="text-ink/55 text-sm">
                Mentorship is on the way.{' '}
                <Link to="/contact" className="text-ink/70 underline underline-offset-2 hover:text-ink transition-colors">
                  Get in touch
                </Link>{' '}
                if you&apos;d like to know when it launches.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
