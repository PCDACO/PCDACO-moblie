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
      const response = await axiosInstance
        .get<RootResponse<Pagination<CarResponse>>>(`/api/cars`, { params: request })
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },

    detail: async (id: string): Promise<RootResponse<CarDetailResponse>> => {
      const response = await axiosInstance
        .get<RootResponse<CarPayload>>(`/api/car/${id}`)
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },
  },

  post: {
    car: async (payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      const response = await axiosInstance
        .post(`/api/cars`, payload)
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },
  },

  put: {
    car: async (id: string, payload: CarPayload): Promise<RootResponse<{ id: string }>> => {
      const response = await axiosInstance
        .put(`/api/cars/${id}`, payload)
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },
  },

  delete: {
    car: async (id: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .delete(`/api/cars/${id}`)
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },
  },

  patch: {
    carImages: async (carId: string, payload: CarImagesPayload): Promise<RootResponse<null>> => {
      const formData = new FormData();

      payload.paperImages.forEach((paper) => {
        formData.append('images', paper);
      });
      payload.carImages.forEach((car) => {
        formData.append('images', car);
      });

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
    },

    carAmenities: async (id: string, payload: CarAmenitiesPayload): Promise<RootResponse<null>> => {
      const response = await axiosInstance
        .patch(`/api/cars/${id}/amenities`, payload)
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error);
        });

      return response;
    },
  },
};
