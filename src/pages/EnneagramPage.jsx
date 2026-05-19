// src/pages/EnneagramPage.jsx
import { useEffect } from 'react'
import EnneagramQuiz from '../components/EnneagramQuiz.jsx'

export default function EnneagramPage() {
  useEffect(() => {
    document.title = 'The Enneagram for Business Quiz · Osil Pistole'
  }, [])

  return <EnneagramQuiz />
}
