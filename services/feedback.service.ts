import axiosInstance from '~/configs/axios.config';
import {
  // FeedbackParams,
  FeedbackPayload,
  FeedbackResponse,
} from '~/constants/models/feedback.model';

export const FeebackService = {
  get: {
    current: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<FeedbackResponse>>> => {
      const response = await axiosInstance.get('/api/feedbacks/current-user', { params });
      return response.data;
    },

    // byBooking: async (
    //   params?: Partial<FeedbackParams>
    // ): Promise<RootResponse<Pagination<FeedbackResponse>>> => {
    //   const response = await axiosInstance.get('/api/bookings/{Ư', { params });
    //   return response.data;
    // },
  },

  post: {
    create: async (
      id: string,
      payload: FeedbackPayload
    ): Promise<RootResponse<FeedbackResponse>> => {
      const response = await axiosInstance.post(`/api/bookings/${id}/feedback`, payload);
      return response.data;
    },
  },
};
