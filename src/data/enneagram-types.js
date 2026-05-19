// src/data/enneagram-types.js
//
// Three exports:
//   TYPES         — per-type data (9 entries) keyed by typeId 1..9
//   TYPE_WINGS    — per-type+wing data (18 entries) keyed by `${typeId}w${wingId}`
//   ARROWS        — canonical growth + stress lookup keyed by typeId

export const ARROWS = {
  1: { growth: 7, stress: 4 },
  2: { growth: 4, stress: 8 },
  3: { growth: 6, stress: 9 },
  4: { growth: 1, stress: 2 },
  5: { growth: 8, stress: 7 },
  6: { growth: 9, stress: 3 },
  7: { growth: 5, stress: 1 },
  8: { growth: 2, stress: 5 },
  9: { growth: 3, stress: 6 },
}

// Wing options per type (the two adjacent types on the Enneagram circle)
export const WING_OPTIONS = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
}

// Per-type data — shared by both wings of that type
export const TYPES = {
  1: {
    name: 'The Reformer',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 1',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 1',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  2: {
    name: 'The Helper',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 2',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 2',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  3: {
    name: 'The Achiever',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 3',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 3',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  4: {
    name: 'The Individualist',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 4',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 4',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  5: {
    name: 'The Investigator',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 5',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 5',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  6: {
    name: 'The Loyalist',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 6',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 6',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  7: {
    name: 'The Enthusiast',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 7',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 7',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  8: {
    name: 'The Challenger',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 8',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 8',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
  9: {
    name: 'The Peacemaker',
    growthParagraph: 'PLACEHOLDER growth paragraph for type 9',
    stressParagraph: 'PLACEHOLDER stress paragraph for type 9',
    bibleVerse: { reference: 'PLACEHOLDER', text: 'PLACEHOLDER' },
  },
}

// Per-type+wing data — what's unique to each of the 18 combinations
// Keys: '1w9', '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5',
//       '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9',
//       '9w8', '9w1'
const wingKeys = []
for (const t of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  for (const w of WING_OPTIONS[t]) wingKeys.push(`${t}w${w}`)
}

function placeholderWing(key) {
  return {
    subtitle: `PLACEHOLDER subtitle for ${key}`,
    coreDescription: `PLACEHOLDER core description for ${key}`,
    strengths: [
      `PLACEHOLDER strength 1 for ${key}`,
      `PLACEHOLDER strength 2 for ${key}`,
      `PLACEHOLDER strength 3 for ${key}`,
    ],
    blindSpots: [
      `PLACEHOLDER blind spot 1 for ${key}`,
      `PLACEHOLDER blind spot 2 for ${key}`,
      `PLACEHOLDER blind spot 3 for ${key}`,
    ],
    businessStyle: `PLACEHOLDER business style for ${key}`,
  }
}

export const TYPE_WINGS = Object.fromEntries(
  wingKeys.map((k) => [k, placeholderWing(k)])
)
