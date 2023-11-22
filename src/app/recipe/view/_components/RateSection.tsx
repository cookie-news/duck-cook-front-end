"use client";

import {
  ElementType,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { ThumbUpAlt } from "@mui/icons-material";

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
      <p className="text-black font-semibold">{label}</p>
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeIsLoading, setLikeIsLoading] = useState(false);

  const { token, userData, isLogged } = useContext(AuthContext);

  const fetchUserIsLiked = useCallback(() => {
    RecipeService.getRecipeIsLikedByUser(idRecipe, userData.id)
      .then((result) => {
        setIsLiked(result.liked);
      })
      .catch((error) => toast.error(error.message));
  }, [idRecipe, userData.id]);

  useEffect(() => {
    if (isLogged) {
      fetchUserIsLiked();
    }
  }, [fetchUserIsLiked, isLogged]);

  const handleLike = async () => {
    try {
      setLikeIsLoading(true);
      if (isLiked) {
        await RecipeService.deleteRecipeLike({ idRecipe, idUser: userData.id });
        setLikes((state) => (state -= 1));
      } else {
        await RecipeService.createLike({
          idRecipe,
          idUser: userData.id,
        });
        setLikes((state) => (state += 1));
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLikeIsLoading(false);
      fetchUserIsLiked();
    }
  };

  return (
    <div className="flex justify-between gap-5">
      <Card
        label={Date.parseSecondsToHours(preparationTime)}
        icon={ClockIcon}
      />
      <Card
        label={likes}
        icon={isLiked ? ThumbUpAlt : ThumbsUp}
        onClick={handleLike}
        animate
        disabled={likeIsLoading || !isLogged}
      />

      <Card label={commentsNumber} icon={MessagesSquare} />
    </div>
  );
};

export default RateSection;
