import { SignUpError } from "../types";

const USERNAME_REGEX = /^[a-z0-9_]{3,16}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

export const validateSignUp = (
  username: string,
  email: string,
  password: string
): SignUpError => {
  const errors: SignUpError = {};
  if (!username.toLowerCase().match(USERNAME_REGEX)) {
    errors.username =
      "username can only contain alphabets, numbers, underscores and must be between 3 and 16 characters";
  }

  if (!email.match(EMAIL_REGEX)) {
    errors.email = "provide a valid email";
  }

  if (password.length < 6 || password.length > 32) {
    errors.password = "password must be between 6 and 32 characters";
  }

  return errors;
};
