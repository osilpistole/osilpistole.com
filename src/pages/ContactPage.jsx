import { useState } from 'react'
import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const interestOptions = [
  'Speaking', 'Consulting', 'Mentoring', 'Coaching', 'Team Training', 'Other',
]

const FORM_URL = 'https://formsubmit.co/ajax/osil@osilpistole.com'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/osil-pistole/', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  { label: 'Instagram', href: 'https://www.instagram.com/osil.pistole/', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@osilpistole', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
  { label: 'Facebook', href: 'https://www.facebook.com/osil.pistole/', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@osil.pistole', icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /> },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `New inquiry from ${form.name} — ${form.interest}`, _template: 'table' }),
      })
      if (res.ok) { setSubmitted(true); setForm({ name: '', email: '', organization: '', interest: '', message: '' }) }
      else setError('Something went wrong. Please try again or email directly.')
    } catch { setError('Something went wrong. Please try again or email directly.') }
    finally { setSending(false) }
  }

  const inputClass = 'w-full px-5 py-3.5 rounded-2xl border border-ink/10 bg-parchment text-ink placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-sunrise/40 focus:border-sunrise/40 transition-all text-sm'

  return (
    <>
      {/* Hero — warm parchment, centered with large decorative HELLO */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 px-6 lg:px-14 bg-parchment overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        {/* Large decorative word */}
        <p className="absolute bottom-0 right-[-2%] font-heading text-[20vw] font-black text-ink/[0.04] leading-none select-none pointer-events-none translate-y-6">HELLO</p>
        {/* Soft blobs */}
        <div className="absolute top-[10%] right-[10%] w-80 h-80 rounded-full bg-sunrise/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] left-[5%] w-56 h-56 rounded-full bg-morning/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Get In Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight max-w-3xl">
              Let's start a conversation.
            </h1>
            <p className="mt-8 text-ink/55 text-lg leading-relaxed max-w-xl">
              To inquire about speaking, consulting, coaching, mentoring, or training — reach out below and Osil will be in touch soon.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Sidebar */}
            <RevealSection>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Email</p>
                  <a href="mailto:osil@osilpistole.com" className="text-ink font-semibold hover:text-sunrise transition-colors">
                    osil@osilpistole.com
                  </a>
                </div>
                <div>
                  <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Services</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Speaking', to: '/speaking' },
                      { label: 'Consulting', to: '/consulting' },
                      { label: 'Mentoring', to: '/mentoring' },
                      { label: 'Coaching', to: '/coaching' },
                    ].map((s) => (
                      <Link key={s.label} to={s.to} className="text-ink/55 hover:text-ink transition-colors text-sm font-medium flex items-center gap-1.5 group">
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span> {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-ink/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Follow</p>
                  <div className="flex gap-3 flex-wrap">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        className="w-9 h-9 rounded-xl bg-ink/5 hover:bg-sunrise hover:text-ink text-ink/40 flex items-center justify-center transition-all duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Form */}
            <div className="lg:col-span-2">
              <RevealSection delay={0.1}>
                {submitted ? (
                  <div className="bg-white rounded-3xl p-12 border border-ink/8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-growth/15 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-ink mb-3">Message sent!</h2>
                    <p className="text-ink/55">Osil will be in touch soon.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-sunrise font-semibold text-sm hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-ink/8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Name</label>
                        <input type="text" id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Email</label>
                        <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Organization <span className="normal-case tracking-normal font-normal text-ink/25">(optional)</span></label>
                      <input type="text" id="organization" name="organization" value={form.organization} onChange={handleChange} className={inputClass} placeholder="Company or organization" />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">I'm interested in</label>
                      <select id="interest" name="interest" required value={form.interest} onChange={handleChange} className={`${inputClass} appearance-none`}>
                        <option value="">Select a service</option>
                        {interestOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-ink/40 mb-2">Message</label>
                      <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Tell Osil about what you're looking for…" />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                      type="submit" disabled={sending}
                      className="w-full bg-sunrise text-ink font-bold py-4 rounded-2xl hover:bg-sunrise/85 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </RevealSection>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
