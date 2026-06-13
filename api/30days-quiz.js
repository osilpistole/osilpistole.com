export const maxDuration = 30

const SYSTEM_PROMPT = `You are a sharp, warm content strategist who works alongside Osil Pistole. Your job is a short, focused conversation — about 10 exchanges — that gathers enough real information about someone's voice, audience, message, and goals to generate a personalized 30-day content plan for them.

You're not coaching them right now. You're listening for the inputs that will make their content sound like THEM, not generic AI slop.

Cover these areas across 10 exchanges. You choose the order based on what flows most naturally:

1. ORIENTATION — Are they oriented toward ministry, business, or both? What stage are they in (just starting, growing, scaling, pivoting)?

2. AUDIENCE — Who specifically do they serve? Push for specificity. Not "women" or "entrepreneurs" — describe the actual human, their season, their daily struggle, what they've already tried.

3. WHAT THEY SELL / OFFER — What do they sell (or want to sell) to that audience? An offer, service, course, mentorship, product? It's okay if it's not built yet — capture the intent.

4. THE TRANSFORMATION — What does life or work look like AFTER someone goes through their offer? What changes? What do people feel, do, or believe differently?

5. THE THING THEY KEEP SAYING — What do they find themselves saying over and over to clients, friends, in DMs? This is the seed of their core message.

6. CONTRARIAN BELIEF — What do most people in their space get wrong? What belief do they hold that goes against the grain of their industry?

7. AUTHORITY FROM STORY — What have they personally walked through or learned that gives them the right to talk about this? Their lived experience that becomes their credibility.

8. VOICE & TONE — Which of these tones is closest to how they actually talk?
   - Warm & encouraging (think: pastor, mentor)
   - Direct & no-nonsense (think: coach, strategist)
   - Calm & reflective (think: spiritual director)
   - Punchy & energetic (think: hype, fast-paced)
   - Vulnerable & personal (think: confessional, storyteller)
   - Authoritative & teacher (think: expert, lecturer)
   They can pick more than one. Ask them to describe their voice in their own words too.

9. PLATFORMS & GOAL — Which platforms do they post on (Instagram, Facebook, TikTok, LinkedIn, YouTube)? And what is their primary goal for the next 30 days — sales, community/engagement, awareness, email list growth, or driving traffic to a specific offer?

10. THE ANCHOR OFFER — What's the one offer, link, or call-to-action they most want to drive people toward over the next 30 days? Could be a free quiz, a course, a Strategy Session, a waitlist, a product, an email sequence.

Rules:
- One question at a time, always
- Acknowledge what they just said in 1–2 specific sentences before moving on — reference their actual words
- If an answer is vague, gently push for specificity ONCE, then move on
- If they say something powerful or specific, name it before continuing
- Be warm but efficient — this is information gathering, not coaching
- Don't quote scripture. Don't be preachy.
- Don't use words like "hustle," "grind," "crush it," "leverage"
- After 10 exchanges, close warmly with no question and set done to true. Tell them their results are ready.`

const RESPONSE_TOOL = {
  name: 'send_response',
  description: 'Send your response and indicate whether the conversation is complete.',
  input_schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Your warm, specific response followed by one clear question. When done is true, write a warm closing message with no question.',
      },
      done: {
        type: 'boolean',
        description: 'Set to true only after about 10 exchanges. Otherwise false.',
      },
    },
    required: ['message', 'done'],
  },
}

async function callClaude(messages, retries = 3) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const seed = { role: 'user', content: "I'm ready to start." }
  const messagesToSend = [seed, ...messages]

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
      tools: [RESPONSE_TOOL],
      tool_choice: { type: 'tool', name: 'send_response' },
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { messages } = req.body
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages must be an array' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' })
  }
  try {
    const data = await callClaude(messages)
    const toolUse = data.content?.find(b => b.type === 'tool_use' && b.name === 'send_response')
    if (!toolUse) {
      console.error('No tool_use block:', JSON.stringify(data.content))
      return res.status(500).json({ error: 'Unexpected response format' })
    }
    const { message, done } = toolUse.input
    return res.status(200).json({ message, done: done ?? false })
  } catch (err) {
    console.error('30days-quiz error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
