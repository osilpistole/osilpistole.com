import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const HERO_IMG = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2400&q=88'

const QUIZZES = [
  {
    slug: 'calling',
    title: 'The Calling Quiz',
    eyebrow: '10 minutes · AI conversation',
    tagline: 'Get a one-line mission statement — who you serve, what you do, what changes for them — in three different voices so you can pick the one that sounds like you.',
    href: '/calling',
    cta: 'Start the Quiz',
    isNew: true,
  },
  {
    slug: 'quiz',
    title: 'AI Build Quiz',
    eyebrow: '12 minutes · AI conversation',
    tagline: 'Wondering what to build first — a course, a mentorship, a workshop? Get a specific recommendation tailored to your strengths, audience, and season.',
    href: '/quiz',
    cta: 'Start the Quiz',
  },
  {
    slug: 'spiritual-gifts',
    title: 'Spiritual Gifts Assessment',
    eyebrow: '5 minutes · 36 questions',
    tagline: 'Discover your top three spiritual gifts and how to walk in them on purpose. Nine gifts. Your top three revealed instantly.',
    href: '/spiritual-gifts',
    cta: 'Take the Test',
  },
  {
    slug: 'fivefold',
    title: '5-Fold Ministry Assessment',
    eyebrow: '5 minutes · 25 questions',
    tagline: 'See which of the five ministry callings — Apostle, Prophet, Evangelist, Pastor, Teacher — you most lean toward. A starting point worth taking to your community.',
    href: '/fivefold',
    cta: 'Take the Test',
  },
  {
    slug: 'enneagram',
    title: 'Enneagram for Business',
    eyebrow: '8 minutes · 36 questions',
    tagline: 'Identify your Enneagram type and wing — and what each one means for the business, ministry, or mentorship you are built to lead.',
    href: '/enneagram',
    cta: 'Take the Quiz',
  },
]

export default function FreePage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[78svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.34) 0%, rgba(20,19,17,0.55) 60%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-28">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            Free Tools · Five Assessments
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(44px,8vw,88px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.4)' }}
          >
            Built to help you<br/><span className="text-sunrise">find yourself fast.</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Five free assessments — built to give you clarity in under 15 minutes. Pick the one that fits where you are.
          </p>

          <p className="font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            No payment · No catch
          </p>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── THE 5 QUIZZES GRID ──────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">

          <RevealSection className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">Pick one</p>
            <h2
              className="text-ink leading-[1.1] mb-6 text-[clamp(32px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              All five. None of them take long.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-xl mx-auto">
              Each one gives you a specific kind of clarity. Start with the question you most want answered.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-5">
            {QUIZZES.map((q, i) => (
              <RevealSection key={q.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  to={q.href}
                  className="group block bg-white border border-ink/8 rounded-3xl p-7 h-full hover:border-sunrise/40 hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Gold accent strip on the top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sunrise/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* NEW badge */}
                  {q.isNew && (
                    <div className="absolute top-5 right-5">
                      <span className="bg-sunrise text-ink font-heading text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full">
                        New
                      </span>
                    </div>
                  )}

                  <p className="font-heading text-[9px] font-bold uppercase tracking-[0.28em] text-sunrise mb-3">
                    {q.eyebrow}
                  </p>

                  <h3
                    className="text-ink leading-[1.1] mb-4 text-[clamp(22px,2.8vw,30px)] font-light italic"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {q.title}
                  </h3>

                  <p className="text-ink/60 text-[14px] leading-relaxed mb-7">
                    {q.tagline}
                  </p>

                  <span className="inline-flex items-center gap-2 text-ink font-heading font-bold text-sm group-hover:text-[#8a6500] transition-colors">
                    {q.cta}
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── A SOFT CTA AT THE BOTTOM ─────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6 lg:px-16 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(245,200,66,0.12), transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)' }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <RevealSection>
            <h2
              className="leading-[1.05] mb-7 text-[clamp(28px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Want help acting on<br/><span className="text-sunrise">what you find?</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
              A 60-minute strategy session turns insight into a specific plan — your next step, named and walked through together.
            </p>
            <a
              href="https://osilpistole.thrivecart.com/prophetic-strategy-session/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-sm px-7 py-3 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Strategy Session — $99 →
            </a>
            <p className="text-white/35 text-[11px] mt-3">Cost credited if you decide to work with Osil after.</p>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
