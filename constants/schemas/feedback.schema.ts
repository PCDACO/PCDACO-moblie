import { z } from 'zod';

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
