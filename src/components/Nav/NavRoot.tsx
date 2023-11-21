type MenuRootProps = {
    children: React.ReactNode;
};

const MenuRoot: React.FC<MenuRootProps> = ({ children }) => {
    return (
        <nav className="flex fixed w-full m-0 justify-center items-center bg-green-800 py-2 px-6 shadow-lg mb-10">
            {children}            
        </nav>
    );
};

export default MenuRoot;
