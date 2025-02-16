export interface CarPayload {
  amenityIds: string[];
  modelId: string;
  transmissionTypeId: string; // Loại hộp số
  fuelTypeId: string; // Loại nhiên liệu
  licensePlate: string; // Biển số xe
  color: string;
  seat: number; // Số chỗ ngồi
  description: string;
  fuelConsumption: number; // Lượng nhiên liệu tiêu thụ
  requiresCollateral: boolean; // Yêu cầu tài sản đảm bảo
  pricePerHour: number;
  pricePerDay: number;
  latitude: number;
  address: string;
  longtitude: number;
}

export interface CarParams extends ListPaginationRequest {
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
