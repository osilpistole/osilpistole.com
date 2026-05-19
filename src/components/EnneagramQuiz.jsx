// src/components/EnneagramQuiz.jsx
//
// Multi-screen state machine for the Enneagram for Business Quiz.
// Mirrors the structure of SpiritualGiftsQuiz.jsx.
//
// Screens: intro → quiz → interstitial → … → email → business → submitting → results

import { useState, useMemo } from 'react'
import { QUESTIONS, LIKERT_LABELS } from '../data/enneagram-questions.js'
import { INTERSTITIALS } from '../data/enneagram-interstitials.js'

const QUESTIONS_PER_ROUND = 9
const TOTAL_ROUNDS = 8

export default function EnneagramQuiz() {
  const [screen, setScreen] = useState('intro')
  const [roundIndex, setRoundIndex] = useState(0)         // 0..7
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null))

  // Compute shuffled question order ONCE per session (stable for fairness during a session).
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

  // Other screens added in later tasks
  return null
}

// Builds a shuffle of QUESTIONS indices where no two consecutive entries
// share a typeId. Falls back to plain shuffle if the constraint can't be met.
function buildShuffledOrder(questions) {
  const indices = questions.map((_, i) => i)
  for (let attempt = 0; attempt < 50; attempt++) {
    const shuffled = shuffle(indices)
    let bad = false
    for (let i = 1; i < shuffled.length; i++) {
      if (questions[shuffled[i]].typeId === questions[shuffled[i - 1]].typeId) {
        bad = true; break
      }
    }
    if (!bad) return shuffled
  }
  return shuffle(indices) // fallback
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
  const slice = order.slice(start, end) // 9 question indices

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
        {isLast ? 'See my results →' : 'Continue →'}
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
