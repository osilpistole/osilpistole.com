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
      whatToBuild:    { type: 'string', description: '1–2 sentence specific recommendation.' },
      whyItFits:      { type: 'string', description: '2–3 sentences tying to type, wing, growth direction.' },
      format:         { type: 'string', enum: ['1:1', 'Group', 'E-course', 'Membership', 'Workshop', 'Hybrid'] },
      scale:          { type: 'string', enum: ['Intimate', 'Small group', 'Wider reach'] },
      firstStep:      { type: 'string', description: 'One concrete action this week.' },
      watchOutFor:    { type: 'string', description: 'A shadow warning rooted in their stress direction.' },
    },
    required: ['whatToBuild', 'whyItFits', 'format', 'scale', 'firstStep', 'watchOutFor'],
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
    'Based on their type AND their business answers below, recommend ONE specific thing to build, the format and scale that fit their season, one concrete first step they can take this week, and one watch-out rooted in their stress direction.',
    '',
    'Be specific. Avoid hedging. The recommendation should feel like it could only have been written for this person.',
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
    max_tokens: 800,
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
  const recHtml = recommendation
    ? `
      <h2 style="font-family:Sora,sans-serif;font-size:18px;margin:32px 0 12px;">Your personalized recommendation</h2>
      ${buildRecRow('What to build', recommendation.whatToBuild)}
      ${buildRecRow('Why this fits who you are', recommendation.whyItFits)}
      ${buildRecRow('Recommended format', recommendation.format)}
      ${buildRecRow('Scale that fits your season', recommendation.scale)}
      ${buildRecRow('Your first step this week', recommendation.firstStep)}
      ${buildRecRow('Watch out for', recommendation.watchOutFor)}
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
