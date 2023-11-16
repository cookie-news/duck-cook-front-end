"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { Cookies } from "@utils/Cookie";
import { User } from "../data/user.service";

export const COOKIE_AUTH_TOKEN = "@duck-cook/COOKIE_AUTH_TOKEN";
export const LOCALSTORAGE_USER_DATA = "@duck-cook/USER_DATA";

interface AuthContextProps {
  token: string;
  userData: User;
  setUserData: (userData: User) => void;
  setToken: (token: string) => void;
  isLogged: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>(
    String(Cookies.get(COOKIE_AUTH_TOKEN) ?? "")
  );

  const [userData, setUserData] = useState<User>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA) ?? "{}")
      : ""
  );

  useEffect(() => {
    if (token) Cookies.set(COOKIE_AUTH_TOKEN, token);
  }, [token]);

  useEffect(() => {
    if (token !== "" || token) {
      localStorage.setItem(LOCALSTORAGE_USER_DATA, JSON.stringify(userData));
    }
  }, [userData]);

  const handleIsLogged = () => {
    return Cookies.has(COOKIE_AUTH_TOKEN);
  };

  const value: AuthContextProps = useMemo(
    () => ({
      token,
      setToken,
      isLogged: handleIsLogged(),
      userData,
      setUserData
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
