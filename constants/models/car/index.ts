export interface CarPayload {
  amenityIds?: string[]; //done
  modelId?: string; //done
  transmissionTypeId?: string;
  fuelTypeId?: string; //done
  licensePlate?: string; //done
  color?: string; //done
  seat?: number; //done
  description?: string; //done
  fuelConsumption?: number; //done
  requiresCollateral?: boolean;
  price?: number; //done
}

export interface CarParams extends ListPaginationRequest {
  radius?: number;
  model?: string;
  amenities?: string[];
  fuel?: string;
  transmission?: string;
}

export interface CarResponse {
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
  location: null;
  manufacturer: Manufacturer;
  images: any[];
  amenities: Amenity[];
}

interface Amenity {
  id: string;
  name: string;
  description: string;
}

interface Manufacturer {
  id: string;
  name: string;
}

export interface CarDetailResponse {}

export interface CarImagesPayload {
  carImages: File[];
  paperImages: File[];
}

export interface CarAmenitiesPayload {
  amenityId: string[];
}
