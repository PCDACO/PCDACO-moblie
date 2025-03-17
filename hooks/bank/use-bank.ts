import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BankPayload, BankRequest } from '~/constants/models/bank.model';
import { QueryKey } from '~/lib/query-key';
import { BankService } from '~/services/bank.service';

interface BankQueryProps {
  params?: BankRequest;
}

export const useBankQuery = ({ params }: BankQueryProps) => {
  const bankQuery = useQuery({
    queryKey: [QueryKey.Bank.List, params ? params : {}],
    queryFn: () => BankService.get.list(params),
  });

  return {
    bankQuery,
  };
};

export const useBankMutation = () => {
  const queryClient = useQueryClient();
  const bankMutation = useMutation({
    mutationKey: [QueryKey.Bank.Account],
    mutationFn: (payload: BankPayload) => BankService.post.findAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Bank.List] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Bank.List] });
    },
  });

  return { bankMutation };
};
