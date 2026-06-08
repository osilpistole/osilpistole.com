import AICloneWidget from '../components/AICloneWidget.jsx'

export default function AskOsilPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-10 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-48 md:w-48">
          <img
            src="/images/IMG_7290.JPG"
            alt="Osil Pistole laughing on a vintage telephone"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>

        <h1 className="font-[Sora] text-4xl font-bold tracking-tight text-[#1A1A1A] md:text-5xl">
          Talk to my AI clone
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A]/70">
          She's not me — but she sounds like me, knows my work, and can point
          you to what'll meet you where you are. Ask anything.
        </p>

        <div className="mt-12 rounded-3xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm">
          <AICloneWidget />
        </div>

        <p className="mt-8 text-sm text-[#1A1A1A]/50">
          Want to talk to the real Osil?{' '}
          <a
            href="/work-with-me"
            className="underline underline-offset-4 hover:text-[#1A1A1A]"
          >
            Book a call →
          </a>
        </p>
      </div>
    </main>
  )
}
