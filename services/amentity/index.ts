import axiosInstance from '~/configs/axios';
import { AmentityResponse } from '~/constants/models/amenitiy';

export const AmenityService = {
  get: {
    list: async (params?: RootRequest): Promise<RootResponse<Pagination<AmentityResponse>>> => {
      try {
        const response = await axiosInstance.get('/api/amenities', { params });
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
  },
};
