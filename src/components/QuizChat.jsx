import { useState, useEffect, useRef } from 'react'

const BOOKING_URL = 'https://osilpistole.thrivecart.com/prophetic-strategy-session/'

const SUNRISE = '#F5C842'
const MORNING = '#B8A4D8'
const GROWTH = '#7DBE6A'
const INK = '#2C2C2A'
const PARCHMENT = '#FDFAF5'

const styles = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes bar-wave { from{transform:scaleY(0.25)} to{transform:scaleY(1)} }
  @keyframes ring-pulse { 0%{transform:scale(1);opacity:0.7} 80%{transform:scale(1.6);opacity:0} 100%{transform:scale(1.6);opacity:0} }
  @keyframes pulse-ring { 0%{transform:scale(0.9);opacity:0.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(1.3);opacity:0} }
  @keyframes mic-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(184,164,216,0.5)} 50%{box-shadow:0 0 0 8px rgba(184,164,216,0)} }
`

function AnimatedAvatar({ active = false }) {
  const bars = [
    { delay: '0s',    minScale: active ? 0.2 : 0.3, dur: active ? '0.5s' : '1.3s' },
    { delay: '0.12s', minScale: active ? 0.15 : 0.4, dur: active ? '0.65s' : '1.0s' },
    { delay: '0.06s', minScale: active ? 0.25 : 0.35, dur: active ? '0.55s' : '1.5s' },
    { delay: '0.18s', minScale: active ? 0.2 : 0.3, dur: active ? '0.7s' : '1.2s' },
  ]
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
      {active && (
        <div style={{
          position: 'absolute', inset: -5, borderRadius: '50%',
          border: `1.5px solid ${SUNRISE}`,
          animation: 'ring-pulse 1.4s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `linear-gradient(135deg, ${SUNRISE} 0%, ${MORNING} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
        boxShadow: active ? '0 4px 20px rgba(245,200,66,0.55)' : '0 2px 10px rgba(245,200,66,0.35)',
        transition: 'box-shadow 0.3s ease',
      }}>
        {bars.map((b, i) => (
          <div key={i} style={{
            width: 3, height: 22, borderRadius: 2,
            background: 'rgba(255,255,255,0.88)',
            transformOrigin: 'bottom center',
            animation: `bar-wave ${b.dur} ${b.delay} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', animation: 'fadeUp 0.3s ease-out' }}>
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
      animation: 'fadeUp 0.35s ease-out',
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

      {result.positioning && (
        <ResultSection accent="sunrise" label="Your Positioning Statement">
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: INK, fontStyle: 'italic' }}>{result.positioning}</p>
        </ResultSection>
      )}

      {result.advantages?.length > 0 && (
        <ResultSection accent="growth" label="Why You're the Right Person for This">
          {result.advantages.map((adv, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: i < result.advantages.length - 1 ? '0.6rem' : 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: GROWTH, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.55, color: INK, margin: 0 }}>{adv}</p>
            </div>
          ))}
        </ResultSection>
      )}

      {result.first_launch && (
        <ResultSection accent="morning" label="Your Minimum Viable First Launch">
          <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: INK }}>{result.first_launch}</p>
        </ResultSection>
      )}

      {result.pricing && (
        <ResultSection accent="growth" label="Your Income Math">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {[
              { label: 'Price per person', value: result.pricing.price_per_person },
              { label: 'Students per launch', value: result.pricing.students_per_launch },
              { label: 'Launches per year', value: result.pricing.launches_per_year },
              { label: 'Est. monthly income', value: result.pricing.monthly_income_estimate },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'white', borderRadius: 10, padding: '0.6rem 0.75rem' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(44,44,42,0.4)', margin: '0 0 0.2rem' }}>{label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: INK, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
          {result.pricing.math && (
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(44,44,42,0.65)', margin: 0 }}>{result.pricing.math}</p>
          )}
        </ResultSection>
      )}

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

      <div style={{
        background: 'white', border: '1px solid rgba(44,44,42,0.08)',
        borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem',
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(44,44,42,0.35)', marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>
          Free Tools to Go Deeper
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <a href="/spiritual-gifts" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.6rem 0.75rem', borderRadius: 10, background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.2)' }}>
            <span style={{ fontSize: '1.1rem' }}>✨</span>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: INK, margin: 0 }}>Spiritual Gifts Assessment</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(44,44,42,0.5)', margin: 0 }}>Discover the specific gifts God placed inside you — free, 5 minutes</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#8a6500', fontWeight: 600 }}>→</span>
          </a>
          <a href="/fivefold" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.6rem 0.75rem', borderRadius: 10, background: 'rgba(184,164,216,0.08)', border: '1px solid rgba(184,164,216,0.2)' }}>
            <span style={{ fontSize: '1.1rem' }}>👁️</span>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: INK, margin: 0 }}>5-Fold Ministry Assessment</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(44,44,42,0.5)', margin: 0 }}>Find which of the five callings God wired into you — free</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#6a4d8a', fontWeight: 600 }}>→</span>
          </a>
        </div>
      </div>

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
  const [isListeningVoice, setIsListeningVoice] = useState(false)
  const [screen, setScreen] = useState('chat')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => { fetchNextQuestion([]) }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const voiceSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    if (!recognitionRef.current) {
      const r = new SR()
      r.continuous = false
      r.interimResults = false
      r.lang = 'en-US'
      r.onresult = (e) => setInput(prev => (prev + ' ' + e.results[0][0].transcript).trim())
      r.onend = () => setIsListeningVoice(false)
      r.onerror = () => setIsListeningVoice(false)
      recognitionRef.current = r
    }
    setIsListeningVoice(true)
    recognitionRef.current.start()
  }

  function stopVoice() {
    recognitionRef.current?.stop()
    setIsListeningVoice(false)
  }

  async function fetchNextQuestion(history) {
    setIsTyping(true)
    try {
      const res = await fetch('/api/quiz-chat', {
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
      console.error('quiz-chat error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Hmm, something went wrong on my end — sorry about that! Please type your answer again and I'll pick right back up.",
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
          <AnimatedAvatar active={true} />
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
  const canSend = input.trim() && !isTyping

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: PARCHMENT }}>
      <style>{styles}</style>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(44,44,42,0.07)', flexShrink: 0 }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: `linear-gradient(90deg, ${SUNRISE}, ${MORNING}, ${GROWTH})`,
          borderRadius: 999, transition: 'width 0.6s ease',
        }} />
      </div>

      {/* Header */}
      <div style={{
        padding: '0.65rem 1.25rem', borderBottom: '1px solid rgba(44,44,42,0.08)',
        background: 'white', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AnimatedAvatar active={isTyping} />
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: INK, fontFamily: 'var(--font-heading)', margin: 0 }}>AI Build Quiz</p>
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
        flex: 1, overflowY: 'auto', padding: '1.5rem 1rem 1rem',
        display: 'flex', flexDirection: 'column',
        maxWidth: 640, margin: '0 auto', width: '100%',
      }}>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        {quizDone && (
          <div style={{ animation: 'fadeUp 0.5s ease-out', paddingTop: '0.5rem' }}>
            <button
              onClick={() => setScreen('email')}
              style={{
                width: '100%', background: SUNRISE, color: INK, border: 'none',
                borderRadius: 999, padding: '1rem 2rem', fontWeight: 700,
                fontSize: '1rem', cursor: 'pointer', fontFamily: 'var(--font-heading)',
                boxShadow: '0 8px 28px rgba(245,200,66,0.4)',
              }}
            >
              Get my results →
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area — hidden once quiz is complete */}
      {!quizDone && <div style={{
        padding: '0.85rem 1rem 1rem',
        borderTop: '1px solid rgba(44,44,42,0.09)',
        background: 'white',
        flexShrink: 0,
        boxShadow: '0 -4px 20px rgba(44,44,42,0.05)',
      }}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', maxWidth: 640, margin: '0 auto' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListeningVoice ? 'Listening…' : 'Type your answer…'}
            rows={1}
            style={{
              flex: 1,
              border: `2px solid ${input.trim() ? 'rgba(245,200,66,0.6)' : 'rgba(44,44,42,0.15)'}`,
              borderRadius: 16,
              padding: '0.75rem 1rem',
              fontSize: '0.95rem',
              resize: 'none',
              fontFamily: 'inherit',
              outline: 'none',
              lineHeight: 1.5,
              background: 'white',
              color: INK,
              boxShadow: input.trim() ? '0 0 0 3px rgba(245,200,66,0.12)' : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />

          {voiceSupported && (
            <button
              onClick={isListeningVoice ? stopVoice : startVoice}
              title={isListeningVoice ? 'Stop listening' : 'Speak your answer'}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
                background: isListeningVoice ? MORNING : 'rgba(184,164,216,0.15)',
                color: isListeningVoice ? 'white' : MORNING,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
                animation: isListeningVoice ? 'mic-pulse 1.2s ease-in-out infinite' : 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              aria-label={isListeningVoice ? 'Stop voice input' : 'Start voice input'}
            >
              🎙
            </button>
          )}

          <button
            onClick={handleSend}
            disabled={!canSend}
            style={{
              background: canSend ? SUNRISE : 'rgba(44,44,42,0.08)',
              color: INK, border: 'none', borderRadius: 999,
              padding: '0 1.25rem', height: 44, fontWeight: 700, fontSize: '0.9rem',
              cursor: canSend ? 'pointer' : 'default',
              transition: 'background 0.2s, box-shadow 0.2s', flexShrink: 0,
              boxShadow: canSend ? '0 4px 16px rgba(245,200,66,0.4)' : 'none',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Send →
          </button>
        </div>
        {voiceSupported && (
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(44,44,42,0.3)', margin: '0.5rem 0 0' }}>
            Press Enter to send · Tap 🎙 to speak your answer
          </p>
        )}
      </div>}
    </div>
  )
}
