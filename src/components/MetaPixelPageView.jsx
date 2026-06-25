import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Meta Pixel base script in index.html fires PageView once on initial
// load. In a React Router SPA, route changes don't reload the page, so
// the Pixel sees only one PageView per visit unless we manually fire on
// every navigation. This component does that.
//
// Verify with the Meta Pixel Helper Chrome extension — you should see
// a PageView fire every time you navigate to a new route.
export default function MetaPixelPageView() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
    window.fbq('track', 'PageView')
  }, [pathname, search])

  return null
}
