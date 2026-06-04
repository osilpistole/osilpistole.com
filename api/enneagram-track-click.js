// api/enneagram-track-click.js
//
// Vercel serverless function. Fired by sendBeacon when a quiz taker clicks
// the "Book a Prophetic Strategy Session" CTA on the results page.
// Adds a Kit tag so Osil can see which subscribers showed interest.
//
// Body: { email: string, primaryType?: number, wing?: number }
//
// Best-effort — always returns 200 (or 204) so the browser doesn't care.

export const maxDuration = 10

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // sendBeacon can send the body as a Blob/text — make sure we can read it
  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  body = body || {}

  const { email } = body
  if (!email) {
    return res.status(400).json({ error: 'Missing email' })
  }

  if (!process.env.KIT_API_KEY) {
    console.error('enneagram-track-click: Missing KIT_API_KEY')
    return res.status(200).json({ ok: false })
  }
  const tagId = process.env.KIT_TAG_ID_Enneagram_Strategy_Click
  if (!tagId) {
    console.error('enneagram-track-click: Missing KIT_TAG_ID_Enneagram_Strategy_Click')
    return res.status(200).json({ ok: false })
  }

  try {
    const r = await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email }),
    })
    if (!r.ok) {
      console.error('enneagram-track-click Kit error:', r.status, await r.text())
      return res.status(200).json({ ok: false })
    }
  } catch (err) {
    console.error('enneagram-track-click fetch error:', err.message)
    return res.status(200).json({ ok: false })
  }

  return res.status(200).json({ ok: true })
}
