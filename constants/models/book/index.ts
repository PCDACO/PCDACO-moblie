export interface BookPayload {
  carId: string;
  startTime: Date;
  endTime: Date;
}

export interface BookFeedbackPayload {
  rating: number;
  comment: string;
}

export interface BookWebhook {
  code: string;
  desc: string;
  success: boolean;
  data: Data;
  signature: string;
}

interface Data {
  orderCode: number;
  amount: number;
  description: string;
  accountNumber: string;
  reference: string;
  transactionDateTime: string;
  currency: string;
  paymentLinkId: string;
  code: string;
  desc: string;
  counterAccountBankId: string;
  counterAccountBankName: string;
  counterAccountName: string;
  counterAccountNumber: string;
  virtualAccountName: string;
  virtualAccountNumber: string;
}

export interface BookResponse {}

export interface BookDetailResponse {}

export interface BookParams extends ListPagination {
  search: string;
  status: string;
  isPaid: boolean;
}

export interface BookTrackBatchPayload {
  locationPoints: LocationPoint[];
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface BookTrackPayload {
  latitude: number;
  longitude: number;
}
