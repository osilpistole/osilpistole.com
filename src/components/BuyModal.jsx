import { useEffect, useState } from 'react'

// Fire this from any BuyButton to open the checkout in an overlay
// instead of navigating away from the landing page.
export function openBuyModal(url) {
  window.dispatchEvent(new CustomEvent('buy-modal:open', { detail: { url } }))
}

export default function BuyModal() {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    function onOpen(e) { setUrl(e.detail.url) }
    function onKey(e) { if (e.key === 'Escape') setUrl(null) }
    window.addEventListener('buy-modal:open', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('buy-modal:open', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Lock body scroll while open
  useEffect(() => {
    if (!url) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
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
    >
      <style>{`
        @keyframes bm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bm-zoom-in {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
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
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, rgba(245,200,66,0.0), rgba(245,200,66,1) 50%, rgba(245,200,66,0.0))',
          zIndex: 3, pointerEvents: 'none',
        }} />

        {/* Floating controls — small, refined */}
        <button
          type="button"
          onClick={() => setUrl(null)}
          aria-label="Close"
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 4,
            width: 30, height: 30, borderRadius: 999,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(8px)',
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

        <iframe
          src={url}
          title="Checkout"
          style={{
            width: '100%', height: '100%', border: 0, display: 'block',
            background: '#FAFAFA',
          }}
          allow="payment"
        />
      </div>
    </div>
  )
}
