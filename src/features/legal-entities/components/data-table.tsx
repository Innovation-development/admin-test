import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/features/tasks/components/data-table-pagination'
import { useEffect } from 'react'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  pageCount: number
  onPaginationChange: (updater: PaginationState | ((old: PaginationState) => PaginationState)) => void
  pagination: PaginationState
  sorting: SortingState
  onSortingChange: (updater: SortingState | ((old: SortingState) => SortingState)) => void
}

export function DataTable<TData>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination, sorting },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    table.setPageSize(pagination.pageSize)
  }, [pagination.pageSize, table])

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader className='bg-[color:var(--color-surface)]'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className='whitespace-nowrap'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='whitespace-nowrap'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
