import { useState } from 'react'
import AICloneWidget from './AICloneWidget.jsx'

export default function AICloneBubble() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Talk to Osil's AI clone"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5C842] shadow-lg transition hover:scale-105"
      >
        <span className="text-2xl">🎙</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(360px,90vw)] rounded-2xl border border-[#2C2C2A]/10 bg-white p-5 shadow-2xl">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-[Sora] text-sm font-semibold text-[#2C2C2A]">Talk to Osil</p>
          <p className="text-xs text-[#2C2C2A]/60">AI clone — sounds like her, trained on her work</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="text-xl text-[#2C2C2A]/50 hover:text-[#2C2C2A]"
        >
          ×
        </button>
      </div>
      <AICloneWidget />
    </div>
  )
}
