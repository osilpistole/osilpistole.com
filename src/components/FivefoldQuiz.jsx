import { useState } from 'react'

const ROLES = [
  { id: 'apostle', name: 'Apostle', icon: '🌍', color: '#F5C842', tagline: 'The Pioneer', description: 'You were made to go first. Apostles break new ground — spiritually, geographically, and culturally. You don\'t just build ministries; you build the foundations that others build on. You\'re most alive when you\'re sent into something that doesn\'t exist yet.', howToUse: 'Church planting, mission work, launching new ministries or movements, building teams that pioneer where the gospel hasn\'t been.' },
  { id: 'prophet', name: 'Prophet', icon: '👁️', color: '#B8A4D8', tagline: 'The Voice', description: 'You carry what God is saying right now. Prophets aren\'t just foretellers — you\'re forthtellers. You see what others miss, feel what others dismiss, and carry an urgency to speak even when it costs you. The church needs your voice. The world needs your courage.', howToUse: 'Speaking words of knowledge, preaching with prophetic weight, calling communities back to God\'s heart, speaking truth into individual lives.' },
  { id: 'evangelist', name: 'Evangelist', icon: '⚡', color: '#F5A842', tagline: 'The Flame', description: 'You burn for the lost. Evangelists can\'t walk into a room without thinking about who doesn\'t know Jesus. The gospel isn\'t just something you believe — it\'s something you can\'t stop sharing. People encounter God around you because you make introduction effortless.', howToUse: 'Street evangelism, outreach campaigns, training others to share their faith, media ministry, any context where the lost are present.' },
  { id: 'pastor', name: 'Pastor', icon: '🕊️', color: '#7DBE6A', tagline: 'The Shepherd', description: 'You carry people. Pastors feel a weight of responsibility for the spiritual health of those in their care — not just on Sunday, but in the middle of the week when things fall apart. You don\'t move on quickly from people. You stay, and staying is your superpower.', howToUse: 'Leading a congregation, counseling, spiritual direction, small group leadership, walking alongside people through long and difficult seasons.' },
  { id: 'teacher', name: 'Teacher', icon: '📜', color: '#A8C4E0', tagline: 'The Root', description: 'You build people from the inside out. Teachers anchor the church in truth. You don\'t just explain Scripture — you build frameworks that give people roots deep enough to withstand anything. Your clarity is a gift, and the precision you bring to God\'s Word is what keeps the body grounded.', howToUse: 'Bible teaching, theological education, discipleship curriculum, writing, podcasting, mentoring others in the Word.' },
]

const QUESTIONS = [
  { roleId: 'apostle', text: 'When I see a gap in my community or church, I\'m usually already thinking about what it would take to build something that fills it.' },
  { roleId: 'apostle', text: 'I feel more at home at the start of something than in the middle of it — once something is running smoothly, I find myself ready to hand it off.' },
  { roleId: 'apostle', text: 'People who know me well would say I create things rather than maintain them.' },
  { roleId: 'apostle', text: 'I get uncomfortable staying in one environment for too long without seeing something new form.' },
  { roleId: 'apostle', text: 'When no one else is willing to go first, something in me rises to the moment.' },
  { roleId: 'apostle', text: 'I tend to think in terms of foundations — what needs to be in place so that whatever is built next can actually last.' },
  { roleId: 'apostle', text: 'I\'ve found myself in new cities, communities, or spaces simply because I felt called there before anyone else was.' },
  { roleId: 'apostle', text: 'The phrase "it\'s never been done here" energizes me rather than stops me.' },
  { roleId: 'prophet', text: 'I sometimes sense how a situation is going to unfold before it does — more often than I can chalk up to good intuition.' },
  { roleId: 'prophet', text: 'When I walk into a room, I often pick up on the spiritual atmosphere — something shifts in me when something is off, even if I can\'t name it immediately.' },
  { roleId: 'prophet', text: 'I\'ve said something to someone that I had no natural way of knowing, and it landed with a precision that surprised even me.' },
  { roleId: 'prophet', text: 'I feel a specific kind of heaviness when something in the church or culture drifts from what God intended — even when people around me don\'t seem to feel it.' },
  { roleId: 'prophet', text: 'I struggle to stay quiet when I sense something important needs to be said, even in situations where speaking up could cost me.' },
  { roleId: 'prophet', text: 'People have described me as unusually perceptive — someone who notices things others walk right past.' },
  { roleId: 'prophet', text: 'I often sense what someone needs to hear before they\'ve told me what they\'re actually going through.' },
  { roleId: 'prophet', text: 'I carry a burden for truth — not just accuracy, but the kind of truth that actually sets people free.' },
  { roleId: 'evangelist', text: 'In everyday settings — a store, a gym, a coffee shop — I find myself paying attention to the people around me in a way that goes beyond the surface.' },
  { roleId: 'evangelist', text: 'I feel a quiet restlessness when I\'ve been surrounded only by people who already believe — part of me needs to be around people who haven\'t yet encountered Jesus.' },
  { roleId: 'evangelist', text: 'Starting a spiritual conversation with someone I\'ve just met doesn\'t feel awkward to me — it feels natural.' },
  { roleId: 'evangelist', text: 'When I hear someone\'s story, I instinctively start to see how the gospel connects to what they\'re walking through.' },
  { roleId: 'evangelist', text: 'People in my life have come to faith in circumstances where I wasn\'t doing anything I\'d call intentional.' },
  { roleId: 'evangelist', text: 'I feel a joy when someone encounters God for the first time that seems bigger than what others around me seem to feel.' },
  { roleId: 'evangelist', text: 'I get frustrated when a church or ministry turns so far inward that it loses its concern for people still on the outside.' },
  { roleId: 'evangelist', text: 'I carry a low-level awareness of eternity around me that shapes how I see the people I encounter every day.' },
  { roleId: 'pastor', text: 'When someone I care about is going through something hard, I find it genuinely difficult to move on until I know they\'re okay.' },
  { roleId: 'pastor', text: 'I tend to notice when someone on the edges of a group feels disconnected, and I feel drawn to move toward them.' },
  { roleId: 'pastor', text: 'People come to me in crisis — sometimes before they\'ve told anyone else — and I\'m not always sure why they chose me.' },
  { roleId: 'pastor', text: 'I carry people emotionally long after a conversation ends — I find myself still thinking about someone\'s situation days later.' },
  { roleId: 'pastor', text: 'I feel a quiet grief when someone I\'ve been walking with drifts or pulls away, even when there\'s nothing I could have done.' },
  { roleId: 'pastor', text: 'My relationships tend to stretch across long seasons rather than burning bright and fading — I stay in people\'s lives.' },
  { roleId: 'pastor', text: 'I feel most fulfilled when I can see that someone has grown or found solid ground, knowing I was present for that.' },
  { roleId: 'pastor', text: 'I keep believing in people longer than most — I have a hard time writing off someone that others have already given up on.' },
  { roleId: 'teacher', text: 'When I encounter an idea I don\'t fully understand, I can\'t let it go until I\'ve worked it out — I need the why, not just the what.' },
  { roleId: 'teacher', text: 'I naturally organize information into structures or frameworks, even in everyday conversations — I think in systems.' },
  { roleId: 'teacher', text: 'I get bothered when something is stated imprecisely, especially if it\'s something important — the gap between almost-right and actually-right matters to me.' },
  { roleId: 'teacher', text: 'People tend to come to me when they need to truly understand something — not just feel something, but actually grasp it.' },
  { roleId: 'teacher', text: 'I often re-read or go deeper on things most people accept at face value — I need to know it actually holds up.' },
  { roleId: 'teacher', text: 'Something activates in me when I watch someone genuinely understand something they were confused about before.' },
  { roleId: 'teacher', text: 'I tend to think carefully about how I\'ll explain something before I say it — structure matters to me, not just content.' },
  { roleId: 'teacher', text: 'I care about what\'s true in a way that feels foundational — not to correct people, but because accuracy feels like the floor everything else stands on.' },
]

const LABELS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
const Q_PER_PAGE = 4
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / Q_PER_PAGE)
const MAX_SCORE = 40

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FivefoldQuiz({ skipIntro = false }) {
  const [screen, setScreen] = useState(skipIntro ? 'quiz' : 'intro')
  const [page, setPage] = useState(0)
  const [shuffledQuestions] = useState(() => shuffle(QUESTIONS))
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [results, setResults] = useState(null)

  const pageQuestions = shuffledQuestions.slice(page * Q_PER_PAGE, (page + 1) * Q_PER_PAGE)
  const pageAnswered = pageQuestions.every((_, i) => answers[page * Q_PER_PAGE + i] !== undefined)
  const totalAnswered = Object.keys(answers).length
  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100)

  function handleAnswer(qIndex, value) {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }))
  }

  function handleNext() {
    if (page < TOTAL_PAGES - 1) {
      setPage((p) => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setResults(computeRanking())
      setScreen('email')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handlePrev() {
    setPage((p) => Math.max(0, p - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function computeRanking() {
    const scores = {}
    ROLES.forEach((r) => { scores[r.id] = 0 })
    shuffledQuestions.forEach((q, i) => {
      scores[q.roleId] = (scores[q.roleId] ?? 0) + (answers[i] ?? 0)
    })
    return { ranked: [...ROLES].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0)), scores }
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    setSubmitting(true)
    setSubmitError(null)

    const { ranked, scores } = results ?? computeRanking()

    try {
      await fetch('/api/fivefold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), topCalling: ranked[0].id, scores }),
      })
    } catch { /* don't block results */ }

    setResults({ ranked, scores })
    setSubmitting(false)
    setScreen('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('quiz')} />
  if (screen === 'quiz') return <QuizScreen page={page} totalPages={TOTAL_PAGES} pageQuestions={pageQuestions} answers={answers} progress={progress} pageAnswered={pageAnswered} onAnswer={handleAnswer} onNext={handleNext} onPrev={handlePrev} />
  if (screen === 'email') return <EmailScreen name={name} email={email} submitting={submitting} error={submitError} onName={setName} onEmail={setEmail} onSubmit={handleSubmit} />
  if (screen === 'results' && results) return <ResultsScreen name={name} results={results.ranked} scores={results.scores} />
  return null
}

function IntroScreen({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', background: '#1C1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '88px 20px 40px' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          {ROLES.map((r) => (
            <span key={r.id} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: `${r.color}18`, border: `1.5px solid ${r.color}40`, fontSize: 22 }}>{r.icon}</span>
          ))}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(184,164,216,0.12)', border: '1px solid rgba(184,164,216,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8A4D8' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8A4D8', fontFamily: "'Sora', sans-serif" }}>5-Fold Ministry Assessment</span>
        </div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, margin: '0 0 16px' }}>
          Which 5-fold calling<br /><span style={{ color: '#B8A4D8' }}>do you carry?</span>
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 12px', maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
          Apostle. Prophet. Evangelist. Pastor. Teacher. Not every believer holds one of these offices — but many people carry a strong lean toward one. This assessment helps you find yours.
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          40 questions &middot; 8 minutes &middot; no fluff — just clarity on how God wired you.
        </p>
        <button onClick={onStart} style={{ background: '#B8A4D8', color: '#1C1A2E', border: 'none', borderRadius: 12, padding: '16px 40px', fontSize: 15, fontWeight: 800, fontFamily: "'Sora', sans-serif", cursor: 'pointer', letterSpacing: '0.02em', boxShadow: '0 8px 32px rgba(184,164,216,0.35)' }}>
          Discover my calling →
        </button>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>
          &ldquo;And He Himself gave some to be apostles, some prophets, some evangelists, and some pastors and teachers.&rdquo;<br />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Ephesians 4:11</span>
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
    <div style={{ minHeight: '100vh', background: '#F7F4EE', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '88px 16px 60px' }}>
      <div style={{ maxWidth: 640, width: '100%', background: 'white', borderRadius: 20, padding: '36px 32px', boxShadow: '0 4px 40px rgba(28,26,46,0.08)' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(44,44,42,0.45)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Questions {firstQ}–{lastQ} of {QUESTIONS.length}
            </span>
            <span style={{ fontSize: 12, color: '#B8A4D8', fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{progress}% complete</span>
          </div>
          <div style={{ height: 4, background: 'rgba(28,26,46,0.07)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#B8A4D8', borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 32 }}>
          {pageQuestions.map((q, i) => {
            const qIndex = page * Q_PER_PAGE + i
            const val = answers[qIndex]
            return (
              <div key={qIndex}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A', lineHeight: 1.65, marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#B8A4D8', fontSize: 11, fontWeight: 700, marginRight: 10, verticalAlign: 'middle', flexShrink: 0, color: 'white' }}>{qIndex + 1}</span>
                  {q.text}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {LABELS.map((label, score) => {
                    const selected = val === score + 1
                    return (
                      <button key={label} onClick={() => onAnswer(qIndex, score + 1)} style={{ flex: 1, padding: '9px 4px', borderRadius: 8, border: selected ? '2px solid #B8A4D8' : '1.5px solid rgba(44,44,42,0.12)', background: selected ? '#B8A4D8' : 'white', cursor: 'pointer', transition: 'all 0.12s', fontSize: 11, fontWeight: selected ? 700 : 500, color: selected ? '#1C1A2E' : 'rgba(44,44,42,0.55)', fontFamily: "'Sora', sans-serif", textAlign: 'center', lineHeight: 1.2 }}>
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {page > 0 && (
            <button onClick={onPrev} style={{ background: 'none', border: '1.5px solid rgba(44,44,42,0.15)', borderRadius: 10, padding: '13px 20px', fontSize: 13, fontWeight: 600, color: 'rgba(44,44,42,0.5)', cursor: 'pointer', fontFamily: "'Sora', sans-serif", flex: '0 0 auto' }}>← Back</button>
          )}
          <button onClick={onNext} disabled={!pageAnswered} style={{ flex: 1, padding: '14px 24px', borderRadius: 10, border: 'none', background: '#B8A4D8', color: '#1C1A2E', fontSize: 14, fontWeight: 800, fontFamily: "'Sora', sans-serif", cursor: pageAnswered ? 'pointer' : 'not-allowed', opacity: pageAnswered ? 1 : 0.4, transition: 'all 0.15s' }}>
            {isLast ? 'See my calling →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function EmailScreen({ name, email, submitting, error, onName, onEmail, onSubmit }) {
  return (
    <div style={{ minHeight: '100vh', background: '#1C1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '88px 20px 40px' }}>
      <div style={{ maxWidth: 480, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,164,216,0.2)', borderRadius: 20, padding: '48px 36px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 20 }}>✨</div>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>You&apos;re almost there.</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 32px' }}>
          Enter your name and email to see your calling — we&apos;ll also send your results to your inbox.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <input type="text" placeholder="First name" value={name} onChange={(e) => onName(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid rgba(184,164,216,0.25)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => onEmail(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid rgba(184,164,216,0.25)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {error && <p style={{ color: '#F5A842', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button onClick={onSubmit} disabled={submitting || !name.trim() || !email.trim()} style={{ width: '100%', padding: '15px 24px', borderRadius: 10, border: 'none', background: '#B8A4D8', color: '#1C1A2E', fontSize: 15, fontWeight: 800, fontFamily: "'Sora', sans-serif", cursor: (submitting || !name.trim() || !email.trim()) ? 'not-allowed' : 'pointer', opacity: (submitting || !name.trim() || !email.trim()) ? 0.5 : 1 }}>
          {submitting ? 'Loading…' : 'Reveal my calling →'}
        </button>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}

function ResultsScreen({ name, results, scores }) {
  const primary = results[0]
  const secondary = results[1]
  const isClose = (scores[primary.id] - scores[secondary.id]) <= 2

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EE', padding: '88px 16px 80px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ background: '#1C1A2E', borderRadius: 20, padding: '40px 32px', textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
            {name ? `${name}, your primary calling is` : 'Your primary calling is'}
          </p>
          <div style={{ fontSize: 52, marginBottom: 16 }}>{primary.icon}</div>
          <div style={{ display: 'inline-block', background: `${primary.color}20`, border: `1.5px solid ${primary.color}50`, borderRadius: 100, padding: '4px 14px', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: primary.color, fontFamily: "'Sora', sans-serif" }}>{primary.tagline}</span>
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 16px' }}>{primary.name}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>{primary.description}</p>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px 20px', textAlign: 'left' }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: primary.color, marginBottom: 8 }}>How to walk in it</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{primary.howToUse}</p>
          </div>
        </div>

        {isClose && (
          <div style={{ background: 'white', border: `1.5px solid ${secondary.color}40`, borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(44,44,42,0.4)', marginBottom: 10 }}>Strong secondary calling</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>{secondary.icon}</span>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: '#2C2C2A', margin: '0 0 4px' }}>{secondary.name} — {secondary.tagline}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(44,44,42,0.55)', lineHeight: 1.6, margin: 0 }}>{secondary.description}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px', marginBottom: 16 }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(44,44,42,0.4)', marginBottom: 20 }}>All five scores</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {results.map((role) => {
              const pct = Math.round((scores[role.id] / MAX_SCORE) * 100)
              return (
                <div key={role.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: '#2C2C2A', display: 'flex', alignItems: 'center', gap: 6 }}><span>{role.icon}</span>{role.name}</span>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: role.color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(44,44,42,0.07)', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: role.color, borderRadius: 6, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ background: '#1C1A2E', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8A4D8', fontFamily: "'Sora', sans-serif", marginBottom: 10 }}>Ready to walk in it fully?</div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>Awaken &amp; Align — 10-Session Meditation Series</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 auto 24px', maxWidth: 380, fontFamily: 'Inter, sans-serif' }}>
            Now that you know your calling, learn to walk in it with confidence. This guided journey helps you hear God clearly, release fear, and step into everything He placed in you.
          </p>
          <a href="/programs/awaken-and-align" style={{ display: 'inline-block', background: '#B8A4D8', color: '#1C1A2E', textDecoration: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>
            Get the program →
          </a>
        </div>
      </div>
    </div>
  )
}
