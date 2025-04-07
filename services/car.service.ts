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
      try {
        const response = await axiosInstance.get<RootResponse<Pagination<CarResponseList>>>(
          `/api/cars/personal`,
          { params: request }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    detail: async (id: string): Promise<RootResponse<CarDetailResponse>> => {
      try {
        const response = await axiosInstance.get<RootResponse<CarDetailResponse>>(`/api/car/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    contact: async (id: string) => {
      try {
        const response = await axiosInstance.get<RootResponse<null>>(`/api/cars/${id}/contract`);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    unavailable: async (
      params: CarUnavailableParams
    ): Promise<RootResponse<CarUnavailableResponse[]>> => {
      try {
        const response = await axiosInstance.get<RootResponse<CarUnavailableResponse[]>>(
          `/api/cars/${params.id}/unavailable-dates`,
          { params }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  post: {
    car: async (payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      try {
        const response = await axiosInstance.post<RootResponse<{ id: string }>>(
          `/api/cars`,
          payload
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    enable: async (id: string): Promise<RootResponse<CarStatusResponse>> => {
      try {
        const response = await axiosInstance.post<RootResponse<CarStatusResponse>>(
          `/api/cars/${id}/enable`
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    disable: async (id: string): Promise<RootResponse<CarStatusResponse>> => {
      try {
        const response = await axiosInstance.post<RootResponse<CarStatusResponse>>(
          `/api/cars/${id}/disable`
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    availability: async (
      id: string,
      payload: CarAvailabilityPayload
    ): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.post<RootResponse<null>>(
          `/api/cars/${id}/availability`,
          payload
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    assign_contract: async (id: string): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.post<RootResponse<null>>(
          `/api/cars/${id}/contract/sign`
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  put: {
    car: async (id: string, payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      try {
        const response = await axiosInstance.put<RootResponse<{ id: string }>>(
          `/api/cars/${id}`,
          payload
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  delete: {
    car: async (id: string): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.delete<RootResponse<null>>(`/api/cars/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  patch: {
    carImages: async (carId: string, payload: File[]): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.forEach((image) => {
        formData.append('images', image);
      });

      try {
        const response = await axiosInstance.patch(`/api/cars/${carId}/car-images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    paperImages: async (carId: string, payload: File[]): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.forEach((image) => {
        formData.append('images', image);
      });

      try {
        const response = await axiosInstance.patch(`/api/cars/${carId}/paper-images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    carAmenities: async (
      carId: string,
      payload: {
        amenityId: string[];
      }
    ): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.patch<RootResponse<null>>(
          `/api/cars/${carId}/amenities`,
          payload
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
