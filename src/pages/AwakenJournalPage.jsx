import { useEffect, useRef, useState } from 'react'
import BuyModal, { openBuyModal, preloadCheckoutOrigin } from '../components/BuyModal.jsx'

const TC_JOURNAL_URL = 'https://osilpistole.thrivecart.com/awaken-and-align-meditation-journal/'
const TC_SERIES_URL  = 'https://osilpistole.thrivecart.com/awaken-and-align-meditation-series/'
const TC_BUNDLE_URL  = 'https://osilpistole.thrivecart.com/awaken-and-align-bundle/'
const PORTAL_URL     = 'https://members.osilpistole.com/login'

// Same serene image as the Series landing page — keeps the brand cohesive.
const HERO_IMG = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2400&auto=format&fit=crop&q=85'
const CTA_BG   = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2400&auto=format&fit=crop&q=85'

const SESSIONS = [
  "Hearing God's Voice",
  "Breaking Free from Fear",
  "Embracing Your Unique Calling",
  "Walking in Boldness and Confidence",
  "Aligning with God's Vision",
  "Surrendering to God's Timing",
  "Rooted and Grounded",
  "Speaking What You Believe",
  "Moving in Faith",
  "Living Awakened and Aligned",
]

const SAMPLE_QUESTIONS = [
  "When you sit in silence, what rises in you — peace, restlessness, or something else?",
  "Think of a time you knew God was speaking. What did that feel like — and what did you do with it?",
  "What's one place in your life where you've been waiting for someone else's permission to act?",
  "If you trusted that you already heard God on this, what would change tomorrow?",
]

const INCLUDED = [
  '10 dedicated spreads — one per meditation session',
  '4 deep reflection questions per session, with space to write',
  '"What is God saying?" prompt after every session',
  '3 actionable steps for each session — to take into your week',
  'A bold declaration per session, written for you to speak aloud',
  'Auto-saves as you write inside your member portal',
  'Download any entry as a beautifully formatted PDF',
  'Lifetime access — return as many times as you need',
]

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

function BuyButton({ href, children, variant = 'gold', className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full transition-all duration-300 px-8 py-3.5 text-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
  const variants = {
    gold: 'bg-sunrise text-ink shadow-[0_4px_24px_rgba(245,200,66,0.32)] hover:shadow-[0_8px_36px_rgba(245,200,66,0.5)] hover:bg-[#f0be2e]',
    outlineDark: 'border-2 border-white/22 text-white/80 hover:border-sunrise/70 hover:text-sunrise backdrop-blur-sm',
    outlineLight: 'border-2 border-ink/18 text-ink/70 hover:border-ink/35 hover:bg-ink/4',
  }
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); openBuyModal(href) }}
      onMouseEnter={() => preloadCheckoutOrigin(href)}
      onFocus={() => preloadCheckoutOrigin(href)}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

function scrollToId(id, e) {
  if (e) e.preventDefault()
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

export default function AwakenJournalPage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      <BuyModal />

      <style>{`
        .aa-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes aa-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .aa-u1 { opacity: 0; animation: aa-up 0.95s ease 0.25s forwards; }
        .aa-u2 { opacity: 0; animation: aa-up 1.05s ease 0.5s forwards; }
        .aa-u3 { opacity: 0; animation: aa-up 0.9s ease 0.85s forwards; }
        .aa-u4 { opacity: 0; animation: aa-up 0.9s ease 1.1s forwards; }
        .aa-u5 { opacity: 0; animation: aa-up 0.9s ease 1.35s forwards; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${HERO_IMG}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.48) 55%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 45% at 50% 38%, rgba(245,200,66,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035, backgroundImage: GRAIN }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-28 pb-24">
          <p className="aa-u1 font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-8">
            The Companion Journal
          </p>

          <h1 className="aa-u2 aa-display text-[clamp(56px,9.5vw,112px)] font-light italic text-white leading-[0.94] tracking-tight mb-10" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.35)' }}>
            Awaken &amp; Align<br />
            <span className="text-sunrise">Journal</span>
          </h1>

          <p className="aa-u3 text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-12" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            What you heard. What He said. What you do next. The pages that hold it so the moment doesn&apos;t fade.
          </p>

          <div className="aa-u4 flex flex-col sm:flex-row gap-3 justify-center">
            <BuyButton href={TC_JOURNAL_URL} variant="gold">
              Get the Journal — $27
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </BuyButton>
            <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Meditation Series · Bundle $67</BuyButton>
          </div>

          <div className="aa-u5 mt-10 flex flex-wrap items-center justify-center gap-2.5 text-[11px]">
            <a href="#peek" onClick={(e) => scrollToId('peek', e)} className="px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/22 text-white/85 hover:bg-white/22 transition-all">
              See inside →
            </a>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── THE WHY ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-6">Why the Journal Exists</p>
            <h2 className="aa-display text-[clamp(32px,4.5vw,52px)] font-light italic text-ink leading-[1.12] mb-8">
              Most people hear something powerful — and forget it by morning.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                You sit through a session. God says something. It lands. You feel it.
              </p>
              <p>
                Then life happens. The notifications come back. Someone needs you. By that evening, the clarity is already fading and by next week you can&apos;t quite remember what He said.
              </p>
              <p className="text-ink font-medium">
                The journal is what makes it stick. The reflection questions slow you down enough to actually hear yourself answer. The declarations turn a moment into a muscle. The action steps mean you don&apos;t walk away with insight you never use.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SEE INSIDE — journal spread mockup ─────────────────────── */}
      <section id="peek" className="py-24 md:py-32 px-6 lg:px-16 bg-parchment relative">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">See Inside</p>
            <h2 className="aa-display text-[clamp(32px,4.5vw,56px)] font-light italic text-ink leading-[1.08]">
              One dedicated spread<br/>for every session.
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">

            {/* Journal mockup */}
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 bg-sunrise/8 rounded-3xl blur-2xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-white shadow-[0_24px_64px_rgba(44,44,42,0.14)]">
                  <div className="h-1 bg-gradient-to-r from-sunrise/50 via-sunrise to-sunrise/50" />

                  <div className="px-6 py-4 border-b border-ink/6 bg-[#FDFCF8] flex items-center justify-between">
                    <div>
                      <p className="aa-display text-lg italic text-ink font-medium">Awaken &amp; Align</p>
                      <p className="font-heading text-[9px] font-bold uppercase tracking-[0.25em] text-ink/35 mt-0.5">Meditation Journal</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-sunrise/14 border border-sunrise/24 flex items-center justify-center">
                      <span className="font-heading text-[10px] font-bold text-sunrise">1</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-heading text-[8px] font-bold uppercase tracking-[0.28em] text-sunrise mb-4">Session 1 — Hearing God&apos;s Voice</p>
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.24em] text-ink/50 mb-3">Reflection Questions</p>
                    <div className="space-y-3 mb-5">
                      {SAMPLE_QUESTIONS.slice(0, 2).map((q, i) => (
                        <div key={i} className="border border-ink/7 rounded-xl p-4 bg-parchment/50">
                          <p className="text-ink/55 text-[11.5px] leading-relaxed mb-3">{q}</p>
                          <div className="space-y-1.5">
                            <div className="h-1 bg-ink/7 rounded-full" />
                            <div className="h-1 bg-ink/5 rounded-full w-4/5" />
                            <div className="h-1 bg-ink/4 rounded-full w-3/5" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#141311] rounded-xl p-4 mb-4">
                      <p className="font-heading text-[8px] font-bold uppercase tracking-[0.22em] text-sunrise/75 mb-2">Your Declaration</p>
                      <p className="aa-display italic text-white/70 text-sm leading-relaxed mb-3">
                        &ldquo;I hear God&apos;s voice clearly. His word rises above the noise, and I am learning to recognize it, trust it, and act on it.&rdquo;
                      </p>
                      <span className="font-heading text-[8px] font-bold uppercase tracking-wider text-sunrise border border-sunrise/28 rounded-full px-3 py-1 inline-block">
                        Speak it aloud →
                      </span>
                    </div>

                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.24em] text-ink/50 mb-3">Action Steps This Week</p>
                    <div className="space-y-2">
                      {['Sit in silence for 5 minutes daily', 'Write one thing you heard each day', 'Share one thing you heard with someone'].map((s, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="mt-1 w-4 h-4 rounded-md border border-sunrise/35 flex-shrink-0" />
                          <p className="text-ink/55 text-[11.5px] leading-relaxed">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Description of the structure */}
            <Reveal delay={0.1}>
              <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">Every Spread Has</p>
              <h3 className="aa-display text-[clamp(28px,3.6vw,40px)] font-light italic text-ink leading-[1.18] mb-6">
                Reflection. Declaration. Action.
              </h3>
              <ul className="space-y-4">
                {[
                  { h: 'Four questions worth sitting with', sub: 'Not filler — questions that pull what God said up to the surface.' },
                  { h: 'A declaration written to be spoken', sub: 'You read it aloud until it lands in your bones.' },
                  { h: 'Three actions for this week', sub: "Specific. Concrete. So you don't walk away with insight you never use." },
                  { h: 'Auto-saves in the portal — or print', sub: 'Type it. Save it. Download it as a beautiful PDF whenever you want.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sunrise/15 border border-sunrise/35 flex-shrink-0">
                      <svg className="w-3 h-3 text-sunrise" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <p className="font-heading text-[14px] font-semibold text-ink mb-0.5">{item.h}</p>
                      <p className="text-ink/52 text-[13px] leading-relaxed">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <BuyButton href={TC_JOURNAL_URL} variant="gold">Get the Journal — $27</BuyButton>
                <BuyButton href={TC_BUNDLE_URL} variant="outlineLight">+ Series · Bundle $67</BuyButton>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── ALL TEN SPREADS ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-[#141311] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.22), transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: GRAIN }} />

        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise/55 mb-5">All Ten Spreads</p>
            <h2 className="aa-display text-[clamp(32px,4.5vw,56px)] font-light italic text-white leading-[1.08]">
              One for every session of the series.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {SESSIONS.map((title, i) => (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.32)}>
                <div className="relative p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-sunrise/30 hover:bg-white/[0.06] transition-all h-full">
                  <p className="aa-display text-2xl font-light italic text-sunrise/65 leading-none mb-3">0{i < 9 ? i + 1 : 10}</p>
                  <p className="font-heading text-[12px] font-semibold text-white/80 leading-snug">{title}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="text-center mt-14">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BuyButton href={TC_JOURNAL_URL} variant="gold">Get the Journal — $27</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Series · Bundle $67</BuyButton>
            </div>
            <p className="text-white/30 text-[11px] mt-3">Bundle saves $7 vs buying separately.</p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">What&apos;s Included</p>
            <h2 className="aa-display text-[clamp(34px,4.5vw,52px)] font-light italic leading-[1.08] mb-6">
              The whole journal,<br/>yours for life.
            </h2>
            <div className="space-y-4 text-ink/60 text-[15px] leading-relaxed">
              <p>Type your answers directly in your member portal. Auto-saves. Come back anytime.</p>
              <p>Download any spread (or the whole journal) as a beautifully formatted PDF — print it, fill it in by hand, keep it on your shelf.</p>
              <p className="text-ink font-medium">No subscription, no upsells. One time, lifetime access.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <BuyButton href={TC_JOURNAL_URL} variant="gold">Get the Journal — $27</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineLight">+ Series · Bundle $67</BuyButton>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="space-y-3">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white border border-ink/6 rounded-xl px-5 py-4">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sunrise flex-shrink-0" />
                  <span className="text-ink/75 text-[14px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── PAIR IT (cross-sell to Series + Bundle) ────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">Pair It Up</p>
            <h2 className="aa-display text-[clamp(32px,4.5vw,52px)] font-light italic text-ink leading-[1.08]">
              The journal works alone.<br/>It works deeper with the series.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Series only */}
            <Reveal>
              <div className="bg-parchment border border-ink/8 rounded-3xl p-7 h-full flex flex-col">
                <p className="font-heading text-[9px] font-bold uppercase tracking-wider text-ink/35 mb-4">Just the Series</p>
                <div className="flex items-end gap-1.5 mb-4">
                  <span className="aa-display text-[44px] font-light italic text-ink leading-none">$47</span>
                  <span className="text-ink/30 text-sm mb-2">one-time</span>
                </div>
                <p className="text-ink/50 text-[13px] mb-6 leading-relaxed">All 10 guided meditation videos. Lifetime access in your private member portal.</p>
                <div className="mt-auto">
                  <BuyButton href={TC_SERIES_URL} variant="outlineLight" className="w-full justify-center text-[12px]">Get the Series</BuyButton>
                  <p className="text-ink/35 text-[11px] mt-3 text-center">Pure audio. No writing.</p>
                </div>
              </div>
            </Reveal>

            {/* Bundle — best value */}
            <Reveal delay={0.1}>
              <div className="bg-[#141311] rounded-3xl p-7 h-full flex flex-col relative overflow-hidden shadow-[0_16px_48px_rgba(20,19,17,0.22)]">
                <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(245,200,66,0.35), rgba(245,200,66,1), rgba(245,200,66,0.35))' }} />
                <div className="absolute top-4 right-5">
                  <span className="font-heading text-[8px] font-bold uppercase tracking-wider bg-sunrise/14 text-sunrise border border-sunrise/28 px-2.5 py-1 rounded-full">Save $7</span>
                </div>
                <p className="font-heading text-[9px] font-bold uppercase tracking-wider text-white/28 mb-4">Series + This Journal</p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="aa-display text-[44px] font-light italic text-white leading-none">$67</span>
                  <span className="text-white/25 text-sm mb-2">one-time</span>
                </div>
                <p className="text-white/38 text-[13px] mb-6 leading-relaxed">Audio + the journal — the moment AND the place to hold it. Lifetime access to both.</p>
                <div className="mt-auto">
                  <BuyButton href={TC_BUNDLE_URL} variant="gold" className="w-full justify-center text-[12px]">Get the Bundle</BuyButton>
                  <p className="text-sunrise/55 text-[11px] mt-3 text-center font-heading">Best value.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="text-center mt-10">
            <p className="text-ink/45 text-[13px]">
              Already have the series?{' '}
              <a
                href={TC_JOURNAL_URL}
                onClick={(e) => { e.preventDefault(); openBuyModal(TC_JOURNAL_URL) }}
                className="underline underline-offset-4 text-ink/75 hover:text-ink"
              >
                Add the journal alone for $27 →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-44 px-6 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${CTA_BG}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.78) 0%, rgba(20,19,17,0.86) 50%, rgba(20,19,17,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(245,200,66,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.25), transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.032, backgroundImage: GRAIN }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.38em] text-sunrise/55 mb-10">Hold what you receive</p>
            <h2 className="aa-display text-[clamp(48px,8vw,92px)] font-light italic text-white leading-[0.95] mb-10">
              Don&apos;t let it<br />
              <span className="text-sunrise">fade.</span>
            </h2>
            <p className="text-white/35 text-[15px] leading-[1.75] max-w-md mx-auto mb-12">
              The pages that turn a moment of clarity into a way of living.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <BuyButton href={TC_JOURNAL_URL} variant="gold">Get the Journal — $27</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Series · Bundle $67</BuyButton>
            </div>
            <p className="mt-6 text-white/30 text-[11px]">
              Already enrolled? <a href={PORTAL_URL} className="underline underline-offset-4 hover:text-white/60">Log in here</a>
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
