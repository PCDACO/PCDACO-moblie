import axiosInstance from '~/configs/axios.config';
import {
  BankAccountPayload,
  BankAccountResponseDetail,
  BankAccountResponseList,
  BankResponseList,
} from '~/constants/models/bank.model';

export const BankService = {
  get: {
    list: async (search?: string): Promise<RootResponse<BankResponseList[]>> => {
      try {
        const response = await axiosInstance.get('/api/bank-info', { params: { search } });
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    accounts: async (
      params?: Partial<RootRequest>
    ): Promise<RootResponse<Pagination<BankAccountResponseList>>> => {
      try {
        const response = await axiosInstance.get('/api/bank-accounts', { params });
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },

    detail_account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.get(`/api/bank-accounts/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  post: {
    account: async (
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.post('/api/bank-accounts', payload);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  put: {
    account: async (
      id: string,
      payload: BankAccountPayload
    ): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.put(`/api/bank-accounts/${id}`, payload);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  delete: {
    account: async (id: string): Promise<RootResponse<BankAccountResponseDetail>> => {
      try {
        const response = await axiosInstance.delete(`/api/bank-accounts/${id}`);
        return response.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
