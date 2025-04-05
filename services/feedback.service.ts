import axiosInstance from '~/configs/axios.config';
import {
  FeedbackParams,
  FeedbackPayload,
  FeedbackResponse,
} from '~/constants/models/feedback.model';

export const FeebackService = {
  get: {
    current: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<FeedbackResponse>>> => {
      try {
        const response = await axiosInstance.get('/api/feedbacks/current-user', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    byBooking: async (
      params?: Partial<FeedbackParams>
    ): Promise<RootResponse<Pagination<FeedbackResponse>>> => {
      try {
        const response = await axiosInstance.get('/api/feedbacks/by-booking', { params });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },

  post: {
    create: async (
      id: string,
      payload: FeedbackPayload
    ): Promise<RootResponse<FeedbackResponse>> => {
      try {
        const response = await axiosInstance.post(`/api/booking/${id}/feedback`, payload);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
};
