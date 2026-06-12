import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const HERO_IMG = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400&q=88'

export default function CallingPage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${HERO_IMG}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.55) 60%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.14) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            The Calling Quiz · Free
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(48px,9vw,96px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.4)' }}
          >
            What were you<br/><span className="text-sunrise">called to do?</span>
          </h1>

          <p className="text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            In about 10 minutes, get clarity on who you&apos;re called to serve, what you actually do for them, and a mission statement worth writing down — in three different voices, so you can pick the one that sounds like you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/calling/start"
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.35)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Start the Quiz — Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>

          <p className="mt-7 font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            About 10 minutes · No payment · Results emailed
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── WHY THIS QUIZ EXISTS ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-6">Why this quiz exists</p>
            <h2
              className="text-ink leading-[1.12] mb-8 text-[clamp(32px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Most people know they&apos;re called.<br/>They just can&apos;t name it.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                You can feel it — the pull. The thing you talk about for hours. The kind of person you keep finding yourself helping. The injustice that wakes you up at 3am.
              </p>
              <p>
                But when someone asks <em>"so, what do you do?"</em> you fumble. You give an answer that&apos;s either too vague or too long. And you walk away knowing it&apos;s not quite right.
              </p>
              <p className="text-ink font-medium">
                This quiz is a structured, honest conversation with an AI trained on Osil&apos;s coaching method. By the end, you&apos;ll have a single-sentence mission statement that names what you do, who you do it for, and what changes for them — in three voices so you can pick the one that fits.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">How it works</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Three steps. Ten minutes.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Have a real conversation',
                body: 'About 10–12 questions that go deeper than a typical quiz. Not multiple choice — actual reflection. Your story, your draws, your hesitations.',
              },
              {
                num: '02',
                title: 'Get three options',
                body: 'Same mission, three voices: plain and clear, punchy and sales-ready, identity and calling. You pick the one that sounds most like you.',
              },
              {
                num: '03',
                title: 'Save it. Use it.',
                body: 'Your chosen mission lands on screen and in your inbox. From there, book a strategy session to turn it into a real next step.',
              },
            ].map(s => (
              <RevealSection key={s.num}>
                <div className="bg-white border border-ink/8 rounded-2xl p-7 h-full hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all">
                  <p
                    className="text-sunrise text-3xl font-light italic mb-3 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >{s.num}</p>
                  <h3 className="font-heading font-bold text-ink mb-3 text-base">{s.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{s.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL GET ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">What you&apos;ll walk away with</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              A real mission statement.<br/><span className="italic font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Not a generic one.</span>
            </h2>
          </RevealSection>

          <RevealSection>
            <ul className="space-y-4">
              {[
                'A clear naming of who you\'re called to serve — specific, not "women" or "leaders"',
                'What you actually do for them — verb and format',
                'The transformation you walk them into',
                'Three mission statement options in different voices — pick the one that sounds like you',
                'One concrete next step you could take this week',
                'A clear path forward if you want help building this into a business or ministry',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 bg-parchment border border-ink/6 rounded-xl px-5 py-4">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-sunrise/35 bg-sunrise/12 flex items-center justify-center">
                    <svg className="w-3 h-3 text-sunrise" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-ink/75 text-[14.5px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </RevealSection>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 lg:px-16 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(245,200,66,0.14), transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)' }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <RevealSection>
            <h2
              className="leading-[1.05] mb-8 text-[clamp(40px,6vw,72px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Ready to<br/><span className="text-sunrise">put it into words?</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
              About 10 minutes. Completely free. Your mission delivered on screen and emailed to you.
            </p>
            <Link
              to="/calling/start"
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Start the Quiz — Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
