import { Route, Switch, useHistory } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "./axios";
import { LoginResponse } from "./types";
import { setAccessToken } from "./utils/token";

function App() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    axios.post<LoginResponse>("/api/auth/refresh").then(({ data: resData }) => {
      if (resData.ok) {
        setAccessToken(resData.data.accessToken);
        setUser(resData.data.user);
      } else {
        console.log(resData.error);
        const isSignupPage = ["/signup"].includes(window.location.pathname);
        if (!isSignupPage) {
          history.push("/login");
        }
      }
      setLoading(false);
    });
  }, [setUser, history]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="app">
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
