import axiosInstance from '~/configs/axios';
import { FuelResponse } from '~/constants/models/fuel';

export const FuelService = {
  listFuel: async (request: RootRequest): Promise<RootResponse<Pagination<FuelResponse>>> => {
    try {
      const response = await axiosInstance.get<RootResponse<Pagination<FuelResponse>>>(
        `/api/fuel-types`,
        {
          params: request,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
    // const response = await axiosInstance
    //   .get<RootResponse<Pagination<FuelResponse>>>(`/api/fuel-types`, {
    //     params: request,
    //   })
    //   .then((res) => res.data)
    //   .catch((error) => {
    //     throw new Error(error);
    //   });

    // return response;
  },
};
