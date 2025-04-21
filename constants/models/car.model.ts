import { CarStatusNumber } from '../enums';

export interface CarContactAssignResponse {
  contractId: string;
  status: string;
}

export interface CarLocationResponse {
  latitude: number;
  longitude: number;
  updatedAt: Date;
}

export interface CarStatusResponse {
  id: string;
  status: string;
}

export interface CarUnavailableResponse {
  date: Date;
}
export interface CarUnavailableParams {
  id: string;
  month: number;
  year: number;
}

export interface CarAvailabilityPayload {
  dates: Date[];
}

export interface CarParams extends Partial<LastIdRootResquest> {
  latitude: number;
  longtitude: number;
  radius: number;
  model: string;
  lastId: string;
  amentities: string[];
  fuel: string;
  transmission: string;
  keyword: string;
  status: CarStatusNumber;
}

export interface CarPayload {
  amenityIds: string[];
  modelId: string;
  transmissionTypeId: string;
  fuelTypeId: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  pickupLatitude: number;
  pickupLongitude: number;
  pickupAddress: string;
  terms: string;
}

export interface CarResponseList {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  terms: string;
  status: string;
  totalRented: number;
  averageRating: number;
  location: null;
  manufacturer: Manufacturer;
  images: Image[];
  amenities: Amenity[];
}

interface Manufacturer {
  id: string;
  name: string;
}

export interface CarContactAssign {
  contractId: string;
  status: string;
}

export interface CarDetailResponse {
  id: string;
  modelId: string;
  modelName: string;
  fuelTypeId: string;
  transmissionId: string;
  ownerId: string;
  ownerPhone: string;
  ownerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  terms: string;
  status: string;
  totalRented: number;
  averageRating: number;
  location: null;
  pickupLocation: PickupLocation;
  manufacturer: Manufacturer;
  images: Image[];
  amenities: Amenity[];
  bookings: Bookings[];
  contract: Contract;
  feedbacks: Feedback[];
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export interface Bookings {
  avatarUrl: string;
  bookingId: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  endTime: Date;
  startTime: Date;
  status: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Contract {
  id: string;
  terms: string;
  status: string;
  ownerSignatureDate: Date;
  technicianSignatureDate: Date;
  inspectionResults: null;
  gpsDeviceId: string;
}

export interface PickupLocation {
  longitude: number;
  latitude: number;
  address: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Image {
  id: string;
  url: string;
  type: 'Car' | 'Paper';
  name: string;
}
