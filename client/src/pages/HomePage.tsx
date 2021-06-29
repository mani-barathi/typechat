import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { user, setUser } = useAuth();
  const [number, setNumber] = useState();
  const history = useHistory();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    history.push("/login");
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api/auth/random");
    setNumber(data);
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={fetchData}>fetchData</button>
      {number && <p>{number}</p>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
