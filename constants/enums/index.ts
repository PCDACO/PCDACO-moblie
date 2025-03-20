export enum Role {
  Driver = 'Driver',
  Owner = 'Owner',
}

export enum FinancialReportStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export enum CarStatus {
  Available = 'Available',
  Rented = 'Rented',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Maintain = 'Maintain',
}

export enum CarStatusNumber {
  Available = 0,
  Pending = 1,
  Rented = 2,
  Inactive = 3,
  Maintain = 4,
}
