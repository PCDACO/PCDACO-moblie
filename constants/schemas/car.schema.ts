import { z } from 'zod';

// const imageSizeSchema = z.instanceof(File).refine((file) => file.size < 5000000, {
//   message: 'Image size must be less than 5MB',
// });

const checkImageSize = (file: string) => {
  const BASE64_LENGTH = file.length - (file.indexOf(',') + 1);
  const FILE_SIZE = (BASE64_LENGTH * 3) / 4 / 1024 / 1024; // Convert to MB
  return FILE_SIZE <= 2; // Kiểm tra nếu nhỏ hơn 2MB
};

export const carSchema = z.object({
  carImages: z
    .array(z.string())
    .nonempty('Car images cannot be empty')
    // .min(1, 'Car images must be at least 1')
    .max(6, 'Car images must be less than 6')
    .refine(
      (files) => files.every((file) => checkImageSize(file)),
      'Each image must be smaller than 2MB'
    ),
  amenityIds: z.array(z.string()).nonempty('Amenity cannot be empty'),
  modelId: z.string().nonempty('Model cannot be empty'),
  transmissionTypeId: z.string().nonempty('Transmission type cannot be empty'),
  fuelTypeId: z.string().uuid().nonempty('Fuel type cannot be empty'),
  licensePlate: z.string().nonempty('License plate cannot be empty'),
  color: z.string().nonempty('Color cannot be empty'),
  seat: z
    .number()
    .int()
    .positive('Seat must be a positive integer')
    .max(7, 'Seat must be less than 7'),
  description: z.string().nonempty('Description cannot be empty'),
  fuelConsumption: z
    .number()
    .positive('Fuel consumption must be a positive number')
    .max(20, 'Fuel consumption must be less than 20'),
  requiresCollateral: z.boolean(),
  price: z
    .number()
    .positive('Price per hour must be a positive number')
    .max(5000000, 'Price must be less than 5,000,000'),

  // paperImages: z.array(imageSizeSchema).nonempty('Paper images cannot be empty'),
});

export type CarPayloadSchema = z.infer<typeof carSchema>;
