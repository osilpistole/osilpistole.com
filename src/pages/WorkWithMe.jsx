import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 lg:px-10 text-center">
      <div className="max-w-3xl mx-auto">
        <SectionLabel>Work With Osil</SectionLabel>
        <h1 className="font-heading text-4xl md:text-6xl font-semibold text-ink leading-tight tracking-tight">
          Consulting, mentoring, and coaching for real movement.
        </h1>
        <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
          Whether you need strategic implementation, personal mentoring, or team training, this work is about getting clear and building something real.
        </p>
      </div>
    </section>
  )
}

/* ─── Consulting ─── */
const services = [
  'Idea development and brainstorming', 'Strategic planning', 'Business consulting',
  'Brand development', 'Messaging and positioning', 'Marketing and advertising strategy',
  'Website planning and development', 'App development strategy',
  'Social media management and growth strategy', 'Launch planning', 'Offer development',
  'Maximizing what is already working', 'Clarifying next steps and implementation',
]

function Consulting() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionLabel>Consulting</SectionLabel>
            <SectionHeading className="mb-6 text-3xl md:text-4xl!">Strategy plus implementation</SectionHeading>
            <p className="text-ink/65 leading-relaxed text-lg mb-6">
              Osil helps take ideas from concept to execution. She brings both vision and practical strategy, helping leaders, brands, ministries, and organizations create momentum and build something real.
            </p>
            <p className="text-ink font-medium italic text-lg">
              This is not just advice. It is clarity, strategy, and movement.
            </p>
          </div>
          <div className="bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm">
            <h3 className="font-heading text-xl font-semibold text-ink mb-6">What this can include</h3>
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-growth shrink-0" />
                  <span className="text-ink/65">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Mentoring ─── */
const mentoringAreas = [
  'Finding your voice', 'Stepping into your calling', 'Growing in confidence',
  'Hearing God for yourself', 'Hearing God for others', 'Prophetic ministry',
  'Healthy prophetic leadership', 'Building a prophetic team',
  'Clarity in your next season', 'Breaking through fear and hesitation',
]

function Mentoring() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-morning/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm order-2 lg:order-1">
            <h3 className="font-heading text-xl font-semibold text-ink mb-6">Mentoring Areas</h3>
            <div className="space-y-3">
              {mentoringAreas.map((a) => (
                <div key={a} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-morning shrink-0" />
                  <span className="text-ink/65">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionLabel color="text-morning">Mentoring</SectionLabel>
            <SectionHeading className="mb-6 text-3xl md:text-4xl!">Mentoring for voice, calling, and clarity</SectionHeading>
            <p className="text-ink/65 leading-relaxed text-lg mb-6">
              For those who are ready to stop second-guessing themselves and step fully into who they are, Osil offers mentoring that is grounded, clear, and transformational.
            </p>
            <p className="text-ink font-medium italic text-lg">
              This is about getting clear, getting grounded, and moving forward with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Coaching ─── */
function Coaching() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel color="text-sunrise">Coaching</SectionLabel>
          <SectionHeading>Coaching and team training</SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-growth/15 mb-6">
              <svg className="w-6 h-6 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-ink mb-4">Group Coaching and Team Training</h3>
            <p className="text-ink/65 leading-relaxed">
              Bring Osil in to train your team, group, ministry, or organization in identity, leadership, communication, growth, clarity, alignment, and breakthrough.
            </p>
          </div>
          <div className="bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sunrise/15 mb-6">
              <svg className="w-6 h-6 text-sunrise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-ink mb-4">One-on-One Coaching</h3>
            <p className="text-ink/65 leading-relaxed">
              Private high-level coaching for people ready for focused support, deep clarity, and strong next steps in life, leadership, business, ministry, or personal growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-20 md:py-24 px-6 lg:px-10 bg-sunrise/10 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ink mb-6">Ready to get started?</h2>
        <p className="text-ink/65 text-lg mb-10">Reach out to discuss how we can work together.</p>
        <ButtonPrimary to="/contact">Contact Osil</ButtonPrimary>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function WorkWithMe() {
  return (
    <>
      <PageHero />
      <Consulting />
      <Mentoring />
      <Coaching />
      <CTA />
    </>
  )
}
