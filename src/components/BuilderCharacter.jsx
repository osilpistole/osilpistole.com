export default function BuilderCharacter({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Builder character guide"
    >
      {/* Body */}
      <ellipse cx="40" cy="63" rx="13" ry="10" fill="#B8A4D8" />

      {/* Left arm */}
      <ellipse cx="22" cy="60" rx="5" ry="3.5" transform="rotate(-30 22 60)" fill="#B8A4D8" />
      <circle cx="18.5" cy="63" r="2.8" fill="#F5C842" />

      {/* Right arm */}
      <ellipse cx="58" cy="60" rx="5" ry="3.5" transform="rotate(30 58 60)" fill="#B8A4D8" />
      <circle cx="61.5" cy="63" r="2.8" fill="#F5C842" />

      {/* Blueprint scroll in right hand */}
      <rect x="62" y="59" width="11" height="7" rx="1.5" fill="#FDFAF5" stroke="#2C2C2A" strokeWidth="0.8" />
      <ellipse cx="62" cy="62.5" rx="1.8" ry="3.5" fill="#F5C842" stroke="#2C2C2A" strokeWidth="0.7" />
      <ellipse cx="73" cy="62.5" rx="1.8" ry="3.5" fill="#F5C842" stroke="#2C2C2A" strokeWidth="0.7" />
      <line x1="64.5" y1="60.8" x2="70.5" y2="60.8" stroke="#B8A4D8" strokeWidth="0.7" />
      <line x1="64.5" y1="62.5" x2="70.5" y2="62.5" stroke="#B8A4D8" strokeWidth="0.7" />
      <line x1="64.5" y1="64.2" x2="68" y2="64.2" stroke="#B8A4D8" strokeWidth="0.7" />

      {/* Head */}
      <circle cx="40" cy="35" r="26" fill="#F5C842" />
      <circle cx="40" cy="35" r="26" fill="none" stroke="#2C2C2A" strokeWidth="1.2" />

      {/* Hard hat */}
      <ellipse cx="40" cy="11.5" rx="21" ry="4" fill="#7DBE6A" />
      <path d="M20 11.5 Q20 0 40 0 Q60 0 60 11.5 Z" fill="#7DBE6A" stroke="#2C2C2A" strokeWidth="1" />
      <path d="M20 11.5 Q20 8 40 8 Q60 8 60 11.5" fill="none" stroke="#FDFAF5" strokeWidth="1.5" opacity="0.5" />

      {/* Pencil behind right ear */}
      <rect x="62" y="22" width="3" height="13" rx="1" fill="#FDFAF5" stroke="#2C2C2A" strokeWidth="0.7" transform="rotate(15 63.5 28.5)" />
      <rect x="62" y="29" width="3" height="2" fill="#F5C842" stroke="#2C2C2A" strokeWidth="0.5" transform="rotate(15 63.5 28.5)" />
      <rect x="62" y="21" width="3" height="2.5" rx="0.5" fill="#B8A4D8" stroke="#2C2C2A" strokeWidth="0.7" transform="rotate(15 63.5 28.5)" />
      <polygon points="62.5,35 65.5,35 64,38" fill="#2C2C2A" transform="rotate(15 63.5 28.5)" />

      {/* Ears */}
      <ellipse cx="14.5" cy="37" rx="3.5" ry="5" fill="#F5C842" stroke="#2C2C2A" strokeWidth="0.9" />
      <ellipse cx="65.5" cy="37" rx="3.5" ry="5" fill="#F5C842" stroke="#2C2C2A" strokeWidth="0.9" />

      {/* Eyes */}
      <ellipse cx="31" cy="37" rx="6.5" ry="7" fill="white" />
      <ellipse cx="49" cy="37" rx="6.5" ry="7" fill="white" />
      <circle cx="31.8" cy="37.5" r="4.2" fill="#2C2C2A" />
      <circle cx="49.8" cy="37.5" r="4.2" fill="#2C2C2A" />
      <circle cx="30" cy="35.5" r="1.4" fill="white" />
      <circle cx="33.2" cy="39.2" r="0.7" fill="white" opacity="0.65" />
      <circle cx="48" cy="35.5" r="1.4" fill="white" />
      <circle cx="51.2" cy="39.2" r="0.7" fill="white" opacity="0.65" />

      {/* Eyebrows */}
      <path d="M24.5 29.5 Q31 27 37 29.5" stroke="#2C2C2A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M43 29.5 Q49 27 55.5 29.5" stroke="#2C2C2A" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <ellipse cx="40" cy="44" rx="2" ry="1.4" fill="#D4A017" opacity="0.55" />

      {/* Big smile */}
      <path d="M27 50 Q40 62 53 50" stroke="#2C2C2A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M29 51.5 Q40 61 51 51.5 Q40 58 29 51.5 Z" fill="#2C2C2A" opacity="0.1" />

      {/* Cheek blushes */}
      <ellipse cx="22" cy="49" rx="5.5" ry="3.2" fill="#F5A0A0" opacity="0.3" />
      <ellipse cx="58" cy="49" rx="5.5" ry="3.2" fill="#F5A0A0" opacity="0.3" />
    </svg>
  )
}
