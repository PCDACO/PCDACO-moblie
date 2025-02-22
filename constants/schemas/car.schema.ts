import { z } from 'zod';

export const carSchema = z.object({
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
});

export type CarPayloadSchema = z.infer<typeof carSchema>;
