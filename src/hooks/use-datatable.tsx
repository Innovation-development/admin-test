import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface DatatableParams {
  page: number
  size: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface DatatableResult<T> {
  data: T[]
  total: number
  isLoading: boolean
  refetch: () => void
  setParams: React.Dispatch<React.SetStateAction<DatatableParams>>
  params: DatatableParams
}

export function useDatatable<T>(
  key: string,
  fetcher: (params: DatatableParams) => Promise<{ data: T[]; total: number }>,
  initial?: DatatableParams
): DatatableResult<T> {
  const [params, setParams] = useState<DatatableParams>({
    page: 1,
    size: 10,
    ...initial,
  })

  const { data: result, isLoading, refetch } = useQuery<{ data: T[]; total: number }, Error, { data: T[]; total: number }>({
    queryKey: [key, params],
    queryFn: () => fetcher(params),
  })

  return {
    data: result?.data ?? [],
    total: result?.total ?? 0,
    isLoading,
    refetch,
    setParams,
    params,
  }
}
