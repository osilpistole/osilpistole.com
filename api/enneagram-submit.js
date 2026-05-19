// api/enneagram-submit.js
//
// Vercel serverless function. Receives the quiz submission and returns
// the result envelope. Stubbed for now — Task 16 replaces the stub with
// real Anthropic, Resend, and Kit calls.

export const maxDuration = 30

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, derived } = req.body || {}
  if (!name || !email || !derived) {
    return res.status(400).json({ error: 'Missing name, email, or derived' })
  }

  // Mock recommendation — replaced by real Claude call in Task 16
  const recommendation = {
    whatToBuild: 'A small group cohort that meets weekly for 6 weeks.',
    whyItFits: `Your Type ${derived.primaryType}w${derived.wing} energy thrives when there's structure plus real connection.`,
    format: 'Group',
    scale: 'Intimate (8–12 people)',
    firstStep: 'Pick a date 6 weeks from now and write the outcome statement.',
    watchOutFor: 'The temptation to over-prepare instead of opening enrollment.',
  }

  return res.status(200).json({
    primaryType: derived.primaryType,
    wing: derived.wing,
    arrows: derived.arrows,
    recommendation,
    aiFailed: false,
  })
}
