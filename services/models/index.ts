import axiosInstance from '~/configs/axios';
import { ModelsResponse } from '~/constants/models/models';

export const ModelsService = {
  get: {
    list: async (params: RootRequest): Promise<RootResponse<Pagination<ModelsResponse>>> => {
      try {
        const response = await axiosInstance.get<RootResponse<Pagination<ModelsResponse>>>(
          `/api/models`,
          { params }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
