export interface BankResponseList {
  id: string;
  bankLookUpId: string;
  name: string;
  code: string;
  bin: number;
  shortName: string;
  logoUrl: string;
  iconUrl: string;
  swiftCode: string;
  lookupSupported: number;
}

export interface BankAccountResponseList {}

export interface BankAccountResponseDetail {}

export interface BankRequest {
  search: string;
}

export interface BankAccountPayload {
  bankInfoId: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}
