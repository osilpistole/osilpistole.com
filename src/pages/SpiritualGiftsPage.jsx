import { useEffect, useRef, useState } from 'react'
import SpiritualGiftsQuiz from '../components/SpiritualGiftsQuiz'

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
    <div className="bg-parchment text-ink">

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/6 blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/70 border border-gold/25 rounded-full px-5 py-2 mb-6">
              <span className="text-gold font-heading font-bold text-xs tracking-widest uppercase">Free Assessment</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-ink">
              Discover Your<br />
              <span className="text-gold">Spiritual Gifts</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-ink/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              God placed specific gifts inside you — not by accident, but by design. This free 5-minute assessment identifies your top gifts and shows you how to walk in them fully.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setQuizStarted(true)}
                className="inline-flex items-center justify-center gap-2 bg-gold text-ink font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_8px_24px_rgba(245,200,66,0.35)]"
              >
                Take the Free Test →
              </button>
            </div>
            <p className="text-ink/35 text-sm font-body">36 questions · 5 minutes · completely free</p>
          </Reveal>
        </div>
      </section>

      {/* What you'll discover */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-gold font-heading font-bold text-xs tracking-widest uppercase mb-3">What you&apos;ll discover</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
                9 Gifts. Your Top 3.
              </h2>
              <p className="text-ink/55 mt-4 max-w-lg mx-auto leading-relaxed">
                The assessment covers 9 spiritual gifts — 4 questions each. Your top 3 will be revealed with a detailed description and practical guidance on how to use them.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GIFTS.map((gift, i) => (
              <Reveal key={gift.name} delay={i * 0.06}>
                <div className="bg-white border border-ink/8 rounded-2xl p-5 hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(245,200,66,0.12)] transition-all duration-200">
                  <div className="text-2xl mb-3">{gift.icon}</div>
                  <h3 className="font-heading font-bold text-ink text-base mb-1">{gift.name}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed">{gift.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-ink text-center mb-10">
              How it works
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: '01', title: 'Answer 36 honest questions', body: 'Rate each statement on a scale from Never to Always. Be honest about who you are today, not who you aspire to be.' },
              { step: '02', title: 'Enter your name and email', body: 'Your results are sent to your inbox so you can refer back to them — no account required.' },
              { step: '03', title: 'See your top 3 gifts', body: 'Get a full breakdown of your primary gifts with descriptions and practical guidance on how to walk in them.' },
            ].map(({ step, title, body }, i) => (
              <Reveal key={step} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-heading font-bold text-gold text-sm">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-ink text-base mb-1">{title}</h3>
                    <p className="text-ink/55 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <Reveal>
          <div className="max-w-xl mx-auto bg-ink text-white rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />
            <div className="text-3xl mb-4">✨</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Ready to find out what God<br />placed inside you?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              It takes 5 minutes and it&apos;s completely free. No catch, no credit card, no pressure.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-gold text-ink font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 transition-all duration-200 shadow-[0_8px_24px_rgba(245,200,66,0.3)]"
            >
              Take the Free Test →
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
