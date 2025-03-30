// auth.ts

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
    role_id: number;
    first_name: string;
    last_name: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
    role_id: number;
    first_name: string;
    last_name: string;
  };
}