// scripts/verify-enneagram-data.mjs
//
// Run with: node scripts/verify-enneagram-data.mjs
//
// Asserts that the data files are internally consistent:
//   - 72 questions, 8 per type
//   - All wing options point to adjacent types
//   - All arrows are valid (point to a different type 1..9)
//   - 18 TYPE_WINGS keys exist
//   - 7 interstitials

import assert from 'node:assert/strict'
import { QUESTIONS, LIKERT_LABELS, LIKERT_WEIGHTS } from '../src/data/enneagram-questions.js'
import { ARROWS, WING_OPTIONS, TYPES, TYPE_WINGS } from '../src/data/enneagram-types.js'
import { INTERSTITIALS } from '../src/data/enneagram-interstitials.js'

// Likert
assert.equal(LIKERT_LABELS.length, 4, 'Expected 4 Likert labels')
assert.equal(LIKERT_WEIGHTS.length, 4, 'Expected 4 Likert weights')

// Questions: 72 total, 8 per type
assert.equal(QUESTIONS.length, 72, `Expected 72 questions, got ${QUESTIONS.length}`)
const countByType = {}
for (const q of QUESTIONS) {
  countByType[q.typeId] = (countByType[q.typeId] || 0) + 1
}
for (let t = 1; t <= 9; t++) {
  assert.equal(countByType[t], 8, `Type ${t} has ${countByType[t]} questions, expected 8`)
}

// Arrows
for (let t = 1; t <= 9; t++) {
  assert.ok(ARROWS[t], `Missing arrows for type ${t}`)
  assert.ok(ARROWS[t].growth >= 1 && ARROWS[t].growth <= 9, `Invalid growth for ${t}`)
  assert.ok(ARROWS[t].stress >= 1 && ARROWS[t].stress <= 9, `Invalid stress for ${t}`)
  assert.notEqual(ARROWS[t].growth, t, `Growth arrow for ${t} cannot be itself`)
  assert.notEqual(ARROWS[t].stress, t, `Stress arrow for ${t} cannot be itself`)
}

// Wing options: each type has exactly 2 adjacent types
for (let t = 1; t <= 9; t++) {
  assert.equal(WING_OPTIONS[t].length, 2, `Type ${t} should have 2 wing options`)
  for (const w of WING_OPTIONS[t]) {
    const distance = Math.min(Math.abs(t - w), 9 - Math.abs(t - w))
    assert.equal(distance, 1, `Wing ${w} for type ${t} is not adjacent`)
  }
}

// Types
for (let t = 1; t <= 9; t++) {
  const data = TYPES[t]
  assert.ok(data, `Missing TYPES entry for ${t}`)
  assert.ok(data.name, `Missing name for type ${t}`)
  assert.ok(data.growthParagraph, `Missing growth paragraph for type ${t}`)
  assert.ok(data.stressParagraph, `Missing stress paragraph for type ${t}`)
  assert.ok(data.bibleVerse?.reference, `Missing verse reference for type ${t}`)
  assert.ok(data.bibleVerse?.text, `Missing verse text for type ${t}`)
}

// Type+wing: 18 entries, all keys valid
const expectedKeys = []
for (let t = 1; t <= 9; t++) {
  for (const w of WING_OPTIONS[t]) expectedKeys.push(`${t}w${w}`)
}
assert.equal(expectedKeys.length, 18)
for (const k of expectedKeys) {
  const data = TYPE_WINGS[k]
  assert.ok(data, `Missing TYPE_WINGS entry for ${k}`)
  assert.ok(data.subtitle, `Missing subtitle for ${k}`)
  assert.ok(data.coreDescription, `Missing coreDescription for ${k}`)
  assert.ok(Array.isArray(data.strengths) && data.strengths.length >= 3, `Need 3+ strengths for ${k}`)
  assert.ok(Array.isArray(data.blindSpots) && data.blindSpots.length >= 3, `Need 3+ blindSpots for ${k}`)
  assert.ok(data.businessStyle, `Missing businessStyle for ${k}`)
}

// Interstitials
assert.equal(INTERSTITIALS.length, 7, `Expected 7 interstitials, got ${INTERSTITIALS.length}`)

console.log('✅ All Enneagram data checks passed.')
