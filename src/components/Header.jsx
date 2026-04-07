import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18">
        <Link to="/" className="font-heading text-2xl font-semibold text-ink tracking-tight hover:opacity-80 transition-opacity">
          Osil Pistole
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to ? 'text-ink' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-sunrise text-ink text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-sunrise/85 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Book Osil
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${open ? 'max-h-96 border-b border-ink/5' : 'max-h-0'}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-base font-medium transition-colors ${
                location.pathname === link.to ? 'text-ink' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="bg-sunrise text-ink text-sm font-semibold px-6 py-2.5 rounded-full text-center hover:bg-sunrise/85 transition-all"
          >
            Book Osil
          </Link>
        </nav>
      </div>
    </header>
  )
}
