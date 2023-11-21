import Image from "next/image";

const Footer: React.FC<any> = () => {
  return (
    <footer className="flex justify-between items-center p-3 mt-10 bg-neutral-100">
      <Image
        src="/assets/imgs/logo.svg"
        width={40}
        height={40}
        alt="duck cook logo"
        />
        <p>Duck Cook @ 2023</p>
    </footer>
  );
};

export default Footer;
