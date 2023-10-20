"use client";

// Next imports
import Image from "next/image";
import { useRouter } from "next/router";

// Material Icons Imports
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

// Material Components Import
import { IconButton } from "@mui/material";

// routes
import { authRoutes } from "@root/routes";

export default function PageRoot() {
  // const router = useRouter();

  const redirectToLoginPage = () => {};

  return (
    <div className="flex flex-col w-screen">
      <div className="flex justify-between w-full">
        <IconButton aria-label="menu" className="pl-4 pr-4">
          <MenuIcon color="primary" fontSize="medium" />
        </IconButton>
        <Image
          src="/assets/imgs/logo_name.svg"
          width={250}
          height={50}
          alt="Duck Cook image logo"
        />
        <IconButton
          aria-label="user"
          onClick={redirectToLoginPage}
          className="pr-4 pl-4"
        >
          <PersonIcon color="primary" fontSize="medium" />
        </IconButton>
      </div>
      <div className="mt-1 w-full bg-green-800 h-48"></div>
    </div>
  );
}
