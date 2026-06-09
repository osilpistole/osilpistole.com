import { useEffect, useRef, useState } from 'react'
import BuyModal, { openBuyModal } from '../components/BuyModal.jsx'

const TC_URL = 'https://osilpistole.thrivecart.com/presence/'
const PORTAL_URL = 'https://members.osilpistole.com/login'
const AUDIO_SAMPLE = '/audio/presence-day-1-preview.mp3'

// Same alpine lake at dawn image used in the member-portal Presence hero.
const HERO_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=88'

// Day 1's ambient track on the member portal — Bethel Music (used for days 1-5).
const MUSIC_VIDEO_ID = 'Xx1MjhzKcYw'
const MUSIC_LABEL = 'Bethel Music'

const VERSE_REF = 'John 10:27'
const VERSE_TEXT = '"My sheep listen to my voice; I know them, and they follow me."'
const LECTIO_INTRO = 'Read this verse slowly, two or three times. What word or phrase catches your attention? Write it down.'

const FRUITS = [
  { word: 'Wisdom',  desc: 'The clarity to know what to do and when.' },
  { word: 'Clarity', desc: 'A quiet mind, not a louder one.' },
  { word: 'Peace',   desc: 'The kind that doesn\'t need everything fixed first.' },
  { word: 'Joy',     desc: 'Steady, not circumstantial.' },
]

const STEPS = [
  { name: 'Lectio',       eng: 'Read',     desc: 'Read the passage slowly. Out loud if you can. Notice what catches.' },
  { name: 'Meditatio',    eng: 'Reflect',  desc: 'Sit with the word or phrase that stood out. Don\'t rush past it.' },
  { name: 'Oratio',       eng: 'Pray',     desc: 'Turn what you heard into a prayer. Honest, unscripted.' },
  { name: 'Contemplatio', eng: 'Rest',     desc: 'Move into stillness. Receive without words. Be present.' },
  { name: 'Actio',        eng: 'Live It',  desc: 'One way to carry what you received into the rest of your day.' },
]

const INCLUDED = [
  '30 days of curated Scripture — chosen to carry weight',
  'Each passage read aloud in Osil\'s voice — or read it yourself',
  'Ambient music for every day to set the room',
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
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full transition-all duration-300 px-8 py-3.5 text-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
  const variants = {
    gold: 'bg-sunrise text-ink shadow-[0_4px_24px_rgba(245,200,66,0.28)] hover:shadow-[0_8px_36px_rgba(245,200,66,0.45)] hover:bg-[#f0be2e]',
    outlineLight: 'border-2 border-ink/18 text-ink/70 hover:border-ink/35 hover:bg-ink/4',
    soft: 'bg-white/85 backdrop-blur-md text-ink border border-white/40 hover:bg-white shadow-[0_4px_18px_rgba(44,44,42,0.08)]',
  }
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); openBuyModal(href) }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

/* Floating ambient music — starts muted (browser-allowed) then unmutes
   on the first user interaction so it feels like autoplay. */
function AmbientMusic() {
  const [unmuted, setUnmuted] = useState(false)
  const unmutedRef = useRef(false)
  const iframeRef = useRef(null)

  function send(func, args = []) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    )
  }

  useEffect(() => {
    const t = setTimeout(() => send('playVideo'), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function start() {
      if (unmutedRef.current) return
      unmutedRef.current = true
      send('playVideo')
      send('unMute')
      setTimeout(() => send('setVolume', [45]), 200)
      setUnmuted(true)
      cleanup()
    }
    const events = ['click', 'touchstart', 'scroll', 'keydown']
    function cleanup() {
      events.forEach(ev => window.removeEventListener(ev, start))
    }
    events.forEach(ev => window.addEventListener(ev, start, { passive: true }))
    return cleanup
  }, [])

  function toggle() {
    if (!unmuted) {
      send('playVideo')
      send('unMute')
      setTimeout(() => send('setVolume', [45]), 200)
      setUnmuted(true)
      unmutedRef.current = true
    } else {
      send('pauseVideo')
      setUnmuted(false)
      unmutedRef.current = false
    }
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Ambient music"
        tabIndex={-1}
        aria-hidden="true"
        src={`https://www.youtube.com/embed/${MUSIC_VIDEO_ID}?autoplay=1&mute=1&enablejsapi=1&modestbranding=1&rel=0&controls=0&playsinline=1&loop=1&playlist=${MUSIC_VIDEO_ID}`}
        allow="autoplay; encrypted-media"
        style={{
          position: 'fixed', right: 0, bottom: 0, width: 1, height: 1,
          opacity: 0, pointerEvents: 'none', border: 0,
        }}
      />
      <button
        type="button"
        onClick={toggle}
        className="fixed left-6 z-40 group"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}
        aria-label={unmuted ? 'Pause music' : 'Play ambient music'}
      >
        <span className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/92 backdrop-blur-md border border-ink/12 shadow-[0_8px_28px_rgba(44,44,42,0.10)] hover:bg-white transition-all">
          <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-morning/22 group-hover:bg-morning/35 transition-colors">
            {unmuted ? (
              <>
                <span className="absolute inset-0 rounded-full border border-morning/40 animate-ping" />
                <svg className="w-3 h-3 text-ink/75 relative" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              </>
            ) : (
              <svg className="w-3.5 h-3.5 text-ink/75 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </span>
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-ink/65 leading-none">
            {unmuted ? 'Music On' : 'Play Music'}
          </span>
        </span>
      </button>
    </>
  )
}

function scrollToId(id, e) {
  if (e) e.preventDefault()
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function VersePreview() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mode, setMode] = useState('read') // 'read' | 'listen'

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  function togglePlay() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
      setMode('listen')
    } else {
      a.pause()
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-ink/8 shadow-[0_24px_60px_rgba(44,44,42,0.08)] overflow-hidden">
      <div className="flex border-b border-ink/6 bg-parchment/50">
        <button
          type="button"
          onClick={() => setMode('read')}
          className={`flex-1 py-4 px-6 font-heading text-[10px] font-bold uppercase tracking-[0.28em] transition-colors ${
            mode === 'read'
              ? 'bg-white text-ink border-b-2 border-morning -mb-px'
              : 'text-ink/40 hover:text-ink/65'
          }`}
        >
          Read it
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className={`flex-1 py-4 px-6 font-heading text-[10px] font-bold uppercase tracking-[0.28em] transition-colors flex items-center justify-center gap-2 ${
            mode === 'listen' || isPlaying
              ? 'bg-white text-ink border-b-2 border-morning -mb-px'
              : 'text-ink/40 hover:text-ink/65'
          }`}
        >
          {isPlaying ? (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
              <span>Pause</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Hear it spoken</span>
            </>
          )}
        </button>
      </div>

      <div className="p-8 md:p-12">
        <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-morning mb-4 text-center">
          Day 01 · {VERSE_REF}
        </p>
        <blockquote className="aa-display text-[clamp(24px,3.4vw,38px)] font-light italic text-ink leading-[1.35] text-center max-w-2xl mx-auto">
          {VERSE_TEXT}
        </blockquote>

        {mode === 'read' && (
          <div className="mt-10 pt-8 border-t border-ink/6 max-w-2xl mx-auto">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.28em] text-ink/45 mb-3">Lectio — Read</p>
            <p className="text-ink/60 text-[15px] leading-relaxed">
              {LECTIO_INTRO}
            </p>
          </div>
        )}

        {(mode === 'listen' || isPlaying) && (
          <div className="mt-8 max-w-md mx-auto">
            <audio ref={audioRef} src={AUDIO_SAMPLE} preload="metadata" />
            <div className="bg-parchment/60 border border-ink/6 rounded-2xl p-5 flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-sunrise text-ink flex items-center justify-center shadow-[0_4px_18px_rgba(245,200,66,0.32)] hover:bg-[#f0be2e] transition-colors shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45 mb-0.5">Day 1 — Spoken</p>
                <p className="text-ink/70 text-sm">Opening passage &amp; prompt</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PresencePage() {
  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,400;1,500;1,600&display=swap');
        .aa-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes pr-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pr-glow { 0%, 100% { opacity: 0.38; } 50% { opacity: 0.62; } }
        .pr-u1 { opacity: 0; animation: pr-fade 0.95s ease 0.25s forwards; }
        .pr-u2 { opacity: 0; animation: pr-fade 1.05s ease 0.5s forwards; }
        .pr-u3 { opacity: 0; animation: pr-fade 0.95s ease 0.85s forwards; }
        .pr-u4 { opacity: 0; animation: pr-fade 0.95s ease 1.1s forwards; }
        .pr-u5 { opacity: 0; animation: pr-fade 0.95s ease 1.35s forwards; }
        .pr-glow { animation: pr-glow 6s ease-in-out infinite; }
      `}</style>

      <AmbientMusic />
      <BuyModal />

      {/* ── HERO — alpine lake at dawn, mystical and serene ────────── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${HERO_IMG}")` }}
          aria-hidden="true"
        />
        {/* Mystical washes */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(247,244,238,0.0) 0%, rgba(20,19,17,0.18) 45%, rgba(20,19,17,0.55) 100%)' }} />
        <div className="absolute inset-0 pr-glow" style={{ background: 'radial-gradient(45% 35% at 50% 42%, rgba(184,164,216,0.30) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 50% at 50% 100%, rgba(0,0,0,0.45), transparent 60%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">
          <p className="pr-u1 font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/72 mb-7">
            A 30-Day Lectio Divina Journal
          </p>

          <h1 className="pr-u2 aa-display text-[clamp(72px,12vw,148px)] font-light leading-[0.94] tracking-tight text-white mb-10" style={{ textShadow: '0 2px 36px rgba(0,0,0,0.4)' }}>
            Presence
          </h1>

          <p className="pr-u3 aa-display italic text-white/85 text-xl md:text-2xl leading-[1.4] max-w-xl mx-auto mb-4" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.45)' }}>
            Being present with God is the key to everything.
          </p>

          <p className="pr-u4 text-white/72 text-[14px] md:text-base leading-relaxed max-w-md mx-auto mb-12" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}>
            Wisdom, clarity, peace, joy — they all come from one place. Thirty days of meeting Him there, morning or evening — or both.
          </p>

          <div className="pr-u5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <BuyButton href={TC_URL} variant="gold">Start the 30 Days — $27</BuyButton>
            <a href="#preview" onClick={(e) => scrollToId('preview', e)} className="inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full px-8 py-3.5 text-sm border-2 border-white/30 text-white/90 hover:border-white/55 hover:bg-white/10 backdrop-blur-sm transition-all">
              Read or listen to Day 1
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/75 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── FROM PRESENCE COMES EVERYTHING ─────────────────────────── */}
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-parchment relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(184,164,216,0.12), transparent 65%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <Reveal className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-morning mb-5">From Presence</p>
            <h2 className="aa-display text-[clamp(28px,4.4vw,46px)] font-light leading-[1.15] mb-6 whitespace-nowrap">
              Everything you&apos;re reaching for<br/>comes from being here.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed">
              Not a strategy. Not a stack of advice. The thing underneath all of it.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FRUITS.map((f, i) => (
              <Reveal key={f.word} delay={i * 0.07}>
                <div className="bg-white border border-ink/8 rounded-2xl p-6 h-full hover:border-morning/40 hover:shadow-[0_12px_36px_rgba(44,44,42,0.07)] transition-all duration-300">
                  <p className="aa-display text-3xl md:text-4xl font-light italic text-morning mb-3">{f.word}</p>
                  <p className="text-ink/55 text-[13px] leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-14">
            <p className="aa-display italic text-ink/65 text-[clamp(20px,2.6vw,28px)] leading-relaxed max-w-2xl mx-auto">
              Start every day with Him.<br/>End every day with Him.<br/>
              <span className="text-morning">Or both.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PREVIEW: Read or listen toggle ─────────────────────────── */}
      <section id="preview" className="px-6 lg:px-16 py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-morning mb-5">Day 1 — A Sample</p>
            <h2 className="aa-display text-4xl md:text-5xl font-light leading-[1.05] mb-4">
              You Were Made to Hear.
            </h2>
            <p className="text-ink/55 text-[15px] max-w-lg mx-auto">
              Read it slowly. Or hear it spoken. Stay there a moment.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <VersePreview />
          </Reveal>

          <Reveal delay={0.25} className="text-center mt-12">
            <p className="text-ink/55 text-[13px] italic mb-5">
              That&apos;s one day. There are twenty-nine more.
            </p>
            <BuyButton href={TC_URL} variant="gold">Get Presence — $27</BuyButton>
          </Reveal>
        </div>
      </section>

      {/* ── INSIDE THE PORTAL — screenshots ─────────────────────────── */}
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">A Look Inside</p>
            <h2 className="aa-display text-4xl md:text-5xl lg:text-6xl font-light text-ink leading-[1.05] mb-5">
              Built like a sanctuary,<br/>not a checklist.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Your own private space inside the member portal. Thirty days laid out — quiet, beautiful, waiting for you.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <Reveal delay={0.05}>
              <div className="relative rounded-3xl overflow-hidden bg-white border border-ink/8 shadow-[0_24px_60px_rgba(44,44,42,0.12)]">
                <img
                  src="/images/presence-dashboard.jpg"
                  alt="The Presence dashboard inside the member portal — 30 days laid out in a clean grid with serene mountain hero."
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <p className="text-center mt-5 font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-ink/45">
                The 30-Day Overview
              </p>
              <p className="text-center mt-2 text-ink/55 text-[13px] max-w-xs mx-auto leading-relaxed">
                Every day at a glance. Mark them done as you go.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden bg-white border border-ink/8 shadow-[0_24px_60px_rgba(44,44,42,0.12)]">
                <img
                  src="/images/presence-day1.jpg"
                  alt="A single day inside Presence — passage at the top, audio player, then the five Lectio Divina steps with space to journal."
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <p className="text-center mt-5 font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-ink/45">
                Inside One Day
              </p>
              <p className="text-center mt-2 text-ink/55 text-[13px] max-w-xs mx-auto leading-relaxed">
                Verse, audio, and all five Lectio Divina steps with space to write.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="text-center mt-14">
            <BuyButton href={TC_URL} variant="gold">Start the 30 Days — $27</BuyButton>
          </Reveal>
        </div>
      </section>

      {/* ── THE FIVE STEPS ─────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">An Ancient Practice</p>
            <h2 className="aa-display text-4xl md:text-5xl lg:text-6xl font-light text-ink leading-[1.05] mb-5">
              Five steps. Slowed on purpose.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Lectio Divina is centuries old, and it works for one simple reason: it stops trying to extract something from Scripture and starts letting Scripture do the work.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-parchment border border-ink/8 rounded-2xl p-7 h-full hover:border-morning/40 hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all duration-300">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="aa-display text-3xl font-light italic text-morning leading-none">0{i + 1}</span>
                    <div>
                      <p className="aa-display text-2xl font-medium text-ink leading-tight">{step.name}</p>
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
      <section className="px-6 lg:px-16 py-24 md:py-32 bg-parchment">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-ink/45 mb-5">What&apos;s Inside</p>
            <h2 className="aa-display text-4xl md:text-5xl font-light leading-[1.05] mb-6">
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
                <li key={i} className="flex items-start gap-3 bg-white border border-ink/6 rounded-xl px-5 py-4">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-morning flex-shrink-0" />
                  <span className="text-ink/75 text-[14px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-28 md:py-36 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(184,164,216,0.16), transparent 70%)' }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <Reveal>
            <h2 className="aa-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6">
              Meet Him in the morning.<br/>Or at the end of the day.<br/>
              <span className="text-morning">Or both.</span>
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
              $27 once. Lifetime access. No subscription, no upsells. Thirty days of being present — and the rest of your life with the practice.
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
