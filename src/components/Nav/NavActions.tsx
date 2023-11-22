import Link from "next/link";

import { authRoutes } from "@root/routes";

import { tv, VariantProps } from "tailwind-variants";

interface NavActionsProps extends ActionsVariants { }

type ActionsVariants = VariantProps<typeof actionsVariants>;

const actionsVariants = tv({
    base: "right-6 gap-3",
    variants: {
        variant: {
            primary: "items-center absolute hidden md:flex",
            mobile: "flex flex-col"
        }
    },
});

const NavActions: React.FC<NavActionsProps> = ({ variant = 'primary' }) => {
    return (
        <div className={actionsVariants({ variant })}>
            <Link href={authRoutes.login.path} className="text-white">
                Entrar
            </Link>
            <hr className="border-none w-full md:w-[1px] h-[1px] md:h-10 bg-green-950" />
            <Link href={authRoutes.register.path} className="text-white">
                Registrar-se
            </Link>
        </div>
    );
};

export default NavActions;
