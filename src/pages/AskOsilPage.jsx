import AskOsilChat from '../components/AskOsilChat.jsx'

export default function AskOsilPage() {
  return (
    <main className="bg-parchment text-ink min-h-screen overflow-x-hidden">
      {/* Soft band of warmth at the top — matches the rest of the brand */}
      <div className="relative">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(245,200,66,0.10), transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-2xl px-6 pt-20 pb-10 text-center">
          <div className="mx-auto mb-8 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_18px_40px_rgba(44,44,42,0.16)] md:h-44 md:w-44">
            <img
              src="/images/osil-cartoon.png"
              alt="Osil Pistole — illustrated portrait, laughing on a vintage telephone"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">
            Osil&apos;s AI Clone
          </p>

          <h1
            className="text-ink leading-[1.05] tracking-tight text-[clamp(36px,6vw,60px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Talk to my AI clone.
          </h1>
          <p className="mt-6 text-ink/65 text-lg leading-relaxed max-w-xl mx-auto">
            She&apos;s not me — but she sounds like me, knows my work, and can
            point you to what&apos;ll meet you where you are. Ask anything.
          </p>
        </div>
      </div>

      {/* Chat */}
      <div className="px-6 pb-16">
        <AskOsilChat />
      </div>

      <p className="px-6 pb-20 text-center text-sm text-ink/50">
        Want to talk to the real Osil?{' '}
        <a
          href="/work-with-me"
          className="underline underline-offset-4 hover:text-ink"
        >
          Book a call →
        </a>
      </p>
    </main>
  )
}
