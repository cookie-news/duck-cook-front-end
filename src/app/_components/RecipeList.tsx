"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Error from "next/error";
import Image from "next/image";
import Link from "next/link";

import { Pagination } from "@mui/material";

import { recipeRoutes } from "@root/routes";
import { RecipeService } from "@root/src/data/recipe.service";
import { PaginationData } from "@root/src/types/PaginationData";
import { Recipe } from "@root/src/types/Recipe";

import { Date } from "@utils/Date";

import parseToHtml from "html-react-parser";

import { SkeletonFallbackRecipes } from "./skeletons/SkeletonFallbackRecipesList";

const fallbackImage =
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

export function RecipesList() {
    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    const [recipesList, setRecipesList] = useState<PaginationData<Recipe>>(
        null as any
    );

    useEffect(() => {
        setIsLoading(true);
        RecipeService.getRecipes(page)
            .then((result) => {
                setRecipesList(result);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    const goToPage = (page: number) => {
        setPage(page);
    };

    if (isLoading) return <SkeletonFallbackRecipes />;

    return (
        <>
            {recipesList?.items?.map((item: Recipe) => (
                <Link
                    key={item.id}
                    href={`${recipeRoutes.view.path}/${item.id}`}
                    className="flex flex-col-reverse md:flex-row gap-4 h-56 justify-between md:items-center w-full bg-neutral-default border border-neutral-dark rounded-md"
                >
                    <div className="flex flex-1 flex-col h-full p-3">
                        <p className="font-bold uppercase text-green-800">{item.title}</p>
                        <span className="font-thin w-32 text-xs text-neutral-500">
                            <span className="text-gray-default">Tempo de preparo: </span>{Date.parseSecondsToHours(Number(item.preparationTime))}
                        </span>
                        <p className="mt-3 break-words overflow-hidden text-base text-neutral-500">
                            {item.description}
                        </p>
                    </div>
                    <div className="flex-2 relative w-full md:w-40 h-24 md:h-full overflow-auto">
                        <Image
                            src={(item.images && item.images[0]) ?? fallbackImage}
                            fill
                            objectFit="cover"
                            alt="recipe image"
                            className="rounded-t-md md:rounded-r-md"
                        />
                    </div>
                </Link>
            ))}
            <Pagination
                count={recipesList.totalPage}
                page={page}
                onChange={(e, page) => goToPage(page)}
                className="mt-2"
            />
        </>
    );
}
