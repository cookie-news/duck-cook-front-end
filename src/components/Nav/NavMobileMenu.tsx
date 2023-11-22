import { useState } from "react";

import { Drawer } from "@mui/material";

import Button from "@components/Button";

import { Menu } from "lucide-react";

type NavMobileMenuProps = {
    children: React.ReactNode;
};

const NavMobileMenu: React.FC<NavMobileMenuProps> = ({ children }) => {

    const [menuSide, setMenuSide] = useState<boolean>(false);

    return (
        <>
            <Button variant="none" className="text-white absolute left-2 md:hidden" onClick={() => setMenuSide(!menuSide)}>
                <Menu size={35} />
            </Button>
            <Drawer
                className="md:hidden absolute"
                sx={{
                    width: 100,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        background: '#095150',
                        width: 200,
                        boxSizing: 'border-box',
                    },
                }}
                ModalProps={{
                    keepMounted: false
                }}
                variant="temporary"
                anchor="left"
                open={menuSide ?? false}
                onClose={() => setMenuSide(false)}
            >
                <div className="p-2">
                    {children}
                </div>
            </Drawer>
        </>
    );
};

export default NavMobileMenu;
