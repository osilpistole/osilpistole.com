import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'
import ButtonPrimary from '../components/ButtonPrimary'
import PageCTA from '../components/PageCTA'

const audiences = [
  {
    id: 'leaders',
    label: 'Leaders',
    headline: 'Lead from the inside out.',
    intro: 'Leadership isn\'t a title. It\'s a posture — and the most effective leaders lead from a place of identity, not pressure. Whether you\'re heading a team, a department, a ministry, or a movement, Osil works with leaders who want to stop managing from survival mode and start leading with clarity and conviction.',
    services: [
      {
        name: 'One-on-One Coaching',
        desc: 'Private coaching sessions focused on your leadership development, decision-making, and next-level clarity.',
        link: '/coaching',
      },
      {
        name: 'Prophetic Strategy Session',
        desc: 'A 60-minute deep dive into where you are, where you\'re going, and what step is actually next. Prophetic insight meets strategic clarity.',
        link: '/programs/coaching',
      },
      {
        name: 'Prophetic Training',
        desc: 'Learn to lead from what God is saying. Osil trains leaders to hear clearly, process what they receive, and lead prophetically with integrity.',
        link: '/coaching',
      },
      {
        name: 'Speaking Engagements',
        desc: 'Bring Osil in to speak on identity, purpose, leadership, breakthrough, and leading from a place of wholeness.',
        link: '/speaking',
      },
    ],
    accent: 'bg-sunrise',
    photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'entrepreneurs',
    label: 'Entrepreneurs',
    headline: 'Build something real. Build it right.',
    intro: 'You have the vision. What you need is the plan, the platform, and someone who\'s done it before to walk with you through it. Osil has 30 years of business experience and has helped entrepreneurs build brands, launch offers, and grow businesses that actually work — from the strategy down to the website.',
    services: [
      {
        name: 'Business Consulting',
        desc: 'Full-scope strategy consulting — from your brand positioning and market approach to your offer structure and growth plan.',
        link: '/consulting',
      },
      {
        name: 'Website Design & Build',
        desc: 'A website that actually converts. Osil\'s team designs and builds clean, strategic sites that reflect your brand and move people to action.',
        link: '/consulting',
      },
      {
        name: 'Social Media Strategy',
        desc: 'Stop posting and hoping. Get a content strategy built around your voice, your offer, and your audience — and actually grow.',
        link: '/consulting',
      },
      {
        name: 'Course & Offer Building',
        desc: 'Turn what you know into a digital product. Osil helps you structure, build, and launch courses, programs, and offers that sell.',
        link: '/consulting',
      },
      {
        name: 'Prophetic Strategy Session',
        desc: 'For the entrepreneur who needs prophetic clarity on what to build next — not just a business plan, but a God-breathed strategy.',
        link: '/programs/coaching',
      },
    ],
    accent: 'bg-growth',
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'ministries',
    label: 'Ministries',
    headline: 'Healthy teams. Clear vision. Real fruit.',
    intro: 'Ministries stall for the same reasons businesses do — unclear vision, unhealthy culture, untrained teams, and leaders who are running on empty. Osil brings prophetic insight and practical strategy together to help ministries move from stagnant to fruitful.',
    services: [
      {
        name: 'Group Coaching & Team Training',
        desc: 'Osil coaches your team through identity, hearing God, prophetic activation, healthy team culture, and leadership from wholeness.',
        link: '/coaching',
      },
      {
        name: 'Prophetic Training',
        desc: 'Train your team to hear God clearly, process prophetically, and function with integrity in the prophetic. Practical, grounded, transformational.',
        link: '/coaching',
      },
      {
        name: 'Speaking Engagements',
        desc: 'Powerful messages for your ministry services, conferences, retreats, and events. Topics include identity, purpose, prophetic living, and breakthrough.',
        link: '/speaking',
      },
      {
        name: 'Ministry Consulting',
        desc: 'Strategic consulting for your ministry structure, communication, and outreach — so your mission reaches the people it\'s meant for.',
        link: '/consulting',
      },
    ],
    accent: 'bg-morning',
    photo: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'founders',
    label: 'Founders',
    headline: 'From idea to execution — with someone who gets it.',
    intro: 'Founders carry a vision that most people around them can\'t fully see yet. That\'s a lonely place to build from. Osil works with founders at every stage — from validating the idea to building the brand, the team, and the systems that let the thing actually scale.',
    services: [
      {
        name: 'Brand Strategy & Identity',
        desc: 'Build a brand that actually means something. Osil helps you clarify your positioning, voice, visual identity, and messaging from the ground up.',
        link: '/consulting',
      },
      {
        name: 'Business Strategy & Consulting',
        desc: 'Revenue model, offer structure, go-to-market plan, and growth strategy — built around what you\'re actually building, not a generic framework.',
        link: '/consulting',
      },
      {
        name: 'Website & Digital Presence',
        desc: 'Your website should do work. Osil\'s team builds founder sites that communicate clearly, convert visitors, and reflect where you\'re going.',
        link: '/consulting',
      },
      {
        name: 'Prophetic Strategy Session',
        desc: 'When you\'re at a fork in the road and need clarity on which direction is actually the one — this session cuts through the noise.',
        link: '/programs/coaching',
      },
    ],
    accent: 'bg-sunrise',
    photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'teams-organizations',
    label: 'Teams & Organizations',
    headline: 'Get your team moving — together.',
    intro: 'Stuck teams are expensive. They miss deadlines, lose people, and drain leadership energy. Osil brings group coaching and training into your organization to get everyone aligned, healthy, and moving in the same direction.',
    services: [
      {
        name: 'Group Coaching',
        desc: 'Custom coaching engagements for your team or organization — focused on clarity, alignment, communication, and execution.',
        link: '/coaching',
      },
      {
        name: 'Leadership Training',
        desc: 'Train your leaders to lead from identity instead of pressure. Practical tools for decision-making, team health, and sustained performance.',
        link: '/coaching',
      },
      {
        name: 'Speaking & Keynotes',
        desc: 'Bring Osil in to speak at your company all-hands, leadership retreat, or organizational conference. High-energy, high-impact, practical.',
        link: '/speaking',
      },
      {
        name: 'Consulting & Strategy',
        desc: 'Organizational strategy for teams in transition — restructuring, rebranding, relaunching, or simply getting unstuck.',
        link: '/consulting',
      },
    ],
    accent: 'bg-growth',
    photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'womens-groups',
    label: "Women's Groups",
    headline: 'Women who know they\'re made for more.',
    intro: 'There is a specific grace on women who carry vision — and a specific set of lies that try to silence them. Osil speaks directly into the identity, purpose, and courage of women who are ready to step into the fullness of what they\'re called to.',
    services: [
      {
        name: 'Speaking & Retreats',
        desc: 'Keynotes, workshops, and full retreat experiences for women\'s groups, conferences, churches, and organizations. Identity, purpose, courage, and calling.',
        link: '/speaking',
      },
      {
        name: 'One-on-One Coaching',
        desc: 'Private coaching for the woman who needs clarity on who she is, where she\'s going, and what she needs to let go of to get there.',
        link: '/coaching',
      },
      {
        name: 'Spiritual Gifts Assessment',
        desc: 'Discover the specific gifts God placed inside you — and understand how to walk in them with confidence.',
        link: '/spiritual-gifts',
      },
      {
        name: '5-Fold Ministry Assessment',
        desc: 'Find out which of the five leadership callings God wired into you — and what that means for how you lead and serve.',
        link: '/fivefold',
      },
    ],
    accent: 'bg-morning',
    photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'churches',
    label: 'Churches',
    headline: 'Equip your people. Strengthen your culture.',
    intro: 'Churches that stay healthy do so intentionally. Osil partners with pastors, elders, and church leadership teams to build prophetic culture, train teams, strengthen the congregation, and bring the kind of messages that actually move people.',
    services: [
      {
        name: 'Speaking & Guest Preaching',
        desc: 'Osil brings powerful, prophetically grounded messages for Sunday services, special events, conferences, and revivals.',
        link: '/speaking',
      },
      {
        name: 'Prophetic Team Training',
        desc: 'Train your prophetic team to hear clearly, operate with integrity, and function as a healthy, accountable team that strengthens the church.',
        link: '/coaching',
      },
      {
        name: 'Leadership Coaching',
        desc: 'Coach your pastoral and elder team through transitions, vision clarity, team health, and leading from a place of spiritual wholeness.',
        link: '/coaching',
      },
      {
        name: 'Church Website & Digital',
        desc: 'A church website that actually serves your congregation and reaches new people. Clear, accessible, and built to last.',
        link: '/consulting',
      },
    ],
    accent: 'bg-sunrise',
    photo: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'creative-visionaries',
    label: 'Creative Visionaries',
    headline: 'Your vision deserves a vehicle.',
    intro: 'Creatives carry some of the most powerful ideas on the planet — and struggle the most to monetize them. Osil helps creative visionaries build the brand, the platform, and the offers that let their vision reach the people it\'s meant to reach.',
    services: [
      {
        name: 'Brand & Identity Development',
        desc: 'Build a brand that tells the right story — visually, verbally, and strategically. This is how your vision becomes something people can find, follow, and buy.',
        link: '/consulting',
      },
      {
        name: 'Course & Digital Product Building',
        desc: 'Take what you create and teach it. Osil helps you build courses, memberships, and digital products that generate income from your gifts.',
        link: '/consulting',
      },
      {
        name: 'Social Media Strategy',
        desc: 'A content and platform strategy that grows an audience around your work without burning you out or making you feel fake.',
        link: '/consulting',
      },
      {
        name: 'Coaching & Clarity Sessions',
        desc: 'Sometimes the biggest thing blocking a creative is internal. Coaching sessions that help you get out of your own way and into your purpose.',
        link: '/coaching',
      },
    ],
    accent: 'bg-growth',
    photo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'next-level',
    label: 'People Ready for Their Next Level',
    headline: 'You already know something has to change.',
    intro: 'You\'re not confused about whether there\'s more. You\'re just not sure what more looks like, or how to get there. Osil works with individuals who are done waiting and ready to move — whether that means a career shift, a calling they\'ve been ignoring, or a version of themselves they haven\'t stepped into yet.',
    services: [
      {
        name: 'Prophetic Strategy Session',
        desc: 'Start here. Sixty minutes, prophetic insight, strategic clarity, and a concrete plan built around your specific situation.',
        link: '/programs/coaching',
      },
      {
        name: 'One-on-One Coaching',
        desc: 'Ongoing private coaching to build momentum — working through the blocks, clarifying the path, and holding you accountable to actually moving.',
        link: '/coaching',
      },
      {
        name: 'Spiritual Gifts Assessment',
        desc: 'Understand the specific gifts God placed in you — and what they\'re designed to do in the world.',
        link: '/spiritual-gifts',
      },
      {
        name: 'AI Build Quiz',
        desc: 'Answer a few questions and get a personalized recommendation for where to start based on exactly where you are right now.',
        link: '/quiz',
      },
    ],
    accent: 'bg-morning',
    photo: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?w=800&auto=format&fit=crop&q=80',
  },
]

const accentColors = {
  'bg-sunrise': { dot: 'bg-sunrise', text: 'text-ink', badge: 'bg-sunrise/15 border-sunrise/35 text-ink' },
  'bg-growth':  { dot: 'bg-growth',  text: 'text-growth', badge: 'bg-growth/15 border-growth/35 text-growth' },
  'bg-morning': { dot: 'bg-morning', text: 'text-white', badge: 'bg-morning/15 border-morning/35 text-white' },
}

export default function WhoIHelpPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-14 bg-ink text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,200,66,0.1),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Who I Work With</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
              The right help<br />
              <span className="gradient-text-animated">for exactly where you are.</span>
            </h1>
            <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-xl">
              Every person, team, and organization is in a different place. Here's what working with Osil looks like for yours.
            </p>
          </RevealSection>

          {/* Quick-jump nav */}
          <div className="mt-14 flex flex-wrap gap-2">
            {audiences.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="px-4 py-2 rounded-full border border-white/15 text-white/55 text-xs font-semibold hover:border-sunrise/50 hover:text-sunrise hover:bg-sunrise/10 transition-all duration-200"
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Audience sections */}
      <div className="bg-parchment">
        {audiences.map((audience, idx) => {
          const colors = accentColors[audience.accent]
          const isEven = idx % 2 === 0

          return (
            <section
              key={audience.id}
              id={audience.id}
              className={`py-20 md:py-28 px-6 lg:px-14 ${isEven ? 'bg-parchment' : 'bg-white'} border-t border-ink/6 scroll-mt-24`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                  {/* Text side */}
                  <RevealSection className={isEven ? '' : 'lg:order-2'}>
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-ink/12 bg-white">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
                      <span className="text-ink/50 text-[10px] font-bold uppercase tracking-[0.25em]">{audience.label}</span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-ink leading-snug mb-6">
                      {audience.headline}
                    </h2>
                    <p className="text-ink/65 text-[17px] leading-relaxed mb-10">
                      {audience.intro}
                    </p>

                    {/* Services */}
                    <div className="flex flex-col gap-4">
                      {audience.services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.link}
                          className="group flex items-start gap-4 p-5 rounded-2xl border border-ink/8 bg-white hover:border-ink/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-bold text-ink text-sm mb-1 group-hover:text-ink transition-colors">
                              {service.name}
                            </p>
                            <p className="text-ink/55 text-sm leading-relaxed">{service.desc}</p>
                          </div>
                          <svg className="w-4 h-4 text-ink/20 group-hover:text-ink/60 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8">
                      <ButtonPrimary to="/contact">Work With Osil</ButtonPrimary>
                    </div>
                  </RevealSection>

                  {/* Photo side */}
                  <RevealSection delay={0.15} className={isEven ? 'lg:order-2' : ''}>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                      <img
                        src={audience.photo}
                        alt={audience.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                      {/* Label chip */}
                      <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full ${audience.accent} shadow-lg`}>
                        <span className={`text-xs font-bold uppercase tracking-widest ${audience.accent === 'bg-morning' ? 'text-white' : 'text-ink'}`}>
                          {audience.label}
                        </span>
                      </div>
                    </div>
                  </RevealSection>

                </div>
              </div>
            </section>
          )
        })}
      </div>

      <PageCTA
        heading="Ready to get started?"
        sub="Whether you need a speaker, a strategist, a coach, or all three — reach out and let's figure out the right fit."
        primary={{ label: 'Work With Osil', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/work-with-me' }}
      />
    </>
  )
}
