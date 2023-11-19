"use client";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { authRoutes } from "@root/routes";

import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import { Shell } from "lucide-react";

import { Nav } from "./Nav";

interface PageWrapperProps {
  isProtected?: boolean;
  hasMenu?: boolean;
  children: React.ReactNode;
}

export default function PageWrapper({
  isProtected = true,
  hasMenu = false,
  children,
}: PageWrapperProps) {
  const { token, isLogged } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const route = useRouter();

  useEffect(() => {
    if (isProtected) {
      const authToken = token ?? "";
      if (authToken == "" || !authToken) {
        route.push(authRoutes.login.path);
      }
    }
  }, [isProtected, route, token]);

  return (
    <>
      {hasMenu && (
        <Nav.Root>{isLogged ? <Nav.User /> : <Nav.Actions />}</Nav.Root>
      )}
      <div className="w-[50%] mx-auto">{children}</div>
      {isLoading && (
        <div className="flex flex-col gap-3 absolute top-0 left-0 justify-center items-center h-screen w-full z-10 bg-black/70">
          <Shell size={34} className="animate-spin text-white" />
          <p className="text-white">Aguarde...</p>
        </div>
      )}
    </>
  );
}
