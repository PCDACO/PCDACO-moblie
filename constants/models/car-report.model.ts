export interface CarReportDetailResponse {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  title: string;
  description: string;
  reportType: string;
  status: number;
  resolvedAt: null;
  resolvedById: null;
  resolutionComments: null;
  imageUrls: string[];
  carDetail: CarDetail;
  bookings: Booking[];
  inspectionScheduleDetail: InspectionScheduleDetail;
}

export interface Booking {
  avatarUrl: string;
  bookingId: string;
  driverId: string;
  driverName: string;
  endTime: Date;
  startTime: Date;
}

export interface CarDetail {
  id: string;
  licensePlate: string;
  modelName: string;
  manufacturerName: string;
  color: string;
  imageUrl: string[];
}

export interface InspectionScheduleDetail {
  id: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  status: number;
  inspectionAddress: string;
  inspectionDate: Date;
  note: string;
  photoUrls: string[];
}

export interface CarReportListReponse {
  id: string;
  carId: string;
  reporterId: string;
  reporterName: string;
  title: string;
  description: string;
  reportType: string;
  status: string;
  resolvedAt: null;
  resolvedById: null;
  resolutionComments: null;
  imageReports: string[];
}

export interface CarReportParams extends RootRequest {
  status: number;
  type: number;
}

export interface CarReportPayload {
  carId: string;
  title: string;
  description: string;
  reportType: number;
}
