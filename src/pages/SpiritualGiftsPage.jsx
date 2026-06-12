import { useEffect, useRef, useState } from 'react'
import SpiritualGiftsQuiz from '../components/SpiritualGiftsQuiz'

const HERO_IMG = 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=2400&q=88'

const GIFTS = [
  { icon: '📖', name: 'Teaching',      desc: 'Making God\'s Word come alive for others.' },
  { icon: '🧭', name: 'Leadership',    desc: 'Seeing where God is calling and mobilizing others.' },
  { icon: '🌱', name: 'Encouragement', desc: 'Calling people forward into their God-given potential.' },
  { icon: '🤲', name: 'Mercy',         desc: 'Sitting with people in pain and reflecting Jesus.' },
  { icon: '⚡', name: 'Faith',         desc: 'Trusting God in ways that defy what can be seen.' },
  { icon: '🎁', name: 'Giving',        desc: 'Stewarding resources as a conduit for the kingdom.' },
  { icon: '🛠', name: 'Service',       desc: 'Meeting practical needs and making ministry possible.' },
  { icon: '💡', name: 'Wisdom',        desc: 'Applying spiritual insight to real-life situations.' },
  { icon: '🔥', name: 'Prophecy',      desc: 'Speaking God\'s truth boldly when others hold back.' },
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

export default function SpiritualGiftsPage() {
  const [quizStarted, setQuizStarted] = useState(false)

  if (quizStarted) return <SpiritualGiftsQuiz skipIntro={true} />

  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.55) 60%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            Spiritual Gifts Assessment · Free
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(48px,9vw,96px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.4)' }}
          >
            What gifts<br/><span className="text-sunrise">were you given?</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            God placed specific gifts inside you on purpose. This free 5-minute assessment identifies your top three — and shows you how to walk in them on purpose.
          </p>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
          >
            Take the Free Test →
          </button>

          <p className="mt-7 font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            36 questions · 5 minutes · No email required
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
              You weren&apos;t handed a generic kit.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                Most of us walk around vaguely knowing we&apos;re &ldquo;supposed to be doing something,&rdquo; with a quiet hunch that we&apos;ve been given more than we&apos;re using.
              </p>
              <p>
                You have. God didn&apos;t hand out the same starter pack to everyone. He placed specific gifts in you, on purpose, for a reason.
              </p>
              <p className="text-ink font-medium">
                This assessment names your top three. Once you can see them clearly, you stop guessing about where to invest your time and start building from what&apos;s already in you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9 GIFTS GRID ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">What the quiz covers</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              9 gifts. Your top 3.
            </h2>
            <p className="text-ink/55 mt-4 max-w-lg mx-auto leading-relaxed">
              Four questions per gift. Your top three will be revealed with a description and clear guidance on how to use them.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GIFTS.map((gift, i) => (
              <Reveal key={gift.name} delay={Math.min(i * 0.05, 0.3)}>
                <div className="bg-white border border-ink/8 rounded-2xl p-5 h-full hover:border-sunrise/40 hover:shadow-[0_8px_28px_rgba(245,200,66,0.10)] transition-all">
                  <div className="text-2xl mb-3">{gift.icon}</div>
                  <h3 className="font-heading font-bold text-ink text-base mb-1">{gift.name}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{gift.desc}</p>
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
              { num: '01', title: 'Answer 36 short questions', body: 'Honest gut-level answers, not careful ones. Takes about 5 minutes.' },
              { num: '02', title: 'See your top 3 gifts',     body: 'Your three highest-scoring gifts, ranked, with a description of each one.' },
              { num: '03', title: 'Get a path forward',         body: 'Specific guidance on how to walk in your gifts — where to start using them this week.' },
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
              See what&apos;s<br/><span className="text-sunrise">in your hands.</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
              5 minutes. Completely free. No email required. Your top 3 gifts revealed instantly.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Take the Free Test →
            </button>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
