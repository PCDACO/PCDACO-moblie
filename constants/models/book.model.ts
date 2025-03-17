export interface BookParams extends Partial<LastIdRootResquest> {
  search: string;
  status: string;
  isPaid: boolean;
}

export interface BookPayload {
  carId: string;
  startTime: Date;
  endTime: Date;
}

export interface BookFeedbackPayload {
  rating: number;
  comment: string;
}

export interface BookResponseList {}
export interface BookResponseDetail {}

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

export interface Webhook {
  code: string;
  desc: string;
  success: boolean;
  data: Data;
  signature: string;
}

export interface Data {
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
