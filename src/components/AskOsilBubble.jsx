import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AskOsilChat from './AskOsilChat.jsx'

const SUNRISE = '#F5C842'
const INK = '#1A1A1A'

export default function AskOsilBubble() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const hideOnPage = location.pathname === '/ask-osil'

  // Lock body scroll when expanded on mobile, but only there
  useEffect(() => {
    if (hideOnPage || !open) return
    // Only lock on small screens — desktop the card sits over content without taking it over
    if (window.matchMedia('(max-width: 640px)').matches) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open, hideOnPage])

  // Esc to close
  useEffect(() => {
    if (hideOnPage || !open) return
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, hideOnPage])

  // Don't render on the dedicated chat page (it already has the chat inline).
  if (hideOnPage) return null

  return (
    <>
      <style>{`
        @keyframes aob-pop  { from { opacity: 0; transform: translateY(10px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes aob-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.35); } 50% { box-shadow: 0 0 0 10px rgba(245,200,66,0); } }
      `}</style>

      {/* The closed bubble button — circular cartoon photo. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with Osil's AI clone"
          style={{
            position: 'fixed',
            right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
            bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            zIndex: 60,
            width: 64, height: 64,
            borderRadius: 999,
            padding: 0, border: 'none', cursor: 'pointer',
            background: SUNRISE,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(44,44,42,0.25), 0 0 0 3px rgba(255,255,255,0.85)',
            animation: 'aob-ring 2.8s ease-in-out infinite',
            transition: 'transform 0.18s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <img
            src="/images/osil-cartoon.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </button>
      )}

      {/* Expanded chat card. */}
      {open && (
        <div
          role="complementary"
          aria-labelledby="aob-title"
          style={{
            position: 'fixed',
            right: 'max(1rem, env(safe-area-inset-right, 1rem))',
            bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
            left: 'auto',
            zIndex: 60,
            width: 'min(420px, calc(100vw - 2rem))',
            height: 'min(86vh, 720px)',
            minHeight: 'min(480px, calc(100vh - 2rem))',
            background: '#FAFAFA',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.32), 0 0 0 1px rgba(44,44,42,0.06)',
            animation: 'aob-pop 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '0.85rem 1rem 0.85rem 0.85rem',
            background: 'white',
            borderBottom: '1px solid rgba(26,26,26,0.06)',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999,
              overflow: 'hidden', flexShrink: 0,
              background: SUNRISE,
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(44,44,42,0.16)',
            }}>
              <img
                src="/images/osil-cartoon.png"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p id="aob-title" style={{
                margin: 0,
                fontFamily: 'Sora, system-ui, sans-serif',
                fontSize: 14, fontWeight: 700,
                color: INK,
                lineHeight: 1.2,
              }}>
                Osil&apos;s AI Clone
              </p>
              <p style={{
                margin: 0, marginTop: 2,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 11, color: 'rgba(26,26,26,0.5)',
                lineHeight: 1.3,
              }}>
                Sounds like her. Trained on her work.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimize chat"
              style={{
                width: 30, height: 30, borderRadius: 999,
                background: 'rgba(26,26,26,0.06)',
                border: 0, cursor: 'pointer',
                color: 'rgba(26,26,26,0.7)',
                fontSize: 18, lineHeight: 1, fontWeight: 300,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.18s ease, transform 0.18s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26,26,26,0.12)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26,26,26,0.06)' }}
            >
              −
            </button>
          </div>

          {/* Chat body — the same component as /ask-osil, sized to fit the bubble. */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <AskOsilChat fill />
          </div>
        </div>
      )}
    </>
  )
}
