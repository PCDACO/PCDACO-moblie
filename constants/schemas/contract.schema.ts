import { z } from 'zod';

export const contractSchema = z.object({
  signature: z.string().min(1).nonempty('Vui lòng ký xác nhận'),
});

export type ContractPayloadSchema = z.infer<typeof contractSchema>;
