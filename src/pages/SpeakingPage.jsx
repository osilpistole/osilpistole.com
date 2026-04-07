import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'

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
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 lg:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionLabel color="text-sunrise">Speaking</SectionLabel>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-ink leading-tight tracking-tight">
            Speaking that brings clarity and breakthrough
          </h1>
          <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
            Osil speaks with warmth, authority, and practical insight. Her messages help people reconnect with identity, break limiting beliefs, and move forward with courage, confidence, and purpose.
          </p>
        </div>
      </section>

      {/* Topics & Availability */}
      <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ink mb-6">Speaking Topics</h2>
            <div className="flex flex-wrap gap-3">
              {topics.map((t) => (
                <span key={t} className="bg-sunrise/10 text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ink mb-6">Available For</h2>
            <div className="flex flex-wrap gap-3">
              {availableFor.map((a) => (
                <span key={a} className="bg-growth/10 text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-6 lg:px-10 bg-sunrise/10 text-center">
        <div className="max-w-2xl mx-auto">
          <SectionHeading className="mb-6">Bring Osil to your event.</SectionHeading>
          <p className="text-ink/65 text-lg mb-10">
            Inquire about booking Osil for your conference, retreat, church, team training, podcast, or event.
          </p>
          <ButtonPrimary to="/contact">Inquire About Speaking</ButtonPrimary>
        </div>
      </section>
    </>
  )
}
