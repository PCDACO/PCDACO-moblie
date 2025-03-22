import axiosInstance from '~/configs/axios.config';
import {
  CarDetailResponse,
  CarParams,
  CarPayload,
  CarResponseList,
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
        return error.response.data.message;
      }
    },

    detail: async (id: string): Promise<RootResponse<CarDetailResponse>> => {
      try {
        const response = await axiosInstance.get<RootResponse<CarDetailResponse>>(`/api/car/${id}`);
        return response.data;
      } catch (error: any) {
        return error.response.data.message;
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
        return error.response.data.message;
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
        return error.response.data.message;
      }
    },
  },

  delete: {
    car: async (id: string): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.delete<RootResponse<null>>(`/api/cars/${id}`);
        return response.data;
      } catch (error: any) {
        return error.response.data.message;
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
        return error.response.data.message;
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
        return error.response.data.message;
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
        return error.response.data.message;
      }
    },
  },
};
