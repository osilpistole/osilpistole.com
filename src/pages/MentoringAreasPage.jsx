import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'
import RevealSection from '../components/RevealSection'
import PageCTA from '../components/PageCTA'

const areas = [
  {
    num: '01',
    title: 'Finding Your Message and Voice',
    slug: 'finding-your-message-and-voice',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'Before you can build anything — a business, a brand, a ministry, a platform — you have to know what you are actually saying and who you are saying it to. This area helps you excavate your message from the inside out: what you uniquely carry, what problem you solve, who needs to hear you, and how to say it in a way that is clear, true, and genuinely compelling. When your message is right, everything else gets easier.',
  },
  {
    num: '02',
    title: 'Building Influence, Platform, or Ministry',
    slug: 'building-influence-platform-or-ministry',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Whether you are building a business, a ministry, a personal brand, or a platform of influence, the principles are the same: clarity, consistency, strategy, and showing up as who you actually are. This area helps you think through the big picture of what you are building, who it is for, and how to grow it intentionally — without burning out or losing yourself in the process.',
  },
  {
    num: '03',
    title: 'Social Media, Branding, and Digital Presence',
    slug: 'social-media-branding-and-digital-presence',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Your digital presence is often the first impression people have of you — and it either opens doors or closes them before you ever get a chance to speak. This area covers everything from social media strategy and content creation to brand identity, visual consistency, and how to build an online presence that actually represents who you are. Practical, actionable, and built for the long game.',
  },
  {
    num: '04',
    title: 'Offer Development and Launch Strategy',
    slug: 'offer-development-and-launch-strategy',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'What you offer, how you package it, how you price it, and how you launch it all determine whether people say yes. This area helps you develop offers that are clear, compelling, and priced with confidence — and then build a launch strategy that creates real momentum. Whether it is your first offer or your tenth, the goal is the same: something worth buying, presented in a way that makes people want to.',
  },
  {
    num: '05',
    title: 'Stepping Into Your Calling',
    slug: 'stepping-into-your-calling',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Sensing a calling and actually walking in it are two very different things. This area helps you move from the internal knowing to the external doing — with clarity about what your calling looks like in this specific season, what steps to take first, and how to keep moving when the path is not fully visible yet. Osil helps you translate what is in your heart into real, grounded forward movement.',
  },
  {
    num: '06',
    title: 'Growing in Confidence',
    slug: 'growing-in-confidence',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Real confidence is not about having no fear — it is about knowing who you are so clearly that fear does not get the final vote. This area addresses the root causes of self-doubt, people-pleasing, and shrinking back, and helps you build a kind of confidence that is grounded in identity, not performance. It is steady, sustainable, and genuinely yours.',
  },
  {
    num: '07',
    title: 'Clarity in Your Next Season',
    slug: 'clarity-in-your-next-season',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'Seasons of transition are often the most disorienting — you can feel like you are between what was and what is coming, with no clear map. This area helps you find your bearings when life feels uncertain. Through honest conversation, prayer, and strategic thinking, Osil helps you gain clarity about what this season is actually asking of you and how to move through it with intentionality and peace.',
  },
  {
    num: '08',
    title: 'Breaking Through Fear and Hesitation',
    slug: 'breaking-through-fear-and-hesitation',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Fear and hesitation are often the last thing standing between where you are and where you are called to be. This area helps you identify the specific fears and false beliefs that keep you stuck — and then dismantle them one by one. This is not about pushing through on willpower; it is about addressing the root, replacing the lie with truth, and stepping forward from genuine freedom.',
  },
  {
    num: '09',
    title: 'Prophetic Gifts and Ministry',
    slug: 'prophetic-gifts-and-ministry',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'Prophetic gifts are meant to bring life, clarity, and encouragement — but they require intentional development and a healthy understanding of how they work. This area helps you understand what you carry, how to steward it faithfully, how to grow in accuracy and delivery, and how to operate in a way that is both spiritually alive and relationally sound.',
  },
  {
    num: '10',
    title: 'Kingdom Principles and New Covenant Living',
    slug: 'kingdom-principles-and-new-covenant-living',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'The kingdom of God is not just a destination — it is a reality we are invited to live from right now. This area explores what it actually means to live according to kingdom principles and new covenant theology: the finished work of Christ, the nature of our righteousness, and how to build your life on what is already true rather than striving for what you hope to earn.',
  },
  {
    num: '11',
    title: 'Living From Above — Identity in Christ',
    slug: 'living-from-above',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Christus Victor — Christ as conqueror — changes everything about how we understand our identity, our authority, and our day-to-day life. This area explores what it means to be seated with Christ, to live from above rather than striving upward, and to operate from a place of victory rather than survival. It is a paradigm shift that touches every area of life.',
  },
  {
    num: '12',
    title: 'Hearing God and Spiritual Confidence',
    slug: 'hearing-god-and-spiritual-confidence',
    accent: 'bg-morning',
    accentText: 'text-morning',
    desc: 'One of the most transformational things a person can develop is the ability to hear God clearly and trust what they hear. This area helps you build a consistent, living connection with God — learning to recognize His voice, discern what He is saying in different contexts, and act with courage and confidence rather than second-guessing every impression.',
  },
  {
    num: '13',
    title: 'Living From Peace, Not Pressure or Chaos',
    slug: 'living-from-peace',
    accent: 'bg-sunrise',
    accentText: 'text-sunrise',
    desc: 'Many people are doing the right things but from the wrong place — driven by anxiety, striving, pressure, or the constant noise of a chaotic inner world. This area addresses what it looks like to do everything from a foundation of genuine peace: the "do all things" life that Philippians describes — active, purposeful, and fully engaged, but rooted in rest rather than reaction.',
  },
  {
    num: '14',
    title: 'Building Prophetic Teams and Culture',
    slug: 'building-prophetic-teams-and-culture',
    accent: 'bg-growth',
    accentText: 'text-growth',
    desc: 'Developing others in prophetic gifts is one of the most rewarding — and challenging — things a leader can do. This area helps you think through how to identify, equip, shepherd, and release people in prophetic gifts within your community. From team structure and training to culture, accountability, and creating safe spaces for growth, Osil walks alongside you to build something genuinely life-giving.',
  },
]

export default function MentoringAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-6 lg:px-14 bg-parchment overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />
        <div className="absolute top-[5%] right-[5%] w-96 h-96 rounded-full bg-morning/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-64 h-64 rounded-full bg-sunrise/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <Link to="/mentoring" className="inline-flex items-center gap-2 text-ink/40 text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors mb-8 group">
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Mentoring
            </Link>
            <p className="text-morning text-[11px] font-bold uppercase tracking-[0.25em] mb-5">Mentoring Areas</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.08] tracking-tight max-w-3xl">
              What mentoring with Osil covers.
            </h1>
            <p className="mt-6 text-ink/55 text-[17px] leading-relaxed max-w-xl">
              Every mentoring relationship is unique — but these are the core areas Osil works in most deeply. Sessions are personal, honest, and focused on where you actually are and where you are going.
            </p>
            <div className="mt-8">
              <ButtonPrimary to="/contact">Apply for Mentoring</ButtonPrimary>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 md:py-28 px-6 lg:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {areas.map((a, i) => (
              <RevealSection key={a.num} delay={i * 0.05}>
                <div id={a.slug} className="group bg-parchment rounded-3xl p-8 md:p-10 border border-ink/6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full scroll-mt-28">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-8 h-1 ${a.accent} rounded-full`} />
                    <span className="font-heading text-4xl font-black text-ink/8">{a.num}</span>
                  </div>
                  <h2 className={`font-heading text-xl font-bold text-ink mb-4 group-hover:${a.accentText} transition-colors duration-200`}>
                    {a.title}
                  </h2>
                  <p className="text-ink/55 text-[15px] leading-relaxed">{a.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Group mentoring coming soon */}
      <section className="py-16 md:py-20 px-6 lg:px-14 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="bg-ink rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-morning/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-sunrise/15 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-morning/20 text-morning text-[10px] font-bold uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-morning animate-pulse" />
                  Coming Soon
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-5">
                  Group Mentorship
                </h2>
                <p className="text-white/55 text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
                  Osil is developing a group mentoring experience — a small, intentional cohort for those ready to grow together. More details coming soon. If you want to be notified when it launches, reach out below.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-morning text-ink font-bold text-sm hover:bg-morning/85 transition-all duration-200"
                >
                  Notify Me When It Launches
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <PageCTA
        heading="Ready to get clear and move forward?"
        sub="Mentoring is for those who are serious about stepping into who they are — with clarity, confidence, and real support."
        primary={{ label: 'Apply for Mentoring', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
