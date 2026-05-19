# Enneagram for Business Quiz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a free Enneagram-based quiz at `osilpistole.com/enneagram` that identifies a visitor's Enneagram type + wing + growth/stress directions through 72 multiple-choice statements, then generates a personalized "what to build" recommendation via a single Claude API call, and emails the full results via Resend while adding the lead to Kit.

**Architecture:** Pure client-side scoring for type/wing identification (no AI in this step). Three data files hold questions, type+wing profiles, and between-round interstitial content. A scoring library exposes pure functions for type/wing/arrows resolution. One Vercel serverless function (`api/enneagram-submit.js`) calls Claude (Haiku, with tool-use for structured output), sends Resend email, and subscribes the lead to Kit — each third-party call isolated so one failure doesn't break the others. A single large React component (`EnneagramQuiz.jsx`) manages the multi-screen state machine, matching the existing `SpiritualGiftsQuiz.jsx` pattern.

**Tech Stack:** React 18 (Vite SPA), Vercel serverless functions, Anthropic Claude API (raw `fetch`, model `claude-haiku-4-5-20251001`, tool-use for structured output), Resend REST API (raw `fetch`), Kit (ConvertKit) v3 API (raw `fetch`).

**Spec:** [`docs/superpowers/specs/2026-05-19-enneagram-for-business-quiz-design.md`](../specs/2026-05-19-enneagram-for-business-quiz-design.md)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/data/enneagram-questions.js` | Create | 72 quiz statements, 8 per type, with `typeId` mapping. Plus the 4-point Likert label list. |
| `src/data/enneagram-types.js` | Create | All per-type and per-type+wing content: subtitles (nicknames), core descriptions, strengths, blind-spots, growth + stress paragraphs, Bible verses, and the canonical arrows lookup. |
| `src/data/enneagram-interstitials.js` | Create | 7 interstitial cards (quote / fact / verse) shown between rounds 1–7. |
| `src/lib/enneagram-scoring.js` | Create | Pure scoring functions: `scoreAnswers`, `detectWing`, `pickPrimaryType` (with tiebreaker), `getArrows`, `getProfile`. |
| `src/components/EnneagramQuiz.jsx` | Create | Multi-screen state machine: intro → quiz body (8 rounds + interstitials) → email gate → 5 business questions → results. Mirrors `SpiritualGiftsQuiz.jsx` patterns. |
| `src/components/EnneagramArrowDiagram.jsx` | Create | Small custom SVG showing the growth or stress arrow between two type numbers. |
| `src/pages/EnneagramPage.jsx` | Create | Page wrapper with hero copy + mounts the quiz component. |
| `api/enneagram-submit.js` | Create | Serverless endpoint: receives answers + business answers, calls Claude with tool-use, sends Resend email, subscribes to Kit, returns result JSON. |
| `src/App.jsx` | Modify | Add `<Route path="/enneagram" element={<EnneagramPage />} />`. |
| `src/components/Header.jsx` | Modify | Add a nav link to `/enneagram` so visitors can find the quiz. |
| `scripts/verify-enneagram-data.mjs` | Create | One-off Node script that validates data integrity (each type has 8 questions, all wings adjacent, arrows complete, etc.). Run via `node scripts/verify-enneagram-data.mjs`. |
| `scripts/verify-enneagram-scoring.mjs` | Create | One-off Node script that exercises the scoring functions with sample inputs and asserts expected outputs. |

**Note on test framework:** The site has no test runner installed. Per Osil's CLAUDE.md rule "no installing packages without approval", we use Node's built-in `node:assert` via standalone scripts. These scripts are committed to the repo and runnable any time with `node scripts/...mjs`.

---

## Task 1: Scaffold the Question Bank File

**Files:**
- Create: `src/data/enneagram-questions.js`

The questions file defines the 4-point Likert labels and the 72 statements (8 per type). Each statement has a `typeId` (1–9) and a `text` string. The actual statement wording will be drafted by Claude and reviewed by Osil in Task 2 — this task creates the file structure only.

- [ ] **Step 1: Create the file with structure**

```javascript
// src/data/enneagram-questions.js
//
// 72 statements total — 8 per type, types 1–9.
// Each statement: { typeId: 1..9, text: string }
//
// Likert mapping (used for both UI labels and scoring weights):
//   Not me   = 0
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/data/enneagram-questions.js
git commit -m "feat(enneagram): scaffold questions data file with placeholders"
```

---

## Task 2: Draft + Review the 72 Question Statements

**Files:**
- Modify: `src/data/enneagram-questions.js` (replace placeholders with real text)

Replace each `PLACEHOLDER X-Y` with a real first-person statement that probes Type X. Each statement should be one short sentence, in Osil's voice (warm, plain, direct, no jargon), phrased so a person can rate "how true is this for me." Reference: `osil_brand_voice.md` memory + the SpiritualGiftsQuiz statements as tone examples.

- [ ] **Step 1: Draft all 72 statements**

Replace placeholders in `src/data/enneagram-questions.js`. Each statement:
- One sentence, ~10–18 words
- First-person, present tense ("I tend to…", "I often…")
- Probes a behavior, motivation, or fear specific to that type — not a label
- Avoids jargon ("perfectionist", "achiever") that would tip off the test

Tone reference (existing 5-Fold + Spiritual Gifts quizzes):
> "I love studying Scripture deeply and understanding how it all connects."
> "I notice when someone is emotionally struggling even if they are hiding it."

Type-by-type theme reference:
- **Type 1** — rightness, integrity, the inner critic, "should/ought", control of error
- **Type 2** — being needed, helping, hidden hunger for love, reading what others want
- **Type 3** — image, achievement, performance, what success looks like to others
- **Type 4** — identity, longing, distinctness, "what's missing from me"
- **Type 5** — observation, withdrawal, gathering knowledge, conserving energy
- **Type 6** — anticipating threat, loyalty, doubt, looking for the trapdoor
- **Type 7** — optionality, escape from pain, plans, novelty
- **Type 8** — autonomy, protection of others, controlled environment, against vulnerability
- **Type 9** — peace at any price, merging with others, low-grade sleepiness, withholding self

- [ ] **Step 2: Have Osil review the 72 statements**

Show Osil the full file. Iterate based on her voice corrections. Don't move on until she approves.

- [ ] **Step 3: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/data/enneagram-questions.js
git commit -m "feat(enneagram): draft 72 quiz statements"
```

---

## Task 3: Scaffold the Types Data File

**Files:**
- Create: `src/data/enneagram-types.js`

This file holds everything about each type (9 entries) and each type+wing (18 entries): subtitles, descriptions, strengths, blind-spots, growth/stress paragraphs, Bible verses, and the canonical growth/stress arrow map.

- [ ] **Step 1: Create the file with structure**

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/data/enneagram-types.js
git commit -m "feat(enneagram): scaffold types + wings data file with placeholders"
```

---

## Task 4: Draft Type + Wing Profiles

**Files:**
- Modify: `src/data/enneagram-types.js`

Replace placeholders with real content. Drafts go in the file directly; Osil reviews and edits in place.

- [ ] **Step 1: Draft per-type content (TYPES) — 9 entries**

For each type 1–9, fill in:
- `growthParagraph` — 80–120 words on what this type looks like when healthy (moving toward their growth arrow). Use the growth target type as a hint (e.g., Type 4 → growth 1, so "When healthy, you take on the steadiness and self-discipline of Type 1…").
- `stressParagraph` — 80–120 words on what they look like under pressure (moving to stress arrow).
- `bibleVerse` — one verse + reference fitting that type's spiritual journey. Choose translations Osil prefers (likely ESV or NIV — confirm with her).

- [ ] **Step 2: Draft per-type+wing content (TYPE_WINGS) — 18 entries**

For each of the 18 keys (`1w9`, `1w2`, `2w1`, …, `9w1`), fill in:
- `subtitle` — short nickname, ~3–5 words ("The Romantic Achiever" for 4w3)
- `coreDescription` — 150–200 words capturing who they are at their core, with specific business-relevant framing
- `strengths` — 3–4 bullet strings describing business strengths
- `blindSpots` — 3–4 bullet strings, framed kindly
- `businessStyle` — 60–80 words on their natural way of building, leading, selling

- [ ] **Step 3: Osil review pass**

Send the file to Osil for voice corrections. Iterate. Do not move on until approved.

- [ ] **Step 4: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/data/enneagram-types.js
git commit -m "feat(enneagram): draft type + wing profiles, arrows, verses"
```

---

## Task 5: Create the Interstitials File

**Files:**
- Create: `src/data/enneagram-interstitials.js`

Seven cards shown between quiz rounds 1–7. Mix of three kinds: short Enneagram-related quotes, "did you know" facts, and Bible verses.

- [ ] **Step 1: Create the file with 7 interstitials drafted**

```javascript
// src/data/enneagram-interstitials.js
//
// Shown between quiz rounds 1–7 (7 interstitials, one between each pair of rounds).
// Round 8 ends straight into the email gate — no interstitial after it.
//
// Each entry: { kind: 'quote' | 'fact' | 'verse', text: string, attribution?: string }

export const INTERSTITIALS = [
  {
    kind: 'fact',
    text: 'The Enneagram is not a personality "box" — it is a map of how you survive, and how you grow. Your type is your starting point, not your ceiling.',
  },
  {
    kind: 'verse',
    text: 'For You formed my inward parts; You wove me in my mother\'s womb. I will give thanks to You, for I am fearfully and wonderfully made.',
    attribution: 'Psalm 139:13–14',
  },
  {
    kind: 'fact',
    text: 'Every person has all 9 types inside them. Your dominant type is the one whose strategies you reach for first — under stress, by habit, when no one is looking.',
  },
  {
    kind: 'quote',
    text: 'You can\'t become who you are meant to be by ignoring who you actually are.',
    attribution: 'Osil Pistole',
  },
  {
    kind: 'fact',
    text: 'Your wing shapes the flavor of your type. Two Type 4s with different wings can look very different in business — a 4w3 leans achievement-forward, a 4w5 leans contemplative.',
  },
  {
    kind: 'verse',
    text: 'For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand so that we would walk in them.',
    attribution: 'Ephesians 2:10',
  },
  {
    kind: 'fact',
    text: 'Almost there — just one round left. The next questions will round out your picture, then we\'ll show you who you are and what to build.',
  },
]
```

- [ ] **Step 2: Osil review**

She may want to swap verses or rewrite the quote attributed to her.

- [ ] **Step 3: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/data/enneagram-interstitials.js
git commit -m "feat(enneagram): add round-interstitial cards"
```

---

## Task 6: Write the Scoring Library

**Files:**
- Create: `src/lib/enneagram-scoring.js`

Pure functions, no DOM, no React. Easy to test from a Node script.

- [ ] **Step 1: Create the file**

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/lib/enneagram-scoring.js
git commit -m "feat(enneagram): add scoring library (pure functions)"
```

---

## Task 7: Write Data + Scoring Verification Scripts

**Files:**
- Create: `scripts/verify-enneagram-data.mjs`
- Create: `scripts/verify-enneagram-scoring.mjs`

Two small Node scripts using `node:assert`. These give us a verifiable "did I get the data right?" without installing a test framework.

- [ ] **Step 1: Create the data-verification script**

```javascript
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
```

- [ ] **Step 2: Run the data script — expect ✅**

```bash
cd /Users/osilpistole/osilpistole.com
node scripts/verify-enneagram-data.mjs
```

Expected output: `✅ All Enneagram data checks passed.`

If anything fails, fix the data file and rerun.

- [ ] **Step 3: Create the scoring-verification script**

```javascript
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
const flatAnswers = QUESTIONS.map((q) => 2) // every type gets Often → all tied at 16
const flatScores = scoreAnswers(flatAnswers)
const flatCands = getFlatCandidates(flatScores, 1, 2, 3)
assert.equal(flatCands.length, 3)

console.log('✅ All Enneagram scoring checks passed.')
```

- [ ] **Step 4: Run the scoring script — expect ✅**

```bash
cd /Users/osilpistole/osilpistole.com
node scripts/verify-enneagram-scoring.mjs
```

- [ ] **Step 5: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add scripts/verify-enneagram-data.mjs scripts/verify-enneagram-scoring.mjs
git commit -m "feat(enneagram): add data + scoring verification scripts"
```

---

## Task 8: Build the EnneagramArrowDiagram Component

**Files:**
- Create: `src/components/EnneagramArrowDiagram.jsx`

A small SVG that shows a directional arrow from one type number to another. Used in the growth + stress sections of the results page.

- [ ] **Step 1: Create the component**

```jsx
// src/components/EnneagramArrowDiagram.jsx
//
// Renders a minimal SVG showing a labeled arrow:  [from] ──→ [to]
// Used in growth/stress sections on the results page.

export default function EnneagramArrowDiagram({ from, to, label, accent = '#F5C842' }) {
  return (
    <div
      role="img"
      aria-label={`${label}: arrow from Type ${from} to Type ${to}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, margin: '12px 0 20px' }}
    >
      <Bubble n={from} accent={accent} />
      <svg width="80" height="32" viewBox="0 0 80 32" aria-hidden="true">
        <line x1="2" y1="16" x2="64" y2="16" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <polyline
          points="56,8 70,16 56,24"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Bubble n={to} accent={accent} />
    </div>
  )
}

function Bubble({ n, accent }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: accent,
        color: '#2c2c2a',
        display: 'grid',
        placeItems: 'center',
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramArrowDiagram.jsx
git commit -m "feat(enneagram): add minimal arrow diagram component"
```

---

## Task 9: Build the EnneagramQuiz Component — Skeleton + Intro

**Files:**
- Create: `src/components/EnneagramQuiz.jsx`

A state-machine component with screens: `intro` → `quiz` → `interstitial` → `quiz` → … → `email` → `business` → `submitting` → `results`. Built incrementally — this task adds the skeleton + intro screen only.

- [ ] **Step 1: Create the file**

```jsx
// src/components/EnneagramQuiz.jsx
//
// Multi-screen state machine for the Enneagram for Business Quiz.
// Mirrors the structure of SpiritualGiftsQuiz.jsx.
//
// Screens: intro → quiz → interstitial → … → email → business → submitting → results

import { useState, useMemo } from 'react'
import { QUESTIONS, LIKERT_LABELS } from '../data/enneagram-questions.js'
import { INTERSTITIALS } from '../data/enneagram-interstitials.js'
import {
  scoreAnswers,
  pickPrimaryType,
  detectWing,
  getArrows,
} from '../lib/enneagram-scoring.js'

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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramQuiz.jsx
git commit -m "feat(enneagram): add quiz component skeleton + intro screen"
```

---

## Task 10: Add the Quiz + Interstitial Screens

**Files:**
- Modify: `src/components/EnneagramQuiz.jsx`

Add the round-based question display, answer tracking, and interstitial cards between rounds.

- [ ] **Step 1: Wire up the quiz state**

In `EnneagramQuiz`, replace the body with:

```jsx
export default function EnneagramQuiz() {
  const [screen, setScreen] = useState('intro')
  const [roundIndex, setRoundIndex] = useState(0)         // 0..7
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null))

  // Compute shuffled question order ONCE per session (stable for retake fairness during a session).
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
```

- [ ] **Step 2: Add the QuizScreen component**

Add this below `IntroScreen`:

```jsx
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

const likertBtn = {
  padding: '10px 16px', background: '#fff', border: '1.5px solid rgba(44,44,42,0.2)',
  borderRadius: 8, fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600,
  color: '#2c2c2a', cursor: 'pointer',
}
const likertBtnSelected = { ...likertBtn, background: '#F5C842', borderColor: '#F5C842' }
```

- [ ] **Step 3: Add the InterstitialScreen component**

```jsx
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
```

- [ ] **Step 4: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramQuiz.jsx
git commit -m "feat(enneagram): add quiz round + interstitial screens"
```

---

## Task 11: Add Email Gate + Business Questions Screens

**Files:**
- Modify: `src/components/EnneagramQuiz.jsx`

The email gate is the moment we collect lead info. After that, 5 business multiple-choice questions feed the AI.

- [ ] **Step 1: Define the business questions constant**

Add near the top of the file, after the imports:

```jsx
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
    label: 'What format do you naturally lean toward?',
    options: ['1:1', 'Group', 'E-course', 'Membership', 'Live event', 'Not sure yet'],
  },
  {
    id: 'income',
    label: 'What\'s your primary income goal from this?',
    options: ['Side income', 'Supplement my main work', 'Replace my current income', 'Kingdom flexibility, no fixed number'],
  },
]
```

- [ ] **Step 2: Extend top-level state**

Replace the top-level state hooks in `EnneagramQuiz` with:

```jsx
const [screen, setScreen] = useState('intro')
const [roundIndex, setRoundIndex] = useState(0)
const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null))
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [businessAnswers, setBusinessAnswers] = useState({})
const [submitting, setSubmitting] = useState(false)
const [submitError, setSubmitError] = useState('')
const [result, setResult] = useState(null) // populated after /api/enneagram-submit returns
```

- [ ] **Step 3: Add EmailGateScreen branching**

In the screen switch, add:

```jsx
if (screen === 'email') {
  return (
    <EmailGateScreen
      name={name}
      email={email}
      onName={setName}
      onEmail={setEmail}
      onContinue={() => setScreen('business')}
    />
  )
}

if (screen === 'business') {
  return (
    <BusinessQuestionsScreen
      answers={businessAnswers}
      onAnswer={(id, value) => setBusinessAnswers((prev) => ({ ...prev, [id]: value }))}
      onSubmit={async () => {
        setSubmitting(true)
        setSubmitError('')
        try {
          const payload = buildSubmitPayload({ answers, businessAnswers, name, email })
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
```

- [ ] **Step 4: Define the helper + the two screens**

Add at the bottom of the file:

```jsx
function buildSubmitPayload({ answers, businessAnswers, name, email }) {
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
    answers,
    businessAnswers,
    derived: { scores, primaryType: primary, wing, arrows, candidates, tieOccurred },
  }
}

function EmailGateScreen({ name, email, onName, onEmail, onContinue }) {
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
      <button
        onClick={onContinue}
        disabled={!valid}
        style={{ ...primaryBtn, marginTop: 12, opacity: valid ? 1 : 0.5, cursor: valid ? 'pointer' : 'not-allowed' }}
      >
        Continue →
      </button>
    </section>
  )
}

function BusinessQuestionsScreen({ answers, onAnswer, onSubmit, submitting, submitError }) {
  const allAnswered = BUSINESS_QUESTIONS.every((q) => answers[q.id])
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
              const selected = answers[q.id] === opt
              return (
                <button key={opt} onClick={() => onAnswer(q.id, opt)} style={selected ? likertBtnSelected : likertBtn}>
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

const fieldLabel = {
  display: 'block', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
  textTransform: 'uppercase', color: 'rgba(44,44,42,0.65)', marginBottom: 6, marginTop: 12,
  fontFamily: "'Sora', sans-serif",
}
const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1.5px solid rgba(44,44,42,0.2)',
  borderRadius: 8, fontSize: 16, fontFamily: 'inherit', color: '#2c2c2a',
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramQuiz.jsx
git commit -m "feat(enneagram): add email gate + business questions screens"
```

---

## Task 12: Add the Results Screen

**Files:**
- Modify: `src/components/EnneagramQuiz.jsx`

The results screen renders type + wing + arrows from the pre-written content, plus the AI recommendation card returned from the API.

- [ ] **Step 1: Add results branch in the screen switch**

```jsx
if (screen === 'results') {
  return <ResultsScreen name={name} result={result} />
}
```

- [ ] **Step 2: Add the ResultsScreen component**

```jsx
import EnneagramArrowDiagram from './EnneagramArrowDiagram.jsx'
import { TYPES, TYPE_WINGS } from '../data/enneagram-types.js'

function ResultsScreen({ name, result }) {
  // result shape: { primaryType, wing, arrows, recommendation: { ... } | null, aiFailed: bool }
  const { primaryType, wing, arrows, recommendation, aiFailed } = result
  const typeKey = `${primaryType}w${wing}`
  const typeData = TYPES[primaryType]
  const wingData = TYPE_WINGS[typeKey]

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
        <a href="/coaching" style={primaryAnchor}>Book a Prophetic Strategy Session →</a>
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
    ['Your first step this week', rec.firstStep],
    ['Watch out for', rec.watchOutFor],
  ]
  return (
    <div>
      {rows.map(([label, value]) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a37e00', margin: '0 0 4px' }}>{label}</p>
          <p style={{ ...prose, margin: 0 }}>{value}</p>
        </div>
      ))}
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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramQuiz.jsx
git commit -m "feat(enneagram): add results screen with arrows + AI card"
```

---

## Task 13: Create the EnneagramPage Wrapper

**Files:**
- Create: `src/pages/EnneagramPage.jsx`

Page wrapper — mounts the quiz component and sets the document title.

- [ ] **Step 1: Create the file**

```jsx
// src/pages/EnneagramPage.jsx
import { useEffect } from 'react'
import EnneagramQuiz from '../components/EnneagramQuiz.jsx'

export default function EnneagramPage() {
  useEffect(() => {
    document.title = 'The Enneagram for Business Quiz · Osil Pistole'
  }, [])

  return <EnneagramQuiz />
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/pages/EnneagramPage.jsx
git commit -m "feat(enneagram): add page wrapper"
```

---

## Task 14: Register the Route + Nav Link

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`

- [ ] **Step 1: Add route to App.jsx**

Open `src/App.jsx` and add the import + route:

```jsx
import EnneagramPage from './pages/EnneagramPage'
```

Then inside the `<Routes>` block (the main one with `<SiteLayout />`), add this line right after the `/fivefold` route:

```jsx
<Route path="/enneagram" element={<EnneagramPage />} />
```

- [ ] **Step 2: Add nav link in Header.jsx**

Open `src/components/Header.jsx`, find where the existing quiz links live (`/spiritual-gifts`, `/fivefold`), and add a sibling link to `/enneagram` with the text "Enneagram Quiz". Match the existing link styling exactly.

- [ ] **Step 3: Start the dev server and verify**

```bash
cd /Users/osilpistole/osilpistole.com
npm run dev
```

Open the printed URL (usually `http://localhost:5173/enneagram`) and confirm:
- The intro screen renders
- Clicking "Start the quiz →" advances to round 1
- Round 1 shows 9 statements
- Selecting all 9 enables "Continue →"
- "Continue →" advances to the first interstitial
- "Continue →" on the interstitial advances to round 2
- This pattern continues through all 8 rounds
- After round 8, you land on the email gate
- Entering name + a valid email, clicking Continue, lands on the business questions
- Selecting all 5 business questions enables "See my results →"

(Submitting from the business questions WILL fail at this point — the API doesn't exist yet. That's expected. We'll wire it up in Task 16.)

- [ ] **Step 4: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/App.jsx src/components/Header.jsx
git commit -m "feat(enneagram): wire route + nav link"
```

---

## Task 15: Stub the API Endpoint

**Files:**
- Create: `api/enneagram-submit.js`

Stub that accepts a POST and returns mock recommendation data. We wire the real Anthropic/Resend/Kit calls in Task 16 once we've confirmed the end-to-end shape works.

- [ ] **Step 1: Create the file**

```javascript
// api/enneagram-submit.js
//
// Vercel serverless function. Receives the quiz submission and returns
// the result envelope. Stubbed for now — Task 16 replaces the stub with
// real Anthropic, Resend, and Kit calls.

export const maxDuration = 30

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, derived } = req.body || {}
  if (!name || !email || !derived) {
    return res.status(400).json({ error: 'Missing name, email, or derived' })
  }

  // Mock recommendation — replaced by real Claude call in Task 16
  const recommendation = {
    whatToBuild: 'A small group cohort that meets weekly for 6 weeks.',
    whyItFits: `Your Type ${derived.primaryType}w${derived.wing} energy thrives when there's structure plus real connection.`,
    format: 'Group',
    scale: 'Intimate (8–12 people)',
    firstStep: 'Pick a date 6 weeks from now and write the outcome statement.',
    watchOutFor: 'The temptation to over-prepare instead of opening enrollment.',
  }

  return res.status(200).json({
    primaryType: derived.primaryType,
    wing: derived.wing,
    arrows: derived.arrows,
    recommendation,
    aiFailed: false,
  })
}
```

- [ ] **Step 2: Restart the dev server (Vercel CLI mode) and test end-to-end**

```bash
cd /Users/osilpistole/osilpistole.com
# Kill any running `npm run dev`, then:
vercel dev
```

In the browser, complete the quiz. After business questions, you should land on the results screen showing the mock recommendation, your detected type+wing, and the pre-written content.

- [ ] **Step 3: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add api/enneagram-submit.js
git commit -m "feat(enneagram): stub submit endpoint with mock recommendation"
```

---

## Task 16: Wire Up Anthropic + Resend + Kit

**Files:**
- Modify: `api/enneagram-submit.js`

Replace the stub with real third-party calls. Each call is isolated — failure in one does not break the others.

- [ ] **Step 1: Replace the file with the full implementation**

```javascript
// api/enneagram-submit.js
//
// Vercel serverless function: receives quiz answers + business answers,
// calls Claude (Haiku) for the personalized recommendation, sends the
// full results via Resend, subscribes the lead to Kit, returns the
// result envelope to the browser.

import { TYPES, TYPE_WINGS } from '../src/data/enneagram-types.js'

export const maxDuration = 30

const RESPONSE_TOOL = {
  name: 'send_recommendation',
  description: 'Send the personalized build recommendation back to the user.',
  input_schema: {
    type: 'object',
    properties: {
      whatToBuild:    { type: 'string', description: '1–2 sentence specific recommendation.' },
      whyItFits:      { type: 'string', description: '2–3 sentences tying to type, wing, growth direction.' },
      format:         { type: 'string', enum: ['1:1', 'Group', 'E-course', 'Membership', 'Workshop', 'Hybrid'] },
      scale:          { type: 'string', enum: ['Intimate', 'Small group', 'Wider reach'] },
      firstStep:      { type: 'string', description: 'One concrete action this week.' },
      watchOutFor:    { type: 'string', description: 'A shadow warning rooted in their stress direction.' },
    },
    required: ['whatToBuild', 'whyItFits', 'format', 'scale', 'firstStep', 'watchOutFor'],
  },
}

function buildSystemPrompt({ primaryType, wing, arrows, profile }) {
  return [
    'You are Osil Pistole, a coach and consultant for faith-based leaders, ministers, coaches, and online business owners. You help them figure out what to build that fits how they are wired.',
    '',
    'Voice: warm, plain, direct, faith-friendly. No jargon, no MBA-speak, no buzzwords. Talk like a trusted mentor who has seen this before.',
    '',
    `The person you are advising is an Enneagram Type ${primaryType} with a ${wing} wing.`,
    `Subtitle: "${profile.subtitle}"`,
    `Core description: ${profile.coreDescription}`,
    `Their business style: ${profile.businessStyle}`,
    `When healthy, they move toward Type ${arrows.growth}. When stressed, they slip into Type ${arrows.stress}.`,
    '',
    'Based on their type AND their business answers below, recommend ONE specific thing to build, the format and scale that fit their season, one concrete first step they can take this week, and one watch-out rooted in their stress direction.',
    '',
    'Be specific. Avoid hedging. The recommendation should feel like it could only have been written for this person.',
    'Always use the send_recommendation tool to respond.',
  ].join('\n')
}

async function callClaude(payload, retries = 2) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const err = await response.text()
    if (retries > 0 && (response.status === 529 || response.status === 500)) {
      await new Promise((r) => setTimeout(r, 2000))
      return callClaude(payload, retries - 1)
    }
    throw new Error(`Anthropic ${response.status}: ${err}`)
  }
  return response.json()
}

async function generateRecommendation({ primaryType, wing, arrows, businessAnswers }) {
  const profile = TYPE_WINGS[`${primaryType}w${wing}`]
  if (!profile) throw new Error(`Missing profile data for ${primaryType}w${wing}`)

  const systemPrompt = buildSystemPrompt({ primaryType, wing, arrows, profile })

  const userMessage = [
    'Here are my answers about my current business season:',
    ...Object.entries(businessAnswers).map(([k, v]) => `- ${k}: ${v}`),
    '',
    'Please send me my personalized recommendation now.',
  ].join('\n')

  const data = await callClaude({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
    tools: [RESPONSE_TOOL],
    tool_choice: { type: 'tool', name: 'send_recommendation' },
  })

  const tool = data.content?.find((b) => b.type === 'tool_use' && b.name === 'send_recommendation')
  if (!tool) throw new Error('Claude did not return a tool_use block')
  return tool.input
}

async function sendResendEmail({ name, email, primaryType, wing, recommendation, typeData, wingData, arrows }) {
  if (!process.env.RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY')
  const html = buildEmailHtml({ name, primaryType, wing, recommendation, typeData, wingData, arrows })
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Osil Pistole <osil@osilpistole.com>',
      to: [email],
      subject: `You're a Type ${primaryType}w${wing} — here's what to build, ${name}`,
      html,
    }),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

function buildEmailHtml({ name, primaryType, wing, recommendation, typeData, wingData, arrows }) {
  const recHtml = recommendation
    ? `
      <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:32px 0 12px;">Your personalized recommendation</h2>
      ${buildRecRow('What to build', recommendation.whatToBuild)}
      ${buildRecRow('Why this fits who you are', recommendation.whyItFits)}
      ${buildRecRow('Recommended format', recommendation.format)}
      ${buildRecRow('Scale that fits your season', recommendation.scale)}
      ${buildRecRow('Your first step this week', recommendation.firstStep)}
      ${buildRecRow('Watch out for', recommendation.watchOutFor)}
    `
    : `<p><em>Your custom recommendation couldn't be generated this time — Osil will be in touch.</em></p>`

  return `<!doctype html><html><body style="font-family:Georgia,serif;color:#2c2c2a;max-width:640px;margin:0 auto;padding:24px;line-height:1.6;">
    <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#a37e00;">${name}, your type is</p>
    <h1 style="font-family:Sora,sans-serif;font-size:32px;margin:8px 0 4px;">Type ${primaryType}w${wing}</h1>
    <p style="color:rgba(44,44,42,0.7);margin:0 0 24px;">${wingData.subtitle}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Who you are at your core</h2>
    <p>${wingData.coreDescription}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Your gifts in business</h2>
    <ul>${wingData.strengths.map((s) => `<li>${s}</li>`).join('')}</ul>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Your shadow side to watch</h2>
    <ul>${wingData.blindSpots.map((s) => `<li>${s}</li>`).join('')}</ul>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">When you're healthy (growth → Type ${arrows.growth})</h2>
    <p>${typeData.growthParagraph}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">When you're stressed (stress → Type ${arrows.stress})</h2>
    <p>${typeData.stressParagraph}</p>
    ${recHtml}
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:32px 0 8px;">A word for you</h2>
    <blockquote style="border-left:3px solid #F5C842;padding-left:16px;margin:0;font-style:italic;">
      "${typeData.bibleVerse.text}"
      <footer style="margin-top:4px;font-style:normal;font-size:13px;color:rgba(44,44,42,0.6);">— ${typeData.bibleVerse.reference}</footer>
    </blockquote>
    <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
    <p style="text-align:center;">Want to talk through this with me?<br/><a href="https://osilpistole.com/coaching">Book a Prophetic Strategy Session →</a></p>
  </body></html>`
}

function buildRecRow(label, value) {
  return `<p style="margin:0 0 14px;"><strong style="font-family:Sora,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#a37e00;display:block;">${label}</strong>${value}</p>`
}

async function subscribeToKit({ name, email }) {
  if (!process.env.KIT_API_KEY) throw new Error('Missing KIT_API_KEY')
  if (!process.env.KIT_QUIZ_FORM_ID_Enneagram) throw new Error('Missing KIT_QUIZ_FORM_ID_Enneagram')
  const formId = process.env.KIT_QUIZ_FORM_ID_Enneagram
  const r = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email, first_name: name }),
  })
  if (!r.ok) throw new Error(`Kit ${r.status}: ${await r.text()}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, businessAnswers, derived } = req.body || {}
  if (!name || !email || !businessAnswers || !derived) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  const { primaryType, wing, arrows } = derived

  // Isolated calls — log + swallow individual failures so one bad call doesn't break the others
  let recommendation = null
  let aiFailed = false
  try {
    recommendation = await generateRecommendation({ primaryType, wing, arrows, businessAnswers })
  } catch (err) {
    console.error('enneagram-submit Anthropic error:', err.message)
    aiFailed = true
  }

  const typeData = TYPES[primaryType]
  const wingData = TYPE_WINGS[`${primaryType}w${wing}`]

  // Resend + Kit are best-effort — failures are logged but do not break the response
  try {
    await sendResendEmail({ name, email, primaryType, wing, recommendation, typeData, wingData, arrows })
  } catch (err) {
    console.error('enneagram-submit Resend error:', err.message)
  }
  try {
    await subscribeToKit({ name, email })
  } catch (err) {
    console.error('enneagram-submit Kit error:', err.message)
  }

  return res.status(200).json({ primaryType, wing, arrows, recommendation, aiFailed })
}
```

- [ ] **Step 2: Add the new env var on Vercel (Osil task)**

Tell Osil to:
1. Open Kit → create a new form titled "Enneagram for Business Quiz"
2. Copy the form ID
3. Reply with the form ID

When she replies, add it to Vercel:

```bash
cd /Users/osilpistole/osilpistole.com
printf '%s' "<FORM_ID>" | vercel env add KIT_QUIZ_FORM_ID_Enneagram production
printf '%s' "<FORM_ID>" | vercel env add KIT_QUIZ_FORM_ID_Enneagram preview
```

- [ ] **Step 3: Test end-to-end locally with `vercel dev`**

```bash
cd /Users/osilpistole/osilpistole.com
vercel env pull .env.local   # Pull all env vars locally for `vercel dev`
vercel dev
```

Walk through the full quiz. Verify on the results screen:
- The type + wing match what you expect from your answers
- The growth + stress arrow diagrams render
- A real AI-generated recommendation card appears
- Check inbox: the Resend email arrived

If Resend or Kit fails, that's OK at this point — those just need env vars in prod. The page should still render the AI card from Claude.

- [ ] **Step 4: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add api/enneagram-submit.js
git commit -m "feat(enneagram): wire real Anthropic + Resend + Kit calls"
```

---

## Task 17: Visual + Mobile Polish

**Files:**
- Modify: `src/components/EnneagramQuiz.jsx` (visual tweaks only)

Spot-check the visual design against the rest of the site. No new features.

- [ ] **Step 1: Compare side-by-side with Spiritual Gifts quiz**

Open `http://localhost:5173/spiritual-gifts` and `http://localhost:5173/enneagram` in two browser tabs. Confirm:
- Heading sizes match
- Button styling matches
- Color palette matches
- Spacing/padding feels consistent

Tweak inline styles in `EnneagramQuiz.jsx` as needed.

- [ ] **Step 2: Mobile check via Playwright**

```bash
cd /Users/osilpistole/osilpistole.com
vercel dev
```

Then in the Claude Code session, use Playwright to load `http://localhost:3000/enneagram` at mobile viewport (`browser_resize` to 390×844). Walk through:
- Intro screen reads cleanly
- Round 1 questions stack vertically
- Likert buttons wrap to multiple lines without overflowing
- Email gate fields are tap-sized
- Business questions render
- Results screen is scrollable and the AI card is readable

Tweak styles for any overflow or unreadable areas.

- [ ] **Step 3: Commit**

```bash
cd /Users/osilpistole/osilpistole.com
git add src/components/EnneagramQuiz.jsx
git commit -m "style(enneagram): mobile + cross-quiz visual consistency"
```

---

## Task 18: Run `/review`, Then Deploy to Production

**Files:** None (process step).

- [ ] **Step 1: Run `/review` on the staged + recent changes**

In Claude Code, run `/review`. Address any issues it raises before deploying.

- [ ] **Step 2: Confirm `KIT_QUIZ_FORM_ID_Enneagram` is set in Vercel production**

```bash
cd /Users/osilpistole/osilpistole.com
vercel env ls 2>&1 | grep Enneagram
```

Expected to see the env var listed under Production.

- [ ] **Step 3: Deploy (only after Osil's explicit approval per her CLAUDE.md)**

```bash
cd /Users/osilpistole/osilpistole.com
vercel --prod --yes
```

Wait for "● Ready".

- [ ] **Step 4: Live end-to-end test**

In Claude Code, drive Playwright to `https://www.osilpistole.com/enneagram` and complete a full quiz run. Confirm:
- All screens render
- Submit lands on the results page with an AI recommendation
- Email arrives at the test address
- Lead appears in Kit (Osil verifies)

- [ ] **Step 5: Commit any final tweaks made during live testing**

```bash
cd /Users/osilpistole/osilpistole.com
git add -p   # stage selectively
git commit -m "chore(enneagram): post-deploy polish"
```

---

## Definition of Done (per Osil's CLAUDE.md)

A task is done when:
1. ✅ Behavior matches the spec
2. ✅ No console or terminal errors
3. ✅ `/review` passed
4. ✅ Both verification scripts pass:
   - `node scripts/verify-enneagram-data.mjs`
   - `node scripts/verify-enneagram-scoring.mjs`
5. ✅ Change is committed via `/commit` (or equivalent clean commit)

---

## Open Questions to Resolve at Execution Time

These were intentionally left for during-build discussion rather than spec-time:

- **Bible translation** for the per-type verses and the Psalm 139 interstitial — confirm Osil's preferred translation (ESV vs. NIV vs. NLT) before drafting Task 4.
- **Nav placement** for the new `/enneagram` link in `Header.jsx` — order matters for visual hierarchy. Confirm with Osil during Task 14.
- **Anthropic API key rotation** — the key currently set on Vercel was shared in chat during the prior session. Osil intends to rotate it; verify status before deploy (Task 18).
