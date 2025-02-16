import axios from 'axios';

import axiosInstance from '~/configs/axios';
import {
  BankAccountResponse,
  BankPayload,
  BankRequest,
  BankResponse,
} from '~/constants/models/bank';
import { storage } from '~/lib/storage';

const urlBank = process.env.EXPO_PUBLIC_BANK_API_URL;

export const BankService = {
  get: {
    list: async (params: BankRequest): Promise<RootResponse<Pagination<BankResponse>>> => {
      const response = await axiosInstance
        .get('/api/banks', { params })
        .then((res) => res.data)
        .catch((err) => err);
      return response;
    },
  },
  post: {
    findAccount: async (payload: BankPayload): Promise<RootBankResponse<BankAccountResponse>> => {
      const accessToken = await storage.getItem('accessToken');
      const response = await axios
        .post(`${urlBank}/id-lookup-prod`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.EXPO_PUBLIC_BANK_API_KEY,
            'x-api-secret': process.env.EXPO_PUBLIC_BANK_API_SECRET,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => err);
      return response;
    },
  },
};
