export default function PrivacyPage() {
  return (
    <main className="bg-parchment text-ink min-h-screen overflow-x-hidden">
      <section className="relative px-6 lg:px-16 pt-28 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(245,200,66,0.10), transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.32em] text-sunrise mb-5">
            Privacy
          </p>
          <h1
            className="text-ink leading-[1.05] tracking-tight text-[clamp(36px,6vw,60px)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Privacy, in plain English.
          </h1>
          <p className="mt-6 text-ink/65 text-base md:text-lg leading-relaxed">
            No legalese. Here&apos;s what I collect, what I do with it, and what I don&apos;t.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto space-y-12 text-ink/75 text-[15px] leading-relaxed">

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Who runs this site</h2>
            <p>
              I&apos;m Osil Pistole. This site is mine — built and maintained by me.
              If you want to reach me, email <a className="underline underline-offset-2" href="mailto:osil@osilpistole.com">osil@osilpistole.com</a>.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">What I collect</h2>
            <ul className="space-y-3 list-disc pl-5 marker:text-sunrise">
              <li>
                <strong>Your email and name</strong> — only when you give them to me (signing up for a quiz result,
                joining the email list, or buying a product).
              </li>
              <li>
                <strong>Anything you type into the chat</strong> with my AI clone — so the AI can answer you. Messages are
                sent to Anthropic (the company that makes the AI model) for processing.
              </li>
              <li>
                <strong>Basic, anonymous site analytics</strong> — pages viewed, country (city level, not address),
                and which links got clicked. No tracking across other websites.
              </li>
              <li>
                <strong>Payment details</strong> — handled entirely by ThriveCart and Stripe. I never see your card number.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">What I don&apos;t do</h2>
            <ul className="space-y-3 list-disc pl-5 marker:text-sunrise">
              <li>I don&apos;t sell your data. Ever.</li>
              <li>I don&apos;t share your email with anyone besides the email tool I use to send my own newsletter (Kit/ConvertKit).</li>
              <li>I don&apos;t use your chat conversations to train any AI model.</li>
              <li>I don&apos;t run third-party advertising trackers on this site.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">A note about the AI clone</h2>
            <p>
              The chat on this site is an AI assistant trained on my voice and my work. It is not me.
              It can be wrong. It is not a substitute for medical, legal, financial, or mental-health advice.
              If you&apos;re in crisis, please call or text <strong>988</strong> (US Suicide &amp; Crisis Lifeline).
            </p>
            <p className="mt-4">
              Don&apos;t put anything in the chat you wouldn&apos;t put in an email.
              Conversations are sent to <a className="underline underline-offset-2" href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Anthropic</a> for AI processing and may be logged briefly for safety and quality.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Tools I use</h2>
            <p>This site depends on a small set of trusted third-party tools. Each has its own privacy policy:</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-sunrise mt-3">
              <li><strong>Vercel</strong> — hosting</li>
              <li><strong>ThriveCart &amp; Stripe</strong> — checkout and payments</li>
              <li><strong>Kit (ConvertKit)</strong> — email list and newsletter</li>
              <li><strong>Anthropic (Claude)</strong> — the AI clone</li>
              <li><strong>ElevenLabs</strong> — voice readings inside the Presence portal</li>
              <li><strong>Supabase</strong> — member portal data (your quiz results, journal entries)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Cookies</h2>
            <p>
              I use a small number of essential cookies (to keep you logged into the member portal, for example).
              No tracking cookies, no third-party advertising cookies.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Your rights</h2>
            <p>You can ask me to:</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-sunrise mt-3">
              <li>Show you what data I have on you.</li>
              <li>Correct anything that&apos;s wrong.</li>
              <li>Delete your account, your email from the list, or your chat history.</li>
            </ul>
            <p className="mt-3">
              Email <a className="underline underline-offset-2" href="mailto:osil@osilpistole.com">osil@osilpistole.com</a> and I&apos;ll handle it personally within 7 days.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Kids</h2>
            <p>
              This site isn&apos;t designed for anyone under 13. Please don&apos;t use the chat or sign up
              for emails if you&apos;re younger than 13.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-ink mb-3">Changes</h2>
            <p>
              I&apos;ll update this page when something material changes. The date below is the last update.
            </p>
          </div>

          <div className="pt-8 border-t border-ink/10">
            <p className="text-ink/45 text-sm">
              Last updated: June 9, 2026.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
