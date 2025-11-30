"use client";

import { useContext } from "react";
import Dashboard from "./dashboard/page";
import { AuthContext } from "./context/AuthContext";
import Login from "./auth/login/page";

export default function HomePage() {
  const { token } = useContext(AuthContext);

  return token ? <Dashboard /> : <Login />;
}
