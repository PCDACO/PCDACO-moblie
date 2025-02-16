import { z } from 'zod';

export const carSchema = z.object({
  amenityIds: z.array(z.string().uuid()),
  modelId: z.string().uuid(),
  transmissionTypeId: z.string().uuid(),
  fuelTypeId: z.string().uuid(),
  licensePlate: z.string().nonempty('License plate cannot be empty'),
  color: z.string().nonempty('Color cannot be empty'),
  seat: z.number().int().positive('Seat must be a positive integer'),
  description: z.string().nonempty('Description cannot be empty'),
  fuelConsumption: z.number().positive('Fuel consumption must be a positive number'),
  requiresCollateral: z.boolean(),
  pricePerHour: z.number().positive('Price per hour must be a positive number'),
  pricePerDay: z.number().positive('Price per day must be a positive number'),
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longtitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

export type Car = z.infer<typeof carSchema>;
