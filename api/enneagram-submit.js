// api/enneagram-submit.js
//
// Vercel serverless function: receives quiz answers + business answers,
// calls Claude (Haiku) for the personalized recommendation, sends the
// full results via Resend, subscribes the lead to Kit, returns the
// result envelope to the browser.

import { TYPES, TYPE_WINGS } from '../src/data/enneagram-types.js'

export const maxDuration = 30

const RESPONSE_TOOL = {
  name: 'send_recommendation',
  description: 'Send the personalized build recommendation back to the user.',
  input_schema: {
    type: 'object',
    properties: {
      whatToBuild:    { type: 'string', description: '1–2 sentence specific recommendation for the PRIMARY pick.' },
      whyItFits:      { type: 'string', description: '2–3 sentences tying the primary pick to type, wing, growth direction, and their business answers.' },
      format:         { type: 'string', enum: ['1:1', 'Group', 'E-course', 'Membership', 'Workshop', 'Hybrid'], description: 'Format of the primary recommendation.' },
      scale:          { type: 'string', enum: ['Intimate', 'Small group', 'Wider reach'], description: 'Scale of the primary recommendation.' },
      priceRange:     { type: 'string', description: 'Suggested dollar range for the primary pick. Examples: "$497–$997", "$1,500–$3,000/mo", "$97". Use their income goal and audience size to calibrate.' },
      firstStep:      { type: 'string', description: 'One concrete action they can take this week.' },
      watchOutFor:    { type: 'string', description: 'A shadow warning rooted in their stress direction.' },
      alternatives:   {
        type: 'array',
        description: 'Exactly 2 lighter alternative builds they could also consider — pick different formats or price tiers from the primary recommendation. Keep these short.',
        minItems: 2,
        maxItems: 2,
        items: {
          type: 'object',
          properties: {
            whatToBuild: { type: 'string', description: 'Brief title + one-sentence description of this alternative.' },
            format:      { type: 'string', enum: ['1:1', 'Group', 'E-course', 'Membership', 'Workshop', 'Hybrid'] },
            priceRange:  { type: 'string', description: 'Suggested dollar range for this alternative.' },
          },
          required: ['whatToBuild', 'format', 'priceRange'],
        },
      },
    },
    required: ['whatToBuild', 'whyItFits', 'format', 'scale', 'priceRange', 'firstStep', 'watchOutFor', 'alternatives'],
  },
}

function buildSystemPrompt({ primaryType, wing, arrows, profile }) {
  return [
    'You are Osil Pistole, a coach and consultant for faith-based leaders, ministers, coaches, and online business owners. You help them figure out what to build that fits how they are wired.',
    '',
    'Voice: warm, plain, direct, faith-friendly. No jargon, no MBA-speak, no buzzwords. Talk like a trusted mentor who has seen this before.',
    '',
    `The person you are advising is an Enneagram Type ${primaryType} with a ${wing} wing.`,
    `Subtitle: "${profile.subtitle}"`,
    `Core description: ${profile.coreDescription}`,
    `Their business style: ${profile.businessStyle}`,
    `When healthy, they move toward Type ${arrows.growth}. When stressed, they slip into Type ${arrows.stress}.`,
    '',
    'Based on their type AND their business answers below, provide:',
    '  1. ONE primary recommendation — what to build, format, scale, price range, why it fits, first step, and watch-out.',
    '  2. EXACTLY 2 alternative builds at different formats and/or price tiers — keep these short.',
    '',
    'PRICING RULES — read carefully:',
    '  • Lean conservative. Premium pricing requires BOTH an established audience AND a clear revenue intent. When in doubt, price LOWER, not higher.',
    '  • Use the user\'s "primaryGoal" answer to anchor pricing:',
    '      - If goal is "Building my audience and platform" → lean toward FREE to LOW pricing (e.g., free + tip jar, $27–$97). The product is the audience-builder; the bigger product comes later.',
    '      - If goal is "Mostly platform-building" → low pricing ($27–$197). Designed to convert browsers to buyers without scaring them off.',
    '      - If goal is "Mostly revenue, but audience too" → mid-tier ($97–$497).',
    '      - If goal is "Revenue is the goal" → mid-to-premium pricing ($297–$2,000+), BUT only if their audience supports it.',
    '  • Audience size is a hard ceiling on pricing:',
    '      - "None yet" → cap at $197, lean even lower. Build trust first.',
    '      - "Small but engaged" → cap at $497 for one-time products, $97/mo for memberships.',
    '      - "Growing list/following" → cap at $997 for one-time products, $197/mo for memberships.',
    '      - "Established" → no ceiling.',
    '  • For workshop / live event formats specifically — most online audiences expect $47–$197 for a single workshop, $197–$497 for a multi-day intensive, unless the audience is established enough to justify premium positioning.',
    '  • Always give a range, not a single number. The range should reflect uncertainty.',
    '',
    'Be specific. Avoid hedging on the content itself (only on price). The primary recommendation should feel like it could only have been written for this person. The alternatives should be genuinely different — not minor variations.',
    'Always use the send_recommendation tool to respond.',
  ].join('\n')
}

async function callClaude(payload, retries = 2) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const err = await response.text()
    if (retries > 0 && (response.status === 529 || response.status === 500)) {
      await new Promise((r) => setTimeout(r, 2000))
      return callClaude(payload, retries - 1)
    }
    throw new Error(`Anthropic ${response.status}: ${err}`)
  }
  return response.json()
}

async function generateRecommendation({ primaryType, wing, arrows, businessAnswers }) {
  const profile = TYPE_WINGS[`${primaryType}w${wing}`]
  if (!profile) throw new Error(`Missing profile data for ${primaryType}w${wing}`)

  const systemPrompt = buildSystemPrompt({ primaryType, wing, arrows, profile })

  const userMessage = [
    'Here are my answers about my current business season:',
    ...Object.entries(businessAnswers).map(([k, v]) => `- ${k}: ${Array.isArray(v) ? v.join(', ') : v}`),
    '',
    'Please send me my personalized recommendation now.',
  ].join('\n')

  const data = await callClaude({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1200,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
    tools: [RESPONSE_TOOL],
    tool_choice: { type: 'tool', name: 'send_recommendation' },
  })

  const tool = data.content?.find((b) => b.type === 'tool_use' && b.name === 'send_recommendation')
  if (!tool) throw new Error('Claude did not return a tool_use block')
  return tool.input
}

function buildRecRow(label, value) {
  return `<p style="margin:0 0 14px;"><strong style="font-family:Sora,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#a37e00;display:block;">${label}</strong>${value}</p>`
}

function buildEmailHtml({ name, primaryType, wing, recommendation, typeData, wingData, arrows }) {
  const altsHtml = recommendation?.alternatives?.length
    ? `<h3 style="font-family:Sora,sans-serif;font-size:16px;margin:28px 0 12px;">Two alternatives to consider</h3>
       ${recommendation.alternatives.map((alt) => `
         <div style="border-left:3px solid #F5C842;padding:10px 16px;margin:0 0 14px;background:#fffdf3;">
           <p style="margin:0 0 4px;font-weight:bold;">${alt.whatToBuild}</p>
           <p style="margin:0;font-size:13px;color:rgba(44,44,42,0.7);">${alt.format} · ${alt.priceRange}</p>
         </div>
       `).join('')}`
    : ''

  const recHtml = recommendation
    ? `
      <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:32px 0 12px;">Your personalized recommendation</h2>
      ${buildRecRow('What to build', recommendation.whatToBuild)}
      ${buildRecRow('Why this fits who you are', recommendation.whyItFits)}
      ${buildRecRow('Recommended format', recommendation.format)}
      ${buildRecRow('Scale that fits your season', recommendation.scale)}
      ${buildRecRow('Suggested price range', recommendation.priceRange)}
      ${buildRecRow('Your first step this week', recommendation.firstStep)}
      ${buildRecRow('Watch out for', recommendation.watchOutFor)}
      ${altsHtml}
    `
    : `<p><em>Your custom recommendation couldn't be generated this time — Osil will be in touch.</em></p>`

  return `<!doctype html><html><body style="font-family:Georgia,serif;color:#2c2c2a;max-width:640px;margin:0 auto;padding:24px;line-height:1.6;">
    <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#a37e00;">${name}, your type is</p>
    <h1 style="font-family:Sora,sans-serif;font-size:32px;margin:8px 0 4px;">Type ${primaryType}w${wing}</h1>
    <p style="color:rgba(44,44,42,0.7);margin:0 0 24px;">${wingData.subtitle}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Who you are at your core</h2>
    <p>${wingData.coreDescription}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Your gifts in business</h2>
    <ul>${wingData.strengths.map((s) => `<li>${s}</li>`).join('')}</ul>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">Your shadow side to watch</h2>
    <ul>${wingData.blindSpots.map((s) => `<li>${s}</li>`).join('')}</ul>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">When you're healthy (growth → Type ${arrows.growth})</h2>
    <p>${typeData.growthParagraph}</p>
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:24px 0 8px;">When you're stressed (stress → Type ${arrows.stress})</h2>
    <p>${typeData.stressParagraph}</p>
    ${recHtml}
    <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:32px 0 8px;">A word for you</h2>
    <blockquote style="border-left:3px solid #F5C842;padding-left:16px;margin:0;font-style:italic;">
      "${typeData.bibleVerse.text}"
      <footer style="margin-top:4px;font-style:normal;font-size:13px;color:rgba(44,44,42,0.6);">— ${typeData.bibleVerse.reference}</footer>
    </blockquote>
    <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
    <p style="text-align:center;">Want to talk through this with me?<br/><a href="https://osilpistole.com/coaching">Book a Prophetic Strategy Session →</a></p>
  </body></html>`
}

async function sendResendEmail({ name, email, primaryType, wing, recommendation, typeData, wingData, arrows }) {
  if (!process.env.RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY')
  const html = buildEmailHtml({ name, primaryType, wing, recommendation, typeData, wingData, arrows })
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Osil Pistole <osil@osilpistole.com>',
      to: [email],
      subject: `You're a Type ${primaryType}w${wing} — here's what to build, ${name}`,
      html,
    }),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

async function subscribeToKit({ name, email }) {
  if (!process.env.KIT_API_KEY) throw new Error('Missing KIT_API_KEY')
  if (!process.env.KIT_QUIZ_FORM_ID_Enneagram) throw new Error('Missing KIT_QUIZ_FORM_ID_Enneagram')
  const formId = process.env.KIT_QUIZ_FORM_ID_Enneagram
  const r = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email, first_name: name }),
  })
  if (!r.ok) throw new Error(`Kit ${r.status}: ${await r.text()}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, email, businessAnswers, derived } = req.body || {}
  if (!name || !email || !businessAnswers || !derived) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  const { primaryType, wing, arrows } = derived

  // Isolated calls — log + swallow individual failures so one bad call doesn't break the others
  let recommendation = null
  let aiFailed = false
  try {
    recommendation = await generateRecommendation({ primaryType, wing, arrows, businessAnswers })
  } catch (err) {
    console.error('enneagram-submit Anthropic error:', err.message)
    aiFailed = true
  }

  const typeData = TYPES[primaryType]
  const wingData = TYPE_WINGS[`${primaryType}w${wing}`]

  // Resend + Kit are best-effort — failures are logged but do not break the response
  try {
    await sendResendEmail({ name, email, primaryType, wing, recommendation, typeData, wingData, arrows })
  } catch (err) {
    console.error('enneagram-submit Resend error:', err.message)
  }
  try {
    await subscribeToKit({ name, email })
  } catch (err) {
    console.error('enneagram-submit Kit error:', err.message)
  }

  return res.status(200).json({ primaryType, wing, arrows, recommendation, aiFailed })
}
