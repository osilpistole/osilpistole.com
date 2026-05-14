import { useState, useEffect, useRef } from 'react'

const BOOKING_URL = 'https://osilpistole.thrivecart.com/prophetic-strategy-session/'

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', background: '#1C1A2E',
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', color: 'white', fontWeight: 700,
      }}>O</div>
      <div style={{
        background: 'white', borderRadius: '0 14px 14px 14px', padding: '0.75rem 1rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%', background: '#aaa',
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
      display: 'flex',
      justifyContent: isAI ? 'flex-start' : 'flex-end',
      gap: '0.6rem',
      alignItems: 'flex-start',
    }}>
      {isAI && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: '#1C1A2E',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', color: 'white', fontWeight: 700,
        }}>O</div>
      )}
      <div style={{
        background: isAI ? 'white' : '#1C1A2E',
        color: isAI ? '#1C1A2E' : 'white',
        borderRadius: isAI ? '0 14px 14px 14px' : '14px 0 14px 14px',
        padding: '0.75rem 1rem',
        maxWidth: '80%',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        boxShadow: isAI ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  )
}

function ResultCard({ result }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
        <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.5rem', fontWeight: 700, color: '#1C1A2E', marginBottom: '0.5rem' }}>
          Here's what you should build.
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Based on everything you shared — this is your personalized recommendation.</p>
      </div>

      {/* Business Idea */}
      <div style={{ background: '#1C1A2E', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem', color: 'white' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5C842', marginBottom: '0.5rem' }}>Your Business Idea</div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{result.idea}</p>
      </div>

      {/* Audience */}
      <div style={{ background: 'white', border: '1px solid #e8e4de', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B8A4D8', marginBottom: '0.5rem' }}>Your Audience</div>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#333' }}>{result.audience}</p>
      </div>

      {/* Format */}
      <div style={{ background: 'white', border: '1px solid #e8e4de', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B8A4D8', marginBottom: '0.5rem' }}>Recommended Format</div>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#333' }}>{result.format}</p>
      </div>

      {/* First 3 Steps */}
      <div style={{ background: 'white', border: '1px solid #e8e4de', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B8A4D8', marginBottom: '0.75rem' }}>Your First 3 Steps</div>
        {result.steps?.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: i < 2 ? '0.75rem' : 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#F5C842',
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 700, color: '#1C1A2E',
            }}>{i + 1}</div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#333', margin: 0 }}>{step}</p>
          </div>
        ))}
      </div>

      {/* Gifts note */}
      {result.gifts_note && (
        <div style={{ background: '#FFF9F0', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#d4a800', marginBottom: '0.5rem' }}>Your Gifts at Work</div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#333' }}>{result.gifts_note}</p>
        </div>
      )}

      {/* Missing assessments nudge */}
      {result.missing_assessments && (
        <div style={{ background: '#f8f6f2', border: '1px solid #e8e4de', borderRadius: 16, padding: '1rem 1.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>
          📌 Want an even deeper picture? Take the free{' '}
          <a href="/spiritual-gifts" style={{ color: '#d4a800', textDecoration: 'underline' }}>Spiritual Gifts Assessment</a>{' '}
          and{' '}
          <a href="/fivefold" style={{ color: '#B8A4D8', textDecoration: 'underline' }}>5-Fold Assessment</a>{' '}
          — then come back. They'll sharpen this recommendation significantly.
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: '#1C1A2E', borderRadius: 20, padding: '2rem 1.5rem',
        textAlign: 'center', marginTop: '1.5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#B8A4D8' }} />
        <h3 style={{ color: 'white', fontFamily: 'var(--font-heading, serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          You have the idea. Now let's build the plan.
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Book a 60-minute strategy session and we'll map out exactly how to launch this — web build, workshop setup, offer design, all of it.
        </p>
        <a
          href={BOOKING_URL}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: '#B8A4D8', color: '#1C1A2E', borderRadius: 999,
            padding: '0.75rem 2rem', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', boxShadow: '0 8px 24px rgba(184,164,216,0.3)',
          }}
        >
          Book for $99 <span style={{ textDecoration: 'line-through', opacity: 0.5, fontWeight: 400, marginLeft: '0.4rem' }}>$222</span> →
        </a>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
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
  const [screen, setScreen] = useState('chat') // 'chat' | 'email' | 'generating' | 'result'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const bottomRef = useRef(null)

  // Kick off first question on mount
  useEffect(() => {
    fetchNextQuestion([])
  }, [])

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
      const aiMessage = { role: 'assistant', content: data.message }
      setMessages(prev => [...prev, aiMessage])

      // Estimate progress: count user messages out of ~10
      const userCount = history.filter(m => m.role === 'user').length
      setProgress(Math.min(Math.round((userCount / 10) * 100), 95))

      if (data.done) {
        setTimeout(() => setScreen('email'), 600)
      }
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
    const userMessage = { role: 'user', content: trimmed }
    const updated = [...messages, userMessage]
    setMessages(updated)
    await fetchNextQuestion(updated)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setScreen('generating')

    try {
      // Generate result
      const resultRes = await fetch('/api/quiz-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })
      const resultData = await resultRes.json()

      // Save to Supabase + Kit
      await fetch('/api/quiz-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          conversation: messages,
          result: resultData.result,
        }),
      })

      setResult(resultData.result)
      setScreen('result')
    } catch (err) {
      console.error('result generation error:', err)
    }
  }

  if (screen === 'result' && result) {
    return (
      <div style={{ background: '#F8F6F2', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <ResultCard result={result} />
      </div>
    )
  }

  if (screen === 'generating') {
    return (
      <div style={{
        minHeight: '100vh', background: '#F8F6F2',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{ fontSize: '2rem' }}>✨</div>
        <p style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.1rem', fontWeight: 700, color: '#1C1A2E' }}>
          Building your personalized recommendation…
        </p>
        <p style={{ color: '#888', fontSize: '0.85rem' }}>This takes about 10 seconds.</p>
      </div>
    )
  }

  if (screen === 'email') {
    return (
      <div style={{
        minHeight: '100vh', background: '#F8F6F2',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem',
      }}>
        <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📬</div>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.5rem', fontWeight: 700, color: '#1C1A2E', marginBottom: '0.5rem' }}>
            Your results are ready.
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
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
                border: '1.5px solid #e0dcd6', fontSize: '0.95rem', background: 'white',
                boxSizing: 'border-box',
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
                border: '1.5px solid #e0dcd6', fontSize: '0.95rem', background: 'white',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#F5C842', color: '#1C1A2E', border: 'none', borderRadius: 999,
                padding: '0.85rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
              }}
            >
              Show me my results →
            </button>
          </form>
          <p style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '0.75rem' }}>No spam. We send your report and that's it.</p>
        </div>
      </div>
    )
  }

  // Main chat screen
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F8F6F2' }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: '#e8e4de', flexShrink: 0 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#F5C842', borderRadius: 999, transition: 'width 0.5s ease' }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <style>{`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
          }
        `}</style>
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid #e8e4de', background: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', maxWidth: 640, margin: '0 auto' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer… (Enter to send)"
            rows={1}
            style={{
              flex: 1, border: '1.5px solid #e0dcd6', borderRadius: 16,
              padding: '0.65rem 1rem', fontSize: '0.9rem', resize: 'none',
              fontFamily: 'inherit', outline: 'none', lineHeight: 1.5,
            }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            style={{
              background: input.trim() && !isTyping ? '#F5C842' : '#e8e4de',
              color: '#1C1A2E', border: 'none', borderRadius: 999,
              padding: '0.65rem 1.25rem', fontWeight: 700, fontSize: '0.9rem',
              cursor: input.trim() && !isTyping ? 'pointer' : 'default',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            Send →
          </button>
        </div>
      </div>
    </div>
  )
}
