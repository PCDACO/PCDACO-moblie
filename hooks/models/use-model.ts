import { useSuspenseQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { ModelsService } from '~/services/models';

interface IUseModelQuery {
  params: RootRequest;
}

export const useModelQuery = ({ params }: IUseModelQuery) => {
  const modelListQuery = useSuspenseQuery({
    queryKey: [QueryKey.MODEL_LIST, params],
    queryFn: () => ModelsService.get.list(params),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  return { modelListQuery };
};
