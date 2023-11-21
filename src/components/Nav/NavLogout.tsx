"use client";

import { useContext } from "react";

import { AuthContext } from "@context/AuthContext";

import { LogOut } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

interface NavLogoutProps extends NavLogoutVariants { }

type NavLogoutVariants = VariantProps<typeof navLogoutVariants>;

const navLogoutVariants = tv({
    slots: {
        divider: "bg-green-800 w-full md:w-[2px] h-[2px] md:h-10 border-none",
        logoutElement: ""
    },
    variants: {
        variant: {
            primary: {
                divider: "bg-gray-100 hidden md:block",
                logoutElement: "hidden md:block"
            },
            mobile: {
                divider: "mt-2 mb-2",
                logoutElement: "flex gap-3"
            }
        }
    }
});

const NavLogout: React.FC<NavLogoutProps> = ({ variant = 'primary' }) => {
    const { logout } = useContext(AuthContext);

    const {
        divider,
        logoutElement
    } = navLogoutVariants({ variant });

    return (
        <>
            <hr className={divider()} />

            <button onClick={logout} className={logoutElement()}>
                <LogOut size={24} className="text-green-800 md:text-white" />
                <span className="md:hidden text-green-800">Sair</span>
            </button>
        </>
    );
};

export default NavLogout;
