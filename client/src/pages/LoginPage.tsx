import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import useForm from "../hooks/useForm";
import { LoginInput, LoginResponse } from "../types";
import { setAccessToken } from "../utils/token";

interface LoginPageProps {}

const loginInputDefaultValue = {
  email: "",
  password: "",
};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, handleChange, clearForm, formRef] = useForm<LoginInput>(
    loginInputDefaultValue
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        clearForm();
      }
    } catch (e) {
      console.log("signup page:", e);
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            required
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
          />
        </div>
        <div>
          <input
            required
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
          />
        </div>
        {error && <p>{error}</p>}
        <button disabled={loading} type="submit">
          Submit
        </button>

        <div>
          <Link to="/Signup">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
