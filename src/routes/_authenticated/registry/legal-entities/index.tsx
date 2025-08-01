import { createFileRoute } from '@tanstack/react-router'
import LegalEntitiesPage from '@/features/legal-entities'

export const Route = createFileRoute('/_authenticated/registry/legal-entities/')({
  component: LegalEntitiesPage,
})
