import { useState, useEffect, useRef } from 'react'

const BOOKING_URL = 'https://osilpistole.thrivecart.com/prophetic-strategy-session/'

const SUNRISE = '#F5C842'
const MORNING = '#B8A4D8'
const GROWTH = '#7DBE6A'
const INK = '#2C2C2A'
const PARCHMENT = '#FDFAF5'

const styles = `
  @keyframes cq-fade-up { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cq-bar-wave { from{transform:scaleY(0.25)} to{transform:scaleY(1)} }
  @keyframes cq-ring-pulse { 0%{transform:scale(1);opacity:0.7} 80%{transform:scale(1.6);opacity:0} 100%{transform:scale(1.6);opacity:0} }
  @keyframes cq-pulse-ring { 0%{transform:scale(0.9);opacity:0.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(1.3);opacity:0} }
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
          animation: 'cq-ring-pulse 1.4s ease-out infinite',
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
            animation: `cq-bar-wave ${b.dur} ${b.delay} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', animation: 'cq-fade-up 0.3s ease-out' }}>
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
      animation: 'cq-fade-up 0.35s ease-out',
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

function MissionCard({ option, selected, onSelect }) {
  const isPlain = option.voice === 'plain'
  const isPunchy = option.voice === 'punchy'
  const isCalling = option.voice === 'calling'
  const accent = isPlain ? SUNRISE : isPunchy ? GROWTH : MORNING
  const accentText = isPlain ? '#8a6500' : isPunchy ? '#3d7028' : '#5b4f7a'
  return (
    <button
      type="button"
      onClick={() => onSelect(option.voice)}
      style={{
        width: '100%', textAlign: 'left',
        background: selected ? 'white' : '#fdfcf8',
        border: selected ? `2px solid ${accent}` : '1.5px solid rgba(44,44,42,0.10)',
        borderRadius: 18,
        padding: '20px 22px',
        marginBottom: 14,
        cursor: 'pointer',
        boxShadow: selected ? `0 8px 28px ${accent}33` : '0 2px 10px rgba(44,44,42,0.05)',
        transition: 'all 0.2s ease',
        position: 'relative', overflow: 'hidden',
        fontFamily: 'inherit',
        color: INK,
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'white' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = '#fdfcf8' }}
    >
      {selected && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}88, ${accent})`,
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em',
          color: accentText,
        }}>{option.label}</span>
        {selected && (
          <div style={{
            width: 22, height: 22, borderRadius: 999, background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 800,
          }}>✓</div>
        )}
      </div>
      <p style={{
        margin: 0, fontSize: '1.05rem', lineHeight: 1.55, color: INK,
        fontStyle: 'italic', fontWeight: 500,
      }}>
        "{option.statement}"
      </p>
    </button>
  )
}

export default function CallingQuiz() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [screen, setScreen] = useState('chat')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [chosenVoice, setChosenVoice] = useState(null)
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
      const res = await fetch('/api/calling-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      const userCount = history.filter(m => m.role === 'user').length
      setProgress(Math.min(Math.round((userCount / 11) * 100), 95))
      if (data.done) { setProgress(100); setQuizDone(true) }
    } catch (err) {
      console.error('calling-quiz error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Hmm, something went sideways on my end — sorry about that. Send your answer again and I'll pick right back up.",
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
      const resultRes = await fetch('/api/calling-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })
      const resultData = await resultRes.json()
      if (!resultData.result) throw new Error('No result returned')
      setResult(resultData.result)
      setScreen('options')
    } catch (err) {
      console.error('calling-result error:', err)
      setSubmitError("Something went wrong generating your results. Send me an email at osil@osilpistole.com and I'll send them manually.")
      setScreen('email')
    }
  }

  async function handleOptionConfirm() {
    if (!chosenVoice || !result) return
    setScreen('saving')
    try {
      await fetch('/api/calling-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          conversation: messages,
          result,
          chosen: chosenVoice,
        }),
      })
      setScreen('done')
    } catch (err) {
      console.error('calling-submit error:', err)
      setScreen('done') // continue anyway — result is on screen
    }
  }

  // -------- RESULT: options picker --------
  if (screen === 'options' && result) {
    return (
      <div style={{ background: PARCHMENT, minHeight: '100vh', padding: '2.5rem 1rem 3rem' }}>
        <style>{styles}</style>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', animation: 'cq-fade-up 0.5s ease-out' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', margin: '0 auto 1.25rem',
              background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', boxShadow: '0 6px 20px rgba(245,200,66,0.35)',
            }}>🎯</div>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700,
              color: INK, marginBottom: '0.6rem',
            }}>
              {name}, here are your three.
            </h1>
            <p style={{ color: 'rgba(44,44,42,0.55)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
              Same mission, three voices. Pick the one that sounds most like you.
            </p>
          </div>

          {/* Three components — small grid */}
          <div style={{
            background: 'white', border: '1px solid rgba(44,44,42,0.08)',
            borderRadius: 16, padding: '16px 18px', marginBottom: '1.75rem',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          }}>
            {[['Who', result.who], ['What', result.what], ['Result', result.result]].map(([label, val]) => (
              <div key={label}>
                <p style={{
                  margin: 0, fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.16em', color: 'rgba(44,44,42,0.45)', marginBottom: 4,
                }}>{label}</p>
                <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.45, color: INK }}>{val}</p>
              </div>
            ))}
          </div>

          {/* 3 option cards */}
          <div>
            {result.options?.map(opt => (
              <MissionCard
                key={opt.voice}
                option={opt}
                selected={chosenVoice === opt.voice}
                onSelect={setChosenVoice}
              />
            ))}
          </div>

          {/* Confirm button */}
          <button
            onClick={handleOptionConfirm}
            disabled={!chosenVoice}
            style={{
              width: '100%', marginTop: '1.5rem',
              background: chosenVoice ? SUNRISE : 'rgba(44,44,42,0.10)',
              color: chosenVoice ? INK : 'rgba(44,44,42,0.4)',
              border: 'none', borderRadius: 999, padding: '0.95rem 2rem',
              fontWeight: 700, fontSize: '1rem', cursor: chosenVoice ? 'pointer' : 'not-allowed',
              boxShadow: chosenVoice ? '0 8px 24px rgba(245,200,66,0.35)' : 'none',
              fontFamily: 'var(--font-heading)',
              transition: 'all 0.2s ease',
            }}
          >
            {chosenVoice ? 'This is the one →' : 'Pick a mission to continue'}
          </button>
        </div>
      </div>
    )
  }

  // -------- DONE: confirmation + CTAs --------
  if (screen === 'done' && result) {
    const chosen = result.options?.find(o => o.voice === chosenVoice) || result.options?.[0]
    return (
      <div style={{ background: PARCHMENT, minHeight: '100vh', padding: '2.5rem 1rem 3rem' }}>
        <style>{styles}</style>
        <div style={{ maxWidth: 600, margin: '0 auto', animation: 'cq-fade-up 0.5s ease-out' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1.25rem',
              background: `linear-gradient(135deg, ${GROWTH} 0%, ${SUNRISE} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', boxShadow: '0 6px 20px rgba(125,190,106,0.35)',
            }}>✓</div>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700,
              color: INK, marginBottom: '0.6rem',
            }}>
              That's it. Save it somewhere you'll see it.
            </h1>
            <p style={{ color: 'rgba(44,44,42,0.55)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              The full version is in your inbox — including the other two voices, in case you want them later.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fff, #fdfcf8)',
            border: '1px solid rgba(245,200,66,0.35)',
            borderRadius: 18, padding: '24px 26px', marginBottom: '2rem',
            boxShadow: '0 4px 24px rgba(44,44,42,0.06)',
          }}>
            <p style={{
              margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.18em', color: '#8a6500', marginBottom: 12,
            }}>Your mission · {chosen.label}</p>
            <p style={{
              margin: 0, fontSize: '1.2rem', lineHeight: 1.5, color: INK,
              fontStyle: 'italic', fontWeight: 500,
            }}>"{chosen.statement}"</p>
          </div>

          {result.next_step && (
            <div style={{
              background: 'white', border: '1px solid rgba(44,44,42,0.08)',
              borderRadius: 16, padding: '20px 22px', marginBottom: '2rem',
            }}>
              <p style={{
                margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '0.18em', color: '#3d7028', marginBottom: 10,
              }}>One Step This Week</p>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, color: INK }}>
                {result.next_step}
              </p>
            </div>
          )}

          {/* Primary CTA */}
          <div style={{
            background: 'white', borderRadius: 18, padding: '24px',
            border: '1px solid rgba(44,44,42,0.08)',
            textAlign: 'center', marginBottom: '1.5rem',
          }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 700, color: INK }}>
              You have the words. Now build the path.
            </h3>
            <p style={{
              margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'rgba(44,44,42,0.55)',
              lineHeight: 1.6,
            }}>
              Book a 60-minute strategy session and we'll turn this mission into a real next step.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: SUNRISE, color: INK,
                textDecoration: 'none', borderRadius: 999,
                padding: '13px 30px', fontWeight: 700, fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(245,200,66,0.35)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Book a Strategy Session — $99 →
            </a>
            <p style={{ margin: '12px 0 0', fontSize: 11, color: 'rgba(44,44,42,0.4)' }}>
              Cost credited if you decide to work with Osil after.
            </p>
          </div>

          {/* Cross-sells */}
          <div>
            <p style={{
              margin: '0 0 12px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'rgba(44,44,42,0.5)', textAlign: 'center',
            }}>Other free assessments worth your time</p>
            {[
              { href: '/spiritual-gifts', label: 'Spiritual Gifts Assessment' },
              { href: '/fivefold',        label: '5-Fold Ministry Assessment' },
              { href: '/quiz/start',      label: 'AI Build Quiz — What should you build first?' },
            ].map(link => (
              <a key={link.href} href={link.href} style={{
                display: 'block',
                background: 'white', border: '1px solid rgba(44,44,42,0.08)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 8,
                color: INK, textDecoration: 'none', fontSize: '0.9rem',
              }}>
                → {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // -------- GENERATING --------
  if (screen === 'generating' || screen === 'saving') {
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
            animation: 'cq-pulse-ring 1.5s ease-out infinite',
          }} />
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: INK }}>
          {screen === 'generating' ? 'Putting your three options into words…' : 'Saving your mission…'}
        </p>
        <p style={{ color: 'rgba(44,44,42,0.4)', fontSize: '0.85rem' }}>
          {screen === 'generating' ? 'This takes about 10 seconds.' : 'Almost done.'}
        </p>
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
            }}>🎯</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: INK, marginBottom: '0.5rem' }}>
              Your three options are ready.
            </h2>
            <p style={{ color: 'rgba(44,44,42,0.5)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Where should we send your personalized mission statement?
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
                  fontFamily: 'var(--font-heading)', marginTop: '0.25rem',
                }}
              >
                Show me my three options →
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

      {/* Top progress bar */}
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
          }}>The Calling Quiz</span>
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

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '1.5rem 1rem 1rem',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {messages.map((m, i) => <ChatBubble key={i} role={m.role} content={m.content} />)}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer */}
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
              Get my three mission options →
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
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer…"
                rows={1}
                disabled={isTyping}
                style={{
                  flex: 1, resize: 'none', border: 'none', outline: 'none',
                  background: 'transparent', fontSize: '0.95rem',
                  fontFamily: 'inherit', color: INK,
                  padding: '0.4rem 0', maxHeight: 120, lineHeight: 1.4,
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
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
