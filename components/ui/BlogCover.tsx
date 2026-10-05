function CategoryBadge({ label, light }: { label: string; light: boolean }) {
  return (
    <>
      <text x="40" y="55" fontFamily="var(--font-dm-sans), sans-serif" fontSize="12" fill={light ? "#C9A55A" : "#876628"}
        letterSpacing="3" textAnchor="start">{label}</text>
      <line x1="40" y1="65" x2="62" y2="65" stroke="#C9A55A" strokeWidth="1.5"/>
    </>
  )
}

interface BlogCoverProps {
  slug: string
  category: string
  variant: 'card' | 'hero'
}

export default function BlogCover({ slug, variant }: BlogCoverProps) {
  const isCard = variant === 'card'
  const vbHeight = isCard ? 500 : 450
  const viewBox = `0 0 800 ${vbHeight}`
  const FONT_C = 'var(--font-cormorant-garamond), Georgia, serif'
  const FONT_D = 'DM Sans, sans-serif'
  const GREEN = '#07341C'
  const GOLD = '#C9A55A'
  const CREAM = '#F5F0E8'


  let inner: React.ReactNode

  switch (slug) {
    case 'why-property-management-fees-are-too-high':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={CREAM}/>
          <CategoryBadge label="PRICING" light={false}/>
          <text x="400" y="230" fontFamily={FONT_C} fontSize="80" fill="#5B6470"
            fillOpacity="1" textAnchor="middle" dominantBaseline="middle">Your rental</text>
          <text x="400" y="310" fontFamily={FONT_C} fontSize="36" fill={GREEN}
            fontStyle="italic" textAnchor="middle">Fees with clarity</text>
        </>
      )
      break

    case 'switching-managers-without-disruption':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="OPERATIONS" light={true}/>
          <text x="400" y="160" fontFamily={FONT_D} fontSize="14" fill={CREAM}
            fillOpacity="0.7" textAnchor="middle" letterSpacing="2">switch with</text>
          <text x="400" y="290" fontFamily={FONT_C} fontSize="140" fill={GOLD}
            textAnchor="middle" dominantBaseline="middle">care</text>
          <text x="400" y="370" fontFamily={FONT_C} fontSize="32" fill={CREAM}
            fontStyle="italic" textAnchor="middle">and confidence</text>
          <line x1="40" y1="470" x2="100" y2="470" stroke={GOLD} strokeWidth="2"/>
          <line x1="700" y1="470" x2="760" y2="470" stroke={GOLD} strokeWidth="2"/>
        </>
      )
      break

    case 'cape-town-rental-market-2026':
      inner = (
        <>
          <rect width="800" height="390" fill={CREAM}/>
          <rect y="390" width="800" height={vbHeight - 390} fill={GREEN}/>
          <line x1="0" y1="390" x2="800" y2="390" stroke={GOLD} strokeWidth="1.5"/>
          <CategoryBadge label="MARKET" light={false}/>
          <text x="400" y="220" fontFamily={FONT_C} fontSize="110" fill={GREEN}
            textAnchor="middle" dominantBaseline="middle">2026</text>
          <text x="400" y="330" fontFamily={FONT_C} fontSize="36" fill="#876628"
            fontStyle="italic" textAnchor="middle">South Africa</text>
        </>
      )
      break

    case 'whatsapp-property-management':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="OPERATIONS" light={true}/>
          <rect x="140" y="170" width="200" height="140" fill="none"
            stroke={CREAM} strokeWidth="1.5" fillOpacity="0.4" rx="4"/>
          <path d="M 140,170 L 240,240 L 340,170" fill="none"
            stroke={CREAM} strokeWidth="1.5" fillOpacity="0.4"/>
          <text x="400" y="255" fontFamily={FONT_C} fontSize="48" fill={GOLD}
            fontStyle="italic" textAnchor="middle" dominantBaseline="middle">&amp;</text>
          <rect x="460" y="155" width="200" height="130" fill={GOLD} rx="12"/>
          <polygon points="510,285 490,320 530,285" fill={GOLD}/>
          <text x="400" y="360" fontFamily={FONT_C} fontSize="18" fill={CREAM}
            fontStyle="italic" textAnchor="middle">clearer communication</text>
        </>
      )
      break

    case 'avoiding-bad-tenant-vetting': {
      const boxes = [0, 1, 2].map(i => {
        const bx = 245 + i * 120
        const by = 185
        return (
          <g key={i}>
            <rect x={bx} y={by} width="70" height="70" fill={GOLD} rx="6"/>
            <path
              d={`M ${bx + 15},${by + 35} L ${bx + 30},${by + 50} L ${bx + 55},${by + 20}`}
              fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round"
            />
          </g>
        )
      })
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={CREAM}/>
          <CategoryBadge label="TENANTS" light={false}/>
          {boxes}
          <text x="400" y="320" fontFamily={FONT_C} fontSize="32" fill={GREEN}
            textAnchor="middle">Careful assessment.</text>
          <text x="400" y="365" fontFamily={FONT_C} fontSize="32" fill="#876628"
            fontStyle="italic" textAnchor="middle">Clearer decisions.</text>
        </>
      )
      break
    }

    case 'maintenance-contractor-panel':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="MAINTENANCE" light={true}/>
          <circle cx="400" cy="225" r="180" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="150" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="120" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="90" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="60" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="30" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <text x="400" y="232" fontFamily={FONT_C} fontSize="20" fill={GOLD}
            textAnchor="middle" dominantBaseline="middle">Care</text>
          <text x="400" y="430" fontFamily={FONT_D} fontSize="12" fill={CREAM}
            letterSpacing="3" textAnchor="middle">MAINTENANCE COORDINATION</text>
        </>
      )
      break

    default:
      console.warn('BlogCover: no cover defined for slug:', slug)
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <text x="400" y="250" fontFamily={FONT_C} fontSize="32" fill={GOLD}
            textAnchor="middle">MacFarlane Property Group</text>
        </>
      )
  }

  return (
    <div className={`relative overflow-hidden w-full ${isCard ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
      <svg
        role="img"
        aria-hidden="true"
        focusable="false"
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0 }}
      >
        {inner}
      </svg>
    </div>
  )
}
