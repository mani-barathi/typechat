import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import useForm from "../hooks/useForm";
import { SignUpError, SignUpInput, SignUpResponse } from "../types";

interface SignupPageProps {}
const SignUpDefaultValue = {
  username: "",
  email: "",
  password: "",
};

const SignupPage: React.FC<SignupPageProps> = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpError>(SignUpDefaultValue);
  const [formData, handleChange, clearForm, formRef] =
    useForm<SignUpInput>(SignUpDefaultValue);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(SignUpDefaultValue);

    try {
      const { data: resData } = await axios.post<SignUpResponse>(
        "/api/auth/signup",
        formData
      );
      if (!resData.ok) {
        setErrors(resData.errors as any);
      } else {
        clearForm();
      }
    } catch (e) {
      console.log("signup page:", e);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            onChange={handleChange}
            value={formData.username}
            required
            type="text"
            name="username"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <input
            required
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="email"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <input
            required
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="password"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button disabled={loading} type="submit">
          Submit
        </button>

        <div>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
