import SectionLabel from '../components/SectionLabel'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonDark from '../components/ButtonDark'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo placeholder */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="w-64 h-80 md:w-80 md:h-[420px] bg-gradient-to-br from-sunrise/20 via-morning/20 to-growth/20 rounded-3xl flex items-end justify-center overflow-hidden border border-ink/5">
              <div className="text-center pb-10">
                <div className="w-24 h-24 mx-auto rounded-full bg-sunrise/30 flex items-center justify-center mb-4">
                  <span className="font-heading text-4xl font-bold text-ink">OP</span>
                </div>
                <p className="font-heading text-xl font-semibold text-ink">Osil Pistole</p>
                <p className="text-sm text-ink/50 mt-1">Speaker &bull; Consultant &bull; Mentor</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <SectionLabel>About</SectionLabel>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-ink mb-8">About Osil</h1>
            <div className="space-y-5 text-ink/65 leading-relaxed text-lg">
              <p>
                Osil Pistole is a speaker, consultant, mentor, and creative strategist with a passion for helping people and organizations move forward with clarity, confidence, and purpose.
              </p>
              <p>
                She brings together practical business insight, leadership experience, brand development, marketing strategy, and deep personal mentoring to help people build what they are called to build.
              </p>
              <p>
                Her work is both visionary and practical. She is known for helping people see clearly, cut through confusion, strengthen their message, and take real steps forward.
              </p>
              <p>
                Whether she is helping shape a brand, train a team, speak to a room, or mentor an individual, her heart is the same: to help people live with clarity, courage, hope, and momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-6 lg:px-10 bg-sunrise/10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-ink mb-6">
            Let's build something meaningful.
          </h2>
          <p className="text-lg text-ink/65 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you are looking for a speaker, a consultant, a mentor, or a trainer for your team, this is a space for clarity, breakthrough, and real movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary to="/work-with-me">Work With Osil</ButtonPrimary>
            <ButtonDark to="/contact">Contact Osil</ButtonDark>
          </div>
        </div>
      </section>
    </>
  )
}
