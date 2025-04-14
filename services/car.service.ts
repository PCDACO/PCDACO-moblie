import axiosInstance from '~/configs/axios.config';
import {
  CarAvailabilityPayload,
  CarDetailResponse,
  CarParams,
  CarPayload,
  CarResponseList,
  CarStatusResponse,
  CarUnavailableResponse,
  CarUnavailableParams,
} from '~/constants/models/car.model';

export const CarService = {
  get: {
    list: async (
      request?: Partial<CarParams>
    ): Promise<RootResponse<Pagination<CarResponseList>>> => {
      const response = await axiosInstance.get<RootResponse<Pagination<CarResponseList>>>(
        `/api/cars/personal`,
        { params: request }
      );
      return response.data;
    },

    detail: async (id: string): Promise<RootResponse<CarDetailResponse>> => {
      const response = await axiosInstance.get<RootResponse<CarDetailResponse>>(`/api/car/${id}`);
      return response.data;
    },

    contact: async (id: string) => {
      const response = await axiosInstance.get<RootResponse<null>>(`/api/cars/${id}/contract`);
      return response.data;
    },

    unavailable: async (
      params: CarUnavailableParams
    ): Promise<RootResponse<CarUnavailableResponse[]>> => {
      const response = await axiosInstance.get<RootResponse<CarUnavailableResponse[]>>(
        `/api/cars/${params.id}/unavailable-dates`,
        { params }
      );
      return response.data;
    },
  },

  post: {
    car: async (payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      const response = await axiosInstance.post<RootResponse<{ id: string }>>(`/api/cars`, payload);
      return response.data;
    },

    enable: async (id: string): Promise<RootResponse<CarStatusResponse>> => {
      const response = await axiosInstance.post<RootResponse<CarStatusResponse>>(
        `/api/cars/${id}/enable`
      );
      return response.data;
    },

    disable: async (id: string): Promise<RootResponse<CarStatusResponse>> => {
      const response = await axiosInstance.post<RootResponse<CarStatusResponse>>(
        `/api/cars/${id}/disable`
      );
      return response.data;
    },

    availability: async (
      id: string,
      payload: CarAvailabilityPayload
    ): Promise<RootResponse<null>> => {
      const response = await axiosInstance.post<RootResponse<null>>(
        `/api/cars/${id}/availability`,
        payload
      );
      return response.data;
    },

    assign_contract: async (id: string, signature: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.post<RootResponse<null>>(
        `/api/cars/${id}/contract/sign`,
        { signature }
      );
      return response.data;
    },
  },

  put: {
    car: async (id: string, payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      const response = await axiosInstance.put<RootResponse<{ id: string }>>(
        `/api/cars/${id}`,
        payload
      );
      return response.data;
    },
  },

  delete: {
    car: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.delete<RootResponse<null>>(`/api/cars/${id}`);
      return response.data;
    },
  },

  patch: {
    carImages: async (carId: string, payload: File[]): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axiosInstance.patch(`/api/cars/${carId}/car-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },

    paperImages: async (carId: string, payload: File[]): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axiosInstance.patch(`/api/cars/${carId}/paper-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },

    carAmenities: async (
      carId: string,
      payload: {
        amenityId: string[];
      }
    ): Promise<RootResponse<null>> => {
      const response = await axiosInstance.patch<RootResponse<null>>(
        `/api/cars/${carId}/amenities`,
        payload
      );
      return response.data;
    },
  },
};
