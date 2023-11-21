import { ElementType } from "react";

import { ClockIcon, MessagesSquare, ThumbsUp } from "lucide-react";

interface CardProps {
  label: string;
  icon: ElementType;
}

function Card({ label, icon: Icon }: CardProps) {
  return (
    <div className="flex flex-1 items-center justify-center gap-2 border border-gray-dark rounded-md bg-neutral-default p-3 ">
      <Icon className="text-green-800" />
      <p className="text-lime-700 font-semibold">{label}</p>
    </div>
  );
}

const RateSection: React.FC<any> = () => {
  return (
    <div className="flex justify-between gap-5">
      <Card label="1h 20 min" icon={ClockIcon} />
      <Card label="100" icon={ThumbsUp} />
      <Card label="100" icon={MessagesSquare} />
    </div>
  );
};

export default RateSection;
