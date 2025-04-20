import { create } from 'zustand';

import { BookParams } from '~/constants/models/book.model';
import { CarReportParams } from '~/constants/models/car-report.model';
import { CarParams } from '~/constants/models/car.model';
import { ReportParams } from '~/constants/models/report.model';

type ParamsStore<T> = {
  params: T;
  setParams: (params: T) => void;
  resetParams: () => void;
};

export function createParamsStore<T>(initialParams: T) {
  return create<ParamsStore<T>>((set) => ({
    params: initialParams,
    setParams: (params) => set({ params }),
    resetParams: () => set({ params: initialParams }),
  }));
}

export const useBookingParamsStore = createParamsStore<Partial<BookParams>>({});
export const useCarParamsStore = createParamsStore<Partial<CarParams>>({});
export const useReportParamsStore = createParamsStore<Partial<ReportParams>>({});
export const useCarReportParamsStore = createParamsStore<Partial<CarReportParams>>({});
