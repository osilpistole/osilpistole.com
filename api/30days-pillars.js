export const maxDuration = 45

const RESULT_PROMPT = `You are an expert content strategist who has just finished a conversation with someone about their voice, audience, message, and goals. Now distill what you learned into three things: their core message, their specific audience, and three content pillars they should build their content around.

A CONTENT PILLAR is a recurring theme that most of their content should orbit. Three pillars is the right number — enough to feel varied, few enough to feel cohesive. Each pillar should be:
- Specific to what they actually do (not generic like "mindset" or "business tips")
- Built from what they said in the conversation, not invented
- Phrased in their voice if possible
- A real *category* of content, not a single topic

Examples of good pillars:
- "Hearing God's voice in the middle of building" (for a Christian entrepreneur)
- "What no one tells you about your first 90 days as a coach" (for a coaching educator)
- "Behind the scenes of building a faith-led business" (for a vulnerable storyteller)

Examples of bad pillars (too generic):
- "Mindset"
- "Business advice"
- "Faith content"

For each pillar, write:
- A short, evocative name (5–10 words)
- A 1–2 sentence description of what content under this pillar looks like and why it works for THEIR audience

Return ONLY a valid JSON object — no markdown, no text outside the JSON.

Use this exact schema:
{
  "message": "Their core message distilled into one or two sentences. Should sound like THEM, not generic. This is the thing they keep saying, but sharpened.",
  "audience": "Specific description of who they serve. Concrete person, season, or situation. Not 'women' or 'entrepreneurs' — describe the actual human, what they're doing, what they're trying to figure out.",
  "voice_signature": "One sentence describing how their content sounds — their tone, their cadence, what makes it recognizably them.",
  "pillars": [
    {
      "name": "Pillar 1 name — evocative and specific",
      "description": "What content under this pillar looks like (1 sentence) + why it lands with their audience (1 sentence).",
      "example_post_idea": "One concrete example of a post that would live under this pillar — topic only, not full caption."
    },
    {
      "name": "Pillar 2 name",
      "description": "...",
      "example_post_idea": "..."
    },
    {
      "name": "Pillar 3 name",
      "description": "...",
      "example_post_idea": "..."
    }
  ],
  "anchor_offer": "Brief description of the offer they want to drive traffic to, in their own words.",
  "primary_goal": "The one goal they named for the next 30 days (sales, community, awareness, list growth, etc).",
  "platforms": ["Array", "of", "platforms", "they", "use"]
}`

async function callClaude(messages, retries = 3) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const messagesToSend = [
    { role: 'user', content: "I'm ready to start." },
    ...messages,
    { role: 'user', content: 'Based on what I shared, give me my message, audience, voice signature, and 3 content pillars now.' },
  ]

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: RESULT_PROMPT,
      messages: messagesToSend,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    if (retries > 0 && (response.status === 529 || response.status === 500)) {
      const delay = (4 - retries) * 2000
      await new Promise(r => setTimeout(r, delay))
      return callClaude(messages, retries - 1)
    }
    throw new Error(`Anthropic ${response.status}: ${err}`)
  }
  return response.json()
}

function extractJSON(text) {
  try { return JSON.parse(text) } catch {}
  const stripped = text.replace(/```json?\n?/gi, '').replace(/```/g, '').trim()
  try { return JSON.parse(stripped) } catch {}
  const match = stripped.match(/\{[\s\S]*\}/)
  if (match) { try { return JSON.parse(match[0]) } catch {} }
  throw new SyntaxError(`Cannot extract JSON from response`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { messages } = req.body
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' })
  }
  try {
    const data = await callClaude(messages)
    const raw = data.content?.[0]?.text ?? ''
    const result = extractJSON(raw)
    return res.status(200).json({ result })
  } catch (err) {
    console.error('30days-pillars error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
