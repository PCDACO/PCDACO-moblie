import axiosInstance from '~/configs/axios.config';
import { ManufacturerResponse } from '~/constants/models/manufacurers.model';

export const ManufacturerService = {
  listManufacturer: async (
    request: RootRequest
  ): Promise<RootResponse<Pagination<ManufacturerResponse>>> => {
    const response = await axiosInstance
      .get<RootResponse<Pagination<ManufacturerResponse>>>(`/api/manufacturers`, {
        params: request,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  },
};
