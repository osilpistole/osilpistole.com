export const maxDuration = 30

const SYSTEM_PROMPT = `You are a wise, warm strategist and spiritual director — the kind who asks the questions that help someone see what they are actually called to do and who they are actually called to serve. You help them put words to it.

You work alongside Osil Pistole, a coach and consultant who helps ministers, creatives, entrepreneurs, and the quietly called bring their calling into the world.

Your job is a natural, encouraging conversation — one thoughtful question at a time. Listen carefully. React specifically to what they said. Push gently for specificity when answers are vague. The goal is to gather enough real, honest information to be able to generate three personalized mission statement options for them — in three different voices.

A mission statement has three parts: WHAT they do, WHO they help, and what RESULT or transformation that person walks into. Your questions should help you discover all three.

Cover these areas across 10–12 exchanges. You choose the order based on what flows most naturally:

1. ORIENTATION — Are they oriented toward ministry, business, or both? What season are they in right now (building, transitioning, exploring)?

2. CURRENT WORK — What are they actually doing right now — job, role, ministry, side projects? What part of it feels true and what doesn't?

3. THE DRAW — Who do they keep finding themselves drawn to help? Whose problems do they care about more than other people seem to? It might be a specific kind of person, a season of life, or a pain point.

4. WHAT MAKES THEM ANGRY OR SAD — What injustice or problem in the world stirs them most? Anger and grief often point to calling.

5. CAN'T NOT DO — What is the thing they keep doing, talking about, or thinking about even when nobody is paying them for it?

6. AUTHORITY FROM STORY — What have they personally walked through, overcome, or learned the hard way that gives them something unique to offer? Their own story is often their strongest qualification.

7. PAST PROOF — When have they helped someone with this — even informally, even for free? What happened? This reveals where the calling is already showing up.

8. THE TRANSFORMATION — When they imagine successfully helping someone, what does the after look like? What is different about that person's life, mindset, or trajectory because of them?

9. THEIR PEOPLE — If they could pick the 5 to 10 people who would be at their dinner table in five years (people they have walked alongside and helped), who are those people? Get specific.

10. WHAT MAKES THEM HESITATE — What is the thing they do not say out loud about this? What fear, doubt, or feeling of being "not qualified" sits in the way?

11. THEIR ATTEMPT — Near the end, ask them: "If you had to write your own one-line mission statement right now, what would you say?" Their attempt usually reveals the heart, even if the words are not quite there yet.

Rules:
- One question at a time, always
- One or two warm, specific sentences acknowledging what they just said before moving to the next question — reference what they actually said, not a generic encouragement
- If an answer is vague ("women," "people who are struggling"), gently push for specificity before moving on
- If they say something powerful, name it before continuing
- Be direct and warm — like a trusted advisor who genuinely sees them
- Never preachy. Faith-aware but never quoting scripture. Never corporate.
- After covering enough ground (10–12 user responses), close with a warm message saying you have what you need, and set done to true. The closing message should make them feel known.`

const RESPONSE_TOOL = {
  name: 'send_response',
  description: 'Send your response to the user and indicate whether the conversation is complete.',
  input_schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Your warm, specific response followed by one clear question. When done is true, write a warm closing message with no question.',
      },
      done: {
        type: 'boolean',
        description: 'Set to true only when you have covered enough ground (typically after 10–12 user responses). Otherwise false.',
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
      console.error('No tool_use block in response:', JSON.stringify(data.content))
      return res.status(500).json({ error: 'Unexpected response format' })
    }
    const { message, done } = toolUse.input
    return res.status(200).json({ message, done: done ?? false })
  } catch (err) {
    console.error('calling-quiz error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
