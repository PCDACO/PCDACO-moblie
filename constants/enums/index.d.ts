export {};

declare global {
  type Role = 'Driver' | 'Owner';
  type StatusBook = 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled' | 'Ongoing  ';
  type FinancialReportStatus = 'Pending' | 'Completed' | 'Rejected';
}
