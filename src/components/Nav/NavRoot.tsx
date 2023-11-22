type MenuRootProps = {
    children: React.ReactNode;
};

const MenuRoot: React.FC<MenuRootProps> = ({ children }) => {
    return (
        <>
            <div className="h-20"></div>
            <nav className="flex top-0 fixed w-full m-0 justify-center items-center bg-green-800 py-2 px-6 shadow-lg ">
                {children}            
            </nav>
        </>
    );
};

export default MenuRoot;
