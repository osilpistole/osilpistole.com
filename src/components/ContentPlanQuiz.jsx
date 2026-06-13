import { useState, useEffect, useRef } from 'react'

const SUNRISE = '#F5C842'
const MORNING = '#B8A4D8'
const GROWTH = '#7DBE6A'
const INK = '#2C2C2A'
const PARCHMENT = '#FDFAF5'

const styles = `
  @keyframes cp-fade-up { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cp-bar-wave { from{transform:scaleY(0.25)} to{transform:scaleY(1)} }
  @keyframes cp-ring-pulse { 0%{transform:scale(1);opacity:0.7} 80%{transform:scale(1.6);opacity:0} 100%{transform:scale(1.6);opacity:0} }
  @keyframes cp-pulse-ring { 0%{transform:scale(0.9);opacity:0.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(1.3);opacity:0} }
`

function AnimatedAvatar({ active = false }) {
  const bars = [
    { delay: '0s',    dur: active ? '0.5s'  : '1.3s' },
    { delay: '0.12s', dur: active ? '0.65s' : '1.0s' },
    { delay: '0.06s', dur: active ? '0.55s' : '1.5s' },
    { delay: '0.18s', dur: active ? '0.7s'  : '1.2s' },
  ]
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
      {active && (
        <div style={{
          position: 'absolute', inset: -5, borderRadius: '50%',
          border: `1.5px solid ${SUNRISE}`,
          animation: 'cp-ring-pulse 1.4s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
        boxShadow: active ? '0 4px 20px rgba(245,200,66,0.55)' : '0 2px 10px rgba(245,200,66,0.35)',
      }}>
        {bars.map((b, i) => (
          <div key={i} style={{
            width: 3, height: 22, borderRadius: 2,
            background: 'rgba(255,255,255,0.88)',
            transformOrigin: 'bottom center',
            animation: `cp-bar-wave ${b.dur} ${b.delay} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', animation: 'cp-fade-up 0.3s ease-out' }}>
      <AnimatedAvatar active={true} />
      <div style={{
        background: 'white', borderRadius: '0 16px 16px 16px', padding: '1rem 1.25rem',
        boxShadow: '0 2px 12px rgba(44,44,42,0.07)', border: '1px solid rgba(44,44,42,0.07)',
      }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(44,44,42,0.45)', margin: 0, fontStyle: 'italic' }}>Thinking…</p>
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
      animation: 'cp-fade-up 0.35s ease-out',
    }}>
      {isAI && <AnimatedAvatar active={false} />}
      <div style={{
        background: isAI ? 'white' : `rgba(245,200,66,0.14)`,
        color: INK,
        borderRadius: isAI ? '0 16px 16px 16px' : '16px 0 16px 16px',
        padding: '0.9rem 1.15rem',
        maxWidth: '78%',
        fontSize: '0.93rem',
        lineHeight: 1.7,
        boxShadow: isAI ? '0 2px 12px rgba(44,44,42,0.07)' : 'none',
        border: isAI ? '1px solid rgba(44,44,42,0.07)' : '1.5px solid rgba(245,200,66,0.4)',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  )
}

function PillarCard({ pillar, num }) {
  return (
    <div style={{
      background: 'white', border: '1px solid rgba(44,44,42,0.10)',
      borderRadius: 18, padding: '22px 24px', marginBottom: 14,
      boxShadow: '0 4px 18px rgba(44,44,42,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12 }}>
        <span
          style={{
            color: SUNRISE, fontSize: 32, fontWeight: 300, fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1,
          }}
        >0{num}</span>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: INK, lineHeight: 1.3 }}>
          {pillar.name}
        </h3>
      </div>
      <p style={{ margin: '0 0 14px', fontSize: '0.93rem', lineHeight: 1.65, color: INK }}>
        {pillar.description}
      </p>
      {pillar.example_post_idea && (
        <div style={{ background: PARCHMENT, borderRadius: 10, padding: '10px 14px' }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(44,44,42,0.45)', marginBottom: 4 }}>
            Example Post
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(44,44,42,0.7)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {pillar.example_post_idea}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ContentPlanQuiz() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [screen, setScreen] = useState('chat')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => { fetchNextQuestion([]) }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function fetchNextQuestion(history) {
    setIsTyping(true)
    try {
      const res = await fetch('/api/30days-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      const userCount = history.filter(m => m.role === 'user').length
      setProgress(Math.min(Math.round((userCount / 10) * 100), 95))
      if (data.done) { setProgress(100); setQuizDone(true) }
    } catch (err) {
      console.error('30days-quiz error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Something went sideways on my end — sorry about that. Send your answer again and I'll pick right back up.",
      }])
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
    setSubmitError(null)
    try {
      const resultRes = await fetch('/api/30days-pillars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })
      const resultData = await resultRes.json()
      if (!resultData.result) throw new Error('No result returned')
      setResult(resultData.result)

      // Fire and forget submit
      fetch('/api/30days-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          conversation: messages,
          result: resultData.result,
        }),
      }).catch(err => console.error('30days-submit error:', err))

      setScreen('result')
    } catch (err) {
      console.error('30days-pillars error:', err)
      setSubmitError("Something went wrong generating your results. Email osil@osilpistole.com and I'll send them manually.")
      setScreen('email')
    }
  }

  // -------- RESULT --------
  if (screen === 'result' && result) {
    return (
      <div style={{ background: PARCHMENT, minHeight: '100vh', padding: '2.5rem 1rem 3rem' }}>
        <style>{styles}</style>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', animation: 'cp-fade-up 0.5s ease-out' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', margin: '0 auto 1.25rem',
              background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', boxShadow: '0 6px 20px rgba(245,200,66,0.35)',
            }}>📝</div>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700,
              color: INK, marginBottom: '0.6rem',
            }}>
              {name}, here's your content foundation.
            </h1>
            <p style={{ color: 'rgba(44,44,42,0.55)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Your message, your audience, and three pillars to build content around.
            </p>
          </div>

          {/* Message */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '22px 24px', marginBottom: 14,
            borderLeft: `4px solid ${SUNRISE}`,
          }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8a6500', marginBottom: 10 }}>
              Your Core Message
            </p>
            <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.55, color: INK, fontStyle: 'italic', fontWeight: 500 }}>
              "{result.message}"
            </p>
          </div>

          {/* Audience */}
          <div style={{
            background: 'white', borderRadius: 16, padding: '22px 24px', marginBottom: 14,
            borderLeft: `4px solid ${GROWTH}`,
          }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#3d7028', marginBottom: 10 }}>
              Who You&apos;re Talking To
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, color: INK }}>
              {result.audience}
            </p>
          </div>

          {/* Voice */}
          {result.voice_signature && (
            <div style={{
              background: 'white', borderRadius: 16, padding: '22px 24px', marginBottom: 28,
              borderLeft: `4px solid ${MORNING}`,
            }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#5b4f7a', marginBottom: 10 }}>
                Your Voice
              </p>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, color: INK }}>
                {result.voice_signature}
              </p>
            </div>
          )}

          {/* Pillars */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '1.9rem', color: INK, marginBottom: 6,
            }}>
              Your three content pillars
            </h2>
            <p style={{ margin: '0 0 18px', fontSize: '0.85rem', color: 'rgba(44,44,42,0.55)', lineHeight: 1.55 }}>
              ~80% of your content should orbit one of these three themes.
            </p>
            {result.pillars?.map((p, i) => <PillarCard key={i} pillar={p} num={i + 1} />)}
          </div>

          {/* Phase 2 tease */}
          <div style={{
            background: 'linear-gradient(135deg, #fff, #fdfcf8)',
            border: '1.5px solid rgba(245,200,66,0.42)',
            borderRadius: 22, padding: '26px 28px', marginBottom: 24,
            boxShadow: '0 8px 28px rgba(245,200,66,0.10)',
          }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a6500', marginBottom: 8 }}>
              Coming Soon
            </p>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: INK, lineHeight: 1.3 }}>
              Want 30 days of content built around these pillars?
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'rgba(44,44,42,0.65)', lineHeight: 1.6 }}>
              A personalized 30-day plan with hooks, topics, formats (talking head / B-roll / carousel / graphic), filming notes, caption starters, and CTAs — for Instagram, Facebook, and TikTok. Built around YOUR voice, YOUR audience, YOUR pillars.
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', color: INK }}>
              <strong style={{ fontSize: '1.05rem' }}>Launch price: $47</strong>{' '}
              <span style={{ color: 'rgba(44,44,42,0.4)', textDecoration: 'line-through', fontSize: '0.9rem' }}>$97</span>
            </p>
            <p style={{ margin: '12px 0 0', fontSize: '0.82rem', color: 'rgba(44,44,42,0.55)', lineHeight: 1.5 }}>
              ✓ You&apos;re on the list. We&apos;ll email you the moment it goes live.
            </p>
          </div>

          {/* Strategy session */}
          <div style={{
            background: 'white', borderRadius: 18, padding: '24px',
            border: '1px solid rgba(44,44,42,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 6px', fontSize: '0.95rem', color: 'rgba(44,44,42,0.65)', lineHeight: 1.55 }}>
              Want help acting on this right now?
            </p>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 700, color: INK }}>
              Book a Strategy Session.
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: '0.85rem', color: 'rgba(44,44,42,0.55)', lineHeight: 1.55 }}>
              60 minutes. We map your offer, your audience, your first 30 days.
            </p>
            <a
              href="https://osilpistole.thrivecart.com/prophetic-strategy-session/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: SUNRISE, color: INK,
                textDecoration: 'none', borderRadius: 999,
                padding: '12px 26px', fontWeight: 700, fontSize: '0.9rem',
                boxShadow: '0 6px 18px rgba(245,200,66,0.32)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Book for $99 →
            </a>
          </div>
        </div>
      </div>
    )
  }

  // -------- GENERATING --------
  if (screen === 'generating') {
    return (
      <div style={{
        minHeight: '100vh', background: PARCHMENT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1.25rem',
      }}>
        <style>{styles}</style>
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <AnimatedAvatar active={true} />
          <div style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: `2px solid ${SUNRISE}`,
            animation: 'cp-pulse-ring 1.5s ease-out infinite',
          }} />
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: INK }}>
          Distilling your message and pillars…
        </p>
        <p style={{ color: 'rgba(44,44,42,0.4)', fontSize: '0.85rem' }}>This takes about 10 seconds.</p>
      </div>
    )
  }

  // -------- EMAIL GATE --------
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
            }}>📝</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
              Your content foundation is ready.
            </h2>
            <p style={{ color: 'rgba(44,44,42,0.5)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Where should we send your message, audience, and 3 pillars?
            </p>

            {submitError && (
              <div style={{
                background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.25)',
                color: 'rgba(170,50,50,1)', borderRadius: 12, padding: '0.7rem 0.9rem',
                fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'left',
              }}>{submitError}</div>
            )}

            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text" placeholder="First name" value={name}
                onChange={e => setName(e.target.value)} required
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 12,
                  border: '1.5px solid rgba(44,44,42,0.12)', fontSize: '0.95rem',
                  background: PARCHMENT, boxSizing: 'border-box', outline: 'none',
                  color: INK, fontFamily: 'inherit',
                }}
              />
              <input
                type="email" placeholder="Email address" value={email}
                onChange={e => setEmail(e.target.value)} required
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
                  fontFamily: 'var(--font-heading)', marginTop: '0.25rem',
                }}
              >
                Show me my content foundation →
              </button>
              <p style={{ margin: '0.5rem 0 0', fontSize: 11, color: 'rgba(44,44,42,0.4)' }}>
                Free. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // -------- CHAT --------
  return (
    <div style={{
      minHeight: '100vh', background: PARCHMENT,
      display: 'flex', flexDirection: 'column',
    }}>
      <style>{styles}</style>

      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(253,250,245,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(44,44,42,0.06)',
        padding: '0.7rem 1rem',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.78rem', fontWeight: 700,
            color: 'rgba(44,44,42,0.6)',
            letterSpacing: '0.04em',
          }}>30 Days Done · Free Quiz</span>
          <div style={{
            flex: 1, height: 4, borderRadius: 999,
            background: 'rgba(44,44,42,0.08)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: `linear-gradient(90deg, ${SUNRISE}, ${MORNING})`,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(44,44,42,0.4)', minWidth: 36, textAlign: 'right' }}>
            {progress}%
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem 1rem' }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {messages.map((m, i) => <ChatBubble key={i} role={m.role} content={m.content} />)}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div style={{
        position: 'sticky', bottom: 0,
        background: 'rgba(253,250,245,0.96)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(44,44,42,0.07)',
        padding: '0.85rem 1rem 1rem',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {quizDone ? (
            <button
              onClick={() => setScreen('email')}
              style={{
                width: '100%', background: SUNRISE, color: INK,
                border: 'none', borderRadius: 999, padding: '0.95rem 2rem',
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              See my content foundation →
            </button>
          ) : (
            <div style={{
              display: 'flex', gap: '0.5rem', alignItems: 'flex-end',
              background: 'white', borderRadius: 18,
              border: '1.5px solid rgba(44,44,42,0.12)',
              padding: '0.45rem 0.55rem 0.45rem 0.85rem',
              boxShadow: '0 4px 16px rgba(44,44,42,0.06)',
            }}>
              <textarea
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="Type your answer…"
                rows={1} disabled={isTyping}
                style={{
                  flex: 1, resize: 'none', border: 'none', outline: 'none',
                  background: 'transparent', fontSize: '0.95rem',
                  fontFamily: 'inherit', color: INK,
                  padding: '0.4rem 0', maxHeight: 120, lineHeight: 1.4,
                }}
              />
              <button
                onClick={handleSend} disabled={!input.trim() || isTyping}
                style={{
                  background: input.trim() && !isTyping ? SUNRISE : 'rgba(44,44,42,0.10)',
                  color: input.trim() && !isTyping ? INK : 'rgba(44,44,42,0.4)',
                  border: 'none', borderRadius: 999,
                  width: 40, height: 40, flexShrink: 0,
                  cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
