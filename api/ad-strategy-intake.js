// Vercel serverless function.
// Receives the FB Ad Strategy Intake form submission, formats it into a
// clean HTML email, and sends it via Resend to Osil's inbox. Also
// fires a warm confirmation email to the submitter so they know it was
// received.

export const maxDuration = 15

const RESEND_API_URL = 'https://api.resend.com/emails'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    res.status(500).json({ ok: false, error: 'RESEND_API_KEY is not configured on Vercel.' })
    return
  }

  let form
  try {
    form = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    res.status(400).json({ ok: false, error: 'Invalid JSON.' })
    return
  }

  if (!form?.business_name || !form?.email) {
    res.status(400).json({ ok: false, error: 'Business name and email are required.' })
    return
  }

  const submittedAt = new Date().toISOString()

  // ---- Email 1: internal alert to Osil ---------------------------
  const osilHtml = buildOsilEmailHtml(form, submittedAt)
  const osilSubject = `Ad Strategy Intake — ${form.business_name}`

  try {
    const r1 = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Osil Pistole <osil@osilpistole.com>',
        to: ['osil@osilpistole.com'],
        reply_to: form.email,
        subject: osilSubject,
        html: osilHtml,
      }),
    })
    if (!r1.ok) {
      const errBody = await r1.text().catch(() => '')
      console.error('Resend (internal) error:', r1.status, errBody)
      res.status(500).json({ ok: false, error: 'Failed to send intake to Osil.' })
      return
    }
  } catch (err) {
    console.error('Resend internal exception:', err)
    res.status(500).json({ ok: false, error: 'Failed to send intake.' })
    return
  }

  // ---- Email 2: confirmation to submitter (best-effort) ----------
  try {
    await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Osil Pistole <osil@osilpistole.com>',
        to: [form.email],
        subject: `I got your Ad Strategy intake — reading it now`,
        html: buildSubmitterConfirmationHtml(form),
      }),
    })
  } catch (err) {
    // Don't fail the whole request if the confirmation email fails.
    console.warn('Submitter confirmation email failed:', err)
  }

  res.status(200).json({ ok: true })
}

// ==================================================================
// Email templates
// ==================================================================

function buildOsilEmailHtml(form, submittedAt) {
  const styles = `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #2C2C2A; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px; background: #FDFAF5; }
    h1 { font-size: 22px; margin: 0 0 4px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.18em; color: #F5C842; margin: 32px 0 12px; padding-bottom: 6px; border-bottom: 1px solid rgba(44,44,42,0.1); }
    p { margin: 0 0 12px; font-size: 15px; }
    .contact { background: #ffffff; border: 1px solid rgba(44,44,42,0.08); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; }
    .contact a { color: #2C2C2A; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(44,44,42,0.55); font-weight: 700; margin-top: 14px; }
    .val { font-size: 15px; color: #2C2C2A; margin-top: 2px; white-space: pre-wrap; }
    .empty { color: rgba(44,44,42,0.35); font-style: italic; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(44,44,42,0.1); font-size: 12px; color: rgba(44,44,42,0.45); }
    ul.tags { list-style: none; padding: 0; margin: 6px 0 0; display: flex; flex-wrap: wrap; gap: 6px; }
    ul.tags li { background: #F5C842; color: #2C2C2A; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.08em; }
  `

  const row = (label, val) => {
    const empty = val == null || val === '' || (Array.isArray(val) && val.length === 0)
    return `
      <div class="label">${escape(label)}</div>
      <div class="val ${empty ? 'empty' : ''}">${empty ? '(not answered)' : Array.isArray(val) ? `<ul class="tags">${val.map(v => `<li>${escape(v)}</li>`).join('')}</ul>` : escape(val)}</div>
    `
  }

  return `<!doctype html>
<html>
<head><meta charset="utf-8" /><style>${styles}</style></head>
<body>
  <h1>New Ad Strategy Intake</h1>
  <p style="color: rgba(44,44,42,0.55); font-size: 13px; margin: 0 0 20px;">Received ${escape(submittedAt)}</p>

  <div class="contact">
    <div style="font-size: 18px; font-weight: 700;">${escape(form.business_name)}</div>
    <div style="font-size: 14px; color: rgba(44,44,42,0.65); margin-top: 4px;">${escape(form.contact_name || '')}</div>
    <div style="margin-top: 10px; font-size: 14px;">
      📧 <a href="mailto:${escape(form.email)}">${escape(form.email)}</a>
      ${form.phone ? ` &nbsp;·&nbsp; 📞 ${escape(form.phone)}` : ''}
    </div>
    ${form.website ? `<div style="margin-top: 6px; font-size: 14px;">🔗 <a href="${escape(form.website)}">${escape(form.website)}</a></div>` : ''}
    ${form.facebook_page ? `<div style="margin-top: 6px; font-size: 14px;">📘 <a href="${escape(form.facebook_page)}">${escape(form.facebook_page)}</a></div>` : ''}
    ${form.instagram ? `<div style="margin-top: 6px; font-size: 14px;">📸 ${escape(form.instagram)}</div>` : ''}
  </div>

  <h2>The Vision</h2>
  ${row('Primary goal', form.primary_goal === 'Other' ? form.primary_goal_other : form.primary_goal)}
  ${row('What they do', form.what_you_do)}
  ${row('What makes them different', form.what_makes_you_different)}
  ${row('Why customers choose them', form.why_customers_choose_you)}
  ${row('Ideal client (demo)', form.ideal_client_demo)}
  ${row('What client is REALLY struggling with', form.ideal_client_struggling)}
  ${row('What would stop the scroll', form.stop_scrolling_hook)}

  <h2>The Journey</h2>
  ${row('The offer', form.offer_description)}
  ${row('Offer type', form.offer_type)}
  ${row('Click destination', form.destination_type)}
  ${row('Destination URL', form.destination_url || form.destination_other)}
  ${row('Who follows up', form.follow_up_who)}
  ${row('How quickly', form.follow_up_speed)}
  ${row('How they become a customer', form.becomes_customer_how)}
  ${row('The ONE thing you want them to do', form.the_one_thing)}

  <h2>The Depth</h2>
  ${row('Pre-purchase questions', form.pre_purchase_questions)}
  ${row('Objections', form.objections)}
  ${row('What they\'re REALLY buying', form.what_theyre_really_buying)}
  ${row('Can become customer without talking to you', form.customer_without_talking)}

  <h2>The Practical</h2>
  ${row('Monthly ad budget', form.monthly_budget)}
  ${row('Success looks like', form.success_metric)}
  ${row('Has a website', form.has_website)}
  ${form.has_website === 'Yes' ? row('Website platform', form.website_platform === 'Other' ? `Other — ${form.website_platform_other}` : form.website_platform) : ''}
  ${row('Meta Pixel installed', form.has_pixel === 'yes' ? 'Yes' : form.has_pixel === 'no' ? 'No' : form.has_pixel === 'not_sure' ? 'Not sure' : '')}
  ${row('Assets they have', form.assets_have)}
  ${row('Marketing assets available', form.marketing_assets)}
  ${form.anything_else ? row('Anything else', form.anything_else) : ''}

  <div class="footer">
    Reply directly to this email — it goes to ${escape(form.email)}.
  </div>
</body>
</html>`
}

function buildSubmitterConfirmationHtml(form) {
  const styles = `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #2C2C2A; line-height: 1.7; max-width: 560px; margin: 0 auto; padding: 24px; background: #FDFAF5; }
    p { margin: 0 0 14px; font-size: 15px; }
    .sig { margin-top: 24px; font-size: 15px; color: rgba(44,44,42,0.7); }
  `
  const firstName = (form.contact_name || '').split(' ')[0] || 'friend'

  return `<!doctype html>
<html>
<head><meta charset="utf-8" /><style>${styles}</style></head>
<body>
  <p>${escape(firstName)} —</p>

  <p>I got your Ad Strategy intake. Thank you for the honest answers — the depth ones especially. That's the part that decides whether a campaign works.</p>

  <p>I'll read every answer carefully and reply personally within 24 hours from this same address.</p>

  <p><strong>One quick ask:</strong> if you have any graphics, logo files, brand assets, photos, or videos you want me to work with — <strong>reply to this email</strong> with them attached. Any size, any format. It saves us a back-and-forth once we're on a call.</p>

  <p>If nothing lands in your inbox by tomorrow, check spam — and either way, feel free to reply to this note directly.</p>

  <p class="sig">— Osil</p>
</body>
</html>`
}

// Minimal HTML escape.
function escape(str) {
  if (str == null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
