import React from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { user, setUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    history.push("/login");
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
