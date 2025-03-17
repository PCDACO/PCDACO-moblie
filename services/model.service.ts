import axiosInstance from '~/configs/axios.config';
import { ModelsResponse } from '~/constants/models/model.model';

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
