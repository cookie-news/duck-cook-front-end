import { ElementType } from "react";

import { LucideProps } from "lucide-react";

interface InputIconProps {
  icon: ElementType<LucideProps>;
}

const InputIcon: React.FC<InputIconProps> = ({ icon: Icon }) => {
  return <Icon className="text-gray-dark" />;
};

export default InputIcon;
