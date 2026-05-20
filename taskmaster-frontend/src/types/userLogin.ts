// types/user.ts
export interface AccessToken {
  token: string;
  expiration: string;
}

export interface LoginResponse {
  data: AccessToken;
  success: boolean;
  message: string;
}