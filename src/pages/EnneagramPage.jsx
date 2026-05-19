// src/pages/EnneagramPage.jsx
import { useEffect } from 'react'
import EnneagramQuiz from '../components/EnneagramQuiz.jsx'

export default function EnneagramPage() {
  useEffect(() => {
    document.title = 'The Enneagram for Business Quiz · Osil Pistole'
  }, [])

  // pt-24 clears the fixed Header — same pattern as the SpiritualGifts + Fivefold pages.
  return (
    <div className="pt-24">
      <EnneagramQuiz />
    </div>
  )
}
