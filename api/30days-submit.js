function buildResultsEmail(name, result) {
  const SUNRISE = '#F5C842'
  const MORNING = '#B8A4D8'
  const GROWTH = '#7DBE6A'
  const INK = '#2C2C2A'
  const PARCHMENT = '#FDFAF5'

  const section = (color, label, content) => `
    <div style="margin-bottom:20px;border-radius:12px;overflow:hidden;border-left:4px solid ${color};background:${PARCHMENT};padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${color};">${label}</p>
      ${content}
    </div>`

  const p = (text) => `<p style="margin:0;font-size:15px;line-height:1.7;color:${INK};">${text}</p>`

  const pillarsHTML = (result.pillars || []).map((pillar, i) => `
    <div style="background:white;border-radius:12px;padding:18px 20px;margin-bottom:12px;border:1px solid rgba(44,44,42,0.08);">
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;">
        <span style="font-size:24px;font-weight:300;font-style:italic;color:${SUNRISE};font-family:Georgia,serif;line-height:1;">0${i + 1}</span>
        <h4 style="margin:0;font-size:15px;font-weight:700;color:${INK};">${pillar.name}</h4>
      </div>
      <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${INK};">${pillar.description}</p>
      ${pillar.example_post_idea ? `<p style="margin:0;font-size:13px;line-height:1.5;color:rgba(44,44,42,0.55);font-style:italic;"><strong style="font-style:normal;color:rgba(44,44,42,0.5);">Example post idea:</strong> ${pillar.example_post_idea}</p>` : ''}
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px 48px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,${SUNRISE},${MORNING});margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:22px;">📝</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${INK};">${name}, here's your content foundation.</h1>
      <p style="margin:0;font-size:15px;color:rgba(44,44,42,0.55);line-height:1.6;">Your message, your audience, and the three pillars to build your content around.</p>
    </div>

    <div style="background:white;border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(44,44,42,0.08);">
      <div style="height:3px;background:linear-gradient(90deg,${SUNRISE},${MORNING},${GROWTH});border-radius:2px;margin:-28px -24px 24px;"></div>

      ${section(SUNRISE, 'Your Core Message', `<p style="margin:0;font-size:17px;line-height:1.55;color:${INK};font-style:italic;font-weight:500;">"${result.message || ''}"</p>`)}
      ${section(GROWTH, 'Who You\'re Talking To', p(result.audience || ''))}
      ${result.voice_signature ? section(MORNING, 'Your Voice', p(result.voice_signature)) : ''}

      <div style="margin-top:28px;margin-bottom:18px;">
        <h3 style="margin:0 0 6px;font-size:18px;font-weight:700;color:${INK};">Your Three Content Pillars</h3>
        <p style="margin:0 0 16px;font-size:13px;color:rgba(44,44,42,0.5);line-height:1.5;">~80% of what you post should orbit one of these three themes.</p>
        ${pillarsHTML}
      </div>

      <!-- Phase 2 tease -->
      <div style="background:linear-gradient(135deg,#fff,${PARCHMENT});border:1.5px solid rgba(245,200,66,0.4);border-radius:14px;padding:22px 24px;margin-top:24px;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#8a6500;">Coming Soon</p>
        <h3 style="margin:0 0 10px;font-size:18px;font-weight:700;color:${INK};">Want 30 days of content built around these pillars?</h3>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:rgba(44,44,42,0.65);">A personalized 30-day plan: hook, topic, format (talking head / B-roll / carousel / graphic), filming notes, caption starter, CTA — for Instagram, Facebook, and TikTok. Built around YOUR voice, YOUR audience, YOUR pillars.</p>
        <p style="margin:0 0 14px;font-size:14px;color:${INK};"><strong>Launch price: $47</strong> <span style="color:rgba(44,44,42,0.4);text-decoration:line-through;">$97</span></p>
        <p style="margin:0;font-size:13px;color:rgba(44,44,42,0.55);line-height:1.55;">You're on the list. We'll email you the moment it goes live.</p>
      </div>

      <div style="text-align:center;margin-top:24px;padding-top:22px;border-top:1px solid rgba(44,44,42,0.08);">
        <p style="margin:0 0 10px;font-size:13px;color:rgba(44,44,42,0.55);line-height:1.55;">Want help acting on what you have right now?</p>
        <a href="https://osilpistole.thrivecart.com/prophetic-strategy-session/" style="display:inline-block;background:${SUNRISE};color:${INK};text-decoration:none;border-radius:999px;padding:12px 28px;font-weight:700;font-size:14px;box-shadow:0 6px 18px rgba(245,200,66,0.32);">
          Book a Strategy Session — $99 →
        </a>
      </div>
    </div>

    <p style="text-align:center;margin-top:24px;font-size:12px;color:rgba(44,44,42,0.35);">
      Sent with care by Osil Pistole · <a href="https://osilpistole.com" style="color:rgba(44,44,42,0.35);">osilpistole.com</a>
    </p>
  </div>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, conversation, result } = req.body
  if (!name || !email || !conversation || !result) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // 1. Kit subscribe
  const kitApiKey = process.env.KIT_API_KEY
  const kitFormId = process.env.KIT_QUIZ_FORM_ID_30DaysDoneForm

  if (kitApiKey && kitFormId) {
    try {
      const truncate = (s, n) => (s && s.length > n) ? s.slice(0, n - 1) + '…' : (s || '')
      await fetch(`https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          first_name: name,
          fields: {
            cp_message: truncate(result.message, 500),
            cp_audience: truncate(result.audience, 500),
            cp_voice_signature: truncate(result.voice_signature, 500),
            cp_pillar_1_name: truncate(result.pillars?.[0]?.name, 200),
            cp_pillar_1_desc: truncate(result.pillars?.[0]?.description, 500),
            cp_pillar_2_name: truncate(result.pillars?.[1]?.name, 200),
            cp_pillar_2_desc: truncate(result.pillars?.[1]?.description, 500),
            cp_pillar_3_name: truncate(result.pillars?.[2]?.name, 200),
            cp_pillar_3_desc: truncate(result.pillars?.[2]?.description, 500),
            cp_anchor_offer: truncate(result.anchor_offer, 500),
            cp_primary_goal: truncate(result.primary_goal, 200),
            cp_platforms: (result.platforms || []).join(', ').slice(0, 200),
          },
        }),
      })
    } catch (err) {
      console.error('Kit error:', err)
    }
  } else if (!kitFormId) {
    console.warn('KIT_QUIZ_FORM_ID_30DaysDoneForm not set — Kit subscribe skipped')
  }

  // 2. Resend email
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Osil Pistole <osil@osilpistole.com>',
          to: email,
          subject: `${name}, here's your content foundation 📝`,
          html: buildResultsEmail(name, result),
        }),
      })
    } catch (err) {
      console.error('Resend error:', err)
    }
  }

  return res.status(200).json({ ok: true })
}
