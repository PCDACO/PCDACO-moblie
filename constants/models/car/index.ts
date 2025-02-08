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
  pricePerHour: number;
  pricePerDay: number;
  latitude: number;
  longtitude: number;
}

export interface CarParams extends ListPagination {
  latitude?: number;
  longtitude?: number;
  radius?: number;
  model?: string;
  amenities?: string[];
  fuel?: string;
  transmission?: string;
}

export interface CarResponse {}

export interface CarDetailResponse {}

export interface CarImagesPayload {
  carImages: File[];
  paperImages: File[];
}

export interface CarAmenitiesPayload {
  amenityId: string[];
}
