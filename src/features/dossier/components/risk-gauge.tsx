
interface RiskGaugeProps {
  value: number
  loading?: boolean
}

export function RiskGauge({ value, loading }: RiskGaugeProps) {
  if (loading) return <RiskGaugeSkeleton />

  const radius = 80
  const circumference = Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className='flex flex-col items-center justify-center'>
      <svg
        width='200'
        height='110'
        viewBox='0 0 200 110'
        className='overflow-visible'
        aria-label='Рівень ризику'
      >
        <defs>
          <linearGradient id='riskGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#27AE60' />
            <stop offset='50%' stopColor='#F2994A' />
            <stop offset='100%' stopColor='#E63946' />
          </linearGradient>
        </defs>
        <path
          d='M10 100 A90 90 0 0 1 190 100'
          stroke='#e5e7eb'
          strokeWidth='20'
          fill='none'
        />
        <path
          d='M10 100 A90 90 0 0 1 190 100'
          stroke='url(#riskGradient)'
          strokeWidth='20'
          fill='none'
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
        <text
          x='100'
          y='85'
          textAnchor='middle'
          className='fill-gray-700 font-medium text-xl'
        >
          {value}%
        </text>
      </svg>
    </div>
  )
}

export function RiskGaugeSkeleton() {
  return <div className='h-[110px] w-full rounded-xl bg-muted animate-pulse' />
}
