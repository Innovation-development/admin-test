import React from 'react'
import { IconClock } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'

export interface TimelineItem {
  id: number
  icon?: React.ReactNode
  text: string
  time: string
}

export function Timeline({
  items,
  loading,
}: {
  items: TimelineItem[]
  loading?: boolean
}) {
  if (loading) return <TimelineSkeleton />

  return (
    <ol className='relative border-l pl-4'>
      {items.map((item) => (
        <li key={item.id} className='mb-6 ml-2'>
          <span className='absolute -left-3 flex size-6 items-center justify-center rounded-full bg-[#2F80ED]/10 text-[#2F80ED]'>
            {item.icon || <IconClock size={16} />}
          </span>
          <p className='text-sm font-medium'>{item.text}</p>
          <time className='text-xs text-gray-500'>{item.time}</time>
        </li>
      ))}
    </ol>
  )
}

export function TimelineSkeleton() {
  return <Skeleton className='h-32 w-full' />
}
