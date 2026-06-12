import { useEffect, useRef, useState } from 'react'
import FivefoldQuiz from '../components/FivefoldQuiz'

const HERO_IMG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=88'

const ROLES = [
  { icon: '🌍', name: 'Apostle',    tagline: 'The Pioneer',  desc: 'Sent to break new ground and build what doesn\'t exist yet.' },
  { icon: '👁️', name: 'Prophet',    tagline: 'The Voice',    desc: 'Carries what God is saying and speaks it even when it costs.' },
  { icon: '⚡', name: 'Evangelist', tagline: 'The Flame',    desc: 'Burns for the lost and makes the gospel feel like good news.' },
  { icon: '🕊️', name: 'Pastor',     tagline: 'The Shepherd', desc: 'Stays with people through every season — the long-haul carrier.' },
  { icon: '📜', name: 'Teacher',    tagline: 'The Root',     desc: 'Anchors the body in truth with clarity that gives people roots.' },
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

export default function FivefoldPage() {
  const [quizStarted, setQuizStarted] = useState(false)

  if (quizStarted) return <FivefoldQuiz skipIntro={true} />

  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.55) 60%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            5-Fold Ministry Assessment · Free
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(44px,8vw,84px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.4)' }}
          >
            Which of the five<br/><span className="text-sunrise">do you lean toward?</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Apostle, Prophet, Evangelist, Pastor, Teacher. Five ministry callings, each one different. This free 5-minute assessment shows you which one you most resonate with — a starting point worth taking to your community.
          </p>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
          >
            See What I Lean Toward →
          </button>

          <p className="mt-7 font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            25 questions · 5 minutes · No email required
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
              Most leaders are trying to be all five.<br/>You probably lean toward one.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                Ephesians 4 names five callings — Apostle, Prophet, Evangelist, Pastor, Teacher. Each one builds the church in a different way. None is greater than another.
              </p>
              <p>
                Most of us lean toward one of them. This assessment is a way of naming that leaning — what you resonate with most when you read the descriptions, how you tend to show up when you&apos;re leading, and where your instincts naturally go.
              </p>
              <p className="text-ink font-medium">
                A score doesn&apos;t declare a calling — your community does. But knowing which way you lean is a good starting point for a real conversation with the people God has put around you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE 5 CALLINGS ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">The Five</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Five callings.<br/>Which one feels most like you?
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ROLES.map((role, i) => (
              <Reveal key={role.name} delay={Math.min(i * 0.06, 0.3)}>
                <div className="bg-white border border-ink/8 rounded-2xl p-5 h-full hover:border-sunrise/40 hover:shadow-[0_8px_28px_rgba(245,200,66,0.10)] transition-all">
                  <div className="text-2xl mb-3">{role.icon}</div>
                  <h3 className="font-heading font-bold text-ink text-base mb-1">{role.name}</h3>
                  <p className="text-sunrise text-[10px] font-bold uppercase tracking-wider mb-2">{role.tagline}</p>
                  <p className="text-ink/55 text-[13px] leading-relaxed">{role.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── A NOTE ON TESTS LIKE THIS ──────────────────────────── */}
      <section className="py-20 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-parchment border border-sunrise/25 rounded-3xl p-8 md:p-10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-sunrise text-ink font-heading text-[10px] font-bold uppercase tracking-[0.28em] px-4 py-1.5 rounded-full inline-block">
                  An honest note
                </span>
              </div>
              <h3
                className="text-ink leading-[1.2] mb-5 text-[clamp(22px,3.2vw,32px)] font-light italic text-center mt-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                A score does not make a 5-Fold calling.
              </h3>
              <div className="space-y-4 text-ink/65 text-[15px] leading-relaxed">
                <p>
                  Apostle. Prophet. Evangelist. Pastor. Teacher. These are real callings — recognized, affirmed, and shaped in community with leaders who know you. They are not labels a quiz can hand you.
                </p>
                <p>
                  What this assessment <em>can</em> do is name what you already sense — which of the five you resonate with most, where your instincts naturally go, what you&apos;re drawn to do when you&apos;re leading. That is genuinely useful information.
                </p>
                <p className="text-ink font-medium">
                  Take what you learn here into a conversation with the people God has put around you — your local community, your pastor, leaders you trust. Let them confirm it, refine it, or gently push back. That is how the 5-Fold actually works.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">How it works</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Three steps. Five minutes.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Answer 25 short questions', body: 'Five questions per calling. Honest answers, not careful ones.' },
              { num: '02', title: 'See which one you lean toward', body: 'All five ranked, with the one you most resonate with named and described.' },
              { num: '03', title: 'Get a starting point for community', body: 'A clear way to begin the conversation with the leaders God has put around you.' },
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
              Stop trying to be<br/><span className="text-sunrise">all five.</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
              5 minutes. Free. No email. You&apos;ll see what you lean toward — and have a real starting point to take to your community.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              See What I Lean Toward →
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
