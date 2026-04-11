import { useState, useEffect } from 'react'
import RevealSection from './RevealSection'

/* ─── Data ─── */
export const allTestimonials = {
  speaking: [
    {
      quote: "Osil has a gift for holding a room. She speaks with authority and warmth at the same time — people feel safe enough to let down their guard and open up. That is rare.",
      initials: 'R.N.',
      context: 'Conference Organizer',
    },
    {
      quote: "She spoke at our women's retreat and the response was unlike anything we had seen before. People were in tears, taking notes, and asking when she was coming back.",
      initials: 'L.H.',
      context: "Women's Event Host",
    },
    {
      quote: "I have heard a lot of speakers. Osil is one of the few who actually changes something in the room. Her message on identity stayed with our team for months.",
      initials: 'D.K.',
      context: 'Leadership Event',
    },
  ],
  consulting: [
    {
      quote: "She built our startup's entire brand and website from scratch. The clarity she brought to who we were and how we communicated it was worth more than any course or consultant we had tried before.",
      initials: 'K.R.',
      context: 'Startup Founder',
    },
    {
      quote: "We were a preschool trying to look more professional and reach more families. Osil took our vision and turned it into a website and brand we are genuinely proud of.",
      initials: 'N.A.',
      context: 'Preschool Director',
    },
    {
      quote: "From pitch deck to graphics to marketing strategy — she handled everything with excellence. Every deliverable was better than what I imagined.",
      initials: 'B.T.',
      context: 'Business Owner',
    },
  ],
  mentoring: [
    {
      quote: "Osil helped me step into a mentorship I had been afraid to launch for years. She walked me through every step — the messaging, the structure, the launch. It was everything I needed.",
      initials: 'S.L.',
      context: 'Mentorship Leader',
    },
    {
      quote: "I came to Osil confused about my calling and honestly a little afraid. She helped me get so clear on who I am and what I carry that the fear stopped having so much power.",
      initials: 'C.F.',
      context: 'Mentoring Client',
    },
    {
      quote: "She taught on prophetic gifts in a way that was grounded, practical, and genuinely life-giving. For the first time I felt like I understood what I carried and how to use it well.",
      initials: 'J.M.',
      context: 'Prophetic Ministry',
    },
  ],
  coaching: [
    {
      quote: "Our team came in stuck and unsure of direction. After the coaching session with Osil, we walked out with a clear plan, renewed vision, and actual momentum. It was exactly what we needed.",
      initials: 'M.T.',
      context: 'Team Leader',
    },
    {
      quote: "One-on-one coaching with Osil was one of the best investments I have made. She does not just help you think — she helps you move. I left every session with a next step I actually took.",
      initials: 'A.W.',
      context: 'Coaching Client',
    },
    {
      quote: "She coached our leadership team through a season of transition. Her ability to cut through the noise and help us see clearly was exactly what we needed. We are in a completely different place.",
      initials: 'D.K.',
      context: 'Church Leadership',
    },
  ],
}

/* Subset used on the home page carousel */
export const homeTestimonials = [
  {
    quote: "I came in feeling stuck and left knowing exactly who I am and what I'm called to do. Osil's message wasn't just words — it was a turning point.",
    initials: 'T.M.',
    context: 'Speaking — Women\'s Retreat',
  },
  {
    quote: "She built our entire website and brand from scratch. We went from a blank page to a full launch in weeks. I still can't believe how good it turned out.",
    initials: 'K.R.',
    context: 'Consulting — Startup',
  },
  {
    quote: "The email campaign she built for us outperformed everything we had tried before. Clear, compelling, and it actually converted.",
    initials: 'J.B.',
    context: 'Consulting — Marketing',
  },
  {
    quote: "In just a few sessions with Osil I had more clarity about my calling than I had gained in a decade of trying to figure it out on my own.",
    initials: 'S.L.',
    context: 'Mentoring',
  },
  {
    quote: "She brought a level of depth and insight to our team training that we hadn't experienced before. People were still talking about it weeks later.",
    initials: 'M.T.',
    context: 'Coaching — Team Training',
  },
  {
    quote: "When Osil teaches on the prophetic it is not theory — it is lived. She made something I had always found intimidating feel natural and safe.",
    initials: 'C.F.',
    context: 'Speaking — Church Event',
  },
  {
    quote: "Happy Hour was exactly what I needed — honest, encouraging, and real. I listened every week and felt like someone actually understood what I was walking through.",
    initials: 'A.W.',
    context: 'Podcast Listener',
  },
  {
    quote: "She helped us clarify our ministry's message and build a website that actually represents who we are. The response from our community was immediate.",
    initials: 'P.D.',
    context: 'Consulting — Ministry',
  },
]

/* ─── Home carousel ─── */
export function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const count = homeTestimonials.length

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % count), 6000)
    return () => clearInterval(t)
  }, [count])

  const t = homeTestimonials[active]

  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-ink text-white">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-14 text-center">What People Say</p>
        </RevealSection>

        {/* Quote card */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <div key={active} className="animate-shift-fade text-center max-w-3xl mx-auto">
            <svg className="w-8 h-8 text-sunrise/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="font-heading text-xl md:text-2xl font-bold text-white leading-[1.35] mb-8">
              "{t.quote}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sunrise/20 flex items-center justify-center">
                <span className="text-sunrise text-[10px] font-black">{t.initials}</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">{t.initials}</p>
                <p className="text-white/35 text-[11px] uppercase tracking-wider font-semibold">{t.context}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setActive(i => (i - 1 + count) % count)}
            className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-white"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="flex gap-2">
            {homeTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-sunrise' : 'w-2 h-2 bg-white/15 hover:bg-white/30'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive(i => (i + 1) % count)}
            className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition-all duration-200 text-white/40 hover:text-white"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Static reviews for service pages ─── */
export function StaticTestimonials({ reviews, accent = 'bg-sunrise', accentText = 'text-sunrise' }) {
  return (
    <section className="py-20 md:py-24 px-6 lg:px-14 bg-white">
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <p className={`${accentText} text-[11px] font-bold uppercase tracking-[0.25em] mb-10`}>What People Say</p>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <RevealSection key={i} delay={i * 0.08} className="flex">
              <div className="bg-parchment rounded-3xl p-8 border border-ink/6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col w-full">
                <svg className={`w-6 h-6 ${accentText} opacity-40 mb-5 shrink-0`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-ink/65 text-[15px] leading-relaxed flex-1 mb-6">"{r.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-ink/8">
                  <div className={`w-8 h-8 rounded-full ${accent} opacity-20 flex items-center justify-center shrink-0`}>
                    <span className={`${accentText} text-[10px] font-black opacity-100`}>{r.initials}</span>
                  </div>
                  <div>
                    <p className="text-ink font-bold text-sm">{r.initials}</p>
                    <p className="text-ink/35 text-[11px] uppercase tracking-wider font-semibold">{r.context}</p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
