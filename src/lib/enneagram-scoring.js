// src/lib/enneagram-scoring.js
//
// Pure functions for scoring an Enneagram quiz.
// Tested via scripts/verify-enneagram-scoring.mjs — see that script for examples.

import { QUESTIONS, LIKERT_WEIGHTS } from '../data/enneagram-questions.js'
import { ARROWS, WING_OPTIONS } from '../data/enneagram-types.js'

/**
 * answers: an array of length 72, each entry is a Likert index 0..3
 *          aligned with the QUESTIONS array order.
 * returns: { 1: number, 2: number, ..., 9: number } summed score per type
 */
export function scoreAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error(`Expected ${QUESTIONS.length} answers, got ${answers?.length}`)
  }
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (let i = 0; i < QUESTIONS.length; i++) {
    const q = QUESTIONS[i]
    const idx = answers[i]
    if (idx == null) continue // unanswered — treated as 0
    const weight = LIKERT_WEIGHTS[idx]
    if (weight == null) throw new Error(`Invalid Likert index ${idx} at question ${i}`)
    scores[q.typeId] += weight
  }
  return scores
}

/**
 * scores: output of scoreAnswers
 * answers: original answers (needed for tiebreaker)
 * returns: { primary: 1..9, candidates: number[], tieOccurred: boolean }
 */
export function pickPrimaryType(scores, answers) {
  const max = Math.max(...Object.values(scores))
  const tied = Object.keys(scores).filter((t) => scores[t] === max).map(Number)
  if (tied.length === 1) {
    return { primary: tied[0], candidates: tied, tieOccurred: false }
  }
  // Tiebreaker: among tied types, the one with the most "Always" answers (Likert index 3)
  const alwaysByType = countAlwaysByType(answers, tied)
  const maxAlways = Math.max(...Object.values(alwaysByType))
  const stillTied = Object.keys(alwaysByType).filter(
    (t) => alwaysByType[t] === maxAlways
  ).map(Number)
  // If still tied after that, fall back to the lowest type number (stable choice)
  const primary = stillTied.sort((a, b) => a - b)[0]
  return { primary, candidates: tied, tieOccurred: true }
}

function countAlwaysByType(answers, typeIds) {
  const out = Object.fromEntries(typeIds.map((t) => [t, 0]))
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (answers[i] === 3) {
      const t = QUESTIONS[i].typeId
      if (out[t] != null) out[t] += 1
    }
  }
  return out
}

/**
 * primaryType: 1..9
 * scores: output of scoreAnswers
 * returns: 1..9 — whichever adjacent type scored higher; ties go to the lower number (stable)
 */
export function detectWing(primaryType, scores) {
  const [a, b] = WING_OPTIONS[primaryType]
  if (scores[a] === scores[b]) return Math.min(a, b)
  return scores[a] > scores[b] ? a : b
}

/**
 * type: 1..9
 * returns: { growth: 1..9, stress: 1..9 }
 */
export function getArrows(type) {
  return ARROWS[type]
}

/**
 * Returns the top N candidate types when the primary score is within `windowPoints`
 * of other types — used for the flat-scores edge case in the spec.
 */
export function getFlatCandidates(scores, primaryType, windowPoints = 2, max = 3) {
  const primaryScore = scores[primaryType]
  const close = Object.keys(scores)
    .map(Number)
    .filter((t) => primaryScore - scores[t] <= windowPoints)
    .sort((a, b) => scores[b] - scores[a])
  return close.slice(0, max)
}
