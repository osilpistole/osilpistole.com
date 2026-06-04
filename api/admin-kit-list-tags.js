// api/admin-kit-list-tags.js
//
// Admin endpoint with three modes, all gated by ?secret=<KIT_LIST_TAGS_SECRET>:
//
//   1. Default (no extra params):
//        GET /api/admin-kit-list-tags?secret=...
//        Lists all Kit tags + numeric IDs.
//
//   2. Check tag membership:
//        GET /api/admin-kit-list-tags?secret=...&check_tag=<id>&email=<addr>
//        Lists latest 5 subscribers for that tag + tells you whether the
//        specified email is among them.
//
//   3. Try tagging (diagnostic):
//        GET /api/admin-kit-list-tags?secret=...&try_tag=<id>&email=<addr>
//        Actually calls Kit's tags/{id}/subscribe and returns the raw response
//        so we can see WHY a tag isn't being applied.

export const maxDuration = 10

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const expected = process.env.KIT_LIST_TAGS_SECRET
  if (!expected) {
    return res.status(503).json({ error: 'KIT_LIST_TAGS_SECRET not configured' })
  }
  const provided = req.query?.secret
  if (provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!process.env.KIT_API_KEY) {
    return res.status(500).json({ error: 'Missing KIT_API_KEY' })
  }

  const apiKey = process.env.KIT_API_KEY

  // Mode: check_tag — see if an email is currently tagged
  const checkTag = req.query?.check_tag
  if (checkTag) {
    try {
      const r = await fetch(`https://api.convertkit.com/v3/tags/${checkTag}/subscriptions?api_key=${encodeURIComponent(apiKey)}&sort_order=desc`)
      if (!r.ok) {
        return res.status(502).json({ error: `Kit ${r.status}`, body: await r.text() })
      }
      const data = await r.json()
      const wanted = req.query?.email
      const subs = (data.subscriptions || []).map((s) => ({
        subscriber_id: s.subscriber?.id,
        email: s.subscriber?.email_address,
        created_at: s.created_at,
        state: s.state,
      }))
      const match = wanted ? subs.find((s) => s.email === wanted) : null
      return res.status(200).json({
        tag_id: checkTag,
        total_subscriptions: data.total_subscriptions,
        latest_count: subs.length,
        searched_email: wanted || null,
        found_in_tag: !!match,
        match,
        latest_5: subs.slice(0, 5),
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  // Mode: try_tag — actually try the tag-subscribe call and show the raw response
  const tryTag = req.query?.try_tag
  if (tryTag) {
    const email = req.query?.email
    if (!email) return res.status(400).json({ error: 'try_tag requires &email=' })
    try {
      const r = await fetch(`https://api.convertkit.com/v3/tags/${tryTag}/subscribe`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email }),
      })
      const bodyText = await r.text()
      return res.status(200).json({
        tag_id: tryTag,
        email,
        kit_status: r.status,
        kit_ok: r.ok,
        kit_body: tryParseJson(bodyText),
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  // Default: list tags
  try {
    const r = await fetch(`https://api.convertkit.com/v3/tags?api_key=${encodeURIComponent(apiKey)}`)
    if (!r.ok) {
      return res.status(502).json({ error: `Kit ${r.status}`, body: await r.text() })
    }
    const data = await r.json()
    const tags = (data.tags || []).map((t) => ({ id: t.id, name: t.name }))
    return res.status(200).json({ count: tags.length, tags })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

function tryParseJson(text) {
  try { return JSON.parse(text) } catch { return text }
}
