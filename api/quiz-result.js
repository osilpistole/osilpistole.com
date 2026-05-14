export const maxDuration = 45

const RESULT_PROMPT = `You are a business strategist reviewing a conversation between a mentor and someone who wants to build a course, mentorship, or workshop. Based on everything they said, generate a specific, personalized business recommendation.

PRICING MATH — follow these rules exactly, every time:

A course or program generates revenue per LAUNCH, not per month. If someone wants $4,000/month and the program is 12 weeks (3 months) long, they need $12,000 per cohort — not $4,000. Always do this calculation:

  Step 1: Convert monthly goal to per-launch revenue
    → per_launch_revenue = monthly_goal × (duration_weeks ÷ 4)
    → Example: $4,000/month × (12 weeks ÷ 4) = $12,000 per launch

  Step 2: Set a realistic price per person
    → Consider the format, depth, and transformation offered
    → A 12-week cohort with live coaching: $1,500–$3,000
    → A self-paced course: $197–$997
    → A 1-day workshop: $97–$497
    → 1:1 mentorship (monthly): $500–$2,000/month

  Step 3: Calculate students needed per launch
    → students_needed = per_launch_revenue ÷ price_per_person
    → Example: $12,000 ÷ $2,000 = 6 students

  Step 4: Calculate launches per year for consistent monthly income
    → For a 12-week program: launch every quarter = 4x/year
    → For a 6-week program: launch every 2 months = 6x/year
    → For 1:1 monthly: ongoing, just need to fill spots

  Step 5: Write the math field clearly showing the full calculation so the person can see exactly how it works.

Return ONLY a valid JSON object — no markdown, no text outside the JSON.

Use this exact schema:
{
  "idea": "A specific name for their offer followed by 2 sentences describing what it is and why it fits them",
  "audience": "Exactly who they should serve — who they are, what they struggle with, what they are ready for",
  "format": "course | cohort | workshop | mentorship | event — plus one sentence on why this format fits their life and goals",
  "positioning": "A one-sentence positioning statement in this exact format: For [specific person] who [specific struggle], [offer name] is the [category] that [specific outcome] — because [unique differentiator that only this person could deliver].",
  "advantages": [
    "First specific reason they are uniquely positioned to do this — draw from their story, past proof, or lived experience",
    "Second advantage — a skill, relationship, or insight that most people in this space don't have",
    "Third advantage — what they've figured out that competitors get wrong, or a result they've already produced"
  ],
  "first_launch": "A 2-3 sentence minimum viable first launch recommendation. What is the smallest, fastest version they could test in the next 30-60 days — before the full offer is built? Name it, price it, and describe how to fill it (e.g., a free workshop, a beta cohort at half price, a single 1:1 package). The goal is proof of concept, not perfection.",
  "pricing": {
    "price_per_person": "e.g. $2,000",
    "students_per_launch": 6,
    "launches_per_year": 4,
    "monthly_income_estimate": "e.g. ~$4,000/month",
    "math": "Clear 2-3 sentence explanation of how the numbers work. Example: Your goal is $4,000/month. A 12-week course spans 3 months, so each launch needs to bring in $12,000. At $2,000 per student, you need 6 students per cohort — very achievable for a first launch."
  },
  "steps": [
    "First concrete action they should take this week",
    "Second concrete action — builds on the first",
    "Third concrete action — moves toward launch"
  ],
  "gifts_note": "If they mentioned Spiritual Gifts or 5-Fold calling, explain in 1-2 sentences how those gifts inform this recommendation. Otherwise return an empty string.",
  "missing_assessments": false
}

Set missing_assessments to true if they said they have NOT taken either the Spiritual Gifts or 5-Fold Assessment.`

async function callClaude(messages, retries = 1) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const messagesToSend = [
    { role: 'user', content: "I'm ready to start." },
    ...messages,
    { role: 'user', content: 'Based on everything I shared, please generate my personalized business recommendation now.' },
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
      await new Promise(r => setTimeout(r, 2000))
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
    console.error('quiz-result error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
