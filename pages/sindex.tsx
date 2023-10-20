import { useRouter } from "next/navigation";

//Material UI
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { authRoutes } from "../routes";

//Imgs
const LOGONAME = "/assets/imgs/logo_name.svg";

export default function Home() {
  const router = useRouter();

  const redirectToLoginPage = () => router.push(authRoutes.login.path);
  const redirectToRegisterPage = () => router.push(authRoutes.register.path);

  return (
    <div className="flex flex-col w-screen">
      <div className="flex justify-between w-full">
        <IconButton aria-label="menu" className="pl-4 pr-4">
          <MenuIcon color="primary" fontSize="medium" />
        </IconButton>
        <img
          src={LOGONAME}
          style={{
            width: "220px",
            height: "50px",
          }}
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
