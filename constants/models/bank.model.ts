export interface BankResponseList {
  id: string;
  name: string;
  code: string;
  bin: number;
  short_name: string;
  logo_url: string;
  icon_url: string;
  swift_code: string;
  lookup_supported: number;
}

export interface BankAccountResponseList {}

export interface BankAccountResponseDetail {}

export interface BankRequest extends RootRequest {}

export interface BankAccountPayload {
  bankInfoId: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}
