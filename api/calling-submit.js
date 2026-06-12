function buildResultsEmail(name, result, chosen) {
  const SUNRISE = '#F5C842'
  const MORNING = '#B8A4D8'
  const GROWTH = '#7DBE6A'
  const INK = '#2C2C2A'
  const PARCHMENT = '#FDFAF5'

  const chosenOption = result.options?.find(o => o.voice === chosen) || result.options?.[0]
  const otherOptions = (result.options || []).filter(o => o.voice !== chosenOption?.voice)

  const section = (color, label, content) => `
    <div style="margin-bottom:20px;border-radius:12px;overflow:hidden;border-left:4px solid ${color};background:${PARCHMENT};padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${color};">${label}</p>
      ${content}
    </div>`

  const p = (text) => `<p style="margin:0;font-size:15px;line-height:1.7;color:${INK};">${text}</p>`

  const componentsGrid = `
    <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-top:6px;">
      <div style="background:white;border-radius:10px;padding:12px 14px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.4);">Who you help</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${INK};">${result.who || ''}</p>
      </div>
      <div style="background:white;border-radius:10px;padding:12px 14px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.4);">What you do</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${INK};">${result.what || ''}</p>
      </div>
      <div style="background:white;border-radius:10px;padding:12px 14px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.4);">The result</p>
        <p style="margin:0;font-size:14px;line-height:1.55;color:${INK};">${result.result || ''}</p>
      </div>
    </div>`

  const otherOptionsHTML = otherOptions.length ? `
    <div style="margin-top:18px;padding-top:18px;border-top:1px dashed rgba(44,44,42,0.12);">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.5);">Want a different voice? Here are the other two:</p>
      ${otherOptions.map(o => `
        <div style="background:white;border-radius:10px;padding:14px 16px;margin-bottom:10px;border:1px solid rgba(44,44,42,0.08);">
          <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.4);">${o.label}</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:${INK};font-style:italic;">${o.statement}</p>
        </div>`).join('')}
    </div>` : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px 48px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,${SUNRISE},${MORNING});margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:22px;">🎯</div>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${INK};">${name}, here's your calling.</h1>
      <p style="margin:0;font-size:15px;color:rgba(44,44,42,0.5);line-height:1.6;">Your personalized mission statement is below. Save this email — it's the words you'll come back to.</p>
    </div>

    <!-- Card -->
    <div style="background:white;border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(44,44,42,0.08);">
      <div style="height:3px;background:linear-gradient(90deg,${SUNRISE},${MORNING},${GROWTH});border-radius:2px;margin:-28px -24px 24px;"></div>

      ${chosenOption ? `
        <div style="background:linear-gradient(135deg,${PARCHMENT},#fff);border-radius:14px;padding:24px;margin-bottom:24px;border:1px solid rgba(245,200,66,0.3);">
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#8a6500;">Your mission · ${chosenOption.label}</p>
          <p style="margin:0;font-size:19px;line-height:1.5;color:${INK};font-style:italic;font-weight:500;">"${chosenOption.statement}"</p>
        </div>` : ''}

      ${section(GROWTH, 'The Three Components', componentsGrid)}
      ${result.insight ? section(MORNING, 'Why This Fits You', p(result.insight)) : ''}
      ${result.next_step ? section(SUNRISE, 'One Step This Week', p(result.next_step)) : ''}

      ${otherOptionsHTML}

      <!-- CTA -->
      <div style="text-align:center;margin-top:28px;padding-top:24px;border-top:1px solid rgba(44,44,42,0.08);">
        <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:${INK};">You have the words. Now let's build the path.</h3>
        <p style="margin:0 0 20px;font-size:14px;color:rgba(44,44,42,0.5);line-height:1.6;">Book a 60-minute strategy session and we'll turn this mission into a real next step — whether that's a first offer, a launch, or a clearer way to talk about your work.</p>
        <a href="https://osilpistole.thrivecart.com/prophetic-strategy-session/" style="display:inline-block;background:${SUNRISE};color:${INK};text-decoration:none;border-radius:999px;padding:14px 32px;font-weight:700;font-size:15px;box-shadow:0 8px 24px rgba(245,200,66,0.35);">
          Book a Strategy Session — $99 →
        </a>
        <p style="margin:12px 0 0;font-size:12px;color:rgba(44,44,42,0.3);">Session cost credited toward any project if you decide to work with Osil.</p>
      </div>

      <!-- Other free quizzes -->
      <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(44,44,42,0.08);">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(44,44,42,0.5);text-align:center;">Other free assessments you might want next:</p>
        <div style="display:grid;grid-template-columns:1fr;gap:8px;">
          <a href="https://osilpistole.com/spiritual-gifts" style="background:${PARCHMENT};border-radius:10px;padding:12px 16px;text-decoration:none;color:${INK};font-size:14px;">→ Spiritual Gifts Assessment</a>
          <a href="https://osilpistole.com/fivefold" style="background:${PARCHMENT};border-radius:10px;padding:12px 16px;text-decoration:none;color:${INK};font-size:14px;">→ 5-Fold Ministry Assessment</a>
          <a href="https://osilpistole.com/quiz/start" style="background:${PARCHMENT};border-radius:10px;padding:12px 16px;text-decoration:none;color:${INK};font-size:14px;">→ AI Build Quiz — What Should You Build First?</a>
        </div>
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

  const { name, email, conversation, result, chosen } = req.body

  if (!name || !email || !conversation || !result) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // 1. Kit (ConvertKit) — subscribe to the Calling Quiz form so they get the new tag.
  const kitApiKey = process.env.KIT_API_KEY
  const kitFormId = process.env.KIT_QUIZ_FORM_ID_CallingForm

  if (kitApiKey && kitFormId) {
    try {
      const truncate = (str, n) => (str && str.length > n) ? str.slice(0, n - 1) + '…' : (str || '')
      const chosenOption = result.options?.find(o => o.voice === chosen) || result.options?.[0]

      await fetch(`https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          first_name: name,
          fields: {
            calling_who: truncate(result.who, 500),
            calling_what: truncate(result.what, 500),
            calling_result: truncate(result.result, 500),
            calling_chosen_voice: chosenOption?.voice || '',
            calling_chosen_label: chosenOption?.label || '',
            calling_chosen_statement: truncate(chosenOption?.statement, 500),
            calling_option_plain: truncate(result.options?.find(o => o.voice === 'plain')?.statement, 500),
            calling_option_punchy: truncate(result.options?.find(o => o.voice === 'punchy')?.statement, 500),
            calling_option_calling: truncate(result.options?.find(o => o.voice === 'calling')?.statement, 500),
            calling_insight: truncate(result.insight, 500),
            calling_next_step: truncate(result.next_step, 500),
          },
        }),
      })
    } catch (err) {
      console.error('Kit error:', err)
    }
  } else if (!kitFormId) {
    console.warn('KIT_QUIZ_FORM_ID_CallingForm not set — Kit subscribe skipped')
  }

  // 2. Resend — email the results.
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
          subject: `${name}, here's your mission 🎯`,
          html: buildResultsEmail(name, result, chosen),
        }),
      })
    } catch (err) {
      console.error('Resend error:', err)
    }
  }

  return res.status(200).json({ ok: true })
}
