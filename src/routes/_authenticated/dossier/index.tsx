import { createFileRoute } from '@tanstack/react-router'
import Dossier from '@/features/dossier'

export const Route = createFileRoute('/_authenticated/dossier/')({
  component: Dossier,
})
