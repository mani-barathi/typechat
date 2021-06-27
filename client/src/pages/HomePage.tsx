import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  useEffect(() => {
    axios.post("/api/auth/refresh").then((response) => {
      console.log(response.data);
    });
  }, []);

  const handleLogout = async () => {
    const response = await axios.post("/api/auth/logout");
  };

  return (
    <div>
      HomePage
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
