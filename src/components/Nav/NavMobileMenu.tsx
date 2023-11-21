import { Drawer } from "@mui/material";

type NavMobileMenuProps = {
    children: React.ReactNode;
};

const NavMobileMenu: React.FC<NavMobileMenuProps> = ({children}) => {
  return (
    <Drawer
        className="md:hidden absolute"
        sx={{
            width: 100,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 200,
                boxSizing: 'border-box',
            },
        }}
        variant="persistent"
        anchor="left"
        open={true}
    >
        <div className="p-2">
            {children}
        </div>
    </Drawer>
  );
};

export default NavMobileMenu;
