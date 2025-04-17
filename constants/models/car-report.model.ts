export interface CarReportDetailResponse {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  title: string;
  description: string;
  reportType: string;
  status: string;
  resolvedAt: null;
  resolvedById: null;
  resolutionComments: null;
  imageUrls: string[];
  carDetail: CarDetail;
  inspectionScheduleDetail: InspectionScheduleDetail;
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
  status: string;
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
