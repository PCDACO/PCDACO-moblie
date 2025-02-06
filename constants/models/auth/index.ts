export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  roleName: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
