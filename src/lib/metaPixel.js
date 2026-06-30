// Meta Pixel event helpers.
//
// The base Pixel script (in index.html) fires PageView on initial load,
// and MetaPixelPageView (in src/components) fires PageView on every
// React Router route change. THIS module covers the standard ecommerce
// + lead events that Meta Ads Manager optimizes towards.
//
// All functions are safe to call:
// - On the server (they no-op when window/fbq is missing).
// - Before the Pixel script loads (Pixel queues calls and replays them
//   once 'fbevents.js' is ready — that's what the IIFE in index.html
//   sets up).

function fbq(...args) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  window.fbq(...args)
}

/**
 * Someone landed on a product page (Presence, Awaken & Align, Build, etc.).
 * Builds the "interested in X" audience for retargeting.
 */
export function trackViewContent(opts) {
  fbq('track', 'ViewContent', {
    content_name: opts.name,
    content_category: opts.category || 'Product',
    content_ids: opts.id ? [opts.id] : undefined,
    value: opts.value,
    currency: opts.currency || 'USD',
  })
}

/**
 * Someone clicked a "Buy" CTA. The strongest pre-purchase signal we
 * have on this site. Builds the "almost bought" retargeting audience —
 * THE highest-converting one.
 */
export function trackAddToCart(opts) {
  fbq('track', 'AddToCart', {
    content_name: opts.name,
    content_category: opts.category || 'Product',
    content_ids: opts.id ? [opts.id] : undefined,
    value: opts.value,
    currency: opts.currency || 'USD',
  })
}

/**
 * Someone initiated the checkout flow (went off-site to ThriveCart).
 * Note: ThriveCart fires its own Purchase event on completion — this
 * just signals intent at the handoff moment.
 */
export function trackInitiateCheckout(opts) {
  fbq('track', 'InitiateCheckout', {
    content_name: opts.name,
    content_category: opts.category || 'Product',
    value: opts.value,
    currency: opts.currency || 'USD',
  })
}

/**
 * Someone gave us a top-of-funnel signal — quiz completion, calendar
 * booking, form submit. Helps Meta optimize for warm intent, not just
 * pageviews.
 */
export function trackLead(opts) {
  fbq('track', 'Lead', {
    content_name: opts.name,
    content_category: opts.category || 'Lead',
    value: opts.value,
    currency: opts.currency || 'USD',
  })
}

/**
 * Fallback Purchase event firing — only used if ThriveCart's built-in
 * Pixel integration is NOT enabled. Fired from /thank-you with values
 * read off the query string ThriveCart redirects to.
 */
export function trackPurchase(opts) {
  fbq('track', 'Purchase', {
    content_name: opts.name,
    content_ids: opts.id ? [opts.id] : undefined,
    value: opts.value,
    currency: opts.currency || 'USD',
    num_items: opts.num_items || 1,
  })
}
