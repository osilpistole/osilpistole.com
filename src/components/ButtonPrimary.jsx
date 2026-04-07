import { Link } from 'react-router-dom'

export default function ButtonPrimary({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-block bg-sunrise text-ink font-semibold px-8 py-3.5 rounded-full text-base hover:bg-sunrise/85 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 btn-glow ${className}`}
    >
      {children}
    </Link>
  )
}
