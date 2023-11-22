"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Image from "next/image";

import { useEventCallback } from "@mui/material";

import { RecipeService } from "@root/src/data/recipe.service";
import { Comment } from "@root/src/types/Recipe";

import Button from "@components/Button";

import { AuthContext } from "@context/AuthContext";

interface CommentsSectionProps {
  idRecipe: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ idRecipe }) => {
  const [userComment, setUserComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(null as any);
  const [isLoading, setIsLoading] = useState(true);

  const { isLogged, userData } = useContext(AuthContext);

  const fetchComments = useEventCallback(async () => {
    setIsLoading(true);
    RecipeService.getRecipeComments(idRecipe)
      .then((result) => setComments(result))
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  });

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSendComment = async () => {
    try {
      setIsLoading(true);
      await RecipeService.createRecipeComment({
        idRecipe,
        idUser: userData.id,
        message: userComment,
      });
      setUserComment("");
      fetchComments();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-slate-700 font-bold  text-xl">Comentários</h3>

      {isLogged && (
        <div className="flex gap-3">
          <div className="relative w-11 h-11">
            <Image
              src={userData.image === "" ? "/assets/imgs/logo.png" : userData.image}
              alt="user profile"
              objectFit="cover"
              className="rounded-full"
              fill
            />
          </div>
          <textarea
            className="w-full border border-gray-default bg-neutral-default rounded-md p-3 resize-none outline-none"
            placeholder="Escreva seu comentário aqui"
            disabled={isLoading}
            name="comment"
            id="comment"
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
            maxLength={200}
            cols={35}
          ></textarea>
          <Button disabled={isLoading} onClick={handleSendComment}>
            Enviar
          </Button>
        </div>
      )}

      {comments &&
        comments.map((item: Comment) => (
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
