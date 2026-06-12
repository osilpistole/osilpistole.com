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
            Which of the five<br/><span className="text-sunrise">are you?</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Apostle, Prophet, Evangelist, Pastor, Teacher. Five callings. One you carry more than the others. This free 5-minute assessment names yours.
          </p>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
          >
            Discover My Calling →
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
              Most leaders are trying to be all five.<br/>You weren&apos;t built that way.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                Ephesians 4 names five callings — Apostle, Prophet, Evangelist, Pastor, Teacher. Each one builds the church in a different way. None is greater than another.
              </p>
              <p>
                The exhaustion most leaders carry comes from trying to operate in all five at once. The clarity comes from knowing which one is primarily yours — and which ones need someone else.
              </p>
              <p className="text-ink font-medium">
                This assessment ranks all five for you. The top one is where you should be spending most of your energy. The lower ones name where you need a team.
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
              Five callings.<br/>You carry one.
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
              { num: '02', title: 'See your top calling',       body: 'All five ranked, with your primary calling named and described.' },
              { num: '03', title: 'Get a way to lead from it',  body: 'Practical guidance on how to operate from your calling — and where you need others.' },
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
              5 minutes. Free. No email. You&apos;ll have your primary calling — and the relief of finally knowing where to put your energy.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Discover My Calling →
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
