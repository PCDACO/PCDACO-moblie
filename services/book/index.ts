import axiosInstance from '~/configs/axios';
import {
  BookDetailResponse,
  BookFeedbackPayload,
  BookParams,
  BookPayload,
  BookResponse,
  BookTrackBatchPayload,
  BookTrackPayload,
  BookWebhook,
} from '~/constants/models/book';

export const BookService = {
  get: {
    List: async (params?: BookParams): Promise<RootResponse<Pagination<BookResponse>>> => {
      const response = await axiosInstance
        .get('/api/bookings', { params })
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Detail: async (id?: string): Promise<RootResponse<BookDetailResponse>> => {
      if (!id) {
        throw new Error('ID is required');
      }

      const response = await axiosInstance
        .get(`/api/bookings/${id}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },
  },

  put: {
    Approve: async (id: string, isApproved: boolean): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .put(`/api/bookings/${id}/approve`, { isApproved })
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Cancel: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .put(`/api/bookings/${id}/cancel`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Complete: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .put(`/api/bookings/${id}/complete`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Return: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .put(`/api/bookings/${id}/return`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    StartTrip: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .put(`/api/bookings/${id}/start-trip`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },
  },

  post: {
    BookTrackBatch: async (data: BookTrackBatchPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .post('/api/bookings/batch', data)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    BookTrack: async (data: BookTrackPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .post('/api/bookings', data)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    BookFeedback: async (id: string, data: BookFeedbackPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .post(`/api/bookings/${id}/feedback`, data)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Book: async (data: BookPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .post('/api/bookings', data)
        .then((res) => res.data)
        .catch((err) => err.response.data);
      return response;
    },

    Webhook: async (data: BookWebhook): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .post('/api/webhook', data)
        .then((res) => res.data)
        .catch((err) => err.response.data);

      return response;
    },
  },
};
