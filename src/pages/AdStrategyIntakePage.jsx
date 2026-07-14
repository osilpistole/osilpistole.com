import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const CALENDLY_URL = 'https://calendly.com/osilpistolecoaching/discovery-call-website-build'

// Section definitions — 5 sections that feel like a strategic conversation.
const SECTIONS = [
  { key: 'business',   title: 'Who you are',                eyebrow: 'The business' },
  { key: 'audience',   title: 'Your goal + your people',    eyebrow: 'The vision' },
  { key: 'journey',    title: 'What happens after the click', eyebrow: 'The customer journey' },
  { key: 'depth',      title: 'The real questions',         eyebrow: 'What people are really buying' },
  { key: 'practical',  title: 'What you have, what you spend', eyebrow: 'The practical' },
]

const initialForm = {
  // Section 1 — Business
  business_name: '',
  contact_name: '',
  email: '',
  phone: '',
  website: '',
  facebook_page: '',
  instagram: '',

  // Section 2 — Goal + Client
  primary_goal: '',
  primary_goal_other: '',
  what_you_do: '',
  what_makes_you_different: '',
  why_customers_choose_you: '',
  ideal_client_demo: '',
  ideal_client_struggling: '',
  stop_scrolling_hook: '',

  // Section 3 — Journey
  offer_description: '',
  offer_type: '',
  destination_type: '',
  destination_url: '',
  destination_other: '',
  follow_up_who: '',
  follow_up_speed: '',
  becomes_customer_how: '',
  the_one_thing: '',

  // Section 4 — Depth
  pre_purchase_questions: '',
  objections: '',
  what_theyre_really_buying: '',
  customer_without_talking: '',

  // Section 5 — Practical
  monthly_budget: '',
  success_metric: '',
  assets_have: [],
  marketing_assets: [],
  anything_else: '',
}

const GOALS = [
  'Get more phone calls',
  'Get more leads',
  'Book appointments',
  'Sell a product',
  'Register for an event',
  'Increase awareness',
  'Grow your email list',
  'Other',
]

const OFFER_TYPES = [
  'Free consultation',
  'Special pricing',
  'New product',
  'Limited-time offer',
  'Free guide / lead magnet',
  'Event',
  'Other',
]

const DESTINATIONS = [
  { value: 'website',       label: 'A page on my website',   asksUrl: true },
  { value: 'landing_page',  label: 'A dedicated landing page', asksUrl: true },
  { value: 'lead_form',     label: 'A Facebook Lead Form',   asksUrl: false },
  { value: 'call',          label: 'A phone call',           asksUrl: false },
  { value: 'email',         label: 'An email inbox',         asksUrl: false },
  { value: 'messenger',     label: 'Messenger',              asksUrl: false },
  { value: 'ig_dm',         label: 'Instagram DM',           asksUrl: false },
  { value: 'other',         label: 'Other',                  asksUrl: false },
]

const ASSETS = [
  'Website', 'Landing page', 'CRM', 'Email marketing (Kit / MailChimp / etc.)',
  'Appointment scheduler', 'Online booking', 'Meta Pixel installed', 'Google Analytics',
]

const MARKETING_ASSETS = [
  'Photos', 'Videos', 'Logo', 'Testimonials',
  'Written reviews', 'Brand colors defined', 'Brand fonts defined',
]

export default function AdStrategyIntakePage() {
  const [step, setStep] = useState(0)   // 0 = intro; 1-5 = sections; 6 = done
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Scroll to top on step change so users don't lose the flow.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const totalSteps = SECTIONS.length

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function toggle(field, value) {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }))
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/ad-strategy-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(body || `Server error ${res.status}`)
      }
      setStep(6)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  // Section-level validation before allowing "Next"
  function canProceed() {
    if (step === 1) return form.business_name && form.contact_name && form.email
    if (step === 2) return form.primary_goal && form.what_you_do && form.ideal_client_struggling
    if (step === 3) return form.offer_description && form.destination_type && form.the_one_thing
    if (step === 4) return form.pre_purchase_questions && form.what_theyre_really_buying
    if (step === 5) return form.monthly_budget && form.success_metric
    return true
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 px-6 lg:px-14 bg-parchment overflow-hidden">
        <p className="absolute bottom-0 right-0 font-heading text-[15vw] font-black text-ink/[0.05] leading-none select-none pointer-events-none translate-y-3">STRATEGY</p>

        <div className="relative max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-ink/65 text-xs font-bold uppercase tracking-[0.25em] mb-4">Facebook Ad Strategy Intake</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] tracking-tight max-w-3xl">
              Not a form. A conversation.
            </h1>
            <p className="mt-6 text-ink/65 text-lg leading-relaxed max-w-2xl">
              Before we spend a dollar on ads, we get honest about your customer journey — what you're really selling, who it's really for, and what happens the moment someone clicks. Twelve minutes. Answer as if we were on a call.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* FORM WRAPPER */}
      <section className="px-6 lg:px-14 py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* STEP 0 — Intro / start */}
          {step === 0 && (
            <RevealSection>
              <div className="bg-parchment border border-ink/8 rounded-3xl p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink/55 mb-3">Before you start</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-5 tracking-tight">
                  Here's what to expect.
                </h2>
                <div className="space-y-4 text-ink/75 leading-relaxed">
                  <p>Five short sections. Every question has a purpose — the strategist questions (in Section 4) are the ones that separate a good campaign from a wasted budget.</p>
                  <p>Answer honestly. "I don't know" is a valid answer to any question — that just tells me where we start.</p>
                  <p>When you submit, I get everything in my inbox and I reply within 24 hours with a call slot and a first take on your funnel.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-8 inline-flex items-center gap-2 bg-ink text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-ink/85 transition-colors shadow-lg"
                >
                  Start the intake →
                </button>
                <p className="mt-4 text-xs text-ink/45">Takes about 12 minutes.</p>
              </div>
            </RevealSection>
          )}

          {/* STEP 1-5 — Form sections */}
          {step >= 1 && step <= 5 && (
            <>
              <ProgressBar current={step} total={totalSteps} sections={SECTIONS} />

              <div className="mt-8 bg-parchment border border-ink/8 rounded-3xl p-7 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sunrise mb-2">
                  Section {step} of {totalSteps} · {SECTIONS[step - 1].eyebrow}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-8 tracking-tight">
                  {SECTIONS[step - 1].title}
                </h2>

                {step === 1 && (
                  <div className="space-y-6">
                    <Field label="Business name" required>
                      <input value={form.business_name} onChange={e => update('business_name', e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Your name" required>
                      <input value={form.contact_name} onChange={e => update('contact_name', e.target.value)} className={inputCls} />
                    </Field>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Best email" required>
                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inputCls} />
                      </Field>
                      <Field label="Phone (optional)">
                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Website (or 'none yet')">
                      <input value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://…" className={inputCls} />
                    </Field>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Facebook Page (URL)">
                        <input value={form.facebook_page} onChange={e => update('facebook_page', e.target.value)} placeholder="https://facebook.com/…" className={inputCls} />
                      </Field>
                      <Field label="Instagram (@handle or URL)">
                        <input value={form.instagram} onChange={e => update('instagram', e.target.value)} placeholder="@handle" className={inputCls} />
                      </Field>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <Field label="What's the ONE goal of this ad?" required hint="Pick one. Not two. One.">
                      <div className="space-y-2">
                        {GOALS.map(g => (
                          <label key={g} className={radioCls(form.primary_goal === g)}>
                            <input type="radio" name="primary_goal" value={g} checked={form.primary_goal === g} onChange={() => update('primary_goal', g)} className="sr-only" />
                            <span>{g}</span>
                          </label>
                        ))}
                        {form.primary_goal === 'Other' && (
                          <input value={form.primary_goal_other} onChange={e => update('primary_goal_other', e.target.value)} placeholder="Say more…" className={inputCls + ' mt-2'} />
                        )}
                      </div>
                    </Field>

                    <Field label="What do you do?" required hint="One or two clear sentences.">
                      <textarea rows={2} value={form.what_you_do} onChange={e => update('what_you_do', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="What makes you different?">
                      <textarea rows={2} value={form.what_makes_you_different} onChange={e => update('what_makes_you_different', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="Why do your existing customers choose you?">
                      <textarea rows={2} value={form.why_customers_choose_you} onChange={e => update('why_customers_choose_you', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>

                    <Field label="Describe your ideal client" hint="Age range, gender, location, income if relevant, interests.">
                      <textarea rows={3} value={form.ideal_client_demo} onChange={e => update('ideal_client_demo', e.target.value)} placeholder="Women 35-55 in the US, service business owners..." className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="What are they really struggling with?" required>
                      <textarea rows={3} value={form.ideal_client_struggling} onChange={e => update('ideal_client_struggling', e.target.value)} placeholder="Not surface-level. What keeps them up at night?" className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="What would make them stop scrolling?">
                      <textarea rows={2} value={form.stop_scrolling_hook} onChange={e => update('stop_scrolling_hook', e.target.value)} placeholder="A phrase, image, or promise that would hook them mid-feed." className={inputCls + ' resize-none'} />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <Field label="What are you promoting?" required hint="The offer in the ad. Be specific.">
                      <textarea rows={2} value={form.offer_description} onChange={e => update('offer_description', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="Type of offer">
                      <select value={form.offer_type} onChange={e => update('offer_type', e.target.value)} className={inputCls}>
                        <option value="">Pick one…</option>
                        {OFFER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>

                    <Field label="Where does the click go?" required>
                      <div className="space-y-2">
                        {DESTINATIONS.map(d => (
                          <label key={d.value} className={radioCls(form.destination_type === d.value)}>
                            <input type="radio" name="destination_type" value={d.value} checked={form.destination_type === d.value} onChange={() => update('destination_type', d.value)} className="sr-only" />
                            <span>{d.label}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    {DESTINATIONS.find(d => d.value === form.destination_type)?.asksUrl && (
                      <Field label="URL of that page">
                        <input value={form.destination_url} onChange={e => update('destination_url', e.target.value)} placeholder="https://…" className={inputCls} />
                      </Field>
                    )}
                    {form.destination_type === 'other' && (
                      <Field label="Describe">
                        <input value={form.destination_other} onChange={e => update('destination_other', e.target.value)} className={inputCls} />
                      </Field>
                    )}

                    <Field label="Who follows up when someone responds?">
                      <input value={form.follow_up_who} onChange={e => update('follow_up_who', e.target.value)} placeholder="Me. Or Sarah on my team. Or automated." className={inputCls} />
                    </Field>
                    <Field label="How quickly?" hint='"Within 5 minutes" beats "within 24 hours" every time.'>
                      <input value={form.follow_up_speed} onChange={e => update('follow_up_speed', e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="How do they actually become a paying customer?" hint="Walk me through it: form → email → call → sale? Or something else?">
                      <textarea rows={3} value={form.becomes_customer_how} onChange={e => update('becomes_customer_how', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>

                    <Field label="What is the ONE thing you want them to do?" required hint="Not two. Not five. If they do this, everything else can follow.">
                      <textarea rows={2} value={form.the_one_thing} onChange={e => update('the_one_thing', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <p className="text-sm text-ink/60 leading-relaxed bg-white border border-ink/8 rounded-xl p-4 mb-2">
                      These are the questions that decide whether a campaign works. Answer them honestly — even a "I don't know" is useful data.
                    </p>
                    <Field label="What questions do people ask you before buying?" required hint="Word for word if you can. These often become ad copy.">
                      <textarea rows={3} value={form.pre_purchase_questions} onChange={e => update('pre_purchase_questions', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="What objections come up?" hint='"Too expensive." "I can do it myself." "Not the right time." What you actually hear.'>
                      <textarea rows={3} value={form.objections} onChange={e => update('objections', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="What are people really buying?" required hint="Not the deliverable — the outcome. Freedom. Confidence. Time back. Pride. Rest.">
                      <textarea rows={3} value={form.what_theyre_really_buying} onChange={e => update('what_theyre_really_buying', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                    <Field label="Could someone become a customer WITHOUT talking to you?" hint='If "no" — that\'s important. Tells us the ad has to book a call, not sell direct.'>
                      <div className="space-y-2">
                        {['Yes — full self-serve buy is possible', 'Sometimes — smaller offers, yes; big ones no', 'No — they need to talk to me first'].map(v => (
                          <label key={v} className={radioCls(form.customer_without_talking === v)}>
                            <input type="radio" name="customer_without_talking" value={v} checked={form.customer_without_talking === v} onChange={() => update('customer_without_talking', v)} className="sr-only" />
                            <span>{v}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <Field label="Monthly ad budget" required hint="Even a rough number. Under $500? $500-$1,500? $1,500-$5,000? $5K+? Not sure?">
                      <input value={form.monthly_budget} onChange={e => update('monthly_budget', e.target.value)} placeholder="$_____ /month" className={inputCls} />
                    </Field>
                    <Field label="What would make this campaign a success?" required hint="Number of leads? Calls? Appointments? Sales? Revenue?">
                      <textarea rows={3} value={form.success_metric} onChange={e => update('success_metric', e.target.value)} placeholder="e.g. 20 discovery calls booked in 30 days, or 5 paying clients." className={inputCls + ' resize-none'} />
                    </Field>

                    <Field label="What do you already have?" hint="Check what applies.">
                      <div className="grid md:grid-cols-2 gap-2">
                        {ASSETS.map(a => (
                          <label key={a} className={checkboxCls(form.assets_have.includes(a))}>
                            <input type="checkbox" checked={form.assets_have.includes(a)} onChange={() => toggle('assets_have', a)} className="sr-only" />
                            <span>{a}</span>
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field label="Marketing assets available" hint="For the ad creative.">
                      <div className="grid md:grid-cols-2 gap-2">
                        {MARKETING_ASSETS.map(a => (
                          <label key={a} className={checkboxCls(form.marketing_assets.includes(a))}>
                            <input type="checkbox" checked={form.marketing_assets.includes(a)} onChange={() => toggle('marketing_assets', a)} className="sr-only" />
                            <span>{a}</span>
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field label="Anything else I should know?" hint="Optional. Vent. Ask. Share.">
                      <textarea rows={3} value={form.anything_else} onChange={e => update('anything_else', e.target.value)} className={inputCls + ' resize-none'} />
                    </Field>
                  </div>
                )}

                {/* Nav */}
                <div className="mt-10 pt-6 border-t border-ink/8 flex items-center justify-between gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={submitting}
                    className="text-sm font-semibold text-ink/55 hover:text-ink disabled:opacity-50 flex items-center gap-1.5"
                  >
                    ← Back
                  </button>

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canProceed()}
                      className="inline-flex items-center gap-2 bg-sunrise hover:bg-[#f0be2e] disabled:opacity-40 disabled:cursor-not-allowed text-ink font-bold text-sm px-6 py-3 rounded-full shadow"
                    >
                      Next section →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!canProceed() || submitting}
                      className="inline-flex items-center gap-2 bg-ink hover:bg-ink/85 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-7 py-3 rounded-full shadow-lg"
                    >
                      {submitting ? 'Sending…' : 'Send it to Osil →'}
                    </button>
                  )}
                </div>

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </>
          )}

          {/* STEP 6 — Done */}
          {step === 6 && (
            <RevealSection>
              <div className="bg-parchment border border-ink/8 rounded-3xl p-8 md:p-12 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-growth mb-3">✓ Sent</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-5 tracking-tight">
                  Got it. Thank you.
                </h2>
                <p className="text-ink/65 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  I'll read every answer carefully and reply within 24 hours with a first take on your funnel + a slot for us to talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink/85 transition-all shadow-lg"
                  >
                    Book the call now →
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-ink/25 text-ink text-sm font-semibold hover:border-ink/50 hover:bg-ink/5"
                  >
                    Back to home
                  </Link>
                </div>
                <p className="text-ink/45 text-xs mt-8">— Osil</p>
              </div>
            </RevealSection>
          )}

        </div>
      </section>
    </>
  )
}

// ---- Small primitives ------------------------------------------------

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-sunrise">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-ink/55 mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  )
}

function ProgressBar({ current, total, sections }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-ink/55 mb-2">
        <span className="font-semibold">{sections[current - 1]?.eyebrow}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-ink/8 rounded-full overflow-hidden">
        <div className="h-full bg-sunrise transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

const inputCls =
  'w-full bg-white border border-ink/12 rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-sunrise focus:ring-2 focus:ring-sunrise/30'

function radioCls(active) {
  return `flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all ${
    active
      ? 'bg-sunrise/15 border-sunrise text-ink font-semibold'
      : 'bg-white border-ink/12 text-ink/75 hover:border-ink/30'
  }`
}

function checkboxCls(active) {
  return `flex items-center gap-2.5 cursor-pointer px-3.5 py-2.5 rounded-lg border transition-all text-sm ${
    active
      ? 'bg-growth/15 border-growth/50 text-ink font-semibold'
      : 'bg-white border-ink/12 text-ink/75 hover:border-ink/30'
  }`
}
