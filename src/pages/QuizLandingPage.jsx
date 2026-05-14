import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

function Reveal({ children, delay = 0, className = '' }) {
  return <RevealSection delay={delay} className={className}>{children}</RevealSection>
}

export default function QuizLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-parchment text-ink">

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6" style={{ background: '#1C1A2E' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3" style={{ background: '#B8A4D8' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl translate-y-1/3 -translate-x-1/4" style={{ background: '#F5C842' }} />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6" style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-heading font-bold text-xs tracking-widest uppercase text-gold">Free AI Quiz</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              What should you build?
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
              You have something to teach. An AI mentor will ask you 10–12 questions about your passions, background, and gifts — then give you a personalized recommendation for the course, mentorship, or workshop you should launch first.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <button
              onClick={() => navigate('/quiz/start')}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{ background: '#F5C842', color: '#1C1A2E', boxShadow: '0 8px 32px rgba(245,200,66,0.35)' }}
            >
              Start the Quiz →
            </button>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Free · 10 minutes · no account needed</p>
          </Reveal>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-ink text-center mb-10">What you'll get</h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { icon: <span aria-hidden="true">💬</span>, title: 'A real conversation — not a form', body: 'The AI reads your answers and responds to what you actually said. Every conversation is different. It feels like talking to someone who genuinely wants to understand you.' },
              { icon: <span aria-hidden="true">✨</span>, title: 'Your personalized business idea', body: 'A specific recommendation — not generic advice. Your audience, your format, your first three steps. Built from your answers.' },
              { icon: <span aria-hidden="true">📬</span>, title: 'A mini-report in your inbox', body: 'Your results are emailed to you so you can come back to them. No account, no password, no catch.' },
              { icon: <span aria-hidden="true">🎯</span>, title: 'A path to make it real', body: 'At the end, you can book a $99 strategy session to turn the idea into a full launch plan — website, workshop setup, offer design, everything.' },
            ].map(({ icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(245,200,66,0.12)', border: '1.5px solid rgba(245,200,66,0.25)' }}>
                    {icon}
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

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <Reveal>
          <div className="max-w-xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden text-white" style={{ background: '#1C1A2E' }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />
            <div className="text-3xl mb-4">💡</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              You already have what it takes.<br />Let's figure out what to build.
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Free. 10 minutes. No credit card.
            </p>
            <button
              onClick={() => navigate('/quiz/start')}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#F5C842', color: '#1C1A2E', boxShadow: '0 8px 24px rgba(245,200,66,0.3)' }}
            >
              Start the Quiz →
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
