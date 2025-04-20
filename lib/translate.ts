export const translate = {
  cars: {
    status: {
      pending: 'Chờ duyệt',
      available: 'Có sẵn',
      rented: 'Đã thuê',
      maintain: 'Duy trì',
      inactive: 'Không hoạt động',

      contract: {
        pending: 'Chờ ký',
        owner_signed: 'Chủ xe đã ký',
        technician_signed: 'Kỹ thuật viên đã ký',
        completed: 'Đã ký',
        rejected: 'Đã từ chối',
      },
    },

    toast: {
      create: 'Đăng ký xe thành công!',
      update: 'Cập nhật xe thành công!',
      availability: 'Cập nhật thời gian không cho thuê xe thành công!',
      enable: 'Kích hoạt xe thành công!',
      disable: 'Tắt xe thành công!',
      delete: 'Xóa xe thành công!',

      error_create: 'Đăng ký xe thất bại!',
      error_update: 'Cập nhật xe thất bại!',
      error_upload_image: 'Tải ảnh thất bại!',
      error_upload_paper_image: 'Tải ảnh giấy tờ thất bại!',
      error_availability: 'Cập nhật thời gian không cho thuê xe thất bại!',
      error_enable: 'Kích hoạt xe thất bại!',
      error_disable: 'Tắt xe thất bại!',
      error_delete: 'Xóa xe thất bại!',
    },
  },

  car_report: {
    toast: {
      create: 'Đã gửi báo cáo thành công',
      error_create: 'Gửi báo cáo thất bại',
      image: 'Cập nhật hình ảnh thành công',
      error_image: 'Cập nhật hình ảnh thất bại',
    },

    type: {
      ChangeGPS: 'Thay đổi GPS',
      DeactivateCar: 'Tắt xe',
      Other: 'Khác',
    },

    status: {
      Pending: 'Chờ duyệt',
      UnderReview: 'Đang xử lý',
      Resolved: 'Đã xử lý',
      Rejected: 'Đã từ chối',
    },
  },

  booking: {
    success: {
      title: 'Đặt xe thành công',
    },
    failed: {
      title: 'Đặt xe thất bại',
      message: 'Vui lòng thử lại sau',
    },
    status: {
      Pending: 'Chờ xác nhận',
      Approved: 'Đã xác nhận',
      Rejected: 'Đã từ chối',
      ReadyForPickup: 'Sẵn sàng đón khách',
      Ongoing: 'Đang diễn ra',
      Completed: 'Đã hoàn thành',
      Cancelled: 'Đã hủy',
      Expired: 'Đã hết hạn',
      Done: 'Đã hoàn tất',
    },
    toast: {
      approve: 'Xác nhận đơn đặt xe thành công!',
      reject: 'Từ chối đơn đặt xe thành công!',
      pre_inspection: 'Đặt lịch kiểm tra thành công!',
      post_inspection: 'Đặt lịch kiểm tra sau thành công!',
    },
  },

  bank: {
    toast: {
      create: 'Thêm tài khoản ngân hàng thành công!',
      update: 'Cập nhật tài khoản ngân hàng thành công!',
      delete: 'Xóa tài khoản ngân hàng thành công!',
      error_create: 'Thêm tài khoản ngân hàng thất bại!',
      error_update: 'Cập nhật tài khoản ngân hàng thất bại!',
      error_delete: 'Xóa tài khoản ngân hàng thất bại!',
    },
  },

  report: {
    toast: {
      create: 'Tạo báo cáo thành công!',
      error_create: 'Tạo báo cáo thất bại!',
      approve: 'Phê duyệt báo cáo thành công!',
      error_approve: 'Phê duyệt báo cáo thất bại!',
      compensation: 'Cập nhật bồi thường thành công!',
      error_compensation: 'Cập nhật bồi thường thất bại!',
      compensation_proof: 'Cập nhật bằng chứng thành công!',
      error_compensation_proof: 'Cập nhật bằng chứng thất bại!',
      image: 'Cập nhật hình ảnh thành công!',
      error_image: 'Cập nhật hình ảnh thất bại!',
    },

    type: {
      Conflict: 'Xung đột',
      Accident: 'Tổn thất',
      FineNotice: 'Vi phạm',
      Damage: 'Hư hỏng',
      Maintenance: 'Bảo trì',
      Other: 'Khác',
    },

    status: {
      Pending: 'Chờ xử lý',
      UnderReview: 'Đang xử lý',
      Resolved: 'Đã xử lý',
      Rejected: 'Đã từ chối',
    },
  },

  transaction: {
    toast: {
      withdraw_success: 'Rút tiền thành công!',
      withdraw_error: 'Rút tiền thất bại!',
    },
    type: {
      BookingPayment: 'Thanh toán đơn đặt xe',
      PlatformFee: 'Phí hệ thống',
      OwnerEarning: 'Lợi nhuận chủ xe',
      Withdrawal: 'Rút tiền',
      Refund: 'Hoàn tiền',
      Compensation: 'Bồi thường',
      WithdrawalRequest: 'Yêu cầu rút tiền',
    },
    status: {
      Pending: 'Chờ xử lý',
      Completed: 'Đã hoàn thành',
      Failed: 'Thất bại',
      Cancelled: 'Đã hủy',
    },
  },

  schedule: {
    status: {
      Pending: 'Chờ xác nhận',
      Approved: 'Đã xác nhận',
      Rejected: 'Đã từ chối',
      InProgress: 'Đang diễn ra',
      Expired: 'Đã hết hạn',
      Signed: 'Đã ký',
    },
  },

  user: {
    toast: {
      update_avatar: 'Cập nhật ảnh đại diện thành công!',
    },
  },

  feedback: {
    toast: {
      create: 'Gửi phản hồi thành công!',
      error_create: 'Gửi phản hồi thất bại!',
    },
  },
};
