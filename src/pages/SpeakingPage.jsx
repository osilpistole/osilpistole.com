import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'

const topics = [
  'Identity and purpose', 'Destiny and calling', 'Breaking limiting beliefs',
  'Breakthrough and forward movement', 'Leadership from wholeness',
  'Confidence and voice', 'Hearing God and spiritual confidence',
  'Building healthy prophetic teams', 'Emotional and spiritual growth',
  'Living with clarity, courage, and hope',
]

const availableFor = [
  'Conferences', 'Churches', 'Retreats', "Women's events",
  'Leadership events', 'Podcasts', 'Panels', 'Team trainings',
  'Corporate culture conversations',
]

export default function SpeakingPage() {
  return (
    <>
      {/* Hero with gradient accent */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 lg:px-10 text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sunrise/8 blur-3xl -translate-y-1/2 translate-x-1/3 animate-float" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-morning/8 blur-3xl translate-y-1/2 -translate-x-1/3 animate-float-delayed" />
        <div className="absolute top-28 left-[8%] w-16 h-16 rounded-full border-2 border-dashed border-sunrise/20 animate-spin-slow hidden md:block" />
        <div className="absolute bottom-10 right-[8%] w-12 h-12 rounded-full border-2 border-dashed border-growth/20 animate-spin-slow hidden md:block" style={{ animationDirection: 'reverse' }} />

        <div className="relative max-w-3xl mx-auto">
          <RevealSection>
            <SectionLabel color="text-sunrise">Speaking</SectionLabel>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-ink leading-tight tracking-tight">
              Speaking that brings <span className="gradient-text-animated">clarity and breakthrough</span>
            </h1>
            <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
              Osil speaks with warmth, authority, and practical insight. Her messages help people reconnect with identity, break limiting beliefs, and move forward with courage, confidence, and purpose.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Topics & Availability */}
      <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <RevealSection>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ink mb-6">Speaking Topics</h2>
            <div className="flex flex-wrap gap-3">
              {topics.map((t, i) => {
                const colors = ['bg-sunrise/10 hover:bg-sunrise/20', 'bg-morning/12 hover:bg-morning/22', 'bg-growth/10 hover:bg-growth/20']
                return (
                  <span
                    key={t}
                    className={`${colors[i % 3]} text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200`}
                  >
                    {t}
                  </span>
                )
              })}
            </div>
          </RevealSection>
          <RevealSection delay={0.15}>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ink mb-6">Available For</h2>
            <div className="flex flex-wrap gap-3">
              {availableFor.map((a, i) => {
                const colors = ['bg-growth/10 hover:bg-growth/20', 'bg-sunrise/10 hover:bg-sunrise/20', 'bg-morning/12 hover:bg-morning/22']
                return (
                  <span
                    key={a}
                    className={`${colors[i % 3]} text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200`}
                  >
                    {a}
                  </span>
                )
              })}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Testimonial-style quote with background photo */}
      <section className="relative py-16 md:py-24 px-6 lg:px-10 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={import.meta.env.BASE_URL + 'images/speaking-bw.jpg'}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="absolute top-5 right-[10%] w-40 h-40 rounded-full bg-sunrise/10 blur-3xl animate-float" />
        <div className="absolute bottom-5 left-[10%] w-32 h-32 rounded-full bg-morning/10 blur-3xl animate-float-delayed" />
        <div className="relative max-w-3xl mx-auto text-center">
          <RevealSection>
            <svg className="w-10 h-10 text-sunrise/50 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed italic">
              Osil doesn't just deliver a message. She creates a moment where people feel seen, understood, and empowered to take their next step.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 px-6 lg:px-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunrise/15 via-morning/10 to-growth/10" />
        <div className="absolute top-0 left-0 right-0 h-1.5 color-stripe" />
        <div className="relative max-w-2xl mx-auto">
          <RevealSection>
            <SectionHeading className="mb-6">Bring Osil to your event.</SectionHeading>
            <p className="text-ink/65 text-lg mb-10">
              Inquire about booking Osil for your conference, retreat, church, team training, podcast, or event.
            </p>
            <ButtonPrimary to="/contact">Inquire About Speaking</ButtonPrimary>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
