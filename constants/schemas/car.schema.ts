import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const carSchema = z.object({
  carImages: z.any().array().nonempty('Yêu cầu ít nhất 1 hình ảnh'),

  amenityIds: z.array(z.string()).nonempty('Amenity cannot be empty'),
  modelId: z.string().nonempty('Yêu cầu chọn mẫu xe'),
  transmissionTypeId: z.string().nonempty('Yêu cầu chọn loại hộp số'),
  fuelTypeId: z.string().uuid().nonempty('Yêu cầu chọn loại nhiên liệu'),
  licensePlate: z.string().nonempty('Yêu cầu nhập biển số xe'),
  color: z.string().nonempty('Yêu cầu nhập màu xe'),
  seat: z.number().positive('Số ghế phải là số dương').max(20, 'Số ghế phải nhỏ hơn 20'),
  description: z.string().nonempty('Yêu cầu nhập mô tả'),
  fuelConsumption: z
    .number()
    .positive('Số tiêu thụ nhiên liệu phải là số dương')
    .max(40, 'Số tiêu thụ nhiên liệu phải nhỏ hơn 40'),
  requiresCollateral: z.boolean(),
  price: z
    .number()
    .positive('Số tiền phải là số dương')
    .max(10000000, 'Số tiền phải nhỏ hơn 10 triệu'),

  paperImages: z.any().array().nonempty('Yêu cầu ít nhất 1 hình ảnh'),
});

export type CarPayloadSchema = z.infer<typeof carSchema>;
