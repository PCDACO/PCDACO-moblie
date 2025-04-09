import axiosInstance from '~/configs/axios.config';
import {
  TransactionResponse,
  TransactionParams,
  WithdrawParams,
  WithdrawResponse,
  WithdrawPayload,
  WithdrawPayloadResponse,
} from '~/constants/models/transaction.model';

export const TransactionService = {
  get: {
    withdraw: async (
      params: Partial<WithdrawParams>
    ): Promise<RootResponse<Pagination<WithdrawResponse>>> => {
      const response = await axiosInstance.get('/api/withdrawals', { params });
      return response.data;
    },

    transaction: async (
      params: Partial<TransactionParams>
    ): Promise<RootResponse<Pagination<TransactionResponse>>> => {
      const response = await axiosInstance.get('/api/transactions', { params });
      return response.data;
    },

    check: async (orderCode: string): Promise<RootResponse<null>> => {
      const response = await axiosInstance.get(`/api/transactions/${orderCode}/check`);
      return response.data;
    },
  },

  post: {
    withdraw: async (payload: WithdrawPayload): Promise<WithdrawPayloadResponse> => {
      const response = await axiosInstance.post('/api/withdrawals', payload);
      return response.data;
    },
  },
};
