export default function SectionHeading({ children, className = '' }) {
  return (
    <h2 className={`font-heading text-3xl md:text-5xl font-semibold text-ink ${className}`}>
      {children}
    </h2>
  )
}
