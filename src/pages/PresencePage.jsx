import { useEffect, useRef, useState } from 'react'

const TC_URL = 'https://osilpistole.thrivecart.com/presence/'
const PORTAL_URL = 'https://members.osilpistole.com/login'
const DAY_1_AUDIO = 'https://jkvjcvziupcackdbozoa.supabase.co/storage/v1/object/public/presence-audio/day-01/female.mp3'

const STEPS = [
  { name: 'Lectio',       eng: 'Read',     desc: 'Read the passage slowly. Out loud if you can. Notice what catches.' },
  { name: 'Meditatio',    eng: 'Reflect',  desc: 'Sit with the word or phrase that stood out. Don\'t rush past it.' },
  { name: 'Oratio',       eng: 'Pray',     desc: 'Turn what you heard into a prayer. Honest, unscripted.' },
  { name: 'Contemplatio', eng: 'Rest',     desc: 'Move into stillness. Receive without words. Be present.' },
  { name: 'Actio',        eng: 'Live It',  desc: 'One way to carry what you received into the rest of your day.' },
]

const INCLUDED = [
  '30 days of curated Scripture — chosen to carry weight',
  'AI voice reading of each passage — choose a female or male voice',
  'Guided prompts for all five Lectio Divina steps every day',
  'Online journaling — write directly in the portal, saved automatically',
  'PDF download for any entry — passage, prompts, and your responses',
  'Unlimited attempts — return to any day as many times as you need',
  'Immediate access through your member portal',
]

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

function BuyButton({ href, children, variant = 'gold', className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full transition-all duration-300 px-8 py-3.5 text-sm hover:-translate-y-0.5 active:translate-y-0'
  const variants = {
    gold: 'bg-sunrise text-ink shadow-[0_4px_24px_rgba(245,200,66,0.28)] hover:shadow-[0_8px_36px_rgba(245,200,66,0.45)] hover:bg-[#f0be2e]',
    outlineLight: 'border-2 border-ink/18 text-ink/70 hover:border-ink/35 hover:bg-ink/4',
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  )
}

export default function PresencePage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,400;1,500;1,600&display=swap');
        .pr-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes pr-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .pr-u1 { opacity: 0; animation: pr-fade 0.9s ease 0.2s forwards; }
        .pr-u2 { opacity: 0; animation: pr-fade 0.9s ease 0.45s forwards; }
        .pr-u3 { opacity: 0; animation: pr-fade 0.9s ease 0.7s forwards; }
        .pr-u4 { opacity: 0; animation: pr-fade 0.9s ease 0.95s forwards; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative px-6 lg:px-16 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(184,164,216,0.15), transparent 70%)' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="pr-u1 font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-6">
            A 30-Day Lectio Divina Journal
          </p>
          <h1 className="pr-u2 pr-display text-6xl md:text-7xl lg:text-[88px] font-light leading-[0.95] mb-8 tracking-tight">
            Presence
          </h1>
          <p className="pr-u3 text-ink/65 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10">
            30 days of Scripture, stillness, and five ancient steps that change how you hear God.
          </p>
          <div className="pr-u4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <BuyButton href={TC_URL} variant="gold">Start the 30 Days — $27</BuyButton>
            <a href="#preview" className="text-sm text-ink/55 hover:text-ink underline underline-offset-4 transition-colors">
              Or listen to Day 1 first →
            </a>
          </div>
        </div>
      </section>

      {/* ── PREVIEW: Day 1 audio sample ─────────────────────────────── */}
      <section id="preview" className="px-6 lg:px-16 py-24 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">Listen to Day 1</p>
            <h2 className="pr-display text-4xl md:text-5xl font-light leading-[1.05] mb-4">
              You Were Made to Hear.
            </h2>
            <p className="text-ink/55 text-sm mb-2">John 10:27 — read aloud in the AI voice you can choose inside the journal.</p>
            <p className="text-ink/45 text-[13px] italic">Press play, close your eyes, let it land.</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-ink/8 bg-parchment p-6 md:p-8 shadow-[0_10px_40px_rgba(44,44,42,0.06)]">
              <audio
                controls
                preload="metadata"
                src={DAY_1_AUDIO}
                className="w-full"
                style={{ outline: 'none' }}
              >
                Your browser doesn&apos;t support audio. <a href={DAY_1_AUDIO}>Download the file</a>.
              </audio>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink/35">
                Day 01 · You Were Made to Hear · John 10:27
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="text-center mt-10">
            <p className="text-ink/55 text-[13px] italic mb-5">
              Want the rest of the 30 days?
            </p>
            <BuyButton href={TC_URL} variant="gold">Get Presence — $27</BuyButton>
          </Reveal>
        </div>
      </section>

      {/* ── THE FIVE STEPS ─────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">An Ancient Practice</p>
            <h2 className="pr-display text-4xl md:text-5xl lg:text-6xl font-light text-ink leading-[1.05] mb-5">
              Five steps. Slowed on purpose.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Lectio Divina is centuries old, and it works for one simple reason: it stops trying to extract something from Scripture and starts letting Scripture do the work.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-white border border-ink/8 rounded-2xl p-7 h-full hover:border-morning/40 hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all duration-300 group">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="pr-display text-3xl font-light italic text-morning leading-none">0{i + 1}</span>
                    <div>
                      <p className="pr-display text-2xl font-medium text-ink leading-tight">{step.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mt-1">{step.eng}</p>
                    </div>
                  </div>
                  <p className="text-ink/55 text-[14px] leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">What&apos;s Inside</p>
            <h2 className="pr-display text-4xl md:text-5xl font-light leading-[1.05] mb-6">
              A real practice,<br/>built to last.
            </h2>
            <div className="space-y-4 text-ink/60 text-[15px] leading-relaxed">
              <p>This isn&apos;t a Bible study. It&apos;s not a devotional you power through before the morning gets away from you.</p>
              <p>It&apos;s thirty days of showing up — not to perform, not to produce, but to be present. Read slowly. Let it be enough.</p>
              <p className="text-ink font-medium">Your responses save automatically. You can download any day as a beautifully formatted PDF. You can come back to any day, as many times as you need.</p>
            </div>
            <div className="mt-10">
              <BuyButton href={TC_URL} variant="gold">Start the 30 Days — $27</BuyButton>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="space-y-4">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-parchment border border-ink/6 rounded-xl px-5 py-4">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-morning flex-shrink-0" />
                  <span className="text-ink/75 text-[14px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-28 md:py-36 bg-[#141311] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(184,164,216,0.16), transparent 70%)' }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <Reveal>
            <h2 className="pr-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6">
              Thirty days of presence.<br/>One thing — done well.
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
              $27 once. Lifetime access. No subscription, no upsells. Just thirty days of showing up — and the rest of your life with the practice in your pocket.
            </p>
            <BuyButton href={TC_URL} variant="gold">Get Presence — $27</BuyButton>
            <p className="mt-6 text-white/35 text-[12px]">
              Already enrolled? <a href={PORTAL_URL} className="underline underline-offset-4 hover:text-white/70">Log in here</a>
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
