export const QueryKey = {
  Amenity: {
    List: 'AmenityList',
  },

  Auth: {
    Login: 'Login',
    Register: 'Register',
    Validate: 'Validate',
    Refresh: 'Refresh',
  },

  License: {
    List: 'LicenseList',
    Detail: 'LicenseDetail',
    Create: 'LicenseCreate',
    Update: 'LicenseUpdate',
    Delete: 'LicenseDelete',
    PatchImage: 'LicensePatchImage',
  },

  Car: {
    List: 'CarList',
    Detail: 'CarDetail',
    Unavailable: 'CarUnavailable',
    Create: 'CarCreate',
    PostAvailability: 'CarPostAvailability',
    PostDisable: 'CarPostDisable',
    PostEnable: 'CarPostEnable',
    Update: 'CarUpdate',
    Delete: 'CarDelete',
    PatchImage: 'CarPatchImage',
    PatchPaperImage: 'CarPatchPaperImage',
    PatchAmenities: 'CarPatchAmenities',
  },

  Booking: {
    get: {
      List: 'BookingList',
      Detail: 'BookingDetail',
      Contract: 'BookingContract',
      Payment: 'BookingPayment',
    },
    post: {
      Create: 'BookingCreate',
      Track: 'BookingTrack',
      PostInspection: 'BookingPostInspection',
      Webhook: 'BookingWebhook',
      Inspection: 'BookingInspection',
      Payment: 'PaymentBooking',
    },
    put: {
      Complete: 'BookingComplete',
      Approve: 'BookingApprove',
      Cancel: 'BookingCancel',
      Confirm: 'BookingConfirm',
      Return: 'BookingReturn',
      StartTrip: 'BookingStartTrip',
    },
  },

  Bank: {
    List: 'BankList',
    Account: {
      List: 'BankAccountList',
      Detail: 'BankAccountDetail',
      Create: 'BankAccountCreate',
      Update: 'BankAccountUpdate',
      Delete: 'BankAccountDelete',
    },
  },

  User: {
    Current: 'CurrentUser',
    Detail: 'UserDetail',
    Update: 'UserUpdate',
    Avatar: 'UserAvatar',
    Password: 'UserPassword',
  },

  Fuel: {
    List: 'FuelList',
  },

  Transmission: {
    List: 'TransmissionList',
  },

  Model: {
    List: 'ModelList',
  },

  Report: {
    List: 'ReportList',
    Detail: 'ReportDetail',
    Create: 'ReportCreate',
    Approve: 'ReportApprove',
    Compensation: 'ReportCompensation',
    CompensationProof: 'ReportCompensationProof',
    Image: 'ReportImage',
  },
};
