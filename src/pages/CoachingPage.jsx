import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const groupTopics = [
  'Identity and purpose',
  'Prophecy and hearing God',
  'Prophetic processing and activation',
  'Building healthy prophetic teams',
  'Leadership from wholeness',
]

const oneOnOneTopics = [
  'Life strategy and clarity',
  'Destiny and calling',
  'Breakthrough sessions',
  'Prophetic sessions',
  'Leadership development',
  'Personal growth and confidence',
]

const formats = [
  { num: '01', title: 'One-on-One Coaching', desc: 'Private, high-level coaching for focused support, deep clarity, and strong next steps. Built around you and where you are going.', accent: 'bg-sunrise', topics: oneOnOneTopics },
  { num: '02', title: 'Group Coaching', desc: 'Bring Osil in to coach your team, group, ministry, or organization. Powerful, practical, and transformational.', accent: 'bg-growth', topics: groupTopics },
]

export default function CoachingPage() {
  return (
    <>
      {/* Hero — bold sunrise yellow background */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-14 bg-sunrise overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-ink/20 z-20" />
        {/* Decorative large text */}
        <p className="absolute bottom-0 right-0 font-heading text-[16vw] font-black text-ink/[0.06] leading-none select-none pointer-events-none translate-y-4">MOVE</p>
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #2C2C2A 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Coaching & Training</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight max-w-4xl">
              Real movement for leaders, teams, and organizations.
            </h1>
            <p className="mt-8 text-ink/60 text-lg leading-relaxed max-w-xl">
              Whether one-on-one or with your whole team — coaching that creates clarity, breaks through stagnation, and builds real momentum.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink/85 transition-all duration-200 shadow-lg"
              >
                Apply for Coaching
              </Link>
              <Link
                to="/work-with-me"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-ink/25 text-ink text-sm font-semibold hover:border-ink/50 hover:bg-ink/5 transition-all duration-200"
              >
                View All Services
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Formats */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Formats</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-14 max-w-xl">
              Two ways to work together.
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {formats.map((f, i) => (
              <RevealSection key={f.num} delay={i * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden border border-ink/8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div className={`h-1.5 w-full ${f.accent}`} />
                  <div className="p-8 md:p-10">
                    <span className="text-ink/10 text-5xl font-black leading-none block mb-6">{f.num}</span>
                    <h3 className="font-heading text-2xl font-bold text-ink mb-4">{f.title}</h3>
                    <p className="text-ink/55 leading-relaxed mb-8">{f.desc}</p>
                    <div className="flex flex-col gap-2.5">
                      {f.topics.map((t) => (
                        <div key={t} className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${f.accent} shrink-0`} />
                          <span className="text-ink/60 text-sm">{t}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link to="/contact" className="inline-flex items-center gap-2 text-ink font-bold text-sm hover:text-growth transition-colors group">
                        Apply Now
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Who It's For</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Built for<br />people who are<br />ready to move.
              </h2>
              <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
                Coaching is for leaders, ministries, businesses, and organizations who are done waiting and ready for real, sustained movement.
              </p>
              <div className="mt-10">
                <ButtonPrimary to="/contact">Apply for Coaching</ButtonPrimary>
              </div>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="flex flex-col gap-2">
                {['Leaders ready for their next level', 'Ministries and churches', 'Entrepreneurs and founders', 'Teams that feel stuck', 'Organizations in transition', 'Individuals wanting focused support'].map((item) => (
                  <div key={item} className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/8 hover:bg-white/5 hover:border-sunrise/30 transition-all duration-200 group">
                    <span className="text-white/65 group-hover:text-white font-medium transition-colors">{item}</span>
                    <span className="text-white/15 group-hover:text-sunrise text-xs font-bold transition-colors">→</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 text-center">Also Available</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Speaking', desc: 'Powerful messages for events, churches, and conferences.', to: '/speaking' },
                { label: 'Consulting', desc: 'Strategy and implementation from start to finish.', to: '/consulting' },
                { label: 'Mentoring', desc: 'Voice, clarity, and confident leadership.', to: '/mentoring' },
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
        heading="Ready to get moving?"
        sub="Coaching is for people who are serious about growth, clarity, and building something real."
        primary={{ label: 'Apply for Coaching', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
