import { useEffect, useRef, useState } from 'react'
import { useEffect } from 'react'
import BuyModal, { openBuyModal, preloadCheckoutOrigin } from '../components/BuyModal.jsx'
import { trackViewContent, trackAddToCart, trackInitiateCheckout } from '../lib/metaPixel'

// Map ThriveCart URL → product metadata for Pixel events.
const PIXEL_PRODUCT_BY_URL = {
  'https://osilpistole.thrivecart.com/awaken-and-align-meditation-series/':  { name: 'Awaken & Align Meditation Series', id: 'awaken-align-series', value: 47 },
  'https://osilpistole.thrivecart.com/awaken-and-align-meditation-journal/': { name: 'Awaken & Align Journal',           id: 'awaken-align-journal', value: 27 },
  'https://osilpistole.thrivecart.com/awaken-and-align-bundle/':             { name: 'Awaken & Align Bundle',            id: 'awaken-align-bundle',  value: 67 },
}

const TC_SERIES_URL  = 'https://osilpistole.thrivecart.com/awaken-and-align-meditation-series/'
const TC_JOURNAL_URL = 'https://osilpistole.thrivecart.com/awaken-and-align-meditation-journal/'
const TC_BUNDLE_URL  = 'https://osilpistole.thrivecart.com/awaken-and-align-bundle/'
const PORTAL_URL     = 'https://members.osilpistole.com/login'

// Same serene image as the /programs/awaken-and-align card.
const HERO_IMG = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=2400&auto=format&fit=crop&q=85'

// Dark serene scene for the final-CTA background (silhouette mountains at dusk).
const CTA_BG = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2400&auto=format&fit=crop&q=85'

// Different ambient track than Presence (which uses Bethel Music). This is
// the UPPERROOM instrumental that's already used inside the member portal
// for Presence days 6-10 — fits the meditation/voice-of-God theme.
const MUSIC_VIDEO_ID = 'wA_WPqz1U1A'

const sessions = [
  { num: 1,  title: "Hearing God's Voice",               desc: "Open the door to a deeper conversation with God and learn to recognize the voice that's been speaking all along." },
  { num: 2,  title: "Breaking Free from Fear",            desc: "Name the fear holding you back and receive the peace and courage to take your next step anyway." },
  { num: 3,  title: "Embracing Your Unique Calling",      desc: "Release comparison and receive the truth that your specific calling — exactly as it is — is exactly what the world needs." },
  { num: 4,  title: "Walking in Boldness and Confidence", desc: "Step into the authority God gave you and practice showing up bold, even when you don't feel ready." },
  { num: 5,  title: "Aligning with God's Vision",         desc: "See your life through God's eyes, and align your choices and direction with what He sees." },
  { num: 6,  title: "Surrendering to God's Timing",       desc: "Lay down the hustle, release the timeline, and find peace in the seasons that feel slow or uncertain." },
  { num: 7,  title: "Rooted and Grounded",                desc: "Establish a foundation so deep that fear, distraction, and doubt cannot move you from where God has planted you." },
  { num: 8,  title: "Speaking What You Believe",          desc: "Find your voice — and practice using it. Speak life over your calling with conviction." },
  { num: 9,  title: "Moving in Faith",                    desc: "Take the step you've been waiting to take. Build the muscle of acting before you feel fully ready." },
  { num: 10, title: "Living Awakened and Aligned",        desc: "Anchor everything you've received and step forward into this next chapter with clarity, courage, and purpose." },
]

const FLOATING_WORDS = [
  { word: 'Clarity',   x: '14%', y: '24%', delay: '0s'   },
  { word: 'Stillness', x: '78%', y: '20%', delay: '2.4s' },
  { word: 'Calling',   x: '20%', y: '74%', delay: '4.8s' },
  { word: 'Listen',    x: '82%', y: '70%', delay: '1.2s' },
  { word: 'Peace',     x: '50%', y: '88%', delay: '3.6s' },
  { word: 'Awaken',    x: '48%', y: '14%', delay: '6.0s' },
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

/* Floating ambient music — starts muted (browser-allowed) then unmutes
   on the first user interaction so it feels like autoplay. Safari is
   stricter than Chrome about iframe autoplay timing, so we retry the
   play command until the iframe is actually ready. */
function AmbientMusic({ accent = 'sunrise' }) {
  const [unmuted, setUnmuted] = useState(false)
  const iframeRef = useRef(null)
  const unmutedRef = useRef(false)
  const readyRef = useRef(false)

  function send(func, args = []) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    )
  }

  // Safari sometimes ignores the autoplay= URL param until the iframe is
  // fully ready. Retry playVideo a few times after mount.
  useEffect(() => {
    const delays = [400, 900, 1600, 2400, 3600, 5000]
    const timers = delays.map(d => setTimeout(() => send('playVideo'), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Mark iframe ready on its load event and try again then.
  function onIframeLoad() {
    readyRef.current = true
    send('playVideo')
  }

  // Unmute on the first user gesture (any kind — covers all browsers).
  useEffect(() => {
    function start() {
      if (unmutedRef.current) return
      unmutedRef.current = true
      send('playVideo')
      send('unMute')
      setTimeout(() => send('setVolume', [40]), 200)
      setUnmuted(true)
      cleanup()
    }
    const events = ['pointerdown', 'click', 'touchstart', 'scroll', 'keydown']
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
      setTimeout(() => send('setVolume', [40]), 200)
      setUnmuted(true)
      unmutedRef.current = true
    } else {
      send('pauseVideo')
      setUnmuted(false)
      unmutedRef.current = false
    }
  }

  const accentBg = accent === 'morning' ? 'bg-morning/22 group-hover:bg-morning/35' : 'bg-sunrise/24 group-hover:bg-sunrise/40'
  const accentRing = accent === 'morning' ? 'border-morning/40' : 'border-sunrise/45'

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Ambient music"
        tabIndex={-1}
        aria-hidden="true"
        onLoad={onIframeLoad}
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
        style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 1.5rem) + 0px))' }}
        aria-label={unmuted ? 'Pause music' : 'Play ambient music'}
      >
        <span className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/92 backdrop-blur-md border border-ink/12 shadow-[0_8px_28px_rgba(44,44,42,0.10)] hover:bg-white transition-all">
          <span className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-colors ${accentBg}`}>
            {unmuted ? (
              <>
                <span className={`absolute inset-0 rounded-full border animate-ping ${accentRing}`} />
                <svg className="w-3 h-3 text-ink/80 relative" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              </>
            ) : (
              <svg className="w-3.5 h-3.5 text-ink/80 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
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

/* Session 1 sample — native MP4 with an end-of-clip CTA overlay.
   Replaces the previous YouTube embed: faster to load, no API
   handshake, naturally ends when the clip ends (no manual cutoff
   timer). The MP4 lives at /videos/awaken-sample.mp4. */
function Session1Preview() {
  const videoRef = useRef(null)
  const [ended, setEnded] = useState(false)

  function restart() {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    setEnded(false)
    v.play()
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(44,44,42,0.18)] border border-ink/8 bg-ink">
      <div className="relative pb-[56.25%] h-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/awaken-sample.mp4"
          poster={HERO_IMG}
          controls
          playsInline
          preload="metadata"
          onEnded={() => setEnded(true)}
          onPlay={() => setEnded(false)}
        >
          Your browser doesn&apos;t support video.
        </video>
        {ended && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-ink/88 backdrop-blur-sm text-center px-6"
            style={{ animation: 'aa-up 0.4s ease forwards' }}
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.32em] text-sunrise/70 mb-3">
              That&apos;s the Sample
            </p>
            <p className="aa-display text-3xl md:text-4xl italic font-light text-white leading-tight mb-7 max-w-xs">
              Want the rest of Session 1 — plus the other nine?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BuyButton href={TC_SERIES_URL} variant="gold">Get the Series — $47</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Journal · Bundle $67</BuyButton>
              <button
                type="button"
                onClick={restart}
                className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-white/55 hover:text-white/85 underline underline-offset-4 cursor-pointer"
              >
                Replay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BuyButton({ href, children, variant = 'gold', className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full transition-all duration-300 px-8 py-3.5 text-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
  const variants = {
    gold: 'bg-sunrise text-ink shadow-[0_4px_24px_rgba(245,200,66,0.32)] hover:shadow-[0_8px_36px_rgba(245,200,66,0.5)] hover:bg-[#f0be2e]',
    outlineDark: 'border-2 border-white/22 text-white/75 hover:border-sunrise/70 hover:text-sunrise backdrop-blur-sm',
    outlineLight: 'border-2 border-ink/18 text-ink/70 hover:border-ink/35 hover:bg-ink/4',
    soft: 'bg-white/85 backdrop-blur-md text-ink border border-white/40 hover:bg-white shadow-[0_4px_18px_rgba(44,44,42,0.08)]',
  }
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        const p = PIXEL_PRODUCT_BY_URL[href]
        if (p) {
          trackAddToCart(p)
          trackInitiateCheckout(p)
        }
        openBuyModal(href)
      }}
      onMouseEnter={() => preloadCheckoutOrigin(href)}
      onFocus={() => preloadCheckoutOrigin(href)}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

export default function AwakenAndAlignPage() {
  // ViewContent on mount — builds the "viewed Awaken & Align" retargeting audience.
  useEffect(() => {
    trackViewContent({
      name: 'Awaken & Align Meditation Series',
      id: 'awaken-align-series',
      category: 'Product',
      value: 47,
    })
  }, [])

  return (
    <div className="bg-parchment text-ink font-body overflow-x-hidden">

      <AmbientMusic />
      <BuyModal />

      <style>{`
        .aa-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        @keyframes aa-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes aa-float {
          0%   { opacity: 0; transform: translate(-50%, -50%) translateY(10px); }
          25%  { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
          75%  { opacity: 1; transform: translate(-50%, -50%) translateY(-6px); }
          100% { opacity: 0; transform: translate(-50%, -50%) translateY(-16px); }
        }
        .aa-floatword {
          position: absolute;
          transform: translate(-50%, -50%);
          font-family: 'Sora', system-ui, sans-serif;
          font-weight: 200;
          color: rgba(44, 44, 42, 0.04);
          letter-spacing: 0.05em;
          text-transform: lowercase;
          font-size: clamp(28px, 4.5vw, 64px);
          line-height: 1;
          opacity: 0;
          animation: aa-float 9s ease-in-out infinite;
          pointer-events: none;
          white-space: nowrap;
        }
        .aa-u1 { opacity: 0; animation: aa-up 0.95s ease 0.25s forwards; }
        .aa-u2 { opacity: 0; animation: aa-up 1.05s ease 0.5s forwards; }
        .aa-u3 { opacity: 0; animation: aa-up 0.9s ease 0.85s forwards; }
        .aa-u4 { opacity: 0; animation: aa-up 0.9s ease 1.1s forwards; }
        .aa-u5 { opacity: 0; animation: aa-up 0.9s ease 1.35s forwards; }
      `}</style>

      {/* ── HERO — soft landscape (darkened) ───────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Landscape backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${HERO_IMG}")` }}
          aria-hidden="true"
        />
        {/* Darker warm wash — keeps the landscape readable but lets text breathe */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.32) 0%, rgba(20,19,17,0.48) 55%, rgba(20,19,17,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 45% at 50% 38%, rgba(245,200,66,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035, backgroundImage: GRAIN }} />


        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-28 pb-24">
          <p className="aa-u1 font-heading text-[10px] font-bold uppercase tracking-[0.38em] text-white/75 mb-8">
            A 10-Part Guided Meditation Series
          </p>

          <h1 className="aa-u2 aa-display text-[clamp(64px,11vw,128px)] font-light italic text-white leading-[0.92] tracking-tight mb-10" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.35)' }}>
            Awaken<br />
            <span className="text-sunrise">&amp; Align</span>
          </h1>

          <p className="aa-u3 text-white/82 text-base md:text-lg leading-[1.7] max-w-md mx-auto mb-12" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Quiet the noise. Hear God clearly. Step boldly into everything you&apos;re called to do.
          </p>

          <div className="aa-u4 flex flex-col sm:flex-row gap-3 justify-center">
            <BuyButton href={TC_SERIES_URL} variant="gold">
              Get the Series — $47
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </BuyButton>
            <a href="#preview" onClick={(e) => scrollToId('preview', e)} className="inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full px-8 py-3.5 text-sm border-2 border-white/30 text-white/85 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Listen to a Sample
            </a>
          </div>

          <p className="aa-u5 mt-10 font-heading text-[9px] tracking-[0.36em] uppercase text-white/45">
            Instant access · Private member portal · Lifetime
          </p>

          {/* Three-option callout — series / journal / bundle. Hidden on
              mobile so the hero stays focused on the two main CTAs; pricing
              section below covers all three options in detail. */}
          <div className="aa-u5 mt-10 hidden sm:flex flex-wrap items-center justify-center gap-2.5 text-[11px]">
            <a href="#pricing" onClick={(e) => scrollToId('pricing', e)} className="px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/22 text-white/80 hover:bg-white/20 hover:border-white/40 transition-all">
              Series · <span className="font-semibold text-sunrise">$47</span>
            </a>
            <a href="#pricing" onClick={(e) => scrollToId('pricing', e)} className="px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/22 text-white/80 hover:bg-white/20 hover:border-white/40 transition-all">
              Journal · <span className="font-semibold text-sunrise">$27</span>
            </a>
            <a href="#pricing" onClick={(e) => scrollToId('pricing', e)} className="px-4 py-1.5 rounded-full bg-sunrise/20 backdrop-blur-sm border border-sunrise/55 text-white hover:bg-sunrise/30 hover:border-sunrise/85 transition-all">
              Bundle · <span className="font-semibold text-sunrise">$67</span> <span className="opacity-65">— save $7</span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
          <span className="font-heading text-[8px] uppercase tracking-[0.3em] text-white/75">Scroll</span>
        </div>
      </section>

      {/* ── AMBIENT FLOATING WORDS — quiet watermark band ──────────── */}
      <section className="relative bg-parchment overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          {FLOATING_WORDS.map((w, i) => (
            <span
              key={i}
              className="aa-floatword"
              style={{ left: w.x, top: w.y, animationDelay: w.delay }}
              aria-hidden="true"
            >
              {w.word}
            </span>
          ))}
        </div>
        <div className="relative max-w-xl mx-auto text-center px-6">
          <p className="aa-display italic text-ink/55 text-[clamp(20px,2.6vw,28px)] leading-relaxed">
            Ten quiet sessions.<br/>One inner voice you&apos;ve been trying to hear.
          </p>
        </div>
      </section>

      {/* ── PREVIEW ────────────────────────────────────────────────── */}
      <section id="preview" className="py-24 md:py-32 px-6 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(245,200,66,0.10), transparent 70%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <Reveal className="text-center mb-12">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise/85 mb-5">Sample</p>
            <h2 className="aa-display text-4xl md:text-5xl lg:text-6xl font-light italic text-ink leading-[1.05] mb-5">
              Press play.<br/>Breathe in.
            </h2>
            <p className="text-ink/55 text-[15px] leading-relaxed max-w-xl mx-auto">
              The opening of Session 1 — <span className="italic text-ink/75">Hearing God&apos;s Voice</span>. See for yourself.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Session1Preview />
          </Reveal>

          {/* Bible verse — right under the sample */}
          <Reveal delay={0.25} className="text-center mt-14 max-w-2xl mx-auto">
            <p className="aa-display text-[clamp(22px,3vw,32px)] font-light italic text-ink/72 leading-[1.45]">
              &ldquo;My sheep listen to my voice;<br/>I know them, and they follow me.&rdquo;
            </p>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 mt-5">
              John 10:27
            </p>
          </Reveal>

          <Reveal delay={0.35} className="text-center mt-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BuyButton href={TC_SERIES_URL} variant="gold">Get the Full Series — $47</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineLight">+ Journal · Bundle $67</BuyButton>
            </div>
            <p className="text-ink/35 text-[11px] mt-3">Bundle saves $7 vs buying separately.</p>
          </Reveal>
        </div>
      </section>

      {/* ── THE PROMISE ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-20 items-center">

          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-8">You Were Created for More</p>
            <blockquote className="aa-display text-[clamp(28px,3.8vw,46px)] font-light italic text-ink leading-[1.22] mb-7">
              &ldquo;You feel it — the pull.<br />
              <span className="text-ink/35">But somewhere between<br />the call and the doing,<br />things get loud.&rdquo;</span>
            </blockquote>
            <div className="w-10 h-px bg-sunrise mb-7" />
            <div className="space-y-4 text-ink/58 text-[15px] leading-relaxed">
              <p>Doubt creeps in. Fear gets heavy. And you start wondering if you&apos;re making it all up.</p>
              <p>You&apos;re not making it up. You&apos;re missing a quiet, practiced rhythm of sitting with God and learning to recognize His voice — not as a once-in-a-while experience, but as a way of living.</p>
              <p className="text-ink font-medium">Awaken and Align is ten guided meditations to clear the noise, tune your spirit, and move forward with the clarity and confidence that only comes from hearing God for yourself.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <BuyButton href={TC_SERIES_URL} variant="gold">Start Your Journey — $47</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineLight">+ Journal · Bundle $67</BuyButton>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '10',  label: 'Video Meditations',   sub: 'Guided, faith-rooted sessions' },
                { num: '∞',   label: 'Lifetime Access',      sub: 'Go completely at your pace' },
                { num: '10',  label: 'Journal Sessions',     sub: 'Prompts, steps & declarations' },
                { num: '01',  label: 'Private Portal',       sub: 'Your content, always with you' },
              ].map((item, i) => (
                <div key={i} className="bg-parchment border border-ink/7 rounded-2xl p-6 hover:border-sunrise/30 hover:shadow-[0_8px_32px_rgba(44,44,42,0.08)] transition-all duration-300 group">
                  <p className="aa-display text-[42px] font-light italic text-sunrise leading-none mb-3">{item.num}</p>
                  <p className="font-heading text-sm font-semibold text-ink mb-1">{item.label}</p>
                  <p className="text-[11px] text-ink/38 leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── SESSIONS ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-16 bg-[#141311] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.22), transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03, backgroundImage: GRAIN }} />

        <div className="max-w-6xl mx-auto">

          <Reveal className="text-center mb-16">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise/55 mb-5">What&apos;s Inside</p>
            <h2 className="aa-display text-[clamp(38px,5.5vw,68px)] font-light italic text-white leading-[1.08]">
              Ten sessions. One journey.
            </h2>
            <p className="text-white/60 text-sm mt-4 max-w-xs mx-auto leading-relaxed">
              From stuck to stepping forward — in 10 guided meditations.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {sessions.map((s, i) => (
              <Reveal key={s.num} delay={Math.min(i * 0.04, 0.28)}>
                <div className="group relative flex gap-5 p-5 rounded-2xl border border-white/7 bg-white/[0.028] hover:border-white/14 hover:bg-white/[0.042] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                  {/* Ghost number */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 aa-display text-[72px] font-light italic leading-none select-none pointer-events-none"
                    style={{ color: 'rgba(255,255,255,0.035)' }}>
                    {s.num}
                  </div>

                  <div className="relative shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-heading bg-white/8 text-white/38 group-hover:bg-white/12">
                    {s.num}
                  </div>

                  <div className="relative flex-1 min-w-0">
                    <p className="font-heading text-[13px] font-semibold text-white/90 mb-1">{s.title}</p>
                    <p className="text-[12px] text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="text-center mt-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <BuyButton href={TC_SERIES_URL} variant="gold">Get the Full Series — $47</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Journal · Bundle $67</BuyButton>
            </div>
            <p className="text-white/30 text-[11px] mt-3">Bundle saves $7 vs buying separately.</p>
          </Reveal>

        </div>
      </section>

      {/* ── JOURNAL BONUS ─────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-16 bg-parchment relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-ink/5" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">The Journal</p>
            <h2 className="aa-display text-[clamp(34px,4.5vw,58px)] font-light italic text-ink leading-[1.1] mb-5">
              The Awaken<br />&amp; Align Journal
            </h2>
            <div className="w-10 h-px bg-sunrise mb-6" />
            <p className="text-ink/58 text-[15px] leading-relaxed mb-8">
              A companion journal for every session — with deep reflection questions, action steps, and a declaration to speak over yourself. Type your answers directly in the browser, save automatically, and download a complete copy whenever you want.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                '4 deep reflection questions per session',
                '"What is God saying?" prompt after each meditation',
                '3 actionable steps you can take this week',
                'A bold declaration written for you to speak aloud',
                'Auto-saves in your browser — download anytime',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/58 text-sm">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full border border-sunrise/35 bg-sunrise/10 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-sunrise" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <BuyButton href={TC_BUNDLE_URL} variant="gold">Get the Bundle — $67</BuyButton>
              <BuyButton href={TC_JOURNAL_URL} variant="outlineLight">Journal only — $27</BuyButton>
            </div>
            <p className="text-ink/28 text-[11px] mt-4">Bundle includes series + journal — save $7 vs buying separately.</p>
          </Reveal>

          {/* Journal mockup */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 bg-sunrise/6 rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-white shadow-[0_24px_64px_rgba(44,44,42,0.12)]">
                <div className="h-1 bg-gradient-to-r from-sunrise/50 via-sunrise to-sunrise/50" />

                <div className="px-6 py-4 border-b border-ink/6 bg-[#FDFCF8] flex items-center justify-between">
                  <div>
                    <p className="aa-display text-lg italic text-ink font-medium">Awaken &amp; Align</p>
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.25em] text-ink/35 mt-0.5">Meditation Journal</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-sunrise/14 border border-sunrise/24 flex items-center justify-center">
                    <span className="font-heading text-[10px] font-bold text-sunrise">1</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="font-heading text-[8px] font-bold uppercase tracking-[0.28em] text-sunrise mb-4">Reflection Questions</p>
                  <div className="space-y-3 mb-5">
                    {[
                      "When you sit in silence, what rises in you — peace, restlessness, or something else?",
                      "Think of a time you knew God was speaking. What did that feel like?",
                    ].map((q, i) => (
                      <div key={i} className="border border-ink/7 rounded-xl p-4 bg-parchment/50">
                        <p className="text-ink/55 text-[11px] leading-relaxed mb-3">{q}</p>
                        <div className="space-y-1.5">
                          <div className="h-1 bg-ink/7 rounded-full" />
                          <div className="h-1 bg-ink/5 rounded-full w-4/5" />
                          <div className="h-1 bg-ink/4 rounded-full w-3/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#141311] rounded-xl p-4">
                    <p className="font-heading text-[8px] font-bold uppercase tracking-[0.22em] text-sunrise/75 mb-2">Your Declaration</p>
                    <p className="aa-display italic text-white/65 text-sm leading-relaxed mb-3">
                      &ldquo;I hear God&apos;s voice clearly. His word rises above the noise, and I am learning to recognize it, trust it, and act on it.&rdquo;
                    </p>
                    <span className="font-heading text-[8px] font-bold uppercase tracking-wider text-sunrise border border-sunrise/28 rounded-full px-3 py-1 inline-block">
                      Speak it aloud →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-16 bg-[#141311] relative">
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.15), transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="aa-display text-[clamp(30px,4vw,46px)] font-light italic text-white/75">What others are saying</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: "This series gave me permission to actually believe I was hearing God. Session 3 wrecked me in the best way.", name: "Adrienne M.", role: "Entrepreneur" },
              { quote: "I've never had a meditation practice feel this intentional. The declarations alone changed my mornings.", name: "Renée T.", role: "Ministry Leader" },
              { quote: "I was skeptical — but by session 2 I was completely in. My relationship with God deepened in ways I wasn't expecting.", name: "Candice W.", role: "Life Coach" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white/[0.04] border border-white/7 rounded-2xl p-6 hover:bg-white/[0.062] transition-all duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => <span key={s} className="text-sunrise text-xs">★</span>)}
                  </div>
                  <p className="aa-display italic text-white/60 text-[15px] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-heading text-sm font-semibold text-white/80">{t.name}</p>
                    <p className="text-white/28 text-[11px] mt-0.5">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 md:py-36 px-6 lg:px-16 bg-parchment">
        <div className="max-w-5xl mx-auto">

          <Reveal className="text-center mb-16">
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">Simple Pricing</p>
            <h2 className="aa-display text-[clamp(40px,5.5vw,66px)] font-light italic text-ink leading-[1.08]">Choose your path.</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">

            {/* Journal */}
            <Reveal delay={0.04}>
              <div className="bg-white border border-ink/7 rounded-3xl p-7 h-full flex flex-col hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all duration-300">
                <p className="font-heading text-[9px] font-bold uppercase tracking-wider text-ink/35 mb-4">Journal Only</p>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="aa-display text-[52px] font-light italic text-ink leading-none">$27</span>
                  <span className="text-ink/28 text-sm mb-2">one-time</span>
                </div>
                <p className="text-ink/42 text-[12px] leading-relaxed mb-6">The 10-session interactive journal. Works with any meditation practice.</p>
                <ul className="space-y-2 flex-1 mb-7">
                  {['All 10 journal sessions', 'Reflection questions & steps', 'Declarations for each session', 'Download your entries anytime'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[12px] text-ink/55">
                      <svg className="w-3.5 h-3.5 text-sunrise shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <BuyButton href={TC_JOURNAL_URL} variant="outlineLight" className="w-full justify-center text-[12px]">Get the Journal</BuyButton>
              </div>
            </Reveal>

            {/* Series */}
            <Reveal delay={0.1}>
              <div className="bg-white border border-ink/7 rounded-3xl p-7 h-full flex flex-col hover:shadow-[0_12px_40px_rgba(44,44,42,0.07)] transition-all duration-300">
                <p className="font-heading text-[9px] font-bold uppercase tracking-wider text-ink/35 mb-4">The Series</p>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="aa-display text-[52px] font-light italic text-ink leading-none">$47</span>
                  <span className="text-ink/28 text-sm mb-2">one-time</span>
                </div>
                <p className="text-ink/42 text-[12px] leading-relaxed mb-6">All 10 meditations in your private member portal.</p>
                <ul className="space-y-2 flex-1 mb-7">
                  {['10 guided meditation videos', 'Private member portal access', 'Watch on any device', 'Lifetime access'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[12px] text-ink/55">
                      <svg className="w-3.5 h-3.5 text-sunrise shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <BuyButton href={TC_SERIES_URL} variant="gold" className="w-full justify-center text-[12px]">Get the Series</BuyButton>
              </div>
            </Reveal>

            {/* Bundle */}
            <Reveal delay={0.16}>
              <div className="bg-[#141311] rounded-3xl p-7 h-full flex flex-col relative overflow-hidden shadow-[0_16px_48px_rgba(20,19,17,0.22)]">
                <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(245,200,66,0.35), rgba(245,200,66,1), rgba(245,200,66,0.35))' }} />
                <div className="absolute top-4 right-5">
                  <span className="font-heading text-[8px] font-bold uppercase tracking-wider bg-sunrise/14 text-sunrise border border-sunrise/28 px-2.5 py-1 rounded-full">Best Value</span>
                </div>
                <p className="font-heading text-[9px] font-bold uppercase tracking-wider text-white/28 mb-4">Series + Journal</p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="aa-display text-[52px] font-light italic text-white leading-none">$67</span>
                  <span className="text-white/25 text-sm mb-2">one-time</span>
                </div>
                <p className="font-heading text-[9px] text-sunrise/55 mb-4">Save $7 — journal normally $27</p>
                <p className="text-white/38 text-[12px] leading-relaxed mb-6">Everything in one place. The full series plus the companion journal.</p>
                <ul className="space-y-2 flex-1 mb-7">
                  {[
                    'All 10 meditation videos',
                    'Interactive 10-session journal',
                    'Reflection questions + action steps',
                    'Declarations for every session',
                    'Private member portal',
                    'Lifetime access',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[12px] text-white/52">
                      <svg className="w-3.5 h-3.5 text-sunrise shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <BuyButton href={TC_BUNDLE_URL} variant="gold" className="w-full justify-center text-[12px]">Get the Bundle</BuyButton>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ── FINAL CTA — dark serene photo backdrop ─────────────────── */}
      <section className="relative py-36 md:py-44 px-6 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${CTA_BG}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,19,17,0.78) 0%, rgba(20,19,17,0.86) 50%, rgba(20,19,17,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(245,200,66,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.25), transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.032, backgroundImage: GRAIN }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-heading text-[9px] font-bold uppercase tracking-[0.38em] text-sunrise/50 mb-10">All of heaven is cheering you on</p>
            <h2 className="aa-display text-[clamp(58px,10vw,108px)] font-light italic text-white leading-[0.92] mb-10">
              Let&apos;s<br />
              <span className="text-sunrise">begin.</span>
            </h2>
            <p className="text-white/32 text-[15px] leading-[1.75] max-w-md mx-auto mb-12">
              One quiet hour with God can change the next year of your life. Press play and find out.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <BuyButton href={TC_SERIES_URL} variant="gold">Get the Series — $47</BuyButton>
              <BuyButton href={TC_BUNDLE_URL} variant="outlineDark">+ Journal · Bundle $67</BuyButton>
            </div>
            <p className="text-white/30 text-[11px] mt-3 text-center">Bundle saves $7. <a href="#preview" onClick={(e) => scrollToId('preview', e)} className="underline underline-offset-2 hover:text-white/60">Hear the sample first →</a></p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
