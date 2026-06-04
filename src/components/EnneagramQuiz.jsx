// src/components/EnneagramQuiz.jsx
//
// Multi-screen state machine for the Enneagram for Business Quiz.
// Mirrors the structure of SpiritualGiftsQuiz.jsx.
//
// Screens: intro → quiz → interstitial → … → email → business → submitting → results

import { useState, useMemo } from 'react'
import { QUESTIONS, LIKERT_LABELS } from '../data/enneagram-questions.js'
import { INTERSTITIALS } from '../data/enneagram-interstitials.js'
import { TYPES, TYPE_WINGS } from '../data/enneagram-types.js'
import {
  scoreAnswers,
  pickPrimaryType,
  detectWing,
  getArrows,
} from '../lib/enneagram-scoring.js'
import EnneagramArrowDiagram from './EnneagramArrowDiagram.jsx'

const QUESTIONS_PER_ROUND = 9
const TOTAL_ROUNDS = 8

const BUSINESS_QUESTIONS = [
  {
    id: 'season',
    label: 'What season are you in?',
    options: ['Starting from scratch', 'Rebuilding', 'Scaling what\'s working', 'Pivoting'],
  },
  {
    id: 'hours',
    label: 'How many hours per week can you realistically give this?',
    options: ['Under 5', '5–10', '10–20', '20+'],
  },
  {
    id: 'audience',
    label: 'What does your audience look like right now?',
    options: ['None yet', 'Small but engaged', 'Growing list/following', 'Established'],
  },
  {
    id: 'format',
    label: 'What format do you naturally lean toward? (select all that apply)',
    options: ['1:1', 'Group', 'E-course', 'Membership', 'Live event', 'Not sure yet'],
    multi: true,
  },
  {
    id: 'income',
    label: 'What\'s your primary income goal from this?',
    options: ['Side income', 'Supplement my main work', 'Replace my current income', 'Kingdom flexibility, no fixed number'],
  },
  {
    id: 'primaryGoal',
    label: 'Right now, what\'s the bigger goal for this offer?',
    options: [
      'Revenue is the goal',
      'Building my audience and platform is the goal',
      'Mostly revenue, but I do need to grow my audience',
      'Mostly platform-building — I have other income',
    ],
  },
]

export default function EnneagramQuiz() {
  const [screen, setScreen] = useState('intro')
  const [roundIndex, setRoundIndex] = useState(0)
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consentToEmail, setConsentToEmail] = useState(true)
  const [businessAnswers, setBusinessAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState(null) // populated after /api/enneagram-submit returns

  const order = useMemo(() => buildShuffledOrder(QUESTIONS), [])

  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('quiz')} />

  if (screen === 'quiz') {
    return (
      <QuizScreen
        roundIndex={roundIndex}
        order={order}
        answers={answers}
        onAnswer={(qIndex, likertIdx) => {
          setAnswers((prev) => {
            const next = [...prev]
            next[qIndex] = likertIdx
            return next
          })
        }}
        onRoundComplete={() => {
          if (roundIndex < TOTAL_ROUNDS - 1) setScreen('interstitial')
          else setScreen('email')
        }}
      />
    )
  }

  if (screen === 'interstitial') {
    return (
      <InterstitialScreen
        interstitial={INTERSTITIALS[roundIndex]}
        onContinue={() => {
          setRoundIndex(roundIndex + 1)
          setScreen('quiz')
        }}
      />
    )
  }

  if (screen === 'email') {
    return (
      <EmailGateScreen
        name={name}
        email={email}
        consentToEmail={consentToEmail}
        onName={setName}
        onEmail={setEmail}
        onConsent={setConsentToEmail}
        onContinue={() => setScreen('business')}
      />
    )
  }

  if (screen === 'business') {
    return (
      <BusinessQuestionsScreen
        answers={businessAnswers}
        onAnswer={(id, value, multi) => {
          setBusinessAnswers((prev) => {
            if (!multi) return { ...prev, [id]: value }
            const current = Array.isArray(prev[id]) ? prev[id] : []
            const next = current.includes(value)
              ? current.filter((v) => v !== value)
              : [...current, value]
            return { ...prev, [id]: next }
          })
        }}
        onSubmit={async () => {
          setSubmitting(true)
          setSubmitError('')
          try {
            const payload = buildSubmitPayload({ answers, businessAnswers, name, email, consentToEmail })
            const resp = await fetch('/api/enneagram-submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
            if (!resp.ok) throw new Error(`Server error ${resp.status}`)
            const data = await resp.json()
            setResult(data)
            setScreen('results')
          } catch (err) {
            setSubmitError(err.message || 'Something went wrong. Please try again.')
          } finally {
            setSubmitting(false)
          }
        }}
        submitting={submitting}
        submitError={submitError}
      />
    )
  }

  if (screen === 'results') {
    return <ResultsScreen name={name} email={email} consentToEmail={consentToEmail} result={result} />
  }

  return null
}

function buildSubmitPayload({ answers, businessAnswers, name, email, consentToEmail }) {
  // Compute primary + wing on the client and send both raw answers AND derived
  // values. The server will trust the derived values; raw answers are sent so
  // we have an audit trail and can re-score server-side later if we want.
  const scores = scoreAnswers(answers)
  const { primary, candidates, tieOccurred } = pickPrimaryType(scores, answers)
  const wing = detectWing(primary, scores)
  const arrows = getArrows(primary)
  return {
    name,
    email,
    consentToEmail,
    answers,
    businessAnswers,
    derived: { scores, primaryType: primary, wing, arrows, candidates, tieOccurred },
  }
}

// Builds a shuffle of QUESTIONS indices where no two consecutive entries
// share a typeId. Uses a greedy pick: at each step, choose uniformly from
// the remaining questions whose type differs from the last one placed.
// Guaranteed to satisfy the constraint as long as no single type is more
// than half the pool (8/72 ≈ 11% — well within bounds).
function buildShuffledOrder(questions) {
  const pool = questions.map((_, i) => i)
  const out = []
  let lastTypeId = null

  while (pool.length > 0) {
    const eligibleIdxs = pool
      .map((qIdx, poolPos) => ({ qIdx, poolPos }))
      .filter(({ qIdx }) => questions[qIdx].typeId !== lastTypeId)

    // Edge case: if no eligible questions remain (pool of all-same-type),
    // fall back to any remaining question. Shouldn't happen with our data.
    const candidates = eligibleIdxs.length > 0 ? eligibleIdxs : pool.map((qIdx, poolPos) => ({ qIdx, poolPos }))
    const pick = candidates[Math.floor(Math.random() * candidates.length)]
    out.push(pick.qIdx)
    pool.splice(pick.poolPos, 1)
    lastTypeId = questions[pick.qIdx].typeId
  }

  return out
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function IntroScreen({ onStart }) {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <p style={labelEyebrow}>Free assessment</p>
      <h1 style={pageHeading}>The Enneagram for Business Quiz</h1>
      <p style={lead}>
        In about 8 minutes, discover your Enneagram type, your wing, and what each
        of those means for the business, ministry, or mentorship you are wired to build.
      </p>
      <p style={body}>
        This is not about putting you in a box. It is about giving you a gracious,
        accurate read on who you are — so you can stop forcing yourself into a model
        that was never meant for you.
      </p>
      <button onClick={onStart} style={primaryBtn}>Start the quiz →</button>
    </section>
  )
}

function QuizScreen({ roundIndex, order, answers, onAnswer, onRoundComplete }) {
  const start = roundIndex * QUESTIONS_PER_ROUND
  const end = start + QUESTIONS_PER_ROUND
  const slice = order.slice(start, end)

  const allAnswered = slice.every((qIndex) => answers[qIndex] != null)
  const isLast = roundIndex === TOTAL_ROUNDS - 1

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <p style={labelEyebrow}>Round {roundIndex + 1} of {TOTAL_ROUNDS}</p>
      <h2 style={{ ...pageHeading, fontSize: 24, marginBottom: 24 }}>
        How true is each of these for you?
      </h2>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {slice.map((qIndex) => {
          const q = QUESTIONS[qIndex]
          return (
            <li key={qIndex} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: 17, lineHeight: 1.5, color: '#2c2c2a', margin: '0 0 12px' }}>{q.text}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {LIKERT_LABELS.map((label, idx) => {
                  const selected = answers[qIndex] === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => onAnswer(qIndex, idx)}
                      style={selected ? likertBtnSelected : likertBtn}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ol>

      <button
        onClick={onRoundComplete}
        disabled={!allAnswered}
        style={{ ...primaryBtn, opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'not-allowed' }}
      >
        {isLast ? 'Continue to results →' : 'Continue →'}
      </button>
    </section>
  )
}

function InterstitialScreen({ interstitial, onContinue }) {
  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <p style={labelEyebrow}>
        {interstitial.kind === 'verse' ? 'Scripture' : interstitial.kind === 'quote' ? 'Quote' : 'Did you know'}
      </p>
      <p style={{ fontSize: 22, lineHeight: 1.5, color: '#2c2c2a', margin: '16px 0 8px', fontStyle: interstitial.kind === 'verse' || interstitial.kind === 'quote' ? 'italic' : 'normal' }}>
        {interstitial.text}
      </p>
      {interstitial.attribution && (
        <p style={{ fontSize: 14, color: 'rgba(44,44,42,0.6)', margin: '4px 0 36px' }}>
          — {interstitial.attribution}
        </p>
      )}
      <button onClick={onContinue} style={primaryBtn}>Continue →</button>
    </section>
  )
}

function EmailGateScreen({ name, email, consentToEmail, onName, onEmail, onConsent, onContinue }) {
  const valid = name.trim() && /\S+@\S+\.\S+/.test(email.trim())
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '60px 24px' }}>
      <p style={labelEyebrow}>Almost there</p>
      <h2 style={{ ...pageHeading, fontSize: 28 }}>Where should I send your results?</h2>
      <p style={body}>
        Enter your name and email to unlock your full Enneagram results.
        I'll also email you a copy so you can come back to it.
      </p>
      <label style={fieldLabel}>Your name</label>
      <input type="text" value={name} onChange={(e) => onName(e.target.value)} style={inputStyle} />
      <label style={fieldLabel}>Email address</label>
      <input type="email" placeholder="you@example.com" value={email} onChange={(e) => onEmail(e.target.value)} style={inputStyle} />

      <label
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 18, padding: '12px 14px',
          background: 'rgba(245,200,66,0.10)', border: '1px solid rgba(245,200,66,0.35)',
          borderRadius: 8, cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={consentToEmail}
          onChange={(e) => onConsent(e.target.checked)}
          style={{ marginTop: 3, width: 18, height: 18, accentColor: '#F5C842', cursor: 'pointer' }}
        />
        <span style={{ fontSize: 14, lineHeight: 1.5, color: '#2c2c2a' }}>
          Yes — I'd love to hear from Osil! Send me occasional notes with new free
          resources, encouragement, and updates. (No spam, ever. Unsubscribe anytime.)
        </span>
      </label>

      <button
        onClick={onContinue}
        disabled={!valid}
        style={{ ...primaryBtn, marginTop: 18, opacity: valid ? 1 : 0.5, cursor: valid ? 'pointer' : 'not-allowed' }}
      >
        Continue →
      </button>
    </section>
  )
}

function BusinessQuestionsScreen({ answers, onAnswer, onSubmit, submitting, submitError }) {
  const allAnswered = BUSINESS_QUESTIONS.every((q) => {
    const v = answers[q.id]
    if (q.multi) return Array.isArray(v) && v.length > 0
    return v != null && v !== ''
  })
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <p style={labelEyebrow}>One last step</p>
      <h2 style={{ ...pageHeading, fontSize: 28 }}>A few quick questions about your business season</h2>
      <p style={body}>
        These help me tailor your recommendation to where you actually are right now.
      </p>
      {BUSINESS_QUESTIONS.map((q) => (
        <div key={q.id} style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#2c2c2a', margin: '0 0 10px' }}>{q.label}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {q.options.map((opt) => {
              const v = answers[q.id]
              const selected = q.multi ? Array.isArray(v) && v.includes(opt) : v === opt
              return (
                <button key={opt} onClick={() => onAnswer(q.id, opt, q.multi)} style={selected ? likertBtnSelected : likertBtn}>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {submitError && <p style={{ color: '#a8324f', marginBottom: 12 }}>{submitError}</p>}
      <button
        onClick={onSubmit}
        disabled={!allAnswered || submitting}
        style={{ ...primaryBtn, opacity: (!allAnswered || submitting) ? 0.5 : 1, cursor: (!allAnswered || submitting) ? 'not-allowed' : 'pointer' }}
      >
        {submitting ? 'Building your results…' : 'See my results →'}
      </button>
    </section>
  )
}

// --- shared styles (mirror SpiritualGiftsQuiz aesthetics) ---
const labelEyebrow = {
  fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#d4a800', fontFamily: "'Sora', sans-serif", marginBottom: 8,
}
const pageHeading = {
  fontSize: 36, fontWeight: 700, lineHeight: 1.15, color: '#2c2c2a', margin: '0 0 16px',
}
const lead = { fontSize: 18, lineHeight: 1.55, color: '#2c2c2a', margin: '0 0 16px' }
const body = { fontSize: 16, lineHeight: 1.6, color: 'rgba(44,44,42,0.85)', margin: '0 0 28px' }
const primaryBtn = {
  background: '#F5C842', color: '#2c2c2a', border: 'none', padding: '14px 28px',
  borderRadius: 8, fontWeight: 700, fontFamily: "'Sora', sans-serif", fontSize: 16,
  cursor: 'pointer',
}
const likertBtn = {
  padding: '10px 16px', background: '#fff', border: '1.5px solid rgba(44,44,42,0.2)',
  borderRadius: 8, fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600,
  color: '#2c2c2a', cursor: 'pointer',
}
const likertBtnSelected = { ...likertBtn, background: '#F5C842', borderColor: '#F5C842' }
const fieldLabel = {
  display: 'block', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
  textTransform: 'uppercase', color: 'rgba(44,44,42,0.65)', marginBottom: 6, marginTop: 12,
  fontFamily: "'Sora', sans-serif",
}
const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1.5px solid rgba(44,44,42,0.2)',
  borderRadius: 8, fontSize: 16, fontFamily: 'inherit', color: '#2c2c2a',
}

function ResultsScreen({ name, email, consentToEmail, result }) {
  if (!result) return null
  const { primaryType, wing, arrows, recommendation } = result
  const typeKey = `${primaryType}w${wing}`
  const typeData = TYPES[primaryType]
  const wingData = TYPE_WINGS[typeKey]

  function handleStrategyClick(e) {
    // Fire-and-forget tag in Kit, then let the link navigate.
    // sendBeacon survives the navigation and doesn't block it.
    if (consentToEmail && email && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      try {
        const blob = new Blob([JSON.stringify({ email, primaryType, wing })], { type: 'application/json' })
        navigator.sendBeacon('/api/enneagram-track-click', blob)
      } catch {}
    }
    // do NOT preventDefault — let the anchor navigate normally
  }

  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={labelEyebrow}>{name ? `${name}, your type is` : 'Your type'}</p>
        <h1 style={{ ...pageHeading, fontSize: 42, marginBottom: 8 }}>
          Type {primaryType}w{wing}
        </h1>
        <p style={{ fontSize: 20, color: 'rgba(44,44,42,0.75)', margin: 0 }}>{wingData.subtitle}</p>
      </header>

      <Section title="Who You Are At Your Core">
        <p style={prose}>{wingData.coreDescription}</p>
      </Section>

      <Section title="Your Gifts in Business">
        <ul style={bulletList}>{wingData.strengths.map((s, i) => <li key={i} style={bullet}>{s}</li>)}</ul>
      </Section>

      <Section title="Your Shadow Side to Watch">
        <ul style={bulletList}>{wingData.blindSpots.map((s, i) => <li key={i} style={bullet}>{s}</li>)}</ul>
      </Section>

      <Section title="When You're Healthy">
        <EnneagramArrowDiagram from={primaryType} to={arrows.growth} label="Growth direction" />
        <p style={prose}>{typeData.growthParagraph}</p>
      </Section>

      <Section title="When You're Stressed">
        <EnneagramArrowDiagram from={primaryType} to={arrows.stress} label="Stress direction" />
        <p style={prose}>{typeData.stressParagraph}</p>
      </Section>

      <Section title="Your Personalized Build Recommendation" accent>
        {recommendation ? (
          <RecommendationCard rec={recommendation} />
        ) : (
          <p style={{ ...prose, fontStyle: 'italic' }}>
            We couldn't generate your custom recommendation right now —
            but your full results have been emailed to you and I'll be in touch.
          </p>
        )}
      </Section>

      <Section title="A Word For You">
        <blockquote style={{ ...prose, fontStyle: 'italic', borderLeft: '3px solid #F5C842', paddingLeft: 16, margin: 0 }}>
          "{typeData.bibleVerse.text}"
          <footer style={{ marginTop: 8, fontStyle: 'normal', fontSize: 14, color: 'rgba(44,44,42,0.6)' }}>
            — {typeData.bibleVerse.reference}
          </footer>
        </blockquote>
      </Section>

      <div style={{ marginTop: 48, padding: '32px 24px', background: '#faf6ec', borderRadius: 12, textAlign: 'center' }}>
        <p style={labelEyebrow}>Ready to go deeper?</p>
        <h3 style={{ ...pageHeading, fontSize: 22, margin: '8px 0 16px' }}>Want to talk through this with me?</h3>
        <a href="/coaching" onClick={handleStrategyClick} style={primaryAnchor}>Book a Prophetic Strategy Session →</a>
        <p style={{ ...body, marginTop: 28, fontSize: 14, color: 'rgba(44,44,42,0.6)' }}>
          Haven't taken these yet? <a href="/spiritual-gifts">Spiritual Gifts Quiz</a> · <a href="/fivefold">5-Fold Quiz</a>
        </p>
      </div>

      <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'rgba(44,44,42,0.55)' }}>
        Your full results have been emailed to you.
      </p>
    </article>
  )
}

function Section({ title, accent, children }) {
  return (
    <section
      style={{
        marginTop: 36, padding: accent ? '24px' : 0,
        background: accent ? 'rgba(245,200,66,0.10)' : 'transparent',
        border: accent ? '1px solid rgba(245,200,66,0.4)' : 'none',
        borderRadius: accent ? 12 : 0,
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.02em', color: '#2c2c2a', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  )
}

function RecommendationCard({ rec }) {
  const rows = [
    ['What to build', rec.whatToBuild],
    ['Why this fits who you are', rec.whyItFits],
    ['Recommended format', rec.format],
    ['Scale that fits your season', rec.scale],
    ['Suggested price range', rec.priceRange],
    ['Your first step this week', rec.firstStep],
    ['Watch out for', rec.watchOutFor],
  ]
  return (
    <div>
      {rows.map(([label, value]) =>
        value ? (
          <div key={label} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a37e00', margin: '0 0 4px' }}>{label}</p>
            <p style={{ ...prose, margin: 0 }}>{value}</p>
          </div>
        ) : null
      )}
      {Array.isArray(rec.alternatives) && rec.alternatives.length > 0 && (
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(245,200,66,0.4)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a37e00', margin: '0 0 10px' }}>Two alternatives to consider</p>
          {rec.alternatives.map((alt, i) => (
            <div key={i} style={{ padding: '10px 14px', marginBottom: 10, background: 'rgba(255,255,255,0.6)', borderLeft: '3px solid #F5C842', borderRadius: 4 }}>
              <p style={{ ...prose, margin: '0 0 4px', fontWeight: 600 }}>{alt.whatToBuild}</p>
              <p style={{ fontSize: 13, color: 'rgba(44,44,42,0.65)', margin: 0 }}>{alt.format} · {alt.priceRange}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const prose = { fontSize: 16, lineHeight: 1.65, color: '#2c2c2a', margin: 0 }
const bulletList = { paddingLeft: 20, margin: 0 }
const bullet = { ...prose, marginBottom: 6 }
const primaryAnchor = {
  display: 'inline-block', background: '#2c2c2a', color: '#fff', padding: '12px 24px',
  borderRadius: 8, fontWeight: 700, fontFamily: "'Sora', sans-serif", fontSize: 16, textDecoration: 'none',
}
