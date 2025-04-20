import axiosInstance from '~/configs/axios.config';
import {
  CarReportDetailResponse,
  CarReportListReponse,
  CarReportParams,
  CarReportPayload,
} from '~/constants/models/car-report.model';

export const CarReportService = {
  get: {
    carReport: async (
      params?: Partial<CarReportParams>
    ): Promise<RootResponse<Pagination<CarReportListReponse>>> => {
      const carReport = await axiosInstance.get(`/api/car-reports`, { params });
      return carReport.data;
    },
    carReportDetail: async (id: string): Promise<RootResponse<CarReportDetailResponse>> => {
      const carReport = await axiosInstance.get(`/api/car-reports/${id}`);
      return carReport.data;
    },
  },

  post: {
    createCarReport: async (data: CarReportPayload): Promise<RootResponse<{ id: string }>> => {
      const carReport = await axiosInstance.post(`/api/car-reports`, data);
      return carReport.data;
    },
  },

  patch: {
    imageCarReport: async (reportId: string, files: File[]): Promise<RootResponse<null>> => {
      const formDate = new FormData();

      files.forEach((file) => {
        formDate.append('files', file);
      });

      const carReport = await axiosInstance.patchForm(
        `/api/car-reports/${reportId}/images`,
        formDate
      );
      return carReport.data;
    },
  },
};
