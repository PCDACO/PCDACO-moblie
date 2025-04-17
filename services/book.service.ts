import axiosInstance from '~/configs/axios.config';
import {
  BookApprovePayload,
  BookCompleteResponse,
  BookParams,
  BookPayload,
  BookPaymentResponse,
  BookPostInspection,
  BookPostInspectionPayload,
  BookPreInspectionPayload,
  BookResponseDetail,
  BookResponseList,
  BookStartTripPayload,
  Webhook,
} from '~/constants/models/book.model';

export const BookService = {
  get: {
    list: async (
      params?: Partial<BookParams>
    ): Promise<RootResponse<Pagination<BookResponseList>>> => {
      // Transform status array into multiple status parameters
      const transformedParams = { ...params };
      if (transformedParams.status) {
        const statuses = Array.isArray(transformedParams.status)
          ? transformedParams.status
          : [transformedParams.status];
        delete transformedParams.status;
        // Create an array of status parameters
        transformedParams.status = statuses;
      }

      const response = await axiosInstance.get('/api/bookings', {
        params: transformedParams,
        paramsSerializer: {
          indexes: null, // This will serialize arrays as repeated parameters
        },
      });
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<BookResponseDetail>> => {
      const response = await axiosInstance.get(`/api/bookings/${id}`);
      return response.data;
    },

    contracts: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.get(`/api/bookings/${id}/contract`);
      return response.data;
    },

    payment: async (token: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.get(`/api/bookings/payment/${token}`);
      return response.data;
    },
  },
  post: {
    bookings: async (payload: BookPayload): Promise<RootResponse<any>> => {
      const response = await axiosInstance.post('/api/bookings', payload);
      return response.data;
    },

    bookingPayment: async (id: string): Promise<RootResponse<BookPaymentResponse>> => {
      const response = await axiosInstance.post(`/api/bookings/${id}/payment`);
      return response.data;
    },

    webhook: async (payload: Webhook) => {
      const response = await axiosInstance.post('/api/webhook', payload);
      return response.data;
    },

    track: async (id: string, payload: BookStartTripPayload) => {
      const response = await axiosInstance.post(`/api/bookings/${id}/track`, payload);
      return response.data;
    },

    postInspection: async (
      bookingId: string,
      payload: BookPostInspectionPayload
    ): Promise<RootResponse<BookPostInspection>> => {
      const formData = new FormData();

      payload.fuelGaugeFinalPhotos.forEach((file) => {
        formData.append('fuelGaugeFinalPhotos', file);
      });

      payload.cleanlinessPhotos.forEach((file) => {
        formData.append('cleanlinessPhotos', file);
      });

      payload.scratchesPhotos.forEach((file) => {
        formData.append('scratchesPhotos', file);
      });

      payload.tollFeesPhotos.forEach((file) => {
        formData.append('tollFeesPhotos', file);
      });

      const response = await axiosInstance.postForm(
        `/api/bookings/${bookingId}/post-inspection`,
        formData
      );

      return response.data;
    },

    preInspection: async (
      bookingId: string,
      payload: BookPreInspectionPayload
    ): Promise<RootResponse<BookPostInspection>> => {
      const formData = new FormData();

      payload.exteriorPhotos.forEach((file) => {
        formData.append('exteriorPhotos', file);
      });

      payload.fuelGaugePhotos.forEach((file) => {
        formData.append('fuelGaugePhotos', file);
      });

      payload.carKeyPhotos.forEach((file) => {
        formData.append('carKeyPhotos', file);
      });

      payload.trunkPhotos.forEach((file) => {
        formData.append('trunkPhotos', file);
      });

      payload.parkingLocationPhotos.forEach((file) => {
        formData.append('parkingLocationPhotos', file);
      });

      const response = await axiosInstance.postForm(
        `/api/bookings/${bookingId}/pre-inspection`,
        formData
      );

      return response.data;
    },
  },
  put: {
    complete: async (id: string): Promise<RootResponse<BookCompleteResponse>> => {
      const response = await axiosInstance.put(`/api/bookings/${id}/complete`);
      return response.data;
    },

    cancel: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.put(`/api/bookings/${id}/cancel`);
      return response.data;
    },

    startTrip: async (id: string) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/start-trip`);
      return response.data;
    },

    approveOrReject: async (id: string, payload: BookApprovePayload) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/approve`, payload);
      return response.data;
    },
    return: async (id: string) => {
      const response = await axiosInstance.put(`/api/bookings/${id}/return`);
      return response.data;
    },
  },
  delete: {},
  patch: {},
};
