import { useState } from 'react'
import SectionLabel from '../components/SectionLabel'

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
      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 px-6 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-ink mb-4">Get in touch</h1>
          <p className="text-ink/65 text-lg">
            To inquire about speaking, consulting, coaching, mentoring, or training, reach out below.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20 px-6 lg:px-10">
        <div className="max-w-xl mx-auto">
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
                className="w-full bg-sunrise text-ink font-semibold py-3.5 rounded-full hover:bg-sunrise/85 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Email fallback */}
      <section className="pb-20 px-6 lg:px-10 text-center">
        <p className="text-ink/50 text-sm">
          Or email directly at{' '}
          <a href="mailto:hello@osilpistole.com" className="text-ink/70 hover:text-sunrise transition-colors underline">
            hello@osilpistole.com
          </a>
        </p>
      </section>
    </>
  )
}
