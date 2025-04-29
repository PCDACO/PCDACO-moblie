import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const carSchema = z.object({
  carImages: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),

  amenityIds: z.array(z.string()).nonempty('Yêu cầu chọn tiện ích của xe'),
  modelId: z.string().nonempty('Yêu cầu chọn mẫu xe'),
  transmissionTypeId: z.string().nonempty('Yêu cầu chọn loại hộp số'),
  fuelTypeId: z.string().uuid().nonempty('Yêu cầu chọn loại nhiên liệu'),
  licensePlate: z.string().nonempty('Yêu cầu nhập biển số xe').min(8, {
    message: 'Biển số xe không được ít hơn 8 kí tự !',
  }),
  color: z.string().nonempty('Yêu cầu nhập màu xe'),
  seat: z.number().positive('Số ghế phải là số dương').max(20, 'Số ghế phải nhỏ hơn 20'),
  description: z
    .string()
    .nonempty('Yêu cầu nhập mô tả')
    .max(500, 'Điều khoản không được vượt quá 500 ký tự'),
  fuelConsumption: z.number().positive('Số tiêu thụ nhiên liệu phải là số dương').max(40, {
    message: 'Số tiêu thụ nhiên liệu phải nhỏ hơn 40',
  }),
  requiresCollateral: z.boolean(),
  pickupLatitude: z.number().positive('Vị trí lấy xe phải là số dương'),
  pickupLongitude: z.number().positive('Vị trí lấy xe phải là số dương'),
  pickupAddress: z.string().nonempty('Yêu cầu nhập địa chỉ lấy xe'),
  price: z
    .number()
    .positive('Số tiền phải là số dương')
    .max(10000000, 'Số tiền phải nhỏ hơn 10 triệu'),
  terms: z
    .string()
    .nonempty('Yêu cầu nhập điều khoản')
    .max(500, 'Điều khoản không được vượt quá 500 ký tự'),

  paperImages: z
    .any()
    .array()
    .refine((files) => files.length > 0, 'Yêu cầu ít nhất 1 hình ảnh')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ nhận ảnh định dạng jpg, jpeg, png, webp'
    ),
});

export const carAvailabilitySchema = z.object({
  dates: z.array(z.string()).nonempty('Yêu cầu chọn ngày'),
});

export type CarPayloadSchema = z.infer<typeof carSchema>;
export type CarAvailabilitySchema = z.infer<typeof carAvailabilitySchema>;
