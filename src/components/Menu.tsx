"use client";

import { useEffect, useState} from "react";

//Next
import Image from "next/image";
import { useRouter } from "next/navigation";

//Routes
import { authRoutes } from "@root/routes";
import { Box, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";



const Menu = (props: any) => {
    const router = useRouter();

    const redirectToHomePage = () => router.push("/");
    const redirectToLoginPage = () => router.push(authRoutes.login.path);
    const redirectToRegisterPage = () => router.push(authRoutes.register.path);

    const [hideMenu, setHideMenu] = useState(false);

    return (
        <>
            {
                !hideMenu &&
                <>
                    <div 
                        className="flex justify-between bg-green-800 border-solid border[5px] border-green-800"
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
                            <IconButton
                                aria-label="user"
                                onClick={redirectToLoginPage}
                                className="pr-4 pl-4"
                                sx={{ display: { xs: 'block', sm: 'none' } }}
                            >
                                <PersonIcon sx={{ color: 'white' }} fontSize="medium" />
                            </IconButton>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Button sx={{ color: '#fff' }} onClick={redirectToLoginPage}>
                                    LOGAR
                                </Button>
                                <Button sx={{ color: '#fff' }} onClick={redirectToRegisterPage}>
                                    REGITRAR
                                </Button>
                            </Box>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Menu;