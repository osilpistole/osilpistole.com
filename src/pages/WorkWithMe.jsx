import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'

/* ─── Page Hero ─── */
function PageHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 lg:px-10 text-center overflow-hidden">
      <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-growth/8 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-[10%] w-56 h-56 rounded-full bg-sunrise/8 blur-3xl animate-float-delayed" />

      <div className="relative max-w-3xl mx-auto">
        <RevealSection>
          <SectionLabel>Work With Osil</SectionLabel>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-ink leading-tight tracking-tight">
            Consulting, mentoring, and coaching for <span className="gradient-text-animated">real movement.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
            Whether you need strategic implementation, personal mentoring, or team training, this work is about getting clear and building something real.
          </p>
        </RevealSection>
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
          <RevealSection>
            <SectionLabel>Consulting</SectionLabel>
            <SectionHeading className="mb-6 text-3xl md:text-4xl!">Strategy plus implementation</SectionHeading>
            <div className="rounded-2xl overflow-hidden mb-6 shadow-lg image-glow">
              <img
                src={import.meta.env.BASE_URL + 'images/consulting-working.jpg'}
                alt="Osil Pistole"
                className="w-full h-56 md:h-72 object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-ink/65 leading-relaxed text-lg mb-6">
              Osil helps take ideas from concept to execution. She brings both vision and practical strategy, helping leaders, brands, ministries, and organizations create momentum and build something real.
            </p>
            <p className="text-ink font-medium italic text-lg border-l-4 border-sunrise pl-5">
              This is not just advice. It is clarity, strategy, and movement.
            </p>
          </RevealSection>
          <RevealSection delay={0.15}>
            <div className="bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-ink mb-6">What this can include</h3>
              <div className="space-y-3">
                {services.map((s, i) => {
                  const colors = ['bg-growth', 'bg-sunrise', 'bg-morning']
                  return (
                    <div key={s} className="flex items-start gap-3 group">
                      <span className={`mt-1.5 w-2 h-2 rounded-full ${colors[i % 3]} shrink-0 group-hover:scale-150 transition-transform duration-200`} />
                      <span className="text-ink/65">{s}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealSection>
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
    <section className="relative py-20 md:py-28 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-morning/10 via-parchment to-morning/5" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <RevealSection className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-ink mb-6">Mentoring Areas</h3>
              <div className="space-y-3">
                {mentoringAreas.map((a, i) => {
                  const colors = ['bg-morning', 'bg-growth', 'bg-sunrise']
                  return (
                    <div key={a} className="flex items-start gap-3 group">
                      <span className={`mt-1.5 w-2 h-2 rounded-full ${colors[i % 3]} shrink-0 group-hover:scale-150 transition-transform duration-200`} />
                      <span className="text-ink/65">{a}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealSection>
          <RevealSection className="order-1 lg:order-2" delay={0.15}>
            <SectionLabel color="text-morning">Mentoring</SectionLabel>
            <SectionHeading className="mb-6 text-3xl md:text-4xl!">Mentoring for voice, calling, and clarity</SectionHeading>
            <p className="text-ink/65 leading-relaxed text-lg mb-6">
              For those who are ready to stop second-guessing themselves and step fully into who they are, Osil offers mentoring that is grounded, clear, and transformational.
            </p>
            <p className="text-ink font-medium italic text-lg border-l-4 border-morning pl-5">
              This is about getting clear, getting grounded, and moving forward with confidence.
            </p>
          </RevealSection>
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
        <RevealSection>
          <div className="text-center mb-14">
            <SectionLabel color="text-growth">Coaching</SectionLabel>
            <SectionHeading>Coaching and team training</SectionHeading>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <RevealSection delay={0.1} className="flex">
            <div className="flex flex-col bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 hover:shadow-xl hover:-translate-y-1 hover:border-growth/30 transition-all duration-400 w-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-growth/15 mb-6">
                <svg className="w-6 h-6 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-ink mb-4">Group Coaching and Team Training</h3>
              <p className="text-ink/65 leading-relaxed mb-4">
                Bring Osil in to train your team, group, ministry, or organization. Group training focuses on:
              </p>
              <div className="space-y-2">
                {['Identity and purpose', 'Prophecy and hearing God', 'Prophetic processing and activation', 'Building healthy prophetic teams', 'Leadership from wholeness'].map((item, i) => {
                  const colors = ['bg-growth', 'bg-morning', 'bg-sunrise']
                  return (
                    <div key={item} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors[i % 3]} shrink-0`} />
                      <span className="text-ink/65 text-sm">{item}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.2} className="flex">
            <div className="flex flex-col bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 hover:shadow-xl hover:-translate-y-1 hover:border-sunrise/30 transition-all duration-400 w-full">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sunrise/15 mb-6">
                <svg className="w-6 h-6 text-sunrise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-ink mb-4">One-on-One Coaching</h3>
              <p className="text-ink/65 leading-relaxed mb-4">
                Private high-level coaching for people ready for focused support, deep clarity, and strong next steps. Sessions include:
              </p>
              <div className="space-y-2 flex-1">
                {['Life strategy and clarity', 'Destiny and calling', 'Breakthrough sessions', 'Prophetic sessions', 'Leadership development', 'Personal growth and confidence'].map((item, i) => {
                  const colors = ['bg-sunrise', 'bg-morning', 'bg-growth']
                  return (
                    <div key={item} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors[i % 3]} shrink-0`} />
                      <span className="text-ink/65 text-sm">{item}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="relative py-20 md:py-24 px-6 lg:px-10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-growth/10 via-sunrise/10 to-morning/10" />
      <div className="absolute top-0 left-0 right-0 h-1.5 color-stripe" />
      <div className="relative max-w-2xl mx-auto">
        <RevealSection>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ink mb-6">Ready to get started?</h2>
          <p className="text-ink/65 text-lg mb-10">Reach out to discuss how we can work together.</p>
          <ButtonPrimary to="/contact">Contact Osil</ButtonPrimary>
        </RevealSection>
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
