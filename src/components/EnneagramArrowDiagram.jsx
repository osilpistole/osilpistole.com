// src/components/EnneagramArrowDiagram.jsx
//
// Renders a minimal SVG showing a labeled arrow:  [from] ──→ [to]
// Used in growth/stress sections on the results page.

export default function EnneagramArrowDiagram({ from, to, label, accent = '#F5C842' }) {
  return (
    <div
      role="img"
      aria-label={`${label}: arrow from Type ${from} to Type ${to}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, margin: '12px 0 20px' }}
    >
      <Bubble n={from} accent={accent} />
      <svg width="80" height="32" viewBox="0 0 80 32" aria-hidden="true">
        <line x1="2" y1="16" x2="64" y2="16" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <polyline
          points="56,8 70,16 56,24"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Bubble n={to} accent={accent} />
    </div>
  )
}

function Bubble({ n, accent }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: accent,
        color: '#2c2c2a',
        display: 'grid',
        placeItems: 'center',
        fontFamily: "'Sora', sans-serif",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
  )
}
