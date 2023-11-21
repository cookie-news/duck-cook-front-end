"use client";

import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { userRoutes } from "@root/routes";

import { AuthContext } from "@context/AuthContext";

import { LogOut } from "lucide-react";

const NavUser: React.FC<any> = () => {
  const { userData, logout } = useContext(AuthContext);

  return (
    <div className="flex absolute right-6 items-center gap-3 cursor-pointer">
      <Link className="flex gap-3 items-center" href={userRoutes.view.path}>
        <div className="relative w-10 h-10">
          <Image
            src={userData.image}
            fill
            className="border border-white rounded-full"
            objectFit="cover"
            alt="user profile image"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold leading-4 m-0 p-0 text-white">Bem vindo,</p>
          <p className="text-sm leading-4 text-white">{userData.name}</p>
        </div>
      </Link>

      <hr className="bg-green-950 w-[2px] border-none h-10" />

      <button onClick={logout}>
        <LogOut size={24} className="text-white" />
      </button>
    </div>
  );
};

export default NavUser;
