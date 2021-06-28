import React, { createContext, useContext, useState } from "react";
import { User } from "../types/entities";

interface AuthContexProps {}

type AuthContextState = User | null;

type AuthContextType = {
  user: AuthContextState;
  setUser: React.Dispatch<React.SetStateAction<AuthContextState>>;
};

const AuthContextDefaultValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext(AuthContextDefaultValue);

const AuthProvider: React.FC<AuthContexProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextState>(
    AuthContextDefaultValue.user
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
