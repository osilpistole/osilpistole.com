import { Link } from 'react-router-dom'
import ButtonPrimary from './ButtonPrimary'

export default function PageCTA({ heading = "Let's build something meaningful.", sub, primary = { label: 'Work With Osil', to: '/work-with-me' }, secondary = { label: 'Contact Osil', to: '/contact' } }) {
  return (
    <section className="relative py-24 md:py-36 px-6 lg:px-10 bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,200,66,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,164,216,0.1),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-sunrise text-[11px] font-bold uppercase tracking-[0.25em] mb-6">Ready to Move?</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">{heading}</h2>
        {sub && <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">{sub}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <ButtonPrimary to={primary.to}>{primary.label}</ButtonPrimary>
          <Link
            to={secondary.to}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold border-2 border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
