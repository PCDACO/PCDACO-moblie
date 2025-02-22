import axiosInstance from '~/configs/axios';
import { TransmissionResponse } from '~/constants/models/transmission';

export const TransmissionService = {
  listTransmissions: async (
    request?: RootRequest
  ): Promise<RootResponse<Pagination<TransmissionResponse>>> => {
    const response = await axiosInstance
      .get<RootResponse<Pagination<TransmissionResponse>>>(`/api/transmission-types`, {
        params: request,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  },
};
