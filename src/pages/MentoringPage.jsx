import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const areas = [
  { label: 'Finding your message and voice',              slug: 'finding-your-message-and-voice' },
  { label: 'Building influence, platform, or ministry',  slug: 'building-influence-platform-or-ministry' },
  { label: 'Social media, branding, and digital presence', slug: 'social-media-branding-and-digital-presence' },
  { label: 'Offer development and launch strategy',      slug: 'offer-development-and-launch-strategy' },
  { label: 'Stepping into your calling',                 slug: 'stepping-into-your-calling' },
  { label: 'Growing in confidence',                      slug: 'growing-in-confidence' },
  { label: 'Clarity in your next season',                slug: 'clarity-in-your-next-season' },
  { label: 'Breaking through fear and hesitation',       slug: 'breaking-through-fear-and-hesitation' },
  { label: 'Prophetic gifts and ministry',               slug: 'prophetic-gifts-and-ministry' },
  { label: 'Kingdom principles and new covenant living', slug: 'kingdom-principles-and-new-covenant-living' },
  { label: 'Living from above — identity in Christ',     slug: 'living-from-above' },
  { label: 'Hearing God and spiritual confidence',       slug: 'hearing-god-and-spiritual-confidence' },
  { label: 'Living from peace, not pressure or chaos',   slug: 'living-from-peace' },
  { label: 'Building prophetic teams and culture',       slug: 'building-prophetic-teams-and-culture' },
]

const forWho = [
  { title: 'Builders and Entrepreneurs', desc: 'Anyone building a business, brand, ministry, or platform who wants real guidance — not just information — from someone who has done it.' },
  { title: 'Leaders and Emerging Leaders', desc: 'Pastors, executives, team leaders, and those stepping into leadership for the first time — ready to lead from a grounded, healthy, whole place.' },
  { title: 'Those Growing in the Prophetic', desc: 'People who carry prophetic gifts and want to develop them with wisdom, accountability, and a solid kingdom foundation.' },
  { title: 'Creatives and Influencers', desc: 'Artists, content creators, and communicators who need help shaping their message, building their presence, and monetizing their gifts.' },
  { title: 'People in Transition', desc: 'Anyone in a season of change — ending something, starting something, or simply unsure of what is next — who needs clarity and someone steady in their corner.' },
  { title: 'Those Hungry for More', desc: 'People who know there is more — more depth, more clarity, more impact, more of God — and are ready to do the real work to get there.' },
]

export default function MentoringPage() {
  return (
    <>
      {/* Hero — split layout: photo left, text right */}
      <section className="relative overflow-hidden bg-parchment">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
          {/* Photo half */}
          <div className="relative order-2 lg:order-1 min-h-[380px] lg:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80"
              alt="Mentoring"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-parchment hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-parchment to-transparent lg:hidden" />
          </div>
          {/* Text half */}
          <div className="order-1 lg:order-2 flex items-center px-8 lg:px-16 pt-36 pb-16 lg:py-28 relative z-10">
            <RevealSection>
              <div className="w-8 h-1 bg-morning rounded-full mb-6" />
              <p className="text-morning text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Mentoring</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.08] tracking-tight max-w-sm">
                Stop second-guessing. Start leading with clarity.
              </h1>
              <p className="mt-6 text-ink/55 text-[17px] leading-relaxed max-w-sm">
                For those ready to step fully into who they are — grounded, clear, and moving forward with confidence.
              </p>
              <div className="mt-8">
                <ButtonPrimary to="/contact">Apply for Mentoring</ButtonPrimary>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-morning text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Who This Is For</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-14 max-w-xl">
              Is this for you?
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {forWho.map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.08} className="flex">
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-ink/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full h-full">
                  <h3 className="font-heading text-2xl font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-ink/55 leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-morning text-[11px] font-bold uppercase tracking-[0.25em] mb-5">What We Cover</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Mentoring<br />Areas
              </h2>
              <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
                This is about getting clear, getting grounded, and moving forward with the confidence that comes from truly knowing who you are.
              </p>
              <div className="mt-10">
                <ButtonPrimary to="/contact">Apply for Mentoring</ButtonPrimary>
              </div>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="flex flex-col gap-2">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    to={`/mentoring/areas#${area.slug}`}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/8 hover:bg-white/5 hover:border-morning/30 transition-all duration-200 group"
                  >
                    <span className="text-white/65 group-hover:text-white font-medium transition-colors">{area.label}</span>
                    <span className="text-white/15 group-hover:text-morning text-xs font-bold transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Group Mentorships — Coming Soon */}
      <section className="py-16 md:py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-3">Coming Soon</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink leading-[1.1] mb-4">
              Group Mentorship Programs
            </h2>
            <p className="text-ink/50 text-[17px] leading-relaxed max-w-xl mb-12">
              Two focused mentorship experiences are in development. Each is designed for a specific journey — one for builders, one for those going deeper in kingdom life. Spots will be limited.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Program 1 — Business / Influence / Ministry Building */}
            <RevealSection delay={0.08}>
              <div className="bg-ink rounded-3xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-sunrise/15 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sunrise/20 text-sunrise text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-sunrise animate-pulse" />
                      Coming Soon
                    </span>
                    <span className="text-white/10 font-heading text-4xl font-black leading-none">01</span>
                  </div>
                  <div className="w-8 h-1 bg-sunrise rounded-full mb-5" />
                  <p className="text-sunrise text-[11px] font-bold uppercase tracking-widest mb-3">Business · Influence · Ministry</p>
                  <h3 className="font-heading text-2xl font-bold text-white leading-[1.1] mb-4">
                    Build &amp; Launch
                    <span className="block text-white/30 text-base font-normal normal-case tracking-normal mt-1">Name in progress</span>
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed mb-8 flex-1">
                    A DIY-friendly, step-by-step group program for anyone wanting to build a business, ministry, or platform of influence — from the very beginning. Covers the foundations of building something real in today's world.
                  </p>
                  <div className="flex flex-col gap-2.5 mb-8">
                    {[
                      'Finding your message and audience',
                      'Social media strategy and content creation',
                      'Beginning web design and online presence',
                      'Graphic design fundamentals',
                      'Using AI tools to build faster and smarter',
                      'Offer development and monetization',
                      'Brand identity and positioning',
                      'Launch strategy from day one',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-sunrise shrink-0 mt-1.5" />
                        <span className="text-white/55 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sunrise text-ink font-bold text-sm hover:bg-sunrise/85 transition-all duration-200 mt-auto"
                  >
                    Notify Me When It Launches
                  </Link>
                </div>
              </div>
            </RevealSection>

            {/* Program 2 — Prophetic / Kingdom Life */}
            <RevealSection delay={0.14}>
              <div className="bg-ink rounded-3xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-morning/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-morning/20 text-morning text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-morning animate-pulse" />
                      Coming Soon
                    </span>
                    <span className="text-white/10 font-heading text-4xl font-black leading-none">02</span>
                  </div>
                  <div className="w-8 h-1 bg-morning rounded-full mb-5" />
                  <p className="text-morning text-[11px] font-bold uppercase tracking-widest mb-3">Prophetic · Kingdom · Identity</p>
                  <h3 className="font-heading text-2xl font-bold text-white leading-[1.1] mb-4">
                    Living From Above
                    <span className="block text-white/30 text-base font-normal normal-case tracking-normal mt-1">Prophetic &amp; Kingdom Life Mentorship</span>
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed mb-8 flex-1">
                    A deep-dive mentorship for those who want to grow in prophetic maturity while building their entire life on the foundations of the kingdom — not striving, not surviving, but genuinely living from a place of rest, identity, and spiritual authority.
                  </p>
                  <div className="flex flex-col gap-2.5 mb-8">
                    {[
                      'Prophetic gifts, development, and ministry',
                      'Living from above — seated with Christ',
                      'Kingdom principles and how to apply them',
                      'New covenant theology and identity',
                      'Christus Victor and what Christ accomplished',
                      'Living from peace, not pressure or chaos',
                      'The "do all things" life — strength, rest, and action',
                      'Hearing God clearly and moving with confidence',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-morning shrink-0 mt-1.5" />
                        <span className="text-white/55 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-morning text-ink font-bold text-sm hover:bg-morning/85 transition-all duration-200 mt-auto"
                  >
                    Notify Me When It Launches
                  </Link>
                </div>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* Quote break */}
      <section className="py-20 md:py-24 px-6 lg:px-14 bg-parchment">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <div className="w-12 h-1 bg-morning mx-auto mb-10 rounded-full" />
            <p className="font-heading text-3xl md:text-4xl font-bold text-ink leading-[1.2]">
              "You don't need more information. You need clarity, confidence, and someone in your corner who will help you move."
            </p>
            <p className="mt-8 text-ink/40 text-sm font-semibold uppercase tracking-widest">— Osil Pistole</p>
          </RevealSection>
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
        heading="Ready to get clear and move forward?"
        sub="Mentoring is for those who are serious about stepping into who they are — with clarity, confidence, and real support."
        primary={{ label: 'Apply for Mentoring', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
