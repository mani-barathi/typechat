import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
        <button disabled={submitting} type="submit">
          Submit
        </button>

        <div>
          <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
