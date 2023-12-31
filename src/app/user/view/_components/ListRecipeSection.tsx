import React from "react";

//Next
import Image from "next/image";
import Link from "next/link";

//Routes
import { recipeRoutes } from "@root/routes";
import { RecipeService } from "@root/src/data/recipe.service";
import { User } from "@root/src/data/user.service";

import Button from "@components/Button";

//Types
import { Recipe } from "@/types/Recipe"
//Icons
import { FileSignature, MessagesSquare, ThumbsUp, Trash2 } from "lucide-react";

interface ListRecipeSectionProps
{
    listRecipe: Array<Recipe>,
    userData: User,
    handlerDeleteAction?: (recipeId:string) => void
}

const ListRecipeSection:React.FC<ListRecipeSectionProps> = ({listRecipe, userData, handlerDeleteAction}) => {
    return (
        <div>
            {!listRecipe || listRecipe.length == 0 ? (
                <div className="p-4 border border-solid text-center rounded">
                    <p>Nenhuma receita encontrada.</p>
                </div>
            ) : (
                <div>
                    {listRecipe.map((recipe: Recipe, index) => (
                        <div
                            key={crypto.randomUUID()}
                            className={
                                "flex justify-between border border-solid rounded border-neutral-200 border-primary overflow-auto " +
                                (index > 0 ? "mt-2" : "")
                            }
                        >
                            <div className="flex-auto flex flex-col p-4 w-10/12">
                                <Link href={recipeRoutes.view.path+'/'+recipe.id} className="break-words">
                                    <b>{recipe.title}</b>
                                </Link>
                                <div className="flex items-center mt-2 w-full gap-2 relative hover:cursor-default">
                                    <div className="flex gap-1 justify-center">
                                        <MessagesSquare size={20} />
                                        <p>
                                            <b>{recipe.countComments ?? 0}</b>
                                        </p>
                                    </div>
                                    <div className="flex gap-1 justify-center">
                                        <ThumbsUp size={20} />
                                        <p>
                                            <b>{recipe.countLikes ?? 0}</b>
                                        </p>
                                    </div>
                                    {
                                        userData?.id == recipe?.idUser &&
                                        <div className="flex gap-2 absolute right-0">
                                            <div className="flex">
                                                <Link href={recipeRoutes.edit.path+'?id='+recipe.id} className="flex gap-1 justify-center">
                                                    <FileSignature size={20} />
                                                    <span className="text-sm">editar</span>
                                                </Link>
                                            </div>
                                            <div className="flex">
                                                <span className="flex gap-1 justify-center text-red-400 hover:cursor-pointer" onClick={() => {handlerDeleteAction && handlerDeleteAction(recipe?.id)}}>
                                                    <Trash2 size={20} />
                                                    <span className="text-sm">apagar</span>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex-auto relative w-2/12 bg-green-800">
                                {
                                    recipe?.images && recipe?.images.length > 0 &&
                                    <Image src={recipe.images[0]} fill objectFit="cover" alt="Imagem da receita" />
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListRecipeSection;