import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const CarReportSchema = z.object({
  carId: z.string().nonempty('Không được để trống'),
  title: z.string().nonempty('Không được để trống'),
  description: z.string().nonempty('Không được để trống'),
  reportType: z.number().min(0, 'Không được để trống'),
  files: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    )
    .optional(),
});

export type CarReportSchemaType = z.infer<typeof CarReportSchema>;
