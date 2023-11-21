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

export function RecipesList() {
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [recipesList, setRecipesList] = useState<PaginationData<Recipe>>(
    null as any
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    RecipeService.getRecipes(page)
      .then((result) => {
        setRecipesList(result);
      })
      .catch((error) => {
        setError(error);
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

  if (error) return <Error statusCode={error.status} />;

  return (
    <>
      {recipesList.items.map((item: Recipe) => (
        <Link
          key={item.id}
          href={`${recipeRoutes.view.path}/${item.id}`}
          className="flex gap-4 justify-between items-center w-full bg-neutral-default border border-neutral-dark p-3 rounded-md"
        >
          <div className="flex flex-1 flex-col h-full">
            <p className="font-bold uppercase text-green-800">{item.title}</p>
            <span className="font-thin w-32 text-xs text-neutral-500 truncate">
              {Date.parseSecondsToHours(item.preparationTime)}
            </span>
            <p className="mt-3 break-words text-base text-neutral-500">
              {parseToHtml(item.description)}
            </p>
          </div>
          {item.images !== null && (
            <div className="flex-2 relative w-40 h-24">
              <Image
                src={item.images[0]}
                fill
                objectFit="cover"
                alt="recipe image"
                className="rounded-md"
              />
            </div>
          )}
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
