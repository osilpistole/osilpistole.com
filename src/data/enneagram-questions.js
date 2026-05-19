// src/data/enneagram-questions.js
//
// 72 statements total — 8 per type, types 1–9.
// Each statement: { typeId: 1..9, text: string }
//
// Likert mapping (used for both UI labels and scoring weights):
//   Not me    = 0
//   Sometimes = 1
//   Often     = 2
//   Always    = 3
//
// Max possible score per type: 8 * 3 = 24

export const LIKERT_LABELS = ['Not me', 'Sometimes', 'Often', 'Always']
export const LIKERT_WEIGHTS = [0, 1, 2, 3]

export const QUESTIONS = [
  // Type 1 — The Reformer / Perfectionist (8 statements)
  { typeId: 1, text: 'PLACEHOLDER 1-1' },
  { typeId: 1, text: 'PLACEHOLDER 1-2' },
  { typeId: 1, text: 'PLACEHOLDER 1-3' },
  { typeId: 1, text: 'PLACEHOLDER 1-4' },
  { typeId: 1, text: 'PLACEHOLDER 1-5' },
  { typeId: 1, text: 'PLACEHOLDER 1-6' },
  { typeId: 1, text: 'PLACEHOLDER 1-7' },
  { typeId: 1, text: 'PLACEHOLDER 1-8' },
  // Type 2 — The Helper
  { typeId: 2, text: 'PLACEHOLDER 2-1' },
  { typeId: 2, text: 'PLACEHOLDER 2-2' },
  { typeId: 2, text: 'PLACEHOLDER 2-3' },
  { typeId: 2, text: 'PLACEHOLDER 2-4' },
  { typeId: 2, text: 'PLACEHOLDER 2-5' },
  { typeId: 2, text: 'PLACEHOLDER 2-6' },
  { typeId: 2, text: 'PLACEHOLDER 2-7' },
  { typeId: 2, text: 'PLACEHOLDER 2-8' },
  // Type 3 — The Achiever
  { typeId: 3, text: 'PLACEHOLDER 3-1' },
  { typeId: 3, text: 'PLACEHOLDER 3-2' },
  { typeId: 3, text: 'PLACEHOLDER 3-3' },
  { typeId: 3, text: 'PLACEHOLDER 3-4' },
  { typeId: 3, text: 'PLACEHOLDER 3-5' },
  { typeId: 3, text: 'PLACEHOLDER 3-6' },
  { typeId: 3, text: 'PLACEHOLDER 3-7' },
  { typeId: 3, text: 'PLACEHOLDER 3-8' },
  // Type 4 — The Individualist / Romantic
  { typeId: 4, text: 'PLACEHOLDER 4-1' },
  { typeId: 4, text: 'PLACEHOLDER 4-2' },
  { typeId: 4, text: 'PLACEHOLDER 4-3' },
  { typeId: 4, text: 'PLACEHOLDER 4-4' },
  { typeId: 4, text: 'PLACEHOLDER 4-5' },
  { typeId: 4, text: 'PLACEHOLDER 4-6' },
  { typeId: 4, text: 'PLACEHOLDER 4-7' },
  { typeId: 4, text: 'PLACEHOLDER 4-8' },
  // Type 5 — The Investigator / Observer
  { typeId: 5, text: 'PLACEHOLDER 5-1' },
  { typeId: 5, text: 'PLACEHOLDER 5-2' },
  { typeId: 5, text: 'PLACEHOLDER 5-3' },
  { typeId: 5, text: 'PLACEHOLDER 5-4' },
  { typeId: 5, text: 'PLACEHOLDER 5-5' },
  { typeId: 5, text: 'PLACEHOLDER 5-6' },
  { typeId: 5, text: 'PLACEHOLDER 5-7' },
  { typeId: 5, text: 'PLACEHOLDER 5-8' },
  // Type 6 — The Loyalist
  { typeId: 6, text: 'PLACEHOLDER 6-1' },
  { typeId: 6, text: 'PLACEHOLDER 6-2' },
  { typeId: 6, text: 'PLACEHOLDER 6-3' },
  { typeId: 6, text: 'PLACEHOLDER 6-4' },
  { typeId: 6, text: 'PLACEHOLDER 6-5' },
  { typeId: 6, text: 'PLACEHOLDER 6-6' },
  { typeId: 6, text: 'PLACEHOLDER 6-7' },
  { typeId: 6, text: 'PLACEHOLDER 6-8' },
  // Type 7 — The Enthusiast
  { typeId: 7, text: 'PLACEHOLDER 7-1' },
  { typeId: 7, text: 'PLACEHOLDER 7-2' },
  { typeId: 7, text: 'PLACEHOLDER 7-3' },
  { typeId: 7, text: 'PLACEHOLDER 7-4' },
  { typeId: 7, text: 'PLACEHOLDER 7-5' },
  { typeId: 7, text: 'PLACEHOLDER 7-6' },
  { typeId: 7, text: 'PLACEHOLDER 7-7' },
  { typeId: 7, text: 'PLACEHOLDER 7-8' },
  // Type 8 — The Challenger
  { typeId: 8, text: 'PLACEHOLDER 8-1' },
  { typeId: 8, text: 'PLACEHOLDER 8-2' },
  { typeId: 8, text: 'PLACEHOLDER 8-3' },
  { typeId: 8, text: 'PLACEHOLDER 8-4' },
  { typeId: 8, text: 'PLACEHOLDER 8-5' },
  { typeId: 8, text: 'PLACEHOLDER 8-6' },
  { typeId: 8, text: 'PLACEHOLDER 8-7' },
  { typeId: 8, text: 'PLACEHOLDER 8-8' },
  // Type 9 — The Peacemaker
  { typeId: 9, text: 'PLACEHOLDER 9-1' },
  { typeId: 9, text: 'PLACEHOLDER 9-2' },
  { typeId: 9, text: 'PLACEHOLDER 9-3' },
  { typeId: 9, text: 'PLACEHOLDER 9-4' },
  { typeId: 9, text: 'PLACEHOLDER 9-5' },
  { typeId: 9, text: 'PLACEHOLDER 9-6' },
  { typeId: 9, text: 'PLACEHOLDER 9-7' },
  { typeId: 9, text: 'PLACEHOLDER 9-8' },
]
