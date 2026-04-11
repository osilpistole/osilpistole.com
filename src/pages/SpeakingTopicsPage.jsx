import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const topics = [
  {
    num: '01',
    title: 'Identity and Purpose',
    slug: 'identity-and-purpose',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'So many people are doing great things but feel disconnected from who they truly are. This message cuts through the noise and helps people anchor back to their God-given identity — not as something to achieve, but as something to receive. When people know who they are, everything they do becomes more focused, more confident, and more fruitful.',
  },
  {
    num: '02',
    title: 'Destiny and Calling',
    slug: 'destiny-and-calling',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'You were made for something specific. This message explores how to recognize the unique calling on your life, how to steward it with intentionality, and how to keep moving toward it even when the path is unclear. Whether someone is just stepping out or has been walking in calling for years, this message brings fresh clarity and courage to keep going.',
  },
  {
    num: '03',
    title: 'Breaking Limiting Beliefs',
    slug: 'breaking-limiting-beliefs',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'The biggest barriers we face are rarely external — they live in our minds. Fear, self-doubt, old stories, and false agreements quietly shape our decisions and hold us back. This message shines a light on the specific beliefs that keep people stuck and equips them with practical tools and biblical truth to break free and step forward with boldness.',
  },
  {
    num: '04',
    title: 'Breakthrough and Forward Movement',
    slug: 'breakthrough-and-forward-movement',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'There are seasons in life when everything feels stuck — when effort doesn\'t seem to produce results and momentum feels impossible. This message speaks directly to those in that place, bringing hope, practical wisdom, and activation for the next step. It\'s designed to be a turning point — from waiting to moving, from stuck to launched.',
  },
  {
    num: '05',
    title: 'Leadership from Wholeness',
    slug: 'leadership-from-wholeness',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Many leaders are leading from a place of striving rather than strength. This message challenges the culture of burnout, performance, and people-pleasing in leadership, and calls leaders into a healthier, more grounded way of leading — one rooted in identity, boundaries, emotional health, and genuine connection to God and others.',
  },
  {
    num: '06',
    title: 'Confidence and Voice',
    slug: 'confidence-and-voice',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Your voice matters — but you have to own it. This message is for everyone who has shrunk back, stayed silent, or played small because of fear or insecurity. Osil speaks with vulnerability and authority about finding your voice, claiming your story, and stepping into the spaces where your words are needed. Practical, empowering, and deeply personal.',
  },
  {
    num: '07',
    title: 'Hearing God and Spiritual Confidence',
    slug: 'hearing-god-and-spiritual-confidence',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'One of the greatest needs in the Church today is the ability to hear God clearly and trust what you hear. This message builds a foundation for two-way communication with God, addresses the fears and doubts that keep people second-guessing, and activates people into a life of greater spiritual sensitivity, boldness, and confidence in what God is saying.',
  },
  {
    num: '08',
    title: 'Building Healthy Prophetic Teams',
    slug: 'building-healthy-prophetic-teams',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Prophetic ministry is meant to bring life and clarity to the Church — but without healthy culture and structure, it can bring confusion and hurt. Drawing from years of experience in prophetic leadership and team development, this message equips pastors, leaders, and teams with the vision, values, and practical tools to build prophetic culture that is accountable, humble, and genuinely impactful.',
  },
  {
    num: '09',
    title: 'Emotional and Spiritual Growth',
    slug: 'emotional-and-spiritual-growth',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Spiritual maturity and emotional health are deeply connected — yet we often develop one at the expense of the other. This message bridges the two, addressing patterns like people-pleasing, fear of conflict, codependency, and unprocessed grief, while helping people grow into a more integrated, mature expression of faith. Thoughtful, honest, and deeply needed.',
  },
  {
    num: '10',
    title: 'Living with Clarity, Courage, and Hope',
    slug: 'living-with-clarity-courage-and-hope',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'This message is the thread that runs through everything Osil does. It is an invitation to stop drifting and start directing — to trade confusion for clarity, fear for courage, and resignation for genuine expectation. Whether used as an opening keynote or a closing sendoff, this message leaves rooms inspired, activated, and ready to move into what is next.',
  },
]

export default function SpeakingTopicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-6 lg:px-14 bg-parchment overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <div className="absolute top-[5%] right-[5%] w-96 h-96 rounded-full bg-sunrise/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-64 h-64 rounded-full bg-morning/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <Link to="/speaking" className="inline-flex items-center gap-2 text-ink/40 text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors mb-8 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Speaking
            </Link>
            <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Speaking Topics</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.08] tracking-tight max-w-3xl">
              Messages crafted to meet your audience where they are.
            </h1>
            <p className="mt-6 text-ink/55 text-[17px] leading-relaxed max-w-xl">
              Each message is developed from real experience and delivered with warmth, honesty, and practical insight. Below are Osil's core speaking topics — all customizable to fit your event, audience, and theme.
            </p>
            <div className="mt-8">
              <ButtonPrimary to="/contact">Inquire About Booking</ButtonPrimary>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Topics list */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topics.map((t, i) => (
              <RevealSection key={t.num} delay={i * 0.06}>
                <div id={t.slug} className="group bg-parchment rounded-3xl p-8 md:p-10 border border-ink/6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full scroll-mt-28">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-8 h-1 ${t.accent} rounded-full`} />
                    <span className="font-heading text-4xl font-black text-ink/8">{t.num}</span>
                  </div>
                  <h2 className={`font-heading text-xl font-bold text-ink mb-4 group-hover:${t.accentText} transition-colors duration-200`}>
                    {t.title}
                  </h2>
                  <p className="text-ink/55 text-[15px] leading-relaxed">{t.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom message note */}
      <section className="py-16 md:py-20 px-6 lg:px-14 bg-parchment">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <div className="w-10 h-1 bg-growth mx-auto rounded-full mb-8" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-5">
              Don't see exactly what you need?
            </h2>
            <p className="text-ink/55 text-[17px] leading-relaxed max-w-2xl mx-auto">
              Osil regularly develops custom messages tailored to the specific theme, season, or audience of your event. Reach out to start a conversation about what your group needs — and she will craft something that fits.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonPrimary to="/contact">Start a Conversation</ButtonPrimary>
              <Link
                to="/speaking"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink transition-all"
              >
                Back to Speaking
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <PageCTA
        heading="Ready to bring Osil to your event?"
        sub="Inquire about availability for your conference, retreat, church, or event."
        primary={{ label: 'Inquire About Speaking', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
