import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const CALENDLY_URL = 'https://calendly.com/osilpistolecoaching/discovery-call-website-build'

// Tiered build offerings — Pro is the recommended hero offer
const tiers = [
  {
    name: 'Starter',
    price: '$1,500',
    paymentNote: 'or 2-pay · $750 today + $750 in 30 days',
    timeline: '3–5 business days',
    blurb: 'A clean 5-page brochure site. For when you have an offer and just need it presented well.',
    bullets: [
      'Up to 5 pages (Home, About, Offer, Contact + one)',
      'Brand voice copy on every page',
      'Mobile-ready, fast loading',
      'Works on your existing platform',
      '1 round of edits + unlimited small fixes',
    ],
    cta: 'Start here',
    accent: 'border-ink/15 bg-parchment',
    badge: null,
  },
  {
    name: 'Pro',
    price: '$2,500',
    paymentNote: 'or 2-pay · $1,250 today + $1,250 in 30 days',
    timeline: '7–10 business days',
    blurb: 'A full launch-ready site with a working sales funnel. Most people want this one.',
    bullets: [
      'Up to 8 pages including a real sales page',
      'Product or checkout setup (ThriveCart / Stripe)',
      'Kit (or your email tool) wired in',
      'Brand voice copy across the funnel',
      'Mobile-perfect, conversion-aware design',
      '2 rounds of edits + unlimited small fixes',
    ],
    cta: 'Book a discovery call',
    accent: 'border-sunrise bg-sunrise/12',
    badge: 'Recommended',
  },
  {
    name: 'Custom',
    price: '$4,000+',
    paymentNote: 'Custom payment plans available',
    timeline: '2–3 weeks',
    blurb: 'For coaches launching a full ecosystem — multi-page funnel, automations, AI agents, the works.',
    bullets: [
      'Everything in Pro',
      'Custom landing pages + funnels',
      'Email automation + AI copy agents',
      'Custom integrations (Kit, ThriveCart, Calendly, more)',
      'Tailored to your launch plan',
      '3 rounds of edits + unlimited small fixes',
    ],
    cta: 'Let’s talk',
    accent: 'border-ink/15 bg-parchment',
    badge: null,
  },
]

const retainers = [
  {
    name: 'Lite',
    price: '$150/mo',
    blurb: 'Peace of mind. Monthly health-check, one small update, you stay focused on the work.',
    bullets: ['Monthly uptime + speed check', 'One small content/page update', 'Email support (48-hr response)'],
  },
  {
    name: 'Plus',
    price: '$300/mo',
    blurb: 'For coaches actively launching, iterating, and growing.',
    bullets: ['Everything in Lite', 'One new page or section monthly', 'Quarterly brand-voice copy review', 'Priority email + DM access'],
  },
]

const process = [
  { num: '01', title: 'Discovery call', desc: 'Free 20 minutes. We make sure this is the right fit. I take 2 builds a month — if it’s yes, you pick a slot.' },
  { num: '02', title: 'Scope + deposit', desc: 'You get a one-page build plan. 50% deposit locks your slot. Clear scope means no surprise scope-creep.' },
  { num: '03', title: 'Build (3 days to 3 weeks)', desc: 'Most sites ship in under 10 business days. I build alongside AI, but everything you see is approved by me. You get daily check-ins, not radio silence.' },
  { num: '04', title: 'Launch + 30-day support', desc: 'We ship it live. Then 30 days of free support to fix anything that surfaces. After that, the retainer kicks in if you want it.' },
]

const faqs = [
  {
    q: 'What platforms do you work with?',
    a: 'Wix, Squarespace, Kajabi, WordPress, Shopify — or a fresh build on GitHub + Vercel like the site you’re reading now. I meet you on whatever you already use.',
  },
  {
    q: 'What if I don’t have copy ready?',
    a: 'Brand voice copywriting is included. We do a short voice intake — you tell me how you talk, what you stand for, who you’re for — and I write in your voice, not generic agency speak.',
  },
  {
    q: 'How long does the build take?',
    a: 'Starter: 3–5 business days. Pro: 7–10 business days. Custom: 2–3 weeks. Most agencies quote 4–12 weeks for the same work. I move faster because I build alongside AI and scope tight from day one — not because I cut corners. Once your deposit is in, you’re on my calendar with a launch date that doesn’t move.',
  },
  {
    q: 'What’s included in maintenance?',
    a: 'Both retainer tiers include a monthly health-check + small updates. Plus adds one new page or section every month plus quarterly copy review. You can pause or cancel anytime.',
  },
  {
    q: 'Can I upgrade tiers later?',
    a: 'Yes. Plenty of clients start at Starter or Pro and grow into Custom as their business expands. The work I do early is built to scale — nothing has to be re-done.',
  },
  {
    q: 'What if we’re not a fit?',
    a: 'No pressure. The discovery call is exactly for that. If I’m not the right person, I’ll tell you and point you somewhere better. Honest answer over fast yes.',
  },
]

export default function BuildPage() {
  // Lazy-load the Calendly widget script once when the page mounts.
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      {/* HERO — parchment + sunrise accent */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-14 bg-parchment overflow-hidden">
        <p className="absolute bottom-0 right-0 font-heading text-[16vw] font-black text-ink/[0.05] leading-none select-none pointer-events-none translate-y-4">BUILD</p>

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Website + Product Builds · Two slots a month</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-ink leading-[1.05] tracking-tight max-w-4xl">
              Your website should sound like your work — clear, calm, and undeniably yours.
            </h1>
            <p className="mt-8 text-ink/65 text-lg leading-relaxed max-w-2xl">
              You already have what you need. The offer’s strong, the voice is real — the site just doesn’t carry the weight yet. I build sites that do. <strong className="text-ink">Strategy-led, AI-accelerated, faith-rooted.</strong>
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink/85 transition-all duration-200 shadow-lg"
              >
                Book a 20-min discovery call
              </a>
              <a
                href="#tiers"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-ink/25 text-ink text-sm font-semibold hover:border-ink/50 hover:bg-ink/5 transition-all duration-200"
              >
                See what’s included
              </a>
            </div>
            <p className="mt-6 text-ink/45 text-xs">
              You’re reading proof. This site you’re on right now? Built by me, with AI, in under a week.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="px-6 lg:px-14 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Who this is for</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Faith-led coaches, consultants, and mentors with something real to say — and a site that doesn’t say it yet.
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 mt-10 text-ink/70 leading-relaxed">
              <p>You have an offer that’s already working — the site just doesn’t reflect it.</p>
              <p>You want a site that holds your voice without sounding like a tech bro built it.</p>
              <p>You don’t want to learn another platform or babysit a designer for two months.</p>
              <p>You want speed and quality — not one or the other.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="px-6 lg:px-14 py-20 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">The build</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Three tiers. Same care on every one.
            </h2>
            <p className="text-ink/60 text-lg mt-4 max-w-2xl">Pick the one that matches where you are. You can always upgrade later — nothing has to be re-done.</p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {tiers.map((tier, i) => (
              <RevealSection key={tier.name} delay={i * 0.08}>
                <div className={`relative h-full rounded-3xl border-2 ${tier.accent} p-7`}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-7 inline-flex items-center bg-ink text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                  <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-2">{tier.name}</p>
                  <p className="font-heading text-3xl font-bold text-ink mb-1">{tier.price}</p>
                  {tier.paymentNote && (
                    <p className="text-ink/55 text-xs mb-2 leading-relaxed">{tier.paymentNote}</p>
                  )}
                  {tier.timeline && (
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink bg-white border border-ink/12 rounded-full px-2.5 py-1 mb-4">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden>
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M12 7v5l3 2" />
                      </svg>
                      Ships in {tier.timeline}
                    </p>
                  )}
                  <p className="text-ink/70 leading-relaxed mb-5 text-sm">{tier.blurb}</p>
                  <ul className="space-y-2.5 text-sm text-ink/75 mb-6">
                    {tier.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-sunrise flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#book"
                    className={`block text-center text-sm font-bold rounded-full py-3 transition-colors ${
                      tier.badge
                        ? 'bg-ink text-white hover:bg-ink/85'
                        : 'border-2 border-ink/25 text-ink hover:border-ink/50 hover:bg-ink/5'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="px-6 lg:px-14 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">After launch</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Optional maintenance, so your site keeps working while you keep working.
            </h2>
            <p className="text-ink/60 text-lg mt-4 max-w-2xl">Skip it if you’d rather handle updates yourself. Both retainers are pause-or-cancel anytime.</p>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {retainers.map((r, i) => (
              <RevealSection key={r.name} delay={i * 0.08}>
                <div className="rounded-3xl border-2 border-ink/15 bg-parchment p-7">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em]">{r.name}</p>
                    <p className="font-heading text-2xl font-bold text-ink">{r.price}</p>
                  </div>
                  <p className="text-ink/70 leading-relaxed mb-5 text-sm">{r.blurb}</p>
                  <ul className="space-y-2.5 text-sm text-ink/75">
                    {r.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS WORKS */}
      <section className="px-6 lg:px-14 py-20 bg-ink text-parchment">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-parchment/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Why this works</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">
              Built with AI. Built by a strategist. Built so it lasts.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <p className="font-heading text-2xl font-bold text-sunrise mb-2">Faster</p>
                <p className="text-parchment/70 text-sm leading-relaxed">I build alongside AI — so what takes most agencies 40 hours takes me 10. You get launched in days, not months.</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-sunrise mb-2">In your voice</p>
                <p className="text-parchment/70 text-sm leading-relaxed">Brand voice copy is the work. I write like you talk — no agency-speak, no “synergy,” no pain-led hooks. You stay you.</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-sunrise mb-2">On your platform</p>
                <p className="text-parchment/70 text-sm leading-relaxed">Wix, Squarespace, Kajabi, WordPress, or a fresh build. I work where you already are. No forced migrations.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 lg:px-14 py-20 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">The process</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight max-w-3xl">
              Four steps. No mystery. No drag.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {process.map((step, i) => (
              <RevealSection key={step.num} delay={i * 0.06}>
                <div className="rounded-3xl bg-white border border-ink/10 p-7">
                  <p className="font-heading text-4xl font-black text-sunrise mb-2">{step.num}</p>
                  <p className="font-heading text-xl font-bold text-ink mb-2">{step.title}</p>
                  <p className="text-ink/65 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="px-6 lg:px-14 py-20 bg-sunrise">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <p className="text-ink/55 text-[11px] font-bold uppercase tracking-[0.22em] mb-4">Proof</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight">
              You’re standing in the showroom.
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              This site — the one you’re reading right now — I built. With AI. From scratch. It’s the same care, the same voice, the same pace I’ll bring to yours.
            </p>
            <p className="text-ink/55 text-sm mt-8">
              More client case studies coming as I deliver them. Your build could be the next one.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-14 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <p className="text-ink/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Honest questions</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink tracking-tight mb-12">
              Anything else you’re wondering.
            </h2>
          </RevealSection>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <RevealSection key={f.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-ink/10 bg-parchment p-5">
                  <summary className="font-heading font-bold text-ink cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="text-sunrise text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-ink/70 text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK CTA — inline Calendly widget */}
      <section id="book" className="px-6 lg:px-14 py-24 bg-ink text-parchment">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center mb-10">
              <p className="text-parchment/50 text-[11px] font-bold uppercase tracking-[0.22em] mb-4">Book the call</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
                Two slots a month. Let’s see if one of them is yours.
              </h2>
              <p className="text-parchment/70 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
                Twenty minutes. No pitch. We figure out together whether I’m the right build partner — or whether someone else would serve you better.
              </p>
            </div>

            {/* Calendly inline widget */}
            <div
              className="calendly-inline-widget rounded-3xl overflow-hidden bg-parchment"
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '700px' }}
            />

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sunrise text-ink text-sm font-bold hover:bg-[#f0be2e] transition-all duration-200 shadow-lg"
              >
                Open Calendly in a new tab →
              </a>
              <Link
                to="/work-with-me"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border-2 border-parchment/30 text-parchment text-sm font-semibold hover:border-parchment/60 hover:bg-parchment/5 transition-all duration-200"
              >
                See all services
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
