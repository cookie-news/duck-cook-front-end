"use client";

import { useContext, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Drawer } from "@mui/material";

import { authRoutes, recipeRoutes } from "@root/routes";

import { AuthContext } from "@context/AuthContext";
import { LoadingContext } from "@context/LoadingContext";

import { Plus, Shell } from "lucide-react";

import { Loading } from "./Loading";
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
        <>
          <Nav.Root>
            {isLogged && (
              <Link
                className="hidden md:flex gap-2 text-white absolute left-6"
                href={recipeRoutes.edit.path}
              >
                <Plus /> CRIAR RECEITA
              </Link>
            )}
            <Nav.MobileMenu>
              {isLogged ? (
                <p>Nav User Mobile</p>
              ) : (
                <Nav.Actions variant="mobile" />
              )}
              <Nav.Logout variant="mobile" />
            </Nav.MobileMenu>
            <Image
              src="/assets/imgs/logo_name.svg"
              width={250}
              height={50}
              className="bg-white rounded-lg"
              alt="Duck Cook logo"
            />
            {isLogged ? (
              <Nav.User>
                <Nav.Logout />
              </Nav.User>
            ) : (
              <Nav.Actions />
            )}
          </Nav.Root>
        </>
      )}
      <div className="w-full lg:w-[60%] mx-auto">{children}</div>
      {isLoading && <Loading />}
    </>
  );
}
