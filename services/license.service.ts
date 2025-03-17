import axiosInstance from '~/configs/axios.config';
import {
  LicenseImagesPayload,
  LicenseImagesPayloadResponse,
  LicensePayload,
  LicensePayloadResponse,
  LicenseResponse,
} from '~/constants/models/license.model';

export const LiccenseService = {
  get: {
    license: async (): Promise<RootResponse<LicenseResponse>> => {
      try {
        const response = await axiosInstance.get('/api/licenses/users/current');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  post: {
    license: async (payload: LicensePayload): Promise<RootResponse<LicensePayloadResponse>> => {
      try {
        const response = await axiosInstance.post('/api/users/license', payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    license: async (payload: LicensePayload): Promise<RootResponse<LicensePayloadResponse>> => {
      try {
        const response = await axiosInstance.put(`/api/users/license`, payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {},
  patch: {
    images: async (
      payload: LicenseImagesPayload
    ): Promise<RootResponse<LicenseImagesPayloadResponse>> => {
      const formData = new FormData();

      formData.append('licenseImageBack', payload.licenseImageBack);
      formData.append('licenseImageFront', payload.licenseImageFront);

      console.log('form data', formData);

      try {
        const response = await axiosInstance.patch(`/api/users/license/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
