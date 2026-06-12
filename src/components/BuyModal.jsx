import { useEffect, useRef, useState } from 'react'

// Fire this from any BuyButton to open the checkout in an overlay
// instead of navigating away from the landing page.
export function openBuyModal(url) {
  window.dispatchEvent(new CustomEvent('buy-modal:open', { detail: { url } }))
}

// Hint that this URL is about to be opened — call from onMouseEnter / onFocus
// of buy buttons. Pre-resolves DNS + opens TCP/TLS to the checkout origin
// so the modal feels instant when the user actually clicks.
const PRELOAD_DONE = new Set()
export function preloadCheckoutOrigin(url) {
  try {
    const origin = new URL(url).origin
    if (PRELOAD_DONE.has(origin)) return
    PRELOAD_DONE.add(origin)
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    link.crossOrigin = ''
    document.head.appendChild(link)
  } catch { /* ignore bad URLs */ }
}

export default function BuyModal() {
  const [url, setUrl] = useState(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    function onOpen(e) {
      setIframeLoaded(false)
      setUrl(e.detail.url)
    }
    function onKey(e) { if (e.key === 'Escape') setUrl(null) }
    window.addEventListener('buy-modal:open', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('buy-modal:open', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Lock body scroll while open + move focus into the dialog
  useEffect(() => {
    if (!url) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Defer to next tick so the dialog is in the DOM
    const t = setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [url])

  if (!url) return null

  return (
    <div
      onClick={() => setUrl(null)}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(20, 19, 17, 0.62)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0px, 5vw, 32px)',
        animation: 'bm-fade-in 0.28s ease-out',
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="bm-title"
    >
      <style>{`
        @keyframes bm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bm-zoom-in {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes bm-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(540px, 100%)',
          height: 'min(76vh, 760px)',
          background: '#FAFAFA',
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(245, 200, 66, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          animation: 'bm-zoom-in 0.36s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Visually-hidden title for screen readers */}
        <span id="bm-title" style={{
          position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden',
          clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
        }}>
          Checkout
        </span>

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, rgba(245,200,66,0.0), rgba(245,200,66,1) 50%, rgba(245,200,66,0.0))',
          zIndex: 3, pointerEvents: 'none',
        }} />

        {/* Loading state — covered by iframe content once it loads */}
        {!iframeLoaded && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#FAFAFA',
            gap: 18,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999,
              border: '2.5px solid rgba(44,44,42,0.10)',
              borderTopColor: 'rgba(245,200,66,1)',
              animation: 'bm-spin 0.9s linear infinite',
            }} />
            <p style={{
              fontFamily: 'Sora, system-ui, sans-serif',
              fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.3em',
              color: 'rgba(44,44,42,0.5)',
              margin: 0,
            }}>
              Loading checkout
            </p>
            {/* Visible fallback if it never loads — appears after 6s */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 14,
                fontFamily: 'Sora, system-ui, sans-serif',
                fontSize: 11,
                color: 'rgba(44,44,42,0.6)',
                textDecoration: 'underline', textUnderlineOffset: 3,
                opacity: 0,
                animation: 'bm-fade-in 0.4s ease 5.5s forwards',
              }}
            >
              Taking too long? Open in a new tab →
            </a>
          </div>
        )}

        {/* Small open-in-new-tab icon */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          aria-label="Open in new tab"
          style={{
            position: 'absolute', top: 14, left: 14, zIndex: 4,
            width: 26, height: 26, borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(44, 44, 42, 0.08)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(44, 44, 42, 0.55)',
            transition: 'color 0.18s ease, transform 0.18s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(44,44,42,0.9)'; e.currentTarget.style.transform = 'translate(-1px, -1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(44,44,42,0.55)'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </a>

        <button
          ref={closeRef}
          type="button"
          onClick={() => setUrl(null)}
          aria-label="Close checkout"
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 4,
            width: 30, height: 30, borderRadius: 999,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(44, 44, 42, 0.10)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
            cursor: 'pointer',
            color: 'rgba(44, 44, 42, 0.75)',
            fontSize: 18, lineHeight: 1, fontWeight: 300,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.18s ease, color 0.18s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(90deg)'; e.currentTarget.style.color = 'rgba(44,44,42,1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)';  e.currentTarget.style.color = 'rgba(44,44,42,0.75)' }}
        >
          ×
        </button>

        <iframe
          src={url}
          title="Checkout"
          onLoad={() => setIframeLoaded(true)}
          style={{
            width: '100%', height: '100%', border: 0, display: 'block',
            background: '#FAFAFA',
            position: 'relative', zIndex: 2,
          }}
          allow="payment"
        />
      </div>
    </div>
  )
}
