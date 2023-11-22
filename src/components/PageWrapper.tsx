"use client";

import { useContext, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authRoutes, recipeRoutes, rootRoutes } from "@root/routes";

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
          {hasMenu && (
            <>
              <Nav.Root>
                {isLogged && (
                  <Link
                    className="hidden md:flex gap-2 text-white absolute left-6"
                    href={recipeRoutes.create.path}
                  >
                    <Plus /> CRIAR RECEITA
                  </Link>
                )}
                <Nav.MobileMenu>
                  {isLogged && <Nav.User variant="mobile" />}
                  <div className="flex flex-col mt-3">
                    {isLogged && (
                      <Link
                        className="flex gap-2 text-white p-2 ml-[-8px] mr-[-8px] bg-green-900"
                        href={recipeRoutes.create.path}
                      >
                        <Plus /> CRIAR RECEITA
                      </Link>
                    )}
                  </div>
                  {!isLogged && <Nav.Actions variant="mobile" />}
                  <Nav.Logout variant="mobile" />
                </Nav.MobileMenu>
                <Link href={rootRoutes.home.path}>
                  <Image
                    src="/assets/imgs/logo_name.svg"
                    width={250}
                    height={50}
                    className="bg-white rounded-lg"
                    alt="Duck Cook logo"
                  />
                </Link>
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
        </>
      )}
      <div className="w-full lg:w-[60%] mx-auto">{children}</div>
      {isLoading && <Loading />}
    </>
  );
}
