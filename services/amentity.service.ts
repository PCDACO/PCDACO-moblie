import axiosInstance from '~/configs/axios.config';
import { AmenityResponseList } from '~/constants/models/amenity.model';

export const AmenityService = {
  get: {
    list: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<AmenityResponseList>>> => {
      const response = await axiosInstance.get('/api/amenities', { params });
      return response.data;
    },
  },
};
