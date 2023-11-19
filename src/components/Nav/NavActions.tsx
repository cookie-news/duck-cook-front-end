import Link from "next/link";

import { authRoutes } from "@root/routes";

const NavActions: React.FC<any> = () => {
  return (
    <div className="flex absolute right-6 items-center gap-3">
      <Link href={authRoutes.login.path} className="text-white">
        Entrar
      </Link>
      <hr className="border-none w-[1px] h-10 bg-green-950" />
      <Link href={authRoutes.register.path} className="text-white">
        Registrar-se
      </Link>
    </div>
  );
};

export default NavActions;
