import { LegalEntity } from './schema'

export const legalEntities: LegalEntity[] = [
  {
    id: 1,
    code: '001',
    name: 'ТОВ "Ромашка"',
    status: 'Активно',
    regDate: '12.01.2020',
    orgType: 'ТОВ',
    relation: 'Клієнт',
  },
  {
    id: 2,
    code: '002',
    name: 'ТОВ "Квітка"',
    status: 'Погоджено',
    regDate: '05.03.2021',
    orgType: 'ТОВ',
    relation: 'Виробник',
  },
  {
    id: 3,
    code: '003',
    name: 'ПАТ "Україна"',
    status: 'Активно',
    regDate: '18.07.2019',
    orgType: 'ПАТ',
    relation: 'Конкурент',
  },
  {
    id: 4,
    code: '004',
    name: 'ТОВ "Інновація"',
    status: 'Активно',
    regDate: '22.11.2022',
    orgType: 'ТОВ',
    relation: 'Клієнт',
  },
  {
    id: 5,
    code: '005',
    name: 'АТ "Енерго"',
    status: 'Погоджено',
    regDate: '30.09.2018',
    orgType: 'АТ',
    relation: 'Виробник',
  },
]

export interface FetchParams {
  page: number
  size: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  filters?: { name?: string; code?: string }
}

export async function fetchLegalEntities({
  page,
  size,
  sortBy,
  sortDir,
  filters,
}: FetchParams): Promise<{ data: LegalEntity[]; total: number }> {
  let rows = [...legalEntities]

  if (filters?.name) {
    rows = rows.filter((r) =>
      r.name.toLowerCase().includes(filters.name!.toLowerCase())
    )
  }

  if (filters?.code) {
    rows = rows.filter((r) => r.code.includes(filters.code!))
  }

  if (sortBy) {
    rows.sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[sortBy] ?? '')
      const bVal = String((b as Record<string, unknown>)[sortBy] ?? '')
      return aVal.localeCompare(bVal)
    })
    if (sortDir === 'desc') rows.reverse()
  }

  const total = rows.length
  const start = (page - 1) * size
  const end = start + size
  rows = rows.slice(start, end)

  return { data: rows, total }
}
