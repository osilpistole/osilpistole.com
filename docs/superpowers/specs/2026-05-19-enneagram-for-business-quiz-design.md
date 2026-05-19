# Design Spec: The Enneagram for Business Quiz

**Date:** 2026-05-19
**Status:** Approved — ready for implementation planning

---

## Goal

Build a free Enneagram-based assessment at `osilpistole.com/enneagram` that helps faith-based leaders, ministers, coaches, and online business owners discover the kind of business, ministry, or mentorship that fits how they are wired — based on their Enneagram type, wing, and growth/stress directions.

The point is not to put people in a box. It is to give them a clear, gracious read on who they are and what to build, so they stop forcing themselves into a model that does not fit.

The quiz is free. The result is personalized. The downstream CTA is the existing $99 Prophetic Strategy Session.

---

## Target Audience

- Faith-based leaders, ministers, and coaches
- Online business owners and course creators
- People exploring what to build but unsure of format, scale, or audience fit

---

## User Journey

1. **Landing** (`/enneagram`) → short intro, what they will discover, "Start the Quiz" CTA
2. **Quiz body** → 72 statements in 8 rounds of 9, with quote/fact/verse interstitials between rounds
3. **Email gate** → name + email required to unlock results (mirrors the Spiritual Gifts quiz pattern)
4. **Personalization step** → 5 quick multiple-choice questions about their current business season
5. **Results page** (`/enneagram/results`) → full type + wing breakdown plus an AI-generated "what to build" card
6. **Email** → Resend delivers the full results to their inbox

---

## Quiz Format

**Hybrid: multiple-choice scoring + one AI call for personalization.**

- The Enneagram type, wing, and growth/stress directions are identified by **client-side scoring** — no AI involved in figuring out the type.
- AI is used **once per quiz taker**, only for the personalized "what to build" recommendation, using their type + wing + growth direction + business answers + a pre-written profile as context.

---

## Quiz Mechanics

### Question structure

- **9 types × 8 statements = 72 total**
- Statements are **shuffled** into one master list and split into 8 rounds of 9, with a small adjacency check to ensure no two consecutive statements probe the same type.
- Between rounds 1–7, an **interstitial card** displays one of: an Enneagram quote, an Enneagram fact, or a Bible verse. Round 8 ends straight into the email gate.

### Scoring

- 4-point Likert per statement: Not me = 0, Sometimes = 1, Often = 2, Always = 3
- Max score per type: **24 points** (8 statements × 3 points)
- Primary type: the type with the highest total score
- **Tiebreaker:** if two types tie, the type with the most "Always" responses wins
- **Edge case — flat scores:** if multiple types score within 2 points of the leader, show the top 3 candidate types and ask the taker to read each description and pick the one that resonates (tritype-style fallback)

### Wing detection

- Wing = whichever of the **two adjacent types** scored higher
- Reported as `Type {X}w{Y}` (e.g., "Type 4w3")
- No additional wing-specific questions required

### Growth + stress directions (canonical lookup table)

| Type | Growth → | Stress → |
|------|---------|---------|
| 1 | 7 | 4 |
| 2 | 4 | 8 |
| 3 | 6 | 9 |
| 4 | 1 | 2 |
| 5 | 8 | 7 |
| 6 | 9 | 3 |
| 7 | 5 | 1 |
| 8 | 2 | 5 |
| 9 | 3 | 6 |

Shown on the results page as a small custom SVG arrow diagram + paragraph.

---

## AI Personalization Step

### Business questions (5 multiple-choice, ~30 seconds total)

| # | Question | Options |
|---|---|---|
| 1 | What season are you in? | Starting from scratch · Rebuilding · Scaling what's working · Pivoting |
| 2 | How many hours per week can you realistically give this? | Under 5 · 5–10 · 10–20 · 20+ |
| 3 | What does your audience look like right now? | None yet · Small but engaged · Growing list/following · Established |
| 4 | What format do you naturally lean toward? | 1:1 · Group · E-course · Membership · Live event · Not sure yet |
| 5 | What's your primary income goal from this? | Side income · Supplement my main work · Replace my current income · Kingdom flexibility, no fixed number |

### AI call

- **Model:** `claude-haiku-4-5-20251001` (same as existing AI Build Quiz)
- **One call per quiz taker** (~1,500 tokens in, ~400 tokens out)
- **Cost:** ~$0.002 per visitor
- **Structured response:** uses Claude's tool-use feature to guarantee predictable output shape (same pattern as the existing AI Build Quiz)

### AI context payload

- Their type + wing + growth direction + stress direction
- The pre-written profile for their type+wing
- Their 5 business answers
- A system prompt written in Osil's brand voice (warm, direct, faith-friendly, no jargon)

### AI output — the recommendation card

| Field | Content |
|---|---|
| What to build | 1–2 sentence specific recommendation |
| Why this fits who you are | 2–3 sentences tying to type + wing + growth direction |
| Recommended format | One of: 1:1 / Group / E-course / Membership / Workshop / Hybrid |
| Scale that fits your season | One of: Intimate / Small group / Wider reach |
| Your first step this week | One concrete action |
| Watch out for | A "shadow" warning rooted in their stress direction |

---

## Results Page Structure

Single long-scroll page at `/enneagram/results`, with the following sections in order:

1. **Hero band** — "You are a Type {X} with a {Y} Wing" + a one-line subtitle (the traditional Enneagram nickname for that type+wing combo, e.g. "The Romantic Achiever" for 4w3)
2. **Who You Are At Your Core** — pre-written, ~150–200 words per type+wing
3. **Your Gifts in Business** — 3–4 strengths bullets
4. **Your Shadow Side to Watch** — 3–4 blind-spot bullets
5. **When You're Healthy (Growth Direction)** — small arrow diagram + 1–2 paragraphs
6. **When You're Stressed** — small arrow diagram + 1–2 paragraphs
7. **Your Personalized Build Recommendation** — the AI-generated card (visually distinct, boxed, yellow accent)
8. **A Word For You** — Bible verse or blessing per type
9. **CTA band** — "Want to talk through this with me? → Book a Prophetic Strategy Session" (links to existing offer). Secondary: "Haven't taken these yet? → Spiritual Gifts Quiz · 5-Fold Quiz"
10. **Footer note** — "Your full results have been emailed to you."

### Visual design

- Matches existing site aesthetic: yellow accent, Sora typeface, B&W/warm imagery
- Mobile-first
- Custom minimal SVG for the growth/stress arrows (not the busy 9-point Enneagram circle)
- No new dependencies

---

## Data Flow

```
Browser                Server (/api/enneagram-submit)        Third parties

POST name+email+      1. Score the quiz (or accept
quiz answers+            client-scored result)
business answers ─→
                      2. Build context payload
                            │
                            ↓
                      3. Call Claude (Haiku) ───────→  Anthropic API
                                                       ←── Recommendation
                            │
                            ↓
                      4. Send results email ────────→  Resend
                                                       ←── 202 Accepted
                            │
                            ↓
                      5. Add to Kit ────────────────→  Kit/ConvertKit
                            │                           (KIT_QUIZ_FORM_ID_
                            ↓                            Enneagram)
                      6. Return full result JSON   
                            │
Render results  ←──────────┘
page
```

### New API endpoint

- `/api/enneagram-submit.js` — Vercel serverless function, follows the same pattern as existing `/api/quiz-submit.js`
- Returns the full result object so the page can render immediately

### Failure handling

Each third-party failure is isolated. One bad call does not break the experience.

| Failure | What the user sees |
|---|---|
| Anthropic call fails | Results page renders **without** the AI card + a friendly note. Email still sent. Kit still updated. |
| Resend fails | Results page renders. Kit still updated. Failure logged for retry. |
| Kit fails | Results page renders. Email still sent. Failure logged for retry. |

---

## Environment Variables

### New (must be added to Vercel)
- `KIT_QUIZ_FORM_ID_Enneagram` — Kit form ID for Enneagram leads (Osil creates this form in Kit, then provides the ID)

### Already in place (reused)
- `ANTHROPIC_API_KEY`
- `KIT_API_KEY`
- `RESEND_API_KEY`

---

## Data Storage

**V1: No database.** Quiz answers are not persisted. Lead records live in Kit (subscriber data) and in Resend (sent email logs). Inbox + Kit are the system of record.

If type-distribution analytics or lead-conversion tracking is wanted later, Supabase storage can be added in V2 without changing the V1 user-facing experience.

---

## URL + Branding

- **Quiz URL:** `/enneagram`
- **Results URL:** `/enneagram/results`
- **Page title:** "The Enneagram for Business Quiz"
- **Resend subject line:** `"You're a Type {X}w{Y} — here's what to build, {Name}"`
- **From address:** `Osil Pistole <osil@osilpistole.com>`

---

## Files Added or Modified

```
osilpistole.com/
├── api/
│   └── enneagram-submit.js         ← NEW · serverless endpoint
├── src/
│   ├── pages/
│   │   └── EnneagramPage.jsx       ← NEW · landing + wraps the quiz
│   ├── components/
│   │   └── EnneagramQuiz.jsx       ← NEW · main quiz component
│   ├── data/
│   │   ├── enneagram-questions.js  ← NEW · 72 statements + scoring map
│   │   ├── enneagram-types.js      ← NEW · 18 type+wing profiles
│   │   ├── enneagram-arrows.js     ← NEW · growth/stress lookup
│   │   └── enneagram-verses.js     ← NEW · Bible verses per type
│   └── App.jsx                     ← MODIFIED · add /enneagram routes
```

Plus one navigation link added to the existing site nav so visitors can find the quiz.

---

## Content Authoring Plan

| Content piece | Volume | Owner |
|---|---|---|
| 72 quiz statements | 72 short statements | Claude drafts → Osil edits |
| Type+wing core descriptions (incl. nickname/subtitle) | 18 (~180 words each + a one-line nickname) | Claude drafts → Osil edits |
| Strengths bullets | 18 sets × 3–4 bullets | Claude drafts → Osil edits |
| Blind-spots bullets | 18 sets × 3–4 bullets | Claude drafts → Osil edits |
| Growth paragraphs | 9 (one per type — same for both wings) | Claude drafts → Osil edits |
| Stress paragraphs | 9 (one per type) | Claude drafts → Osil edits |
| Bible verse / blessing | 9 (one per type) | Claude proposes → Osil chooses |
| AI system prompt | 1 long prompt | Claude drafts → Osil edits |
| Recommendation card prose | Generated live by Claude per visitor | Claude |

Total writing burden on Osil: review + voice-correct everything. Original draft work falls to Claude.

---

## Out of Scope for V1

- Database / analytics dashboard for type distribution
- Email nurture sequence beyond the single results email (Osil can wire this in Kit later)
- Retake-with-different-answers comparison
- Sharing results to social media
- PDF download of results
- Sub-types / instincts (sp/so/sx)
- Integrating with Spiritual Gifts / 5-Fold quiz results
- Admin dashboard

---

## Success Criteria

A working V1 ships when:
1. A visitor can complete the quiz on mobile and desktop with no console errors
2. Their type, wing, and arrows are calculated correctly per the scoring rules
3. The AI recommendation renders on the results page (or fails gracefully)
4. They receive an email from Resend with their full results
5. They are added to the Kit Enneagram form
6. The page passes `/review` and is committed via `/commit`

---

## Open Questions

None — all design questions resolved during the brainstorm.

The next phase is the implementation plan, which will break the build into ordered, testable steps.
