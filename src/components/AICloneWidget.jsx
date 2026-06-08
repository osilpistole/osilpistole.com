import { useEffect } from 'react'

const SCRIPT_SRC = 'https://elevenlabs.io/convai-widget/index.js'
const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID

export default function AICloneWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    document.body.appendChild(s)
  }, [])

  if (!AGENT_ID) return null
  return <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
}
