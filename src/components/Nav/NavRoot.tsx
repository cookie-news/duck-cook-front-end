import Image from "next/image";

type MenuRootProps = {
  children: React.ReactNode;
};

const MenuRoot: React.FC<MenuRootProps> = ({ children }) => {
  return (
    <nav className="flex relative justify-center items-center bg-green-800 py-2 px-6 shadow-lg mb-10">
      <Image
        src="/assets/imgs/logo_name.svg"
        width={250}
        height={50}
        className="bg-white rounded-lg"
        alt="Duck Cook logo"
      />
      {children}
    </nav>
  );
};

export default MenuRoot;
