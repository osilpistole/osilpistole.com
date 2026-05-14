export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, conversation, result } = req.body

  if (!name || !email || !conversation || !result) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/quiz_results`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ name, email, conversation, result }),
      })
    } catch (err) {
      console.error('Supabase error:', err)
    }
  }

  const kitApiKey = process.env.KIT_API_KEY
  const kitFormId = process.env.KIT_QUIZ_FORM_ID_AIBuildForm

  if (kitApiKey && kitFormId) {
    try {
      const truncate = (str, n) => str?.length > n ? str.slice(0, n - 1) + '…' : str

      await fetch(`https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          first_name: name,
          fields: {
            quiz_idea: truncate(result.idea, 500),
            quiz_audience: truncate(result.audience, 500),
            quiz_format: result.format,
            quiz_step_1: result.steps?.[0] ?? '',
            quiz_step_2: result.steps?.[1] ?? '',
            quiz_step_3: result.steps?.[2] ?? '',
            quiz_gifts_note: truncate(result.gifts_note, 500),
            quiz_missing_assessments: result.missing_assessments ? 'yes' : 'no',
          },
        }),
      })
    } catch (err) {
      console.error('Kit error:', err)
    }
  }

  return res.status(200).json({ ok: true })
}
