import { useState } from 'react'
import { Row } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { legalEntitySchema, LegalEntity } from '../data/schema'

export function RowActions<TData>({ row }: { row: Row<TData> }) {
  const entity = legalEntitySchema.parse(row.original as LegalEntity)
  const [open, setOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>⋮</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem data-testid='edit-row'>Редагувати</DropdownMenuItem>
          <DropdownMenuItem
            variant='destructive'
            onSelect={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
            data-testid='delete-row'
          >
            <Trash2 className='mr-2 h-4 w-4' /> Видалити
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        destructive
        title={`Видалити ${entity.name}?`}
        desc='Цю дію не можна скасувати.'
        confirmText='Видалити'
        handleConfirm={() => setOpen(false)}
      />
    </>
  )
}
