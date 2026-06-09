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
        background: 'rgba(20, 19, 17, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0px, 4vw, 32px)',
        animation: 'bm-fade-in 0.24s ease-out',
      }}
      aria-modal="true"
      role="dialog"
    >
      <style>{`
        @keyframes bm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bm-zoom-in { from { opacity: 0; transform: translateY(14px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(820px, 100%)',
          height: 'min(92vh, 1100px)',
          background: '#FAFAFA',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
          animation: 'bm-zoom-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Header bar with close + open-in-new-tab fallback */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px',
          background: 'linear-gradient(180deg, rgba(20,19,17,0.85), rgba(20,19,17,0))',
          zIndex: 2, pointerEvents: 'none',
        }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: 'auto',
              fontFamily: 'Sora, system-ui, sans-serif',
              fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.7)',
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
            }}
          >
            Open in new tab ↗
          </a>
          <button
            type="button"
            onClick={() => setUrl(null)}
            aria-label="Close"
            style={{
              pointerEvents: 'auto',
              width: 36, height: 36, borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(8px)',
              border: 0, cursor: 'pointer',
              color: 'white', fontSize: 20, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

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
