"use client";

import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { userRoutes } from "@root/routes";

import { AuthContext } from "@context/AuthContext";

import { tv, VariantProps } from "tailwind-variants";

interface NavUserProps extends NavUserVariants {
  children?: React.ReactNode;
}

type NavUserVariants = VariantProps<typeof navUserVariants>;

const navUserVariants = tv({
  slots: {
    base: "flex gap-3 cursor-pointer",
    description: ""
  },
  variants: {
    variant: {
      primary: {
        base: "absolute items-center right-6",
        description: "hidden md:flex md:flex-col"
      },
      mobile: {
        base: "w-full flex-col",
        description: "flex flex-col"
      }
    }
  }
});

const NavUser: React.FC<NavUserProps> = ({ variant = 'primary', children }) => {
  const { userData } = useContext(AuthContext);

  const {
    base,
    description
  } = navUserVariants({ variant });

  return (
    <div className={base()}>
      <Link className="flex gap-3 items-center" href={userRoutes.view.path}>
        <div className="relative w-10 h-10">
          <Image
            src={userData.image === "" ? "/assets/imgs/logo.png" : userData.image}
            fill
            className="border border-white rounded-full"
            objectFit="cover"
            alt="user profile image"
          />
        </div>
        <div className={description()}>
          <p className="font-bold leading-4 m-0 p-0 text-white">Bem vindo,</p>
          <p className="text-sm leading-4 text-white">{userData.name}</p>
        </div>
      </Link>

      {children}
    </div>
  );
};

export default NavUser;
