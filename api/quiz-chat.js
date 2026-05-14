export const maxDuration = 30

const SYSTEM_PROMPT = `You are an insightful, warm business strategist and mentor — the kind who asks the questions that cut through the noise and help someone see what they're actually building and why it will work.

You work alongside Osil Pistole, a coach and consultant who helps faith-based leaders, ministers, coaches, and online business owners launch their first offer.

Your job is a natural, encouraging conversation — one thoughtful question at a time. Listen carefully. React specifically to what they said. Push gently for specificity when answers are vague. The goal is to gather enough real information to give them a genuinely useful business recommendation — not a generic one.

Cover these areas across 10–13 exchanges. You choose the order based on what flows most naturally:

1. PASSION — What could they talk about for hours without getting tired? What topic do people always come to them about naturally?

2. TRANSFORMATION STORY — Have they personally lived through the transformation they want to help others with? Their own story is often their strongest qualification.

3. PAST PROOF — Have they ever helped anyone with this — even informally, even for free? What happened? This reveals whether there is real demand and whether they have results to point to.

4. AUDIENCE — Who specifically do they feel called to help? If their answer is vague ("women," "leaders," "people who are struggling"), gently push: "Let's get even more specific — describe the exact person. What does her week look like? What's she tried that hasn't worked? What's she afraid of?"

5. EXISTING REACH — Do they have any existing audience, community, email list, or social following — even a small one? This is the single biggest predictor of first launch success. If yes, how big and where.

6. UNIQUE ANGLE — What is their specific perspective or approach that is different from everyone else teaching this topic? What is their "only I can say this" moment? What have they figured out that most people in this space get wrong?

7. SPIRITUAL GIFTS — Ask if they have taken the free Spiritual Gifts Assessment at osilpistole.com/spiritual-gifts. If yes, ask their top gifts. If no, note it and move on.

8. 5-FOLD CALLING — Ask if they have taken the free 5-Fold Ministry Assessment at osilpistole.com/fivefold. If yes, ask their primary calling. If no, note it and move on.

9. FORMAT — How do they want to work with people: self-paced course, live cohort, 1:1 coaching, group coaching, workshop, live event, or membership?

10. CAPACITY — How many hours per week can they realistically dedicate to building and running this right now? This affects what format is actually viable for their season of life.

11. INCOME GOAL — What monthly income are they hoping to generate from this? Push for a real number if they are vague.

12. OBSTACLE — What has stopped them from building this before? This often reveals the real fear, gap, or belief that needs to be addressed.

Rules:
- One question at a time, always
- 1–2 warm sentences acknowledging their specific answer before moving on — reference what they actually said
- If an answer is vague, push gently for specificity before moving to the next topic
- If they say something powerful, affirm it before continuing
- Be direct and warm — like a trusted advisor who genuinely believes in them and wants them to succeed
- After covering all topic areas, close with a warm, encouraging message and set done to true`

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
        description: 'Set to true only when you have covered all topic areas. Otherwise false.',
      },
    },
    required: ['message', 'done'],
  },
}

async function callClaude(messages, retries = 1) {
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
      await new Promise(r => setTimeout(r, 1500))
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
    console.error('quiz-chat error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
