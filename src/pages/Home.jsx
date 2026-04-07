import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import SectionHeading from '../components/SectionHeading'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonSecondary from '../components/ButtonSecondary'
import ButtonDark from '../components/ButtonDark'
import RevealSection from '../components/RevealSection'

/* ─── Hero with video background + lavender overlay ─── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden texture-overlay">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      >
        <source src={import.meta.env.BASE_URL + 'clarity-water.mp4'} type="video/mp4" />
      </video>

      {/* Nearly opaque white overlay — video is just a whisper underneath */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(247, 244, 238, 0.93), rgba(255, 255, 255, 0.91))' }} />

      {/* Subtle floating orbs for extra depth */}
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-morning/15 blur-3xl animate-float-delayed" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-10 py-32">
        <div className="inline-block mb-4">
          <span className="text-ink/70 text-sm font-semibold uppercase tracking-[0.25em]">Speaker &middot; Consultant &middot; Mentor</span>
        </div>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-growth/12 text-growth px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-growth animate-pulse" />
            Currently booking for 2026
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-ink leading-tight tracking-tight drop-shadow-sm">
          Clarity, breakthrough, and strategy for people ready to <span className="gradient-text-animated">move forward.</span>
        </h1>
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-ink/70 leading-relaxed max-w-2xl mx-auto font-light">
          I help people, leaders, and organizations get clear on who they are, what they're called to do, and how to actually build it.
        </p>
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonPrimary to="/work-with-me">Work With Me</ButtonPrimary>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/25 text-ink hover:bg-ink/5 hover:border-ink/40 transition-all duration-300 backdrop-blur-sm"
          >
            Book Me to Speak
          </Link>
        </div>

      </div>
    </section>
  )
}

/* ─── Intro ─── */
function Intro() {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealSection className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-xl image-glow relative group">
                <img
                  src={import.meta.env.BASE_URL + 'images/headshot-plants.jpg'}
                  alt="Osil Pistole"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-morning/40 via-sunrise/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-gradient-to-br from-sunrise/20 via-morning/15 to-growth/10 -z-10" />
            </div>
          </RevealSection>
          <RevealSection delay={0.15}>
            <span className="text-morning text-xs font-semibold uppercase tracking-[0.2em]">Meet Osil</span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ink mt-3 mb-8">Clarity that leads to action.</h2>
            <p className="text-lg leading-relaxed text-ink/70 mb-6">
              Osil Pistole is a speaker, consultant, and mentor who helps people and organizations break through confusion, strengthen their voice, and build what they are called to build.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              Her work sits at the intersection of identity, purpose, leadership, strategy, and execution. Whether she is speaking to a room, mentoring a leader, or helping build a brand from the ground up, her goal is the same: clarity that leads to action.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-ink font-semibold hover:text-morning transition-colors group"
              >
                Learn more about Osil
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

/* ─── How I Help ─── */
const helpCards = [
  {
    title: 'Speaking', accent: 'bg-sunrise/15', iconColor: 'text-sunrise',
    borderHover: 'hover:border-sunrise/40',
    text: 'Powerful messages on identity, purpose, destiny, breakthrough, leadership, and living with clarity and courage.',
    link: '/speaking',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Consulting', accent: 'bg-growth/15', iconColor: 'text-growth',
    borderHover: 'hover:border-growth/40',
    text: 'Business consulting and strategic implementation from start to finish, including brainstorming, planning, branding, marketing, web development, app development, advertising, social media, and growth strategy.',
    link: '/work-with-me',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: 'Mentoring', accent: 'bg-morning/20', iconColor: 'text-morning',
    borderHover: 'hover:border-morning/40',
    text: 'Helping people find their voice, get clarity, grow in confidence, hear God for themselves and others, and step into healthy leadership and prophetic maturity.',
    link: '/work-with-me',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Coaching & Training', accent: 'bg-sunrise/15', iconColor: 'text-sunrise',
    borderHover: 'hover:border-sunrise/40',
    text: 'Group coaching, team training, and high-level one-on-one coaching for leaders, ministries, businesses, and organizations ready for real movement.',
    link: '/work-with-me',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

function HowIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14">
            <SectionLabel>What I Do</SectionLabel>
            <SectionHeading>How I Help</SectionHeading>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {helpCards.map((card, i) => (
            <RevealSection key={card.title} delay={i * 0.1} className="flex">
              <Link
                to={card.link}
                className={`group flex flex-col bg-parchment rounded-2xl p-8 md:p-10 border border-ink/5 ${card.borderHover} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 w-full`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.accent} mb-6 group-hover:scale-110 transition-transform duration-300 ${card.iconColor}`}>
                  {card.icon}
                </div>
                <h3 className="font-heading text-2xl font-semibold text-ink mb-3">{card.title}</h3>
                <p className="text-ink/65 leading-relaxed flex-1">{card.text}</p>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Who I Help ─── */
const audiences = [
  { label: 'Leaders', color: 'hover:border-sunrise hover:bg-sunrise/8' },
  { label: 'Entrepreneurs', color: 'hover:border-growth hover:bg-growth/8' },
  { label: 'Ministries', color: 'hover:border-morning hover:bg-morning/15' },
  { label: 'Founders', color: 'hover:border-sunrise hover:bg-sunrise/8' },
  { label: 'Teams and organizations', color: 'hover:border-growth hover:bg-growth/8' },
  { label: "Women's groups", color: 'hover:border-morning hover:bg-morning/15' },
  { label: 'Churches', color: 'hover:border-sunrise hover:bg-sunrise/8' },
  { label: 'Creative visionaries', color: 'hover:border-growth hover:bg-growth/8' },
  { label: 'People who feel stuck, unclear, or ready for their next level', color: 'hover:border-morning hover:bg-morning/15' },
]

function WhoIHelp() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <RevealSection>
          <SectionLabel>Who This Is For</SectionLabel>
          <SectionHeading className="mb-6">Who I Work With</SectionHeading>
          <p className="text-lg text-ink/65 mb-12 max-w-2xl mx-auto">
            This work is for people and teams who know they are made for more and are ready to move with clarity and conviction.
          </p>
        </RevealSection>
        <RevealSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {audiences.map((item) => (
              <span
                key={item.label}
                className={`bg-white border border-ink/8 text-ink/75 px-5 py-2.5 rounded-full text-sm font-medium ${item.color} transition-all duration-300 cursor-default`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

/* ─── Transformation ─── */
const transforms = [
  { from: 'confused', to: 'clear', color: 'border-sunrise/40' },
  { from: 'overthinking', to: 'action', color: 'border-growth/40' },
  { from: 'hidden', to: 'confident', color: 'border-morning/40' },
  { from: 'stalled', to: 'moving', color: 'border-sunrise/40' },
  { from: 'scattered ideas', to: 'strong direction', color: 'border-growth/40' },
  { from: 'self-doubt', to: 'aligned leadership', color: 'border-morning/40' },
]

function Transformation() {
  return (
    <section className="relative py-20 md:py-28 px-6 lg:px-10 bg-ink text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-10 right-[5%] w-48 h-48 rounded-full bg-sunrise/10 blur-3xl animate-float" />
      <div className="absolute bottom-10 left-[5%] w-56 h-56 rounded-full bg-morning/10 blur-3xl animate-float-delayed" />

      <div className="relative max-w-4xl mx-auto text-center">
        <RevealSection>
          <SectionLabel color="text-sunrise">The Shift</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-14 text-white">Real Transformation</h2>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transforms.map((t, i) => (
            <RevealSection key={t.from} delay={i * 0.08}>
              <div
                className={`flex items-center justify-center gap-4 bg-white/5 rounded-2xl px-6 py-5 border border-white/10 hover:${t.color} hover:bg-white/8 transition-all duration-300`}
              >
                <span className="text-white/50 font-light">From {t.from}</span>
                <svg className="w-5 h-5 text-sunrise shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-white font-semibold">to {t.to}</span>
              </div>
            </RevealSection>
          ))}
        </div>
        <RevealSection delay={0.5}>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mt-14">
            Real breakthrough happens when clarity, identity, and strategy come together.
          </p>
        </RevealSection>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 px-6 lg:px-10 overflow-hidden">
      {/* Multi-color gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunrise/15 via-morning/10 to-growth/10" />
      <div className="absolute top-0 left-0 right-0 h-1.5 color-stripe" />

      <div className="relative max-w-3xl mx-auto text-center">
        <RevealSection>
          <SectionHeading className="mb-6">Let's build something meaningful.</SectionHeading>
          <p className="text-lg text-ink/65 leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you are looking for a speaker, a consultant, a mentor, or a trainer for your team, this is a space for clarity, breakthrough, and real movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary to="/work-with-me">Work With Osil</ButtonPrimary>
            <ButtonDark to="/contact">Contact Osil</ButtonDark>
          </div>
        </RevealSection>
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
