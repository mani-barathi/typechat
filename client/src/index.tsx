import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import SocketProvider from "./contexts/SocketContext";
import store from "./store";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <App />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
