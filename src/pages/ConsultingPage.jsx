import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const services = [
  { label: 'Idea development and brainstorming',   slug: 'idea-development-and-brainstorming' },
  { label: 'Strategic planning',                   slug: 'strategic-planning' },
  { label: 'Business consulting',                  slug: 'business-consulting' },
  { label: 'Brand development',                    slug: 'brand-development' },
  { label: 'Messaging and positioning',            slug: 'messaging-and-positioning' },
  { label: 'Marketing and advertising strategy',   slug: 'marketing-and-advertising-strategy' },
  { label: 'Website planning and development',     slug: 'website-planning-and-development' },
  { label: 'App development strategy',             slug: 'app-development-strategy' },
  { label: 'Social media management and growth',   slug: 'social-media-management-and-growth' },
  { label: 'Launch planning',                      slug: 'launch-planning' },
  { label: 'Offer development',                    slug: 'offer-development' },
  { label: 'Maximizing what is already working',   slug: 'maximizing-what-is-already-working' },
  { label: 'Clarifying next steps and implementation', slug: 'clarifying-next-steps-and-implementation' },
]

const phases = [
  { num: '01', title: 'Clarity', desc: 'We get clear on who you are, what you offer, and where you are going.' },
  { num: '02', title: 'Strategy', desc: 'We build a real plan — not just ideas, but an executable roadmap.' },
  { num: '03', title: 'Execution', desc: 'We implement together, from branding to launch to growth.' },
  { num: '04', title: 'Momentum', desc: 'We optimize, iterate, and keep building what is working.' },
]

export default function ConsultingPage() {
  return (
    <>
      {/* Hero — clean white with bold left-accent stripe */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-14 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        {/* Large decorative background word */}
        <p className="absolute bottom-0 right-0 font-heading text-[18vw] font-black text-ink/[0.035] leading-none select-none pointer-events-none translate-y-4">BUILD</p>

        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <div className="flex gap-10 items-start">
              {/* Left accent bar */}
              <div className="hidden md:flex flex-col items-center pt-2 shrink-0">
                <div className="w-1 h-24 bg-growth rounded-full" />
              </div>
              <div className="max-w-3xl">
                <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Consulting</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
                  Strategy plus execution.<br />From idea to momentum.
                </h1>
                <p className="mt-8 text-ink/55 text-lg leading-relaxed max-w-xl">
                  30 years of business experience. Real strategy, real implementation, measurable results — from brand to launch to growth.
                </p>
                {/* Credentials row */}
                <div className="mt-10 flex flex-wrap gap-6 border-t border-ink/8 pt-8">
                  {[['30+', 'Years Experience'], ['100+', 'Clients Served'], ['1996', 'First Business Founded']].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-heading text-2xl font-bold text-ink">{num}</p>
                      <p className="text-ink/40 text-xs font-semibold uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <ButtonPrimary to="/contact">Start a Conversation</ButtonPrimary>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">How It Works</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-14 max-w-xl">
              The process.
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {phases.map((p, i) => (
              <RevealSection key={p.num} delay={i * 0.08}>
                <div className="bg-parchment rounded-3xl p-8 border border-ink/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <span className="text-ink/10 text-5xl font-black leading-none block mb-6">{p.num}</span>
                  <h3 className="font-heading text-xl font-bold text-ink mb-3">{p.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">What's Included</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                What this<br />can include.
              </h2>
              <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
                This is not just advice. It is clarity, strategy, and movement — tailored to where you are and where you are going.
              </p>
              <div className="mt-10">
                <ButtonPrimary to="/contact">Let's Talk</ButtonPrimary>
              </div>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="flex flex-col gap-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/consulting/services#${s.slug}`}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/8 hover:bg-white/5 hover:border-white/20 transition-all duration-200 group"
                  >
                    <span className="text-white/65 group-hover:text-white font-medium transition-colors">{s.label}</span>
                    <span className="text-white/15 group-hover:text-growth text-xs font-bold transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Photo + quote — portrait-safe side-by-side */}
      <section className="bg-parchment px-6 lg:px-14 py-16 md:py-20">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Photo */}
          <div className="relative overflow-hidden min-h-[480px] lg:min-h-[600px]">
            <img
              src={import.meta.env.BASE_URL + 'images/consulting-working.jpg'}
              alt="Consulting"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
          {/* Quote */}
          <div className="bg-ink flex items-center justify-center px-10 py-16 lg:py-0">
            <div>
              <div className="w-10 h-1 bg-growth rounded-full mb-8" />
              <p className="font-heading text-white text-2xl md:text-3xl font-bold leading-snug max-w-sm">
                "This is not just advice. It is clarity, strategy, and movement."
              </p>
              <p className="mt-6 text-white/40 text-sm font-semibold uppercase tracking-widest">— Osil Pistole</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 text-center">Also Available</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Speaking', desc: 'Powerful messages for events, churches, and conferences.', to: '/speaking' },
                { label: 'Mentoring', desc: 'Voice, clarity, and confident leadership.', to: '/mentoring' },
                { label: 'Coaching', desc: 'Group and one-on-one coaching for real movement.', to: '/coaching' },
              ].map((s) => (
                <Link key={s.label} to={s.to} className="group flex items-center justify-between px-7 py-6 rounded-2xl border border-ink/8 hover:border-ink/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <p className="font-bold text-ink text-lg mb-1">{s.label}</p>
                    <p className="text-ink/45 text-sm">{s.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-ink/20 group-hover:text-ink group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <PageCTA
        heading="Ready to build what's next?"
        sub="Let's get clear on your vision and start building something real."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
