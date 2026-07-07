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

  const CategoryBadge = ({ label }: { label: string }) => (
    <>
      <text x="40" y="55" fontFamily={FONT_D} fontSize="12" fill={GOLD}
        letterSpacing="3" textAnchor="start">{label}</text>
      <line x1="40" y1="65" x2="62" y2="65" stroke={GOLD} strokeWidth="1.5"/>
    </>
  )

  let inner: React.ReactNode

  switch (slug) {
    case 'why-property-management-fees-are-too-high':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={CREAM}/>
          <CategoryBadge label="PRICING"/>
          <text x="400" y="230" fontFamily={FONT_C} fontSize="96" fill="#6B7280"
            fillOpacity="0.55" textAnchor="middle" dominantBaseline="middle">10–12%</text>
          <line x1="160" y1="195" x2="640" y2="235" stroke={GOLD} strokeWidth="3"/>
          <text x="400" y="310" fontFamily={FONT_C} fontSize="36" fill={GREEN}
            fontStyle="italic" textAnchor="middle">below 10%</text>
        </>
      )
      break

    case 'switching-managers-without-disruption':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="OPERATIONS"/>
          <text x="400" y="160" fontFamily={FONT_D} fontSize="14" fill={CREAM}
            fillOpacity="0.7" textAnchor="middle" letterSpacing="2">switch complete in</text>
          <text x="400" y="290" fontFamily={FONT_C} fontSize="180" fill={GOLD}
            textAnchor="middle" dominantBaseline="middle">48</text>
          <text x="400" y="370" fontFamily={FONT_C} fontSize="32" fill={CREAM}
            fontStyle="italic" textAnchor="middle">hours</text>
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
          <CategoryBadge label="MARKET"/>
          <text x="400" y="220" fontFamily={FONT_C} fontSize="110" fill={GREEN}
            textAnchor="middle" dominantBaseline="middle">2026</text>
          <text x="400" y="330" fontFamily={FONT_C} fontSize="36" fill={GOLD}
            fontStyle="italic" textAnchor="middle">South Africa</text>
        </>
      )
      break

    case 'whatsapp-property-management':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="OPERATIONS"/>
          <rect x="140" y="170" width="200" height="140" fill="none"
            stroke={CREAM} strokeWidth="1.5" fillOpacity="0.4" rx="4"/>
          <path d="M 140,170 L 240,240 L 340,170" fill="none"
            stroke={CREAM} strokeWidth="1.5" fillOpacity="0.4"/>
          <text x="400" y="255" fontFamily={FONT_C} fontSize="48" fill={GOLD}
            fontStyle="italic" textAnchor="middle" dominantBaseline="middle">vs.</text>
          <rect x="460" y="155" width="200" height="130" fill={GOLD} rx="12"/>
          <polygon points="510,285 490,320 530,285" fill={GOLD}/>
          <text x="400" y="360" fontFamily={FONT_C} fontSize="18" fill={CREAM}
            fontStyle="italic" textAnchor="middle">tenant reply rate</text>
        </>
      )
      break

    case 'avoiding-bad-tenant-vetting': {
      const boxes = [0, 1, 2, 3, 4].map(i => {
        const bx = 155 + i * 120
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
          <CategoryBadge label="TENANTS"/>
          {boxes}
          <text x="400" y="320" fontFamily={FONT_C} fontSize="32" fill={GREEN}
            textAnchor="middle">Five checks.</text>
          <text x="400" y="365" fontFamily={FONT_C} fontSize="32" fill={GOLD}
            fontStyle="italic" textAnchor="middle">Five minutes.</text>
        </>
      )
      break
    }

    case 'maintenance-contractor-panel':
      inner = (
        <>
          <rect width="800" height={vbHeight} fill={GREEN}/>
          <CategoryBadge label="MAINTENANCE"/>
          <circle cx="400" cy="225" r="180" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="150" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="120" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="90" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="60" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <circle cx="400" cy="225" r="30" fill="none" stroke={GOLD} strokeWidth="1.5"/>
          <text x="400" y="232" fontFamily={FONT_C} fontSize="20" fill={GOLD}
            textAnchor="middle" dominantBaseline="middle">Q1·Q4</text>
          <text x="400" y="430" fontFamily={FONT_D} fontSize="12" fill={CREAM}
            letterSpacing="3" textAnchor="middle">CONTRACTOR REVIEWS</text>
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
