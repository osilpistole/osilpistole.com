import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

function Reveal({ children, delay = 0, className = '' }) {
  return <RevealSection delay={delay} className={className}>{children}</RevealSection>
}

const benefits = [
  {
    accent: 'bg-sunrise', iconBg: 'rgba(245,200,66,0.15)', iconBorder: 'rgba(245,200,66,0.3)',
    icon: '💬', title: 'A real conversation — not a form',
    body: 'The AI reads your answers and responds to what you actually said. Every conversation is different. It feels like talking to someone who genuinely wants to understand you.',
  },
  {
    accent: 'bg-growth', iconBg: 'rgba(125,190,106,0.15)', iconBorder: 'rgba(125,190,106,0.3)',
    icon: '✨', title: 'Your personalized business idea',
    body: 'A specific recommendation — not generic advice. Your audience, your format, your first three steps. Built from your answers.',
  },
  {
    accent: 'bg-morning', iconBg: 'rgba(184,164,216,0.15)', iconBorder: 'rgba(184,164,216,0.3)',
    icon: '📬', title: 'A mini-report in your inbox',
    body: 'Your results are emailed to you so you can come back to them. No account, no password, no catch.',
  },
  {
    accent: 'bg-sunrise', iconBg: 'rgba(245,200,66,0.15)', iconBorder: 'rgba(245,200,66,0.3)',
    icon: '🎯', title: 'A path to make it real',
    body: 'At the end, you can book a $99 strategy session to turn the idea into a full launch plan — website, workshop setup, offer design, everything.',
  },
]

export default function QuizLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-parchment text-ink">

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-32 pb-24 px-6 bg-parchment">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <div className="absolute top-[5%] right-[5%] w-96 h-96 rounded-full bg-morning/20 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-sunrise/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-[40%] left-[40%] w-64 h-64 rounded-full bg-growth/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 bg-sunrise/15 border border-sunrise/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sunrise animate-pulse" aria-hidden="true" />
              <span className="font-heading font-bold text-xs tracking-widest uppercase text-ink/70">Free AI Quiz</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[1.08] tracking-tight mb-6 text-ink">
              What should you <span className="gradient-text-animated">build first?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10 text-ink/65">
              You have something to teach. An AI mentor will ask you 10–12 questions about your passions, background, and gifts — then give you a personalized recommendation for the course, mentorship, or workshop you should launch first.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <button
              onClick={() => navigate('/quiz/start')}
              aria-label="Start the free AI Build Quiz"
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{ background: '#F5C842', color: '#2C2C2A', boxShadow: '0 8px 32px rgba(245,200,66,0.35)' }}
            >
              Start the Quiz
            </button>
            <p className="text-sm mt-4 text-ink/55">Free · 10 minutes · no account needed</p>
          </Reveal>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-growth text-xs font-bold uppercase tracking-[0.25em] text-center mb-3">What to expect</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink text-center mb-12">What you'll walk away with</h2>
          </Reveal>
          <div className="flex flex-col gap-4">
            {benefits.map(({ accent, iconBg, iconBorder, icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-5 items-start p-5 rounded-2xl border border-ink/6 bg-parchment hover:shadow-md transition-all duration-200">
                  <div className="shrink-0 flex items-center gap-2">
                    <div className={`w-0.5 self-stretch ${accent} rounded-full`} aria-hidden="true" />
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                      style={{ background: iconBg, border: `1.5px solid ${iconBorder}` }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-ink text-base mb-1">{title}</h3>
                    <p className="text-ink/65 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-parchment">
        <Reveal>
          <div className="max-w-xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden bg-white border border-ink/10 shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 color-stripe" aria-hidden="true" />
            <div className="w-12 h-12 rounded-full bg-sunrise/20 flex items-center justify-center text-xl mx-auto mb-5" aria-hidden="true">💡</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-4 leading-snug">
              You already have what it takes. Let's figure out what to build.
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto text-ink/60">
              Free. 10 minutes. No credit card.
            </p>
            <button
              onClick={() => navigate('/quiz/start')}
              aria-label="Start the free AI Build Quiz"
              className="inline-flex items-center justify-center gap-2 font-heading font-bold tracking-wide rounded-full px-10 py-4 text-base hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#F5C842', color: '#2C2C2A', boxShadow: '0 8px 24px rgba(245,200,66,0.3)' }}
            >
              Start the Quiz
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  )
}
