import React, { useState } from "react";
import { Link } from "react-router-dom";
import Splash from "../components/Splash";

import axios from "../axios";
import useCheckUserAvailable from "../hooks/useCheckUserAvailable";
import useForm from "../hooks/useForm";
import { SignUpError, SignUpInput, SignUpResponse } from "../types";

interface SignupPageProps {}
const SignUpDefaultValue = {
  username: "",
  email: "",
  password: "",
};

const SignupPage: React.FC<SignupPageProps> = () => {
  const loading = useCheckUserAvailable();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<SignUpError>(SignUpDefaultValue);
  const [formData, handleChange, clearForm, formRef] =
    useForm<SignUpInput>(SignUpDefaultValue);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
    setSubmitting(false);
  };

  if (loading) return <Splash />;

  return (
    <div
      className="m-2 p-2 py-4 rounded shadow-lg transform -translate-y-5 bg-white w-full"
      style={{ maxWidth: "500px" }}
    >
      <h1 className="text-4xl text-center text-green-500">TypeChat</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="mt-2 p-2 w-full"
      >
        <div className="mb-2">
          <input
            onChange={handleChange}
            value={formData.username}
            required
            type="text"
            name="username"
            placeholder="Username"
            className="form-input"
          />
          {errors.username && (
            <p className="text-red-500 font-semibold mb-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            required
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="email"
            className="form-input"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold mb-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            required
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="password"
            className="form-input"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold mb-1">{errors.password}</p>
          )}
        </div>
        <button className="form-btn" disabled={submitting} type="submit">
          Sign Up
        </button>

        <div>
          <span className="mr-2">Already have an account</span>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
