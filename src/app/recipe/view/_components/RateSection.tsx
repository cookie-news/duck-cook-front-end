"use client";

import {
  ElementType,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { RecipeService } from "@root/src/data/recipe.service";

import { AuthContext } from "@context/AuthContext";

import { Date } from "@utils/Date";

import { ClockIcon, MessagesSquare, ThumbsUp } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

type IconVariants = VariantProps<typeof iconVariant>;

interface CardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IconVariants {
  label: string | number;
  icon: ElementType;
}

const iconVariant = tv(
  {
    base: "text-green-800",
    variants: {
      animate: {
        true: "active:animate-ping",
      },
    },
  },
  { twMerge: true }
);

function Card({ label, icon: Icon, animate, ...props }: CardProps) {
  return (
    <button
      {...props}
      className={
        "flex flex-1 items-center justify-center gap-2 border border-gray-dark rounded-md bg-neutral-default p-3 h-12"
      }
    >
      <Icon className={iconVariant({ animate })} />
      <p className="text-green-800 font-semibold">{label}</p>
    </button>
  );
}

interface RateSectionProps {
  idRecipe: string;
  preparationTime: number;
  likesNumber: number;
  commentsNumber: number;
}

const RateSection: React.FC<RateSectionProps> = ({
  idRecipe,
  preparationTime,
  likesNumber,
  commentsNumber,
}) => {
  const [likes, setLikes] = useState(likesNumber);

  const { userData } = useContext(AuthContext);

  const handleLike = async () => {
    try {
      await RecipeService.createLike({
        idRecipe,
        idUser: userData.id,
      });
      setLikes((state) => (state += 1));
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex justify-between gap-5">
      <Card
        label={Date.parseSecondsToHours(preparationTime)}
        icon={ClockIcon}
      />
      <Card label={likes} icon={ThumbsUp} onClick={handleLike} animate />
      <Card label={commentsNumber} icon={MessagesSquare} />
    </div>
  );
};

export default RateSection;
