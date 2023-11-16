"use client";

import { useContext, useState} from "react";

//Next
import Image from "next/image";
import { useRouter } from "next/navigation";

//Routes
import { authRoutes, rootRoutes } from "@root/routes";

//Material Ui
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";

//Contexts
import { AuthContext } from "@context/AuthContext";

const Menu = (props: any) => {
    //User
    const { userData, isLogged } = useContext(AuthContext);

    const router = useRouter();

    const redirectToHomePage = () => router.push("/");
    const redirectToLoginPage = () => router.push(authRoutes.login.path);
    const redirectToRegisterPage = () => router.push(authRoutes.register.path);
    const redirectToUserPage = () => router.push(rootRoutes.user.view.path);

    const [hideMenu, setHideMenu] = useState(false);

    return (
        <>
            {
                !hideMenu &&
                <>
                    <div 
                        className="flex justify-between bg-green-800 border-solid border-2 border-green-800"
                    >
                        <div className="flex flex-1 justify-start">
                            <IconButton aria-label="menu" className="pl-4 pr-4">
                                <MenuIcon sx={{ color: 'white' }} fontSize="medium" />
                            </IconButton>
                        </div>
                        <div className="flex flex-1 justify-center">
                            <Image
                                src="/assets/imgs/logo_name.svg"
                                width={250}
                                height={50}
                                alt="Duck Cook image logo"
                                className="bg-white"
                                style={{
                                    'clipPath': 'polygon(50% 0%, 96% 0, 96% 72%, 98% 88%, 100% 100%, 0 100%, 2% 88%, 4% 72%, 4% 0)'
                                }}
                                onClick={redirectToHomePage}
                            />
                        </div>
                        <div className="flex flex-1 justify-end">
                            {
                                !isLogged ? 
                                    <>
                                        <IconButton
                                            aria-label="user"
                                            onClick={redirectToLoginPage}
                                            className="pr-4 pl-4"
                                            sx={{ display: { xs: 'block', sm: 'none' } }}
                                        >
                                            <PersonIcon sx={{ color: 'white' }} fontSize="medium" />
                                        </IconButton>
                                        <div>
                                            <Button sx={{ color: '#fff', height: 54 }} onClick={redirectToLoginPage}>
                                                LOGAR
                                            </Button>
                                            <Button sx={{ color: '#fff', height: 54 }} onClick={redirectToRegisterPage}>
                                                REGITRAR
                                            </Button>
                                        </div>
                                    </>
                                :
                                <IconButton
                                    aria-label="user"
                                    onClick={redirectToUserPage}
                                >
                                    <Avatar 
                                        className="border-2 border-solid rounded-full border-white"
                                        sx={{ width: 34, height: 34 }}
                                        src={userData.image}
                                    />
                                </IconButton>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Menu;