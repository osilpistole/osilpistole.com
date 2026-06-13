import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

const HERO_IMG = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=2400&q=88'

export default function ContentPlanPage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${HERO_IMG}")` }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.40) 0%, rgba(20,19,17,0.60) 60%, rgba(20,19,17,0.78) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(55% 40% at 50% 45%, rgba(245,200,66,0.16) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-7">
            30 Days Done · Free Quiz Inside
          </p>

          <h1
            className="text-white leading-[0.95] tracking-tight mb-10 text-[clamp(44px,8vw,88px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 28px rgba(0,0,0,0.45)' }}
          >
            Stop guessing<br/><span className="text-sunrise">what to post.</span>
          </h1>

          <p className="text-white/85 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Take a free 10-minute quiz and walk away with your core message, your specific audience, and three content pillars to build everything around. Then unlock 30 days of personalized content for $47.
          </p>

          <Link
            to="/30-days-done/quiz"
            className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
          >
            Start the Free Quiz →
          </Link>

          <p className="mt-7 font-heading text-[10px] tracking-[0.32em] uppercase text-white/55">
            About 10 minutes · Email required for results
          </p>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── WHY THIS EXISTS ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-6">Why this exists</p>
            <h2
              className="text-ink leading-[1.12] mb-8 text-[clamp(32px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              You know what you do.<br/>You just don&apos;t know what to post.
            </h2>
            <div className="space-y-5 text-ink/60 text-[15px] md:text-[16px] leading-relaxed">
              <p>
                You can feel the message in your bones. You know who you&apos;re called to help. But when you open Instagram and stare at the new-post button, your mind goes blank. Or worse — you post something generic and watch it sit there.
              </p>
              <p>
                Generic AI tools don&apos;t fix this. They give you posts that sound like everyone else because they don&apos;t know YOU — your voice, your audience, your story, what you sell.
              </p>
              <p className="text-ink font-medium">
                30 Days Done is different. You take a 10-minute quiz that captures everything that makes you sound like you. The AI gives you back your message, your audience, your three content pillars — free. Then if you want the full 30-day plan built around those pillars, it&apos;s $47.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── WHAT'S FREE ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">What you get from the free quiz</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-ink leading-tight">
              Your foundation,<br/>delivered free.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Your Core Message', body: 'The one or two sentences that capture what you actually say. The thing you keep saying — sharpened.' },
              { num: '02', title: 'Your Specific Audience', body: 'A real description of who you serve. Not "women" or "leaders." The actual human, their season, their struggle.' },
              { num: '03', title: 'Your 3 Content Pillars', body: 'The three themes that should drive ~80% of your content. Each named, described, and given an example post idea.' },
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

      {/* ── WHAT'S PAID (THE 30-DAY PLAN) ─────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">Then, if you want the full plan</p>
            <h2
              className="text-ink leading-[1.08] mb-6 text-[clamp(32px,4.5vw,52px)] font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              30 days of content,<br/>built around your pillars.
            </h2>
            <p className="text-ink/60 text-base leading-relaxed max-w-xl mx-auto">
              For $47, you unlock a personalized 30-day plan with every post laid out — hook, topic, format, filming notes, caption starter, and CTA — for Instagram, Facebook, and TikTok.
            </p>
          </RevealSection>

          <RevealSection>
            <ul className="space-y-4">
              {[
                'A hook for every day — built from a 1,000-pattern library and filled with your specifics',
                'The topic, written to your audience in your voice',
                'The format: talking head, B-roll, carousel, or graphic',
                'Brief filming or creation notes so you can shoot in under 10 minutes',
                'A caption starter (first 2 lines) + 3–4 bullet points to make it your own',
                'A CTA tied to your stated 30-day goal',
                'Platform-specific tweaks for Instagram, Facebook, and TikTok',
                'Delivered to your member portal + downloadable PDF',
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

          <RevealSection>
            <div className="mt-10 bg-ink text-white rounded-2xl p-7 text-center">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-sunrise mb-3">Launch Price</p>
              <p className="text-4xl font-bold mb-1">$47 <span className="text-white/40 text-lg line-through font-normal">$97</span></p>
              <p className="text-white/55 text-sm mb-5">One-time. Yours forever. No subscription.</p>
              <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
                Take the free quiz first to get your foundation. You&apos;ll be the first to know when the full 30-day plan launches.
              </p>
            </div>
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
              Start with your<br/><span className="text-sunrise">foundation.</span>
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
              10 minutes. Free. Your message, audience, and 3 pillars delivered to your inbox.
            </p>
            <Link
              to="/30-days-done/quiz"
              className="inline-flex items-center justify-center gap-2 bg-sunrise text-ink font-heading font-bold text-base px-9 py-4 rounded-full shadow-[0_8px_28px_rgba(245,200,66,0.42)] hover:bg-[#f0be2e] hover:-translate-y-0.5 transition-all duration-300"
            >
              Start the Free Quiz →
            </Link>
          </RevealSection>
        </div>
      </section>

    </div>
  )
}
