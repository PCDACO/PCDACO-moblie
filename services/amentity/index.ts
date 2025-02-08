import axiosInstance from '~/configs/axios';
import { AmentityResponse } from '~/constants/models/amenitiy';

export const AmenityService = {
  listAmenities: async (
    request: RootRequest
  ): Promise<RootResponse<Pagination<AmentityResponse>>> => {
    const response = await axiosInstance
      .get<RootResponse<Pagination<AmentityResponse>>>(`/api/amenities`, {
        params: request,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  },
};
