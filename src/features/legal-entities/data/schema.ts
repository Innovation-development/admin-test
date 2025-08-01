import { z } from 'zod'

export const legalEntitySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  status: z.string(),
  regDate: z.string(),
  orgType: z.string(),
  relation: z.string(),
})

export type LegalEntity = z.infer<typeof legalEntitySchema>
