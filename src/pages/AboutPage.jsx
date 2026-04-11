import { useEffect } from 'react'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const values = [
  { title: 'Clarity', desc: 'Cutting through the noise to see what matters and where to go next.', accent: 'bg-sunrise' },
  { title: 'Growth', desc: 'Nurturing what is already inside you and building it into something real.', accent: 'bg-growth' },
  { title: 'Breakthrough', desc: 'Moving past what has been holding you back into your fullest expression.', accent: 'bg-morning' },
]

const businessCards = [
  {
    label: 'Entrepreneurship',
    desc: 'Founded her first business in 1996. Decades of experience launching, scaling, and building from the ground up.',
    accent: 'bg-sunrise',
  },
  {
    label: 'Marketing Strategy',
    desc: 'End-to-end marketing planning, campaign development, offer positioning, and growth strategy for businesses and ministries.',
    accent: 'bg-growth',
  },
  {
    label: 'Web Design & Development',
    desc: 'Hands-on experience designing and developing websites that are beautiful, functional, and built to convert.',
    accent: 'bg-morning',
  },
  {
    label: 'Graphic Design',
    desc: 'Visual storytelling through brand identity, print, digital, and content design that communicates with clarity and style.',
    accent: 'bg-sunrise',
  },
  {
    label: 'Social Media & Influence',
    desc: 'Content strategy, community building, and audience growth across platforms — from concept to consistency.',
    accent: 'bg-growth',
  },
  {
    label: 'Brand Development',
    desc: 'Helping individuals and organizations discover, define, and communicate who they are and what they stand for.',
    accent: 'bg-morning',
  },
]

const ministryCards = [
  {
    label: 'Ordained Minister',
    desc: 'Ordained and actively serving — bringing a pastoral heart and spiritual depth to every room she enters.',
    accent: 'bg-morning',
  },
  {
    label: 'Prophetic Ministry',
    desc: 'Trained and experienced in prophetic gifts — leading prophetic teams, developing others, and operating with accuracy and care.',
    accent: 'bg-sunrise',
  },
  {
    label: 'Preaching & Teaching',
    desc: 'A theology nerd at heart — Osil preaches and teaches with depth, clarity, and a gift for making complex truth accessible and alive.',
    accent: 'bg-growth',
  },
  {
    label: 'Coaching & Training',
    desc: 'One-on-one and group coaching for leaders, teams, businesses, and ministries — practical, direct, and built for real movement.',
    accent: 'bg-morning',
  },
  {
    label: 'Worship & Encouragement',
    desc: 'Worship leader and longtime encourager — including hosting the Happy Hour podcast, creating space for people to be seen and inspired.',
    accent: 'bg-sunrise',
  },
  {
    label: 'Early Childhood Education',
    desc: 'A background in early childhood education that shaped her ability to communicate clearly, meet people where they are, and nurture growth.',
    accent: 'bg-growth',
  },
]

function ExpertiseCard({ item }) {
  return (
    <div className="bg-parchment rounded-2xl p-6 border border-ink/6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className={`w-6 h-1 ${item.accent} rounded-full mb-4`} />
      <h3 className="font-heading text-base font-bold text-ink mb-2">{item.label}</h3>
      <p className="text-ink/50 text-sm leading-relaxed flex-1">{item.desc}</p>
    </div>
  )
}

function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  return (
    <section className="py-20 md:py-24 px-6 lg:px-14 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-3">On Instagram</p>
              <h2 className="font-heading text-4xl font-bold text-ink leading-tight">Follow Along</h2>
            </div>
            <a
              href="https://instagram.com/osil-pistole"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ink/50 hover:text-ink text-sm font-semibold transition-colors group shrink-0"
            >
              @osil-pistole
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </RevealSection>

        <RevealSection delay={0.1}>
          {/* LightWidget embed — replace the src URL with your own from lightwidget.com */}
          <iframe
            src="//lightwidget.com/widgets/904f90c9c642584881f0d70c45a82caf.html"
            allowTransparency="true"
            className="lightwidget-widget w-full"
            style={{ border: 0, overflow: 'hidden', display: 'block' }}
            title="Instagram feed"
          />
        </RevealSection>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* Hero — split: text left, photo right, full height */}
      <section className="relative min-h-[90vh] flex overflow-hidden bg-parchment">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />

        {/* Soft blobs behind text */}
        <div className="absolute top-[10%] left-[2%] w-80 h-80 rounded-full bg-sunrise/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[15%] w-56 h-56 rounded-full bg-morning/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* Left — text */}
          <div className="py-36 md:py-44 pr-0 lg:pr-16">
            <RevealSection>
              <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-6">About</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
                Meet<br />Osil Pistole.
              </h1>
              <p className="mt-6 text-ink/55 text-[17px] leading-relaxed max-w-md">
                30 years of experience helping people and organizations move forward — with clarity, strategy, and purpose.
              </p>

              {/* Role tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['Speaker', 'Consultant', 'Mentor', 'Coach', 'Strategist', 'Encourager', 'Minister'].map((role) => (
                  <span key={role} className="px-4 py-1.5 rounded-full border border-ink/12 bg-white text-ink/60 text-xs font-semibold uppercase tracking-widest">
                    {role}
                  </span>
                ))}
              </div>

              {/* Mini stat row */}
              <div className="mt-10 flex gap-8 pt-8 border-t border-ink/8">
                {[['30+', 'Years Experience'], ['1996', 'First Business'], ['4', 'Ways to Work Together']].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-heading text-2xl font-bold text-ink">{n}</p>
                    <p className="text-ink/35 text-[10px] font-bold uppercase tracking-widest mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>

          {/* Right — photo, absolutely positioned to fill right half */}
        </div>

        {/* Photo fills right half */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[48%] pointer-events-none hidden lg:block">
          <img
            src={import.meta.env.BASE_URL + 'images/polka-wall.jpg'}
            alt="Osil Pistole"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #F7F4EE 0%, #F7F4EE 2%, rgba(247,244,238,0.7) 20%, transparent 45%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #F7F4EE 0%, transparent 20%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F7F4EE 0%, transparent 15%)' }} />
        </div>

        {/* Mobile photo */}
        <div className="absolute bottom-0 left-0 right-0 h-64 lg:hidden">
          <img
            src={import.meta.env.BASE_URL + 'images/polka-wall.jpg'}
            alt="Osil Pistole"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment via-parchment/60 to-transparent" />
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Her Story</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-8">
                Clarity that<br />leads to action.
              </h2>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="space-y-5 text-ink/60 leading-relaxed text-[17px]">
                <p>
                  Osil Pistole is a speaker, consultant, mentor, and creative strategist with a passion for helping people and organizations move forward with clarity, confidence, and purpose.
                </p>
                <p>
                  She brings together practical business insight, leadership experience, brand development, marketing strategy, and deep personal mentoring to help people build what they are called to build.
                </p>
                <p>
                  With over 30 years of business experience — including founding her first business in 1996 — her work is both visionary and practical. She is known for helping people see clearly, cut through confusion, strengthen their message, and take real steps forward.
                </p>
                <p>
                  Whether she is helping shape a brand, train a team, speak to a room, or mentor an individual, her heart is the same: to help people live with clarity, courage, hope, and momentum.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Business Expertise */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Business Expertise</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-6">
                A rare blend of<br />creative and strategic.
              </h2>
              <p className="text-ink/60 text-[17px] leading-relaxed">
                Osil brings a unique combination of creative skill and business acumen that most people need entire teams to replicate. From building websites and designing brands to growing social media audiences and launching businesses — she understands how it all connects.
              </p>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessCards.map((item) => (
                  <ExpertiseCard key={item.label} item={item} />
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Ministry & Calling */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-morning text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Ministry & Calling</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-6">
                Rooted in faith,<br />built to serve.
              </h2>
              <p className="text-ink/60 text-[17px] leading-relaxed">
                Before the strategy, there is the calling. Osil's life and work are deeply grounded in her faith — as an ordained minister, prophetic voice, preacher, worship leader, and devoted encourager of everyone she meets.
              </p>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ministryCards.map((item) => (
                  <ExpertiseCard key={item.label} item={item} />
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">What Drives Her</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-14">
              Core values.
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <RevealSection key={v.title} delay={i * 0.1} className="flex">
                <div className="bg-white/5 rounded-3xl p-8 md:p-10 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-300 flex flex-col w-full">
                  <div className={`w-10 h-1 ${v.accent} rounded-full mb-8`} />
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-white/50 leading-relaxed">{v.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      <PageCTA
        heading="Let's build something meaningful."
        sub="Whether you need a speaker, consultant, mentor, or coach — this is where clarity, strategy, and execution come together."
        primary={{ label: 'Work With Osil', to: '/work-with-me' }}
        secondary={{ label: 'Contact Osil', to: '/contact' }}
      />
    </>
  )
}
