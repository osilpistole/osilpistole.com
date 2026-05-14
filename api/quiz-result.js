const RESULT_PROMPT = `You are a business strategist reviewing a conversation between a mentor and someone who wants to build a course, mentorship, or workshop. Based on everything they said, generate a specific, personalized business recommendation.

Return ONLY valid JSON — no markdown, no explanation, nothing outside the JSON object.

Use this exact format:
{
  "idea": "A specific name for their business idea followed by a 2-sentence description of what it is and why it fits them",
  "audience": "A specific description of exactly who they should serve — include who they are, what they struggle with, and what they are ready for",
  "format": "One of: course | cohort | workshop | mentorship | event — followed by one sentence explaining why this format fits their life and goals",
  "steps": [
    "First concrete action they should take this week",
    "Second concrete action — builds on the first",
    "Third concrete action — moves them toward launch"
  ],
  "gifts_note": "If they mentioned their Spiritual Gifts or 5-Fold calling, explain in 1-2 sentences how those gifts inform this recommendation. If they did not mention either, return an empty string.",
  "missing_assessments": true
}

Set missing_assessments to true if they said they have NOT taken either the Spiritual Gifts Assessment or the 5-Fold Assessment. Set to false if they have taken both.`

export const maxDuration = 45

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' })
  }

  // Claude API requires the first message to be from 'user'.
  // Frontend messages start with the first assistant question, so prepend the seed
  // and append a closing user turn that triggers result generation.
  const messagesToSend = [
    { role: 'user', content: "I'm ready to start." },
    ...messages,
    { role: 'user', content: 'Based on everything I shared, please generate my personalized business recommendation now.' },
  ]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: RESULT_PROMPT,
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

    let result
    try {
      result = JSON.parse(raw)
    } catch {
      const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
      result = JSON.parse(cleaned)
    }

    return res.status(200).json({ result })
  } catch (err) {
    console.error('quiz-result error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
