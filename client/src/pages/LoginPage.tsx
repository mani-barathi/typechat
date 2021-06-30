import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { LoginIcon } from "@heroicons/react/outline";
import Splash from "../components/Splash";

import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import useCheckUserAvailable from "../hooks/useCheckUserAvailable";
import useForm from "../hooks/useForm";
import { LoginInput, LoginResponse } from "../types";
import { setAccessToken } from "../utils/token";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const history = useHistory();
  const { next } = useParams<{ next: string }>();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, handleChange, , formRef] = useForm<LoginInput>({
    email: "",
    password: "",
  });
  const loading = useCheckUserAvailable();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const { data: resData } = await axios.post<LoginResponse>(
        "/api/auth/login",
        formData
      );
      if (!resData.ok) {
        setError(resData.error!);
      } else {
        setAccessToken(resData.data.accessToken);
        setUser(resData.data.user);
        const path = next || "/";
        return history.push(path);
      }
    } catch (e) {
      console.log("signup page:", e);
      setError(e.message);
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
        className="mt-2 p-2 w-full"
        autoComplete="off"
      >
        <div className="mb-2">
          <input
            required
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            className="form-input"
          />
        </div>
        <div className="mb-2">
          <input
            required
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            className="form-input"
          />
        </div>
        {error && (
          <div className="bg-red-200 text-red-800 py-2 px-4 mt-1 mb-1 rounded">
            {error}
          </div>
        )}

        <button disabled={submitting} type="submit" className="form-btn">
          <LoginIcon className="h-5 w-5 mr-2" />
          Login
        </button>

        <div>
          <span className="mr-2">New Create an Account here</span>
          <Link to="/signup" className="link">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
