"use client";

import { useContext } from "react";

import { AuthContext } from "@context/AuthContext";

import { LogOut } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

interface NavLogoutProps extends NavLogoutVariants { }

type NavLogoutVariants = VariantProps<typeof navLogoutVariants>;

const navLogoutVariants = tv({
    slots: {
        base: "flex",
        logoutElement: ""
    },
    variants: {
        variant: {
        base: "",
            primary: {
                base: "hidden md:flex justify-center border-green-950 border-[2px] border-r-0 border-t-0 border-b-0 pl-2 h-10",
                logoutElement: "hidden md:block"
            },
            mobile: {
                base: "absolute bottom-6 left-0 p-2 border-green-950 border-[2px] border-r-0 border-l-0 border-b-0 w-full",
                logoutElement: "flex gap-3"
            }
        }
    }
});

const NavLogout: React.FC<NavLogoutProps> = ({ variant = 'primary' }) => {
    const { logout } = useContext(AuthContext);

    const {
        base,
        logoutElement
    } = navLogoutVariants({ variant });

    return (
        <div className={base()}>
            <button onClick={logout} className={logoutElement()}>
                <LogOut size={24} className="text-white" />
                <span className="md:hidden text-white">Sair</span>
            </button>
        </div>
    );
};

export default NavLogout;
