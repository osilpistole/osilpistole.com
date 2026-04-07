import useScrollReveal from '../hooks/useScrollReveal'

export default function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
