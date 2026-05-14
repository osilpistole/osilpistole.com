import { useState, useEffect, useRef } from 'react'

const BOOKING_URL = 'https://osilpistole.thrivecart.com/prophetic-strategy-session/'

const SUNRISE = '#F5C842'
const MORNING = '#B8A4D8'
const GROWTH = '#7DBE6A'
const INK = '#2C2C2A'
const PARCHMENT = '#FDFAF5'

const styles = `
  @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-ring { 0%{transform:scale(0.9);opacity:0.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(1.3);opacity:0} }
`

function Avatar() {
  return (
    <div style={{ width: 40, height: 40, flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(245,200,66,0.4))' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hard hat dome */}
        <path d="M8 18 Q8 8 20 8 Q32 8 32 18" fill="#F5C842"/>
        {/* Hat brim */}
        <rect x="6" y="16" width="28" height="4" rx="2" fill="#F5C842"/>
        {/* Hat shine */}
        <path d="M12 13 Q12 10 20 10 Q24 10 26 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Face */}
        <circle cx="20" cy="26" r="10" fill="#FDFAF5"/>
        {/* Cheeks */}
        <ellipse cx="13" cy="28" rx="3" ry="1.8" fill="rgba(245,200,66,0.3)"/>
        <ellipse cx="27" cy="28" rx="3" ry="1.8" fill="rgba(245,200,66,0.3)"/>
        {/* Eyes */}
        <circle cx="16" cy="25" r="1.6" fill="#2C2C2A"/>
        <circle cx="24" cy="25" r="1.6" fill="#2C2C2A"/>
        {/* Eye shine */}
        <circle cx="16.7" cy="24.3" r="0.5" fill="white"/>
        <circle cx="24.7" cy="24.3" r="0.5" fill="white"/>
        {/* Smile */}
        <path d="M15 29 Q20 33 25 29" stroke="#2C2C2A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Tiny wrench on hat */}
        <circle cx="30" cy="12" r="2.5" fill="none" stroke="#7DBE6A" strokeWidth="1.8"/>
        <rect x="31.2" y="11.2" width="4.5" height="1.6" rx="0.8" fill="#7DBE6A"/>
      </svg>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', animation: 'fadeUp 0.3s ease-out' }}>
      <Avatar />
      <div style={{
        background: 'white', borderRadius: '0 16px 16px 16px', padding: '0.85rem 1.1rem',
        boxShadow: '0 2px 8px rgba(44,44,42,0.06)', border: '1px solid rgba(44,44,42,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%', background: MORNING,
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ role, content }) {
  const isAI = role === 'assistant'
  return (
    <div style={{
      display: 'flex', justifyContent: isAI ? 'flex-start' : 'flex-end',
      gap: '0.75rem', alignItems: 'flex-start',
      animation: 'fadeUp 0.35s ease-out',
    }}>
      {isAI && <Avatar />}
      <div style={{
        background: isAI ? 'white' : 'rgba(245,200,66,0.18)',
        color: INK,
        borderRadius: isAI ? '0 16px 16px 16px' : '16px 0 16px 16px',
        padding: '0.85rem 1.1rem',
        maxWidth: '80%',
        fontSize: '0.92rem',
        lineHeight: 1.65,
        boxShadow: isAI ? '0 2px 8px rgba(44,44,42,0.06)' : 'none',
        border: isAI ? '1px solid rgba(44,44,42,0.06)' : '1.5px solid rgba(245,200,66,0.35)',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  )
}

function ResultSection({ accent, label, children }) {
  const colors = {
    sunrise: { bg: 'rgba(245,200,66,0.08)', border: 'rgba(245,200,66,0.25)', bar: SUNRISE, text: '#8a6500' },
    growth:  { bg: 'rgba(125,190,106,0.08)', border: 'rgba(125,190,106,0.25)', bar: GROWTH,  text: '#3d7028' },
    morning: { bg: 'rgba(184,164,216,0.08)', border: 'rgba(184,164,216,0.25)', bar: MORNING, text: '#6a4d8a' },
  }
  const c = colors[accent] || colors.morning
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.bar}`,
      borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem',
    }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.text, marginBottom: '0.5rem' }}>{label}</div>
      {children}
    </div>
  )
}

function ResultCard({ result }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1rem',
          background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
        }}>✨</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
          Here's what you should build.
        </h2>
        <p style={{ color: 'rgba(44,44,42,0.5)', fontSize: '0.9rem' }}>Based on everything you shared — this is your personalized recommendation.</p>
      </div>

      <ResultSection accent="sunrise" label="Your Business Idea">
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: INK }}>{result.idea}</p>
      </ResultSection>

      <ResultSection accent="growth" label="Your Audience">
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: INK }}>{result.audience}</p>
      </ResultSection>

      <ResultSection accent="morning" label="Recommended Format">
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: INK }}>{result.format}</p>
      </ResultSection>

      <ResultSection accent="morning" label="Your First 3 Steps">
        {result.steps?.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: i < 2 ? '0.75rem' : 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 800, color: INK,
            }}>{i + 1}</div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: INK, margin: 0 }}>{step}</p>
          </div>
        ))}
      </ResultSection>

      {result.gifts_note && (
        <ResultSection accent="sunrise" label="Your Gifts at Work">
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: INK }}>{result.gifts_note}</p>
        </ResultSection>
      )}

      {result.missing_assessments && (
        <div style={{
          background: 'white', border: '1px solid rgba(44,44,42,0.08)',
          borderRadius: 16, padding: '1rem 1.5rem', marginBottom: '1rem',
          fontSize: '0.85rem', color: 'rgba(44,44,42,0.6)', lineHeight: 1.6,
        }}>
          📌 Want a deeper picture? Take the free{' '}
          <a href="/spiritual-gifts" style={{ color: '#8a6500', textDecoration: 'underline' }}>Spiritual Gifts Assessment</a>{' '}
          and{' '}
          <a href="/fivefold" style={{ color: '#6a4d8a', textDecoration: 'underline' }}>5-Fold Assessment</a>{' '}
          — they'll sharpen this recommendation significantly.
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: 'white', borderRadius: 20, padding: '2rem 1.5rem',
        textAlign: 'center', marginTop: '1.5rem', position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(44,44,42,0.08)', boxShadow: '0 4px 24px rgba(44,44,42,0.06)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${SUNRISE}, ${MORNING}, ${GROWTH})` }} />
        <h3 style={{ color: INK, fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          You have the idea. Now let's build the plan.
        </h3>
        <p style={{ color: 'rgba(44,44,42,0.5)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Book a 60-minute strategy session and we'll map out exactly how to launch this — web build, workshop setup, offer design, all of it.
        </p>
        <a
          href={BOOKING_URL}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: SUNRISE, color: INK, borderRadius: 999,
            padding: '0.75rem 2rem', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Book for $99 <span style={{ textDecoration: 'line-through', opacity: 0.4, fontWeight: 400, marginLeft: '0.4rem' }}>$222</span> →
        </a>
        <p style={{ color: 'rgba(44,44,42,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
          Session cost credited toward any project if you decide to work with Osil.
        </p>
      </div>
    </div>
  )
}

export default function QuizChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [screen, setScreen] = useState('chat')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const bottomRef = useRef(null)

  useEffect(() => { fetchNextQuestion([]) }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function fetchNextQuestion(history) {
    setIsTyping(true)
    try {
      const res = await fetch('/api/quiz-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      const userCount = history.filter(m => m.role === 'user').length
      setProgress(Math.min(Math.round((userCount / 10) * 100), 95))
      if (data.done) setTimeout(() => setScreen('email'), 600)
    } catch (err) {
      console.error('quiz-chat error:', err)
    } finally {
      setIsTyping(false)
    }
  }

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return
    setInput('')
    const updated = [...messages, { role: 'user', content: trimmed }]
    setMessages(updated)
    await fetchNextQuestion(updated)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setScreen('generating')
    try {
      const resultRes = await fetch('/api/quiz-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })
      const resultData = await resultRes.json()
      await fetch('/api/quiz-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), conversation: messages, result: resultData.result }),
      })
      setResult(resultData.result)
      setScreen('result')
    } catch (err) {
      console.error('result generation error:', err)
    }
  }

  if (screen === 'result' && result) {
    return (
      <div style={{ background: PARCHMENT, minHeight: '100vh', paddingTop: '1rem' }}>
        <style>{styles}</style>
        <ResultCard result={result} />
      </div>
    )
  }

  if (screen === 'generating') {
    return (
      <div style={{
        minHeight: '100vh', background: PARCHMENT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1.25rem',
      }}>
        <style>{styles}</style>
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem',
          }}>✨</div>
          <div style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: `2px solid ${SUNRISE}`,
            animation: 'pulse-ring 1.5s ease-out infinite',
          }} />
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: INK }}>
          Building your personalized recommendation…
        </p>
        <p style={{ color: 'rgba(44,44,42,0.4)', fontSize: '0.85rem' }}>This takes about 10 seconds.</p>
      </div>
    )
  }

  if (screen === 'email') {
    return (
      <div style={{
        minHeight: '100vh', background: PARCHMENT,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem',
      }}>
        <style>{styles}</style>
        <div style={{ maxWidth: 440, width: '100%' }}>
          <div style={{
            background: 'white', borderRadius: 24, padding: '2.5rem 2rem', textAlign: 'center',
            boxShadow: '0 4px 32px rgba(44,44,42,0.08)', border: '1px solid rgba(44,44,42,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${SUNRISE}, ${MORNING}, ${GROWTH})` }} />
            <div style={{
              width: 52, height: 52, borderRadius: '50%', margin: '0 auto 1.25rem',
              background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', boxShadow: '0 6px 20px rgba(245,200,66,0.35)',
            }}>📬</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
              Your results are ready.
            </h2>
            <p style={{ color: 'rgba(44,44,42,0.5)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Where should we send your personalized business recommendation?
            </p>
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="First name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 12,
                  border: '1.5px solid rgba(44,44,42,0.12)', fontSize: '0.95rem',
                  background: PARCHMENT, boxSizing: 'border-box', outline: 'none',
                  color: INK, fontFamily: 'inherit',
                }}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 12,
                  border: '1.5px solid rgba(44,44,42,0.12)', fontSize: '0.95rem',
                  background: PARCHMENT, boxSizing: 'border-box', outline: 'none',
                  color: INK, fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  background: SUNRISE, color: INK, border: 'none', borderRadius: 999,
                  padding: '0.85rem 2rem', fontWeight: 700, fontSize: '1rem',
                  cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Show me my results →
              </button>
            </form>
            <p style={{ color: 'rgba(44,44,42,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>No spam. We send your report and that's it.</p>
          </div>
        </div>
      </div>
    )
  }

  // Main chat screen
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: PARCHMENT }}>
      <style>{styles}</style>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(44,44,42,0.08)', flexShrink: 0 }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: `linear-gradient(90deg, ${SUNRISE}, ${MORNING}, ${GROWTH})`,
          borderRadius: 999, transition: 'width 0.6s ease',
        }} />
      </div>

      {/* Header */}
      <div style={{
        padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(44,44,42,0.08)',
        background: 'white', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Avatar />
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: INK, fontFamily: 'var(--font-heading)', margin: 0 }}>AI Build Quiz</p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(44,44,42,0.4)', margin: 0 }}>by Osil Pistole</p>
          </div>
        </div>
        {progress > 0 && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(44,44,42,0.4)', fontWeight: 600 }}>
            {progress}% complete
          </p>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '1.5rem 1rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1rem',
        maxWidth: 640, margin: '0 auto', width: '100%',
      }}>
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid rgba(44,44,42,0.08)', background: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', maxWidth: 640, margin: '0 auto' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer… (Enter to send)"
            rows={1}
            style={{
              flex: 1, border: '1.5px solid rgba(44,44,42,0.12)', borderRadius: 16,
              padding: '0.65rem 1rem', fontSize: '0.9rem', resize: 'none',
              fontFamily: 'inherit', outline: 'none', lineHeight: 1.5,
              background: PARCHMENT, color: INK,
            }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            style={{
              background: input.trim() && !isTyping ? SUNRISE : 'rgba(44,44,42,0.08)',
              color: INK, border: 'none', borderRadius: 999,
              padding: '0.65rem 1.25rem', fontWeight: 700, fontSize: '0.9rem',
              cursor: input.trim() && !isTyping ? 'pointer' : 'default',
              transition: 'background 0.2s, box-shadow 0.2s', flexShrink: 0,
              boxShadow: input.trim() && !isTyping ? '0 4px 16px rgba(245,200,66,0.35)' : 'none',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Send →
          </button>
        </div>
      </div>
    </div>
  )
}
