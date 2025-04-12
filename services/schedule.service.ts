import axiosInstance from '~/configs/axios.config';
import {
  InspectionScheduleDetailResponse,
  InspectionScheduleParmas,
  InspectionScheduleReponse,
} from '~/constants/models/schedule.model';

export const scheduleService = {
  get: {
    list: async (
      params: InspectionScheduleParmas
    ): Promise<RootResponse<InspectionScheduleReponse[]>> => {
      const response = await axiosInstance.get('/api/inspection-schedules', { params });
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<InspectionScheduleDetailResponse>> => {
      const response = await axiosInstance.get(`/api/inspection-schedules/${id}`);
      return response.data;
    },
  },
};
