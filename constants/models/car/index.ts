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

export interface CarResponse {}

export interface CarDetailResponse {}

export interface CarImagesPayload {
  carImages: string[];
  paperImages: string[];
}

export interface CarAmenitiesPayload {
  amenityId: string[];
}
