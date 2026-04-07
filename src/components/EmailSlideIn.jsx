import { useState, useEffect } from 'react'

const KIT_FORM_URL = 'https://prodigious-mover-1024.kit.com/4edb810d28'

export default function EmailSlideIn() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (dismissed) return
    // Check if already dismissed this session
    if (sessionStorage.getItem('email-slide-dismissed')) {
      setDismissed(true)
      return
    }

    const onScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.5) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('email-slide-dismissed', 'true')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      // Try Kit's subscription API
      const res = await fetch(`https://app.kit.com/forms/4edb810d28/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email_address: email, first_name: firstName }),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => handleDismiss(), 3000)
      } else {
        // If API doesn't work, open Kit form with email pre-filled
        window.open(`${KIT_FORM_URL}?email_address=${encodeURIComponent(email)}`, '_blank')
        setSuccess(true)
        setTimeout(() => handleDismiss(), 3000)
      }
    } catch {
      // Fallback: open Kit form with email pre-filled
      window.open(`${KIT_FORM_URL}?email_address=${encodeURIComponent(email)}`, '_blank')
      setSuccess(true)
      setTimeout(() => handleDismiss(), 3000)
    } finally {
      setSending(false)
    }
  }

  if (dismissed && !visible) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] transition-all duration-500 ${
        visible && !dismissed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-ink/5 overflow-hidden">
        {/* Color stripe top */}
        <div className="h-1 color-stripe" />

        <div className="p-6">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-ink/30 hover:text-ink/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {success ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-growth/20 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-growth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-heading text-lg font-semibold text-ink">You're in!</p>
              <p className="text-ink/50 text-sm mt-1">Check your inbox to confirm.</p>
            </div>
          ) : (
            <>
              <p className="font-heading text-lg font-semibold text-ink mb-1">Stay connected</p>
              <p className="text-ink/55 text-sm mb-4">
                Get updates on new resources, events, and encouragement straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/10 bg-parchment text-ink text-sm placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-sunrise/50 focus:border-sunrise transition-all"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/10 bg-parchment text-ink text-sm placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-sunrise/50 focus:border-sunrise transition-all"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-sunrise text-ink font-semibold text-sm py-2.5 rounded-xl hover:bg-sunrise/85 transition-all btn-glow cursor-pointer disabled:opacity-60"
                >
                  {sending ? 'Joining...' : 'Join'}
                </button>
              </form>
              <p className="text-ink/30 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
