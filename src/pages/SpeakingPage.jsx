import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const topics = [
  { label: 'Identity and purpose',                slug: 'identity-and-purpose' },
  { label: 'Destiny and calling',                 slug: 'destiny-and-calling' },
  { label: 'Breaking limiting beliefs',           slug: 'breaking-limiting-beliefs' },
  { label: 'Breakthrough and forward movement',   slug: 'breakthrough-and-forward-movement' },
  { label: 'Leadership from wholeness',           slug: 'leadership-from-wholeness' },
  { label: 'Confidence and voice',                slug: 'confidence-and-voice' },
  { label: 'Hearing God and spiritual confidence',slug: 'hearing-god-and-spiritual-confidence' },
  { label: 'Building healthy prophetic teams',    slug: 'building-healthy-prophetic-teams' },
  { label: 'Emotional and spiritual growth',      slug: 'emotional-and-spiritual-growth' },
  { label: 'Living with clarity, courage, and hope', slug: 'living-with-clarity-courage-and-hope' },
]

const availableFor = [
  'Conferences', 'Churches', 'Retreats', "Women's Events",
  'Leadership Events', 'Podcasts', 'Panels', 'Team Trainings',
  'Corporate Culture Conversations',
]

export default function SpeakingPage() {
  return (
    <>
      {/* Hero — editorial poster, stacked bold color words */}
      <section className="relative pt-32 pb-0 md:pt-40 bg-parchment overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />

        {/* Warm glow blobs */}
        <div className="absolute top-0 right-[0%] w-[600px] h-[600px] rounded-full bg-sunrise/30 blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] right-[20%] w-80 h-80 rounded-full bg-morning/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[5%] w-64 h-64 rounded-full bg-growth/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-14">

          {/* Top row: eyebrow + booking */}
          <div className="flex items-center gap-3 mb-10 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-white text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-sunrise" />
              Speaking
            </span>
            <span className="h-px w-6 bg-ink/15" />
            <span className="inline-flex items-center gap-1.5 text-growth text-[11px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-growth animate-pulse" />
              Booking 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

            {/* Left: stacked headline words */}
            <div className="lg:col-span-7">
              <p className="text-ink/40 text-sm font-semibold mb-5 tracking-wide">Messages that bring —</p>
              <div className="space-y-1">
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-sunrise leading-[1.0] tracking-tight">Clarity.</span>
                </div>
                <div className="flex items-baseline gap-4 pl-8 md:pl-16">
                  <span className="font-heading text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-growth leading-[1.0] tracking-tight">Breakthrough.</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-morning leading-[1.0] tracking-tight">Courage.</span>
                </div>
              </div>
            </div>

            {/* Right: sub + CTA */}
            <div className="lg:col-span-5 pb-4">
              <div className="w-8 h-1 bg-sunrise rounded-full mb-5" />
              <p className="text-ink/60 text-[16px] leading-relaxed">
                Osil speaks with warmth, authority, and practical insight — helping people reconnect with identity, break limiting beliefs, and move forward with confidence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <ButtonPrimary to="/contact">Inquire About Speaking</ButtonPrimary>
                <Link
                  to="/speaking/topics"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink transition-all"
                >
                  View Topics
                </Link>
              </div>
            </div>
          </div>

          {/* Event types strip */}
          <div className="mt-14 pt-6 border-t border-ink/8 flex flex-wrap gap-x-8 gap-y-2 pb-12">
            {['Conferences', 'Churches', 'Retreats', "Women's Events", 'Leadership Events', 'Podcasts', 'Team Trainings'].map((t) => (
              <span key={t} className="text-ink/35 text-xs font-semibold uppercase tracking-widest">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed photo with floating quote card */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-end overflow-hidden">
        <img
          src={import.meta.env.BASE_URL + 'images/speaking-bw.jpg'}
          alt="Osil speaking"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Gradient — heavy bottom, light top */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />

        {/* Floating quote card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pb-16 md:pb-24">
          <div className="max-w-lg">
            <div className="w-10 h-1 bg-sunrise rounded-full mb-6" />
            <p className="font-heading text-white text-2xl md:text-3xl font-bold leading-snug">
              "Osil doesn't just deliver a message. She creates a moment where people feel seen, understood, and empowered to take their next step."
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sunrise animate-pulse" />
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Currently Booking 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Topics</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-8">
                Speaking<br />Topics
              </h2>
              <p className="text-ink/55 text-[17px] leading-relaxed">
                Each message is crafted to meet your audience where they are and move them forward — with clarity, courage, and conviction.
              </p>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="flex flex-col gap-2">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    to={`/speaking/topics#${topic.slug}`}
                    className="flex items-center justify-between px-6 py-4 rounded-2xl border border-ink/8 hover:border-sunrise/40 hover:bg-white transition-all duration-200 group"
                  >
                    <span className="text-ink/70 group-hover:text-ink font-medium transition-colors">{topic.label}</span>
                    <span className="text-ink/15 group-hover:text-sunrise text-xs font-bold transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Available For */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Availability</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Available<br />For
              </h2>
              <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
                Osil brings energy, clarity, and purpose to a wide range of events and formats.
              </p>
              <div className="mt-10">
                <ButtonPrimary to="/contact">Book Osil to Speak</ButtonPrimary>
              </div>
            </RevealSection>
            <RevealSection delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {availableFor.map((item) => (
                  <div key={item} className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunrise shrink-0" />
                    <span className="text-white/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Other services strip */}
      <section className="py-16 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-8 text-center">Also Available</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Consulting', desc: 'Strategy and implementation from start to finish.', to: '/consulting', color: 'bg-growth' },
                { label: 'Mentoring', desc: 'Voice, clarity, and confident leadership.', to: '/mentoring', color: 'bg-morning' },
                { label: 'Coaching', desc: 'Group and one-on-one coaching for real movement.', to: '/coaching', color: 'bg-sunrise' },
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
        heading="Bring Osil to your event."
        sub="Inquire about booking for your conference, retreat, church, team training, podcast, or event."
        primary={{ label: 'Inquire About Speaking', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
