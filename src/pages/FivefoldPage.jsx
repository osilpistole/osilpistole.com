import { useEffect, useRef, useState } from 'react'
import FivefoldQuiz from '../components/FivefoldQuiz'

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
    <div className="bg-parchment text-ink">

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6" style={{ background: '#1C1A2E' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3" style={{ background: '#B8A4D8' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl translate-y-1/3 -translate-x-1/4" style={{ background: '#F5C842' }} />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Role icons */}
          <Reveal>
            <div className="flex justify-center gap-3 mb-8">
              {ROLES.map((r) => (
                <div key={r.name} className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(184,164,216,0.12)', border: '1.5px solid rgba(184,164,216,0.25)' }}>
                  {r.icon}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{ background: 'rgba(184,164,216,0.12)', border: '1px solid rgba(184,164,216,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#B8A4D8' }} />
              <span className="font-heading font-bold text-xs tracking-widest uppercase" style={{ color: '#B8A4D8' }}>Free Assessment</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Which 5-fold calling<br />
              <span style={{ color: '#B8A4D8' }}>do you carry?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Apostle. Prophet. Evangelist. Pastor. Teacher. These aren&apos;t titles — they&apos;re God-given leadership callings placed in specific people to equip His church. This free assessment helps you identify which one you carry.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            {/* Bible verse */}
            <div className="rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto" style={{ background: 'rgba(184,164,216,0.08)', border: '1px solid rgba(184,164,216,0.2)' }}>
              <p className="font-body text-base italic leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                &ldquo;And He Himself gave some to be apostles, some prophets, some evangelists, and some pastors and teachers, for the equipping of the saints for the work of ministry, for the edifying of the body of Christ.&rdquo;
              </p>
              <span className="font-heading font-bold text-xs tracking-wider uppercase" style={{ color: '#B8A4D8' }}>Ephesians 4:11–12</span>
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{ background: '#B8A4D8', color: '#1C1A2E', boxShadow: '0 8px 32px rgba(184,164,216,0.35)' }}
            >
              Discover my calling →
            </button>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>40 questions · 8 minutes · completely free</p>
          </Reveal>
        </div>
      </section>

      {/* Important note: not all believers */}
      <section className="py-16 px-6 bg-white/60">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="rounded-2xl p-8 border" style={{ background: '#FFF9F0', borderColor: 'rgba(245,200,66,0.25)' }}>
              <div className="flex items-start gap-4">
                <div className="text-2xl shrink-0 mt-1">📌</div>
                <div>
                  <h3 className="font-heading font-bold text-ink text-lg mb-3">Not every believer holds a 5-fold office — but you might lean toward one.</h3>
                  <p className="font-body text-ink/60 text-sm leading-relaxed mb-3">
                    The 5-fold offices — apostle, prophet, evangelist, pastor, and teacher — are specific leadership gifts given to certain members of the body to <strong className="text-ink/80">equip everyone else</strong>. They&apos;re not a hierarchy. They&apos;re a function. Not all believers carry them.
                  </p>
                  <p className="font-body text-ink/60 text-sm leading-relaxed mb-3">
                    But many people have natural tendencies, wiring, and passions that <em>lean</em> toward one of these callings — even if they haven&apos;t stepped into a formal role. This assessment surfaces that lean. Whether you&apos;re in full-time ministry or simply trying to understand how God made you, knowing which direction you lean gives you something to work with.
                  </p>
                  <p className="font-body text-ink/70 text-sm leading-relaxed font-medium">
                    If your scores feel scattered or low across all five — that&apos;s not a problem. It may mean your primary gifting runs through the Romans 12 or 1 Corinthians 12 gifts instead. Take the <a href="/spiritual-gifts" className="underline underline-offset-2 hover:text-ink transition-colors" style={{ color: '#d4a800' }}>Spiritual Gifts Assessment</a> to find out.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The 5 roles */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-heading font-bold text-xs tracking-widest uppercase mb-3" style={{ color: '#B8A4D8' }}>The five offices</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
                Five callings. One body.
              </h2>
              <p className="text-ink/55 mt-4 max-w-lg mx-auto leading-relaxed">
                Each calling serves a different function in the church. Together, they equip the saints for the work of ministry.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role, i) => (
              <Reveal key={role.name} delay={i * 0.07}>
                <div className="bg-white border border-ink/8 rounded-2xl p-5 hover:border-morning/40 transition-all duration-200" style={{ ['--hover-shadow']: '0 4px 20px rgba(184,164,216,0.12)' }}>
                  <div className="text-2xl mb-3">{role.icon}</div>
                  <div className="text-xs font-heading font-bold uppercase tracking-widest mb-1" style={{ color: '#B8A4D8' }}>{role.tagline}</div>
                  <h3 className="font-heading font-bold text-ink text-base mb-2">{role.name}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed">{role.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-ink text-center mb-10">
              How it works
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: '01', title: 'Answer 40 honest questions', body: 'Rate each statement from Never to Always. Answer as you are today — not as who you aspire to be.' },
              { step: '02', title: 'Enter your name and email', body: 'Your results are emailed to you so you can come back to them. No account needed.' },
              { step: '03', title: 'See your primary calling', body: 'Get a ranked breakdown of all five offices, with a full description of your top calling and how to walk in it.' },
            ].map(({ step, title, body }, i) => (
              <Reveal key={step} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm" style={{ background: 'rgba(184,164,216,0.12)', border: '1.5px solid rgba(184,164,216,0.3)', color: '#B8A4D8' }}>
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
          <div className="max-w-xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden text-white" style={{ background: '#1C1A2E' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#B8A4D8' }} />
            <div className="text-3xl mb-4">👁️</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Your calling is already in you.<br />Let&apos;s name it.
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              40 questions. 8 minutes. Free. No credit card, no catch — just clarity on how God wired you to serve.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#B8A4D8', color: '#1C1A2E', boxShadow: '0 8px 24px rgba(184,164,216,0.3)' }}
            >
              Take the Free Assessment →
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
