import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import {
  BookFeedbackPayload,
  BookParams,
  BookPayload,
  BookTrackBatchPayload,
  BookTrackPayload,
  BookWebhook,
} from '~/constants/models/book';
import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book';

interface BookProps {
  params?: BookParams;
  id?: string;
}

export const useBook = ({ params, id }: BookProps) => {
  const queryClient = new QueryClient();

  const listQuery = useQuery({
    queryKey: [QueryKey.BOOK_LIST, params ? params : {}],
    queryFn: () => BookService.get.List(params),
  });

  const detailQuery = useQuery({
    queryKey: [QueryKey.BOOK_DETAIL, id],
    queryFn: () => BookService.get.Detail(id),
  });

  const approveMutation = useMutation({
    mutationKey: [QueryKey.BOOK_APPROVE],
    mutationFn: ({ id, isApproved }: { id: string; isApproved: boolean }) =>
      BookService.put.Approve(id, isApproved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_APPROVE });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const cancelMutation = useMutation({
    mutationKey: [QueryKey.BOOK_CANCEL],
    mutationFn: (id: string) => BookService.put.Cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_CANCEL });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const completeMutation = useMutation({
    mutationKey: [QueryKey.BOOK_COMPLETE],
    mutationFn: (id: string) => BookService.put.Complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_COMPLETE });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const returnMutation = useMutation({
    mutationKey: [QueryKey.BOOK_RETURN],
    mutationFn: (id: string) => BookService.put.Return(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_RETURN });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const startTripMutation = useMutation({
    mutationKey: [QueryKey.BOOK_START_TRIP],
    mutationFn: (id: string) => BookService.put.StartTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_START_TRIP });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createMuntation = useMutation({
    mutationKey: [QueryKey.BOOK_CREATE],
    mutationFn: (payload: BookPayload) => BookService.post.Book(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_CREATE });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const bookTrackBatch = useMutation({
    mutationKey: [QueryKey.BOOK_TRACK_BATCH],
    mutationFn: (data: BookTrackBatchPayload) => BookService.post.BookTrackBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_TRACK_BATCH });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const bookTrack = useMutation({
    mutationKey: [QueryKey.BOOK_TRACK],
    mutationFn: (data: BookTrackPayload) => BookService.post.BookTrack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_TRACK });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const bookFeedback = useMutation({
    mutationKey: [QueryKey.BOOK_FEEDBACK],
    mutationFn: ({ id, data }: { id: string; data: BookFeedbackPayload }) =>
      BookService.post.BookFeedback(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_FEEDBACK });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const bookWebhook = useMutation({
    mutationKey: [QueryKey.BOOK_WEBHOOK],
    mutationFn: (data: BookWebhook) => BookService.post.Webhook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.BOOK_WEBHOOK });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    listQuery,
    detailQuery,
    approveMutation,
    cancelMutation,
    completeMutation,
    returnMutation,
    startTripMutation,
    createMuntation,
    bookTrackBatch,
    bookTrack,
    bookFeedback,
    bookWebhook,
  };
};
