// scripts/verify-enneagram-scoring.mjs
//
// Run with: node scripts/verify-enneagram-scoring.mjs

import assert from 'node:assert/strict'
import {
  scoreAnswers,
  pickPrimaryType,
  detectWing,
  getArrows,
  getFlatCandidates,
} from '../src/lib/enneagram-scoring.js'
import { QUESTIONS } from '../src/data/enneagram-questions.js'

// Build a synthetic answer set where Type 4 dominates
const answers = QUESTIONS.map((q) => {
  if (q.typeId === 4) return 3            // Always
  if (q.typeId === 3) return 2            // Often (this should become the wing)
  if (q.typeId === 5) return 1            // Sometimes
  return 0                                // Not me
})

const scores = scoreAnswers(answers)
assert.equal(scores[4], 24, 'Type 4 should max out at 24')
assert.equal(scores[3], 16)
assert.equal(scores[5], 8)
assert.equal(scores[1], 0)

const { primary, tieOccurred } = pickPrimaryType(scores, answers)
assert.equal(primary, 4)
assert.equal(tieOccurred, false)

const wing = detectWing(primary, scores)
assert.equal(wing, 3, `Expected wing 3, got ${wing}`)

const arrows = getArrows(4)
assert.deepEqual(arrows, { growth: 1, stress: 2 })

// Tie test — Types 1 and 9 both max out at 24 (8 × "Always" each)
const tiedAnswers = QUESTIONS.map((q) => {
  if (q.typeId === 1 || q.typeId === 9) return 3 // Always
  return 0
})
const tiedScores = scoreAnswers(tiedAnswers)
assert.equal(tiedScores[1], 24)
assert.equal(tiedScores[9], 24)
const tieResult = pickPrimaryType(tiedScores, tiedAnswers)
assert.equal(tieResult.tieOccurred, true)
assert.ok([1, 9].includes(tieResult.primary))

// Flat candidates
const flatAnswers = QUESTIONS.map(() => 2) // every type gets Often → all tied at 16
const flatScores = scoreAnswers(flatAnswers)
const flatCands = getFlatCandidates(flatScores, 1, 2, 3)
assert.equal(flatCands.length, 3)

console.log('✅ All Enneagram scoring checks passed.')
