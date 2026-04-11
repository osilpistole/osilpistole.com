import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const services = [
  {
    num: '01', title: 'Speaking', accent: 'bg-sunrise', to: '/speaking',
    desc: 'Powerful messages on identity, purpose, destiny, breakthrough, leadership, and living with clarity and courage.',
    tags: ['Conferences', 'Churches', 'Retreats', "Women's Events", 'Leadership Events'],
  },
  {
    num: '02', title: 'Consulting', accent: 'bg-growth', to: '/consulting',
    desc: 'Business consulting and strategic implementation from start to finish — branding, marketing, web, advertising, and growth strategy.',
    tags: ['Brand Development', 'Strategy', 'Marketing', 'Launch Planning', 'Growth'],
  },
  {
    num: '03', title: 'Mentoring', accent: 'bg-morning', to: '/mentoring',
    desc: 'Two mentoring tracks: Build & Launch for those building business, influence, or ministry — and Living From Above for prophetic growth, kingdom principles, and identity in Christ.',
    tags: ['Build & Launch', 'Living From Above', 'Prophetic', 'Calling', 'Identity'],
    comingSoon: true,
  },
  {
    num: '04', title: 'Coaching & Training', accent: 'bg-ink', to: '/coaching',
    desc: 'Group coaching, team training, and one-on-one coaching for leaders, ministries, businesses, and organizations ready for real movement.',
    tags: ['One-on-One', 'Group Coaching', 'Team Training', 'Organizations'],
  },
]

export default function WorkWithMe() {
  return (
    <>
      {/* Hero — dark, clean, typographic with service preview strip */}
      <section className="relative pt-36 pb-0 md:pt-44 px-6 lg:px-14 bg-ink text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Work With Osil</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
              Four ways to work together.
            </h1>
            <p className="mt-8 text-white/50 text-lg leading-relaxed max-w-xl">
              Whether you need a speaker, consultant, mentor, or coach — this is where vision becomes strategy, and strategy becomes action.
            </p>
          </RevealSection>
        </div>
        {/* Service preview strip */}
        <div className="relative max-w-7xl mx-auto mt-16 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '01', label: 'Speaking', color: 'bg-sunrise' },
              { num: '02', label: 'Consulting', color: 'bg-growth' },
              { num: '03', label: 'Mentoring', color: 'bg-morning' },
              { num: '04', label: 'Coaching', color: 'bg-white' },
            ].map((s, i) => (
              <div key={s.num} className={`flex items-center gap-4 py-6 px-6 border-white/10 ${i > 0 ? 'border-l' : ''}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${s.color}`} />
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{s.num}</span>
                <span className="text-white/70 font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — horizontal stacked rows */}
      <section className="py-16 md:py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto divide-y divide-ink/8">
          {services.map((s, i) => (
            <RevealSection key={s.num} delay={i * 0.07}>
              <Link
                to={s.to}
                className="group grid grid-cols-1 md:grid-cols-[6rem_1fr_auto] gap-4 md:gap-10 py-10 items-start transition-all duration-200"
              >
                {/* Left: accent bar + number */}
                <div className="flex items-center gap-3">
                  <div className={`w-1 rounded-full shrink-0 ${s.accent} transition-all duration-300`} style={{ height: '2.5rem' }} />
                  <span className="font-heading text-3xl font-black text-ink/12 group-hover:text-ink/20 transition-colors">{s.num}</span>
                </div>

                {/* Center: content */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-heading text-2xl font-bold text-ink group-hover:translate-x-1 transition-transform duration-200">{s.title}</h3>
                    {s.comingSoon && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-morning/20 text-ink/50 text-[10px] font-bold uppercase tracking-widest shrink-0">
                        <span className="w-1 h-1 rounded-full bg-morning animate-pulse" />
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-ink/50 text-[15px] leading-relaxed mb-5 max-w-xl">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border transition-all duration-200 text-ink/40 border-ink/10 group-hover:border-ink/20 group-hover:text-ink/60`}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right: explore CTA */}
                <div className="hidden md:flex items-center gap-2 text-ink/25 group-hover:text-ink font-bold text-sm transition-all duration-200 pt-1 whitespace-nowrap">
                  Explore
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Photo + quote */}
      <section className="relative overflow-hidden h-64 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop&q=80"
          alt="Coaching and strategy session"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="font-heading text-white text-2xl md:text-3xl font-bold text-center max-w-2xl leading-snug">
            "This is not just advice. It is clarity, strategy, and movement."
          </p>
        </div>
      </section>

      {/* Who I work with */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Who This Is For</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Who I<br />Work With
              </h2>
              <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
                People and teams who know they're made for more and are ready to move with clarity and conviction.
              </p>
              <div className="mt-10">
                <ButtonPrimary to="/contact">Start a Conversation</ButtonPrimary>
              </div>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="flex flex-col gap-2">
                {['Leaders', 'Entrepreneurs', 'Ministries & Churches', 'Founders', 'Teams & Organizations', "Women's Groups", 'Creative Visionaries', 'People Ready for Their Next Level'].map((item) => (
                  <div key={item} className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/8 hover:border-sunrise/40 hover:bg-white/5 transition-all duration-200 group cursor-default">
                    <span className="text-white/70 group-hover:text-white font-medium transition-colors">{item}</span>
                    <span className="text-white/15 group-hover:text-sunrise text-xs font-bold transition-colors">→</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <PageCTA
        heading="Ready to get started?"
        sub="Reach out to discuss how we can work together."
        primary={{ label: 'Contact Osil', to: '/contact' }}
        secondary={{ label: 'Learn About Osil', to: '/about' }}
      />
    </>
  )
}
