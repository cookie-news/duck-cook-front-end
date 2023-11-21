import Image from "next/image";
import Link from "next/link";

import { recipeRoutes } from "@root/routes";
import { Recipe } from "@root/src/types/Recipe";

import { Date } from "@utils/Date";

import { RecipeService } from "@/data/recipe.service";

export async function MoreLikedsList() {
  let moreLikedsRecipes: Array<Recipe> = [];

  try {
    moreLikedsRecipes = await RecipeService.getRecipiesMoreLikeds();
  } catch (e: any) {
    console.error(e.message);
  }

  return moreLikedsRecipes
    .slice(0, moreLikedsRecipes.length - 1)
    .map((recipe: Recipe) => (
      <Link
        key={`${recipeRoutes.view.path}/${recipe.id}`}
        href={recipe.id}
        className="relative w-[184px] bg-neutral-default rounded-md border border-neutral-dark p-2"
      >
        {recipe.images !== null && (
          <Image src={recipe.images[0]} alt="Imagem da receita" fill />
        )}

        <p className="font-semibold uppercase truncate">{recipe.title}</p>
        <p className="font-thin text-xs truncate">
          {Date.parseSecondsToHours(recipe.preparationTime)}
        </p>
      </Link>
    ));
}
