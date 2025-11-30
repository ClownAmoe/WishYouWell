"use client";

import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (t: string) => {
    setTokenState(t);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
