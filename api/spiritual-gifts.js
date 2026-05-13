export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, topGifts, scores } = req.body

  if (!name || !email || !topGifts || !scores) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/spiritual_gifts_results`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ name, email, top_gifts: topGifts, scores }),
      })
    } catch (err) {
      console.error('Supabase error:', err)
    }
  }

  const kitApiKey = process.env.KIT_API_KEY
  const kitFormId = process.env.KIT_FORM_ID

  if (kitApiKey && kitFormId) {
    try {
      await fetch(`https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          first_name: name,
          fields: { top_gift: topGifts[0] },
        }),
      })
    } catch (err) {
      console.error('Kit error:', err)
    }
  }

  return res.status(200).json({ ok: true })
}
