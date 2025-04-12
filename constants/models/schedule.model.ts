export interface InspectionScheduleReponse {
  id: string;
  technicianId: string;
  technicianName: string;
  carId: string;
  carOwnerId: string;
  carOwnerName: string;
  statusName: string;
  note: string;
  inspectionAddress: string;
  inspectionDate: Date;
  createdAt: Date;
}

export interface InspectionScheduleParmas {
  technicianId?: string;
  month?: number;
  year?: number;
  firstDay?: number;
  lastDay?: number;
}

export interface InspectionScheduleDetailResponse {
  id: string;
  date: Date;
  address: string;
  notes: string;
  technician: Technician;
  owner: Owner;
  car: Car;
  createdAt: Date;
  contractId: string;
  hasGPSDevice: boolean;
}

export interface Car {
  id: string;
  modelId: string;
  modelName: string;
  fuelType: string;
  transmissionType: string;
  amenities: Amenity[];
}

export interface Amenity {
  id: string;
  name: string;
  iconUrl: string;
}

export interface Owner {
  id: string;
  name: string;
  avatarUrl: string;
  phone: string;
}

export interface Technician {
  id: string;
  name: string;
}
