import { useState } from 'react'

const GIFTS = [
  { id: 'teaching', name: 'Teaching', icon: '📖', description: 'You have been given the rare ability to make God\'s Word come alive. You were made to help others understand, and your clarity is a gift the church desperately needs.', howToUse: 'Lead a Bible study, create devotional content, mentor others through the Word.' },
  { id: 'leadership', name: 'Leadership', icon: '🧭', description: 'God has placed within you a capacity to see where He is calling His people and to lead them there. You carry vision and the ability to mobilize others.', howToUse: 'Step into team leadership, launch a ministry, or coach others toward their calling.' },
  { id: 'encouragement', name: 'Encouragement', icon: '🌱', description: 'You have a supernatural ability to see potential in people they cannot yet see in themselves. You are God\'s instrument for calling others forward into their destiny.', howToUse: 'Mentor, coach, speak into people\'s lives one-on-one, create content that builds others up.' },
  { id: 'mercy', name: 'Mercy', icon: '🤲', description: 'Your heart breaks for what breaks God\'s heart. You carry an unusual capacity to sit with people in their pain and be the hands and feet of Jesus in their darkest moments.', howToUse: 'Pastoral care, counseling, crisis support, serving the overlooked and hurting.' },
  { id: 'faith', name: 'Faith', icon: '⚡', description: 'You operate in a realm of trust that defies what can be seen. God uses you to demonstrate what becomes possible when someone truly believes.', howToUse: 'Intercession, pioneering new ventures, believing God for others when they cannot.' },
  { id: 'giving', name: 'Giving', icon: '🎁', description: 'You are a steward and a conduit. God trusts you with resources because He knows you hold them loosely and release them for His kingdom purposes.', howToUse: 'Fund ministry, give generously and strategically, resource God\'s vision in others.' },
  { id: 'service', name: 'Service', icon: '🛠', description: 'You are the engine behind so much that gets done for God\'s kingdom. Your willingness to serve without recognition makes the work of others possible.', howToUse: 'Support teams behind the scenes, meet practical needs, keep ministry running smoothly.' },
  { id: 'wisdom', name: 'Wisdom', icon: '💡', description: 'You carry the mind of God for complex situations. When others are confused, you see the path forward — and that is not coincidence, it is calling.', howToUse: 'Advise leaders, speak into decisions, offer counsel that saves people from costly mistakes.' },
  { id: 'prophecy', name: 'Prophecy', icon: '🔥', description: 'You carry a holy burden for truth. God has given you a voice to speak what others need to hear, and the courage to say it even when it costs you.', howToUse: 'Preach, call communities back to God\'s truth, speak boldly into situations that need it.' },
]

const QUESTIONS = [
  { giftId: 'teaching', text: 'I love studying Scripture deeply and understanding how it all connects.' },
  { giftId: 'teaching', text: 'People tell me I explain complex ideas in a way that is easy to understand.' },
  { giftId: 'teaching', text: 'I feel most alive when I am helping others understand God\'s Word.' },
  { giftId: 'teaching', text: 'I notice when teaching is inaccurate and feel a pull to gently correct it.' },
  { giftId: 'leadership', text: 'People naturally look to me to set direction and make decisions.' },
  { giftId: 'leadership', text: 'I find it easy to see where a group needs to go and how to get there.' },
  { giftId: 'leadership', text: 'I feel energized, not drained, when I am responsible for leading others.' },
  { giftId: 'leadership', text: 'I can motivate people to work together toward a common God-given goal.' },
  { giftId: 'encouragement', text: 'I instinctively know what to say to lift someone out of discouragement.' },
  { giftId: 'encouragement', text: 'People often come to me when they need someone to believe in them.' },
  { giftId: 'encouragement', text: 'I feel a strong pull to help others see their God-given potential.' },
  { giftId: 'encouragement', text: 'I have a gift for helping people take the next step when they feel stuck.' },
  { giftId: 'mercy', text: 'I feel deep compassion for people who are hurting, even strangers.' },
  { giftId: 'mercy', text: 'I am drawn to serve those who are overlooked, broken, or in pain.' },
  { giftId: 'mercy', text: 'I can sit with someone in their suffering without needing to fix it.' },
  { giftId: 'mercy', text: 'I notice when someone is emotionally struggling even if they are hiding it.' },
  { giftId: 'faith', text: 'I can trust God\'s promises even when circumstances look impossible.' },
  { giftId: 'faith', text: 'I feel a strong inner confidence that God will come through, even without visible evidence.' },
  { giftId: 'faith', text: 'Others sometimes feel I take risks of faith that seem unreasonable.' },
  { giftId: 'faith', text: 'I believe God can do something specific in a situation when others have given up hope.' },
  { giftId: 'giving', text: 'I feel genuine joy, not obligation, when I give financially to God\'s work.' },
  { giftId: 'giving', text: 'I find myself looking for opportunities to meet others\' financial needs.' },
  { giftId: 'giving', text: 'I manage my resources with an awareness that they are meant for God\'s purposes.' },
  { giftId: 'giving', text: 'I often feel prompted to give specific amounts to specific people or causes.' },
  { giftId: 'service', text: 'I find real satisfaction in working behind the scenes without recognition.' },
  { giftId: 'service', text: 'I notice practical needs others overlook and feel compelled to meet them.' },
  { giftId: 'service', text: 'Serving others with practical tasks feels like an act of worship to me.' },
  { giftId: 'service', text: 'I am energized by supporting the work of others rather than being out front.' },
  { giftId: 'wisdom', text: 'People seek me out for guidance on difficult decisions.' },
  { giftId: 'wisdom', text: 'I can see the wise path forward in complex situations that confuse others.' },
  { giftId: 'wisdom', text: 'I know how to apply spiritual truth to real, practical circumstances.' },
  { giftId: 'wisdom', text: 'Others have told me my insight helped them make a decision they did not regret.' },
  { giftId: 'prophecy', text: 'I often sense what God is saying about a person or situation before anyone else has spoken about it.' },
  { giftId: 'prophecy', text: 'People have told me that something I said spoke directly to what they were privately going through — in a way I could not have known naturally.' },
  { giftId: 'prophecy', text: 'I see things in people — potential, hidden struggles, or a specific calling — that they have not yet recognized in themselves.' },
  { giftId: 'prophecy', text: 'I receive impressions, pictures, scriptures, or words during prayer that I feel compelled to share with someone.' },
]

const LABELS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
const Q_PER_PAGE = 4
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / Q_PER_PAGE)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SpiritualGiftsQuiz({ skipIntro = false }) {
  const [screen, setScreen] = useState(skipIntro ? 'quiz' : 'intro')
  const [page, setPage] = useState(0)
  const [shuffledQuestions] = useState(() => shuffle(QUESTIONS))
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const pageQuestions = shuffledQuestions.slice(page * Q_PER_PAGE, (page + 1) * Q_PER_PAGE)
  const pageAnswered = pageQuestions.every((_, i) => answers[page * Q_PER_PAGE + i] !== undefined)
  const totalAnswered = Object.keys(answers).length
  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100)

  function setAnswer(qIndex, value) {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }))
  }

  function nextPage() {
    if (page < TOTAL_PAGES - 1) {
      setPage((p) => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setScreen('email')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage((p) => p - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function computeScores() {
    const scores = {}
    GIFTS.forEach((g) => { scores[g.id] = 0 })
    shuffledQuestions.forEach((q, i) => {
      scores[q.giftId] = (scores[q.giftId] ?? 0) + (answers[i] ?? 0)
    })
    return scores
  }

  async function submitResults() {
    if (!name.trim() || !email.trim()) return
    setSubmitting(true)
    setError(null)

    const scores = computeScores()
    const sorted = GIFTS.slice().sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
    const top3 = sorted.slice(0, 3)

    try {
      const res = await fetch('/api/spiritual-gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), topGifts: top3.map((g) => g.id), scores }),
      })
      if (!res.ok) throw new Error('Something went wrong. Please try again.')
      setResults(top3)
      setScreen('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e.message ?? 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('quiz')} />
  if (screen === 'quiz') return <QuizScreen page={page} totalPages={TOTAL_PAGES} pageQuestions={pageQuestions} answers={answers} progress={progress} pageAnswered={pageAnswered} onAnswer={setAnswer} onNext={nextPage} onPrev={prevPage} />
  if (screen === 'email') return <EmailScreen name={name} email={email} submitting={submitting} error={error} onName={setName} onEmail={setEmail} onSubmit={submitResults} />
  return <ResultsScreen name={name} results={results} />
}

function IntroScreen({ onStart }) {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
          <div style={eyebrowStyle}>Free Assessment</div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: '#2C2C2A', lineHeight: 1.2, margin: '12px 0 16px' }}>
            Discover Your<br />Spiritual Gifts
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(44,44,42,0.6)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
            God placed specific gifts inside you — not by accident, but by design. This free 36-question assessment will reveal your top gifts and show you how to walk in them.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[{ icon: '⏱', label: '5 minutes' }, { icon: '📋', label: '36 questions' }, { icon: '🎁', label: 'Free — always' }].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#2C2C2A', fontFamily: "'Sora', sans-serif" }}>{item.label}</div>
            </div>
          ))}
        </div>
        <button onClick={onStart} style={primaryBtn}>Begin the Assessment →</button>
        <p style={{ marginTop: 16, textAlign: 'center', fontSize: 12, color: 'rgba(44,44,42,0.4)', fontFamily: 'Inter, sans-serif' }}>
          For each statement, choose how often it describes you — be honest, not aspirational.
        </p>
      </div>
    </div>
  )
}

function QuizScreen({ page, totalPages, pageQuestions, answers, progress, pageAnswered, onAnswer, onNext, onPrev }) {
  const isLast = page === totalPages - 1
  const firstQ = page * Q_PER_PAGE + 1
  const lastQ = Math.min((page + 1) * Q_PER_PAGE, QUESTIONS.length)

  return (
    <div style={pageStyle}>
      <div style={{ ...cardStyle, maxWidth: 640 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(44,44,42,0.45)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Questions {firstQ}–{lastQ} of {QUESTIONS.length}
            </span>
            <span style={{ fontSize: 12, color: '#d4a800', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{progress}% complete</span>
          </div>
          <div style={{ height: 4, background: 'rgba(44,44,42,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#F5C842', borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          {pageQuestions.map((q, i) => {
            const qIndex = page * Q_PER_PAGE + i
            const val = answers[qIndex]
            return (
              <div key={qIndex}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A', lineHeight: 1.6, marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: '#F5C842', fontSize: 11, fontWeight: 700, marginRight: 8, verticalAlign: 'middle', flexShrink: 0 }}>
                    {qIndex + 1}
                  </span>
                  {q.text}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {LABELS.map((label, score) => {
                    const selected = val === score + 1
                    return (
                      <button key={label} onClick={() => onAnswer(qIndex, score + 1)} style={{ flex: 1, padding: '8px 4px', borderRadius: 8, border: selected ? '2px solid #F5C842' : '1.5px solid rgba(44,44,42,0.12)', background: selected ? '#F5C842' : 'white', cursor: 'pointer', transition: 'all 0.12s', fontSize: 11, fontWeight: selected ? 700 : 500, color: selected ? '#2C2C2A' : 'rgba(44,44,42,0.55)', fontFamily: "'Sora', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {page > 0 && (
            <button onClick={onPrev} style={{ ...secondaryBtn, flex: '0 0 auto' }}>← Back</button>
          )}
          <button onClick={onNext} disabled={!pageAnswered} style={{ ...primaryBtn, flex: 1, opacity: pageAnswered ? 1 : 0.4, cursor: pageAnswered ? 'pointer' : 'not-allowed' }}>
            {isLast ? 'See my results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function EmailScreen({ name, email, submitting, error, onName, onEmail, onSubmit }) {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#2C2C2A', margin: '0 0 12px' }}>
            You finished the assessment!
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.6)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
            Enter your name and email to see your top spiritual gifts. I&apos;ll also send you a copy so you can refer back to it.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>First name</label>
            <input type="text" placeholder="Your first name" value={name} onChange={(e) => onName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => onEmail(e.target.value)} style={inputStyle} />
          </div>
        </div>
        {error && <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
        <button onClick={onSubmit} disabled={submitting || !name.trim() || !email.trim()} style={{ ...primaryBtn, opacity: (submitting || !name.trim() || !email.trim()) ? 0.5 : 1, cursor: (submitting || !name.trim() || !email.trim()) ? 'not-allowed' : 'pointer' }}>
          {submitting ? 'Calculating your gifts…' : 'Reveal my spiritual gifts →'}
        </button>
        <p style={{ marginTop: 14, textAlign: 'center', fontSize: 11, color: 'rgba(44,44,42,0.35)', fontFamily: 'Inter, sans-serif' }}>
          No spam, ever. Unsubscribe any time.
        </p>
      </div>
    </div>
  )
}

function ResultsScreen({ name, results }) {
  const [primary, second, third] = results
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 640, width: '100%', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌟</div>
          <div style={eyebrowStyle}>Your Results</div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 800, color: '#2C2C2A', margin: '12px 0 14px' }}>
            {name}, your primary gift is<br />
            <span style={{ color: '#d4a800' }}>{primary?.name}</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.55)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
            Here are your top three spiritual gifts — the areas where God has uniquely wired you to serve.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {results.map((gift, i) => (
            <div key={gift.id} style={{ background: i === 0 ? '#2C2C2A' : 'white', border: i === 0 ? '2px solid #F5C842' : '1.5px solid rgba(44,44,42,0.1)', borderRadius: 16, padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#F5C842' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{gift.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 0 ? '#F5C842' : '#d4a800', fontFamily: "'Sora', sans-serif" }}>#{i + 1} Gift</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: i === 0 ? 'white' : '#2C2C2A', fontFamily: "'Sora', sans-serif" }}>{gift.name}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: i === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(44,44,42,0.65)', lineHeight: 1.7, margin: '0 0 12px', fontFamily: 'Inter, sans-serif' }}>{gift.description}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? 'rgba(245,200,66,0.8)' : '#d4a800', fontFamily: "'Sora', sans-serif" }}>
                How to walk in it: <span style={{ fontWeight: 400, color: i === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(44,44,42,0.55)' }}>{gift.howToUse}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4a800', fontFamily: "'Sora', sans-serif", marginBottom: 10 }}>Ready to go deeper?</div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: '#2C2C2A', margin: '0 0 10px' }}>Awaken &amp; Align — 10-Session Meditation Series</h3>
          <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.6)', lineHeight: 1.7, margin: '0 auto 20px', maxWidth: 380, fontFamily: 'Inter, sans-serif' }}>
            Now that you know your gifts, learn to walk in them fully. Awaken &amp; Align is a guided meditation journey designed to help you hear God, release fear, and live aligned with your calling.
          </p>
          <a href="/programs/awaken-and-align" style={{ ...primaryBtn, display: 'inline-block', textDecoration: 'none', width: 'auto', padding: '14px 32px' }}>
            Get the program →
          </a>
        </div>
      </div>
    </div>
  )
}

const pageStyle = { minHeight: '100vh', background: '#F7F4EE', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 20px 80px' }
const cardStyle = { width: '100%', maxWidth: 520, background: 'white', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 40px rgba(44,44,42,0.08)' }
const eyebrowStyle = { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d4a800', fontFamily: "'Sora', sans-serif" }
const primaryBtn = { display: 'block', width: '100%', padding: '14px 24px', background: '#F5C842', border: 'none', borderRadius: 10, fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#2C2C2A', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }
const secondaryBtn = { padding: '14px 20px', background: 'white', border: '1.5px solid rgba(44,44,42,0.15)', borderRadius: 10, fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#2C2C2A', cursor: 'pointer' }
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(44,44,42,0.6)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.04em', marginBottom: 6 }
const inputStyle = { width: '100%', padding: '12px 14px', border: '1.5px solid rgba(44,44,42,0.12)', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#2C2C2A', background: 'white', outline: 'none', boxSizing: 'border-box' }
