export const QueryKey = {
  AI: {
    LicensePlate: 'LicensePlate',
  },

  Amenity: {
    List: 'AmenityList',
  },

  Auth: {
    Login: 'Login',
    Register: 'Register',
    Validate: 'Validate',
    Refresh: 'Refresh',
    SendOtp: 'SendOtp',
    VerifyOtp: 'VerifyOtp',
    ResetPassword: 'ResetPassword',
    ForgetPassword: 'ForgetPassword',
  },

  Contact: {
    get: {
      approval_preview: 'ContactApprovalPreview',
      preview: 'ContactPreview',
    },
  },

  Transaction: {
    Withdraw: 'Withdraw',
    Transaction: 'Transaction',
    CreateWithdraw: 'CreateWithdraw',
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
    Contact: 'CarContact',
    AssignContract: 'CarAssignContract',
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

  CarReport: {
    List: 'CarReportList',
    Detail: 'CarReportDetail',
    Create: 'CarReportCreate',
    PatchImage: 'CarReportPatchImage',
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
    Detail: 'ModelDetail',
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

  Schedule: {
    List: 'ScheduleList',
    Detail: 'ScheduleDetail',
    Create: 'ScheduleCreate',
    Update: 'ScheduleUpdate',
    Delete: 'ScheduleDelete',
  },

  Feedback: {
    Current: 'FeedbackCurrent',
    ByBooking: 'FeedbackByBooking',
    Create: 'FeedbackCreate',
  },
};
