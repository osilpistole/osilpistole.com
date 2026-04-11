import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'

/* ─── Typewriter hook ─── */
function useTypewriter(words, typingSpeed = 80, pauseTime = 1800, deletingSpeed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[wordIndex]
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseTime)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setWordIndex((wordIndex + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, wordIndex, words, typingSpeed, pauseTime, deletingSpeed])

  return displayed
}

/* ─── Hero ─── */
const heroWords = ['leaders', 'entrepreneurs', 'people', 'founders', 'dreamers', 'organizations', 'ministries', 'visionaries', 'seekers']

function Hero() {
  const typed = useTypewriter(heroWords)

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-parchment">
      <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />

      {/* Background blobs */}
      <div className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full bg-sunrise/20 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-[10%] left-[15%] w-56 h-56 rounded-full bg-morning/25 blur-3xl animate-float-delayed pointer-events-none" />

      {/* Right-side photo */}
      <div className="absolute inset-y-0 right-[-12%] w-full lg:w-[62%] pointer-events-none">
        <img
          src={import.meta.env.BASE_URL + 'images/standing-studio.jpg'}
          alt="Osil Pistole"
          className="w-full h-full object-cover object-[52%_top]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #F7F4EE 0%, #F7F4EE 2%, rgba(247,244,238,0.88) 22%, rgba(247,244,238,0.15) 48%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #F7F4EE 0%, rgba(247,244,238,0.5) 15%, transparent 35%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F7F4EE 0%, transparent 12%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, #F7F4EE 0%, transparent 12%)' }} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col justify-center min-h-[100svh] max-w-7xl mx-auto w-full px-6 lg:px-14">
        <div className="max-w-3xl pt-20">

          <div className="flex items-center gap-3 mb-6 whitespace-nowrap">
            <span className="text-ink/40 text-[11px] font-semibold uppercase tracking-[0.28em]">Speaker &middot; Consultant &middot; Mentor</span>
            <span className="h-px w-6 bg-ink/15 shrink-0" />
            <span className="inline-flex items-center gap-1.5 text-growth text-[11px] font-semibold uppercase tracking-widest shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-growth animate-pulse" />
              Booking 2026
            </span>
          </div>

          <h1 className="font-heading text-[2.4rem] md:text-5xl lg:text-[3.2rem] font-bold text-ink leading-[1.18] tracking-tight">
            Strategy, clarity, and<br />
            execution for{' '}
            <span className="relative inline-block">
              <span className="gradient-text-animated">{typed}</span>
              <span className="typewriter-cursor" />
            </span>
            <br />ready to step into more.
          </h1>

          <p className="mt-7 text-base text-ink/55 leading-relaxed max-w-lg">
            30 years of business experience. Prophetic leader and voice. Real strategy. Measurable results. Speaker, consultant, mentor, and coach — this is where vision becomes action.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <ButtonPrimary to="/work-with-me">Work With Me</ButtonPrimary>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink hover:bg-ink/5 transition-all duration-300"
            >
              Book Me to Speak
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}

/* ─── Marquee strip ─── */
const marqueeItems = [
  'Speaking', 'Consulting', 'Mentoring', 'Coaching', 'Strategy',
  'Clarity', 'Execution', 'Leadership', 'Breakthrough', 'Vision',
  'Speaking', 'Consulting', 'Mentoring', 'Coaching', 'Strategy',
  'Clarity', 'Execution', 'Leadership', 'Breakthrough', 'Vision',
]

function Marquee() {
  return (
    <div className="bg-ink py-4 overflow-hidden select-none">
      <div className="flex animate-marquee gap-0 whitespace-nowrap">
        {marqueeItems.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sunrise shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Intro / About ─── */
function Intro() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Meet Osil</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-8">
              Clarity that<br />leads to action.
            </h2>
            <p className="text-ink/60 leading-relaxed mb-5 text-[17px]">
              Osil Pistole is a speaker, consultant, and mentor who helps people and organizations break through confusion, strengthen their voice, and build what they are called to build.
            </p>
            <p className="text-ink/60 leading-relaxed text-[17px]">
              Her work sits at the intersection of identity, purpose, leadership, strategy, and execution. Whether speaking to a room, mentoring a leader, or building a brand from the ground up — her goal is always the same.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 text-ink font-bold text-sm hover:text-growth transition-colors group"
            >
              Learn more about Osil
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </RevealSection>

          <RevealSection delay={0.15} className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden image-glow relative group aspect-[3/4]">
                <img
                  src={import.meta.env.BASE_URL + 'images/headshot-plants.jpg'}
                  alt="Osil Pistole"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-5 -left-5 bg-ink text-white rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-2xl font-bold">30+</p>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mt-0.5">Years Experience</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
const helpCards = [
  {
    num: '01', title: 'Speaking', accent: 'bg-sunrise', textAccent: 'text-ink',
    text: 'Powerful messages on identity, purpose, destiny, breakthrough, leadership, and living with clarity and courage.',
    link: '/speaking',
  },
  {
    num: '02', title: 'Consulting', accent: 'bg-growth', textAccent: 'text-white',
    text: 'Business consulting and strategic implementation from start to finish — branding, marketing, web, advertising, and growth strategy.',
    link: '/consulting',
  },
  {
    num: '03', title: 'Mentoring', accent: 'bg-morning', textAccent: 'text-ink',
    text: 'Two mentoring tracks: Build & Launch for those building business, influence, or ministry — and Living From Above for prophetic growth, kingdom principles, and identity in Christ.',
    comingSoon: true,
    link: '/mentoring',
  },
  {
    num: '04', title: 'Coaching & Training', accent: 'bg-ink', textAccent: 'text-white',
    text: 'Group coaching, team training, and one-on-one coaching for leaders, ministries, businesses, and organizations ready for real movement.',
    link: '/coaching',
  },
]

function HowIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-3">What I Do</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-tight">How I Help</h2>
            </div>
            <Link to="/work-with-me" className="inline-flex items-center gap-2 text-ink/50 hover:text-ink text-sm font-semibold transition-colors group shrink-0">
              See all services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpCards.map((card, i) => (
            <RevealSection key={card.title} delay={i * 0.08} className="flex">
              <Link
                to={card.link}
                className="group relative flex flex-col rounded-3xl p-8 md:p-10 border border-ink/8 hover:border-transparent hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 w-full overflow-hidden bg-white"
              >
                {/* Hover fill — wipes in from left */}
                <div className={`absolute inset-0 ${card.accent} -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-3xl`} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-ink/15 group-hover:text-white/20 text-5xl font-black transition-colors duration-300 leading-none">{card.num}</span>
                    <svg className="w-5 h-5 text-ink/20 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-heading text-2xl font-bold text-ink group-hover:text-white transition-colors duration-300">{card.title}</h3>
                    {card.comingSoon && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-morning/20 group-hover:bg-white/20 text-ink/60 group-hover:text-white/70 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shrink-0">
                        <span className="w-1 h-1 rounded-full bg-morning group-hover:bg-white animate-pulse transition-colors duration-300" />
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-ink/55 group-hover:text-white/75 leading-relaxed text-[15px] transition-colors duration-300 flex-1">{card.text}</p>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Who I Help ─── */
const audiences = [
  'Leaders', 'Entrepreneurs', 'Ministries', 'Founders',
  'Teams & Organizations', "Women's Groups", 'Churches',
  'Creative Visionaries', 'People Ready for Their Next Level',
]

function WhoIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-ink text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <RevealSection>
            <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Who This Is For</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Who I<br />Work With
            </h2>
            <p className="text-white/50 mt-6 text-[17px] leading-relaxed max-w-sm">
              People and teams who know they're made for more and are ready to move with clarity and conviction.
            </p>
            <div className="mt-10">
              <ButtonPrimary to="/work-with-me">Work With Me</ButtonPrimary>
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div className="flex flex-col gap-2 mt-2">
              {audiences.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/8 hover:border-sunrise/40 hover:bg-white/5 transition-all duration-200 group cursor-default"
                >
                  <span className="text-white/70 group-hover:text-white font-medium transition-colors">{item}</span>
                  <span className="text-white/15 group-hover:text-sunrise text-xs font-bold uppercase tracking-widest transition-colors">→</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Transformation ─── */
const transforms = [
  // Business & Strategy
  { from: 'Confused about direction',        to: 'Crystal clear on your next move',      accent: 'bg-sunrise', hoverAfter: 'hover:bg-sunrise' },
  { from: 'Overthinking every decision',     to: 'Taking confident action',              accent: 'bg-growth',  hoverAfter: 'hover:bg-growth'  },
  { from: 'Scattered ideas, no plan',        to: 'A clear, executable strategy',         accent: 'bg-morning', hoverAfter: 'hover:bg-morning' },
  { from: 'Stalled and stuck',               to: 'Moving with momentum',                 accent: 'bg-sunrise', hoverAfter: 'hover:bg-sunrise' },
  { from: 'Hiding your gifts',               to: 'Owning your voice and influence',      accent: 'bg-growth',  hoverAfter: 'hover:bg-growth'  },
  { from: 'Self-doubt holding you back',     to: 'Aligned, grounded leadership',         accent: 'bg-morning', hoverAfter: 'hover:bg-morning' },
  // Identity
  { from: 'Not sure who you really are',     to: 'Grounded in who you truly are',        accent: 'bg-sunrise', hoverAfter: 'hover:bg-sunrise' },
  { from: "Living for others' approval",     to: 'Secure — not defined by others',       accent: 'bg-growth',  hoverAfter: 'hover:bg-growth'  },
  { from: 'Defined by failures and the past', to: 'Walking in who you were made to be', accent: 'bg-morning', hoverAfter: 'hover:bg-morning' },
  // Purpose & Calling
  { from: 'Sensing a calling, unsure where to start', to: 'Walking in your calling with confidence', accent: 'bg-sunrise', hoverAfter: 'hover:bg-sunrise' },
  { from: 'Drifting without direction',      to: 'Living with clear purpose',            accent: 'bg-growth',  hoverAfter: 'hover:bg-growth'  },
  { from: 'Afraid your calling is too big',  to: 'Stepping into your calling with courage', accent: 'bg-morning', hoverAfter: 'hover:bg-morning' },
  // Hearing God
  { from: "Unsure if you're hearing God",    to: "Hearing God clearly and confidently",  accent: 'bg-sunrise', hoverAfter: 'hover:bg-sunrise' },
  { from: 'Second-guessing every impression', to: 'Acting on what God is saying',        accent: 'bg-growth',  hoverAfter: 'hover:bg-growth'  },
  { from: 'Feeling disconnected spiritually', to: 'In constant communion with God',      accent: 'bg-morning', hoverAfter: 'hover:bg-morning' },
]

function Transformation() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(i => (i + 1) % transforms.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const t = transforms[active]

  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <div className="mb-14">
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-3">The Shift</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-tight">This is what changes.</h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-2 rounded-3xl overflow-hidden border border-ink/8 shadow-sm">
          {/* Before */}
          <div className="group px-8 py-10 bg-parchment/50 border-r border-ink/8 hover:bg-ink transition-colors duration-300 cursor-default">
            <p className="text-ink/30 group-hover:text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 transition-colors duration-300">Before</p>
            <p className="text-ink/60 group-hover:text-white/80 text-xl md:text-2xl font-medium leading-snug transition-colors duration-300">{t.from}</p>
          </div>
          {/* After */}
          <div className={`group px-8 py-10 bg-white ${t.hoverAfter} transition-colors duration-300 cursor-default`}>
            <p className="text-growth group-hover:text-white/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 transition-colors duration-300">After</p>
            <p className="text-ink group-hover:text-white text-xl md:text-2xl font-bold leading-snug transition-colors duration-300">{t.to}</p>
          </div>
        </div>

        {/* Dots + Arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setActive(i => (i - 1 + transforms.length) % transforms.length)}
            className="w-8 h-8 rounded-full border border-ink/15 hover:border-ink/40 hover:bg-ink/5 flex items-center justify-center transition-all duration-200 text-ink/40 hover:text-ink"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="flex gap-2">
            {transforms.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-ink' : 'w-2 h-2 bg-ink/15 hover:bg-ink/30'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive(i => (i + 1) % transforms.length)}
            className="w-8 h-8 rounded-full border border-ink/15 hover:border-ink/40 hover:bg-ink/5 flex items-center justify-center transition-all duration-200 text-ink/40 hover:text-ink"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative py-24 md:py-36 px-6 lg:px-10 bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,200,66,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,164,216,0.1),transparent_60%)]" />

      <RevealSection>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Ready to Move?</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white leading-[1.08] mb-8">
            Let's build something<br />
            <span className="gradient-text-animated">meaningful.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you need a speaker, consultant, mentor, or trainer — this is where clarity, strategy, and execution come together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary to="/work-with-me">Work With Osil</ButtonPrimary>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold border-2 border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Book Me to Speak
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <HowIHelp />
      <WhoIHelp />
      <Transformation />
      <FinalCTA />
    </>
  )
}
