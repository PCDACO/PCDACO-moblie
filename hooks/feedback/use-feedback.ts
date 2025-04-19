import { useMutation, useQuery } from '@tanstack/react-query';

import { FeedbackPayload } from '~/constants/models/feedback.model';
import { QueryKey } from '~/lib/query-key';
import { FeebackService } from '~/services/feedback.service';

export const UseFeedbackCurrentQuery = (params?: Partial<RootRequest>) => {
  const getCurrentFeedbackQuery = useQuery({
    queryKey: [QueryKey.Feedback.Current],
    queryFn: () => FeebackService.get.current(params),
  });

  return getCurrentFeedbackQuery;
};

// export const UseFeedbackByBookingQuery = (params?: Partial<FeedbackParams>) => {
//   const getByBookingFeedbackQuery = useQuery({
//     queryKey: [QueryKey.Feedback.ByBooking],
//     queryFn: () => FeebackService.get.byBooking(params),
//   });

//   return getByBookingFeedbackQuery;
// };

export const UseFeedbackCreate = () => {
  const createFeedbackMutation = useMutation({
    mutationKey: [QueryKey.Feedback.Create],
    mutationFn: ({ id, data }: { id: string; data: FeedbackPayload }) =>
      FeebackService.post.create(id, data),
  });

  return { createFeedbackMutation };
};
