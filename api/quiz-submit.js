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

  const advantages = result.advantages?.length
    ? result.advantages.map(a => `
        <div style="display:flex;gap:10px;margin-bottom:10px;">
          <div style="width:18px;height:18px;border-radius:50%;background:${GROWTH};flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:2px;">
            <div style="width:6px;height:6px;border-radius:50%;background:white;"></div>
          </div>
          <p style="margin:0;font-size:14px;line-height:1.6;color:${INK};">${a}</p>
        </div>`).join('')
    : ''

  const steps = result.steps?.length
    ? result.steps.map((s, i) => `
        <div style="display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;">
          <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,${SUNRISE},${MORNING});flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${INK};">${i + 1}</div>
          <p style="margin:0;font-size:14px;line-height:1.6;color:${INK};">${s}</p>
        </div>`).join('')
    : ''

  const pricingGrid = result.pricing ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
      ${[
        ['Price per person', result.pricing.price_per_person],
        ['Students per launch', result.pricing.students_per_launch],
        ['Launches per year', result.pricing.launches_per_year],
        ['Est. monthly income', result.pricing.monthly_income_estimate],
      ].map(([label, value]) => `
        <div style="background:white;border-radius:8px;padding:10px 12px;">
          <p style="margin:0 0 2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(44,44,42,0.4);">${label}</p>
          <p style="margin:0;font-size:15px;font-weight:700;color:${INK};">${value}</p>
        </div>`).join('')}
    </div>
    ${result.pricing.math ? `<p style="margin:0;font-size:13px;line-height:1.6;color:rgba(44,44,42,0.6);">${result.pricing.math}</p>` : ''}` : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px 48px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,${SUNRISE},${MORNING});margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:22px;">✨</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${INK};">Here's what you should build, ${name}.</h1>
      <p style="margin:0;font-size:15px;color:rgba(44,44,42,0.5);line-height:1.6;">Your personalized AI Build Quiz results are below. Save this email — it's your roadmap.</p>
    </div>

    <!-- Card -->
    <div style="background:white;border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(44,44,42,0.08);">

      <div style="height:3px;background:linear-gradient(90deg,${SUNRISE},${MORNING},${GROWTH});border-radius:2px;margin:-28px -24px 24px;"></div>

      ${section(SUNRISE, 'Your Business Idea', p(result.idea ?? ''))}
      ${section(GROWTH, 'Your Audience', p(result.audience ?? ''))}
      ${section(MORNING, 'Recommended Format', p(result.format ?? ''))}
      ${result.positioning ? section(SUNRISE, 'Your Positioning Statement', `<p style="margin:0;font-size:15px;line-height:1.7;color:${INK};font-style:italic;">${result.positioning}</p>`) : ''}
      ${advantages ? section(GROWTH, 'Why You\'re the Right Person for This', advantages) : ''}
      ${result.first_launch ? section(MORNING, 'Your Minimum Viable First Launch', p(result.first_launch)) : ''}
      ${result.pricing ? section(GROWTH, 'Your Income Math', pricingGrid) : ''}
      ${steps ? section(MORNING, 'Your First 3 Steps', steps) : ''}
      ${result.gifts_note ? section(SUNRISE, 'Your Gifts at Work', p(result.gifts_note)) : ''}

      ${result.missing_assessments ? `
      <div style="background:${PARCHMENT};border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:rgba(44,44,42,0.6);line-height:1.6;">
        📌 Want a deeper picture? Take the free <a href="https://osilpistole.com/spiritual-gifts" style="color:#8a6500;">Spiritual Gifts Assessment</a> and <a href="https://osilpistole.com/fivefold" style="color:#6a4d8a;">5-Fold Assessment</a> — they'll sharpen this recommendation significantly.
      </div>` : ''}

      <!-- CTA -->
      <div style="text-align:center;margin-top:28px;padding-top:24px;border-top:1px solid rgba(44,44,42,0.08);">
        <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:${INK};">You have the idea. Now let's build the plan.</h3>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(44,44,42,0.5);line-height:1.6;">Book a 60-minute strategy session and we'll map out exactly how to launch this — web build, workshop setup, offer design, all of it.</p>
        <a href="https://osilpistole.thrivecart.com/prophetic-strategy-session/" style="display:inline-block;background:${SUNRISE};color:${INK};text-decoration:none;border-radius:999px;padding:14px 32px;font-weight:700;font-size:15px;box-shadow:0 8px 24px rgba(245,200,66,0.35);">
          Book for $99 →
        </a>
        <p style="margin:12px 0 0;font-size:12px;color:rgba(44,44,42,0.3);">Session cost credited toward any project if you decide to work with Osil.</p>
      </div>
    </div>

    <!-- Footer -->
    <p style="text-align:center;margin-top:24px;font-size:12px;color:rgba(44,44,42,0.35);">
      Sent with care by Osil Pistole · <a href="https://osilpistole.com" style="color:rgba(44,44,42,0.35);">osilpistole.com</a>
    </p>
  </div>
</body>
</html>`
}

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
            quiz_positioning: truncate(result.positioning, 500),
            quiz_advantage_1: truncate(result.advantages?.[0], 500),
            quiz_advantage_2: truncate(result.advantages?.[1], 500),
            quiz_advantage_3: truncate(result.advantages?.[2], 500),
            quiz_first_launch: truncate(result.first_launch, 500),
            quiz_price_per_person: result.pricing?.price_per_person ?? '',
            quiz_students_per_launch: String(result.pricing?.students_per_launch ?? ''),
            quiz_monthly_income: result.pricing?.monthly_income_estimate ?? '',
            quiz_pricing_math: truncate(result.pricing?.math, 500),
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

  const resendKey = process.env.RESEND_API_KEY

  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Osil Pistole <osil@osilpistole.com>',
          to: email,
          subject: `${name}, here's what you should build first 🌟`,
          html: buildResultsEmail(name, result),
        }),
      })
    } catch (err) {
      console.error('Resend error:', err)
    }
  }

  return res.status(200).json({ ok: true })
}
