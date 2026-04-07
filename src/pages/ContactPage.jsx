import { useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import RevealSection from '../components/RevealSection'

const interestOptions = [
  'Speaking', 'Consulting', 'Mentoring', 'Coaching', 'Team Training', 'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', organization: '', interest: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', organization: '', interest: '', message: '' })
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-ink/10 bg-parchment text-ink placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-sunrise/50 focus:border-sunrise transition-all'

  return (
    <>
      {/* Hero with photo */}
      <section className="relative pt-32 pb-2 md:pt-40 md:pb-4 px-6 lg:px-10 overflow-hidden">
        <div className="absolute top-10 right-[15%] w-48 h-48 rounded-full bg-morning/10 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-[15%] w-40 h-40 rounded-full bg-sunrise/8 blur-3xl animate-float-delayed" />

        <div className="relative max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center">
              <SectionLabel>Contact</SectionLabel>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-ink mb-4">
                Let's <span className="gradient-text">connect</span>
              </h1>
              <p className="text-ink/65 text-lg max-w-2xl mx-auto">
                To inquire about speaking, consulting, coaching, mentoring, or training, reach out below.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-12 px-6 lg:px-10">
        <div className="max-w-xl mx-auto">
          <RevealSection>
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 border border-ink/5 shadow-sm text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-growth/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-semibold text-ink mb-3">Thank you!</h2>
                <p className="text-ink/65">Your message has been sent. Osil will be in touch soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sunrise font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink/75 mb-1.5">Name</label>
                  <input
                    type="text" id="name" name="name" required
                    value={form.name} onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink/75 mb-1.5">Email</label>
                  <input
                    type="email" id="email" name="email" required
                    value={form.email} onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-ink/75 mb-1.5">Organization</label>
                  <input
                    type="text" id="organization" name="organization"
                    value={form.organization} onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-ink/75 mb-1.5">What are you interested in?</label>
                  <select
                    id="interest" name="interest" required
                    value={form.interest} onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Select an option</option>
                    {interestOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink/75 mb-1.5">Message</label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sunrise text-ink font-semibold py-3.5 rounded-full hover:bg-sunrise/85 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>

      {/* Email fallback + socials */}
      <section className="pb-20 px-6 lg:px-10 text-center">
        <RevealSection>
          <p className="text-ink/50 text-sm">
            Or email directly at{' '}
            <a href="mailto:osil@osilpistole.com" className="text-ink/70 hover:text-sunrise transition-colors underline">
              osil@osilpistole.com
            </a>
          </p>
          <div className="flex justify-center gap-5 mt-6">
            <a
              href="https://www.linkedin.com/in/osilpistole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/30 hover:text-sunrise transition-colors duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/osil.pistole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/30 hover:text-sunrise transition-colors duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </RevealSection>
      </section>
    </>
  )
}
