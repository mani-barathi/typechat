export interface ResponseData {
  ok: boolean;
  data?: any;
  error?: string;
  errors?: { [key: string]: string };
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
}

export interface SignUpError {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
