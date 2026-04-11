import RevealSection from './RevealSection'

export default function PageHero({ eyebrow, eyebrowColor = 'text-growth', title, sub, badge, photo, photoAlt = '', cta }) {
  return (
    <section className="relative pt-32 min-h-[60vh] flex items-center overflow-hidden bg-parchment">
      <div className="absolute top-0 left-0 right-0 h-1 color-stripe z-20" />

      {/* Soft background blobs */}
      <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full bg-sunrise/15 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-[5%] left-[20%] w-56 h-56 rounded-full bg-morning/20 blur-3xl animate-float-delayed pointer-events-none" />

      {/* Right photo */}
      {photo && (
        <div className="absolute inset-y-0 right-[-8%] w-full lg:w-[52%] pointer-events-none">
          <img
            src={photo}
            alt={photoAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #F7F4EE 0%, #F7F4EE 2%, rgba(247,244,238,0.9) 25%, rgba(247,244,238,0.2) 55%, transparent 75%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #F7F4EE 0%, transparent 30%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F7F4EE 0%, transparent 15%)' }} />
        </div>
      )}

      {/* Text */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-14 py-20">
        <RevealSection>
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6 whitespace-nowrap">
              <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${eyebrowColor}`}>{eyebrow}</p>
              {badge && (
                <>
                  <span className="h-px w-5 bg-ink/15 shrink-0" />
                  <span className="inline-flex items-center gap-1.5 text-growth text-[11px] font-bold uppercase tracking-widest shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-growth animate-pulse" />
                    {badge}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.08] tracking-tight">
              {title}
            </h1>
            {sub && (
              <p className="mt-6 text-base md:text-lg text-ink/55 leading-relaxed max-w-md">{sub}</p>
            )}
            {cta && <div className="mt-8">{cta}</div>}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
