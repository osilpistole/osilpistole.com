import { Link } from 'react-router-dom'
import ButtonPrimary from './ButtonPrimary'

export default function PageCTA({ heading = "Let's build something meaningful.", sub, primary = { label: 'Work With Osil', to: '/work-with-me' }, secondary = { label: 'Contact Osil', to: '/contact' } }) {
  return (
    <section className="relative py-24 md:py-36 px-6 lg:px-10 bg-parchment overflow-hidden">
      {/* Warm glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sunrise/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-morning/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-growth text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Ready to Move?</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-6">{heading}</h2>
          {sub && <p className="text-ink/65 text-lg leading-relaxed mb-10 max-w-xl">{sub}</p>}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <ButtonPrimary to={primary.to}>{primary.label}</ButtonPrimary>
            <Link
              to={secondary.to}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold border-2 border-ink/20 text-ink/65 hover:border-ink/40 hover:text-ink hover:bg-ink/5 transition-all duration-300"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
