import SectionLabel from '../components/SectionLabel'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonDark from '../components/ButtonDark'
import RevealSection from '../components/RevealSection'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 lg:px-10 overflow-hidden">
        {/* Subtle decorative orbs */}
        <div className="absolute top-20 right-[5%] w-72 h-72 rounded-full bg-morning/10 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 rounded-full bg-sunrise/8 blur-3xl animate-float" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <RevealSection className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="rounded-3xl overflow-hidden border border-ink/5 shadow-xl image-glow">
                <img
                  src={import.meta.env.BASE_URL + 'images/polka-wall.jpg'}
                  alt="Osil Pistole"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-gradient-to-br from-sunrise/20 via-morning/15 to-growth/10 -z-10" />
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full border-2 border-dashed border-sunrise/25 animate-spin-slow -z-10" />
              <div className="absolute -bottom-8 -right-8 w-14 h-14 rounded-full border-2 border-dashed border-morning/25 animate-spin-slow -z-10" style={{ animationDirection: 'reverse' }} />
            </div>
          </RevealSection>

          {/* Bio */}
          <RevealSection delay={0.15}>
            <SectionLabel>About</SectionLabel>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-ink mb-8">About <span className="gradient-text-animated">Osil</span></h1>
            <div className="w-20 h-1.5 color-stripe mb-8 rounded-full" />
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
          </RevealSection>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-16 md:py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-sunrise/15 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-sunrise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink mb-2">Clarity</h3>
                <p className="text-ink/55 text-sm leading-relaxed">Cutting through the noise to see what matters and where to go next.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-growth/15 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink mb-2">Growth</h3>
                <p className="text-ink/55 text-sm leading-relaxed">Nurturing what's already inside you and building it into something real.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-morning/20 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-morning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink mb-2">Breakthrough</h3>
                <p className="text-ink/55 text-sm leading-relaxed">Moving past what's been holding you back into your fullest expression.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 px-6 lg:px-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunrise/15 via-morning/10 to-growth/10" />
        <div className="absolute top-0 left-0 right-0 h-1.5 color-stripe" />
        <div className="relative max-w-3xl mx-auto">
          <RevealSection>
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
          </RevealSection>
        </div>
      </section>
    </>
  )
}
