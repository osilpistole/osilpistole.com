// src/components/EnneagramQuiz.jsx
//
// Multi-screen state machine for the Enneagram for Business Quiz.
// Mirrors the structure of SpiritualGiftsQuiz.jsx.
//
// Screens: intro → quiz → interstitial → … → email → business → submitting → results

import { useState } from 'react'

const QUESTIONS_PER_ROUND = 9
const TOTAL_ROUNDS = 8

export default function EnneagramQuiz() {
  const [screen, setScreen] = useState('intro')

  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('quiz')} />

  // Other screens added in later tasks
  return null
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
