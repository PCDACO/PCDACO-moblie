import { useMutation, useQuery } from '@tanstack/react-query';

import { BankPayload, BankRequest } from '~/constants/models/bank';
import { QueryKey } from '~/lib/query-key';
import { BankService } from '~/services/bank';

interface BankQueryProps {
  params?: BankRequest;
  payload?: BankPayload;
}

export const useBankQuery = ({ params, payload }: BankQueryProps) => {
  if (!params) {
    throw new Error('Missing required `params` in useBankQuery');
  }
  if (!payload) {
    throw new Error('Missing required `payload` in useBankQuery');
  }

  const bankQuery = useQuery({
    queryKey: [QueryKey.BANK_LIST, params ? params : {}],
    queryFn: () => BankService.get.list(params),
  });

  const bankNameMutation = useMutation({
    mutationKey: [QueryKey.BANK_ACCOUNT_NAME],
    mutationFn: (payload: BankPayload) => BankService.post.findAccount(payload),
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    bankQuery,
    bankNameMutation,
  };
};
