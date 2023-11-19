"use client";

import { createContext, useEffect, useMemo, useState } from "react";

import { Cookies } from "@utils/Cookie";

import { User } from "../data/user.service";

export const COOKIE_AUTH_TOKEN = "COOKIE_AUTH_TOKEN";
export const LOCALSTORAGE_USER_DATA = "@duck-cook/USER_DATA";

interface AuthContextProps {
  token: string;
  userData: User;
  isLogged: boolean;
  setAuthData: (token: string, userData: User) => void;
  logout: () => void;
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
    if (token && token !== "") Cookies.set(COOKIE_AUTH_TOKEN, token);
  }, [token]);

  useEffect(() => {
    if (token !== "" || token) {
      localStorage.setItem(LOCALSTORAGE_USER_DATA, JSON.stringify(userData));
    }
  }, [token, userData]);

  const isLogged = useMemo(() => {
    return token !== "";
  }, [token]);

  const handleLogout = () => {
    Cookies.remove(COOKIE_AUTH_TOKEN);
    localStorage.clear();
    setToken("");
    setUserData({} as User);
  };

  const handleSetAuthData = (token: string, userData: User) => {
    setToken(token);
    setUserData(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        userData,
        setAuthData: handleSetAuthData,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
