export default function SectionLabel({ color = 'text-growth', children }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-widest ${color} mb-3`}>
      {children}
    </p>
  )
}
