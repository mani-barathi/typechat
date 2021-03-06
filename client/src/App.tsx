import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Splash from "./components/Splash";

import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import axios from "./axios";
import { LoginResponse } from "./types";
import { setAccessToken } from "./utils/token";

function App() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    axios
      .post<LoginResponse>("/api/auth/refresh")
      .then(({ data: resData }) => {
        if (resData.ok) {
          setAccessToken(resData.data.accessToken);
          setUser(resData.data.user);
        } else {
          const isSignupPage = ["/signup"].includes(window.location.pathname);
          if (!isSignupPage) {
            history.push("/login");
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setUser, history]);

  if (loading) return <Splash spinner={true} />;

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-column justify-center  items-center">
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
