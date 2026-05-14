export const maxDuration = 30

const SYSTEM_PROMPT = `You are a warm, insightful business mentor helping someone figure out what course, mentorship, or workshop to build. You work alongside Osil Pistole — a coach and consultant who helps faith-based leaders, ministers, coaches, and online business owners launch their first offer.

Your job is to have a natural, encouraging conversation — one question at a time. You are genuinely curious and respond to what they actually said, not a script.

Cover these topic areas across 10–12 exchanges (you decide the order based on the conversation flow):
1. Passion — what they love teaching or talking about for hours
2. Background — what they've done, been through, or built in their life
3. Spiritual Gifts — ask if they've taken the free Spiritual Gifts Assessment at osilpistole.com/spiritual-gifts. If yes, ask their top gifts. If no, note it and move on.
4. 5-Fold Calling — ask if they've taken the free 5-Fold Ministry Assessment at osilpistole.com/fivefold. If yes, ask their primary calling. If no, note it and move on.
5. Audience — who they feel most called to help and what that person struggles with
6. Experience — have they ever taught, coached, led a group, or facilitated anything before
7. Format preference — how they want to work: course, cohort, 1:1, workshop, live event
8. Vision — what they want their life and income to look like in 1 year
9. Obstacle — what has stopped them from building something before

Rules:
- Keep responses short: 1–2 warm sentences acknowledging what they said, then one clear question
- Never ask two questions at once
- React specifically to their answer — reference what they said
- After covering all 9 topic areas (around exchange 10–12), set done to true with a warm closing message

IMPORTANT: Always respond with valid JSON and nothing else. No markdown. No explanation outside the JSON.

Format for every response:
{"message": "your response text here", "done": false}

When you have covered all topic areas:
{"message": "your warm closing message here", "done": true}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages must be an array' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' })
  }

  // Claude API requires the first message to always be from 'user'.
  // The frontend stores messages starting with the first assistant question,
  // so we always prepend the seed user turn to satisfy this requirement.
  const seed = { role: 'user', content: "I'm ready to start." }
  const messagesToSend = [seed, ...messages]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messagesToSend,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Claude API error:', err)
      return res.status(502).json({ error: 'AI service error' })
    }

    const data = await response.json()
    const raw = data.content?.[0]?.text ?? ''

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      // Claude occasionally adds markdown fences — strip and retry
      const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
      parsed = JSON.parse(cleaned)
    }

    return res.status(200).json({ message: parsed.message, done: parsed.done ?? false })
  } catch (err) {
    console.error('quiz-chat error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
