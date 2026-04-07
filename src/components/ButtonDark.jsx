import { Link } from 'react-router-dom'

export default function ButtonDark({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-block bg-ink text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-ink/85 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  )
}
