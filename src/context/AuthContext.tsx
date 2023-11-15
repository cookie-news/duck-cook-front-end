"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { Cookies } from "@utils/Cookie";
import { COOKIE_AUTH_TOKEN } from "../data/auth.service";

interface AuthContextProps {
  auth: string;
  setAuth: (auth: string) => void;
  isLogged: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<string>(
    typeof window !== "undefined" ? String(Cookies.get(COOKIE_AUTH_TOKEN)) : ""
  );

  useEffect(() => {
    Cookies.set(COOKIE_AUTH_TOKEN, auth);
  }, [auth]);

  const handleIsLogged = () => {
    return Cookies.has(COOKIE_AUTH_TOKEN);
  };

  const value: AuthContextProps = useMemo(
    () => ({ auth, setAuth, isLogged: handleIsLogged() }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
