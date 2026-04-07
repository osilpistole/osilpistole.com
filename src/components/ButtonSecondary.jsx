import { Link } from 'react-router-dom'

export default function ButtonSecondary({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-block border-2 border-ink/15 text-ink font-semibold px-8 py-3.5 rounded-full text-base hover:border-ink/30 hover:bg-white transition-all duration-200 ${className}`}
    >
      {children}
    </Link>
  )
}
