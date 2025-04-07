import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { ModelsService } from '~/services/model.service';

interface IUseModelQuery {
  params?: Partial<RootRequest>;
}

export const useModelQuery = ({ params }: IUseModelQuery) => {
  const modelListQuery = useQuery({
    queryKey: [QueryKey.Model.List, params],
    queryFn: () => ModelsService.get.list(params),
    enabled: true,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  return modelListQuery;
};

interface IUseModelDetailQuery {
  id: string;
}

export const useModelDetailQuery = ({ id }: IUseModelDetailQuery) => {
  const modelDetailQuery = useQuery({
    queryKey: [QueryKey.Model.Detail, id],
    queryFn: () => ModelsService.get.detail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });

  return modelDetailQuery;
};
