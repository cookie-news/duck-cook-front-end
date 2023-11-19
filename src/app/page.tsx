// Mui
import React from "react";

import Image from "next/image";

// Components
import PageWrapper from "@components/PageWrapper";

import { ServiceError } from "@utils/Error";

import { RecipeService } from "@/data/recipe.service";

import SearchSection from "./_components/SearchSection";

function SkeletonFallbackMoreLikeds() {
  return (
    <section className="flex gap-2 flex-wrap animate-pulse">
      <div className="h-28 w-[184px]  bg-neutral-300 rounded-md" />
      <div className="h-28 w-[184px]  bg-neutral-300 rounded-md" />
      <div className="h-28 w-[184px]  bg-neutral-300 rounded-md" />
      <div className="h-28 w-[184px]  bg-neutral-300 rounded-md" />
      <div className="h-28 w-[184px]  bg-neutral-300 rounded-md" />
    </section>
  );
}

function SkeletonFallbackRecipes() {
  return (
    <section className="flex flex-col gap-2 animate-pulse">
      <div className="h-28 w-full bg-neutral-300 rounded-md" />
      <div className="h-28 w-full bg-neutral-300 rounded-md" />
      <div className="h-28 w-full bg-neutral-300 rounded-md" />
      <div className="h-28 w-full bg-neutral-300 rounded-md" />
      <div className="h-28 w-full bg-neutral-300 rounded-md" />
    </section>
  );
}

async function RecipesList() {
  let recipes: any = {};

  try {
    recipes = await RecipeService.getRecipiesPagging(1);
  } catch (e: any) {
    console.log("ERROR: ", e.message);
  }

  return recipes.items.map((r: any) => (
    <div
      key={r.id}
      className="flex justify-between items-center w-full bg-neutral-default border border-neutral-dark p-3 rounded-md"
    >
      <div className="flex flex-col">
        <span className="font-bold uppercase text-green-800">{r.title}</span>
        <span className="font-thin text-xs text-neutral-500">
          {r.preparationTimeConverted}
        </span>
        <p className="mt-3 text-base truncate... text-neutral-500">
          {r.description}
        </p>
      </div>
      {r.images !== null && (
        <Image
          src={r.images[0]}
          width={250}
          height={90}
          objectFit="cover"
          alt="recipe image"
          className="rounded-md"
        />
      )}
    </div>
  ));
}

async function MoreLikedsRecipes() {
  let moreLikedsRecipes: Array<any> = [];

  try {
    moreLikedsRecipes = await RecipeService.getRecipiesMoreLikeds();
  } catch (e: any) {
    console.error(e.message);
  }

  return moreLikedsRecipes
    .slice(0, moreLikedsRecipes.length - 1)
    .map((recipe: any) => (
      <div
        key={crypto.randomUUID()}
        className="relative w-[184px] bg-neutral-default rounded-md border border-neutral-dark p-2"
      >
        {recipe.images !== null && (
          <Image src={recipe.images[0]} alt="Imagem da receita" fill />
        )}

        <p className="font-semibold uppercase truncate ...">{recipe.title}</p>
        <p className="truncate ...">{recipe.description}</p>
      </div>
    ));
}

function PageRoot() {
  return (
    <PageWrapper isProtected={false} hasMenu>
      <div className="flex flex-col gap-8">
        <SearchSection />
        <p className="bg-green-800 p-3 text-white uppercase w-fit font-bold">
          RECEITAS MAIS CURTIDAS
        </p>
        <section className="flex gap-[0.4rem] flex-wrap">
          <React.Suspense fallback={<SkeletonFallbackMoreLikeds />}>
            <MoreLikedsRecipes />
          </React.Suspense>
        </section>
        <p className="bg-green-800 p-3 text-white uppercase w-fit font-bold">
          Feed de receitas
        </p>
        <section className="flex flex-col gap-2">
          <React.Suspense fallback={<SkeletonFallbackRecipes />}>
            <RecipesList />
          </React.Suspense>
        </section>
      </div>
    </PageWrapper>
  );
}

export default PageRoot;
