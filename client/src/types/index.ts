import { User } from "./entities";

export interface ResponseData {
  ok: boolean;
  data?: any;
  error?: string;
  errors?: { [key: string]: string };
}

export interface SignUpResponse extends ResponseData {
  data: User;
}

export interface LoginResponse extends ResponseData {
  data: {
    user: User;
    accessToken: string;
  };
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

export interface SearchUser extends ResponseData {
  data: { name: string; id: number; email?: string } | undefined;
}
