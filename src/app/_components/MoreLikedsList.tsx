'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Image from "next/image";
import Link from "next/link";

import { recipeRoutes } from "@root/routes";
import { Recipe } from "@root/src/types/Recipe";

import { Date } from "@utils/Date";

import { RecipeService } from "@/data/recipe.service";

import SkeletonFallbackMoreLikeds from "./skeletons/SkeletonFallbackMoreLikedsList";

const fallbackImage =
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

export function MoreLikedsList() {
    const [moreLikedsRecipes, setMoreLikedsRecipes] = useState<Array<Recipe>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        RecipeService.getRecipiesMoreLikeds().then((recipiesMoreLikeds:any) => {
            setMoreLikedsRecipes(recipiesMoreLikeds);
        }).catch((error:any) => {
            toast.error(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    if(loading) return <SkeletonFallbackMoreLikeds />

    if (!moreLikedsRecipes || moreLikedsRecipes?.length == 0)
        return (
            <p className="flex-1 col-span-3 text-center font-semibold uppercase mt-4 text-green-800">
                Nada para mostrar
            </p>
        );

    return <div className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 gap-2">
        {moreLikedsRecipes.map((recipe: Recipe) => (
            <Link
                key={recipe.id}
                href={recipeRoutes.view.path + "/" + recipe.id}
                className="relative bg-neutral-50 rounded-md border border-neutral-dark overflow-auto"
            >
                <div className="relative h-20">
                    <Image
                        src={(recipe?.images && recipe?.images[0]) ?? fallbackImage}
                        alt="Imagem da receita"
                        fill
                        objectFit="cover"
                    />
                </div>

                <div className="p-2">
                    <p className="font-semibold uppercase truncate text-green-800">
                        {recipe.title}
                    </p>
                    <p className="font-thin text-xs truncate">
                        <span className="text-gray-default">Tempo de preparo:</span>{" "}
                        {Date.parseSecondsToHours(Number(recipe.preparationTime))}
                    </p>
                </div>
            </Link>
        ))}
    </div>
}
