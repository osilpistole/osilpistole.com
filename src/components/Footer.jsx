import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work With Me', to: '/work-with-me' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <p className="font-heading text-2xl font-semibold mb-2">Osil Pistole</p>
            <p className="text-white/50 text-sm">Speaker, Consultant, Mentor</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Get in Touch</p>
            <a href="mailto:hello@osilpistole.com" className="text-white/50 hover:text-sunrise transition-colors text-sm">
              hello@osilpistole.com
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Osil Pistole. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
