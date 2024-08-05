import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const isLoggedIn = auth && auth.accessToken;
  if (auth === undefined || setAuth === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return { auth, setAuth, isLoggedIn};
};
