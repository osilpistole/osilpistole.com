export const maxDuration = 45

const RESULT_PROMPT = `You are an expert mission and positioning strategist. You have just finished a deep conversation with someone about their calling, their work, and the people they are drawn to serve. Now you will distill what you learned into three personalized mission statement options for them.

A mission statement always names three things: WHAT the person does, WHO they help, and what RESULT or transformation that person walks into.

You will write three different versions of the same core mission — each in a different voice — so they can pick the one that sounds most like them.

Voice 1 — Plain & clear
  - Direct. Literal. Easy to put on a business card or About page.
  - Format: "I [verb] [who] [how, optional] so they [result]."
  - No marketing language. No grandiose claims. No spiritual jargon.
  - Example: "I coach women in ministry through the first year of their calling so they get clarity instead of overwhelm."

Voice 2 — Punchy & sales-ready
  - Marketing-friendly. Strong verbs. Emotional payoff.
  - Could open a sales page or be the tagline on the home page.
  - Specific transformation. Vivid before-and-after.
  - Still grounded. No hype. No "transform your life" clichés.
  - Example: "I help ministry founders go from foggy to focused in their first year — without losing the holy spark that called them in the first place."

Voice 3 — Identity & calling
  - Spiritual, identity-rooted, prophetic.
  - Format: "I am called to…" or "My assignment is to…"
  - This is how ministers, the prophetically-called, and the spiritually-grounded would say it.
  - Strong but not preachy. Avoid quoting scripture directly in the statement itself.
  - Example: "I am called to walk with ministry founders in their first year, holding the space where clarity meets the call."

Rules:
  - All three options must describe the same person, the same audience, and the same transformation. They are voice variations, not strategy variations.
  - Be specific. Avoid words like "leaders," "women," "entrepreneurs" alone — name the actual person (e.g., "first-year ministry founders," "creative women starting their first business after staying home with kids," "men in their 40s rebuilding faith after deconstructing").
  - Pull from what the person actually said in the conversation. Use their language where it is strong. Do not invent backstory.
  - If their orientation is clearly ministry, lean ministry. If clearly business, lean business. If both, write it in a way that honors both.
  - The insight field should reference something specific they said about their story, authority, or experience.

Return ONLY a valid JSON object — no markdown, no text outside the JSON.

Use this exact schema:
{
  "who": "Specific description of who they help. One sentence. Concrete person, season, or situation. Not 'women' or 'entrepreneurs' — describe the actual human.",
  "what": "What they do — verb and format. Examples: 'coach 1:1', 'lead group cohorts', 'teach', 'consult', 'mentor', 'guide retreats', 'write and speak'.",
  "result": "The transformation. One sentence. What is different about that person's life, work, or faith after working with this person.",
  "options": [
    {
      "voice": "plain",
      "label": "Plain & clear",
      "statement": "The mission statement in Voice 1. Single sentence. Direct."
    },
    {
      "voice": "punchy",
      "label": "Punchy & sales-ready",
      "statement": "The mission statement in Voice 2. Single sentence. Marketing-friendly."
    },
    {
      "voice": "calling",
      "label": "Identity & calling",
      "statement": "The mission statement in Voice 3. Single sentence. Spiritual, identity-rooted."
    }
  ],
  "insight": "One or two sentences naming what specifically about this person's story, lived experience, or authority makes them uniquely positioned for this calling. Reference what they actually said in the conversation.",
  "next_step": "One concrete, specific action they could take this week to start moving toward this mission. Not abstract. Something they could do by Friday."
}`

async function callClaude(messages, retries = 3) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const messagesToSend = [
    { role: 'user', content: "I'm ready to start." },
    ...messages,
    { role: 'user', content: 'Based on everything I shared, please generate my three personalized mission statement options now.' },
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
      max_tokens: 1200,
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
    console.error('calling-result error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
