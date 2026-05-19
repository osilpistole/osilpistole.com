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
