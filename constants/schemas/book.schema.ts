import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const PreInspectionSchema = z.object({
  exteriorPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  fuelGaugePhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  carKeyPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  trunkPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  parkingLocationPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
});

export const PostInspectionSchema = z.object({
  fuelGaugeFinalPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  cleanlinessPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
  scratchesPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    )
    .optional(),
  tollFeesPhotos: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    )
    .optional(),
});

export type PreInspectionForm = z.infer<typeof PreInspectionSchema>;
export type PostInspectionForm = z.infer<typeof PostInspectionSchema>;
