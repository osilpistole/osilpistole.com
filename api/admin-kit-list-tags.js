// api/_kit-list-tags.js
//
// One-time admin endpoint to list all Kit tags + their numeric IDs.
// Useful when Kit's UI hides the tag ID (post-rebrand).
//
// Hit with: GET /api/_kit-list-tags?secret=<KIT_LIST_TAGS_SECRET>
//
// The query secret is just a soft gate so casual probes don't get the list.
// The data isn't highly sensitive (tag names + ids) but no need to leave
// it open. Safe to delete this file after we've grabbed the tag IDs.

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

  try {
    const r = await fetch(`https://api.convertkit.com/v3/tags?api_key=${encodeURIComponent(process.env.KIT_API_KEY)}`)
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
