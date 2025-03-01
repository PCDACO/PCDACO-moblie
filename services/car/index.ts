import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

import axiosInstance from '~/configs/axios';
import {
  CarAmenitiesPayload,
  CarDetailResponse,
  CarImagesPayload,
  CarParams,
  CarPayload,
  CarResponse,
} from '~/constants/models/car';

export const CarService = {
  get: {
    list: async (request?: CarParams): Promise<RootResponse<Pagination<CarResponse>>> => {
      try {
        const response = await axiosInstance.get<RootResponse<Pagination<CarResponse>>>(
          `/api/cars`,
          { params: request }
        );
        return response.data;
      } catch (error: any) {
        return error.response.data.message;
      }
    },

    detail: async (id: string): Promise<RootResponse<CarDetailResponse>> => {
      try {
        const response = await axiosInstance.get<RootResponse<CarDetailResponse>>(
          `/api/cars/${id}`
        );
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
    carImages: async (carId: string, payload: CarImagesPayload): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.paperImages.forEach((paper) => {
        formData.append('paperImages', paper);
      });

      payload.carImages.forEach((car) => {
        formData.append('carImages', car);
      });

      try {
        const response = await axiosInstance
          .patch(`/api/cars/${carId}/images`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => res.data)
          .catch((error) => {
            throw new Error(error);
          });

        return response;
      } catch (error: any) {
        return error.response.data.message;
      }
    },

    carAmenities: async (
      carId: string,
      payload: CarAmenitiesPayload
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
