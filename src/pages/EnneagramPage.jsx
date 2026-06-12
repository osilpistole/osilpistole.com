import { useEffect, useRef, useState } from 'react'
import EnneagramQuiz from '../components/EnneagramQuiz.jsx'

const HERO_IMG = 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=2400&q=88'

const TYPES = [
  { n: 1, name: 'The Reformer',     short: 'Principled, purposeful, self-controlled' },
  { n: 2, name: 'The Helper',       short: 'Generous, demonstrative, people-pleasing' },
  { n: 3, name: 'The Achiever',     short: 'Adaptable, excelling, driven' },
  { n: 4, name: 'The Individualist',short: 'Expressive, dramatic, self-absorbed' },
  { n: 5, name: 'The Investigator', short: 'Perceptive, innovative, secretive' },
  { n: 6, name: 'The Loyalist',     short: 'Engaging, responsible, anxious' },
  { n: 7, name: 'The Enthusiast',   short: 'Spontaneous, versatile, scattered' },
  { n: 8, name: 'The Challenger',   short: 'Self-confident, decisive, confrontational' },
  { n: 9, name: 'The Peacemaker',   short: 'Receptive, reassuring, complacent' },
]

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
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
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function EnneagramPage() {
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    document.title = 'The Enneagram for Business Quiz · Osil Pistole'
  }, [])

  if (quizStarted) return <div className="pt-24"><EnneagramQuiz /></div>

  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.55) 60%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            The Enneagram for Business Quiz · Free
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(48px,9vw,96px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.4)' }}
          >
            How are you<br/><span className="text-sunrise">actually wired?</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            The Enneagram is a personality framework that names <em>why</em> you do what you do — not just what you do. This free 8-minute quiz identifies your type, your wing, and what each one means for the business, ministry, or mentorship you&apos;re built to lead.
          </p>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
          >
            Take the Quiz — Free →
          </button>

          <p className="mt-7 font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            36 questions · 8 minutes · Results emailed
          </p>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── WHY THIS QUIZ EXISTS ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-6">Why this exists</p>
            <h2
              className="text-ink leading-[1.12] mb-8 text-[clamp(32px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Most personality tests<br/>tell you what you already know.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                The Enneagram is different. It doesn&apos;t describe your behavior — it names the <em>motivation underneath</em> it. The thing you&apos;re afraid of. The thing you keep reaching for. The pattern that runs your life when you&apos;re not paying attention.
              </p>
              <p>
                Once you know your type, a lot of what you&apos;ve been frustrated about in yourself stops being a mystery. And the kind of business, ministry, or work you&apos;re built to lead becomes much more obvious.
              </p>
              <p className="text-ink font-medium">
                This version is written specifically for people building something — entrepreneurs, ministry leaders, creatives. Same Enneagram framework. Different lens.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9 TYPES GRID ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">The Nine Types</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Nine types.<br/>One of them is you.
            </h2>
            <p className="text-ink/55 mt-4 max-w-lg mx-auto leading-relaxed">
              Each type has its own gift and its own blind spot. Knowing yours changes how you build, lead, and grow.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TYPES.map((t, i) => (
              <Reveal key={t.n} delay={Math.min(i * 0.05, 0.3)}>
                <div className="bg-white border border-ink/8 rounded-2xl p-5 h-full hover:border-sunrise/40 hover:shadow-[0_8px_28px_rgba(245,200,66,0.10)] transition-all">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className="text-sunrise font-light italic text-3xl leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >{t.n}</span>
                    <h3 className="font-heading font-bold text-ink text-base">{t.name}</h3>
                  </div>
                  <p className="text-ink/55 text-[13px] leading-relaxed">{t.short}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">How it works</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Three steps. Eight minutes.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Answer 36 short questions', body: 'Honest answers, not careful ones. Four questions per type.' },
              { num: '02', title: 'See your type + wing',       body: 'Your dominant type, your supporting wing, and what they mean together.' },
              { num: '03', title: 'Get the business lens',      body: 'How your type shows up in what you build, who you serve, and where you get stuck.' },
            ].map(s => (
              <Reveal key={s.num}>
                <div className="bg-parchment border border-ink/8 rounded-2xl p-7 h-full hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all">
                  <p
                    className="text-sunrise text-3xl font-light italic mb-3 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >{s.num}</p>
                  <h3 className="font-heading font-bold text-ink mb-3 text-base">{s.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 lg:px-16 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(245,200,66,0.14), transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)' }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <Reveal>
            <h2
              className="leading-[1.05] mb-8 text-[clamp(40px,6vw,72px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Know yourself.<br/><span className="text-sunrise">Build accordingly.</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
              8 minutes. Free. Your type, your wing, and exactly what they mean for what you&apos;re building.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Take the Quiz — Free →
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
