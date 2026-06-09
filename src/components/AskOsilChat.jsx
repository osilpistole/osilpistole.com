import { useEffect, useRef, useState } from 'react'

const GREETING = "Hey — I'm Osil's AI clone. I sound like her, I think like her, and I know her work. What's on your mind?"

const SUNRISE = '#F5C842'
const MORNING = '#B8A4D8'
const INK = '#1A1A1A'

function renderMarkdownLite(text) {
  // Tiny formatter: **bold**, *italic*, [text](url), and \n\n paragraph breaks.
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const safe = escape(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#5b4a16;text-decoration:underline;text-underline-offset:3px">$1</a>')
    .replace(/\bhttps?:\/\/\S+\b/g, (m) =>
      `<a href="${m}" target="_blank" rel="noopener noreferrer" style="color:#5b4a16;text-decoration:underline;text-underline-offset:3px">${m}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
  return safe.split(/\n\n+/).map(p => `<p style="margin:0 0 0.7em 0;line-height:1.55">${p.replace(/\n/g, '<br/>')}</p>`).join('')
}

function Bubble({ role, content }) {
  const isAI = role === 'assistant'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isAI ? 'flex-start' : 'flex-end',
      animation: 'aoc-fade 0.32s ease-out',
    }}>
      <div
        style={{
          maxWidth: '85%',
          padding: '0.9rem 1.1rem',
          fontSize: '0.95rem',
          color: INK,
          background: isAI ? 'white' : 'rgba(245,200,66,0.18)',
          borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          boxShadow: isAI ? '0 2px 12px rgba(44,44,42,0.06)' : 'none',
          border: isAI ? '1px solid rgba(44,44,42,0.06)' : '1px solid rgba(245,200,66,0.32)',
        }}
        dangerouslySetInnerHTML={isAI ? { __html: renderMarkdownLite(content) } : undefined}
      >
        {!isAI ? content : undefined}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'aoc-fade 0.3s ease-out' }}>
      <div style={{
        background: 'white',
        borderRadius: '4px 18px 18px 18px',
        padding: '0.95rem 1.15rem',
        boxShadow: '0 2px 12px rgba(44,44,42,0.06)',
        border: '1px solid rgba(44,44,42,0.06)',
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: 999,
            background: 'rgba(44,44,42,0.4)',
            animation: `aoc-dot 1.2s ${i * 0.15}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

export default function AskOsilChat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, pending])

  async function send(e) {
    if (e) e.preventDefault()
    const text = input.trim()
    if (!text || pending) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setPending(true)
    setError(null)

    try {
      const res = await fetch('/api/ask-osil-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Anthropic accepts the same message format we use here
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (!data.message) throw new Error('No message in response')

      setMessages(m => [...m, { role: 'assistant', content: data.message }])
    } catch (err) {
      console.error(err)
      setError("Something went sideways. Try again — or email me at osil@osilpistole.com.")
    } finally {
      setPending(false)
      // Refocus the input after sending
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 640,
      margin: '0 auto',
      borderRadius: 22,
      background: '#FAFAFA',
      border: '1px solid rgba(26,26,26,0.08)',
      boxShadow: '0 24px 64px rgba(26,26,26,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: 'min(72vh, 640px)',
    }}>
      <style>{`
        @keyframes aoc-fade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes aoc-dot  { 0%,80%,100%{opacity:0.3;transform:translateY(0)} 40%{opacity:1;transform:translateY(-3px)} }
        .aoc-input::placeholder { color: rgba(26,26,26,0.36) }
        .aoc-input:focus { outline: none; box-shadow: 0 0 0 2px rgba(245,200,66,0.45) }
      `}</style>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
          background: 'linear-gradient(180deg, #FAFAFA 0%, #F4F1EA 100%)',
        }}
      >
        {messages.map((m, i) => <Bubble key={i} role={m.role} content={m.content} />)}
        {pending && <Typing />}
        {error && (
          <div style={{
            alignSelf: 'center',
            background: 'rgba(220, 80, 80, 0.08)',
            border: '1px solid rgba(220, 80, 80, 0.25)',
            color: 'rgba(170, 50, 50, 1)',
            padding: '0.65rem 0.95rem',
            borderRadius: 999,
            fontSize: '0.78rem',
          }}>{error}</div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={send}
        style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid rgba(26,26,26,0.08)',
          background: 'white',
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-end',
        }}
      >
        <textarea
          ref={inputRef}
          className="aoc-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask me anything…"
          rows={1}
          autoFocus
          style={{
            flex: 1,
            resize: 'none',
            border: '1px solid rgba(26,26,26,0.12)',
            borderRadius: 14,
            padding: '0.75rem 0.95rem',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            color: INK,
            background: '#FBFAF6',
            lineHeight: 1.4,
            maxHeight: 120,
            transition: 'box-shadow 0.18s ease',
          }}
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          aria-label="Send message"
          style={{
            background: pending || !input.trim() ? 'rgba(26,26,26,0.12)' : SUNRISE,
            color: pending || !input.trim() ? 'rgba(26,26,26,0.35)' : INK,
            border: 0,
            borderRadius: 999,
            width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: pending || !input.trim() ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            transition: 'transform 0.18s ease, background 0.18s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { if (!pending && input.trim()) e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}
