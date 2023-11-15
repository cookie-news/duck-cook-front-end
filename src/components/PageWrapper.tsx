"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Cookies } from "@utils/Cookie";

import { authRoutes } from "@root/routes";
import { COOKIE_AUTH_TOKEN } from "@context/AuthContext";

interface PageWrapperProps {
  isProtected?: boolean;
  children: React.ReactNode;
}

export default function PageWrapper({
  isProtected = true,
  children,
}: PageWrapperProps) {
  const route = useRouter();

  useEffect(() => {
    if (isProtected) {
      const authToken = Cookies.get(COOKIE_AUTH_TOKEN) ?? "";
      if (authToken == "" || !authToken) {
        route.push(authRoutes.login.path);
      }
    }
  }, []);

  return children;
}
