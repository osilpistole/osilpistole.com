import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonSecondary from '../components/ButtonSecondary'
import ButtonDark from '../components/ButtonDark'

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-ink leading-tight tracking-tight">
          Clarity, breakthrough, and strategy for people ready to move forward.
        </h1>
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-ink/65 leading-relaxed max-w-2xl mx-auto font-light">
          I help people, leaders, and organizations get clear on who they are, what they're called to do, and how to actually build it.
        </p>
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonPrimary to="/work-with-me">Work With Me</ButtonPrimary>
          <ButtonSecondary to="/speaking">Book Me to Speak</ButtonSecondary>
        </div>
      </div>
    </section>
  )
}

/* ─── Intro ─── */
function Intro() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-1 bg-sunrise mx-auto mb-10 rounded-full" />
        <p className="text-lg md:text-xl leading-relaxed text-ink/75">
          Osil Pistole is a speaker, consultant, and mentor who helps people and organizations break through confusion, strengthen their voice, and build what they are called to build.
        </p>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-ink/75">
          Her work sits at the intersection of identity, purpose, leadership, strategy, and execution. Whether she is speaking to a room, mentoring a leader, or helping build a brand from the ground up, her goal is the same: clarity that leads to action.
        </p>
      </div>
    </section>
  )
}

/* ─── How I Help ─── */
const helpCards = [
  {
    num: '01', title: 'Speaking', accent: 'bg-sunrise/15', numColor: 'text-sunrise',
    text: 'Powerful messages on identity, purpose, destiny, breakthrough, leadership, and living with clarity and courage.',
    link: '/speaking',
  },
  {
    num: '02', title: 'Consulting', accent: 'bg-growth/15', numColor: 'text-growth',
    text: 'Business consulting and strategic implementation from start to finish, including brainstorming, planning, branding, marketing, web development, app development, advertising, social media, and growth strategy.',
    link: '/work-with-me',
  },
  {
    num: '03', title: 'Mentoring', accent: 'bg-morning/20', numColor: 'text-morning',
    text: 'Helping people find their voice, get clarity, grow in confidence, hear God for themselves and others, and step into healthy leadership and prophetic maturity.',
    link: '/work-with-me',
  },
  {
    num: '04', title: 'Coaching & Training', accent: 'bg-sunrise/15', numColor: 'text-sunrise',
    text: 'Group coaching, team training, and high-level one-on-one coaching for leaders, ministries, businesses, and organizations ready for real movement.',
    link: '/work-with-me',
  },
]

function HowIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>What I Do</SectionLabel>
          <SectionHeading>How I Help</SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {helpCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.accent} mb-6`}>
                <span className={`font-heading text-lg font-bold ${card.numColor}`}>{card.num}</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-ink mb-3">{card.title}</h3>
              <p className="text-ink/65 leading-relaxed">{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Who I Help ─── */
const audiences = [
  'Leaders', 'Entrepreneurs', 'Ministries', 'Founders',
  'Teams and organizations', "Women's groups", 'Churches',
  'Creative visionaries', 'People who feel stuck, unclear, or ready for their next level',
]

function WhoIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <SectionLabel>Who This Is For</SectionLabel>
        <SectionHeading className="mb-6">Who I Work With</SectionHeading>
        <p className="text-lg text-ink/65 mb-12 max-w-2xl mx-auto">
          This work is for people and teams who know they are made for more and are ready to move with clarity and conviction.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {audiences.map((item) => (
            <span
              key={item}
              className="bg-white border border-ink/8 text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium hover:border-sunrise hover:bg-sunrise/5 transition-all duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Transformation ─── */
const transforms = [
  { from: 'confused', to: 'clear' },
  { from: 'overthinking', to: 'action' },
  { from: 'hidden', to: 'confident' },
  { from: 'stalled', to: 'moving' },
  { from: 'scattered ideas', to: 'strong direction' },
  { from: 'self-doubt', to: 'aligned leadership' },
]

function Transformation() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-ink text-white">
      <div className="max-w-4xl mx-auto text-center">
        <SectionLabel color="text-sunrise">The Shift</SectionLabel>
        <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-14 text-white">Real Transformation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transforms.map((t) => (
            <div
              key={t.from}
              className="flex items-center justify-center gap-4 bg-white/5 rounded-2xl px-6 py-5 border border-white/10 hover:border-sunrise/40 transition-all duration-300"
            >
              <span className="text-white/50 font-light">From {t.from}</span>
              <svg className="w-5 h-5 text-sunrise shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="text-white font-semibold">to {t.to}</span>
            </div>
          ))}
        </div>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mt-14">
          Real breakthrough happens when clarity, identity, and strategy come together.
        </p>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-sunrise/10">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading className="mb-6">Let's build something meaningful.</SectionHeading>
        <p className="text-lg text-ink/65 leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you are looking for a speaker, a consultant, a mentor, or a trainer for your team, this is a space for clarity, breakthrough, and real movement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonPrimary to="/work-with-me">Work With Osil</ButtonPrimary>
          <ButtonDark to="/contact">Contact Osil</ButtonDark>
        </div>
      </div>
    </section>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <HowIHelp />
      <WhoIHelp />
      <Transformation />
      <FinalCTA />
    </>
  )
}
