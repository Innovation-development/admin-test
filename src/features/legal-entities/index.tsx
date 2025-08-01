import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { useDatatable } from '@/hooks/use-datatable'
import { fetchLegalEntities } from './data/legal-entities'
import { LegalEntity } from './data/schema'

export default function LegalEntitiesPage() {
  const {
    data,
    total,
    params,
    setParams,
  } = useDatatable<LegalEntity>('legal-entities', fetchLegalEntities, {
    page: 1,
    size: 10,
  })

  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setParams((p) => ({ ...p, page: 1, filters: { name, code } }))
    }, 500)
    return () => clearTimeout(t)
  }, [name, code, setParams])

  return (
    <>
      <Header>
        <Button variant='default' data-testid='add-button'>Додати</Button>
      </Header>
      <Main>
        <div className='mb-4 flex items-center'>
          <Input
            placeholder='Назва'
            data-testid='filter-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='max-w-xs'
          />
          <Input
            placeholder='Код'
            data-testid='filter-code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='ml-4 max-w-32'
          />
        </div>
        <DataTable
          data={data}
          columns={columns}
          pageCount={Math.ceil(total / params.size)}
          pagination={{ pageIndex: params.page - 1, pageSize: params.size }}
          onPaginationChange={(updater) =>
            setParams((p) => {
              const value =
                typeof updater === 'function' ? updater({ pageIndex: p.page - 1, pageSize: p.size }) : updater
              return { ...p, page: value.pageIndex + 1, size: value.pageSize }
            })
          }
          sorting={params.sortBy ? [{ id: params.sortBy, desc: params.sortDir === 'desc' }] : []}
          onSortingChange={(updater) => {
            const val = typeof updater === 'function' ? updater([]) : updater
            const sort = val[0]
            if (sort) {
              setParams((p) => ({ ...p, sortBy: sort.id as string, sortDir: sort.desc ? 'desc' : 'asc' }))
            }
          }}
        />
      </Main>
    </>
  )
}
