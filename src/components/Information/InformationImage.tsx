import Image from "next/image";

type InformationImageProps = {
  src?: string;
};

const InformationImage: React.FC<InformationImageProps> = ({
  src = "/assets/error/error.png",
}) => {
  return <Image src={src} alt="image error" width={400} height={400} />;
};

export default InformationImage;
