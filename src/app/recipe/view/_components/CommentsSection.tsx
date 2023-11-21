"use client";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useEventCallback } from "@mui/material";

import { RecipeService } from "@root/src/data/recipe.service";
import { Comment } from "@root/src/types/Recipe";

import { AuthContext } from "@context/AuthContext";

interface CommentsSectionProps {
  idRecipe: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ idRecipe }) => {
  const [comments, setComments] = useState<Comment[]>(null as any);
  const [isLoading, setIsLoading] = useState(true);

  const { isLogged } = useContext(AuthContext);

  const fetchComments = useEventCallback(async () => {
    setIsLoading(true);
    RecipeService.getRecipeComments(idRecipe)
      .then((result) => setComments(comments))
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  });

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (isLoading) return <p>loading...</p>;

  if (!comments) return <></>;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-slate-700 font-bold  text-xl">Comentários</h3>

      {isLogged && <div className="flex gap-3"></div>}

      {comments.map((item: Comment) => (
        <div key={item.id} className="flex flex-col gap-6">
          <div className="bg-neutral-default border border-gray-dark rounded-md p-3">
            <span className="font-semibold text-slate-700">
              {item.user.name} | @{item.user.user}
            </span>
            <p className="mt-3 text-gray-800">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CommentsSection;
