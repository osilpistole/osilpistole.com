import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const services = [
  {
    num: '01',
    title: 'Idea Development and Brainstorming',
    slug: 'idea-development-and-brainstorming',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Every great business, brand, or initiative starts as an idea — but most ideas stay stuck at the concept stage because they never get properly developed. Osil helps you take your vision from vague to vivid. Through focused conversation and strategic questioning, she helps you stress-test your ideas, fill in the gaps, identify the opportunities, and shape something that is not just exciting but viable and executable.',
  },
  {
    num: '02',
    title: 'Strategic Planning',
    slug: 'strategic-planning',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'Vision without a plan is just a wish. Strategic planning with Osil means building a real, sequenced roadmap — not just goals and mission statements, but an actual step-by-step plan for how to get from where you are to where you want to be. This includes defining priorities, allocating resources, setting timelines, and knowing exactly what success looks like at each stage.',
  },
  {
    num: '03',
    title: 'Business Consulting',
    slug: 'business-consulting',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Holistic, experienced business guidance covering every dimension of your organization — from operations and team dynamics to growth strategy, financial decisions, and long-term direction. With over 30 years of real-world entrepreneurial and business experience, Osil brings both the big-picture perspective and the practical knowledge to help you make better decisions, faster.',
  },
  {
    num: '04',
    title: 'Brand Development',
    slug: 'brand-development',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Your brand is more than a logo — it is who you are, what you stand for, and how the world experiences you. Osil helps individuals and organizations discover, define, and develop their brand from the inside out. This includes brand identity, visual direction, tone of voice, story, and the full ecosystem of how your brand shows up across every touchpoint — consistently and compellingly.',
  },
  {
    num: '05',
    title: 'Messaging and Positioning',
    slug: 'messaging-and-positioning',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'What do you say, how do you say it, and to whom? Messaging is the backbone of everything — your website, your pitch, your content, your conversations. Osil helps you find the right words: clear, resonant, and true to who you are. Positioning work identifies where you stand in the market, what makes you distinct, and how to communicate your value in a way that connects and converts.',
  },
  {
    num: '06',
    title: 'Marketing and Advertising Strategy',
    slug: 'marketing-and-advertising-strategy',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Marketing that actually works starts with knowing your audience, choosing the right channels, and building a strategy that is sustainable — not just a one-time campaign. Osil helps you build a full marketing approach that covers content strategy, paid advertising, email, partnerships, and more. Whether starting from scratch or refining what already exists, the goal is always growth that is intentional and measurable.',
  },
  {
    num: '07',
    title: 'Website Planning and Development',
    slug: 'website-planning-and-development',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'A great website starts with strategy, not design. Osil helps you think through your site architecturally — what pages do you need, what should each one accomplish, how should visitors move through it, and what action should they take. From wireframing and content planning to design direction and development oversight, she ensures your website is not just beautiful but effective and aligned with your goals.',
  },
  {
    num: '08',
    title: 'App Development Strategy',
    slug: 'app-development-strategy',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'Building an app without a clear strategy is expensive and risky. Osil helps you define what your app should do, who it is for, how it should work, and how to bring it to market — before a single line of code is written. This includes feature scoping, user experience planning, working with developers, timeline and budget planning, and launch strategy.',
  },
  {
    num: '09',
    title: 'Social Media Management and Growth',
    slug: 'social-media-management-and-growth',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Social media done well is one of the most powerful tools for building a brand and growing an audience — but most people are doing it inconsistently, without a clear strategy. Osil helps you define your content approach, choose the right platforms, build a sustainable content system, grow your following, and turn social media from a chore into a genuine asset for your brand or business.',
  },
  {
    num: '10',
    title: 'Launch Planning',
    slug: 'launch-planning',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Whether launching a product, service, course, ministry, or entire brand, a successful launch requires careful sequencing and momentum-building. Osil helps you plan and execute every phase — pre-launch strategy, audience warming, launch day execution, and post-launch follow-through. The goal is not just a big day, but a launch that creates lasting momentum and real results.',
  },
  {
    num: '11',
    title: 'Offer Development',
    slug: 'offer-development',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'What you sell, how you package it, how you price it, and how you present it all determine whether people say yes. Osil helps you shape your offer so it is compelling, clear, and easy to buy — whether you are selling a service, a product, a coaching program, or a consulting package. This includes positioning, pricing strategy, naming, description, and the experience of the offer itself.',
  },
  {
    num: '12',
    title: 'Maximizing What Is Already Working',
    slug: 'maximizing-what-is-already-working',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Sometimes the biggest opportunity is not something new — it is getting more out of what you already have. Osil helps you audit your existing assets, systems, relationships, and revenue streams to identify what is working, what is underperforming, and where the untapped leverage points are. This is one of the fastest ways to create growth without adding more complexity.',
  },
  {
    num: '13',
    title: 'Clarifying Next Steps and Implementation',
    slug: 'clarifying-next-steps-and-implementation',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Knowing what to do next — and in what order — is often the most valuable thing a consultant can provide. Osil helps you move from overwhelm to clarity with a practical, prioritized implementation plan. This means knowing exactly what to focus on first, what to delegate, what to defer, and how to make consistent progress without burning out or losing momentum.',
  },
]

export default function ConsultingServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-6 lg:px-14 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <p className="absolute bottom-0 right-0 font-heading text-[18vw] font-black text-ink/[0.035] leading-none select-none pointer-events-none translate-y-4">BUILD</p>

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <Link to="/consulting" className="inline-flex items-center gap-2 text-ink/40 text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors mb-8 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Consulting
            </Link>
            <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Consulting Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.08] tracking-tight max-w-3xl">
              Everything consulting with Osil can include.
            </h1>
            <p className="mt-6 text-ink/55 text-[17px] leading-relaxed max-w-xl">
              No two engagements look the same. Below is the full range of what consulting with Osil can cover — every service is tailored to where you are and what you actually need.
            </p>
            <div className="mt-8">
              <ButtonPrimary to="/contact">Start a Conversation</ButtonPrimary>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <RevealSection key={s.num} delay={i * 0.05}>
                <div id={s.slug} className="group bg-white rounded-3xl p-8 md:p-10 border border-ink/6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full scroll-mt-28">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-8 h-1 ${s.accent} rounded-full`} />
                    <span className="font-heading text-4xl font-black text-ink/8">{s.num}</span>
                  </div>
                  <h2 className={`font-heading text-xl font-bold text-ink mb-4 group-hover:${s.accentText} transition-colors duration-200`}>
                    {s.title}
                  </h2>
                  <p className="text-ink/55 text-[15px] leading-relaxed">{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom note */}
      <section className="py-16 md:py-20 px-6 lg:px-14 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <div className="w-10 h-1 bg-growth mx-auto rounded-full mb-8" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-5">
              Not sure what you need?
            </h2>
            <p className="text-ink/55 text-[17px] leading-relaxed max-w-2xl mx-auto">
              That is exactly what the first conversation is for. Reach out, share where you are and where you want to go — and Osil will help you figure out the right starting point.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonPrimary to="/contact">Start a Conversation</ButtonPrimary>
              <Link
                to="/consulting"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink transition-all"
              >
                Back to Consulting
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <PageCTA
        heading="Ready to build what's next?"
        sub="Let's get clear on your vision and start building something real."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
