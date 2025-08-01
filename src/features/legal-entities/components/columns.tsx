import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LegalEntity } from '../data/schema'
import { RowActions } from './row-actions'

export const columns: ColumnDef<LegalEntity>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className='p-0'
      >
        Код <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div className='w-28'>{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className='p-0'
      >
        Назва <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='max-w-xs truncate'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge className='rounded-[var(--radius)]'>{row.getValue('status')}</Badge>
    ),
  },
  {
    accessorKey: 'regDate',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className='p-0'
      >
        Дата реєстрації <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'orgType',
    header: 'Тип',
  },
  {
    accessorKey: 'relation',
    header: 'Відношення',
  },
  {
    id: 'actions',
    header: 'Дії',
    cell: ({ row }) => <RowActions row={row} />,
  },
]
