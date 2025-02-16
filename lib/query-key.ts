export const QueryKey = {
  // Auth
  REGISTER: 'register',
  LOGIN: 'login',
  REFRESH_TOKEN: 'refresh_token',

  GETROLE: 'role',

  // Bank
  // get
  BANK_LIST: 'bank_list',
  // post
  BANK_ACCOUNT_NAME: 'bank_account_name',

  // Book
  // get
  BOOK_LIST: 'book_list',
  BOOK_DETAIL: 'book_detail',
  // put
  BOOK_APPROVE: 'book_approve',
  BOOK_CANCEL: 'book_cancel',
  BOOK_COMPLETE: 'book_complete',
  BOOK_RETURN: 'book_return',
  BOOK_START_TRIP: 'book_start_trip',
  // post
  BOOK_CREATE: 'book_create',
  BOOK_TRACK: 'book_track',
  BOOK_TRACK_BATCH: 'book_track_batch',
  BOOK_FEEDBACK: 'book_feedback',
  BOOK_WEBHOOK: 'book_webhook',

  // Car
  // get
  CAR_LIST: 'car_list',
  CAR_DETAIL: 'car_detail',
  // post
  CAR_CREATE: 'car_create',
  // put
  CAR_UPDATE: 'car_update',
  // delete
  CAR_DELETE: 'car_delete',
  // patch
  CAR_PATCH_IMAGE: 'car_patch_image',
  CAR_PATCH_AMENITIES: 'car_patch_amenities',

  // Fuel
  // get
  FUEL_LIST: 'fuel_list',

  // Amenities
  // get
  AMENITIES_LIST: 'amenities_list',

  // Manufacturer
  // get
  MANUFACTURER_LIST: 'manufacturer_list',

  // Model
  // get
  MODEL_LIST: 'model_list',
};
